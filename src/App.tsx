import React, { Suspense, lazy } from 'react';
import { BrowserRouter, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { PageId, Language } from './types';
import { pageToPath } from './routes';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LoadingState } from './components/ui/states';
import { ApplicationModal } from './components/ApplicationModal';
import { LoginModal } from './components/LoginModal';
import { AppointmentModal } from './components/AppointmentModal';
import { WhatsAppModal } from './components/WhatsAppModal';
import { CabinetQuoteModal } from './components/CabinetQuoteModal';

const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const UniversityPresentationPage = lazy(() => import('./pages/university/UniversityPresentationPage').then((m) => ({ default: m.UniversityPresentationPage })));
const UniversityMotPresidentPage = lazy(() => import('./pages/university/UniversityMotPresidentPage').then((m) => ({ default: m.UniversityMotPresidentPage })));
const UniversityVisionPage = lazy(() => import('./pages/university/UniversityVisionPage').then((m) => ({ default: m.UniversityVisionPage })));
const UniversityMinPage = lazy(() => import('./pages/university/UniversityMinPage').then((m) => ({ default: m.UniversityMinPage })));
const UniversityHistoirePage = lazy(() => import('./pages/university/UniversityHistoirePage').then((m) => ({ default: m.UniversityHistoirePage })));
const UniversityGouvernancePage = lazy(() => import('./pages/university/UniversityGouvernancePage').then((m) => ({ default: m.UniversityGouvernancePage })));
const UniversityReconnaissancesPage = lazy(() => import('./pages/university/UniversityReconnaissancesPage').then((m) => ({ default: m.UniversityReconnaissancesPage })));
const FacultiesPage = lazy(() => import('./pages/FacultiesPage').then((m) => ({ default: m.FacultiesPage })));
const FacultyDetailPage = lazy(() => import('./pages/FacultyDetailPage').then((m) => ({ default: m.FacultyDetailPage })));
const FormationsPage = lazy(() => import('./pages/FormationsPage').then((m) => ({ default: m.FormationsPage })));
const FormationDetailPage = lazy(() => import('./pages/FormationDetailPage').then((m) => ({ default: m.FormationDetailPage })));
const CampusVirtuelPage = lazy(() => import('./pages/CampusVirtuelPage').then((m) => ({ default: m.CampusVirtuelPage })));
const BibliothequePage = lazy(() => import('./pages/BibliothequePage').then((m) => ({ default: m.BibliothequePage })));
const CabinetPage = lazy(() => import('./pages/CabinetPage').then((m) => ({ default: m.CabinetPage })));
const MereNaturePage = lazy(() => import('./pages/MereNaturePage').then((m) => ({ default: m.MereNaturePage })));
const RecherchesPage = lazy(() => import('./pages/RecherchesPage').then((m) => ({ default: m.RecherchesPage })));
const ActualitesPage = lazy(() => import('./pages/ActualitesPage').then((m) => ({ default: m.ActualitesPage })));
const ArticleDetailPage = lazy(() => import('./pages/ArticleDetailPage').then((m) => ({ default: m.ArticleDetailPage })));
const AdmissionsPage = lazy(() => import('./pages/AdmissionsPage').then((m) => ({ default: m.AdmissionsPage })));
const ContactsPage = lazy(() => import('./pages/ContactsPage').then((m) => ({ default: m.ContactsPage })));
const CareerPage = lazy(() => import('./pages/CareerPage').then((m) => ({ default: m.CareerPage })));
const LoginPage = lazy(() => import('./pages/LoginPage').then((m) => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('./pages/RegisterPage').then((m) => ({ default: m.RegisterPage })));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage').then((m) => ({ default: m.ForgotPasswordPage })));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage').then((m) => ({ default: m.ResetPasswordPage })));
const VerifyEmailPage = lazy(() => import('./pages/VerifyEmailPage').then((m) => ({ default: m.VerifyEmailPage })));
const StudentSpacePage = lazy(() => import('./pages/StudentSpacePage').then((m) => ({ default: m.StudentSpacePage })));
const StudentCoursesPage = lazy(() => import('./pages/StudentCoursesPage').then((m) => ({ default: m.StudentCoursesPage })));
const StudentAssignmentsPage = lazy(() => import('./pages/StudentAssignmentsPage').then((m) => ({ default: m.StudentAssignmentsPage })));
const StudentGradesPage = lazy(() => import('./pages/StudentGradesPage').then((m) => ({ default: m.StudentGradesPage })));
const StudentDiplomasPage = lazy(() => import('./pages/StudentDiplomasPage').then((m) => ({ default: m.StudentDiplomasPage })));
const StudentMessagesPage = lazy(() => import('./pages/StudentMessagesPage').then((m) => ({ default: m.StudentMessagesPage })));
const StudentForumPage = lazy(() => import('./pages/StudentForumPage').then((m) => ({ default: m.StudentForumPage })));
const TeacherSpacePage = lazy(() => import('./pages/TeacherSpacePage').then((m) => ({ default: m.TeacherSpacePage })));
const TeacherCoursesPage = lazy(() => import('./pages/TeacherCoursesPage').then((m) => ({ default: m.TeacherCoursesPage })));
const TeacherAssignmentsPage = lazy(() => import('./pages/TeacherAssignmentsPage').then((m) => ({ default: m.TeacherAssignmentsPage })));
const TeacherGradesPage = lazy(() => import('./pages/TeacherGradesPage').then((m) => ({ default: m.TeacherGradesPage })));
const AdminPage = lazy(() => import('./pages/AdminPage').then((m) => ({ default: m.AdminPage })));
const AdminUsersPage = lazy(() => import('./pages/admin/AdminUsersPage').then((m) => ({ default: m.AdminUsersPage })));
const AdminProgramsPage = lazy(() => import('./pages/admin/AdminProgramsPage').then((m) => ({ default: m.AdminProgramsPage })));
const AdminFacultiesPage = lazy(() => import('./pages/admin/AdminFacultiesPage').then((m) => ({ default: m.AdminFacultiesPage })));
const AdminApplicationsPage = lazy(() => import('./pages/admin/AdminApplicationsPage').then((m) => ({ default: m.AdminApplicationsPage })));
const AdminAppointmentsPage = lazy(() => import('./pages/admin/AdminAppointmentsPage').then((m) => ({ default: m.AdminAppointmentsPage })));
const AdminNewsPage = lazy(() => import('./pages/admin/AdminNewsPage').then((m) => ({ default: m.AdminNewsPage })));
const AdminLibraryPage = lazy(() => import('./pages/admin/AdminLibraryPage').then((m) => ({ default: m.AdminLibraryPage })));
const AdminResearchPage = lazy(() => import('./pages/admin/AdminResearchPage').then((m) => ({ default: m.AdminResearchPage })));
const AdminSettingsPage = lazy(() => import('./pages/admin/AdminSettingsPage').then((m) => ({ default: m.AdminSettingsPage })));
const AdminContactPage = lazy(() => import('./pages/admin/AdminContactPage').then((m) => ({ default: m.AdminContactPage })));
const AdminAdvisoryPage = lazy(() => import('./pages/admin/AdminAdvisoryPage').then((m) => ({ default: m.AdminAdvisoryPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

const RequireAuth: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <LoadingState />;
  if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  return children;
};

const RequireRole: React.FC<{ children: React.ReactElement; roles: string[] }> = ({ children, roles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <LoadingState />;
  if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  if (!roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
};

const Shell: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const routeParts = location.pathname.split('/').filter(Boolean);
  const routeParam = routeParts[1] || '';

  const [lang, setLang] = React.useState<Language>('fr');
  const [isApplyModalOpen, setIsApplyModalOpen] = React.useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = React.useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = React.useState(false);
  const [isCabinetModalOpen, setIsCabinetModalOpen] = React.useState(false);
  const [preselectedProgram, setPreselectedProgram] = React.useState('');

  const handleNavigate = (page: PageId, sectionId?: string, routeParams?: Record<string, string>) => {
    const path = pageToPath(page, routeParams);
    navigate(path);
    if (page === 'universite' && sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleApplyForProgram = (programTitle: string) => {
    setPreselectedProgram(programTitle);
    setIsApplyModalOpen(true);
  };

  const handleSuccessLogin = (_persona: 'student' | 'faculty') => {
    const from = (location.state as { from?: string })?.from;
    if (from) navigate(from);
    else if (user?.role === 'teacher') navigate('/espace-enseignant');
    else if (['admin', 'super_admin'].includes(user?.role ?? '')) navigate('/admin');
    else navigate('/espace-etudiant');
  };

  const renderCurrentPage = () => {
    const commonProps = { lang, onNavigate: handleNavigate };
    switch (location.pathname.split('/')[1]) {
      case '':
        return <HomePage {...commonProps} onOpenApply={() => setIsApplyModalOpen(true)} onOpenSearch={() => handleNavigate('formations')} onOpenConsulting={() => setIsCabinetModalOpen(true)} onApplyForProgram={handleApplyForProgram} />;

      case 'universite': {
        const uniModalProps = {
          onOpenApply: () => { setPreselectedProgram(''); setIsApplyModalOpen(true); },
          onOpenAppointment: () => setIsAppointmentModalOpen(true),
          onOpenWhatsApp: () => setIsWhatsAppModalOpen(true),
        };
        if (routeParam === 'mot-du-president' || routeParam === 'mot-president') {
          return <UniversityMotPresidentPage {...commonProps} {...uniModalProps} />;
        }
        if (routeParam === 'vision-et-valeurs' || routeParam === 'vision') {
          return <UniversityVisionPage {...commonProps} {...uniModalProps} />;
        }
        if (routeParam === 'modele-min' || routeParam === 'min') {
          return <UniversityMinPage {...commonProps} {...uniModalProps} />;
        }
        if (routeParam === 'histoire-et-jalons' || routeParam === 'histoire') {
          return <UniversityHistoirePage {...commonProps} {...uniModalProps} />;
        }
        if (routeParam === 'gouvernance') {
          return <UniversityGouvernancePage {...commonProps} {...uniModalProps} />;
        }
        if (routeParam === 'agrements-et-partenaires' || routeParam === 'agrements' || routeParam === 'reconnaissances') {
          return <UniversityReconnaissancesPage {...commonProps} {...uniModalProps} />;
        }
        return <UniversityPresentationPage {...commonProps} {...uniModalProps} />;
      }
      case 'facultes':
        if (routeParam) return <FacultyDetailPage {...commonProps} facultyId={routeParam} onApplyForProgram={handleApplyForProgram} />;
        return <FacultiesPage {...commonProps} onApplyForProgram={handleApplyForProgram} />;
      case 'admissions':
        return <AdmissionsPage {...commonProps} onOpenApply={() => setIsApplyModalOpen(true)} onOpenAppointment={() => setIsAppointmentModalOpen(true)} />;
      case 'formations':
        if (routeParam) return <FormationDetailPage {...commonProps} programId={routeParam} onApplyForProgram={handleApplyForProgram} />;
        return <FormationsPage {...commonProps} onApplyForProgram={handleApplyForProgram} />;
      case 'campus-virtuel':
        return (
          <RequireAuth>
            {user?.role === 'teacher' ? <TeacherSpacePage {...commonProps} /> :
              ['admin', 'super_admin'].includes(user?.role ?? '') ? <AdminPage {...commonProps} /> :
              <CampusVirtuelPage {...commonProps} />}
          </RequireAuth>
        );
      case 'bibliotheque':
        return <BibliothequePage {...commonProps} />;
      case 'cabinet':
        return <CabinetPage {...commonProps} onOpenConsulting={() => setIsCabinetModalOpen(true)} />;
      case 'mere-nature':
        return <MereNaturePage {...commonProps} />;
      case 'recherches':
        return <RecherchesPage {...commonProps} />;
      case 'actualites':
        if (routeParam) return <ArticleDetailPage {...commonProps} articleId={routeParam} />;
        return <ActualitesPage {...commonProps} />;
      case 'carrieres':
        return <CareerPage {...commonProps} />;
      case 'contacts':
        return <ContactsPage {...commonProps} onOpenAppointment={() => setIsAppointmentModalOpen(true)} onOpenWhatsApp={() => setIsWhatsAppModalOpen(true)} />;
      case 'login':
        return <LoginPage onSuccessLogin={handleSuccessLogin} />;
      case 'register':
        return <RegisterPage onSuccessLogin={handleSuccessLogin} />;
      case 'forgot-password':
        return <ForgotPasswordPage />;
      case 'reset-password':
        return <ResetPasswordPage />;
      case 'verify-email':
        return <VerifyEmailPage lang={lang} onNavigate={handleNavigate} />;
      case 'espace-etudiant':
        return (
          <RequireAuth>
            {routeParam === 'cours' ? <StudentCoursesPage {...commonProps} /> :
              routeParam === 'devoirs' ? <StudentAssignmentsPage {...commonProps} /> :
              routeParam === 'notes' ? <StudentGradesPage {...commonProps} /> :
              routeParam === 'diplomes' ? <StudentDiplomasPage {...commonProps} /> :
              routeParam === 'messages' ? <StudentMessagesPage {...commonProps} /> :
              routeParam === 'forum' ? <StudentForumPage {...commonProps} /> :
              routeParam === '' ? <StudentSpacePage {...commonProps} /> :
              <Navigate to="/espace-etudiant" replace />}
          </RequireAuth>
        );
      case 'espace-enseignant':
        return (
          <RequireRole roles={['teacher']}>
            {routeParam === 'cours' ? <TeacherCoursesPage {...commonProps} /> :
              routeParam === 'devoirs' ? <TeacherAssignmentsPage {...commonProps} /> :
              routeParam === 'notes' ? <TeacherGradesPage {...commonProps} /> :
              routeParam === '' ? <TeacherSpacePage {...commonProps} /> :
              <Navigate to="/espace-enseignant" replace />}
          </RequireRole>
        );
      case 'admin':
        return (
          <RequireRole roles={['admin', 'super_admin']}>
            {routeParam === 'utilisateurs' ? <AdminUsersPage {...commonProps} /> :
              routeParam === 'formations' ? <AdminProgramsPage {...commonProps} /> :
              routeParam === 'facultes' ? <AdminFacultiesPage {...commonProps} /> :
              routeParam === 'candidatures' ? <AdminApplicationsPage {...commonProps} /> :
              routeParam === 'rendez-vous' ? <AdminAppointmentsPage {...commonProps} /> :
              routeParam === 'actualites' ? <AdminNewsPage {...commonProps} /> :
              routeParam === 'bibliotheque' ? <AdminLibraryPage {...commonProps} /> :
              routeParam === 'recherches' ? <AdminResearchPage {...commonProps} /> :
              routeParam === 'parametres' ? <AdminSettingsPage {...commonProps} /> :
              routeParam === 'contacts' ? <AdminContactPage {...commonProps} /> :
              routeParam === 'advisory' ? <AdminAdvisoryPage {...commonProps} /> :
              routeParam === '' ? <AdminPage {...commonProps} /> :
              <Navigate to="/admin" replace />}
          </RequireRole>
        );
      default:
        return <NotFoundPage {...commonProps} />;
    }
  };

  const isAdminOrStudent = ['/admin', '/espace-etudiant', '/espace-enseignant'].some((p) => location.pathname.startsWith(p));

  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col font-sans">
      <Navbar

        currentPage={location.pathname}
        onNavigate={handleNavigate}
        lang={lang}
        onLanguageChange={setLang}
        user={user}
        onLogout={logout}
        onOpenApply={() => { setPreselectedProgram(''); setIsApplyModalOpen(true); }}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onOpenAppointment={() => setIsAppointmentModalOpen(true)}
        onOpenWhatsApp={() => setIsWhatsAppModalOpen(true)}
      />

      <main className={isAdminOrStudent ? 'app-main flex-1' : 'app-main flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4'}>
        <Suspense fallback={<LoadingState />}>{renderCurrentPage()}</Suspense>
      </main>

      {!isAdminOrStudent && (
        <Footer
          lang={lang}
          onNavigate={handleNavigate}
          onOpenApply={() => { setPreselectedProgram(''); setIsApplyModalOpen(true); }}
          onOpenAppointment={() => setIsAppointmentModalOpen(true)}
        />
      )}

      <ApplicationModal isOpen={isApplyModalOpen} onClose={() => setIsApplyModalOpen(false)} lang={lang} preselectedProgram={preselectedProgram} />
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} lang={lang} onSuccessLogin={handleSuccessLogin} />
      <AppointmentModal isOpen={isAppointmentModalOpen} onClose={() => setIsAppointmentModalOpen(false)} lang={lang} />
      <WhatsAppModal isOpen={isWhatsAppModalOpen} onClose={() => setIsWhatsAppModalOpen(false)} lang={lang} />
      <CabinetQuoteModal isOpen={isCabinetModalOpen} onClose={() => setIsCabinetModalOpen(false)} lang={lang} />
    </div>
  );
};

export const App: React.FC = () => (
  <BrowserRouter>
    <AuthProvider>
      <Shell />
    </AuthProvider>
  </BrowserRouter>
);

export default App;

