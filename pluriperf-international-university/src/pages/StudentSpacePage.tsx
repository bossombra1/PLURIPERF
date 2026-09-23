import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/Logo';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription } from '../components/ui/alert';
import { LayoutDashboard, LogOut } from 'lucide-react';

export const StudentSpacePage: React.FC<{ lang?: 'fr' | 'en' }> = ({ lang = 'fr' }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>Authentification requise. Veuillez vous connecter.</AlertDescription>
        </Alert>
      </div>
    );
  }

  const menuItems = [
    { to: '/espace-etudiant/cours', label: 'Mes cours', icon: '📚' },
    { to: '/espace-etudiant/devoirs', label: 'Devoirs', icon: '📝' },
    { to: '/espace-etudiant/notes', label: 'Notes', icon: '📊' },
    { to: '/espace-etudiant/diplomes', label: 'Diplômes', icon: '🎓' },
    { to: '/espace-etudiant/messages', label: 'Messages', icon: '✉️' },
    { to: '/espace-etudiant/forum', label: 'Forum', icon: '💬' },
  ];

  return (
    <div className="min-h-[70vh] py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Logo variant="full-horizontal" size="md" />
            <h1 className="text-3xl font-bold text-text-primary">Espace Étudiant</h1>
            <p className="text-text-muted">Bienvenue, {user.fullName}</p>
          </div>
          <Button variant="outline" onClick={() => { logout(); navigate('/'); }}>
            <LogOut className="h-4 w-4" />
            Déconnexion
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="block p-6 bg-surface border border-border-subtle rounded-[calc(var(--radius)+4px)] hover:border-primary transition-colors"
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="font-semibold text-text-primary">{item.label}</div>
            </Link>
          ))}
        </div>

        <div className="p-6 bg-surface border border-border-subtle rounded-[calc(var(--radius)+4px)]">
          <div className="flex items-center gap-2 mb-4">
            <LayoutDashboard className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold text-text-primary">Tableau de bord</h2>
          </div>
          <p className="text-text-muted">Consultez vos cours, devoirs et notes depuis les sections ci-dessus.</p>
        </div>
      </div>
    </div>
  );
};