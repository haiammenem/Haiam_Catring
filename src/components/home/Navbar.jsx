import React from "react";
import { ChefHat, Menu as MenuIcon, ShoppingCart, X } from "lucide-react";
import { AnimatePresence, motion as Motion, useReducedMotion } from "framer-motion";
import { WHATSAPP_DISPLAY } from "../../lib/order";

const NAV_LINKS = [
  { id: "story", label: "Our Story" },
  { id: "menu", label: "Menu" },
  { id: "order", label: "Order" },
];

export default function Navbar({
  scrolled,
  cartCount,
  isMenuOpen,
  onOpenMenu,
  onCloseMenu,
  onOpenCart,
}) {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5">
          <div
            className={`glass rounded-full px-5 sm:px-7 py-3 flex justify-between items-center transition-shadow duration-500 ${
              scrolled ? "soft-shadow" : ""
            }`}
          >
            <a href="#" className="flex items-center gap-3 min-w-0">
              <div className="bg-terracotta p-2 rounded-xl text-cream shrink-0">
                <ChefHat size={20} />
              </div>
              <div className="min-w-0">
                <h1 className="font-serif font-bold text-lg tracking-tight leading-none text-ink">
                  Haiam&apos;s
                </h1>
                <p className="text-[11px] uppercase tracking-[0.22em] text-terracotta font-semibold mt-0.5">
                  Homemade Catering
                </p>
              </div>
            </a>

            <div className="hidden md:flex gap-8 text-[13px] font-semibold tracking-wide text-muted">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="hover:text-terracotta transition-colors py-1"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={onOpenCart}
                className="relative p-2.5 rounded-full text-ink hover:bg-sand transition-colors"
                aria-label="Open cart"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-terracotta text-cream text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                className="md:hidden text-ink p-2"
                onClick={onOpenMenu}
                aria-label="Open menu"
              >
                <MenuIcon size={22} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <Motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-ink text-cream p-8 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-cream/50">
                Menu
              </span>
              <button
                type="button"
                onClick={onCloseMenu}
                className="p-3 bg-white/10 rounded-full"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {NAV_LINKS.map((item, i) => (
                <Motion.a
                  key={item.id}
                  initial={reduceMotion ? false : { x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.08 }}
                  href={`#${item.id}`}
                  onClick={onCloseMenu}
                  className="text-5xl font-serif italic hover:text-terracotta transition-colors"
                >
                  {item.label}
                </Motion.a>
              ))}
            </div>

            <div className="pt-8 border-t border-white/10 space-y-2">
              <p className="text-xs font-semibold text-cream/50 uppercase tracking-[0.15em]">
                WhatsApp
              </p>
              <p className="text-2xl font-serif">{WHATSAPP_DISPLAY}</p>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
