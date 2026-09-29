import React, { useState } from 'react';
import { Language } from '../types';
import { X, Send, MessageCircle, ShieldCheck } from 'lucide-react';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [selectedTopic, setSelectedTopic] = useState('admissions');
  const [customMessage, setCustomMessage] = useState('');
  const [sentNotice, setSentNotice] = useState(false);

  if (!isOpen) return null;

  const presets = [
    {
      id: 'admissions',
      fr: 'Bonjour, je souhaite obtenir des informations sur les modalités d’admission et bourses à PLURIPERF.',
      en: 'Hello, I would like information regarding admissions requirements and scholarships at PLURIPERF.',
    },
    {
      id: 'formations',
      fr: 'Bonjour, je souhaiterais recevoir la brochure complète du Master Exécutif en Leadership Régénératif.',
      en: 'Hello, I would like to receive the full syllabus for the Executive Master in Regenerative Leadership.',
    },
    {
      id: 'cabinet',
      fr: 'Bonjour, notre entreprise souhaite un devis pour un Audit Carbone et un accompagnement CSRD.',
      en: 'Hello, our company requires a quote for Carbon Auditing and CSRD compliance guidance.',
    },
  ];

  const handleOpenWhatsApp = () => {
    const textToSend = customMessage || (lang === 'fr' ? presets.find(p => p.id === selectedTopic)?.fr : presets.find(p => p.id === selectedTopic)?.en);
    setSentNotice(true);
    setTimeout(() => {
      // In web view simulation
      const encoded = encodeURIComponent(textToSend || '');
      window.open(`https://wa.me/33600000000?text=${encoded}`, '_blank');
      setSentNotice(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
          <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              {lang === 'fr' ? 'WhatsApp Direct Université' : 'Official WhatsApp Hotline'}
            </h3>
            <p className="text-[11px] text-emerald-600 font-medium">
              {lang === 'fr' ? '● En ligne - Réponse en < 15 min' : '● Online - Answers within 15 min'}
            </p>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <p className="text-slate-600">
            {lang === 'fr'
              ? 'Échangez instantanément avec nos conseillers pédagogiques et admissions :'
              : 'Chat instantly with our academic admissions advisors:'}
          </p>

          <div className="space-y-2">
            {presets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  setSelectedTopic(preset.id);
                  setCustomMessage(lang === 'fr' ? preset.fr : preset.en);
                }}
                className={`w-full text-left p-2.5 rounded-lg border text-xs transition-colors ${
                  selectedTopic === preset.id
                    ? 'border-emerald-500 bg-emerald-50/60 text-slate-900 font-medium'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                {lang === 'fr' ? preset.fr : preset.en}
              </button>
            ))}
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">
              {lang === 'fr' ? 'Ou personnalisez votre message :' : 'Or customize your message:'}
            </label>
            <textarea
              rows={2}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder={lang === 'fr' ? 'Écrivez votre message...' : 'Type your inquiry...'}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleOpenWhatsApp}
              disabled={sentNotice}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg shadow flex items-center justify-center gap-2 transition-colors"
            >
              {sentNotice ? (
                <span>{lang === 'fr' ? 'Ouverture de WhatsApp...' : 'Opening WhatsApp...'}</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{lang === 'fr' ? 'Démarrer la discussion' : 'Start WhatsApp Chat'}</span>
                </>
              )}
            </button>
          </div>

          <div className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{lang === 'fr' ? 'Numéro vérifié international : +33 1 76 42 09 10' : 'Verified institutional number: +33 1 76 42 09 10'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
