import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoriesShowcase } from './components/CategoriesShowcase';
import { OsbShowcaseSection } from './components/OsbShowcaseSection';
import { DeepSiloViewer } from './components/DeepSiloViewer';
import { UedasProcessSection } from './components/UedasProcessSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CPanelHub } from './components/CPanelHub';
import { QuoteCalculatorModal } from './components/QuoteCalculatorModal';
import { AdminAiStudioModal } from './components/AdminAiStudioModal';
import { COMPANY_INFO } from './data/siteData';
import { 
  FolderDown, 
  MessageSquare, 
  Phone, 
  ShieldCheck, 
  Layers, 
  Factory, 
  Lock, 
  Sparkles,
  Server,
  ArrowRight
} from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<'home' | 'categories' | 'osb' | 'silo' | 'uedas' | 'projects' | 'about' | 'contact' | 'quote'>('home');
  const [showCPanelHub, setShowCPanelHub] = useState<boolean>(false);
  const [showQuoteModal, setShowQuoteModal] = useState<boolean>(false);
  const [showAdminAiStudio, setShowAdminAiStudio] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      
      {/* Üst Menü (Kullanıcı Kuralı: Header'da firma iletişim bilgisi yer almaz) */}
      <Navbar
        activeView={activeView}
        setActiveView={(v) => setActiveView(v as any)}
        onOpenCPanelHub={() => setShowCPanelHub(true)}
        onOpenAdminAiStudio={() => setShowAdminAiStudio(true)}
      />

      {/* cPanel & Vercel Dosya ve Clean URL Gezgini Modalı */}
      {showCPanelHub && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="w-full max-w-6xl max-h-[95vh] overflow-y-auto">
            <CPanelHub onClose={() => setShowCPanelHub(false)} />
          </div>
        </div>
      )}

      {/* Özel Ajan ve Rakip Analiz Yönetim Modalı (Kullanıcı adı ve Şifre Korumalı) */}
      <AdminAiStudioModal
        isOpen={showAdminAiStudio}
        onClose={() => setShowAdminAiStudio(false)}
      />

      {/* Teklif ve Keşif Hesaplayıcı Modalı */}
      <QuoteCalculatorModal
        isOpen={showQuoteModal || activeView === 'quote'}
        onClose={() => {
          setShowQuoteModal(false);
          if (activeView === 'quote') setActiveView('home');
        }}
      />

      {/* ANA İÇERİK ALANI */}
      <main className="flex-grow">
        
        {/* VIEW: ANA SAYFA */}
        {activeView === 'home' && (
          <>
            <Hero
              onOpenQuote={() => setShowQuoteModal(true)}
              onSelectService={() => setActiveView('categories')}
            />

            {/* Quick Access Strip: 17 OSB & Deep Silo & Admin Portal */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* 17 OSB Portal */}
                <div 
                  onClick={() => setActiveView('osb')}
                  className="bg-slate-900 border border-slate-800 hover:border-amber-400/50 p-5 rounded-2xl shadow-xl cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center font-bold">
                      <Factory className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                        Bursa OSB'leri (17 Bölge)
                      </h3>
                      <p className="text-[11px] text-slate-400">İtfaiye, Güç Artırımı, Paratoner ve Yangın</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
                </div>

                {/* Deep Silo Architecture */}
                <div 
                  onClick={() => setActiveView('silo')}
                  className="bg-slate-900 border border-slate-800 hover:border-cyan-400/50 p-5 rounded-2xl shadow-xl cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-400/10 text-cyan-400 flex items-center justify-center font-bold">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                        Derin Silo Teknik Kılavuzu
                      </h3>
                      <p className="text-[11px] text-slate-400">1 H1 · 9 H2 · 6 H3 · 4 H4 EEAT Mimarisi</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </div>

                {/* Special AI Agent Studio */}
                <div 
                  onClick={() => setShowAdminAiStudio(true)}
                  className="bg-slate-900 border border-amber-500/30 hover:border-amber-400 p-5 rounded-2xl shadow-xl cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                        Özel Ajan Konsülü & İçerik Stüdyosu
                      </h3>
                      <p className="text-[11px] text-slate-400">18K Kelime Sohbeti · 20 Kaynak · 11 H2 / 55 H3 / 35 SSS</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
                </div>

              </div>
            </div>

            {/* Categories & Sub-services */}
            <CategoriesShowcase onOpenQuote={() => setShowQuoteModal(true)} />

            {/* 17 Bursa OSBs Interactive Showcase */}
            <OsbShowcaseSection onOpenQuote={() => setShowQuoteModal(true)} />

            {/* UEDAŞ Process Steps */}
            <UedasProcessSection
              onOpenQuote={() => setShowQuoteModal(true)}
              onOpenCPanelHub={() => setShowCPanelHub(true)}
            />

            {/* About & History (No banned words) */}
            <AboutSection onOpenQuote={() => setShowQuoteModal(true)} />

            {/* References */}
            <ProjectsSection onOpenQuote={() => setShowQuoteModal(true)} />

            {/* Contact & Map (Official company information located here) */}
            <ContactSection />
          </>
        )}

        {/* VIEW: HİZMET KATEGORİLERİ */}
        {activeView === 'categories' && (
          <div className="py-8">
            <CategoriesShowcase onOpenQuote={() => setShowQuoteModal(true)} />
          </div>
        )}

        {/* VIEW: BURSA OSB'LERİ */}
        {activeView === 'osb' && (
          <div className="py-8">
            <OsbShowcaseSection onOpenQuote={() => setShowQuoteModal(true)} />
          </div>
        )}

        {/* VIEW: DERİN SİLO REHBERİ */}
        {activeView === 'silo' && (
          <div className="py-8">
            <DeepSiloViewer onOpenQuote={() => setShowQuoteModal(true)} />
          </div>
        )}

        {/* VIEW: UEDAŞ REHBERİ */}
        {activeView === 'uedas' && (
          <div className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mb-12">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-2">
                  Bursa UEDAŞ Rehberi
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
                  Elektrik Aboneliği, Güç Artırımı ve Proje Onay Rehberi
                </h1>
                <p className="text-sm text-slate-400 mt-2">
                  Uludağ Elektrik Dağıtım A.Ş. (UEDAŞ) yetki sahasında güç artırımı, abone ayrımı ve trafo kabullerinde dikkat edilmesi gereken teknik hususlar.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
                <div className="lg:col-span-8 space-y-8 text-slate-300 text-sm leading-relaxed">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                    <h2 className="text-xl font-bold text-white">Güç Artırımı Ne Zaman Gereklidir?</h2>
                    <p>
                      Sanayi tesisinizde yeni makinelerin devreye girmesi, atölyenizde ilave kaynak veya motor gruplarının çalıştırılması durumunda mevcut ana şalter yetersiz kalacaktır.
                    </p>
                    <p>
                      Mevcut kurulu gücün üzerinde akım çekilmesi kabloların aşırı ısınmasına, trafo ve kompanzasyon arızalarına ve en önemlisi UEDAŞ tarafından usulsüz kullanım cezalarına yol açar.
                    </p>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                    <h3 className="text-lg font-bold text-white">UEDAŞ Güç Artırımı Başvurusunda İstenen Belgeler</h3>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-400 list-disc pl-5">
                      <li>Son aya ait elektrik faturası (Tekil no / sayaç seri no)</li>
                      <li>Şirket imza sirküleri, vergi levhası ve ticaret sicil gazetesi</li>
                      <li>Kira kontratı veya tapu senedi fotokopisi</li>
                      <li>Mevcut kurulu güç ile talep edilen ilave makinelerin kW dökümü</li>
                      <li>Yetkili tadilat elektrik projesi (Ofisimiz tarafından çizilir)</li>
                    </ul>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                    <h3 className="text-lg font-bold text-white">Onay Süresi ve Dikkat Edilmesi Gerekenler</h3>
                    <p className="text-xs sm:text-sm text-slate-400">
                      Bursa merkez ve organize sanayi bölgelerinde UEDAŞ güç artırımı süreci ortalama 2 ila 3 hafta içinde neticelenir. Mir Elektrik Proje Ofisi olarak projenizi yerinde keşifle çizerek dağıtım şirketine eksiksiz sunuyor, revizyon gecikmelerini önlüyoruz.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 sticky top-28 space-y-4">
                  <h4 className="text-sm font-bold text-white">UEDAŞ Dosyanızı Bize Bırakın</h4>
                  <p className="text-xs text-slate-400">
                    Bursa'da UEDAŞ onay süreçlerinde 18 yıllık tecrübemizle başvurudan sayaç mühürlenmesine kadar yanınızdayız.
                  </p>
                  <button
                    onClick={() => setShowQuoteModal(true)}
                    className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-colors"
                  >
                    UEDAŞ Başvurusu İçin Keşif İste
                  </button>
                  <a
                    href="tel:+905462522515"
                    className="w-full block text-center py-3 bg-slate-950 hover:bg-slate-800 text-slate-200 font-semibold text-xs rounded-xl border border-slate-800 transition-colors"
                  >
                    Telefon: 0546 252 25 15
                  </a>
                </div>
              </div>

              <UedasProcessSection
                onOpenQuote={() => setShowQuoteModal(true)}
                onOpenCPanelHub={() => setShowCPanelHub(true)}
              />
            </div>
          </div>
        )}

        {/* VIEW: PROJELER */}
        {activeView === 'projects' && (
          <div className="py-12">
            <ProjectsSection onOpenQuote={() => setShowQuoteModal(true)} />
          </div>
        )}

        {/* VIEW: HAKKIMIZDA */}
        {activeView === 'about' && (
          <div className="py-12">
            <AboutSection onOpenQuote={() => setShowQuoteModal(true)} />
          </div>
        )}

        {/* VIEW: İLETİŞİM */}
        {activeView === 'contact' && (
          <div className="py-12">
            <ContactSection />
          </div>
        )}
      </main>

      {/* Alt Bilgi (Footer - Resmi firma iletişim bilgileri buradadır) */}
      <Footer
        onSelectView={(v) => setActiveView(v as any)}
        onOpenCPanelHub={() => setShowCPanelHub(true)}
        onOpenAdminAiStudio={() => setShowAdminAiStudio(true)}
      />

      {/* Sabit WhatsApp Aksiyon Butonu */}
      <a
        href="https://wa.me/905462522515?text=Merhaba,%20Mir%20Elektrik%20Proje%20Ofisi%20Bursa%20hizmetleriniz%20ve%20ke%C5%9Fif%20hakk%C4%B1nda%20g%C3%B6r%C3%BC%C5%9Fmek%20istiyorum."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center gap-2 active:scale-95"
        title="WhatsApp ile Hızlı Ulaşın"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="text-xs font-bold pr-1 hidden sm:inline">WhatsApp</span>
      </a>
    </div>
  );
}
