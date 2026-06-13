import React, { useState, useEffect } from 'react';
import { ChefHat, ShoppingBag, Calendar, Menu as MenuIcon, X, MapPin } from 'lucide-react';
import { OrderItem } from '../types';
import { useTranslation } from '../contexts/LanguageContext';
import Logo from './Logo';

interface HeaderProps {
  cart: OrderItem[];
  onOpenCart: () => void;
  onOpenBooking: () => void;
  scrollToSection: (id: string) => void;
}

export default function Header({ cart, onOpenCart, onOpenBooking, scrollToSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartItems = cart.reduce((count, item) => count + item.quantity, 0);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    scrollToSection(sectionId);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5 py-3 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <button
            id="brand-logo"
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-1 group text-left cursor-pointer"
          >
            <Logo size="sm" layout="horizontal" />
          </button>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-10">
            <button
              id="nav-menu"
              onClick={() => handleNavClick('menu-section')}
              className={`font-sans text-[11px] uppercase tracking-[0.2em] font-medium transition-colors duration-200 cursor-pointer ${
                isScrolled ? 'text-white/60 hover:text-[#c5a47e]' : 'text-white/80 hover:text-[#c5a47e]'
              }`}
            >
              {t('header.menu')}
            </button>
            <button
              id="nav-specials"
              onClick={() => handleNavClick('specials-section')}
              className={`font-sans text-[11px] uppercase tracking-[0.2em] font-medium transition-colors duration-200 cursor-pointer ${
                isScrolled ? 'text-white/60 hover:text-[#c5a47e]' : 'text-white/80 hover:text-[#c5a47e]'
              }`}
            >
              {t('header.specials')}
            </button>
            <button
              id="nav-curate"
              onClick={() => handleNavClick('curate-section')}
              className={`font-sans text-[11px] uppercase tracking-[0.2em] font-medium transition-colors duration-200 cursor-pointer ${
                isScrolled ? 'text-white/60 hover:text-[#c5a47e]' : 'text-white/80 hover:text-[#c5a47e]'
              }`}
            >
              {t('header.builder')}
            </button>
            <button
              id="nav-reservations"
              onClick={() => handleNavClick('booking-section')}
              className={`font-sans text-[11px] uppercase tracking-[0.2em] font-medium transition-colors duration-200 cursor-pointer ${
                isScrolled ? 'text-white/60 hover:text-[#c5a47e]' : 'text-white/80 hover:text-[#c5a47e]'
              }`}
            >
              {t('header.reservations')}
            </button>
            <button
              id="nav-reviews"
              onClick={() => handleNavClick('reviews-section')}
              className={`font-sans text-[11px] uppercase tracking-[0.2em] font-medium transition-colors duration-200 cursor-pointer ${
                isScrolled ? 'text-white/60 hover:text-[#c5a47e]' : 'text-white/80 hover:text-[#c5a47e]'
              }`}
            >
              {t('header.experience')}
            </button>
          </nav>

          {/* Right Controls - Booking and Cart badges */}
          <div className="flex items-center gap-6">
            {/* Quick Map trigger */}
            <span className="hidden lg:flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-white/40 uppercase">
              <MapPin className="h-3.5 w-3.5 text-[#c5a47e]" />
              {t('sub.accra')}
            </span>

            {/* Language Switcher */}
            <div id="header-lang-switcher" className="flex items-center gap-1 font-mono text-[10px] tracking-widest border border-white/10 px-2 py-1 bg-stone-950/40 select-none">
              <button
                id="header-lang-en-btn"
                onClick={() => setLanguage('en')}
                className={`transition-colors duration-250 font-bold px-1 py-0.5 cursor-pointer ${
                  language === 'en' ? 'text-[#c5a47e]' : 'text-white/40 hover:text-white'
                }`}
                aria-label="Switch to English language"
              >
                EN
              </button>
              <span className="text-white/20 select-none text-[8px]">/</span>
              <button
                id="header-lang-fr-btn"
                onClick={() => setLanguage('fr')}
                className={`transition-colors duration-250 font-bold px-1 py-0.5 cursor-pointer ${
                  language === 'fr' ? 'text-[#c5a47e]' : 'text-white/40 hover:text-white'
                }`}
                aria-label="Switch to French language"
              >
                FR
              </button>
            </div>

            {/* Quick table reservation CTA */}
            <button
              id="header-cta-booking"
              onClick={onOpenBooking}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 border border-[#c5a47e] text-[#c5a47e] text-[10px] uppercase tracking-[0.2em] bg-transparent hover:bg-[#c5a47e] hover:text-black transition-colors duration-300 font-medium cursor-pointer"
            >
              <Calendar className="h-3.5 w-3.5" />
              {t('header.book')}
            </button>

            {/* Shopping Cart button */}
            <button
              id="header-cart-btn"
              onClick={onOpenCart}
              className="relative p-2.5 border border-white/5 bg-[#121212] rounded-none text-white hover:text-[#c5a47e] hover:border-[#c5a47e]/40 transition-all duration-300 cursor-pointer"
              aria-label="Open ordering bag"
            >
              <ShoppingBag className="h-4 w-4" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center bg-[#c5a47e] font-sans text-[9px] font-bold text-black">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* Desktop Mobile toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 border border-white/10 text-white/85 hover:text-[#c5a47e] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div id="mobile-drawer" className="md:hidden bg-[#0d0d0d] border-b border-white/5 py-4 px-4 space-y-3 absolute top-full left-0 right-0 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <button
            id="mobile-nav-menu"
            onClick={() => handleNavClick('menu-section')}
            className="block w-full text-left py-2.5 px-3 hover:bg-white/5 text-white/70 hover:text-[#c5a47e] font-medium text-xs uppercase tracking-widest text-left"
          >
            {t('header.menu')}
          </button>
          <button
            id="mobile-nav-specials"
            onClick={() => handleNavClick('specials-section')}
            className="block w-full text-left py-2.5 px-3 hover:bg-white/5 text-white/70 hover:text-[#c5a47e] font-medium text-xs uppercase tracking-widest text-left"
          >
            {t('header.specials')}
          </button>
          <button
            id="mobile-nav-curate"
            onClick={() => handleNavClick('curate-section')}
            className="block w-full text-left py-2.5 px-3 hover:bg-white/5 text-white/70 hover:text-[#c5a47e] font-medium text-xs uppercase tracking-widest text-left"
          >
            {t('header.builder')}
          </button>
          <button
            id="mobile-nav-res"
            onClick={() => handleNavClick('booking-section')}
            className="block w-full text-left py-2.5 px-3 hover:bg-white/5 text-white/70 hover:text-[#c5a47e] font-medium text-xs uppercase tracking-widest text-left"
          >
            {t('header.reservations')}
          </button>
          <button
            id="mobile-nav-reviews"
            onClick={() => handleNavClick('reviews-section')}
            className="block w-full text-left py-2.5 px-3 hover:bg-white/5 text-white/70 hover:text-[#c5a47e] font-medium text-xs uppercase tracking-widest text-left"
          >
            {t('header.experience')}
          </button>
          <div className="pt-3 border-t border-white/5 flex flex-wrap gap-4 justify-between items-center px-3">
            <button
              id="mobile-nav-book-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="flex items-center gap-2 px-5 py-2 border border-[#c5a47e] bg-[#c5a47e] text-black text-[10px] uppercase tracking-[0.2em] font-semibold text-left"
            >
              <Calendar className="h-3.5 w-3.5" />
              {t('header.book')}
            </button>
            <div id="mobile-lang-switcher" className="flex items-center gap-1.5 border border-white/10 px-2.5 py-1.5 font-mono text-[10px] bg-stone-950 select-none">
              <button
                id="mobile-lang-en-btn"
                onClick={() => setLanguage('en')}
                className={`px-1 font-bold ${language === 'en' ? 'text-[#c5a47e]' : 'text-white/40'}`}
              >
                EN
              </button>
              <span className="text-white/20 select-none">/</span>
              <button
                id="mobile-lang-fr-btn"
                onClick={() => setLanguage('fr')}
                className={`px-1 font-bold ${language === 'fr' ? 'text-[#c5a47e]' : 'text-white/40'}`}
              >
                FR
              </button>
            </div>
            <span className="flex items-center gap-1 font-mono text-[10px] uppercase text-white/40 text-right">
              <MapPin className="h-3.5 w-3.5 text-[#c5a47e]" />
              {t('sub.accra')}
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
