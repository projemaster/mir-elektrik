import React from 'react';
import { COMPANY_INFO } from '../data/siteData';
import { Award, ShieldCheck, MapPin, Building, Users, CheckCircle2, Phone } from 'lucide-react';

interface AboutSectionProps {
  onOpenQuote: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenQuote }) => {
  return (
    <section id="about" className="py-20 bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Sol Sütun: Açıklama ve Hikaye */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>2007'den Bu Yana Bursa'da Güvenin Adı</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Mir Elektrik Proje Ofisi & Ebru Annak Tanış
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Mir Elektrik Proje Ofisi, Proje Sorumlusu <strong>Ebru Annak Tanış</strong> liderliğinde 2007 yılında Bursa'da kurulmuştur. 18 yılı aşkın süredir Bursa UEDAŞ kayıtlı yetkili elektrik firması olarak sanayi ve ticari tesislerin elektrik proje ve teknik süreçlerini yürütmektedir.
            </p>

            <p className="text-sm text-slate-300 leading-relaxed">
              Bursa'nın köklü organize sanayi bölgeleri (BOSB, DOSAB, NOSAB, İnegöl, TEKNOSAB) başta olmak üzere UEDAŞ elektrik dağıtım bölgesinde yer alan <strong>Bursa, Balıkesir, Çanakkale ve Yalova</strong> illerinde 1.250'den fazla onaylanan ruhsat, güç artırımı, paratoner ve yangın uygunluk projesini sahada başarıyla sonuçlandırmıştır.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>UEDAŞ Kayıtlı Yetkili Firma</span>
                </div>
                <p className="text-xs text-slate-400">
                  Resmi imar yönetmelikleri ve dağıtım şirketi şartnamelerine tam uyumlu, titiz teknik proje yönetimi.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-1">
                  <Users className="w-4 h-4" />
                  <span>Doğrudan Teknik İletişim</span>
                </div>
                <p className="text-xs text-slate-400">
                  Aracı olmadan, doğrudan projenizi yöneten yetkili teknik kadromuzla görüşür; tüm teknik revizyonları sahada çözersiniz.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenQuote}
                className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md"
              >
                Bizimle İletişime Geçin
              </button>
            </div>
          </div>

          {/* Sağ Sütun: Kurumsal Bilgi Kartı */}
          <div className="lg:col-span-5">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
                <div className="w-12 h-12 rounded-xl bg-amber-400 flex items-center justify-center font-black text-slate-950 text-2xl">
                  M
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">MIR ELEKTRİK PROJE OFİSİ</h3>
                  <p className="text-xs text-slate-400">Bursa UEDAŞ Kayıtlı Yetkili Elektrik Firması</p>
                </div>
              </div>

              <dl className="space-y-3.5 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-900">
                  <dt className="text-slate-400">Proje Sorumlusu:</dt>
                  <dd className="font-semibold text-white">Ebru Annak Tanış</dd>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-900">
                  <dt className="text-slate-400">Kuruluş Yılı:</dt>
                  <dd className="font-semibold text-amber-400 tabular-nums">2007 (18+ Yıl)</dd>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-900">
                  <dt className="text-slate-400">Yetki Statüsü:</dt>
                  <dd className="font-semibold text-emerald-400">UEDAŞ Kayıtlı Yetkili Firma</dd>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-900">
                  <dt className="text-slate-400">UEDAŞ Sorumluluk Sahası:</dt>
                  <dd className="font-semibold text-white">Bursa, Balıkesir, Çanakkale, Yalova</dd>
                </div>
                <div className="flex justify-between py-1.5">
                  <dt className="text-slate-400">Bursa Ofis Adresi:</dt>
                  <dd className="font-semibold text-white text-right max-w-[200px]">
                    Doğanbey Mh. Burçin 3 İş Merkezi No: 906, Osmangazi / BURSA
                  </dd>
                </div>
              </dl>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Ofisimiz Osmangazi merkezde olup; Bursa'daki tüm organize sanayi bölge müdürlükleri, ilçe belediyeleri ve UEDAŞ birimlerine kolay erişim noktasındadır.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
