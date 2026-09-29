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
  Building2,
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
  const [selectedCampus, setSelectedCampus] = useState<'abidjan' | 'yamoussoukro' | 'paris' | 'geneva'>('abidjan');

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
    abidjan: {
      nameFr: 'Campus Principal & Rectorat (Abidjan)',
      nameEn: 'Main Campus & Rectorate (Abidjan)',
      address: 'Boulevard de Marseille, Zone 4C & Cocody, Abidjan, Côte d’Ivoire',
      phone: '+225 27 22 59 88 00 / 05 01 80 00 19',
      email: 'admissions.abidjan@pluriperf.com',
      hours: 'Lun - Ven : 08h00 - 18h00 GMT',
      mapEmbed: 'https://maps.google.com/maps?q=Abidjan+Cote+d+Ivoire&t=&z=13&ie=UTF8&iwloc=&output=embed',
    },
    yamoussoukro: {
      nameFr: 'Pôle d’Expérimentation Agroécologique & MIN (Yamoussoukro)',
      nameEn: 'Agroecology & NIM Research Pole (Yamoussoukro)',
      address: 'Quartier Scientifique, Yamoussoukro, Côte d’Ivoire',
      phone: '+225 27 30 64 66 60',
      email: 'yamoussoukro@pluriperf.com',
      hours: 'Lun - Ven : 08h00 - 17h30 GMT',
      mapEmbed: 'https://maps.google.com/maps?q=Yamoussoukro+Cote+d+Ivoire&t=&z=13&ie=UTF8&iwloc=&output=embed',
    },
    paris: {
      nameFr: 'Campus Européen & Représentation Internationale (Paris)',
      nameEn: 'European Campus & International Office (Paris)',
      address: '42 Avenue de la Grande Armée, 75017 Paris, France',
      phone: '+33 1 76 42 09 10',
      email: 'admissions.europe@pluriperf.com',
      hours: 'Lun - Ven : 08h30 - 18h30 GMT+1',
      mapEmbed: 'https://maps.google.com/maps?q=Paris+France&t=&z=13&ie=UTF8&iwloc=&output=embed',
    },
    geneva: {
      nameFr: 'Bureau Diplomatique & Relations ONU (Genève)',
      nameEn: 'Diplomatic Bureau & UN Liaison (Geneva)',
      address: 'Rue de Varembé 9, 1202 Genève, Suisse',
      phone: '+41 22 730 45 00',
      email: 'diplomacy.geneva@pluriperf.com',
      hours: 'Lun - Ven : 09h00 - 17h00 GMT+1',
      mapEmbed: 'https://maps.google.com/maps?q=Geneva+Switzerland&t=&z=13&ie=UTF8&iwloc=&output=embed',
    },
  };

  const currentCampus = campuses[selectedCampus];

  return (
    <div className="bg-[#f8fafc] text-[#333333] min-h-screen">
      {/* 1. Academic Breadcrumbs & Header Banner */}
      <div className="bg-white border-b border-[#eaeaea]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
          <nav className="flex items-center gap-2 text-xs text-[#898888] mb-3">
            <button
              onClick={() => onNavigate('accueil')}
              className="hover:text-[#008629] transition-colors"
            >
              {lang === 'fr' ? 'Accueil' : 'Home'}
            </button>
            <span>/</span>
            <span className="text-[#898888]">{lang === 'fr' ? 'Contacts' : 'Contact'}</span>
            <span>/</span>
            <span className="text-[#008629] font-medium">
              {lang === 'fr' ? 'Secrétariat Général & Campus' : 'Offices & Campuses'}
            </span>
          </nav>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111827] tracking-tight inphb-heading-accent">
              {lang === 'fr' ? 'Contacts & Secrétariat Académique' : 'Contacts & Academic Offices'}
            </h1>
            <p className="text-sm sm:text-base text-[#666666] max-w-2xl pt-2">
              {lang === 'fr'
                ? 'Nos équipes pédagogiques et administratives sont à votre disposition pour vous orienter et répondre à vos questions.'
                : 'Our academic desks and admissions advisors are ready to guide you and answer your questions.'}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

        {/* Campus Selector Tabs (Exact INP-HB style) */}
        <div className="bg-white border border-[#eaeaea] p-2 rounded-sm shadow-sm flex flex-wrap gap-2">
          {(
            [
              ['abidjan', 'Abidjan (Siège)', 'Abidjan (HQ)'],
              ['yamoussoukro', 'Yamoussoukro (MIN Pole)', 'Yamoussoukro (NIM)'],
              ['paris', 'Paris (Europe)', 'Paris (Europe)'],
              ['geneva', 'Genève (Suisse)', 'Geneva (Switzerland)'],
            ] as const
          ).map(([id, fr, en]) => {
            const isSelected = selectedCampus === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setSelectedCampus(id)}
                className={`px-4 py-2 text-xs font-bold rounded-xs transition-colors flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#008629] text-white shadow-xs'
                    : 'bg-[#f8fafc] text-[#555555] hover:bg-[#eaeaea]'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>{lang === 'fr' ? fr : en}</span>
              </button>
            );
          })}
        </div>

        {/* Contact Form + Selected Campus Coordinates */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 bg-white border border-[#eaeaea] p-6 sm:p-8 rounded-sm shadow-sm space-y-6">
            <div className="border-b border-[#eaeaea] pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#008629] block mb-1">
                FORMULAIRE OFFICIEL
              </span>
              <h2 className="text-xl font-bold text-[#111827]">
                {lang === 'fr' ? 'Écrire au Secrétariat Académique' : 'Write to the Academic Secretariat'}
              </h2>
            </div>

            {submitted ? (
              <div className="p-6 bg-[#f0f9f1] border border-[#c3e6cb] rounded-sm text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#008629] mx-auto" />
                <h3 className="text-base font-bold text-[#155724]">
                  {lang === 'fr' ? 'Message envoyé avec succès' : 'Message sent successfully'}
                </h3>
                <p className="text-xs text-[#155724]">
                  {lang === 'fr'
                    ? 'Votre demande a été transmise au secrétariat compétent. Vous recevrez une réponse sous 24 à 48 heures ouvrées.'
                    : 'Your request has been forwarded to the admissions desk. An advisor will follow up within 24 to 48 business hours.'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                    setSubject('');
                  }}
                  className="inphb-btn-primary text-xs mt-2"
                >
                  {lang === 'fr' ? 'Envoyer un autre message' : 'Send another message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-sm">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-[#333333] block">
                      {lang === 'fr' ? 'Nom et Prénom *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Jean-Marc Yao"
                      className="w-full px-3 py-2.5 border border-[#eaeaea] rounded-sm focus:border-[#008629] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[#333333] block">
                      {lang === 'fr' ? 'Adresse E-mail *' : 'Email Address *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Ex: jean.yao@example.com"
                      className="w-full px-3 py-2.5 border border-[#eaeaea] rounded-sm focus:border-[#008629] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#333333] block">
                    {lang === 'fr' ? 'Objet de la demande *' : 'Subject *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={lang === 'fr' ? 'Ex: Renseignements Master Écologie ou Inscription' : 'Ex: Masters Inquiry'}
                    className="w-full px-3 py-2.5 border border-[#eaeaea] rounded-sm focus:border-[#008629] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#333333] block">
                    {lang === 'fr' ? 'Votre Message *' : 'Message *'}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={lang === 'fr' ? 'Détaillez votre projet académique ou votre question...' : 'Describe your project or questions...'}
                    className="w-full px-3 py-2.5 border border-[#eaeaea] rounded-sm focus:border-[#008629] focus:outline-none leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inphb-btn-primary w-full py-3"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {loading
                      ? (lang === 'fr' ? 'Envoi en cours...' : 'Sending...')
                      : (lang === 'fr' ? 'Transmettre mon message' : 'Submit Inquiry')}
                  </span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Selected Campus Info & Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#eaeaea] p-6 rounded-sm shadow-sm space-y-4">
              <div className="border-b border-[#eaeaea] pb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-[#008629] block mb-1">
                  {lang === 'fr' ? 'CAMPUS SÉLECTIONNÉ' : 'SELECTED CAMPUS'}
                </span>
                <h3 className="text-base font-bold text-[#111827]">
                  {lang === 'fr' ? currentCampus.nameFr : currentCampus.nameEn}
                </h3>
              </div>

              <div className="space-y-3 text-xs text-[#555555]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#008629] shrink-0 mt-0.5" />
                  <div>
                    <b className="text-[#111827] block">Adresse :</b>
                    <span>{currentCampus.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-[#008629] shrink-0 mt-0.5" />
                  <div>
                    <b className="text-[#111827] block">Téléphone direct :</b>
                    <span>{currentCampus.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-[#008629] shrink-0 mt-0.5" />
                  <div>
                    <b className="text-[#111827] block">E-mail scolarité :</b>
                    <a href={`mailto:${currentCampus.email}`} className="text-[#008629] hover:underline font-semibold">
                      {currentCampus.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#008629] shrink-0 mt-0.5" />
                  <div>
                    <b className="text-[#111827] block">Horaires de réception :</b>
                    <span>{currentCampus.hours}</span>
                  </div>
                </div>
              </div>

              {/* Direct Instant Channels */}
              <div className="pt-4 border-t border-[#eaeaea] space-y-2">
                <button
                  type="button"
                  onClick={onOpenWhatsApp}
                  className="w-full flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#20ba59] text-white font-semibold py-2.5 px-4 rounded-sm text-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{lang === 'fr' ? 'Échanger directement sur WhatsApp' : 'Live Chat on WhatsApp'}</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenAppointment}
                  className="w-full inphb-btn-outline text-xs py-2 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{lang === 'fr' ? 'Planifier un entretien d’orientation' : 'Schedule Academic Meeting'}</span>
                </button>
              </div>
            </div>

            {/* Interactive Campus Map iframe */}
            <div className="bg-white border border-[#eaeaea] p-2 rounded-sm shadow-sm overflow-hidden">
              <iframe
                title="Plan d'accès Campus"
                src={currentCampus.mapEmbed}
                className="w-full h-56 border-0"
                loading="lazy"
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
