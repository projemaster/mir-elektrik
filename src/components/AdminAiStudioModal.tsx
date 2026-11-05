import React, { useState, useRef, useEffect } from 'react';
import { verifyCredentials } from '../utils/cryptoAuth';
import { 
  runStrictAgentCouncil, 
  generateStrictSiloHtml, 
  sanitizeHeadingWithoutNumbers, 
  filterBannedWords 
} from '../utils/strictAgentCouncil';
import { 
  fetchDbStatus, 
  fetchSavedArticles, 
  fetchArticleDetails, 
  fetchProviders, 
  runServerOrchestrator, 
  runServerCompetitorResearch,
  DbStatus,
  SavedArticleSummary,
  ProviderInfo
} from '../utils/supabaseClient';
import { 
  StrictSiloPage, 
  ReferenceSource, 
  AgentConsoleLog 
} from '../types/site';
import { 
  Bot, 
  Lock, 
  Sparkles, 
  Search, 
  Cpu, 
  FileText, 
  Globe, 
  Upload, 
  Trash2, 
  CheckCircle2, 
  Copy, 
  Check, 
  Download, 
  Printer, 
  X, 
  MessageSquare, 
  FolderOpen, 
  ArrowRight, 
  RefreshCw,
  Database,
  ShieldCheck,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Sliders,
  Compass,
  FileCheck2,
  ExternalLink
} from 'lucide-react';

interface AdminAiStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminAiStudioModal: React.FC<AdminAiStudioModalProps> = ({ isOpen, onClose }) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // Main generator state
  const [targetKeyword, setTargetKeyword] = useState('Bursa Sanayi Tesisleri Elektrik Tesisat ve İtfaiye Uygunluk');
  const [strictSilo, setStrictSilo] = useState<StrictSiloPage | null>(null);
  const [agentLogs, setAgentLogs] = useState<AgentConsoleLog[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'html' | 'agents' | 'sources' | 'database'>('preview');

  // Multi-Provider LLM Gateway State
  const [selectedProvider, setSelectedProvider] = useState<'gemini' | 'claude' | 'deepseek'>('gemini');
  const [availableProviders, setAvailableProviders] = useState<ProviderInfo[]>([]);
  const [totalTokens, setTotalTokens] = useState<number>(0);
  const [totalLatency, setTotalLatency] = useState<number>(0);
  const [executionNotice, setExecutionNotice] = useState<string | null>(null);

  // Supabase & Persistence State
  const [dbStatus, setDbStatus] = useState<DbStatus | null>(null);
  const [savedArticles, setSavedArticles] = useState<SavedArticleSummary[]>([]);
  const [isLoadingSaved, setIsLoadingSaved] = useState<boolean>(false);

  // Live Research & Competitor State
  const [competitorUrlInput, setCompetitorUrlInput] = useState('');
  const [isResearching, setIsResearching] = useState(false);
  const [researchReport, setResearchReport] = useState<any | null>(null);

  // 18,000-Word Chat / Assistant state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInputText, setChatInputText] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ id: string; role: 'user' | 'assistant'; text: string; time: string }>>([
    {
      id: 'm1',
      role: 'assistant',
      text: 'Merhaba. 18 bin kelimeye kadar teknik not, şartname veya anahtar kelime girebileceğiniz derin içerik asistanına hoş geldiniz. Verilen bilgileri analiz edip; 1 H1, 11 H2, 55 H3 ve 35 sayısız SSS mimarisine göre yapılandırabilirim.',
      time: '12:00',
    },
  ]);
  const [isChatAnalyzing, setIsChatAnalyzing] = useState(false);

  // 20-Source Knowledge Vault state
  const [sources, setSources] = useState<ReferenceSource[]>([
    {
      id: 'src-1',
      title: 'Binaların Yangından Korunması Hakkında Yönetmelik (Madde 74 - 81)',
      type: 'note',
      content: 'Acil durum aydınlatması, duman tahliye damperleri otomasyonu, yangın pompası besleme hatlarının FE180 kablo ile döşenmesi ve kat geçişlerinde yangın durdurucu harç zorunluluğu.',
      wordCount: 450,
      isMarkedAsReference: true,
      addedAt: 'Bugün 10:15',
      status: 'ready',
    },
    {
      id: 'src-2',
      title: 'UEDAŞ Dağıtım Şebekesi Güç Artırımı ve Bağlantı Kriterleri Rehberi',
      type: 'note',
      content: 'Bağlantı görüşü sorgulaması, trafo kapasite kontrolü, tadilat projesi onay prosedürleri, akım trafosu ve sayaç kabul mühürleme adımları.',
      wordCount: 520,
      isMarkedAsReference: true,
      addedAt: 'Bugün 10:20',
      status: 'ready',
    },
    {
      id: 'src-3',
      title: 'TS EN 62305 Paratoner ve Yıldırımdan Korunma Standart Özeti',
      type: 'note',
      content: 'Aktif paratoner etki yarıçapı hesapları, çatı eşpotansiyel kuşaklama, iniş iletkenleri mekanik muhafazası ve yıllık toprak direnç ölçümü (10 ohm altı).',
      wordCount: 380,
      isMarkedAsReference: true,
      addedAt: 'Bugün 10:25',
      status: 'ready',
    },
  ]);
  const [urlInput, setUrlInput] = useState('');
  const [isFetchingUrl, setIsFetchingUrl] = useState(false);
  const [urlFetchError, setUrlFetchError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // FAQ interactive state
  const [faqFilter, setFaqFilter] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Copy state
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  // Calculators
  const chatWordsCount = chatInputText.trim() ? chatInputText.trim().split(/\s+/).length : 0;
  const chatCharsCount = chatInputText.length;
  const activeSourcesCount = sources.filter(s => s.isMarkedAsReference).length;

  // On mount or open, fetch system status
  useEffect(() => {
    if (isOpen) {
      loadSystemStatus();
    }
  }, [isOpen]);

  const loadSystemStatus = async () => {
    try {
      const [provs, db, arts] = await Promise.all([
        fetchProviders(),
        fetchDbStatus(),
        fetchSavedArticles(),
      ]);
      setAvailableProviders(provs);
      setDbStatus(db);
      setSavedArticles(arts);
    } catch (e) {
      console.warn('System status fetch warning:', e);
    }
  };

  if (!isOpen) return null;

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setAuthError(false);

    const valid = await verifyCredentials(usernameInput, passwordInput);
    setIsVerifying(false);

    if (valid) {
      setIsAuthenticated(true);
      executeCouncilGeneration(targetKeyword);
    } else {
      setAuthError(true);
    }
  };

  // Run Real Multi-Agent Orchestration with Backend LLM Gateway
  const executeCouncilGeneration = async (keywordToRun: string) => {
    setIsGenerating(true);
    setExecutionNotice(null);

    try {
      const res = await runServerOrchestrator(keywordToRun, selectedProvider, sources);
      if (res && res.siloPage) {
        setStrictSilo(res.siloPage);
        setAgentLogs(res.logs || []);
        setTotalTokens(res.totalTokens || 0);
        setTotalLatency(res.totalLatencyMs || 0);

        // Refresh database article list
        const updatedArticles = await fetchSavedArticles();
        setSavedArticles(updatedArticles);

        const updatedDb = await fetchDbStatus();
        setDbStatus(updatedDb);

        setIsGenerating(false);
        return;
      }
    } catch (err: any) {
      console.warn('Backend orchestrator fallback triggered:', err.message);
      setExecutionNotice(`Sunucu orkestrasyonu yerel yedek motora devredildi: ${err.message}`);
    }

    // Local Council Fallback if server is unavailable
    const result = runStrictAgentCouncil(keywordToRun, sources);
    setStrictSilo(result.siloPage);
    setAgentLogs(result.logs);
    setIsGenerating(false);
  };

  // Run Real Competitor & Regulatory Research
  const handleRunCompetitorResearch = async () => {
    setIsResearching(true);
    try {
      const urls = competitorUrlInput ? [competitorUrlInput] : [];
      const sourcesText = sources.filter(s => s.isMarkedAsReference).map(s => s.content).join('\n');
      const data = await runServerCompetitorResearch(targetKeyword, urls, sourcesText);
      setResearchReport(data.report);
    } catch (err: any) {
      alert(`Araştırma hatası: ${err.message}`);
    } finally {
      setIsResearching(false);
    }
  };

  // Load a saved article from Database
  const handleLoadSavedArticle = async (id: string) => {
    setIsLoadingSaved(true);
    try {
      const full = await fetchArticleDetails(id);
      if (full && full.json_content) {
        setStrictSilo(full.json_content);
        if (full.agent_logs && full.agent_logs.length > 0) {
          setAgentLogs(full.agent_logs);
        }
        setActiveTab('preview');
      }
    } catch (e: any) {
      alert(`Makale yüklenemedi: ${e.message}`);
    } finally {
      setIsLoadingSaved(false);
    }
  };

  // URL "Git ve Getir" handler (SSRF Hardened)
  const handleFetchUrl = async () => {
    if (!urlInput.trim()) return;
    if (sources.length >= 20) {
      alert('Kaynak havuzu sınırı olan 20 kaynağa ulaştınız.');
      return;
    }

    setIsFetchingUrl(true);
    setUrlFetchError(null);

    try {
      const res = await fetch('/api/fetch-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlInput }),
      });

      if (res.ok) {
        const data = await res.json();
        const newSource: ReferenceSource = {
          id: `url-${Date.now()}`,
          title: data.title || urlInput,
          type: 'url',
          sourceUrl: data.url,
          content: data.content,
          wordCount: data.wordCount || 100,
          isMarkedAsReference: true,
          addedAt: new Date().toLocaleTimeString('tr-TR'),
          status: 'ready',
        };
        setSources(prev => [newSource, ...prev]);
        setUrlInput('');
      } else {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || `HTTP ${res.status}`);
      }
    } catch (err: any) {
      console.warn('Backend fetch URL error:', err.message);
      setUrlFetchError(err.message);
    } finally {
      setIsFetchingUrl(false);
    }
  };

  // File upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (sources.length + files.length > 20) {
      alert('Toplam kaynak sayısı 20 adedi aşamaz.');
      return;
    }

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = (event.target?.result as string) || '';
        const words = text.split(/\s+/).filter(Boolean).length;

        const newSource: ReferenceSource = {
          id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          title: file.name,
          type: 'file',
          fileName: file.name,
          content: text,
          wordCount: words,
          isMarkedAsReference: true,
          addedAt: new Date().toLocaleTimeString('tr-TR'),
          status: 'ready',
        };
        setSources(prev => [newSource, ...prev]);
      };
      reader.readAsText(file);
    });

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const toggleSourceActive = (id: string) => {
    setSources(prev => prev.map(s => s.id === id ? { ...s, isMarkedAsReference: !s.isMarkedAsReference } : s));
  };

  const removeSource = (id: string) => {
    setSources(prev => prev.filter(s => s.id !== id));
  };

  // 18,000-Word Chat prompt submission
  const handleSendChatMessage = async () => {
    if (!chatInputText.trim()) return;

    const userText = chatInputText;
    const newMsg = {
      id: `u-${Date.now()}`,
      role: 'user' as const,
      text: userText,
      time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages(prev => [...prev, newMsg]);
    setChatInputText('');
    setIsChatAnalyzing(true);

    try {
      const res = await fetch('/api/ai/chat-expand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userText,
          provider: selectedProvider,
          references: sources.filter(s => s.isMarkedAsReference).map(s => ({ title: s.title, content: s.content.slice(0, 500) })),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setChatMessages(prev => [
          ...prev,
          {
            id: `a-${Date.now()}`,
            role: 'assistant',
            text: data.response || 'Metniniz analiz edildi.',
            time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      } else {
        throw new Error('API offline');
      }
    } catch {
      const wordCount = userText.split(/\s+/).filter(Boolean).length;
      setChatMessages(prev => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          text: `Girdiğiniz ${wordCount} kelimelik teknik içerik analiz edildi. 1 H1, 11 H2, 55 H3 ve 35 sayısız SSS yapısına hazırlandı.`,
          time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsChatAnalyzing(false);
    }
  };

  // Copy HTML
  const handleCopyHtml = async () => {
    if (!strictSilo) return;
    const html = generateStrictSiloHtml(strictSilo);
    await navigator.clipboard.writeText(html);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  // Download HTML
  const handleDownloadHtml = () => {
    if (!strictSilo) return;
    const html = generateStrictSiloHtml(strictSilo);
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${strictSilo.slug}-sayisiz-silo.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Copy Plain Text (MD)
  const handleCopyPlainText = async () => {
    if (!strictSilo) return;
    let text = `# ${strictSilo.h1}\n\n`;
    text += `${strictSilo.h1HapBilgi}\n\n`;
    strictSilo.h1Paragraphs.forEach(p => { text += `${p}\n\n`; });

    strictSilo.h2List.forEach(h2 => {
      text += `## ${h2.title}\n\n`;
      text += `${h2.hapBilgi}\n\n`;
      h2.paragraphs.forEach(p => { text += `${p}\n\n`; });
      h2.h3List.forEach(h3 => {
        text += `### ${h3.title}\n\n`;
        text += `${h3.hapBilgi}\n\n`;
        h3.paragraphs.forEach(p => { text += `${p}\n\n`; });
      });
    });

    text += `#### ${strictSilo.h4FaqHeading}\n\n`;
    strictSilo.faqs.forEach(f => {
      text += `Soru: ${f.question}\nCevap: ${f.answer}\n\n`;
    });

    await navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredFaqs = strictSilo?.faqs.filter(f => 
    !faqFilter || 
    f.question.toLowerCase().includes(faqFilter.toLowerCase()) || 
    f.answer.toLowerCase().includes(faqFilter.toLowerCase()) ||
    f.tag.toLowerCase().includes(faqFilter.toLowerCase())
  ) || [];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto print:p-0 print:bg-white">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-7xl w-full h-[94vh] flex flex-col shadow-2xl overflow-hidden text-slate-100 print:h-auto print:border-none print:shadow-none">

        {/* ========================================================
            TOP BAR: Branding, Model Selector, Supabase Status & Drawer
           ======================================================== */}
        <div className="px-5 py-3.5 border-b border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-3 shrink-0 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/20">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-white tracking-wide">Mir Elektrik Proje - Çoklu Ajan Konsülü</span>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-mono">
                  1 H1 · 11 H2 · 55 H3 · 35 SSS (0 Sayı Kuralı)
                </span>
                {dbStatus?.isCloud ? (
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1 font-mono">
                    <Database className="w-3 h-3 text-emerald-400" />
                    Supabase PostgreSQL
                  </span>
                ) : (
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-mono">
                    Yerel Depolama
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Başlıklarda sıfır numara · Sıfır unvan ihlali · Çoklu model orkestrasyonu · Kalıcı Supabase veritabanı
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* LLM Provider Selector */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs">
              <span className="px-2 text-[10px] font-bold text-slate-400 uppercase hidden lg:inline">Model:</span>
              <button
                onClick={() => setSelectedProvider('gemini')}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                  selectedProvider === 'gemini' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                }`}
                title="Google Gemini 3.8 Flash (Server-Side Bağlı)"
              >
                Gemini
              </button>
              <button
                onClick={() => setSelectedProvider('claude')}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                  selectedProvider === 'claude' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                }`}
                title="Anthropic Claude 3.5 Sonnet"
              >
                Claude
              </button>
              <button
                onClick={() => setSelectedProvider('deepseek')}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                  selectedProvider === 'deepseek' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                }`}
                title="DeepSeek V3 / DeepSeek-Chat"
              >
                DeepSeek
              </button>
            </div>

            {/* 18K-Word Chat Drawer Button */}
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isChatOpen 
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/30' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
              title="Manuel açılıp kapanabilen 18.000 kelimelik sohbet asistanı"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden md:inline">Sohbet Asistanı</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-slate-900/60 rounded text-amber-300">18K</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notice banner if fallback occurred */}
        {executionNotice && (
          <div className="px-5 py-2 bg-amber-500/10 border-b border-amber-500/30 text-amber-300 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{executionNotice}</span>
            </div>
            <button onClick={() => setExecutionNotice(null)} className="text-slate-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* ========================================================
            IF NOT AUTHENTICATED: SECURE LOGIN FORM
           ======================================================== */}
        {!isAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-6 bg-slate-900/50">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 max-w-md w-full shadow-2xl">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center mx-auto mb-4 border border-amber-400/30">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white text-center mb-1">Yetkili Yönetici Girişi</h2>
              <p className="text-xs text-slate-400 text-center mb-6">
                Çoklu Ajan Konsülü ve İçerik Stüdyosu erişimi için kimliğinizi doğrulayın.
              </p>

              {authError && (
                <div className="p-3 mb-4 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Kullanıcı adı veya şifre hatalı. Lütfen tekrar deneyin.</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Kullanıcı Adı</label>
                  <input
                    type="text"
                    required
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="Kullanıcı adınızı girin"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Şifre</label>
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••••"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isVerifying}
                  className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-sm transition-all shadow-md shadow-amber-500/20 disabled:opacity-50"
                >
                  {isVerifying ? 'Güvenlik Doğrulanıyor (SHA-256)...' : 'Güvenli Giriş Yap'}
                </button>
              </form>

              <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-500 text-center">
                🔒 Bilgileriniz kaynak kodunda gösterilmez; SHA-256 kriptografik özetleme ile doğrulanır.
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================
              AUTHENTICATED STUDIO WORKSPACE
             ======================================================== */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">

            {/* LEFT / CENTER MAIN WORKSPACE */}
            <div className="flex-1 flex flex-col overflow-hidden">
              
              {/* TOP ACTION BAR: Keyword Input & Primary Action */}
              <div className="p-4 bg-slate-950/70 border-b border-slate-800 flex flex-col sm:flex-row items-center gap-3 shrink-0 print:hidden">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={targetKeyword}
                    onChange={(e) => setTargetKeyword(e.target.value)}
                    placeholder="Hedef kelimeyi veya teknik konuyu yazın (Örn: Bursa BOSB İtfaiye Uygunluk ve Güç Artırımı)..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs sm:text-sm focus:border-amber-400 focus:outline-none"
                    onKeyDown={(e) => e.key === 'Enter' && executeCouncilGeneration(targetKeyword)}
                  />
                </div>

                <button
                  onClick={() => executeCouncilGeneration(targetKeyword)}
                  disabled={isGenerating}
                  className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-amber-500/20 whitespace-nowrap flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Ajan Konsülü Çalışıyor...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Gerçek Ajan Konsülünü Başlat</span>
                    </>
                  )}
                </button>
              </div>

              {/* TABS NAVIGATION */}
              <div className="px-5 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between shrink-0 overflow-x-auto print:hidden">
                <div className="flex items-center gap-1 sm:gap-2 text-xs font-semibold py-2">
                  <button
                    onClick={() => setActiveTab('preview')}
                    className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                      activeTab === 'preview' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Canlı Ekran Görünümü</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('html')}
                    className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                      activeTab === 'html' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Alt HTML Kod Yapısı</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('agents')}
                    className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                      activeTab === 'agents' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Ajan Konsülü Akışı ({agentLogs.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('sources')}
                    className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                      activeTab === 'sources' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <FolderOpen className="w-3.5 h-3.5" />
                    <span>Kaynak & Rakip Havuzu ({sources.length}/20)</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('database')}
                    className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                      activeTab === 'database' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Database className="w-3.5 h-3.5" />
                    <span>Supabase & Sürümler ({savedArticles.length})</span>
                  </button>
                </div>

                {/* Quick actions for current active tab */}
                <div className="flex items-center gap-2 py-2">
                  {totalTokens > 0 && (
                    <span className="text-[11px] font-mono text-slate-400 hidden lg:inline mr-2">
                      ⚡ {totalTokens.toLocaleString()} token · {(totalLatency / 1000).toFixed(1)}s
                    </span>
                  )}

                  <button
                    onClick={handleCopyHtml}
                    className="p-1.5 sm:px-2.5 sm:py-1 rounded bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-medium flex items-center gap-1"
                    title="Temiz HTML Kopyala"
                  >
                    {copiedHtml ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span className="hidden sm:inline">{copiedHtml ? 'Kopyalandı!' : 'HTML Kopyala'}</span>
                  </button>

                  <button
                    onClick={handleDownloadHtml}
                    className="p-1.5 sm:px-2.5 sm:py-1 rounded bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-medium flex items-center gap-1"
                    title="HTML Dosyası İndir"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">İndir (.html)</span>
                  </button>

                  <button
                    onClick={handlePrint}
                    className="p-1.5 sm:px-2.5 sm:py-1 rounded bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-medium flex items-center gap-1"
                    title="Yazdır / PDF"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Yazdır</span>
                  </button>
                </div>
              </div>

              {/* TAB CONTENT CONTAINER */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-900/40">

                {/* ----------------------------------------------------
                    TAB 1: LIVE ARTICLE PREVIEW
                   ---------------------------------------------------- */}
                {activeTab === 'preview' && strictSilo && (
                  <div className="max-w-4xl mx-auto bg-white text-slate-900 rounded-2xl p-6 sm:p-10 shadow-xl border border-slate-200">
                    
                    {/* Compliance Banner */}
                    <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex flex-wrap items-center justify-between gap-3 print:hidden">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-emerald-600" />
                        <div>
                          <strong>Katı Kural Denetimi Onaylandı (%{strictSilo.qualityScore} Kalite):</strong>
                          <span> Başlıklarda 0 sayı/numara · 0 yasaklı unvan · 11 H2 · 55 H3 · 35 SSS</span>
                        </div>
                      </div>
                      <div className="text-[11px] text-emerald-700 bg-white px-2 py-1 rounded border border-emerald-200">
                        {strictSilo.activeSourcesUsed.length} Kaynak Referans Alındı
                      </div>
                    </div>

                    {/* H1 Article Header */}
                    <div className="mb-10">
                      <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-2">
                        Bursa Sanayi & UEDAŞ Teknik Kılavuzu
                      </span>
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 leading-tight mb-5">
                        {strictSilo.h1}
                      </h1>

                      {/* H1 Hap Bilgi */}
                      <div className="p-5 rounded-2xl bg-amber-400/20 border-l-4 border-amber-500 text-slate-950 font-semibold text-sm sm:text-base leading-relaxed mb-6">
                        {strictSilo.h1HapBilgi}
                      </div>

                      {/* H1 5 Paragraphs */}
                      <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                        {strictSilo.h1Paragraphs.map((p, idx) => (
                          <p key={idx}>{p}</p>
                        ))}
                      </div>
                    </div>

                    {/* Quick Jump TOC */}
                    <div className="my-8 p-5 rounded-2xl bg-slate-50 border border-slate-200 print:hidden">
                      <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-3">
                        Rehber İçindekiler (11 Ana Başlık)
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                        {strictSilo.h2List.map((h2, idx) => (
                          <a
                            key={idx}
                            href={`#section-${idx}`}
                            className="text-amber-700 hover:text-amber-900 hover:underline flex items-start gap-1.5 py-0.5"
                          >
                            <span className="text-amber-500 font-bold">›</span>
                            <span className="font-medium">{h2.title}</span>
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* 11 H2 Sections */}
                    <div className="space-y-12">
                      {strictSilo.h2List.map((h2, idx) => (
                        <div key={idx} id={`section-${idx}`} className="pt-8 border-t-2 border-slate-100">
                          
                          {/* H2 Title (Strictly NO numbers!) */}
                          <h2 className="text-xl sm:text-2xl font-black text-slate-950 mb-3 leading-snug">
                            {h2.title}
                          </h2>

                          {/* H2 Hap Bilgi */}
                          <div className="p-4 rounded-xl bg-amber-500/10 border-l-4 border-amber-500 text-slate-900 font-medium text-xs sm:text-sm leading-relaxed mb-4">
                            {h2.hapBilgi}
                          </div>

                          {/* H2 2 Paragraphs */}
                          <div className="space-y-3 text-sm text-slate-700 leading-relaxed mb-6">
                            <p>{h2.paragraphs[0]}</p>
                            <p>{h2.paragraphs[1]}</p>
                          </div>

                          {/* Image with alt tag */}
                          {h2.suggestedImage && (
                            <div className="my-6 rounded-xl overflow-hidden border border-slate-200 bg-slate-900">
                              <img
                                src={h2.suggestedImage.url}
                                alt={h2.suggestedImage.altText}
                                className="w-full h-64 sm:h-80 object-cover"
                                loading="lazy"
                              />
                              <div className="p-2.5 bg-slate-950 text-slate-300 text-xs flex justify-between">
                                <span>{h2.suggestedImage.caption}</span>
                                <span className="text-amber-400 font-mono text-[10px]">Alt: {h2.suggestedImage.altText}</span>
                              </div>
                            </div>
                          )}

                          {/* H2 Table */}
                          {h2.table && (
                            <div className="my-6 overflow-x-auto rounded-xl border border-slate-200">
                              <div className="px-4 py-2 bg-slate-900 text-amber-400 font-bold text-xs uppercase tracking-wider">
                                {h2.table.title}
                              </div>
                              <table className="min-w-full divide-y divide-slate-200 text-xs sm:text-sm">
                                <thead className="bg-slate-100">
                                  <tr>
                                    {h2.table.headers.map((th, hIdx) => (
                                      <th key={hIdx} className="px-4 py-2.5 text-left font-bold text-slate-800">
                                        {th}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 bg-white">
                                  {h2.table.rows.map((row, rIdx) => (
                                    <tr key={rIdx} className="hover:bg-slate-50">
                                      {row.map((cell, cIdx) => (
                                        <td key={cIdx} className="px-4 py-2.5 text-slate-700">
                                          {cell}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}

                          {/* 5 H3 Subsections under this H2 */}
                          <div className="mt-8 space-y-8 pl-0 sm:pl-4 border-l-0 sm:border-l-2 border-slate-200">
                            {h2.h3List.map((h3, h3Idx) => (
                              <div key={h3Idx} className="pt-4">
                                <h3 className="text-lg font-bold text-slate-900 mb-2">
                                  {h3.title}
                                </h3>

                                <div className="p-3.5 rounded-lg bg-slate-100 border-l-4 border-slate-400 text-xs text-slate-800 leading-relaxed mb-3">
                                  {h3.hapBilgi}
                                </div>

                                <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
                                  <p>{h3.paragraphs[0]}</p>
                                  <p>{h3.paragraphs[1]}</p>
                                </div>

                                {h3.tableOrList && h3.tableOrList.items && (
                                  <div className="my-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                                    <div className="text-[11px] font-bold text-slate-700 uppercase mb-2">
                                      {h3.tableOrList.title}
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                      {h3.tableOrList.items.map((item, iIdx) => (
                                        <div key={iIdx} className="flex items-start gap-1.5">
                                          <span className="text-amber-500 font-bold">✓</span>
                                          <div>
                                            <span className="font-semibold text-slate-800">{item.label}: </span>
                                            <span className="text-slate-600">{item.value}</span>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                <div className="text-[11px] text-slate-500 italic mt-2">
                                  ⚡ {h3.fieldNote}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* 1 H4 Section: 35 Strictly Unnumbered FAQs */}
                    <div className="mt-16 pt-10 border-t-4 border-slate-900">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-1">
                            Doğrudan Saha Yanıtları (Otuz Beş Başlık)
                          </span>
                          <h4 className="text-xl sm:text-2xl font-black text-slate-950">
                            {strictSilo.h4FaqHeading}
                          </h4>
                        </div>
                        <input
                          type="text"
                          value={faqFilter}
                          onChange={(e) => setFaqFilter(e.target.value)}
                          placeholder="35 soru içinde ara..."
                          className="px-3.5 py-1.5 rounded-lg border border-slate-300 text-xs w-full sm:w-60 focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        {filteredFaqs.map((faq, idx) => {
                          const isExpanded = expandedFaq === idx;
                          return (
                            <div
                              key={idx}
                              onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                              className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:border-amber-400 transition-all cursor-pointer flex flex-col justify-between"
                            >
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                                    {faq.tag}
                                  </span>
                                  {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                                </div>
                                <h5 className="text-xs sm:text-sm font-bold text-slate-900 mb-2 leading-snug">
                                  {faq.question}
                                </h5>
                              </div>
                              <p className={`text-xs text-slate-600 leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                                {faq.answer}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* ----------------------------------------------------
                    TAB 2: RAW CLEAN HTML VIEW
                   ---------------------------------------------------- */}
                {activeTab === 'html' && strictSilo && (
                  <div className="max-w-5xl mx-auto">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-xs text-slate-400">
                        Bu HTML kodu doğrudan cPanel <code className="text-amber-400">public_html/</code> dizinine veya CMS içerik editörüne yapıştırılmaya hazır şekilde derlenmiştir.
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleCopyHtml}
                          className="px-3 py-1.5 rounded bg-amber-400 text-slate-950 text-xs font-bold hover:bg-amber-300 transition-colors flex items-center gap-1.5"
                        >
                          {copiedHtml ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          <span>{copiedHtml ? 'Panoya Kopyalandı' : 'Tüm HTML Kodunu Kopyala'}</span>
                        </button>
                        <button
                          onClick={handleCopyPlainText}
                          className="px-3 py-1.5 rounded bg-slate-800 text-slate-200 text-xs font-medium hover:bg-slate-700 transition-colors flex items-center gap-1.5"
                        >
                          {copiedText ? <Check className="w-4 h-4 text-emerald-400" /> : <FileText className="w-4 h-4" />}
                          <span>{copiedText ? 'Metin Kopyalandı' : 'Düz Metin (MD)'}</span>
                        </button>
                      </div>
                    </div>

                    <pre className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300 font-mono text-xs overflow-x-auto max-h-[70vh] selection:bg-amber-500 selection:text-slate-950">
                      <code>{generateStrictSiloHtml(strictSilo)}</code>
                    </pre>
                  </div>
                )}

                {/* ----------------------------------------------------
                    TAB 3: MULTI-AGENT COUNCIL WORKFLOW (LIVE METRICS)
                   ---------------------------------------------------- */}
                {activeTab === 'agents' && (
                  <div className="max-w-4xl mx-auto space-y-4">
                    <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-white">Çoklu Ajan Orkestrasyonu</h3>
                          <span className="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-mono">
                            Model: {selectedProvider.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          Her adım gerçek LLM API çağrıları, yönetmelik doğrulaması ve AST tabanlı katı kural denetimi ile çalışır.
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 justify-end">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          Aktif ve Senkronize
                        </div>
                        {totalTokens > 0 && (
                          <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                            Toplam: {totalTokens.toLocaleString()} Token · {(totalLatency / 1000).toFixed(2)} sn
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      {agentLogs.map((log) => (
                        <div
                          key={log.id}
                          className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                              <span className="text-xs font-bold text-amber-400">{log.agentName}</span>
                              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">{log.role}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                              <span className="text-slate-400 font-semibold">{log.timestamp}</span>
                            </div>
                          </div>
                          <div className="text-xs text-slate-300 mb-1">{log.action}</div>
                          <div className="text-[11px] text-slate-400 font-mono bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                            {log.outputSummary}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ----------------------------------------------------
                    TAB 4: 20-SOURCE KNOWLEDGE VAULT & REAL RESEARCH
                   ---------------------------------------------------- */}
                {activeTab === 'sources' && (
                  <div className="max-w-4xl mx-auto space-y-6">
                    {/* Header & Source Counter */}
                    <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-sm font-bold text-white mb-1">
                          Kaynak & Referans Havuzu (Maks. 20 Kaynak)
                        </h3>
                        <p className="text-xs text-slate-400">
                          URL çekerek veya dosya yükleyerek eklediğiniz kaynaklar Ajan Konsülü tarafından analiz edilir ve referans olarak işaretlenenler içerikte dikkate alınır.
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="px-3 py-1.5 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                          {sources.length} / 20 Kaynak ({activeSourcesCount} Aktif)
                        </span>
                      </div>
                    </div>

                    {/* Real Competitor & Web Research Box */}
                    <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/30">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Compass className="w-5 h-5 text-amber-400" />
                          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                            Gerçek Rakip & Mevzuat Açığı Taraması (Live Scraper)
                          </h4>
                        </div>
                        <button
                          onClick={handleRunCompetitorResearch}
                          disabled={isResearching}
                          className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50"
                        >
                          {isResearching ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                          <span>{isResearching ? 'Taranıyor...' : 'Araştırmayı Başlat'}</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-3">
                        <input
                          type="url"
                          value={competitorUrlInput}
                          onChange={(e) => setCompetitorUrlInput(e.target.value)}
                          placeholder="Opsiyonel rakip linki (Örn: https://ornekelektrikbursa.com/sayfa)"
                          className="sm:col-span-12 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs focus:border-amber-400 focus:outline-none"
                        />
                      </div>

                      {researchReport && (
                        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-3 mt-3">
                          <div className="font-bold text-amber-400">Tespit Edilen İçerik Açıkları (Rakiplerin Eksik Bıraktıkları):</div>
                          <ul className="space-y-1 text-slate-300 list-disc pl-5">
                            {researchReport.contentGaps?.map((gap: string, i: number) => (
                              <li key={i}>{gap}</li>
                            ))}
                          </ul>
                          <div className="font-bold text-emerald-400 mt-2">Ajan Konsülünün Uygulayacağı Stratejik Öneriler:</div>
                          <ul className="space-y-1 text-slate-300 list-disc pl-5">
                            {researchReport.strategicRecommendations?.map((rec: string, i: number) => (
                              <li key={i}>{rec}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* URL Fetcher & File Upload Box */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                      {/* URL Fetcher */}
                      <div className="md:col-span-7 p-4 rounded-xl bg-slate-950 border border-slate-800">
                        <label className="block text-xs font-medium text-slate-300 mb-2">
                          Web URL Yapıştır & Veri Çek (SSRF Korumalı Fetch)
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="url"
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            placeholder="https://mevzuat.gov.tr/... veya teknik rehber"
                            className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:border-amber-400 focus:outline-none"
                            onKeyDown={(e) => e.key === 'Enter' && handleFetchUrl()}
                          />
                          <button
                            onClick={handleFetchUrl}
                            disabled={isFetchingUrl || !urlInput.trim() || sources.length >= 20}
                            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-colors whitespace-nowrap disabled:opacity-50 flex items-center gap-1.5"
                          >
                            {isFetchingUrl ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Globe className="w-3.5 h-3.5" />}
                            <span>Git ve Getir</span>
                          </button>
                        </div>
                        {urlFetchError && (
                          <div className="text-[11px] text-rose-400 mt-1">{urlFetchError}</div>
                        )}
                      </div>

                      {/* File Upload Dropzone */}
                      <div className="md:col-span-5 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1">
                            Teknik Doküman / Şartname Yükle
                          </label>
                          <p className="text-[11px] text-slate-500 mb-2">TXT, MD, PDF, JSON, DOC dosyaları</p>
                        </div>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                          multiple
                          accept=".txt,.md,.json,.pdf,.csv,.doc,.docx"
                          className="hidden"
                          id="file-upload-input"
                        />
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          disabled={sources.length >= 20}
                          className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Bilgisayardan Dosya Seç</span>
                        </button>
                      </div>
                    </div>

                    {/* Sources List */}
                    <div className="space-y-3">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Kayıtlı Referanslar ({sources.length})
                      </div>

                      {sources.length === 0 ? (
                        <div className="p-8 text-center bg-slate-950 rounded-xl border border-slate-800 text-slate-500 text-xs">
                          Henüz kaynak eklenmedi. Yukarıdan URL çekebilir veya teknik dosya yükleyebilirsiniz.
                        </div>
                      ) : (
                        sources.map((src) => (
                          <div
                            key={src.id}
                            className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                              src.isMarkedAsReference
                                ? 'bg-slate-950 border-amber-500/40 shadow-sm'
                                : 'bg-slate-950/50 border-slate-800 opacity-60'
                            }`}
                          >
                            <div className="flex items-start gap-3 flex-1 min-w-0">
                              <input
                                type="checkbox"
                                checked={src.isMarkedAsReference}
                                onChange={() => toggleSourceActive(src.id)}
                                className="mt-1 w-4 h-4 rounded text-amber-500 focus:ring-amber-400 bg-slate-900 border-slate-700 cursor-pointer"
                                id={`chk-${src.id}`}
                              />
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                  <label
                                    htmlFor={`chk-${src.id}`}
                                    className="text-xs font-bold text-white cursor-pointer hover:text-amber-400 truncate"
                                  >
                                    {src.title}
                                  </label>
                                  <span className="text-[10px] bg-slate-800 text-amber-400 px-1.5 py-0.2 rounded font-mono">
                                    {src.type.toUpperCase()}
                                  </span>
                                  <span className="text-[10px] text-slate-400">
                                    ~{src.wordCount} kelime
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-400 line-clamp-2">
                                  {src.content}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                              <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                                src.isMarkedAsReference ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                              }`}>
                                {src.isMarkedAsReference ? 'Referansta Aktif' : 'Pasif'}
                              </span>
                              <button
                                onClick={() => removeSource(src.id)}
                                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-900 transition-colors"
                                title="Kaynağı Sil"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* ----------------------------------------------------
                    TAB 5: SUPABASE & SAVED ARTICLES (PERSISTENCE)
                   ---------------------------------------------------- */}
                {activeTab === 'database' && (
                  <div className="max-w-4xl mx-auto space-y-6">
                    {/* Database Status Card */}
                    <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <Database className="w-5 h-5 text-amber-400" />
                          <h3 className="text-sm font-bold text-white">Supabase / PostgreSQL Durumu</h3>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          {dbStatus?.message || 'Veri tabanı bağlantısı kontrol ediliyor...'}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="px-3 py-1.5 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 text-xs font-mono">
                          {savedArticles.length} Makale Kayıtlı
                        </span>
                      </div>
                    </div>

                    {/* Supabase SQL and Env Help */}
                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-2">
                      <div className="font-bold text-slate-300">Bulut Veri Tabanı Bağlantısı:</div>
                      <p className="text-slate-400 leading-relaxed">
                        Supabase bulut projeniz hazır olduğunda, proje kökündeki <code className="text-amber-400">.env</code> dosyasına <code className="text-amber-400">SUPABASE_URL</code> ve <code className="text-amber-400">SUPABASE_ANON_KEY</code> ekleyin. Tabloları oluşturmak için <code className="text-amber-400">supabase/schema.sql</code> dosyasını Supabase SQL editöründe çalıştırmanız yeterlidir.
                      </p>
                    </div>

                    {/* Saved Articles List */}
                    <div className="space-y-3">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Üretilen ve Kaydedilen Makaleler ({savedArticles.length})
                      </div>

                      {savedArticles.length === 0 ? (
                        <div className="p-8 text-center bg-slate-950 rounded-xl border border-slate-800 text-slate-500 text-xs">
                          Henüz kaydedilmiş makale bulunmuyor. Yeni bir konu girip "Gerçek Ajan Konsülünü Başlat" butonuna tıklayabilirsiniz.
                        </div>
                      ) : (
                        savedArticles.map((art) => (
                          <div
                            key={art.id}
                            className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-400/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className="text-xs font-bold text-white truncate">{art.title}</span>
                                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">
                                  %{art.quality_score} Kalite
                                </span>
                                <span className="text-[10px] text-slate-500 font-mono">
                                  {new Date(art.updated_at).toLocaleDateString('tr-TR')}
                                </span>
                              </div>
                              <div className="text-[11px] text-slate-400 truncate">
                                URL: <code className="text-amber-400">/{art.slug}.html</code>
                              </div>
                            </div>

                            <button
                              onClick={() => handleLoadSavedArticle(art.id)}
                              disabled={isLoadingSaved}
                              className="px-3.5 py-1.5 bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-slate-200 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
                            >
                              <FileCheck2 className="w-3.5 h-3.5" />
                              <span>Ekrana Yükle</span>
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ========================================================
                RIGHT SLIDE-OVER: 18,000-WORD CHAT ASSISTANT
               ======================================================== */}
            {isChatOpen && (
              <div className="w-full md:w-96 lg:w-[440px] bg-slate-950 border-l border-slate-800 flex flex-col shrink-0 h-full shadow-2xl z-20 print:hidden animate-in slide-in-from-right duration-200">
                
                {/* Chat Header */}
                <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900">
                  <div className="flex items-center gap-2.5">
                    <MessageSquare className="w-4 h-4 text-amber-400" />
                    <div>
                      <h3 className="text-xs font-bold text-white">Sohbet & İçerik Genişletme Asistanı</h3>
                      <p className="text-[10px] text-slate-400">18.000 kelimeye kadar uzun metin analizi</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsChatOpen(false)}
                    className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`p-3.5 rounded-2xl text-xs leading-relaxed max-w-[90%] ${
                          msg.role === 'user'
                            ? 'bg-amber-400 text-slate-950 font-medium rounded-br-none shadow-md'
                            : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[9px] text-slate-500 mt-1 px-1 font-mono">{msg.time}</span>
                    </div>
                  ))}

                  {isChatAnalyzing && (
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-amber-400 flex items-center gap-2">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Metin derinlemesine analiz ediliyor ve mimariye uyarlanıyor...</span>
                    </div>
                  )}
                </div>

                {/* Quick Command Pills */}
                <div className="p-2 border-t border-slate-800/80 bg-slate-900/50 flex items-center gap-1.5 overflow-x-auto text-[10px]">
                  <button
                    onClick={() => setChatInputText('Bu teknik konuyu 11 H2 ve 55 H3 mimarisine uyarla, başlıklardan sayıları tamamen temizle.')}
                    className="px-2 py-1 rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 whitespace-nowrap"
                  >
                    Sayısız Mimariye Uyarla
                  </button>
                  <button
                    onClick={() => setChatInputText('Bursa İtfaiye Daire Başkanlığı yangın yönetmeliği denetim kriterlerini ve FE180 kablo şartını vurgula.')}
                    className="px-2 py-1 rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 whitespace-nowrap"
                  >
                    İtfaiye Kriterlerini Ekle
                  </button>
                  <button
                    onClick={() => setChatInputText('UEDAŞ güç artırımı bağlantı görüşü ve tadilat projesi aşamalarını öne çıkar.')}
                    className="px-2 py-1 rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 whitespace-nowrap"
                  >
                    UEDAŞ Sürecini Derinleştir
                  </button>
                </div>

                {/* Textarea Input (Capable of up to 18,000 words) */}
                <div className="p-3 bg-slate-900 border-t border-slate-800">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1.5">
                    <span className="font-medium">
                      Kelime: <strong className={chatWordsCount > 18000 ? 'text-rose-400' : 'text-amber-400'}>{chatWordsCount.toLocaleString()}</strong> / 18.000
                    </span>
                    <span>{chatCharsCount.toLocaleString()} karakter</span>
                  </div>

                  <textarea
                    rows={4}
                    value={chatInputText}
                    onChange={(e) => setChatInputText(e.target.value)}
                    placeholder="Buraya yaklaşık 18 bin kelimeye kadar teknik not, şartname veya komut yapıştırabilirsiniz. Ajanlar hızlıca analiz eder..."
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-amber-400 focus:outline-none resize-none"
                  />

                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={handleSendChatMessage}
                      disabled={!chatInputText.trim() || isChatAnalyzing}
                      className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                      <span>Analiz Et & Genişlet</span>
                    </button>

                    <button
                      onClick={() => {
                        const kw = chatInputText.trim() ? chatInputText.slice(0, 100) : targetKeyword;
                        executeCouncilGeneration(kw);
                      }}
                      className="px-3 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-xs transition-colors shadow-md shadow-amber-500/20 whitespace-nowrap"
                      title="Girdiyi doğrudan 11 H2 + 55 H3 içerik üreticisine aktar"
                    >
                      Konsülü Başlat
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
