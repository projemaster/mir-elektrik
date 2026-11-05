-- =========================================================================
-- MİR ELEKTRİK PROJE OFİSİ - SUPABASE VERİ TABANI MİMARİSİ
-- Çoklu Ajan Konsülü, Kaynak Havuzu, Makale Sürümleri ve Güvenlik
-- =========================================================================

-- 1. Projeler Tablosu (Mir Elektrik Kurumsal Projeleri)
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  domain TEXT NOT NULL DEFAULT 'mirelektrikproje.com',
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Kaynak & Referans Havuzu Tablosu (20 Kaynak Hafızası)
CREATE TABLE IF NOT EXISTS sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('url', 'file', 'note')),
  source_url TEXT,
  file_name TEXT,
  content TEXT NOT NULL,
  word_count INTEGER NOT NULL DEFAULT 0,
  is_marked_as_reference BOOLEAN NOT NULL DEFAULT true,
  status TEXT NOT NULL DEFAULT 'ready' CHECK (status IN ('ready', 'loading', 'error')),
  added_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Üretilen Silo Makaleleri Tablosu (1 H1 + 11 H2 + 55 H3 + 35 SSS)
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  target_keyword TEXT NOT NULL,
  h1 TEXT NOT NULL,
  json_content JSONB NOT NULL,
  html_content TEXT NOT NULL,
  quality_score INTEGER NOT NULL DEFAULT 95,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'auditing', 'revision', 'published')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Makale Sürüm Geçmişi (Her Ajan Revizyonunun Snapshot'ı)
CREATE TABLE IF NOT EXISTS article_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL DEFAULT 1,
  json_content JSONB NOT NULL,
  html_content TEXT NOT NULL,
  change_summary TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. Ajan Konsülü Denetim ve Görev Günlükleri (Tokens, Latency, Model)
CREATE TABLE IF NOT EXISTS agent_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  agent_id TEXT NOT NULL,
  agent_name TEXT NOT NULL,
  role TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'running', 'completed', 'revision')),
  model_used TEXT NOT NULL,
  provider_used TEXT NOT NULL,
  tokens_used INTEGER NOT NULL DEFAULT 0,
  latency_ms INTEGER NOT NULL DEFAULT 0,
  action TEXT NOT NULL,
  output_summary TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- İndeksler (Hızlı Sorgulama)
CREATE INDEX IF NOT EXISTS idx_sources_project ON sources(project_id);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_versions_article ON article_versions(article_id);
CREATE INDEX IF NOT EXISTS idx_logs_article ON agent_logs(article_id);

-- Row Level Security (RLS) Etkinleştirme
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_logs ENABLE ROW LEVEL SECURITY;

-- Varsayılan RLS Politikaları (Anonim/Servis Erişimi İçin)
CREATE POLICY "Allow public read-write for Mir Elektrik Admin" ON projects FOR ALL USING (true);
CREATE POLICY "Allow public read-write for sources" ON sources FOR ALL USING (true);
CREATE POLICY "Allow public read-write for articles" ON articles FOR ALL USING (true);
CREATE POLICY "Allow public read-write for versions" ON article_versions FOR ALL USING (true);
CREATE POLICY "Allow public read-write for logs" ON agent_logs FOR ALL USING (true);
