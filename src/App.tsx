import React, { useState, useEffect } from 'react';
import { PageId, Language } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { UniversityPage } from './pages/UniversityPage';
import { FacultiesPage } from './pages/FacultiesPage';
import { FormationsPage } from './pages/FormationsPage';
import { CampusVirtuelPage } from './pages/CampusVirtuelPage';
import { BibliothequePage } from './pages/BibliothequePage';
import { CabinetPage } from './pages/CabinetPage';
import { MereNaturePage } from './pages/MereNaturePage';
import { RecherchesPage } from './pages/RecherchesPage';
import { ActualitesPage } from './pages/ActualitesPage';
import { AdmissionsPage } from './pages/AdmissionsPage';
import { ContactsPage } from './pages/ContactsPage';

import { ApplicationModal } from './components/ApplicationModal';
import { LoginModal } from './components/LoginModal';
import { AppointmentModal } from './components/AppointmentModal';
import { WhatsAppModal } from './components/WhatsAppModal';
import { CabinetQuoteModal } from './components/CabinetQuoteModal';

export const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('fr');
  const [currentPage, setCurrentPage] = useState<PageId>('accueil');

  // Modals state
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isCabinetModalOpen, setIsCabinetModalOpen] = useState(false);
  const [preselectedProgram, setPreselectedProgram] = useState('');
  const [activePersona, setActivePersona] = useState<'student' | 'faculty'>('student');

  const [targetUniversitySection, setTargetUniversitySection] = useState<string | undefined>(undefined);

  const handleNavigate = (page: PageId, sectionId?: string) => {
    setCurrentPage(page);
    if (page === 'universite' && sectionId) {
      setTargetUniversitySection(sectionId);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 120);
    } else {
      setTargetUniversitySection(undefined);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleApplyForProgram = (programTitle: string) => {
    setPreselectedProgram(programTitle);
    setIsApplyModalOpen(true);
  };

  const handleSuccessLogin = (persona: 'student' | 'faculty') => {
    setActivePersona(persona);
    setCurrentPage('campus_virtuel');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'accueil':
        return (
          <HomePage
            lang={lang}
            onNavigate={handleNavigate}
            onOpenApply={() => {
              setPreselectedProgram('');
              setIsApplyModalOpen(true);
            }}
            onOpenSearch={() => setCurrentPage('formations')}
            onOpenConsulting={() => setIsCabinetModalOpen(true)}
            onApplyForProgram={handleApplyForProgram}
          />
        );
      case 'universite':
        return (
          <UniversityPage
            lang={lang}
            onNavigate={handleNavigate}
            onOpenApply={() => {
              setPreselectedProgram('');
              setIsApplyModalOpen(true);
            }}
            initialSection={targetUniversitySection}
          />
        );
      case 'facultes':
        return (
          <FacultiesPage
            lang={lang}
            onNavigate={handleNavigate}
            onApplyForProgram={handleApplyForProgram}
          />
        );
      case 'formations':
        return (
          <FormationsPage
            lang={lang}
            onNavigate={setCurrentPage}
            onApplyForProgram={handleApplyForProgram}
          />
        );
      case 'campus_virtuel':
        return (
          <CampusVirtuelPage
            lang={lang}
            onNavigate={setCurrentPage}
            activePersona={activePersona}
          />
        );
      case 'bibliotheque':
        return <BibliothequePage lang={lang} />;
      case 'cabinet':
        return (
          <CabinetPage
            lang={lang}
            onNavigate={setCurrentPage}
            onOpenConsulting={() => setIsCabinetModalOpen(true)}
          />
        );
      case 'mere_nature':
        return (
          <MereNaturePage
            lang={lang}
            onNavigate={setCurrentPage}
          />
        );
      case 'recherches':
        return (
          <RecherchesPage
            lang={lang}
            onNavigate={setCurrentPage}
          />
        );
      case 'actualites':
        return <ActualitesPage lang={lang} />;
      case 'admissions':
        return (
          <AdmissionsPage
            lang={lang}
            onNavigate={setCurrentPage}
            onOpenApply={() => {
              setPreselectedProgram('');
              setIsApplyModalOpen(true);
            }}
            onOpenAppointment={() => setIsAppointmentModalOpen(true)}
          />
        );
      case 'contacts':
        return (
          <ContactsPage
            lang={lang}
            onNavigate={setCurrentPage}
            onOpenAppointment={() => setIsAppointmentModalOpen(true)}
            onOpenWhatsApp={() => setIsWhatsAppModalOpen(true)}
          />
        );
      default:
        return (
          <HomePage
            lang={lang}
            onNavigate={setCurrentPage}
            onOpenApply={() => setIsApplyModalOpen(true)}
            onOpenSearch={() => setCurrentPage('formations')}
            onOpenConsulting={() => setIsCabinetModalOpen(true)}
            onApplyForProgram={handleApplyForProgram}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* 3-zone Header strictly compliant with top bar contract */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        lang={lang}
        onLanguageChange={setLang}
        onOpenApply={() => {
          setPreselectedProgram('');
          setIsApplyModalOpen(true);
        }}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onOpenAppointment={() => setIsAppointmentModalOpen(true)}
        onOpenWhatsApp={() => setIsWhatsAppModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {renderCurrentPage()}
      </main>

      {/* Institutional Footer */}
      <Footer
        lang={lang}
        onNavigate={handleNavigate}
        onOpenApply={() => {
          setPreselectedProgram('');
          setIsApplyModalOpen(true);
        }}
        onOpenAppointment={() => setIsAppointmentModalOpen(true)}
      />

      {/* Modals & Dialogs */}
      <ApplicationModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        lang={lang}
        preselectedProgram={preselectedProgram}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        lang={lang}
        onSuccessLogin={handleSuccessLogin}
      />

      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        lang={lang}
      />

      <WhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        lang={lang}
      />

      <CabinetQuoteModal
        isOpen={isCabinetModalOpen}
        onClose={() => setIsCabinetModalOpen(false)}
        lang={lang}
      />
    </div>
  );
};

export default App;
