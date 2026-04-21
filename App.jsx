import React, { useState } from 'react';
import { 
  ChefHat, 
  Phone, 
  Instagram, 
  Clock, 
  MapPin, 
  UtensilsCrossed, 
  Flame, 
  Leaf, 
  Info,
  ChevronRight
} from 'lucide-react';

const MENU_CATEGORIES = {
  POULTRY: 'Chicken & Poultry',
  MEAT: 'Grills & Tagines',
  TRAYS: 'Oven Trays & Sides',
  RICE: 'Rice & Mahashi'
};

const MENU_DATA = {
  [MENU_CATEGORIES.POULTRY]: [
    { en: "Orange Duck", ar: "بط بالبرتقال", price: "700 - 1000 LE", tag: "Royal" },
    { en: "Stuffed Pigeon", ar: "حمام محشي", price: "400 LE", tag: "Royal" },
    { en: "Roasted Turkey", ar: "ديك رومي", price: "Start 1500 LE", tag: "Royal" },
    { en: "Smoked Turkey", ar: "تركي مدخن", price: "Per Kg", tag: "Royal" },
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
    { en: "Grilled Kofta", ar: "كفتة مشوية", price: "750 LE", tag: "Grill" },
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
    { en: "Macarona Béchamel", ar: "مكرونة بشاميل", price: "450 LE" },
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
    { en: "Basmati Rice", ar: "أرز بسمتي", price: "150 LE" },
    { en: "Meammar Rice (Cream)", ar: "أرز معمر", price: "170 LE" },
    { en: "Meammar (w/ Pigeon/Meat)", ar: "أرز معمر باللحم", price: "Ask Price" },
    { en: "Frik Tagine (Cream)", ar: "طاجن فريك", price: "180 LE" },
    { en: "Orzo Tagine (Liver/Meat)", ar: "طاجن لسان عصفور", price: "Ask Price" },
    { en: "Knuckles Soup", ar: "شوربة كوارع", price: "150 LE" },
    { en: "Orzo / Vermicelli Soup", ar: "شوربة لسان عصفور", price: "30 LE" },
  ]
};

export default function App() {
  const [activeTab, setActiveTab] = useState(MENU_CATEGORIES.POULTRY);

  const handleWhatsApp = () => {
    window.open('https://wa.me/201060447418', '_blank');
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 font-sans selection:bg-amber-700 selection:text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ChefHat className="text-amber-700 w-8 h-8" />
            <div>
              <h1 className="font-serif font-bold text-xl tracking-wider text-stone-900">HAIAM'S</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-semibold -mt-1">Catering</p>
            </div>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide text-stone-600">
            <a href="#story" className="hover:text-amber-700 transition-colors">Our Story</a>
            <a href="#menu" className="hover:text-amber-700 transition-colors">Menu</a>
            <a href="#order" className="hover:text-amber-700 transition-colors">How to Order</a>
          </div>
          <button onClick={handleWhatsApp} className="bg-amber-700 hover:bg-amber-800 text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg flex items-center gap-2">
            <Phone className="w-4 h-4" /> Order Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40 mix-blend-multiply">
           {/* Abstract decorative background in place of image to keep the file standalone */}
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/50 via-stone-900 to-stone-900"></div>
           <div className="absolute w-[500px] h-[500px] bg-amber-600/20 blur-3xl rounded-full top-[-100px] left-[-100px]"></div>
           <div className="absolute w-[600px] h-[600px] bg-stone-600/30 blur-3xl rounded-full bottom-[-200px] right-[-100px]"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-6 py-32 text-center flex flex-col items-center">
          <span className="text-amber-400 font-semibold tracking-[0.3em] uppercase text-sm mb-4">Est. 2024</span>
          <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">Authentic <br/> Homemade Taste</h2>
          <p className="text-lg md:text-xl text-stone-300 max-w-2xl mb-10 font-light">
            Bringing the warmth of homemade Egyptian cuisine to your table. Prepared with love, fresh ingredients, and a personal touch.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#menu" className="bg-white text-stone-900 px-8 py-3 rounded-full font-medium transition-all hover:bg-stone-200">
              Explore Menu
            </a>
            <button onClick={handleWhatsApp} className="border border-white/30 backdrop-blur-sm bg-white/10 text-white px-8 py-3 rounded-full font-medium transition-all hover:bg-white/20">
              Contact Chef Haiam
            </button>
          </div>
        </div>
      </header>

      {/* Story Section */}
      <section id="story" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-amber-700">
              <span className="h-px w-12 bg-amber-700"></span>
              <span className="uppercase tracking-widest text-sm font-semibold">Our Story</span>
            </div>
            <h3 className="text-4xl font-serif font-bold text-stone-900 leading-tight">Cooking food that tastes just like home.</h3>
            <p className="text-stone-600 leading-relaxed text-lg">
              For the past two years, Haiam's Catering has been dedicated to one simple goal: bringing people together over incredible food. We believe that the best meals are made with fresh ingredients, perfect hygiene, and a personal touch.
            </p>
            <p className="text-stone-600 leading-relaxed text-lg">
              Whether you are hosting a small family gathering or a large celebration, we take care of the cooking so you can enjoy the moment. From our kitchen to yours, we promise quality you can taste.
            </p>
            <div className="pt-4 flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-stone-900 font-bold font-serif text-xl">Chef Haiam Kamal</span>
                <a href="https://instagram.com/haiamcatering" target="_blank" rel="noreferrer" className="text-amber-700 hover:text-amber-800 text-sm font-medium flex items-center gap-1 mt-1">
                  <Instagram className="w-4 h-4" /> @haiamcatering
                </a>
              </div>
            </div>
          </div>
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-stone-100 border border-stone-200">
             {/* Decorative placeholder representing a rich table layout */}
             <div className="absolute inset-0 bg-stone-800 flex items-center justify-center p-8">
               <div className="w-full h-full border border-stone-600/50 rounded-xl relative overflow-hidden flex items-center justify-center">
                  <UtensilsCrossed className="w-32 h-32 text-stone-700 opacity-20 absolute" />
                  <div className="text-center z-10">
                    <h4 className="font-serif text-3xl text-amber-500 mb-2">Homemade</h4>
                    <p className="text-stone-400 font-light tracking-widest uppercase text-sm">With Love</p>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 bg-[#faf8f5]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h3 className="text-4xl font-serif font-bold text-stone-900 mb-4">Our Delicious Specialties</h3>
            <p className="text-stone-600">From buffet catering to fine dining, our services are flexible and customized to meet the needs of any event.</p>
          </div>

          {/* Menu Categories / Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {Object.values(MENU_CATEGORIES).map(category => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === category 
                    ? 'bg-stone-900 text-white shadow-md' 
                    : 'bg-white text-stone-600 hover:bg-stone-200 border border-stone-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
            {MENU_DATA[activeTab].map((item, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-stone-100 hover:border-amber-200 hover:shadow-lg transition-all group flex flex-col justify-center">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-bold text-stone-900 text-lg group-hover:text-amber-700 transition-colors">{item.en}</h4>
                      {item.tag && (
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] uppercase tracking-wider font-bold rounded-full">
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-stone-500 font-arabic text-sm" dir="rtl">{item.ar}</p>
                    {item.desc && <p className="text-stone-400 text-xs mt-2">{item.desc}</p>}
                  </div>
                  <div className="text-right">
                    <span className="font-serif font-bold text-amber-700 whitespace-nowrap">{item.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Order & Policies */}
      <section id="order" className="py-24 bg-stone-900 text-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16">
            
            <div>
              <h3 className="text-4xl font-serif font-bold mb-8">How to Order<br/><span className="text-amber-500">كيفية الطلب</span></h3>
              <p className="text-stone-300 mb-8 text-lg">We prepare every meal fresh specifically for your order to ensure the highest quality and authentic taste.</p>
              
              <button 
                onClick={handleWhatsApp}
                className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20b858] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-3 mb-8"
              >
                <Phone className="w-6 h-6" /> 
                Order via WhatsApp
              </button>

              <div className="flex items-center gap-4 text-stone-300 border-t border-stone-700 pt-6">
                 <div className="bg-stone-800 p-3 rounded-full text-amber-500">
                    <MapPin className="w-6 h-6" />
                 </div>
                 <div>
                    <p className="font-bold text-white">Delivery Areas (التوصيل)</p>
                    <p className="text-sm">Available to Al Shorouk City & Madinaty.</p>
                    <p className="text-sm text-stone-400 italic">* Delivery fees apply.</p>
                 </div>
              </div>
            </div>

            <div className="bg-stone-800 rounded-3xl p-8 border border-stone-700">
              <h4 className="font-serif text-2xl font-bold mb-6 text-amber-500 border-b border-stone-700 pb-4">Order Policy (نظام الطلب)</h4>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1 text-amber-500"><Flame className="w-6 h-6"/></div>
                  <div>
                    <h5 className="font-bold text-white mb-1">Freshness Guaranteed (ضمان الطزاجة)</h5>
                    <p className="text-stone-400 text-sm leading-relaxed">All meals are cooked fresh to order. جميع وجباتنا تُطهى طازجة خصيصاً عند الطلب.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1 text-amber-500"><Clock className="w-6 h-6"/></div>
                  <div>
                    <h5 className="font-bold text-white mb-1">Order Notice (موعد الحجز)</h5>
                    <p className="text-stone-400 text-sm leading-relaxed">Please order at least 48 hours in advance. يرجى تأكيد الطلب قبل ٤٨ ساعة على الأقل.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1 text-amber-500"><UtensilsCrossed className="w-6 h-6"/></div>
                  <div>
                    <h5 className="font-bold text-white mb-1">Large Events (العزومات)</h5>
                    <p className="text-stone-400 text-sm leading-relaxed">For Azomat & Parties, please notify us 1 week in advance. للمناسبات الكبيرة والعزومات يرجى الحجز قبل أسبوع لضمان التنسيق.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 py-12 text-stone-400 border-t border-stone-800">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-white">
            <ChefHat className="text-amber-700 w-6 h-6" />
            <span className="font-serif font-bold text-xl tracking-widest">HAIAM'S</span>
          </div>
          
          <div className="flex gap-6 text-sm">
            <a href="https://instagram.com/haiamcatering" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-amber-500 transition-colors">
              <Instagram className="w-4 h-4" /> Instagram
            </a>
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> +20 106 044 7418
            </span>
          </div>
          
          <div className="text-sm text-stone-600 text-center md:text-right">
            &copy; {new Date().getFullYear()} Haiam's Catering.<br/> Homemade with Love.
          </div>
        </div>
      </footer>
    </div>
  );
}