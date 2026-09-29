import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../../components/Logo';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { api, ApiError } from '../../api/client';
import { Users, Loader2, ArrowLeft, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UserRow {
  id: number;
  email: string;
  full_name: string;
  role: string;
  student_ref: string | null;
  is_active: number;
}

export const AdminUsersPage: React.FC<{ lang?: 'fr' | 'en' }> = ({ lang = 'fr' }) => {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ fullName: '', email: '', password: '', role: 'student' });

  useEffect(() => {
    if (!user || !['admin', 'super_admin'].includes(user.role)) return;
    (async () => {
      try {
        const data = await api.get<UserRow[]>('/admin/users');
        setUsers(data);
      } catch (e) {
        setError(e instanceof ApiError ? e.message : 'Erreur de chargement');
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  if (!user || !['admin', 'super_admin'].includes(user.role)) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>Accès réservé aux administrateurs.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-2">
            <Link to="/admin" className="text-sm text-primary hover:text-primary-hover flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Retour à l'administration
            </Link>
            <h1 className="text-3xl font-bold text-text-primary">Utilisateurs</h1>
            <p className="text-sm text-text-muted">Les comptes sont créés exclusivement depuis cet espace par un administrateur autorisé.</p>
          </div>
          <div className="flex items-center gap-3">
            {['admin', 'super_admin'].includes(user?.role ?? '') && (
              <Button onClick={() => setShowCreate((v) => !v)}>
                <UserPlus className="h-4 w-4" />
                {showCreate ? 'Fermer' : 'Créer un compte'}
              </Button>
            )}
            <Logo variant="emblem-only" size="sm" />
          </div>
        </div>

        {showCreate && ['admin', 'super_admin'].includes(user?.role ?? '') && (
          <form
            className="bg-surface border border-border-subtle rounded-[calc(var(--radius)+4px)] p-5 space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              setError('');
              setCreating(true);
              try {
                await api.post('/admin/users', form);
                setForm({ fullName: '', email: '', password: '', role: 'student' });
                setShowCreate(false);
                const data = await api.get<UserRow[]>('/admin/users');
                setUsers(data);
              } catch (e) {
                setError(e instanceof ApiError ? e.message : 'Erreur de création du compte');
              } finally {
                setCreating(false);
              }
            }}
          >
            <div>
              <h2 className="text-lg font-semibold text-text-primary">Créer un compte</h2>
              <p className="text-sm text-text-muted">L’administrateur définit le rôle et le mot de passe initial. Le rôle super administrateur reste réservé au super administrateur.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input required minLength={2} placeholder="Nom complet" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
              <Input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <Input required minLength={8} type="password" placeholder="Mot de passe initial (8 caractères min.)" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              <select className="h-10 rounded-md border border-border-subtle bg-background px-3 text-sm" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                <option value="student">Étudiant</option>
                <option value="teacher">Enseignant</option>
                <option value="advisor">Conseiller</option>
                <option value="editor">Éditeur</option>
                <option value="admin">Administrateur</option>
              </select>
            </div>
            <Button type="submit" disabled={creating}>
              {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
              {creating ? 'Création…' : 'Créer le compte'}
            </Button>
          </form>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <div className="bg-surface border border-border-subtle rounded-[calc(var(--radius)+4px)] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="px-4 py-3 text-left font-semibold text-text-muted">Nom</th>
                  <th className="px-4 py-3 text-left font-semibold text-text-muted">Email</th>
                  <th className="px-4 py-3 text-left font-semibold text-text-muted">Rôle</th>
                  <th className="px-4 py-3 text-left font-semibold text-text-muted">Matricule</th>
                  <th className="px-4 py-3 text-left font-semibold text-text-muted">Statut</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-border-subtle">
                    <td className="px-4 py-3 text-text-primary">{u.full_name}</td>
                    <td className="px-4 py-3 text-text-secondary">{u.email}</td>
                    <td className="px-4 py-3 text-text-secondary">{u.role}</td>
                    <td className="px-4 py-3 text-text-muted">{u.student_ref || '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded ${u.is_active ? 'bg-success/20 text-success' : 'bg-error/20 text-error'}`}>
                        {u.is_active ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
