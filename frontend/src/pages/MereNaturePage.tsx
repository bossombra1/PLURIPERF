import React, { useState } from 'react';
import { Language, PageId } from '../types';
import { MERE_NATURE_INITIATIVE, GREEN_PRODUCTS } from '../data/universityData';
import { UNIVERSITY_ASSETS } from '../assets/images';
import {
  Tv,
  Newspaper,
  HeartHandshake,
  ShoppingBag,
  Globe2,
  TreePine,
  Play,
  CheckCircle,
  CheckCircle2,
  Building2,
} from 'lucide-react';

interface MereNaturePageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

export const MereNaturePage: React.FC<MereNaturePageProps> = ({
  lang,
  onNavigate,
}) => {
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const content = MERE_NATURE_INITIATIVE[lang];

  const handleAddToCart = (productName: string) => {
    setCartItems([...cartItems, productName]);
    setNotification(
      lang === 'fr'
        ? `« ${productName} » ajouté à votre panier vert avec succès.`
        : `"${productName}" successfully added to your green cart.`,
    );
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

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
            <span className="text-[#898888]">{lang === 'fr' ? 'Engagement' : 'Engagement'}</span>
            <span>/</span>
            <span className="text-[#008629] font-medium">
              {lang === 'fr' ? 'Alliance Mère Nature' : 'Mother Nature Alliance'}
            </span>
          </nav>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111827] tracking-tight inphb-heading-accent">
              {content.title}
            </h1>
            <p className="text-sm sm:text-base text-[#666666] max-w-2xl pt-2">
              {content.baseline}
            </p>
          </div>
        </div>
      </div>

      {/* Subtle Toast notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#008629] text-white px-4 py-3 rounded-sm shadow-lg flex items-center gap-2 text-xs">
          <CheckCircle2 className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* 2. Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

        {/* Impact Numbers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {content.stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white border border-[#eaeaea] p-5 rounded-sm text-center shadow-sm"
            >
              <span className="block text-2xl sm:text-3xl font-bold text-[#008629] font-mono">
                {stat.val}
              </span>
              <span className="text-xs text-[#666666] font-medium uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Mère Nature TV & Media Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Mère Nature TV */}
          <div className="lg:col-span-7 bg-[#1c221e] text-white rounded-sm p-6 sm:p-8 space-y-4 border border-[#2d3730]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#5aaf4b]">
                <Tv className="w-4 h-4" />
                <span>Mère Nature TV</span>
              </div>
              <span className="text-[11px] bg-red-600 text-white px-2 py-0.5 rounded font-bold uppercase animate-pulse">
                Direct
              </span>
            </div>

            <div className="aspect-video bg-black/60 rounded-xs overflow-hidden relative group cursor-pointer border border-[#333333]">
              <img
                src={UNIVERSITY_ASSETS.natureForest}
                alt="Documentaire Mère Nature"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-14 h-14 bg-[#008629] text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-xs bg-black/80 px-3 py-2 rounded-xs">
                <span className="font-semibold block text-white truncate">
                  {lang === 'fr'
                    ? 'Documentaire : La renaissance des forêts humides africaines'
                    : 'Documentary: Renaissance of African Rainforests'}
                </span>
                <span className="text-gray-400 text-[10px]">
                  Production originale Mère Nature Global · 4K UHD
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              {lang === 'fr'
                ? 'Retrouvez nos séries documentaires, débats en direct et témoignages de gardiens de la biodiversité à travers le globe.'
                : 'Watch original documentaries, live roundtable dialogues, and grassroots guardian testimonies.'}
            </p>
          </div>

          {/* Blog & Perspectives */}
          <div className="lg:col-span-5 bg-white border border-[#eaeaea] rounded-sm p-6 sm:p-8 space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#008629]">
                <Newspaper className="w-4 h-4" />
                <span>Blog & Tribunes Libres</span>
              </div>
              <h3 className="text-lg font-bold text-[#111827]">
                {lang === 'fr' ? 'Éclairages Écologiques' : 'Ecological Perspectives'}
              </h3>
              <div className="space-y-3 pt-2 text-xs">
                <div className="p-3 bg-[#f8fafc] border border-[#eaeaea] rounded-xs space-y-1">
                  <span className="text-[10px] text-[#008629] font-bold uppercase">Tribune Chercheur</span>
                  <h4 className="font-bold text-[#111827]">
                    Pourquoi la comptabilité conventionnelle précipite l’extinction
                  </h4>
                  <p className="text-[#666666] text-[11px]">Par Dr. Sophie Vandamme · 5 min de lecture</p>
                </div>
                <div className="p-3 bg-[#f8fafc] border border-[#eaeaea] rounded-xs space-y-1">
                  <span className="text-[10px] text-[#008629] font-bold uppercase">Reportage Terrain</span>
                  <h4 className="font-bold text-[#111827]">
                    Restaurer 1 million d’arbres : journal de bord d’une expédition citoyenne
                  </h4>
                  <p className="text-[#666666] text-[11px]">Par Équipe Mère Nature · 8 min de lecture</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('actualites')}
              className="w-full py-2.5 bg-[#f8fafc] hover:bg-[#eaeaea] text-[#111827] border border-[#eaeaea] text-xs font-bold transition-colors text-center"
            >
              {lang === 'fr' ? 'Consulter toutes les tribunes' : 'Read all blog posts'}
            </button>
          </div>
        </div>

        {/* Campaigns and NGO Network */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-[#008629] text-white rounded-sm space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-xs uppercase font-bold text-white/90">
              <TreePine className="w-4 h-4" />
              <span>{lang === 'fr' ? 'Campagnes de Reboisement' : 'Reforestation Campaigns'}</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              {lang === 'fr' ? 'Opération Grande Canopée 2026' : 'Operation Great Canopy 2026'}
            </h3>
            <p className="text-xs text-white/85 leading-relaxed">
              {lang === 'fr'
                ? 'Plantation de 500 000 essences natives d’arbres endémiques pour recréer des corridors d’habitats pour les pollinisateurs et la faune menacée.'
                : 'Planting 500,000 endemic native trees to establish biological corridors for endangered fauna.'}
            </p>
          </div>

          <div className="p-6 bg-[#1f2421] text-white rounded-sm space-y-3 shadow-sm border border-[#333333]">
            <div className="flex items-center gap-2 text-xs uppercase font-bold text-[#f77f00]">
              <HeartHandshake className="w-4 h-4" />
              <span>{lang === 'fr' ? 'Réseau ONG Partenaires' : 'Partner NGO Network'}</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              {lang === 'fr' ? 'Solidarité & Résilience Communautaire' : 'Community Solidarity & Resilience'}
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              {lang === 'fr'
                ? 'Soutien direct à 35 associations locales de terrain pour l’accès à l’eau potable solaire et la formation des femmes à l’agroécologie.'
                : 'Direct backing to 35 frontline local grassroots organizations for solar water and women’s agroecological training.'}
            </p>
          </div>
        </div>

        {/* Boutique Verte & Livres */}
        <div className="bg-white border border-[#eaeaea] p-6 sm:p-8 rounded-sm shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#eaeaea] pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#008629] block mb-1">
                COMMERCE CIRCULAIRE
              </span>
              <h3 className="text-xl font-bold text-[#111827] flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#008629]" />
                <span>{lang === 'fr' ? 'Boutique Verte & Ouvrages Scientifiques' : 'Green Store & Publications'}</span>
              </h3>
              <p className="text-xs text-[#666666] mt-0.5">
                {lang === 'fr'
                  ? 'Matériel d’étude éco-conçu dont 100% des bénéfices financent nos plantations communautaires.'
                  : 'Eco-designed study gear with 100% profits funding community reforestation.'}
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-[#008629] bg-[#f0f9f1] px-3 py-1.5 rounded-sm border border-[#c3e6cb] shrink-0">
              {cartItems.length} {lang === 'fr' ? 'articles au panier' : 'items in cart'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GREEN_PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                className="p-5 border border-[#eaeaea] bg-[#fafafa] hover:border-[#008629] transition-colors rounded-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-[#008629] block">
                    {lang === 'fr' ? prod.categoryFr : prod.categoryEn}
                  </span>
                  <h4 className="font-bold text-[#111827] text-sm leading-snug">
                    {lang === 'fr' ? prod.nameFr : prod.nameEn}
                  </h4>
                  <p className="text-xs text-[#666666]">
                    {lang === 'fr' ? prod.ecoImpactFr : prod.ecoImpactEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#eaeaea] flex items-center justify-between">
                  <span className="text-base font-bold font-mono text-[#111827]">
                    {prod.price}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      handleAddToCart(lang === 'fr' ? prod.nameFr : prod.nameEn)
                    }
                    className="inphb-btn-primary text-xs py-1.5 px-3"
                  >
                    {lang === 'fr' ? 'Acheter' : 'Order'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
