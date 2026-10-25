import React from "react";
import { ArrowRight, Clock, Leaf, MessageCircle } from "lucide-react";
import { motion as Motion, useReducedMotion } from "framer-motion";
import { handleWhatsApp } from "../../lib/order";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[100svh] flex items-center pt-28 pb-16 px-5 overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 20%, #f3e8d6 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(194,65,12,0.08) 0%, transparent 50%), #fbf6ee",
        }}
      />

      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <Motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center lg:text-left space-y-7"
        >
          <span className="inline-block text-olive font-semibold tracking-[0.18em] uppercase text-xs">
            Al Shorouk &amp; Madinaty
          </span>

          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl text-ink leading-[1.05] tracking-tight">
          Authentic
          Kitchen,{" "}
            <span className="italic text-terracotta">made with love</span>
          </h2>
          <p className="text-muted text-base sm:text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
            Fresh dishes prepared in small batches for your table? the flavor
            of home, delivered with care.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
            <a
              href="#menu"
              className="inline-flex items-center justify-center gap-2 bg-terracotta hover:bg-terracotta-dark text-cream px-7 py-3.5 rounded-full text-sm font-bold transition-colors w-full sm:w-auto"
            >
              Browse Menu <ArrowRight size={16} />
            </a>
            <button
              type="button"
              onClick={() => handleWhatsApp()}
              className="inline-flex items-center justify-center gap-2 border-2 border-ink/15 hover:border-olive text-ink px-7 py-3.5 rounded-full text-sm font-bold transition-colors w-full sm:w-auto"
            >
              <MessageCircle size={16} className="text-olive" />
              Order on WhatsApp
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4 text-sm text-muted">
            <span className="inline-flex items-center gap-2 bg-sand/80 px-3.5 py-2 rounded-full">
              <Leaf size={14} className="text-olive" /> Cooked fresh daily
            </span>
            <span className="inline-flex items-center gap-2 bg-sand/80 px-3.5 py-2 rounded-full">
              <Clock size={14} className="text-terracotta" /> 48h pre-order
            </span>
          </div>
        </Motion.div>

        <Motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-lg mx-auto w-full"
        >
          <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden soft-shadow bg-sand relative">
            <img
              src="/homeiamge.png"
              alt="Haiam's homemade catering dishes"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
          </div>

          <div className="absolute -bottom-4 -left-2 sm:left-4 bg-cream recipe-border rounded-2xl px-4 py-3 soft-shadow">
            <p className="text-xs font-semibold text-olive uppercase tracking-wide">
              Small-batch
            </p>
            <p className="font-serif text-lg text-ink">Homemade with care</p>
          </div>

          <div className="absolute top-6 -right-2 sm:right-2 bg-terracotta text-cream rounded-2xl px-4 py-3 soft-shadow">
            <p className="text-xs font-semibold uppercase tracking-wide opacity-80">
              Since
            </p>
            <p className="font-serif text-xl">Chef Haiam</p>
          </div>
        </Motion.div>
      </div>
    </section>
  );
}
