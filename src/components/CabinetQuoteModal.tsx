import React, { useState } from 'react';
import { Language } from '../types';
import { CABINET_SERVICES } from '../data/universityData';
import { X, CheckCircle2, Send, Loader2, AlertCircle, FileCheck } from 'lucide-react';
import { api, ApiError } from '../api/client';

interface CabinetQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const CabinetQuoteModal: React.FC<CabinetQuoteModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [selectedService, setSelectedService] = useState(CABINET_SERVICES[0].id);
  const [company, setCompany] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [employees, setEmployees] = useState('50-250');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const serviceLabel = CABINET_SERVICES.find((s) => s.id === selectedService)?.titleFr ?? selectedService;
      const res = await api.post<{ reference: string }>('/advisory', {
        service: serviceLabel,
        company,
        contactName,
        email,
        phone,
        employees,
        message,
      });
      setReference(res.reference);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Erreur réseau');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif font-bold text-slate-900">
              {lang === 'fr'
                ? 'Demande d’accompagnement enregistrée !'
                : 'Advisory Request Received!'}
            </h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              {lang === 'fr'
                ? 'Un expert senior du Cabinet PLURIPERF prendra contact sous 24h avec votre organisation pour cadrer le périmètre d’intervention.'
                : 'A senior consultant from PLURIPERF Advisory will contact your organization within 24 hours.'}
            </p>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-left max-w-sm mx-auto space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">{lang === 'fr' ? 'Organisation :' : 'Organization:'}</span>
                <span className="font-semibold text-slate-800">{company || 'Entreprise'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{lang === 'fr' ? 'Réf dossier :' : 'Case Ref:'}</span>
                <span className="font-mono text-amber-600">{reference}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg"
            >
              {lang === 'fr' ? 'Fermer' : 'Close'}
            </button>
          </div>
        ) : (
          <div>
            <div className="border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 uppercase tracking-wider">
                <FileCheck className="w-4 h-4" />
                <span>
                  {lang === 'fr'
                    ? 'Cabinet d’Expertise Environnementale'
                    : 'Environmental Advisory Unit'}
                </span>
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900 mt-1">
                {lang === 'fr'
                  ? 'Demander un accompagnement & devis d’intervention'
                  : 'Request Advisory & Audit Proposal'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {lang === 'fr'
                  ? 'Études environnementales, audit carbone, conformité CSRD, ISO et coaching exécutif'
                  : 'Environmental impact, carbon auditing, CSRD compliance, ISO norms, and coaching'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  {lang === 'fr' ? 'Prestation sollicitée *' : 'Requested Service *'}
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {CABINET_SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {lang === 'fr' ? s.titleFr : s.titleEn}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">
                    {lang === 'fr' ? 'Entreprise / Institution *' : 'Company / Organization *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Nom de l'organisation"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">
                    {lang === 'fr' ? 'Taille effectif' : 'Workforce Size'}
                  </label>
                  <select
                    value={employees}
                    onChange={(e) => setEmployees(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="1-50">&lt; 50 collaborateurs</option>
                    <option value="50-250">50 - 250 collaborateurs</option>
                    <option value="250-1000">250 - 1000 collaborateurs</option>
                    <option value="1000+">&gt; 1000 collaborateurs</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">
                    {lang === 'fr' ? 'Nom du contact *' : 'Contact Person *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Jean-Paul Dubois"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">
                    {lang === 'fr' ? 'Email professionnel *' : 'Business Email *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jp.dubois@company.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  {lang === 'fr' ? 'Téléphone direct *' : 'Direct Phone *'}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+33 1..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  {lang === 'fr' ? 'Description succincte du besoin' : 'Scope / Needs Description'}
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    lang === 'fr'
                      ? 'Périmètre géographique, échéance souhaitée, contexte...'
                      : 'Locations, targeted milestones, context...'
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="pt-2">
                {error && (
                  <div className="mb-3 flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg shadow flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-amber-500" />
                      <span>
                        {lang === 'fr' ? 'Envoyer la demande d’intervention' : 'Submit Advisory Request'}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
