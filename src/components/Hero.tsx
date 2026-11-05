import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/siteData';
import { ArrowRight, Phone, Zap, Shield, FileCheck2, Building2 } from 'lucide-react';

interface HeroProps {
  onOpenQuote: () => void;
  onSelectService: (serviceSlug: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote, onSelectService }) => {
  const [quickService, setQuickService] = useState('Yapı Ruhsatı Projesi');
  const [quickDistrict, setQuickDistrict] = useState('Nilüfer / NOSAB');
  const [quickPhone, setQuickPhone] = useState('');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Merhaba Mir Elektrik Proje Ofisi, Bursa ${quickDistrict} bölgesindeki projem için ${quickService} konusunda teknik keşif ve bilgi almak istiyorum. İletişim: ${quickPhone || 'Lütfen arayınız'}`;
    window.open(`https://wa.me/905462522515?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section className="relative bg-slate-950 text-white overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-800">
      <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Sol Sütun: Değer Önerisi ve Başlık */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Zero-Pill Unboxed Metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-amber-400 mb-4 tracking-wide uppercase">
              <span>Bursa & Güney Marmara</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>2007'den Beri 18+ Yıllık Saha Tecrübesi</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>UEDAŞ Kayıtlı Yetkili Firma</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight text-balance">
              Bursa'da UEDAŞ Onaylı Elektrik Ruhsat, Güç Artırımı ve Trafo Projelendirmesi
            </h1>

            <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl">
              Sanayi tesisleri, ticari yapılar ve konut projeleriniz için belediye imar onaylı elektrik tesisat projeleri, UEDAŞ güç artırımı, trafo müşavirliği ve itfaiye uygunluk süreçlerini yerel saha tecrübemizle yönetiyoruz.
            </p>

            {/* Aksiyon Butonları */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={onOpenQuote}
                className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 active:scale-95"
              >
                <span>Hızlı Keşif & Fiyat Teklifi Al</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onSelectService('services')}
                className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-sm border border-slate-700 transition-colors"
              >
                Hizmetlerimizi İnceleyin
              </button>
            </div>

            {/* Metrikler (Tabular Numeral & Anti-Slop) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-slate-800/80 text-slate-300">
              <div>
                <div className="text-2xl lg:text-3xl font-black text-amber-400 tabular-nums">1.250+</div>
                <div className="text-xs text-slate-400 mt-0.5">Onaylanan Proje</div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-black text-white tabular-nums">18 Yıl</div>
                <div className="text-xs text-slate-400 mt-0.5">Saha Deneyimi</div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-black text-amber-400 tabular-nums">17 OSB</div>
                <div className="text-xs text-slate-400 mt-0.5">Bursa Sanayi Sahası</div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-black text-emerald-400 tabular-nums">4 İl</div>
                <div className="text-xs text-slate-400 mt-0.5">UEDAŞ Yetkili Bölge</div>
              </div>
            </div>
          </div>

          {/* Sağ Sütun: Gerçek Görsel & Hızlı Keşif Formu */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl mb-6 aspect-video bg-slate-900">
              <img
                src="/src/assets/images/hero_electrical_engineering_1793649187746.jpg"
                alt="Mir Elektrik Proje Bursa Teknik Kontrol Odası ve Proje Çizimi"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              <div className="absolute bottom-3 left-4 right-4 text-xs text-slate-200 flex items-center justify-between">
                <span className="font-semibold text-white">Ebru Annak Tanış</span>
                <span className="text-amber-400 text-[11px]">Proje Sorumlusu / Teknik Yönetici</span>
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Hızlı Keşif Talebi</span>
                <span className="text-[11px] text-slate-400">Teknik danışmanlık</span>
              </div>

              <form onSubmit={handleQuickSubmit} className="space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">Hizmet Seçin</label>
                    <select
                      value={quickService}
                      onChange={(e) => setQuickService(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option>İtfaiye Uygunluk Projesi</option>
                      <option>UEDAŞ Güç Artırımı</option>
                      <option>Paratoner Projesi</option>
                      <option>Yangın Güvenliği Projesi</option>
                      <option>Yapı Ruhsatı Projesi</option>
                      <option>Çatı GES Projesi</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">Bölge / İlçe</label>
                    <select
                      value={quickDistrict}
                      onChange={(e) => setQuickDistrict(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option>Nilüfer / NOSAB</option>
                      <option>Demirtaş / DOSAB</option>
                      <option>BOSB (Bursa OSB)</option>
                      <option>TEKNOSAB</option>
                      <option>Hasanağa / HOSAB</option>
                      <option>İnegöl Mobilya OSB</option>
                      <option>Kayapa OSB</option>
                      <option>Deri OSB / TOSAB</option>
                      <option>Osmangazi / Yıldırım</option>
                      <option>Balıkesir / Çanakkale / Yalova</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Telefon Numaranız</label>
                  <input
                    type="tel"
                    placeholder="05XX XXX XX XX"
                    value={quickPhone}
                    onChange={(e) => setQuickPhone(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-xs transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>WhatsApp ile Teknik Bilgi & Keşif İste</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bursa Organize Sanayi Şeridi */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-900 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
        <span className="font-semibold text-slate-300">Bursa'da Aktif Hizmet Sunduğumuz Başlıca Sanayi Bölgeleri:</span>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-400 font-medium">
          <span>BOSB</span>
          <span aria-hidden="true">·</span>
          <span>DOSAB</span>
          <span aria-hidden="true">·</span>
          <span>NOSAB</span>
          <span aria-hidden="true">·</span>
          <span>TEKNOSAB</span>
          <span aria-hidden="true">·</span>
          <span>İnegöl OSB</span>
          <span aria-hidden="true">·</span>
          <span>HOSAB</span>
          <span aria-hidden="true">·</span>
          <span>Kayapa</span>
          <span aria-hidden="true">·</span>
          <span>TOSAB</span>
          <span aria-hidden="true">·</span>
          <span>Uludağ OSB</span>
          <span aria-hidden="true">·</span>
          <span>Barakfakih</span>
        </div>
      </div>
    </section>
  );
};
