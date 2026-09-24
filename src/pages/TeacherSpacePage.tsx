import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/Logo';
import { Button } from '../components/ui/button';
import { api } from '../api/client';
import { Alert, AlertDescription } from '../components/ui/alert';
import { LayoutDashboard, LogOut, BookOpen, ClipboardList, GraduationCap } from 'lucide-react';

export const TeacherSpacePage: React.FC<{ lang?: 'fr' | 'en' }> = ({ lang = 'fr' }) => {
  const { user, logout } = useAuth();
  const [error, setError] = useState('');
  const [dashboard, setDashboard] = useState<any>(null);
  React.useEffect(() => { if (user) api.get<any>('/teacher/dashboard').then(setDashboard).catch(e => setError(e.message || 'Erreur')).finally(() => {}); }, [user]);

  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>Authentification requise.</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (user.role !== 'teacher') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>Accès réservé aux enseignants.</AlertDescription>
        </Alert>
      </div>
    );
  }

  const menuItems = [
    { to: '/espace-enseignant/cours', label: 'Mes cours', icon: BookOpen },
    { to: '/espace-enseignant/devoirs', label: 'Devoirs', icon: ClipboardList },
    { to: '/espace-enseignant/notes', label: 'Notes', icon: GraduationCap },
  ];

  return (
    <div className="min-h-[70vh] py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Logo variant="full-horizontal" size="md" />
            <h1 className="text-3xl font-bold text-text-primary">Espace Enseignant</h1>
            <p className="text-text-muted">Bienvenue, {dashboard?.teacher?.fullName || user.fullName}</p>
          </div>
          <Button variant="outline" onClick={() => { logout(); window.location.href = '/'; }}>
            <LogOut className="h-4 w-4" />
            Déconnexion
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="block p-6 bg-surface border border-border-subtle rounded-[calc(var(--radius)+4px)] hover:border-primary transition-colors"
            >
              <item.icon className="h-8 w-8 text-primary mb-3" />
              <div className="font-semibold text-text-primary">{item.label}</div>
            </Link>
          ))}
        </div>

        <div className="p-6 bg-surface border border-border-subtle rounded-[calc(var(--radius)+4px)]">
          <div className="flex items-center gap-2 mb-4">
            <LayoutDashboard className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold text-text-primary">Tableau de bord</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm"><div><span className="text-text-muted block">Cours</span><b>{dashboard?.courses?.length ?? 0}</b></div><div><span className="text-text-muted block">Dépôts à corriger</span><b>{dashboard?.pendingSubmissions?.length ?? 0}</b></div></div>
        </div>
      </div>
    </div>
  );
};
