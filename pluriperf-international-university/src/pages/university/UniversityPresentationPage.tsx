import React from 'react';
import { Language, PageId } from '../../types';
import { UNIVERSITY_SECTIONS } from '../../data/universityData';
import { UNIVERSITY_ASSETS } from '../../assets/images';
import { UniversityLayout } from '../../components/UniversityLayout';
import {
  Building2,
  Users2,
  GraduationCap,
  Award,
  Globe2,
  ArrowRight,
  BookOpen,
  MapPin,
  Sparkles,
} from 'lucide-react';

interface UniversityPageProps {
  lang: Language;
  onNavigate: (page: PageId, sectionId?: string) => void;
  onOpenApply: () => void;
  onOpenAppointment?: () => void;
  onOpenWhatsApp?: () => void;
}

export const UniversityPresentationPage: React.FC<UniversityPageProps> = ({
  lang,
  onNavigate,
  onOpenApply,
  onOpenAppointment,
  onOpenWhatsApp,
}) => {
  const content = UNIVERSITY_SECTIONS[lang].presentation;

  return (
    <UniversityLayout
      activePageId="universite_presentation"
      pageTitleFr="Présentation & Chiffres Clés"
      pageTitleEn="Overview & Key Figures"
      pageSubtitleFr="1ère Université de Management Durable, d'Écologie Responsable et de Leadership Régénératif."
      pageSubtitleEn="Pioneer University in Sustainable Management, Applied Ecology, and Regenerative Leadership."
      chapterBadgeFr="Chapitre 01 · Identité Académique"
      chapterBadgeEn="Chapter 01 · Academic Identity"
      lang={lang}
      onNavigate={onNavigate}
      onOpenApply={onOpenApply}
      onOpenAppointment={onOpenAppointment}
      onOpenWhatsApp={onOpenWhatsApp}
    >
      <div className="space-y-8">
        {/* KEY FIGURES GRID (Exact INP-HB style 4-column metric boxes) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white border border-[#eaeaea] p-4 rounded-sm shadow-sm text-center">
            <div className="w-10 h-10 mx-auto rounded-full bg-[#eaf5ec] flex items-center justify-center text-[#008629] mb-2">
              <Users2 className="w-5 h-5" />
            </div>
            <strong className="block text-xl sm:text-2xl font-bold text-[#111827]">2 500+</strong>
            <span className="text-xs text-[#666666] font-medium">
              {lang === 'fr' ? 'Étudiants & Auditeurs' : 'Scholars & Executives'}
            </span>
          </div>

          <div className="bg-white border border-[#eaeaea] p-4 rounded-sm shadow-sm text-center">
            <div className="w-10 h-10 mx-auto rounded-full bg-[#eaf5ec] flex items-center justify-center text-[#008629] mb-2">
              <Building2 className="w-5 h-5" />
            </div>
            <strong className="block text-xl sm:text-2xl font-bold text-[#111827]">09</strong>
            <span className="text-xs text-[#666666] font-medium">
              {lang === 'fr' ? 'Facultés d’Excellence' : 'Dedicated Faculties'}
            </span>
          </div>

          <div className="bg-white border border-[#eaeaea] p-4 rounded-sm shadow-sm text-center">
            <div className="w-10 h-10 mx-auto rounded-full bg-[#eaf5ec] flex items-center justify-center text-[#008629] mb-2">
              <MapPin className="w-5 h-5" />
            </div>
            <strong className="block text-xl sm:text-2xl font-bold text-[#111827]">4 Campus</strong>
            <span className="text-xs text-[#666666] font-medium">
              {lang === 'fr' ? 'Abidjan · Yamoussoukro · Paris · Genève' : 'Global Hubs'}
            </span>
          </div>

          <div className="bg-white border border-[#eaeaea] p-4 rounded-sm shadow-sm text-center">
            <div className="w-10 h-10 mx-auto rounded-full bg-[#eaf5ec] flex items-center justify-center text-[#008629] mb-2">
              <Globe2 className="w-5 h-5" />
            </div>
            <strong className="block text-xl sm:text-2xl font-bold text-[#111827]">120+</strong>
            <span className="text-xs text-[#666666] font-medium">
              {lang === 'fr' ? 'Alliances Mondiales' : 'Global Partnerships'}
            </span>
          </div>
        </div>

        {/* SECTION CARD */}
        <section className="bg-white border border-[#eaeaea] p-6 sm:p-8 rounded-sm shadow-sm space-y-6">
          <div className="border-b border-[#eaeaea] pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#008629] block mb-1">
              {lang === 'fr' ? 'Histoire Fondatrice & Vocation' : 'Foundation & Vocation'}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#111827]">
              {lang === 'fr' ? "Une université pionnière au service du Vivant" : 'A pioneering university for living ecosystems'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-4 text-sm leading-relaxed text-[#444444]">
              <p className="font-medium text-[#111827] text-base leading-relaxed">
                {content.content}
              </p>
              <p>
                {lang === 'fr'
                  ? "PLURIPERF International University a été créée pour répondre à l'urgence de notre siècle : doter le continent et le monde d'une élite managériale capable de conjuguer prospérité économique durable, régénération des écosystèmes et justice sociale."
                  : "PLURIPERF International University was founded to address this century's defining challenge: preparing leaders capable of reconciling economic growth, ecological stewardship, and social equity."}
              </p>
              <p>
                {lang === 'fr'
                  ? "Grâce à notre ancrage à Abidjan et Yamoussoukro, et nos représentations à Paris et Genève, nos étudiants bénéficient d'un environnement multiculturel et de standards académiques internationaux les plus rigoureux."
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

        {/* CAMPUSES CARDS */}
        <section className="bg-white border border-[#eaeaea] p-6 sm:p-8 rounded-sm shadow-sm space-y-6">
          <div className="border-b border-[#eaeaea] pb-3">
            <h3 className="text-lg font-bold text-[#111827]">
              {lang === 'fr' ? 'Nos Pôles & Représentations Académiques' : 'Campuses & Regional Hubs'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-[#eaeaea] rounded-sm bg-[#fafafa]">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-[#008629]" />
                <h4 className="text-sm font-bold text-[#111827]">Campus Central · Côte d'Ivoire</h4>
              </div>
              <p className="text-xs text-[#555555] leading-relaxed">
                {lang === 'fr'
                  ? 'Abidjan Cocody (Siège rectoral, Pôle de Finance Verte et Sciences de Gestion) & Yamoussoukro (Pôle de Recherche Agroécologique et Living Labs).'
                  : 'Abidjan Cocody (Executive Rectorate, Green Finance Hub) & Yamoussoukro (Agroecology & Living Labs Center).'}
              </p>
            </div>

            <div className="p-4 border border-[#eaeaea] rounded-sm bg-[#fafafa]">
              <div className="flex items-center gap-2 mb-2">
                <Globe2 className="w-4 h-4 text-[#008629]" />
                <h4 className="text-sm font-bold text-[#111827]">Liaisons Internationales · Europe</h4>
              </div>
              <p className="text-xs text-[#555555] leading-relaxed">
                {lang === 'fr'
                  ? 'Paris & Genève : Bureaux de coordination pour les mobilités professorales européennes, les colloques internationaux et les partenariats multilatéraux.'
                  : 'Paris & Geneva: Coordination liaisons for European faculty exchanges, global symposia, and multilateral university alliances.'}
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onNavigate('facultes')}
              className="inphb-btn-primary text-xs flex items-center gap-1.5"
            >
              <GraduationCap className="w-4 h-4" />
              <span>{lang === 'fr' ? 'Découvrir nos 9 Facultés' : 'Explore 9 Faculties'}</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('universite_mot_president')}
              className="inphb-btn-outline text-xs flex items-center gap-1.5"
            >
              <span>{lang === 'fr' ? 'Lire le Mot du Recteur' : "Read Rector's Address"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>
      </div>
    </UniversityLayout>
  );
};
