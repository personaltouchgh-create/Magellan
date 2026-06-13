import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Award, Quote, BookOpen, Sparkles, Utensils, Compass } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

export default function MeetTheChef() {
  const { language, t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Close modal on escape keypress
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      window.addEventListener('keydown', handleEscape);
      // Prevent body scrolling when open
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <section id="meet-chef-section" className="py-24 bg-[#0d0d0c] border-t border-b border-white/5 relative overflow-hidden">
      {/* Background decorations matching the Magellan theme */}
      <div className="absolute inset-y-0 left-10 w-px bg-white/5 hidden xl:block pointer-events-none" />
      <div className="absolute inset-y-0 right-10 w-px bg-white/5 hidden xl:block pointer-events-none" />
      <div className="absolute -top-40 -left-40 h-[600px] w-[600px] bg-[#c5a47e]/5 rounded-none blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Block - Elegant Teaser Card */}
          <div className="lg:col-span-5 relative group">
            {/* Double framed border */}
            <div className="absolute -inset-4 border border-[#c5a47e]/20 pointer-events-none transition-transform duration-700 group-hover:scale-[1.02]" />
            <div className="relative bg-stone-950 border border-white/10 p-2 overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=800"
                alt="Head Chef Laurent Boisson cooking at Le Magellan"
                className="w-full h-[460px] object-cover object-top transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/40" />
              
              {/* Overlay Label */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-stone-950/90 border border-white/5 backdrop-blur-sm">
                <p className="font-mono text-[9px] text-[#c5a47e] tracking-[0.25em] uppercase mb-1">
                  Maître de Cuisine
                </p>
                <p className="font-serif text-lg text-white font-light tracking-wide">
                  Chef Laurent Boisson
                </p>
                <div className="flex items-center gap-1.5 mt-2 text-white/40 font-mono text-[9px] uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a47e]" />
                  {language === 'fr' ? "Lauréat de la Gastronomie Lyonnaise" : "Laureate de Gastronomie Lyonnaise"}
                </div>
              </div>
            </div>
          </div>

          {/* Right Block - Brief Story & Philosophy Highlights */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#c5a47e] block">
                L’Art de la Table
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-light tracking-wide leading-tight">
                {language === 'fr' ? (
                  <>Rencontrez l'Architecte de Notre <br /> <span className="italic font-light">Harmonie Gastronomique</span></>
                ) : (
                  <>Meet the Architect of <br /> Our <span className="italic font-light">Gastronomic Harmony</span></>
                )}
              </h2>
            </div>

            {/* Custom interactive quote card */}
            <div className="relative bg-stone-950 border-l-2 border-[#c5a47e] p-6 lg:p-8 shadow-xl">
              <Quote className="absolute top-4 right-4 h-8 w-8 text-white/5 opacity-40" />
              <p className="font-serif text-base sm:text-lg lg:text-xl text-white/90 italic font-light leading-relaxed">
                {language === 'fr' 
                  ? '"Cuisiner n\'est pas seulement un savoir-faire technique ; c\'est un dialogue spirituel. En mariant la rigueur classique française à la chaleur intense des épices ghanéennes et à l\'équilibre oriental, nous offrons une émotion dans chaque assiette."'
                  : '"Cooking is not just a technical craft; it is a spiritual dialogue. By blending French classical rigour with the intense warmth of local Ghanaian spices and Oriental balance, we present an emotion on every single plate."'
                }
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="h-px w-6 bg-[#c5a47e]/40" />
                <span className="font-mono text-[10px] uppercase text-[#c5a47e] tracking-widest">
                  Chef Laurent Boisson, Le Magellan Osu
                </span>
              </div>
            </div>

            <p className="text-white/60 font-sans text-xs sm:text-sm font-light leading-relaxed max-w-2xl">
              {language === 'fr'
                ? "Formé dans les légendaires académies culinaires de Lyon et perfectionné pendant une décennie entre Kyoto et Paris, le Chef Laurent Boisson apporte sa symphonie visionnaire franco-orientale directement au cœur vibrant de Osu, Accra. Notre carte représente le plus pur voyage de saveurs de sa vie."
                : "Trained in Lyon’s legendary culinary academies and refined over a decade across Kyoto and Paris, Chef Laurent Boisson brings his visionary French-Oriental symphony directly to the vibrant heart of Osu, Accra. Our menu represents his lifetime journey of flavor discovery."
              }
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <button
                id="view-chef-biography-btn"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-[#c5a47e] bg-transparent text-[#c5a47e] font-semibold text-[10px] sm:text-[11px] uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#c5a47e] hover:text-black active:scale-[0.98] cursor-pointer"
              >
                <BookOpen className="h-4 w-4" />
                {language === 'fr' ? 'Découvrir son Histoire & Philosophie' : 'Read Story & Philosophy'}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* IMMERSIVE BIOGRAPHICAL MODAL DIALOG */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10" id="chef-bio-modal-container">
            {/* Seamless blurry backdrop shade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-stone-950/95 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Card Structure */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-5xl bg-[#090909] border border-white/10 text-white shadow-2xl overflow-hidden max-h-[90vh] flex flex-col scale-100 z-10"
            >
              {/* Header Close Trigger */}
              <button
                id="close-chef-bio-modal"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-none border border-white/10 hover:border-[#c5a47e] text-white/70 hover:text-white transition-all cursor-pointer z-50 bg-stone-950"
                aria-label="Close culinary biography"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Scrollable Layout */}
              <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  
                  {/* Left Side: Stately Full Length Image */}
                  <div className="lg:col-span-5 h-[260px] sm:h-[400px] lg:h-full min-h-[300px] lg:min-h-[580px] relative bg-stone-900 border-b lg:border-b-0 lg:border-r border-white/10">
                    <img
                      src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=800"
                      alt="Chef Portrait standing ready"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent lg:hidden" />
                    <div className="absolute inset-0 bg-radial-[circle_at_center,_transparent_30%,_#090909_100%] pointer-events-none" />
                  </div>

                  {/* Right Side: Rich textual biography columns */}
                  <div className="lg:col-span-7 p-6 sm:p-8 lg:p-12 space-y-8">
                    
                    {/* Header Details */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-[#c5a47e] animate-pulse" />
                        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#c5a47e]">
                          Maître Culinaire de France
                        </span>
                      </div>
                      <h3 className="font-serif text-3xl sm:text-4xl text-white font-light tracking-wide">
                        Laurent Boisson
                      </h3>
                      <p className="text-xs text-white/50 font-mono tracking-wider">
                        {language === 'fr' ? 'Chef de Cuisine & Créateur Conceptuel, Le Magellan Osu' : 'Head Chef & Concept Creator, Le Magellan Osu'}
                      </p>
                    </div>

                    {/* Biography Paragraphs */}
                    <div className="space-y-4 text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                      {language === 'fr' ? (
                        <>
                          <p>
                            Né et élevé au milieu des cuisines compétitives et dynamiques de <strong className="text-white hover:text-[#c5a47e] transition-colors">Lyon, en France,</strong> le palais du Chef Laurent a été nourri par la rigueur des grandes réductions françaises et des cuissons classiques lentes. Après l'obtention de son diplôme, Laurent a fait ses premières armes au sein de multiples institutions triplement étoilées au Michelin à Paris, gravant en lui la conviction que la perfection culinaire se niche dans une micro-précision intransigeante.
                          </p>
                          <p>
                            Désireux d'appréhender les secrets des dressages minimalistes et de la pureté des ingrédients, Laurent s'est installé à <strong className="text-white hover:text-[#c5a47e] transition-colors">Kyoto puis à Tokyo, au Japon,</strong> pendant cinq années fondatrices. Il y a assimilé la délicate vision japonaise des cinq saveurs primaires élémentaires, s'appropriant l'art délicat de l'umami, des bouillons clairs très aromatiques, et démontrant comment un seul ingrédient frais peut sublimer tout un plat.
                          </p>
                          <p>
                            Fin 2021, une découverte culinaire a mené Laurent sur les côtes de l'Afrique de l'Ouest. Subjugué par l'éclat sensoriel d'Accra, les marchés d'Osu, la richesse marine du vivaneau sauvage de l'Atlantique, mais également le gingembre de Shama, les plantains et le chocolat ghanéen mono-originaire, il y a trouvé son foyer d'expression artistique. Au Magellan, il intègre ces trésors locaux dans de grandes références européennes.
                          </p>
                        </>
                      ) : (
                        <>
                          <p>
                            Born and raised amidst the vibrant, competitive kitchens of <strong className="text-white hover:text-[#c5a47e] transition-colors">Lyon, France,</strong> Chef Laurent’s palate was nurtured on the strict geometry of French grand reductions and slow classic preparations. After completing his formal classical degree, Laurent spent early apprentice cycles rising through multiple three-star Michelin institutions in Paris, learning that kitchen perfection lies in absolute, uncompromising micro-precision.
                          </p>
                          <p>
                            Eager to unravel the secrets of minimalist tension and pure ingredients, Laurent relocated to <strong className="text-white hover:text-[#c5a47e] transition-colors">Kyoto and Tokyo, Japan</strong> for five defining years. There, he absorbed the delicate Japanese system of five elemental primary flavors—mastering the intricate, silent craft of umami, light aromatic broths, and how single fresh additions can elevate or redefine an entire dish.
                          </p>
                          <p>
                            In late 2021, a culinary exploration brought Laurent to coastal West Africa. Captivated by the sensory tapestry of Accra—the dynamic, warm markets of Osu, the oceanic richness of coastal Atlantic red snappers, and local flavor staples like rich Shama ginger, plantains, and single-origin Ghanaian cacao—he realized his artistic home. At Le Magellan, he weaves these regional masterpieces into classical European templates.
                          </p>
                        </>
                      )}
                    </div>

                    {/* Integrated 3-Block Philosophy Grid */}
                    <div className="space-y-4 pt-4 border-t border-white/5">
                      <h4 className="font-serif text-base text-[#c5a47e] font-light tracking-wide flex items-center gap-2">
                        <Sparkles className="h-4 w-4" /> {language === 'fr' ? "Nos Trois Piliers Philosophiques" : "Our Three Philosophical Pillars"}
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Pillar 1 */}
                        <div className="p-4 bg-stone-950 border border-white/5 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] text-white/30 uppercase">01</span>
                            <Utensils className="h-3.5 w-3.5 text-[#c5a47e]/50" />
                          </div>
                          <h5 className="font-serif text-xs text-white tracking-wide uppercase">
                            {language === 'fr' ? "Rigueur Française" : "French Rigor"}
                          </h5>
                          <p className="text-[10.5px] text-white/55 font-light leading-relaxed">
                            {language === 'fr' 
                              ? "Réduction méticuleuse des bouillons, émulsions à températures précises et dressage chirurgical sont maintenus pour une excellence structurelle."
                              : "Meticulous reduction of stocks, precise emulsion temperatures, and surgical plating layouts are maintained for structural excellence."
                            }
                          </p>
                        </div>

                        {/* Pillar 2 */}
                        <div className="p-4 bg-stone-950 border border-white/5 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] text-white/30 uppercase">02</span>
                            <Compass className="h-3.5 w-3.5 text-[#c5a47e]/50" />
                          </div>
                          <h5 className="font-serif text-xs text-white tracking-wide uppercase">
                            {language === 'fr' ? "Zen Oriental" : "Oriental Zen"}
                          </h5>
                          <p className="text-[10.5px] text-white/55 font-light leading-relaxed">
                            {language === 'fr'
                              ? "Intégration d'infusions de gingembre subtiles, badiane, citronnelle et touches de poivre de Sichuan pour éveiller et équilibrer les palais."
                              : "Implementing subtle ginger infusions, star anise, lemongrass, and Szechuan heat patterns to balance and awaken sensory palates."
                            }
                          </p>
                        </div>

                        {/* Pillar 3 */}
                        <div className="p-4 bg-stone-950 border border-white/5 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] text-white/30 uppercase">03</span>
                            <Sparkles className="h-3.5 w-3.5 text-[#c5a47e]/50" />
                          </div>
                          <h5 className="font-serif text-xs text-white tracking-wide uppercase">
                            {language === 'fr' ? "Terroir Local" : "Local Terroir"}
                          </h5>
                          <p className="text-[10.5px] text-white/55 font-light leading-relaxed">
                            {language === 'fr'
                              ? "Valorisation des producteurs ghanéens en célébrant les noix de cajou de Cantonments, les bananes plantains d'Osu et le chocolat d'exception."
                              : "Empowering Ghanaian producers by celebrating raw Cantonments cashews, sweet Osu garden plantains, local herbs, and legendary cocoa."
                            }
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Handwritten Style Elegant Signature Accent */}
                    <div className="flex items-center justify-between pt-6 border-t border-white/5 font-serif text-white/50">
                      <div>
                        <span className="block font-mono text-[9px] uppercase tracking-wider text-white/30">
                          {language === 'fr' ? "Créateur & Conservateur" : "Curator & Creator"}
                        </span>
                        <span className="text-xs italic text-white/70">
                          - Laurent Boisson
                        </span>
                      </div>
                      
                      {/* Artistic Pinyon-like Signature rendering in CSS */}
                      <span className="font-['Pinyon_Script'] text-2xl text-[#c5a47e]/60 select-none font-medium pr-2">
                        L. Boisson
                      </span>
                    </div>

                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
