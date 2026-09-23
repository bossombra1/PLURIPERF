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
  Sparkles,
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
    <div className="space-y-12 pb-16">
      {/* Editorial Header */}
      <section className="border-b border-slate-200 pb-8 pt-4">
        <div className="max-w-3xl space-y-3">
          <div className="text-xs uppercase tracking-widest font-semibold text-amber-600">
            {lang === 'fr' ? 'Architecture Académique' : 'Academic Structure'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-slate-900 font-bold">
            {lang === 'fr' ? 'Facultés & Programmes' : 'Faculties & Programs'}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {lang === 'fr'
              ? '9 pôles d’enseignement supérieur et de recherche appliquée pour concevoir les solutions régénératives du XXIe siècle.'
              : '9 faculties of higher learning and applied research dedicated to crafting regenerative solutions for the 21st century.'}
          </p>
        </div>
      </section>

      {/* Grid of the 9 Faculties from Slide 7 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: List of 9 faculties */}
        <div className="lg:col-span-5 space-y-2">
          <div className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
            {lang === 'fr' ? 'Les 9 Facultés Officielles' : 'The 9 Official Faculties'}
          </div>

          <div className="space-y-2">
            {FACULTIES_DATA.map((fac, idx) => {
              const isSelected = fac.id === selectedFacultyId;
              return (
                <button
                  key={fac.id}
                  type="button"
                  onClick={() => setSelectedFacultyId(fac.id)}
                  className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-1 ring-amber-500'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <span
                    className={`font-mono text-xs font-bold pt-0.5 ${
                      isSelected ? 'text-amber-400' : 'text-slate-400'
                    }`}
                  >
                    0{idx + 1}.
                  </span>
                  <div className="space-y-1">
                    <span className="font-semibold block leading-snug">
                      {lang === 'fr' ? fac.nameFr : fac.nameEn}
                    </span>
                    <span
                      className={`text-[11px] block ${
                        isSelected ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      {fac.degreesCount}{' '}
                      {lang === 'fr' ? 'cursus diplômants' : 'degree tracks'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right column: Selected Faculty deep dive */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-5 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600">
              {lang === 'fr' ? 'Pôle d’Enseignement Spécialisé' : 'Specialized Academic Faculty'}
            </span>
            <h2 className="text-2xl font-serif text-slate-900 font-bold leading-tight">
              {lang === 'fr' ? selectedFaculty.nameFr : selectedFaculty.nameEn}
            </h2>
            <p className="text-xs text-slate-500 italic">
              {lang === 'fr' ? 'Direction Décanat :' : 'Dean:'}{' '}
              <span className="text-slate-800 font-medium">{selectedFaculty.dean}</span>
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                {lang === 'fr' ? 'Mission & Vision du Pôle' : 'Mission & Core Vision'}
              </h4>
              <p className="text-slate-700 leading-relaxed">
                {lang === 'fr'
                  ? selectedFaculty.descriptionFr
                  : selectedFaculty.descriptionEn}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                {lang === 'fr' ? 'Thématiques d’Excellence' : 'Core Disciplines'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(lang === 'fr'
                  ? selectedFaculty.keyThemesFr
                  : selectedFaculty.keyThemesEn
                ).map((theme, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700 flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{theme}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Programs within this faculty */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {lang === 'fr'
                  ? 'Formations rattachées à cette faculté'
                  : 'Programs offered in this faculty'}
              </h4>

              {facultyPrograms.length === 0 ? (
                <div className="p-4 bg-slate-50 rounded-xl text-xs text-slate-500">
                  {lang === 'fr'
                    ? 'Cette faculté propose des cursus de formation continue et recherche sur-mesure. Consultez notre catalogue global.'
                    : 'This faculty offers continuing executive degrees and custom research modules. Consult the main catalog.'}
                </div>
              ) : (
                <div className="space-y-3">
                  {facultyPrograms.map((prog) => (
                    <div
                      key={prog.id}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[11px] text-slate-500">
                          <span className="font-semibold text-amber-600">
                            {prog.level}
                          </span>
                          <span>·</span>
                          <span>{prog.modality}</span>
                          <span>·</span>
                          <span>{prog.ects} ECTS</span>
                        </div>
                        <h5 className="font-semibold text-slate-900 text-sm">
                          {lang === 'fr' ? prog.titleFr : prog.titleEn}
                        </h5>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          onApplyForProgram(
                            lang === 'fr' ? prog.titleFr : prog.titleEn,
                          )
                        }
                        className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-md text-xs font-medium transition-colors shrink-0 shadow-sm"
                      >
                        {lang === 'fr' ? 'Candidater' : 'Apply'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => onNavigate('formations')}
                className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1"
              >
                <span>{lang === 'fr' ? 'Voir toutes les formations' : 'View all university programs'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
