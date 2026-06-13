import React from 'react';
import { Calendar, ChevronRight, Clock, Star, Landmark } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

interface HeroProps {
  onOpenBooking: () => void;
  scrollToSection: (id: string) => void;
}

export default function Hero({ onOpenBooking, scrollToSection }: HeroProps) {
  const { language, t } = useTranslation();

  // Determine if open based on standard times: Open Daily 5:00 PM - 11:00 PM
  const checkIsOpenState = () => {
    const now = new Date();
    const hours = now.getHours();
    // 17 is 5:00 PM, 23 is 11:00 PM
    if (hours >= 17 && hours < 23) {
      return { 
        open: true, 
        message: language === 'fr' ? "Actuellement ouvert pour le dîner" : "Currently open for dinner" 
      };
    } else {
      return { 
        open: false, 
        message: language === 'fr' ? "Ouverture ce soir à 17h00" : "We open tonight at 5:00 PM" 
      };
    }
  };

  const { open, message } = checkIsOpenState();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-[#0a0a0a] overflow-hidden"
    >
      {/* Background Image with Dark Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=1600"
          alt="Le Magellan dining salon"
          className="w-full h-full object-cover object-center opacity-30 scale-105 animate-[scaleUp_40s_infinite_alternate]"
        />
        {/* Soft elegant gradient overlays */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,_transparent_40%,_#0a0a0a_95%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-[#0a0a0a]/80" />
      </div>

      {/* Decorative vertical lines representing a luxury menu blueprint */}
      <div className="absolute inset-y-0 left-10 w-px bg-white/5 hidden xl:block" />
      <div className="absolute inset-y-0 right-10 w-px bg-white/5 hidden xl:block" />

      {/* Content Area */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24">
        
        {/* Top Badges */}
        <div className="inline-flex flex-wrap items-center justify-center gap-4 mb-8 animate-fade-in duration-700">
          <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#c5a47e]/10 border border-[#c5a47e]/20 text-[#c5a47e] font-sans text-[10px] uppercase tracking-[0.2em] font-medium">
            <Star className="h-3 w-3 fill-[#c5a47e]/60 text-[#c5a47e]" />
            {language === 'fr' ? 'Recommandé par Michelin' : 'Michelin Recommended'}
          </div>
          <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-white/70 font-sans text-[10px] uppercase tracking-[0.2em]">
            <Clock className={`h-3 w-3 ${open ? 'text-emerald-500' : 'text-[#c5a47e]'}`} />
            <span className={open ? 'text-emerald-400 font-medium' : 'text-white/60'}>
              {message}
            </span>
          </div>
        </div>

        {/* Display Typography */}
        <h1 
          id="hero-title"
          className="font-serif text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-light tracking-wide leading-[1.15] mb-6 px-2"
        >
          {language === 'fr' ? (
            <>Savourer la <span className="italic text-[#c5a47e] font-light">Symphonie</span> de la Gastronomie</>
          ) : (
            <>Savor the <span className="italic text-[#c5a47e] font-light">Symphony</span> of Gastronomy</>
          )}
        </h1>

        <p 
          id="hero-tagline"
          className="max-w-xl mx-auto text-white/50 font-sans text-xs xs:text-sm sm:text-base lg:text-lg font-light leading-relaxed tracking-wider mb-8 sm:mb-12 px-4"
        >
          {language === 'fr' ? (
            <>Bienvenue au Magellan, où l'exquise finesse de l'art culinaire traditionnel français harmonise avec de riches épices orientales à Osu, Accra.</>
          ) : (
            <>Welcome to Le Magellan, where exquisite seasonal French traditional culinary artistry harmonizes with rich Oriental spices in Osu, Accra.</>
          )}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-14 sm:mb-20 px-4">
          <button
            id="hero-book-btn"
            onClick={onOpenBooking}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 border border-[#c5a47e] bg-[#c5a47e] text-black font-semibold text-[10px] xs:text-[11px] uppercase tracking-[0.2em] xs:tracking-[0.25em] transition-all duration-300 hover:bg-transparent hover:text-[#c5a47e] active:scale-[0.98] cursor-pointer rounded-none"
          >
            <Calendar className="h-4 w-4" />
            {t('hero.reserveTable')}
          </button>
          
          <button
            id="hero-menu-btn"
            onClick={() => scrollToSection('menu-section')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 border border-white/10 bg-white/5 text-white font-semibold text-[10px] xs:text-[11px] uppercase tracking-[0.2em] xs:tracking-[0.25em] transition-all duration-300 hover:border-[#c5a47e] hover:text-[#c5a47e] hover:bg-transparent cursor-pointer rounded-none"
          >
            {language === 'fr' ? 'Explorer la Carte' : 'Explore Menu'}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Brand Accents */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 max-w-4xl mx-auto pt-8 border-t border-white/5 px-2">
          <div className="p-1">
            <span className="block font-sans text-[9px] text-white/30 tracking-[0.2em] uppercase mb-1">Cuisine</span>
            <span className="block font-serif text-sm xs:text-base md:text-lg text-white/80 font-light">
              {language === 'fr' ? 'Française & Orientale' : 'French & Oriental'}
            </span>
          </div>
          <div className="p-1">
            <span className="block font-sans text-[9px] text-white/30 tracking-[0.2em] uppercase mb-1">
              {language === 'fr' ? 'Heures d\'Ouverture' : 'Hours'}
            </span>
            <span className="block font-serif text-sm xs:text-base md:text-lg text-white/80 font-light">
              {language === 'fr' ? 'Tous les jours: 17h – 23h' : 'Daily: 5pm – 11pm'}
            </span>
          </div>
          <div className="p-1">
            <span className="block font-sans text-[9px] text-white/30 tracking-[0.2em] uppercase mb-1">
              {language === 'fr' ? 'Dress Code' : 'Dress Code'}
            </span>
            <span className="block font-serif text-sm xs:text-base md:text-lg text-white/80 font-light">
              {language === 'fr' ? 'Tenue Élégante' : 'Elegant Attire'}
            </span>
          </div>
          <div className="p-1">
            <span className="block font-sans text-[9px] text-white/30 tracking-[0.2em] uppercase mb-1">Accolades</span>
            <span className="block font-serif text-xs xs:text-sm sm:text-base md:text-lg text-white/80 font-light">
              {t('hero.standard')}
            </span>
          </div>
        </div>

      </div>

      {/* Elegant Fade Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
    </section>
  );
}
