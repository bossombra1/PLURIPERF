import React from 'react';
import { Language, PageId } from '../../types';
import { UNIVERSITY_SECTIONS } from '../../data/universityData';
import { UniversityLayout } from '../../components/UniversityLayout';
import {
  History,
  Calendar,
  Sparkles,
  Milestone,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

interface UniversityPageProps {
  lang: Language;
  onNavigate: (page: PageId, sectionId?: string) => void;
  onOpenApply: () => void;
  onOpenAppointment?: () => void;
  onOpenWhatsApp?: () => void;
}

export const UniversityHistoirePage: React.FC<UniversityPageProps> = ({
  lang,
  onNavigate,
  onOpenApply,
  onOpenAppointment,
  onOpenWhatsApp,
}) => {
  const content = UNIVERSITY_SECTIONS[lang].histoire;

  const milestones = [
    {
      year: '2018',
      titleFr: 'Fondation de la Chaire de Recherche en Management Régénératif',
      titleEn: 'Foundation of the Regenerative Management Research Chair',
      descFr: 'Colloque fondateur réunissant des économistes écologiques, des biologistes et des dirigeants visionnaires à Yamoussoukro pour modéliser le biomimétisme organisationnel.',
      descEn: 'Inaugural symposium convening ecological economists, biologists, and visionary leaders in Yamoussoukro to formulate organizational biomimicry.',
      badgeFr: 'Genèse Scientifique',
      badgeEn: 'Scientific Inception',
    },
    {
      year: '2021',
      titleFr: 'Création Officielle des 9 Facultés Spécialisées & Campus Abidjan',
      titleEn: 'Official Creation of 9 Dedicated Faculties & Abidjan Campus',
      descFr: 'Ouverture du Campus central d’Abidjan Cocody et structuration des premiers parcours Licence et Master alignés sur le système LMD européen (ECTS).',
      descEn: 'Opening of the Abidjan Cocody flagship campus and launch of Bachelor and Master programs aligned with European LMD standards (ECTS).',
      badgeFr: 'Déploiement Initial',
      badgeEn: 'First Cohort',
    },
    {
      year: '2023',
      titleFr: 'Lancement du Cabinet Conseil & Accréditations Internationales',
      titleEn: 'Launch of Advisory Practice & Global Accreditations',
      descFr: 'Création du Cabinet de Conseil en Décarbonation & RSE certifié ISO 21001, accompagnant plus de 40 entreprises et institutions en Afrique de l’Ouest.',
      descEn: 'Launch of the ISO 21001-certified Decarbonization & CSR Advisory practice, assisting 40+ organizations across West Africa.',
      badgeFr: 'Pôle Expertise',
      badgeEn: 'Advisory Expansion',
    },
    {
      year: '2024',
      titleFr: 'Alliance Mère Nature & Living Labs Expérimentaux',
      titleEn: 'Mother Nature Alliance & Experimental Living Labs',
      descFr: 'Création de la branche sociétale Mère Nature, inauguration des Living Labs agroécologiques à Yamoussoukro et premières campagnes de reboisement à grande échelle.',
      descEn: 'Establishment of Mother Nature civic branch, opening of Yamoussoukro agroecological Living Labs, and first large-scale rewilding initiatives.',
      badgeFr: 'Living Labs',
      badgeEn: 'Living Labs',
    },
    {
      year: '2026',
      titleFr: 'Collège Doctoral International & Plateforme E-Campus Mondiale',
      titleEn: 'International Doctoral College & Global E-Campus',
      descFr: 'Plus de 2 500 auditeurs répartis sur 45 pays, réseau de 120+ partenaires universitaires et déploiement du Doctorat / PhD en Sciences de Gestion Régénérative.',
      descEn: 'Over 2,500 scholars across 45 countries, 120+ university alliances, and launch of the international PhD in Regenerative Management Sciences.',
      badgeFr: 'Rayonnement Mondial',
      badgeEn: 'Global Network',
    },
  ];

  return (
    <UniversityLayout
      activePageId="universite_histoire"
      pageTitleFr="Histoire & Jalons Fondateurs"
      pageTitleEn="History & Milestones"
      pageSubtitleFr="De la fondation de la chaire de recherche aux campus internationaux d'aujourd'hui."
      pageSubtitleEn="From the inception of our research chair to today’s global academic footprint."
      chapterBadgeFr="Chapitre 05 · Trajectoire Historique"
      chapterBadgeEn="Chapter 05 · Historical Timeline"
      lang={lang}
      onNavigate={onNavigate}
      onOpenApply={onOpenApply}
      onOpenAppointment={onOpenAppointment}
      onOpenWhatsApp={onOpenWhatsApp}
    >
      <div className="space-y-8">
        {/* GENESIS CARD */}
        <section className="bg-white border border-[#eaeaea] p-6 sm:p-8 rounded-sm shadow-sm space-y-4">
          <div className="border-b border-[#eaeaea] pb-3 flex items-center gap-2 text-[#008629]">
            <History className="w-5 h-5 shrink-0" />
            <h2 className="text-xl font-bold text-[#111827]">
              {lang === 'fr' ? 'La Genèse d’une Vision Académique' : 'The Inception of an Academic Vision'}
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-[#444444]">
            {content.content}
          </p>
        </section>

        {/* CHRONOLOGICAL TIMELINE (Exact INP-HB style with vertical green track) */}
        <section className="bg-white border border-[#eaeaea] p-6 sm:p-8 rounded-sm shadow-sm space-y-6">
          <div className="border-b border-[#eaeaea] pb-3">
            <h3 className="text-lg font-bold text-[#111827]">
              {lang === 'fr' ? 'Frise Chronologique des Jalons Institutionnels' : 'Institutional Milestones Timeline'}
            </h3>
          </div>

          <div className="relative border-l-2 border-[#008629] ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8 py-2">
            {milestones.map((item) => (
              <div key={item.year} className="relative group">
                {/* Timeline node */}
                <div className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-4 h-4 rounded-full bg-[#008629] border-4 border-white shadow-xs group-hover:scale-125 transition-transform"></div>

                <div className="bg-[#f8fafc] border border-[#eaeaea] p-4 sm:p-5 rounded-sm hover:border-[#008629] transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-base font-extrabold text-[#008629]">
                      {item.year}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#eaf5ec] text-[#008629] px-2 py-0.5 rounded">
                      {lang === 'fr' ? item.badgeFr : item.badgeEn}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-[#111827] mb-1">
                    {lang === 'fr' ? item.titleFr : item.titleEn}
                  </h4>
                  <p className="text-xs text-[#555555] leading-relaxed">
                    {lang === 'fr' ? item.descFr : item.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2030 OUTLOOK */}
        <section className="bg-[#f0f9f1] border border-[#bbf7d0] p-6 rounded-sm space-y-3">
          <div className="flex items-center gap-2 text-[#008629]">
            <TrendingUp className="w-5 h-5 shrink-0" />
            <h4 className="font-bold text-sm uppercase text-[#166534]">
              {lang === 'fr' ? 'Perspective Stratégique 2030' : 'Strategic Outlook 2030'}
            </h4>
          </div>
          <p className="text-xs text-[#14532d] leading-relaxed">
            {lang === 'fr'
              ? 'D’ici 2030, PLURIPERF projette d’ouvrir deux nouveaux campus régionaux à Dakar et Nairobi, et de porter son réseau doctoral à plus de 500 chercheurs engagés dans la décarbonation industrielle et l’agroécologie régénérative.'
              : 'By 2030, PLURIPERF plans to establish two regional campuses in Dakar and Nairobi, expanding its doctoral fellowship to 500+ researchers focused on industrial decarbonization and regenerative agriculture.'}
          </p>
        </section>

        {/* NEXT CHAPTER BUTTON */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => onNavigate('universite_gouvernance')}
            className="inphb-btn-primary text-xs flex items-center gap-2"
          >
            <span>{lang === 'fr' ? 'Continuer : Gouvernance & Conseils' : 'Next: Governance & Senates'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </UniversityLayout>
  );
};
