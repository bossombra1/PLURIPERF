import React from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';
import { Loader2, BookOpen, ClipboardList, GraduationCap, Award, MessageSquare, BarChart3 } from 'lucide-react';

export const StudentSpacePage: React.FC<{ lang?: 'fr' | 'en' }> = () => {
  const { user } = useAuth();
  const [dashboard, setDashboard] = React.useState<any>(null);
  const [loadingDashboard, setLoadingDashboard] = React.useState(true);

  React.useEffect(() => {
    if (!user) return;
    api.get<any>('/student/dashboard')
      .then(setDashboard)
      .finally(() => setLoadingDashboard(false));
  }, [user]);

  const cards = [
    { label: 'Mes cours', value: dashboard?.stats?.enrolled ?? 0, icon: BookOpen },
    { label: 'Devoirs à rendre', value: dashboard?.stats?.pendingAssignments ?? 0, icon: ClipboardList },
    { label: 'Moyenne générale', value: dashboard?.stats?.averageGrade != null ? `${dashboard.stats.averageGrade}/20` : '—', icon: BarChart3 },
    { label: 'Diplômes', value: dashboard?.diplomas?.length ?? 0, icon: Award },
  ];

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Espace étudiant</p>
        <h1 className="mt-2 text-2xl font-extrabold text-text-primary sm:text-3xl">Bonjour, {user?.fullName}</h1>
        <p className="mt-2 text-sm text-text-muted">Retrouvez ici votre activité académique et vos indicateurs.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-border-subtle bg-white p-5 shadow-sm">
            <Icon className="h-5 w-5 text-primary" />
            <p className="mt-4 text-2xl font-extrabold text-text-primary">
              {loadingDashboard ? <Loader2 className="h-5 w-5 animate-spin" /> : value}
            </p>
            <p className="mt-1 text-xs text-text-muted">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border-subtle bg-white p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold text-text-primary">
            <GraduationCap className="h-5 w-5 text-primary" /> Ma progression
          </h2>
          <p className="mt-3 text-sm leading-6 text-text-muted">
            Consultez vos cours, évaluations, notes et diplômes depuis la navigation latérale.
          </p>
        </div>
        <div className="rounded-2xl border border-border-subtle bg-white p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold text-text-primary">
            <MessageSquare className="h-5 w-5 text-primary" /> Communication
          </h2>
          <p className="mt-3 text-sm leading-6 text-text-muted">
            Vos messages et discussions pédagogiques sont accessibles directement depuis la sidebar.
          </p>
        </div>
      </div>
    </section>
  );
};
