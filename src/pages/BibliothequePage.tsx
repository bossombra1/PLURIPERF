import React, { useState, useMemo } from 'react';
import { Language, LibraryItem } from '../types';
import { LIBRARY_DATA } from '../data/universityData';
import {
  BookOpen,
  FileText,
  FileSpreadsheet,
  Headphones,
  Video,
  Globe2,
  ShieldCheck,
  Search,
  Download,
  Eye,
  CheckCircle,
  X,
} from 'lucide-react';

interface BibliothequePageProps {
  lang: Language;
}

export const BibliothequePage: React.FC<BibliothequePageProps> = ({ lang }) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [readingItem, setReadingItem] = useState<LibraryItem | null>(null);

  const filterTabs = [
    { id: 'all', labelFr: 'Tous les fonds', labelEn: 'All collections', icon: BookOpen },
    { id: 'livre', labelFr: 'Livres', labelEn: 'Books', icon: BookOpen },
    { id: 'article', labelFr: 'Articles', labelEn: 'Articles', icon: FileText },
    { id: 'revue', labelFr: 'Revues', labelEn: 'Journals', icon: FileSpreadsheet },
    { id: 'podcast', labelFr: 'Podcasts', labelEn: 'Podcasts', icon: Headphones },
    { id: 'video', labelFr: 'Vidéos', labelEn: 'Videos', icon: Video },
    { id: 'rapport_onu', labelFr: 'Rapports ONU', labelEn: 'UN Reports', icon: Globe2 },
    { id: 'norme_iso', labelFr: 'Normes ISO', labelEn: 'ISO Norms', icon: ShieldCheck },
  ] as const;

  const filteredItems = useMemo(() => {
    return LIBRARY_DATA.filter((item) => {
      const matchType = filterType === 'all' || item.type === filterType;
      const matchSearch =
        searchQuery === '' ||
        item.titleFr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchType && matchSearch;
    });
  }, [filterType, searchQuery]);

  return (
    <div className="space-y-10 pb-16">
      {/* Header from Slide 11 */}
      <section className="border-b border-slate-200 pb-8 pt-4">
        <div className="max-w-3xl space-y-3">
          <div className="text-xs uppercase tracking-widest font-semibold text-amber-600">
            {lang === 'fr' ? 'Ressources Académiques Libres' : 'Open Academic Repository'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-slate-900 font-bold">
            {lang === 'fr' ? 'Bibliothèque Numérique' : 'Digital Library'}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {lang === 'fr'
              ? 'Accès ouvert à plus de 25 000 ouvrages, articles scientifiques peer-reviewed, normes ISO et rapports climatiques officiels de l’ONU.'
              : 'Open institutional repository indexing over 25,000 volumes, peer-reviewed articles, ISO guidelines, and official UN environmental publications.'}
          </p>
        </div>
      </section>

      {/* Filter and search toolbar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Functional filter tabs conforming to zero-pill rules */}
          <div className="flex items-center gap-1 overflow-x-auto p-1 bg-slate-100 rounded-xl text-xs">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterType(tab.id)}
                className={`px-3 py-1.5 font-medium rounded-lg transition-colors whitespace-nowrap ${
                  filterType === tab.id
                    ? 'bg-white text-slate-900 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'fr' ? tab.labelFr : tab.labelEn}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === 'fr'
                  ? 'Rechercher un livre, auteur...'
                  : 'Search title, author...'
              }
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Grid of Library Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                <span className="font-semibold uppercase tracking-wider text-amber-600">
                  {lang === 'fr' ? item.categoryFr : item.categoryEn}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono">{item.year}</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-400">{item.fileSizeOrDuration}</span>
              </div>

              <h3 className="text-base font-serif font-bold text-slate-900 leading-snug">
                {lang === 'fr' ? item.titleFr : item.titleEn}
              </h3>

              <p className="text-xs text-slate-600">
                {lang === 'fr' ? 'Auteur / Source :' : 'Author / Source :'}{' '}
                <span className="font-medium text-slate-800">{item.author}</span>
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
              <span className="text-slate-400 font-mono text-[11px]">
                {item.downloadsCount.toLocaleString()} {lang === 'fr' ? 'consultations' : 'views'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setReadingItem(item)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-medium flex items-center gap-1 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{lang === 'fr' ? 'Consulter' : 'Preview'}</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    alert(
                      lang === 'fr'
                        ? `Téléchargement lancé pour : ${item.titleFr}`
                        : `Download initiated for: ${item.titleEn}`,
                    )
                  }
                  className="px-3 py-1.5 bg-slate-900 hover:bg-amber-600 text-white rounded-lg font-medium flex items-center gap-1 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Document Reader Preview Modal */}
      {readingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[85vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setReadingItem(null)}
              className="absolute right-5 top-5 p-1 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-slate-100 pb-4 mb-4">
              <span className="text-xs uppercase font-semibold text-amber-600">
                {lang === 'fr' ? readingItem.categoryFr : readingItem.categoryEn}
              </span>
              <h3 className="text-xl font-serif font-bold text-slate-900 mt-1">
                {lang === 'fr' ? readingItem.titleFr : readingItem.titleEn}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {readingItem.author} · {readingItem.year} · {readingItem.fileSizeOrDuration}
              </p>
            </div>

            <div className="py-4 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-serif">
              <p className="first-letter:text-4xl first-letter:font-bold first-letter:mr-2 first-letter:float-left first-letter:text-amber-600">
                {lang === 'fr'
                  ? 'Ce document fait partie intégrante du corpus académique ouvert de PLURIPERF International University. Il analyse les leviers fondamentaux de la transition écologique, de la résilience systémique et de l’intégration des limites planétaires au sein des prises de décision stratégiques.'
                  : 'This publication is part of the open academic repository of PLURIPERF International University. It details foundational frameworks for systemic ecological transition and multi-capital organizational accounting.'}
              </p>
              <p>
                {lang === 'fr'
                  ? 'Les données quantitatives présentées dans ce rapport sont validées par le Comité Scientifique d’Orientation et conformes aux protocoles internationaux du GIEC et des normes ISO 14001/26000.'
                  : 'Quantitative indices presented here are audited under international IPCC and ISO standards for regenerative resilience.'}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-emerald-600 flex items-center gap-1 font-medium">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Licence Open Access PLURIPERF</span>
              </span>
              <button
                type="button"
                onClick={() => setReadingItem(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold"
              >
                {lang === 'fr' ? 'Fermer la liseuse' : 'Close reader'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
