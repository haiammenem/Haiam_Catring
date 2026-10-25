import { formatPortion } from "./supabase";

export const WHATSAPP_NUMBER = "201042866559";
export const WHATSAPP_DISPLAY = "+20 104 286 6559";
export const INSTAGRAM_URL = "https://instagram.com/haiamcatering";

export function parsePrice(price) {
  if (typeof price === "number") return price;
  return parseInt(String(price).replace(/[^0-9]/g, ""), 10) || 0;
}

export function getCartTotals(cart = []) {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => {
    return sum + parsePrice(item.price) * item.quantity;
  }, 0);
  return { totalItems, totalPrice };
}

export function buildWhatsAppMessage(cart = [], notes = "") {
  if (cart.length === 0) {
    return "Hello! I am interested in your catering services.";
  }

  let message = "Hello! I'd like to place an order:\n";
  let totalPrice = 0;

  cart.forEach((item, index) => {
    const portion = formatPortion(item);
    const priceValue = parsePrice(item.price);
    const subtotal = priceValue * item.quantity;
    totalPrice += subtotal;

    message += `${index + 1}. *${item.en}* (${item.ar})${portion ? ` [${portion}]` : ""} x${item.quantity} = ${subtotal} LE\n`;
  });

  message += `\n------------------\n`;
  message += `Total pieces: ${cart.reduce((sum, item) => sum + item.quantity, 0)}\n`;
  message += `Total price: *${totalPrice}EGP*`;

  const trimmedNotes = notes?.trim();
  if (trimmedNotes) {
    message += `\n\nNotes:\n${trimmedNotes}`;
  }

  return message;
}

export function handleWhatsApp(cart = [], notes = "") {
  const message = buildWhatsAppMessage(cart, notes);
  const encodedMessage = encodeURIComponent(message);
  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`,
    "_blank",
  );
}

export function getWhatsAppUrl(cart = [], notes = "") {
  const message = buildWhatsAppMessage(cart, notes);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
