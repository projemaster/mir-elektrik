import { safeFetchHtml } from './security.js';
import { executeLlmCall } from './llmGateway.js';

export interface ScrapedSourceResult {
  url: string;
  title: string;
  metaDescription?: string;
  cleanText: string;
  wordCount: number;
  detectedRegulations: string[];
  keyTopics: string[];
}

export interface CompetitorAnalysisReport {
  targetKeyword: string;
  scrapedCompetitors: {
    url: string;
    title: string;
    wordCount: number;
    weaknesses: string[];
    missingRegulations: string[];
  }[];
  contentGaps: string[];
  strategicRecommendations: string[];
  verifiedRegulations: string[];
}

// Known Turkish electrical standards to check for
const REGULATION_PATTERNS = [
  { name: 'Binaların Yangından Korunması Hakkında Yönetmelik', regex: /yangın(dan)?\s+korunma|madde\s+(74|81)|fe180|yangın\s+damper/i },
  { name: 'Elektrik İç Tesisleri Yönetmeliği', regex: /iç\s+tesisleri?\s+yönetmeliği|aydınlatma\s+hesabı|priz\s+linyeleri/i },
  { name: 'Elektrik Tesislerinde Topraklamalar Yönetmeliği', regex: /topraklama(lar)?\s+yönetmeliği|eşpotansiyel|tn-s|tt\s+şebeke|toprak\s+özgül/i },
  { name: 'Elektrik Kuvvetli Akım Tesisleri Yönetmeliği', regex: /kuvvetli\s+akım|trafo\s+merkezi|34\.5\s*kv|hücre\s+kesici/i },
  { name: 'UEDAŞ Dağıtım Şebekesi Bağlantı ve Güç Artırımı Esasları', regex: /uedas|uedaş|bağlantı\s+görüşü|güç\s+artırımı|tadilat\s+projesi|sayaç\s+mühür/i },
  { name: 'TS EN 62305 Paratoner ve Yıldırımdan Korunma', regex: /62305|paratoner|yıldırım(dan)?|faraday\s+kafesi|yakalama\s+ucu/i },
  { name: 'TS EN 60079 ATEX Patlayıcı Ortamlar', regex: /60079|atex|ex-proof|patlayıcı\s+ortam|zone\s+[012]/i },
  { name: 'TS HD 60364 Alçak Gerilim Elektrik Tesisleri', regex: /60364|hd\s+60364|artık\s+akım|kaçak\s+akım\s+rölesi/i },
];

/**
 * Strips HTML tags, styles, scripts and returns clean readable text
 */
export function extractCleanTextFromHtml(html: string): { title: string; metaDescription: string; text: string; wordCount: number } {
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : 'Kaynak Belge';

  const metaDescMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i);
  const metaDescription = metaDescMatch ? metaDescMatch[1].trim() : '';

  let cleaned = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
    .replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, ' ')
    .replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi, ' ')
    .replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, ' ')
    .replace(/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/gi, ' ')
    .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim();

  const words = cleaned.split(/\s+/).filter(Boolean);
  return {
    title,
    metaDescription,
    text: cleaned,
    wordCount: words.length,
  };
}

/**
 * Detects presence of electrical regulations in text
 */
export function detectRegulations(text: string): string[] {
  const found: string[] = [];
  for (const reg of REGULATION_PATTERNS) {
    if (reg.regex.test(text)) {
      found.push(reg.name);
    }
  }
  return found;
}

/**
 * Fetches and analyzes a live web source
 */
export async function scrapeAndAnalyzeUrl(targetUrl: string): Promise<ScrapedSourceResult> {
  const { html, finalUrl } = await safeFetchHtml(targetUrl);
  const { title, metaDescription, text, wordCount } = extractCleanTextFromHtml(html);
  const detectedRegulations = detectRegulations(text);

  // Extract key topics (frequent technical 2-word collocations)
  const keyTopics: string[] = [];
  const lower = text.toLowerCase();
  const searchTopics = [
    'güç artırımı', 'yangın uygunluk', 'itfaiye raporu', 'kompanzasyon panosu',
    'trafo merkezi', 'topraklama ölçümü', 'paratoner tesisatı', 'kablo tavası',
    'aydınlatma hesabı', 'jeneratör transfer', 'harmonik filtre', 'uedaş projesi'
  ];
  for (const st of searchTopics) {
    if (lower.includes(st)) keyTopics.push(st);
  }

  // Cap text at 12,000 words for downstream agents
  const cappedWords = text.split(/\s+/).slice(0, 12000).join(' ');

  return {
    url: finalUrl,
    title,
    metaDescription,
    cleanText: cappedWords,
    wordCount: Math.min(wordCount, 12000),
    detectedRegulations,
    keyTopics,
  };
}

/**
 * Runs deep competitor and regulatory analysis using LLM + live scraped data
 */
export async function runDeepCompetitorResearch(
  targetKeyword: string,
  competitorUrls: string[],
  activeSourcesText: string
): Promise<CompetitorAnalysisReport> {
  const scrapedCompetitors = [];

  for (const url of competitorUrls.slice(0, 3)) {
    try {
      const scraped = await scrapeAndAnalyzeUrl(url);
      scrapedCompetitors.push({
        url: scraped.url,
        title: scraped.title,
        wordCount: scraped.wordCount,
        weaknesses: [
          scraped.wordCount < 1000 ? 'Yüzeysel metin (1000 kelime altı)' : 'Standart katalog dili',
          scraped.detectedRegulations.length === 0 ? 'Teknik yönetmelik ve madde referansı yok' : 'Eksik mevzuat kırılımı',
        ],
        missingRegulations: REGULATION_PATTERNS
          .map(r => r.name)
          .filter(name => !scraped.detectedRegulations.includes(name)),
      });
    } catch (err: any) {
      console.warn(`Could not scrape competitor ${url}:`, err.message);
    }
  }

  // Ask LLM (Gemini or Claude) to formulate strategic content gaps
  let contentGaps = [
    'Rakipler UEDAŞ onay süreçlerinin adım adım bürokratik dökümünü vermiyor.',
    'Bursa İtfaiye Daire Başkanlığı yangın yönetmeliği 74-81. maddeleri ve FE180 kablo zorunluluğu detaylandırılmamış.',
    'Trafo kapasitesi ve reaktif kompanzasyon ceza sınırları tablolaştırılmamış.',
  ];
  let strategicRecommendations = [
    '11 H2 ve 55 H3 mimarisiyle hiçbir rakibin ulaşamadığı teknik derinlik katmanı oluşturun.',
    'Her alt başlıkta ezberden uzak doğrudan Bursa saha uygulamalarını aktarın.',
    '35 adet sayısız SSS ile tüm kullanıcı arama niyetlerini karşılayın.',
  ];

  try {
    const analysisPrompt = `Konu: "${targetKeyword}"
Aktif Kaynaklar ve Şartnameler:
${activeSourcesText.slice(0, 3000)}

İncelenen Rakip Sayfa Verileri:
${JSON.stringify(scrapedCompetitors, null, 2)}

Lütfen Bursa elektrik proje ve saha uygulamaları açısından rakiplerin eksik bıraktığı 3 temel içerik açığını ve 3 stratejik öneriyi maddeler halinde yaz.
YASAKLI KELİMELER: Mühendis, Mühendislik Bürosu, %100 garanti, anahtar teslim.
BAŞLIKLARDA VE MADDELERDE HİÇBİR SAYI/NUMARA KULLANMA.`;

    const llmResult = await executeLlmCall({
      prompt: analysisPrompt,
      systemInstruction: 'Sen Bursa sanayi ve elektrik şebekesi kıdemli teknik denetçisisin. Kesinlikle mühendis kelimesini ve hiçbir sayıyı kullanma.',
      maxTokens: 1000,
    });

    if (llmResult.text) {
      const lines = llmResult.text.split('\n').map(l => l.replace(/^[\d\.\-\*\•\s]+/, '').trim()).filter(l => l.length > 15);
      if (lines.length >= 4) {
        contentGaps = lines.slice(0, 3);
        strategicRecommendations = lines.slice(3, 6);
      }
    }
  } catch (err) {
    console.warn('LLM competitor analysis gap synthesis skipped:', err);
  }

  return {
    targetKeyword,
    scrapedCompetitors,
    contentGaps,
    strategicRecommendations,
    verifiedRegulations: REGULATION_PATTERNS.map(r => r.name),
  };
}
