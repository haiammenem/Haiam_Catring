import React from "react";
import { ChefHat, Minus, Plus } from "lucide-react";
import { motion as Motion, useReducedMotion } from "framer-motion";
import { formatPortion } from "../../lib/supabase";

export default function MenuItemCard({ item, idx, onAddToCart, cartItem }) {
  const reduceMotion = useReducedMotion();
  const quantity = cartItem ? cartItem.quantity : 0;
  const portion = formatPortion(item);
  const isRoyal = item.tag === "Royal";

  return (
    <Motion.article
      layout={!reduceMotion}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4, delay: Math.min(idx * 0.04, 0.24) }}
      className="bg-cream rounded-3xl overflow-hidden soft-shadow flex flex-col border border-ink/5"
    >
      <div className="relative aspect-[4/3] bg-sand overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={item.en}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-terracotta/40 gap-2">
            <ChefHat size={40} strokeWidth={1.25} />
            <span className="text-xs font-semibold uppercase tracking-wide">
              Homemade
            </span>
          </div>
        )}

        {item.tag && (
          <span
            className={`absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wide px-3 py-1 rounded-full ${
              isRoyal
                ? "bg-terracotta text-cream"
                : "bg-cream/95 text-ink soft-shadow"
            }`}
          >
            {item.tag}
          </span>
        )}
      </div>

      <div className="flex flex-col flex-grow p-5 sm:p-6 gap-4">
        <div className="space-y-2">
          <div className="flex justify-between items-start gap-3">
            <h4 className="font-serif text-2xl text-ink leading-snug">
              {item.en}
            </h4>
            <div className="shrink-0 text-right">
              <p className="font-serif text-xl text-terracotta whitespace-nowrap">
                {item.price}{" "}
                <span className="text-sm font-sans font-semibold">EGP</span>
              </p>
              {portion && (
                <p className="text-xs text-muted mt-0.5">/ {portion}</p>
              )}
            </div>
          </div>

          <p
            className="font-arabic text-2xl text-ink/75 leading-tight text-right"
            dir="rtl"
          >
            {item.ar}
          </p>

          {item.description && (
            <p className="text-sm text-muted leading-relaxed line-clamp-2">
              {item.description}
            </p>
          )}
        </div>

        <div className="mt-auto pt-4 border-t border-sand flex justify-end">
          {quantity > 0 ? (
            <div className="flex items-center gap-4 bg-ink text-cream px-4 py-2.5 rounded-full">
              <button
                type="button"
                onClick={() => onAddToCart(item, -1)}
                className="hover:text-terracotta transition-colors p-0.5"
                aria-label={`Decrease ${item.en}`}
              >
                <Minus size={16} />
              </button>
              <span className="text-sm font-bold min-w-[1.25rem] text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => onAddToCart(item, 1)}
                className="hover:text-terracotta transition-colors p-0.5"
                aria-label={`Increase ${item.en}`}
              >
                <Plus size={16} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onAddToCart(item, 1)}
              className="inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta-dark text-cream px-5 py-2.5 rounded-full text-sm font-bold transition-colors"
            >
              <Plus size={16} /> Add
            </button>
          )}
        </div>
      </div>
    </Motion.article>
  );
}
