import React from "react";
import { ChefHat } from "lucide-react";
import {
  getWhatsAppUrl,
  INSTAGRAM_URL,
  WHATSAPP_DISPLAY,
} from "../../lib/order";

export default function Footer() {
  return (
    <footer className="py-16 md:py-20 bg-cream border-t border-ink/10">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-11 h-11 bg-ink rounded-xl flex items-center justify-center text-cream">
              <ChefHat size={20} />
            </div>
            <div>
              <p className="font-serif text-xl text-ink">Haiam&apos;s Catering</p>
              <p className="text-sm text-muted mt-0.5">
                Homemade Egyptian food ? {WHATSAPP_DISPLAY}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm font-semibold text-muted">
            <a
              href="#menu"
              className="hover:text-terracotta transition-colors"
            >
              Menu
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-terracotta transition-colors"
            >
              Instagram
            </a>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-terracotta transition-colors"
            >
              WhatsApp
            </a>
          </div>

          <p className="text-sm text-muted italic">
            ? {new Date().getFullYear()} ? Handcrafted with love
          </p>
        </div>
      </div>
    </footer>
  );
}
