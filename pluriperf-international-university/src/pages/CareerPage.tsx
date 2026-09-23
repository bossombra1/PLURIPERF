import React from 'react';
import { Language } from '../types';
import { CAREER_DATA } from '../data/universityData';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Briefcase, MapPin, Calendar, ArrowLeft } from 'lucide-react';

interface CareerPageProps {
  lang: Language;
}

export const CareerPage: React.FC<CareerPageProps> = ({ lang }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-text-primary">Carrières & Opportunités</h1>
          <p className="text-text-muted">Découvrez les opportunités de carrière et de stage au sein de PLURIPERF International University.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CAREER_DATA.map((offer) => (
            <div key={offer.id} className="p-5 bg-surface border border-border-subtle rounded-[calc(var(--radius)+4px)]">
              <div className="flex items-center gap-2 text-sm text-text-muted mb-3">
                <Briefcase className="h-4 w-4" />
                <span className="text-xs uppercase font-semibold text-primary">{offer.type}</span>
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">{lang === 'fr' ? offer.titleFr : offer.titleEn}</h3>
              <div className="space-y-2 text-sm text-text-secondary">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-text-muted" />
                  <span>{offer.company} · {offer.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-text-muted" />
                  <span>Date limite : {offer.deadline}</span>
                </div>
              </div>
              <p className="text-text-secondary mt-3">{lang === 'fr' ? offer.descriptionFr : offer.descriptionEn}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
