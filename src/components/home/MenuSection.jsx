import React from "react";
import { Loader2, UtensilsCrossed } from "lucide-react";
import { AnimatePresence, motion as Motion, useReducedMotion } from "framer-motion";
import MenuItemCard from "./MenuItemCard";

function MenuSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="bg-cream rounded-3xl overflow-hidden border border-ink/5 animate-pulse"
        >
          <div className="aspect-[4/3] bg-sand" />
          <div className="p-6 space-y-3">
            <div className="h-6 bg-sand rounded-lg w-2/3" />
            <div className="h-5 bg-sand rounded-lg w-1/2 ml-auto" />
            <div className="h-4 bg-sand rounded-lg w-full" />
            <div className="h-10 bg-sand rounded-full w-24 ml-auto mt-4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function MenuSection({
  categories,
  activeTab,
  onTabChange,
  items,
  loading,
  cart,
  onAddToCart,
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section id="menu" className="py-20 md:py-28 bg-sand/30">
      <div className="max-w-6xl mx-auto px-5">
        <Motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 space-y-3"
        >
          <span className="text-terracotta font-semibold tracking-[0.18em] uppercase text-xs">
            From our kitchen
          </span>
          <h3 className="font-serif text-4xl md:text-6xl text-ink">
            Today&apos;s homemade menu
          </h3>
          <p className="text-muted max-w-lg mx-auto">
            Pick your favorites ? we&apos;ll cook them fresh for your order.
          </p>
        </Motion.div>

        <div className="sticky top-[4.5rem] z-30 -mx-5 px-5 py-3 mb-10 bg-cream/90 backdrop-blur-md border-y border-ink/5">
          <div className="flex flex-nowrap overflow-x-auto no-scrollbar gap-2 max-w-6xl mx-auto">
            {categories.map((category) => {
              const isActive = activeTab === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => onTabChange(category.id)}
                  className={`shrink-0 whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-terracotta text-cream"
                      : "bg-cream text-muted hover:text-ink border border-ink/10"
                  }`}
                >
                  {category.name_en}
                </button>
              );
            })}
          </div>
        </div>

        {loading ? (
          <MenuSkeleton />
        ) : items.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center bg-cream rounded-3xl border border-ink/5">
            <div className="w-14 h-14 rounded-2xl bg-sand flex items-center justify-center text-muted mb-4">
              <UtensilsCrossed size={28} />
            </div>
            <p className="font-serif text-2xl text-ink mb-2">
              No dishes in this category yet
            </p>
            <p className="text-muted text-sm">
              Try another category or check back soon.
            </p>
          </div>
        ) : (
          <Motion.div
            layout={!reduceMotion}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {items.map((item, idx) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  idx={idx}
                  onAddToCart={onAddToCart}
                  cartItem={cart.find((i) => i.id === item.id)}
                />
              ))}
            </AnimatePresence>
          </Motion.div>
        )}

        {loading && (
          <div className="sr-only" aria-live="polite">
            <Loader2 className="animate-spin" /> Loading menu
          </div>
        )}
      </div>
    </section>
  );
}
