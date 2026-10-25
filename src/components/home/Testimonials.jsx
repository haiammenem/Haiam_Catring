import React from "react";
import { Star } from "lucide-react";
import { motion as Motion, useReducedMotion } from "framer-motion";

const REVIEWS = [
  {
    name: "Nour A.",
    area: "Madinaty",
    text: "The molokhia tasted exactly like my mother's. Ordered for a family dinner and everything arrived warm and beautiful.",
  },
  {
    name: "Karim H.",
    area: "Al Shorouk",
    text: "We used Haiam's for a small gathering. Fresh, generous portions, and ordering on WhatsApp was so easy.",
  },
  {
    name: "Sara M.",
    area: "Madinaty",
    text: "Finally homemade catering that feels personal. The stuffed vine leaves were incredible ? already booked again.",
  },
];

export default function Testimonials() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="py-20 md:py-28 px-5 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 space-y-3">
          <span className="text-olive font-semibold tracking-[0.18em] uppercase text-xs">
            From our tables
          </span>
          <h3 className="font-serif text-4xl md:text-5xl text-ink">
            What families say
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map((review, i) => (
            <Motion.blockquote
              key={review.name}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="bg-sand/60 rounded-3xl p-7 flex flex-col gap-5"
            >
              <div className="flex gap-1 text-terracotta" aria-label="5 stars">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-ink/85 leading-relaxed flex-grow italic">
                &ldquo;{review.text}&rdquo;
              </p>
              <footer className="pt-4 border-t border-ink/10">
                <cite className="not-italic font-semibold text-ink">
                  {review.name}
                </cite>
                <p className="text-sm text-muted mt-0.5">{review.area}</p>
              </footer>
            </Motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
