/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import SetMenuBuilder from './components/SetMenuBuilder';
import ReservationForm from './components/ReservationForm';
import CartDrawer from './components/CartDrawer';
import ExperienceGallery from './components/ExperienceGallery';
import Footer from './components/Footer';
import ChefSpecials from './components/ChefSpecials';
import MeetTheChef from './components/MeetTheChef';
import WhatsAppButton from './components/WhatsAppButton';
import { useTranslation } from './contexts/LanguageContext';
import { Dish, OrderItem, Reservation } from './types';

export default function App() {
  const { t } = useTranslation();
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Parse reservations from storage or assign mock seeds
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem('magellan_reservations');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback on parse failure
      }
    }
    const todayStr = new Date().toISOString().split('T')[0];
    const initialSeeds: Reservation[] = [
      {
        id: 'RES-84204',
        date: todayStr,
        time: '7:00 PM',
        partySize: 4,
        name: 'Kofi Mensah',
        email: 'k.mensah@techghana.com',
        phone: '+233 24 455 0192',
        tableType: 'main-hall',
        celebration: 'anniversary',
        specialRequests: 'Prefers table near the terrace.',
        status: 'seated'
      },
      {
        id: 'RES-10339',
        date: todayStr,
        time: '8:30 PM',
        partySize: 2,
        name: 'Amina Osei',
        email: 'amina.osei@vanguard.co.gh',
        phone: '+233 55 120 4050',
        tableType: 'romantic-booth',
        celebration: 'date-night',
        specialRequests: 'Gluten allergy warning for one patron.',
        status: 'confirmed'
      },
      {
        id: 'RES-99412',
        date: todayStr,
        time: '6:15 PM',
        partySize: 6,
        name: 'Jean-Pierre Dubois',
        email: 'jp.dubois@gastronome.org',
        phone: '+233 20 811 9904',
        tableType: 'chefs-counter',
        celebration: 'none',
        status: 'completed'
      }
    ];
    localStorage.setItem('magellan_reservations', JSON.stringify(initialSeeds));
    return initialSeeds;
  });

  // Scroll function to jump precisely to target sections
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenBooking = () => {
    setIsCartOpen(false);
    scrollToSection('booking-section');
  };

  // Add individual dish to cart
  const handleAddToCart = (dish: Dish, quantity: number, modifications?: string) => {
    const cleanModifications = modifications?.trim() || '';
    const itemUniqueId = `${dish.id}-${cleanModifications}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === itemUniqueId);

      if (existingIndex > -1) {
        // Increment quantity of existing match
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity += quantity;
        return updatedCart;
      } else {
        // Create new row
        const newItem: OrderItem = {
          id: itemUniqueId,
          dish,
          quantity,
          modifications: cleanModifications || undefined,
          pricePaid: dish.price,
        };
        return [...prevCart, newItem];
      }
    });

    // Option to auto open drawers
    setIsCartOpen(true);
  };

  // Special Gastronomic tasting multi-course set menu bundle adding logic
  const handleAddSetToCart = (
    starter: Dish,
    main: Dish,
    dessert: Dish,
    price: number,
    wineIncluded: boolean
  ) => {
    // Fabricate a custom bundle pseudo dish representation
    const bundlePseudoDish: Dish = {
      id: `set-bundle-${Date.now()}`,
      name: 'Custom 3-Course Degustation Set',
      description: `Starter: ${starter.name} | Main: ${main.name} | Dessert: ${dessert.name}.${
        wineIncluded ? ' Includes sommelier Grand Cru wine pairings.' : ''
      }`,
      price,
      category: 'mains',
      image: main.image,
      tags: ['Bespoke Set', wineIncluded ? 'With Wine' : 'No Wine'],
      allergens: Array.from(new Set([...starter.allergens, ...main.allergens, ...dessert.allergens])),
      ingredients: [...starter.ingredients, ...main.ingredients, ...dessert.ingredients],
      calories: starter.calories + main.calories + dessert.calories,
      rating: 4.95,
      prepMinutes: Math.max(starter.prepMinutes, main.prepMinutes, dessert.prepMinutes),
    };

    const newItem: OrderItem = {
      id: `bundle-${Date.now()}`,
      dish: bundlePseudoDish,
      quantity: 1,
      pricePaid: price,
    };

    setCart((prev) => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleAddReservation = (newRes: Reservation) => {
    setReservations((prev) => {
      const updated = [newRes, ...prev];
      localStorage.setItem('magellan_reservations', JSON.stringify(updated));
      return updated;
    });
  };

  const handleCancelReservation = (id: string) => {
    setReservations((prev) => {
      const updated = prev.filter((r) => r.id !== id);
      localStorage.setItem('magellan_reservations', JSON.stringify(updated));
      return updated;
    });
  };

  const handleUpdateReservationStatus = (id: string, newStatus: 'confirmed' | 'seated' | 'completed') => {
    setReservations((prev) => {
      const updated = prev.map((r) => r.id === id ? { ...r, status: newStatus } : r);
      localStorage.setItem('magellan_reservations', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div id="restaurant-app-root" className="min-h-screen bg-[#FAF9F5] text-stone-800 selection:bg-amber-500/20 antialiased overflow-x-hidden flex flex-col justify-between">
      {/* Absolute top luxury notification line */}
      <div className="bg-stone-950 py-1.5 px-4 text-center border-b border-stone-900 z-50 hidden sm:block">
        <p className="font-mono text-[9px] text-amber-500 tracking-[0.25em] uppercase font-semibold">
          {t('michelin.line')}
        </p>
      </div>

      {/* Header Sticky Navigation */}
      <Header
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBooking={handleOpenBooking}
        scrollToSection={scrollToSection}
      />

      {/* Main Body Pages */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero 
          onOpenBooking={handleOpenBooking} 
          scrollToSection={scrollToSection} 
        />

        {/* Chef Specials Section */}
        <ChefSpecials onAddToCart={handleAddToCart} />

        {/* Visionary Meet the Chef Section and Philosophy Modal */}
        <MeetTheChef />

        {/* Dynamic Digital Menu Catalog Section */}
        <MenuSection 
          onAddToCart={handleAddToCart} 
        />

        {/* Set Menu Tasting Degustation Builder Section */}
        <SetMenuBuilder 
          onAddSetToCart={handleAddSetToCart} 
        />

        {/* Dynamic Reservation Form desk Section */}
        <ReservationForm 
          reservations={reservations}
          onAddReservation={handleAddReservation} 
          onCancelReservation={handleCancelReservation}
          onUpdateReservationStatus={handleUpdateReservationStatus}
        />

        {/* Accolades & Interactive Reviews Grid Section */}
        <ExperienceGallery />
      </main>

      {/* Footer Details */}
      <Footer 
        scrollToSection={scrollToSection} 
      />

      {/* Shopping Cart Sidebar Slide-out Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Floating WhatsApp Instant Concierge for Ghana */}
      <WhatsAppButton />
    </div>
  );
}
