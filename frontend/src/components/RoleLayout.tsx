import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  BarChart3, BookOpen, CalendarDays, ChevronLeft, ChevronRight, FileText,
  GraduationCap, Home, LayoutDashboard, Library, LogOut, Menu, MessageSquare,
  Newspaper, Settings, Shield, Users, X
} from 'lucide-react';
import { useAuth, Role } from '../context/AuthContext';

interface RoleLayoutProps {
  children: React.ReactNode;
  lang?: 'fr' | 'en';
}

interface NavItem {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
}

const roleMeta: Record<Role, { title: string; subtitle: string }> = {
  super_admin: { title: 'Administration générale', subtitle: 'Super administrateur' },
  admin: { title: 'Administration', subtitle: 'Administrateur' },
  advisor: { title: 'Espace conseiller', subtitle: 'Conseiller pédagogique' },
  teacher: { title: 'Espace enseignant', subtitle: 'Enseignant' },
  student: { title: 'Espace étudiant', subtitle: 'Étudiant' },
  editor: { title: 'Espace éditorial', subtitle: 'Éditeur' },
};

const menus: Record<Role, NavItem[]> = {
  super_admin: [
    { label: 'Tableau de bord', to: '/admin', icon: LayoutDashboard },
    { label: 'Utilisateurs', to: '/admin/utilisateurs', icon: Users },
    { label: 'Formations', to: '/admin/formations', icon: GraduationCap },
    { label: 'Facultés', to: '/admin/facultes', icon: BookOpen },
    { label: 'Candidatures', to: '/admin/candidatures', icon: FileText },
    { label: 'Rendez-vous', to: '/admin/rendez-vous', icon: CalendarDays },
    { label: 'Actualités', to: '/admin/actualites', icon: Newspaper },
    { label: 'Bibliothèque', to: '/admin/bibliotheque', icon: Library },
    { label: 'Recherche', to: '/admin/recherches', icon: BarChart3 },
    { label: 'Messages', to: '/admin/contacts', icon: MessageSquare },
    { label: 'Paramètres', to: '/admin/parametres', icon: Settings },
  ],
  admin: [
    { label: 'Tableau de bord', to: '/admin', icon: LayoutDashboard },
    { label: 'Utilisateurs', to: '/admin/utilisateurs', icon: Users },
    { label: 'Formations', to: '/admin/formations', icon: GraduationCap },
    { label: 'Facultés', to: '/admin/facultes', icon: BookOpen },
    { label: 'Candidatures', to: '/admin/candidatures', icon: FileText },
    { label: 'Rendez-vous', to: '/admin/rendez-vous', icon: CalendarDays },
    { label: 'Actualités', to: '/admin/actualites', icon: Newspaper },
    { label: 'Bibliothèque', to: '/admin/bibliotheque', icon: Library },
    { label: 'Messages', to: '/admin/contacts', icon: MessageSquare },
    { label: 'Paramètres', to: '/admin/parametres', icon: Settings },
  ],
  advisor: [
    { label: 'Tableau de bord', to: '/espace-conseiller', icon: LayoutDashboard },
    { label: 'Candidatures', to: '/espace-conseiller/candidatures', icon: FileText },
    { label: 'Étudiants', to: '/espace-conseiller/etudiants', icon: Users },
    { label: 'Rendez-vous', to: '/espace-conseiller/rendez-vous', icon: CalendarDays },
    { label: 'Messages', to: '/espace-conseiller/messages', icon: MessageSquare },
  ],
  teacher: [
    { label: 'Tableau de bord', to: '/espace-enseignant', icon: LayoutDashboard },
    { label: 'Mes cours', to: '/espace-enseignant/cours', icon: BookOpen },
    { label: 'Devoirs', to: '/espace-enseignant/devoirs', icon: FileText },
    { label: 'Notes', to: '/espace-enseignant/notes', icon: GraduationCap },
    { label: 'Messages', to: '/espace-enseignant/messages', icon: MessageSquare },
  ],
  student: [
    { label: 'Tableau de bord', to: '/espace-etudiant', icon: LayoutDashboard },
    { label: 'Mes cours', to: '/espace-etudiant/cours', icon: BookOpen },
    { label: 'Devoirs', to: '/espace-etudiant/devoirs', icon: FileText },
    { label: 'Notes', to: '/espace-etudiant/notes', icon: GraduationCap },
    { label: 'Diplômes', to: '/espace-etudiant/diplomes', icon: GraduationCap },
    { label: 'Messages', to: '/espace-etudiant/messages', icon: MessageSquare },
    { label: 'Forum', to: '/espace-etudiant/forum', icon: MessageSquare },
  ],
  editor: [
    { label: 'Tableau de bord', to: '/espace-editeur', icon: LayoutDashboard },
    { label: 'Actualités', to: '/espace-editeur/actualites', icon: Newspaper },
    { label: 'Bibliothèque', to: '/espace-editeur/bibliotheque', icon: Library },
    { label: 'Publications', to: '/espace-editeur/publications', icon: FileText },
    { label: 'Messages', to: '/espace-editeur/messages', icon: MessageSquare },
  ],
};

export const getRoleHome = (role: Role) => {
  if (role === 'student') return '/espace-etudiant';
  if (role === 'teacher') return '/espace-enseignant';
  if (role === 'advisor') return '/espace-conseiller';
  if (role === 'editor') return '/espace-editeur';
  return '/admin';
};

export const isPrivatePath = (pathname: string) =>
  ['/admin', '/espace-etudiant', '/espace-enseignant', '/espace-conseiller', '/espace-editeur'].some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + '/'),
  );

export const RoleLayout: React.FC<RoleLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  if (!user) return <>{children}</>;

  const items = menus[user.role] ?? [];
  const meta = roleMeta[user.role];

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex h-dvh min-h-0 overflow-hidden bg-[#f5f7f4]">
      {open && (
        <button
          aria-label="Fermer le menu"
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={[
          'fixed inset-y-0 left-0 z-50 flex h-dvh w-72 min-h-0 flex-col border-r border-border-ui bg-white transition-transform duration-200 lg:static lg:z-auto lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
          collapsed ? 'lg:w-[76px]' : 'lg:w-72',
        ].join(' ')}
      >
        <div className="flex h-20 items-center justify-between border-b border-border-subtle px-4">
          <Link to={getRoleHome(user.role)} className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Shield className="h-5 w-5" />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="truncate text-sm font-extrabold text-text-primary">PLURIPERF</p>
                <p className="truncate text-[11px] text-text-muted">{meta.title}</p>
              </div>
            )}
          </Link>
          <button className="rounded-lg p-2 hover:bg-surface-muted lg:hidden" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto overscroll-contain p-3 [scrollbar-gutter:stable]">
          {items.map((item) => {
            const active = location.pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                title={collapsed ? item.label : undefined}
                className={[
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors',
                  active ? 'bg-primary text-primary-foreground shadow-sm' : 'text-text-secondary hover:bg-surface-muted hover:text-primary',
                  collapsed ? 'lg:justify-center' : '',
                ].join(' ')}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border-subtle p-3">
          <Link to="/" onClick={() => setOpen(false)} title={collapsed ? 'Retour au site public' : undefined} className={['flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-primary hover:bg-primary/10', collapsed ? 'lg:justify-center' : ''].join(' ')}>
            <Home className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Retour au site public</span>}
          </Link>
          <div className={collapsed ? 'flex justify-center' : 'flex items-center gap-3 rounded-xl bg-surface-muted p-3'}>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
              {user.fullName.charAt(0).toUpperCase()}
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-text-primary">{user.fullName}</p>
                <p className="truncate text-[10px] uppercase tracking-wide text-text-muted">{meta.subtitle}</p>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className={[
              'mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-text-secondary hover:bg-red-50 hover:text-red-600',
              collapsed ? 'lg:justify-center' : '',
            ].join(' ')}
            title={collapsed ? 'Déconnexion' : undefined}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Déconnexion</span>}
          </button>
        </div>
      </aside>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border-ui bg-white/95 px-4 backdrop-blur sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button className="rounded-lg p-2 hover:bg-surface-muted lg:hidden" onClick={() => setOpen(true)}>
              <Menu className="h-5 w-5" />
            </button>
            <button className="hidden rounded-lg p-2 hover:bg-surface-muted lg:block" onClick={() => setCollapsed((v) => !v)}>
              {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </button>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-text-primary">{meta.title}</p>
              <p className="truncate text-xs text-text-muted">Bienvenue, {user.fullName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold text-primary hover:bg-primary/15"><Home className="h-3.5 w-3.5" />Site public</Link>
            <span className="hidden rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-primary sm:inline-flex">
              {meta.subtitle}
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {user.fullName.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>
        <main className="min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 lg:p-8 [scrollbar-gutter:stable]">
          {children}
        </main>
      </div>
    </div>
  );
};
