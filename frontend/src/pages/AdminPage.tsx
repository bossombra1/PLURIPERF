import React, { useEffect, useState } from 'react';
import { Language } from '../types';
import { api, ApiError } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { Users, FileText, Calendar, Mail, Briefcase, Newspaper, Loader2, ShieldAlert } from 'lucide-react';

interface Stats {
  users: number;
  applications: number;
  pendingAppointments: number;
  contactMessages: number;
  advisoryRequests: number;
  news: number;
}

interface ApplicationRow {
  id: number;
  reference: string;
  program: string;
  full_name: string;
  email: string;
  status: string;
}

const STATUSES = ['submitted', 'under_review', 'accepted', 'rejected', 'waitlisted'] as const;

export const AdminPage: React.FC<{ lang: Language }> = ({ lang }) => {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [apps, setApps] = useState<ApplicationRow[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const canManage = user && ['admin', 'super_admin'].includes(user.role);

  useEffect(() => {
    (async () => {
      try {
        const [s, a] = await Promise.all([
          api.get<Stats>('/admin/stats'),
          api.get<ApplicationRow[]>('/admin/applications'),
        ]);
        setStats(s);
        setApps(a);
      } catch (e) {
        setError(e instanceof ApiError ? e.message : 'Erreur de chargement');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const updateStatus = async (id: number, status: string) => {
    await api.patch(`/admin/applications/${id}/status`, { status });
    setApps((rows) => rows.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  if (loading) {
    return (
      <div className="py-24 flex items-center justify-center text-slate-500 gap-2">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span className="text-sm">{lang === 'fr' ? 'Chargement…' : 'Loading…'}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-24 text-center space-y-3">
        <ShieldAlert className="w-10 h-10 text-red-500 mx-auto" />
        <p className="text-sm text-slate-600">{error}</p>
      </div>
    );
  }

  const cards = [
    { icon: Users, labelFr: 'Utilisateurs', labelEn: 'Users', value: stats?.users ?? 0 },
    { icon: FileText, labelFr: 'Candidatures', labelEn: 'Applications', value: stats?.applications ?? 0 },
    { icon: Calendar, labelFr: 'RDV en attente', labelEn: 'Pending appointments', value: stats?.pendingAppointments ?? 0 },
    { icon: Mail, labelFr: 'Messages non traités', labelEn: 'Unhandled messages', value: stats?.contactMessages ?? 0 },
    { icon: Briefcase, labelFr: 'Demandes cabinet', labelEn: 'Advisory requests', value: stats?.advisoryRequests ?? 0 },
    { icon: Newspaper, labelFr: 'Actualités', labelEn: 'News articles', value: stats?.news ?? 0 },
  ];

  return (
    <div className="space-y-8 pb-16">
      <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800">
        <span className="text-xs uppercase font-semibold tracking-wider text-amber-400">Administration</span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold mt-1">
          {lang === 'fr' ? 'Tableau de bord administrateur' : 'Administrator Dashboard'}
        </h1>
        <p className="text-slate-300 text-xs mt-2">
          {lang === 'fr'
            ? 'Vue consolidée des dossiers, rendez-vous et demandes — données persistées en base.'
            : 'Consolidated view of dossiers, appointments and requests — data persisted in the database.'}
        </p>
      </section>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map(({ icon: Icon, labelFr, labelEn, value }) => (
          <div key={labelFr} className="p-5 bg-white border border-slate-200 rounded-2xl">
            <Icon className="w-5 h-5 text-amber-600 mb-2" />
            <div className="text-2xl font-bold text-slate-900">{value}</div>
            <div className="text-[11px] text-slate-500">{lang === 'fr' ? labelFr : labelEn}</div>
          </div>
        ))}
      </div>

      <section className="bg-white border border-slate-200 rounded-2xl p-6">
        <h2 className="text-lg font-serif font-bold text-slate-900 mb-4">
          {lang === 'fr' ? 'Candidatures récentes' : 'Recent applications'}
        </h2>
        {apps.length === 0 ? (
          <p className="text-xs text-slate-500">{lang === 'fr' ? 'Aucune candidature pour le moment.' : 'No applications yet.'}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-slate-500 border-b border-slate-200">
                  <th className="py-2 pr-4">{lang === 'fr' ? 'Référence' : 'Reference'}</th>
                  <th className="py-2 pr-4">{lang === 'fr' ? 'Candidat' : 'Candidate'}</th>
                  <th className="py-2 pr-4">{lang === 'fr' ? 'Programme' : 'Program'}</th>
                  <th className="py-2 pr-4">{lang === 'fr' ? 'Statut' : 'Status'}</th>
                </tr>
              </thead>
              <tbody>
                {apps.map((a) => (
                  <tr key={a.id} className="border-b border-slate-100">
                    <td className="py-2 pr-4 font-mono text-amber-600">{a.reference}</td>
                    <td className="py-2 pr-4">
                      {a.full_name}
                      <span className="block text-slate-400">{a.email}</span>
                    </td>
                    <td className="py-2 pr-4">{a.program}</td>
                    <td className="py-2 pr-4">
                      {canManage ? (
                        <select
                          value={a.status}
                          onChange={(e) => updateStatus(a.id, e.target.value)}
                          className="border border-slate-200 rounded-lg px-2 py-1 bg-slate-50"
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      ) : (
                        <span className="font-mono">{a.status}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};