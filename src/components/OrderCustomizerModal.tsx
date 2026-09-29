import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MenuItem, CoffeeProduct, CartCustomization } from '../types';
import { X, Plus, Minus, Check, Sparkles } from 'lucide-react';

export const OrderCustomizerModal: React.FC = () => {
  const { customizerItem, setCustomizerItem, addToCart } = useApp();

  if (!customizerItem) return null;

  const isBeanProduct = 'roastLevel' in customizerItem;
  const item = customizerItem as MenuItem | CoffeeProduct;

  // Customization states
  const [quantity, setQuantity] = useState(1);
  const [selectedMilk, setSelectedMilk] = useState<'Oat Milk' | 'Almond Milk' | 'Whole Milk' | 'Skim Milk' | 'Coconut Milk'>('Oat Milk');
  const [selectedSweetness, setSelectedSweetness] = useState<'0% (Unsweetened)' | '25% (Light)' | '50% (Standard)' | '100% (Extra Sweet)'>('50% (Standard)');
  const [selectedIce, setSelectedIce] = useState<'No Ice' | 'Light Ice' | 'Standard Ice' | 'Extra Cold'>('Standard Ice');
  const [extraShot, setExtraShot] = useState(false);
  const [selectedGrind, setSelectedGrind] = useState<'Whole Bean' | 'Pour Over (Medium)' | 'Espresso (Fine)' | 'French Press (Coarse)'>('Whole Bean');
  const [selectedWeight, setSelectedWeight] = useState<'250g' | '500g' | '1kg'>('250g');
  const [notes, setNotes] = useState('');

  // Calculate live price
  let extraCost = 0;
  if (!isBeanProduct && extraShot) extraCost += 0.95;
  if (isBeanProduct && selectedWeight === '500g') extraCost += 12.00;
  if (isBeanProduct && selectedWeight === '1kg') extraCost += 28.00;

  const currentUnitPrice = item.price + extraCost;
  const totalPrice = currentUnitPrice * quantity;

  const handleAdd = () => {
    const customization: CartCustomization = isBeanProduct
      ? {
          grind: selectedGrind,
          weight: selectedWeight,
          notes: notes.trim() || undefined,
        }
      : {
          milk: selectedMilk,
          sweetness: selectedSweetness,
          ice: selectedIce,
          extraShot,
          notes: notes.trim() || undefined,
        };

    addToCart(item, customization, quantity);
    setCustomizerItem(null);
  };

  return (
    <div
      id="customizer-modal-overlay"
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
      onClick={() => setCustomizerItem(null)}
    >
      <div
        id="customizer-modal-dialog"
        className="bg-[#FAF6F0] w-full max-w-lg rounded-3xl shadow-2xl border border-[#E8DFD0] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Item Top Image Header */}
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#24140E]/80 via-[#24140E]/20 to-transparent" />
          <button
            id="close-customizer-btn"
            onClick={() => setCustomizerItem(null)}
            className="absolute top-4 right-4 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#C48B54]">
              {isBeanProduct ? (item as CoffeeProduct).roastLevel + ' Roast' : ('category' in item ? (item as MenuItem).category : '')}
            </span>
            <h3 className="font-serif text-2xl font-bold leading-tight">{item.name}</h3>
            <p className="text-xs text-white/80 line-clamp-1 mt-0.5">{item.description}</p>
          </div>
        </div>

        {/* Options Body */}
        <div className="p-6 space-y-6 max-h-[55vh] overflow-y-auto">
          {/* If Coffee Beans */}
          {isBeanProduct ? (
            <>
              {/* Grind Selector */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-[#24140E] mb-2.5">
                  Select Grind Style
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Whole Bean', 'Pour Over (Medium)', 'Espresso (Fine)', 'French Press (Coarse)'] as const).map(
                    (grind) => (
                      <button
                        key={grind}
                        type="button"
                        onClick={() => setSelectedGrind(grind)}
                        className={`p-2.5 rounded-xl border text-xs font-medium text-left flex items-center justify-between transition-all ${
                          selectedGrind === grind
                            ? 'bg-[#24140E] text-white border-[#24140E]'
                            : 'bg-white text-[#5C5248] border-[#D8CEBE] hover:border-[#C48B54]'
                        }`}
                      >
                        <span>{grind}</span>
                        {selectedGrind === grind && <Check className="w-3.5 h-3.5 text-[#C48B54]" />}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Weight Selector */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-[#24140E] mb-2.5">
                  Bag Size / Weight
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: '250g (Retail)', value: '250g', extra: '' },
                    { label: '500g (Reserve)', value: '500g', extra: '+$12' },
                    { label: '1kg (Roaster)', value: '1kg', extra: '+$28' },
                  ].map((w) => (
                    <button
                      key={w.value}
                      type="button"
                      onClick={() => setSelectedWeight(w.value as any)}
                      className={`p-3 rounded-xl border text-xs font-medium text-center flex flex-col items-center gap-1 transition-all ${
                        selectedWeight === w.value
                          ? 'bg-[#24140E] text-white border-[#24140E]'
                          : 'bg-white text-[#5C5248] border-[#D8CEBE] hover:border-[#C48B54]'
                      }`}
                    >
                      <span className="font-bold">{w.value}</span>
                      <span className="text-[10px] opacity-80">{w.extra || 'Standard'}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* If Beverage / Food */
            <>
              {/* Milk Option */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-[#24140E] mb-2.5">
                  Milk Preference
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Oat Milk', 'Almond Milk', 'Whole Milk', 'Skim Milk', 'Coconut Milk'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setSelectedMilk(m)}
                      className={`py-2 px-2.5 rounded-xl border text-xs font-medium text-center transition-all ${
                        selectedMilk === m
                          ? 'bg-[#24140E] text-white border-[#24140E]'
                          : 'bg-white text-[#5C5248] border-[#D8CEBE] hover:border-[#C48B54]'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sweetness */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-[#24140E] mb-2.5">
                  Sweetness Level
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['0% (Unsweetened)', '25% (Light)', '50% (Standard)', '100% (Extra Sweet)'] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSweetness(s)}
                      className={`py-2 px-2 rounded-xl border text-[11px] font-medium text-center transition-all ${
                        selectedSweetness === s
                          ? 'bg-[#24140E] text-white border-[#24140E]'
                          : 'bg-white text-[#5C5248] border-[#D8CEBE] hover:border-[#C48B54]'
                      }`}
                    >
                      {s.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add-ons */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-[#24140E] mb-2.5">
                  Add-Ons & Shots
                </label>
                <button
                  type="button"
                  onClick={() => setExtraShot(!extraShot)}
                  className={`w-full p-3 rounded-xl border text-xs font-medium flex items-center justify-between transition-all ${
                    extraShot
                      ? 'bg-[#EFE8DD] border-[#C48B54] text-[#24140E]'
                      : 'bg-white border-[#D8CEBE] text-[#5C5248]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C48B54]" />
                    Extra Shot of Single-Origin Espresso
                  </span>
                  <span className="font-bold">+$0.95</span>
                </button>
              </div>
            </>
          )}

          {/* Notes for barista */}
          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-[#24140E] mb-1.5">
              Special Instructions for Barista
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Extra hot, light ice, pour in personal cup..."
              className="w-full bg-white border border-[#D8CEBE] rounded-xl px-3.5 py-2 text-xs text-[#24140E] placeholder:text-[#9E9488] focus:outline-hidden focus:border-[#C48B54]"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-white border-t border-[#E8DFD0] flex items-center justify-between gap-4">
          {/* Quantity Stepper */}
          <div className="flex items-center gap-2 bg-[#FAF6F0] rounded-full border border-[#D8CEBE] px-2 py-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-7 h-7 rounded-full hover:bg-white flex items-center justify-center text-[#5C5248] transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-sm font-bold text-[#24140E] px-2">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-7 h-7 rounded-full hover:bg-white flex items-center justify-center text-[#5C5248] transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Bag Button */}
          <button
            id="confirm-customizer-add-btn"
            onClick={handleAdd}
            className="flex-1 bg-[#24140E] text-white py-3 px-6 rounded-xl font-semibold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#C48B54] transition-colors shadow-md"
          >
            <span>Add to Order</span>
            <span>•</span>
            <span>${totalPrice.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
