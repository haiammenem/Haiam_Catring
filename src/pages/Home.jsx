import React, { useEffect, useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { supabase } from "../lib/supabase";
import { getCartTotals } from "../lib/order";
import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import HowItWorks from "../components/home/HowItWorks";
import Story from "../components/home/Story";
import MenuSection from "../components/home/MenuSection";
import Testimonials from "../components/home/Testimonials";
import OrderSection from "../components/home/OrderSection";
import Footer from "../components/home/Footer";
import CartDrawer from "../components/home/CartDrawer";
import FloatingCartBar from "../components/home/FloatingCartBar";

export default function Home() {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

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

    fetchData();
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const handleRemoveItem = (item) => {
    setCart((prev) => prev.filter((i) => i.id !== item.id));
  };

  const openCart = () => {
    setIsMenuOpen(false);
    setIsCartOpen(true);
  };

  const { totalItems: cartTotalItems, totalPrice: cartTotalPrice } =
    getCartTotals(cart);

  const filteredItems = menuItems.filter(
    (item) => item.category_id === activeTab && item.is_active !== false,
  );

  return (
    <div className="min-h-screen bg-cream font-sans selection:bg-terracotta selection:text-cream overflow-x-hidden">
      <div className="grain-overlay" />

      <Navbar
        scrolled={scrolled}
        cartCount={cartTotalItems}
        isMenuOpen={isMenuOpen}
        onOpenMenu={() => setIsMenuOpen(true)}
        onCloseMenu={() => setIsMenuOpen(false)}
        onOpenCart={openCart}
      />

      <Hero />
      <HowItWorks />
      <Story />

      <MenuSection
        categories={categories}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        items={filteredItems}
        loading={loading}
        cart={cart}
        onAddToCart={handleAddToCart}
      />

      <Testimonials />

      <OrderSection
        cart={cart}
        cartTotalItems={cartTotalItems}
        onOpenCart={openCart}
      />

      <Footer />

      <CartDrawer
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onAddToCart={handleAddToCart}
        onRemoveItem={handleRemoveItem}
      />

      <FloatingCartBar
        visible={cart.length > 0 && !isCartOpen}
        totalItems={cartTotalItems}
        totalPrice={cartTotalPrice}
        onOpen={openCart}
      />

      <SpeedInsights />
    </div>
  );
}
