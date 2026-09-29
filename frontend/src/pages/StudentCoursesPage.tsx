import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';
import { Logo } from '../components/Logo';
import { Alert, AlertDescription } from '../components/ui/alert';
import { BookOpen, ArrowLeft, Loader2 } from 'lucide-react';

type Course = { id:number; code:string; title_fr:string; title_en:string; ects:number; semester:string; program:string; progress:number; grade:number|null };

export const StudentCoursesPage: React.FC<{ lang?: 'fr' | 'en' }> = ({ lang='fr' }) => {
 const { user }=useAuth(); const [courses,setCourses]=useState<Course[]>([]); const [loading,setLoading]=useState(true); const [error,setError]=useState('');
 useEffect(()=>{ if(!user)return; api.get<Course[]>('/student/courses').then(setCourses).catch(e=>setError(e.message||'Erreur de chargement')).finally(()=>setLoading(false)); },[user]);
 if(!user)return <div className="min-h-[70vh] flex items-center justify-center py-12 px-4"><Alert variant="destructive" className="max-w-md"><AlertDescription>Authentification requise.</AlertDescription></Alert></div>;
 return <div className="min-h-[70vh] py-12 px-4"><div className="max-w-4xl mx-auto space-y-8">
  <div className="flex items-center justify-between"><div className="space-y-2"><Link to="/espace-etudiant" className="text-sm text-primary hover:text-primary-hover flex items-center gap-1"><ArrowLeft className="h-4 w-4"/>Retour au tableau de bord</Link><h1 className="text-3xl font-bold text-text-primary">Mes cours</h1></div><Logo variant="emblem-only" size="sm"/></div>
  {loading?<div className="p-8 bg-surface border border-border-subtle rounded-[calc(var(--radius)+4px)] text-center"><Loader2 className="h-8 w-8 animate-spin text-primary mx-auto"/></div>:error?<Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>:courses.length===0?<div className="p-8 bg-surface border border-border-subtle rounded-[calc(var(--radius)+4px)] text-center"><BookOpen className="h-12 w-12 text-text-muted mx-auto mb-4"/><p className="text-text-muted">Aucun cours pour le moment.</p></div>:<div className="grid grid-cols-1 md:grid-cols-2 gap-4">{courses.map(c=><div key={c.id} className="p-6 bg-surface border border-border-subtle rounded-[calc(var(--radius)+4px)] space-y-4"><div><span className="text-sm font-semibold text-primary">{c.code}</span><h2 className="font-semibold text-text-primary">{lang==='fr'?c.title_fr:c.title_en}</h2><p className="text-sm text-text-muted">{c.program} · {c.ects} ECTS · {c.semester}</p></div><div><div className="flex justify-between text-xs text-text-muted mb-1"><span>Progression</span><span>{c.progress}%</span></div><div className="h-2 bg-surface-muted rounded-full overflow-hidden"><div className="h-full bg-primary" style={{width:`${c.progress}%`}}/></div></div>{c.grade!==null&&<p className="text-sm font-semibold text-text-primary">Note : {c.grade}/20</p>}</div>)}</div>}
 </div></div>;
};