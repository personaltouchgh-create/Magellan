import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, CreditCard, Check, Ticket, MapPin, Receipt, Star, ShieldCheck, Truck, Utensils, Volume2, VolumeX } from 'lucide-react';
import { OrderItem } from '../types';
import { useTranslation } from '../contexts/LanguageContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: OrderItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const { language } = useTranslation();
  
  const [tipRate, setTipRate] = useState<number>(0.15); // Default 15% tipping
  const [orderFormat, setOrderFormat] = useState<'dine-in' | 'pickup' | 'delivery'>('dine-in');
  
  // Fulfillment details
  const [tableNumber, setTableNumber] = useState('');
  const [pickupTime, setPickupTime] = useState('6:30 PM');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  
  // Payment option details (Mobile Money & Cash on Delivery)
  const [paymentOption, setPaymentOption] = useState<'momo' | 'cod'>('momo');
  const [momoProvider, setMomoProvider] = useState<'mtn' | 'telecel' | 'at'>('mtn');
  const [momoNumber, setMomoNumber] = useState('');

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('');
  const [orderReceipt, setOrderReceipt] = useState<any>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  if (!isOpen) return null;

  // L10n Dishes Mapping Dictionary
  const getLocalizedDishName = (dish: any) => {
    if (language === 'fr') {
      const frNames: Record<string, string> = {
        's1': 'Foie Gras Saisi Le Magellan',
        's2': 'Escargots au Beurre d’Ail',
        's3': 'Carpaccio de Bœuf aux Truffes Noires',
        's4': 'Calamars Croustillants au Togarashi',
        'm1': 'Ribeye de Wagyu Grillé au Feu de Bois',
        'm2': 'Confit de Canard Laqué au Szechuan',
        'm3': 'Poulpe Grillé au Chimichurri',
        'm4': 'Bouillabaisse de Vivaneau Rouge Le Magellan',
        'm5': 'Linguine aux Truffes et Champignons Sauvages',
        'm6': 'Steak de Chou-Fleur au Gingembre et Coco',
        'd1': 'Fondant au Chocolat 70% Pur Cacao',
        'd2': 'Crème Brûlée au Gingembre et Citronnelle',
        'd3': 'Profiteroles au Chocolat Chaud',
        'b1': 'Mule au Tamarin et Gingembre d’Osu',
        'b2': 'L\'Arôme Hibiscus Fizz',
        'b3': 'Château d\'Yquem Sauternes Cru',
        'b4': 'Champagne Dom Pérignon Brut',
        'b5': 'Limonade Artisanale Menthe Fraîche',
      };
      if (frNames[dish.id]) return frNames[dish.id];
      if (dish.name && (dish.name.includes("Curated Tasting Set Menu") || dish.name.includes("Formule Dégustation Prestige"))) {
        return "Formule Dégustation Prestige du Chef";
      }
    }
    return dish.name;
  };

  // Pricing tallies
  const subtotal = cart.reduce((total, item) => total + (item.pricePaid * item.quantity), 0);
  const TAX_RATE = 0.15; // 15% local Ghana VAT & Levies
  const taxAmount = subtotal * TAX_RATE;
  
  // Optional discretionary staff safety premium fund
  const HOSPITALITY_FEE_RATE = 0.05; // 5% hospitality fee
  const hospitalityFee = subtotal * HOSPITALITY_FEE_RATE;

  // Delivery charge flat rate in Cedis (GH₵ 50.00)
  const DELIVERY_FEE = 50.00;
  const deliveryCharge = orderFormat === 'delivery' ? DELIVERY_FEE : 0;

  const computedTip = orderFormat === 'dine-in' ? subtotal * tipRate : 0;
  const grandTotal = subtotal > 0 ? subtotal + taxAmount + hospitalityFee + computedTip + deliveryCharge : 0;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutError(null);

    // Baseline validation
    if (cart.length === 0) {
      return setCheckoutError(language === 'fr' ? 'Votre panier de dégustation est vide.' : 'Your culinary ordering bag is empty.');
    }
    if (!guestName.trim()) {
      return setCheckoutError(language === 'fr' ? 'Veuillez renseigner le nom de l’hôte.' : 'Please provide a guest name.');
    }
    if (!guestPhone.trim()) {
      return setCheckoutError(language === 'fr' ? 'Veuillez saisir votre numéro de téléphone.' : 'Please provide a contact phone number.');
    }
    
    // Fulfillment validation
    if (orderFormat === 'dine-in' && !tableNumber) {
      return setCheckoutError(language === 'fr' ? 'Veuillez préciser votre numéro de table.' : 'Please input your table number.');
    }
    if (orderFormat === 'delivery' && !deliveryAddress.trim()) {
      return setCheckoutError(language === 'fr' ? 'Veuillez spécifier l’adresse exacte pour la livraison.' : 'Please provide a delivery street address.');
    }

    // Payment validation
    if (paymentOption === 'momo') {
      const cleanMomo = momoNumber.replace(/\s+/g, '');
      if (cleanMomo.length < 9 || cleanMomo.length > 15) {
        return setCheckoutError(language === 'fr' ? 'Veuillez entrer un numéro de Mobile Money valide (au moins 9 chiffres).' : 'Please provide a valid Mobile Money wallet number (at least 9-10 digits).');
      }
    }

    // Simulated multi-stage secure checkout flow
    setIsCheckingOut(true);

    if (paymentOption === 'momo') {
      const cleanMomo = momoNumber.replace(/\s+/g, '');
      const maskedMomo = `${cleanMomo.slice(0, 3)}••••${cleanMomo.slice(-3)}`;
      const providerLabel = momoProvider === 'mtn' ? 'MTN MoMo' : momoProvider === 'telecel' ? 'Telecel Cash' : 'AT Money';

      setCheckoutStep(language === 'fr' ? 'Connexion sécurisée à la passerelle USSD...' : 'Initializing Secure USSD Gateway Connection...');
      setTimeout(() => {
        setCheckoutStep(language === 'fr' ? `Envoi de la demande de prélèvement sur ${maskedMomo}...` : `Pushing MoMo Debit Prompt to Wallet [${maskedMomo}]...`);
        setTimeout(() => {
          setCheckoutStep(language === 'fr' ? 'Validation des transactions de paiement en cours...' : 'Verifying Payment Ledger Transaction Authentications...');
          setTimeout(() => {
            const generatedReceipt = {
              invoiceId: 'MAGELLAN-' + Math.floor(Math.random() * 90000 + 10000),
              timestamp: new Date().toLocaleTimeString(language === 'fr' ? 'fr-FR' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
              items: [...cart],
              subtotal,
              taxAmount,
              hospitalityFee,
              deliveryCharge,
              tipRate: orderFormat === 'dine-in' ? tipRate : 0,
              computedTip,
              grandTotal,
              orderFormat,
              tableNumber,
              pickupTime,
              deliveryAddress: deliveryAddress.trim(),
              deliveryInstructions: deliveryInstructions.trim(),
              guestName,
              guestPhone,
              paymentMethod: `Mobile Money - ${providerLabel} (${maskedMomo})`
            };

            setIsCheckingOut(false);
            setOrderReceipt(generatedReceipt);
            onClearCart();
          }, 1200);
        }, 1200);
      }, 1000);
    } else {
      setCheckoutStep(language === 'fr' ? 'Enregistrement de commande en cuisine...' : 'Registering COD Request with Kitchen Ledger...');
      setTimeout(() => {
        setCheckoutStep(language === 'fr' ? 'Assignation d’un coursier de notre brigade...' : 'Saddling Gourmet Kitchen Dispatch Ledger...');
        setTimeout(() => {
          const generatedReceipt = {
            invoiceId: 'MAGELLAN-' + Math.floor(Math.random() * 90000 + 10000),
            timestamp: new Date().toLocaleTimeString(language === 'fr' ? 'fr-FR' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
            items: [...cart],
            subtotal,
            taxAmount,
            hospitalityFee,
            deliveryCharge,
            tipRate: orderFormat === 'dine-in' ? tipRate : 0,
            computedTip,
            grandTotal,
            orderFormat,
            tableNumber,
            pickupTime,
            deliveryAddress: deliveryAddress.trim(),
            deliveryInstructions: deliveryInstructions.trim(),
            guestName,
            guestPhone,
            paymentMethod: language === 'fr' ? 'Règlement Direct (Espèces ou MoMo à Table)' : 'Cash on Delivery (COD) / Pay at Restaurant'
          };

          setIsCheckingOut(false);
          setOrderReceipt(generatedReceipt);
          onClearCart();
        }, 1200);
      }, 1000);
    }
  };

  const handleResetDrawer = () => {
    setOrderReceipt(null);
    setTableNumber('');
    setDeliveryAddress('');
    setDeliveryInstructions('');
    setGuestName('');
    setGuestPhone('');
    setMomoNumber('');
    setTipRate(0.15);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      
      {/* Drawer Overlay backdrop */}
      <div 
        className="absolute inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-0 xs:pl-4 sm:pl-10">
        <div className="w-screen max-w-lg bg-[#0d0d0d] border-l border-white/5 shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-white/5 bg-[#121212] flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-[#c5a47e]" />
              <h2 className="font-serif text-lg text-white font-light tracking-wide text-left">
                {language === 'fr' ? "Panier Gastronomique" : "Bespoke Dining Order"}
              </h2>
              {cart.length > 0 && (
                <span className="font-sans text-[9px] bg-[#c5a47e]/10 text-[#c5a47e] font-bold px-2 py-0.5 tracking-wide rounded-none uppercase">
                  {cart.length} {language === 'fr' ? 'mets' : 'options'}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-none text-white/40 hover:text-white hover:bg-white/5 transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* SCROLLABLE MAIN REGION: Display Receipt Invoice if booked, otherwise Checkout Form */}
          <div className="flex-1 overflow-y-auto min-h-0 bg-[#0c0c0c] scrollbar-thin scrollbar-thumb-white/5 text-left">
            {orderReceipt ? (
              /* LUXURY RECEIPT PRINT WINDOW */
              <div id="receipt-invoice-view" className="p-6 space-y-6 animate-in fade-in duration-200">
                <div className="bg-[#121212] border border-white/5 rounded-none p-6 shadow-sm relative overflow-hidden text-white text-left">
                  {/* Receipt jagged accent vector simulation top */}
                  <div className="absolute top-0 inset-x-0 h-[3px] bg-[#c5a47e]" />
                  
                  <div className="text-center pb-6 border-b border-white/5 mb-6">
                    <span className="block font-serif text-xl tracking-widest text-[#c5a47e] font-light">LE MAGELLAN</span>
                    <span className="block font-sans text-[8px] text-white/30 uppercase tracking-[0.25em] mt-1">French & Oriental Fusion</span>
                    <span className="block font-sans text-[10px] text-white/40 mt-2">Oxford Street, Osu, Accra</span>
                  </div>

                  {/* Receipt properties */}
                  <div className="space-y-3.5 mb-6 text-xs border-b border-white/5 pb-6">
                    <div className="flex justify-between">
                      <span className="text-white/30 uppercase font-sans text-[10px] tracking-wider">
                        {language === 'fr' ? "Facture / Reçu :" : "Receipt Invoice:"}
                      </span>
                      <span className="font-mono text-[#c5a47e] font-bold">{orderReceipt.invoiceId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/30 uppercase font-sans text-[10px] tracking-wider">
                        {language === 'fr' ? "Enregistré le :" : "Time Issued:"}
                      </span>
                      <span className="text-white/80 font-light">
                        {orderReceipt.timestamp} {language === 'fr' ? "ce soir" : "tonight"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/30 uppercase font-sans text-[10px] tracking-wider font-semibold">
                        {language === 'fr' ? "Mode d'expédition :" : "Dining Method:"}
                      </span>
                      <span className="text-white/90 font-medium capitalize font-serif tracking-wide text-xs">
                        {orderReceipt.orderFormat === 'dine-in' && (language === 'fr' ? `🍽️ Sur place : Table N°${orderReceipt.tableNumber}` : `🍽️ Dine-in: Table #${orderReceipt.tableNumber}`)}
                        {orderReceipt.orderFormat === 'pickup' && (language === 'fr' ? `🛍️ Retrait Express : ${orderReceipt.pickupTime}` : `🛍️ Takeaway Pickup: ${orderReceipt.pickupTime}`)}
                        {orderReceipt.orderFormat === 'delivery' && `🚗 ${language === 'fr' ? 'Livraison par Coursier' : 'Courier Delivery'}`}
                      </span>
                    </div>
                    {orderReceipt.orderFormat === 'delivery' && (
                      <div className="text-left bg-white/3 p-3 border border-white/5 mt-2 rounded-none">
                        <span className="block font-sans text-[8px] text-white/40 uppercase tracking-widest mb-1 font-semibold">
                          {language === 'fr' ? "Adresse de livraison :" : "Delivery Destination:"}
                        </span>
                        <span className="block text-xs text-white/80 leading-relaxed font-sans">{orderReceipt.deliveryAddress}</span>
                        {orderReceipt.deliveryInstructions && (
                          <span className="block text-[10px] text-[#c5a47e] mt-1 italic font-sans">"{orderReceipt.deliveryInstructions}"</span>
                        )}
                        <span className="block text-[10px] text-emerald-400 font-sans mt-2">
                          {language === 'fr' ? "⏱ Arrivée estimée : 40 à 55 min" : "⏱ Est. Arrival in 40-55 mins"}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-white/30 uppercase font-sans text-[10px] tracking-wider">
                        {language === 'fr' ? "Mode de règlement :" : "Paid via:"}
                      </span>
                      <span className="text-white/80 font-mono text-[11px] font-medium">{orderReceipt.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/30 uppercase font-sans text-[10px] tracking-wider">
                        {language === 'fr' ? "Nom de l'Hôte :" : "Account Patron:"}
                      </span>
                      <span className="text-white/80 font-light capitalize">{orderReceipt.guestName}</span>
                    </div>
                  </div>

                  {/* Items detailed list */}
                  <div className="space-y-3 mb-6 border-b border-white/5 pb-6">
                    <span className="block font-sans text-[9px] text-white/30 uppercase tracking-widest mb-1.5 font-semibold">
                      {language === 'fr' ? "Mets commandés :" : "Ordered Creations:"}
                    </span>
                    {orderReceipt.items.map((item: any) => (
                      <div key={item.id} className="flex justify-between gap-4 text-xs">
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-light tracking-wide leading-tight truncate font-serif">
                            {item.quantity}x {getLocalizedDishName(item.dish)}
                          </p>
                          {item.modifications && (
                            <span className="block text-[10px] text-[#c5a47e] italic mt-0.5 font-sans">"{item.modifications}"</span>
                          )}
                        </div>
                        <span className="font-mono text-white/70 shrink-0">
                          GH₵{(item.pricePaid * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Financial breakdown receipt column */}
                  <div className="space-y-2 border-b border-white/5 pb-4 mb-4 text-xs font-mono">
                    <div className="flex justify-between text-white/40">
                      <span>{language === 'fr' ? "Sous-total :" : "Subtotal:"}</span>
                      <span>GH₵{orderReceipt.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white/40">
                      <span>{language === 'fr' ? "TVA & Taxes Restauration (15.0%) :" : "VAT & Tourism Levies (15.0%):"}</span>
                      <span>GH₵{orderReceipt.taxAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white/40">
                      <span>{language === 'fr' ? "Frais de Service & Exploitation (5%) :" : "Discretionary Staff Premium (5%):"}</span>
                      <span>GH₵{orderReceipt.hospitalityFee.toFixed(2)}</span>
                    </div>
                    {orderReceipt.deliveryCharge > 0 && (
                      <div className="flex justify-between text-white/40">
                        <span>{language === 'fr' ? "Frais de Livraison Coursier :" : "Courier Delivery Fee:"}</span>
                        <span>GH₵{orderReceipt.deliveryCharge.toFixed(2)}</span>
                      </div>
                    )}
                    {orderReceipt.computedTip > 0 && (
                      <div className="flex justify-between text-[#c5a47e]">
                        <span>{language === 'fr' ? `Gratification personnel (${(orderReceipt.tipRate * 100).toFixed(0)}%) :` : `Staff gratuity (${(orderReceipt.tipRate * 100).toFixed(0)}%):`}</span>
                        <span>GH₵{orderReceipt.computedTip.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  {/* Grand total grand styling */}
                  <div className="flex items-baseline justify-between pt-1">
                    <span className="font-serif text-sm text-white/50 font-light italic">
                      {language === 'fr' ? "Montant Total :" : "Grand Total:"}
                    </span>
                    <span className="font-mono text-2xl font-light text-[#c5a47e] block">
                      GH₵{orderReceipt.grandTotal.toFixed(2)}
                    </span>
                  </div>

                  {/* Success checks */}
                  <div className="bg-[#c5a47e]/5 border border-[#c5a47e]/20 p-4 rounded-none text-center mt-6 text-xs text-[#c5a47e] space-y-1">
                    <p className="font-bold flex items-center justify-center gap-1.5 mb-1 tracking-wider uppercase text-[#c5a47e]">
                      <Check className="h-4 w-4 stroke-[3]" /> {language === 'fr' ? "Commande Validée !" : "Order Placed Successfully"}
                    </p>
                    <p className="font-light text-[11px] leading-relaxed text-white/60">
                      {orderReceipt.orderFormat === 'dine-in' && (language === 'fr' ? "Notre brigade de cuisine prépare vos mets. Ils vous seront servis directement à table dans un instant." : 'Our kitchen ledger has accepted your dispatch. Food and beverage selections will arrive at your table momentarily.')} 
                      {orderReceipt.orderFormat === 'pickup' && (language === 'fr' ? `Vos créations culinaires sont réservées et seront prêtes pour votre retrait à ${orderReceipt.pickupTime} ce soir à notre accueil d'Osu.` : `Your takeaway selections are locked for pickup at ${orderReceipt.pickupTime} tonight inside our Oxford Street, Osu restaurant.`)}
                      {orderReceipt.orderFormat === 'delivery' && (language === 'fr' ? `Nos coursiers partenaires ont été saisis. Les gourmandises quitteront notre chef sous peu pour livraison chez ${orderReceipt.guestName}.` : `Gastronomic couriers have been dispatched. Your food selection is leaving the kitchen soon for delivery to ${orderReceipt.guestName}.`)}
                    </p>
                  </div>
                </div>

                {/* Reset Buttons */}
                <button
                  type="button"
                  id="invoice-reset-btn"
                  onClick={handleResetDrawer}
                  className="w-full bg-[#121212] border border-[#c5a47e]/30 hover:bg-[#c5a47e]/10 text-[#c5a47e] font-sans text-xs font-bold uppercase tracking-[0.2em] py-4 rounded-none cursor-pointer shadow-md text-center"
                >
                  {language === 'fr' ? "Retourner aux Tables" : "Return to Table Dining"}
                </button>
              </div>
            ) : (
              /* DISPLAY CART LISTINGS OUTSIDE RECEIPT */
              <div className="p-6 space-y-6">
                
                {/* Cart listings count */}
                {cart.length > 0 ? (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                      <span className="font-sans text-[10px] text-white/30 uppercase tracking-[0.15em] font-bold">
                        {language === 'fr' ? "Récompilation culinaire" : "Course Itemization"}
                      </span>
                      <button 
                        onClick={onClearCart}
                        className="text-[#c5a47e]/60 hover:text-[#c5a47e] text-[10px] font-sans tracking-wide uppercase cursor-pointer"
                      >
                        {language === 'fr' ? "Vider le sac" : "Reset bag"}
                      </button>
                    </div>

                    {/* Cart list scroll area */}
                    <div className="space-y-3 max-h-[25vh] overflow-y-auto pr-1">
                      {cart.map((item) => (
                        <div 
                          key={item.id}
                          id={`cart-row-${item.id}`}
                          className="flex items-start gap-3 bg-[#121212]/40 p-3 rounded-none border border-white/5 relative"
                        >
                          <img 
                            src={item.dish.image} 
                            alt={getLocalizedDishName(item.dish)} 
                            className="h-12 w-12 object-cover rounded-none shrink-0 border border-white/5" 
                          />
                          <div className="flex-1 min-w-0 text-left">
                            <h4 className="font-serif text-[13px] text-white font-light tracking-wide truncate leading-tight">
                              {getLocalizedDishName(item.dish)}
                            </h4>
                            <span className="font-sans text-xs text-[#c5a47e] block mt-0.5">
                              GH₵{item.pricePaid.toFixed(2)} {language === 'fr' ? "l'unité" : "each"}
                            </span>
                            {item.modifications && (
                              <span className="block text-[10px] text-white/30 leading-tight italic truncate max-w-[200px] mt-1 font-sans">
                                "{item.modifications}"
                              </span>
                            )}
                          </div>

                          {/* Controls column */}
                          <div className="flex flex-col items-end justify-between self-stretch gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.id)}
                              className="text-white/30 hover:text-red-400 transition cursor-pointer"
                              title="Delete course"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>

                            {/* Incrementor */}
                            <div className="flex items-center gap-1.5 border border-white/5 rounded-none px-1 py-0.5 bg-white/5">
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                className="text-[10px] hover:bg-white/10 px-1 text-white/50 font-bold rounded-none cursor-pointer"
                              >
                                -
                              </button>
                              <span className="font-mono text-xs text-white font-bold w-4 text-center">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="text-[10px] hover:bg-white/10 px-1 text-white/50 font-bold rounded-none cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Dynamic tipping selector widget */}
                    {orderFormat === 'dine-in' && (
                      <div className="bg-[#121212]/60 p-4 rounded-none border border-white/5 space-y-3 text-white">
                        <span className="block font-sans text-[9px] uppercase text-white/30 tracking-widest font-semibold text-left">
                          {language === 'fr' ? "Pourboire de Reconnaissance du Service (Direct au Personnel)" : "Hospitality Tipping (Direct to Kitchen & Staff)"}
                        </span>
                        <div className="grid grid-cols-4 gap-2">
                          {([0.10, 0.15, 0.20, 0.0] as const).map((rate) => (
                            <button
                              type="button"
                              key={rate}
                              onClick={() => setTipRate(rate)}
                              className={`py-1.5 rounded-none text-center font-mono text-[11px] border transition cursor-pointer ${
                                tipRate === rate
                                  ? 'bg-[#c5a47e] border-transparent text-black font-bold'
                                  : 'bg-white/5 hover:bg-white/10 text-white/50 border-white/5'
                              }`}
                            >
                              {rate === 0.0 ? (language === 'fr' ? "Aucun" : "None") : `${(rate * 100).toFixed(0)}%`}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Operational Format selector */}
                    <div className="bg-[#121212]/60 p-4 rounded-none border border-white/5 space-y-3 text-white">
                      <div className="flex flex-col xs:flex-row xs:items-center justify-between pb-2 border-b border-white/5 gap-2">
                        <span className="font-sans text-[9px] uppercase text-white/30 tracking-widest font-semibold text-left">
                          {language === 'fr' ? "Mode de service" : "Dining Method"}
                        </span>
                        <div className="flex w-full xs:w-auto rounded-none overflow-hidden border border-white/5 bg-white/3 p-0.5">
                          <button
                            type="button; button"
                            onClick={() => setOrderFormat('dine-in')}
                            className={`flex-1 xs:flex-none px-3 py-1.5 rounded-none text-[8px] xs:text-[9px] uppercase font-bold tracking-wider cursor-pointer transition-all ${
                              orderFormat === 'dine-in'
                                ? 'bg-[#c5a47e] text-black shadow'
                                : 'text-white/40 hover:bg-white/5'
                            }`}
                          >
                            {language === 'fr' ? "Sur Place" : "Dine In"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setOrderFormat('pickup')}
                            className={`flex-1 xs:flex-none px-3 py-1.5 rounded-none text-[8px] xs:text-[9px] uppercase font-bold tracking-wider cursor-pointer transition-all ${
                              orderFormat === 'pickup'
                                ? 'bg-[#c5a47e] text-black shadow'
                                : 'text-white/40 hover:bg-white/5'
                            }`}
                          >
                            {language === 'fr' ? "Retrait" : "Pickup"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setOrderFormat('delivery')}
                            className={`flex-1 xs:flex-none px-3 py-1.5 rounded-none text-[8px] xs:text-[9px] uppercase font-bold tracking-wider cursor-pointer transition-all ${
                              orderFormat === 'delivery'
                                ? 'bg-[#c5a47e] text-black shadow'
                                : 'text-white/40 hover:bg-white/5'
                            }`}
                          >
                            {language === 'fr' ? "Livraison" : "Delivery"}
                          </button>
                        </div>
                      </div>

                      {/* Checkout secure form */}
                      <form id="drawer-checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
                        {checkoutError && (
                          <div className="p-2.5 bg-red-500/10 text-red-500 rounded-none text-[11px] font-sans border border-red-500/20 text-left">
                            ✕ {checkoutError}
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            required
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            placeholder={language === 'fr' ? "Votre nom et prénom" : "Your full name"}
                            className="bg-white/5 border border-white/5 rounded-none p-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#c5a47e]"
                          />
                          <input
                            type="tel"
                            required
                            value={guestPhone}
                            onChange={(e) => setGuestPhone(e.target.value)}
                            placeholder={language === 'fr' ? "N° de Téléphone" : "Phone number"}
                            className="bg-white/5 border border-white/5 rounded-none p-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#c5a47e]"
                          />
                        </div>

                        {/* Format parameters specific options */}
                        {orderFormat === 'dine-in' && (
                          <div>
                            <input
                              type="number"
                              min={1}
                              max={60}
                              required
                              value={tableNumber}
                              onChange={(e) => setTableNumber(e.target.value)}
                              placeholder={language === 'fr' ? "Indiquez votre numéro de table physique (1 à 60)" : "Input physical table number (1-60)"}
                              className="w-full bg-white/5 border border-white/5 rounded-none p-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#c5a47e]"
                            />
                          </div>
                        )}

                        {orderFormat === 'pickup' && (
                          <div className="flex gap-2 bg-white/3 p-3 border border-whites/5 items-center justify-between">
                            <span className="font-sans text-[9px] text-white/40 uppercase tracking-widest shrink-0">
                              {language === 'fr' ? "Créneau de Retrait Osu :" : "Pickup Time Slot:"}
                            </span>
                            <select
                              value={pickupTime}
                              onChange={(e) => setPickupTime(e.target.value)}
                              className="bg-white/5 border border-white/5 rounded-none p-1.5 text-xs text-white cursor-pointer focus:outline-none"
                            >
                              <option className="bg-[#121212]">5:30 PM</option>
                              <option className="bg-[#121212]">6:00 PM</option>
                              <option className="bg-[#121212]">6:30 PM</option>
                              <option className="bg-[#121212]">7:00 PM</option>
                              <option className="bg-[#121212]">7:30 PM</option>
                              <option className="bg-[#121212]">8:00 PM</option>
                              <option className="bg-[#121212]">8:30 PM</option>
                              <option className="bg-[#121212]">9:00 PM</option>
                              <option className="bg-[#121212]">9:30 PM</option>
                            </select>
                          </div>
                        )}

                        {orderFormat === 'delivery' && (
                          <div className="space-y-2 animate-in slide-in-from-top-2 duration-200">
                            <div className="relative">
                              <input
                                type="text"
                                required
                                value={deliveryAddress}
                                onChange={(e) => setDeliveryAddress(e.target.value)}
                                placeholder={language === 'fr' ? "Indication précise (Rue, Résidence) à Accra" : "Street Address, Apt / Suite number"}
                                className="w-full bg-white/5 border border-white/5 rounded-none py-2.5 pr-2.5 pl-8 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#c5a47e]"
                              />
                              <MapPin className="absolute left-2.5 top-3 h-3.5 w-3.5 text-white/30" />
                            </div>
                            <input
                              type="text"
                              value={deliveryInstructions}
                              onChange={(e) => setDeliveryInstructions(e.target.value)}
                              placeholder={language === 'fr' ? "Consignes complémentaires (ex: digicode, appeler à l'arrivée...)" : "Delivery notes (e.g. ring buzzer #102, contactless)"}
                              className="w-full bg-white/5 border border-white/5 rounded-none p-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#c5a47e]"
                            />
                            <div className="flex items-center gap-1.5 text-[#c5a47e] text-[10px] uppercase tracking-wider font-semibold">
                              <Truck className="h-3.5 w-3.5" /> 
                              <span>{language === 'fr' ? "+ 50.00 GH₵ de frais logistiques d'expédition" : "+ GH₵50.00 courier logistics rates apply"}</span>
                            </div>
                          </div>
                        )}

                        {/* PAYMENT METHOD SELECTOR (MoMo vs COD) */}
                        <div className="bg-[#121212]/60 p-4 rounded-none border border-white/5 space-y-3 text-white text-left">
                          <span className="font-sans text-[9px] uppercase text-white/30 tracking-widest font-semibold block">
                            {language === 'fr' ? "Moyen de Règlement" : "Payment Method"}
                          </span>
                          <div className="flex rounded-none overflow-hidden border border-white/5 bg-white/3 p-0.5">
                            <button
                              type="button"
                              onClick={() => setPaymentOption('momo')}
                              className={`flex-1 px-2 py-1.5 rounded-none text-[8px] xs:text-[9px] uppercase font-bold tracking-wider cursor-pointer transition-all ${
                                paymentOption === 'momo'
                                  ? 'bg-[#c5a47e] text-black shadow'
                                  : 'text-white/40 hover:bg-white/5'
                              }`}
                            >
                              📲 Mobile Money
                            </button>
                            <button
                              type="button"
                              onClick={() => setPaymentOption('cod')}
                              className={`flex-1 px-2 py-1.5 rounded-none text-[8px] xs:text-[9px] uppercase font-bold tracking-wider cursor-pointer transition-all ${
                                paymentOption === 'cod'
                                  ? 'bg-[#c5a47e] text-black shadow'
                                  : 'text-white/40 hover:bg-white/5'
                              }`}
                            >
                              💵 {language === 'fr' ? "Régler au Salon" : "Cash / At Salon"}
                            </button>
                          </div>
                        </div>

                        {/* CONDITIONAL PAYMENT INPUTS */}
                        {paymentOption === 'momo' ? (
                          <div className="border border-[#c5a47e]/20 bg-[#c5a47e]/3 p-4 rounded-none space-y-3.5 text-left">
                            <div className="flex justify-between items-center pb-1.5 border-b border-white/5">
                              <span className="font-sans text-[9px] uppercase text-[#c5a47e] tracking-widest font-semibold flex items-center gap-1">
                                <ShieldCheck className="h-3.5 w-3.5" /> {language === 'fr' ? "Passerelle mobile MoMo" : "MoMo Gateway Integration"}
                              </span>
                              <span className="font-sans text-[8px] text-white/30 uppercase tracking-widest">Instant USSD Push</span>
                            </div>

                            <div className="space-y-2.5">
                              {/* Network Provider Selector */}
                              <div>
                                <label className="block font-sans text-[8px] text-white/40 uppercase tracking-wider mb-1 font-semibold">
                                  {language === 'fr' ? "Opérateur de Réseau Mobile :" : "Service Network Partner:"}
                                </label>
                                <div className="grid grid-cols-3 gap-1.5 text-center">
                                  {(['mtn', 'telecel', 'at'] as const).map((prov) => (
                                    <button
                                      key={prov}
                                      type="button"
                                      onClick={() => setMomoProvider(prov)}
                                      className={`py-1.5 px-2 text-[8px] uppercase tracking-wider font-bold border transition-all cursor-pointer ${
                                        momoProvider === prov
                                          ? 'border-[#c5a47e] bg-[#c5a47e]/10 text-[#c5a47e]'
                                          : 'border-white/5 bg-[#121212] text-white/45'
                                      }`}
                                    >
                                      {prov === 'mtn' ? 'MTN MoMo' : prov === 'telecel' ? 'Telecel' : 'AT Money'}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* MoMo Number Input */}
                              <div>
                                <label htmlFor="momo-wallet" className="block font-sans text-[8px] text-white/40 uppercase tracking-wider mb-1 font-semibold">
                                  {language === 'fr' ? "Numéro de portefeuille mobile" : "MoMo Mobile Wallet Number"}
                                </label>
                                <input
                                  type="text"
                                  id="momo-wallet"
                                  required
                                  value={momoNumber}
                                  onChange={(e) => setMomoNumber(e.target.value.replace(/\D/g, ''))}
                                  placeholder="e.g. 0244550192"
                                  className="w-full bg-[#0a0a0a] border border-white/5 font-mono text-xs tracking-wider rounded-none p-2.5 text-white placeholder-white/20 focus:outline-none focus:border-[#c5a47e]"
                                />
                              </div>

                              {/* Explanation prompt */}
                              <p className="text-[9px] leading-relaxed text-white/40">
                                {language === 'fr' 
                                  ? `En cliquant sur Placer Commande, une notification d'approbation instantanée USSD s'affichera sur votre terminal mobile ${momoProvider === 'mtn' ? 'MTN' : momoProvider === 'telecel' ? 'Telecel' : 'AT'}. Veuillez saisir votre code PIN secret pour confirmer la transaction.`
                                  : `Upon clicking placed order, a terminal authentication push request (USSD) will trigger on your ${momoProvider === 'mtn' ? 'MTN' : momoProvider === 'telecel' ? 'Telecel' : 'AT'} handset. Please authorize and enter your mobile money PIN to complete checkout.`
                                }
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="border border-white/5 bg-[#121212]/50 p-4 rounded-none text-left space-y-2">
                            <span className="font-sans text-[9px] uppercase text-white/30 tracking-widest font-semibold block pb-1 border-b border-white/5">
                              {language === 'fr' ? "Règlement en physique" : "Direct Settlement Advisory"}
                            </span>
                            <p className="text-[10px] leading-relaxed text-white/50">
                              {orderFormat === 'delivery' ? (
                                language === 'fr' 
                                  ? "Vos plats vous seront expédiés. Veuillez régler le solde global auprès de notre livreur à moto en espèces ou Mobile Money lors de la réception du paquet."
                                  : 'Your dining creation is registered as Cash on Delivery. Kindly settle your total order balance with our dispatched courier agent via physical cash or local MoMo transfer upon parcel receipt.'
                              ) : orderFormat === 'dine-in' ? (
                                language === 'fr'
                                  ? "Pas d'acompte à verser en ligne. Réglez simplement en espèces ou par transfert MoMo direct auprès de votre serveur de table à la fin de votre repas."
                                  : 'No pre-payment is standard. Hand over your order total in cash or direct MoMo transfer to your waiter at the table at the end of your dining experience inside Le Magellan.'
                              ) : (
                                language === 'fr'
                                  ? "Veuillez vous présenter à notre comptoir de vente à Cantonments Road, Osu pour récupérer votre paquet. Le solde s'effectuera directement sur place en espèces ou MoMo."
                                  : 'For Takeaway Pickup, please pay with cash or Mobile Money wallet transfer directly at our restaurant desk on Cantonments Road, Osu upon meal pick-up.'
                              )}
                            </p>
                          </div>
                        )}

                        {/* Interactive dynamic totals summaries inside checkout form */}
                        <div className="border-t border-white/5 pt-3 text-xs font-mono space-y-2 text-white/40 text-left">
                          <div className="flex justify-between">
                            <span>{language === 'fr' ? "Sous-total :" : "Subtotal:"}</span>
                            <span>GH₵{subtotal.toFixed(2)}</span>
                          </div>
                          {orderFormat === 'delivery' && (
                            <div className="flex justify-between">
                              <span>{language === 'fr' ? "Livraison :" : "Courier Dispatch:"}</span>
                              <span>GH₵{DELIVERY_FEE.toFixed(2)}</span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span>{language === 'fr' ? "Taxes & Redevances (15.0%) :" : "VAT & Tourism Levies (15.0%):"}</span>
                            <span>GH₵{taxAmount.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>{language === 'fr' ? "Frais de Service (5%) :" : "Discretionary Staff Levy (5%):"}</span>
                            <span>GH₵{hospitalityFee.toFixed(2)}</span>
                          </div>
                          {computedTip > 0 && (
                            <div className="flex justify-between text-[#c5a47e] font-semibold">
                              <span>{language === 'fr' ? `Gratification (${(tipRate * 100).toFixed(0)}%) :` : `Gratuity (${(tipRate * 100).toFixed(0)}%):`}</span>
                              <span>GH₵{computedTip.toFixed(2)}</span>
                            </div>
                          )}
                          <div className="flex justify-between border-t border-white/5 pt-3 text-white font-serif text-sm">
                            <span className="italic font-light text-white/60">{language === 'fr' ? "Net à Payer :" : "Total Charge:"}</span>
                            <span className="font-mono text-base font-semibold text-[#c5a47e]">
                              GH₵{grandTotal.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Checkout trigger button */}
                        <button
                          type="submit"
                          disabled={isCheckingOut || cart.length === 0}
                          className="w-full bg-[#c5a47e] hover:bg-[#b08d65] text-black font-sans text-xs font-bold uppercase tracking-[0.2em] py-4 rounded-none flex items-center justify-center gap-2 transition cursor-pointer mt-4"
                        >
                          {isCheckingOut ? (
                            <span className="flex items-center gap-1.5">
                              <span className="animate-spin h-3.5 w-3.5 border border-black border-r-transparent rounded-full" />
                              {checkoutStep}
                            </span>
                          ) : (
                            <>
                              <Utensils className="h-4.5 w-4.5" />
                              <span>
                                {language === 'fr' 
                                  ? `Placer Commande • ${grandTotal.toFixed(2)} GH₵`
                                  : `Place Gourmet Order • GH₵${grandTotal.toFixed(2)}`
                                }
                              </span>
                            </>
                          )}
                        </button>
                      </form>
                    </div>

                  </div>
                ) : (
                  <div className="text-center py-24 select-none text-white/40">
                    <ShoppingBag className="h-10 w-10 text-white/10 mx-auto mb-4" />
                    <h3 className="font-serif text-lg text-white/70 font-light mb-1">
                      {language === 'fr' ? "Votre panier est vide" : "Your dining card is clear"}
                    </h3>
                    <p className="text-white/30 text-xs font-light max-w-xs mx-auto mb-6">
                      {language === 'fr' 
                        ? "Parcourez notre carte culinaire et laissez-vous tenter par nos entrées succulentes, plats de résistance signatures ou boissons désaltérantes." 
                        : "Add appetizers, main masterpieces, or wines from our culinary lists to get started."
                      }
                    </p>
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-6 py-2.5 rounded-none border border-white/10 text-[#c5a47e]/80 hover:border-[#c5a47e] hover:text-[#c5a47e] font-sans text-xs tracking-wider uppercase transition cursor-pointer"
                    >
                      {language === 'fr' ? "Parcourir la Carte" : "Browse Delicacies"}
                    </button>
                  </div>
                )}

              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
