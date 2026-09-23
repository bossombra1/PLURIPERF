import React from 'react';
import { PageId, Language } from '../types';
import {
  Building2,
  Quote,
  Compass,
  Leaf,
  History,
  Shield,
  Award,
  ChevronRight,
  ChevronLeft,
  FileText,
  Download,
  Phone,
  Mail,
  MapPin,
  Calendar,
  MessageSquare,
  GraduationCap,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

export interface UniversityNavPageItem {
  id: PageId;
  labelFr: string;
  labelEn: string;
  icon: React.ComponentType<{ className?: string }>;
  chapterNum: string;
  tagFr: string;
  tagEn: string;
}

export const UNIVERSITY_NAV_PAGES: UniversityNavPageItem[] = [
  {
    id: 'universite_presentation',
    labelFr: 'Présentation & Chiffres clés',
    labelEn: 'Overview & Key Figures',
    icon: Building2,
    chapterNum: '01',
    tagFr: 'Identité Académique',
    tagEn: 'Academic Identity',
  },
  {
    id: 'universite_mot_president',
    labelFr: 'Mot du Recteur-Président',
    labelEn: "Rector's Address",
    icon: Quote,
    chapterNum: '02',
    tagFr: 'Direction Générale',
    tagEn: 'Leadership',
  },
  {
    id: 'universite_vision',
    labelFr: 'Vision, Mission & Valeurs',
    labelEn: 'Vision, Mission & Values',
    icon: Compass,
    chapterNum: '03',
    tagFr: 'Fondements & Déontologie',
    tagEn: 'Principles & Ethics',
  },
  {
    id: 'universite_min',
    labelFr: 'Le Modèle MIN (Bio-inspiré)',
    labelEn: 'The NIM Model (Nature-Inspired)',
    icon: Leaf,
    chapterNum: '04',
    tagFr: 'Pédagogie Signature',
    tagEn: 'Signature Pedagogy',
  },
  {
    id: 'universite_histoire',
    labelFr: 'Histoire & Jalons Clés',
    labelEn: 'History & Milestones',
    icon: History,
    chapterNum: '05',
    tagFr: 'Trajectoire & Genèse',
    tagEn: 'Genesis & Milestones',
  },
  {
    id: 'universite_gouvernance',
    labelFr: 'Gouvernance & Conseils',
    labelEn: 'Governance & Senates',
    icon: Shield,
    chapterNum: '06',
    tagFr: 'Instances Dirigeantes',
    tagEn: 'Governance Bodies',
  },
  {
    id: 'universite_reconnaissances',
    labelFr: 'Agréments & Partenaires',
    labelEn: 'Accreditations & Alliances',
    icon: Award,
    chapterNum: '07',
    tagFr: 'Normes & Réseau Mondial',
    tagEn: 'Charters & Alliances',
  },
];

interface UniversityLayoutProps {
  activePageId: PageId;
  pageTitleFr: string;
  pageTitleEn: string;
  pageSubtitleFr: string;
  pageSubtitleEn: string;
  chapterBadgeFr?: string;
  chapterBadgeEn?: string;
  lang: Language;
  onNavigate: (page: PageId, sectionId?: string) => void;
  onOpenApply: () => void;
  onOpenAppointment?: () => void;
  onOpenWhatsApp?: () => void;
  children: React.ReactNode;
}

export const UniversityLayout: React.FC<UniversityLayoutProps> = ({
  activePageId,
  pageTitleFr,
  pageTitleEn,
  pageSubtitleFr,
  pageSubtitleEn,
  chapterBadgeFr,
  chapterBadgeEn,
  lang,
  onNavigate,
  onOpenApply,
  onOpenAppointment,
  onOpenWhatsApp,
  children,
}) => {
  const currentIndex = UNIVERSITY_NAV_PAGES.findIndex((p) => p.id === activePageId);
  const activeIndex = currentIndex >= 0 ? currentIndex : 0;
  const progressPercent = Math.round(((activeIndex + 1) / UNIVERSITY_NAV_PAGES.length) * 100);

  const prevPage = activeIndex > 0 ? UNIVERSITY_NAV_PAGES[activeIndex - 1] : null;
  const nextPage = activeIndex < UNIVERSITY_NAV_PAGES.length - 1 ? UNIVERSITY_NAV_PAGES[activeIndex + 1] : null;

  const handleDownloadBrochure = () => {
    const dummyContent = `PLURIPERF INTERNATIONAL UNIVERSITY\nPlaquette Institutionnelle & Guide des Études 2026-2027\n\n1ère Université de Management Durable, d'Écologie Responsable et de Leadership Régénératif.\nCampus : Abidjan - Yamoussoukro - Paris - Genève\nContact admissions : admissions@pluriperf.com`;
    const blob = new Blob([dummyContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'PLURIPERF-Brochure-Officielle-2026.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#f8fafc] text-[#333333] min-h-screen">
      {/* 1. Academic Breadcrumbs & Page Header Banner (Exact INP-HB style) */}
      <div className="bg-[#ffffff] border-b border-[#eaeaea]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
          {/* Breadcrumb row */}
          <nav className="flex items-center gap-2 text-xs text-[#898888] mb-3 flex-wrap">
            <button
              onClick={() => onNavigate('accueil')}
              className="hover:text-[#008629] transition-colors"
            >
              {lang === 'fr' ? 'Accueil' : 'Home'}
            </button>
            <span>/</span>
            <button
              onClick={() => onNavigate('universite_presentation')}
              className="hover:text-[#008629] transition-colors"
            >
              {lang === 'fr' ? "L'Université" : 'The University'}
            </button>
            <span>/</span>
            <span className="text-[#008629] font-medium">
              {lang === 'fr' ? pageTitleFr : pageTitleEn}
            </span>
          </nav>

          {/* Chapter badge */}
          {(chapterBadgeFr || chapterBadgeEn) && (
            <div className="inline-block text-[11px] font-bold uppercase tracking-widest text-[#008629] bg-[#f0f9f1] px-2.5 py-1 rounded-xs mb-2 font-mono">
              {lang === 'fr' ? chapterBadgeFr : chapterBadgeEn}
            </div>
          )}

          {/* Main Page Title with INP-HB signature green accent line */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111827] tracking-tight inphb-heading-accent">
              {lang === 'fr' ? pageTitleFr : pageTitleEn}
            </h1>
            <p className="text-sm sm:text-base text-[#666666] max-w-3xl pt-2 leading-relaxed">
              {lang === 'fr' ? pageSubtitleFr : pageSubtitleEn}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Main Two-Column Academic Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDEBAR (Sticky academic navigation & official widgets) */}
          <aside className="lg:col-span-4 xl:col-span-3 space-y-5 lg:sticky lg:top-20">
            
            {/* Widget 1: Menu de Navigation Universitaire */}
            <div className="bg-white border border-[#eaeaea] shadow-sm rounded-sm overflow-hidden">
              <div className="bg-[#f8fafc] border-b border-[#eaeaea] px-4 py-3 border-t-4 border-t-[#008629] flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#111827] flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-[#008629]" />
                  <span>{lang === 'fr' ? 'Dans cette rubrique' : 'In this section'}</span>
                </h2>
                <span className="text-[10px] text-[#008629] font-mono font-bold bg-[#eaf5ec] px-1.5 py-0.5 rounded">
                  {activeIndex + 1} / {UNIVERSITY_NAV_PAGES.length}
                </span>
              </div>
              <ul className="divide-y divide-[#f1f5f9] text-xs font-medium">
                {UNIVERSITY_NAV_PAGES.map((item, idx) => {
                  const Icon = item.icon;
                  const isActive = activePageId === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => onNavigate(item.id)}
                        className={`w-full text-left px-3.5 py-2.5 flex items-center justify-between transition-colors ${
                          isActive
                            ? 'bg-[#f0f9f1] text-[#008629] font-bold border-l-4 border-l-[#008629]'
                            : 'text-[#444444] hover:bg-[#f8fafc] hover:text-[#008629]'
                        }`}
                      >
                        <span className="flex items-center gap-2.5 truncate">
                          <span className="text-[10px] font-mono text-[#888888] w-4 shrink-0">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#008629]' : 'text-[#888888]'}`} />
                          <span className="truncate">{lang === 'fr' ? item.labelFr : item.labelEn}</span>
                        </span>
                        {isActive ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#008629] shrink-0 ml-1"></span>
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5 text-[#cccccc] shrink-0 ml-1" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Subpage Step Navigation */}
            <div className="p-2 bg-white border border-[#eaeaea] rounded-sm flex items-center justify-between gap-1 text-xs shadow-2xs">
              {prevPage ? (
                <button
                  type="button"
                  onClick={() => onNavigate(prevPage.id)}
                  className="flex-1 py-1.5 px-2 text-[11px] font-medium rounded-xs border border-[#eaeaea] text-[#333333] hover:border-[#008629] hover:text-[#008629] flex items-center justify-center gap-1 transition-colors"
                  title={lang === 'fr' ? prevPage.labelFr : prevPage.labelEn}
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span className="truncate">{lang === 'fr' ? 'Page préc.' : 'Prev'}</span>
                </button>
              ) : (
                <div className="flex-1 py-1.5 px-2 text-[11px] text-gray-300 border border-transparent text-center">
                  -
                </div>
              )}

              {nextPage ? (
                <button
                  type="button"
                  onClick={() => onNavigate(nextPage.id)}
                  className="flex-1 py-1.5 px-2 text-[11px] font-bold rounded-xs border border-[#008629] text-[#008629] hover:bg-[#f0f9f1] flex items-center justify-center gap-1 transition-colors"
                  title={lang === 'fr' ? nextPage.labelFr : nextPage.labelEn}
                >
                  <span className="truncate">{lang === 'fr' ? 'Page suiv.' : 'Next'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <div className="flex-1 py-1.5 px-2 text-[11px] text-gray-300 border border-transparent text-center">
                  -
                </div>
              )}
            </div>

            {/* Widget 2: Télécharger la Brochure Institutionnelle */}
            <div className="bg-white border border-[#eaeaea] p-4 rounded-sm shadow-xs">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded bg-[#eaf5ec] flex items-center justify-center text-[#008629] shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase text-[#111827]">
                    {lang === 'fr' ? 'Plaquette Officielle' : 'Official Brochure'}
                  </h3>
                  <p className="text-[11px] text-[#666666] mt-0.5 leading-normal">
                    {lang === 'fr'
                      ? 'Guide complet de l’université et des cursus 2026.'
                      : 'Comprehensive study guide and accreditation charter.'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleDownloadBrochure}
                className="mt-3.5 w-full inphb-btn-secondary text-xs py-2 flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{lang === 'fr' ? 'Télécharger la brochure' : 'Download Brochure'}</span>
              </button>
            </div>

            {/* Widget 3: Contact Admissions & Orientation */}
            <div className="bg-white border border-[#eaeaea] p-4 rounded-sm shadow-xs space-y-2.5 text-xs">
              <div className="border-b border-[#eaeaea] pb-2">
                <h3 className="font-bold uppercase text-xs text-[#111827]">
                  {lang === 'fr' ? 'Bureau des Admissions' : 'Admissions Office'}
                </h3>
                <span className="text-[11px] text-[#888888]">
                  {lang === 'fr' ? 'Orientation personnalisée' : 'Tailored guidance'}
                </span>
              </div>
              <div className="space-y-1.5 text-[#555555]">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#008629] shrink-0" />
                  <span>+225 27 22 59 88 00 / 05 01 80 00 19</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#008629] shrink-0" />
                  <a href="mailto:admissions@pluriperf.com" className="hover:text-[#008629] text-[#008629] font-medium">
                    admissions@pluriperf.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#008629] shrink-0" />
                  <span>Abidjan Cocody • Yamoussoukro</span>
                </div>
              </div>

              <div className="pt-2 space-y-1.5">
                {onOpenWhatsApp && (
                  <button
                    type="button"
                    onClick={onOpenWhatsApp}
                    className="w-full flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#20ba59] text-white font-semibold py-2 px-3 rounded-sm transition-colors text-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Scolarité</span>
                  </button>
                )}
                {onOpenAppointment && (
                  <button
                    type="button"
                    onClick={onOpenAppointment}
                    className="w-full inphb-btn-outline text-xs py-1.5 flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{lang === 'fr' ? 'Prendre un rendez-vous' : 'Book an interview'}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Widget 4: Accréditations & Norme ECTS */}
            <div className="bg-[#f0fdf4] border border-[#bbf7d0] p-3.5 rounded-sm">
              <div className="flex items-center gap-2 text-[#008629] font-bold text-xs uppercase tracking-wider mb-1">
                <Award className="w-4 h-4 shrink-0" />
                <span>{lang === 'fr' ? 'Conformité & ECTS' : 'ECTS & Standards'}</span>
              </div>
              <p className="text-[11px] text-[#166534] leading-relaxed">
                {lang === 'fr'
                  ? 'Nos cursus sont articulés selon le système LMD international et la grille européenne ECTS transférable.'
                  : 'Curricula adhere to international LMD standards and transferable European ECTS credits.'}
              </p>
            </div>
          </aside>

          {/* RIGHT MAIN CONTENT AREA */}
          <main className="lg:col-span-8 xl:col-span-9 space-y-8">
            {children}

            {/* BOTTOM INSTITUTIONAL CALL TO ACTION (Exact INP-HB style) */}
            <div className="bg-[#008629] text-white p-8 rounded-sm shadow-md flex flex-col md:flex-row items-center justify-between gap-6 mt-12">
              <div className="space-y-2 text-center md:text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {lang === 'fr' ? 'Rejoignez PLURIPERF pour la rentrée 2026' : 'Join PLURIPERF for the 2026 Intake'}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 max-w-xl">
                  {lang === 'fr'
                    ? 'Déposez votre dossier de candidature en ligne ou contactez notre bureau des admissions pour un accompagnement personnalisé.'
                    : 'Submit your online application or contact our admissions office for tailored academic guidance.'}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={onOpenApply}
                  className="px-5 py-3 bg-white text-[#008629] hover:bg-gray-100 font-bold text-xs rounded-sm shadow-sm transition-colors flex items-center gap-2"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>{lang === 'fr' ? 'Candidater en ligne' : 'Apply Online'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('formations')}
                  className="px-5 py-3 border border-white text-white hover:bg-white/10 font-bold text-xs rounded-sm transition-colors flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{lang === 'fr' ? 'Consulter les formations' : 'View Degrees'}</span>
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
