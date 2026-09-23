import React, { useState, useEffect } from 'react';
import { UNIVERSITY_ASSETS } from '../assets/images';
import { Language, PageId } from '../types';
import { ChevronLeft, ChevronRight, Play, Sparkles, Building, Users, Leaf, FlaskConical } from 'lucide-react';

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
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const slides = [
    {
      id: 'building_3d',
      image: UNIVERSITY_ASSETS.heroCampus,
      tagFr: 'Architecture 3D & Campus Bioclimatique',
      tagEn: '3D Architecture & Bioclimatic Campus',
      titleFr: 'Bâtiment Écologique Moderne & Laboratoires Ouverts',
      titleEn: 'Modern Eco-Building & Open Laboratories',
      descFr: 'Infrastructures passives à énergie positive, toitures végétalisées et espaces collaboratifs conçus selon les ratios du Vivant.',
      descEn: 'Energy-positive passive infrastructure, living rooftops, and collaborative spaces designed according to nature’s ratios.',
      actionPage: 'universite' as PageId,
      actionLabelFr: 'Découvrir le campus',
      actionLabelEn: 'Discover the campus',
      icon: Building,
    },
    {
      id: 'students_intl',
      image: UNIVERSITY_ASSETS.students,
      tagFr: 'Communauté Internationale',
      tagEn: 'International Community',
      titleFr: 'Étudiants et Chercheurs de plus de 45 Nations',
      titleEn: 'Students & Scholars from over 45 Nations',
      descFr: 'Une diversité mondiale unie par une même ambition : transformer les modèles de gouvernance et régénérer les écosystèmes.',
      descEn: 'A global cohort united by a common ambition: transforming governance models and regenerating living ecosystems.',
      actionPage: 'admissions' as PageId,
      actionLabelFr: 'Rejoindre la promotion',
      actionLabelEn: 'Join the cohort',
      icon: Users,
    },
    {
      id: 'eco_world',
      image: UNIVERSITY_ASSETS.natureForest,
      tagFr: 'Écologie Responsable & Préservation',
      tagEn: 'Responsible Ecology & Conservation',
      titleFr: 'Régénération des Cycles Vivants & Biodiversité',
      titleEn: 'Regenerating Living Cycles & Planetary Biodiversity',
      descFr: 'Nos programmes ancrent chaque enseignant et étudiant dans l’observation directe et la protection active de la biosphère.',
      descEn: 'Our curriculum anchors every scholar and student in direct observation and active biosphere restoration.',
      actionPage: 'mere_nature' as PageId,
      actionLabelFr: 'Mère Nature Global',
      actionLabelEn: 'Mother Nature Global',
      icon: Leaf,
    },
    {
      id: 'research_lab',
      image: UNIVERSITY_ASSETS.researchLab,
      tagFr: 'MIN Research Institute',
      tagEn: 'MIN Research Institute',
      titleFr: 'Laboratoires de Recherche & Biomatériaux du Futur',
      titleEn: 'Advanced Research Labs & Future Biomaterials',
      descFr: 'Centres de recherche de pointe sur les biomatériaux, les micro-algues et l’intelligence artificielle frugale.',
      descEn: 'Pioneering scientific research on mycelium biomaterials, microalgae biotechnology, and frugal AI.',
      actionPage: 'recherches' as PageId,
      actionLabelFr: 'Voir les inventions',
      actionLabelEn: 'View inventions',
      icon: FlaskConical,
    },
  ];

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlay, slides.length]);

  const current = slides[activeSlide];

  return (
    <div
      className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl group"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {/* Background Image with contrast scrim */}
      <div className="relative h-[440px] sm:h-[500px] lg:h-[560px] w-full overflow-hidden">
        <img
          src={current.image}
          alt={lang === 'fr' ? current.titleFr : current.titleEn}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-all duration-700 transform scale-105"
        />

        {/* Measured dark gradient scrim for WCAG contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-900/30" />
        <div className="absolute inset-0 bg-slate-950/20" />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
        {/* Top Badges & Indicator */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-medium text-amber-300 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-md border border-slate-700/70">
            {React.createElement(current.icon, { className: 'w-4 h-4 text-amber-400' })}
            <span>{lang === 'fr' ? current.tagFr : current.tagEn}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-md border border-slate-800 text-xs text-slate-300">
            <span className="font-mono text-amber-400 font-bold">{activeSlide + 1}</span>
            <span className="text-slate-500">/</span>
            <span className="font-mono">{slides.length}</span>
          </div>
        </div>

        {/* Bottom Hero Narrative */}
        <div className="max-w-3xl space-y-4">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white leading-tight">
            {lang === 'fr' ? current.titleFr : current.titleEn}
          </h3>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
            {lang === 'fr' ? current.descFr : current.descEn}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate(current.actionPage)}
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-medium text-xs sm:text-sm rounded-lg transition-colors shadow-lg flex items-center gap-2"
            >
              <span>{lang === 'fr' ? current.actionLabelFr : current.actionLabelEn}</span>
            </button>

            <button
              type="button"
              onClick={onOpenSearch}
              className="px-4 py-2.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs sm:text-sm rounded-lg transition-colors backdrop-blur"
            >
              {lang === 'fr' ? 'Trouver une formation' : 'Find a program'}
            </button>
          </div>
        </div>

        {/* Thumbnail Selector Rail */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveSlide(idx)}
                className={`text-left text-xs px-3 py-1.5 rounded transition-all whitespace-nowrap ${
                  activeSlide === idx
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow'
                    : 'text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800'
                }`}
              >
                {lang === 'fr' ? s.tagFr : s.tagEn}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() =>
                setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
              }
              className="p-1.5 rounded bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setActiveSlide((prev) => (prev + 1) % slides.length)}
              className="p-1.5 rounded bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
