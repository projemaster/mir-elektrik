import React, { useState } from 'react';
import JSZip from 'jszip';
import { generateCPanelFiles } from '../utils/cpanelHtmlGenerator';
import { CPanelFile } from '../types/site';
import { 
  FolderDown, 
  FileCode, 
  Folder, 
  Copy, 
  Check, 
  Download, 
  ExternalLink, 
  Sparkles, 
  Server, 
  FileText, 
  Settings, 
  Search,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface CPanelHubProps {
  onClose?: () => void;
}

export const CPanelHub: React.FC<CPanelHubProps> = ({ onClose }) => {
  const files = generateCPanelFiles();
  const [selectedFile, setSelectedFile] = useState<CPanelFile>(files[0]);
  const [copied, setCopied] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [activeTab, setActiveTab] = useState<'explorer' | 'guide' | 'schema'>('explorer');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFiles = files.filter(f => 
    f.fullPath.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.urlPath.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(selectedFile.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDownloadSingleFile = () => {
    const blob = new Blob([selectedFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = selectedFile.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();

      // Place all files into public_html root or matching subfolders
      files.forEach(file => {
        // e.g. "public_html/hizmetler/cati-ges-projeleri/index.html" -> "hizmetler/cati-ges-projeleri/index.html"
        const relativePath = file.fullPath.replace(/^public_html\//, '');
        zip.file(relativePath, file.content);
      });

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'mir-elektrik-proje-cpanel-public_html.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('ZIP generation error:', err);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
            <Server className="w-4 h-4" />
            <span>cPanel & Sunucu Dağıtım Merkezi</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            Eksiksiz HTML Dosya Mimarisi ve cPanel Paketi
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Tüm sayfalar Google SEO ve cPanel <strong>public_html</strong> standartlarına göre klasör klasör oluşturulmuştur. Dosyaları tek tek inceleyebilir veya tek tıkla ZIP olarak indirip cPanel'e yükleyebilirsiniz.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={handleDownloadZip}
            disabled={isZipping}
            className="flex items-center gap-2 px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-amber-500/20 active:scale-95 disabled:opacity-50"
          >
            <FolderDown className="w-4 h-4" />
            <span>{isZipping ? 'ZIP Hazırlanıyor...' : 'cPanel ZIP İndir (public_html.zip)'}</span>
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
            >
              Kapat
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-slate-950 border-b border-slate-800 px-6 flex items-center justify-between gap-4 overflow-x-auto">
        <div className="flex items-center gap-2 py-2">
          <button
            onClick={() => setActiveTab('explorer')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'explorer'
                ? 'bg-amber-400 text-slate-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>Dosya Gezgini & Kod İnceleyici ({files.length} Dosya)</span>
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'guide'
                ? 'bg-amber-400 text-slate-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Server className="w-4 h-4" />
            <span>cPanel Yükleme Kılavuzu (60 Saniyede Kurulum)</span>
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'schema'
                ? 'bg-amber-400 text-slate-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>URL Mimarisi ve Klasör Haritası</span>
          </button>
        </div>
      </div>

      {/* TAB 1: EXPLORER */}
      {activeTab === 'explorer' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
          {/* Sol Sütun: Dosya Listesi (public_html ağacı) */}
          <div className="lg:col-span-4 bg-slate-950 border-r border-slate-800 p-4 flex flex-col justify-between">
            <div>
              <div className="relative mb-3">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Dosya veya URL ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 px-1 flex items-center justify-between">
                <span>cPanel public_html Ağacı</span>
                <span>{filteredFiles.length} Öğe</span>
              </div>

              <div className="space-y-1 max-h-[460px] overflow-y-auto pr-1">
                {filteredFiles.map((file) => {
                  const isSelected = selectedFile.fullPath === file.fullPath;
                  return (
                    <button
                      key={file.fullPath}
                      onClick={() => setSelectedFile(file)}
                      className={`w-full text-left p-2.5 rounded-lg text-xs transition-all flex items-start gap-2.5 ${
                        isSelected
                          ? 'bg-amber-400/15 border border-amber-400/40 text-amber-300 font-semibold'
                          : 'hover:bg-slate-900 text-slate-300 border border-transparent'
                      }`}
                    >
                      {file.category === 'config' ? (
                        <Settings className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      ) : file.category === 'seo' ? (
                        <FileText className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      ) : (
                        <Folder className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      )}
                      <div className="truncate flex-1">
                        <div className="truncate font-mono text-[11px] text-white">
                          {file.fullPath}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {file.title} · <span className="text-amber-400/80">{file.urlPath}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Toplam Dosya Boyutu: ~95 KB</span>
              <button 
                onClick={handleDownloadZip}
                className="text-amber-400 hover:underline font-semibold flex items-center gap-1"
              >
                <Download className="w-3 h-3" />
                <span>Hepsini İndir</span>
              </button>
            </div>
          </div>

          {/* Sağ Sütun: Dosya Önizleme ve Kod Görüntüleyici */}
          <div className="lg:col-span-8 bg-slate-900 flex flex-col justify-between">
            {/* Dosya Başlık Şeridi */}
            <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <span className="font-mono text-amber-400">{selectedFile.fullPath}</span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  URL Karşılığı: <code className="text-slate-200 bg-slate-800 px-1.5 py-0.5 rounded text-[11px]">https://mirelektrikproje.com{selectedFile.urlPath}</code>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Kopyalandı!' : 'Kodu Kopyala'}</span>
                </button>
                <button
                  onClick={handleDownloadSingleFile}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-lg transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Bu Dosyayı İndir</span>
                </button>
              </div>
            </div>

            {/* Dosya Açıklaması */}
            <div className="px-4 py-2 bg-slate-900/40 border-b border-slate-800/80 text-xs text-slate-400 flex items-center gap-2">
              <span className="font-semibold text-slate-300">İşlevi:</span>
              <span>{selectedFile.description}</span>
            </div>

            {/* Kod Alanı */}
            <div className="flex-1 p-4 overflow-x-auto max-h-[460px] bg-slate-950/80 font-mono text-xs text-slate-300 select-text leading-relaxed">
              <pre className="whitespace-pre">{selectedFile.content}</pre>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: GUIDE */}
      {activeTab === 'guide' && (
        <div className="p-8 bg-slate-950 text-slate-300 space-y-8">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Adım Adım Anlatım</span>
            <h3 className="text-2xl font-bold text-white mt-1">cPanel Üzerinden 60 Saniyede Kurulum Kılavuzu</h3>
            <p className="text-sm text-slate-400 mt-2">
              İndirdiğiniz ZIP dosyasını cPanel'e aktararak web sitenizi sıfır hata ile anında yayına alabilirsiniz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center mb-3">
                1
              </div>
              <h4 className="text-base font-bold text-white mb-2">ZIP Dosyasını İndirin</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Yukarıdaki sarı <strong>"cPanel ZIP İndir"</strong> butonuna tıklayarak <code className="text-amber-300">mir-elektrik-proje-cpanel-public_html.zip</code> arşivini bilgisayarınıza indirin.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center mb-3">
                2
              </div>
              <h4 className="text-base font-bold text-white mb-2">cPanel Dosya Yöneticisi</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Hosting kontrol panelinizden (cPanel) <strong>"Dosya Yöneticisi"</strong> (File Manager) simgesine tıklayın ve sol taraftan <strong>public_html</strong> klasörüne girin.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center mb-3">
                3
              </div>
              <h4 className="text-base font-bold text-white mb-2">Yükle ve Çıkar (Extract)</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Üstteki <strong>"Yükle" (Upload)</strong> butonuyla indirdiğiniz zip dosyasını public_html içine yükleyin. Yükleme bitince zip dosyasına sağ tıklayıp <strong>"Extract" (Çıkar)</strong> seçeneğini seçin.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="w-8 h-8 rounded-lg bg-emerald-400 text-slate-950 font-black text-sm flex items-center justify-center mb-3">
                4
              </div>
              <h4 className="text-base font-bold text-white mb-2">Siteniz Yayında!</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Artık <a href="https://mirelektrikproje.com" target="_blank" className="text-amber-400 underline font-semibold">mirelektrikproje.com</a> adresini ziyaret ettiğinizde tüm sayfalar, alt sayfalar ve formlar kusursuz çalışacaktır.
              </p>
            </div>
          </div>

          <div className="p-4 bg-amber-950/30 border border-amber-800/40 rounded-xl text-xs text-amber-200/90 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-amber-300 mb-1">Gizli Dosyaları Göster (.htaccess için önemli):</strong>
              cPanel Dosya Yöneticisi'nde sağ üstteki <strong>"Ayarlar" (Settings)</strong> butonuna tıklayıp <em>"Gizli Dosyaları Göster (show hidden files / dotfiles)"</em> seçeneğini işaretlemeyi unutmayın; böylece <strong>.htaccess</strong> dosyası da görünür ve aktif kalır.
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SCHEMA */}
      {activeTab === 'schema' && (
        <div className="p-8 bg-slate-950 text-slate-300 space-y-6">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Hiyerarşik Mimari</span>
            <h3 className="text-2xl font-bold text-white mt-1">cPanel Dizin ve URL Eşleşme Tablosu</h3>
            <p className="text-sm text-slate-400 mt-1">
              Google SEO standartlarına uygun, uzantısız temiz URL (Clean URLs) yapısı.
            </p>
          </div>

          <div className="border border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">cPanel Klasör / Dosya Yolu</th>
                  <th className="p-3">Canlı URL</th>
                  <th className="p-3">Sayfa Başlığı & Amaç</th>
                  <th className="p-3">SEO Durumu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono">
                {files.map(f => (
                  <tr key={f.fullPath} className="hover:bg-slate-900/50">
                    <td className="p-3 text-amber-400 font-semibold">{f.fullPath}</td>
                    <td className="p-3 text-cyan-300">https://mirelektrikproje.com{f.urlPath}</td>
                    <td className="p-3 font-sans text-slate-300">{f.title}</td>
                    <td className="p-3 font-sans text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Tam Uyumlu</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
