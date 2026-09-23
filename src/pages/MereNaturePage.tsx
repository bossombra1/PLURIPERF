import React, { useState } from 'react';
import { Language, PageId } from '../types';
import { MERE_NATURE_INITIATIVE, GREEN_PRODUCTS } from '../data/universityData';
import { UNIVERSITY_ASSETS } from '../assets/images';
import {
  Tv,
  Newspaper,
  Flame,
  HeartHandshake,
  ShoppingBag,
  BookMarked,
  Globe2,
  TreePine,
  Play,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';

interface MereNaturePageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

export const MereNaturePage: React.FC<MereNaturePageProps> = ({
  lang,
  onNavigate,
}) => {
  const [activeSection, setActiveSection] = useState<string>('all');
  const [cartItems, setCartItems] = useState<string[]>([]);
  const content = MERE_NATURE_INITIATIVE[lang];

  const handleAddToCart = (productName: string) => {
    setCartItems([...cartItems, productName]);
    alert(
      lang === 'fr'
        ? `Article ajouté au panier vert : ${productName}`
        : `Item added to green cart: ${productName}`,
    );
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Header from Slide 13 */}
      <section className="border-b border-slate-200 pb-8 pt-4">
        <div className="max-w-3xl space-y-3">
          <div className="text-xs uppercase tracking-widest font-semibold text-emerald-600">
            {lang === 'fr' ? 'Bras Sociétal & Écologique' : 'Societal & Ecological Arm'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-slate-900 font-bold">
            {content.title}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {content.baseline}
          </p>
        </div>
      </section>

      {/* Impact Numbers */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {content.stats.map((stat, i) => (
          <div
            key={i}
            className="p-5 bg-emerald-50/60 border border-emerald-200/80 rounded-2xl text-center space-y-1"
          >
            <span className="block text-2xl sm:text-3xl font-serif font-bold text-emerald-950 font-mono">
              {stat.val}
            </span>
            <span className="text-xs text-emerald-800 font-medium">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Slide 13 Dedicated Ecosystem Pillars */}
      <section className="space-y-8">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-xl font-serif font-bold text-slate-900">
            {lang === 'fr' ? 'Un Portail Dédié à l’Écosystème' : 'A Dedicated Ecosystem Portal'}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {lang === 'fr'
              ? 'Média, plaidoyer, commerce circulaire et actions régénératives de terrain'
              : 'Media, advocacy, circular commerce, and field regeneration'}
          </p>
        </div>

        {/* 1. Mère Nature TV & Blog Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Mère Nature TV */}
          <div className="lg:col-span-7 bg-slate-950 text-white rounded-2xl p-6 sm:p-8 space-y-4 border border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase text-emerald-400">
                <Tv className="w-4 h-4" />
                <span>Mère Nature TV</span>
              </div>
              <span className="text-[11px] bg-red-600 text-white px-2 py-0.5 rounded font-bold uppercase animate-pulse">
                Direct
              </span>
            </div>

            <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden relative group cursor-pointer border border-slate-800">
              <img
                src={UNIVERSITY_ASSETS.natureForest}
                alt="Documentaire Mère Nature"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
              />
              <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                <div className="w-14 h-14 bg-amber-600 text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-xs bg-slate-900/80 backdrop-blur px-3 py-2 rounded-lg">
                <span className="font-semibold block text-white truncate">
                  {lang === 'fr'
                    ? 'Documentaire : La renaissance des forêts humides africaines'
                    : 'Documentary: Renaissance of African Rainforests'}
                </span>
                <span className="text-slate-400 text-[10px]">
                  Production originale Mère Nature Global · 4K UHD
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300">
              {lang === 'fr'
                ? 'Retrouvez nos séries documentaires, débats en direct et témoignages de gardiens de la biodiversité à travers le globe.'
                : 'Watch original documentaries, live roundtable dialogues, and grassroots guardian testimonies.'}
            </p>
          </div>

          {/* Blog & Tribunes */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase text-amber-600">
                <Newspaper className="w-4 h-4" />
                <span>Blog & Tribunes Libres</span>
              </div>
              <h3 className="text-lg font-serif font-bold text-slate-900">
                {lang === 'fr' ? 'Éclairages Écologiques' : 'Ecological Perspectives'}
              </h3>
              <div className="space-y-3 pt-2 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <span className="text-[10px] text-amber-600 font-bold uppercase">Tribune Chercheur</span>
                  <h4 className="font-semibold text-slate-900">
                    Pourquoi la comptabilité conventionnelle précipite l’extinction
                  </h4>
                  <p className="text-slate-500 text-[11px]">Par Dr. Sophie Vandamme · 5 min read</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <span className="text-[10px] text-emerald-600 font-bold uppercase">Reportage Terrain</span>
                  <h4 className="font-semibold text-slate-900">
                    Restaurer 1 million d’arbres : journal de bord d’une expédition citoyenne
                  </h4>
                  <p className="text-slate-500 text-[11px]">Par Équipe Mère Nature · 8 min read</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('actualites')}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors text-center"
            >
              {lang === 'fr' ? 'Lire toutes les tribunes' : 'Read all blog posts'}
            </button>
          </div>
        </div>

        {/* 2. Campagnes & ONG */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-emerald-950 text-white rounded-2xl border border-emerald-900 space-y-3">
            <div className="flex items-center gap-2 text-xs uppercase font-semibold text-emerald-400">
              <TreePine className="w-4 h-4" />
              <span>{lang === 'fr' ? 'Campagnes de Reboisement' : 'Reforestation Campaigns'}</span>
            </div>
            <h3 className="text-lg font-serif font-bold">
              {lang === 'fr' ? 'Opération Grande Canopée 2026' : 'Operation Great Canopy 2026'}
            </h3>
            <p className="text-xs text-emerald-200 leading-relaxed">
              {lang === 'fr'
                ? 'Plantation de 500 000 essences natives d’arbres endémiques pour recréer des corridors d’habitats pour les pollinisateurs et la faune menacée.'
                : 'Planting 500,000 endemic native trees to establish biological corridors for endangered fauna.'}
            </p>
          </div>

          <div className="p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs uppercase font-semibold text-amber-400">
              <HeartHandshake className="w-4 h-4" />
              <span>{lang === 'fr' ? 'Réseau ONG Partenaires' : 'Partner NGO Network'}</span>
            </div>
            <h3 className="text-lg font-serif font-bold">
              {lang === 'fr' ? 'Solidarité & Résilience Communautaire' : 'Community Solidarity & Resilience'}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {lang === 'fr'
                ? 'Soutien direct à 35 associations locales de terrain pour l’accès à l’eau potable solaire et la formation des femmes à l’agroécologie.'
                : 'Direct backing to 35 frontline local grassroots organizations for solar water and women’s agroecological training.'}
            </p>
          </div>
        </div>

        {/* 3. Boutique Verte & Livres (Slide 13: BOUTIQUE VERTE, LIVRES) */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h3 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-600" />
                <span>{lang === 'fr' ? 'BOUTIQUE VERTE & LIVRES' : 'GREEN STORE & PUBLISHING'}</span>
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'fr'
                  ? 'Matériel d’étude éco-conçu et éditions scientifiques dont 100% des bénéfices financent nos plantations.'
                  : 'Eco-designed study gear and publications with 100% profits funding reforestation.'}
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              {cartItems.length} {lang === 'fr' ? 'articles au panier' : 'in cart'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {GREEN_PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-600 block">
                    {lang === 'fr' ? prod.categoryFr : prod.categoryEn}
                  </span>
                  <h4 className="font-semibold text-slate-900 text-sm leading-snug">
                    {lang === 'fr' ? prod.nameFr : prod.nameEn}
                  </h4>
                  <p className="text-xs text-slate-500 font-mono">
                    {lang === 'fr' ? prod.ecoImpactFr : prod.ecoImpactEn}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-base font-bold font-mono text-slate-900">
                    {prod.price}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      handleAddToCart(lang === 'fr' ? prod.nameFr : prod.nameEn)
                    }
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium transition-colors"
                  >
                    {lang === 'fr' ? 'Acheter' : 'Order'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
