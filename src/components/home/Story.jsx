import React from "react";
import { Quote } from "lucide-react";
import { motion as Motion, useReducedMotion } from "framer-motion";

export default function Story() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="story" className="py-20 md:py-28 px-5 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 relative">
            <Motion.div
              initial={reduceMotion ? false : { opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="aspect-[3/4] bg-sand rounded-[2rem] overflow-hidden relative soft-shadow"
            >
              <img
                src="/homeiamge.png"
                alt="Chef Haiam in the kitchen"
                className="w-full h-full object-cover"
              />
            </Motion.div>

            <Motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="absolute -bottom-5 -right-2 sm:-right-5 max-w-[220px] bg-terracotta rounded-3xl z-10 p-6 text-cream soft-shadow"
            >
              <Quote className="mb-3 opacity-60" size={20} />
              <p className="text-base font-medium leading-snug italic">
                Making home taste like home again.
              </p>
            </Motion.div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 space-y-8 pt-8 lg:pt-0">
            <Motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <span className="text-terracotta font-semibold tracking-[0.18em] uppercase text-xs mb-4 block">
                Our kitchen
              </span>
              <h3 className="font-serif text-4xl md:text-5xl text-ink leading-tight mb-6">
                A kitchen where time is the main ingredient
              </h3>
              <p className="text-muted text-lg leading-relaxed">
                Chef Haiam believes the secret to Egyptian cuisine isn&apos;t
                just the spice ? it&apos;s the soul. For years we&apos;ve focused
                on small-batch catering, ensuring every dish is treated with
                individual attention.
              </p>
            </Motion.div>

            <div className="flex flex-wrap gap-3">
              <div className="bg-sand rounded-2xl px-6 py-5 min-w-[140px]">
                <h4 className="text-3xl font-serif text-terracotta mb-1">
                  100%
                </h4>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Fresh guarantee
                </p>
              </div>
              <div className="bg-sand rounded-2xl px-6 py-5 min-w-[140px]">
                <h4 className="text-3xl font-serif text-terracotta mb-1">48h</h4>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Notice period
                </p>
              </div>
              <div className="bg-sand rounded-2xl px-6 py-5 min-w-[140px]">
                <h4 className="text-3xl font-serif text-olive mb-1">Daily</h4>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Home cooking
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
