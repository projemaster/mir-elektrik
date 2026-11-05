export interface DbStatus {
  isCloud: boolean;
  message: string;
  url?: string;
  recordCounts: {
    articles: number;
    sources: number;
    logs: number;
  };
}

export interface SavedArticleSummary {
  id: string;
  slug: string;
  title: string;
  target_keyword: string;
  h1: string;
  quality_score: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ProviderInfo {
  provider: 'gemini' | 'claude' | 'deepseek';
  available: boolean;
  defaultModel: string;
  displayName: string;
  description: string;
}

/**
 * Fetch status of Supabase/PostgreSQL database
 */
export async function fetchDbStatus(): Promise<DbStatus> {
  try {
    const res = await fetch('/api/database/status');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e: any) {
    return {
      isCloud: false,
      message: 'Yerel Güvenli Depolama (API Bağlantısı bekleniyor)',
      recordCounts: { articles: 0, sources: 0, logs: 0 },
    };
  }
}

/**
 * Fetch all saved articles from database
 */
export async function fetchSavedArticles(): Promise<SavedArticleSummary[]> {
  try {
    const res = await fetch('/api/database/articles');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.articles || [];
  } catch (e: any) {
    console.warn('Could not fetch saved articles:', e);
    return [];
  }
}

/**
 * Fetch a single article with versions and agent logs
 */
export async function fetchArticleDetails(id: string): Promise<any | null> {
  try {
    const res = await fetch(`/api/database/articles/${encodeURIComponent(id)}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.article;
  } catch (e: any) {
    console.warn('Could not fetch article details:', e);
    return null;
  }
}

/**
 * Fetch available LLM providers
 */
export async function fetchProviders(): Promise<ProviderInfo[]> {
  try {
    const res = await fetch('/api/ai/providers');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.providers || [];
  } catch (e: any) {
    console.warn('Could not fetch providers:', e);
    return [
      {
        provider: 'gemini',
        available: true,
        defaultModel: 'gemini-3.8-flash',
        displayName: 'Google Gemini (3.8 Flash)',
        description: 'Sunucu tarafında bağlı',
      },
      {
        provider: 'claude',
        available: false,
        defaultModel: 'claude-3-5-sonnet-20241022',
        displayName: 'Anthropic Claude',
        description: 'Ortam anahtarı bekleniyor',
      },
      {
        provider: 'deepseek',
        available: false,
        defaultModel: 'deepseek-chat',
        displayName: 'DeepSeek',
        description: 'Ortam anahtarı bekleniyor',
      },
    ];
  }
}

/**
 * Run real multi-agent orchestration on server
 */
export async function runServerOrchestrator(
  targetKeyword: string,
  provider: 'gemini' | 'claude' | 'deepseek' = 'gemini',
  sources: any[] = []
): Promise<any> {
  const res = await fetch('/api/ai/run-orchestrator', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      targetKeyword,
      provider,
      sources,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Ajan Konsülü sunucu hatası (HTTP ${res.status})`);
  }

  return await res.json();
}

/**
 * Run real competitor research on server
 */
export async function runServerCompetitorResearch(
  keyword: string,
  competitorUrls: string[],
  sourcesText: string
): Promise<any> {
  const res = await fetch('/api/research/search-and-scrape', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      keyword,
      competitorUrls,
      sourcesText,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Araştırma hatası (HTTP ${res.status})`);
  }

  return await res.json();
}
