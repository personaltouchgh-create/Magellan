import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, Clock, HelpCircle, CalendarDays, Compass } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

export default function WhatsAppButton() {
  const { language } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const phoneNumber = '233244585858'; // Le Magellan Osu, Accra, Ghana business phone number (+233 24 458 5858)

  // Dynamic quick template options for high-end patronage inquiries in Accra
  const inquiryTemplates = [
    {
      id: 'book',
      label: language === 'fr' ? 'Réservations de Tables' : 'Table Bookings',
      icon: <CalendarDays className="h-4 w-4 text-[#c5a47e]" />,
      short: language === 'fr' ? 'Réserver une table' : 'Reserve table',
      text: language === 'fr'
        ? 'Bonjour Le Magellan, je souhaite réserver une table pour un dîner d’exception. Quelles sont vos disponibilités ?'
        : 'Hello Le Magellan, I would like to inquire about booking a table for a special dinner. Please let me know your availability.',
    },
    {
      id: 'menu',
      label: language === 'fr' ? 'Allergènes & Spécialités' : 'Dietary & Specialties',
      icon: <Sparkles className="h-4 w-4 text-[#c5a47e]" />,
      short: language === 'fr' ? 'Infos sur la carte' : 'Premium Menu info',
      text: language === 'fr'
        ? 'Bonjour Le Magellan, je m’intéresse à votre Foie Gras poêlé et vos spécialités du Chef. Pourriez-vous m’indiquer vos choix sans gluten et sans allergènes ?'
        : 'Hello Le Magellan, I am interested in your seared Foie Gras and chef specials. Could you provide details regarding gluten-free and allergen options?',
    },
    {
      id: 'event',
      label: language === 'fr' ? 'Salon & Événements VIP' : 'Private Salon Events',
      icon: <Compass className="h-4 w-4 text-[#c5a47e]" />,
      short: language === 'fr' ? 'Privatisation de salon' : 'VIP/Private function',
      text: language === 'fr'
        ? 'Bonjour Le Magellan, j’envisage d’organiser un dîner de prestige privé dans votre salon d’Osu. J’aimerais échanger sur vos menus de dégustation et sélections de sommeliers.'
        : 'Hello Le Magellan, I am looking to organize a private VIP group dinner at your Osu salon. I would love to discuss custom tasting menus and sommelier pairings.',
    },
    {
      id: 'hours',
      label: language === 'fr' ? 'Horaires & Itinéraire' : 'Operational Hours/Directions',
      icon: <Clock className="h-4 w-4 text-[#c5a47e]" />,
      short: language === 'fr' ? 'Plan et horaires d’ouverture' : 'Opening times & route',
      text: language === 'fr'
        ? 'Bonjour Le Magellan, je suis en chemin vers Cantonments Road à Osu. Pouvez-vous me confirmer vos horaires d’ouverture et les meilleurs emplacements de parking ?'
        : 'Hello Le Magellan, I am on my way to Cantonments Road in Osu. Could you confirm your opening hours for tonight and best parking spots nearby?',
    },
  ];

  // Helper to construct WhatsApp URL safely
  const getWhatsAppLink = (messageText: string) => {
    const encodedText = encodeURIComponent(messageText);
    return `https://wa.me/${phoneNumber}?text=${encodedText}`;
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    window.open(getWhatsAppLink(customMsg), '_blank');
    setCustomMsg('');
    setIsOpen(false);
  };

  return (
    <div id="whatsapp-widget-container" className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="whatsapp-chat-box"
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 22, stiffness: 220 }}
            className="mb-4 w-80 sm:w-96 overflow-hidden rounded-none border border-white/10 bg-stone-950 text-white shadow-2xl shadow-black/80"
          >
            {/* Box Header - Luxury brand theme */}
            <div className="relative bg-gradient-to-r from-stone-900 to-stone-950 p-5 border-b border-white/5">
              <button
                id="whatsapp-close-btn"
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition cursor-pointer"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-3">
                {/* Embedded custom glowing emblem indicating online concierge */}
                <div className="relative">
                  <div className="h-10 w-10 flex items-center justify-center rounded-none border border-[#c5a47e]/30 bg-[#c5a47e]/10">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 text-[#c5a47e]"
                      fill="currentColor"
                    >
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.894 0c3.18 0 6.171 1.242 8.423 3.498 2.253 2.256 3.492 5.253 3.492 8.435 0 6.571-5.325 11.895-11.892 11.895-2.001-.001-3.96-.507-5.705-1.47L0 24zm6.539-4.24l.322.191a10.024 10.024 0 0 0 5.032 1.362c5.441 0 9.873-4.433 9.876-9.88 0-2.639-1.027-5.119-2.898-6.99a9.825 9.825 0 0 0-6.985-2.898c-5.446 0-9.878 4.434-9.881 9.882-.001 1.954.512 3.864 1.481 5.568l.211.37-1.127 4.116 4.22-.112l.334.193a10.024 10.024 0 0 0 4.54 1.134z" />
                    </svg>
                  </div>
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-stone-950 bg-emerald-500 animate-pulse" />
                </div>

                <div>
                  <h4 className="font-serif text-[#c5a47e] text-sm uppercase tracking-widest font-light leading-tight">
                    Le Magellan Osu
                  </h4>
                  <p className="text-[10px] text-emerald-400 tracking-wider font-light flex items-center gap-1.5 mt-0.5 font-mono">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {language === 'fr' ? 'Conciergerie Culinaire • En ligne' : 'Fine Dining Concierge • Active'}
                  </p>
                </div>
              </div>
            </div>

            {/* Box Body */}
            <div className="p-5 space-y-4 max-h-[360px] overflow-y-auto bg-[#0d0d0c] scrollbar-thin scrollbar-thumb-white/10">
              <p className="text-xs text-white/60 font-light leading-relaxed">
                {language === 'fr'
                  ? 'Bienvenue dans notre salle de dégustation à Osu. Choisissez l’une de nos demandes rapides ci-dessous ou posez-nous directement une question :'
                  : 'Welcome to our Osu dining room. Select a preset below or send us a custom inquiry on our instant WhatsApp line:'
                }
              </p>

              {/* Grid of smart query quick-options */}
              <div className="grid grid-cols-1 gap-2.5 pt-1">
                {inquiryTemplates.map((tpl) => (
                  <a
                    id={`wa-tpl-${tpl.id}`}
                    key={tpl.id}
                    href={getWhatsAppLink(tpl.text)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 p-3 rounded-none bg-stone-900/50 border border-white/5 hover:bg-[#c5a47e]/10 hover:border-[#c5a47e]/30 transition-all duration-300 text-left cursor-pointer"
                  >
                    <div className="p-2 bg-stone-950 border border-white/5 group-hover:border-[#c5a47e]/30 group-hover:bg-[#c5a47e]/5 transition-all">
                      {tpl.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-sans font-medium text-white group-hover:text-[#c5a47e] transition-colors">
                        {tpl.label}
                      </p>
                      <p className="text-[10px] text-white/40 font-light truncate mt-0.5">
                        {tpl.short}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Custom message field form */}
              <form onSubmit={handleSendCustom} className="pt-2 border-t border-white/5 space-y-2">
                <label htmlFor="custom-wa-msg" className="block text-[10px] uppercase tracking-wider text-white/40 font-mono font-medium">
                  {language === 'fr' ? 'Rédiger une question personnalisée' : 'Write customized message'}
                </label>
                <div className="flex gap-2">
                  <input
                    id="custom-wa-msg"
                    type="text"
                    value={customMsg}
                    onChange={(e) => setCustomMsg(e.target.value)}
                    placeholder={language === 'fr' ? 'Écrivez ici...' : 'Ask us anything...'}
                    className="flex-1 bg-stone-900 border border-white/10 px-3 py-1.5 text-xs text-white placeholder-white/30 rounded-none focus:outline-none focus:border-[#c5a47e]/55 focus:ring-1 focus:ring-[#c5a47e]/30 font-sans"
                  />
                  <button
                    id="whatsapp-submit-btn"
                    type="submit"
                    className="bg-[#c5a47e] hover:bg-[#b08e67] text-stone-950 p-2 font-mono font-bold tracking-wider text-xs transition rounded-none flex items-center justify-center shrink-0 cursor-pointer"
                    aria-label="Send custom question"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
              </form>
            </div>

            {/* Footer with legal / responsive advice */}
            <div className="bg-stone-900/40 p-3.5 text-center text-[10px] text-white/30 border-t border-white/5 font-mono">
              {language === 'fr' ? 'Réponse moyenne en moins de 10 minutes' : 'Typical response time Under 10 minutes'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        id="whatsapp-floating-trigger"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-2.5 px-4 py-3 border rounded-none shadow-2xl transition-all duration-300 group cursor-pointer ${
          isOpen
            ? 'bg-stone-950 text-[#c5a47e] border-[#c5a47e]/40'
            : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-550'
        }`}
        aria-label="Contact Le Magellan Concierge on WhatsApp"
      >
        {/* Animated Double-Beating Ring Effect when closed */}
        {!isOpen && (
          <span className="absolute inset-0 -z-10 rounded-none bg-emerald-500/20 animate-ping opacity-75" />
        )}

        {/* Customized transparent SVG reflecting WhatsApp Speech icon */}
        <div className="relative flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.894 0c3.18 0 6.171 1.242 8.423 3.498 2.253 2.256 3.492 5.253 3.492 8.435 0 6.571-5.325 11.895-11.892 11.895-2.001-.001-3.96-.507-5.705-1.47L0 24zm6.539-4.24l.322.191a10.024 10.024 0 0 0 5.032 1.362c5.441 0 9.873-4.433 9.876-9.88 0-2.639-1.027-5.119-2.898-6.99a9.825 9.825 0 0 0-6.985-2.898c-5.446 0-9.878 4.434-9.881 9.882-.001 1.954.512 3.864 1.481 5.568l.211.37-1.127 4.116 4.22-.112l.334.193a10.024 10.024 0 0 0 4.54 1.134z" />
          </svg>
        </div>

        <span className="text-xs sm:text-sm font-sans tracking-[0.06em] font-medium">
          {isOpen 
            ? (language === 'fr' ? 'Fermer la Conciergerie' : 'Close Concierge')
            : (language === 'fr' ? 'Écrivez-nous sur WhatsApp' : 'Message Us on WhatsApp')
          }
        </span>
      </motion.button>
    </div>
  );
}
