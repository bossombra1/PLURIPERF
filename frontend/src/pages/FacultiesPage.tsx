import React, { useState } from 'react';
import { Language, PageId } from '../types';
import { FACULTIES_DATA, PROGRAMS_DATA } from '../data/universityData';
import {
  Layers,
  GraduationCap,
  ArrowRight,
  BookOpen,
  Award,
  CheckCircle2,
  Building2,
  ChevronRight,
} from 'lucide-react';

interface FacultiesPageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  onApplyForProgram: (programTitle: string) => void;
}

export const FacultiesPage: React.FC<FacultiesPageProps> = ({
  lang,
  onNavigate,
  onApplyForProgram,
}) => {
  const [selectedFacultyId, setSelectedFacultyId] = useState<string>(
    FACULTIES_DATA[0].id,
  );

  const selectedFaculty =
    FACULTIES_DATA.find((f) => f.id === selectedFacultyId) || FACULTIES_DATA[0];

  const facultyPrograms = PROGRAMS_DATA.filter(
    (p) => p.facultyId === selectedFaculty.id,
  );

  return (
    <div className="bg-[#f8fafc] text-[#333333] min-h-screen">
      {/* 1. Academic Breadcrumbs & Header Banner */}
      <div className="bg-white border-b border-[#eaeaea]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
          <nav className="flex items-center gap-2 text-xs text-[#898888] mb-3">
            <button
              onClick={() => onNavigate('accueil')}
              className="hover:text-[#008629] transition-colors"
            >
              {lang === 'fr' ? 'Accueil' : 'Home'}
            </button>
            <span>/</span>
            <span className="text-[#898888]">{lang === 'fr' ? 'Organisation Académique' : 'Academic Structure'}</span>
            <span>/</span>
            <span className="text-[#008629] font-medium">
              {lang === 'fr' ? 'Nos 9 Facultés' : 'The 9 Faculties'}
            </span>
          </nav>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111827] tracking-tight inphb-heading-accent">
              {lang === 'fr' ? 'Facultés & Pôles d’Enseignement' : 'Faculties & Academic Schools'}
            </h1>
            <p className="text-sm sm:text-base text-[#666666] max-w-2xl pt-2">
              {lang === 'fr'
                ? '9 facultés d’enseignement supérieur et de recherche appliquée pour concevoir les solutions régénératives du XXIe siècle.'
                : '9 specialized faculties of higher education and applied research dedicated to crafting 21st-century regenerative solutions.'}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Main Two-Column Academic Structure */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: List of 9 faculties */}
          <div className="lg:col-span-5 bg-white border border-[#eaeaea] rounded-sm shadow-sm overflow-hidden">
            <div className="bg-[#f8fafc] border-b border-[#eaeaea] px-4 py-3 border-t-4 border-t-[#008629]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#111827] flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#008629]" />
                <span>{lang === 'fr' ? 'Les 9 Facultés Officielles' : 'Official Academic Faculties'}</span>
              </span>
            </div>

            <div className="divide-y divide-[#f1f5f9]">
              {FACULTIES_DATA.map((fac, idx) => {
                const isSelected = fac.id === selectedFacultyId;
                return (
                  <button
                    key={fac.id}
                    type="button"
                    onClick={() => setSelectedFacultyId(fac.id)}
                    className={`w-full text-left p-4 text-xs sm:text-sm transition-colors flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#f0f9f1] border-l-4 border-l-[#008629] text-[#008629]'
                        : 'text-[#444444] hover:bg-[#f8fafc] hover:text-[#008629]'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className={`font-mono text-xs font-bold pt-0.5 ${isSelected ? 'text-[#008629]' : 'text-[#888888]'}`}>
                        0{idx + 1}.
                      </span>
                      <div className="space-y-1">
                        <strong className="block text-[#111827] text-xs sm:text-sm font-semibold leading-snug">
                          {lang === 'fr' ? fac.nameFr : fac.nameEn}
                        </strong>
                        <span className="text-[11px] text-[#666666] block">
                          {fac.degreesCount} {lang === 'fr' ? 'cursus diplômants' : 'degree tracks'}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 mt-1 ${isSelected ? 'text-[#008629]' : 'text-[#cccccc]'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Selected Faculty Details */}
          <div className="lg:col-span-7 bg-white border border-[#eaeaea] p-6 sm:p-8 rounded-sm shadow-sm space-y-6">
            <div className="border-b border-[#eaeaea] pb-4 space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#008629] block">
                {lang === 'fr' ? 'PÔLE D’ENSEIGNEMENT SPÉCIALISÉ' : 'SPECIALIZED ACADEMIC FACULTY'}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#111827] leading-tight">
                {lang === 'fr' ? selectedFaculty.nameFr : selectedFaculty.nameEn}
              </h2>
              <div className="text-xs text-[#666666] flex items-center gap-1.5 pt-1">
                <span>{lang === 'fr' ? 'Direction Décanat :' : 'Faculty Dean:'}</span>
                <b className="text-[#111827]">{selectedFaculty.dean}</b>
              </div>
            </div>

            <div className="space-y-5 text-xs sm:text-sm text-[#444444]">
              {/* Mission */}
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#111827]">
                  {lang === 'fr' ? 'Mission & Vision Pédagogique' : 'Mission & Core Vision'}
                </h3>
                <p className="leading-relaxed text-[#555555]">
                  {lang === 'fr'
                    ? selectedFaculty.descriptionFr
                    : selectedFaculty.descriptionEn}
                </p>
              </div>

              {/* Themes */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#111827]">
                  {lang === 'fr' ? 'Thématiques d’Excellence' : 'Core Disciplines'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(lang === 'fr'
                    ? selectedFaculty.keyThemesFr
                    : selectedFaculty.keyThemesEn
                  ).map((theme, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xs bg-[#f8fafc] border border-[#eaeaea] text-xs text-[#333333] flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#008629] shrink-0" />
                      <span>{theme}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Programs */}
              <div className="pt-4 border-t border-[#eaeaea] space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#111827]">
                  {lang === 'fr'
                    ? 'Formations rattachées à cette faculté'
                    : 'Programs offered in this faculty'}
                </h3>

                {facultyPrograms.length === 0 ? (
                  <div className="p-4 bg-[#f8fafc] border border-[#eaeaea] rounded-xs text-xs text-[#666666]">
                    {lang === 'fr'
                      ? 'Cette faculté propose des cursus de formation continue et recherche sur-mesure. Consultez notre catalogue global.'
                      : 'This faculty offers continuing executive degrees and custom research modules. Consult the main catalog.'}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {facultyPrograms.map((prog) => (
                      <div
                        key={prog.id}
                        className="p-4 border border-[#eaeaea] bg-[#fafafa] hover:border-[#008629] transition-colors rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-[11px] text-[#666666]">
                            <span className="font-bold text-[#008629]">
                              {prog.level}
                            </span>
                            <span>•</span>
                            <span>{prog.modality}</span>
                            <span>•</span>
                            <span className="font-mono">{prog.ects} ECTS</span>
                          </div>
                          <h4 className="font-bold text-sm text-[#111827]">
                            {lang === 'fr' ? prog.titleFr : prog.titleEn}
                          </h4>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            onApplyForProgram(
                              lang === 'fr' ? prog.titleFr : prog.titleEn,
                            )
                          }
                          className="inphb-btn-primary text-xs py-1.5 px-3 shrink-0"
                        >
                          <span>{lang === 'fr' ? 'Candidater' : 'Apply'}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#eaeaea] flex justify-end">
                <button
                  type="button"
                  onClick={() => onNavigate('formations')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#008629] hover:underline"
                >
                  <span>{lang === 'fr' ? 'Consulter toutes les formations de l’université' : 'View all university programs'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
