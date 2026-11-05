import React, { useState } from 'react';
import { PROJECTS_LIST } from '../data/siteData';
import { Building2, MapPin, Zap, Calendar, ExternalLink } from 'lucide-react';

interface ProjectsSectionProps {
  onOpenQuote: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenQuote }) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Tüm Projeler' },
    { id: 'Fabrika', label: 'Sanayi & OSB Fabrikaları' },
    { id: 'Ruhsat', label: 'Yapı Ruhsatı & Ticari' },
    { id: 'GES', label: 'Çatı GES' },
  ];

  const filteredProjects = filterCategory === 'all'
    ? PROJECTS_LIST
    : PROJECTS_LIST.filter(p => p.category.toLowerCase().includes(filterCategory.toLowerCase()) || p.scope.toLowerCase().includes(filterCategory.toLowerCase()));

  return (
    <section id="projects" className="py-20 bg-slate-950 text-white border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-2">
              Saha Başarılarımız
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Bursa ve Güney Marmara Referans Projelerimiz
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
              Nilüfer OSB'den DOSAB'a, Gemlik Serbest Bölge'den İnegöl sanayisine kadar Bursa'nın önde gelen yatırımlarında elektrik projesi ve trafo müşavirliği imzası.
            </p>
          </div>

          {/* Interactive filter tabs (clean segmented controls per frontend-design) */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  filterCategory === cat.id
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-400/40 transition-all group"
            >
              <div>
                {/* Clean unboxed metadata with bullet separators */}
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                  <span className="text-amber-400 font-semibold">{project.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{project.year}</span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {project.title}
                </h3>

                <div className="space-y-1.5 text-xs text-slate-400 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>{project.powerOrArea}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {project.scope}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">İşveren: <strong className="text-slate-200">{project.client}</strong></span>
                <span className="text-emerald-400 font-medium">✓ Onaylandı</span>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Project CTA */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-400 mb-4">
            Sanayi fabrikanız veya ticari inşaatınız için benzer referans çalışmalarımızı ve detaylı portföyümüzü incelemek ister misiniz?
          </p>
          <button
            onClick={onOpenQuote}
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs rounded-xl border border-slate-800 transition-colors"
          >
            Özel Referans Listesi ve Keşif Talep Edin
          </button>
        </div>
      </div>
    </section>
  );
};
