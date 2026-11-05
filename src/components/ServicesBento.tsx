import React, { useState } from 'react';
import { SERVICES_LIST } from '../data/siteData';
import { ServiceItem } from '../types/site';
import { ArrowRight, CheckCircle2, ChevronRight, FileText, Zap, ShieldAlert, Flame, Gauge, Sun, Sparkles } from 'lucide-react';

interface ServicesBentoProps {
  onOpenQuote: () => void;
  onSelectCPanelPath?: (path: string) => void;
}

export const ServicesBento: React.FC<ServicesBentoProps> = ({ onOpenQuote, onSelectCPanelPath }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem>(SERVICES_LIST[0]);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileCheck': return <FileText className="w-5 h-5 text-amber-500" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-500" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-amber-500" />;
      case 'Flame': return <Flame className="w-5 h-5 text-rose-500" />;
      case 'Gauge': return <Gauge className="w-5 h-5 text-sky-500" />;
      case 'Sun': return <Sun className="w-5 h-5 text-amber-400" />;
      default: return <Zap className="w-5 h-5 text-amber-500" />;
    }
  };

  const handleOpenDetail = (srv: ServiceItem) => {
    setSelectedService(srv);
    setShowDetailModal(true);
  };

  return (
    <section id="services" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-2">
              Elektrik Proje ve Müşavirlik Portföyümüz
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Bursa Yerelinde Uzmanı Olduğumuz Ana Hizmetler
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
              Her proje için yürürlükteki Elektrik İç Tesisleri Yönetmeliği ve Bursa UEDAŞ Dağıtım Şartnamesi kriterlerine titiz uyum.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenQuote}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md"
            >
              Tüm Hizmetler İçin Teklif Al
            </button>
          </div>
        </div>

        {/* Bento Grid Layout (6 Services with Asymmetric Rhythm) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Yapı Ruhsatı Projeleri */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-7 flex flex-col justify-between hover:border-amber-400/50 transition-all group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-amber-400">01. RUHSAT PROJESİ</span>
                <div className="p-2 bg-slate-900 rounded-lg">{getServiceIcon(SERVICES_LIST[0].iconName)}</div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                {SERVICES_LIST[0].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                {SERVICES_LIST[0].shortDesc}
              </p>
              <div className="space-y-1.5 pt-3 border-t border-slate-800/80 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400">✓</span>
                  <span>Aydınlatma & Priz Kuvvet Dağıtım</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-400">✓</span>
                  <span>Gerilim Düşümü ve Yük Analizi</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">public_html/hizmetler/yapi-ruhsat-projeleri/</span>
              <button
                onClick={() => handleOpenDetail(SERVICES_LIST[0])}
                className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                <span>İncele</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: UEDAŞ Güç Artırımı */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-7 flex flex-col justify-between hover:border-amber-400/50 transition-all group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-amber-400">02. UEDAŞ GÜÇ ARTIRIMI</span>
                <div className="p-2 bg-slate-900 rounded-lg">{getServiceIcon(SERVICES_LIST[1].iconName)}</div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                {SERVICES_LIST[1].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                {SERVICES_LIST[1].shortDesc}
              </p>
              <div className="space-y-1.5 pt-3 border-t border-slate-800/80 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400">✓</span>
                  <span>Bağlantı Görüşü ve Kapasite Sorgusu</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-400">✓</span>
                  <span>UEDAŞ Onaylı Tadilat Projesi</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">public_html/hizmetler/guc-artirimi...</span>
              <button
                onClick={() => handleOpenDetail(SERVICES_LIST[1])}
                className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                <span>İncele</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 3: YG İşletme Sorumluluğu (Featured with Real Image) */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-amber-400/50 transition-all group relative">
            <div className="h-36 overflow-hidden relative">
              <img
                src="/src/assets/images/transformer_substation_facility_1793649188677.jpg"
                alt="Bursa Yüksek Gerilim Trafo Merkezi ve İşletme Sorumluluğu"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              <span className="absolute top-3 left-3 bg-slate-900/90 text-amber-400 px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                03. YG & TRAFO MÜŞAVİRLİĞİ
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {SERVICES_LIST[2].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                  {SERVICES_LIST[2].shortDesc}
                </p>
                <div className="text-xs text-amber-300/90 mb-2">
                  ⚡ 1 kV üzeri trafolu işletmeler için yasal zorunlu EMO sözleşmesi.
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-mono">public_html/hizmetler/yg-isletme...</span>
                <button
                  onClick={() => handleOpenDetail(SERVICES_LIST[2])}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                >
                  <span>İncele</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 4: Yangın Algılama & Senaryo */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-7 flex flex-col justify-between hover:border-amber-400/50 transition-all group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-amber-400">04. YANGIN OTOMASYONU</span>
                <div className="p-2 bg-slate-900 rounded-lg">{getServiceIcon(SERVICES_LIST[3].iconName)}</div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                {SERVICES_LIST[3].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                {SERVICES_LIST[3].shortDesc}
              </p>
              <div className="space-y-1.5 pt-3 border-t border-slate-800/80 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400">✓</span>
                  <span>Bursa İtfaiyesi Ruhsat Onay Garantisi</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-400">✓</span>
                  <span>Adresli Sistem ve Duman Tahliye Senaryosu</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">public_html/hizmetler/yangin-algilama...</span>
              <button
                onClick={() => handleOpenDetail(SERVICES_LIST[3])}
                className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                <span>İncele</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 5: Topraklama & İSG Ölçüm Raporları */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-7 flex flex-col justify-between hover:border-amber-400/50 transition-all group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-amber-400">05. TOPRAKLAMA & İSG</span>
                <div className="p-2 bg-slate-900 rounded-lg">{getServiceIcon(SERVICES_LIST[4].iconName)}</div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                {SERVICES_LIST[4].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                {SERVICES_LIST[4].shortDesc}
              </p>
              <div className="space-y-1.5 pt-3 border-t border-slate-800/80 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400">✓</span>
                  <span>Çalışma Bakanlığı Teftiş Geçerli EMO Raporu</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-400">✓</span>
                  <span>24 Saat İçinde Yerinde Ölçüm & Rapor</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">public_html/hizmetler/topraklama...</span>
              <button
                onClick={() => handleOpenDetail(SERVICES_LIST[4])}
                className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                <span>İncele</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 6: Çatı GES Projeleri (Featured with Real Image) */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-amber-400/50 transition-all group relative">
            <div className="h-36 overflow-hidden relative">
              <img
                src="/src/assets/images/rooftop_ges_industrial_1793649188967.jpg"
                alt="Bursa Sanayi Çatı Güneş Enerjisi Santrali (Çatı GES)"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              <span className="absolute top-3 left-3 bg-slate-900/90 text-amber-400 px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                06. ÇATI GES & LİSANSSIZ ÜRETİM
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {SERVICES_LIST[5].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                  {SERVICES_LIST[5].shortDesc}
                </p>
                <div className="text-xs text-amber-300/90 mb-2">
                  ☀️ UEDAŞ Çağrı mektubu, TEDAŞ proje onayı ve şebeke entegrasyonu.
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-mono">public_html/hizmetler/cati-ges...</span>
                <button
                  onClick={() => handleOpenDetail(SERVICES_LIST[5])}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                >
                  <span>İncele</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SERVICE DETAIL MODAL */}
      {showDetailModal && selectedService && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative text-slate-200">
            <button
              onClick={() => setShowDetailModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800"
            >
              ✕
            </button>

            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
              Hizmet Teknik Dokümantasyonu
            </span>
            <h3 className="text-2xl font-extrabold text-white mb-4">
              {selectedService.title}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {selectedService.fullDesc}
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6 text-xs text-amber-300">
              <strong>Bursa & UEDAŞ Uyumluluğu:</strong> {selectedService.bursaFocus}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Teslim Edilenler</h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedService.deliverables.map(del => (
                    <li key={del} className="flex items-start gap-1.5">
                      <span className="text-amber-400">✓</span>
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Gerekli Evraklar</h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedService.requiredDocs.map(doc => (
                    <li key={doc} className="flex items-start gap-1.5">
                      <span className="text-slate-500">•</span>
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-slate-400 font-mono">
                cPanel Konumu: public_html/hizmetler/{selectedService.slug}/index.html
              </span>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  onOpenQuote();
                }}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl"
              >
                Bu Hizmet İçin Teklif İste
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
