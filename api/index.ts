import express from 'express';
import dotenv from 'dotenv';
import { safeFetchHtml } from '../server/security.js';
import { getProviderStatus, executeLlmCall } from '../server/llmGateway.js';
import { runDeepCompetitorResearch, extractCleanTextFromHtml } from '../server/webResearch.js';
import { getDbStatus, listArticlesFromDb, getArticleById } from '../server/supabaseService.js';
import { runRealAgentOrchestration } from '../server/agentOrchestrator.js';

dotenv.config();

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.get('/api/ai/providers', (_req, res) => {
  try {
    const providers = getProviderStatus();
    return res.json({ success: true, providers });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

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

app.post('/api/fetch-url', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'Geçersiz URL' });
    }
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
    return res.status(400).json({ error: err.message });
  }
});

app.post('/api/research/search-and-scrape', async (req, res) => {
  try {
    const { keyword, competitorUrls, sourcesText } = req.body;
    const report = await runDeepCompetitorResearch(keyword, competitorUrls || [], sourcesText || '');
    return res.json({ success: true, report });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

app.post('/api/ai/run-orchestrator', async (req, res) => {
  try {
    const { targetKeyword, provider, sources } = req.body;
    const result = await runRealAgentOrchestration({
      targetKeyword,
      provider,
      sources,
    });
    return res.json({ success: true, ...result });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

app.post('/api/ai/chat-expand', async (req, res) => {
  try {
    const { prompt, references, provider } = req.body;
    const response = await executeLlmCall({
      provider: provider || 'gemini',
      prompt: `Kullanıcı Teknik Girdisi:\n${prompt}\n\nAktif Referanslar:\n${JSON.stringify(references || [])}`,
      systemInstruction: `Sen Bursa sanayi ve UEDAŞ bölgesinde faaliyet gösteren Mir Elektrik Proje Ofisi teknik danışmanısın. Yasaklı kelimeleri (mühendis, mühendislik, %100 garanti, anahtar teslim) ve başlıklarda sayıları asla kullanma.`,
      maxTokens: 2000,
    });
    return res.json({
      success: true,
      provider: response.providerUsed,
      model: response.modelUsed,
      tokensUsed: response.tokensUsed,
      latencyMs: response.latencyMs,
      response: response.text,
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export default app;
