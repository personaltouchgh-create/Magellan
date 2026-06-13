import { Dish, Review, Slot, Reservation } from './types';

export const DISHES: Dish[] = [
  // STARTERS
  {
    id: 's1',
    name: 'Le Magellan Seared Foie Gras',
    description: 'Luxurious seared French duck foie gras served with high-end honey-glazed sweet plantain tatin, a wild star anise port reduction, and toasted crushed Ghanaian raw cashews.',
    price: 280.00,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a40?auto=format&fit=crop&q=80&w=600',
    tags: ['Signature'],
    allergens: ['Dairy', 'Nuts'],
    ingredients: ['French Duck Foie Gras', 'Sweet Plantain', 'Ghanaian Cashews', 'Star Anise', 'Port Wine'],
    calories: 410,
    rating: 4.9,
    pairedWine: 'Château d\'Yquem Sauternes Reserve',
    prepMinutes: 12
  },
  {
    id: 's2',
    name: 'Escargots au Beurre d’Ail',
    description: 'Classic tender French forest snails oven-baked in butter pastry cups, infused with ginger-scallion garlic compound butter, fresh parsley, and a delicate touch of premium soy glaze.',
    price: 220.00,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=600',
    tags: ['Signature', 'Seafood'],
    allergens: ['Gluten', 'Dairy'],
    ingredients: ['Forest snails', 'Garlic butter', 'Parsley', 'Ginger', 'Pastry cups', 'Soy sauce'],
    calories: 320,
    rating: 4.8,
    pairedWine: 'Chablis Premier Cru',
    prepMinutes: 10
  },
  {
    id: 's3',
    name: 'Black Truffle Beef Carpaccio',
    description: 'Wafer-thin sliced prime beef tenderloin garnished with baby wild rocket, shaved Parmigiano-Reggiano, capers, fresh truffle pearls, and an exquisite cold-pressed white truffle oil drizzle.',
    price: 195.00,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=80&w=600',
    tags: ['Signature'],
    allergens: ['Dairy'],
    ingredients: ['Prime Beef Tenderloin', 'Arugula', 'Parmigiano-Reggiano', 'Truffle Oil', 'Capers'],
    calories: 220,
    rating: 4.92,
    pairedWine: 'Barolo DOCG',
    prepMinutes: 7
  },
  {
    id: 's4',
    name: 'Togarashi Crispy Calamari',
    description: 'Crispy cornstarch-dusted tender local calamari rings tossed in Togarashi seven-spice, accompanied by pickled cucumber sheets and a rich homemade ginger-lime aioli.',
    price: 180.00,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=600',
    tags: ['Seafood'],
    allergens: ['Eggs', 'Gluten'],
    ingredients: ['Local Calamari', 'Togarashi Spice', 'Lime', 'Ginger', 'Egg yolk egg wash'],
    calories: 340,
    rating: 4.75,
    pairedWine: 'Sancerre Sauvignon Blanc',
    prepMinutes: 8
  },

  // MAINS
  {
    id: 'm1',
    name: 'Char-Grilled Wagyu Ribeye',
    description: 'A 300g premium flame-grilled American Wagyu beef ribeye with double green peppercorn bone-marrow demi-glace sauce, garlic baby jacket potatoes, and grilled baby bok choy.',
    price: 1200.00,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600',
    tags: ['Best Seller'],
    allergens: ['Dairy', 'Soy'],
    ingredients: ['Wagyu Beef Ribeye', 'Baby Potatoes', 'Bok Choy', 'Bone Marrow Demi-glace', 'Soy marinade'],
    calories: 895,
    rating: 4.98,
    pairedWine: 'Châteauneuf-du-Pape',
    prepMinutes: 22
  },
  {
    id: 'm2',
    name: 'Szechuan Glazed Duck Confit',
    description: 'Crisp-skinned slow-cooked classic French duck leg confit finished with a sweet and fiery Szechuan honey five-spice glaze, matched with roasted orange wedges and warm beluga lentils.',
    price: 490.00,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1514516345957-556ca7d90a29?auto=format&fit=crop&q=80&w=600',
    tags: ['Signature', 'Best Seller'],
    allergens: [],
    ingredients: ['French Duck Leg', 'Szechuan pepper', 'Ghanaian honey', 'Orange', 'Beluga lentils'],
    calories: 680,
    rating: 4.95,
    pairedWine: 'Gevrey-Chambertin Pinot Noir',
    prepMinutes: 18
  },
  {
    id: 'm3',
    name: 'Grilled Octopus Chimichurri',
    description: 'Tender giant Atlantic octopus arms, char-grilled over embers, basted in herb-infused oil and served with crushed fingerling potatoes, roasted cherry vine tomatoes, and ginger-garlic chimichurri.',
    price: 520.00,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=600',
    tags: ['Signature', 'Seafood'],
    allergens: [],
    ingredients: ['Atlantic Octopus', 'Fingerling Potatoes', 'Vine Tomatoes', 'Ginger', 'Chimichurri herbs', 'Garlic'],
    calories: 450,
    rating: 4.9,
    pairedWine: 'Vermentino di Sardegna',
    prepMinutes: 20
  },
  {
    id: 'm4',
    name: 'Magellan Red Snapper Bouillabaisse',
    description: 'Pan-roasted wild red snapper fillet poached in an aromatic saffron-infused fish bone broth with ginger and lemongrass accents, roasted baby fennel, and steamed jasmine rice.',
    price: 480.00,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&q=80&w=600',
    tags: ['Seafood'],
    allergens: ['Fish'],
    ingredients: ['Wild Red Snapper', 'Saffron', 'Lemongrass', 'Ginger', 'Fennel', 'Jasmine Rice'],
    calories: 520,
    rating: 4.85,
    pairedWine: 'Pouilly-Fuissé Chardonnay',
    prepMinutes: 16
  },
  {
    id: 'm5',
    name: 'Wild Mushroom Truffle Linguine',
    description: 'Bronze-die cut artisan linguine tossed with dry-aged French porcini, fresh forest mushrooms, a velvety white wine butter sauce, truffle oil paste, and fresh Parmigiano-Reggiano.',
    price: 380.00,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=600',
    tags: ['Vegetarian', 'Signature'],
    allergens: ['Gluten', 'Dairy'],
    ingredients: ['Linguine pasta', 'Porcini mushrooms', 'Forest mushrooms', 'Truffle oil', 'Parmigiano-Reggiano'],
    calories: 610,
    rating: 4.88,
    pairedWine: 'Louis Latour Bourgogne Pinot Noir',
    prepMinutes: 14
  },
  {
    id: 'm6',
    name: 'Coconut Ginger Cauliflower Steak',
    description: 'Thick fire-roasted cauliflower slab rubbed in house fusion spices, rested on a warm bed of gingered beluga lentils, wok-charred broccolini, and a velvety coconut ginger juice reduction.',
    price: 310.00,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1624462966581-bc6d768cbce5?auto=format&fit=crop&q=80&w=600',
    tags: ['Vegan'],
    allergens: [],
    ingredients: ['Organic Cauliflower', 'Beluga Lentils', 'Broccolini', 'Coconut Milk', 'Ginger root', 'Lemongrass'],
    calories: 390,
    rating: 4.7,
    pairedWine: 'Champagne Brut Nature',
    prepMinutes: 15
  },

  // DESSERTS
  {
    id: 'd1',
    name: '70% Cacao Chocolate Fondant',
    description: 'Freshly baked chocolate lava cake utilizing single-origin 70% organic Ghanaian cocoa, featuring a molten warm espresso-chocolate core, served with signature Madagascar vanilla bean gelato.',
    price: 140.00,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600',
    tags: ['Vegetarian', 'Signature'],
    allergens: ['Dairy', 'Eggs', 'Gluten'],
    ingredients: ['Organic Ghanaian Cocoa', 'Dark Espresso', 'Flour', 'Butter', 'Madagascar Vanilla Gelato'],
    calories: 550,
    rating: 4.97,
    pairedWine: 'Taylor Fladgate 20 Year Old Port',
    prepMinutes: 15
  },
  {
    id: 'd2',
    name: 'Ginger & Lemongrass Crème Brûlée',
    description: 'Velvety eggs and dairy cream custard slow-infused with pounded local ginger and lemongrass, finished with a glassy hand-burned caramelized sugar crust and local physical berries.',
    price: 120.00,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1516685018646-549198525c1b?auto=format&fit=crop&q=80&w=600',
    tags: ['Vegetarian'],
    allergens: ['Dairy', 'Eggs'],
    ingredients: ['Heavy Cream', 'Egg Yolks', 'Lemongrass', 'Ginger', 'Organic Cane Sugar'],
    calories: 420,
    rating: 4.86,
    pairedWine: 'Sauternes Dessert Wine',
    prepMinutes: 5
  },
  {
    id: 'd3',
    name: 'Profiteroles au Chocolat Chaud',
    description: 'Crisp hand-piped choux pastry puffs loaded with premium double-vanilla bean gelato, mounted and generously drizzled tableside with velvety warm dark chocolate sauce.',
    price: 130.00,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&q=80&w=600',
    tags: ['Vegetarian'],
    allergens: ['Gluten', 'Dairy', 'Eggs'],
    ingredients: ['Choux puff shell', 'Double-vanilla gelato', 'Belgian Dark Chocolate', 'Vanilla cream'],
    calories: 480,
    rating: 4.91,
    pairedWine: 'Sauternes Dessert Wine',
    prepMinutes: 8
  },

  // BEVERAGES
  {
    id: 'b1',
    name: 'Tamarind & Ginger Mule',
    description: 'A refreshing effervescent zero-alcohol signature mocktail of cold-pressed local raw ginger root, sweet tamarind extract, fresh key lime, sparkling water, and fresh mint sprigs.',
    price: 90.00,
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600',
    tags: ['Vegan', 'Non-Alcoholic'],
    allergens: [],
    ingredients: ['Local Raw Ginger', 'Tamarind pulp', 'Key Lime', 'Sparkling water', 'Fresh Mint'],
    calories: 130,
    rating: 4.88,
    prepMinutes: 4
  },
  {
    id: 'b2',
    name: 'Magellan Premium Bordeaux Blend',
    description: 'A robust, velvety glass of vintage dry French red wine showcasing notes of sweet dark cherry, elegant leather, roasted tobacco, and rich French oak wood spices.',
    price: 240.00,
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=600',
    tags: ['Vegan', 'Alcoholic'],
    allergens: ['Sulfites'],
    ingredients: ['Aged premium grapes', 'Wild yeast fermentation'],
    calories: 150,
    rating: 4.95,
    prepMinutes: 2
  },
  {
    id: 'b3',
    name: 'Green Matcha White Cosmopolitan',
    description: 'A premium mixology creation of clean standard vodka infused with organic ceremonial-grade Japanese green matcha, orange liqueur, fresh key lime juice, and white cranberry juice.',
    price: 110.00,
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=600',
    tags: ['Vegan', 'Alcoholic'],
    allergens: [],
    ingredients: ['Premium Vodka', 'Ceremonial Matcha', 'Orange Liqueur', 'White Cranberry', 'Lime Juice'],
    calories: 180,
    rating: 4.82,
    prepMinutes: 5
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev1',
    author: 'Ama Mensah',
    rating: 5,
    date: 'June 2, 2026',
    comment: 'The interior of Le Magellan in Osu is stunning. The Wagyu Ribeye was tender beyond belief and beautifully flavored with oriental touch. A world-class dining experience in Accra!',
    role: 'Accra Luxury Travel Guide',
    source: 'google'
  },
  {
    id: 'rev2',
    author: 'Jean-Pierre Dupoint',
    rating: 5,
    date: 'May 28, 2026',
    comment: 'Impeccable service and outstanding French techniques meets sublime Asian flavours. The Escargots baked in ginger-scallion butter was a masterpiece. Highly recommend!',
    role: 'Gastronomy Food Critic',
    source: 'yelp'
  },
  {
    id: 'rev3',
    author: 'Kojo Boateng',
    rating: 4.8,
    date: 'May 15, 2026',
    comment: 'The set menu builder is excellent. Best way to sample the French and Oriental fusion. The lemongrass hibiscus crème brûlée is an absolute triumph of flavors.',
    role: 'Osu Food Blogger',
    source: 'direct'
  },
  {
    id: 'rev4',
    author: 'Nadir Al-Mansoor',
    rating: 5,
    date: 'April 20, 2026',
    comment: 'A true culinary oasis in Accra. Outstanding attention detail, premium ingredients, and the Mobile Money paying process is incredibly smooth and convenient!',
    role: 'Yelp Elite Reviewer',
    source: 'yelp'
  },
  {
    id: 'rev5',
    author: 'Yasmine Osei',
    rating: 4.9,
    date: 'May 04, 2026',
    comment: 'Beautiful candlelight ambiance for anniversary dinners. Impeccable hospitalities, delicious foods and right in the heart of Osu. Five stars!',
    role: 'Google Verified Local Patron',
    source: 'google'
  }
];

export const RESERVATION_SLOTS: Slot[] = [
  { time: '5:00 PM', status: 'available', tablesLeft: 5 },
  { time: '5:30 PM', status: 'available', tablesLeft: 4 },
  { time: '6:00 PM', status: 'few-left', tablesLeft: 2 },
  { time: '6:30 PM', status: 'fully-booked', tablesLeft: 0 },
  { time: '7:00 PM', status: 'few-left', tablesLeft: 1 },
  { time: '7:30 PM', status: 'fully-booked', tablesLeft: 0 },
  { time: '8:00 PM', status: 'few-left', tablesLeft: 2 },
  { time: '8:30 PM', status: 'available', tablesLeft: 4 },
  { time: '9:00 PM', status: 'available', tablesLeft: 6 },
  { time: '9:30 PM', status: 'available', tablesLeft: 8 }
];

export const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'MAG-84291',
    name: 'Dr. Kwame Addo',
    email: 'k.addo@accrabusiness.com',
    phone: '+233 24 455 0192',
    partySize: 4,
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    time: '7:00 PM',
    tableType: 'romantic-booth',
    celebration: 'anniversary',
    specialRequests: 'Prefer a secluded booth table. Sommelier recommendations for French red wine requested.',
    status: 'confirmed'
  },
  {
    id: 'MAG-19402',
    name: 'Priscilla Mensah',
    email: 'priscilla@osu-ventures.com',
    phone: '+233 27 700 9011',
    partySize: 2,
    date: new Date().toISOString().split('T')[0], // Today
    time: '6:00 PM',
    tableType: 'chefs-counter',
    celebration: 'birthday',
    specialRequests: 'Gluten-free menu items preferred. Looking forward to the Szechuan Cassava Fish.',
    status: 'seated'
  },
  {
    id: 'MAG-73910',
    name: 'Jean-Pierre Dupoint',
    email: 'jp.dupont@ambassade-accra.fr',
    phone: '+233 55 529 1845',
    partySize: 6,
    date: new Date().toISOString().split('T')[0], // Today
    time: '5:30 PM',
    tableType: 'garden-patio',
    celebration: 'business',
    specialRequests: 'Quiet outdoor garden table with electrical sockets.',
    status: 'completed'
  },
  {
    id: 'MAG-38291',
    name: 'Akiko Tanaka',
    email: 'tanaka@ghana-orient-trade.com',
    phone: '+233 20 123 4567',
    partySize: 2,
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // 2 days from now
    time: '8:00 PM',
    tableType: 'main-hall',
    celebration: 'none',
    specialRequests: 'Wheelchair access preferred.',
    status: 'confirmed'
  }
];
