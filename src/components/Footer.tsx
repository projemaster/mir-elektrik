import React from 'react';
import { COMPANY_INFO } from '../data/siteData';
import { SERVICE_CATEGORIES } from '../data/categoriesData';
import { ShieldCheck, FolderDown, ArrowUp, Lock, MapPin, Phone, Mail } from 'lucide-react';

interface FooterProps {
  onSelectView: (view: string) => void;
  onOpenCPanelHub: () => void;
  onOpenAdminAiStudio?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectView, onOpenCPanelHub, onOpenAdminAiStudio }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Sütun 1: Kurumsal */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center font-black text-slate-950 text-lg">
                M
              </div>
              <span className="text-base font-bold text-white tracking-tight">MIR ELEKTRİK PROJE OFİSİ</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400 mb-4">
              2007 yılından bu yana Bursa ve Güney Marmara'da UEDAŞ onaylı yapı ruhsat projeleri, güç artırımı, trafo müşavirliği ve proje çözümleri sunuyoruz.
            </p>
            <div className="text-xs text-slate-400 space-y-1">
              <p>Proje Sorumlusu: <strong className="text-slate-200">Ebru Annak Tanış</strong></p>
              <p className="text-amber-400 font-medium">Bursa UEDAŞ Kayıtlı Yetkili Elektrik Firması</p>
              <p>Kuruluş: 2007</p>
            </div>
          </div>

          {/* Sütun 2: Hizmet Kategorileri */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Hizmet Kategorileri</h4>
            <ul className="space-y-2 text-xs">
              {SERVICE_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onSelectView('categories')}
                    className="hover:text-amber-400 transition-colors text-left"
                  >
                    {cat.title}
                  </button>
                </li>
              ))}
              <li className="pt-1">
                <button
                  onClick={() => onSelectView('osb')}
                  className="text-amber-400 hover:underline font-semibold"
                >
                  Bursa OSB'leri (17 Bölge Sayfası)
                </button>
              </li>
            </ul>
          </div>

          {/* Sütun 3: Hızlı Menü & Güvenli Ajan Girişi */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Hızlı Menü & Araçlar</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectView('home')} className="hover:text-amber-400 transition-colors">
                  Ana Sayfa
                </button>
              </li>
              <li>
                <button onClick={() => onSelectView('silo')} className="hover:text-amber-400 transition-colors">
                  Derin Silo Rehberi (EEAT Mimarisi)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectView('uedas')} className="hover:text-amber-400 transition-colors">
                  UEDAŞ Onay & Evrak Rehberi
                </button>
              </li>
              <li>
                <button onClick={() => onSelectView('quote')} className="hover:text-amber-400 transition-colors">
                  Keşif & Fiyat Hesaplayıcı
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenCPanelHub}
                  className="text-slate-300 hover:text-amber-400 flex items-center gap-1.5 font-medium"
                >
                  <FolderDown className="w-3.5 h-3.5 text-amber-400" />
                  <span>cPanel / Vercel Temiz URL Paketi</span>
                </button>
              </li>
              {onOpenAdminAiStudio && (
                <li>
                  <button
                    onClick={onOpenAdminAiStudio}
                    className="text-slate-400 hover:text-white flex items-center gap-1.5"
                  >
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Özel Ajan & Rakip Analiz Girişi</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Sütun 4: Ofis ve Resmi İletişim Bilgileri (Kullanıcı Kuralı) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Osmangazi Ofisimiz</h4>
            <address className="not-italic text-xs space-y-2.5 text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Doğanbey Mh. Burçin 3 İş Merkezi No: 906, Osmangazi / BURSA</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>
                  <a href="tel:+905462522515" className="text-white hover:text-amber-400 font-semibold">0546 252 25 15</a> / <a href="tel:+905462522516" className="text-white hover:text-amber-400 font-semibold">0546 252 25 16</a>
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>
                  <a href="mailto:mirelektrikebru@gmail.com" className="hover:underline text-slate-300">mirelektrikebru@gmail.com</a>
                </span>
              </p>
              <p className="text-[11px] text-slate-500 pt-1">
                Web: <a href="https://mirelektrikproje.com" className="text-slate-400 hover:text-amber-400">https://mirelektrikproje.com/</a>
              </p>
            </address>
          </div>
        </div>

        {/* Alt Telif ve Güven Şeridi */}
        <div className="pt-8 border-t border-slate-900 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>© 2007-{new Date().getFullYear()} Mir Elektrik Proje Ofisi. Bursa UEDAŞ Kayıtlı Yetkili Elektrik Firması.</span>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={onOpenCPanelHub} className="hover:text-amber-400 text-slate-400">
              cPanel Dizin Yapısı
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={scrollToTop} className="hover:text-white flex items-center gap-1">
              <span>Başa Dön</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
