import React from "react";
import {
  Clock,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { motion as Motion, useReducedMotion } from "framer-motion";
import { handleWhatsApp } from "../../lib/order";


export default function OrderSection({ cart, cartTotalItems, onOpenCart }) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="order"
      className="py-20 md:py-28 px-5 relative overflow-hidden bg-terracotta"
    >
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, #fbf6ee 0%, transparent 40%), radial-gradient(circle at 80% 70%, #9a3412 0%, transparent 45%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <Motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 text-cream space-y-8"
          >
            <span className="text-cream/70 font-semibold tracking-[0.18em] uppercase text-xs">
              Ready when you are
            </span>
            <h3 className="font-serif text-4xl md:text-6xl leading-tight">
              Order homemade catering for your next gathering
            </h3>
            <p className="text-cream/80 text-lg max-w-lg leading-relaxed">
              Tell us what you need ? we cook fresh and deliver across Al
              Shorouk and Madinaty.
            </p>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="mt-0.5 shrink-0 opacity-80" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-cream/60">
                    Location
                  </p>
                  <p className="font-serif text-xl">Al Shorouk, Madinaty</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={20} className="mt-0.5 shrink-0 opacity-80" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-cream/60">
                    Response
                  </p>
                  <p className="font-serif text-xl">Under 60 mins</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  if (cart.length > 0) {
                    onOpenCart();
                  } else {
                    handleWhatsApp();
                  }
                }}
                className="inline-flex items-center justify-center gap-3 bg-cream text-terracotta hover:bg-sand px-8 py-4 rounded-full font-bold text-sm transition-colors"
              >
                {cart.length > 0
                  ? `Review order (${cartTotalItems})`
                  : "Chat on WhatsApp"}
                <MessageCircle size={20} />
              </button>
              {cart.length === 0 && (
                <a
                  href="#menu"
                  className="inline-flex items-center justify-center gap-2 border-2 border-cream/40 hover:border-cream text-cream px-8 py-4 rounded-full font-bold text-sm transition-colors"
                >
                  Browse menu first
                </a>
              )}
            </div>
          </Motion.div>

        </div>
      </div>
    </section>
  );
}
