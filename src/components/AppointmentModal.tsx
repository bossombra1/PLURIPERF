import React, { useState } from 'react';
import { Language } from '../types';
import { X, Calendar, Clock, CheckCircle2, User, Phone, Mail } from 'lucide-react';

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
  const [date, setDate] = useState('2026-10-15');
  const [time, setTime] = useState('14:30');
  const [reason, setReason] = useState('admissions');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [booked, setBooked] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
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
                ? 'Rendez-vous confirmé avec un conseiller'
                : 'Appointment Confirmed with an Advisor'}
            </h3>
            <p className="text-xs text-slate-600">
              {lang === 'fr'
                ? `Votre entretien d’orientation est programmé le ${date} à ${time} GMT par visioconférence.`
                : `Your guidance appointment is scheduled for ${date} at ${time} GMT via video conference.`}
            </p>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-left max-w-sm mx-auto space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">{lang === 'fr' ? 'Participant :' : 'Attendee:'}</span>
                <span className="font-semibold text-slate-800">{name || 'Candidat'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{lang === 'fr' ? 'Lien d’invitation :' : 'Invite Link:'}</span>
                <span className="text-amber-600 font-mono">meet.pluriperf.com/adv-902</span>
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
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-lg shadow transition-colors"
                >
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
