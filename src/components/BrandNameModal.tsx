import React, { useState } from 'react';
import { X, Check, Sparkles, Coffee } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BRAND_PRESETS } from '../data/brand';

export const BrandNameModal: React.FC = () => {
  const { isBrandModalOpen, setIsBrandModalOpen, brandName, setBrandName, addToast } = useApp();
  const [customInput, setCustomInput] = useState(brandName);

  if (!isBrandModalOpen) return null;

  const handleSave = (nameToSet: string) => {
    const trimmed = nameToSet.trim();
    if (!trimmed) return;
    setBrandName(trimmed);
    setIsBrandModalOpen(false);
    addToast('Coffee Shop Renamed', `Coffee shop name set to "${trimmed}".`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FDFBF7] rounded-3xl max-w-lg w-full border border-[#E8E0D2] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-[#E8E0D2] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#C68E5C] text-[#231812] flex items-center justify-center font-bold">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#3D2B1F]">
                Change Coffee Shop Name
              </h3>
              <p className="text-xs text-[#736760]">
                Customize the branding across the entire website
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsBrandModalOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#736760] hover:text-[#3D2B1F] hover:bg-[#EFE8DD] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Custom Input */}
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider font-bold text-[#5C4F46]">
              Shop Name
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="e.g. Udaya Coffee Roasters"
                className="flex-1 px-4 py-3 rounded-xl border border-[#D8CEBE] bg-white text-sm text-[#3D2B1F] placeholder:text-[#8C7E75] focus:outline-hidden focus:ring-2 focus:ring-[#C68E5C] focus:border-transparent transition-all"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSave(customInput);
                  }
                }}
              />
              <button
                onClick={() => handleSave(customInput)}
                className="px-5 py-3 rounded-xl bg-[#3D2B1F] text-[#FDFBF7] text-xs font-semibold hover:bg-[#C68E5C] transition-colors shrink-0"
              >
                Apply
              </button>
            </div>
          </div>

          {/* Presets */}
          <div className="space-y-2.5">
            <span className="block text-xs uppercase tracking-wider font-bold text-[#5C4F46]">
              Curated Suggestions
            </span>
            <div className="grid grid-cols-1 gap-2">
              {BRAND_PRESETS.map((preset) => {
                const isSelected = brandName === preset.name;
                return (
                  <button
                    key={preset.name}
                    onClick={() => {
                      setCustomInput(preset.name);
                      handleSave(preset.name);
                    }}
                    className={`text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-[#C68E5C] bg-[#C68E5C]/10 text-[#3D2B1F]'
                        : 'border-[#E8E0D2] bg-white hover:border-[#C68E5C]/50 hover:bg-[#FAF6F0]'
                    }`}
                  >
                    <div>
                      <span className="block text-sm font-semibold text-[#3D2B1F]">
                        {preset.name}
                      </span>
                      <span className="block text-xs text-[#736760]">
                        {preset.desc}
                      </span>
                    </div>
                    {isSelected && (
                      <span className="w-6 h-6 rounded-full bg-[#C68E5C] text-[#231812] flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F5EFE6] border-t border-[#E8E0D2] flex items-center justify-between text-xs text-[#736760]">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C68E5C]" />
            <span>Updates header, footer, modals, and narrative copy instantly</span>
          </div>
          <button
            onClick={() => setIsBrandModalOpen(false)}
            className="px-4 py-1.5 rounded-lg text-xs font-medium text-[#3D2B1F] hover:bg-[#EFE8DD] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
