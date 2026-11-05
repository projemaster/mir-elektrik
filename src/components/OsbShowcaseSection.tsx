import React, { useState } from 'react';
import { BURSA_OSB_LIST } from '../data/osbData';
import { OsbDetailItem } from '../types/site';
import { 
  Building2, 
  Flame, 
  Zap, 
  ShieldAlert, 
  ShieldCheck, 
  ChevronRight, 
  Layers, 
  CheckCircle2, 
  Factory,
  ArrowRight
} from 'lucide-react';

interface OsbShowcaseSectionProps {
  onOpenQuote: () => void;
  selectedOsbSlug?: string;
}

export const OsbShowcaseSection: React.FC<OsbShowcaseSectionProps> = ({ onOpenQuote, selectedOsbSlug }) => {
  const initialOsb = selectedOsbSlug 
    ? BURSA_OSB_LIST.find(o => o.slug === selectedOsbSlug) || BURSA_OSB_LIST[0]
    : BURSA_OSB_LIST[0];

  const [activeOsb, setActiveOsb] = useState<OsbDetailItem>(initialOsb);
  const [filterQuery, setFilterQuery] = useState('');

  const filteredOsbs = BURSA_OSB_LIST.filter(osb => 
    osb.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    osb.dominantSectors.some(s => s.toLowerCase().includes(filterQuery.toLowerCase()))
  );

  return (
    <section id="osb-bolgeleri" className="py-20 bg-slate-950 text-white border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
              <Factory className="w-4 h-4" />
              <span>Bursa Sanayi Omurgası · 17 Organize Sanayi Bölgesi</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Bursa OSB Fabrikaları İçin Özel Tesisat, Güç ve Yangın Çözümleri
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
              Her organize sanayi bölgesinin sektörel üretim dinamiğine, yangın yüklerine ve UEDAŞ şebeke altyapısına özel projelendirme yaklaşımı.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <input
              type="text"
              placeholder="OSB veya sektör ara (örn: Tekstil, Otomotiv, NOSAB)..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 w-64"
            />
          </div>
        </div>

        {/* 17 OSB Horizontal Selector Pills / Chips (Functional Tabs) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {filteredOsbs.map((osb) => {
            const isSelected = activeOsb.id === osb.id;
            return (
              <button
                key={osb.id}
                onClick={() => setActiveOsb(osb)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                <span>{osb.shortName}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${isSelected ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-950 text-slate-400'}`}>
                  {osb.activeFirmCount.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* SELECTED OSB SHOWCASE CARD */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle background glow based on template style */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

          {/* Top Info Strip */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-8 border-b border-slate-800 gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-2">
                <span className="font-bold text-amber-400 uppercase tracking-wider">{activeOsb.name}</span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-white">{activeOsb.activeFirmCount}</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-300">Şablon Stili: {activeOsb.templateStyle}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {activeOsb.name} Teknik Saha Değerlendirmesi
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold">Öne Çıkan Sektörler:</span>
              {activeOsb.dominantSectors.map((sector, sIdx) => (
                <span key={sIdx} className="bg-slate-950 text-slate-200 px-3 py-1 rounded-lg text-xs border border-slate-800">
                  {sector}
                </span>
              ))}
            </div>
          </div>

          {/* Master Expert Technical Perspective Quote */}
          <div className="my-8 p-6 bg-slate-950/80 border border-slate-800 rounded-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-2">
              Sahadaki Yetkili Usta Teknik Gözüyle {activeOsb.shortName} Gerçeği
            </span>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed italic">
              "{activeOsb.masterPerspective}"
            </p>
          </div>

          {/* 4 HIGHLIGHTED SERVICES GRID */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {activeOsb.shortName} Bölgesinde Öne Çıkarılan 4 Ana Hizmet
              </span>
              <span className="text-xs text-amber-400 font-semibold">İtfaiye · Güç Artırımı · Paratoner · Yangın</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeOsb.fourServices.map((service, sIdx) => {
                const getIcon = () => {
                  if (service.slug.includes('itfaiye')) return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
                  if (service.slug.includes('guc')) return <Zap className="w-5 h-5 text-amber-400" />;
                  if (service.slug.includes('paratoner')) return <ShieldAlert className="w-5 h-5 text-sky-400" />;
                  return <Flame className="w-5 h-5 text-rose-400" />;
                };

                return (
                  <div
                    key={sIdx}
                    className="bg-slate-950 border border-slate-800 hover:border-amber-400/40 rounded-2xl p-6 flex flex-col justify-between transition-colors group"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 group-hover:border-amber-400/30 transition-colors">
                          {getIcon()}
                        </div>
                        <h4 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                          {service.serviceName}
                        </h4>
                      </div>

                      <div className="space-y-2.5 text-xs text-slate-300 leading-relaxed mb-4">
                        <div className="p-2.5 bg-slate-900/60 rounded-lg border border-slate-850">
                          <strong className="text-rose-300 block mb-0.5">Çözülen Saha Problemi:</strong>
                          <span>{service.problemSolved}</span>
                        </div>
                        <div className="p-2.5 bg-slate-900/60 rounded-lg border border-slate-850">
                          <strong className="text-amber-300 block mb-0.5">Uygulanan Teknik Çözüm:</strong>
                          <span>{service.technicalSolution}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                      <span className="truncate max-w-[280px]">Standart: {service.standardsApplied}</span>
                      <button
                        onClick={onOpenQuote}
                        className="text-amber-400 hover:underline font-bold flex items-center gap-1 shrink-0"
                      >
                        <span>Keşif İste</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Workflow Steps for this OSB */}
          <div className="mt-10 pt-8 border-t border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-4">
              {activeOsb.shortName} Sahasında 4 Adımlı Projelendirme ve Onay Akışı
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {activeOsb.flowSteps.map((step, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-xs font-black text-amber-400 font-mono">Adım {step.step}</span>
                  <h5 className="font-bold text-xs text-white">{step.title}</h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action Strip */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              📍 <strong>Ofisimiz:</strong> Doğanbey Mh. Burçin 3 İş Merkezi No: 906 Osmangazi / BURSA
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenQuote}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md"
              >
                {activeOsb.shortName} İçin Teknik Keşif Randevusu Alın
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
