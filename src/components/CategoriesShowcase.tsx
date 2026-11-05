import React, { useState } from 'react';
import { SERVICE_CATEGORIES } from '../data/categoriesData';
import { ServiceCategory, ServiceSubItem } from '../types/site';
import { 
  FileCheck2, 
  Zap, 
  ShieldAlert, 
  Sun, 
  ChevronRight, 
  CheckCircle2, 
  FileText, 
  Layers, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface CategoriesShowcaseProps {
  onOpenQuote: () => void;
  onSelectSubService?: (sub: ServiceSubItem) => void;
}

export const CategoriesShowcase: React.FC<CategoriesShowcaseProps> = ({ onOpenQuote, onSelectSubService }) => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>(SERVICE_CATEGORIES[0]);
  const [activeSubModal, setActiveSubModal] = useState<ServiceSubItem | null>(null);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileCheck2': return <FileCheck2 className="w-5 h-5 text-amber-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-400" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-amber-400" />;
      case 'Sun': return <Sun className="w-5 h-5 text-amber-400" />;
      default: return <Zap className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="hizmet-kategorileri" className="py-20 bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-2">
              Hiyerarşik Hizmet Mimarisi
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Hizmet Kategorileri ve Alt İçerik Sayfaları
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
              Kategori sayfaları ve altındaki özelleşmiş teknik içerik sayfalarıyla sanayi yapılarının tüm yasal elektrik altyapısını yönetiyoruz.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenQuote}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md"
            >
              Hemen Keşif & Teklif İste
            </button>
          </div>
        </div>

        {/* 4 Category Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {SERVICE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory.id === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat)}
                className={`p-5 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-950 border-amber-400 shadow-lg shadow-amber-500/10'
                    : 'bg-slate-950/60 hover:bg-slate-950 border-slate-800 text-slate-300'
                }`}
              >
                <div>
                  <div className="p-3 bg-slate-900 rounded-xl w-fit mb-3 border border-slate-800">
                    {getCategoryIcon(cat.iconName)}
                  </div>
                  <h3 className="font-bold text-sm text-white mb-1.5">{cat.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{cat.shortDesc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-850 flex items-center justify-between text-[11px]">
                  <span className="text-amber-400 font-semibold">{cat.services.length} Alt Hizmet</span>
                  <span className="text-slate-500 font-mono">/hizmetler/{cat.slug}/</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* SELECTED CATEGORY DETAILS & SUB-SERVICES */}
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4 mb-6">
            <div>
              <span className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider block mb-1">
                Kategori Dizini: /hizmetler/{selectedCategory.slug}/
              </span>
              <h3 className="text-2xl font-bold text-white">{selectedCategory.title}</h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">{selectedCategory.shortDesc}</p>
            </div>
            <span className="text-xs bg-slate-900 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-800 shrink-0">
              Clean URL Mimarisi (Uzantısız)
            </span>
          </div>

          {/* Sub-services Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedCategory.services.map((sub) => (
              <div
                key={sub.id}
                className="bg-slate-900 border border-slate-800 hover:border-amber-400/40 rounded-2xl p-6 flex flex-col justify-between transition-colors group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-mono text-amber-400/90 text-[11px]">
                      /hizmetler/{selectedCategory.slug}/{sub.slug}/
                    </span>
                    <span className="text-slate-500">Alt Sayfa</span>
                  </div>

                  <h4 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors mb-2.5">
                    {sub.title}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {sub.shortDesc}
                  </p>

                  <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-850 text-xs space-y-1.5 mb-4">
                    <div className="text-slate-400">
                      <strong className="text-slate-200">Hedef Kitle:</strong> {sub.targetAudience}
                    </div>
                    <div className="text-slate-400">
                      <strong className="text-slate-200">Bursa Odağı:</strong> {sub.bursaOsbFocus}
                    </div>
                  </div>

                  <div className="space-y-1 text-xs text-slate-400 mb-4">
                    <span className="font-semibold text-slate-300 block mb-1">Teslim Edilen Başlıca Belgeler:</span>
                    {sub.deliverables.slice(0, 3).map((del, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-1.5">
                        <span className="text-amber-400">✓</span>
                        <span className="truncate">{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">Standart: {sub.standards[0]}</span>
                  <button
                    onClick={() => setActiveSubModal(sub)}
                    className="px-3.5 py-1.5 bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1"
                  >
                    <span>Sayfayı İncele</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sub-Service Detail Modal */}
      {activeSubModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative text-slate-200">
            <button
              onClick={() => setActiveSubModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800"
            >
              ✕
            </button>

            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block mb-1">
              /hizmetler/{activeSubModal.categorySlug}/{activeSubModal.slug}/
            </span>
            <h3 className="text-2xl font-extrabold text-white mb-4">
              {activeSubModal.title}
            </h3>

            <div className="space-y-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              {activeSubModal.fullDesc.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <span className="font-bold text-amber-400 block uppercase">Teslim Edilen Belgeler</span>
                <ul className="space-y-1 text-slate-300">
                  {activeSubModal.deliverables.map((del, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-1.5">
                      <span className="text-amber-400">✓</span>
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <span className="font-bold text-amber-400 block uppercase">İstenen Başvuru Evrakları</span>
                <ul className="space-y-1 text-slate-300">
                  {activeSubModal.requiredDocs.map((doc, docIdx) => (
                    <li key={docIdx} className="flex items-start gap-1.5">
                      <span className="text-slate-500">•</span>
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-slate-400">
                Bursa Osmangazi Ofisimizden Doğrudan Saha Desteği
              </span>
              <button
                onClick={() => {
                  setActiveSubModal(null);
                  onOpenQuote();
                }}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl"
              >
                Bu Hizmet İçin Keşif Randevusu Alın
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
