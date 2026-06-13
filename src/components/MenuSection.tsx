import React, { useState } from 'react';
import { Search, Sparkles, SlidersHorizontal, Eye, Plus, Check, Star, Clock, Flame, ShieldAlert, Wine } from 'lucide-react';
import { motion } from 'motion/react';
import { DISHES } from '../data';
import { Dish, Category } from '../types';
import { useTranslation } from '../contexts/LanguageContext';

const DISH_TRANSLATIONS: Record<string, {
  name: string;
  description: string;
  ingredients: string[];
  pairedWine?: string;
  allergens?: string[];
  tags?: string[];
}> = {
  s1: {
    name: "Foie Gras Poêlé Le Magellan",
    description: "Luxueux foie gras de canard poêlé servi avec une tatin de banane plantain caramélisée au miel, réduction de porto à la badiane et éclats de noix de cajou locales du Ghana.",
    ingredients: ["Foie gras de canard français", "Banane plantain", "Noix de cajou ghanéennes", "Badiane", "Vin de Porto"],
    pairedWine: "Château d'Yquem Sauternes Réserve",
    allergens: ["Lait", "Fruits à coque"],
    tags: ["Signature"]
  },
  s2: {
    name: "Escargots au Beurre d’Ail",
    description: "Escargots de Bourgogne charnus cuits au four dans des coques feuilletées, infusés d'un beurre d'ail composé au gingembre et oignons nouveaux, persil frais et subtil glaçage soja.",
    ingredients: ["Escargots de forêt", "Beurre d'ail", "Persil", "Gingembre", "Coques feuilletées", "Sauce soja"],
    pairedWine: "Chablis Premier Cru",
    allergens: ["Gluten", "Lait"],
    tags: ["Signature", "Fruits de mer"]
  },
  s3: {
    name: "Carpaccio de Bœuf aux Truffes Noires",
    description: "Fines tranches de filet de bœuf de premier choix garnies de jeune roquette sauvage, copeaux de Parmigiano-Reggiano, câpres, perles de truffe fraîche et filet d'huile de truffe blanche.",
    ingredients: ["Filet de bœuf de premier choix", "Roquette", "Parmigiano-Reggiano", "Huile de truffe", "Câpres"],
    pairedWine: "Barolo DOCG",
    allergens: ["Lait"],
    tags: ["Signature"]
  },
  s4: {
    name: "Calmars Croustillants au Togarashi",
    description: "Anneaux de calmars locaux croustillants enrobés d'épices d'assaisonnement Togarashi aux sept saveurs japonaises, servis avec carpaccio de concombre mariné et aïoli maison gingembre-citron vert.",
    ingredients: ["Calmars locaux", "Épice Togarashi", "Citron vert", "Gingembre", "Jaune d'œuf"],
    pairedWine: "Sancerre Sauvignon Blanc",
    allergens: ["Œufs", "Gluten"],
    tags: ["Fruits de mer"]
  },
  m1: {
    name: "Entrecôte Wagyu au Gril",
    description: "Une entrecôte de bœuf Wagyu américain de 300g cuite à la flamme, servie avec sa sauce demi-glace à l'os à moelle et au poivre vert, pommes rissolées à l'ail et bok choy grillé.",
    ingredients: ["Bœuf Wagyu", "Pommes de terre", "Bok Choy", "Demi-glace à l'os à moelle", "Marinade soja"],
    pairedWine: "Châteauneuf-du-Pape",
    allergens: ["Lait", "Soja"],
    tags: ["Best-Seller"]
  },
  m2: {
    name: "Confit de Canard Glacé au Sichuan",
    description: "Cuisse de canard confite croustillante marinée au miel ghanéen et cinq-épices du Sichuan, accompagnée de tranches d'oranges rôties et de lentilles beluga.",
    ingredients: ["Cuisse de canard", "Poivre du Sichuan", "Miel ghanéen", "Orange", "Lentilles Beluga"],
    pairedWine: "Gevrey-Chambertin Pinot Noir",
    allergens: [],
    tags: ["Signature", "Best-Seller"]
  },
  m3: {
    name: "Poulpe Grillé au Chimichurri",
    description: "Tentacules de poulpe géant de l'Atlantique grillées aux braises, marinées à l'huile d'herbes, servies avec pommes de terre écrasées, tomates cerises et un chimichurri gingembre-ail.",
    ingredients: ["Poulpe de l'Atlantique", "Pommes rissolées", "Tomates cerises", "Gingembre", "Herbes chimichurri", "Ail"],
    pairedWine: "Vermentino di Sardegna",
    allergens: [],
    tags: ["Signature", "Fruits de mer"]
  },
  m4: {
    name: "Bouillabaisse de Vivaneau Rouge Le Magellan",
    description: "Filet de vivaneau rouge sauvage rôti à la poêle et poché dans un bouillon parfumé au safran avec des accents de gingembre et de citronnelle, fenouil croquant et riz jasmin à la vapeur.",
    ingredients: ["Vivaneau sauvage", "Safran", "Citronnelle", "Gingembre", "Fenouil", "Riz Jasmin"],
    pairedWine: "Pouilly-Fuissé Chardonnay",
    allergens: ["Poisson"],
    tags: ["Fruits de mer"]
  },
  m5: {
    name: "Linguine aux Truffes & Champignons",
    description: "Linguine artisanales tréfilées au bronze liées à une émulsion de cèpes français séchés, champignons de forêt, beurre blanc au porto et huile de truffe, saupoudrées de Parmigiano-Reggiano.",
    ingredients: ["Pennes artisanales", "Cèpes", "Champignons sauvages", "Huile de truffe", "Parmigiano-Reggiano"],
    pairedWine: "Louis Latour Bourgogne Pinot Noir",
    allergens: ["Gluten", "Lait"],
    tags: ["Végétarien", "Signature"]
  },
  m6: {
    name: "Steak de Chou-Fleur Coco-Gingembre",
    description: "Tranche épaisse de chou-fleur organique frottée aux épices de fusion, dorée au four, servie sur un lit de lentilles beluga, brocolis sautés et réduction onctueuse de coco au gingembre.",
    ingredients: ["Chou-fleur biologique", "Lentilles Beluga", "Brocolis", "Lait de coco", "Racine de gingembre", "Citronnelle"],
    pairedWine: "Champagne Brut Nature",
    allergens: [],
    tags: ["Végétalien"]
  },
  d1: {
    name: "Fondant au Chocolat 70% de Cacao",
    description: "Fondant au chocolat élaboré à partir de fèves de cacao biologique ghanéen à 70%, révélant un cœur coulant espresso-chocolat chaud, accompagné de glace vanille de Madagascar.",
    ingredients: ["Cacao bio du Ghana", "Café espresso", "Farine", "Beurre", "Glace vanille de Madagascar"],
    pairedWine: "Porto de 20 Ans Taylor Fladgate",
    allergens: ["Lait", "Œufs", "Gluten"],
    tags: ["Végétarien", "Signature"]
  },
  d2: {
    name: "Crème Brûlée Gingembre & Citronnelle",
    description: "Entremets crémeux vanille infusé de citronnelle locale et de gingembre frais, surmonté d'un délicat voile de sucre caramélisé au chalumeau et de petits fruits rouges d'Accra.",
    ingredients: ["Crème fraîche", "Jaunes d'œufs", "Citronnelle", "Gingembre", "Sucre de canne bio"],
    pairedWine: "Vin de dessert Sauternes",
    allergens: ["Lait", "Œufs"],
    tags: ["Végétarien"]
  },
  d3: {
    name: "Profiteroles au Chocolat Chaud",
    description: "Choux croustillants faits maison garnis d'une glace double vanille onctueuse, nappés à table de chocolat noir chaud coulant.",
    ingredients: ["Chaux maison", "Glace double-vanille", "Chocolat noir belge", "Crème fouettée"],
    pairedWine: "Vin de dessert Sauternes",
    allergens: ["Gluten", "Lait", "Œufs"],
    tags: ["Végétarien"]
  },
  b1: {
    name: "Mule au Tamarin & Gingembre",
    description: "Un mocktail rafraîchissant sans alcool composé de racine de gingembre frais pressé à froid, extrait de tamarin doux, citron vert frais, eau pétillante et brins de menthe fraîche.",
    ingredients: ["Gingembre frais", "Pulpe de tamarin", "Citron vert", "Eau gazeuse", "Menthe fraîche"],
    pairedWine: undefined,
    allergens: [],
    tags: ["Végétalien", "Sans Alcool"]
  },
  b2: {
    name: "Sélection Bordeaux Prestige Le Magellan",
    description: "Un verre équilibré de grand cru rouge de Bordeaux, offrant de délicates notes de cerise noire mûre, cuir, épices boisées de chêne français et tabac blond.",
    ingredients: ["Cépages d'exception rouges", "Levures naturelles de fermentation"],
    pairedWine: undefined,
    allergens: ["Sulfites"],
    tags: ["Végétalien", "Alcoolisé"]
  },
  b3: {
    name: "Cosmopolitan Blanc au Green Matcha",
    description: "Cocktail mixologie haut de gamme associant une vodka raffinée infusée au thé vert matcha d'Uji (cérémonial), triple sec, citron vert frais et jus de canneberge blanche.",
    ingredients: ["Vodka premium", "Matcha cérémoniel", "Liqueur d'orange", "Canneberge blanche", "Citron vert"],
    pairedWine: undefined,
    allergens: [],
    tags: ["Végétalien", "Alcoolisé"]
  }
};

interface MenuSectionProps {
  onAddToCart: (dish: Dish, quantity: number, instructions?: string) => void;
}

export default function MenuSection({ onAddToCart }: MenuSectionProps) {
  const { language, t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [activeDietary, setActiveDietary] = useState<string[]>([]);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [customInstructions, setCustomInstructions] = useState('');
  const [addedItemMessageId, setAddedItemMessageId] = useState<string | null>(null);

  // Translate dish utility
  const getDishField = <K extends 'name' | 'description' | 'ingredients' | 'pairedWine' | 'allergens' | 'tags'>(
    dish: Dish,
    field: K
  ): NonNullable<typeof DISH_TRANSLATIONS[string][K]> => {
    if (language === 'fr') {
      const trans = DISH_TRANSLATIONS[dish.id];
      if (trans && trans[field] !== undefined) {
        return trans[field] as any;
      }
    }
    if (field === 'tags') {
      return dish.tags as any;
    }
    if (field === 'ingredients') {
      return dish.ingredients as any;
    }
    if (field === 'allergens') {
      return dish.allergens as any;
    }
    return dish[field as keyof Dish] as any;
  };

  const getTranslatedTag = (tag: string) => {
    if (language !== 'fr') return tag;
    const map: Record<string, string> = {
      'Signature': 'Signature',
      'Vegetarian': 'Végétarien',
      'Seafood': 'Garnie de l\'Océan',
      'Best Seller': 'Best-Seller',
      'Vegan': 'Végétalien',
      'Non-Alcoholic': 'Sans Alcool',
      'Alcoholic': 'Alcoolisé'
    };
    return map[tag] || tag;
  };

  // Available tags for quick toggling
  const ALL_TAGS = ['Signature', 'Vegetarian', 'Seafood', 'Best Seller'];

  // Filter logic
  const filteredDishes = DISHES.filter((dish) => {
    const matchesCategory = selectedCategory === 'all' || dish.category === selectedCategory;
    
    // Check both English and French fields for query match
    const frName = DISH_TRANSLATIONS[dish.id]?.name || '';
    const frDesc = DISH_TRANSLATIONS[dish.id]?.description || '';
    const frIngs = DISH_TRANSLATIONS[dish.id]?.ingredients || [];

    const matchesSearch = 
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.ingredients.some(i => i.toLowerCase().includes(searchQuery.toLowerCase())) ||
      frName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      frDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      frIngs.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTags = activeTags.length === 0 || 
      activeTags.every(tag => dish.tags.includes(tag));

    const matchesDietary = activeDietary.every(diet => {
      if (diet === 'Vegan') {
        return dish.tags.some(t => t.toLowerCase() === 'vegan');
      }
      if (diet === 'Gluten-Free') {
        return dish.tags.some(t => t.toLowerCase() === 'gluten-free') || !dish.allergens.some(a => a.toLowerCase() === 'gluten');
      }
      if (diet === 'Halal') {
        return !dish.tags.some(t => t.toLowerCase() === 'alcoholic');
      }
      if (diet === 'Nut-Free') {
        return !dish.allergens.some(a => a.toLowerCase() === 'nuts' || a.toLowerCase() === 'peanuts');
      }
      return true;
    });

    return matchesCategory && matchesSearch && matchesTags && matchesDietary;
  });

  const handleTagToggle = (tag: string) => {
    if (activeTags.includes(tag)) {
      setActiveTags(activeTags.filter(t => t !== tag));
    } else {
      setActiveTags([...activeTags, tag]);
    }
  };

  const handleDietaryToggle = (diet: string) => {
    if (activeDietary.includes(diet)) {
      setActiveDietary(activeDietary.filter(d => d !== diet));
    } else {
      setActiveDietary([...activeDietary, diet]);
    }
  };

  const handleOpenDishModal = (dish: Dish) => {
    setSelectedDish(dish);
    setQuantity(1);
    setCustomInstructions('');
  };

  const handleAddFromModal = () => {
    if (!selectedDish) return;
    onAddToCart(selectedDish, quantity, customInstructions);
    
    // Trigger "Added" banner
    setAddedItemMessageId(selectedDish.id);
    setTimeout(() => setAddedItemMessageId(null), 2500);
    
    setSelectedDish(null);
  };

  const handleQuickAdd = (dish: Dish, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(dish, 1, '');
    setAddedItemMessageId(dish.id);
    setTimeout(() => setAddedItemMessageId(null), 2500);
  };

  const categoryNamesInLang = {
    all: language === 'fr' ? 'Toutes les Créations' : 'All Creations',
    starters: language === 'fr' ? 'Entrées' : 'Starters',
    mains: language === 'fr' ? 'Plats Principaux' : 'Mains',
    desserts: language === 'fr' ? 'Desserts' : 'Desserts',
    beverages: language === 'fr' ? 'Boissons' : 'Beverages'
  };

  return (
    <section id="menu-section" className="py-24 bg-[#0a0a0a] scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#c5a47e] block mb-3 font-semibold">
            {language === 'fr' ? "Journal Culinaire Numérique" : "Digital Culinary Journal"}
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-white font-light tracking-wide mb-4">
            {language === 'fr' ? "Notre Carte Saisonnière" : "Our Seasonal Menu"}
          </h2>
          <div className="h-[1px] w-12 bg-[#c5a47e] mx-auto mb-6" />
          <p className="text-white/50 font-sans text-sm font-light leading-relaxed">
            {language === 'fr'
              ? "Découvrez une curation de recettes patrimoniales d'inspiration française, revisitées à l'aide de produits locaux bio de la côte à l'assiette."
              : "Delve into of a curation of heritage recipes inspired by French traditions, revitalized through organic, coast-to-plate local elements."
            }
          </p>
        </div>

        {/* Search and Filters Hub */}
        <div className="bg-[#121212]/50 backdrop-blur-md border border-white/5 rounded-none p-6 shadow-2xl mb-12">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
            
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 w-full lg:w-auto">
              {(['all', 'starters', 'mains', 'desserts', 'beverages'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2.5 rounded-none font-sans text-[10px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#c5a47e] text-black shadow-none'
                      : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white'
                  }`}
                >
                  {categoryNamesInLang[cat]}
                </button>
              ))}
            </div>

            {/* Keyword Search */}
            <div className="relative w-full lg:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'fr' ? "Rechercher des saveurs, vins, ingrédients..." : "Search flavors, wines, ingredients..."}
                className="w-full bg-white/5 border border-white/5 text-white placeholder-white/30 rounded-none py-2.5 pl-10 pr-4 text-[11px] font-sans focus:outline-none focus:border-[#c5a47e]/60 focus:bg-white/10 transition-all"
              />
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-white/35" />
            </div>
          </div>

          {/* Core Dietary Requirements Matcher Bar */}
          <div className="pt-4 border-t border-white/5 flex flex-col md:flex-row md:items-center gap-3 mb-4">
            <span className="font-sans text-[9px] text-white/40 uppercase tracking-[0.2em] flex items-center gap-1.5 font-bold shrink-0">
              <SlidersHorizontal className="h-3 w-3 text-[#c5a47e]" />
              {language === 'fr' ? "Filtre Diététique :" : "Dietary Matcher:"}
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'Vegan', label: language === 'fr' ? 'Végétalien' : 'Vegan', icon: '🌱', desc: language === 'fr' ? 'Pas de produit animalier' : 'No animal products' },
                { id: 'Gluten-Free', label: language === 'fr' ? 'Sans Gluten' : 'Gluten-Free', icon: '🌾', desc: language === 'fr' ? 'Adapté pour cœliaque' : 'Celiac safe selection' },
                { id: 'Halal', label: language === 'fr' ? 'Halal' : 'Halal', icon: '🕌', desc: language === 'fr' ? 'Préparation certifiée halal' : 'No alcohol/certified preparation' },
                { id: 'Nut-Free', label: language === 'fr' ? 'Sans Noix' : 'Nut-Free', icon: '🥜', desc: language === 'fr' ? 'Sans aucune arachide' : 'Contains zero nuts' }
              ].map((diet) => {
                const isSelected = activeDietary.includes(diet.id);
                return (
                  <button
                    key={diet.id}
                    onClick={() => handleDietaryToggle(diet.id)}
                    className={`px-3 py-1.5 rounded-none font-sans text-[10px] uppercase tracking-[0.12em] transition-all duration-300 cursor-pointer flex items-center gap-2 border ${
                      isSelected
                        ? 'bg-[#c5a47e] text-black border-transparent font-bold shadow-lg shadow-[#c5a47e]/15'
                        : 'bg-[#151515] hover:bg-[#1a1a1a] border-white/5 text-white/60 hover:border-[#c5a47e]/30 hover:text-white'
                    }`}
                    title={diet.desc}
                  >
                    <span>{diet.icon}</span>
                    <span>{diet.label}</span>
                  </button>
                );
              })}

              {activeDietary.length > 0 && (
                <button
                  onClick={() => setActiveDietary([])}
                  className="text-white/40 hover:text-[#c5a47e] font-mono text-[9px] uppercase tracking-widest pl-3 self-center cursor-pointer transition-colors"
                >
                  {language === 'fr' ? "Effacer les Filtres" : "Clear Dietary"}
                </button>
              )}
            </div>
          </div>

          {/* Special Dietary Tags filters */}
          <div className="pt-4 border-t border-white/5 flex flex-wrap items-center gap-2">
            <span className="font-sans text-[9px] text-white/40 uppercase tracking-[0.2em] mr-2 flex items-center gap-1.5 font-medium">
              <span>🏷️</span>
              {language === 'fr' ? "Étiquettes :" : "Category Tags:"}
            </span>
            {ALL_TAGS.map((tag) => {
              const isSelected = activeTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1.5 rounded-none font-sans text-[9px] uppercase tracking-[0.15em] transition-all duration-200 cursor-pointer flex items-center gap-1 border ${
                    isSelected
                      ? 'bg-[#c5a47e]/15 border-[#c5a47e] text-[#c5a47e] font-semibold'
                      : 'bg-white/5 border-transparent text-white/50 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {isSelected && <Check className="h-2.5 w-2.5" />}
                  {getTranslatedTag(tag)}
                </button>
              );
            })}
            
            {activeTags.length > 0 && (
              <button
                onClick={() => setActiveTags([])}
                className="text-white/40 hover:text-[#c5a47e] font-mono text-[9px] uppercase tracking-widest pl-2 cursor-pointer"
              >
                {language === 'fr' ? "Effacer" : "Clear Tags"}
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Items Counter */}
        <div className="flex justify-between items-center mb-6">
          <p className="font-sans text-[10px] text-white/30 tracking-[0.15em] uppercase">
            {language === 'fr' ? (
              <>Affichage de <span className="font-bold text-white/80">{filteredDishes.length}</span> créations</>
            ) : (
              <>Showing <span className="font-bold text-white/80">{filteredDishes.length}</span> creations</>
            )}
          </p>
          {addedItemMessageId && (
            <span className="font-sans text-[11px] uppercase tracking-wider bg-emerald-950/20 text-emerald-400 px-3.5 py-1.5 border border-emerald-500/20 flex items-center gap-1.5 animate-bounce">
              <Check className="h-3.5 w-3.5" /> {language === 'fr' ? "Ajouté à votre panier d'achat !" : "Added to your dining card!"}
            </span>
          )}
        </div>

        {/* Dishes Grid */}
        {filteredDishes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDishes.map((dish, index) => (
              <motion.div
                key={dish.id}
                id={`dish-card-${dish.id}`}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ 
                  duration: 0.65, 
                  ease: [0.16, 1, 0.3, 1], // Premium custom cubic easeOut decelerating curve
                  delay: Math.min((index % 3) * 0.08, 0.24) // Drop-cascading delays per column
                }}
                className="group relative bg-[#121212] border border-white/5 rounded-none overflow-hidden hover:shadow-2xl hover:border-[#c5a47e]/30 transition-all duration-300"
              >
                {/* Image Section */}
                <div className="h-56 w-full overflow-hidden relative border-b border-white/5">
                  <img
                    src={dish.image}
                    alt={getDishField(dish, 'name')}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Subtle Top Grade Layer */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-transparent to-transparent opacity-90" />
                  
                  {/* Tags */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                    {dish.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-black/95 text-[#c5a47e] border border-[#c5a47e]/20 font-sans text-[8px] uppercase tracking-[0.2em] font-medium"
                      >
                        {getTranslatedTag(tag)}
                      </span>
                    ))}
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute bottom-3 right-4 flex items-center gap-1 bg-[#c5a47e] text-black font-sans text-[10px] font-bold px-2 py-0.5 rounded-none shadow-md">
                    <Star className="h-2.5 w-2.5 fill-black text-black" />
                    {dish.rating}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  {/* Title & Price Row */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-serif text-lg text-white font-light tracking-wide group-hover:text-[#c5a47e] transition-colors">
                      {getDishField(dish, 'name')}
                    </h3>
                    <span className="font-mono text-xs font-semibold text-[#c5a47e] bg-white/5 border border-white/5 px-2 py-1 rounded-none">
                      GH₵{dish.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-white/40 text-[12px] font-sans font-light leading-relaxed mb-4 line-clamp-2">
                    {getDishField(dish, 'description')}
                  </p>

                  {/* Dietary Badge indicators */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {(dish.tags.some(t => t.toLowerCase() === 'vegan')) && (
                      <span className="text-[9px] text-[#c5a47e]/90 bg-[#c5a47e]/5 border border-[#c5a47e]/10 px-2 py-0.5 rounded-none font-sans font-medium">
                        🌱 {language === 'fr' ? 'Végétalien' : 'Vegan'}
                      </span>
                    )}
                    {(dish.tags.some(t => t.toLowerCase() === 'gluten-free') || !dish.allergens.some(a => a.toLowerCase() === 'gluten')) && (
                      <span className="text-[9px] text-[#c5a47e]/90 bg-[#c5a47e]/5 border border-[#c5a47e]/10 px-2 py-0.5 rounded-none font-sans font-medium">
                        🌾 {language === 'fr' ? 'Sans Gluten' : 'Gluten-Free'}
                      </span>
                    )}
                    {(!dish.tags.some(t => t.toLowerCase() === 'alcoholic')) && (
                      <span className="text-[9px] text-[#c5a47e]/90 bg-[#c5a47e]/5 border border-[#c5a47e]/10 px-2 py-0.5 rounded-none font-sans font-medium">
                        🕌 {language === 'fr' ? 'Conforme Halal' : 'Halal Compliant'}
                      </span>
                    )}
                    {(!dish.allergens.some(a => a.toLowerCase() === 'nuts' || a.toLowerCase() === 'peanuts')) && (
                      <span className="text-[9px] text-[#c5a47e]/90 bg-[#c5a47e]/5 border border-[#c5a47e]/10 px-2 py-0.5 rounded-none font-sans font-medium">
                        🥜 {language === 'fr' ? 'Sans Noix' : 'Nut-Free'}
                      </span>
                    )}
                  </div>

                  {/* Operational Details (Prep time & wine pairs) */}
                  <div className="flex items-center gap-4 text-white/30 text-[10px] font-mono uppercase tracking-wider mb-6 border-t border-white/5 pt-4">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-white/30" />
                      {dish.prepMinutes} {language === 'fr' ? 'mins' : 'mins'}
                    </span>
                    {dish.pairedWine && (
                      <span className="flex items-center gap-1 flex-1 truncate">
                        <Wine className="h-3 w-3 text-[#c5a47e]" />
                        {language === 'fr' ? 'Suggestion d’accord vin' : 'Wine pairing suggestion'}
                      </span>
                    )}
                  </div>

                  {/* Interactive Button Row */}
                  <div className="flex gap-2">
                    <button
                      id={`btn-detail-${dish.id}`}
                      onClick={() => handleOpenDishModal(dish)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-none border border-white/10 hover:border-[#c5a47e] hover:bg-[#c5a47e]/5 font-sans text-[10px] font-semibold uppercase tracking-[0.15em] text-white hover:text-[#c5a47e] transition-colors cursor-pointer"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      {language === 'fr' ? 'Détails' : 'View Details'}
                    </button>
                    
                    <button
                      id={`btn-quick-add-${dish.id}`}
                      onClick={(e) => handleQuickAdd(dish, e)}
                      className="px-3 md:px-4 rounded-none bg-[#c5a47e] hover:bg-[#b08d65] text-black font-sans text-xs font-semibold flex items-center justify-center transition-all duration-200 cursor-pointer"
                      title={language === 'fr' ? "Ajout rapide" : "Quick add to ordering box"}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#121212]/50 border border-white/5 border-dashed rounded-none">
            <Sparkles className="h-10 w-10 text-white/20 mx-auto mb-3" />
            <h3 className="font-serif text-lg text-white/70 font-light mb-1">
              {language === 'fr' ? "Aucun délice trouvé" : "No delicacies discoverable"}
            </h3>
            <p className="text-white/40 text-xs font-light max-w-sm mx-auto">
              {language === 'fr'
                ? "Nous n'avons trouvé aucune création correspondant à votre recherche. Essayez de sélectionner 'Toutes les Créations' ou d'effacer les filtres diététiques."
                : "We couldn't find dish variations matching your search options. Try selecting \"All Creations\" or clearing dietary filters."
              }
            </p>
          </div>
        )}

      </div>

      {/* DISH INGREDIENTS DETAIL MODAL */}
      {selectedDish && (
        <div 
          id="item-detail-modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
        >
          <div className="relative bg-[#121212] border border-white/10 rounded-none max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200 text-white">
            {/* Close Button */}
            <button
              onClick={() => setSelectedDish(null)}
              className="absolute top-4 right-4 p-2.5 border border-white/10 bg-white/5 text-white/50 hover:text-white transition cursor-pointer rounded-none"
            >
              <XIcon className="h-4 w-4" />
            </button>

            {/* Modal Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
              {/* Image Column */}
              <div>
                <img
                  src={selectedDish.image}
                  alt={getDishField(selectedDish, 'name')}
                  className="w-full h-48 md:h-64 object-cover rounded-none border border-white/5 shadow-md mb-4"
                />
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {selectedDish.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-0.5 bg-white/5 text-[#c5a47e] border border-white/5 font-sans text-[8px] uppercase tracking-[0.2em]">
                      {getTranslatedTag(tag)}
                    </span>
                  ))}
                </div>

                {selectedDish.allergens.length > 0 ? (
                  <div className="p-3 bg-red-950/20 border border-red-900/30 rounded-none flex items-start gap-2 text-red-400 text-[11px]">
                    <ShieldAlert className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block uppercase font-mono text-[9px] tracking-widest text-red-300">
                        {language === 'fr' ? 'Contient des Allergènes :' : 'Contains Allergens:'}
                      </span>
                      {selectedDish.allergens.map(a => language === 'fr' ? (a === 'Dairy' ? 'Lait' : a === 'Nuts' ? 'Noix' : a === 'Gluten' ? 'Gluten' : a === 'Eggs' ? 'Œufs' : a === 'Fish' ? 'Poisson' : a === 'Soy' ? 'Soja' : a === 'Sulfites' ? 'Sulfites' : a) : a).join(', ')}
                    </div>
                  </div>
                ) : (
                  <div className="p-2.5 bg-emerald-950/20 border border-emerald-920 rounded-none text-emerald-400 text-[9px] font-sans tracking-[0.15em] uppercase font-semibold">
                    ✓ {language === 'fr' ? 'Recette de base sans allergènes' : 'Non-Allergenic Base Recipe'}
                  </div>
                )}
              </div>

              {/* Data Details Column */}
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-white font-light tracking-wide leading-tight mb-2">
                    {getDishField(selectedDish, 'name')}
                  </h3>
                  <div className="flex items-center gap-3 font-sans text-[10px] text-white/40 uppercase tracking-[0.15em] mb-4 pb-4 border-b border-white/5">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{selectedDish.prepMinutes}m</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Flame className="h-3 w-3 text-[#c5a47e]" />{selectedDish.calories} kcal</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Star className="h-3 w-3 text-[#c5a47e] fill-[#c5a47e]" />{selectedDish.rating} {language === 'fr' ? 'note' : 'rating'}</span>
                  </div>

                  <p className="text-white/60 text-xs font-sans font-light leading-relaxed mb-6">
                    {getDishField(selectedDish, 'description')}
                  </p>

                  {/* Ingredients Breakdown */}
                  <div className="mb-6">
                    <h4 className="font-sans text-[10px] text-white/30 uppercase tracking-[0.2em] mb-2 font-bold">
                      {language === 'fr' ? 'Composition Essentielle' : 'Essential Ingredients'}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {getDishField(selectedDish, 'ingredients').map((ing) => (
                        <span key={ing} className="px-3 py-1 rounded-none bg-white/5 border border-white/5 text-white/75 text-[11px] font-sans">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Sommelier pairings */}
                  {selectedDish.pairedWine && (
                    <div className="p-3 bg-[#c5a47e]/5 border border-[#c5a47e]/15 rounded-none mb-6 flex items-start gap-3">
                      <Wine className="h-4 w-4 text-[#c5a47e] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#c5a47e] block font-semibold">
                          {language === 'fr' ? 'Recommandation Sommelier' : 'Sommelier Recommendation'}
                        </span>
                        <p className="text-white/80 text-xs italic font-serif leading-snug mt-1">
                          {getDishField(selectedDish, 'pairedWine') || selectedDish.pairedWine}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Modifications Request */}
                  <div className="mb-6">
                    <label className="block font-sans text-[10px] text-white/30 uppercase tracking-[0.2em] mb-2 font-bold">
                      {language === 'fr' ? "Demandes de Modifications Spéciales (Optionnel)" : "Custom Kitchen Requests (Optional)"}
                    </label>
                    <input
                      type="text"
                      value={customInstructions}
                      onChange={(e) => setCustomInstructions(e.target.value)}
                      placeholder={language === 'fr' ? "ex : sauce à part, sans certains oignons, etc." : "e.g., dressing on side, allergy notes..."}
                      className="w-full bg-white/5 border border-white/5 text-white placeholder-white/20 rounded-none py-2 px-3 text-xs focus:outline-none focus:border-[#c5a47e] focus:bg-white/10"
                    />
                  </div>
                </div>

                {/* Reservation / Cart Bottom row inside modal */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2 border border-white/10 rounded-none bg-white/5 p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1 rounded-none text-white/60 hover:text-white hover:bg-white/10 text-sm font-semibold h-7 w-7 flex items-center justify-center cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-mono text-xs w-6 text-center font-bold text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1 rounded-none text-white/60 hover:text-white hover:bg-white/10 text-sm font-semibold h-7 w-7 flex items-center justify-center cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <button
                    id="modal-add-cart-btn"
                    onClick={handleAddFromModal}
                    className="flex-1 bg-[#c5a47e] hover:bg-[#b08d65] text-black font-sans text-[10px] font-semibold py-3.5 px-4 rounded-none flex items-center justify-center gap-2 transition-all cursor-pointer uppercase tracking-[0.2em]"
                  >
                    {language === 'fr' ? (
                      <>Ajouter {(selectedDish.price * quantity).toFixed(2)} GH₵ à la commande</>
                    ) : (
                      <>Add GH₵{(selectedDish.price * quantity).toFixed(2)} to Order</>
                    )}
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}

// Simple internal quick icon
function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}
