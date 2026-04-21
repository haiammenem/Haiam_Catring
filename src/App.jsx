import React, { useState, useEffect } from 'react';
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
  MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const stagger = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.1 }
};

export default function App() {
  const [activeTab, setActiveTab] = useState(MENU_CATEGORIES.POULTRY);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsApp = () => {
    window.open('https://wa.me/201060447418', '_blank');
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] font-sans selection:bg-amber-900 selection:text-white">
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/80 backdrop-blur-xl py-3 shadow-sm' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="bg-amber-900 p-2 rounded-xl text-white">
              <ChefHat size={24} />
            </div>
            <div>
              <h1 className="font-serif font-black text-xl tracking-tight leading-none text-stone-900">HAIAM'S</h1>
              <p className="text-[10px] uppercase tracking-[0.3em] text-amber-700 font-bold">Catering</p>
            </div>
          </motion.div>

          <div className="hidden md:flex gap-10 text-sm font-bold tracking-widest text-stone-500 uppercase">
            {['story', 'menu', 'order'].map((item) => (
              <a 
                key={item}
                href={`#${item}`} 
                className="hover:text-amber-900 transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-900 transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={handleWhatsApp}
              className="hidden sm:flex bg-amber-900 hover:bg-black text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all items-center gap-2 shadow-xl shadow-amber-900/10 active:scale-95"
            >
              Order Now <ArrowRight size={14} />
            </button>
            <button 
              className="md:hidden text-stone-900 p-2"
              onClick={() => setIsMenuOpen(true)}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-amber-900 text-white p-8 flex flex-col justify-center items-center text-center gap-8"
          >
            <button 
              className="absolute top-8 right-8 p-2 hover:bg-white/10 rounded-full"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={32} />
            </button>
            <div className="flex flex-col gap-6 text-4xl font-serif italic">
              {['story', 'menu', 'order'].map((item) => (
                <a 
                  key={item}
                  href={`#${item}`} 
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-amber-200 transition-colors"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              ))}
            </div>
            <button 
              onClick={handleWhatsApp}
              className="mt-8 bg-white text-amber-900 px-12 py-4 rounded-full font-bold uppercase tracking-widest"
            >
              Connect
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-stone-100 -z-10 hidden lg:block" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-amber-200/50 rounded-full blur-[100px]" 
        />
        
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              Handcrafted in Cairo
            </div>
            <h2 className="text-6xl md:text-8xl font-serif font-medium leading-[0.9] text-stone-900 mb-8 tracking-tighter">
              The Art of <br />
              <span className="italic font-normal text-amber-900">Slow Cooking</span>
            </h2>
            <p className="text-lg md:text-xl text-stone-500 max-w-lg mb-12 font-light leading-relaxed">
              Experience authentic Egyptian flavours prepared with the patience and soul of a traditional home kitchen.
            </p>
            <div className="flex flex-wrap gap-6">
              <a href="#menu" className="bg-stone-900 text-white px-10 py-5 rounded-2xl font-bold transition-all hover:bg-amber-900 hover:-translate-y-1 shadow-2xl shadow-stone-900/20 active:scale-95">
                Explore The Menu
              </a>
              <button onClick={handleWhatsApp} className="group flex items-center gap-4 text-stone-900 font-bold hover:text-amber-900 transition-colors">
                <span className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-amber-50 group-hover:border-amber-200 transition-all">
                  <MessageCircle size={20} />
                </span>
                Chat with Chef
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-stone-200 rounded-[2.5rem] overflow-hidden shadow-3xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-10 text-white">
                 <h4 className="font-serif text-3xl mb-2 italic">Duck with Orange</h4>
                 <p className="text-sm opacity-80 font-light tracking-wide uppercase">Signature Royal Dish</p>
              </div>
              <div className="w-full h-full bg-stone-800 flex items-center justify-center">
                 <UtensilsCrossed className="w-32 h-32 text-white opacity-5" />
              </div>
            </div>
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl hidden md:block border border-stone-100"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-900">
                  <Clock />
                </div>
                <div>
                  <p className="text-xs uppercase font-black tracking-widest text-stone-400">Preparation</p>
                  <p className="font-bold text-stone-900">48h Advance Notice</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Story Section - Minimal & High End */}
      <section id="story" className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div 
            {...fadeInUp}
            className="text-center mb-24"
          >
            <span className="text-amber-900 font-bold tracking-[0.4em] uppercase text-xs mb-6 block">Our Legacy</span>
            <h3 className="text-4xl md:text-5xl font-serif text-stone-900 max-w-2xl mx-auto leading-tight italic">
              "We cook with the same passion we use to feed our own family."
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeInUp} className="space-y-8">
              <p className="text-xl text-stone-600 font-light leading-relaxed">
                For two years, Haiam's Catering has stood as a beacon of authentic Egyptian home-style cooking in Al Shorouk. We don't just provide meals; we deliver a piece of Egyptian culture.
              </p>
              <p className="text-lg text-stone-500 leading-relaxed italic border-l-4 border-amber-900/20 pl-6">
                Every spice is hand-picked, every cut of meat is premium, and every recipe is a secret passed down through generations.
              </p>
              <div className="pt-8">
                 <div className="flex items-center gap-4">
                   <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center">
                     <ChefHat className="text-amber-900" size={32} />
                   </div>
                   <div>
                     <p className="font-serif text-2xl font-bold">Chef Haiam Kamal</p>
                     <p className="text-stone-400 font-bold uppercase tracking-widest text-[10px]">Founder & Executive Chef</p>
                   </div>
                 </div>
              </div>
            </motion.div>
            <motion.div 
              {...fadeInUp}
              className="grid grid-cols-2 gap-6"
            >
              <div className="aspect-square bg-stone-100 rounded-3xl overflow-hidden mt-12 shadow-lg"></div>
              <div className="aspect-square bg-amber-900/5 rounded-3xl overflow-hidden shadow-lg border border-amber-900/10 flex items-center justify-center">
                <Instagram className="text-amber-900 opacity-20" size={64} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menu Section - Dynamic Tabs */}
      <section id="menu" className="py-32 bg-[#faf8f5] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <motion.div {...fadeInUp} className="max-w-xl">
              <span className="text-amber-900 font-bold tracking-[0.4em] uppercase text-xs mb-4 block">The Selection</span>
              <h3 className="text-5xl md:text-6xl font-serif text-stone-900 tracking-tighter">Our Seasonal Menu</h3>
            </motion.div>
            
            <motion.div 
              {...fadeInUp}
              className="flex flex-wrap gap-2"
            >
              {Object.values(MENU_CATEGORIES).map(category => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`px-8 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all duration-500 border-2 ${
                    activeTab === category 
                      ? 'bg-amber-900 border-amber-900 text-white shadow-xl shadow-amber-900/20' 
                      : 'bg-white border-stone-200 text-stone-500 hover:border-amber-900 hover:text-amber-900'
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          </div>

          <motion.div 
            layout
            className="grid lg:grid-cols-2 gap-6"
          >
            <AnimatePresence mode="wait">
              {MENU_DATA[activeTab].map((item, idx) => (
                <motion.div
                  key={`${activeTab}-${idx}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="bg-white p-8 rounded-[2rem] border border-stone-100 hover:border-amber-200 hover:shadow-2xl transition-all group flex flex-col justify-center relative overflow-hidden"
                >
                  <div className="flex justify-between items-start gap-6 relative z-10">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h4 className="font-serif text-2xl text-stone-900 group-hover:text-amber-900 transition-colors">{item.en}</h4>
                        {item.tag && (
                          <span className="px-3 py-1 bg-amber-50 text-amber-900 text-[10px] uppercase tracking-wider font-black rounded-full border border-amber-900/10">
                            {item.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-stone-400 font-bold text-sm tracking-wide mb-3" dir="rtl">{item.ar}</p>
                      {item.desc && <p className="text-stone-500 text-sm font-light leading-relaxed">{item.desc}</p>}
                    </div>
                    <div className="text-right">
                      <span className="font-serif text-xl text-stone-900 bg-stone-50 px-4 py-2 rounded-xl group-hover:bg-amber-900 group-hover:text-white transition-all whitespace-nowrap">
                        {item.price}
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-900/5 rounded-full -mr-16 -mt-16 scale-0 group-hover:scale-100 transition-transform duration-700" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Order & Contact Section */}
      <section id="order" className="py-32 bg-stone-900 text-white relative overflow-hidden">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-96 h-96 border border-white/5 rounded-full"
        />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            
            <motion.div {...fadeInUp}>
              <span className="text-amber-500 font-bold tracking-[0.4em] uppercase text-xs mb-6 block">Order Process</span>
              <h3 className="text-5xl md:text-7xl font-serif mb-12 tracking-tighter">Ready for a <br/><span className="italic text-amber-500">Masterpiece?</span></h3>
              <p className="text-stone-400 text-xl font-light leading-relaxed mb-12">
                We orchestrate every order with surgical precision to ensure the experience is flawless.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                   <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-amber-500 border border-white/10">
                      <MapPin />
                   </div>
                   <div>
                      <p className="font-bold text-lg">Delivery Coverage</p>
                      <p className="text-stone-400">Exclusively serving Al Shorouk City & Madinaty.</p>
                   </div>
                </div>

                <button 
                  onClick={handleWhatsApp}
                  className="w-full sm:w-auto bg-[#25D366] hover:bg-white hover:text-[#25D366] text-white px-10 py-6 rounded-3xl font-black text-lg transition-all shadow-2xl flex items-center justify-center gap-4 active:scale-95"
                >
                  <MessageCircle size={28} /> 
                  WhatsApp Order
                </button>
              </div>
            </motion.div>

            <motion.div 
              {...fadeInUp}
              className="bg-white/5 backdrop-blur-3xl rounded-[3rem] p-12 border border-white/10"
            >
              <h4 className="font-serif text-3xl font-medium mb-10 text-amber-500 italic">House Rules</h4>
              
              <div className="space-y-10">
                {[
                  { icon: <Flame />, title: "Freshness", desc: "Never frozen, never pre-made. Only cooked for you." },
                  { icon: <Clock />, title: "The 48h Rule", desc: "Good things take time. Minimum notice is mandatory." },
                  { icon: <UtensilsCrossed />, title: "Themed Events", desc: "For parties, let us know 1 week in advance." }
                ].map((rule, index) => (
                  <div key={index} className="flex gap-6 group">
                    <div className="mt-1 text-amber-500 group-hover:scale-125 transition-transform duration-500">{rule.icon}</div>
                    <div>
                      <h5 className="font-bold text-xl mb-1">{rule.title}</h5>
                      <p className="text-stone-400 text-sm leading-relaxed">{rule.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 py-24 text-stone-500 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 items-center gap-16 mb-16">
            <div className="flex flex-col items-center md:items-start gap-6">
              <div className="flex items-center gap-3 text-white">
                <ChefHat className="text-amber-500" size={32} />
                <span className="font-serif font-black text-3xl tracking-tighter uppercase">Haiam's</span>
              </div>
              <p className="text-sm font-light max-w-xs text-center md:text-left leading-relaxed">
                Elevating the tradition of Egyptian home cooking to a premium catering experience.
              </p>
            </div>
            
            <div className="flex justify-center gap-12">
               <a href="https://instagram.com/haiamcatering" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full border border-white/5 flex items-center justify-center hover:bg-amber-900 hover:text-white transition-all">
                  <Instagram size={20} />
               </a>
               <a href="https://wa.me/201060447418" className="w-14 h-14 rounded-full border border-white/5 flex items-center justify-center hover:bg-amber-900 hover:text-white transition-all">
                  <Phone size={20} />
               </a>
            </div>

            <div className="text-center md:text-right">
              <p className="text-xs font-black uppercase tracking-[0.4em] mb-4 text-white">Contact</p>
              <p className="text-stone-300 font-serif text-xl">+20 106 044 7418</p>
              <p className="text-stone-500 text-sm mt-2 font-light">Available 9am - 9pm</p>
            </div>
          </div>
          
          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em]">
            <span>&copy; {new Date().getFullYear()} Haiam's Catering</span>
            <div className="flex gap-8">
               <span className="text-white">Authentic</span>
               <span>Fresh</span>
               <span className="text-white">Homemade</span>
            </div>
            <span className="opacity-50 italic font-serif tracking-normal lowercase text-xs">made with love in Al Shorouk</span>
          </div>
        </div>
      </footer>
      <SpeedInsights />
    </div>
  );
}