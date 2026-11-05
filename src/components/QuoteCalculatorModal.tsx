import React, { useState } from 'react';
import { QuickQuoteFormData } from '../types/site';
import { SERVICES_LIST } from '../data/siteData';
import { Calculator, Send, CheckCircle2, X, Phone, Clock, FileCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuoteCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuoteCalculatorModal: React.FC<QuoteCalculatorModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<QuickQuoteFormData>({
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    district: 'Nilüfer / NOSAB',
    serviceType: SERVICES_LIST[0].title,
    facilityType: 'Sanayi / Fabrika',
    powerKw: '160',
    areaSqm: '1200',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  // Approximate estimation calculations for timeline
  const calculateEstimate = () => {
    let days = '3-5 İş Günü';
    let approvalTime = '1-2 Hafta (UEDAŞ / Belediye)';
    let requiredMainDocs = 'Mimari DWG, Tapu, İmar Durum Belgesi';

    if (formData.serviceType.includes('Güç Artırımı')) {
      days = '2-4 İş Günü (Proje Çizimi)';
      approvalTime = '2-3 Hafta (UEDAŞ Kapasite & Anlaşma)';
      requiredMainDocs = 'Mevcut Fatura, Vergi Levhası, İlave Makine Güç Listesi';
    } else if (formData.serviceType.includes('YG') || formData.serviceType.includes('Trafo')) {
      days = '24-48 Saat (İlk Durum Tespiti & Sözleşme)';
      approvalTime = 'Anında EMO Tescili & UEDAŞ Bildirimi';
      requiredMainDocs = 'Trafo Etiket Bilgisi, Tek Hat Şeması, İmza Sirküleri';
    } else if (formData.serviceType.includes('Topraklama')) {
      days = 'Aynı Gün Saha Ölçümü';
      approvalTime = '24 Saat İçinde Rapor Teslimi';
      requiredMainDocs = 'Tesis Adresi ve Pano / Makine Listesi';
    } else if (formData.serviceType.includes('GES')) {
      days = '1-2 Hafta (Projelendirme)';
      approvalTime = '1-2 Ay (UEDAŞ Çağrı Mektubu Süreci)';
      requiredMainDocs = 'Son 12 Aylık Fatura, Çatı Statik Raporu, Trafo Bilgileri';
    }

    return { days, approvalTime, requiredMainDocs };
  };

  const estimate = calculateEstimate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch (err) {}

    // Formatted WhatsApp message link
    const message = `*Mir Elektrik Proje Teklif & Keşif Talebi*
*Ad Soyad:* ${formData.fullName}
*Firma:* ${formData.companyName || 'Belirtilmedi'}
*Telefon:* ${formData.phone}
*E-posta:* ${formData.email || 'Belirtilmedi'}
*Bölge/İlçe:* ${formData.district}
*Hizmet:* ${formData.serviceType}
*Tesis Türü:* ${formData.facilityType}
*Güç:* ${formData.powerKw} kW/kVA
*Alan:* ${formData.areaSqm} m²
*Notlar:* ${formData.notes || 'Yok'}`;

    setTimeout(() => {
      window.open(`https://wa.me/905462522515?text=${encodeURIComponent(message)}`, '_blank');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[95vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative text-white">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800 transition-colors"
          aria-label="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Keşif Talebiniz Alındı!</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto mb-6">
              Teknik ekibimiz ve Proje Sorumlumuz <strong>Ebru Annak Tanış</strong>, talebinizi inceleyerek 15 dakika içinde telefon veya WhatsApp üzerinden teknik detayları paylaşacaktır.
            </p>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 max-w-sm mx-auto text-xs text-slate-400 mb-6">
              <div>📍 <strong>Bursa Ofisi:</strong> Osmangazi Burçin 3 İş Merkezi No:906</div>
              <div className="mt-1">📞 <strong>Acil İletişim:</strong> 0546 252 25 15</div>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-colors"
            >
              Tamam
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              <Calculator className="w-4 h-4" />
              <span>Proje Keşif & Süreç Hesaplayıcı</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white mb-2">
              Bursa Elektrik Proje & Keşif Talep Formu
            </h2>
            <p className="text-xs text-slate-300 mb-6">
              Tesis veya inşaat bilgilerinizi seçerek tahmini proje çizim ve resmi onay sürelerini anında görebilirsiniz.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Hizmet ve Tesis Tipi */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Hizmet Türü *</label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    {SERVICES_LIST.map(srv => (
                      <option key={srv.id} value={srv.title}>{srv.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Tesis / Yapı Tipi</label>
                  <select
                    value={formData.facilityType}
                    onChange={(e) => setFormData({ ...formData, facilityType: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option>Sanayi Fabrikası / İmalathane</option>
                    <option>Ticari Plaza / İş Merkezi</option>
                    <option>Konut Sitesi / Apartman</option>
                    <option>Otel / Turizm Tesisi</option>
                    <option>Depo / Lojistik Alanı</option>
                    <option>Tarımsal Sulama / Hayvancılık</option>
                  </select>
                </div>
              </div>

              {/* Lokasyon ve Güç */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">İlçe / Sanayi Bölgesi *</label>
                  <select
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option>Nilüfer / NOSAB</option>
                    <option>Demirtaş / DOSAB</option>
                    <option>BTSO OSB</option>
                    <option>Hasanağa OSB</option>
                    <option>Kayapa OSB</option>
                    <option>Osmangazi</option>
                    <option>Yıldırım</option>
                    <option>İnegöl Mobilya OSB</option>
                    <option>Gemlik / Serbest Bölge</option>
                    <option>Mudanya</option>
                    <option>Balıkesir / Çanakkale / Yalova</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Tahmini Güç (kW/kVA)</label>
                  <input
                    type="number"
                    value={formData.powerKw}
                    onChange={(e) => setFormData({ ...formData, powerKw: e.target.value })}
                    placeholder="Örn: 160"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Kapalı Alan (m²)</label>
                  <input
                    type="number"
                    value={formData.areaSqm}
                    onChange={(e) => setFormData({ ...formData, areaSqm: e.target.value })}
                    placeholder="Örn: 1200"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Tahmini Süreç Bilgilendirme Kutusu (Hesaplayıcı Çıktısı) */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Tahmini Proje Çizim Süresi:</span>
                  </span>
                  <span className="font-bold text-white">{estimate.days}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-1.5 text-slate-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Resmi Onay Süresi:</span>
                  </span>
                  <span className="font-bold text-emerald-400">{estimate.approvalTime}</span>
                </div>
                <div className="pt-2 border-t border-slate-900 text-slate-400 text-[11px]">
                  <strong>Gerekli Başlıca Evraklar:</strong> {estimate.requiredMainDocs}
                </div>
              </div>

              {/* İletişim Bilgileri */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Adınız Soyadınız *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Adınız Soyadınız"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Firma / Kurum Adı</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Şirket Unvanı"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Telefon Numaranız *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0546 252 25 15"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">E-Posta Adresiniz</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ornek@sirket.com"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Özel Açıklamalarınız / Notlar</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Trafo kapasitesi, makine güçleri veya varsa proje teslim tarihiniz..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold rounded-xl text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 mt-2"
              >
                <Send className="w-4 h-4" />
                <span>Teknik Keşif & Fiyat Teklifi Talebini Gönder</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
