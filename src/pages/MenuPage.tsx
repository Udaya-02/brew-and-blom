import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { FULL_MENU } from '../data/coffeeData';
import { Search, Plus, Sparkles, Leaf, Coffee, Flame, Check } from 'lucide-react';
import { MenuItem } from '../types';

export const MenuPage: React.FC = () => {
  const { setCustomizerItem, globalSearch, setGlobalSearch } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'vegan' | 'gf'>('all');

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'espresso', label: 'Espresso Bar' },
    { id: 'cold', label: 'Cold Coffee' },
    { id: 'tea', label: 'Tea & Botanical' },
    { id: 'bakery', label: 'Artisan Bakery' },
    { id: 'breakfast', label: 'Breakfast & Plates' },
  ];

  const filteredItems = useMemo(() => {
    return FULL_MENU.filter((item) => {
      // Category check
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Dietary check
      if (dietaryFilter === 'veg' && !item.isVegetarian) return false;
      if (dietaryFilter === 'vegan' && !item.isVegan) return false;
      if (dietaryFilter === 'gf' && !item.isGlutenFree) return false;

      // Search check
      if (globalSearch.trim()) {
        const q = globalSearch.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchCat = item.category.toLowerCase().includes(q);
        return matchName || matchDesc || matchCat;
      }

      return true;
    });
  }, [activeCategory, dietaryFilter, globalSearch]);

  return (
    <div id="menu-page" className="animate-fade-in pt-24 pb-24 bg-[#FAF6F0]">
      {/* 1. HEADER HERO */}
      <section className="bg-[#24140E] text-[#FAF6F0] py-16 px-4 sm:px-6 lg:px-8 border-b border-[#38261C]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#C48B54]">
            Daily Provisions
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white">
            The Café Menu
          </h1>
          <p className="text-sm sm:text-base text-[#D8CEBE] font-light max-w-xl mx-auto leading-relaxed">
            Direct-trade specialty coffees, house-crafted botanicals, slow cold brews, and oven-fresh Viennoiserie pastries.
          </p>
        </div>
      </section>

      {/* 2. SEARCH & FILTER CONTROLS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-[#E8DFD0]">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <input
              id="menu-search-input"
              type="text"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              placeholder="Search drinks, ingredients, pastries..."
              className="w-full bg-white border border-[#D8CEBE] rounded-full pl-10 pr-4 py-2.5 text-xs text-[#24140E] placeholder:text-[#9E9488] focus:outline-hidden focus:border-[#C48B54] shadow-xs"
            />
            <Search className="w-4 h-4 text-[#7A726A] absolute left-3.5 top-3" />
            {globalSearch && (
              <button
                onClick={() => setGlobalSearch('')}
                className="absolute right-3 top-2.5 text-xs text-[#7A726A] hover:text-[#24140E]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Dietary toggle chips */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <span className="text-[11px] text-[#7A726A] font-semibold uppercase tracking-wider shrink-0 mr-1">
              Dietary:
            </span>
            {[
              { id: 'all', label: 'All' },
              { id: 'veg', label: 'Vegetarian' },
              { id: 'vegan', label: 'Vegan' },
              { id: 'gf', label: 'Gluten-Free' },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => setDietaryFilter(d.id as any)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all shrink-0 ${
                  dietaryFilter === d.id
                    ? 'bg-[#24140E] text-white'
                    : 'bg-white text-[#5C5248] border border-[#D8CEBE] hover:border-[#C48B54]'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto py-6 scrollbar-none border-b border-[#E8DFD0]">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`menu-cat-tab-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#C48B54] text-white shadow-md'
                    : 'bg-white text-[#5C5248] border border-[#E8DFD0] hover:border-[#C48B54]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* 3. MENU ITEMS GRID */}
        <div className="pt-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl font-bold text-[#24140E]">
              {categories.find((c) => c.id === activeCategory)?.label}
            </h2>
            <span className="text-xs text-[#7A726A]">
              Showing {filteredItems.length} items
            </span>
          </div>

          {filteredItems.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-[#E8DFD0] p-8 space-y-3">
              <Coffee className="w-10 h-10 text-[#C48B54] mx-auto" />
              <h3 className="font-serif text-lg font-bold text-[#24140E]">No items match your filter</h3>
              <p className="text-xs text-[#7A726A] max-w-sm mx-auto">
                Try clearing your search keyword or switching dietary filters.
              </p>
              <button
                onClick={() => {
                  setGlobalSearch('');
                  setActiveCategory('all');
                  setDietaryFilter('all');
                }}
                className="px-5 py-2 bg-[#24140E] text-white text-xs font-semibold uppercase rounded-full hover:bg-[#C48B54]"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  id={`menu-item-${item.id}`}
                  className="bg-white rounded-3xl overflow-hidden border border-[#E8DFD0] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="flex gap-4 p-5">
                    {/* Item Thumbnail */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 bg-[#EFE8DD]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {item.isBestSeller && (
                        <div className="absolute top-1.5 left-1.5 bg-[#C48B54] text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full">
                          Star
                        </div>
                      )}
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-serif text-base font-bold text-[#24140E] group-hover:text-[#C48B54] transition-colors leading-tight">
                          {item.name}
                        </h3>
                        <span className="font-serif font-bold text-sm text-[#24140E] shrink-0">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>

                      <p className="text-xs text-[#7A726A] line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Dietary / Spec tags */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
                        {item.isVegetarian && (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#EBF3E8] text-[#586955] text-[10px] font-medium">
                            <Leaf className="w-2.5 h-2.5" /> Veg
                          </span>
                        )}
                        {item.isVegan && (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#EBF3E8] text-[#586955] text-[10px] font-medium">
                            Vegan
                          </span>
                        )}
                        {item.isGlutenFree && (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#FFF4E5] text-[#B07842] text-[10px] font-medium">
                            GF
                          </span>
                        )}
                        {item.calories && (
                          <span className="text-[10px] text-[#9E9488]">
                            • {item.calories}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Add Action Bar */}
                  <div className="px-5 py-3 bg-[#FAF6F0] border-t border-[#F2EDE4] flex items-center justify-between">
                    <span className="text-[11px] text-[#7A726A] italic">
                      {item.temperature ? `${item.temperature} served` : 'Fresh Daily'}
                    </span>
                    <button
                      id={`menu-add-btn-${item.id}`}
                      onClick={() => setCustomizerItem(item)}
                      className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-[#24140E] hover:bg-[#C48B54] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
