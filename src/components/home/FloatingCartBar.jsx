import React from "react";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { AnimatePresence, motion as Motion, useReducedMotion } from "framer-motion";

export default function FloatingCartBar({
  visible,
  totalItems,
  totalPrice,
  onOpen,
}) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {visible && (
        <Motion.div
          initial={reduceMotion ? false : { y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduceMotion ? undefined : { y: 80, opacity: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] w-full max-w-md px-5"
        >
          <button
            type="button"
            onClick={onOpen}
            className="w-full bg-ink text-cream py-4 rounded-2xl soft-shadow flex items-center justify-between px-6 hover:bg-terracotta transition-colors active:scale-[0.98] group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cream/10 rounded-xl flex items-center justify-center relative">
                <ShoppingCart size={18} />
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-terracotta rounded-full text-[10px] font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              </div>
              <div className="text-left">
                <p className="text-[11px] font-semibold uppercase tracking-wide opacity-60">
                  Your order
                </p>
                <p className="font-serif text-lg leading-tight">
                  {totalPrice} EGP
                </p>
              </div>
            </div>
            <span className="flex items-center gap-2 text-sm font-bold">
              Review
              <ArrowRight
                size={16}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </span>
          </button>
        </Motion.div>
      )}
    </AnimatePresence>
  );
}
