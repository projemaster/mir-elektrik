export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  iconName: string;
  badge: string;
  shortDesc: string;
  fullDesc: string;
  targetAudience: string;
  bursaFocus: string;
  deliverables: string[];
  processSteps: string[];
  requiredDocs: string[];
  faq: { q: string; a: string }[];
}

export interface ServiceSubItem {
  id: string;
  slug: string;
  title: string;
  categorySlug: string;
  shortDesc: string;
  fullDesc: string[];
  targetAudience: string;
  bursaOsbFocus: string;
  deliverables: string[];
  processSteps: string[];
  requiredDocs: string[];
  standards: string[];
  faq: { q: string; a: string }[];
}

export interface ServiceCategory {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  iconName: string;
  services: ServiceSubItem[];
}

export interface OsbServiceFocus {
  serviceName: string;
  slug: string;
  problemSolved: string;
  technicalSolution: string;
  standardsApplied: string;
}

export interface OsbDetailItem {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  activeFirmCount: string;
  dominantSectors: string[];
  summary: string;
  templateStyle: 'heavy-industrial' | 'high-tech' | 'textile-specialty' | 'craft-furniture' | 'chemical-leather';
  masterPerspective: string;
  fourServices: OsbServiceFocus[];
  flowSteps: { step: string; title: string; desc: string }[];
  technicalPointers: string[];
}

export interface SiloH4 {
  title: string;
  snippetQuestionAnswer: string;
  unmentionedTechnicalDetail: string;
}

export interface SiloH3 {
  title: string;
  hapBilgi: string;
  tableOrListIntro: string;
  items: { label: string; value: string }[];
  h4List: SiloH4[];
}

export interface SiloH2 {
  title: string;
  hapBilgi: string;
  detailParagraphs: [string, string];
  h3List: SiloH3[];
}

export interface DeepSiloPage {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  schemaType: string;
  h1: string;
  h1Paragraphs: [string, string, string, string, string]; // 5 paragraphs: 1 hap bilgi, 2 detail, 3-5 deep layers
  h2List: SiloH2[]; // 9 h2 items
}

export interface CompetitorAnalysisResult {
  query: string;
  competitorsFound: { url: string; title: string; weakness: string; missingTopics: string[] }[];
  contentGapSummary: string;
  suggestedSiloStructure: {
    recommendedH1: string;
    coreH2Themes: string[];
    highValueKeywords: string[];
  };
}

export interface ReferenceSource {
  id: string;
  title: string;
  type: 'url' | 'file' | 'note';
  sourceUrl?: string;
  fileName?: string;
  content: string;
  wordCount: number;
  isMarkedAsReference: boolean;
  addedAt: string;
  status: 'ready' | 'loading' | 'error';
}

export interface StrictFaqItem {
  question: string; // Strictly NO NUMBERS or DIGITS
  answer: string;
  tag: string;
}

export interface StrictH3 {
  title: string; // Strictly NO NUMBERS or DIGITS
  hapBilgi: string;
  paragraphs: [string, string]; // 2 rich non-cliche paragraphs
  tableOrList?: {
    type: 'table' | 'list';
    title: string;
    headers?: string[];
    rows?: string[][];
    items?: { label: string; value: string }[];
  };
  fieldNote: string;
}

export interface StrictH2 {
  title: string; // Strictly NO NUMBERS or DIGITS
  hapBilgi: string;
  paragraphs: [string, string]; // 2 rich paragraphs
  table?: {
    title: string;
    headers: string[];
    rows: string[][];
  };
  list?: {
    title: string;
    items: string[];
  };
  h3List: StrictH3[]; // EXACTLY 5 H3 items
  suggestedImage?: {
    url: string;
    altText: string;
    caption: string;
  };
}

export interface StrictSiloPage {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  targetKeyword: string;
  schemaType: string;
  h1: string; // Strictly NO NUMBERS or DIGITS
  h1HapBilgi: string;
  h1Paragraphs: [string, string, string, string, string]; // 5 deep paragraphs
  h2List: StrictH2[]; // EXACTLY 11 H2 items
  h4FaqHeading: string; // EXACTLY 1 H4 heading at the bottom (NO NUMBERS)
  faqs: StrictFaqItem[]; // EXACTLY 35 questions & answers (NO NUMBERS)
  qualityScore: number; // e.g., 97 (>= 95%)
  regulationsReferenced: string[];
  activeSourcesUsed: string[];
}

export interface AgentConsoleLog {
  id: string;
  agentId: string;
  agentName: string;
  role: string;
  status: 'pending' | 'running' | 'completed' | 'revision';
  action: string;
  outputSummary: string;
  timestamp: string;
}

export interface CPanelFile {
  folder: string;
  filename: string;
  fullPath: string;
  urlPath: string;
  title: string;
  category: 'page' | 'config' | 'seo';
  description: string;
  content: string;
}

export interface QuickQuoteFormData {
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  district: string;
  serviceType: string;
  facilityType: string;
  powerKw: string;
  areaSqm: string;
  notes: string;
}

