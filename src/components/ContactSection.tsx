import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/siteData';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, ShieldCheck, Globe } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    subject: 'Bursa Elektrik Projesi Keşif Talebi',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `*Mir Elektrik Proje Ofisi İletişim Formu*
*Gönderen:* ${formState.name}
*Telefon:* ${formState.phone}
*Konu:* ${formState.subject}
*Mesaj:* ${formState.message}`;
    window.open(`https://wa.me/905462522515?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-slate-950 text-white border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-2">
            İletişim & Lokasyon
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Bursa Osmangazi Ofisimize Bekleriz
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
            Elektrik ruhsat projeleri, trafo müşavirliği, itfaiye uygunluk ve UEDAŞ güç artırımı konularında teknik keşif planlamak için doğrudan telefonla ulaşabilir veya ofisimizde görüşebilirsiniz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* İletişim Bilgileri Kartı (Kullanıcı Kuralı) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              
              <div className="pb-4 border-b border-slate-800 space-y-1">
                <h3 className="text-lg font-bold text-white">Mir Elektrik Proje Ofisi</h3>
                <p className="text-xs text-amber-400 font-medium">Bursa UEDAŞ Kayıtlı Yetkili Elektrik Firması</p>
                <p className="text-[11px] text-slate-500">2007 Kuruluş · Proje Sorumlusu: Ebru Annak Tanış</p>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-400/10 text-amber-400 rounded-xl border border-amber-400/20 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Ofis Adresi</h4>
                  <p className="text-sm font-semibold text-white leading-relaxed">
                    Doğanbey Mh. Burçin 3 İş Merkezi No: 906, Osmangazi / BURSA
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-400/10 text-amber-400 rounded-xl border border-amber-400/20 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Telefon / GSM</h4>
                  <p className="text-base font-bold text-white">
                    <a href="tel:+905462522515" className="hover:text-amber-400 transition-colors">0546 252 25 15</a>
                  </p>
                  <p className="text-base font-bold text-white">
                    <a href="tel:+905462522516" className="hover:text-amber-400 transition-colors">0546 252 25 16</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-400/10 text-amber-400 rounded-xl border border-amber-400/20 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">E-Posta</h4>
                  <p className="text-sm text-slate-300">
                    <a href="mailto:mirelektrikebru@gmail.com" className="hover:underline">mirelektrikebru@gmail.com</a>
                  </p>
                  <p className="text-sm text-slate-300">
                    <a href="mailto:ebru@mirelektrikproje.com" className="hover:underline">ebru@mirelektrikproje.com</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-400/10 text-amber-400 rounded-xl border border-amber-400/20 shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Resmi Web Sitesi</h4>
                  <p className="text-sm text-amber-400 font-mono">
                    <a href="https://mirelektrikproje.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                      https://mirelektrikproje.com/
                    </a>
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <a
                  href="https://wa.me/905462522515?text=Merhaba,%20Mir%20Elektrik%20Proje%20Ofisi%20Bursa%20hizmetleriniz%20hakk%C4%B1nda%20g%C3%B6r%C3%BC%C5%9Fmek%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-900/30"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp ile Doğrudan Yazın</span>
                </a>
              </div>
            </div>
          </div>

          {/* Harita ve Mesaj Formu */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-xl h-64 bg-slate-900 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.8828945417674!2d29.06208577648356!3d40.18944517147774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ca3dfb01e309cb%3A0xe54e612f0f4cfbd1!2zRG_En2FuYmV5LCBEb8SfYW5iZXkgQ2QuIE5vOjMsIDE2MjIwIE9zbWFuZ2F6aS9CdXJzYQ!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mir Elektrik Proje Ofisi Bursa Harita"
              ></iframe>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-base font-bold text-white mb-3">Teknik Danışmanlık ve Keşif Talebi İletin</h3>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Adınız Soyadınız"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Telefon Numaranız"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <textarea
                  rows={3}
                  required
                  placeholder="Fabrikanızın konumu, trafo veya itfaiye denetimi hakkındaki detaylar..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                ></textarea>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-xs transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Teknik Keşif Talebini Gönder (WhatsApp)</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
