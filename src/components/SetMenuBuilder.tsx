import React, { useState } from 'react';
import { Sparkles, Utensils, Check, Plus, ShoppingBag, ShieldAlert, Wine } from 'lucide-react';
import { DISHES } from '../data';
import { Dish } from '../types';
import { useTranslation } from '../contexts/LanguageContext';

interface SetMenuBuilderProps {
  onAddSetToCart: (starter: Dish, main: Dish, dessert: Dish, price: number, wineIncluded: boolean) => void;
}

// Separate, clean self-contained translations for dishes used in Set Menu Builder
const LOCAL_TRANS: Record<string, Record<string, string>> = {
  "dish-1": {
    name: "Foie Gras Poêlé aux Figues de Osu",
    description: "Lobes d'oie poêlés français accompagnés de figues glacées à la mélasse locale.",
    pairedWine: "Châteauneuf-du-Pape"
  },
  "dish-2": {
    name: "Fricassée d'Escargots aux Herbes Sauvages",
    description: "Escargots sautés avec des champignons locaux et une crème à l'ail des ours.",
    pairedWine: "Meursault Chardonnay"
  },
  "dish-3": {
    name: "Coq au Vin Traditionnel de Campagne",
    description: "Coq rôti lentement mijoté au vin rouge lourd de Bourgogne, lardons grillés et carottes bio.",
    pairedWine: "Pinot Noir Grand Cru"
  },
  "dish-4": {
    name: "Cassoulet Artisanal d'Osu",
    description: "Un ragoût copieux composé de haricots blancs bio, canard confit d'exception et saucisse de porc gasconne maison.",
    pairedWine: "Madiran Rouge"
  },
  "dish-5": {
    name: "Sole Meunière Côtière",
    description: "Sole fraîche pêchée de la mer d'Accra, pochée délicatement au beurre noisette doré et câpres sauvages.",
    pairedWine: "Pouilly-Fumé Sauvignon Blanc"
  },
  "dish-6": {
    name: "Crème Brûlée Impériale à la Vanille",
    description: "Crème pâtissière onctueuse infusée aux gousses de vanille de Tahiti, couronnée d'un caramel de canne craquant.",
    pairedWine: "Sauternes liquoreux"
  },
  "dish-7": {
    name: "Sinfonía de Fondant au Chocolat",
    description: "Gâteau coulant au chocolat noir pur à 80% servi avec une glace à la fève de Tonka.",
    pairedWine: "Maury Vintage"
  }
};

export default function SetMenuBuilder({ onAddSetToCart }: SetMenuBuilderProps) {
  const { language } = useTranslation();
  const [selectedStarter, setSelectedStarter] = useState<Dish | null>(null);
  const [selectedMain, setSelectedMain] = useState<Dish | null>(null);
  const [selectedDessert, setSelectedDessert] = useState<Dish | null>(null);
  const [includeWinePairings, setIncludeWinePairings] = useState(false);
  const [activeTab, setActiveTab] = useState<'starter' | 'main' | 'dessert'>('starter');
  const [successMsg, setSuccessMsg] = useState(false);

  const starters = DISHES.filter(d => d.category === 'starters');
  const mains = DISHES.filter(d => d.category === 'mains');
  const desserts = DISHES.filter(d => d.category === 'desserts');

  // Fixed discount bundle pricing
  const FLAT_BUNDLE_BASE = 720.00; // Appetizer + Main + Dessert for standard GH₵720.00 (adjusted for Ghana Cedi)
  const WINE_PAIRING_EXTRA = 350.00; // Custom sommelier wine selections matched with each course

  // Compute actual price if purchased separately
  const regularPrice = 
    (selectedStarter?.price || 0) + 
    (selectedMain?.price || 0) + 
    (selectedDessert?.price || 0);

  const discountSavings = regularPrice > FLAT_BUNDLE_BASE ? regularPrice - FLAT_BUNDLE_BASE : 0;
  const finalPrice = includeWinePairings ? FLAT_BUNDLE_BASE + WINE_PAIRING_EXTRA : FLAT_BUNDLE_BASE;

  const getDishField = (dish: Dish, field: 'name' | 'description' | 'pairedWine'): string => {
    if (language === 'fr' && LOCAL_TRANS[dish.id]) {
      const val = LOCAL_TRANS[dish.id][field];
      if (val) return val;
    }
    return (dish[field] as string) || '';
  };

  const handleAddTastingToCart = () => {
    if (!selectedStarter || !selectedMain || !selectedDessert) return;
    onAddSetToCart(selectedStarter, selectedMain, selectedDessert, finalPrice, includeWinePairings);
    
    // Clear and show success
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setSelectedStarter(null);
      setSelectedMain(null);
      setSelectedDessert(null);
      setIncludeWinePairings(false);
      setActiveTab('starter');
    }, 4000);
  };

  return (
    <section id="curate-section" className="py-24 bg-[#0d0d0d] text-[#f5f5f5] border-t border-white/5 relative overflow-hidden scroll-mt-12">
      {/* Decorative ambient backdrop */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#c5a47e]/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/3 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#c5a47e] block mb-3 font-semibold">
            {language === 'fr' ? "Table de Dégustation Personnalisée" : "Bespoke Tasting Table"}
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-light tracking-wide mb-4 text-white">
            {language === 'fr' ? "Formule Gastronomique Sur Mesure" : "Custom Gastronomic Set Menu"}
          </h2>
          <div className="h-[1px] w-12 bg-[#c5a47e] mx-auto mb-6" />
          <p className="text-white/50 font-sans text-sm font-light leading-relaxed">
            {language === 'fr'
              ? "Laissez libre cours à votre âme d’épicurien. Sélectionnez trois créations de notre Chef pour composer votre menu de dégustation personnalisé à un tarif d'ensemble préférentiel."
              : "Unleash your inner epicurean. Select three chef creations to fabricate your personal multi-course degustation menu at a special curated course flat rate."
            }
          </p>
        </div>

        {/* Set Menu Builder Workspace: Left side selections, Right side preview card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Selections Workspace Panel (7 Cols) */}
          <div className="lg:col-span-7 bg-[#121212]/40 border border-white/5 rounded-none p-6 sm:p-8 shadow-2xl">
            
            {/* Step Selection Tabs */}
            <div className="grid grid-cols-3 gap-1.5 xs:gap-2 mb-8 border-b border-white/5 pb-6">
              
              {/* Step 1 Tab : Starter */}
              <button
                onClick={() => setActiveTab('starter')}
                className={`py-3 px-1 xs:px-2 rounded-none text-center transition-all cursor-pointer ${
                  activeTab === 'starter'
                    ? 'bg-[#c5a47e]/10 border border-[#c5a47e]/40 text-[#c5a47e]'
                    : 'bg-white/5 border border-transparent text-white/50 hover:text-white'
                }`}
              >
                <span className="block font-sans text-[8px] xs:text-[9px] uppercase font-bold tracking-[0.1em] xs:tracking-[0.2em] mb-1 text-white/30">
                  {language === 'fr' ? "Étape I" : "Course I"}
                </span>
                <span className="font-serif text-[10px] xs:text-xs block uppercase tracking-normal xs:tracking-widest font-light truncate">
                  {language === 'fr' ? "Entrées" : "Appetizers"}
                </span>
                {selectedStarter && (
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#c5a47e] ml-1 align-middle" />
                )}
              </button>

              {/* Step 2 Tab : Main */}
              <button
                onClick={() => setActiveTab('main')}
                className={`py-3 px-1 xs:px-2 rounded-none text-center transition-all cursor-pointer ${
                  activeTab === 'main'
                    ? 'bg-[#c5a47e]/10 border border-[#c5a47e]/40 text-[#c5a47e]'
                    : 'bg-white/5 border border-transparent text-white/50 hover:text-white'
                }`}
              >
                <span className="block font-sans text-[8px] xs:text-[9px] uppercase font-bold tracking-[0.1em] xs:tracking-[0.2em] mb-1 text-white/30">
                  {language === 'fr' ? "Étape II" : "Course II"}
                </span>
                <span className="font-serif text-[10px] xs:text-xs block uppercase tracking-normal xs:tracking-widest font-light truncate">
                  {language === 'fr' ? "Plats" : "Mains"}
                </span>
                {selectedMain && (
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#c5a47e] ml-1 align-middle" />
                )}
              </button>

              {/* Step 3 Tab : Dessert */}
              <button
                onClick={() => setActiveTab('dessert')}
                className={`py-3 px-1 xs:px-2 rounded-none text-center transition-all cursor-pointer ${
                  activeTab === 'dessert'
                    ? 'bg-[#c5a47e]/10 border border-[#c5a47e]/40 text-[#c5a47e]'
                    : 'bg-white/5 border border-transparent text-white/50 hover:text-white'
                }`}
              >
                <span className="block font-sans text-[8px] xs:text-[9px] uppercase font-bold tracking-[0.1em] xs:tracking-[0.2em] mb-1 text-white/30">
                  {language === 'fr' ? "Étape III" : "Course III"}
                </span>
                <span className="font-serif text-[10px] xs:text-xs block uppercase tracking-normal xs:tracking-widest font-light truncate">
                  {language === 'fr' ? "Desserts" : "Dessert"}
                </span>
                {selectedDessert && (
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#c5a47e] ml-1 align-middle" />
                )}
              </button>
            </div>

            {/* Selection Grid for Active Tab */}
            <div>
              {/* STARTERS SELECTION */}
              {activeTab === 'starter' && (
                <div className="space-y-4">
                  <h3 className="font-serif text-lg text-[#c5a47e] font-light mb-3">
                    {language === 'fr' ? "Sélectionnez votre entrée culinaire d’introduction :" : "Select Your Opening Culinary Statement:"}
                  </h3>
                  {starters.map((dish) => {
                    const isSelected = selectedStarter?.id === dish.id;
                    return (
                      <div
                        key={dish.id}
                        onClick={() => {
                          setSelectedStarter(dish);
                          setActiveTab('main'); // auto advance
                        }}
                        className={`flex items-center gap-4 p-4 rounded-none border transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'bg-white/5 border-[#c5a47e] shadow-inner'
                            : 'bg-[#151515]/40 border-white/5 hover:bg-white/5 hover:border-white/10'
                        }`}
                      >
                        <img src={dish.image} alt={getDishField(dish, 'name')} className="h-16 w-16 object-cover rounded-none shrink-0 border border-white/5" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-base text-white font-light tracking-wide truncate">{getDishField(dish, 'name')}</h4>
                          <p className="text-white/40 text-xs font-light line-clamp-2 mt-0.5">{getDishField(dish, 'description')}</p>
                        </div>
                        <div className="shrink-0 ml-2">
                          {isSelected ? (
                            <div className="h-7 w-7 rounded-none bg-[#c5a47e] flex items-center justify-center text-black">
                              <Check className="h-4 w-4 stroke-[3]" />
                            </div>
                          ) : (
                            <div className="h-7 w-7 rounded-none border border-white/10 hover:border-[#c5a47e] flex items-center justify-center text-white/40 hover:text-[#c5a47e]">
                              <Plus className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* MAINS SELECTION */}
              {activeTab === 'main' && (
                <div className="space-y-4">
                  <h3 className="font-serif text-lg text-[#c5a47e] font-light mb-3">
                    {language === 'fr' ? "Sélectionnez votre création de résistance principale :" : "Select Your Gastronomic Main Piece:"}
                  </h3>
                  {mains.map((dish) => {
                    const isSelected = selectedMain?.id === dish.id;
                    return (
                      <div
                        key={dish.id}
                        onClick={() => {
                          setSelectedMain(dish);
                          setActiveTab('dessert'); // auto advance
                        }}
                        className={`flex items-center gap-4 p-4 rounded-none border transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'bg-white/5 border-[#c5a47e] shadow-inner'
                            : 'bg-[#151515]/40 border-white/5 hover:bg-white/5 hover:border-white/10'
                        }`}
                      >
                        <img src={dish.image} alt={getDishField(dish, 'name')} className="h-16 w-16 object-cover rounded-none shrink-0 border border-white/5" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-base text-white font-light tracking-wide truncate">{getDishField(dish, 'name')}</h4>
                          <p className="text-white/40 text-xs font-light line-clamp-2 mt-0.5">{getDishField(dish, 'description')}</p>
                        </div>
                        <div className="shrink-0 ml-2">
                          {isSelected ? (
                            <div className="h-7 w-7 rounded-none bg-[#c5a47e] flex items-center justify-center text-black">
                              <Check className="h-4 w-4 stroke-[3]" />
                            </div>
                          ) : (
                            <div className="h-7 w-7 rounded-none border border-white/10 hover:border-[#c5a47e] flex items-center justify-center text-white/40 hover:text-[#c5a47e]">
                              <Plus className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* DESSERTS SELECTION */}
              {activeTab === 'dessert' && (
                <div className="space-y-4">
                  <h3 className="font-serif text-lg text-[#c5a47e] font-light mb-3">
                    {language === 'fr' ? "Sélectionnez le dessert d’accord final d’exception :" : "Select Your Grand Finale Sweet:"}
                  </h3>
                  {desserts.map((dish) => {
                    const isSelected = selectedDessert?.id === dish.id;
                    return (
                      <div
                        key={dish.id}
                        onClick={() => setSelectedDessert(dish)}
                        className={`flex items-center gap-4 p-4 rounded-none border transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'bg-white/5 border-[#c5a47e] shadow-inner'
                            : 'bg-[#151515]/40 border-white/5 hover:bg-white/5 hover:border-white/10'
                        }`}
                      >
                        <img src={dish.image} alt={getDishField(dish, 'name')} className="h-16 w-16 object-cover rounded-none shrink-0 border border-white/5" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-base text-white font-light tracking-wide truncate">{getDishField(dish, 'name')}</h4>
                          <p className="text-white/40 text-xs font-light line-clamp-2 mt-0.5">{getDishField(dish, 'description')}</p>
                        </div>
                        <div className="shrink-0 ml-2">
                          {isSelected ? (
                            <div className="h-7 w-7 rounded-none bg-[#c5a47e] flex items-center justify-center text-black">
                              <Check className="h-4 w-4 stroke-[3]" />
                            </div>
                          ) : (
                            <div className="h-7 w-7 rounded-none border border-white/10 hover:border-[#c5a47e] flex items-center justify-center text-white/40 hover:text-[#c5a47e]">
                              <Plus className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>

          {/* Tasting Menu Summary Card Panel (5 Cols) */}
          <div className="lg:col-span-5 bg-[#121212]/80 border border-white/5 rounded-none overflow-hidden shadow-2xl relative lg:sticky lg:top-28">
            
            {/* Header section with brand tag */}
            <div className="p-6 border-b border-white/5 bg-gradient-to-r from-[#c5a47e]/5 to-transparent flex justify-between items-center">
              <div>
                <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#c5a47e] block font-semibold">
                  {language === 'fr' ? "Gastronomie Le Magellan" : "Le Magellan Gastronomy"}
                </span>
                <span className="font-serif text-lg text-white font-light tracking-wide">
                  {language === 'fr' ? "Votre Forfait de Dégustation" : "Your Degustation Ticket"}
                </span>
              </div>
              <Utensils className="h-5 w-5 text-[#c5a47e]" />
            </div>

            {/* Curated list */}
            <div className="p-6 space-y-6">
              
              {/* Course 1 Preview */}
              <div className="flex items-start gap-3.5">
                <div className="h-7 w-7 rounded-none bg-white/5 border border-white/5 flex items-center justify-center font-sans text-[10px] font-bold text-[#c5a47e] shrink-0 select-none">
                  I
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block font-sans text-[9px] uppercase text-white/40 tracking-wider">
                    {language === 'fr' ? "L'Entrée pour Commencer" : "Opening Course"}
                  </span>
                  {selectedStarter ? (
                    <div>
                      <h5 className="font-serif text-sm text-white font-light tracking-wide mt-0.5 truncate">{getDishField(selectedStarter, 'name')}</h5>
                      <span className="font-sans text-[9px] text-[#c5a47e] italic block mt-0.5 truncate">
                        {language === 'fr' ? "Suggestion accord sommelier : " : "Wine suggestions: "}{getDishField(selectedStarter, 'pairedWine')}
                      </span>
                    </div>
                  ) : (
                    <p className="text-white/30 text-xs italic mt-0.5">
                      {language === 'fr' ? "En attente d'une entrée royale..." : "Please make an appetizer choice..."}
                    </p>
                  )}
                </div>
              </div>

              {/* Course 2 Preview */}
              <div className="flex items-start gap-3.5 border-t border-white/5 pt-4">
                <div className="h-7 w-7 rounded-none bg-white/5 border border-white/5 flex items-center justify-center font-sans text-[10px] font-bold text-[#c5a47e] shrink-0 select-none">
                  II
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block font-sans text-[9px] uppercase text-white/40 tracking-wider">
                    {language === 'fr' ? "Le Plat Phare d'Exception" : "Entrée Course"}
                  </span>
                  {selectedMain ? (
                    <div>
                      <h5 className="font-serif text-sm text-white font-light tracking-wide mt-0.5 truncate">{getDishField(selectedMain, 'name')}</h5>
                      <span className="font-sans text-[9px] text-[#c5a47e] italic block mt-0.5 truncate">
                        {language === 'fr' ? "Suggestion accord sommelier : " : "Wine suggestions: "}{getDishField(selectedMain, 'pairedWine')}
                      </span>
                    </div>
                  ) : (
                    <p className="text-white/30 text-xs italic mt-0.5">
                      {language === 'fr' ? "En attente d'un chef-d’œuvre..." : "Please select your main dish..."}
                    </p>
                  )}
                </div>
              </div>

              {/* Course 3 Preview */}
              <div className="flex items-start gap-3.5 border-t border-white/5 pt-4 pb-2">
                <div className="h-7 w-7 rounded-none bg-white/5 border border-white/5 flex items-center justify-center font-sans text-[10px] font-bold text-[#c5a47e] shrink-0 select-none">
                  III
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block font-sans text-[9px] uppercase text-white/40 tracking-wider">
                    {language === 'fr' ? "Le Somptueux Dessert de Clôture" : "Dessert Course"}
                  </span>
                  {selectedDessert ? (
                    <div>
                      <h5 className="font-serif text-sm text-white font-light tracking-wide mt-0.5 truncate">{getDishField(selectedDessert, 'name')}</h5>
                      <span className="font-sans text-[9px] text-[#c5a47e] italic block mt-0.5 truncate">
                        {language === 'fr' ? "Suggestion accord sommelier : " : "Wine suggestions: "}{getDishField(selectedDessert, 'pairedWine')}
                      </span>
                    </div>
                  ) : (
                    <p className="text-white/30 text-xs italic mt-0.5">
                      {language === 'fr' ? "En attente d’une touche sucrée..." : "Please select your dessert finale..."}
                    </p>
                  )}
                </div>
              </div>

              {/* Wine Pairing Extras Toggle */}
              {selectedStarter && selectedMain && selectedDessert && (
                <div className="p-4 bg-white/3 border border-white/5 rounded-none mt-4 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <Wine className="h-4.5 w-4.5 text-[#c5a47e] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-sans text-xs text-white/80 font-semibold block leading-tight">
                          {language === 'fr' ? "Accords Vinicoles Grand Cru" : "Integrated Grand Cru Wine Pairings"}
                        </span>
                        <span className="font-sans text-[9px] text-white/40 block mt-0.5 leading-normal">
                          {language === 'fr'
                            ? `Ajoutez des champagnes et millésimes d’exception assortis à chaque mets (+${WINE_PAIRING_EXTRA.toFixed(2)} GH₵)`
                            : `Add pre-selected pairing champagne & aged vintage wines to match each course (+GH₵${WINE_PAIRING_EXTRA.toFixed(2)})`
                          }
                        </span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={includeWinePairings}
                      onChange={(e) => setIncludeWinePairings(e.target.checked)}
                      className="h-4 w-4 rounded-none border-white/10 bg-white/5 text-[#c5a47e] focus:ring-0 accent-[#c5a47e] cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* Pricing, savings, checkout CTAs */}
              <div className="pt-6 border-t border-white/5 mt-4 space-y-4">
                
                {/* Savings calculation */}
                {regularPrice > 0 && (
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-white/35 uppercase">
                      {language === 'fr' ? "Tarif Habituel Isolé :" : "Regular Price Sep:"}
                    </span>
                    <span className="text-white/50 font-light text-right line-through">
                      GH₵{regularPrice.toFixed(2)}
                    </span>
                  </div>
                )}
                
                {discountSavings > 0 && (
                  <div className="flex justify-between text-[10px] font-sans uppercase tracking-[0.1em] bg-[#c5a47e]/10 border border-[#c5a47e]/30 rounded-none px-2.5 py-1.5 text-[#c5a47e]">
                    <span className="font-semibold">
                      {language === 'fr' ? "Remise Formule Interactive :" : "Interactive Degustation Savings:"}
                    </span>
                    <span className="font-bold">
                      -GH₵{discountSavings.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex items-baseline justify-between pt-1">
                  <span className="font-serif text-xs text-white/40 italic">
                    {language === 'fr' ? "Tarif Exclusif de l'Ensemble :" : "Degustation Course Ticket Rate:"}
                  </span>
                  <div className="text-right">
                    <span className="font-mono text-3xl font-light text-[#c5a47e] block leading-none">
                      GH₵{finalPrice.toFixed(2)}
                    </span>
                    <span className="font-sans text-[8px] text-white/30 uppercase tracking-widest mt-1.5 block">
                      {language === 'fr' ? "Toutes taxes et service inclus" : "All taxes & service added"}
                    </span>
                  </div>
                </div>

                {/* Main add button or directions banner */}
                {selectedStarter && selectedMain && selectedDessert ? (
                  <button
                    id="add-gastronomic-bundle-btn"
                    onClick={handleAddTastingToCart}
                    className="w-full bg-[#c5a47e] hover:bg-[#b08d65] text-black font-sans text-[10px] uppercase tracking-[0.2em] font-semibold py-4 rounded-none flex items-center justify-center gap-2 shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    <ShoppingBag className="h-4.5 w-4.5" />
                    {language === 'fr' ? "Ajouter la Dégustation au Panier d’Achat" : "Add Degustation Set to Ordering Bag"}
                  </button>
                ) : (
                  <div className="text-center p-4 bg-white/5 border border-white/5 text-white/40 text-[11px] font-sans leading-relaxed rounded-none">
                    {language === 'fr'
                      ? "Sélectionnez un mets délicat pour chaque étape ci-dessus afin de compléter votre table et d’obtenir le tarif préférentiel !"
                      : "Select one delicacy from each course above to complete your set and unlock bundle savings!"
                    }
                  </div>
                )}

                {successMsg && (
                  <div className="p-3.5 bg-[#c5a47e]/10 border border-[#c5a47e]/30 text-[#c5a47e] font-sans text-[11px] rounded-none flex items-center justify-center gap-1.5 animate-pulse text-center">
                    <Check className="h-4 w-4 shrink-0" />
                    {language === 'fr' ? "Formule dégustation d'Osu ajoutée avec succès !" : "Curated Feast successfully added to booking list!"}
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
