import React, { useState } from 'react';
import { DEEP_SILO_SAMPLE } from '../data/deepSiloSample';
import { CURATED_INDUSTRIAL_IMAGES } from '../utils/imageFinder';
import { 
  Layers, 
  HelpCircle, 
  Table, 
  ListFilter, 
  FileCheck2, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Zap,
  Flame,
  ArrowRight
} from 'lucide-react';

interface DeepSiloViewerProps {
  onOpenQuote: () => void;
}

export const DeepSiloViewer: React.FC<DeepSiloViewerProps> = ({ onOpenQuote }) => {
  const silo = DEEP_SILO_SAMPLE;
  const [openH2Index, setOpenH2Index] = useState<number | null>(0);

  const toggleH2 = (idx: number) => {
    setOpenH2Index(openH2Index === idx ? null : idx);
  };

  return (
    <article className="py-16 bg-slate-950 text-white border-t border-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* SEO Breadcrumb & Architecture Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="text-amber-400 font-semibold">Ana Sayfa</span>
            <span>/</span>
            <span className="text-amber-400 font-semibold">Teknik Kılavuzlar</span>
            <span>/</span>
            <span className="text-slate-300 truncate max-w-xs">{silo.slug}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-slate-900 text-amber-400 px-3 py-1 rounded-lg border border-slate-800 font-mono text-[11px]">
              1 H1 · 11 H2 · 55 H3 · 35 SSS Mimarisi (0 Sayı Kuralı)
            </span>
          </div>
        </div>

        {/* H1 HEADER AND 5 DETAILED PARAGRAPHS */}
        <header className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>Google EEAT Uyumlu Derin Sanayi Silo Paftası</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {silo.h1}
          </h1>

          {/* Featured Industrial Image with Exact Alt Tag */}
          <div className="rounded-2xl overflow-hidden border border-slate-800 relative aspect-video bg-slate-900 shadow-2xl">
            <img
              src={CURATED_INDUSTRIAL_IMAGES[0].url}
              alt={`${silo.h1} - Bursa Sanayi Uygulama Detayı`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
            <div className="absolute bottom-3 left-4 right-4 text-xs text-slate-300 flex items-center justify-between">
              <span>Görsel: {CURATED_INDUSTRIAL_IMAGES[0].alt}</span>
              <span className="text-amber-400 font-mono text-[11px]">Kaynak: {CURATED_INDUSTRIAL_IMAGES[0].source}</span>
            </div>
          </div>

          {/* 5 Katmanlı Paragraf Yapısı (Kullanıcı Kuralı) */}
          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed pt-2">
            {/* 1. Paragraf: HAP BİLGİ */}
            <div className="p-4 bg-amber-400/10 border border-amber-400/30 rounded-2xl text-amber-200 font-semibold leading-relaxed">
              <strong className="text-amber-400 block text-xs uppercase tracking-wider mb-1">
                1. Paragraf · HAP BİLGİ:
              </strong>
              {silo.h1Paragraphs[0]}
            </div>

            {/* 2. Paragraf: Detaylandırma */}
            <p className="p-1">
              <strong className="text-white">2. Paragraf (Detay):</strong> {silo.h1Paragraphs[1]}
            </p>

            {/* 3, 4, 5. Paragraflar: Genişletilmiş ve derinleşen katmanlar */}
            <p className="p-1">
              <strong className="text-white">3. Paragraf (Sanayi Yük Analizi):</strong> {silo.h1Paragraphs[2]}
            </p>
            <p className="p-1">
              <strong className="text-white">4. Paragraf (Yıldırım & Otomasyon Koruması):</strong> {silo.h1Paragraphs[3]}
            </p>
            <p className="p-1">
              <strong className="text-white">5. Paragraf (Bursa Yerel Saha Gerçekliği):</strong> {silo.h1Paragraphs[4]}
            </p>
          </div>
        </header>

        {/* 9 ADET H2 ALT BAŞLIK BLOĞU */}
        <div className="space-y-6 pt-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl font-extrabold text-white">
              Silo Kırılımı: 9 Adet H2 Alt Başlık ve H3 / H4 Detay Katmanları
            </h2>
            <span className="text-xs text-amber-400 font-mono">9 / 9 H2 Yayında</span>
          </div>

          <div className="space-y-4">
            {silo.h2List.map((h2, h2Idx) => {
              const isOpen = openH2Index === h2Idx;
              return (
                <div
                  key={h2Idx}
                  className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all"
                >
                  {/* H2 Title Bar */}
                  <button
                    onClick={() => toggleH2(h2Idx)}
                    className="w-full p-5 text-left flex items-center justify-between hover:bg-slate-850 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/30 flex items-center justify-center font-bold font-mono text-xs shrink-0">
                        0{h2Idx + 1}
                      </span>
                      <h2 className="text-base sm:text-lg font-bold text-white">
                        {h2.title}
                      </h2>
                    </div>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-amber-400" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                  </button>

                  {/* H2 Content (3 Paragraphs: 1 Hap Bilgi + 2 Detail) */}
                  {isOpen && (
                    <div className="p-6 pt-2 border-t border-slate-800/80 space-y-6 text-xs sm:text-sm text-slate-300">
                      {/* 1. Paragraf Hap Bilgi */}
                      <div className="p-3.5 bg-slate-950 rounded-xl text-amber-300 font-medium leading-relaxed border border-slate-850">
                        {h2.hapBilgi}
                      </div>

                      {/* 2 ve 3. Paragraflar Detay */}
                      <p className="leading-relaxed">{h2.detailParagraphs[0]}</p>
                      <p className="leading-relaxed">{h2.detailParagraphs[1]}</p>

                      {/* 6 ADET H3 BAŞLIĞI */}
                      <div className="space-y-6 pt-4 border-t border-slate-800">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                          <Table className="w-4 h-4 text-amber-400" />
                          <span>Bu H2 Altındaki 6 Adet H3 Başlığı ve Destekleyici Parametre Tabloları</span>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                          {h2.h3List.map((h3, h3Idx) => (
                            <div
                              key={h3Idx}
                              className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4"
                            >
                              <h3 className="text-base font-bold text-white">
                                {h3.title}
                              </h3>
                              <p className="text-xs text-amber-200/90 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-850">
                                {h3.hapBilgi}
                              </p>

                              {/* Destekleyici Tablo veya Liste */}
                              <div className="space-y-2">
                                <span className="text-[11px] font-semibold text-slate-400 block">
                                  {h3.tableOrListIntro}
                                </span>
                                <div className="border border-slate-850 rounded-xl overflow-hidden bg-slate-900/40">
                                  <table className="w-full text-left text-xs">
                                    <tbody className="divide-y divide-slate-850">
                                      {h3.items.map((it, itIdx) => (
                                        <tr key={itIdx} className="hover:bg-slate-900/60">
                                          <td className="p-2.5 font-medium text-slate-300 w-1/2">{it.label}</td>
                                          <td className="p-2.5 font-bold text-amber-400 w-1/2">{it.value}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>

                              {/* 4 ADET H4 SNIPPET ADAYI BAŞLIK */}
                              <div className="space-y-3 pt-3 border-t border-slate-850">
                                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block flex items-center gap-1.5">
                                  <HelpCircle className="w-3.5 h-3.5" />
                                  <span>4 Adet H4 Snippet Adayı Soru-Cevap Formatı</span>
                                </span>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  {h3.h4List.map((h4, h4Idx) => (
                                    <div
                                      key={h4Idx}
                                      className="p-3 bg-slate-900 rounded-xl border border-slate-850 space-y-1.5 text-xs"
                                    >
                                      <h4 className="font-bold text-cyan-300 leading-snug">
                                        {h4.title}
                                      </h4>
                                      <p className="text-slate-200 leading-relaxed">
                                        {h4.snippetQuestionAnswer}
                                      </p>
                                      <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-850/80 leading-relaxed">
                                        <strong className="text-slate-300">Ek Detay:</strong> {h4.unmentionedTechnicalDetail}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-900 border border-amber-500/30 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <h3 className="text-xl font-bold text-white">Fabrikanız İçin Derin Silo Uyumlu Proje ve Saha Keşfi</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Bursa Osmangazi ofisimizden yetkili teknik kadromuzla tesisinizi yerinde inceleyip tüm süreci mevzuata uygun yönetelim.
            </p>
          </div>
          <button
            onClick={onOpenQuote}
            className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl transition-all shadow-md shrink-0 flex items-center gap-2"
          >
            <span>Teknik Keşif Randevusu Alın</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
};
