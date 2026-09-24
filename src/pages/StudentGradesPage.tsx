import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';
import { Logo } from '../components/Logo';
import { Alert, AlertDescription } from '../components/ui/alert';
import { GraduationCap, ArrowLeft, Loader2 } from 'lucide-react';

type Row={code:string;title_fr:string;title_en:string;ects:number;grade:number|null};
export const StudentGradesPage: React.FC<{lang?:'fr'|'en'}>=({lang='fr'})=>{
 const {user}=useAuth(); const [data,setData]=useState<{rows:Row[];ectsTotal:number;average:number|null}>({rows:[],ectsTotal:0,average:null}); const [loading,setLoading]=useState(true); const [error,setError]=useState('');
 useEffect(()=>{if(!user)return;api.get<typeof data>('/student/grades').then(setData).catch(e=>setError(e.message||'Erreur de chargement')).finally(()=>setLoading(false));},[user]);
 if(!user)return <div className="min-h-[70vh] flex items-center justify-center py-12 px-4"><Alert variant="destructive" className="max-w-md"><AlertDescription>Authentification requise.</AlertDescription></Alert></div>;
 return <div className="min-h-[70vh] py-12 px-4"><div className="max-w-4xl mx-auto space-y-8"><div className="flex items-center justify-between"><div className="space-y-2"><Link to="/espace-etudiant" className="text-sm text-primary hover:text-primary-hover flex items-center gap-1"><ArrowLeft className="h-4 w-4"/>Retour au tableau de bord</Link><h1 className="text-3xl font-bold text-text-primary">Notes</h1></div><Logo variant="emblem-only" size="sm"/></div>
 {loading?<div className="p-8 text-center"><Loader2 className="h-8 w-8 animate-spin text-primary mx-auto"/></div>:error?<Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>:<div className="space-y-4"><div className="grid grid-cols-2 gap-4"><div className="p-5 bg-surface border border-border-subtle rounded-[calc(var(--radius)+4px)]"><span className="text-sm text-text-muted">Moyenne</span><div className="text-2xl font-bold text-text-primary">{data.average??'—'}/20</div></div><div className="p-5 bg-surface border border-border-subtle rounded-[calc(var(--radius)+4px)]"><span className="text-sm text-text-muted">ECTS</span><div className="text-2xl font-bold text-text-primary">{data.ectsTotal}</div></div></div><div className="bg-surface border border-border-subtle rounded-[calc(var(--radius)+4px)] overflow-hidden"><table className="w-full text-sm"><thead className="bg-surface-muted"><tr><th className="p-4 text-left">Code</th><th className="p-4 text-left">Cours</th><th className="p-4 text-left">ECTS</th><th className="p-4 text-left">Note</th></tr></thead><tbody>{data.rows.map(r=><tr key={r.code} className="border-t border-border-subtle"><td className="p-4 font-medium">{r.code}</td><td className="p-4">{lang==='fr'?r.title_fr:r.title_en}</td><td className="p-4">{r.ects}</td><td className="p-4 font-semibold">{r.grade??'—'}</td></tr>)}</tbody></table></div></div>}
 </div></div>;
};