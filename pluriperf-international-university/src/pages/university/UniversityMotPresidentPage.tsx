import React from 'react';
import { Language, PageId } from '../../types';
import { UNIVERSITY_SECTIONS } from '../../data/universityData';
import { UNIVERSITY_ASSETS } from '../../assets/images';
import { UniversityLayout } from '../../components/UniversityLayout';
import {
  Quote,
  Sparkles,
  Award,
  CheckCircle2,
  ArrowRight,
  Calendar,
  FileCheck2,
} from 'lucide-react';

interface UniversityPageProps {
  lang: Language;
  onNavigate: (page: PageId, sectionId?: string) => void;
  onOpenApply: () => void;
  onOpenAppointment?: () => void;
  onOpenWhatsApp?: () => void;
}

export const UniversityMotPresidentPage: React.FC<UniversityPageProps> = ({
  lang,
  onNavigate,
  onOpenApply,
  onOpenAppointment,
  onOpenWhatsApp,
}) => {
  const mot = UNIVERSITY_SECTIONS[lang].motPresident;

  return (
    <UniversityLayout
      activePageId="universite_mot_president"
      pageTitleFr="Mot du Recteur-Président"
      pageTitleEn="Message from the Rector-President"
      pageSubtitleFr="Allocution solennelle de la Présidence et engagement pour les générations futures."
      pageSubtitleEn="Solemn address from the Rectorate and academic commitment to future generations."
      chapterBadgeFr="Chapitre 02 · Direction Générale"
      chapterBadgeEn="Chapter 02 · Rectorate Address"
      lang={lang}
      onNavigate={onNavigate}
      onOpenApply={onOpenApply}
      onOpenAppointment={onOpenAppointment}
      onOpenWhatsApp={onOpenWhatsApp}
    >
      <div className="space-y-8">
        {/* MAIN RECTORIAL ADDRESS CARD */}
        <section className="bg-white border border-[#eaeaea] p-6 sm:p-8 rounded-sm shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* PORTRAIT COLUMN */}
            <div className="md:col-span-4 space-y-3">
              <div className="border-4 border-[#eaf5ec] p-1 bg-white shadow-sm rounded-sm">
                <img
                  src={UNIVERSITY_ASSETS.presidentPortrait}
                  alt="Pr. Aimé-Jules B. Kouamé - Recteur-Président"
                  className="w-full h-auto object-cover rounded-xs"
                />
              </div>
              <div className="p-3 bg-[#f8fafc] border border-[#eaeaea] rounded-sm text-center">
                <h4 className="font-bold text-sm text-[#111827]">Pr. Aimé-Jules B. Kouamé</h4>
                <p className="text-[11px] text-[#008629] font-medium mt-0.5">
                  {lang === 'fr'
                    ? 'Recteur-Président du Conseil d’Administration'
                    : 'Rector-President & Board Chairman'}
                </p>
                <div className="mt-2 pt-2 border-t border-[#eaeaea] text-[10px] text-[#666666] space-y-0.5">
                  <p>Docteur d'État ès Sciences Économiques</p>
                  <p>Membre de l'Académie Panafricaine du Climat</p>
                </div>
              </div>
            </div>

            {/* TEXT COLUMN */}
            <div className="md:col-span-8 space-y-5 text-sm leading-relaxed text-[#444444]">
              <div className="flex items-center gap-2 text-[#008629]">
                <Quote className="w-6 h-6 shrink-0" />
                <span className="text-xs uppercase tracking-wider font-bold">
                  {lang === 'fr' ? 'Discours Inaugural Solennel' : 'Solemn Inaugural Keynote'}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[#111827]">
                « {lang === 'fr' ? 'Bâtir une science managériale qui honore et fertilise le Vivant' : 'Building a managerial science that honors living systems'} »
              </h2>

              <p className="text-base font-semibold text-[#111827] italic">
                {mot.content}
              </p>

              <p>
                {lang === 'fr'
                  ? "Chers étudiants, chercheurs, partenaires industriels et institutionnels,"
                  : "Dear scholars, researchers, industrial and institutional partners,"}
              </p>

              <p>
                {lang === 'fr'
                  ? "Lorsque nous avons fondé PLURIPERF International University, notre ambition n'était pas d'ajouter une institution de plus au paysage académique, mais de provoquer un saut qualitatif fondamental. Pendant trop longtemps, les écoles de commerce et les facultés traditionnelles ont enseigné l'économie comme un système fermé, détaché des lois élémentaires de la thermodynamique et des limites planétaires."
                  : "When we founded PLURIPERF International University, our aspiration was not merely to add another institution to the academic landscape, but to catalyze an indispensable qualitative breakthrough. For too long, traditional business schools and faculties have treated economic systems as detached from fundamental thermodynamic laws and planetary limits."}
              </p>

              <p>
                {lang === 'fr'
                  ? "Ici, à PLURIPERF, chaque enseignement, chaque recherche doctorale, chaque mission de conseil repose sur un postulat inébranlable : aucune organisation humaine ne peut être considérée comme prospère si elle détruit son propre substrat biologique."
                  : "Here at PLURIPERF, every curriculum, doctoral inquiry, and advisory mandate rests upon an unwavering premise: no human enterprise can be termed prosperous if it depletes its own biological substrate."}
              </p>

              <p>
                {lang === 'fr'
                  ? "Nous vous invitons à franchir les portes de notre université, non pour recevoir de simples recettes, mais pour acquérir la lucidité, la technicité et le courage indispensables aux transformations historiques du XXIe siècle."
                  : "We invite you to step through our university gates, not merely to absorb conventional formulas, but to master the rigor, depth, and ethical courage necessary for this century's monumental transformations."}
              </p>

              {/* Signature block */}
              <div className="pt-4 border-t border-[#eaeaea] flex items-center justify-between">
                <div>
                  <div className="font-serif italic text-base text-[#111827]">Pr. Aimé-Jules B. Kouamé</div>
                  <div className="text-[11px] text-[#666666]">Yamoussoukro & Abidjan · Rectorat Général</div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#008629] font-medium bg-[#f0f9f1] px-3 py-1.5 rounded-sm">
                  <FileCheck2 className="w-4 h-4" />
                  <span>Sceau Rectoral Certifié</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ACADEMIC OATH CARD (Exact INP-HB institutional solemn oath) */}
        <section className="bg-[#f0fdf4] border border-[#bbf7d0] p-6 sm:p-8 rounded-sm shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-[#008629]">
            <Sparkles className="w-5 h-5 shrink-0" />
            <h3 className="font-bold text-base sm:text-lg text-[#166534] uppercase tracking-wide">
              {lang === 'fr' ? 'Le Serment Académique PLURIPERF' : 'The PLURIPERF Academic Oath'}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#14532d] leading-relaxed italic">
            « {lang === 'fr'
              ? "En intégrant PLURIPERF International University, chaque étudiant, enseignant et chercheur prend solennellement l'engagement de mettre ses compétences au service de la régénération du vivant, de la vérité scientifique, de la justice climatique et du respect des équilibres écosystémiques de la Terre."
              : "Upon matriculation at PLURIPERF International University, every student, faculty member, and researcher pledges to dedicate their expertise to ecosystem regeneration, scientific truth, climate justice, and the living equilibrium of our planet."} »
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="bg-white p-3 rounded-xs border border-[#bbf7d0] text-xs text-[#166534] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#008629] shrink-0" />
              <span>{lang === 'fr' ? 'Éthique & Déontologie' : 'Ethics & Governance'}</span>
            </div>
            <div className="bg-white p-3 rounded-xs border border-[#bbf7d0] text-xs text-[#166534] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#008629] shrink-0" />
              <span>{lang === 'fr' ? 'Double Compétence Verte' : 'Green Dual Competency'}</span>
            </div>
            <div className="bg-white p-3 rounded-xs border border-[#bbf7d0] text-xs text-[#166534] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#008629] shrink-0" />
              <span>{lang === 'fr' ? 'Impact Mesurable 2030' : 'Measurable Impact 2030'}</span>
            </div>
          </div>
        </section>

        {/* NEXT CHAPTER BUTTON */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => onNavigate('universite_vision')}
            className="inphb-btn-primary text-xs flex items-center gap-2"
          >
            <span>{lang === 'fr' ? 'Continuer : Vision, Mission & Valeurs' : 'Next: Vision, Mission & Values'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </UniversityLayout>
  );
};
