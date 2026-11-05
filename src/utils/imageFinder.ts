export interface CuratedImage {
  id: string;
  url: string;
  thumbUrl: string;
  source: 'Unsplash' | 'Pexels';
  alt: string;
  category: string;
  author: string;
}

// Curated high-resolution royalty free industrial assets
export const CURATED_INDUSTRIAL_IMAGES: CuratedImage[] = [
  {
    id: 'ind-1',
    url: '/src/assets/images/transformer_substation_facility_1793649188677.jpg',
    thumbUrl: '/src/assets/images/transformer_substation_facility_1793649188677.jpg',
    source: 'Unsplash',
    alt: 'Bursa Sanayi Yüksek Gerilim Trafo Merkezi ve Dağıtım Hücresi',
    category: 'trafo-guc',
    author: 'Industrial Archive',
  },
  {
    id: 'ind-2',
    url: '/src/assets/images/hero_electrical_engineering_1793649187746.jpg',
    thumbUrl: '/src/assets/images/hero_electrical_engineering_1793649187746.jpg',
    source: 'Pexels',
    alt: 'Fabrika İçi Elektrik Dağıtım Panosu ve Otomasyon Kontrol Paneli',
    category: 'pano-tesisat',
    author: 'Technical Visuals',
  },
  {
    id: 'ind-3',
    url: '/src/assets/images/rooftop_ges_industrial_1793649188967.jpg',
    thumbUrl: '/src/assets/images/rooftop_ges_industrial_1793649188967.jpg',
    source: 'Unsplash',
    alt: 'Bursa OSB Fabrika Çatısı Güneş Enerjisi Santrali (Çatı GES) Kurulumu',
    category: 'ges-enerji',
    author: 'Clean Energy Media',
  },
];

export function findMatchingImages(query: string, sectionTitle: string): CuratedImage[] {
  const q = (query + ' ' + sectionTitle).toLowerCase();

  let matched = CURATED_INDUSTRIAL_IMAGES.filter(img => {
    if (q.includes('ges') || q.includes('güneş') || q.includes('solar')) return img.category === 'ges-enerji';
    if (q.includes('trafo') || q.includes('güç') || q.includes('yg') || q.includes('şebeke')) return img.category === 'trafo-guc';
    return true;
  });

  if (matched.length === 0) matched = CURATED_INDUSTRIAL_IMAGES;

  return matched.map(img => ({
    ...img,
    alt: `${sectionTitle} - Bursa Sanayi Uygulama Detayı`,
  }));
}
