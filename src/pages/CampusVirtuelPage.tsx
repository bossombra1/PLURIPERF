import React, { useState } from 'react';
import { Language, PageId } from '../types';
import { VIRTUAL_CAMPUS_STUDENT } from '../data/universityData';
import {
  LayoutDashboard,
  BookOpen,
  Video,
  FileCheck,
  ClipboardList,
  Library,
  GraduationCap,
  Award,
  Mail,
  MessagesSquare,
  Search,
  CheckCircle,
  Download,
  Send,
  Play,
  Clock,
  User,
} from 'lucide-react';

interface CampusVirtuelPageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  activePersona?: 'student' | 'faculty';
}

export const CampusVirtuelPage: React.FC<CampusVirtuelPageProps> = ({
  lang,
  onNavigate,
  activePersona = 'student',
}) => {
  const [activeSubTab, setActiveSubTab] = useState<
    | 'tableau_de_bord'
    | 'cours'
    | 'videos'
    | 'examens'
    | 'devoirs'
    | 'bibliotheque'
    | 'notes'
    | 'diplomes'
    | 'messagerie'
    | 'forum'
  >('tableau_de_bord');

  const [forumPosts, setForumPosts] = useState(VIRTUAL_CAMPUS_STUDENT.forumTopics);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [messagesList, setMessagesList] = useState(VIRTUAL_CAMPUS_STUDENT.messages);
  const [activeMessageIndex, setActiveMessageIndex] = useState(0);
  const [replyText, setReplyText] = useState('');
  const [submittedAssignment, setSubmittedAssignment] = useState(false);

  const student = VIRTUAL_CAMPUS_STUDENT;

  const subTabs = [
    { id: 'tableau_de_bord', labelFr: 'Tableau de bord', labelEn: 'Dashboard', icon: LayoutDashboard },
    { id: 'cours', labelFr: 'Cours', labelEn: 'Courses', icon: BookOpen },
    { id: 'videos', labelFr: 'Vidéos', labelEn: 'Lectures / Videos', icon: Video },
    { id: 'examens', labelFr: 'Examens', labelEn: 'Exams', icon: FileCheck },
    { id: 'devoirs', labelFr: 'Devoirs', labelEn: 'Assignments', icon: ClipboardList },
    { id: 'bibliotheque', labelFr: 'Bibliothèque', labelEn: 'Library Portal', icon: Library },
    { id: 'notes', labelFr: 'Notes', labelEn: 'Grades & ECTS', icon: GraduationCap },
    { id: 'diplomes', labelFr: 'Diplômes', labelEn: 'Diplomas & Certs', icon: Award },
    { id: 'messagerie', labelFr: 'Messagerie', labelEn: 'Messaging', icon: Mail },
    { id: 'forum', labelFr: 'Forum', labelEn: 'Community Forum', icon: MessagesSquare },
  ] as const;

  const handlePostForum = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicTitle.trim()) return;
    setForumPosts([
      {
        title: newTopicTitle,
        author: student.name + ' (Vous)',
        replies: 0,
        lastActive: 'À l’instant',
      },
      ...forumPosts,
    ]);
    setNewTopicTitle('');
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setReplyText('');
    alert(lang === 'fr' ? 'Message envoyé avec succès.' : 'Message sent successfully.');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header bar from Slide 10 */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs uppercase font-semibold tracking-wider text-amber-400">
              {lang === 'fr' ? 'Campus Virtuel · Espace Numérique' : 'Virtual Campus · Digital Space'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              {lang === 'fr' ? 'Campus Numérique PLURIPERF' : 'PLURIPERF Digital Campus'}
            </h1>
            <p className="text-xs text-slate-300">
              {lang === 'fr'
                ? "Chaque étudiant dispose d'un espace personnel."
                : 'Every student has a dedicated personal learning workspace.'}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-800/90 p-3 rounded-xl border border-slate-700/80">
            <div className="w-10 h-10 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-sm shadow">
              SA
            </div>
            <div className="text-xs">
              <span className="font-semibold text-white block">{student.name}</span>
              <span className="text-slate-400 block font-mono text-[11px]">{student.matricule}</span>
              <span className="text-emerald-400 text-[10px] font-medium block">
                {lang === 'fr' ? '● Session active' : '● Active Session'}
              </span>
            </div>
          </div>
        </div>

        {/* 10 Subtabs navigation bar from Slide 10 */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-1 overflow-x-auto pb-1 text-xs">
          {subTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveSubTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{lang === 'fr' ? tab.labelFr : tab.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Tab Content */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        {/* 1. Tableau de bord */}
        {activeSubTab === 'tableau_de_bord' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-serif font-bold text-slate-900">
                  {lang === 'fr' ? 'Tableau de bord de l’étudiant' : 'Student Learning Dashboard'}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {lang === 'fr' ? student.programFr : student.programEn}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">{lang === 'fr' ? 'Crédits acquis' : 'Credits'}</span>
                <span className="font-mono text-sm font-bold text-amber-600">
                  {student.completedCredits} / {student.totalCredits} ECTS
                </span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-xs text-slate-500 block mb-1">
                  {lang === 'fr' ? 'Moyenne générale (GPA)' : 'Cumulative GPA'}
                </span>
                <span className="text-lg font-bold font-mono text-slate-900">{student.gpa}</span>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-xs text-slate-500 block mb-1">
                  {lang === 'fr' ? 'Cours actifs ce semestre' : 'Active Courses'}
                </span>
                <span className="text-lg font-bold font-mono text-emerald-600">3 modules</span>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-xs text-slate-500 block mb-1">
                  {lang === 'fr' ? 'Prochaine session en direct' : 'Next Live Class'}
                </span>
                <span className="text-xs font-semibold text-amber-700">Demain 10:00 GMT (MIN-601)</span>
              </div>
            </div>

            {/* Active modules */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {lang === 'fr' ? 'Progression des cours suivis' : 'Enrolled Course Progress'}
              </h3>
              <div className="space-y-3">
                {student.activeCourses.map((c) => (
                  <div key={c.code} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                      <span className="font-bold text-slate-900">
                        {c.code} - {lang === 'fr' ? c.titleFr : c.titleEn}
                      </span>
                      <span className="text-slate-500">{c.professor}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-amber-600 h-2 rounded-full transition-all"
                          style={{ width: `${c.progress}%` }}
                        />
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-700">{c.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. Cours */}
        {activeSubTab === 'cours' && (
          <div className="space-y-6">
            <h2 className="text-xl font-serif font-bold text-slate-900">
              {lang === 'fr' ? 'Mes Cours & Supports Pédagogiques' : 'Enrolled Courses & Syllabi'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {student.activeCourses.map((course) => (
                <div key={course.code} className="p-5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="font-mono text-xs font-bold text-amber-600">{course.code}</span>
                    <h3 className="font-semibold text-slate-900 text-sm">
                      {lang === 'fr' ? course.titleFr : course.titleEn}
                    </h3>
                    <p className="text-xs text-slate-500">Enseignant : {course.professor}</p>
                  </div>
                  <div className="space-y-2 pt-2 border-t border-slate-200 text-xs">
                    <span className="text-slate-600 block">Prochaine séance : {course.nextClass}</span>
                    <button
                      type="button"
                      onClick={() => setActiveSubTab('videos')}
                      className="w-full py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium"
                    >
                      {lang === 'fr' ? 'Accéder à la classe' : 'Enter Classroom'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Vidéos */}
        {activeSubTab === 'videos' && (
          <div className="space-y-6">
            <h2 className="text-xl font-serif font-bold text-slate-900">
              {lang === 'fr' ? 'Conférences & Vidéos Magistrales' : 'Video Lectures & Masterclasses'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-950 text-white p-4 space-y-3">
                <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center relative group cursor-pointer">
                  <Play className="w-12 h-12 text-amber-500 group-hover:scale-110 transition-transform" />
                  <span className="absolute bottom-2 right-2 text-[10px] bg-black/80 px-2 py-0.5 rounded font-mono">52:14</span>
                </div>
                <h4 className="font-semibold text-sm">MIN-601 : Invariants thermodynamiques du Vivant</h4>
                <p className="text-xs text-slate-400">Pr. Koffi Emmanuel N’Guessan · HD 1080p</p>
              </div>

              <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-950 text-white p-4 space-y-3">
                <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center relative group cursor-pointer">
                  <Play className="w-12 h-12 text-amber-500 group-hover:scale-110 transition-transform" />
                  <span className="absolute bottom-2 right-2 text-[10px] bg-black/80 px-2 py-0.5 rounded font-mono">1:14:02</span>
                </div>
                <h4 className="font-semibold text-sm">ESG-604 : Déployer la taxonomie européenne et la CSRD</h4>
                <p className="text-xs text-slate-400">Dr. Sophie Vandamme · Masterclass Exécutive</p>
              </div>
            </div>
          </div>
        )}

        {/* 4. Examens */}
        {activeSubTab === 'examens' && (
          <div className="space-y-6">
            <h2 className="text-xl font-serif font-bold text-slate-900">
              {lang === 'fr' ? 'Calendrier des Examens & Évaluations' : 'Exams & Assessment Schedule'}
            </h2>
            <div className="space-y-3">
              {student.upcomingExams.map((exam, i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
                  <div className="space-y-1 text-xs">
                    <span className="font-bold text-slate-900 text-sm block">{exam.subject}</span>
                    <span className="text-slate-500">{exam.date} · {exam.time}</span>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-md font-semibold text-xs">
                    {exam.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Devoirs */}
        {activeSubTab === 'devoirs' && (
          <div className="space-y-6">
            <h2 className="text-xl font-serif font-bold text-slate-900">
              {lang === 'fr' ? 'Dépôt des Devoirs & Travaux Dirigés' : 'Assignment Submissions & Projects'}
            </h2>
            <div className="space-y-3">
              {student.assignments.map((ass, i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
                  <div className="space-y-1 text-xs">
                    <span className="font-bold text-slate-900 text-sm block">{ass.title}</span>
                    <span className="text-slate-500">{ass.course} · Échéance : {ass.due}</span>
                  </div>
                  <div>
                    {ass.status.includes('Noté') ? (
                      <span className="text-emerald-700 font-bold text-xs bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                        {ass.status}
                      </span>
                    ) : submittedAssignment ? (
                      <span className="text-emerald-600 font-semibold text-xs flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        {lang === 'fr' ? 'Déposé' : 'Submitted'}
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setSubmittedAssignment(true);
                          alert(lang === 'fr' ? 'Devoir téléversé avec succès !' : 'Assignment submitted successfully!');
                        }}
                        className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded text-xs font-medium"
                      >
                        {lang === 'fr' ? 'Déposer mon travail' : 'Submit File'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. Bibliothèque */}
        {activeSubTab === 'bibliotheque' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-serif font-bold text-slate-900">
                {lang === 'fr' ? 'Accès Rapide Bibliothèque Étudiant' : 'Student Library Access'}
              </h2>
              <button
                type="button"
                onClick={() => onNavigate('bibliotheque')}
                className="text-xs text-amber-600 font-semibold hover:underline"
              >
                {lang === 'fr' ? 'Ouvrir le catalogue complet' : 'Open full library catalog'}
              </button>
            </div>
            <p className="text-xs text-slate-600">
              {lang === 'fr'
                ? 'Tous vos manuels de cours, les rapports du GIEC et les normes ISO sont inclus dans vos droits universitaires.'
                : 'All course textbooks, IPCC reports, and ISO standards are included with your student credentials.'}
            </p>
          </div>
        )}

        {/* 7. Notes */}
        {activeSubTab === 'notes' && (
          <div className="space-y-6">
            <h2 className="text-xl font-serif font-bold text-slate-900">
              {lang === 'fr' ? 'Relevé de Notes Officiel & Crédits ECTS' : 'Official Transcript & ECTS Credits'}
            </h2>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Code</th>
                    <th className="p-3">Intitulé du Module</th>
                    <th className="p-3">Note</th>
                    <th className="p-3">ECTS</th>
                    <th className="p-3">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {student.grades.map((g) => (
                    <tr key={g.code} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-medium">{g.code}</td>
                      <td className="p-3 font-semibold text-slate-900">{g.title}</td>
                      <td className="p-3 font-bold text-amber-600">{g.grade}</td>
                      <td className="p-3 font-mono">{g.ects}</td>
                      <td className="p-3">
                        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-medium">
                          {g.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 8. Diplômes */}
        {activeSubTab === 'diplomes' && (
          <div className="space-y-6">
            <h2 className="text-xl font-serif font-bold text-slate-900">
              {lang === 'fr' ? 'Certificats & Diplômes Dématérialisés' : 'Verifiable Diplomas & Certificates'}
            </h2>
            <div className="p-6 border border-amber-300 bg-amber-50/40 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-amber-600" />
                  <div>
                    <span className="font-semibold text-slate-900 text-sm block">
                      Certificat Exécutif : Audit Carbone & Norme ISO 14001
                    </span>
                    <span className="text-xs text-slate-500">Délivré par PLURIPERF International University · 2025</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => alert(lang === 'fr' ? 'Téléchargement du diplôme certifié...' : 'Downloading certified diploma...')}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF Certifié</span>
                </button>
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                Signature cryptographique : SHA256: 7f8a9b2c... · Validé conforme
              </div>
            </div>
          </div>
        )}

        {/* 9. Messagerie */}
        {activeSubTab === 'messagerie' && (
          <div className="space-y-6">
            <h2 className="text-xl font-serif font-bold text-slate-900">
              {lang === 'fr' ? 'Messagerie Interne Étudiant / Professeur' : 'Internal Academic Messaging'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2 border-r border-slate-100 pr-2">
                {messagesList.map((msg, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveMessageIndex(idx)}
                    className={`w-full text-left p-3 rounded-lg text-xs space-y-1 transition-colors ${
                      activeMessageIndex === idx
                        ? 'bg-slate-100 text-slate-900 font-semibold'
                        : 'hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <div className="flex justify-between">
                      <span className="font-bold">{msg.from}</span>
                      <span className="text-[10px] text-slate-400">{msg.date}</span>
                    </div>
                    <p className="truncate text-slate-500">{msg.subject}</p>
                  </button>
                ))}
              </div>

              <div className="md:col-span-2 space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl space-y-2 text-xs">
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="font-bold text-slate-900">
                      {messagesList[activeMessageIndex].from}
                    </span>
                    <span className="text-slate-400">
                      {messagesList[activeMessageIndex].date}
                    </span>
                  </div>
                  <h4 className="font-semibold text-slate-800">
                    {messagesList[activeMessageIndex].subject}
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    Bonjour Sarah, j’ai bien pris connaissance de votre projet sur la modélisation bio-inspirée des corridors écologiques. Votre proposition est validée avec mention.
                  </p>
                </div>

                <form onSubmit={handleSendReply} className="flex gap-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={lang === 'fr' ? 'Écrire une réponse...' : 'Write a reply...'}
                    className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 text-white text-xs rounded-lg hover:bg-slate-800 flex items-center gap-1"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{lang === 'fr' ? 'Envoyer' : 'Send'}</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* 10. Forum */}
        {activeSubTab === 'forum' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-serif font-bold text-slate-900">
                {lang === 'fr' ? 'Forum & Communauté des Étudiants' : 'Community Discussion Board'}
              </h2>
            </div>

            <form onSubmit={handlePostForum} className="flex gap-2">
              <input
                type="text"
                value={newTopicTitle}
                onChange={(e) => setNewTopicTitle(e.target.value)}
                placeholder={
                  lang === 'fr'
                    ? 'Poser une question ou lancer un débat au forum...'
                    : 'Start a debate or ask a question to the forum...'
                }
                className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-medium rounded-lg"
              >
                {lang === 'fr' ? 'Publier' : 'Post'}
              </button>
            </form>

            <div className="space-y-3">
              {forumPosts.map((topic, i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between gap-4">
                  <div className="space-y-1 text-xs">
                    <span className="font-semibold text-slate-900 block text-sm">{topic.title}</span>
                    <span className="text-slate-500">Par {topic.author} · {topic.lastActive}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-white px-3 py-1.5 rounded-md border border-slate-200 font-mono">
                    <MessagesSquare className="w-3.5 h-3.5 text-amber-600" />
                    <span>{topic.replies}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
