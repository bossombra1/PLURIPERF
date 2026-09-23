import React, { useState } from 'react';
import { Language } from '../types';
import { PROGRAMS_DATA, FACULTIES_DATA } from '../data/universityData';
import { X, CheckCircle2, Upload, ArrowRight, ArrowLeft, GraduationCap, Loader2, AlertCircle } from 'lucide-react';
import { Logo } from './Logo';
import { api, ApiError } from '../api/client';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  preselectedProgram?: string;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
  lang,
  preselectedProgram = '',
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    program: preselectedProgram || PROGRAMS_DATA[0].titleFr,
    level: 'Master',
    fullName: '',
    email: '',
    phone: '',
    country: 'France',
    currentDiploma: 'Licence / Bachelor',
    motivation: '',
    needScholarship: false,
    cvFileName: '',
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('program', formData.program);
      fd.append('level', formData.level);
      fd.append('fullName', formData.fullName);
      fd.append('email', formData.email);
      fd.append('phone', formData.phone);
      fd.append('country', formData.country);
      fd.append('currentDiploma', formData.currentDiploma);
      fd.append('motivation', formData.motivation);
      fd.append('needScholarship', String(formData.needScholarship));
      if (cvFile) fd.append('cv', cvFile);
      const res = await api.post<{ reference: string }>('/applications', fd);
      setSubmittedId(res.reference);
      setStep(3);
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
          className="absolute right-5 top-5 p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {error && step === 2 && (
          <div className="mb-4 flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {submittedId ? (
          /* Step 3: Success Screen */
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-serif font-bold text-slate-900">
              {lang === 'fr'
                ? 'Dossier de candidature transmis avec succès !'
                : 'Application Dossier Successfully Submitted!'}
            </h3>

            <p className="text-sm text-slate-600 max-w-md mx-auto">
              {lang === 'fr'
                ? 'Le secrétariat académique et le comité des admissions ont bien reçu vos pièces justificatives.'
                : 'The academic registrar and admissions committee have safely received your documentation.'}
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-w-md mx-auto text-left text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">
                  {lang === 'fr' ? 'Numéro de dossier :' : 'Application ID:'}
                </span>
                <span className="font-mono font-bold text-amber-600">
                  {submittedId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">
                  {lang === 'fr' ? 'Candidat :' : 'Candidate:'}
                </span>
                <span className="font-medium text-slate-800">
                  {formData.fullName || 'Sarah Amrani'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">
                  {lang === 'fr' ? 'Formation visée :' : 'Program:'}
                </span>
                <span className="font-medium text-slate-800 truncate max-w-[200px]">
                  {formData.program}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">
                  {lang === 'fr' ? 'Délai d’évaluation :' : 'Review timeframe:'}
                </span>
                <span className="font-medium text-emerald-700">
                  {lang === 'fr' ? '48h ouvrées' : '48 business hours'}
                </span>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow"
              >
                {lang === 'fr' ? 'Terminer et fermer' : 'Finish & Close'}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="border-b border-slate-100 pb-4 mb-5 flex items-start gap-4">
              <Logo variant="emblem-only" size="md" className="mt-0.5 shrink-0" />
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#E85D1E] uppercase tracking-wider">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>
                    {lang === 'fr'
                      ? 'Portail des Candidatures Officielles'
                      : 'Official Application Portal'}
                  </span>
                </div>
                <h3 className="text-xl font-serif font-bold text-slate-900 mt-1">
                  {lang === 'fr'
                    ? 'Candidater à PLURIPERF International University'
                    : 'Apply to PLURIPERF International University'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {lang === 'fr'
                    ? 'Étape ' + step + ' sur 2 : Informations académiques et personnelles'
                    : 'Step ' + step + ' of 2: Academic and personal information'}
                </p>
              </div>
            </div>

            <form onSubmit={step === 1 ? (e) => { e.preventDefault(); setStep(2); } : handleSubmit} className="space-y-4 text-xs">
              {step === 1 ? (
                <>
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">
                      {lang === 'fr' ? 'Programme souhaité *' : 'Desired Program *'}
                    </label>
                    <select
                      value={formData.program}
                      onChange={(e) =>
                        setFormData({ ...formData, program: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      required
                    >
                      {PROGRAMS_DATA.map((prog) => (
                        <option key={prog.id} value={prog.titleFr}>
                          [{prog.level}] {lang === 'fr' ? prog.titleFr : prog.titleEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-medium mb-1">
                        {lang === 'fr' ? 'Nom et Prénom *' : 'Full Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        placeholder="Ex: Sarah Amrani"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-medium mb-1">
                        {lang === 'fr' ? 'Email de contact *' : 'Contact Email *'}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="sarah@example.com"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-medium mb-1">
                        {lang === 'fr' ? 'Téléphone / WhatsApp *' : 'Phone / WhatsApp *'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+33 6 12 34 56 78"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-medium mb-1">
                        {lang === 'fr' ? 'Pays de résidence *' : 'Country of Residence *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.country}
                        onChange={(e) =>
                          setFormData({ ...formData, country: e.target.value })
                        }
                        placeholder="France, Côte d'Ivoire, Suisse..."
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-3 flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-medium rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                      <span>{lang === 'fr' ? 'Étape suivante' : 'Next Step'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">
                      {lang === 'fr'
                        ? 'Dernier diplôme obtenu *'
                        : 'Highest Degree Completed *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.currentDiploma}
                      onChange={(e) =>
                        setFormData({ ...formData, currentDiploma: e.target.value })
                      }
                      placeholder="Ex: Licence Économie, Master Ingénierie, Bac+3..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-medium mb-1">
                      {lang === 'fr'
                        ? 'Projet professionnel & Motivation *'
                        : 'Statement of Purpose & Career Goals *'}
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.motivation}
                      onChange={(e) =>
                        setFormData({ ...formData, motivation: e.target.value })
                      }
                      placeholder={
                        lang === 'fr'
                          ? 'Expliquez brièvement comment cette formation s’inscrit dans votre vision de la transition écologique...'
                          : 'Briefly describe how this program aligns with your vision for ecological leadership...'
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  {/* CV Upload mock */}
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">
                      {lang === 'fr' ? 'Curriculum Vitae (CV) *' : 'Curriculum Vitae (Resume) *'}
                    </label>
                    <div className="border border-dashed border-slate-300 rounded-lg p-3 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                      <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                      <p className="text-[11px] text-slate-600">
                        {formData.cvFileName ||
                          (lang === 'fr'
                            ? 'Cliquez pour sélectionner votre CV (PDF, Max 10 Mo)'
                            : 'Click to select your CV (PDF, Max 10 MB)')}
                      </p>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        id="cv-upload"
                        onChange={(e) => {
                          const f = e.target.files?.[0] ?? null;
                          setCvFile(f);
                          setFormData({
                            ...formData,
                            cvFileName: f ? f.name : '',
                          });
                        }}
                      />
                      <label
                        htmlFor="cv-upload"
                        className="inline-block mt-1 text-[11px] text-amber-600 font-semibold cursor-pointer underline"
                      >
                        {formData.cvFileName
                          ? lang === 'fr' ? 'Fichier attaché' : 'Attached'
                          : lang === 'fr' ? 'Parcourir les fichiers' : 'Browse files'}
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="scholarship"
                      checked={formData.needScholarship}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          needScholarship: e.target.checked,
                        })
                      }
                      className="rounded text-amber-600 focus:ring-amber-500"
                    />
                    <label htmlFor="scholarship" className="text-slate-600 text-[11px]">
                      {lang === 'fr'
                        ? 'Je souhaite postuler à une Bourse d’Excellence Mère Nature (prise en charge jusqu’à 70%)'
                        : 'I wish to apply for a Mother Nature Merit Scholarship (up to 70% tuition waiver)'}
                    </label>
                  </div>

                  <div className="pt-3 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 text-slate-600 hover:text-slate-900 flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>{lang === 'fr' ? 'Retour' : 'Back'}</span>
                    </button>

                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-semibold rounded-lg shadow transition-all disabled:opacity-60 flex items-center gap-2"
                    >
                      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                      {lang === 'fr' ? 'Confirmer et envoyer' : 'Confirm & Submit'}
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
