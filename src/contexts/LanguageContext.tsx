import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Top banner
    "michelin.line": "★ Michelin Recommended Dining Salon • Standard Dining Reservations Active ★",
    "sub.accra": "Osu, Accra",
    "currency": "GH₵",

    // header
    "header.menu": "The Menu",
    "header.specials": "Specials",
    "header.builder": "Set Menu Builder",
    "header.reservations": "Reservations",
    "header.experience": "The Experience",
    "header.book": "Book Table",

    // heros
    "hero.standard": "★★★ MICHELIN STANDARD",
    "hero.tagline": "Fine French Gastronomy meets the Warmth of more than 10 Ghanaian Spices",
    "hero.sub": "An opulent fusion sanctuary hidden inside Cantonments Road, Osu. Experience classical French haute cuisine elevated by the finest West African terroirs and subtle Japanese elements.",
    "hero.viewMenu": "View Digital Menu",
    "hero.reserveTable": "Reserve A Table",

    // Specials
    "specials.title": "Chef’s Gastronomic Specials",
    "specials.sub": "Meticulously composed delicacies on offer for our high-end Osu patrons. Each special represents a culinary narrative crafted by Chef Boisson.",
    "specials.addToCart": "Add to Order",
    "specials.prep": "Mins Prep",
    "specials.kcal": "kcal",
    "specials.allergens": "Allergens",
    "specials.instructions": "Chef instructions / allergies notes?",
    "specials.placeholder": "Special modifications requests... (e.g., extra raw cashews, gluten-free, etc.)",

    // Meet the Chef
    "chef.sub": "L’Art de la Table",
    "chef.title": "Meet the Architect of",
    "chef.italic": "Gastronomic Harmony",
    "chef.story": "Trained in Lyon’s legendary culinary academies and refined over a decade across Kyoto and Paris, Chef Laurent Boisson brings his visionary French-Oriental symphony directly to the vibrant heart of Osu, Accra. Our menu represents his lifetime journey of flavor discovery.",
    "chef.button": "Read Story & Philosophy",
    "chef.role": "Maître Culinaire de France",
    "chef.creator": "Head Chef & Concept Creator, Le Magellan Osu",
    "chef.quote": "\"Cooking is not just a technical craft; it is a spiritual dialogue. By blending French classical rigour with the intense warmth of local Ghanaian spices and Oriental balance, we present an emotion on every single plate.\"",
    "chef.threePillars": "Our Three Philosophical Pillars",
    "chef.p1.title": "French Rigor",
    "chef.p1.desc": "Meticulous reduction of stocks, precise emulsion temperatures, and surgical plating layouts are maintained for structural excellence.",
    "chef.p2.title": "Oriental Zen",
    "chef.p2.desc": "Implementing subtle ginger infusions, star anise, lemongrass, and Szechuan heat patterns to balance and awaken sensory palates.",
    "chef.p3.title": "Local Terroir",
    "chef.p3.desc": "Empowering Ghanaian producers by celebrating raw Cantonments cashews, sweet Osu garden plantains, local herbs, and legendary cocoa.",

    // MenuSection
    "menu.title": "L'Académie Culinaire",
    "menu.sub": "Browse our hand-rendered modular catalog of fine selections. Toggle starters, mains, artisanal desserts, and curated wines.",
    "menu.starters": "Starters",
    "menu.mains": "Mains",
    "menu.desserts": "Desserts",
    "menu.beverages": "Beverages",
    "menu.search": "Search selection / ingredients...",
    "menu.vegan": "Vegan Only",
    "menu.gluten": "Gluten-Free Only",
    "menu.addToOrder": "Add to Order",
    "menu.winePairing": "Sommelier Pairing:",
    "menu.noDishes": "No dishes found matching your selection filters. Please adjust searches.",

    // SetMenuBuilder
    "curate.tag": "Bespoke Gastronomy",
    "curate.title": "Grand tasting set builder",
    "curate.sub": "Assemble your custom 3-course French-Oriental experience. Our Chef marries selected items with a reduction rate for standard prestige set menus.",
    "curate.selectedStarters": "Selected Starter",
    "curate.selectedMains": "Selected Main Course",
    "curate.selectedDesserts": "Selected Dessert",
    "curate.starterLabel": "Select a starter...",
    "curate.mainLabel": "Select a major course...",
    "curate.dessertLabel": "Select a dessert finish...",
    "curate.wineOption": "Include Sommelier Grand Cru Wine Pairings (Adds GH₵ 120.00)",
    "curate.priceLabel": "Tasting Set Price",
    "curate.originalVal": "Original separate total",
    "curate.discountLabel": "Bespoke bundle saves 12%",
    "curate.addSet": "Add Custom Set to Order",

    // ReservationForm
    "res.tag": "Concierge desk",
    "res.title": "Secure your table in Osu",
    "res.sub": "Reserve a luxury table under our high-vaulted Osu dining salons. Complete your details for immediate slot confirmation.",
    "res.yourBookings": "Your active dining bookings",
    "res.cancel": "Cancel",
    "res.confirmed": "Confirmed",
    "res.seated": "Seated",
    "res.completed": "Completed",
    "res.noBookings": "No bookings found on this device's storage. Fill out the reservation planner below.",
    "res.date": "Date of Attendance",
    "res.time": "Time Window",
    "res.guests": "Party Size / Diners",
    "res.name": "Full Name / Patron Label",
    "res.email": "Direct Email",
    "res.phone": "WhatsApp / Phone",
    "res.tableType": "Table Chamber Type",
    "res.celebration": "Occasion Celebration",
    "res.requests": "Special Salon Requests & Allergens Notes",
    "res.requestsPlaceholder": "e.g., Anniversary flowers setup, highchair, severe nut allergy, or near window request...",
    "res.submit": "Confirm Gastronomic Booking",
    "res.success": "Reservation holds locked successfully! Print your receipt or wait for concierge WhatsApp dispatch.",

    // Dialog table chamber options
    "chamber.main-hall": "Grand Atrium Main Hall (Lively & Majestic)",
    "chamber.romantic-booth": "Intimate Soft-Lit Canopy Booth (Romantic/Date)",
    "chamber.garden-patio": "Pergola Jardin Exterior (Open Air & Breezy)",
    "chamber.chefs-counter": "Exposing Chef’s Counter (High Culinary Detail)",

    // Occasion types
    "occ.none": "Standard Unmarked Table Desk",
    "occ.birthday": "Birthday Ceremony Setup",
    "occ.anniversary": "Anniversary Romance Setup",
    "occ.business": "Executive Business Dining",
    "occ.date-night": "Date Night / Romantic Rendezvous",

    // ExperienceGallery
    "gallery.tag": "Voices of Patronage",
    "gallery.title": "Acclaimed Gastronomy",
    "gallery.sub": "A showcase of comments from prominent guides, food critics, and esteemed Osu visitors.",

    // Footer
    "footer.rights": "Le Magellan Osu. All rights reserved.",
    "footer.accraKitchen": "The Osu Kitchen",
    "footer.hours": "Open Daily",
    "footer.address": "Cantonments Road, Osu, Accra, Ghana",

    // CartDrawer
    "cart.title": "Your Order Selection",
    "cart.empty": "Your order tray is empty. Add culinary delights from our menus above to test our online drawer.",
    "cart.total": "Subtotal Sum",
    "cart.checkout": "Checkout & Secure Order",
    "cart.modifications": "Modifications requested:",
    "cart.allergenWarning": "Contains known allergens:",

    // WhatsAppButton
    "wa.wel": "Welcome to our Osu dining room. Select a preset below or send us a custom inquiry on our instant WhatsApp line:",
    "wa.sub": "Fine Dining Concierge • Active",
    "wa.placeholder": "Ask us anything...",
    "wa.writePl": "Write customized message",
    "wa.typical": "Typical response time Under 10 minutes",
    "wa.close": "Close Concierge",
    "wa.message": "Message Us on WhatsApp",
  },
  fr: {
    // Top banner
    "michelin.line": "★ Salon de Restauration Recommandé par Michelin • Réservations Actives ★",
    "sub.accra": "Osu, Accra",
    "currency": "GH₵",

    // header
    "header.menu": "Le Menu",
    "header.specials": "Spécialités",
    "header.builder": "Créateur de Formules",
    "header.reservations": "Réservations",
    "header.experience": "L'Expérience",
    "header.book": "Réserver",

    // heros
    "hero.standard": "★★★ STANDARD MICHELIN",
    "hero.tagline": "La Haute Gastronomie Française Rencontre la Chaleur de plus de 10 Épices Ghanéennes",
    "hero.sub": "Un opulent sanctuaire de fusion caché sur Cantonments Road, Osu. Découvrez la haute cuisine française classique sublimée par les meilleurs terroirs d'Afrique de l'Ouest et de subtiles notes japonaises.",
    "hero.viewMenu": "Voir le Menu Digital",
    "hero.reserveTable": "Réserver une Table",

    // Specials
    "specials.title": "Spécialités Gastronomiques du Chef",
    "specials.sub": "Délices méticuleusement composés pour nos clients d'élite d'Osu. Chaque spécialité représente un récit culinaire conçu par le Chef Boisson.",
    "specials.addToCart": "Ajouter à la Commande",
    "specials.prep": "Min Prep",
    "specials.kcal": "kcal",
    "specials.allergens": "Allergènes",
    "specials.instructions": "Instructions du Chef / notes d'allergie ?",
    "specials.placeholder": "Demandes de modifications spéciales... (ex. noix de cajou crues supplémentaires, sans gluten, etc.)",

    // Meet the Chef
    "chef.sub": "L’Art de la Table",
    "chef.title": "Rencontrez l’Architecte de",
    "chef.italic": "l’Harmonie Gastronomique",
    "chef.story": "Formé dans les légendaires académies culinaires lyonnaises et perfectionné pendant dix ans entre Kyoto et Paris, le Chef Laurent Boisson apporte sa symphonie visionnaire franco-orientale directement au cœur battant d'Osu, Accra. Notre menu est l'œuvre d'une vie de découverte des saveurs.",
    "chef.button": "Lire son Histoire & Philosophie",
    "chef.role": "Maître Culinaire de France",
    "chef.creator": "Chef de Cuisine & Concepteur, Le Magellan Osu",
    "chef.quote": "\"La cuisine n'est pas qu'un savoir technique, c'est un dialogue spirituel. En mariant la rigueur classique française à la chaleur intense des épices ghanéennes et à la balance orientale, nous offrons une émotion dans chaque assiette.\"",
    "chef.threePillars": "Nos Trois Piliers Philosophiques",
    "chef.p1.title": "Rigueur Française",
    "chef.p1.desc": "Réduction méticuleuse des fonds, températures d'émulsion précises et présentations chirurgicales garantissent une excellence structurelle.",
    "chef.p2.title": "Zen Oriental",
    "chef.p2.desc": "Infusion subtile de gingembre, badiane, citronnelle et poivre du Sichuan pour équilibrer, éveiller et surprendre le palais.",
    "chef.p3.title": "Terroir Local",
    "chef.p3.desc": "Valorisation des producteurs ghanéens avec les noix de cajou crues de Cantonments, les bananes plantains douces d'Osu et le cacao de légende.",

    // MenuSection
    "menu.title": "L'Académie Culinaire",
    "menu.sub": "Explorez notre catalogue de sélections raffinées. Parcourez entrées, plats, desserts artisanaux et grands crus.",
    "menu.starters": "Entrées",
    "menu.mains": "Plats",
    "menu.desserts": "Desserts",
    "menu.beverages": "Boissons",
    "menu.search": "Rechercher un plat / ingrédient...",
    "menu.vegan": "Végétalien seulement",
    "menu.gluten": "Sans Gluten seulement",
    "menu.addToOrder": "Ajouter",
    "menu.winePairing": "Accord Sommelier :",
    "menu.noDishes": "Aucun plat ne correspond à vos filtres. Veuillez ajuster votre recherche.",

    // SetMenuBuilder
    "curate.tag": "Gastronomie Sur Mesure",
    "curate.title": "Créateur de Formule Dégustation",
    "curate.sub": "Composez votre expérience personnalisée en 3 services. Notre Chef ajuste les saveurs avec une offre préférentielle pour nos menus prestige.",
    "curate.selectedStarters": "Entrée Sélectionnée",
    "curate.selectedMains": "Plat Sélectionné",
    "curate.selectedDesserts": "Dessert Sélectionné",
    "curate.starterLabel": "Choisir une entrée...",
    "curate.mainLabel": "Choisir un plat principal...",
    "curate.dessertLabel": "Choisir un dessert...",
    "curate.wineOption": "Inclure l'Accord Mets & Vins Grand Cru (Ajoute GH₵ 120.00)",
    "curate.priceLabel": "Prix de la Formule",
    "curate.originalVal": "Total séparé original",
    "curate.discountLabel": "La formule sur mesure économise 12%",
    "curate.addSet": "Ajouter la Formule",

    // ReservationForm
    "res.tag": "Bureau de conciergerie",
    "res.title": "Réservez votre table à Osu",
    "res.sub": "Réservez une table de prestige sous nos hauts plafonds d'Osu. Remplissez vos coordonnées pour sécuriser votre créneau.",
    "res.yourBookings": "Vos réservations en cours",
    "res.cancel": "Annuler",
    "res.confirmed": "Confirmée",
    "res.seated": "Installé",
    "res.completed": "Terminée",
    "res.noBookings": "Aucune réservation trouvée sur ce navigateur. Planifiez une table ci-dessous.",
    "res.date": "Date de Réservation",
    "res.time": "Heure d'arrivée",
    "res.guests": "Nombre de Convives",
    "res.name": "Nom de famille / Client",
    "res.email": "Adresse Email",
    "res.phone": "WhatsApp / Téléphone",
    "res.tableType": "Atmosphère du Salon",
    "res.celebration": "Type d'Occasion",
    "res.requests": "Demandes Particulières & Allergènes",
    "res.requestsPlaceholder": "ex. Décoration florale anniversaire, chaise haute, allergie sévère aux arachides, table près de la fenêtre...",
    "res.submit": "Confirmer la Réservation",
    "res.success": "Réservation enregistrée avec succès! Imprimez le récapitulatif ou attendez notre confirmation WhatsApp.",

    // Dialog table chamber options
    "chamber.main-hall": "Grand Salon Atrium (Vivant & Majestueux)",
    "chamber.romantic-booth": "Alcôve Privée Tamisée (Romantique / Couple)",
    "chamber.garden-patio": "Plein Air sous Pergola (Frais & Lumineux)",
    "chamber.chefs-counter": "Comptoir Spectacle du Chef (Expérience Immersive)",

    // Occasion types
    "occ.none": "Réservation Classique standard",
    "occ.birthday": "Anniversaire (Célébration)",
    "occ.anniversary": "Anniversaire de Mariage",
    "occ.business": "Dîner d'Affaires Dirigeant",
    "occ.date-night": "Rendez-vous Romantique",

    // ExperienceGallery
    "gallery.tag": "Témoignages de prestige",
    "gallery.title": "Une Gastronomie Acclamée",
    "gallery.sub": "Une vitrine d'éloges rédigés par d’éminents critiques, guides culinaires et visiteurs d'Osu.",

    // Footer
    "footer.rights": "Le Magellan Osu. Tous droits réservés.",
    "footer.accraKitchen": "La Cuisine d'Osu",
    "footer.hours": "Ouvert Tous les Jours",
    "footer.address": "Cantonments Road, Osu, Accra, Ghana",

    // CartDrawer
    "cart.title": "Votre Sélection en Cours",
    "cart.empty": "Votre panier est vide. Ajoutez des spécialités de notre carte pour passer votre commande en ligne.",
    "cart.total": "Total de la Sélection",
    "cart.checkout": "Passer la Commande",
    "cart.modifications": "Modifications demandées :",
    "cart.allergenWarning": "Allergènes détectés :",

    // WhatsAppButton
    "wa.wel": "Bienvenue à Osu. Choisissez une demande rapide ci-dessous ou écrivez un message personnalisé direct :",
    "wa.sub": "Conciergerie Privée • En ligne",
    "wa.placeholder": "Posez vos questions...",
    "wa.writePl": "Rédiger un message personnalisé",
    "wa.typical": "Délai de réponse habituel inférieur à 10 min",
    "wa.close": "Fermer le service",
    "wa.message": "Écrivez-nous sur WhatsApp",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('magellan_lang');
    return (saved === 'en' || saved === 'fr') ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('magellan_lang', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'fr' : 'en');
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
