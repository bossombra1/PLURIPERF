import React from 'react';
import { Language } from '../types';
import { PROGRAMS_DATA, FACULTIES_DATA } from '../data/universityData';
import { useNavigate, useParams } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription } from '../components/ui/alert';
import { BookOpen, GraduationCap, ArrowLeft, CheckCircle2, Clock, Award } from 'lucide-react';

interface FormationDetailPageProps {
  lang: Language;
  programId: string;
  onApplyForProgram: (programTitle: string) => void;
  onNavigate: (page: any) => void;
}

export const FormationDetailPage: React.FC<FormationDetailPageProps> = ({ lang, programId, onApplyForProgram, onNavigate }) => {
  const program = PROGRAMS_DATA.find((p) => p.id === programId);
  const faculty = program ? FACULTIES_DATA.find((f) => f.id === program.facultyId) : undefined;

  if (!program) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>Formation introuvable.</AlertDescription>
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
            onClick={() => onNavigate('formations')}
            className="text-sm text-primary hover:text-primary-hover flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux formations
          </button>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <Award className="h-4 w-4" />
              <span>{program.level}</span>
              <span>·</span>
              <Clock className="h-4 w-4" />
              <span>{lang === 'fr' ? program.durationFr : program.durationEn}</span>
              <span>·</span>
              <span>{program.ects} ECTS</span>
            </div>
            <h1 className="text-3xl font-bold text-text-primary">{lang === 'fr' ? program.titleFr : program.titleEn}</h1>
            {faculty && (
              <p className="text-text-muted">{lang === 'fr' ? faculty.nameFr : faculty.nameEn}</p>
            )}
          </div>
        </div>

        <div className="p-6 bg-surface border border-border-subtle rounded-[calc(var(--radius)+4px)]">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Description</h2>
          <p className="text-text-secondary leading-relaxed">{lang === 'fr' ? program.descriptionFr : program.descriptionEn}</p>
        </div>

        <div className="p-6 bg-surface border border-border-subtle rounded-[calc(var(--radius)+4px)]">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Débouchés professionnels</h2>
          <ul className="space-y-2">
            {(lang === 'fr' ? program.careerOutcomesFr : program.careerOutcomesEn).map((outcome, idx) => (
              <li key={idx} className="flex items-center gap-2 text-text-secondary">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between p-6 bg-surface border border-border-subtle rounded-[calc(var(--radius)+4px)]">
          <div className="space-y-1">
            <div className="font-semibold text-text-primary">Modalité</div>
            <div className="text-text-muted">{program.modality}</div>
          </div>
          <Button onClick={() => onApplyForProgram(lang === 'fr' ? program.titleFr : program.titleEn)}>
            <GraduationCap className="h-4 w-4" />
            Candidater à cette formation
          </Button>
        </div>
      </div>
    </div>
  );
};
