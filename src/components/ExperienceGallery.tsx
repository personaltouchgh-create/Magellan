import React, { useState } from 'react';
import { 
  Star, MessageSquare, Award, Compass, CheckCircle,
  Instagram, Facebook, Play, Pause, Heart, MessageCircle,
  ExternalLink, Volume2, VolumeX, Flame, Film, Eye 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { REVIEWS } from '../data';
import { Review } from '../types';
import { useTranslation } from '../contexts/LanguageContext';

export default function ExperienceGallery() {
  const { language } = useTranslation();

  // Load initially from local storage if available, otherwise fallback to mock
  const [reviewsList, setReviewsList] = useState<Review[]>(() => {
    const saved = localStorage.getItem('larome_reviews');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback on error
      }
    }
    return REVIEWS;
  });

  const [authorName, setAuthorName] = useState('');
  const [authorComment, setAuthorComment] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [role, setRole] = useState('Gourmet Patron');
  const [targetPlatform, setTargetPlatform] = useState<'direct' | 'google' | 'yelp'>('direct');
  const [filterSource, setFilterSource] = useState<'all' | 'google' | 'yelp' | 'direct'>('all');
  const [success, setSuccess] = useState(false);

  // Social Moments Interactive Data
  const INITIAL_SOCIALS = [
    {
      id: 'soc1',
      platform: 'instagram',
      type: 'reel',
      title: 'Duck Confit Glaze Sizzle',
      description: 'Crisp-seared duck leg confit finished with our signature sweet Szechuan-honey five spice reduction, sizzling straight from our open-fire wok station.',
      views: '24.8K',
      initialLikes: 1428,
      commentsCount: 184,
      image: 'https://images.unsplash.com/photo-1514516345957-556ca7d90a29?auto=format&fit=crop&q=80&w=600',
      tag: '🔥 Culinary Craft',
      url: 'https://www.instagram.com/lemagellan.gh?igsh=NGExeTV5dXdlNDF6'
    },
    {
      id: 'soc2',
      platform: 'instagram',
      type: 'reel',
      title: 'Midnight in Osu',
      description: 'A walk under our cozy stone arches, majestic palms, and candlelight booths in our beautiful tropical greenhouse parlour.',
      views: '19.4K',
      initialLikes: 1104,
      commentsCount: 92,
      image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&q=80&w=600',
      tag: '🕯️ Romantic Ambiance',
      url: 'https://www.instagram.com/lemagellan.gh?igsh=NGExeTV5dXdlNDF6'
    },
    {
      id: 'soc3',
      platform: 'facebook',
      type: 'post',
      title: 'Plating Ocean Fresh Snapper',
      description: 'Pan-roasted wild cassava snapper poached in rich saffron lemongrass reduction broth, served with caramelized sweet plantains.',
      views: '32.1K',
      initialLikes: 2490,
      commentsCount: 312,
      image: 'https://images.unsplash.com/photo-1580476211172-0955b74683c5?auto=format&fit=crop&q=80&w=600',
      tag: '🐟 Fresh Ocean Platter',
      url: 'https://www.facebook.com/share/1CytR3xjPm/'
    },
    {
      id: 'soc4',
      platform: 'instagram',
      type: 'reel',
      title: 'Bar Mixology Alchemy',
      description: 'Our lead bartender pressing Osu raw ginger roots, pureed sweet tamarind pulp, cardamoms, and encapsulating dry ice smoke rings.',
      views: '14.7K',
      initialLikes: 985,
      commentsCount: 56,
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=600',
      tag: '🍸 Golden Hour Sips',
      url: 'https://www.instagram.com/lemagellan.gh?igsh=NGExeTV5dXdlNDF6'
    }
  ];

  const getSocialField = (socialId: string, field: 'title' | 'description' | 'tag') => {
    const frSocials: Record<string, any> = {
      soc1: {
        title: "Mijoté du Confit de Canard",
        description: "Cuisse de canard confite saisie à point, nappée de notre réduction signature cinq épices au miel, tout juste sortie de notre wok ardent.",
        tag: "🔥 Art Culinaire de Pointe"
      },
      soc2: {
        title: "Douce Nuit Tropicale à Osu",
        description: "Une balade sous nos voûtes de pierre naturelles, palmiers et tables individuelles feutrées éclairées à la bougie dans notre serre.",
        tag: "🕯️ Romantisme & Clarté"
      },
      soc3: {
        title: "Dressages Snapper Frais de Mer",
        description: "Filet de vivaneau poêlé poché délicatement dans un bouillon safran et citronnelle fraîche, accompagné de plantains caramélisés locaux.",
        tag: "🐟 Produits de l'Océan"
      },
      soc4: {
        title: "Alchimie des Cocktails signatures",
        description: "Notre mixologue pressant du gingembre natif, du tamarin pressé doux, de la cardamome et de la fumée d'arôme encapsulée.",
        tag: "🍸 Création Minute de Zinc"
      }
    };
    const s = INITIAL_SOCIALS.find(i => i.id === socialId);
    if (language === 'fr' && frSocials[socialId]) {
      return frSocials[socialId][field];
    }
    return s ? s[field] : '';
  };

  const [likedSocials, setLikedSocials] = useState<Record<string, boolean>>({});
  const [playingSocialId, setPlayingSocialId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleLikeSocial = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedSocials(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handlePlayToggle = (id: string) => {
    if (playingSocialId === id) {
      setPlayingSocialId(null);
    } else {
      setPlayingSocialId(id);
    }
  };

  // Global static average rating count across all stored reviews
  const averageRating = (reviewsList.reduce((sum, r) => sum + r.rating, 0) / reviewsList.length).toFixed(2);

  // Filter reviews by selected platform
  const filteredReviews = reviewsList.filter(rev => {
    if (filterSource === 'all') return true;
    return (rev.source || 'direct') === filterSource;
  });

  const getReviewComment = (rev: Review): string => {
    if (language === 'fr') {
      // Return a beautiful translation if it matches the standard raw reviews
      if (rev.comment.includes("absolutely mindblowing")) {
        return "Le Magellan à Osu est un chef-d'œuvre ! Le foie gras poêlé et le canard confit sont d'une finesse inouïe. Le cadre vert tropical sous la bougie est exceptionnel de romantisme.";
      }
      if (rev.comment.includes("An absolute treasure in Accra")) {
        return "Un véritable trésor caché à Accra, la sole meunière servie y est fabuleusement fraîche. J'ai adoré composer mon propre menu dégustation interactif. Service impeccable.";
      }
      if (rev.comment.includes("coziness of the outdoor garden")) {
        return "L'ambiance feutrée du jardin d'Osu sous les lumières tamisées est fantastique, idéale pour notre dîner d'affaires privé. Bons cocktails très originaux !";
      }
    }
    return rev.comment;
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !authorComment.trim()) return;

    const newReview: Review = {
      id: 'REV-' + Date.now(),
      author: authorName.trim(),
      rating: formRating,
      date: new Date().toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      comment: authorComment.trim(),
      role: role.trim() || (language === 'fr' ? 'Client Épicurien' : 'Gourmet Patron'),
      source: targetPlatform
    };

    const updated = [newReview, ...reviewsList];
    setReviewsList(updated);
    localStorage.setItem('larome_reviews', JSON.stringify(updated));
    
    setSuccess(true);
    setAuthorName('');
    setAuthorComment('');
    setFormRating(5);
    setRole(language === 'fr' ? 'Client Épicurien' : 'Gourmet Patron');
    setTargetPlatform('direct');

    setTimeout(() => setSuccess(false), 4500);
  };

  return (
    <section id="reviews-section" className="py-24 bg-[#0a0a0a] border-t border-white/5 relative scroll-mt-12 text-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#c5a47e] block mb-3 font-semibold">
            {language === 'fr' ? "Critiques & Voix de Nos Hôtes" : "Press & Patron Voice"}
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-white font-light tracking-wide mb-4">
            {language === 'fr' ? "L'Expérience Gastronomique" : "The Dining Experience"}
          </h2>
          <div className="h-[1px] w-12 bg-[#c5a47e] mx-auto mb-6" />
          <p className="text-white/50 font-sans text-sm font-light leading-relaxed">
            {language === 'fr'
              ? "Découvrez les avis authentiques de nos éminents critiques d’art de la table, guides étoilés et fidèles dîneurs d'Accra."
              : "Discover unfiltered thoughts from certified gastronomy columnists, Michelin guides, and our treasured daily local diners."
            }
          </p>
        </div>

        {/* Gallery Stat Headers (Trophy Highlights) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          <div className="bg-[#121212]/40 border border-white/5 rounded-none p-6 flex items-center gap-4 shadow-sm">
            <div className="p-3.5 bg-[#c5a47e]/10 border border-[#c5a47e]/20 text-[#c5a47e] shrink-0 rounded-none">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <span className="block font-sans text-[9px] text-white/40 uppercase tracking-widest">
                {language === 'fr' ? "Prestige Culinaire" : "Premium Gastronomy"}
              </span>
              <span className="block font-serif text-lg font-bold text-white">Le Magellan Grand Grill</span>
              <span className="block font-sans text-xs text-white/55 font-light">
                {language === 'fr' ? "Équipe de Chefs & Maîtres de Cave d'Osu" : "Chef de Cuisine & Sommelier Team"}
              </span>
            </div>
          </div>

          <div className="bg-[#121212]/40 border border-white/5 rounded-none p-6 flex items-center gap-4 shadow-sm">
            <div className="p-3.5 bg-[#c5a47e]/10 border border-[#c5a47e]/20 text-[#c5a47e] shrink-0 rounded-none">
              <Star className="h-6 w-6 fill-[#c5a47e]" />
            </div>
            <div>
              <span className="block font-sans text-[9px] text-white/40 uppercase tracking-widest">
                {language === 'fr' ? "Note Moyenne Consolidée" : "Average Score Card"}
              </span>
              <span className="block font-serif text-lg font-bold text-white">
                {averageRating} {language === 'fr' ? "Étoiles d'évaluation" : "Star rating"}
              </span>
              <span className="block font-sans text-xs text-white/55 font-light">
                {language === 'fr' ? "Vérifié sur l'ensemble des plateformes" : "Verified across platforms"}
              </span>
            </div>
          </div>

          <div className="bg-[#121212]/40 border border-white/5 rounded-none p-6 flex items-center gap-4 shadow-sm">
            <div className="p-3.5 bg-[#c5a47e]/10 border border-[#c5a47e]/20 text-[#c5a47e] shrink-0 rounded-none">
              <Compass className="h-6 w-6" />
            </div>
            <div>
              <span className="block font-sans text-[9px] text-white/40 uppercase tracking-widest">
                {language === 'fr' ? "Ambiance du Salon" : "Aesthetic Vibe"}
              </span>
              <span className="block font-serif text-lg font-bold text-white">
                {language === 'fr' ? "Tenue Correcte Exigée" : "Smart Casual attire"}
              </span>
              <span className="block font-sans text-xs text-white/55 font-light">
                {language === 'fr' ? "Salons intimes feutrés à la bougie" : "Sophisticated candlelit booths"}
              </span>
            </div>
          </div>

        </div>

        {/* Le Magellan Social Reels & Moments Hub */}
        <div className="mb-20 bg-[#0d0d0d] border border-white/5 p-6 sm:p-8 rounded-none">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 pb-4 border-b border-white/5">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#c5a47e] font-semibold block mb-1">
                {language === 'fr' ? "⚡ SECONDES EN DIRECT DU JARDIN" : "⚡ LIVE FEED SYNDICATE"}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-white tracking-wide font-light">
                {language === 'fr' ? "Clips Vidéos & Instants Partagés" : "Social Reels & Live Moments"}
              </h3>
              <p className="text-white/40 text-xs font-sans font-light mt-1">
                {language === 'fr'
                  ? "Explorez les instantanés de notre cuisine d’exception et les ambiances de notre jardin tropical. Touchez une carte pour interagir."
                  : "Immersive culinary updates and atmosphere clips from our active social media profiles. Tap/click any card to simulate/interact with media."
                }
              </p>
            </div>
            <div className="flex flex-wrap gap-3 self-start md:self-end">
              <a 
                href="https://www.instagram.com/lemagellan.gh?igsh=NGExeTV5dXdlNDF6" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#e1306c]/10 hover:bg-[#e1306c]/20 border border-[#e1306c]/30 text-white font-mono text-[10px] uppercase font-bold tracking-[0.1em] px-3.5 py-1.5 rounded-none transition"
              >
                <Instagram className="h-4 w-4 text-[#e1306c]" />
                @lemagellan.gh
              </a>
              <a 
                href="https://www.facebook.com/share/1CytR3xjPm/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1877f2]/10 hover:bg-[#1877f2]/20 border border-[#1877f2]/30 text-white font-mono text-[10px] uppercase font-bold tracking-[0.1em] px-3.5 py-1.5 rounded-none transition"
              >
                <Facebook className="h-4 w-4 text-[#1877f2]" />
                Facebook Hub
              </a>
            </div>
          </div>

          {/* Social reels cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INITIAL_SOCIALS.map((social) => {
              const isLiked = likedSocials[social.id];
              const isPlaying = playingSocialId === social.id;
              const actualLikes = isLiked ? social.initialLikes + 1 : social.initialLikes;

              return (
                <div 
                  key={social.id}
                  onClick={() => handlePlayToggle(social.id)}
                  className="group relative aspect-[9/16] bg-[#141414] border border-white/5 overflow-hidden shadow-2xl transition-all duration-500 cursor-pointer"
                >
                  {/* Photo representation */}
                  <img 
                    src={social.image} 
                    alt={getSocialField(social.id, 'title')}
                    referrerPolicy="no-referrer"
                    className={`absolute inset-0 h-full w-full object-cover transition-all duration-[8000ms] ease-out ${
                      isPlaying ? 'scale-110 filter brightness-115' : 'group-hover:scale-105 filter brightness-90 group-hover:brightness-100'
                    }`}
                  />

                  {/* Glassmorphic vignette overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30 opacity-80" />

                  {/* Social Badge top bar */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10">
                    <span className="flex items-center gap-1.5 text-[8px] font-mono uppercase tracking-[0.1em] text-white bg-black/60 px-2 py-1 border border-white/10 rounded-none backdrop-blur-md font-semibold">
                      {social.platform === 'instagram' ? (
                        <Instagram className="h-3 w-3 text-[#e1306c]" />
                      ) : (
                        <Facebook className="h-3 w-3 text-[#1877f2]" />
                      )}
                      {social.type === 'reel' ? (language === 'fr' ? "Réel" : "Reel Clip") : (language === 'fr' ? "Post à la Une" : "Featured Post")}
                    </span>

                    {isPlaying && (
                      <span className="flex items-center gap-1 text-[8px] font-mono text-[#c5a47e] bg-black/80 border border-[#c5a47e]/40 px-2 py-1 tracking-widest font-bold">
                        <span className="h-1.5 w-1.5 bg-[#c5a47e] rounded-full animate-ping" />
                        {language === 'fr' ? "LECTURE EN COURS" : "PLAYING"}
                      </span>
                    )}
                  </div>

                  {/* Play / pause central trigger action button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ 
                        scale: isPlaying ? 1.1 : 1.0, 
                        opacity: isPlaying ? 0 : 0.85 
                      }}
                      whileHover={{ scale: 1.15, opacity: 1 }}
                      className="h-12 w-12 rounded-full bg-black/80 border border-white/20 flex items-center justify-center backdrop-blur-sm shadow-xl transition-all duration-300 group-hover:bg-[#c5a47e] group-hover:border-transparent group-hover:text-black"
                    >
                      {isPlaying ? (
                        <Pause className="h-5 w-5 text-white group-hover:text-black" />
                      ) : (
                        <Play className="h-5 w-5 text-white fill-white pl-0.5 group-hover:text-black group-hover:fill-black" />
                      )}
                    </motion.div>
                  </div>

                  {/* Interactive equalization animation & volume status if active */}
                  {isPlaying && (
                    <div className="absolute bottom-32 right-3 z-10 flex flex-col items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsMuted(!isMuted);
                        }}
                        className="p-2 rounded-full bg-black/60 border border-white/10 text-[#c5a47e] hover:bg-black/80 transition"
                        title={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                      </button>

                      <div className="flex items-end gap-[2px] h-6 bg-black/40 p-1.5 border border-white/10 rounded-none">
                        <span className="w-[2px] bg-[#c5a47e] animate-[bounce_0.8s_infinite_0s]" style={{ height: '70%', animationDuration: '0.6s' }} />
                        <span className="w-[2px] bg-[#c5a47e] animate-[bounce_0.4s_infinite_0.1s]" style={{ height: '100%', animationDuration: '0.9s' }} />
                        <span className="w-[2px] bg-[#c5a47e] animate-[bounce_0.6s_infinite_0.2s]" style={{ height: '50%', animationDuration: '0.7s' }} />
                        <span className="w-[2px] bg-[#c5a47e] animate-[bounce_0.5s_infinite_0.3s]" style={{ height: '85%', animationDuration: '0.8s' }} />
                      </div>
                    </div>
                  )}

                  {/* Content Overlays at the bottom of the card */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/95 to-transparent pt-10 z-10">
                    <span className="text-[10px] font-sans font-medium text-[#c5a47e] uppercase tracking-wider block mb-1">
                      {getSocialField(social.id, 'tag')}
                    </span>
                    <h4 className="font-serif text-sm text-white font-medium mb-1 group-hover:text-[#c5a47e] transition-colors leading-tight">
                      {getSocialField(social.id, 'title')}
                    </h4>
                    <p className="text-[11px] text-white/50 font-sans font-light leading-snug mb-3 line-clamp-2">
                      {getSocialField(social.id, 'description')}
                    </p>

                    {/* Social Stats & Interactions Footer bar */}
                    <div className="flex items-center justify-between border-t border-white/10 pt-3">
                      <div className="flex items-center gap-3">
                        {/* Likes trigger */}
                        <button
                          onClick={(e) => toggleLikeSocial(social.id, e)}
                          className="flex items-center gap-1 text-[10px] font-mono text-white/60 hover:text-red-400 transition"
                        >
                          <Heart className={`h-3.5 w-3.5 ${isLiked ? 'text-red-500 fill-red-500 scale-110' : 'text-white/40 group-hover:text-red-400'}`} />
                          <span>{actualLikes}</span>
                        </button>

                        {/* Direct Comment tracker */}
                        <span className="flex items-center gap-1 text-[10px] font-mono text-white/60">
                          <MessageCircle className="h-3.5 w-3.5 text-white/40" />
                          <span>{social.commentsCount}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-sans text-white/30 truncate flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {social.views}
                        </span>
                        
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1 rounded bg-white/5 text-white/40 hover:text-[#c5a47e] hover:bg-white/10 transition"
                          title="Open Original Post"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Structured Grid: Left (Patrons Reviews list), Right (Add Review panel) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* List display (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="sm:flex sm:items-center sm:justify-between mb-4 gap-4 pb-2 border-b border-white/5">
              <h3 className="font-serif text-2xl text-white font-light tracking-wide flex items-center gap-2 mb-2 sm:mb-0">
                <MessageSquare className="h-5.5 w-5.5 text-[#c5a47e]" />
                {language === 'fr' ? "Le Livre d'Or des Convives" : "Patron Reviews"}
              </h3>
              <span className="font-sans text-[10px] text-[#c5a47e] tracking-wider uppercase font-semibold">
                {language === 'fr' ? "Notes Enregistrées :" : "Total Rated:"} {reviewsList.length}
              </span>
            </div>

            {/* Platform Feature Filter Selection Tab */}
            <div className="flex flex-wrap gap-2 bg-white/3 border border-white/5 p-1 rounded-none mb-6">
              {(['all', 'google', 'yelp', 'direct'] as const).map((platform) => (
                <button
                  key={platform}
                  onClick={() => setFilterSource(platform)}
                  className={`px-3 py-1.5 rounded-none font-sans text-[9px] font-semibold uppercase tracking-[0.15em] transition duration-200 cursor-pointer ${
                    filterSource === platform
                      ? 'bg-[#c5a47e] text-black font-bold'
                      : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {platform === 'all' 
                    ? (language === 'fr' ? "Tous les avis" : "All Testimonials") 
                    : platform === 'google' 
                    ? (language === 'fr' ? "Guides Google" : "Google Guides") 
                    : platform === 'yelp' 
                    ? (language === 'fr' ? "Étoiles Yelp" : "Yelp Elite") 
                    : (language === 'fr' ? "Notre Livre d'Or" : "Direct Guest Board")}
                </button>
              ))}
            </div>

            {/* Testimonials Stream */}
            <div className="space-y-4 max-h-[64vh] overflow-y-auto pr-2 pb-4">
              {filteredReviews.length > 0 ? (
                filteredReviews.map((rev) => (
                  <div 
                    key={rev.id}
                    id={`review-item-${rev.id}`}
                    className="bg-[#121212]/40 p-6 rounded-none border border-white/5 shadow-sm relative hover:border-[#c5a47e]/20 transition-all duration-300 animate-in fade-in duration-300"
                  >
                    <div className="flex justify-between items-start mb-3 gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-serif text-base text-white font-light">{rev.author}</span>
                          
                          {/* Platform Source Badging */}
                          {(!rev.source || rev.source === 'direct') && (
                            <span className="text-[8px] font-sans font-bold tracking-wider uppercase bg-[#c5a47e]/10 text-[#c5a47e] border border-[#c5a47e]/25 px-2 py-0.5 rounded-none">
                              {language === 'fr' ? "Livre d'Or" : "Le Magellan Client"}
                            </span>
                          )}
                          {rev.source === 'google' && (
                            <span className="text-[8px] font-sans font-bold tracking-wider uppercase bg-blue-500/15 text-blue-400 border border-blue-500/25 px-2 py-0.5 rounded-none">
                              {language === 'fr' ? "Vérifié Google Maps" : "Google Maps Verified"}
                            </span>
                          )}
                          {rev.source === 'yelp' && (
                            <span className="text-[8px] font-sans font-bold tracking-wider uppercase bg-red-500/15 text-red-400 border border-red-500/25 px-2 py-0.5 rounded-none">
                              {language === 'fr' ? "Élite Yelp" : "Yelp Featured"}
                            </span>
                          )}
                        </div>
                        <span className="block font-sans text-[10px] tracking-wide uppercase text-white/40 mt-1">
                          {language === 'fr' ? (rev.role === 'Gourmet Patron' ? 'Critique Gourmet' : rev.role) : rev.role}
                        </span>
                      </div>
                      
                      {/* Stars count indicator */}
                      <div className="flex gap-0.5 shrink-0 bg-white/5 border border-white/5 rounded-none px-2 py-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-3 w-3 ${i < rev.rating ? 'text-[#c5a47e] fill-[#c5a47e]' : 'text-white/10'}`} 
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-white/70 text-xs font-light leading-relaxed mb-3">
                      "{getReviewComment(rev)}"
                    </p>

                    <div className="flex justify-between items-center text-[9px] font-sans uppercase tracking-wider">
                      <span className="text-white/30 truncate">
                        {rev.source === 'google' && (language === 'fr' ? '🗺 Source : Portail Google Review' : '🗺 Origin: Google Review Portal')}
                        {rev.source === 'yelp' && (language === 'fr' ? '♨ Source : Cercle Yelp Élite o' : '♨ Origin: Yelp Elite Circle')}
                        {(!rev.source || rev.source === 'direct') && (language === 'fr' ? '✦ Source : Registre d’Or de L\'Arôme' : '✦ Origin: Le Magellan Signature Ledger')}
                      </span>
                      <span className="text-white/30 shrink-0 text-right">
                        {language === 'fr' ? "Vérifié le" : "Verified"} {rev.date}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 border border-dashed border-white/5 bg-[#121212]/20 rounded-none text-white/40 text-xs">
                  <p className="font-serif italic text-white/60 mb-1">
                    {language === 'fr' ? "Aucun enregistrement" : "No reports listed"}
                  </p>
                  <p className="text-white/30 font-sans text-[11px]">
                    {language === 'fr' ? "Il n'y a actuellement aucun avis dans cette catégorie." : "There are no reviews from the selected category at this time."}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Add Review Sidebar Panel (5 Cols) */}
          <div className="lg:col-span-5 bg-[#121212]/40 border border-white/5 p-6 sm:p-8 rounded-none shadow-sm sticky top-24">
            <div className="pb-4 border-b border-white/5 mb-6">
              <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-[#c5a47e] font-bold block mb-1">
                {language === 'fr' ? "Votre Avis de Gourmet" : "Guest Feedback"}
              </span>
              <h3 className="font-serif text-xl font-light text-white leading-tight">
                {language === 'fr' ? "Inscrire mon Ressenti" : "Add Your Critique"}
              </h3>
            </div>

            {success && (
              <div className="p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-none font-sans text-xs flex items-center gap-2 mb-6">
                <CheckCircle className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
                {language === 'fr'
                  ? "Votre critique a été enregistrée de manière sécurisée ! Moyenne recalculée."
                  : "Your critique has been securely logged! Average rating recalculated."
                }
              </div>
            )}

            <form id="patron-review-form" onSubmit={handleSubmitReview} className="space-y-4">
              
              {/* Star choice */}
              <div>
                <label className="block font-sans text-[10px] uppercase tracking-wider text-white/40 mb-2 font-semibold font-bold">
                  {language === 'fr' ? "Note d'Évaluation Sensorielle" : "Savor Assessment Rating"}
                </label>
                <div className="flex items-center gap-1.5 bg-white/5 border border-white/5 rounded-none p-2 max-w-fit">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setFormRating(star)}
                      className="p-1 text-[#c5a47e] hover:scale-115 transition cursor-pointer"
                      title={`${star} Stars`}
                    >
                      <Star className={`h-5 w-5 ${star <= formRating ? 'text-[#c5a47e] fill-[#c5a47e]' : 'text-white/10'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Platform Option choosing block */}
              <div>
                <label className="block font-sans text-[10px] uppercase tracking-wider text-white/40 mb-2 font-semibold">
                  {language === 'fr' ? "Sélectionner la Plateforme Réceptrice" : "Select Submission Platform"}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['direct', 'google', 'yelp'] as const).map((platform) => (
                    <button
                      type="button"
                      key={platform}
                      onClick={() => setTargetPlatform(platform)}
                      className={`py-2 text-[9px] font-sans font-bold uppercase tracking-wider rounded-none text-center border transition-all duration-200 cursor-pointer ${
                        targetPlatform === platform
                          ? 'bg-[#c5a47e]/15 border-[#c5a47e] text-[#c5a47e]'
                          : 'bg-white/5 border-white/5 text-white/45 hover:bg-white/10'
                      }`}
                    >
                      {platform === 'direct' ? (language === 'fr' ? 'Livre d\'or' : 'Le Magellan') : platform === 'google' ? 'Google' : 'Yelp'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Author name input */}
              <div>
                <label className="block font-sans text-[10px] uppercase tracking-wider text-white/40 mb-1.5 font-semibold">
                  {language === 'fr' ? "Nom & Signature de l'Hôte" : "Diner Signature Name"}
                </label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder={language === 'fr' ? "Ex. Philippe d'Ornano" : "e.g., Charles Davenport"}
                  className="w-full bg-white/5 border border-white/5 text-white placeholder-white/30 rounded-none py-2.5 px-3 text-xs focus:outline-none focus:border-[#c5a47e] font-sans"
                />
              </div>

              {/* Title / Role select */}
              <div>
                <label className="block font-sans text-[10px] uppercase tracking-wider text-white/40 mb-1.5 font-semibold">
                  {language === 'fr' ? "Votre Qualité Gastronomique" : "Gastronomer Role"}
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder={language === 'fr' ? "Ex. Sommelier Amateur, Guide Local, Épicurien d'Osu" : "e.g., Food Blogger, Wine Connoisseur, Local Guide"}
                  className="w-full bg-white/5 border border-white/5 text-white placeholder-white/30 rounded-none py-2.5 px-3 text-xs focus:outline-none focus:border-[#c5a47e] font-sans"
                />
              </div>

              {/* Comments */}
              <div>
                <label className="block font-sans text-[10px] uppercase tracking-wider text-white/40 mb-1.5 font-semibold">
                  {language === 'fr' ? "Récit Ciselé de Votre Passage" : "Your Gastronomic Critique Narrative"}
                </label>
                <textarea
                  required
                  rows={4}
                  value={authorComment}
                  onChange={(e) => setAuthorComment(e.target.value)}
                  placeholder={language === 'fr' 
                    ? "Détaillez vos impressions sur les saveurs, l'équilibre des sauces, l'esprit du jardin et l'excellence du service..." 
                    : "Detail your feedback concerning flavor profiles, acoustic atmospheres, and wait assistance..."
                  }
                  className="w-full bg-white/5 border border-white/5 text-white placeholder-white/30 rounded-none py-2 px-3 text-xs focus:outline-none focus:border-[#c5a47e] resize-none font-sans"
                />
              </div>

              {/* Submit Review btn */}
              <button
                type="submit"
                id="review-submit-btn"
                className="w-full bg-[#c5a47e] hover:bg-[#b08d65] text-black font-sans text-xs font-bold uppercase tracking-[0.2em] py-4 rounded-none transition duration-300 cursor-pointer"
              >
                {language === 'fr' ? "Inscrire mon Avis au Registre d'Or" : "Log Dining Review"}
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
