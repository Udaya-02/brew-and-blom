import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { COFFEE_COLLECTION } from '../data/coffeeData';
import { Coffee, Flame, Sparkles, Plus, Check, Compass, ShieldCheck } from 'lucide-react';

export const CoffeeCollectionPage: React.FC = () => {
  const { setCustomizerItem, addToCart } = useApp();
  const [selectedRoast, setSelectedRoast] = useState<string>('all');
  const [selectedOrigin, setSelectedOrigin] = useState<string>('all');

  const roastLevels = [
    { id: 'all', label: 'All Roasts' },
    { id: 'Light', label: 'Light Roast' },
    { id: 'Light-Medium', label: 'Light-Medium' },
    { id: 'Medium', label: 'Medium Roast' },
    { id: 'Dark', label: 'Dark Roast' },
  ];

  const filteredBags = useMemo(() => {
    return COFFEE_COLLECTION.filter((coffee) => {
      if (selectedRoast !== 'all' && coffee.roastLevel !== selectedRoast) {
        return false;
      }
      if (selectedOrigin === 'single' && !coffee.badge?.includes('SINGLE ORIGIN')) {
        return false;
      }
      if (selectedOrigin === 'blend' && coffee.badge?.includes('SINGLE ORIGIN')) {
        return false;
      }
      return true;
    });
  }, [selectedRoast, selectedOrigin]);

  return (
    <div id="coffee-page" className="animate-fade-in pt-24 pb-24 bg-[#FAF6F0]">
      {/* 1. HERO SECTION */}
      <section className="bg-[#1A0F0A] text-[#FAF6F0] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#38261C] relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 hidden lg:block pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=900&auto=format&fit=crop"
            alt="Whole coffee beans texture"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#C48B54] text-xs uppercase tracking-[0.25em] font-semibold border border-white/15">
            <Sparkles className="w-3.5 h-3.5" /> Whole Bean & Ground Retail
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white">
            Specialty Coffee Collection
          </h1>
          <p className="text-sm sm:text-base text-[#D8CEBE] font-light max-w-2xl mx-auto leading-relaxed">
            Freshly roasted in micro-lots each Tuesday. Sourced directly from regenerative shade-grown estates around the globe.
          </p>
        </div>
      </section>

      {/* 2. FILTER CONTROLS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#E8DFD0]">
          {/* Roast level tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none pb-2 md:pb-0">
            <span className="text-[11px] text-[#7A726A] font-bold uppercase tracking-wider mr-2 shrink-0">
              Roast:
            </span>
            {roastLevels.map((roast) => {
              const isActive = selectedRoast === roast.id;
              return (
                <button
                  key={roast.id}
                  onClick={() => setSelectedRoast(roast.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#24140E] text-white shadow-xs'
                      : 'bg-white text-[#5C5248] border border-[#E8DFD0] hover:border-[#C48B54]'
                  }`}
                >
                  {roast.label}
                </button>
              );
            })}
          </div>

          {/* Origin filter toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedOrigin('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedOrigin === 'all'
                  ? 'bg-[#C48B54] text-white'
                  : 'bg-white text-[#5C5248] border border-[#D8CEBE]'
              }`}
            >
              All Origins
            </button>
            <button
              onClick={() => setSelectedOrigin('single')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedOrigin === 'single'
                  ? 'bg-[#C48B54] text-white'
                  : 'bg-white text-[#5C5248] border border-[#D8CEBE]'
              }`}
            >
              Single Origin Only
            </button>
            <button
              onClick={() => setSelectedOrigin('blend')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedOrigin === 'blend'
                  ? 'bg-[#C48B54] text-white'
                  : 'bg-white text-[#5C5248] border border-[#D8CEBE]'
              }`}
            >
              Signature Blends
            </button>
          </div>
        </div>

        {/* 3. PRODUCT CARDS GRID */}
        <div className="pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBags.map((product) => {
            let badgeBg = 'bg-[#24140E] text-white';
            if (product.badge === 'BESTSELLER') badgeBg = 'bg-[#C48B54] text-white';
            if (product.badge === 'SINGLE ORIGIN') badgeBg = 'bg-[#586955] text-white';
            if (product.badge === 'NEW') badgeBg = 'bg-[#3D251B] text-[#FAF6F0]';

            return (
              <div
                key={product.id}
                id={`coffee-card-${product.id}`}
                className="bg-white rounded-3xl overflow-hidden border border-[#E8DFD0] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Image & Badge */}
                  <div className="relative h-72 overflow-hidden bg-[#EFE8DD]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.badge && (
                      <div
                        className={`absolute top-4 left-4 ${badgeBg} text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs`}
                      >
                        {product.badge}
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-serif font-bold text-[#24140E] shadow-xs">
                      ${product.price.toFixed(2)}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#C48B54] font-semibold uppercase tracking-wider mb-1">
                        <Flame className="w-3.5 h-3.5" />
                        <span>{product.roastLevel} Roast</span>
                        <span>•</span>
                        <span>{product.origin}</span>
                      </div>

                      <h3 className="font-serif text-xl font-bold text-[#24140E] group-hover:text-[#C48B54] transition-colors leading-tight">
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#7A726A] mt-1 italic">
                        {product.tagline}
                      </p>
                    </div>

                    {/* Flavor notes pills */}
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider font-bold text-[#9E9488] mb-1.5">
                        Tasting Notes:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {product.flavorNotes.map((note, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-full bg-[#FAF6F0] text-[#5C5248] border border-[#E8DFD0] text-[11px] font-medium"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Meta specs */}
                    <div className="bg-[#FAF6F0] p-3 rounded-2xl border border-[#E8DFD0] grid grid-cols-2 gap-2 text-[11px] text-[#7A726A]">
                      <div>
                        <strong>Altitude:</strong> {product.altitude}
                      </div>
                      <div>
                        <strong>Process:</strong> {product.process}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0 space-y-2">
                  <button
                    id={`coffee-customize-btn-${product.id}`}
                    onClick={() => setCustomizerItem(product)}
                    className="w-full bg-[#24140E] hover:bg-[#C48B54] text-white py-3 rounded-xl font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Select Grind & Add to Cart</span>
                  </button>
                  <p className="text-[10px] text-center text-[#9E9488]">
                    Recommend: {product.brewRecommendation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Roasting Promise Banner */}
        <div className="mt-16 bg-[#EFE8DD] rounded-3xl p-8 sm:p-12 border border-[#D8CEBE] grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#24140E] text-[#C48B54] mx-auto flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-base font-bold text-[#24140E]">Roasted Fresh Weekly</h4>
            <p className="text-xs text-[#7A726A]">Shipped within 48 hours of roast date with degassing valve packaging.</p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#24140E] text-[#C48B54] mx-auto flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-base font-bold text-[#24140E]">100% Direct Trade</h4>
            <p className="text-xs text-[#7A726A]">Transparent farm-gate pricing and long-term sustainable grower partnerships.</p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#24140E] text-[#C48B54] mx-auto flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-base font-bold text-[#24140E]">Custom Precision Grind</h4>
            <p className="text-xs text-[#7A726A]">Ground upon order for your specific machine or delivered as whole bean.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
