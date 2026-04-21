import React, { useState, useEffect, useRef } from 'react';
import { 
  ChefHat, 
  Phone, 
  Instagram, 
  Clock, 
  MapPin, 
  UtensilsCrossed, 
  Flame,
  ArrowRight,
  Menu as MenuIcon,
  X,
  MessageCircle,
  Star,
  Quote
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { SpeedInsights } from "@vercel/speed-insights/react";

const MENU_CATEGORIES = {
  POULTRY: 'Chicken & Poultry',
  MEAT: 'Grills & Tagines',
  TRAYS: 'Oven Trays & Sides',
  RICE: 'Rice & Mahashi'
};

const MENU_DATA = {
  [MENU_CATEGORIES.POULTRY]: [
    { en: "Orange Duck", ar: "بط بالبرتقال", price: "700 - 1000 LE", tag: "Royal" },
    { en: "Stuffed Pigeon", ar: "حمام محشي", price: "400 LE", tag: "Royal" },
    { en: "Roasted Turkey", ar: "ديك رومي", price: "Start 1500 LE", tag: "Royal" },
    { en: "Smoked Turkey", ar: "تركي مدخن", price: "Per Kg", tag: "Royal" },
    { en: "Roasted Chicken Breast", ar: "صدور روستو", price: "400 LE" },
    { en: "Grilled Chicken (4 Flavors)", ar: "فراخ مشوية", price: "400 LE" },
    { en: "Chicken Tray", ar: "فراخ صينية", price: "450 LE" },
    { en: "Stuffed Chicken", ar: "فراخ محشية", price: "From 200 LE" },
    { en: "Chicken Kofta", ar: "كفتة فراخ", price: "400 LE" },
    { en: "Cordon Bleu", ar: "كوردن بلو", price: "450 LE" },
    { en: "Chicken Piccata", ar: "بيكاتا بالمشروم", price: "450 LE" },
    { en: "Pane Fried/Grilled", ar: "بانية", price: "400 LE" },
    { en: "Chicken Shawerma", ar: "شاورما فراخ", price: "400 LE" },
    { en: "Chicken Roll", ar: "تشيكن رول", price: "410 LE" },
  ],
  [MENU_CATEGORIES.MEAT]: [
    { en: "Grilled Kofta", ar: "كفتة مشوية", price: "750 LE", tag: "Grill" },
    { en: "Tarab", ar: "طرب", price: "750 LE", tag: "Grill" },
    { en: "Grilled Steak", ar: "ستيك مشوي", price: "750 LE", tag: "Grill" },
    { en: "Lamb Chops", ar: "ريش", price: "1000 LE", tag: "Grill" },
    { en: "Lamb Leg", ar: "فخذة ضاني", price: "Per Kg", tag: "Grill" },
    { en: "Cold Cuts Roast", ar: "لحمة باردة", price: "Per Kg", tag: "Grill" },
    { en: "Grilled Sausage", ar: "سجق مشوي", price: "600 LE", tag: "Grill" },
    { en: "Meat Onion Tagine", ar: "طاجن لحمة", price: "350 - 700 LE", tag: "Tagine" },
    { en: "Oxtail Tagine", ar: "طاجن عكاوي", price: "750 LE", tag: "Tagine" },
    { en: "Trotters", ar: "كوارع", price: "600 LE", tag: "Tagine" },
    { en: "Boeuf / Escalope", ar: "بوفيتك", price: "700 LE" },
    { en: "Meat Piccata", ar: "بيكاتا لحمة", price: "700 LE" },
    { en: "Liver Pane", ar: "كبدة بانيه", price: "680 LE" },
    { en: "Kofta Pane", ar: "كفتة بانيه", price: "670 LE" },
    { en: "Meat Shawerma", ar: "شاورما لحمة", price: "650 LE" },
    { en: "Rice Kofta", ar: "كفتة أرز", price: "350 LE" },
  ],
  [MENU_CATEGORIES.TRAYS]: [
    { en: "Roqaq (Meat & Ghee)", ar: "رقاق باللحمة", price: "450 LE" },
    { en: "Macarona Béchamel", ar: "مكرونة بشاميل", price: "450 LE" },
    { en: "Macarona Sausage", ar: "مكرونة بالسجق", price: "450 LE" },
    { en: "Lasagna", ar: "لازانيا", price: "450 LE" },
    { en: "Negresco (Chicken)", ar: "نجرسكو", price: "450 LE" },
    { en: "Cannelloni", ar: "كانيلوني", price: "450 LE" },
    { en: "Zucchini Béchamel", ar: "كوسة بالبشاميل", price: "400 LE" },
    { en: "Moussaka (Meat)", ar: "مسقعة باللحمة", price: "350 LE" },
    { en: "Potato Gratin Chicken", ar: "بطاطس جراتان", price: "400 LE" },
    { en: "Goulash Meat", ar: "جلاش لحمة", price: "400 LE" },
    { en: "Goulash Mix Cheese", ar: "جلاش مكس جبن", price: "350 LE" },
  ],
  [MENU_CATEGORIES.RICE]: [
    { en: "Vine Leaves / Cabbage", ar: "ورق عنب / كرنب", price: "200 LE", tag: "Mahashi" },
    { en: "Mombar", ar: "ممبار", price: "300 LE", tag: "Mahashi" },
    { en: "Sambousek", ar: "سمبوسك", price: "350 LE", tag: "Appetizer" },
    { en: "Kobeba", ar: "كبيبة شامي", price: "350 LE", tag: "Appetizer" },
    { en: "Fresh Salads", ar: "السلطات", price: "Start 50 LE", desc: "Green Salad, Tahina, Baba Ghanoush" },
    { en: "Fatta (Meat & Vinegar)", ar: "فتة لحمة", price: "500 LE", tag: "Special" },
    { en: "Rice w/ Nuts", ar: "أرز بالخلطة", price: "250 LE" },
    { en: "Basmati Rice", ar: "أرز بسمتي", price: "150 LE" },
    { en: "Meammar Rice (Cream)", ar: "أرز معمر", price: "170 LE" },
    { en: "Meammar (w/ Pigeon/Meat)", ar: "أرز معمر باللحم", price: "Ask Price" },
    { en: "Frik Tagine (Cream)", ar: "طاجن فريك", price: "180 LE" },
    { en: "Orzo Tagine (Liver/Meat)", ar: "طاجن لسان عصفور", price: "Ask Price" },
    { en: "Knuckles Soup", ar: "شوربة كوارع", price: "150 LE" },
    { en: "Orzo / Vermicelli Soup", ar: "شوربة لسان عصفور", price: "30 LE" },
  ]
};

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e) => {
      if (e.target.closest('button, a, .interactive')) setIsHovering(true);
      else setIsHovering(false);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <>
      <div 
        className="cursor-dot" 
        style={{ transform: `translate3d(${position.x - 4}px, ${position.y - 4}px, 0) scale(${isClicking ? 0.5 : 1})` }} 
      />
      <div 
        className="cursor-outline" 
        style={{ 
          transform: `translate3d(${position.x - 20}px, ${position.y - 20}px, 0) scale(${isHovering ? 1.5 : 1})`,
          opacity: isHovering ? 0.3 : 1
        }} 
      />
    </>
  );
};

const MagneticButton = ({ children, className, onClick }) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPos({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

const SpiceParticle = ({ delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ 
        opacity: [0, 0.2, 0],
        y: [-20, -100],
        x: [0, Math.random() * 40 - 20]
      }}
      transition={{ 
        duration: 4 + Math.random() * 4, 
        repeat: Infinity, 
        delay,
        ease: "linear"
      }}
      className="absolute w-1 h-1 bg-amber-900 rounded-full"
      style={{ 
        left: `${Math.random() * 100}%`,
        bottom: '0%'
      }}
    />
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState(MENU_CATEGORIES.POULTRY);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsApp = () => {
    window.open('https://wa.me/201060447418', '_blank');
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] font-sans selection:bg-amber-900 selection:text-white overflow-x-hidden">
      <CustomCursor />
      <div className="grain-overlay" />
      
      {/* Background Ornaments */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <SpiceParticle key={i} delay={i * 0.5} />
        ))}
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? 'py-4' : 'py-8'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className={`glass rounded-full px-8 py-3 flex justify-between items-center transition-all duration-700 ${
            scrolled ? 'shadow-2xl shadow-stone-900/5' : 'bg-transparent border-transparent'
          }`}>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="bg-amber-900 p-2 rounded-xl text-white">
                <ChefHat size={20} />
              </div>
              <div>
                <h1 className="font-serif font-black text-lg tracking-tight leading-none text-stone-900">HAIAM'S</h1>
                <p className="text-[9px] uppercase tracking-[0.4em] text-amber-700 font-bold -mt-0.5">Catering</p>
              </div>
            </motion.div>

            <div className="hidden md:flex gap-12 text-[10px] font-black tracking-[0.3em] text-stone-400 uppercase">
              {['story', 'menu', 'order'].map((item) => (
                <a 
                  key={item}
                  href={`#${item}`} 
                  className="hover:text-amber-900 transition-colors relative group py-2"
                >
                  {item}
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-900 origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-500"
                  />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <MagneticButton 
                onClick={handleWhatsApp}
                className="hidden sm:flex bg-amber-900 hover:bg-stone-900 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all items-center gap-2"
              >
                Inquiry <ArrowRight size={12} />
              </MagneticButton>
              <button 
                className="md:hidden text-stone-900 p-2"
                onClick={() => setIsMenuOpen(true)}
              >
                <MenuIcon size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Cinematic Reveal */}
      <section className="relative min-h-[110vh] flex items-center justify-center pt-20 px-6">
        <motion.div 
          style={{ scale, opacity }}
          className="max-w-7xl mx-auto w-full text-center relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block text-amber-900 font-bold tracking-[0.6em] uppercase text-[10px] mb-8">
              Shorouk's Finest Homemade
            </span>
            <h2 className="text-7xl md:text-[11rem] font-serif font-medium leading-[0.8] text-stone-900 mb-12 tracking-tighter">
              Authentic <br />
              <span className="italic font-normal text-amber-900/90 relative">
                Kitchen
                <motion.svg 
                  viewBox="0 0 300 20" 
                  className="absolute -bottom-4 left-0 w-full text-amber-900/20 pointer-events-none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 1 }}
                >
                  <motion.path d="M5,15 Q150,0 295,15" fill="none" stroke="currentColor" strokeWidth="4" />
                </motion.svg>
              </span>
            </h2>
            
            <div className="flex flex-col items-center gap-12 mt-20">
              <p className="text-stone-500 max-w-sm text-sm font-medium leading-relaxed tracking-wide">
                WE BELIEVE IN THE PATIENCE OF TRADITION. EVERY DISH IS A STORY OF FLAVOUR, TOLD THROUGH FRESH INGREDIENTS.
              </p>
              
              <div className="flex items-center gap-8">
                 <div className="w-px h-16 bg-stone-200" />
                 <a href="#menu" className="group text-stone-900 font-black text-[10px] uppercase tracking-[0.4em] flex flex-col items-center gap-4">
                    Scroll to Explore
                    <motion.div 
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-5 h-8 border-2 border-stone-200 rounded-full flex justify-center p-1"
                    >
                       <div className="w-1 h-1 bg-amber-900 rounded-full" />
                    </motion.div>
                 </a>
                 <div className="w-px h-16 bg-stone-200" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating elements */}
        <motion.div 
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 -left-20 w-80 h-80 bg-stone-100 rounded-full -z-10 blur-3xl opacity-50"
        />
        <motion.div 
          animate={{ 
            y: [0, 40, 0],
            rotate: [0, -10, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-amber-100 rounded-full -z-10 blur-3xl opacity-40"
        />
      </section>

      {/* Story Section - Editorial Layout */}
      <section id="story" className="py-40 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 relative">
               <motion.div 
                 initial={{ opacity: 0, x: -50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="aspect-[3/4] bg-stone-100 rounded-[3rem] overflow-hidden relative z-10 shadow-3xl"
               >
                  <div className="absolute inset-0 bg-stone-900/5 mix-blend-multiply" />
                  <div className="w-full h-full flex items-center justify-center opacity-10">
                    <ChefHat size={120} />
                  </div>
               </motion.div>
               <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 className="absolute -bottom-10 -right-10 w-48 h-48 bg-amber-900 rounded-[2rem] z-20 p-8 text-white flex flex-col justify-end"
               >
                  <Quote className="mb-4 opacity-50" />
                  <p className="text-xs font-bold leading-relaxed">Making home taste like home again.</p>
               </motion.div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7 space-y-12">
               <motion.div
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
               >
                 <span className="text-amber-900 font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">Our philosophy</span>
                 <h3 className="text-5xl md:text-6xl font-serif text-stone-900 leading-tight mb-8 italic">
                   "A kitchen where <br />time is the main <br />ingredient."
                 </h3>
                 <p className="text-stone-500 text-lg leading-relaxed font-light">
                   Chef Haiam believes that the secret to Egyptian cuisine isn't just the spice—it's the soul. For 2 years, we've focused on small-batch catering, ensuring every Mahashi, Tagine, and Roast is treated with the individual attention it deserves.
                 </p>
               </motion.div>

               <div className="grid grid-cols-2 gap-8 pt-8">
                  <div>
                    <h4 className="text-4xl font-serif text-amber-900 mb-2">100%</h4>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Fresh Guarantee</p>
                  </div>
                  <div>
                    <h4 className="text-4xl font-serif text-amber-900 mb-2">48h</h4>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Notice Period</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu - Minimalist Art Deco Grid */}
      <section id="menu" className="py-40 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-24">
            <span className="text-amber-900 font-bold tracking-[0.5em] uppercase text-[10px] mb-6">The Curator</span>
            <h3 className="text-6xl md:text-8xl font-serif text-stone-900 mb-12 italic">Catering List</h3>
            
            <div className="flex flex-wrap justify-center gap-8 border-b border-stone-200 pb-8 w-full">
              {Object.values(MENU_CATEGORIES).map(category => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 relative py-2 ${
                    activeTab === category ? 'text-amber-900' : 'text-stone-400 hover:text-stone-900'
                  }`}
                >
                  {category}
                  {activeTab === category && (
                    <motion.div layoutId="tab-underline" className="absolute -bottom-8 left-0 right-0 h-1 bg-amber-900" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-200 border border-stone-200 rounded-[3rem] overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              {MENU_DATA[activeTab].map((item, idx) => (
                <motion.div
                  key={`${activeTab}-${idx}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="bg-white p-12 hover:bg-stone-50 transition-colors group relative"
                >
                  <div className="flex flex-col h-full justify-between gap-12">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Star size={10} className="text-amber-900" />
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-amber-900/50">
                          {item.tag || 'Classic'}
                        </span>
                      </div>
                      <h4 className="text-2xl font-serif text-stone-900 mb-2">{item.en}</h4>
                      <p className="text-stone-400 font-bold text-xs tracking-widest mb-4 uppercase" dir="rtl">{item.ar}</p>
                      {item.desc && <p className="text-stone-400 text-xs font-medium leading-relaxed italic">{item.desc}</p>}
                    </div>
                    <div className="flex justify-between items-end border-t border-stone-100 pt-8">
                      <span className="text-stone-900 font-serif text-xl">{item.price}</span>
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-amber-900 group-hover:text-white transition-all"
                      >
                         <ArrowRight size={14} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Contact - The Black Label Experience */}
      <section id="order" className="py-40 bg-stone-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-7">
               <span className="text-amber-500 font-bold tracking-[0.5em] uppercase text-[10px] mb-8 block">Private Catering</span>
               <h3 className="text-6xl md:text-9xl font-serif leading-[0.9] tracking-tighter mb-12">
                 Reserved <br /><span className="italic text-amber-500">Only for You</span>
               </h3>
               
               <div className="flex flex-wrap gap-12 mt-20">
                  <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Location</p>
                    <p className="text-xl font-serif">Al Shorouk, Madinaty</p>
                  </div>
                  <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Response time</p>
                    <p className="text-xl font-serif">Under 60 Mins</p>
                  </div>
               </div>

               <MagneticButton 
                 onClick={handleWhatsApp}
                 className="mt-20 bg-white text-stone-950 px-12 py-8 rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] flex items-center gap-6 hover:bg-amber-500 transition-all active:scale-95"
               >
                 Open WhatsApp <MessageCircle size={24} />
               </MagneticButton>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
               <div className="dark-glass rounded-[3rem] p-12 space-y-12">
                  <h4 className="text-2xl font-serif italic text-amber-500">The 3 Pillars</h4>
                  <div className="space-y-10">
                    {[
                      { num: "01", title: "Absolute Freshness", desc: "Ingredients sourced daily for each specific order." },
                      { num: "02", title: "Slow Heritage", desc: "No shortcuts. No mass production. Just care." },
                      { num: "03", title: "Premium Cuts", desc: "Only the highest quality proteins and produce." }
                    ].map((item, i) => (
                      <div key={i} className="space-y-2 group">
                        <span className="text-xs font-black text-amber-500/40 group-hover:text-amber-500 transition-colors">{item.num}</span>
                        <h5 className="font-bold text-lg">{item.title}</h5>
                        <p className="text-white/40 text-xs font-medium leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-20 bg-[#faf8f5] border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-stone-900 rounded flex items-center justify-center text-white">
              <ChefHat size={16} />
            </div>
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-stone-900">Haiam's &copy; 2026</span>
          </div>
          
          <div className="flex gap-12 text-[9px] font-black uppercase tracking-[0.3em] text-stone-400">
            <a href="https://instagram.com/haiamcatering" className="hover:text-amber-900 transition-colors">Instagram</a>
            <a href="#" className="hover:text-amber-900 transition-colors">WhatsApp</a>
            <a href="#" className="hover:text-amber-900 transition-colors">Gallery</a>
          </div>

          <div className="text-[9px] font-black uppercase tracking-[0.3em] text-amber-900/40">
            Handcrafted with love
          </div>
        </div>
      </footer>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-stone-950 text-white p-12 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
               <span className="text-[10px] font-black tracking-[0.4em] uppercase opacity-40">Navigation</span>
               <button onClick={() => setIsMenuOpen(false)} className="p-4 bg-white/5 rounded-full"><X /></button>
            </div>
            <div className="flex flex-col gap-8">
              {['story', 'menu', 'order'].map((item, i) => (
                <motion.a 
                  key={item}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  href={`#${item}`} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-6xl font-serif italic hover:text-amber-500 transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </div>
            <div className="pt-12 border-t border-white/5">
              <p className="text-xs font-bold text-white/40 mb-4 uppercase tracking-[0.2em]">Contact Us</p>
              <p className="text-2xl font-serif">+20 106 044 7418</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SpeedInsights />
    </div>
  );
}