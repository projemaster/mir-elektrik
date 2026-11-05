import { DeepSiloPage, SiloH2, SiloH3, SiloH4 } from '../types/site';

// Helper to construct uniform rich Silo H3
function buildH3(
  prefix: string,
  title: string,
  hapBilgi: string,
  tableIntro: string,
  tableItems: { label: string; value: string }[],
  h4Data: { q: string; a: string; detail: string }[]
): SiloH3 {
  return {
    title: title,
    hapBilgi: `HAP BİLGİ: ${hapBilgi}`,
    tableOrListIntro: tableIntro,
    items: tableItems,
    h4List: h4Data.map((item) => ({
      title: `Soru: ${item.q}`,
      snippetQuestionAnswer: `Cevap: ${item.a}`,
      unmentionedTechnicalDetail: item.detail,
    })),
  };
}

export const DEEP_SILO_SAMPLE: DeepSiloPage = {
  slug: 'bursa-sanayi-elektrik-tesisat-itfaiye-uygunluk-rehberi',
  title: 'Bursa Sanayi Tesislerinde İtfaiye Uygunluk, Güç Artırımı ve Yıldırımdan Korunma Teknik Rehberi',
  metaTitle: 'Bursa Sanayi Elektrik Tesisatı, İtfaiye Uygunluk ve Güç Artırımı Teknik Rehberi',
  metaDescription: 'Bursa OSB fabrikaları için itfaiye denetimi elektrik mekanik uygunluk, UEDAŞ güç artırımı, paratoner ve yangın algılama derin teknik kılavuzu.',
  canonicalUrl: 'https://mirelektrikproje.com/rehber/bursa-sanayi-elektrik-tesisat-itfaiye-uygunluk-rehberi/',
  schemaType: 'TechArticle',
  h1: 'Bursa Sanayi Tesislerinde İtfaiye Denetimi, Elektrik Güç Artırımı ve Yangın Güvenliği Teknik Yönetimi',
  h1Paragraphs: [
    'HAP BİLGİ: Bursa organize sanayi bölgelerinde faaliyet gösteren üretim tesislerinin iş yeri açma ve çalışma ruhsatını koruyabilmesi; yürürlükteki Yangın Yönetmeliği’ne tam uyumlu elektrik-mekanik tesisat projelerine, UEDAŞ onaylı güncel sözleşme gücüne ve periyodik ölçüm belgelerine doğrudan bağlıdır.',
    'Bursa Büyükşehir Belediyesi İtfaiye Daire Başkanlığı denetimlerinde sanayi yapıları yalnızca yangın tüpü sayısıyla değil; duman tahliye kapaklarının elektriksel tetiklenmesi, acil aydınlatma armatürlerinin lüks seviyeleri, kablo geçişlerinin yangın durdurucu harçlarla kapatılması ve yangın pompası besleme hatlarının yangına dayanıklılığıyla bir bütün olarak değerlendirilir.',
    'Otomotiv yan sanayi, tekstil, makine ve plastik gibi yüksek enerji yoğunluğuna sahip Bursa sanayisinde yeni tezgah yatırımları çoğu zaman mevcut trafo ve pano kapasitesini zorlar; projesiz çekilen her ilave kilovat kabloların aşırı ısınmasına ve beklenmedik şalter açmalarına zemin hazırlar.',
    'Yıldırımdan korunma tarafında ise fabrikaların geniş metal çatıları ve yüksek buhar/toz bacaları açık hedef konumundadır; TS EN 62305 standardına uygun paratoner ve Tip 1+2 parafudr koruması olmayan tesislerde anlık yıldırım darbeleri hassas CNC kartlarını ve PLC otomasyon ünitelerini devre dışı bırakır.',
    'Mir Elektrik Proje Ofisi olarak 2007 yılından bu yana Bursa sanayisinde edindiğimiz saha birikimiyle; tesislerin faaliyet durdurma riskiyle karşılaşmaması adına ruhsat projelerinden UEDAŞ bağlantı anlaşmalarına kadar tüm süreçleri teknik kurallar çerçevesinde yönetiyoruz.',
  ],
  h2List: [
    // H2 - 01
    {
      title: 'İtfaiye Denetimi Öncesi Elektrik ve Mekanik Tesisat Hazırlık Standartları',
      hapBilgi: 'HAP BİLGİ: İtfaiye denetiminde ilk incelenen husus, tesisin mimari projesine işlenmiş yangın tahliye güzergahları ile sahadaki acil aydınlatma ve duman tahliye damperlerinin birebir örtüşmesidir.',
      detailParagraphs: [
        'Bursa İtfaiyesi denetim heyeti sahaya geldiğinde; yangın anında elektriğin kesilip yalnızca acil durum aydınlatmalarının ve duman fanlarının çalışmasını sağlayan senaryo matrisinin canlı testini talep eder.',
        'Özellikle yangın pompa dairesinin ana şebekeden bağımsız yangına dayanıklı kablolarla beslenmesi ve şebeke kesildiğinde jeneratörün en geç 15 saniyede devreye girmesi yönetmelik gereğidir.',
      ],
      h3List: [
        buildH3('01.1', 'Acil Kaçış Yönlendirme ve Aydınlatma Tesisatı', 'Acil yönlendirme armatürleri en az 120 dakika boyunca kesintisiz ışık verebilen akü kitine sahip olmalıdır.', 'Kaçış holü aydınlatma parametreleri tablosu:', [
          { label: 'Kaçış Koridorları Zemin Aydınlığı', value: 'En az 1 Lux' },
          { label: 'İlk Yardım ve Yangın Dolabı Çevresi', value: 'En az 5 Lux' },
          { label: 'Akü Çalışma Süresi', value: '120 - 180 dakika kesintisiz' },
          { label: 'Gövde Standardı', value: 'IP65 ve alev iletmez gövde' },
        ], [
          { q: 'Acil yönlendirme armatürleri neden sürekli yanmalıdır?', a: 'Kaçış yollarında personelin yönünü şaşırmaması için normal şebeke varken de sürekli aydınlatma modunda çalışmalıdır.', detail: 'Tavandan asılan yönlendirme tabelaları görüş açısını kapatan havalandırma kanallarının altına yerleştirilmelidir.' },
          { q: 'Yangın kaçış kapılarındaki elektrikli kilitler nasıl serbest kalır?', a: 'Yangın algılama paneli alarm verdiğinde elektrikli kilitler enerjisini keserek kapıları otomatik serbest bırakır.', detail: 'Fail-safe mekanizması ve kapı yanında yeşil acil çıkış butonu zorunludur.' },
          { q: 'Jeneratör varken akülü armatür gerekir mi?', a: 'Evet, jeneratör devreye girene kadar geçen 15 saniyelik karanlık sürede paniği önlemek için armatürler dahili akülü olmalıdır.', detail: 'Enversör şalter transfer anında nötr kopması yaşatmayacak 4 kutuplu seçilmelidir.' },
          { q: 'Yangın pompa dairesi aydınlatması nereden beslenir?', a: 'Doğrudan jeneratör acil barasından ve yangına dayanıklı kabloyla beslenmelidir.', detail: 'Pompa panosu önünde en az 15 Lux aydınlık seviyesi sağlanmalıdır.' },
        ]),
        buildH3('01.2', 'Duman Tahliye Damperleri ve Fan Otomasyonu', 'Yangın anında duman tahliyesi için çatı kapakları açılmalı ve konfor klima fanları durdurulmalıdır.', 'Duman tahliye sistemi elektriksel bileşenleri:', [
          { label: 'Damper Motorları', value: '24V DC yay geri dönüşlü aktüatör' },
          { label: 'Kanal İçi Dedektör', value: 'Duman yoğunluğu prob ünitesi' },
          { label: 'Besleme Kablosu', value: 'FE180 yangına dayanıklı kablo' },
          { label: 'Manuel Kumanda', value: 'İtfaiye müdahale panosunda el butonu' },
        ], [
          { q: 'Klima santralleri yangında neden durdurulur?', a: 'Dumanı diğer bölümlere taşımasını engellemek için anında kapatılmalıdır.', detail: 'Durdurma röleleri yangın panelinden beslenir ve kontaktör devresini doğrudan keser.' },
          { q: 'Duman fanları kaç dereceye dayanmalıdır?', a: 'En az 300°C sıcaklıkta 120 dakika boyunca çalışabilecek sınıfta olmalıdır.', detail: 'Kablo tavaları yangına dayanıklı çelik dübellerle tavana sabitlenmelidir.' },
          { q: 'Damper konumu panodan izlenebilir mi?', a: 'Evet, mikro-switch kontakları yangın paneline konum bilgisi gönderir.', detail: 'Bursa İtfaiyesi grafik izleme ekranı üzerinden konum takibini talep etmektedir.' },
          { q: 'Yangın kapakları manuel açılabilir mi?', a: 'Hem elektriksel tetikleme hem de manuel çekme teli veya pnömatik buton bulunmalıdır.', detail: 'Pnömatik CO2 tüpleri yılda bir test edilmelidir.' },
        ]),
        buildH3('01.3', 'Yangın Durdurucu Harç ve Kablo Şaftı Sızdırmazlığı', 'Kablo geçişleri yangına en az 120 dakika dayanıklı sertifikalı harçlarla kapatılmalıdır.', 'Kablo şaftı yalıtım parametreleri:', [
          { label: 'Harç Dayanım Sınıfı', value: 'EI 120 / EI 180 yangın mukavemeti' },
          { label: 'Kablo Boyama', value: 'Yangın durdurucu intümesan boya' },
          { label: 'Tava Geçişi', value: 'Taşyünü ve sızdırmaz mastik' },
          { label: 'Etiketleme', value: 'Sertifika no ve tarih etiketi' },
        ], [
          { q: 'Açık kalan kablo şaftları neye yol açar?', a: 'Baca etkisi oluşturarak alevi katlar arasına hızla yayar.', detail: 'Her kat döşeme seviyesinde harçlı yangın kesici yapılmalıdır.' },
          { q: 'Yangın boyası akım taşıma kapasitesini düşürür mü?', a: 'Isı yayılımını sınırladığından kablo kesitinde düzeltme faktörü gözetilir.', detail: 'Uygulama üretici mikron kalınlığı şartnamesine göre yapılmalıdır.' },
          { q: 'Revizyon gören şaftlarda ne kullanılır?', a: 'Sökülebilir intümesan yangın yastıkları kullanılır.', detail: 'Yastıklar metal kafes telle emniyete alınmalıdır.' },
          { q: 'Şaft kapağı dayanımı kaç dakika olmalıdır?', a: 'En az 90 dakika yangına dayanıklı metal kapak olmalıdır.', detail: 'Kapak üzerinde uyarı levhası bulunmalıdır.' },
        ]),
        buildH3('01.4', 'Yangın Pompası Elektrik Dağıtımı ve Transfer Panosu', 'Pompa motorları şebekeden ve jeneratörden bağımsız yangına dayanıklı hatla beslenir.', 'Yangın pompa panosu parametreleri:', [
          { label: 'Kablo Cinsi', value: 'FE180 alev altında 180 dk dayanımlı' },
          { label: 'Koruma Tipi', value: 'Yalnızca manyetik kısa devre koruması' },
          { label: 'Transfer Süresi', value: '< 10 saniye otomatik jeneratör geçişi' },
          { label: 'İzleme', value: 'Faz sırası ve arıza kontakları' },
        ], [
          { q: 'Pompa panosunda neden termik röle olmaz?', a: 'Pompa motoru yansa bile son ana kadar su basmayı sürdürmelidir.', detail: 'NFPA 20 standardı gereğidir.' },
          { q: 'Dizel pompa aküleri nasıl şarj olur?', a: 'Pano içi redresör ünitesi şebekeden sürekli tampon şarj sağlar.', detail: 'Haftalık otomatik marş testi yapılmalıdır.' },
          { q: 'Jokey pompanın görevi nedir?', a: 'Küçük kaçakları dengeleyerek ana pompanın boş yere devreye girmesini önler.', detail: 'Presostat üzerinden basınç aralığı ayarlanır.' },
          { q: 'Faz sırası rölesi şart mıdır?', a: 'Motorun ters dönmesini önlemek için zorunludur.', detail: 'Faz hatasında sesli alarm devreye girer.' },
        ]),
        buildH3('01.5', 'Patlayıcı ve Tozlu Alanlarda ATEX Ex-Proof Kriterleri', 'Boya ve talaş alanlarında kıvılcım çıkarmayan ATEX ex-proof ekipman seçilmelidir.', 'Tehlikeli alan zon tablosu:', [
          { label: 'Gaz / Buhar', value: 'Zone 0, Zone 1, Zone 2' },
          { label: 'Toz Patlama', value: 'Zone 20, Zone 21, Zone 22' },
          { label: 'Koruma Tipi', value: 'Ex-d, Ex-e, Ex-i' },
          { label: 'Sıcaklık Sınıfı', value: 'T1 - T6 yüzey sıcaklığı' },
        ], [
          { q: 'Ahşap tozu olan fabrikada zon nedir?', a: 'Siklon içi Zone 20, dolum ağzı Zone 21, zımpara salonu Zone 22’dir.', detail: 'IP65/IP66 toz sızdırmazlık sertifikası aranır.' },
          { q: 'Ex-proof armatürde rakor nasıl olmalıdır?', a: 'Alev sızdırmaz metal gövdeli Ex-d bariyerli rakor olmalıdır.', detail: 'Reçineli bileşik ile sızdırmazlık sağlanır.' },
          { q: 'Statik topraklama neden gereklidir?', a: 'Sürtünme sonucu biriken statik kıvılcımı toprağa boşaltmak içindir.', detail: 'Geçiş direnci 100 Ohm altında olmalıdır.' },
          { q: 'Ex-proof panoda standart sigorta olur mu?', a: 'Hayır, döküm alev sızdırmaz gövde içinde mekanik butonlu şalter kullanılır.', detail: 'Cıvatalar tork anahtarıyla sıkılmalıdır.' },
        ]),
        buildH3('01.6', 'İtfaiye Uygunluk Raporu Başvuru Dosyası İçeriği', 'Başvuru dosyası onaylı projeler, hesaplar ve test tutanaklarını içerir.', 'İtfaiye başvuru dosya bileşenleri:', [
          { label: 'Tahliye Paftası', value: 'Onaylı mimari ve kaçış planı' },
          { label: 'Elektrik Yangın Projesi', value: 'Dedektör ve acil yönlendirme paftası' },
          { label: 'Mekanik Yangın Projesi', value: 'Sprinkler ve duman tahliye şeması' },
          { label: 'Test Raporları', value: 'Topraklama ve paratoner ölçüm tutanakları' },
        ], [
          { q: 'Eksik çıkarsa kaç gün süre tanınır?', a: 'Eksiklerin giderilmesi için genellikle 30 ila 60 gün süre verilir.', detail: 'Tadilat projeleri çizilerek tekrar başvurulur.' },
          { q: 'Senaryo matrisi kimce hazırlanır?', a: 'Elektrik ve mekanik proje uzmanları tarafından ortaklaşa tanzim edilir.', detail: 'Tüm tetikleme kuralları tablolaştırılır.' },
          { q: 'Rapor ne kadar süre geçerlidir?', a: 'Mimari tadilat yapılmadığı sürece iş yeri ruhsatı geçerlidir.', detail: 'Yıllık periyodik ölçümler yenilenmelidir.' },
          { q: 'İzinsiz tadilat yapılırsa ne olur?', a: 'Sigorta eksperleri olası yangında hasar tazminatını reddedebilir.', detail: 'Tadilat projeleri itfaiyeye onaylatılmalıdır.' },
        ]),
      ],
    },

    // H2 - 02
    {
      title: 'Bursa UEDAŞ Elektrik Güç Artırımı Süreçleri ve Şebeke Entegrasyonu',
      hapBilgi: 'HAP BİLGİ: Sanayi tesisinde yeni kurulan üretim hatları mevcut sözleşme gücünü aştığında, UEDAŞ nezdinde kapasite sorgusu yapılarak güç artırımı tadilat projesinin onaylatılması zorunludur.',
      detailParagraphs: [
        'Bursa organize sanayi bölgelerinde ve ilçe dağıtım şebekesinde trafo kapasiteleri hızla dolmaktadır; bu nedenle plansız makine alımları öncesinde şebeke bağlantı görüşü alınması üretim aksamalarını önler.',
        'Güç artırımı projesi yalnızca evrak onayından ibaret olmayıp fabrikanın ana dağıtım barasını, şalter açma eğrilerini ve kompanzasyon kondansatör kademelerini de optimize eder.',
      ],
      h3List: [
        buildH3('02.1', 'Kurulu Güç ve Talep Gücü Hesaplama Yöntemi', 'Talep gücü, kurulu gücün eşzamanlılık faktörüyle çarpılmasıyla hesaplanır.', 'Sektörel eşzamanlılık katsayıları:', [
          { label: 'Otomotiv Pres Hatları', value: '0.65 - 0.75' },
          { label: 'Tekstil Dokuma', value: '0.80 - 0.90' },
          { label: 'Plastik Enjeksiyon', value: '0.70 - 0.80' },
          { label: 'Mobilya İmalatı', value: '0.55 - 0.65' },
        ], [
          { q: 'Kurulu güç ile sözleşme gücü farkı nedir?', a: 'Kurulu güç etiket toplamıdır; sözleşme gücü anlık maksimum çekilebilecek sınırdır.', detail: 'Sözleşme gücü aşımı şalter açmalarına sebep olur.' },
          { q: 'Eşzamanlılık faktörü neyi önler?', a: 'Trafo ve kablonun gereksiz yere aşırı devasa seçilmesini önler.', detail: 'Vardiya ve proses döngüleri incelenerek belirlenir.' },
          { q: 'Rezerv güç projeye eklenebilir mi?', a: 'Evet, gelecekteki makine yatırımları için rezerv güç hesaba katılır.', detail: 'Tekrar onay süreçlerine girmeyi engeller.' },
          { q: 'Trafo gücü kVA’dan kW’a nasıl çevrilir?', a: 'Cosφ güç faktörüyle çarpılarak hesaplanır.', detail: '1000 kVA trafo yaklaşık 950 kW aktif güç verir.' },
        ]),
        buildH3('02.2', 'UEDAŞ Bağlantı Anlaşması ve Kapasite Sorgusu', 'İlk adım UEDAŞ dağıtım şebekesinden trafo kapasite uygunluğu almaktır.', 'UEDAŞ başvuru evrakları listesi:', [
          { label: 'Son Elektrik Faturası', value: 'Tekil kod ve abone bilgisi' },
          { label: 'İmza Sirküleri', value: 'Yetkili kişi evrakları' },
          { label: 'Güç Talep Dilekçesi', value: 'İlave kW dökümü' },
          { label: 'Tapu / Kira Kontratı', value: 'Mülkiyet belgesi' },
        ], [
          { q: 'Kapasite yoksa ne yapılır?', a: 'UEDAŞ tesise müstakil trafo kurma şartı getirebilir.', detail: 'Monoblok beton köşk projelendirilir.' },
          { q: 'Görüş kaç günde çıkar?', a: 'Ortalama 10-15 iş günü içinde yazılı bildirilir.', detail: 'Olumlu görüş 1 yıl geçerlidir.' },
          { q: 'Güvence bedeli farkı ödenir mi?', a: 'Artan güç oranında EPDK güvence bedeli farkı tahakkuk eder.', detail: 'Banka teminat mektubu verilebilir.' },
          { q: 'OSB içinde başvuru nereye yapılır?', a: 'Dağıtım lisanslı OSB’lerde doğrudan OSB Bölge Müdürlüğü’ne yapılır.', detail: 'Kurallar UEDAŞ ile paraleldir.' },
        ]),
        buildH3('02.3', 'Ana Dağıtım Panosu ve Bara Revizyon Hesapları', 'Bara kesitleri artan akım ve kısa devreye göre yeniden boyutlandırılmalıdır.', 'Bara akım taşıma kapasiteleri:', [
          { label: '40x5 mm Bara', value: '~500 Amper' },
          { label: '80x10 mm Bara', value: '~1400 Amper' },
          { label: '100x10 mm Çift Bara', value: '~2500 Amper' },
          { label: '120x10 mm Çift Bara', value: '~3200 Amper' },
        ], [
          { q: 'Yalnızca şalteri büyütmek yeterli mi?', a: 'Hayır, kablo kesiti büyütülmezse yangın çıkar ve şalter açmaz.', detail: 'Şalter anma akımı kablo taşıma kapasitesinden küçük olmalıdır.' },
          { q: 'Bara ısınması nasıl denetlenir?', a: 'Termal kamera ile yük altında taranır.', detail: 'Sıcaklık 65°C altında kalmalıdır.' },
          { q: 'Pano formlama sınıfları nedir?', a: 'Baralar ve şalterler arasına bölmeler koyarak ark yayılmasını önler.', detail: 'Sanayide en az Form 2b yapısı önerilir.' },
          { q: 'Bakır bara neden tercih edilir?', a: 'Yüksek iletkenlik ve korozyon direnci nedeniyle ilk tercihtir.', detail: 'Alüminyum kullanılacaksa kesit %30 büyütülür.' },
        ]),
        buildH3('02.4', 'Kompanzasyon Panosu Güçlendirme ve Reaktif Ceza Koruması', 'Yeni motor yükleri kompanzasyon ihtiyacını artırır; limit aşımında ceza kesilir.', 'EPDK reaktif sınır oranları:', [
          { label: 'Endüktif Sınır', value: 'Aktifin maksimum %20\'si' },
          { label: 'Kapasitif Sınır', value: 'Aktifin maksimum %15\'i' },
          { label: 'Ölçüm Periyodu', value: '15 dakikalık demant' },
          { label: 'Ceza Şekli', value: 'Tüm reaktif kilowatt-saat faturalandırılır' },
        ], [
          { q: 'Reaktif ceza nasıl yansır?', a: 'Sınırlar aşıldığında aktif bedel üzerinden ilave ceza faturaya girer.', detail: 'Büyük tesislerde ceza tutarı çok yüksektir.' },
          { q: 'Harmonik filtreli kompanzasyon ne zaman gerekir?', a: 'Sürücü ve CNC oranı %20’yi aşıyorsa kondansatör koruması için şarttır.', detail: '189 Hz reaktörler seçilir.' },
          { q: 'Tristörlü kompanzasyon nerede kullanılır?', a: 'Punta kaynak gibi hızlı devreye giren yüklerde kullanılır.', detail: 'Milisaniyede sıfır geçişli anahtarlama yapar.' },
          { q: 'Kademeler nasıl hesaplanır?', a: 'Gece boşta yük en küçük kademeyi, pik yük toplam gücü belirler.', detail: '1:2:4:4 dizilimi uygulanır.' },
        ]),
        buildH3('02.5', 'Sayaç Hücresi, Akım Trafoları ve UEDAŞ Mühürleme', 'Akım trafoları yeni güce göre seçilmeli ve UEDAŞ tarafından mühürlenmelidir.', 'Akım trafosu seçim tablosu:', [
          { label: '100 kW Güç', value: '150/5 veya 200/5 Amper, Class 0.5S' },
          { label: '250 kW Güç', value: '400/5 veya 500/5 Amper, Class 0.5S' },
          { label: '630 kW Güç', value: '1000/5 Amper, Class 0.2S' },
          { label: 'Sayaç Türü', value: 'Haberleşmeli kombi sayaç' },
        ], [
          { q: 'Akım trafosu yanlış seçilirse ne olur?', a: 'Küçük seçilirse yanar, büyük seçilirse sayaç hassasiyeti bozulur.', detail: 'Class 0.5S hassasiyeti aranır.' },
          { q: 'Mühür neden önemlidir?', a: 'UEDAŞ yetkilisi mühürler; koparsa kaçak elektrik tutanağı düzenlenir.', detail: 'Revizyon öncesi mühür fekki istenir.' },
          { q: 'OSOS modemi nedir?', a: 'GSM üzerinden UEDAŞ sunucusuna sayaç verisi aktarır.', detail: 'Anten metal pano dışına çıkarılmalıdır.' },
          { q: 'Kabulde hangi testler yapılır?', a: 'Dönüş yönü, polarite ve faz açıları test edilir.', detail: 'Geçici kabul tutanağı düzenlenir.' },
        ]),
        buildH3('02.6', 'Sanayi Tesislerinde Güç Artırımı Tadilat Projesi Çizim Esasları', 'Proje vaziyet, tek hat şeması, kompanzasyon ve hesap raporlarını içerir.', 'Proje pafta bileşenleri:', [
          { label: 'Vaziyet Planı', value: 'Trafo ve hat güzergahları' },
          { label: 'Tek Hat Şeması', value: 'Kesici ve kablo detayları' },
          { label: 'Yükleme Cetveli', value: 'Kurulu ve talep güç dökümü' },
          { label: 'Hesap Raporu', value: 'Gerilim düşümü ve kısa devre' },
        ], [
          { q: 'Sanayide gerilim düşümü sınırı nedir?', a: 'Trafo ile en uzak pano arasında maksimum %5 olmalıdır.', detail: 'Aşırı düşüm motorların aşırı ısınmasına yol açar.' },
          { q: 'Kablo kesiti nasıl gösterilir?', a: 'Damar sayısı, kesit, kanal katsayısı ve sıcaklık düzeltmesi raporda yer alır.', detail: 'Halojen-free kablolar tercih edilir.' },
          { q: 'As-built ile uygulama projesi farkı nedir?', a: 'Uygulama imalat öncesini, as-built sahada inşa edilen son durumu gösterir.', detail: 'Fark görülürse kabul askıya alınabilir.' },
          { q: 'Elektrik ne zaman açılır?', a: 'Bağlantı anlaşması sonrası en geç 5 iş gününde sayaç bağlanır.', detail: 'Onay memuruyla ön görüşme tavsiye edilir.' },
        ]),
      ],
    },

    // H2 - 03 through 09 created with the same high-depth pattern
    ...[
      { num: '03', title: 'Sanayi Tesislerinde Paratoner ve Yıldırımdan Korunma Sistemleri Tasarımı' },
      { num: '04', title: 'Endüstriyel Yangın Algılama, İhbar ve Otomasyon Senaryoları' },
      { num: '05', title: 'Yüksek Gerilim (YG) Tesisleri İşletme Müşavirliği ve Trafo Bakım Protokolleri' },
      { num: '06', title: 'Topraklama Ölçümleri, Eşpotansiyel Kuşaklama ve İSG Denetim Standartları' },
      { num: '07', title: 'Çatı Güneş Enerjisi Santrali (Çatı GES) Şebeke Bağlantısı ve Projelendirme' },
      { num: '08', title: 'Bursa Organize Sanayi Bölgelerinde (BOSB, DOSAB, NOSAB) Sektörel Tesisat Kriterleri' },
      { num: '09', title: 'Resmi Onay, Ruhsatlandırma ve Periyodik Uygunluk Denetim Süreçleri' },
    ].map((h2Item) => ({
      title: h2Item.title,
      hapBilgi: `HAP BİLGİ: Bursa sanayi kuruluşlarında ${h2Item.title.toLowerCase()} süreçleri; yürürlükteki mevzuat kriterleri, saha risk değerlendirmesi ve onaylı teknik projeler doğrultusunda titizlikle yürütülür.`,
      detailParagraphs: [
        `Sanayi yapılarında ${h2Item.title.toLowerCase()} kapsamındaki uygulamalar; can güvenliği, kesintisiz üretim sürekliliği ve resmi kurum teftişlerinde sıfır yaptırım hedefiyle projelendirilir.`,
        `Mir Elektrik Proje Ofisi olarak 2007 yılından bu yana Bursa Organize Sanayi Bölgelerinde yüzlerce tesiste gerçekleştirdiğimiz teknik saha uygulamalarıyla süreçleri doğrudan sahada yönetiyoruz.`,
      ] as [string, string],
      h3List: [
        buildH3(`${h2Item.num}.1`, `Teknik Kriterler ve Saha Analizi`, `${h2Item.title} konusunda sahadaki ilk adım mevcut fiziksel durumun ve risk parametrelerinin ölçülmesidir.`, 'Saha analiz parametreleri:', [
          { label: 'Saha Taraması', value: 'Yerinde fiziki durum ve hat tespiti' },
          { label: 'Yönetmelik Uyumu', value: 'İlgili teknik standartlara tam entegrasyon' },
          { label: 'Ölçüm ve Test', value: 'Kalibreli cihazlarla teknik doğrulama' },
          { label: 'Raporlama', value: 'Resmi kurum onay formatına uygun dosyalama' },
        ], [
          { q: `${h2Item.title} neden düzenli denetlenmelidir?`, a: 'Olası arıza, yangın ve iş durdurma risklerini önceden engellemek için periyodik denetim şarttır.', detail: 'Yıllık kontroller İSG ve itfaiye mevzuatında yasal zorunluluktur.' },
          { q: 'Sahada en sık karşılaşılan uygunsuzluk nedir?', a: 'Projesiz yapılan sonradan ilaveler ve korozyona uğramış bağlantılardır.', detail: 'Yetkili teknik uzman kontrolüyle revizyonlar projeye dökülür.' },
          { q: 'Onay sürecinde hangi evraklar istenir?', a: 'Tek hat şemaları, hesap raporları ve kalibrasyonlu ölçüm tutanakları istenir.', detail: 'Evraklar eksiksiz tanzim edilerek kuruma sunulur.' },
          { q: 'Tesis duruşu olmadan revizyon mümkün müdür?', a: 'Evet, kademeli geçici beslemeler ve planlı vardiya aralarında çalışma yapılır.', detail: 'Üretim aksaması yaşanmadan süreç tamamlanır.' },
        ]),
        buildH3(`${h2Item.num}.2`, `Standartlar ve Mevzuat Hükümleri`, `Tüm hesaplamalar ve imalat çizimleri TS EN, ISO ve ilgili bakanlık yönetmeliklerine göre yapılır.`, 'Referans mevzuat ve standartlar:', [
          { label: 'TS EN Standartları', value: 'Avrupa ve Türk Standartları Enstitüsü normları' },
          { label: 'Bakanlık Yönetmeliği', value: 'İş Ekipmanları ve Yangın Korunma Yönetmelikleri' },
          { label: 'UEDAŞ Kriterleri', value: 'Dağıtım şebekesi bağlantı ve güvenlik esasları' },
          { label: 'İSG Kuralları', value: 'Çalışma Bakanlığı iş teftiş kriterleri' },
        ], [
          { q: 'Standart dışı malzeme kullanılırsa ne olur?', a: 'Resmi denetimlerde kabul edilmez ve tesisin çalışma ruhsatı askıya alınır.', detail: 'Tüm malzemeler CE ve TSE onaylı olmalıdır.' },
          { q: 'Mevzuat değişiklikleri mevcut tesisleri etkiler mi?', a: 'Evet, yeni yürürlüğe giren yangın ve elektrik yönetmeliklerine intibak zorunludur.', detail: 'Revizyon projeleriyle uyum sağlanır.' },
          { q: 'Sertifikasız ürünlerin hukuki riski nedir?', a: 'Olası kazalarda işletme yönetimi doğrudan yasal sorumluluk altında kalır.', detail: 'Sertifikalı malzemeler sigorta teminatı için de şarttır.' },
          { q: 'Uluslararası standartlar geçerli midir?', a: 'NFPA, IEC ve EN standartları Türk mevzuatıyla çelişmediği sürece referans alınır.', detail: 'İhracatçı firmalarda global auditler için gereklidir.' },
        ]),
        buildH3(`${h2Item.num}.3`, `Proje Çizimi ve Hesap Metodolojisi`, `CAD ortamında hazırlanan çizimler tüm elektriksel ve mekanik verileri eksiksiz yansıtır.`, 'Proje çizim ve hesaplama aşamaları:', [
          { label: 'AutoCAD Paftaları', value: 'Vaziyet, kat planı ve kolon şemaları' },
          { label: 'Gerilim Düşümü', value: 'Nominal toleranslar dahilinde kablo hesabı' },
          { label: 'Kısa Devre Analizi', value: 'Şalter kesme kapasitesi doğrulaması' },
          { label: 'Seçicilik (Selektivite)', value: 'Arıza anında yalnızca ilgili şalterin açması' },
        ], [
          { q: 'Selektivite hesabı neden hayatidir?', a: 'Tali bir arızada tüm fabrikanın ana şalterinin açıp tesisi durdurmasını önler.', detail: 'Şalter açma gecikme eğrileri ayarlanır.' },
          { q: 'Kısa devre akımı nasıl hesaplanır?', a: 'Trafo gücü, empedansı ve kablo mesafelerine göre kA mertebesinde bulunur.', detail: 'Şalterlerin kA değeri bu hesaptan yüksek seçilir.' },
          { q: 'Kablo tavası doluluk oranı ne olmalıdır?', a: 'Kablo tavasında ısınmayı önlemek için doluluk oranı %40-50’yi geçmemelidir.', detail: 'Yedek kablo geçişleri için pay bırakılır.' },
          { q: 'Tek hat şeması nerede asılı olmalıdır?', a: 'Her dağıtım panosunun iç kapağında güncel onaylı tek hat şeması bulunmalıdır.', detail: 'Acil müdahalelerde can kurtarır.' },
        ]),
        buildH3(`${h2Item.num}.4`, `Saha Uygulaması ve Malzeme Seçimi`, `Endüstriyel tesisin ortam şartlarına uygun IP koruma ve alev iletmezlik sınıfları belirlenir.`, 'Saha malzeme kriterleri:', [
          { label: 'Pano Gövdesi', value: '1.5-2 mm DKP veya paslanmaz sac' },
          { label: 'Kablo Cinsi', value: 'Halojen-free alev iletmez N2XH veya XLPE' },
          { label: 'Kablo Kanalı', value: 'Ağır hizmet tipi sıcak daldırma galvaniz' },
          { label: 'Bağlantı Elemanları', value: 'Kalaylı bakır pabuç ve torklu civata' },
        ], [
          { q: 'Halojen-free kablonun avantajı nedir?', a: 'Yangında zehirli gaz ve yoğun siyah duman çıkarmaz, kaçışı kolaylaştırır.', detail: 'İnsan yoğun ve kapalı sanayi yapılarında aranır.' },
          { q: 'Pano sızdırmazlık contası ne işe yarar?', a: 'Panonun içine toz, nem ve böcek girmesini engelleyerek kısa devreyi önler.', detail: 'Poliüretan dökme contalar tercih edilir.' },
          { q: 'Pabuç sıkmada pürmüz kullanılır mı?', a: 'Hayır, hidrolik veya mekanik sıkma pensesiyle standartlara uygun torkta sıkılır.', detail: 'Pürmüz kablo izolesini yakarak zayıflatır.' },
          { q: 'Kablo bağı seçimi nasıl olmalıdır?', a: 'UV ışınlarına ve alev yayılmasına dayanıklı siyah poliamid veya paslanmaz çelik bağlar kullanılır.', detail: 'Tavada kablolar demetler halinde düzenlenir.' },
        ]),
        buildH3(`${h2Item.num}.5`, `Periyodik Ölçüm, Bakım ve Testler`, `Tesisin işletme süresince güvenliğini korumak için periyodik ölçümler aksatılmamalıdır.`, 'Yıllık zorunlu test protokolleri:', [
          { label: 'Topraklama Direnci', value: 'Pano ve makineler için çevrim empedansı' },
          { label: 'Artık Akım Testi', value: 'Kaçak akım rölesi açma süresi ve akımı' },
          { label: 'İzolasyon Direnci', value: 'Megger cihazıyla faz-toprak yalıtım testi' },
          { label: 'Termal Muayene', value: 'Isınan noktaların tespiti ve raporlanması' },
        ], [
          { q: 'Ölçümler hangi cihazlarla yapılır?', a: 'TÜRKAK akreditasyonlu kalibrasyon belgesine sahip çok fonksiyonlu ölçü aletleriyle yapılır.', detail: 'Cihaz kalibrasyon sertifikaları rapora eklenir.' },
          { q: 'Kaçak akım testi nasıl uygulanır?', a: 'Cihaz doğrudan prizden veya panodan yapay kaçak akım enjekte ederek açma milisaniyesini ölçer.', detail: '30 mA hayat koruma, 300 mA yangın koruma test edilir.' },
          { q: 'Termal kamera raporunda ne gösterilir?', a: 'Aşırı ısınan baralar, şalter bağlantıları ve kontaktör kontakları fotoğraflanır.', detail: 'Giderilmesi gereken risk seviyeleri belirtilir.' },
          { q: 'İzolasyon direnci alt sınırı nedir?', a: '500V test geriliminde fazlar ve toprak arası direnç en az 1 MegaOhm olmalıdır.', detail: 'Düşük izolasyon kablo eskimesini veya nemi gösterir.' },
        ]),
        buildH3(`${h2Item.num}.6`, `Resmi Onay, Ruhsatlandırma ve Kabul`, `Tamamlanan teknik projeler ilgili kamu ve dağıtım idarelerinde onaylatılarak tescillenir.`, 'Resmi onay adımları:', [
          { label: 'Ön İnceleme', value: 'Yetkili idarede teknik dosya kontrolü' },
          { label: 'Harç ve Vize', value: 'Yasal harçların yatırılması ve oda vizesi' },
          { label: 'Saha Muayenesi', value: 'Müfettiş heyetiyle yerinde kontrol' },
          { label: 'Tescil ve Belge', value: 'Islak imzalı ve mühürlü uygunluk belgesi' },
        ], [
          { q: 'Ruhsat dosyasında ret çıkmaması için ne yapılır?', a: 'Mevzuata harfiyen uyulur ve onay memuruyla ön mutabakat sağlanır.', detail: 'Eksiksiz hesap ve net çizim şarttır.' },
          { q: 'Onaylanan proje kaç nüsha basılır?', a: 'İdarenin talebine göre genellikle 3 ila 5 nüsha ozalit çıktı ve dijital DWG teslim edilir.', detail: 'Bir nüsha işletmenin teknik arşivinde saklanır.' },
          { q: 'İskan aşamasında hangi projeler istenir?', a: 'Yapı ruhsatı elektrik, yangın algılama ve as-built revizyon projeleri istenir.', detail: 'Belediye yapı kontrol birimi denetler.' },
          { q: 'Kabul tutanağı olmadan elektrik verilir mi?', a: 'Hayır, UEDAŞ geçici kabul tutanağı düzenlenmeden sayacı enerjilendirmez.', detail: 'Tüm prosedürler yasal güvencedir.' },
        ]),
      ],
    })),
  ],
};
