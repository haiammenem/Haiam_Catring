import React, { useState, useEffect, useRef } from "react";
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
  Zap,
  Loader2,
  ShoppingCart,
  Minus,
  Plus,
  Quote,
  MessageCircle,
  Star,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { supabase, formatPortion } from "../lib/supabase";

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
        x: [0, Math.random() * 40 - 20],
      }}
      transition={{
        duration: 4 + Math.random() * 4,
        repeat: Infinity,
        delay,
        ease: "linear",
      }}
      className="absolute w-1 h-1 bg-amber-900 rounded-full"
      style={{
        left: `${Math.random() * 100}%`,
        bottom: "0%",
      }}
    />
  );
};

const handleWhatsApp = (cart = []) => {
  const phoneNumber = "201060447418";
  let message = "";

  if (cart.length > 0) {
    message = "مرحبا! اريد طلب:\n";
    let totalPrice = 0;

    cart.forEach((item, index) => {
      const portion = formatPortion(item);
      const priceValue = parseInt(item.price.replace(/[^0-9]/g, "")) || 0;
      const subtotal = priceValue * item.quantity;
      totalPrice += subtotal;

      message += `${index + 1}. *${item.en}* (${item.ar})${portion ? ` [${portion}]` : ""} x${item.quantity} = ${subtotal} LE\n`;
    });

    message += `\n------------------\n`;
    message += `اجمالي عدد القطع: ${cart.reduce((sum, item) => sum + item.quantity, 0)}\n`;
    message += `اجمالي الطلب: *${totalPrice} EGP*`;
  } else {
    message = "Hello! I am interested in your catering services.";
  }

  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
};

const MenuItem = ({ item, idx, onAddToCart, cartItem }) => {
  const isRoyal = item.tag === "Royal";
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, delay: idx * 0.03, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white p-6 md:p-8 group relative overflow-hidden transition-all duration-700 hover:z-10 flex flex-col"
    >
      <div className="absolute inset-0 bg-stone-50/50 -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-[0.16,1,0.3,1]" />

      <span className="absolute -top-4 -right-4 text-9xl font-serif text-stone-100/50 pointer-events-none group-hover:text-amber-900/5 transition-colors duration-700 select-none">
        {(idx + 1).toString().padStart(2, "0")}
      </span>

      {item.image && (
        <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl z-10">
          <motion.img
            src={item.image}
            alt={item.en}
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentElement.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>
      )}

      <div className="relative z-10 flex flex-col flex-grow justify-between gap-10">
        <div className="space-y-8">
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    isRoyal
                      ? "bg-amber-500 scale-125"
                      : "bg-stone-300 group-hover:bg-amber-900"
                  }`}
                />
                <span
                  className={`text-[10px] font-black uppercase tracking-[0.4em] transition-colors ${
                    isRoyal
                      ? "text-amber-600"
                      : "text-stone-400 group-hover:text-stone-900"
                  }`}
                >
                  {item.tag || "Selection"}
                </span>
              </div>
              <h4 className="text-3xl md:text-4xl font-serif text-stone-900 leading-tight transition-transform duration-500 group-hover:translate-x-1">
                {item.en}
              </h4>
            </div>

            <div className="flex flex-col items-end shrink-0">
              <span className="font-serif text-2xl text-amber-900 group-hover:scale-110 transition-transform duration-500 origin-right">
                {item.price}{" "}
                {item.portion_type && (
                  <span className="text-sm">/ {formatPortion(item)}</span>
                )}
              </span>
              <div className="h-px w-6 bg-stone-200 mt-2 group-hover:w-full transition-all duration-700" />
            </div>
          </div>

          <div className="space-y-4">
            <p
              className="text-stone-800 font-arabic text-4xl md:text-5xl leading-tight text-right transition-all duration-700 group-hover:text-amber-950"
              dir="rtl"
            >
              {item.ar}
            </p>

            {item.description && (
              <p className="text-stone-400 text-sm font-medium leading-relaxed italic max-w-xs border-l-2 border-stone-100 pl-4 py-1">
                {item.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center pt-8 border-t border-stone-50 opacity-40 group-hover:opacity-100 transition-all duration-500">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-stone-50 rounded-lg group-hover:bg-amber-50 transition-colors">
              <Zap
                size={12}
                className={
                  isRoyal
                    ? "text-amber-500"
                    : "text-stone-300 group-hover:text-amber-600"
                }
              />
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest text-stone-400 group-hover:text-stone-600">
              Premium Choice
            </span>
          </div>

          <div className="flex items-center gap-4">
            {quantity > 0 ? (
              <div className="flex items-center gap-4 bg-stone-900 text-white px-4 py-2 rounded-full shadow-lg">
                <button
                  onClick={() => onAddToCart(item, -1)}
                  className="hover:text-amber-500 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="text-xs font-black min-w-[12px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => onAddToCart(item, 1)}
                  className="hover:text-amber-500 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            ) : (
              <MagneticButton
                onClick={() => onAddToCart(item, 1)}
                className="p-3 bg-stone-900 group-hover:bg-amber-900 rounded-full text-white shadow-lg transition-colors overflow-hidden relative"
              >
                <motion.div whileHover={{ x: 30 }} className="relative z-10">
                  <Plus size={16} />
                </motion.div>
              </MagneticButton>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    fetchData();
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function fetchData() {
    setLoading(true);

    // Fetch categories
    const { data: catData, error: catError } = await supabase
      .from("categories")
      .select("*")
      .order("order", { ascending: true });

    if (catError) {
      console.error("Error fetching categories:", catError);
    } else {
      setCategories(catData || []);
      if (catData && catData.length > 0) {
        setActiveTab(catData[0].id);
      }
    }

    // Fetch menu items
    const { data: itemData, error: itemError } = await supabase
      .from("menu_items")
      .select("*");

    if (itemError) {
      console.error("Error fetching items:", itemError);
    } else {
      setMenuItems(itemData || []);
    }

    setLoading(false);
  }

  const handleAddToCart = (item, delta) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === item.id);
      if (existing) {
        const newQuantity = existing.quantity + delta;
        if (newQuantity <= 0) {
          return prevCart.filter((i) => i.id !== item.id);
        }
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: newQuantity } : i,
        );
      }
      if (delta > 0) {
        return [...prevCart, { ...item, quantity: 1 }];
      }
      return prevCart;
    });
  };

  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotalPrice = cart.reduce((sum, item) => {
    const priceValue = parseInt(item.price.replace(/[^0-9]/g, "")) || 0;
    return sum + priceValue * item.quantity;
  }, 0);

  const filteredItems = menuItems.filter(
    (item) => item.category_id === activeTab,
  );

  return (
    <div className="min-h-screen bg-[#faf8f5] font-sans selection:bg-amber-900 selection:text-white overflow-x-hidden">
      <div className="grain-overlay" />

      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <SpiceParticle key={i} delay={i * 0.5} />
        ))}
      </div>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? "py-4" : "py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div
            className={`glass rounded-full px-8 py-3.5 flex justify-between items-center transition-all duration-700 ${
              scrolled
                ? "shadow-xl shadow-stone-900/5"
                : "bg-transparent border-transparent"
            }`}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="bg-amber-900 p-2 rounded-xl text-white">
                <ChefHat size={22} />
              </div>
              <div>
                <h1 className="font-serif font-black text-xl tracking-tight leading-none text-stone-900 uppercase">
                  HAIAM'S
                </h1>
                <p className="text-[9px] uppercase tracking-[0.4em] text-amber-700 font-bold -mt-0.5">
                  Catering
                </p>
              </div>
            </motion.div>

            <div className="hidden md:flex gap-10 text-[10px] font-black tracking-[0.3em] text-stone-400 uppercase">
              {["story", "menu", "order"].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className="hover:text-amber-900 transition-colors relative group py-2"
                >
                  {item}
                  <motion.span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-900 origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-500" />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <MagneticButton
                onClick={handleWhatsApp}
                className="hidden sm:flex bg-amber-900 hover:bg-stone-900 text-white px-7 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all items-center gap-2"
              >
                Inquiry <ArrowRight size={13} />
              </MagneticButton>
              <button
                className="md:hidden text-stone-900 p-2"
                onClick={() => setIsMenuOpen(true)}
              >
                <MenuIcon size={22} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative min-h-[100vh] flex items-center justify-center pt-20 px-6 text-center">
        <motion.div
          style={{ scale, opacity }}
          className="max-w-7xl mx-auto w-full relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block text-amber-900 font-bold tracking-[0.5em] uppercase text-[10px] mb-6">
              Shorouk's Finest Homemade
            </span>
            <h2 className="text-7xl md:text-[10rem] font-serif font-medium leading-[0.85] text-stone-900 mb-10 tracking-tighter">
              Authentic <br />
              <span className="italic font-normal text-amber-900/90 relative">
                Kitchen
                <motion.svg
                  viewBox="0 0 300 20"
                  className="absolute -bottom-4 left-0 w-full text-amber-900/20 pointer-events-none"
                  initial={{ pathLength: 0 }}
                  animatePath={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 1 }}
                >
                  <motion.path
                    d="M5,15 Q150,0 295,15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                </motion.svg>
              </span>
            </h2>

            <div className="flex flex-col items-center gap-10 mt-16">
              <p className="text-stone-500 max-w-sm text-base font-medium leading-relaxed tracking-wide uppercase">
                WE BELIEVE IN THE PATIENCE OF TRADITION. EVERY DISH IS A STORY
                OF FLAVOUR.
              </p>

              <div className="flex items-center gap-10">
                <div className="w-px h-20 bg-stone-200" />
                <a
                  href="#menu"
                  className="group text-stone-900 font-black text-[10px] uppercase tracking-[0.3em] flex flex-col items-center gap-4"
                >
                  Scroll to Explore
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-5 h-9 border-2 border-stone-200 rounded-full flex justify-center p-1"
                  >
                    <div className="w-1 h-1 bg-amber-900 rounded-full" />
                  </motion.div>
                </a>
                <div className="w-px h-20 bg-stone-200" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Story Section */}
      <section id="story" className="py-32 md:py-44 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="aspect-[3/4] bg-stone-100 rounded-[3rem] overflow-hidden relative z-10 shadow-2xl"
              >
                <div className="absolute inset-0 bg-stone-900/5 mix-blend-multiply" />
                <div className="w-full h-full flex items-center justify-center opacity-10">
                  <ChefHat size={140} />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="absolute -bottom-8 -right-8 w-56 h-56 bg-amber-900 rounded-[2.5rem] z-20 p-8 text-white flex flex-col justify-end shadow-xl"
              >
                <Quote className="mb-4 opacity-50" size={32} />
                <p className="text-lg font-bold leading-relaxed italic">
                  Making home taste like home again.
                </p>
              </motion.div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7 space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-amber-900 font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">
                  Our philosophy
                </span>
                <h3 className="text-5xl md:text-7xl font-serif text-stone-900 leading-tight mb-8 italic">
                  "A kitchen where <br />
                  time is the main <br />
                  ingredient."
                </h3>
                <p className="text-stone-500 text-xl leading-relaxed font-light">
                  Chef Haiam believes that the secret to Egyptian cuisine isn't
                  just the spice—it's the soul. For 2 years, we've focused on
                  small-batch catering, ensuring every dish is treated with
                  individual attention.
                </p>
              </motion.div>

              <div className="grid grid-cols-2 gap-10 pt-6">
                <div>
                  <h4 className="text-5xl font-serif text-amber-900 mb-2">
                    100%
                  </h4>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">
                    Fresh Guarantee
                  </p>
                </div>
                <div>
                  <h4 className="text-5xl font-serif text-amber-900 mb-2">
                    48h
                  </h4>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">
                    Notice Period
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Menu Section */}
      <section
        id="menu"
        className="py-32 md:py-44 bg-[#faf8f5] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <span className="text-amber-900 font-bold tracking-[0.5em] uppercase text-[10px] mb-6 block">
                The Private Selection
              </span>
              <h3 className="text-6xl md:text-9xl font-serif text-stone-900 tracking-tighter leading-none italic">
                The Sommelier List
              </h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-nowrap overflow-x-auto no-scrollbar gap-4 md:gap-8 border-b border-stone-200 pb-1 w-full"
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-500 relative py-3 shrink-0 whitespace-nowrap ${
                    activeTab === category.id
                      ? "text-amber-900"
                      : "text-stone-400 hover:text-stone-900"
                  }`}
                >
                  {category.name_en}
                  {activeTab === category.id && (
                    <motion.div
                      layoutId="tab-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-900"
                    />
                  )}
                </button>
              ))}
            </motion.div>
          </div>

          <motion.div
            layout
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-3 md:grid-cols-2 bg-stone-100 gap-px border border-stone-200 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[3rem] overflow-hidden"
          >
            {loading ? (
              <div className="col-span-full py-20 flex flex-col items-center justify-center bg-white">
                <Loader2 className="w-8 h-8 animate-spin text-amber-900 mb-4" />
                <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">
                  Loading Menu...
                </p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {filteredItems.map((item, idx) => (
                  <MenuItem
                    key={item.id}
                    item={item}
                    idx={idx}
                    onAddToCart={handleAddToCart}
                    cartItem={cart.find((i) => i.id === item.id)}
                  />
                ))}
              </AnimatePresence>
            )}
          </motion.div>
        </div>
      </section>

      <section
        id="order"
        className="py-32 md:py-44 bg-stone-950 text-white relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-7">
              <span className="text-amber-500 font-bold tracking-[0.5em] uppercase text-[10px] mb-8 block">
                Private Catering
              </span>
              <h3 className="text-6xl md:text-[8rem] font-serif leading-[0.9] tracking-tighter mb-12 italic">
                Reserved <br />
                <span className="text-amber-500 not-italic">Only for You</span>
              </h3>

              <div className="flex flex-wrap gap-16 mt-20">
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
                    Location
                  </p>
                  <p className="text-2xl font-serif">Al Shorouk, Madinaty</p>
                </div>
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
                    Response time
                  </p>
                  <p className="text-2xl font-serif">Under 60 Mins</p>
                </div>
              </div>

              <motion.button
                onClick={() => handleWhatsApp(cart)}
                className="mt-20 bg-green-600 text-white px-12 py-8 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] flex items-center gap-6 hover:bg-amber-500 transition-all active:scale-95 shadow-2xl shadow-white/5"
              >
                {cart.length > 0
                  ? `Order ${cartTotalItems} Items`
                  : "Inquiry on WhatsApp"}{" "}
                <MessageCircle size={28} />
              </motion.button>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <div className="dark-glass rounded-[3rem] p-12 space-y-12">
                <h4 className="text-3xl font-serif italic text-amber-500">
                  The 3 Pillars
                </h4>
                <div className="space-y-12">
                  {[
                    {
                      num: "01",
                      title: "Absolute Freshness",
                      desc: "Ingredients sourced daily for each specific order.",
                    },
                    {
                      num: "02",
                      title: "Slow Heritage",
                      desc: "No shortcuts. No mass production. Just care.",
                    },
                    {
                      num: "03",
                      title: "Premium Cuts",
                      desc: "Only the highest quality proteins and produce.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="space-y-3 group">
                      <span className="text-xs font-black text-amber-500/40 group-hover:text-amber-500 transition-colors tracking-widest">
                        {item.num}
                      </span>
                      <h5 className="font-bold text-xl tracking-wide">
                        {item.title}
                      </h5>
                      <p className="text-white/40 text-base font-medium leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-24 bg-[#faf8f5] border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-stone-900 rounded-xl flex items-center justify-center text-white">
              <ChefHat size={20} />
            </div>
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-stone-900">
              Haiam's &copy; 2026
            </span>
          </div>

          <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">
            <a
              href="https://instagram.com/haiamcatering"
              className="hover:text-amber-900 transition-colors"
            >
              Instagram
            </a>
            <a href="#" className="hover:text-amber-900 transition-colors">
              WhatsApp
            </a>
            <a href="#" className="hover:text-amber-900 transition-colors">
              Gallery
            </a>
          </div>

          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-900/40 italic">
            Handcrafted with love
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-stone-950 text-white p-12 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black tracking-[0.4em] uppercase opacity-40">
                Navigation
              </span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-4 bg-white/5 rounded-full"
              >
                <X size={28} />
              </button>
            </div>
            <div className="flex flex-col gap-8">
              {["story", "menu", "order"].map((item, i) => (
                <motion.a
                  key={item}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  href={`#${item}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-6xl font-serif italic hover:text-amber-500 transition-colors uppercase tracking-tighter"
                >
                  {item}
                </motion.a>
              ))}
            </div>
            <div className="pt-12 border-t border-white/5">
              <p className="text-[10px] font-bold text-white/40 mb-4 uppercase tracking-[0.2em]">
                Contact Us
              </p>
              <p className="text-3xl font-serif">+20 106 044 7418</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SpeedInsights />

      {/* Floating Cart Button */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[90] w-full max-w-md px-6"
          >
            <button
              onClick={() => handleWhatsApp(cart)}
              className="w-full bg-amber-900 text-white py-6 rounded-[2rem] shadow-2xl shadow-amber-900/20 flex items-center justify-between px-10 hover:bg-stone-900 transition-all active:scale-95 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center relative">
                  <ShoppingCart size={20} />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full text-[8px] font-black flex items-center justify-center text-stone-900">
                    {cartTotalItems}
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60">
                    Total Order
                  </p>
                  <p className="text-xl font-serif italic">
                    {cartTotalPrice} LE
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Get Order
                </span>
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
