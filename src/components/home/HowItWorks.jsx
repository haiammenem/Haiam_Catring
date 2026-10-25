import React from "react";
import { MessageCircle, Truck, UtensilsCrossed } from "lucide-react";
import { motion as Motion, useReducedMotion } from "framer-motion";

const STEPS = [
  {
    icon: UtensilsCrossed,
    title: "Choose your dishes",
    desc: "Browse our homemade menu and add what you love to your order.",
  },
  {
    icon: MessageCircle,
    title: "Order on WhatsApp",
    desc: "Review your cart, add delivery notes, and send us a quick message.",
  },
  {
    icon: Truck,
    title: "Enjoy at home",
    desc: "We cook fresh and deliver warm, ready for your table.",
  },
];

export default function HowItWorks() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="py-20 md:py-28 px-5 bg-sand/40">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 space-y-3">
          <span className="text-terracotta font-semibold tracking-[0.18em] uppercase text-xs">
            Simple as home
          </span>
          <h3 className="font-serif text-4xl md:text-5xl text-ink">
            How it works
          </h3>
          <p className="text-muted max-w-md mx-auto">
            Three easy steps from craving to your door.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-6">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <Motion.div
                key={step.title}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative text-center md:text-left bg-cream rounded-3xl p-8 soft-shadow"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-terracotta/10 text-terracotta mb-5">
                  <Icon size={26} strokeWidth={1.75} />
                </div>
                <span className="absolute top-6 right-6 font-serif text-4xl text-sand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="font-serif text-2xl text-ink mb-2">
                  {step.title}
                </h4>
                <p className="text-muted text-[15px] leading-relaxed">
                  {step.desc}
                </p>
              </Motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
