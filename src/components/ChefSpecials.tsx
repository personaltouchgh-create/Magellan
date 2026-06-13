import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ShoppingBag, Check, Flame, Sparkles, Clock, Wine, Star } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';
import { Dish } from '../types';

interface ChefSpecialsProps {
  onAddToCart: (dish: Dish, quantity: number, instructions?: string) => void;
}

interface TranslatedSpecial {
  id: string;
  price: number;
  category: 'starters' | 'mains' | 'desserts' | 'beverages';
  image: string;
  tags_en: string[];
  tags_fr: string[];
  allergens_en: string[];
  allergens_fr: string[];
  ingredients_en: string[];
  ingredients_fr: string[];
  calories: number;
  rating: number;
  pairedWine_en?: string;
  pairedWine_fr?: string;
  prepMinutes: number;
  badge_en: string;
  badge_fr: string;
  chefNote_en: string;
  chefNote_fr: string;
  name_en: string;
  name_fr: string;
  description_en: string;
  description_fr: string;
}

// Special dishes that are exclusive to the Chef's Weekly Specials (Limited Time) Dual Lang
const SPECIAL_DISHES: TranslatedSpecial[] = [
  {
    id: 'spec1',
    name_en: 'Red Snapper Bouillabaisse au Gingembre',
    name_fr: 'Bouillabaisse de Vivaneau Rouge au Gingembre',
    description_en: 'Freshly caught local Atlantic red snapper, jumbo prawns, and baby squid gently poached in a rich Marseillaise saffron-fennel double broth. Spiked with fresh Shama ginger, star anise, lemongrass, and micro-cilantro, served with a matching crusty artisan sourdough.',
    description_fr: 'Vivaneau rouge de l\'Atlantique local, crevettes géantes et jeunes calmars délicatement pochés dans un riche double bouillon marseillais au safran et fenouil. Parfumé au gingembre frais de Shama, à l\'anis étoilé, à la citronnelle et à la coriandre, servi avec son pain au levain artisanal.',
    price: 550.00,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&q=80&w=1200',
    tags_en: ['Michelin Special', 'Fusion', 'Seafood'],
    tags_fr: ['Spécial Michelin', 'Fusion', 'Fruits de Mer'],
    allergens_en: ['Fish', 'Crustaceans', 'Gluten'],
    allergens_fr: ['Poisson', 'Crustacés', 'Gluten'],
    ingredients_en: ['Red Snapper', 'Jumbo Prawns', 'Saffron', 'Local Ginger', 'Lemongrass', 'Sourdough'],
    ingredients_fr: ['Vivaneau Rouge', 'Crevettes Géantes', 'Safran', 'Gingembre National', 'Citronnelle', 'Pain au Levain'],
    calories: 620,
    rating: 4.98,
    prepMinutes: 25,
    pairedWine_en: 'Chablis Grand Cru Reserve 2024',
    pairedWine_fr: 'Chablis Grand Cru Réserve 2024',
    badge_en: 'Limited Time • Weekly Star',
    badge_fr: 'Durée Limitée • Étoile de la Semaine',
    chefNote_en: 'A personal love letter to West African coastal bounty made using the absolute finest French reduction techniques. The ginger brings a spectacular warmth that normal Bouillabaisse misses.',
    chefNote_fr: "Une lettre d'amour personnelle à la richesse côtière ouest-africaine, préparée selon les plus fines techniques de réduction françaises. Le gingembre apporte une chaleur spectaculaire."
  },
  {
    id: 'spec2',
    name_en: 'Cracked Szechuan Duck Leg Confit',
    name_fr: 'Confit de Cuisse de Canard au Poivre de Sichuan',
    description_en: 'Traditional French Barbary duck leg, slow-cooked in its own fat with local aromatic herbs for 12 hours, then flash-seared in a blazing wok. Coated in a shimmering glaze of cracked Szechuan Peppercorns, wild forest organic honey, and dark soy reduction. Rested on a velvety sweet potato mash.',
    description_fr: 'Cuisse de canard de Barbarie française traditionnelle, mijotée dans sa propre graisse avec des herbes aromatiques locales pendant 12 heures, puis saisie au wok. Enrobée d\'un glaçage brillant de poivre de Sichuan concassé, de miel de forêt sauvage et de soja, servie sur une purée de patates douces.',
    price: 620.00,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&q=80&w=1200',
    tags_en: ['Chef Signature', 'Slow-Cooked', 'Decadent'],
    tags_fr: ['Signature du Chef', 'Mijoté Lentement', 'Décadence'],
    allergens_en: ['Soy', 'Dairy'],
    allergens_fr: ['Soja', 'Laitages'],
    ingredients_en: ['Barbary Duck', 'Szechuan Peppercorn', 'Forest Honey', 'Sweet Potato', 'Star Anise'],
    ingredients_fr: ['Canard de Barbarie', 'Poivre de Sichuan', 'Miel Sauvage', 'Patate Douce', 'Badiane'],
    calories: 780,
    rating: 4.96,
    prepMinutes: 20,
    pairedWine_en: 'Gevrey-Chambertin Pinot Noir 2022',
    pairedWine_fr: 'Gevrey-Chambertin Pinot Noir 2022',
    badge_en: 'Limited Time • Signature Piece',
    badge_fr: 'Durée Limitée • Signature d\'Exception',
    chefNote_en: 'We achieve a crispy skin that carries the electric buzz of authentic Szechuan peppercorn, balanced beautifully by the rich sweetness of Ghanaian wild honey.',
    chefNote_fr: "Nous obtenons une peau croustillante qui porte le frisson électrique du poivre de Sichuan, magnifiquement équilibré par la douceur du miel sauvage ghanéen."
  },
  {
    id: 'spec3',
    name_en: 'Ginger-Lemongrass Crème Diplomate',
    name_fr: 'Crème Diplomate Citronnelle & Gingembre',
    description_en: 'A luxurious, silky French diplomat cream infused with freshly crushed lemongrass stalks and sweet ginger nectar from our Osu kitchen garden. Layered elegantly with slow-caramelized local pineapple pieces, fine Ghanaian roasted cocoa nib crumbles, and topped with 24-karat gold leaf.',
    description_fr: 'Une crème diplomate soyeuse infusée de tiges de citronnelle fraîchement écrasées et de nectar de gingembre doux de notre jardin d\'Osu. Superposée avec de l\'ananas local caramélisé, du crumble de fèves de cacao ghanéennes torréfiées et surmontée d\'or 24 carats.',
    price: 180.00,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=1200',
    tags_en: ['Artisanal Dessert', 'Sweet Fusion'],
    tags_fr: ['Dessert Artisanal', 'Douce Fusion'],
    allergens_en: ['Dairy', 'Eggs', 'Gluten'],
    allergens_fr: ['Laitages', 'Œufs', 'Gluten'],
    ingredients_en: ['Diplomat Cream', 'Local Lemongrass', 'Caramelized Pineapple', 'Cocoa Nibs', 'Gold Leaf'],
    ingredients_fr: ['Crème Diplomate', 'Citronnelle du Jardin', 'Ananas Caramélisé', 'Pépites de Cacao', 'Feuille d\'Or'],
    calories: 450,
    rating: 4.99,
    prepMinutes: 15,
    pairedWine_en: 'Château d\'Yquem Sauterne Reserve',
    pairedWine_fr: 'Château d\'Yquem Sauternes Réserve',
    badge_en: 'Limited Time • Seasonal Finale',
    badge_fr: 'Durée Limitée • Finale de Saison',
    chefNote_en: 'Diplomat cream is lighter than pastry cream, allowing the citrus tones of freshly-harvested local lemongrass to float beautifully on your tongue alongside chocolate crumbles.',
    chefNote_fr: "La crème diplomate est plus légère que la crème pâtissière, ce qui permet aux notes d'agrumes de notre citronnelle de danser délicatement en bouche aux côtés du crumble."
  }
];

export default function ChefSpecials({ onAddToCart }: ChefSpecialsProps) {
  const { language, t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [addedItemMessageId, setAddedItemMessageId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const slideDuration = 8000; // 8 seconds per slide
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef<number | null>(null);

  // Start autoplay timer and progress bar
  useEffect(() => {
    if (isPlaying) {
      const startTime = Date.now();
      const intervalMs = 50;
      
      progressIntervalRef.current = window.setInterval(() => {
        const elapsed = Date.now() - startTime;
        const nextProgress = Math.min((elapsed / slideDuration) * 100, 100);
        setProgress(nextProgress);
        
        if (elapsed >= slideDuration) {
          handleNext();
        }
      }, intervalMs);
    } else {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [activeIndex, isPlaying]);

  const handleNext = () => {
    setDirection(1);
    setProgress(0);
    setActiveIndex((prevIndex) => (prevIndex + 1) % SPECIAL_DISHES.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setProgress(0);
    setActiveIndex((prevIndex) => (prevIndex - 1 + SPECIAL_DISHES.length) % SPECIAL_DISHES.length);
  };

  const handleSelectSlide = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setProgress(0);
    setActiveIndex(index);
  };

  const currentSpecial = SPECIAL_DISHES[activeIndex];

  // Derive dynamic translated dish values
  const currentDish: Dish = {
    id: currentSpecial.id,
    name: language === 'fr' ? currentSpecial.name_fr : currentSpecial.name_en,
    description: language === 'fr' ? currentSpecial.description_fr : currentSpecial.description_en,
    price: currentSpecial.price,
    category: currentSpecial.category,
    image: currentSpecial.image,
    tags: language === 'fr' ? currentSpecial.tags_fr : currentSpecial.tags_en,
    allergens: language === 'fr' ? currentSpecial.allergens_fr : currentSpecial.allergens_en,
    ingredients: language === 'fr' ? currentSpecial.ingredients_fr : currentSpecial.ingredients_en,
    calories: currentSpecial.calories,
    rating: currentSpecial.rating,
    pairedWine: language === 'fr' ? currentSpecial.pairedWine_fr : currentSpecial.pairedWine_en,
    prepMinutes: currentSpecial.prepMinutes,
  };

  const currentBadge = language === 'fr' ? currentSpecial.badge_fr : currentSpecial.badge_en;
  const currentChefNote = language === 'fr' ? currentSpecial.chefNote_fr : currentSpecial.chefNote_en;

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(currentDish, 1, language === 'fr' ? 'Commande Spéciale du Chef' : 'Chef Weekly Special Order');
    setAddedItemMessageId(currentDish.id);
    setTimeout(() => {
      setAddedItemMessageId(null);
    }, 3000);
  };

  // Variants for slide transition
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 260, damping: 28 },
        opacity: { duration: 0.4 }
      }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 260, damping: 28 },
        opacity: { duration: 0.3 }
      }
    })
  };

  return (
    <section 
      id="specials-section" 
      className="py-24 bg-[#0a0a0a] border-b border-white/5 scroll-mt-12 overflow-hidden relative"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Decorative ambient blurred backgrounds */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#c5a47e]/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#c5a47e]/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#c5a47e]/10 border border-[#c5a47e]/20 mb-3 rounded-none">
            <Sparkles className="h-3 w-3 text-[#c5a47e]" />
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#c5a47e] font-semibold">
              {language === 'fr' ? "Spectacle Gastronomique Hebdomadaire" : "Weekly Gastronomy Show"}
            </span>
          </div>
          <h2 className="font-serif text-4.5xl sm:text-5xl text-white font-light tracking-wide mb-4">
            {language === 'fr' ? "Les Suggestions Spéciales" : "Chef's Weekly Specials"}
          </h2>
          <div className="h-[1px] w-12 bg-[#c5a47e] mx-auto mb-5" />
          <p className="text-white/50 font-sans text-sm font-light leading-relaxed">
            {language === 'fr' 
              ? "Chaque semaine, notre chef sélectionne pour vous d'exceptionnelles créations en édition limitée, mariant avec délicatesse la tradition gastronomique française et les épices d'Afrique de l'Ouest."
              : "Every week, our Chef curates a bespoke selection of limited-term fusion masterpieces, blending classical French techniques with rich, vibrant Oriental spices from local Osu fields."
            }
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative min-h-[500px] lg:min-h-[460px] max-w-6xl mx-auto bg-[#111111]/85 border border-white/5 shadow-2.5xl flex flex-col justify-between">
          
          {/* Active slide content */}
          <div className="relative w-full h-full overflow-hidden flex-1 select-none">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full h-full grid grid-cols-1 lg:grid-cols-12 flex-1"
              >
                {/* Left side: Dynamic Image */}
                <div className="lg:col-span-5 h-[240px] sm:h-[300px] lg:h-full relative overflow-hidden select-none">
                  <picture>
                    <img
                      src={currentDish.image}
                      alt={currentDish.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center scale-100 hover:scale-105 transition-all duration-700 ease-out"
                    />
                  </picture>
                  
                  {/* Subtle shadows & border layers */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-black/10 lg:to-black/60 pointer-events-none" />
                  
                  {/* Unique item details tag details */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="bg-[#0a0a0a]/90 backdrop-blur-md border border-[#c5a47e]/30 px-3 py-1 font-sans text-[9px] text-[#c5a47e] uppercase tracking-[0.15em] font-semibold inline-block">
                      {language === 'fr' 
                        ? (currentDish.category === 'mains' ? 'plat principal' : currentDish.category === 'desserts' ? 'desserts' : currentDish.category) 
                        : currentDish.category
                      }
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 flex gap-1.5 flex-wrap">
                    {currentDish.tags?.map((tag, i) => (
                      <span key={i} className="bg-black/75 backdrop-blur-sm border border-white/5 text-white/80 font-sans text-[8px] uppercase tracking-wider px-2 py-0.5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right side: Detailed Culinary story */}
                <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between text-left space-y-6 relative">
                  
                  {/* Glowing Limited Time Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-950/40 border border-red-500/20 text-red-400 font-sans text-[9px] uppercase tracking-widest font-bold animate-[pulse_3s_infinite_alternate]">
                      <Flame className="h-3 w-3 text-red-500" />
                      <span>{currentBadge}</span>
                    </div>

                    <div className="text-right">
                      <span className="block font-sans text-[8px] text-white/30 uppercase tracking-[0.2em] font-semibold">
                        {language === 'fr' ? 'Tarif Dégustation' : 'Tasting Rate'}
                      </span>
                      <span className="font-mono text-2xl text-[#c5a47e] font-light">GH₵{currentDish.price.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Dish Title */}
                  <div className="space-y-3">
                    <h3 className="font-serif text-2xl sm:text-3.5xl text-white font-light tracking-wide leading-tight">
                      {currentDish.name}
                    </h3>
                    <div className="h-[1px] w-20 bg-[#c5a47e]/40" />
                  </div>

                  {/* Core Description Text */}
                  <p className="text-white/60 font-sans text-xs sm:text-sm font-light leading-relaxed">
                    {currentDish.description}
                  </p>

                  {/* Chef Story Quote */}
                  <div className="bg-white/3 border-l-2 border-[#c5a47e]/50 p-4 relative italic">
                    <span className="absolute right-4 top-2 font-serif text-3xl leading-none text-white/5 select-none font-bold">“</span>
                    <p className="text-white/50 font-sans text-[11px] sm:text-xs leading-relaxed">
                      {currentChefNote}
                    </p>
                    <span className="block font-sans text-[8px] uppercase tracking-widest text-[#c5a47e] font-bold mt-2 text-right">
                      — {language === 'fr' ? 'Chef de Cuisine, Le Magellan' : 'Chef de Cuisine, Le Magellan'}
                    </span>
                  </div>

                  {/* Metadata and order interaction */}
                  <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex gap-4 sm:gap-6 text-white/40 text-[10px] font-sans">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-[#c5a47e]" />
                        <span>Prep: {currentDish.prepMinutes} mins</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                        <span>Score: {currentDish.rating}</span>
                      </div>
                      {currentDish.pairedWine && (
                        <div className="hidden xs:flex items-center gap-1.5">
                          <Wine className="h-3.5 w-3.5 text-purple-400" />
                          <span className="truncate max-w-[150px]">
                            {language === 'fr' ? 'Accord: ' : 'Pair: '}{currentDish.pairedWine}
                          </span>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={handleAddToCartClick}
                      disabled={addedItemMessageId === currentDish.id}
                      className={`font-sans text-[9px] uppercase tracking-[0.2em] font-semibold py-3 px-5 border flex items-center justify-center gap-2 transition-all duration-300 w-full sm:w-auto cursor-pointer ${
                        addedItemMessageId === currentDish.id
                          ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-400 cursor-default'
                          : 'bg-[#c5a47e] hover:bg-[#b08d65] text-black border-transparent shadow-lg text-black font-extrabold'
                      }`}
                    >
                      {addedItemMessageId === currentDish.id ? (
                        <>
                          <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                          <span>{language === 'fr' ? 'Ajouté au Panier' : 'Added to Cart'}</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="h-3.5 w-3.5" />
                          <span>{language === 'fr' ? 'Commander la Suggestion' : 'Add to Order Bag'}</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Autoplay progress bar at bottom of the panel */}
          <div className="w-full h-[2px] bg-white/5 relative z-20">
            <div 
              className="h-full bg-gradient-to-r from-[#c5a47e]/50 to-[#c5a47e] transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Control bar */}
          <div className="p-4 border-t border-white/5 flex items-center justify-between bg-[#151515]/30">
            {/* Index summary */}
            <span className="font-mono text-[10px] text-white/30">
              0{activeIndex + 1} / 0{SPECIAL_DISHES.length} {language === 'fr' ? 'SÉLECTIONS SPÉCIALES' : 'SPECIAL SELECTIONS'}
            </span>

            {/* Bubble Dots Navigation */}
            <div className="flex gap-2">
              {SPECIAL_DISHES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectSlide(index)}
                  className={`h-1.5 transition-all duration-300 rounded-none cursor-pointer ${
                    activeIndex === index 
                      ? 'w-6 bg-[#c5a47e]' 
                      : 'w-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Jump to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Arrow controllers */}
            <div className="flex gap-1.5">
              <button
                onClick={handlePrev}
                className="p-1.5 border border-white/5 hover:border-[#c5a47e]/30 bg-[#0a0a0a]/50 text-white/50 hover:text-[#c5a47e] transition-all cursor-pointer"
                aria-label="Previous Special"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-1.5 border border-white/5 hover:border-[#c5a47e]/30 bg-[#0a0a0a]/50 text-white/50 hover:text-[#c5a47e] transition-all cursor-pointer"
                aria-label="Next Special"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
