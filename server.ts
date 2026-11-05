import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { safeFetchHtml, requireAdminAuth } from './server/security.js';
import { getProviderStatus, executeLlmCall } from './server/llmGateway.js';
import { scrapeAndAnalyzeUrl, runDeepCompetitorResearch, extractCleanTextFromHtml } from './server/webResearch.js';
import { getDbStatus, listArticlesFromDb, getArticleById } from './server/supabaseService.js';
import { runRealAgentOrchestration } from './server/agentOrchestrator.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // =========================================================================
  // API 1: PROVIDER HEALTH & STATUS
  // =========================================================================
  app.get('/api/ai/providers', (_req, res) => {
    try {
      const providers = getProviderStatus();
      return res.json({ success: true, providers });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  // =========================================================================
  // API 2: DATABASE & SUPABASE STATUS
  // =========================================================================
  app.get('/api/database/status', (_req, res) => {
    try {
      const status = getDbStatus();
      return res.json({ success: true, ...status });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  app.get('/api/database/articles', async (_req, res) => {
    try {
      const articles = await listArticlesFromDb();
      return res.json({ success: true, articles });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  app.get('/api/database/articles/:id', async (req, res) => {
    try {
      const article = await getArticleById(req.params.id);
      if (!article) return res.status(404).json({ error: 'Makale bulunamadı' });
      return res.json({ success: true, article });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  // =========================================================================
  // API 3: HARDENED URL FETCH (SSRF PROTECTED)
  // =========================================================================
  app.post('/api/fetch-url', async (req, res) => {
    try {
      const { url } = req.body;
      if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: 'Geçersiz URL parametresi' });
      }

      console.log(`[SafeFetch] Fetching URL: ${url}`);
      const { html, finalUrl } = await safeFetchHtml(url);
      const extracted = extractCleanTextFromHtml(html);

      return res.json({
        success: true,
        url: finalUrl,
        title: extracted.title,
        metaDescription: extracted.metaDescription,
        content: extracted.text,
        wordCount: extracted.wordCount,
      });
    } catch (err: any) {
      console.error('[SafeFetch] Error:', err.message);
      return res.status(400).json({
        error: `URL içeriği alınamadı: ${err.message}`,
      });
    }
  });

  // =========================================================================
  // API 4: REAL WEB RESEARCH & COMPETITOR SCRAPING
  // =========================================================================
  app.post('/api/research/search-and-scrape', async (req, res) => {
    try {
      const { keyword, competitorUrls, sourcesText } = req.body;
      if (!keyword) {
        return res.status(400).json({ error: 'Hedef anahtar kelime gerekli.' });
      }

      console.log(`[Research] Running deep competitor research for: ${keyword}`);
      const report = await runDeepCompetitorResearch(keyword, competitorUrls || [], sourcesText || '');
      return res.json({ success: true, report });
    } catch (err: any) {
      console.error('[Research] Error:', err.message);
      return res.status(500).json({ error: err.message });
    }
  });

  // =========================================================================
  // API 5: REAL MULTI-AGENT ORCHESTRATION PIPELINE
  // =========================================================================
  app.post('/api/ai/run-orchestrator', async (req, res) => {
    try {
      const { targetKeyword, provider, sources } = req.body;
      if (!targetKeyword || typeof targetKeyword !== 'string') {
        return res.status(400).json({ error: 'Hedef anahtar kelime girilmedi.' });
      }

      console.log(`[Orchestrator] Running real multi-agent pipeline for "${targetKeyword}" using provider: ${provider || 'auto'}`);
      const result = await runRealAgentOrchestration({
        targetKeyword,
        provider,
        sources,
      });

      return res.json({
        success: true,
        ...result,
      });
    } catch (err: any) {
      console.error('[Orchestrator] Execution failed:', err);
      return res.status(500).json({
        error: `Ajan Konsülü çalıştırma hatası: ${err.message}`,
      });
    }
  });

  // =========================================================================
  // API 6: 18,000-WORD CHAT ASSISTANT
  // =========================================================================
  app.post('/api/ai/chat-expand', async (req, res) => {
    try {
      const { prompt, references, provider } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: 'Komut veya metin girilmedi.' });
      }

      const sysInstruction = `Sen Bursa sanayi ve UEDAŞ bölgesinde 18 yıldır faaliyet gösteren Mir Elektrik Proje Ofisi'nin Baş Teknik Stratejist ve İçerik Mimarı Ajanısın.
KESİN KURALLAR:
1. 'Mühendis', 'Mühendislik Bürosu', '%100 garanti', 'anahtar teslim' kelimelerini KESİNLİKLE KULLANMA.
2. Hiçbir başlıkta (H1, H2, H3, H4) ve SSS sorusunda ASLA sayı veya numara (01, 1., Madde 1 vb.) kullanma.
3. Usta teknik dili koru, yapay zeka ezberinden uzak, doğrudan saha gerçeklerini aktar.
4. Girdideki teknik notları 1 H1, 11 H2, 55 H3 ve 35 SSS mimarisine uyumlu derin içerik parçalarına genişlet.`;

      const response = await executeLlmCall({
        provider: provider || 'gemini',
        prompt: `Kullanıcı Teknik Girdisi:\n${prompt}\n\nAktif Referanslar:\n${JSON.stringify(references || [])}`,
        systemInstruction: sysInstruction,
        maxTokens: 2000,
      });

      return res.json({
        success: true,
        provider: response.providerUsed,
        model: response.modelUsed,
        tokensUsed: response.tokensUsed,
        latencyMs: response.latencyMs,
        response: response.text,
        fallbackTriggered: response.fallbackTriggered,
        notes: response.notes,
      });
    } catch (err: any) {
      console.error('[Chat] Error:', err.message);
      return res.status(500).json({ error: err.message });
    }
  });

  // =========================================================================
  // VITE DEV SERVER OR STATIC PRODUCTION BUILD
  // =========================================================================
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite middleware mounted in dev mode');
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
