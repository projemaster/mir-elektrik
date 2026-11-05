import React from 'react';
import { UEDAS_PROCESS_STEPS } from '../data/siteData';
import { ArrowRight, CheckCircle, FileCheck, Clock, ShieldCheck } from 'lucide-react';

interface UedasProcessSectionProps {
  onOpenQuote: () => void;
  onOpenCPanelHub: () => void;
}

export const UedasProcessSection: React.FC<UedasProcessSectionProps> = ({ onOpenQuote, onOpenCPanelHub }) => {
  return (
    <section id="uedas-process" className="py-20 bg-slate-950 text-white border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Resmi Onay Süreç Yönetimi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            5 Adımda Bursa UEDAŞ ve Belediye Ruhsat Onay Süreci
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
            Teknik hesaplar ve yönetmeliklere uygun çizimlerimiz sayesinde projeleriniz UEDAŞ ve belediye onay birimlerinde titizlikle, zaman kaybetmeden onaylanır.
          </p>
        </div>

        {/* 5 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {UEDAS_PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative flex flex-col justify-between hover:border-amber-400/40 transition-colors group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/30 font-black text-sm flex items-center justify-center mb-4 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                  {step.step}
                </div>
                <h3 className="text-base font-bold text-white mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 text-[11px] text-amber-400/80 font-medium">
                Adım {idx + 1} / 5
              </div>
            </div>
          ))}
        </div>

        {/* UEDAŞ Bilgi Kartı */}
        <div className="mt-12 bg-slate-900/60 border border-slate-800 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-white">UEDAŞ Güç Artırımı İçin Gerekli Evrakları Biliyor musunuz?</h4>
            <p className="text-xs sm:text-sm text-slate-400">
              UEDAŞ Rehberi sayfamızda güç artırımı, abone ayrımı ve trafo kabullerinde talep edilen tüm dilekçe ve evrak listesini detaylandırdık.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onOpenQuote}
              className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md"
            >
              UEDAŞ Dosyanız İçin Keşif İsteyin
            </button>
            <button
              onClick={onOpenCPanelHub}
              className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs border border-slate-700 transition-colors"
            >
              Rehber HTML Kodunu İncele
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
