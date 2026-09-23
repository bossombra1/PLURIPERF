import React, { useEffect, useState } from 'react';
import { UNIVERSITY_ASSETS } from '../assets/images';
import { Language, PageId } from '../types';
import { ChevronLeft, ChevronRight, GraduationCap, BookOpen, ArrowRight } from 'lucide-react';

interface HeroGalleryProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  onOpenApply: () => void;
  onOpenSearch: () => void;
}

export const HeroGallery: React.FC<HeroGalleryProps> = ({
  lang,
  onNavigate,
  onOpenApply,
  onOpenSearch,
}) => {
  const [active, setActive] = useState(0);

  const slides = [
    {
      image: UNIVERSITY_ASSETS.heroCampus,
      tagFr: 'Excellence Universitaire Internationale',
      tagEn: 'International Academic Excellence',
      titleFr: 'Pionnier Mondial du Management Durable et de l’Écologie Appliquée',
      titleEn: 'Global Pioneer in Sustainable Management & Applied Ecology',
      descFr: 'Former les leaders responsables capables de réconcilier performance économique de pointe et régénération du Vivant.',
      descEn: 'Educating forward-thinking leaders capable of harmonizing high economic performance with living ecosystem regeneration.',
      page: 'universite' as PageId,
    },
    {
      image: UNIVERSITY_ASSETS.students,
      tagFr: 'Cursus & Diplômes LMD - ECTS',
      tagEn: 'Degree Programs & ECTS Credits',
      titleFr: '9 Facultés d’Élite et Formations Pluridisciplinaires',
      titleEn: '9 Pioneer Faculties and Interdisciplinary Degrees',
      descFr: 'Licences, Masters et Doctorats (PhD) axés sur la bio-inspiration, la finance durable et la transition énergétique.',
      descEn: 'Bachelors, Masters, and PhDs anchored in biomimicry, sustainable finance, and green energy transition.',
      page: 'facultes' as PageId,
    },
    {
      image: UNIVERSITY_ASSETS.natureForest,
      tagFr: 'Le Modèle MIN & Recherche',
      tagEn: 'The NIM Model & Applied Research',
      titleFr: 'S’inspirer du Vivant pour Bâtir des Organisations Résilientes',
      titleEn: 'Nature-Inspired Management for Resilient Organizations',
      descFr: 'L’écologie et le biomimétisme au cœur de notre méthode pédagogique brevetée et de nos laboratoires de recherche.',
      descEn: 'Ecology and biomimicry at the heart of our proprietary academic methodology and scientific research.',
      page: 'recherches' as PageId,
    },
    {
      image: UNIVERSITY_ASSETS.researchLab,
      tagFr: 'Campuses Internationaux',
      tagEn: 'Global Multicampus Network',
      titleFr: 'Une Présence Panafricaine et Internationale',
      titleEn: 'A Pan-African and International Academic Network',
      descFr: 'Campus d’Abidjan et Yamoussoukro, représentations à Paris et Genève, et campus virtuel hybride accessible 24/7.',
      descEn: 'Campuses in Abidjan and Yamoussoukro, liaison centers in Paris and Geneva, and 24/7 hybrid e-campus.',
      page: 'campus_virtuel' as PageId,
    },
  ];

  useEffect(() => {
    const id = setInterval(() => setActive((v) => (v + 1) % slides.length), 7000);
    return () => clearInterval(id);
  }, [slides.length]);

  const s = slides[active];

  return (
    <section className="relative overflow-hidden bg-[#1f2421]">
      <div className="relative h-[460px] sm:h-[530px] lg:h-[600px]">
        <img
          src={s.image}
          alt={lang === 'fr' ? s.titleFr : s.titleEn}
          className="w-full h-full object-cover transition-opacity duration-700"
        />
        {/* Deep academic overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />

        {/* Signature green line at top of hero */}
        <div className="absolute inset-x-0 top-0 h-1 bg-[#008629]" />
        
        {/* Signature bottom stripe */}
        <div className="absolute inset-x-0 bottom-0 h-1.5 bg-[#008629]" />

        {/* Content Box */}
        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-3xl text-white space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#008629] text-white text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-xs">
              <span>{lang === 'fr' ? s.tagFr : s.tagEn}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.15] text-white tracking-tight">
              {lang === 'fr' ? s.titleFr : s.titleEn}
            </h1>

            <p className="text-sm sm:text-base leading-relaxed text-gray-200 max-w-2xl">
              {lang === 'fr' ? s.descFr : s.descEn}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenApply}
                className="inphb-btn-primary py-3 px-6 text-sm"
              >
                <GraduationCap className="w-4 h-4" />
                <span>{lang === 'fr' ? 'Candidater en ligne' : 'Apply for Admission'}</span>
              </button>

              <button
                onClick={() => onNavigate(s.page)}
                className="bg-white hover:bg-gray-100 text-[#111827] font-bold text-sm px-6 py-3 rounded-xs shadow-sm transition-colors flex items-center gap-1.5"
              >
                <span>{lang === 'fr' ? 'Découvrir' : 'Discover'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#008629]" />
              </button>

              <button
                onClick={onOpenSearch}
                className="border border-white/80 hover:bg-white/10 text-white font-semibold text-sm px-5 py-3 rounded-xs transition-colors flex items-center gap-1.5"
              >
                <BookOpen className="w-4 h-4" />
                <span>{lang === 'fr' ? 'Nos Formations' : 'Browse Degrees'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Slide navigation controls */}
        <div className="absolute bottom-6 right-4 sm:right-8 flex items-center gap-2">
          <span className="text-white/80 text-xs font-mono mr-2 hidden sm:inline">
            0{active + 1} / 0{slides.length}
          </span>
          <button
            onClick={() => setActive((v) => (v - 1 + slides.length) % slides.length)}
            className="w-9 h-9 bg-white/90 hover:bg-white text-[#111827] flex items-center justify-center rounded-xs transition-colors"
            aria-label="Précédent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActive((v) => (v + 1) % slides.length)}
            className="w-9 h-9 bg-[#008629] hover:bg-[#006820] text-white flex items-center justify-center rounded-xs transition-colors"
            aria-label="Suivant"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
