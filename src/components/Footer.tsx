import React from 'react';
import { ChefHat, Phone, Mail, Clock, Shield, Facebook, Instagram, Twitter } from 'lucide-react';
import Logo from './Logo';
import { useTranslation } from '../contexts/LanguageContext';

interface FooterProps {
  scrollToSection: (id: string) => void;
}

export default function Footer({ scrollToSection }: FooterProps) {
  const { language } = useTranslation();

  return (
    <footer id="footer-section" className="bg-[#080808] text-white/50 border-t border-white/5 overflow-hidden font-sans pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core footer columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Brand & Socials */}
          <div className="space-y-4">
            <Logo size="sm" layout="horizontal" />
            
            <p className="text-white/40 text-xs font-light leading-relaxed">
              {language === 'fr' 
                ? "Forger des liens d’exception entre les techniques culinaires traditionnelles françaises et une agriculture locale saisonnière, à notre table d’Osu."
                : "Forging elegant connections between traditional French custom preparation methods and premium, oriental seasonal agriculture at our Osu table."
              }
            </p>

            <div className="flex gap-3 pt-2">
              <a href="#instagram" className="p-2 rounded-none bg-white/5 border border-white/5 hover:bg-[#c5a47e]/15 text-white/60 hover:text-[#c5a47e] transition cursor-pointer">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#facebook" className="p-2 rounded-none bg-white/5 border border-white/5 hover:bg-[#c5a47e]/15 text-white/60 hover:text-[#c5a47e] transition cursor-pointer">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#twitter" className="p-2 rounded-none bg-white/5 border border-white/5 hover:bg-[#c5a47e]/15 text-white/60 hover:text-[#c5a47e] transition cursor-pointer">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Culinary Operations Timings */}
          <div>
            <h4 className="font-serif text-[#c5a47e] font-light text-sm uppercase tracking-widest mb-4 pb-1.5 border-b border-white/5">
              {language === 'fr' ? 'Heures d’Ouverture' : 'Operational Hours'}
            </h4>
            <ul className="space-y-3.5 text-xs text-white/40 font-light">
              <li className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-[#c5a47e]/50" />
                <div>
                  <span className="block font-sans text-white text-[11px] uppercase tracking-wider font-semibold">
                    {language === 'fr' ? 'Lundi – Jeudi' : 'Monday – Thursday'}
                  </span>
                  <span className="block text-[11px] text-white/40 font-light">
                    {language === 'fr' ? 'Service Dîner : 17h00 – 22h00' : 'Dinner Service: 5:00 PM – 10:00 PM'}
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-[#c5a47e]/50" />
                <div>
                  <span className="block font-sans text-white text-[11px] uppercase tracking-wider font-semibold">
                    {language === 'fr' ? 'Vendredi – Dimanche' : 'Friday – Sunday'}
                  </span>
                  <span className="block text-[11px] text-white/40 font-light">
                    {language === 'fr' ? 'Service Dîner : 17h00 – 23h30' : 'Dinner Service: 5:00 PM – 11:30 PM'}
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-2 text-[10px] text-[#c5a47e] font-sans uppercase bg-[#c5a47e]/5 p-2 rounded-none border border-[#c5a47e]/10">
                <Shield className="h-3.5 w-3.5 shrink-0" />
                {language === 'fr' 
                  ? 'Jours Fériés : Ouvert toute l’année (sauf Noël)'
                  : 'Local Holidays: Open year round (except Christmas Day)'
                }
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Locations */}
          <div>
            <h4 className="font-serif text-[#c5a47e] font-light text-sm uppercase tracking-widest mb-4 pb-1.5 border-b border-white/5">
              {language === 'fr' ? 'Contact & Accès' : 'Salon Info & Contact'}
            </h4>
            <div className="space-y-4 text-xs font-light text-white/40">
              <p className="leading-relaxed">
                <span className="font-serif block text-white text-xs mb-1">
                  {language === 'fr' ? 'Adresse Principale :' : 'Main Address:'}
                </span>
                12 Cantonments Road, Osu,<br />
                Accra, Ghana ({language === 'fr' ? "Près d’Oxford Street" : "Near Oxford Street"})
              </p>
              
              <div className="space-y-2">
                <a href="tel:+233244585858" className="flex items-center gap-2 hover:text-[#c5a47e] transition cursor-pointer">
                  <Phone className="h-3.5 w-3.5 text-[#c5a47e]/50" />
                  <span>+233 (0) 24 458 5858</span>
                </a>
                <a href="mailto:maitre@lemagellan-osu.com" className="flex items-center gap-2 hover:text-[#c5a47e] transition cursor-pointer">
                  <Mail className="h-3.5 w-3.5 text-[#c5a47e]/50" />
                  <span className="truncate">maitre@lemagellan-osu.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Quick Nav & Etiquette guidelines */}
          <div>
            <h4 className="font-serif text-[#c5a47e] font-light text-sm uppercase tracking-widest mb-4 pb-1.5 border-b border-white/5">
              {language === 'fr' ? 'Navigation & Étiquette' : 'Navigation & Directives'}
            </h4>
            <div className="space-y-4">
              <ul className="grid grid-cols-2 gap-2 text-xs text-white/40">
                <li><button onClick={() => scrollToSection('hero')} className="hover:text-[#c5a47e] transition cursor-pointer text-left font-sans">{language === 'fr' ? 'Accueil' : 'Intro'}</button></li>
                <li><button onClick={() => scrollToSection('menu-section')} className="hover:text-[#c5a47e] transition cursor-pointer text-left font-sans">{language === 'fr' ? 'La Carte' : 'Menu'}</button></li>
                <li><button onClick={() => scrollToSection('curate-section')} className="hover:text-[#c5a47e] transition cursor-pointer text-left font-sans text-[#c5a47e] font-semibold">{language === 'fr' ? 'Formules' : 'Set builder'}</button></li>
                <li><button onClick={() => scrollToSection('booking-section')} className="hover:text-[#c5a47e] transition cursor-pointer text-left font-sans">{language === 'fr' ? 'Réservations' : 'Reservations'}</button></li>
                <li><button onClick={() => scrollToSection('reviews-section')} className="hover:text-[#c5a47e] transition cursor-pointer text-left font-sans">{language === 'fr' ? 'Expériences' : 'Experience'}</button></li>
              </ul>
              
              <div className="p-3.5 rounded-none bg-white/3 border border-white/5 text-[11px] leading-relaxed text-white/45 space-y-1">
                <span className="font-bold text-white uppercase font-sans tracking-widest block text-[9px]">
                  {language === 'fr' ? 'Tenue Recommandée :' : 'Dress Code Advisory:'}
                </span>
                <p>
                  {language === 'fr'
                    ? 'Nous suggérons une tenue chic et élégante afin d’honorer l’ambiance feutrée de notre salon pour tous les convives.'
                    : 'We request smart casual attire to respect the candlelit acoustic environment for all guests.'
                  }
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Base copyright ribbon */}
        <div className="pt-8 border-t border-white/5 text-center flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-white/30">
          <p>
            {language === 'fr'
              ? '© 2026 Le Magellan Fine Dining Ltd. Tous droits réservés.'
              : '© 2026 Le Magellan Fine Dining Ltd. All Culinary Specifications Protected.'
            }
          </p>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-[#c5a47e] transition">
              {language === 'fr' ? 'Charte de confidentialité' : 'Privacy protocol'}
            </a>
            <span>•</span>
            <a href="#terms" className="hover:text-[#c5a47e] transition font-light">
              {language === 'fr' ? 'Conditions d’annulation' : 'Terms of reservation'}
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
