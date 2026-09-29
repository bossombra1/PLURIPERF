import React, { useState, useMemo } from 'react';
import { Program, Faculty, Language } from '../types';
import { PROGRAMS_DATA, FACULTIES_DATA } from '../data/universityData';
import { Search, Filter, BookOpen, Clock, Award, ArrowRight, RotateCcw } from 'lucide-react';

interface ProgramSearchProps {
  lang: Language;
  onApplyForProgram: (programTitle: string) => void;
  onSelectFaculty?: (facultyId: string) => void;
  initialFacultyId?: string;
}

export const ProgramSearch: React.FC<ProgramSearchProps> = ({
  lang,
  onApplyForProgram,
  onSelectFaculty,
  initialFacultyId = 'all',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState<string>(initialFacultyId);
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedModality, setSelectedModality] = useState<string>('all');
  const [activeProgramModal, setActiveProgramModal] = useState<Program | null>(null);

  const levels = [
    { id: 'all', labelFr: 'Tous les niveaux', labelEn: 'All degree levels' },
    { id: 'Bachelor / Licence', labelFr: 'Bachelor / Licence', labelEn: 'Bachelor / Undergraduate' },
    { id: 'Master', labelFr: 'Master & MSc', labelEn: 'Master & MSc' },
    { id: 'Doctorat / PhD', labelFr: 'Doctorat / PhD', labelEn: 'Doctorate / PhD' },
    { id: 'Certificat Exécutif', labelFr: 'Certificat Exécutif', labelEn: 'Executive Certificate' },
  ];

  const modalities = [
    { id: 'all', labelFr: 'Toutes modalités', labelEn: 'All modalities' },
    { id: 'En ligne', labelFr: '100% En ligne', labelEn: '100% Online' },
    { id: 'Présentiel', labelFr: 'Campus Présentiel', labelEn: 'On-Campus' },
    { id: 'Hybride', labelFr: 'Format Hybride', labelEn: 'Hybrid Format' },
  ];

  const filteredPrograms = useMemo(() => {
    return PROGRAMS_DATA.filter((prog) => {
      const matchSearch =
        searchTerm === '' ||
        prog.titleFr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prog.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prog.descriptionFr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prog.descriptionEn.toLowerCase().includes(searchTerm.toLowerCase());

      const matchFaculty =
        selectedFaculty === 'all' || prog.facultyId === selectedFaculty;

      const matchLevel =
        selectedLevel === 'all' || prog.level === selectedLevel;

      const matchModality =
        selectedModality === 'all' || prog.modality === selectedModality;

      return matchSearch && matchFaculty && matchLevel && matchModality;
    });
  }, [searchTerm, selectedFaculty, selectedLevel, selectedModality]);

  const handleReset = () => {
    setSearchTerm('');
    setSelectedFaculty('all');
    setSelectedLevel('all');
    setSelectedModality('all');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 lg:p-8">
      {/* Header and search inputs */}
      <div className="border-b border-slate-100 pb-6 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-5">
          <div>
            <h3 className="text-xl sm:text-2xl font-serif text-slate-900 font-semibold">
              {lang === 'fr'
                ? 'Moteur de Recherche des Formations'
                : 'Degree & Program Finder'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {lang === 'fr'
                ? 'Explorez nos cursus d’excellence accrédités ECTS du Bachelor au Doctorat'
                : 'Explore our accredited ECTS degree tracks from Bachelor to PhD'}
            </p>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            <span className="font-mono text-[#E85D1E] font-bold tabular-nums">
              {filteredPrograms.length}
            </span>{' '}
            {lang === 'fr' ? 'programmes disponibles' : 'available programs'}
          </div>
        </div>

        {/* Search controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Keyword Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={
                lang === 'fr'
                  ? 'Mot-clé (ex: climat, IA, ESG...)'
                  : 'Keyword (e.g. climate, AI, ESG...)'
              }
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Faculty select */}
          <div>
            <select
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 truncate"
            >
              <option value="all">
                {lang === 'fr' ? 'Toutes les facultés (9)' : 'All faculties (9)'}
              </option>
              {FACULTIES_DATA.map((f) => (
                <option key={f.id} value={f.id}>
                  {lang === 'fr' ? f.nameFr : f.nameEn}
                </option>
              ))}
            </select>
          </div>

          {/* Level select */}
          <div>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {levels.map((lvl) => (
                <option key={lvl.id} value={lvl.id}>
                  {lang === 'fr' ? lvl.labelFr : lvl.labelEn}
                </option>
              ))}
            </select>
          </div>

          {/* Modality select */}
          <div className="flex items-center gap-2">
            <select
              value={selectedModality}
              onChange={(e) => setSelectedModality(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {modalities.map((mod) => (
                <option key={mod.id} value={mod.id}>
                  {lang === 'fr' ? mod.labelFr : mod.labelEn}
                </option>
              ))}
            </select>

            {(searchTerm ||
              selectedFaculty !== 'all' ||
              selectedLevel !== 'all' ||
              selectedModality !== 'all') && (
              <button
                type="button"
                onClick={handleReset}
                title="Reset filters"
                className="p-2 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Program Results Grid */}
      {filteredPrograms.length === 0 ? (
        <div className="text-center py-12 px-4 border border-dashed border-slate-200 rounded-xl">
          <p className="text-slate-500 text-sm">
            {lang === 'fr'
              ? 'Aucune formation ne correspond à vos critères de recherche.'
              : 'No programs match your search filters.'}
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="mt-3 text-xs text-amber-600 font-semibold hover:underline"
          >
            {lang === 'fr' ? 'Réinitialiser les filtres' : 'Reset filters'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPrograms.map((prog) => {
            const faculty = FACULTIES_DATA.find((f) => f.id === prog.facultyId);
            return (
              <div
                key={prog.id}
                className="p-5 rounded-xl border border-slate-200 hover:border-amber-400/80 bg-white hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-amber-600">
                      {prog.level}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{lang === 'fr' ? prog.durationFr : prog.durationEn}</span>
                    <span aria-hidden="true">·</span>
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px]">
                      {prog.modality}
                    </span>
                  </div>

                  <h4 className="text-base font-semibold text-slate-900 group-hover:text-amber-600 transition-colors leading-snug">
                    {lang === 'fr' ? prog.titleFr : prog.titleEn}
                  </h4>

                  <p className="text-xs text-slate-500 line-clamp-2">
                    {lang === 'fr' ? prog.descriptionFr : prog.descriptionEn}
                  </p>

                  {faculty && (
                    <p className="text-[11px] text-slate-400 italic">
                      {lang === 'fr' ? faculty.nameFr : faculty.nameEn}
                    </p>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <span className="text-xs font-mono text-slate-600 font-medium">
                    {prog.ects} ECTS
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveProgramModal(prog)}
                      className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                    >
                      {lang === 'fr' ? 'Détails syllabus' : 'Syllabus details'}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        onApplyForProgram(lang === 'fr' ? prog.titleFr : prog.titleEn)
                      }
                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0E192D] hover:bg-[#E85D1E] rounded-md transition-colors flex items-center gap-1 shadow-xs"
                    >
                      <span>{lang === 'fr' ? 'Candidater' : 'Apply'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Program details modal */}
      {activeProgramModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-600">
                  {activeProgramModal.level} · {activeProgramModal.ects} ECTS
                </span>
                <h3 className="text-xl font-serif text-slate-900 font-bold mt-1">
                  {lang === 'fr'
                    ? activeProgramModal.titleFr
                    : activeProgramModal.titleEn}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveProgramModal(null)}
                className="text-slate-400 hover:text-slate-700 p-1 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4 text-sm text-slate-700">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  {lang === 'fr' ? 'Présentation' : 'Overview'}
                </h4>
                <p className="leading-relaxed">
                  {lang === 'fr'
                    ? activeProgramModal.descriptionFr
                    : activeProgramModal.descriptionEn}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 py-2 bg-slate-50 p-3 rounded-lg text-xs">
                <div>
                  <span className="text-slate-400 block">{lang === 'fr' ? 'Durée' : 'Duration'}</span>
                  <span className="font-semibold text-slate-800">
                    {lang === 'fr'
                      ? activeProgramModal.durationFr
                      : activeProgramModal.durationEn}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">{lang === 'fr' ? 'Format' : 'Format'}</span>
                  <span className="font-semibold text-slate-800">
                    {activeProgramModal.modality}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  {lang === 'fr' ? 'Débouchés professionnels' : 'Career Outcomes'}
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
                  {(lang === 'fr'
                    ? activeProgramModal.careerOutcomesFr
                    : activeProgramModal.careerOutcomesEn
                  ).map((outcome, idx) => (
                    <li key={idx}>{outcome}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveProgramModal(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                {lang === 'fr' ? 'Fermer' : 'Close'}
              </button>
              <button
                type="button"
                onClick={() => {
                  const title =
                    lang === 'fr'
                      ? activeProgramModal.titleFr
                      : activeProgramModal.titleEn;
                  setActiveProgramModal(null);
                  onApplyForProgram(title);
                }}
                className="px-5 py-2 text-xs font-medium text-white bg-amber-600 hover:bg-amber-500 rounded-lg shadow"
              >
                {lang === 'fr' ? 'Postuler à ce cursus' : 'Apply to this track'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
