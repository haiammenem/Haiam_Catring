/**
 * HAIAM'S CATERING - MENU CONFIGURATION
 * ---------------------------------------
 * Use this file to add, remove, or update menu items.
 * 
 * Each item supports:
 * - en: English Name
 * - ar: Arabic Name
 * - price: Price string (e.g., "400 LE" or "Ask Price")
 * - tag: (Optional) Special label (e.g., "Royal", "Grill", "Special")
 * - desc: (Optional) Short description
 */

export const MENU_CATEGORIES = {
  POULTRY: 'Chicken & Poultry',
  MEAT: 'Grills & Tagines',
  TRAYS: 'Oven Trays & Sides',
  RICE: 'Rice & Mahashi',
  Fish: 'Fish & Seafood',
};

export const MENU_DATA = {
  [MENU_CATEGORIES.POULTRY]: [
    { en: "Orange Duck", ar: "بط بالبرتقال", price: "700 - 1000 LE", tag: "Royal", image: "/menu/orange-duck.jpg" },
    { en: "Stuffed Pigeon", ar: "حمام محشي", price: "400 LE", tag: "Royal" },
    { en: "Roasted Turkey", ar: "ديك رومي", price: "Start 1500 LE", tag: "Royal" },
    { en: "Smoked Turkey", ar: "تركي مدخن", price: "Per Kg", tag: "Royal" , desc: "Smoked turkey, perfect for sandwiches and platters" },
    { en: "Roasted Chicken Breast", ar: "صدور روستو", price: "400 LE" },
    { en: "Grilled Chicken (4 Flavors)", ar: "فراخ مشوية", price: "400 LE" },
    { en: "Chicken Tray", ar: "فراخ صينية", price: "450 LE" },
    { en: "Stuffed Chicken", ar: "فراخ محشية", price: "From 200 LE" },
    { en: "Chicken Kofta", ar: "كفتة فراخ", price: "400 LE" },
    { en: "Cordon Bleu", ar: "كوردن بلو", price: "450 LE" },
    { en: "Chicken Piccata", ar: "بيكاتا بالمشروم", price: "450 LE" },
    { en: "Pane Fried/Grilled", ar: "بانية", price: "400 LE" },
    { en: "Chicken Shawerma", ar: "شاورما فراخ", price: "400 LE" },
    { en: "Chicken Roll", ar: "تشيكن رول", price: "410 LE" },
  ],
  [MENU_CATEGORIES.MEAT]: [
    { en: "Grilled Kofta", ar: "كفتة مشوية", price: "750 LE", tag: "Grill", image: "/menu/kofta.jpg" },
    { en: "Tarab", ar: "طرب", price: "750 LE", tag: "Grill" },
    { en: "Grilled Steak", ar: "ستيك مشوي", price: "750 LE", tag: "Grill" },
    { en: "Lamb Chops", ar: "ريش", price: "1000 LE", tag: "Grill" },
    { en: "Lamb Leg", ar: "فخذة ضاني", price: "Per Kg", tag: "Grill" },
    { en: "Cold Cuts Roast", ar: "لحمة باردة", price: "Per Kg", tag: "Grill" },
    { en: "Grilled Sausage", ar: "سجق مشوي", price: "600 LE", tag: "Grill" },
    { en: "Meat Onion Tagine", ar: "طاجن لحمة", price: "350 - 700 LE", tag: "Tagine" },
    { en: "Oxtail Tagine", ar: "طاجن عكاوي", price: "750 LE", tag: "Tagine" },
    { en: "Trotters", ar: "كوارع", price: "600 LE", tag: "Tagine" },
    { en: "Boeuf / Escalope", ar: "بوفيتك", price: "700 LE" },
    { en: "Meat Piccata", ar: "بيكاتا لحمة", price: "700 LE" },
    { en: "Liver Pane", ar: "كبدة بانيه", price: "680 LE" },
    { en: "Kofta Pane", ar: "كفتة بانيه", price: "670 LE" },
    { en: "Meat Shawerma", ar: "شاورما لحمة", price: "650 LE" },
    { en: "Rice Kofta", ar: "كفتة أرز", price: "350 LE" },
  ],
  [MENU_CATEGORIES.TRAYS]: [
    { en: "Roqaq (Meat & Ghee)", ar: "رقاق باللحمة", price: "450 LE" },
    { en: "Macarona Béchamel", ar: "مكرونة بشاميل", price: "450 LE", image: "/menu/macarona.jpg" },
    { en: "Macarona Sausage", ar: "مكرونة بالسجق", price: "450 LE" },
    { en: "Lasagna", ar: "لازانيا", price: "450 LE" },
    { en: "Negresco (Chicken)", ar: "نجرسكو", price: "450 LE" },
    { en: "Cannelloni", ar: "كانيلوني", price: "450 LE" },
    { en: "Zucchini Béchamel", ar: "كوسة بالبشاميل", price: "400 LE" },
    { en: "Moussaka (Meat)", ar: "مسقعة باللحمة", price: "350 LE" },
    { en: "Potato Gratin Chicken", ar: "بطاطس جراتان", price: "400 LE" },
    { en: "Goulash Meat", ar: "جلاش لحمة", price: "400 LE" },
    { en: "Goulash Mix Cheese", ar: "جلاش مكس جبن", price: "350 LE" },
  ],
  [MENU_CATEGORIES.RICE]: [
    { en: "Vine Leaves / Cabbage", ar: "ورق عنب / كرنب", price: "200 LE", tag: "Mahashi" },
    { en: "Mombar", ar: "ممبار", price: "300 LE", tag: "Mahashi" },
    { en: "Sambousek", ar: "سمبوسك", price: "350 LE", tag: "Appetizer" },
    { en: "Kobeba", ar: "كبيبة شامي", price: "350 LE", tag: "Appetizer" },
    { en: "Fresh Salads", ar: "السلطات", price: "Start 50 LE", desc: "Green Salad, Tahina, Baba Ghanoush" },
    { en: "Fatta (Meat & Vinegar)", ar: "فتة لحمة", price: "500 LE", tag: "Special" },
    { en: "Rice w/ Nuts", ar: "أرز بالخلطة", price: "250 LE" },
    { en: "Basmati Rice", ar: "أرز بسمتي", price: "150 LE", image: "/menu/rice.jpg" },
    { en: "Meammar Rice (Cream)", ar: "أرز معمر", price: "170 LE" },
    { en: "Meammar (w/ Pigeon/Meat)", ar: "أرز معمر باللحم", price: "Ask Price" },
    { en: "Frik Tagine (Cream)", ar: "طاجن فريك", price: "180 LE" },
    { en: "Orzo Tagine (Liver/Meat)", ar: "طاجن لسان عصفور", price: "Ask Price" },
    { en: "Knuckles Soup", ar: "شوربة كوارع", price: "150 LE" },
    { en: "Orzo / Vermicelli Soup", ar: "شوربة لسان عصفور", price: "30 LE" },
  ],
  [MENU_CATEGORIES.Fish]: [
    { en: "Grilled Sea Bream", ar: "سمك دنيس مشوي", price: "Per Kg", tag: "Fresh" },
    { en: "Sea Bass (Singari)", ar: "سمك قاروص سنجاري", price: "Per Kg", tag: "Special" },
    { en: "Grilled Shrimp", ar: "جمبري مشوي", price: "450 - 900 LE", tag: "Premium", image: "/menu/shrimp.jpg" },
    { en: "Fried Calamari", ar: "كاليماري مقلي", price: "400 LE" },
    { en: "Seafood Pasta (White)", ar: "مكرونة سي فود", price: "350 LE" },
    { en: "Fish Sayadiya Rice", ar: "أرز صيادية", price: "100 LE" },
    { en: "Seafood Soup", ar: "شوربة سي فود", price: "250 LE" },
    { en: "Grilled Tilapia", ar: "سمك بلطي مشوي", price: "Market Price" },
  ]
};
