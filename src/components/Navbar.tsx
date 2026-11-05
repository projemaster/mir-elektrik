import React, { useState } from 'react';
import { Menu, X, Lock, Sparkles, FolderDown } from 'lucide-react';

interface NavbarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  onOpenCPanelHub: () => void;
  onOpenAdminAiStudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeView, 
  setActiveView, 
  onOpenCPanelHub,
  onOpenAdminAiStudio 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: string) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-white">
      {/* 
        KULLANICI TALEBİ: 
        "sayfa başlarında headerde yer verme footerde olacak iletişim sayfasında olacak firma bilgileri"
        Üst barda hiçbir telefon, adres veya şirket iletişim bilgisi bulunmamaktadır.
      */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        
        {/* Zone 1: Marka Wordmark (Single text element wordmark) */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center font-black text-slate-950 text-xl shadow-md group-hover:bg-amber-300 transition-colors">
            M
          </div>
          <div>
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white block leading-tight whitespace-nowrap">
              MIR ELEKTRİK PROJE OFİSİ
            </span>
            <span className="text-[10px] font-medium text-amber-400 tracking-wider uppercase block">
              Bursa UEDAŞ Kayıtlı Yetkili Elektrik Firması
            </span>
          </div>
        </button>

        {/* Zone 2: 4-5 Tek Satır Navigasyon Linki */}
        <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-300">
          <button
            onClick={() => handleNavClick('home')}
            className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${
              activeView === 'home' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Ana Sayfa
          </button>
          <button
            onClick={() => handleNavClick('categories')}
            className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${
              activeView === 'categories' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Hizmet Kategorileri
          </button>
          <button
            onClick={() => handleNavClick('osb')}
            className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${
              activeView === 'osb' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Bursa OSB'leri (17 Bölge)
          </button>
          <button
            onClick={() => handleNavClick('silo')}
            className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${
              activeView === 'silo' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            Derin Silo Rehberi
          </button>
          <button
            onClick={() => handleNavClick('uedas')}
            className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${
              activeView === 'uedas' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            UEDAŞ Rehberi
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${
              activeView === 'contact' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            İletişim & Lokasyon
          </button>
        </nav>

        {/* Zone 3: Hızlı Aksiyon & Güvenli Yönetici Paneli */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenAdminAiStudio}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-all whitespace-nowrap"
            title="Kullanıcı adı ve şifre korumalı özel rakip analiz ve silo içerik hazırlama asistanı"
          >
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Özel Ajan Girişi</span>
            <span className="sm:hidden">Ajan</span>
          </button>

          <button
            onClick={onOpenCPanelHub}
            className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 transition-all whitespace-nowrap"
            title="cPanel için temiz URL yapısına uygun dosyaları inceleyin / ZIP indirin"
          >
            <FolderDown className="w-3.5 h-3.5" />
            <span>cPanel / Vercel Paketi</span>
          </button>

          <button
            onClick={() => handleNavClick('quote')}
            className="px-4 py-2 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 rounded-lg hover:bg-amber-300 transition-all shadow-md shadow-amber-500/20 whitespace-nowrap shrink-0"
          >
            Keşif & Teklif Al
          </button>

          {/* Mobil Menü Butonu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none"
            aria-label="Menü"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2.5">
          <button
            onClick={() => handleNavClick('home')}
            className="block w-full text-left py-2 px-3 text-xs font-semibold rounded-lg hover:bg-slate-900 text-slate-200"
          >
            Ana Sayfa
          </button>
          <button
            onClick={() => handleNavClick('categories')}
            className="block w-full text-left py-2 px-3 text-xs font-semibold rounded-lg hover:bg-slate-900 text-slate-200"
          >
            Hizmet Kategorileri ve Alt Hizmetler
          </button>
          <button
            onClick={() => handleNavClick('osb')}
            className="block w-full text-left py-2 px-3 text-xs font-semibold rounded-lg hover:bg-slate-900 text-slate-200"
          >
            Bursa OSB'leri (17 Organize Sanayi Bölgesi)
          </button>
          <button
            onClick={() => handleNavClick('silo')}
            className="block w-full text-left py-2 px-3 text-xs font-semibold rounded-lg hover:bg-slate-900 text-slate-200"
          >
            Derin Silo Teknik Rehberi (EEAT Standartları)
          </button>
          <button
            onClick={() => handleNavClick('uedas')}
            className="block w-full text-left py-2 px-3 text-xs font-semibold rounded-lg hover:bg-slate-900 text-slate-200"
          >
            UEDAŞ Güç Artırımı ve Ruhsat Süreci
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="block w-full text-left py-2 px-3 text-xs font-semibold rounded-lg hover:bg-slate-900 text-slate-200"
          >
            İletişim & Lokasyon
          </button>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdminAiStudio();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-900 text-amber-400 font-semibold text-xs rounded-lg border border-slate-800"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Özel Ajan & Rakip Analiz Girişi</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCPanelHub();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-900 text-slate-300 font-semibold text-xs rounded-lg border border-slate-800"
            >
              <FolderDown className="w-3.5 h-3.5 text-amber-400" />
              <span>cPanel & Vercel Dosya Gezgini</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
