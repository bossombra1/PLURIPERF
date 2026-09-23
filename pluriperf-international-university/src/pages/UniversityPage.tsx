import React, { useState, useEffect } from 'react';
import { Language, PageId } from '../types';
import { UNIVERSITY_SECTIONS } from '../data/universityData';
import { UNIVERSITY_ASSETS } from '../assets/images';
import { Logo } from '../components/Logo';
import {
  Building2,
  History,
  Compass,
  Quote,
  Shield,
  BookOpen,
  Leaf,
  Award,
  Globe2,
  Users2,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ArrowUp,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  FileText,
  Download,
  Phone,
  Mail,
  Calendar,
  Clock,
  MessageSquare,
  MapPin,
  ExternalLink,
} from 'lucide-react';

interface UniversityPageProps {
  lang: Language;
  onNavigate: (page: PageId, sectionId?: string) => void;
  onOpenApply: () => void;
  onOpenAppointment?: () => void;
  onOpenWhatsApp?: () => void;
  initialSection?: string;
}

export const UniversityPage: React.FC<UniversityPageProps> = ({
  lang,
  onNavigate,
  onOpenApply,
  onOpenAppointment,
  onOpenWhatsApp,
  initialSection,
}) => {
  const content = UNIVERSITY_SECTIONS[lang];
  const [activeSection, setActiveSection] = useState<string>(initialSection || 'presentation');

  const navSections = [
    { id: 'presentation', labelFr: 'Présentation générale', labelEn: 'Overview & Figures', icon: Building2 },
    { id: 'motPresident', labelFr: 'Mot du Recteur-Président', labelEn: "Rector's Address", icon: Quote },
    { id: 'vision', labelFr: 'Vision & Valeurs', labelEn: 'Vision & Values', icon: Compass },
    { id: 'min', labelFr: 'Le Modèle MIN (Bio-inspiré)', labelEn: 'The NIM Model', icon: Leaf },
    { id: 'histoire', labelFr: 'Histoire & Jalons', labelEn: 'History & Milestones', icon: History },
    { id: 'gouvernance', labelFr: 'Organisation & Gouvernance', labelEn: 'Governance & Senates', icon: Shield },
    { id: 'modelePedagogique', labelFr: 'Pédagogie & ECTS', labelEn: 'Pedagogy & ECTS', icon: BookOpen },
    { id: 'reconnaissances', labelFr: 'Agréments & Partenaires', labelEn: 'Accreditations', icon: Award },
    { id: 'mereNatureRef', labelFr: 'Alliance Mère Nature', labelEn: 'Mother Nature Alliance', icon: Globe2 },
  ];

  // Dynamic contextual highlights for each chapter to eliminate empty sidebar voids
  const chapterHighlights: Record<
    string,
    {
      badgeFr: string;
      badgeEn: string;
      titleFr: string;
      titleEn: string;
      descFr: string;
      descEn: string;
      stat: string;
      statLabelFr: string;
      statLabelEn: string;
      tagColor: string;
      accentBg: string;
    }
  > = {
    presentation: {
      badgeFr: 'Chapitre 01 · Identité',
      badgeEn: 'Chapter 01 · Identity',
      titleFr: 'Pôle d’Enseignement Supérieur',
      titleEn: 'Higher Education Center',
      descFr: 'Double ancrage en Côte d’Ivoire (Abidjan & Yamoussoukro) et représentations européennes.',
      descEn: 'Dual campuses in Côte d’Ivoire (Abidjan & Yamoussoukro) with European liaisons.',
      stat: '09',
      statLabelFr: 'Facultés d’Excellence',
      statLabelEn: 'Academic Faculties',
      tagColor: 'text-[#008629]',
      accentBg: 'bg-[#f0f9f1]',
    },
    motPresident: {
      badgeFr: 'Chapitre 02 · Présidence',
      badgeEn: 'Chapter 02 · Leadership',
      titleFr: 'Vision & Serment Académique',
      titleEn: 'Vision & Academic Oath',
      descFr: '« Réconcilier l’esprit d’entreprise avec le respect sacré du Vivant et de la biosphère. »',
      descEn: '« Reconciling entrepreneurship with deep reverence for the living biosphere. »',
      stat: '100%',
      statLabelFr: 'Orientation Déontologique',
      statLabelEn: 'Ethical Grounding',
      tagColor: 'text-[#f77f00]',
      accentBg: 'bg-[#fff7ed]',
    },
    vision: {
      badgeFr: 'Chapitre 03 · Déontologie',
      badgeEn: 'Chapter 03 · Principles',
      titleFr: 'Les 4 Piliers Fondateurs',
      titleEn: '4 Founding Pillars',
      descFr: 'Révérence du Vivant, rigueur scientifique, innovation régénérative et mérite universitaire.',
      descEn: 'Reverence for life, scientific rigor, regenerative innovation, and academic merit.',
      stat: '2030',
      statLabelFr: 'Cap d’Excellence Panafricain',
      statLabelEn: 'Pan-African Horizon',
      tagColor: 'text-[#008629]',
      accentBg: 'bg-[#f0f9f1]',
    },
    min: {
      badgeFr: 'Chapitre 04 · Modèle MIN',
      badgeEn: 'Chapter 04 · NIM Model',
      titleFr: 'Management Inspiré par la Nature',
      titleEn: 'Nature-Inspired Management',
      descFr: 'Boucles vertueuses : pas de déchets dans les écosystèmes, résilience et frugalité.',
      descEn: 'Closed-loop systems: zero waste, antifragile resilience, and material sobriety.',
      stat: '0 Déchet',
      statLabelFr: 'Économie 100% Circulaire',
      statLabelEn: 'Circular Economy',
      tagColor: 'text-[#008629]',
      accentBg: 'bg-[#f0f9f1]',
    },
    histoire: {
      badgeFr: 'Chapitre 05 · Trajectoire',
      badgeEn: 'Chapter 05 · Chronology',
      titleFr: 'Genèse & Déploiement',
      titleEn: 'Genesis & Expansion',
      descFr: 'De la création de la chaire de recherche en 2018 au réseau académique mondial 2026.',
      descEn: 'From initial research chair in 2018 to international academic network in 2026.',
      stat: '8 Ans',
      statLabelFr: 'D’Innovations & Brevets',
      statLabelEn: 'Of Patents & Science',
      tagColor: 'text-[#f77f00]',
      accentBg: 'bg-[#fff7ed]',
    },
    gouvernance: {
      badgeFr: 'Chapitre 06 · Instances',
      badgeEn: 'Chapter 06 · Governance',
      titleFr: 'Double Régulation Académique',
      titleEn: 'Dual Academic Oversight',
      descFr: 'Gouvernance partagée entre le Conseil d’Administration et le Sénat Académique & Scientifique.',
      descEn: 'Shared leadership: Board of Directors and the Academic & Scientific Senate.',
      stat: '2',
      statLabelFr: 'Conseils Régulateurs',
      statLabelEn: 'Governing Councils',
      tagColor: 'text-[#111827]',
      accentBg: 'bg-[#f1f5f9]',
    },
    modelePedagogique: {
      badgeFr: 'Chapitre 07 · Pédagogie',
      badgeEn: 'Chapter 07 · Degrees',
      titleFr: 'Architecture LMD & ECTS',
      titleEn: 'European ECTS Framework',
      descFr: 'Licence (180 ECTS), Master (120 ECTS) et Doctorat (180 ECTS) entièrement transférables.',
      descEn: 'Bachelor (180 ECTS), Master (120 ECTS), and PhD (180 ECTS) transferable credits.',
      stat: 'ECTS',
      statLabelFr: 'Crédits Transférables UE',
      statLabelEn: 'EU Transferable Credits',
      tagColor: 'text-[#008629]',
      accentBg: 'bg-[#f0f9f1]',
    },
    reconnaissances: {
      badgeFr: 'Chapitre 08 · Alliances',
      badgeEn: 'Chapter 08 · Alliances',
      titleFr: 'Réseau Académique International',
      titleEn: 'Global Academic Network',
      descFr: 'Alliances avec plus de 120 universités européennes, laboratoires et multinationales ESG.',
      descEn: 'Charters with 120+ European universities, labs, and multinational corporate partners.',
      stat: '120+',
      statLabelFr: 'Partenaires Mondiaux',
      statLabelEn: 'Global Partners',
      tagColor: 'text-[#f77f00]',
      accentBg: 'bg-[#fff7ed]',
    },
    mereNatureRef: {
      badgeFr: 'Chapitre 09 · Engagement',
      badgeEn: 'Chapter 09 · Commitment',
      titleFr: 'Alliance Mère Nature',
      titleEn: 'Mother Nature Alliance',
      descFr: '500 000 arbres réimplantés, Living Labs de terrain et chaîne éducative Mère Nature TV.',
      descEn: '500,000 trees planted, field Living Labs, and educational broadcaster Mother Nature TV.',
      stat: '500k',
      statLabelFr: 'Arbres Reboisés',
      statLabelEn: 'Trees Planted',
      tagColor: 'text-[#008629]',
      accentBg: 'bg-[#f0f9f1]',
    },
  };

  const currentIndex = navSections.findIndex((s) => s.id === activeSection);
  const activeIndex = currentIndex >= 0 ? currentIndex : 0;
  const progressPercent = Math.round(((activeIndex + 1) / navSections.length) * 100);
  const currentHighlight = chapterHighlights[activeSection] || chapterHighlights['presentation'];

  // ScrollSpy observer: automatically highlights the section currently in viewport
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-15% 0px -60% 0px',
      threshold: 0,
    });

    const sectionIds = [
      'presentation',
      'motPresident',
      'vision',
      'min',
      'histoire',
      'gouvernance',
      'modelePedagogique',
      'reconnaissances',
      'mereNatureRef',
    ];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (initialSection) {
      setActiveSection(initialSection);
      const el = document.getElementById(initialSection);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [initialSection]);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleNextSection = () => {
    if (activeIndex < navSections.length - 1) {
      scrollToSection(navSections[activeIndex + 1].id);
    }
  };

  const handlePrevSection = () => {
    if (activeIndex > 0) {
      scrollToSection(navSections[activeIndex - 1].id);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadBrochure = () => {
    // Generate institutional brochure download prompt or simulated download
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
          <nav className="flex items-center gap-2 text-xs text-[#898888] mb-3">
            <button
              onClick={() => onNavigate('accueil')}
              className="hover:text-[#008629] transition-colors"
            >
              {lang === 'fr' ? 'Accueil' : 'Home'}
            </button>
            <span>/</span>
            <span className="text-[#898888]">{lang === 'fr' ? "L'Université" : 'The University'}</span>
            <span>/</span>
            <span className="text-[#008629] font-medium">
              {lang === 'fr' ? "À propos de PLURIPERF" : 'About PLURIPERF'}
            </span>
          </nav>

          {/* Main Page Title with INP-HB signature green accent line */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111827] tracking-tight inphb-heading-accent">
              {lang === 'fr' ? "À propos de l'Université" : 'About the University'}
            </h1>
            <p className="text-sm sm:text-base text-[#666666] max-w-3xl pt-2">
              {lang === 'fr'
                ? "1ère Université de Management Durable, d'Écologie Responsable et de Leadership Régénératif."
                : 'Pioneer University in Sustainable Management, Applied Ecology, and Regenerative Leadership.'}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Main Two-Column Academic Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDEBAR (Sticky academic navigation & dynamic animated widgets) */}
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="lg:sticky lg:top-20 space-y-4 max-h-[calc(100vh-5.5rem)] overflow-y-auto pr-1.5 scrollbar-thin">

              {/* Reading Progress Indicator Bar */}
              <div className="bg-white border border-[#eaeaea] p-3.5 rounded-sm shadow-xs">
                <div className="flex items-center justify-between text-[11px] font-semibold text-[#111827] mb-1.5">
                  <span className="flex items-center gap-1.5 text-[#008629]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{lang === 'fr' ? 'Parcours Institutionnel' : 'Institutional Tour'}</span>
                  </span>
                  <span className="text-[#666666] font-mono">
                    {activeIndex + 1} / {navSections.length} ({progressPercent}%)
                  </span>
                </div>
                <div className="w-full bg-[#f1f5f9] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#008629] h-full transition-all duration-300 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Widget 1: Menu de Navigation Universitaire avec ScrollSpy */}
              <div className="bg-white border border-[#eaeaea] shadow-sm rounded-sm overflow-hidden">
                <div className="bg-[#f8fafc] border-b border-[#eaeaea] px-4 py-2.5 border-t-4 border-t-[#008629] flex items-center justify-between">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#111827] flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-[#008629]" />
                    <span>{lang === 'fr' ? 'Sommaire Interactif' : 'Table of Contents'}</span>
                  </h2>
                  <span className="text-[10px] text-[#008629] bg-[#eaf5ec] px-1.5 py-0.5 rounded font-mono font-bold">
                    9 CHAPITRES
                  </span>
                </div>
                <ul className="divide-y divide-[#f1f5f9] text-xs font-medium">
                  {navSections.map((sec, idx) => {
                    const Icon = sec.icon;
                    const isActive = activeSection === sec.id;
                    return (
                      <li key={sec.id}>
                        <button
                          type="button"
                          onClick={() => scrollToSection(sec.id)}
                          className={`w-full text-left px-3.5 py-2.5 flex items-center justify-between transition-all duration-200 ${
                            isActive
                              ? 'bg-[#f0f9f1] text-[#008629] font-bold border-l-4 border-l-[#008629]'
                              : 'text-[#444444] hover:bg-[#f8fafc] hover:text-[#008629]'
                          }`}
                        >
                          <span className="flex items-center gap-2 truncate">
                            <span className="text-[10px] font-mono text-[#888888] w-4 shrink-0">
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                            <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#008629]' : 'text-[#888888]'}`} />
                            <span className="truncate">{lang === 'fr' ? sec.labelFr : sec.labelEn}</span>
                          </span>
                          {isActive ? (
                            <span className="w-2 h-2 rounded-full bg-[#008629] animate-pulse shrink-0 ml-1"></span>
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5 text-[#cccccc] shrink-0 ml-1" />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Widget 2: DYNAMIC CONTEXTUAL FOCUS (Updates smoothly as user scrolls) */}
              <div
                key={activeSection}
                className="bg-white border border-[#eaeaea] p-4 rounded-sm shadow-sm transition-all duration-300 transform opacity-100 translate-y-0 relative overflow-hidden"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs font-mono ${currentHighlight.accentBg} ${currentHighlight.tagColor}`}
                  >
                    {lang === 'fr' ? currentHighlight.badgeFr : currentHighlight.badgeEn}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-[#888888]">
                    <Clock className="w-3 h-3 text-[#008629]" />
                    <span>En lecture</span>
                  </span>
                </div>

                <h3 className="text-xs font-bold text-[#111827] leading-snug">
                  {lang === 'fr' ? currentHighlight.titleFr : currentHighlight.titleEn}
                </h3>

                <p className="text-[11px] text-[#555555] mt-1.5 leading-relaxed italic border-l-2 border-[#008629] pl-2">
                  {lang === 'fr' ? currentHighlight.descFr : currentHighlight.descEn}
                </p>

                <div className="mt-3 pt-2.5 border-t border-[#f1f5f9] flex items-center justify-between">
                  <span className="text-[10px] font-medium text-[#777777]">
                    {lang === 'fr' ? currentHighlight.statLabelFr : currentHighlight.statLabelEn}
                  </span>
                  <span className={`text-sm font-mono font-extrabold ${currentHighlight.tagColor}`}>
                    {currentHighlight.stat}
                  </span>
                </div>
              </div>

              {/* Widget 3: LE SAVIEZ-VOUS ? (Biomimétisme & Modèle MIN) */}
              <div className="bg-[#fcfdfa] border border-[#e2e8f0] p-3.5 rounded-sm shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#008629] uppercase tracking-wider mb-1">
                  <Leaf className="w-3.5 h-3.5 text-[#008629]" />
                  <span>{lang === 'fr' ? 'Focus Modèle MIN' : 'NIM Focus'}</span>
                </div>
                <p className="text-[11px] text-[#444444] leading-relaxed">
                  {lang === 'fr'
                    ? 'Le biomimétisme organisationnel enseigné à PLURIPERF applique l’intelligence des écosystèmes forestiers pour concevoir des entreprises à impact positif et zéro déchet.'
                    : 'Organizational biomimicry taught at PLURIPERF draws upon living forest systems to design zero-waste, net-positive business models.'}
                </p>
              </div>

              {/* Widget 4: Agenda Académique & Prochaine Commission */}
              <div className="bg-white border border-[#eaeaea] p-4 rounded-sm shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#111827] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#008629]" />
                    <span>{lang === 'fr' ? 'Agenda Académique' : 'Academic Dates'}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#008629] bg-[#f0f9f1] px-1.5 py-0.5 rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#008629] animate-ping"></span>
                    <span>Ouvert</span>
                  </span>
                </div>
                <div className="space-y-1.5 text-[11px] text-[#555555]">
                  <div className="flex items-start justify-between gap-2 border-b border-[#f1f5f9] pb-1.5">
                    <span className="text-[#333333] font-medium">Session d'Admission</span>
                    <span className="font-mono text-[#008629] font-bold">15 Nov. 2026</span>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[#333333] font-medium">Rentrée Solennelle</span>
                    <span className="font-mono text-[#f77f00] font-bold">Février 2027</span>
                  </div>
                </div>
              </div>

              {/* Widget 5: Télécharger la Brochure Institutionnelle */}
              <div className="bg-white border border-[#eaeaea] p-4 rounded-sm shadow-xs">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded bg-[#eaf5ec] flex items-center justify-center text-[#008629] shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#111827]">
                      {lang === 'fr' ? 'Plaquette Officielle 2026' : 'Official Brochure 2026'}
                    </h4>
                    <p className="text-[10px] text-[#666666] mt-0.5">
                      {lang === 'fr' ? 'Guide des cursus et accréditations.' : 'Study guide and accreditations.'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadBrochure}
                  className="mt-3 w-full inphb-btn-secondary text-xs py-1.5 flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{lang === 'fr' ? 'Télécharger le guide PDF' : 'Download PDF Guide'}</span>
                </button>
              </div>

              {/* Widget 6: Contact Admissions & Orientation */}
              <div className="bg-white border border-[#eaeaea] p-4 rounded-sm shadow-xs space-y-2.5 text-xs">
                <div className="border-b border-[#eaeaea] pb-1.5 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold uppercase text-xs text-[#111827]">
                      {lang === 'fr' ? 'Service Admissions' : 'Admissions Desk'}
                    </h4>
                    <span className="text-[10px] text-[#888888]">
                      {lang === 'fr' ? 'Orientation personnalisée' : 'Guidance & inquiries'}
                    </span>
                  </div>
                  <Phone className="w-3.5 h-3.5 text-[#008629]" />
                </div>
                <div className="space-y-1 text-[#555555] text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[#111827] font-semibold">+225 27 22 59 88 00</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a href="mailto:admissions@pluriperf.com" className="text-[#008629] hover:underline font-medium">
                      admissions@pluriperf.com
                    </a>
                  </div>
                </div>

                <div className="pt-1.5 space-y-1.5">
                  {onOpenWhatsApp && (
                    <button
                      type="button"
                      onClick={onOpenWhatsApp}
                      className="w-full flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#20ba59] text-white font-semibold py-1.5 px-3 rounded-sm transition-colors text-xs"
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
                      <span>{lang === 'fr' ? 'Prendre rendez-vous' : 'Book interview'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Quick chapter step navigation controls */}
              <div className="p-2 bg-white border border-[#eaeaea] rounded-sm flex items-center justify-between gap-1 text-xs">
                <button
                  type="button"
                  onClick={handlePrevSection}
                  disabled={activeIndex === 0}
                  className={`flex-1 py-1.5 px-2 text-[11px] font-medium rounded-xs border flex items-center justify-center gap-1 transition-colors ${
                    activeIndex === 0
                      ? 'border-transparent text-gray-300 cursor-not-allowed'
                      : 'border-[#eaeaea] text-[#333333] hover:border-[#008629] hover:text-[#008629]'
                  }`}
                  title={lang === 'fr' ? 'Chapitre précédent' : 'Previous chapter'}
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>{lang === 'fr' ? 'Précédent' : 'Prev'}</span>
                </button>

                <button
                  type="button"
                  onClick={scrollToTop}
                  className="py-1.5 px-2 text-[11px] font-medium text-[#666666] hover:text-[#008629] border border-[#eaeaea] hover:border-[#008629] rounded-xs transition-colors flex items-center justify-center"
                  title={lang === 'fr' ? 'Haut de page' : 'Scroll to top'}
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={handleNextSection}
                  disabled={activeIndex === navSections.length - 1}
                  className={`flex-1 py-1.5 px-2 text-[11px] font-medium rounded-xs border flex items-center justify-center gap-1 transition-colors ${
                    activeIndex === navSections.length - 1
                      ? 'border-transparent text-gray-300 cursor-not-allowed'
                      : 'border-[#eaeaea] text-[#008629] font-bold hover:bg-[#f0f9f1] border-[#008629]'
                  }`}
                  title={lang === 'fr' ? 'Chapitre suivant' : 'Next chapter'}
                >
                  <span>{lang === 'fr' ? 'Suivant' : 'Next'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </aside>

          {/* RIGHT MAIN CONTENT AREA */}
          <main className="lg:col-span-8 xl:col-span-9 space-y-12">

            {/* KEY FIGURES GRID (Exact INP-HB style 4-column metric boxes) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white border border-[#eaeaea] p-4 rounded-sm shadow-sm text-center">
                <div className="w-10 h-10 mx-auto rounded-full bg-[#eaf5ec] flex items-center justify-center text-[#008629] mb-2">
                  <Building2 className="w-5 h-5" />
                </div>
                <strong className="block text-2xl sm:text-3xl font-bold text-[#111827]">09</strong>
                <span className="text-[11px] uppercase tracking-wider text-[#666666] font-semibold">
                  {lang === 'fr' ? 'Facultés spécialisées' : 'Pioneer Faculties'}
                </span>
              </div>

              <div className="bg-white border border-[#eaeaea] p-4 rounded-sm shadow-sm text-center">
                <div className="w-10 h-10 mx-auto rounded-full bg-[#eaf5ec] flex items-center justify-center text-[#008629] mb-2">
                  <Leaf className="w-5 h-5" />
                </div>
                <strong className="block text-2xl sm:text-3xl font-bold text-[#008629]">100%</strong>
                <span className="text-[11px] uppercase tracking-wider text-[#666666] font-semibold">
                  {lang === 'fr' ? 'Pédagogie régénérative' : 'Regenerative focus'}
                </span>
              </div>

              <div className="bg-white border border-[#eaeaea] p-4 rounded-sm shadow-sm text-center">
                <div className="w-10 h-10 mx-auto rounded-full bg-[#eaf5ec] flex items-center justify-center text-[#008629] mb-2">
                  <Globe2 className="w-5 h-5" />
                </div>
                <strong className="block text-2xl sm:text-3xl font-bold text-[#111827]">120+</strong>
                <span className="text-[11px] uppercase tracking-wider text-[#666666] font-semibold">
                  {lang === 'fr' ? 'Partenaires mondiaux' : 'Global Partners'}
                </span>
              </div>

              <div className="bg-white border border-[#eaeaea] p-4 rounded-sm shadow-sm text-center">
                <div className="w-10 h-10 mx-auto rounded-full bg-[#eaf5ec] flex items-center justify-center text-[#008629] mb-2">
                  <Award className="w-5 h-5" />
                </div>
                <strong className="block text-2xl sm:text-3xl font-bold text-[#f77f00]">94%</strong>
                <span className="text-[11px] uppercase tracking-wider text-[#666666] font-semibold">
                  {lang === 'fr' ? 'Insertion sous 6 mois' : 'Placement rate'}
                </span>
              </div>
            </div>

            {/* SECTION 1: PRÉSENTATION GÉNÉRALE */}
            <section id="presentation" className="scroll-mt-24 bg-white border border-[#eaeaea] p-6 sm:p-8 rounded-sm shadow-sm space-y-6">
              <div className="border-b border-[#eaeaea] pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#008629] block mb-1">
                  {lang === 'fr' ? 'Chapitre 01 · Identité Académique' : 'Chapter 01 · Academic Identity'}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#111827]">
                  {lang === 'fr' ? "Présentation de l'Université PLURIPERF" : 'Overview of PLURIPERF University'}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-7 space-y-4 text-sm leading-relaxed text-[#444444]">
                  <p className="font-medium text-[#111827] text-base leading-relaxed">
                    {content.presentation.content}
                  </p>
                  <p>
                    {lang === 'fr'
                      ? "PLURIPERF International University a été créée pour répondre à l'urgence de notre siècle : doter le continent et le monde d'une élite managériale capable de conjuguer prospérité économique durable, régénération des écosystèmes et justice sociale."
                      : "PLURIPERF International University was founded to address this century's defining challenge: preparing leaders capable of reconciling economic growth, ecological stewardship, and social equity."}
                  </p>
                  <p>
                    {lang === 'fr'
                      ? "Grâce à notre ancrage à Abidjan et Yamoussoukro, et nos représentations à Paris et Genève, nos étudiants bénéficient d'un environnement multiculturel et de standards académiques internationaux."
                      : "With campuses in Abidjan, Yamoussoukro, Paris, and Geneva, our scholars thrive in a multicultural environment aligned with the highest global academic benchmarks."}
                  </p>
                </div>

                <div className="md:col-span-5">
                  <div className="border border-[#eaeaea] overflow-hidden rounded-sm shadow-sm">
                    <img
                      src={UNIVERSITY_ASSETS.heroCampus}
                      alt="Campus Universitaire PLURIPERF"
                      className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="p-3 bg-[#f8fafc] border-t border-[#eaeaea] text-[11px] text-[#666666] flex items-center justify-between">
                      <span className="font-semibold text-[#111827]">Campus Universitaire</span>
                      <span className="text-[#008629]">Pôle d'Excellence</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Institutional quote box */}
              <div className="border-l-4 border-[#008629] bg-[#f8fafc] p-4 text-xs sm:text-sm italic text-[#333333]">
                « {lang === 'fr'
                  ? "Nous ne formons pas seulement des gestionnaires : nous formons les architectes de la transition écologique et humaine des organisations."
                  : "We do not simply educate managers: we cultivate architects of organizational and ecological transition."} »
              </div>
            </section>

            {/* SECTION 2: MOT DU RECTEUR-PRÉSIDENT */}
            <section id="motPresident" className="scroll-mt-24 bg-white border border-[#eaeaea] p-6 sm:p-8 rounded-sm shadow-sm space-y-6">
              <div className="border-b border-[#eaeaea] pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#008629] block mb-1">
                  {lang === 'fr' ? 'Chapitre 02 · Direction Générale' : 'Chapter 02 · Leadership Message'}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#111827]">
                  {content.motPresident.title}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-4 text-center">
                  <div className="inline-block border-2 border-[#eaeaea] p-1 rounded-sm bg-white shadow-sm">
                    <img
                      src={UNIVERSITY_ASSETS.presidentPortrait}
                      alt="Recteur-Président PLURIPERF"
                      className="w-44 h-56 object-cover mx-auto rounded-xs"
                    />
                  </div>
                  <div className="mt-3">
                    <b className="block text-sm text-[#111827]">
                      {content.motPresident.author}
                    </b>
                    <span className="text-xs text-[#008629] font-medium block mt-0.5">
                      {lang === 'fr' ? 'Présidence & Conseil d’Administration' : 'President & Board of Regents'}
                    </span>
                    <span className="text-[11px] text-[#888888] block mt-0.5">
                      PLURIPERF International University
                    </span>
                  </div>
                </div>

                <div className="md:col-span-8 space-y-4 text-sm leading-relaxed text-[#444444]">
                  <p className="italic text-base text-[#111827] font-serif border-l-2 border-[#f77f00] pl-3">
                    « {content.motPresident.content} »
                  </p>
                  <p>
                    {lang === 'fr'
                      ? "L'université contemporaine ne peut plus se contenter d'enseigner des formules dépassées héritées de l'ère industrielle. Face aux bouleversements climatiques, à la transformation numérique et aux exigences de gouvernance éthique, notre mission est de réconcilier l'esprit d'entreprise avec le respect sacré du Vivant."
                      : "Contemporary higher education can no longer teach outdated models inherited from the industrial era. Confronting climate turbulence and digital transformation, our imperative is to reconcile organizational vigor with deep respect for living ecosystems."}
                  </p>
                  <p>
                    {lang === 'fr'
                      ? "À tous nos étudiants, enseignants, chercheurs et partenaires : soyez les bienvenus au cœur de cette formidable aventure académique et humaine."
                      : "To all our scholars, professors, researchers, and global partners: welcome to this profound academic expedition."}
                  </p>

                  <div className="pt-3 border-t border-[#eaeaea] flex items-center justify-between">
                    <div className="text-xs text-[#888888]">
                      {lang === 'fr' ? 'Fait à Yamoussoukro & Abidjan' : 'Issued in Yamoussoukro & Abidjan'}
                    </div>
                    <div className="font-serif italic text-sm text-[#111827] font-semibold">
                      {content.motPresident.author}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: VISION, MISSIONS & VALEURS */}
            <section id="vision" className="scroll-mt-24 bg-white border border-[#eaeaea] p-6 sm:p-8 rounded-sm shadow-sm space-y-6">
              <div className="border-b border-[#eaeaea] pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#008629] block mb-1">
                  {lang === 'fr' ? 'Chapitre 03 · Fondements & Déontologie' : 'Chapter 03 · Mission & Principles'}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#111827]">
                  {content.vision.title}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Vision Card */}
                <div className="border border-[#eaeaea] border-t-4 border-t-[#008629] p-5 rounded-sm bg-[#fafafa]">
                  <div className="w-8 h-8 rounded bg-[#eaf5ec] flex items-center justify-center text-[#008629] mb-3">
                    <Compass className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider mb-2">
                    {lang === 'fr' ? 'Notre Vision' : 'Our Vision'}
                  </h3>
                  <p className="text-xs text-[#555555] leading-relaxed">
                    {lang === 'fr'
                      ? "Devenir le pôle d'excellence panafricain et international de référence pour les sciences de gestion éco-responsables et le biomimétisme organisationnel d'ici 2030."
                      : 'Become the international beacon of reference for eco-responsible management sciences and organizational biomimicry by 2030.'}
                  </p>
                </div>

                {/* Mission Card */}
                <div className="border border-[#eaeaea] border-t-4 border-t-[#f77f00] p-5 rounded-sm bg-[#fafafa]">
                  <div className="w-8 h-8 rounded bg-amber-50 flex items-center justify-center text-[#f77f00] mb-3">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider mb-2">
                    {lang === 'fr' ? 'Notre Mission' : 'Our Mission'}
                  </h3>
                  <p className="text-xs text-[#555555] leading-relaxed">
                    {lang === 'fr'
                      ? "Dispenser des formations de haut niveau alliant rigueur académique, immersion opérationnelle et maîtrise concrète des critères ESG et bilans environnementaux."
                      : 'Provide world-class degree programs combining rigorous scholarship, corporate immersion, and mastery of ESG standards and ecological auditing.'}
                  </p>
                </div>

                {/* Values Card */}
                <div className="border border-[#eaeaea] border-t-4 border-t-[#111827] p-5 rounded-sm bg-[#fafafa]">
                  <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-[#111827] mb-3">
                    <Shield className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider mb-2">
                    {lang === 'fr' ? 'Nos Valeurs' : 'Our Core Values'}
                  </h3>
                  <ul className="text-xs text-[#555555] space-y-1.5 leading-relaxed">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#008629]" />
                      <span>{lang === 'fr' ? 'Révérence du Vivant & Éthique' : 'Reverence for Life'}</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#008629]" />
                      <span>{lang === 'fr' ? 'Rigueur scientifique éprouvée' : 'Scientific Rigor'}</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#008629]" />
                      <span>{lang === 'fr' ? 'Innovation et Impact régénératif' : 'Regenerative Innovation'}</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#008629]" />
                      <span>{lang === 'fr' ? 'Intégrité & Mérite universitaire' : 'Integrity & Merit'}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 4: LE MODÈLE MIN (MANAGEMENT INSPIRÉ DE LA NATURE) */}
            <section id="min" className="scroll-mt-24 bg-white border border-[#eaeaea] p-6 sm:p-8 rounded-sm shadow-sm space-y-6">
              <div className="border-b border-[#eaeaea] pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#008629] block mb-1">
                  {lang === 'fr' ? 'Chapitre 04 · Innovation Pédagogique Signature' : 'Chapter 04 · Signature Pedagogy'}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#111827]">
                  {content.min.title}
                </h2>
              </div>

              <div className="space-y-4 text-sm leading-relaxed text-[#444444]">
                <p>
                  {content.min.content}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="border border-[#eaeaea] p-4 rounded-sm bg-[#f8fafc]">
                    <h4 className="text-xs font-bold text-[#008629] uppercase tracking-wider mb-1">
                      {lang === 'fr' ? '1. Écologie Systémique & Cycles Fermés' : '1. Closed-Loop Systems'}
                    </h4>
                    <p className="text-xs text-[#555555]">
                      {lang === 'fr'
                        ? "Dans la nature, le déchet n'existe pas : tout est ressource. Nos programmes enseignent la modélisation des chaînes de valeur circulaires sans déperdition."
                        : 'In natural systems, waste does not exist. Our curriculum trains managers in closed-loop economic cycles and zero-waste ecosystems.'}
                    </p>
                  </div>

                  <div className="border border-[#eaeaea] p-4 rounded-sm bg-[#f8fafc]">
                    <h4 className="text-xs font-bold text-[#008629] uppercase tracking-wider mb-1">
                      {lang === 'fr' ? '2. Résilience Organisationnelle' : '2. Organizational Resilience'}
                    </h4>
                    <p className="text-xs text-[#555555]">
                      {lang === 'fr'
                        ? "S'inspirer des forêts primaires et des réseaux mycorhiziens pour bâtir des structures collaboratives décentralisées et antifragiles."
                        : 'Drawing upon primary biomes and decentralized networks to architect resilient, antifragile enterprise systems.'}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 5: HISTOIRE & JALONS */}
            <section id="histoire" className="scroll-mt-24 bg-white border border-[#eaeaea] p-6 sm:p-8 rounded-sm shadow-sm space-y-6">
              <div className="border-b border-[#eaeaea] pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#008629] block mb-1">
                  {lang === 'fr' ? 'Chapitre 05 · Trajectoire & Genèse' : 'Chapter 05 · Chronology & Milestones'}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#111827]">
                  {content.histoire.title}
                </h2>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-[#444444]">
                  {content.histoire.content}
                </p>

                {/* Timeline in INP-HB institutional style */}
                <div className="border-l-2 border-[#008629] ml-4 pl-6 space-y-6 pt-2">
                  <div className="relative">
                    <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#008629] ring-4 ring-white"></span>
                    <span className="text-xs font-bold text-[#008629]">2018</span>
                    <h4 className="text-sm font-bold text-[#111827]">
                      {lang === 'fr' ? 'Fondation de la Chaire de Recherche en Management Régénératif' : 'Foundation of the Research Chair'}
                    </h4>
                    <p className="text-xs text-[#666666] mt-0.5">
                      {lang === 'fr'
                        ? 'Initiation des premiers colloques et travaux scientifiques fondateurs sur le Modèle MIN.'
                        : 'Launch of initial exploratory symposia and foundational research on the NIM model.'}
                    </p>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#008629] ring-4 ring-white"></span>
                    <span className="text-xs font-bold text-[#008629]">2021</span>
                    <h4 className="text-sm font-bold text-[#111827]">
                      {lang === 'fr' ? 'Ouverture des 9 Facultés Spécialisées & Campus Abidjan' : 'Inauguration of 9 Pioneer Faculties'}
                    </h4>
                    <p className="text-xs text-[#666666] mt-0.5">
                      {lang === 'fr'
                        ? 'Lancement officiel des programmes de Licence, Master et Doctorat avec accréditation ECTS.'
                        : 'Chartering undergraduate, masters, and doctoral degrees with European ECTS compliance.'}
                    </p>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#008629] ring-4 ring-white"></span>
                    <span className="text-xs font-bold text-[#008629]">2024</span>
                    <h4 className="text-sm font-bold text-[#111827]">
                      {lang === 'fr' ? 'Lancement de l’Alliance Mère Nature & Extension Internationale' : 'Mother Nature Global Alliance'}
                    </h4>
                    <p className="text-xs text-[#666666] mt-0.5">
                      {lang === 'fr'
                        ? 'Partenariats multilatéraux et déploiement du Cabinet Conseil en Décarbonation & RSE.'
                        : 'Multilateral academic partnerships and launch of the Corporate ESG & Decarbonization Advisory.'}
                    </p>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#f77f00] ring-4 ring-white"></span>
                    <span className="text-xs font-bold text-[#f77f00]">2026</span>
                    <h4 className="text-sm font-bold text-[#111827]">
                      {lang === 'fr' ? 'Plein Déploiement E-Campus & Réseau Doctoral Mondial' : 'Global Doctoral Network & E-Campus'}
                    </h4>
                    <p className="text-xs text-[#666666] mt-0.5">
                      {lang === 'fr'
                        ? 'Plateforme hybride d’enseignement pour plus de 2 500 auditeurs répartis sur 3 continents.'
                        : 'Hybrid digital campus serving over 2,500 students across Africa, Europe, and international centers.'}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: ORGANISATION & GOUVERNANCE */}
            <section id="gouvernance" className="scroll-mt-24 bg-white border border-[#eaeaea] p-6 sm:p-8 rounded-sm shadow-sm space-y-6">
              <div className="border-b border-[#eaeaea] pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#008629] block mb-1">
                  {lang === 'fr' ? 'Chapitre 06 · Instances Dirigeantes' : 'Chapter 06 · University Governance'}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#111827]">
                  {content.gouvernance.title}
                </h2>
              </div>

              <div className="space-y-4 text-sm text-[#444444]">
                <p>
                  {content.gouvernance.content}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-[#eaeaea] p-4 rounded-sm bg-white">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#111827] mb-2">
                      <Shield className="w-4 h-4 text-[#008629]" />
                      <span>{lang === 'fr' ? 'Conseil d’Administration' : 'Board of Directors'}</span>
                    </div>
                    <p className="text-xs text-[#666666]">
                      {lang === 'fr'
                        ? 'Définit les orientations stratégiques, budgétaires et les alliances institutionnelles majeures.'
                        : 'Sets institutional strategy, capital investments, and key inter-university charters.'}
                    </p>
                  </div>

                  <div className="border border-[#eaeaea] p-4 rounded-sm bg-white">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#111827] mb-2">
                      <BookOpen className="w-4 h-4 text-[#008629]" />
                      <span>{lang === 'fr' ? 'Sénat Académique & Scientifique' : 'Academic Senate'}</span>
                    </div>
                    <p className="text-xs text-[#666666]">
                      {lang === 'fr'
                        ? 'Garant de la qualité des programmes, de la recherche fondamentale et de l’évaluation des chaires.'
                        : 'Oversees curricula quality, doctoral defenses, research publications, and faculty accreditations.'}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 7: PÉDAGOGIE & ECTS */}
            <section id="modelePedagogique" className="scroll-mt-24 bg-white border border-[#eaeaea] p-6 sm:p-8 rounded-sm shadow-sm space-y-6">
              <div className="border-b border-[#eaeaea] pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#008629] block mb-1">
                  {lang === 'fr' ? 'Chapitre 07 · Cursus & Crédits ECTS' : 'Chapter 07 · Pedagogy & ECTS'}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#111827]">
                  {content.modelePedagogique.title}
                </h2>
              </div>

              <div className="space-y-4 text-sm text-[#444444]">
                <p>
                  {content.modelePedagogique.content}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="border border-[#eaeaea] p-4 rounded-sm text-center bg-[#fafafa]">
                    <span className="text-xs font-bold uppercase text-[#008629] block">Licence / Bachelor</span>
                    <strong className="block text-xl font-bold text-[#111827] mt-1">180 ECTS</strong>
                    <span className="text-[11px] text-[#666666]">3 Années académiques</span>
                  </div>
                  <div className="border border-[#eaeaea] p-4 rounded-sm text-center bg-[#fafafa]">
                    <span className="text-xs font-bold uppercase text-[#008629] block">Master / MSc</span>
                    <strong className="block text-xl font-bold text-[#111827] mt-1">120 ECTS</strong>
                    <span className="text-[11px] text-[#666666]">2 Années académiques</span>
                  </div>
                  <div className="border border-[#eaeaea] p-4 rounded-sm text-center bg-[#fafafa]">
                    <span className="text-xs font-bold uppercase text-[#008629] block">Doctorat / PhD</span>
                    <strong className="block text-xl font-bold text-[#111827] mt-1">180 ECTS</strong>
                    <span className="text-[11px] text-[#666666]">3 à 4 Années de recherche</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: AGRÉMENTS, RECONNAISSANCES & PARTENAIRES */}
            <section id="reconnaissances" className="scroll-mt-24 bg-white border border-[#eaeaea] p-6 sm:p-8 rounded-sm shadow-sm space-y-6">
              <div className="border-b border-[#eaeaea] pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#008629] block mb-1">
                  {lang === 'fr' ? 'Chapitre 08 · Rayonnement & Partenariats' : 'Chapter 08 · Alliances & Charters'}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#111827]">
                  {content.reconnaissances.title}
                </h2>
              </div>

              <div className="space-y-4 text-sm text-[#444444]">
                <p>
                  {content.reconnaissances.content}
                </p>

                <div className="bg-[#f8fafc] border border-[#eaeaea] p-4 rounded-sm">
                  <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-2">
                    {lang === 'fr' ? 'Réseau de 120+ Alliances Mondiales' : 'Network of 120+ Global Alliances'}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-[#555555]">
                    <div className="p-2 bg-white border border-[#eaeaea] rounded text-center">
                      Universités Partenaires EU
                    </div>
                    <div className="p-2 bg-white border border-[#eaeaea] rounded text-center">
                      Centres de Recherche Panafricains
                    </div>
                    <div className="p-2 bg-white border border-[#eaeaea] rounded text-center">
                      Entreprises & Multinationales ESG
                    </div>
                    <div className="p-2 bg-white border border-[#eaeaea] rounded text-center">
                      Institutions Financières Vertes
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 9: ALLIANCE MÈRE NATURE */}
            <section id="mereNatureRef" className="scroll-mt-24 bg-white border border-[#eaeaea] p-6 sm:p-8 rounded-sm shadow-sm space-y-6">
              <div className="border-b border-[#eaeaea] pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#008629] block mb-1">
                  {lang === 'fr' ? 'Chapitre 09 · Engagement Planétaire' : 'Chapter 09 · Global Commitment'}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#111827]">
                  {content.mereNatureRef.title}
                </h2>
              </div>

              <div className="space-y-4 text-sm text-[#444444]">
                <p>
                  {content.mereNatureRef.content}
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onNavigate('mere_nature')}
                    className="inphb-btn-outline text-xs"
                  >
                    <span>{lang === 'fr' ? 'Découvrir l’Alliance Mère Nature' : 'Explore Mother Nature Alliance'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </section>

            {/* BOTTOM INSTITUTIONAL CALL TO ACTION (Exact INP-HB style) */}
            <div className="bg-[#008629] text-white p-8 rounded-sm shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
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
