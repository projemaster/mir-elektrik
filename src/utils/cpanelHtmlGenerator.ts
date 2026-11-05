import { CPanelFile } from '../types/site';
import { COMPANY_INFO, SERVICES_LIST, PROJECTS_LIST, UEDAS_PROCESS_STEPS } from '../data/siteData';

// Shared header HTML generator for static pages
function generateStaticHeader(activeSlug: string = ''): string {
  return `
  <!-- ==================== ÜST MENÜ (HEADER) ==================== -->
  <header class="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
      <!-- Zone 1: Marka Wordmark -->
      <a href="/" class="flex items-center gap-3 group text-decoration-none">
        <div class="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center font-bold text-slate-950 text-xl shadow-md">
          M
        </div>
        <div>
          <span class="text-xl font-extrabold tracking-tight text-white block leading-tight">MIR ELEKTRİK</span>
          <span class="text-[11px] font-medium text-amber-400 tracking-wider uppercase block">Proje & Teknik Ofis Bursa</span>
        </div>
      </a>

      <!-- Zone 2: Menü Linkleri -->
      <nav class="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
        <a href="/" class="hover:text-amber-400 transition-colors whitespace-nowrap ${activeSlug === 'home' ? 'text-amber-400 font-semibold' : ''}">Ana Sayfa</a>
        <a href="/hakkimizda/" class="hover:text-amber-400 transition-colors whitespace-nowrap ${activeSlug === 'about' ? 'text-amber-400 font-semibold' : ''}">Hakkımızda</a>
        <a href="/hizmetler/" class="hover:text-amber-400 transition-colors whitespace-nowrap ${activeSlug.startsWith('hizmetler') ? 'text-amber-400 font-semibold' : ''}">Hizmetlerimiz</a>
        <a href="/uedas-rehberi/" class="hover:text-amber-400 transition-colors whitespace-nowrap ${activeSlug === 'uedas' ? 'text-amber-400 font-semibold' : ''}">UEDAŞ Rehberi</a>
        <a href="/projeler/" class="hover:text-amber-400 transition-colors whitespace-nowrap ${activeSlug === 'projects' ? 'text-amber-400 font-semibold' : ''}">Projeler</a>
        <a href="/iletisim/" class="hover:text-amber-400 transition-colors whitespace-nowrap ${activeSlug === 'contact' ? 'text-amber-400 font-semibold' : ''}">İletişim</a>
      </nav>

      <!-- Zone 3: Hızlı Aksiyon (Header içinde telefon/adres/mail yok, sadece aksiyon butonu) -->
      <div class="flex items-center gap-3 shrink-0">
        <a href="/teklif-al/" class="px-4 py-2 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 rounded-lg hover:bg-amber-300 transition-all shadow-md shadow-amber-500/20 whitespace-nowrap">
          Keşif & Teklif Al
        </a>
      </div>
    </div>
  </header>`;
}

// Shared footer HTML generator
function generateStaticFooter(): string {
  return `
  <!-- ==================== ALT BİLGİ (FOOTER) ==================== -->
  <footer class="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <!-- Sütun 1: Kurumsal Bilgi -->
        <div>
          <div class="flex items-center gap-3 mb-4">
            <div class="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center font-bold text-slate-950 text-lg">M</div>
            <span class="text-lg font-bold text-white">MIR ELEKTRİK PROJE</span>
          </div>
          <p class="text-sm leading-relaxed text-slate-400 mb-4">
            2007 yılından bu yana Bursa ve Güney Marmara genelinde UEDAŞ onaylı yapı ruhsat projeleri, güç artırımı, trafo müşavirliği ve teknik proje hizmetleri sunuyoruz.
          </p>
          <div class="text-xs text-slate-500 space-y-1">
            <p>Proje Sorumlusu: <strong class="text-slate-300">Ebru Annak Tanış</strong></p>
            <p>Yetkili Teknik Proje Yöneticisi (UEDAŞ Kayıtlı)</p>
          </div>
        </div>

        <!-- Sütun 2: Ana Hizmetler -->
        <div>
          <h4 class="text-sm font-semibold uppercase tracking-wider text-white mb-4">Hizmetlerimiz</h4>
          <ul class="space-y-2.5 text-sm">
            <li><a href="/hizmetler/yapi-ruhsat-projeleri/" class="hover:text-amber-400 transition-colors">Yapı Ruhsatı Elektrik Projeleri</a></li>
            <li><a href="/hizmetler/guc-artirimi-ve-uedas-onaylari/" class="hover:text-amber-400 transition-colors">UEDAŞ Güç Artırımı & Abonelik</a></li>
            <li><a href="/hizmetler/yg-isletme-sorumlulugu-trafo/" class="hover:text-amber-400 transition-colors">YG İşletme Sorumluluğu & Trafo</a></li>
            <li><a href="/hizmetler/yangin-algilama-guvenlik/" class="hover:text-amber-400 transition-colors">Yangın Algılama & Senaryo</a></li>
            <li><a href="/hizmetler/topraklama-ve-olcum-raporlari/" class="hover:text-amber-400 transition-colors">Topraklama & Paratoner Ölçümleri</a></li>
            <li><a href="/hizmetler/cati-ges-projeleri/" class="hover:text-amber-400 transition-colors">Çatı GES & Lisanssız Üretim</a></li>
          </ul>
        </div>

        <!-- Sütun 3: UEDAŞ Hizmet Bölgeleri -->
        <div>
          <h4 class="text-sm font-semibold uppercase tracking-wider text-white mb-4">Bursa & Hizmet Sahası</h4>
          <ul class="space-y-2 text-sm">
            <li><span class="text-slate-300">Bursa Merkez:</span> Osmangazi, Nilüfer, Yıldırım</li>
            <li><span class="text-slate-300">Sanayi Bölgeleri:</span> NOSAB, DOSAB, BTSO OSB, Hasanağa</li>
            <li><span class="text-slate-300">İlçeler:</span> Gemlik, İnegöl, Mudanya, Kestel, Gürsu</li>
            <li><span class="text-slate-300">UEDAŞ Bölgesi:</span> Balıkesir, Çanakkale, Yalova</li>
          </ul>
        </div>

        <!-- Sütun 4: İletişim -->
        <div>
          <h4 class="text-sm font-semibold uppercase tracking-wider text-white mb-4">Osmangazi Ofisimiz</h4>
          <address class="not-italic text-sm space-y-2.5 text-slate-400">
            <p>Doğanbey Mah. Doğanbey Cad. Burçin 3 İş Merkezi Kat: 9 No: 906, Osmangazi / BURSA</p>
            <p>Tel: <a href="tel:+905462522515" class="text-amber-400 hover:underline">0546 252 25 15</a></p>
            <p>GSM: <a href="tel:+905462522516" class="text-amber-400 hover:underline">0546 252 25 16</a></p>
            <p>E-posta: <a href="mailto:mirelektrikebru@gmail.com" class="text-slate-300 hover:underline">mirelektrikebru@gmail.com</a></p>
          </address>
        </div>
      </div>

      <div class="pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© 2007-${new Date().getFullYear()} Mir Elektrik Proje Ofisi. Tüm hakları saklıdır.</p>
        <div class="flex items-center gap-4">
          <a href="/uedas-rehberi/" class="hover:text-slate-400">UEDAŞ Bilgi Bankası</a>
          <a href="/sitemap.xml" class="hover:text-slate-400">Site Haritası</a>
          <a href="/teklif-al/" class="text-amber-400 hover:underline">Ücretsiz Keşif Talebi</a>
        </div>
      </div>
    </div>
  </footer>`;
}

// Generates complete HTML document
function wrapHtmlDocument(title: string, description: string, canonicalUrl: string, content: string, activeSlug: string = ''): string {
  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | Mir Elektrik Proje Bursa</title>
  <meta name="description" content="${description}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://mirelektrikproje.com${canonicalUrl}">
  <meta property="og:title" content="${title} | Mir Elektrik Proje Bursa">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="https://mirelektrikproje.com${canonicalUrl}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="tr_TR">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif; }
  </style>
</head>
<body class="bg-slate-50 text-slate-900 antialiased flex flex-col min-h-screen">
  ${generateStaticHeader(activeSlug)}
  <main class="flex-grow">
    ${content}
  </main>
  ${generateStaticFooter()}

  <!-- Sabit WhatsApp İletişim Butonu -->
  <a href="https://wa.me/905462522515?text=Merhaba,%20Bursa%20elektrik%20proje%20hizmetiniz%20hakk%C4%B1nda%20bilgi%20ve%20ke%C5%9Fif%20talep%20etmek%20istiyorum." 
     target="_blank" 
     rel="noopener noreferrer"
     class="fixed bottom-6 right-6 z-50 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
     title="WhatsApp ile Hızlı Ulaşın">
    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
    <span class="text-sm font-bold pr-1 hidden sm:inline">WhatsApp</span>
  </a>
</body>
</html>`;
}

// Generate the complete set of cPanel files
export function generateCPanelFiles(): CPanelFile[] {
  const files: CPanelFile[] = [];

  // 1. ANA SAYFA: public_html/index.html
  const homeContent = `
  <!-- HERO BÖLÜMÜ -->
  <section class="relative bg-slate-900 text-white overflow-hidden py-16 lg:py-24">
    <div class="absolute inset-0 opacity-20 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-7">
          <div class="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-4 tracking-wide uppercase">
            <span>Bursa & Güney Marmara</span>
            <span aria-hidden="true">·</span>
            <span>2007'den Beri 18+ Yıllık Saha ve Proje Tecrübesi</span>
          </div>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            UEDAŞ Onaylı Elektrik Ruhsat, Güç Artırımı ve Teknik Proje Çözümleri
          </h1>
          <p class="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed">
            Mir Elektrik Proje Ofisi; sanayi tesisleri, ticari yapılar ve konut projeleri için yapı ruhsatı elektrik çizimi, trafo müşavirliği, YG işletme sorumluluğu ve UEDAŞ onay süreçlerini titizlikle yönetir.
          </p>

          <div class="flex flex-wrap items-center gap-4 mb-10">
            <a href="/teklif-al/" class="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-sm transition-all shadow-lg shadow-amber-500/20">
              Projeniz İçin Teklif Alın
            </a>
            <a href="/hizmetler/" class="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg text-sm border border-slate-700 transition-colors">
              Hizmetlerimizi İnceleyin
            </a>
          </div>

          <!-- Güven İbareleri -->
          <div class="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800 text-slate-300">
            <div>
              <div class="text-xl sm:text-2xl font-black text-amber-400">1.250+</div>
              <div class="text-xs text-slate-400">Onaylı Proje</div>
            </div>
            <div>
              <div class="text-xl sm:text-2xl font-black text-white">4 İl</div>
              <div class="text-xs text-slate-400">UEDAŞ Yetkili Saha</div>
            </div>
            <div>
              <div class="text-xl sm:text-2xl font-black text-amber-400">2007</div>
              <div class="text-xs text-slate-400">Bursa Kuruluş</div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-5">
          <div class="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
            <div class="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">Hızlı Teknik Danışmanlık</div>
            <h2 class="text-xl font-bold text-white mb-4">Bursa Proje & Keşif Talep Formu</h2>
            <form action="https://wa.me/905462522515" method="GET" target="_blank" class="space-y-4">
              <div>
                <label class="block text-xs font-medium text-slate-300 mb-1">Adınız & Şirket Unvanı</label>
                <input type="text" name="text" required placeholder="Örn: Ahmet Yılmaz / Sanayi A.Ş." class="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:border-amber-400 focus:outline-none">
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-medium text-slate-300 mb-1">Hizmet Türü</label>
                  <select class="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:border-amber-400 focus:outline-none">
                    <option>Yapı Ruhsatı Projesi</option>
                    <option>UEDAŞ Güç Artırımı</option>
                    <option>YG İşletme / Trafo</option>
                    <option>Yangın Algılama</option>
                    <option>Topraklama Ölçümü</option>
                    <option>Çatı GES Projesi</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-medium text-slate-300 mb-1">Bölge / İlçe</label>
                  <select class="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:border-amber-400 focus:outline-none">
                    <option>Osmangazi</option>
                    <option>Nilüfer / NOSAB</option>
                    <option>DOSAB / Demirtaş</option>
                    <option>Yıldırım</option>
                    <option>İnegöl</option>
                    <option>Gemlik</option>
                    <option>Diğer UEDAŞ Bölgesi</option>
                  </select>
                </div>
              </div>
              <button type="submit" class="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-sm transition-all shadow-md mt-2">
                Hemen Keşif İsteği Gönder (WhatsApp)
              </button>
              <p class="text-[11px] text-center text-slate-400">Mesai saatleri içinde 15 dakika içinde geri dönüş yapılır.</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- HİZMETLERİMİZ ÖZETİ -->
  <section class="py-16 lg:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mb-12">
        <span class="text-xs font-semibold text-amber-600 uppercase tracking-wider">Uzmanlık Alanlarımız</span>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 mb-4">
          Bursa'da Sunduğumuz Ana Elektrik ve Tesisat Proje Hizmetleri
        </h2>
        <p class="text-slate-600 text-sm sm:text-base leading-relaxed">
          Ruhsat projelendirmesinden UEDAŞ saha onayına, trafo müşavirliğinden iş güvenliği ölçümlerine kadar işletmenizin tüm yasal elektrik altyapısını yönetiyoruz.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${SERVICES_LIST.map((srv, idx) => `
        <div class="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all group flex flex-col justify-between">
          <div>
            <div class="text-xs font-bold text-amber-600 uppercase mb-2">0${idx + 1}. Hizmet</div>
            <h3 class="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-3">
              ${srv.title}
            </h3>
            <p class="text-sm text-slate-600 leading-relaxed mb-4">
              ${srv.shortDesc}
            </p>
          </div>
          <div>
            <div class="text-xs text-slate-500 pt-3 border-t border-slate-200 mb-4">
              <strong>Hedef:</strong> ${srv.targetAudience}
            </div>
            <a href="/hizmetler/${srv.slug}/" class="text-xs font-bold text-slate-900 group-hover:text-amber-600 flex items-center gap-1">
              Detayları İnceleyin &rarr;
            </a>
          </div>
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- UEDAŞ VE RUHSAT SÜRECİ -->
  <section class="py-16 bg-slate-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-14">
        <span class="text-xs font-semibold text-amber-400 uppercase tracking-wider">Bürokratik Güvence</span>
        <h2 class="text-2xl sm:text-3xl font-extrabold mt-1 mb-3 text-white">5 Adımda Sorunsuz UEDAŞ & Ruhsat Onayı</h2>
        <p class="text-sm text-slate-400">Projenizi UEDAŞ ve belediye mevzuatlarına titizlikle uyumlu hazırlayarak revizyon riskini ve süreç gecikmelerini en aza indirmeyi amaçlıyoruz.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
        ${UEDAS_PROCESS_STEPS.map((step) => `
        <div class="bg-slate-800/80 p-5 rounded-xl border border-slate-700">
          <div class="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 font-black text-sm flex items-center justify-center mb-3">
            ${step.step}
          </div>
          <h4 class="text-sm font-bold text-white mb-2 leading-snug">${step.title}</h4>
          <p class="text-xs text-slate-400 leading-relaxed">${step.desc}</p>
        </div>
        `).join('')}
      </div>

      <div class="mt-12 text-center">
        <a href="/uedas-rehberi/" class="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:underline">
          <span>Bursa UEDAŞ Başvuru ve Evrak Rehberimizi Okuyun</span> &rarr;
        </a>
      </div>
    </div>
  </section>

  <!-- KURUCU & BURSA YEREL ODAK -->
  <section class="py-16 bg-slate-50 border-t border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-2xl border border-slate-200 p-8 lg:p-12 shadow-sm">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div class="lg:col-span-8">
            <span class="text-xs font-semibold text-amber-600 uppercase tracking-wider">Kurumsal Güvenilirlik</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 mb-4">
              Mir Elektrik Proje Ofisi & Ebru Annak Tanış
            </h2>
            <p class="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
              2007 yılında Bursa'da kurulan Mir Elektrik Proje Ofisi, Proje Sorumlusu <strong>Ebru Annak Tanış</strong> yönetiminde bugüne dek yüzlerce yapı ve sanayi tesisine teknik proje imzası atmıştır.
            </p>
            <p class="text-sm text-slate-600 leading-relaxed mb-6">
              Bursa Osmangazi merkezli ofisimiz; Nilüfer, Yıldırım, Mudanya, Gemlik, İnegöl gibi tüm ilçelerimizin yanı sıra UEDAŞ dağıtım bölgesindeki Balıkesir, Çanakkale ve Yalova illerinde de kesintisiz hizmet vermektedir.
            </p>
            <div class="flex flex-wrap gap-6 text-xs text-slate-500">
              <div>📍 <strong>Adres:</strong> Osmangazi / BURSA (Burçin 3 İş Merkezi Kat:9 No:906)</div>
              <div>⚡ <strong>Statü:</strong> Bursa UEDAŞ Kayıtlı Yetkili Elektrik Firması</div>
              <div>📞 <strong>İletişim:</strong> 0546 252 25 15</div>
            </div>
          </div>
          <div class="lg:col-span-4 bg-slate-900 text-white rounded-xl p-6 text-center">
            <div class="w-16 h-16 rounded-full bg-amber-400 text-slate-950 font-black text-2xl flex items-center justify-center mx-auto mb-4">
              18+
            </div>
            <h3 class="text-lg font-bold mb-1">Yıllık Saha Tecrübesi</h3>
            <p class="text-xs text-slate-400 mb-6">Bursa sanayisinin ve inşaat sektörünün güvenilir elektrik proje ortağı.</p>
            <a href="/hakkimizda/" class="inline-block w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold rounded-lg text-xs border border-slate-700 transition-colors">
              Hakkımızda Detayları
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA ŞERİDİ -->
  <section class="py-12 bg-amber-400 text-slate-950">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
      <div>
        <h3 class="text-xl sm:text-2xl font-black">Elektrik Projeniz veya Güç Artırımınız İçin Hemen Görüşelim</h3>
        <p class="text-sm text-slate-900 mt-1">Osmangazi Bursa ofisimizden aynı gün keşif ve teknik danışmanlık randevusu alın.</p>
      </div>
      <div class="flex items-center gap-3 shrink-0">
        <a href="tel:+905462522515" class="px-5 py-3 bg-slate-950 text-white font-bold rounded-lg text-sm hover:bg-slate-800 transition-colors">
          Hemen Arayın: 0546 252 25 15
        </a>
        <a href="/teklif-al/" class="px-5 py-3 bg-white text-slate-950 font-bold rounded-lg text-sm hover:bg-slate-100 transition-colors shadow">
          Keşif Formu Doldurun
        </a>
      </div>
    </div>
  </section>
  `;

  files.push({
    folder: 'public_html',
    filename: 'index.html',
    fullPath: 'public_html/index.html',
    urlPath: '/',
    title: 'Ana Sayfa',
    category: 'page',
    description: 'Bursa Mir Elektrik Proje ana sayfası: UEDAŞ yetkisi, 6 temel hizmet, süreçler ve hızlı teklif modülü.',
    content: wrapHtmlDocument(
      'Mir Elektrik Proje | Bursa Elektrik Proje & UEDAŞ Onay Hizmetleri',
      'Bursa merkezli Mir Elektrik Proje: 2007 yılından bu yana yapı ruhsat projeleri, UEDAŞ güç artırımı, trafo müşavirliği, YG işletme sorumluluğu ve yangın algılama çözümleri.',
      '/',
      homeContent,
      'home'
    ),
  });

  // 2. HAKKIMIZDA: public_html/hakkimizda/index.html
  const aboutContent = `
  <section class="py-16 lg:py-20 bg-slate-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl">
        <span class="text-xs font-semibold text-amber-400 uppercase tracking-wider">Kurumsal Kimliğimiz</span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4">
          Mir Elektrik Proje Ofisi & Ebru Annak Tanış
        </h1>
        <p class="text-slate-300 text-base leading-relaxed">
          2007 yılından bu yana Bursa ve Güney Marmara'da elektrik projelendirme, trafo müşavirliği ve saha denetimleri alanında kesintisiz hizmet veriyoruz.
        </p>
      </div>
    </div>
  </section>

  <section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div class="lg:col-span-7 space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
          <h2 class="text-2xl font-bold text-slate-900">18 Yıllık Proje Disiplini ve Saha Deneyimi</h2>
          <p>
            <strong>Mir Elektrik Proje Ofisi</strong>, Proje Sorumlusu <strong>Ebru Annak Tanış</strong> tarafından 2007 yılında Bursa'da kurulmuştur. Kurulduğu ilk günden bu yana Bursa UEDAŞ kayıtlı yetkili elektrik proje ofisi olarak faaliyetlerini titizlikle sürdürmektedir.
          </p>
          <p>
            Bursa başta olmak üzere UEDAŞ dağıtım sahası içerisinde yer alan <strong>Balıkesir, Çanakkale ve Yalova</strong> illerinde yüzlerce fabrika, sanayi tesisi, iş merkezi, kamu binası ve konut projesinin elektrik altyapısını başarıyla tamamlamıştır.
          </p>

          <h3 class="text-xl font-bold text-slate-900 pt-4">Neden Mir Elektrik Proje?</h3>
          <ul class="space-y-3 list-disc pl-5 text-sm text-slate-600">
            <li><strong>Mevzuata Titiz Uyum:</strong> UEDAŞ ve belediye imar şartnamelerine harfiyen uyarak çizilen projelerde revizyon riskini en aza indiriyoruz.</li>
            <li><strong>Saha ve Uygulama Gerçekliği:</strong> Yalnızca kağıt üzerinde değil, sahada imalata en uygun, maliyet optimize edilmiş projelendirme.</li>
            <li><strong>Doğrudan Proje Yöneticisi İle İletişim:</strong> Projenizin başından sonuna kadar bizzat Ebru Annak Tanış ve uzman teknik kadromuzla doğrudan temas kurarsınız.</li>
            <li><strong>Yasal Mevzuat Uyumu:</strong> Yangından Korunma Yönetmeliği ve Kuvvetli Akım Tesisleri mevzuatına tam uyum hedeflenir.</li>
          </ul>
        </div>

        <div class="lg:col-span-5 space-y-6">
          <div class="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <h3 class="text-lg font-bold text-slate-900 mb-4">Yetki ve Tescil Bilgilerimiz</h3>
            <dl class="space-y-3 text-xs sm:text-sm">
              <div class="flex justify-between py-2 border-b border-slate-200">
                <dt class="text-slate-500">Firma Unvanı:</dt>
                <dd class="font-semibold text-slate-900">Mir Elektrik Proje Ofisi</dd>
              </div>
              <div class="flex justify-between py-2 border-b border-slate-200">
                <dt class="text-slate-500">Kurucu / Proje Sorumlusu:</dt>
                <dd class="font-semibold text-slate-900">Ebru Annak Tanış</dd>
              </div>
              <div class="flex justify-between py-2 border-b border-slate-200">
                <dt class="text-slate-500">Kuruluş Yılı:</dt>
                <dd class="font-semibold text-slate-900">2007 (18+ Yıl)</dd>
              </div>
              <div class="flex justify-between py-2 border-b border-slate-200">
                <dt class="text-slate-500">Yetkili Statü:</dt>
                <dd class="font-semibold text-slate-900">Bursa UEDAŞ Kayıtlı Yetkili Firma</dd>
              </div>
              <div class="flex justify-between py-2 border-b border-slate-200">
                <dt class="text-slate-500">Hizmet Alanı:</dt>
                <dd class="font-semibold text-slate-900">UEDAŞ Sorumluluk Sahası</dd>
              </div>
              <div class="flex justify-between py-2">
                <dt class="text-slate-500">Ofis Lokasyonu:</dt>
                <dd class="font-semibold text-slate-900">Osmangazi / BURSA</dd>
              </div>
            </dl>
          </div>

          <div class="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <h3 class="text-base font-bold text-slate-900 mb-2">Bursa Ofisimize Bekleriz</h3>
            <p class="text-xs text-slate-700 leading-relaxed mb-4">
              Doğanbey Mah. Doğanbey Cad. Burçin 3 İş Merkezi Kat: 9 No: 906 Osmangazi adresimizde sizleri ağırlamaktan memnuniyet duyarız.
            </p>
            <a href="tel:+905462522515" class="inline-flex items-center gap-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 px-4 py-2 rounded-lg transition-colors">
              Randevu Alın: 0546 252 25 15
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  `;

  files.push({
    folder: 'public_html/hakkimizda',
    filename: 'index.html',
    fullPath: 'public_html/hakkimizda/index.html',
    urlPath: '/hakkimizda/',
    title: 'Hakkımızda',
    category: 'page',
    description: 'Mir Elektrik Proje Ofisi kurucusu Ebru Annak Tanış ve 2007 yılından bu yana Bursa ve UEDAŞ bölgesindeki teknik proje çalışmalarımız.',
    content: wrapHtmlDocument(
      'Hakkımızda | Mir Elektrik Proje Ofisi & Ebru Annak Tanış Bursa',
      '2007 yılından bu yana Bursa ve Güney Marmara genelinde faaliyet gösteren UEDAŞ kayıtlı Mir Elektrik Proje Ofisi kurumsal bilgileri ve proje vizyonu.',
      '/hakkimizda/',
      aboutContent,
      'about'
    ),
  });

  // 3. HİZMETLERİMİZ GENEL: public_html/hizmetler/index.html
  const servicesMainContent = `
  <section class="py-16 bg-slate-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl">
        <span class="text-xs font-semibold text-amber-400 uppercase tracking-wider">Hizmet Kataloğumuz</span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4">
          Bursa Elektrik ve Tesisat Proje Hizmetleri
        </h1>
        <p class="text-slate-300 text-base leading-relaxed">
          İmar yönetmelikleri, UEDAŞ şartnameleri ve iş sağlığı güvenliği kriterlerine uygun teknik proje çözümlerimiz.
        </p>
      </div>
    </div>
  </section>

  <section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${SERVICES_LIST.map((srv, idx) => `
        <div class="bg-slate-50 rounded-2xl p-7 border border-slate-200 hover:border-amber-400 hover:shadow-xl transition-all flex flex-col justify-between">
          <div>
            <div class="w-10 h-10 rounded-lg bg-amber-400/20 text-amber-600 font-black text-sm flex items-center justify-center mb-4">
              0${idx + 1}
            </div>
            <h2 class="text-xl font-bold text-slate-900 mb-3">${srv.title}</h2>
            <p class="text-sm text-slate-600 leading-relaxed mb-6">${srv.shortDesc}</p>
            
            <div class="text-xs text-slate-500 mb-6">
              <strong class="text-slate-800">Bursa Uyumu:</strong> ${srv.bursaFocus}
            </div>
          </div>
          <div class="pt-4 border-t border-slate-200">
            <a href="/hizmetler/${srv.slug}/" class="w-full text-center block py-2.5 px-4 bg-slate-900 hover:bg-amber-400 hover:text-slate-950 text-white font-bold text-xs rounded-lg transition-colors">
              Hizmet Detayı ve Süreç &rarr;
            </a>
          </div>
        </div>
        `).join('')}
      </div>
    </div>
  </section>
  `;

  files.push({
    folder: 'public_html/hizmetler',
    filename: 'index.html',
    fullPath: 'public_html/hizmetler/index.html',
    urlPath: '/hizmetler/',
    title: 'Hizmetlerimiz',
    category: 'page',
    description: 'Mir Elektrik Proje Bursa ana hizmetleri: Yapı ruhsatı, güç artırımı, trafo müşavirliği, yangın ihbar, topraklama ve GES.',
    content: wrapHtmlDocument(
      'Elektrik Proje Hizmetlerimiz | Mir Elektrik Proje Bursa',
      'Bursa ve UEDAŞ bölgesinde sunduğumuz yapı ruhsatı elektrik projeleri, trafo müşavirliği, YG işletme sorumluluğu ve güç artırımı çözümleri.',
      '/hizmetler/',
      servicesMainContent,
      'hizmetler'
    ),
  });

  // 4 - 9: TEKİL HİZMET SAYFALARI (public_html/hizmetler/[slug]/index.html)
  SERVICES_LIST.forEach((service) => {
    const singleServiceContent = `
    <section class="py-16 bg-slate-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl">
          <div class="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-3">
            <a href="/hizmetler/" class="hover:underline">Hizmetlerimiz</a>
            <span>/</span>
            <span>${service.title}</span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
            ${service.title}
          </h1>
          <p class="text-slate-300 text-base sm:text-lg leading-relaxed">
            ${service.shortDesc}
          </p>
        </div>
      </div>
    </section>

    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <!-- Sol Sütun: Hizmet Kapsamı ve Detaylar -->
          <div class="lg:col-span-8 space-y-10">
            <div>
              <h2 class="text-2xl font-bold text-slate-900 mb-4">Hizmet Kapsamı ve Açıklaması</h2>
              <p class="text-slate-700 leading-relaxed text-sm sm:text-base">
                ${service.fullDesc}
              </p>
            </div>

            <!-- Bursa ve Yerel Odak -->
            <div class="bg-amber-50/70 border border-amber-200 rounded-xl p-6">
              <h3 class="text-base font-bold text-slate-900 mb-2">Bursa & UEDAŞ Bölgesine Özel Yaklaşımımız</h3>
              <p class="text-sm text-slate-700 leading-relaxed">${service.bursaFocus}</p>
            </div>

            <!-- Teslim Edilen Proje ve Belgeler -->
            <div>
              <h3 class="text-xl font-bold text-slate-900 mb-4">Proje Kapsamında Teslim Edilen Dokümanlar</h3>
              <ul class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                ${service.deliverables.map(del => `
                <li class="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs sm:text-sm text-slate-700 font-medium flex items-start gap-2">
                  <span class="text-amber-500 font-bold">✓</span>
                  <span>${del}</span>
                </li>
                `).join('')}
              </ul>
            </div>

            <!-- Adım Adım İşleyiş -->
            <div>
              <h3 class="text-xl font-bold text-slate-900 mb-4">Süreç Nasıl İlerliyor?</h3>
              <ol class="space-y-3">
                ${service.processSteps.map((step, idx) => `
                <li class="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span class="w-6 h-6 rounded-full bg-slate-900 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">${idx + 1}</span>
                  <span class="text-sm text-slate-700 leading-relaxed">${step}</span>
                </li>
                `).join('')}
              </ol>
            </div>

            <!-- Gerekli Evraklar -->
            <div>
              <h3 class="text-xl font-bold text-slate-900 mb-4">Başvuru ve Proje İçin İstenen Belgeler</h3>
              <ul class="space-y-2 list-disc pl-5 text-sm text-slate-600">
                ${service.requiredDocs.map(doc => `<li>${doc}</li>`).join('')}
              </ul>
            </div>

            <!-- Sık Sorulan Sorular -->
            ${service.faq.length > 0 ? `
            <div>
              <h3 class="text-xl font-bold text-slate-900 mb-4">Sıkça Sorulan Sorular</h3>
              <div class="space-y-4">
                ${service.faq.map(item => `
                <div class="border border-slate-200 rounded-xl p-5 bg-white">
                  <h4 class="text-sm font-bold text-slate-900 mb-2">${item.q}</h4>
                  <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">${item.a}</p>
                </div>
                `).join('')}
              </div>
            </div>
            ` : ''}
          </div>

          <!-- Sağ Sütun: Hızlı İletişim & Teklif Kutusu -->
          <div class="lg:col-span-4 space-y-6">
            <div class="bg-slate-900 text-white rounded-2xl p-6 sticky top-28 shadow-xl">
              <span class="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-2">Hızlı Fiyat & Keşif</span>
              <h3 class="text-lg font-bold mb-3">Bu Hizmet İçin Teklif Alın</h3>
              <p class="text-xs text-slate-300 leading-relaxed mb-6">
                Bursa Osmangazi ofisimizle irtibata geçerek projenizin kurulu gücü ve metrekare bilgilerine göre 2 saat içinde teklifinizi hazırlayalım.
              </p>

              <div class="space-y-3 mb-6">
                <a href="tel:+905462522515" class="w-full flex items-center justify-center gap-2 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-xs transition-colors">
                  <span>Hemen Ara: 0546 252 25 15</span>
                </a>
                <a href="https://wa.me/905462522515?text=Merhaba,%20${encodeURIComponent(service.title)}%20hakk%C4%B1nda%20teklif%20almak%20istiyorum." target="_blank" class="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs transition-colors">
                  <span>WhatsApp'tan Yazın</span>
                </a>
              </div>

              <div class="pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-2">
                <p>✓ UEDAŞ Kayıtlı Yetkili Proje Onayı</p>
                <p>✓ Mevzuata Titiz Uyum ve Süreç Takibi</p>
                <p>✓ İlk Keşif ve Teknik Danışmanlık</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    `;

    files.push({
      folder: `public_html/hizmetler/${service.slug}`,
      filename: 'index.html',
      fullPath: `public_html/hizmetler/${service.slug}/index.html`,
      urlPath: `/hizmetler/${service.slug}/`,
      title: service.title,
      category: 'page',
      description: `${service.title} - Bursa ve UEDAŞ onaylı elektrik ve teknik proje çözümleri.`,
      content: wrapHtmlDocument(
        `${service.title} | Bursa Mir Elektrik Proje`,
        service.shortDesc,
        `/hizmetler/${service.slug}/`,
        singleServiceContent,
        `hizmetler-${service.slug}`
      ),
    });
  });

  // 10. UEDAŞ REHBERİ: public_html/uedas-rehberi/index.html
  const uedasGuideContent = `
  <section class="py-16 bg-slate-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl">
        <span class="text-xs font-semibold text-amber-400 uppercase tracking-wider">Bilgi Bankası</span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4">
          Bursa UEDAŞ Elektrik Abonelik ve Proje Onay Rehberi
        </h1>
        <p class="text-slate-300 text-base leading-relaxed">
          Uludağ Elektrik Dağıtım A.Ş. (UEDAŞ) yetki sahasında güç artırımı, yeni abone bağlantısı ve trafo kabul süreçleri hakkında adım adım bilgilendirme.
        </p>
      </div>
    </div>
  </section>

  <section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div class="lg:col-span-8 space-y-10 text-slate-700 text-sm sm:text-base leading-relaxed">
          <div>
            <h2 class="text-2xl font-bold text-slate-900 mb-4">UEDAŞ Güç Artırımı Süreci Nasıl İşler?</h2>
            <p class="mb-4">
              Sanayi tesislerinde yeni makinelerin devreye girmesi, ticarethanelerde ilave soğutma/ısıtma yükleri veya mevcut ana şalterlerin sürekli atması durumunda UEDAŞ nezdinde <strong>güç artırımı projesi</strong> hazırlanması zorunludur.
            </p>
            <p>
              Projesiz ve onaysız olarak çekilen aşırı yükler yangın riskine ve UEDAŞ tarafından uygulanan <em>usulsüz elektrik kullanımı</em> cezalarına yol açabilir.
            </p>
          </div>

          <div class="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h3 class="text-lg font-bold text-slate-900 mb-3">Güç Artırımı Başvurusunda İstenen Evraklar</h3>
            <ul class="space-y-2 list-disc pl-5 text-sm text-slate-600">
              <li>Mevcut elektrik faturası (Tekil kod ve abone numarası)</li>
              <li>İmza sirküleri, vergi levhası ve ticaret sicil gazetesi fotokopileri</li>
              <li>Mülk sahibi tapusu veya güncel kira kontratı</li>
              <li>Talep edilen ilave elektrikli cihaz ve makinelerin kW/kVA güç dökümü</li>
              <li>Yetkili onaylı tadilat elektrik projesi (Mir Elektrik Proje tarafından hazırlanır)</li>
            </ul>
          </div>

          <div>
            <h3 class="text-xl font-bold text-slate-900 mb-4">Adım Adım UEDAŞ Onay Aşamaları</h3>
            <div class="space-y-4">
              <div class="p-4 bg-white border border-slate-200 rounded-lg">
                <h4 class="font-bold text-slate-900 mb-1">1. Aşama: Bağlantı Görüşü Sorgusu</h4>
                <p class="text-xs sm:text-sm text-slate-600">Bölgenizdeki dağıtım trafosunun veya besleme hattının talep ettiğiniz gücü karşılayıp karşılamadığı UEDAŞ sistemlerinden kontrol edilir.</p>
              </div>
              <div class="p-4 bg-white border border-slate-200 rounded-lg">
                <h4 class="font-bold text-slate-900 mb-1">2. Aşama: Teknik Proje Çizimi</h4>
                <p class="text-xs sm:text-sm text-slate-600">Gerilim düşümü, kablo kesiti, sigorta ve ana pano şalter değerleri hesaplanarak tadilat projesi çizilir ve onay sürecine hazırlanır.</p>
              </div>
              <div class="p-4 bg-white border border-slate-200 rounded-lg">
                <h4 class="font-bold text-slate-900 mb-1">3. Aşama: UEDAŞ Onayı ve Bağlantı Anlaşması</h4>
                <p class="text-xs sm:text-sm text-slate-600">UEDAŞ Proje Onay Birimi projeyi inceler ve onaylar. Ardından abone ile UEDAŞ arasında resmi Bağlantı Anlaşması imzalanır.</p>
              </div>
              <div class="p-4 bg-white border border-slate-200 rounded-lg">
                <h4 class="font-bold text-slate-900 mb-1">4. Aşama: Saha Denetimi ve Sayaç Mühürleme</h4>
                <p class="text-xs sm:text-sm text-slate-600">Pano imalatı ve kablo çekimi tamamlandıktan sonra UEDAŞ teknik kontrol heyeti sahaya gelerek tesisatı inceler ve sayacı mühürler.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-4">
          <div class="bg-slate-900 text-white rounded-2xl p-6 sticky top-28">
            <h3 class="text-base font-bold text-amber-400 mb-3">UEDAŞ İşlemlerinizi Bize Bırakın</h3>
            <p class="text-xs text-slate-300 leading-relaxed mb-6">
              Bursa'da UEDAŞ onay süreçlerinde 18 yıllık tecrübemizle tüm bürokratik aşamaları adınıza titizlikle ve en kısa sürede takip ediyoruz.
            </p>
            <a href="tel:+905462522515" class="w-full block text-center py-3 bg-amber-400 text-slate-950 font-bold rounded-lg text-xs hover:bg-amber-300 transition-colors mb-3">
              UEDAŞ Danışmanlığı İçin Arayın
            </a>
            <a href="/teklif-al/" class="w-full block text-center py-3 bg-slate-800 text-white font-semibold rounded-lg text-xs hover:bg-slate-700 transition-colors border border-slate-700">
              Online Keşif Formu
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  `;

  files.push({
    folder: 'public_html/uedas-rehberi',
    filename: 'index.html',
    fullPath: 'public_html/uedas-rehberi/index.html',
    urlPath: '/uedas-rehberi/',
    title: 'UEDAŞ Rehberi',
    category: 'page',
    description: 'Bursa UEDAŞ elektrik abonelik, güç artırımı evrakları, onay adımları ve teknik proje rehberi.',
    content: wrapHtmlDocument(
      'Bursa UEDAŞ Güç Artırımı ve Proje Onay Rehberi | Mir Elektrik',
      'UEDAŞ onay süreçleri, elektrik güç artırımı gerekli evrakları ve Bursa organize sanayi bölgeleri bağlantı anlaşması rehberi.',
      '/uedas-rehberi/',
      uedasGuideContent,
      'uedas'
    ),
  });

  // 11. PROJELER: public_html/projeler/index.html
  const projectsContent = `
  <section class="py-16 bg-slate-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl">
        <span class="text-xs font-semibold text-amber-400 uppercase tracking-wider">Referanslarımız</span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4">
          Tamamlanan Projeler & Saha Referansları
        </h1>
        <p class="text-slate-300 text-base leading-relaxed">
          Bursa sanayisi ve inşaat sektöründe hayata geçirdiğimiz ruhsat, güç artırımı ve teknik elektrik projelerimizden seçkiler.
        </p>
      </div>
    </div>
  </section>

  <section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${PROJECTS_LIST.map((proj) => `
        <div class="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg transition-all">
          <div>
            <div class="flex items-center justify-between text-xs text-slate-500 mb-3">
              <span class="font-semibold text-amber-600">${proj.category}</span>
              <span>${proj.year}</span>
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-2">${proj.title}</h3>
            <p class="text-xs text-slate-500 mb-4">📍 ${proj.location} · ⚡ ${proj.powerOrArea}</p>
            <p class="text-sm text-slate-600 leading-relaxed mb-4">${proj.scope}</p>
          </div>
          <div class="pt-3 border-t border-slate-200 text-xs font-semibold text-slate-700">
            Müşteri: ${proj.client}
          </div>
        </div>
        `).join('')}
      </div>
    </div>
  </section>
  `;

  files.push({
    folder: 'public_html/projeler',
    filename: 'index.html',
    fullPath: 'public_html/projeler/index.html',
    urlPath: '/projeler/',
    title: 'Projelerimiz',
    category: 'page',
    description: 'Mir Elektrik Proje Bursa OSB fabrika, ticari plaza ve konut referans projeleri.',
    content: wrapHtmlDocument(
      'Projelerimiz & Referanslarımız | Mir Elektrik Proje Bursa',
      'Bursa Nilüfer, NOSAB, DOSAB ve Osmangazi bölgelerinde tamamlanan elektrik proje ve trafo müşavirliği referanslarımız.',
      '/projeler/',
      projectsContent,
      'projects'
    ),
  });

  // 12. TEKLİF AL: public_html/teklif-al/index.html
  const quoteContent = `
  <section class="py-16 bg-slate-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl">
        <span class="text-xs font-semibold text-amber-400 uppercase tracking-wider">Hızlı Fiyatlandırma</span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4">
          Elektrik Proje & Keşif Teklifi Talep Edin
        </h1>
        <p class="text-slate-300 text-base leading-relaxed">
          Proje detaylarınızı girin, Bursa Osmangazi ofisimizden yetkili teknik kadromuz en kısa sürede teknik keşif ve fiyat teklifinizi hazırlasın.
        </p>
      </div>
    </div>
  </section>

  <section class="py-16 bg-white">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-slate-50 border border-slate-200 rounded-2xl p-8 shadow-sm">
        <form action="https://wa.me/905462522515" method="GET" target="_blank" class="space-y-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label class="block text-xs font-bold text-slate-800 mb-1">Adınız & Soyadınız *</label>
              <input type="text" name="name" required placeholder="Ad Soyad" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-sm focus:border-amber-500 focus:outline-none">
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-800 mb-1">Şirket Unvanı</label>
              <input type="text" name="company" placeholder="Firma Adı (varsa)" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-sm focus:border-amber-500 focus:outline-none">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label class="block text-xs font-bold text-slate-800 mb-1">Telefon Numaranız *</label>
              <input type="tel" name="phone" required placeholder="05XX XXX XX XX" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-sm focus:border-amber-500 focus:outline-none">
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-800 mb-1">E-Posta Adresiniz</label>
              <input type="email" name="email" placeholder="ornek@firma.com" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-sm focus:border-amber-500 focus:outline-none">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label class="block text-xs font-bold text-slate-800 mb-1">Talep Edilen Hizmet *</label>
              <select name="service" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-sm focus:border-amber-500 focus:outline-none">
                <option>Yapı Ruhsatı Elektrik Projesi</option>
                <option>UEDAŞ Güç Artırımı & Abone Projesi</option>
                <option>YG İşletme Sorumluluğu & Trafo</option>
                <option>Yangın Algılama & Senaryo Projesi</option>
                <option>Topraklama & Paratoner Ölçümü</option>
                <option>Çatı GES Projesi</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-800 mb-1">Tesis / Proje Lokasyonu (İlçe/OSB) *</label>
              <input type="text" name="location" required placeholder="Örn: Nilüfer NOSAB veya Osmangazi" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-sm focus:border-amber-500 focus:outline-none">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label class="block text-xs font-bold text-slate-800 mb-1">Tahmini Kurulu Güç (kW/kVA)</label>
              <input type="text" name="power" placeholder="Örn: 160 kVA veya 50 kW" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-sm focus:border-amber-500 focus:outline-none">
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-800 mb-1">Kapalı Alan (m²)</label>
              <input type="text" name="area" placeholder="Örn: 1500 m²" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-sm focus:border-amber-500 focus:outline-none">
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-800 mb-1">Proje Notları & Özel İstekler</label>
            <textarea name="notes" rows="4" placeholder="Projeniz veya ihtiyaç duyduğunuz onay süreci hakkında kısa bilgi verin..." class="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-sm focus:border-amber-500 focus:outline-none"></textarea>
          </div>

          <button type="submit" class="w-full py-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold rounded-xl text-base transition-all shadow-lg shadow-amber-500/20">
            Teklif Talebini Gönder (WhatsApp & Telefon)
          </button>
        </form>
      </div>
    </div>
  </section>
  `;

  files.push({
    folder: 'public_html/teklif-al',
    filename: 'index.html',
    fullPath: 'public_html/teklif-al/index.html',
    urlPath: '/teklif-al/',
    title: 'Teklif Al',
    category: 'page',
    description: 'Bursa elektrik proje ve keşif talebi formu: Hızlı fiyatlandırma.',
    content: wrapHtmlDocument(
      'Elektrik Proje Teklifi Al | Mir Elektrik Bursa',
      'Bursa ve çevresinde yapı ruhsatı, güç artırımı ve trafo işletme sorumluluğu için online keşif ve teklif talep formu.',
      '/teklif-al/',
      quoteContent,
      'quote'
    ),
  });

  // 13. İLETİŞİM: public_html/iletisim/index.html
  const contactContent = `
  <section class="py-16 bg-slate-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl">
        <span class="text-xs font-semibold text-amber-400 uppercase tracking-wider">İletişim & Ulaşım</span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4">
          Bursa Osmangazi Ofisimiz
        </h1>
        <p class="text-slate-300 text-base leading-relaxed">
          Projelerinizi yüz yüze görüşmek veya teknik keşif planlamak için ofisimize bekleriz.
        </p>
      </div>
    </div>
  </section>

  <section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div class="lg:col-span-5 space-y-6">
          <div class="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-6">
            <div>
              <h3 class="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">Açık Adres</h3>
              <p class="text-base font-semibold text-slate-900">
                Doğanbey Mah. Doğanbey Cad. Burçin 3 İş Merkezi Kat: 9 No: 906, Osmangazi / BURSA
              </p>
            </div>

            <div>
              <h3 class="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">Telefon / GSM</h3>
              <p class="text-lg font-bold text-slate-900">
                <a href="tel:+905462522515" class="hover:text-amber-600">0546 252 25 15</a>
              </p>
              <p class="text-lg font-bold text-slate-900">
                <a href="tel:+905462522516" class="hover:text-amber-600">0546 252 25 16</a>
              </p>
            </div>

            <div>
              <h3 class="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">E-Posta</h3>
              <p class="text-sm font-medium text-slate-900">
                <a href="mailto:mirelektrikebru@gmail.com" class="hover:underline">mirelektrikebru@gmail.com</a>
              </p>
              <p class="text-sm font-medium text-slate-900">
                <a href="mailto:ebru@mirelektrikproje.com" class="hover:underline">ebru@mirelektrikproje.com</a>
              </p>
            </div>

            <div>
              <h3 class="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">Çalışma Saatleri</h3>
              <p class="text-sm text-slate-700">Pazartesi - Cuma: 08:30 - 18:00</p>
              <p class="text-sm text-slate-700">Cumartesi: 09:00 - 14:00</p>
            </div>
          </div>
        </div>

        <div class="lg:col-span-7">
          <div class="rounded-2xl overflow-hidden border border-slate-200 shadow-sm h-96 bg-slate-100 flex items-center justify-center relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.8828945417674!2d29.06208577648356!3d40.18944517147774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ca3dfb01e309cb%3A0xe54e612f0f4cfbd1!2zRG_En2FuYmV5LCBEb8SfYW5iZXkgQ2QuIE5vOjMsIDE2MjIwIE9zbWFuZ2F6aS9CdXJzYQ!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str" 
              width="100%" 
              height="100%" 
              style="border:0;" 
              allowfullscreen="" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade"
              title="Mir Elektrik Proje Bursa Ofisi Harita">
            </iframe>
          </div>
        </div>
      </div>
    </div>
  </section>
  `;

  files.push({
    folder: 'public_html/iletisim',
    filename: 'index.html',
    fullPath: 'public_html/iletisim/index.html',
    urlPath: '/iletisim/',
    title: 'İletişim',
    category: 'page',
    description: 'Mir Elektrik Proje Ofisi Bursa Osmangazi adres, telefon, e-posta ve Google harita konumu.',
    content: wrapHtmlDocument(
      'İletişim & Ofisimiz | Mir Elektrik Proje Bursa',
      'Bursa Osmangazi Burçin 3 İş Merkezi No:906 adresindeki ofisimiz, telefonlarımız ve yol tarifi bilgileri.',
      '/iletisim/',
      contactContent,
      'contact'
    ),
  });

  // 14. .HTACCESS: public_html/.htaccess
  const htaccessContent = `# ====================================================================
# Mir Elektrik Proje - cPanel Apache / LiteSpeed Yapılandırması
# https://mirelektrikproje.com
# ====================================================================

# 1. UTF-8 Karakter Desteği
AddDefaultCharset UTF-8
DefaultLanguage tr-TR

# 2. Dizin Listelemeyi Kapat (Güvenlik)
Options -Indexes

# 3. Yeniden Yazma Motoru (Mod_Rewrite)
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Zorunlu HTTPS Yönlendirmesi
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

  # www Olmayan Tercih Yönlendirmesi (SEO için kanonik url)
  RewriteCond %{HTTP_HOST} ^www\\.mirelektrikproje\\.com$ [NC]
  RewriteRule ^(.*)$ https://mirelektrikproje.com/$1 [L,R=301]

  # Klasörlerin sonuna / ekleme (Clean URL uyumluluğu)
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^(.+[^/])$ $1/ [R=301,L]
</IfModule>

# 4. GZIP Sıkıştırma (Performans & Google PageSpeed)
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE application/xhtml+xml
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
  AddOutputFilterByType DEFLATE application/json
</IfModule>

# 5. Tarayıcı Önbellekleme (Browser Caching)
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/html "access plus 1 day"
</IfModule>

# 6. Güvenlik Başlıkları
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# 7. Özel Hata Sayfaları
ErrorDocument 404 /index.html
`;

  files.push({
    folder: 'public_html',
    filename: '.htaccess',
    fullPath: 'public_html/.htaccess',
    urlPath: '/.htaccess',
    title: '.htaccess Yapılandırma Dosyası',
    category: 'config',
    description: 'cPanel Apache sunucu kuralları: HTTPS zorlama, GZIP sıkıştırma, tarayıcı önbellekleme, UTF-8 ve güvenlik başlıkları.',
    content: htaccessContent,
  });

  // 15. SITEMAP.XML: public_html/sitemap.xml
  const currentDate = new Date().toISOString().split('T')[0];
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://mirelektrikproje.com/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://mirelektrikproje.com/hakkimizda/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://mirelektrikproje.com/hizmetler/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://mirelektrikproje.com/hizmetler/yapi-ruhsat-projeleri/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://mirelektrikproje.com/hizmetler/guc-artirimi-ve-uedas-onaylari/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://mirelektrikproje.com/hizmetler/yg-isletme-sorumlulugu-trafo/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://mirelektrikproje.com/hizmetler/yangin-algilama-guvenlik/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://mirelektrikproje.com/hizmetler/topraklama-ve-olcum-raporlari/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://mirelektrikproje.com/hizmetler/cati-ges-projeleri/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://mirelektrikproje.com/uedas-rehberi/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://mirelektrikproje.com/projeler/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://mirelektrikproje.com/teklif-al/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://mirelektrikproje.com/iletisim/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
`;

  files.push({
    folder: 'public_html',
    filename: 'sitemap.xml',
    fullPath: 'public_html/sitemap.xml',
    urlPath: '/sitemap.xml',
    title: 'XML Site Haritası',
    category: 'seo',
    description: 'Google Arama Motoru ve Yandex için SEO XML site haritası.',
    content: sitemapContent,
  });

  // 16. ROBOTS.TXT: public_html/robots.txt
  const robotsContent = `# Robots.txt - Mir Elektrik Proje
User-agent: *
Allow: /

Sitemap: https://mirelektrikproje.com/sitemap.xml
`;

  files.push({
    folder: 'public_html',
    filename: 'robots.txt',
    fullPath: 'public_html/robots.txt',
    urlPath: '/robots.txt',
    title: 'Robots.txt Protokolü',
    category: 'seo',
    description: 'Arama motoru robotları için dizinleme izin yönergeleri.',
    content: robotsContent,
  });

  return files;
}
