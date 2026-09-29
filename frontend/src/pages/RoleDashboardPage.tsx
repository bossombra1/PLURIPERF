import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, BookOpen, CalendarDays, FileText, Library, MessageSquare,
  Newspaper, Users, GraduationCap, LayoutDashboard
} from 'lucide-react';
import { Role } from '../context/AuthContext';

const data: Record<'advisor' | 'editor', {
  title: string;
  description: string;
  cards: { label: string; description: string; to: string; icon: React.ComponentType<{ className?: string }> }[];
}> = {
  advisor: {
    title: 'Tableau de bord conseiller',
    description: 'Suivez les candidatures, les étudiants accompagnés et vos rendez-vous.',
    cards: [
      { label: 'Candidatures', description: 'Consulter et suivre les dossiers candidats.', to: '/espace-conseiller/candidatures', icon: FileText },
      { label: 'Étudiants', description: 'Accéder aux étudiants accompagnés.', to: '/espace-conseiller/etudiants', icon: Users },
      { label: 'Rendez-vous', description: 'Organiser vos entretiens et rendez-vous.', to: '/espace-conseiller/rendez-vous', icon: CalendarDays },
      { label: 'Messages', description: 'Gérer les échanges avec les étudiants.', to: '/espace-conseiller/messages', icon: MessageSquare },
    ],
  },
  editor: {
    title: 'Tableau de bord éditorial',
    description: 'Pilotez les contenus publics et les ressources éditoriales de PLURIPERF International.',
    cards: [
      { label: 'Actualités', description: 'Créer et gérer les actualités.', to: '/espace-editeur/actualites', icon: Newspaper },
      { label: 'Bibliothèque', description: 'Administrer les ressources documentaires.', to: '/espace-editeur/bibliotheque', icon: Library },
      { label: 'Publications', description: 'Préparer et organiser les publications.', to: '/espace-editeur/publications', icon: BookOpen },
      { label: 'Messages', description: 'Suivre les demandes liées aux contenus.', to: '/espace-editeur/messages', icon: MessageSquare },
    ],
  },
};

interface Props {
  role: Extract<Role, 'advisor' | 'editor'>;
  lang?: 'fr' | 'en';
  section?: string;
}

export const RoleDashboardPage: React.FC<Props> = ({ role, section }) => {
  const content = data[role];

  if (section) {
    const item = content.cards.find((card) => card.to.endsWith('/' + section));
    if (item) {
      const Icon = item.icon;
      return (
        <section className="space-y-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{content.title}</p>
            <h1 className="mt-2 text-2xl font-extrabold text-text-primary sm:text-3xl">{item.label}</h1>
            <p className="mt-2 text-sm text-text-muted">{item.description}</p>
          </div>
          <div className="rounded-2xl border border-border-subtle bg-white p-6 sm:p-8">
            <Icon className="h-8 w-8 text-primary" />
            <h2 className="mt-4 text-lg font-bold text-text-primary">{item.label}</h2>
            <p className="mt-2 text-sm text-text-muted">
              Cette vue est prête pour accueillir les données et actions métier de ce module.
            </p>
          </div>
        </section>
      );
    }
  }

  return (
    <section className="space-y-6">
      <div className="rounded-2xl bg-[#17322d] p-6 text-white sm:p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/70">PLURIPERF International</p>
            <h1 className="mt-1 text-2xl font-extrabold sm:text-3xl">{content.title}</h1>
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-white/75">{content.description}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {content.cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.to}
              to={card.to}
              className="group rounded-2xl border border-border-subtle bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-4 font-bold text-text-primary">{card.label}</h2>
              <p className="mt-2 min-h-10 text-xs leading-5 text-text-muted">{card.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-primary">
                Ouvrir <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
              </span>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-border-subtle bg-white p-5">
          <Users className="h-5 w-5 text-primary" />
          <p className="mt-4 text-2xl font-extrabold text-text-primary">—</p>
          <p className="text-xs text-text-muted">Éléments à traiter</p>
        </div>
        <div className="rounded-2xl border border-border-subtle bg-white p-5">
          <CalendarDays className="h-5 w-5 text-primary" />
          <p className="mt-4 text-2xl font-extrabold text-text-primary">—</p>
          <p className="text-xs text-text-muted">Échéances à venir</p>
        </div>
        <div className="rounded-2xl border border-border-subtle bg-white p-5">
          <GraduationCap className="h-5 w-5 text-primary" />
          <p className="mt-4 text-2xl font-extrabold text-text-primary">—</p>
          <p className="text-xs text-text-muted">Indicateurs métier</p>
        </div>
      </div>
    </section>
  );
};
