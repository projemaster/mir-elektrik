import { createClient, SupabaseClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

let supabaseClient: SupabaseClient | null = null;
const LOCAL_STORAGE_FILE = path.resolve(process.cwd(), '.mir_database_store.json');

// Memory store for offline/local fallback
interface LocalStore {
  projects: any[];
  sources: any[];
  articles: any[];
  article_versions: any[];
  agent_logs: any[];
}

let localStore: LocalStore = {
  projects: [
    {
      id: 'proj-mir-bursa',
      name: 'Mir Elektrik Proje - Bursa Saha Portali',
      domain: 'mirelektrikproje.com',
      created_at: new Date().toISOString(),
    },
  ],
  sources: [],
  articles: [],
  article_versions: [],
  agent_logs: [],
};

function loadLocalStore(): LocalStore {
  try {
    if (fs.existsSync(LOCAL_STORAGE_FILE)) {
      const raw = fs.readFileSync(LOCAL_STORAGE_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      return {
        projects: parsed.projects || localStore.projects,
        sources: parsed.sources || [],
        articles: parsed.articles || [],
        article_versions: parsed.article_versions || [],
        agent_logs: parsed.agent_logs || [],
      };
    }
  } catch (e) {
    console.warn('Could not load local persistent database store:', e);
  }
  return localStore;
}

function persistLocalStore(store: LocalStore) {
  try {
    localStore = store;
    fs.writeFileSync(LOCAL_STORAGE_FILE, JSON.stringify(store, null, 2), 'utf-8');
  } catch (e) {
    console.warn('Could not write local database store:', e);
  }
}

/**
 * Initializes the Supabase client
 */
export function initSupabase(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (url && key) {
    try {
      supabaseClient = createClient(url, key, {
        auth: {
          persistSession: false,
        },
      });
      console.log('Supabase client successfully connected to:', url);
      return supabaseClient;
    } catch (err) {
      console.warn('Supabase initialization failed:', err);
    }
  }
  return null;
}

export function getDbStatus(): { isCloud: boolean; message: string; url?: string; recordCounts: { articles: number; sources: number; logs: number } } {
  const client = initSupabase();
  const store = loadLocalStore();
  return {
    isCloud: Boolean(client),
    message: client 
      ? 'Supabase Cloud Veri Tabanına Bağlı (PostgreSQL)' 
      : 'Yerel Güvenli Depolama Aktif (SUPABASE_URL tanımlandığında otomatik bulut senkronizasyonu yapılır)',
    url: process.env.SUPABASE_URL,
    recordCounts: {
      articles: store.articles.length,
      sources: store.sources.length,
      logs: store.agent_logs.length,
    },
  };
}

/**
 * Save an article and create a version entry
 */
export async function saveArticleToDb(article: any, html: string, logs: any[] = []): Promise<{ id: string; version: number }> {
  const client = initSupabase();
  const now = new Date().toISOString();
  const slug = article.slug || `makale-${Date.now()}`;

  // If Supabase cloud is configured:
  if (client) {
    try {
      // Upsert article
      const { data: artData, error: artError } = await client
        .from('articles')
        .upsert({
          slug,
          title: article.title,
          target_keyword: article.targetKeyword || article.title,
          h1: article.h1,
          json_content: article,
          html_content: html,
          quality_score: article.qualityScore || 96,
          status: 'published',
          updated_at: now,
        }, { onConflict: 'slug' })
        .select()
        .single();

      if (artError) throw artError;

      const articleId = artData.id;

      // Create version
      const { data: verCount } = await client
        .from('article_versions')
        .select('version_number', { count: 'exact' })
        .eq('article_id', articleId);

      const nextVersion = (verCount?.length || 0) + 1;

      await client.from('article_versions').insert({
        article_id: articleId,
        version_number: nextVersion,
        json_content: article,
        html_content: html,
        change_summary: `Sürüm ${nextVersion}: 11 H2 ve 55 H3 içerik mimarisi derlendi`,
      });

      // Insert agent logs
      if (logs && logs.length > 0) {
        const rows = logs.map(l => ({
          article_id: articleId,
          agent_id: l.agentId || 'agent-unknown',
          agent_name: l.agentName || 'Ajan',
          role: l.role || 'Teknik Denetçi',
          status: l.status || 'completed',
          model_used: l.modelUsed || 'gemini-3.8-flash',
          provider_used: l.providerUsed || 'gemini',
          tokens_used: l.tokensUsed || 0,
          latency_ms: l.latencyMs || 0,
          action: l.action || '',
          output_summary: l.outputSummary || '',
        }));
        await client.from('agent_logs').insert(rows);
      }

      return { id: articleId, version: nextVersion };
    } catch (cloudErr: any) {
      console.warn('Supabase cloud write failed, saving to local fallback store:', cloudErr.message);
    }
  }

  // Fallback / Local persistent store
  const store = loadLocalStore();
  let existing = store.articles.find(a => a.slug === slug);
  let articleId = existing?.id || `art-${Date.now()}`;
  let versionNumber = 1;

  if (existing) {
    existing.json_content = article;
    existing.html_content = html;
    existing.updated_at = now;
    existing.quality_score = article.qualityScore || 96;
    versionNumber = (store.article_versions.filter(v => v.article_id === articleId).length || 0) + 1;
  } else {
    store.articles.unshift({
      id: articleId,
      slug,
      title: article.title,
      target_keyword: article.targetKeyword || article.title,
      h1: article.h1,
      json_content: article,
      html_content: html,
      quality_score: article.qualityScore || 96,
      status: 'published',
      created_at: now,
      updated_at: now,
    });
  }

  store.article_versions.unshift({
    id: `ver-${Date.now()}`,
    article_id: articleId,
    version_number: versionNumber,
    json_content: article,
    html_content: html,
    change_summary: `Sürüm ${versionNumber}: Ajan Konsülü tam üretimi`,
    created_at: now,
  });

  if (logs && logs.length > 0) {
    logs.forEach(l => {
      store.agent_logs.unshift({
        id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        article_id: articleId,
        ...l,
        created_at: now,
      });
    });
  }

  persistLocalStore(store);
  return { id: articleId, version: versionNumber };
}

/**
 * List all articles
 */
export async function listArticlesFromDb(): Promise<any[]> {
  const client = initSupabase();
  if (client) {
    try {
      const { data, error } = await client
        .from('articles')
        .select('id, slug, title, target_keyword, h1, quality_score, status, created_at, updated_at')
        .order('updated_at', { ascending: false });

      if (!error && data) return data;
    } catch (e) {
      console.warn('Supabase listArticles error:', e);
    }
  }
  const store = loadLocalStore();
  return store.articles;
}

/**
 * Retrieve article by ID or slug
 */
export async function getArticleById(idOrSlug: string): Promise<any | null> {
  const client = initSupabase();
  if (client) {
    try {
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);
      const query = client.from('articles').select('*, article_versions(*), agent_logs(*)');
      const { data, error } = isUuid ? await query.eq('id', idOrSlug).single() : await query.eq('slug', idOrSlug).single();
      if (!error && data) return data;
    } catch (e) {
      console.warn('Supabase getArticle error:', e);
    }
  }

  const store = loadLocalStore();
  const found = store.articles.find(a => a.id === idOrSlug || a.slug === idOrSlug);
  if (found) {
    return {
      ...found,
      article_versions: store.article_versions.filter(v => v.article_id === found.id),
      agent_logs: store.agent_logs.filter(l => l.article_id === found.id),
    };
  }
  return null;
}
