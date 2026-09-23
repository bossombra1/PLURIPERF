import React, { useState } from 'react';
import { Language, PageId } from '../types';
import { api, ApiError } from '../api/client';
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  MessageCircle,
  Clock,
  Send,
  CheckCircle2,
  HelpCircle,
  Building,
} from 'lucide-react';

interface ContactsPageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  onOpenAppointment: () => void;
  onOpenWhatsApp: () => void;
}

export const ContactsPage: React.FC<ContactsPageProps> = ({
  lang,
  onNavigate,
  onOpenAppointment,
  onOpenWhatsApp,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCampus, setSelectedCampus] = useState<'paris' | 'abidjan' | 'geneva'>('paris');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/contact', { name, email, subject, message, campus: selectedCampus });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Erreur réseau');
    } finally {
      setLoading(false);
    }
  };

  const campuses = {
    paris: {
      nameFr: 'Campus Européen & Siège Académique (Paris)',
      nameEn: 'European Campus & Academic HQ (Paris)',
      address: '42 Avenue de la Grande Armée, 75017 Paris, France',
      phone: '+33 1 76 42 09 10',
      email: 'admissions.europe@pluriperf.com',
      hours: 'Lun - Ven: 08:30 - 18:30 GMT+1',
      mapEmbed: 'https://maps.google.com/maps?q=Paris+France&t=&z=13&ie=UTF8&iwloc=&output=embed',
    },
    abidjan: {
      nameFr: 'Hub Panafricain & Chaire MIN (Abidjan)',
      nameEn: 'Pan-African Hub & NIM Chair (Abidjan)',
      address: 'Boulevard de Marseille, Zone 4C, Abidjan, Côte d’Ivoire',
      phone: '+225 27 22 59 80 00',
      email: 'admissions.africa@pluriperf.com',
      hours: 'Lun - Ven: 08:00 - 17:30 GMT',
      mapEmbed: 'https://maps.google.com/maps?q=Abidjan+Cote+d+Ivoire&t=&z=13&ie=UTF8&iwloc=&output=embed',
    },
    geneva: {
      nameFr: 'Bureau Diplomatique & Relations ONU (Genève)',
      nameEn: 'Diplomatic Bureau & UN Liaison (Geneva)',
      address: 'Rue de Varembé 9, 1202 Genève, Suisse',
      phone: '+41 22 730 45 00',
      email: 'diplomacy.geneva@pluriperf.com',
      hours: 'Lun - Ven: 09:00 - 17:00 GMT+1',
      mapEmbed: 'https://maps.google.com/maps?q=Geneva+Switzerland&t=&z=13&ie=UTF8&iwloc=&output=embed',
    },
  };

  const currentCampus = campuses[selectedCampus];

  return (
    <div className="space-y-12 pb-16">
      {/* Header from Slide 9 */}
      <section className="border-b border-slate-200 pb-8 pt-4">
        <div className="max-w-3xl space-y-3">
          <div className="text-xs uppercase tracking-widest font-semibold text-amber-600">
            {lang === 'fr' ? 'Écoute & Orientation' : 'Connect & Inquire'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-slate-900 font-bold">
            {lang === 'fr' ? 'Contacts & Secrétariat Académique' : 'Contacts & Academic Desk'}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {lang === 'fr'
              ? 'Nos conseillers pédagogiques, le secrétariat des admissions et le cabinet d’expertise répondent à toutes vos demandes.'
              : 'Our academic guidance counselors, admissions registrar, and advisory team are available for inquiries.'}
          </p>
        </div>
      </section>

      {/* Slide 9 Quick Access Buttons (WhatsApp & Prise de rendez-vous) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* WhatsApp Button */}
        <button
          type="button"
          onClick={onOpenWhatsApp}
          className="p-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md flex items-center justify-between text-left transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-semibold block text-base">
                {lang === 'fr' ? 'Contacter par WhatsApp' : 'Direct WhatsApp Chat'}
              </span>
              <span className="text-xs text-emerald-100">
                {lang === 'fr' ? 'Réponse instantanée en moins de 15 min' : 'Instant reply in under 15 min'}
              </span>
            </div>
          </div>
          <span className="text-xs font-semibold bg-white/20 px-3 py-1.5 rounded-lg group-hover:bg-white group-hover:text-emerald-700 transition-colors">
            {lang === 'fr' ? 'Ouvrir WhatsApp' : 'Open WhatsApp'}
          </span>
        </button>

        {/* Prise de rendez-vous Button */}
        <button
          type="button"
          onClick={onOpenAppointment}
          className="p-5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white shadow-md flex items-center justify-between text-left transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <span className="font-semibold block text-base">
                {lang === 'fr' ? 'Prise de Rendez-vous' : 'Book an Appointment'}
              </span>
              <span className="text-xs text-slate-300">
                {lang === 'fr' ? 'Entretien d’orientation avec un conseiller' : 'Video meeting with an advisor'}
              </span>
            </div>
          </div>
          <span className="text-xs font-semibold bg-amber-600 px-3 py-1.5 rounded-lg group-hover:bg-amber-500 transition-colors">
            {lang === 'fr' ? 'Planifier' : 'Schedule'}
          </span>
        </button>
      </div>

      {/* Main Grid: Formulaire de contact & Coordonnées / Campus */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form (Slide 9: formulaires) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-serif font-bold text-slate-900 mb-2">
            {lang === 'fr' ? 'Formulaire de Contact Officiel' : 'Official Contact Form'}
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            {lang === 'fr'
              ? 'Remplissez ce formulaire et notre équipe vous recontactera sous 24h ouvrées.'
              : 'Submit your message and our office will get in touch within 24 business hours.'}
          </p>

          {submitted ? (
            <div className="text-center py-8 space-y-3 bg-emerald-50 rounded-xl border border-emerald-200 p-4">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="text-base font-semibold text-emerald-950">
                {lang === 'fr' ? 'Message envoyé avec succès !' : 'Message successfully sent!'}
              </h3>
              <p className="text-xs text-emerald-800">
                {lang === 'fr'
                  ? 'Un accusé de réception a été envoyé à votre adresse email.'
                  : 'A confirmation has been sent to your email address.'}
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs font-semibold text-emerald-700 underline"
              >
                {lang === 'fr' ? 'Envoyer un autre message' : 'Send another inquiry'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {error}
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                <div>
                  <label className="block text-slate-700 font-medium mb-1">
                    {lang === 'fr' ? 'Adresse Email *' : 'Email Address *'}
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
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  {lang === 'fr' ? 'Objet de la demande *' : 'Subject *'}
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={
                    lang === 'fr'
                      ? 'Ex: Renseignements Master, Devis audit, Partenariat...'
                      : 'E.g., Master info, Audit quotation, Partnership...'
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  {lang === 'fr' ? 'Message détaillé *' : 'Your Message *'}
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    lang === 'fr'
                      ? 'Précisez votre demande, votre parcours ou les besoins de votre organisation...'
                      : 'Describe your background, questions, or corporate scope...'
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-lg shadow flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>{lang === 'fr' ? 'Envoyer mon message' : 'Send Inquiries'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Coordonnées & Campus (Slide 9: adresses, téléphones, emails) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Campus Selector */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 text-xs">
            <button
              type="button"
              onClick={() => setSelectedCampus('paris')}
              className={`flex-1 py-1.5 px-3 rounded-lg font-medium transition-colors ${
                selectedCampus === 'paris'
                  ? 'bg-white text-slate-900 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Paris (Europe)
            </button>
            <button
              type="button"
              onClick={() => setSelectedCampus('abidjan')}
              className={`flex-1 py-1.5 px-3 rounded-lg font-medium transition-colors ${
                selectedCampus === 'abidjan'
                  ? 'bg-white text-slate-900 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Abidjan (Afrique)
            </button>
            <button
              type="button"
              onClick={() => setSelectedCampus('geneva')}
              className={`flex-1 py-1.5 px-3 rounded-lg font-medium transition-colors ${
                selectedCampus === 'geneva'
                  ? 'bg-white text-slate-900 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Genève (Suisse)
            </button>
          </div>

          {/* Current Campus Info Card */}
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase text-amber-600">
              <Building className="w-4 h-4" />
              <span>{lang === 'fr' ? currentCampus.nameFr : currentCampus.nameEn}</span>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{currentCampus.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="font-mono">{currentCampus.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="font-mono">{currentCampus.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{currentCampus.hours}</span>
              </div>
            </div>

            {/* Slide 9: carte google maps */}
            <div className="pt-2">
              <div className="rounded-xl overflow-hidden border border-slate-200 h-48 w-full bg-slate-100">
                <iframe
                  title="Carte Google Maps Campus"
                  src={currentCampus.mapEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 9: FAQ */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-600" />
          <span>{lang === 'fr' ? 'Questions Fréquentes sur les Contacts' : 'Contact FAQ'}</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1">
            <span className="font-semibold text-slate-900 block">
              {lang === 'fr' ? 'Puis-je visiter le campus en présentiel ?' : 'Can I visit the physical campus?'}
            </span>
            <p className="text-slate-500">
              {lang === 'fr'
                ? 'Oui, les visites individuelles et journées portes ouvertes sont organisées chaque samedi sur rendez-vous.'
                : 'Yes, individual guided tours and Open Days are hosted every Saturday by appointment.'}
            </p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1">
            <span className="font-semibold text-slate-900 block">
              {lang === 'fr' ? 'Quel est le fuseau horaire de réponse ?' : 'What is the response timezone?'}
            </span>
            <p className="text-slate-500">
              {lang === 'fr'
                ? 'Nos équipes couvrent l’ensemble des fuseaux horaires (GMT, GMT+1, UTC-5) pour assister nos étudiants internationaux.'
                : 'Our global offices operate across GMT, GMT+1, and UTC-5 to assist our international students.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
