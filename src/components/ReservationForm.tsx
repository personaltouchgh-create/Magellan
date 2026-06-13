import React, { useState } from 'react';
import { Calendar, Users, Clock, Info, Check, Table, Trophy, Sparkles, AlertCircle, Search, Trash2, ClipboardList, X, HelpCircle, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RESERVATION_SLOTS } from '../data';
import { TableType, Reservation } from '../types';
import { useTranslation } from '../contexts/LanguageContext';

export interface MappedTable {
  id: string;
  name: string;
  capacity: number;
  type: TableType;
  area: 'main' | 'terrace';
  perkEn: string;
  perkFr: string;
  isReserved?: boolean;
}

export const INTERACTIVE_TABLES: MappedTable[] = [
  // Main Hall (Inside)
  { id: 'T1', name: 'Table 1', capacity: 2, type: 'main-hall', area: 'main', perkEn: 'Gilded booth next to the classical live jazz grand piano', perkFr: 'Banquette dorée près du piano à queue de jazz acoustique' },
  { id: 'T2', name: 'Table 2', capacity: 4, type: 'main-hall', area: 'main', perkEn: 'Cozy fireplace table with vintage wine cellar views', perkFr: 'Cheminée chaleureuse face aux caves de grands crus' },
  { id: 'T3', name: 'Table 3', capacity: 6, type: 'main-hall', area: 'main', perkEn: 'Stately center table under the cathedral stone arch', perkFr: 'Table d’honneur centrale sous la coupole de pierre de taille' },
  { id: 'T4', name: 'Table 4', capacity: 4, type: 'main-hall', area: 'main', perkEn: 'Royal alcove overlooking the complete glowing dining hall', perkFr: 'Alcovée royale surplombant toute la salle lumineuse', isReserved: true },
  { id: 'T5', name: 'Counter 5', capacity: 2, type: 'chefs-counter', area: 'main', perkEn: 'Watch cooks grill dry-aged lobster on fire logs', perkFr: 'Face à la braise où crépitent nos homards grillés' },
  { id: 'T6', name: 'Counter 6', capacity: 2, type: 'chefs-counter', area: 'main', perkEn: 'Front row seats to view Chef Laurent’s artistic plating', perkFr: 'Aux premières loges face au piano de dressage du Chef Laurent' },
  
  // Terrace (Outdoor Garden)
  { id: 'T7', name: 'Table 7', capacity: 4, type: 'garden-patio', area: 'terrace', perkEn: 'Under the heated glowing botanical palm pergolas', perkFr: 'Sous la pergola chauffée aux palmes de lierre lumineuses' },
  { id: 'T8', name: 'Table 8', capacity: 4, type: 'garden-patio', area: 'terrace', perkEn: 'Gentle water ripples beside our organic rock fountain', perkFr: 'Près des cascades de la fontaine de pierre sculptée', isReserved: true },
  { id: 'T9', name: 'Table 9', capacity: 8, type: 'garden-patio', area: 'terrace', perkEn: 'Grand exotic island open-air pavilion for large parties', perkFr: 'Pavillon impérial al fresco parfait pour les groupes' },
  { id: 'T10', name: 'Booth 10', capacity: 2, type: 'romantic-booth', area: 'terrace', perkEn: 'Whispering candles and silk pillows in velvet garden niche', perkFr: 'Coussinages profonds d’angle aux chandelles discrètes' },
  { id: 'T11', name: 'Booth 11', capacity: 2, type: 'romantic-booth', area: 'terrace', perkEn: 'Hidden jasmine rose pathway booth with complete privacy', perkFr: 'Niche dérobée au milieu des jasmins, intimité absolue', isReserved: true },
  { id: 'T12', name: 'Booth 12', capacity: 2, type: 'romantic-booth', area: 'terrace', perkEn: 'Cozy lantern-lit garden pocket beneath warm patio heaters', perkFr: 'Bulle de confort sous les flambeaux et chauffages radiants' }
];

interface ReservationFormProps {
  reservations: Reservation[];
  onAddReservation: (res: Reservation) => void;
  onCancelReservation: (id: string) => void;
  onUpdateReservationStatus: (id: string, newStatus: 'confirmed' | 'seated' | 'completed') => void;
}

export default function ReservationForm({ 
  reservations, 
  onAddReservation, 
  onCancelReservation,
  onUpdateReservationStatus 
}: ReservationFormProps) {
  const { language } = useTranslation();
  
  const [viewMode, setViewMode] = useState<'book' | 'manage'>('book');
  
  // Diner Booking state
  const [partySize, setPartySize] = useState(2);
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedSlot, setSelectedSlot] = useState<string>('5:30 PM');
  const [tableType, setTableType] = useState<TableType>('main-hall');
  const [celebration, setCelebration] = useState<'none' | 'birthday' | 'anniversary' | 'business' | 'date-night'>('none');
  const [specialRequests, setSpecialRequests] = useState('');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
  
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);
  const [errors, setErrors] = useState<string | null>(null);

  // Staff Console filtering state
  const [staffSearchQuery, setStaffSearchQuery] = useState('');
  const [staffZoneFilter, setStaffZoneFilter] = useState<string>('all');
  const [staffDateFilter, setStaffDateFilter] = useState<string>('');

  const TABLE_DESCRIPTIONS = [
    { type: 'main-hall', name: 'Grand Dining Hall', info: 'Lively, beautifully lit with acoustic piano' },
    { type: 'romantic-booth', name: 'Cosy Velvet Booth', info: 'Secluded corner with intimate lighting' },
    { type: 'garden-patio', name: 'Lantern-Lit Garden Patio', info: 'Al fresco beneath heated pergolas' },
    { type: 'chefs-counter', name: 'Chef\'s Culinary Counter', info: 'Front-row seats overlooking the kitchen' }
  ] as const;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(null);

    if (!name.trim()) return setErrors('Please provide a full guest name.');
    if (!email.trim() || !email.includes('@')) return setErrors('Please provide a valid dining email.');
    if (!phone.trim()) return setErrors('Please provide a primary contact number.');

    const newRes: Reservation = {
      id: 'RES-' + Math.floor(Math.random() * 90000 + 10000),
      date,
      time: selectedSlot,
      partySize,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      tableType,
      celebration,
      specialRequests: specialRequests.trim() || undefined,
      status: 'confirmed'
    };

    onAddReservation(newRes);
    setConfirmedReservation(newRes);
  };

  const handleResetPass = () => {
    setConfirmedReservation(null);
    setName('');
    setEmail('');
    setPhone('');
    setSpecialRequests('');
    setCelebration('none');
  };

  // Staff Portal Search & Filter logic
  const filteredReservations = reservations.filter(res => {
    const matchesSearch = 
      res.name.toLowerCase().includes(staffSearchQuery.toLowerCase()) ||
      res.email.toLowerCase().includes(staffSearchQuery.toLowerCase()) ||
      res.phone.includes(staffSearchQuery) ||
      res.id.toLowerCase().includes(staffSearchQuery.toLowerCase());

    const matchesZone = staffZoneFilter === 'all' || res.tableType === staffZoneFilter;
    const matchesDate = !staffDateFilter || res.date === staffDateFilter;

    return matchesSearch && matchesZone && matchesDate;
  });

  // Calculate telemetry metrics
  const activeBookingsCount = reservations.filter(r => r.status === 'confirmed').length;
  const seatedGuestsCount = reservations.filter(r => r.status === 'seated').length;
  const completedCount = reservations.filter(r => r.status === 'completed').length;
  const totalCovers = reservations
    .filter(r => r.status !== 'completed')
    .reduce((sum, r) => sum + r.partySize, 0);

  return (
    <section id="booking-section" className="py-24 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden scroll-mt-12 text-[#f5f5f5]">
      
      {/* Decorative ambient backdrop */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#c5a47e]/3 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#c5a47e] block mb-3 font-semibold">
            {language === 'fr' ? "Conciergerie de Réservation" : "Digital Booking Desk"}
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-light tracking-wide mb-4 text-white">
            {language === 'fr' ? "Réservations de Tables" : "Table Reservations"}
          </h2>
          <div className="h-[1px] w-12 bg-[#c5a47e] mx-auto mb-4" />
          <p className="text-white/50 font-sans text-sm font-light leading-relaxed">
            {language === 'fr'
              ? "Réservez votre table dans notre salon d’Osu à Accra. Les réservations peuvent être planifiées jusqu’à 30 jours à l’avance. Les clients sans réservation sont accueillis selon l'affluence du jour."
              : "Reserve your placement at our Osu salon in Accra. Bookings can be scheduled up to 30 days in advance. Walk-ins are accommodated based on daily capacity limits."
            }
          </p>
        </div>

        {/* Dynamic Dual-Mode Administrative Switcher Tabs */}
        <div className="flex justify-center mb-10 bg-white/5 max-w-xs mx-auto p-1 border border-white/5 rounded-none">
          <button
            type="button"
            onClick={() => setViewMode('book')}
            className={`flex-1 py-2 text-center font-sans text-[10px] font-bold uppercase tracking-[0.15em] transition duration-200 cursor-pointer ${
              viewMode === 'book'
                ? 'bg-[#c5a47e] text-black'
                : 'text-white/50 hover:text-white'
            }`}
          >
            {language === 'fr' ? "Réservation Client" : "Diner Booking"}
          </button>
          <button
            type="button"
            onClick={() => setViewMode('manage')}
            className={`flex-1 py-2 text-center font-sans text-[10px] font-bold uppercase tracking-[0.15em] transition duration-200 cursor-pointer relative ${
              viewMode === 'manage'
                ? 'bg-[#c5a47e] text-black'
                : 'text-white/50 hover:text-white'
            }`}
          >
            {language === 'fr' ? "Console Équipe" : "Staff Console"}
            {reservations.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-stone-900 border border-[#0a0a0a] text-[8px] font-sans font-bold h-4 w-4 rounded-full flex items-center justify-center animate-pulse">
                {reservations.length}
              </span>
            )}
          </button>
        </div>

        {/* 1. DINER BOOKING VIEW FLOW */}
        {viewMode === 'book' && (
          <>
            {!confirmedReservation ? (
              <form 
                id="reservation-form"
                onSubmit={handleBookingSubmit} 
                className="max-w-4xl mx-auto bg-[#121212]/40 border border-white/5 rounded-none p-6 sm:p-10 shadow-2xl animate-in fade-in duration-300"
              >
                {errors && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-none mb-8 flex items-center gap-3 font-sans text-xs">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    {errors}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  
                  {/* LEFT: Capacity parameters */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-serif text-lg text-white font-light tracking-wide mb-4 flex items-center gap-2">
                        <Users className="h-5 w-5 text-[#c5a47e]" />
                        1. Party & Date selection
                      </h3>
                      
                      {/* Party selection */}
                      <div className="mb-4">
                        <label className="block font-sans text-[10px] uppercase font-bold tracking-[0.15em] text-white/40 mb-2">
                          Guest Count
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                            <button
                              type="button"
                              key={num}
                              onClick={() => setPartySize(num)}
                              className={`h-10 w-10 rounded-none text-center font-semibold text-xs transition duration-200 cursor-pointer ${
                                partySize === num
                                  ? 'bg-[#c5a47e] text-black font-bold'
                                  : 'bg-white/5 border border-white/5 hover:bg-white/10 text-white/70'
                              }`}
                            >
                              {num}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Date selection */}
                      <div>
                        <label className="block font-sans text-[10px] uppercase font-bold tracking-[0.15em] text-white/40 mb-2">
                          Calendar Date
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            value={date}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full bg-white/5 border border-white/5 text-white placeholder-white/30 rounded-none py-2.5 px-3.5 pl-10 text-xs focus:outline-none focus:border-[#c5a47e]"
                          />
                          <Calendar className="absolute left-3.5 top-3.5 h-4 w-4 text-white/40 font-semibold" />
                        </div>
                      </div>
                    </div>

                    {/* Slots scheduler */}
                    <div>
                      <h3 className="font-serif text-lg text-white font-light tracking-wide mb-4 flex items-center gap-2">
                        <Clock className="h-5 w-5 text-[#c5a47e]" />
                        2. Timetable Availabilities
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {RESERVATION_SLOTS.map((slot) => {
                          const isSelected = selectedSlot === slot.time;
                          const isBooked = slot.status === 'fully-booked';
                          const isFew = slot.status === 'few-left';

                          return (
                            <button
                              type="button"
                              key={slot.time}
                              disabled={isBooked}
                              onClick={() => setSelectedSlot(slot.time)}
                              className={`p-3 rounded-none border text-left transition-all relative cursor-pointer ${
                                isSelected
                                  ? 'bg-[#c5a47e]/10 border-[#c5a47e] text-[#c5a47e] font-bold'
                                  : isBooked
                                  ? 'bg-[#0d0d0d] border-transparent opacity-30 text-white/20 pointer-events-none'
                                  : 'bg-white/5 border-white/5 hover:bg-[#1a1a1a] hover:border-[#c5a47e]/30'
                              }`}
                            >
                              <span className="block text-xs font-semibold tracking-wide text-white">{slot.time}</span>
                              <span className={`block text-[9px] font-sans font-light mt-0.5 ${
                                isBooked ? 'text-white/20 line-through' : isFew ? 'text-[#c5a47e] font-medium' : 'text-emerald-400'
                              }`}>
                                {isBooked ? 'Fully Booked' : isFew ? `Only ${slot.tablesLeft} Left` : 'Available slots'}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: Zone Perks, Identifiers */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-serif text-lg text-white font-light tracking-wide mb-4 flex items-center gap-2">
                        <Table className="h-5 w-5 text-[#c5a47e]" />
                        3. Salon placement & Perks
                      </h3>
                      
                      {/* Placement */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <label className="block font-sans text-[10px] uppercase font-bold tracking-[0.15em] text-white/40">
                            {language === 'fr' ? "Zone de Placement Préférée" : "Preferred Seating Zone"}
                          </label>
                          <button
                            type="button"
                            onClick={() => setIsMapOpen(true)}
                            className="text-[#c5a47e] hover:text-[#b08d65] font-sans text-[10px] uppercase tracking-wider font-semibold underline flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <Table className="h-3 w-3" />
                            {language === 'fr' ? "Plan des Tables" : "View Table Layout"}
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {TABLE_DESCRIPTIONS.map((tab) => {
                            const isSel = tableType === tab.type;
                            return (
                              <div
                                key={tab.type}
                                onClick={() => setTableType(tab.type)}
                                className={`p-3 rounded-none border transition-all cursor-pointer ${
                                  isSel 
                                    ? 'bg-white/5 border-[#c5a47e] text-[#c5a47e]' 
                                    : 'bg-[#151515]/30 border-white/5 hover:bg-white/5 hover:border-white/10 text-white/50'
                                }`}
                              >
                                <span className="block text-xs font-serif font-light uppercase tracking-wider text-white">{tab.name}</span>
                                <span className="block text-[10px] text-white/40 font-light mt-0.5">{tab.info}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Celebrations */}
                      <div>
                        <label className="block font-sans text-[10px] uppercase font-bold tracking-[0.15em] text-white/40 mb-2">
                          Are You Celebrating an Event?
                        </label>
                        <div className="flex flex-wrap gap-1.5 flex-row">
                          {(['none', 'birthday', 'anniversary', 'date-night', 'business'] as const).map((cel) => (
                            <button
                              type="button"
                              key={cel}
                              onClick={() => setCelebration(cel)}
                              className={`px-3 py-1.5 rounded-none font-sans text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
                                celebration === cel
                                  ? 'bg-[#c5a47e] text-black font-semibold'
                                  : 'bg-white/5 hover:bg-white/10 border border-white/5 text-white/40'
                              }`}
                            >
                              {cel === 'none' ? 'No Occasion' : cel.replace('-', ' ')}
                            </button>
                          ))}
                        </div>
                        
                        {celebration !== 'none' && (
                          <div className="p-3.5 bg-[#c5a47e]/5 border border-[#c5a47e]/20 rounded-none mt-3 flex items-start gap-2.5 text-[#c5a47e] text-xs animate-in slide-in-from-top-2 duration-200">
                            <Sparkles className="h-4 w-4 shrink-0 mt-0.5 text-[#c5a47e]" />
                            <div>
                              <span className="font-semibold block font-sans text-[9px] uppercase tracking-wide">
                                L'Arôme complimentary gesture:
                              </span>
                              <span className="font-sans font-light text-[11px] text-white/70 mt-1 block leading-relaxed">
                                {celebration === 'anniversary' && 'Our sommelier will prepare complementary glasses of aged vintage port at dessert!'}
                                {celebration === 'birthday' && 'A customized candlelit handcrafted chocolate fondant truffle signature plate will accompany your evening!'}
                                {celebration === 'date-night' && 'Enjoy preferred quiet placement within our candlelit garden/booth tables with customized flower settings!'}
                                {celebration === 'business' && 'Preferred robust Wi-Fi, power plug configurations, and highly discreet table spacing for private discussions.'}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Guest details */}
                    <div className="pt-4 border-t border-white/5">
                      <h3 className="font-serif text-lg text-white font-light tracking-wide mb-4">
                        4. Guest Identity
                      </h3>
                      <div className="space-y-3.5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <input
                              type="text"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Full dining name"
                              className="w-full bg-white/5 border border-white/5 text-white placeholder-white/30 rounded-none py-2.5 px-3.5 text-xs focus:outline-none focus:border-[#c5a47e]"
                            />
                          </div>
                          <div>
                            <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Dining email address"
                              className="w-full bg-white/5 border border-white/5 text-white placeholder-white/30 rounded-none py-2.5 px-3.5 text-xs focus:outline-none focus:border-[#c5a47e]"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Contact number (for instant SMS check-in)"
                            className="w-full bg-white/5 border border-white/5 text-white placeholder-white/30 rounded-none py-2.5 px-3.5 text-xs focus:outline-none focus:border-[#c5a47e]"
                          />
                        </div>

                        <div>
                          <textarea
                            rows={2}
                            value={specialRequests}
                            onChange={(e) => setSpecialRequests(e.target.value)}
                            placeholder="Special dietary warnings, highchairs or wheelchair seating requirements..."
                            className="w-full bg-white/5 border border-white/5 text-white placeholder-white/30 rounded-none py-2 px-3 text-xs focus:outline-none focus:border-[#c5a47e] resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="font-sans text-[11px] text-white/30 italic max-w-sm text-center sm:text-left">
                    *Cancellations or modifications can be executed easily online or via SMS up to 2 hours before your booking.
                  </span>
                  <button
                    type="submit"
                    id="res-submit-btn"
                    className="w-full sm:w-auto px-10 py-4 rounded-none bg-[#c5a47e] hover:bg-[#b08d65] text-black font-sans text-xs font-bold uppercase tracking-[0.2em] transition duration-300 cursor-pointer"
                  >
                    Confirm Luxury Reservation
                  </button>
                </div>

              </form>
            ) : (
              /* CONFIRMATION BOARDING TICKET VIEW */
              <div 
                id="boarding-pass-block"
                className="max-w-xl mx-auto bg-[#121212] border border-[#c5a47e]/20 rounded-none overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
              >
                {/* Ribbon banner */}
                <div className="bg-gradient-to-r from-[#b08d65] via-[#c5a47e] to-[#b08d65] text-black p-5 text-center">
                  <Trophy className="h-6 w-6 text-black mx-auto mb-1.5" />
                  <span className="block font-sans text-[10px] uppercase font-bold tracking-[0.25em] leading-tight text-black">
                    Confirmed Placement
                  </span>
                  <h3 className="font-serif text-2xl font-semibold text-black">Your Gastronomic Pass</h3>
                </div>

                {/* Ticket Details */}
                <div className="p-6 sm:p-8 space-y-6 relative">
                  
                  <div className="absolute -left-3 top-[170px] h-6 w-6 rounded-full bg-[#0a0a0a] border-r border-[#c5a47e]/10 hidden sm:block" />
                  <div className="absolute -right-3 top-[170px] h-6 w-6 rounded-full bg-[#0a0a0a] border-l border-[#c5a47e]/10 hidden sm:block" />

                  <div className="flex justify-between items-center bg-[#0d0d0d] px-4 py-3 border border-white/5 rounded-none">
                    <div>
                      <span className="block font-sans text-[9px] uppercase tracking-wider text-white/30">Confirmation Ticket</span>
                      <span className="font-mono text-sm uppercase text-[#c5a47e] font-bold">{confirmedReservation.id}</span>
                    </div>
                    <div className="text-right">
                      <span className="block font-sans text-[9px] uppercase tracking-wider text-white/30">Salon Entry Slot</span>
                      <span className="font-sans text-xs text-white/80">{confirmedReservation.date} • {confirmedReservation.time}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/5">
                    <div>
                      <span className="block font-sans text-[9px] uppercase tracking-wider text-white/30">Primary Guest</span>
                      <span className="block font-serif text-sm text-white mt-1 font-light">{confirmedReservation.name}</span>
                    </div>
                    <div>
                      <span className="block font-sans text-[9px] uppercase tracking-wider text-white/30">Party Capacity</span>
                      <span className="block font-serif text-sm text-white mt-1 font-light">{confirmedReservation.partySize} Diner{confirmedReservation.partySize > 1 ? 's' : ''}</span>
                    </div>
                    <div>
                      <span className="block font-sans text-[9px] uppercase tracking-wider text-white/30">Assigned Zone</span>
                      <span className="block font-serif text-sm text-white mt-1 capitalize font-light">{confirmedReservation.tableType.replace('-', ' ')}</span>
                    </div>
                    <div>
                      <span className="block font-sans text-[9px] uppercase tracking-wider text-white/30">Special Event</span>
                      <span className="block font-serif text-sm text-[#c5a47e] mt-1 capitalize font-light">{confirmedReservation.celebration === 'none' ? 'None' : confirmedReservation.celebration.replace('-', ' ')}</span>
                    </div>
                  </div>

                  {confirmedReservation.celebration !== 'none' && (
                    <div className="p-4 rounded-none border border-[#c5a47e]/25 bg-[#c5a47e]/5 text-[#c5a47e]">
                      <span className="flex items-center gap-1.5 font-sans text-[10px] uppercase font-bold mb-1.5">
                        <Sparkles className="h-3.5 w-3.5" /> Special Event Treatment Active!
                      </span>
                      <p className="text-[11px] leading-relaxed text-white/70 font-sans font-light">
                        We've flagged your table for complementary surprises matching your {confirmedReservation.celebration.replace('-', ' ')} celebration.
                      </p>
                    </div>
                  )}

                  {confirmedReservation.specialRequests && (
                    <div className="p-3 bg-white/3 border border-white/5 rounded-none">
                      <span className="block font-sans text-[9px] uppercase tracking-wider text-white/30 mb-1">Kitchen Advisory Notes</span>
                      <p className="text-xs text-white/80 font-serif italic">"{confirmedReservation.specialRequests}"</p>
                    </div>
                  )}

                  <div className="text-center bg-white/3 p-4 rounded-none border border-white/5 text-white/40 text-xs leading-relaxed space-y-1">
                    <p className="text-white/80 font-serif font-light flex items-center justify-center gap-1.5">
                      <Check className="h-4 w-4 text-emerald-400 stroke-[3]" /> Perfect! Check-in Key Generated
                    </p>
                    <p className="text-white/40 text-[11px]">
                      An interactive confirmation has been dispatched to <span className="text-[#c5a47e] font-mono">{confirmedReservation.email}</span>. Show this pass on your device upon arrival.
                    </p>
                  </div>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={handleResetPass}
                      className="font-sans text-[10px] uppercase text-[#c5a47e]/80 hover:text-[#c5a47e] tracking-[0.25em] font-semibold hover:underline cursor-pointer"
                    >
                      Create another table booking
                    </button>
                  </div>

                </div>
              </div>
            )}
          </>
        )}

        {/* 2. STAFF ADMINISTRATIVE CONSOLE VIEW */}
        {viewMode === 'manage' && (
          <div className="bg-[#121212]/70 border border-white/5 rounded-none p-5 sm:p-8 shadow-2xl animate-in fade-in duration-300">
            
            {/* Header / Subdued title block */}
            <div className="sm:flex sm:items-center sm:justify-between pb-6 border-b border-white/5 mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#c5a47e]/10 border border-[#c5a47e]/20 text-[#c5a47e]">
                  <ClipboardList className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-light text-white leading-normal">Operational Guest Placement</h3>
                  <span className="block font-sans text-[10px] uppercase tracking-wider text-white/40">L'Arôme Live Seating Records</span>
                </div>
              </div>
              
              <div className="mt-4 sm:mt-0 font-sans text-[10px] text-white/30 uppercase tracking-widest text-right">
                System Active • Secure Sandbox
              </div>
            </div>

            {/* Simulated Live Management Diagnostics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-[#0f0f0f]/50 border border-white/5 p-4 rounded-none text-left">
                <span className="block font-sans text-[9px] uppercase tracking-wider text-white/40 mb-1.5">Unseated Bookings</span>
                <span className="block font-serif text-2xl text-white font-bold">{activeBookingsCount}</span>
                <span className="block font-sans text-[9px] text-[#c5a47e]/80 mt-1 uppercase tracking-wide">Pending Arrival</span>
              </div>
              <div className="bg-[#0f0f0f]/50 border border-white/5 p-4 rounded-none text-left">
                <span className="block font-sans text-[9px] uppercase tracking-wider text-white/40 mb-1.5">Currently Dining</span>
                <span className="block font-serif text-2xl text-amber-500 font-bold">{seatedGuestsCount}</span>
                <span className="block font-sans text-[9px] text-amber-500/80 mt-1 uppercase tracking-wide">Active Covers</span>
              </div>
              <div className="bg-[#0f0f0f]/50 border border-white/5 p-4 rounded-none text-left">
                <span className="block font-sans text-[9px] uppercase tracking-wider text-white/40 mb-1.5">Covers Tracked</span>
                <span className="block font-serif text-2xl text-white font-bold">{totalCovers}</span>
                <span className="block font-sans text-[9px] text-emerald-400 mt-1 uppercase tracking-wide">Reserved Seats</span>
              </div>
              <div className="bg-[#0f0f0f]/50 border border-white/5 p-4 rounded-none text-left">
                <span className="block font-sans text-[9px] uppercase tracking-wider text-white/40 mb-1.5">Completed Turnovers</span>
                <span className="block font-serif text-2xl text-emerald-400 font-bold">{completedCount}</span>
                <span className="block font-sans text-[9px] text-emerald-400/80 mt-1 uppercase tracking-wide">Dined & Cleared</span>
              </div>
            </div>

            {/* Live Filter/Search Toolrail */}
            <div className="bg-[#0a0a0a] border border-white/5 p-4 rounded-none mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
              
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  value={staffSearchQuery}
                  onChange={(e) => setStaffSearchQuery(e.target.value)}
                  placeholder="Search guest name, phone, code..."
                  className="w-full bg-white/5 border border-white/5 text-white placeholder-white/30 rounded-none py-2 px-3 pl-9 text-xs font-sans focus:outline-none focus:border-[#c5a47e]"
                />
                <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-white/30" />
              </div>

              <div className="flex flex-wrap gap-2.5 w-full md:w-auto items-center">
                
                {/* Zone Filter */}
                <select
                  value={staffZoneFilter}
                  onChange={(e) => setStaffZoneFilter(e.target.value)}
                  className="bg-white/5 border border-white/5 text-white text-[11px] px-3 py-2 rounded-none font-sans focus:outline-none"
                >
                  <option value="all" className="bg-[#121212]">All Zones</option>
                  <option value="main-hall" className="bg-[#121212]">Grand Dining Hall</option>
                  <option value="romantic-booth" className="bg-[#121212]">Cosy Velvet Booth</option>
                  <option value="garden-patio" className="bg-[#121212]">Garden Patio</option>
                  <option value="chefs-counter" className="bg-[#121212]">Chef's Counter</option>
                </select>

                {/* Calendar Date filter */}
                <input
                  type="date"
                  value={staffDateFilter}
                  onChange={(e) => setStaffDateFilter(e.target.value)}
                  className="bg-white/5 border border-white/5 text-white text-[11px] px-3 py-1.5 rounded-none font-sans focus:outline-none"
                />

                {staffDateFilter && (
                  <button
                    onClick={() => setStaffDateFilter('')}
                    className="text-white/40 hover:text-[#c5a47e] font-mono text-[9px] uppercase tracking-widest pl-1 cursor-pointer"
                  >
                    Clear Date
                  </button>
                )}

              </div>
            </div>

            {/* Tabular Lists output */}
            <div className="w-full">
              {filteredReservations.length > 0 ? (
                <>
                  {/* MOBILE CARDS VIEW (md:hidden) */}
                  <div className="md:hidden space-y-4">
                    {filteredReservations.map((res) => {
                      const computedStatus = res.status || 'confirmed';
                      return (
                        <div 
                          key={res.id} 
                          className="bg-[#0f0f0f]/80 p-4 border border-white/5 rounded-none space-y-4 text-left animate-in fade-in duration-200"
                        >
                          {/* Header: ID & Status */}
                          <div className="flex justify-between items-center pb-2 border-b border-white/5">
                            <span className="font-mono font-bold text-xs text-[#c5a47e]">{res.id}</span>
                            <div>
                              {computedStatus === 'confirmed' && (
                                <span className="px-2 py-0.5 text-[8px] bg-sky-500/10 border border-sky-500/25 text-sky-400 uppercase tracking-widest font-extrabold">
                                  Confirmed
                                </span>
                              )}
                              {computedStatus === 'seated' && (
                                <span className="px-2 py-0.5 text-[8px] bg-amber-500/10 border border-amber-500/25 text-amber-400 uppercase tracking-widest font-extrabold animate-pulse">
                                  Seated
                                </span>
                              )}
                              {computedStatus === 'completed' && (
                                <span className="px-2 py-0.5 text-[8px] bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 uppercase tracking-widest font-extrabold">
                                  Completed
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Guest Contact Info */}
                          <div>
                            <span className="block font-serif text-sm font-medium text-white">{res.name}</span>
                            <span className="block text-[10px] text-white/40 mt-1 font-mono tracking-tight font-light">
                              {res.phone} • {res.email}
                            </span>
                          </div>

                          {/* Seating Parameters & Date Time */}
                          <div className="grid grid-cols-2 gap-3 bg-white/2 p-3 border border-white/5 text-[11px]">
                            <div>
                              <span className="block text-white/30 uppercase text-[8px] tracking-wider mb-0.5 font-sans">Seating Zone</span>
                              <span className="font-sans font-light truncate text-white/80 block capitalize">
                                {res.tableType.replace('-', ' ')}
                              </span>
                            </div>
                            <div>
                              <span className="block text-white/30 uppercase text-[8px] tracking-wider mb-0.5 font-sans">Date & Slot</span>
                              <span className="font-mono tracking-tight text-[#c5a47e] block truncate">
                                {res.date} • {res.time}
                              </span>
                            </div>
                            <div>
                              <span className="block text-white/30 uppercase text-[8px] tracking-wider mb-0.5 font-sans">Covers</span>
                              <span className="font-sans font-bold text-white">
                                {res.partySize} diner{res.partySize > 1 ? 's' : ''}
                              </span>
                            </div>
                            <div>
                              <span className="block text-white/30 uppercase text-[8px] tracking-wider mb-0.5 font-sans">Special Event</span>
                              <span className="font-sans font-light text-white/80 block truncate capitalize">
                                {res.celebration === 'none' ? 'None' : res.celebration.replace('-', ' ')}
                              </span>
                            </div>
                          </div>

                          {/* Actions block */}
                          <div className="flex justify-end gap-2 pt-1">
                            {computedStatus === 'confirmed' && (
                              <>
                                <button
                                  onClick={() => onUpdateReservationStatus(res.id, 'seated')}
                                  className="flex-1 py-2 font-sans bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-[9px] uppercase tracking-wider transition duration-200 cursor-pointer text-center"
                                >
                                  Seat Guest
                                </button>
                                <button
                                  onClick={() => onCancelReservation(res.id)}
                                  className="px-3 bg-red-950/25 hover:bg-red-950/60 text-red-400 border border-red-500/15 transition duration-200 cursor-pointer flex items-center justify-center shrink-0"
                                  title="Cancel Placement"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </>
                            )}

                            {computedStatus === 'seated' && (
                              <button
                                  onClick={() => onUpdateReservationStatus(res.id, 'completed')}
                                  className="w-full py-2 font-sans bg-[#c5a47e] hover:bg-[#b08d65] text-black font-semibold text-[9px] uppercase tracking-wider transition duration-200 cursor-pointer text-center"
                              >
                                Complete Dine
                              </button>
                            )}

                            {computedStatus === 'completed' && (
                              <span className="text-[10px] text-white/30 uppercase tracking-widest block font-bold py-1 text-center w-full">
                                ✓ Table Turn Completed
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* DESKTOP TABLE VIEW (hidden md:block) */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 text-white/40 font-sans text-[10px] uppercase tracking-wider">
                          <th className="py-3 px-4 font-semibold">ID Code</th>
                          <th className="py-3 px-4 font-semibold">Guest Contact</th>
                          <th className="py-3 px-4 font-semibold">Seating Zone</th>
                          <th className="py-3 px-4 font-semibold">Date & Time</th>
                          <th className="py-3 px-4 font-semibold">Covers / Event</th>
                          <th className="py-3 px-4 font-semibold">Status Status</th>
                          <th className="py-3 px-4 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 font-sans text-xs">
                        {filteredReservations.map((res) => {
                          const computedStatus = res.status || 'confirmed';
                          return (
                            <tr 
                              key={res.id} 
                              className="hover:bg-white/1 flex-row transition-colors"
                            >
                              <td className="py-4 px-4 font-mono font-bold text-[#c5a47e] whitespace-nowrap">
                                {res.id}
                              </td>
                              <td className="py-4 px-4 whitespace-nowrap">
                                <span className="block font-serif text-sm font-medium text-white">{res.name}</span>
                                <span className="block text-[10px] text-white/40 mt-0.5">{res.email} • {res.phone}</span>
                              </td>
                              <td className="py-4 px-4 capitalize whitespace-nowrap text-white/70 font-light">
                                {res.tableType.replace('-', ' ')}
                              </td>
                              <td className="py-4 px-4 whitespace-nowrap text-white/70">
                                <span className="block text-[#c5a47e] font-mono">{res.date}</span>
                                <span className="block text-[10px] text-white/40 mt-0.5">{res.time}</span>
                              </td>
                              <td className="py-4 px-4 whitespace-nowrap text-white/70">
                                <span className="block font-bold">{res.partySize} covers</span>
                                {res.celebration !== 'none' ? (
                                  <span className="inline-flex items-center gap-1 text-[8px] uppercase tracking-wide bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1 py-0.5 mt-1 font-semibold">
                                    🎉 {res.celebration.replace('-', ' ')}
                                  </span>
                                ) : (
                                  <span className="text-[10px] text-white/20">Standard Placement</span>
                                )}
                              </td>
                              <td className="py-4 px-4 whitespace-nowrap">
                                {computedStatus === 'confirmed' && (
                                  <span className="px-2.5 py-1 text-[9px] bg-sky-500/10 border border-sky-500/25 text-sky-400 uppercase tracking-widest font-extrabold">
                                    Confirmed
                                  </span>
                                )}
                                {computedStatus === 'seated' && (
                                  <span className="px-2.5 py-1 text-[9px] bg-amber-500/10 border border-amber-500/25 text-amber-400 uppercase tracking-widest font-extrabold animate-pulse">
                                    Seated / Dining
                                  </span>
                                )}
                                {computedStatus === 'completed' && (
                                  <span className="px-2.5 py-1 text-[9px] bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 uppercase tracking-widest font-extrabold">
                                    Completed
                                  </span>
                                )}
                              </td>
                              <td className="py-4 px-4 text-right whitespace-nowrap">
                                <div className="flex gap-2 justify-end">
                                  
                                  {computedStatus === 'confirmed' && (
                                    <>
                                      <button
                                        onClick={() => onUpdateReservationStatus(res.id, 'seated')}
                                        className="px-2.5 py-1.5 font-sans bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-[9px] uppercase tracking-wider transition duration-200 cursor-pointer"
                                      >
                                        Seat Guest
                                      </button>
                                      <button
                                        onClick={() => onCancelReservation(res.id)}
                                        className="p-1.5 bg-red-950/25 hover:bg-red-950/60 text-red-400 border border-red-500/15 transition duration-200 cursor-pointer"
                                        title="Cancel Placement"
                                      >
                                        <Trash2 className="h-3.5 w-3.5" />
                                      </button>
                                    </>
                                  )}

                                  {computedStatus === 'seated' && (
                                    <button
                                      onClick={() => onUpdateReservationStatus(res.id, 'completed')}
                                      className="px-2.5 py-1.5 font-sans bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-[9px] uppercase tracking-wider transition duration-200 cursor-pointer"
                                    >
                                      Complete Dine
                                    </button>
                                  )}

                                  {computedStatus === 'completed' && (
                                    <span className="text-[10px] text-white/30 uppercase tracking-widest block font-bold py-1.5 font-sans">
                                      ✓ Table Cleared
                                    </span>
                                  )}

                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <div className="text-center py-16 border border-dashed border-white/5 bg-[#121212]/30">
                  <AlertCircle className="h-10 w-10 text-white/20 mx-auto mb-3" />
                  <p className="font-serif italic text-white/60 mb-1">No reservations listed</p>
                  <p className="text-white/30 font-sans text-[11px]">There are no reservations matching your active filter criteria.</p>
                </div>
              )}
            </div>

          </div>
        )}

      </div>

      {/* Visual Table Seating Layout Modal Map */}
      <AnimatePresence>
        {isMapOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl bg-[#111111] border border-white/10 rounded-none shadow-2xl p-6 md:p-8 text-left my-8"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsMapOpen(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white p-1 hover:bg-white/5 rounded-none transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Title Header */}
              <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/5">
                <div>
                  <div className="flex items-center gap-2 text-[#c5a47e] text-xs font-semibold uppercase tracking-wider mb-1">
                    <MapPin className="h-4 w-4" />
                    {language === 'fr' ? "Plan Interactif des Salons" : "Interactive Seating Blueprint"}
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-light tracking-wide">
                    {language === 'fr' ? "Carte Culinaire de l'Espace" : "Le Magellan Seating Chart"}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-3 text-xs font-sans text-white/50">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#c5a47e] inline-block shadow-[0_0_8px_#c5a47e]" />
                    <span>{language === 'fr' ? "Sélectionné" : "Selected"}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-white/20 border border-white/40 inline-block" />
                    <span>{language === 'fr' ? "Disponible" : "Available"}</span>
                  </div>
                  <div className="flex items-center gap-1.5 w-max">
                    <span className="w-3 h-3 rounded-full bg-red-950/40 border border-red-500/20 inline-block" />
                    <span className="text-red-400">{language === 'fr' ? "Complet" : "Reserved"}</span>
                  </div>
                </div>
              </div>

              {/* Map Instructions */}
              <p className="text-xs text-white/60 mb-6 leading-relaxed font-sans font-light">
                {language === 'fr'
                  ? "Explorez la disposition authentique de notre établissement à Osu. Cliquez sur une table disponible pour mettre à jour instantanément vos préférences d'assise."
                  : "Explore the authentic arrangement of our Osu establishment. Click on any available table to instantly select and register your dining zone preference."}
              </p>

              {/* Floor Plan Layout Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
                
                {/* 1. MAIN DINING HALL (L'Intérieur) */}
                <div className="bg-[#0a0a0a] border border-white/5 p-5 relative overflow-hidden">
                  <div className="absolute top-2 right-2 text-[9px] font-mono tracking-widest text-[#c5a47e]/40 uppercase">
                    INDOOR SALON
                  </div>
                  <h4 className="font-serif text-lg text-white mb-4 flex items-center gap-2 pb-2 border-b border-white/5">
                    <span className="text-[#c5a47e] font-serif">A.</span>
                    {language === 'fr' ? "Le Salon Principal (Main Hall)" : "The Main Dining Hall"}
                  </h4>
                  <p className="text-[10px] text-white/40 mb-6 italic">
                    {language === 'fr' ? "Ambiance feutrée, chaleureuse, éclairage tamisé de bougies et piano à queue acoustique." : "Opulent, lively candlelit salon with live grand piano performances."}
                  </p>

                  {/* Inside Seating Map Grid */}
                  <div className="relative h-[250px] bg-white/[0.01] border border-white/5 rounded-none flex items-center justify-center p-4">
                    {/* Sketchy architectural elements to look super real */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-16 bg-[#c5a47e]/10 flex items-center justify-center text-[8px] tracking-widest font-mono text-white/20 uppercase rotate-90">
                      ENTRANCE
                    </div>
                    <div className="absolute right-4 top-4 px-2.5 py-1 bg-white/2 border border-white/5 text-[8px] font-mono tracking-wider text-[#c5a47e]/80 uppercase">
                      🎹 JAZZ PIANO LOUNGE
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 h-6 bg-white/2 border border-white/5 flex items-center justify-center text-[8px] uppercase tracking-[0.2em] font-mono text-white/30">
                      ★ CHEF'S OPEN FINISHING BAR ★
                    </div>

                    {/* Interactive table dots positioned cleanly */}
                    <div className="absolute inset-0 flex flex-wrap items-center justify-center content-center gap-5 p-8 pb-14">
                      {INTERACTIVE_TABLES.filter(t => t.area === 'main').map((tab) => {
                        const isChosen = tableType === tab.type;
                        const isThisTabSelected = selectedTableId === tab.id;
                        const isReserved = tab.isReserved;

                        return (
                          <button
                            type="button"
                            key={tab.id}
                            disabled={isReserved}
                            onClick={() => {
                              setTableType(tab.type);
                              setSelectedTableId(tab.id);
                            }}
                            className={`relative transition-all duration-300 flex flex-col items-center justify-center rounded-none cursor-pointer ${
                              tab.capacity >= 6 ? 'w-16 h-16' : tab.capacity >= 4 ? 'w-14 h-14' : 'w-11 h-11'
                            } ${
                              isReserved
                                ? 'bg-red-500/5 border border-red-500/20 text-red-500/30'
                                : isChosen || isThisTabSelected
                                ? 'bg-[#c5a47e]/10 border-2 border-[#c5a47e] text-[#c5a47e] shadow-[0_0_15px_rgba(197,164,126,0.3)] scale-105'
                                : 'bg-white/5 border border-white/10 hover:border-white/40 text-white/70'
                            }`}
                          >
                            <span className="block text-[10px] font-bold font-serif whitespace-nowrap">{tab.name}</span>
                            <span className="block text-[8px] opacity-75 font-sans mt-0.5">{tab.capacity}p</span>
                            
                            {/* Inner graphical elements representing seats */}
                            <div className="absolute inset-0 border border-dashed border-white/5 pointer-events-none scale-105" />

                            {isReserved && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-[8px] text-red-400 font-bold uppercase tracking-widest leading-none">
                                Full
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 2. THE TERRACE GARDEN (La Terrasse) */}
                <div className="bg-[#0a0a0a] border border-white/5 p-5 relative overflow-hidden">
                  <div className="absolute top-2 right-2 text-[9px] font-mono tracking-widest text-[#c5a47e]/40 uppercase">
                    AL FRESCO GARDEN
                  </div>
                  <h4 className="font-serif text-lg text-white mb-4 flex items-center gap-2 pb-2 border-b border-white/5">
                    <span className="text-[#c5a47e] font-serif">B.</span>
                    {language === 'fr' ? "La Terrasse & Jardin Étoilé" : "The Tropical Terrace & Garden"}
                  </h4>
                  <p className="text-[10px] text-white/40 mb-6 italic">
                    {language === 'fr' ? "Baigné d'air marin d'Accra, niché au cœur de treillages fleuris et de lanternes chaudes." : "Breezy al fresco seating amidst heated pergolas, palms, & jasmine arches."}
                  </p>

                  {/* Terrace Seating Map Grid */}
                  <div className="relative h-[250px] bg-emerald-950/[0.01] border border-white/5 rounded-none flex items-center justify-center p-4">
                    {/* Sketchy architectural elements to look super real */}
                    <div className="absolute top-4 left-4 px-2 py-0.5 bg-[#c5a47e]/5 border border-[#c5a47e]/10 text-[7px] font-mono tracking-wider text-[#c5a47e] uppercase">
                      ⛲ ROCK WATERFALL POOL
                    </div>
                    <div className="absolute bottom-4 right-4 px-2 py-0.5 bg-emerald-500/5 border border-emerald-500/10 text-[7px] font-mono tracking-wider text-emerald-400 uppercase">
                      🌴 PALM SHADOW GROVE
                    </div>
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-1 items-start text-white/20 whitespace-nowrap">
                      <div className="h-6 w-1 border-l-2 border-white/10" />
                      <span className="text-[7px] tracking-widest uppercase font-mono">Terrace Deck Railing</span>
                      <div className="h-6 w-1 border-l-2 border-white/10" />
                    </div>

                    {/* Interactive table dots positioned cleanly */}
                    <div className="absolute inset-0 flex flex-wrap items-center justify-center content-center gap-5 p-8 pb-10 pl-14">
                      {INTERACTIVE_TABLES.filter(t => t.area === 'terrace').map((tab) => {
                        const isChosen = tableType === tab.type;
                        const isThisTabSelected = selectedTableId === tab.id;
                        const isReserved = tab.isReserved;

                        return (
                          <button
                            type="button"
                            key={tab.id}
                            disabled={isReserved}
                            onClick={() => {
                              setTableType(tab.type);
                              setSelectedTableId(tab.id);
                            }}
                            className={`relative transition-all duration-300 flex flex-col items-center justify-center rounded-none cursor-pointer ${
                              tab.capacity >= 8 ? 'w-18 h-18' : tab.capacity >= 4 ? 'w-14 h-14' : 'w-11 h-11'
                            } ${
                              isReserved
                                ? 'bg-red-500/5 border border-red-500/20 text-red-500/30'
                                : isChosen || isThisTabSelected
                                ? 'bg-[#c5a47e]/10 border-2 border-[#c5a47e] text-[#c5a47e] shadow-[0_0_15px_rgba(197,164,126,0.3)] scale-105'
                                : 'bg-white/5 border border-white/10 hover:border-white/40 text-white/70'
                            }`}
                          >
                            <span className="block text-[10px] font-bold font-serif whitespace-nowrap">{tab.name}</span>
                            <span className="block text-[8px] opacity-75 font-sans mt-0.5">{tab.capacity}p</span>
                            
                            {/* Inner graphical elements representing seats */}
                            <div className="absolute inset-0 border border-dashed border-white/5 pointer-events-none scale-105" />

                            {isReserved && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-[8px] text-red-400 font-bold uppercase tracking-widest leading-none">
                                Full
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

              </div>

              {/* Dynamic Seating Zone Information Block */}
              {(() => {
                const currentSelection = INTERACTIVE_TABLES.find(t => t.id === selectedTableId) || INTERACTIVE_TABLES.find(t => t.type === tableType && !t.isReserved);
                if (!currentSelection) return null;
                
                return (
                  <div className="p-4 bg-white/3 border border-white/10 rounded-none mb-6 animate-in fade-in duration-200">
                    <h5 className="font-sans text-[10px] uppercase tracking-[0.15em] font-semibold text-[#c5a47e] mb-1">
                      {language === 'fr' ? "Emplacement Actuellement Sélectionné :" : "Currently Selected Placement :"}
                    </h5>
                    <div className="flex flex-col sm:flex-row items-baseline gap-2">
                      <span className="font-serif text-lg font-medium text-white">{currentSelection.name} ({currentSelection.capacity} seats)</span>
                      <span className="text-xs text-white/40 font-sans">•</span>
                      <span className="text-xs text-[#c5a47e] font-sans font-light italic">
                        {language === 'fr' ? currentSelection.perkFr : currentSelection.perkEn}
                      </span>
                    </div>
                  </div>
                );
              })()}

              {/* Confirm / Continue Button */}
              <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setIsMapOpen(false)}
                  className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white font-sans text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  {language === 'fr' ? "Fermer" : "Close Map"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsMapOpen(false)}
                  className="px-8 py-2.5 bg-[#c5a47e] hover:bg-[#b08d65] text-black font-sans text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                >
                  {language === 'fr' ? "Confirmer la Sélection" : "Confirm Seating Choice"}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
