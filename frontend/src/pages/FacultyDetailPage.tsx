import React from 'react';
import { Language } from '../types';
import { FACULTIES_DATA, PROGRAMS_DATA } from '../data/universityData';
import { useNavigate, useParams } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription } from '../components/ui/alert';
import { BookOpen, GraduationCap, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface FacultyDetailPageProps {
  lang: Language;
  facultyId: string;
  onApplyForProgram: (programTitle: string) => void;
  onNavigate: (page: any) => void;
}

export const FacultyDetailPage: React.FC<FacultyDetailPageProps> = ({ lang, facultyId, onApplyForProgram, onNavigate }) => {
  const faculty = FACULTIES_DATA.find((f) => f.id === facultyId);
  const facultyPrograms = PROGRAMS_DATA.filter((p) => p.facultyId === facultyId);

  if (!faculty) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>Faculté introuvable.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <button
            type="button"
            onClick={() => onNavigate('facultes')}
            className="text-sm text-primary hover:text-primary-hover flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux facultés
          </button>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-text-primary">{lang === 'fr' ? faculty.nameFr : faculty.nameEn}</h1>
            <p className="text-text-muted">{faculty.dean}</p>
          </div>
        </div>

        <div className="p-6 bg-surface border border-border-subtle rounded-[calc(var(--radius)+4px)]">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Description</h2>
          <p className="text-text-secondary leading-relaxed">{lang === 'fr' ? faculty.descriptionFr : faculty.descriptionEn}</p>
        </div>

        <div className="p-6 bg-surface border border-border-subtle rounded-[calc(var(--radius)+4px)]">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Thèmes clés</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {(lang === 'fr' ? faculty.keyThemesFr : faculty.keyThemesEn).map((theme, idx) => (
              <li key={idx} className="flex items-center gap-2 text-text-secondary">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span>{theme}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 bg-surface border border-border-subtle rounded-[calc(var(--radius)+4px)]">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Formations rattachées</h2>
          {facultyPrograms.length === 0 ? (
            <p className="text-text-muted">Aucune formation pour le moment.</p>
          ) : (
            <div className="space-y-3">
              {facultyPrograms.map((prog) => (
                <div key={prog.id} className="p-4 border border-border-subtle rounded-[var(--radius)] flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-text-primary">{lang === 'fr' ? prog.titleFr : prog.titleEn}</div>
                    <div className="text-sm text-text-muted">{prog.level} · {prog.modality} · {prog.ects} ECTS</div>
                  </div>
                  <Button size="sm" onClick={() => onApplyForProgram(lang === 'fr' ? prog.titleFr : prog.titleEn)}>
                    Candidater
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
