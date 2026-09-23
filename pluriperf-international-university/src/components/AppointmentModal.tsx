import React, { useState } from 'react';
import { Language } from '../types';
import { X, Calendar, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { api, ApiError } from '../api/client';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('14:30');
  const [reason, setReason] = useState('admissions');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [booked, setBooked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/appointments', {
        date,
        timeSlot: time,
        reason,
        fullName: name,
        email,
        phone,
      });
      setBooked(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Erreur réseau');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Close appointment modal"
        >
          <X className="w-5 h-5" />
        </button>

        {booked ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-serif font-bold text-slate-900">
              {lang === 'fr'
                ? 'Demande de rendez-vous enregistrée'
                : 'Appointment Request Received'}
            </h3>
            <p className="text-xs text-slate-600">
              {lang === 'fr'
                ? `Votre créneau du ${date} à ${time} GMT a été réservé. Un conseiller confirmera par email.`
                : `Your ${date} slot at ${time} GMT has been reserved. An advisor will confirm by email.`}
            </p>
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
            <div className="border-b border-slate-100 pb-3 mb-5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 uppercase tracking-wider">
                <Calendar className="w-4 h-4" />
                <span>{lang === 'fr' ? 'Orientation Personnalisée' : 'Personalized Guidance'}</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900 mt-1">
                {lang === 'fr' ? 'Prendre rendez-vous avec un conseiller' : 'Book a Meeting with an Advisor'}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              {error && (
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}
              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  {lang === 'fr' ? 'Objet de l’entretien' : 'Meeting Topic'}
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="admissions">
                    {lang === 'fr' ? 'Orientation cursus & candidature admissions' : 'Program selection & admission process'}
                  </option>
                  <option value="scholarship">
                    {lang === 'fr' ? 'Bourses Mère Nature & financement d’études' : 'Scholarships & student financing'}
                  </option>
                  <option value="executive">
                    {lang === 'fr' ? 'Master Exécutif & reconversion professionnelle' : 'Executive Master & career transition'}
                  </option>
                  <option value="cabinet">
                    {lang === 'fr' ? 'Cabinet d’Expertise & Audit entreprise' : 'Expertise Advisory & Corporate Audit'}
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">
                    {lang === 'fr' ? 'Date souhaitée' : 'Preferred Date'}
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().slice(0, 10)}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">
                    {lang === 'fr' ? 'Créneau horaire (GMT)' : 'Time Slot (GMT)'}
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="09:00">09:00 - 09:45</option>
                    <option value="11:00">11:00 - 11:45</option>
                    <option value="14:30">14:30 - 15:15</option>
                    <option value="16:30">16:30 - 17:15</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  {lang === 'fr' ? 'Nom et Prénom *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jean Dupont"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">
                    {lang === 'fr' ? 'Email *' : 'Email *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jean@example.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">
                    {lang === 'fr' ? 'Téléphone *' : 'Phone *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+33 6..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-lg shadow transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {lang === 'fr' ? 'Confirmer le rendez-vous' : 'Confirm Appointment'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
