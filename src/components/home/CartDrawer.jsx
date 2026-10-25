import React, { useEffect, useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { AnimatePresence, motion as Motion, useReducedMotion } from "framer-motion";
import { formatPortion } from "../../lib/supabase";
import { getCartTotals, handleWhatsApp, parsePrice } from "../../lib/order";

export default function CartDrawer({
  open,
  onClose,
  cart,
  onAddToCart,
  onRemoveItem,
}) {
  const reduceMotion = useReducedMotion();
  const [notes, setNotes] = useState("");
  const { totalItems, totalPrice } = getCartTotals(cart);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const handleSend = () => {
    handleWhatsApp(cart, notes);
    setNotes("");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <Motion.button
            type="button"
            aria-label="Close cart"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[95] bg-ink/40 backdrop-blur-[2px]"
          />

          <Motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-drawer-title"
            initial={reduceMotion ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 24 }}
            transition={{ type: "spring", stiffness: 340, damping: 34 }}
            className="fixed z-[96] bg-cream flex flex-col soft-shadow
              inset-x-0 bottom-0 max-h-[92vh] rounded-t-[2rem]
              md:inset-y-0 md:right-0 md:left-auto md:bottom-auto md:max-h-none md:h-full md:w-full md:max-w-md md:rounded-none md:rounded-l-[1.5rem]"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-ink/10 shrink-0">
              <div>
                <h2
                  id="cart-drawer-title"
                  className="font-serif text-2xl text-ink"
                >
                  Your order
                </h2>
                <p className="text-sm text-muted">
                  {totalItems === 0
                    ? "Cart is empty"
                    : `${totalItems} item${totalItems === 1 ? "" : "s"}`}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2.5 rounded-full hover:bg-sand transition-colors"
                aria-label="Close"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {cart.length === 0 ? (
                <div className="py-16 flex flex-col items-center text-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-sand flex items-center justify-center text-muted">
                    <ShoppingBag size={28} />
                  </div>
                  <p className="font-serif text-xl text-ink">Nothing here yet</p>
                  <p className="text-sm text-muted max-w-[220px]">
                    Add dishes from the menu, then send your order on WhatsApp.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-2 text-sm font-bold text-terracotta hover:underline"
                  >
                    Browse menu
                  </button>
                </div>
              ) : (
                cart.map((item) => {
                  const portion = formatPortion(item);
                  return (
                    <div
                      key={item.id}
                      className="flex gap-3 bg-sand/50 rounded-2xl p-3"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-sand shrink-0">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-terracotta/10" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-2">
                          <h3 className="font-semibold text-ink truncate">
                            {item.en}
                          </h3>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item)}
                            className="text-muted hover:text-terracotta p-0.5 shrink-0"
                            aria-label={`Remove ${item.en}`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        {portion && (
                          <p className="text-xs text-muted">{portion}</p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2 bg-cream rounded-full px-2 py-1 border border-ink/10">
                            <button
                              type="button"
                              onClick={() => onAddToCart(item, -1)}
                              className="p-1 hover:text-terracotta"
                              aria-label="Decrease"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-sm font-bold w-5 text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onAddToCart(item, 1)}
                              className="p-1 hover:text-terracotta"
                              aria-label="Increase"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <p className="font-serif text-lg text-terracotta">
                            {parsePrice(item.price) * item.quantity} EGP
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}

              {cart.length > 0 && (
                <label className="block space-y-2 pt-2">
                  <span className="text-sm font-semibold text-ink">
                    Delivery notes{" "}
                    <span className="font-normal text-muted">(optional)</span>
                  </span>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Date, address, occasion?"
                    className="w-full rounded-2xl border border-ink/15 bg-cream px-4 py-3 text-sm text-ink placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-terracotta/30 resize-none"
                  />
                </label>
              )}
            </div>

            {cart.length > 0 && (
              <div className="shrink-0 border-t border-ink/10 px-5 py-4 space-y-3 bg-cream pb-[max(1rem,env(safe-area-inset-bottom))]">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-semibold text-muted">Total</span>
                  <span className="font-serif text-2xl text-ink">
                    {totalPrice} EGP
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleSend}
                  className="w-full bg-[#25D366] hover:bg-[#1ebe57] text-white py-4 rounded-2xl font-bold text-sm transition-colors"
                >
                  Send order on WhatsApp
                </button>
              </div>
            )}
          </Motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
