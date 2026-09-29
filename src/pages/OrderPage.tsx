import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { FULL_MENU, COFFEE_COLLECTION } from '../data/coffeeData';
import { Search, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Sparkles, Coffee, Leaf, ShieldCheck } from 'lucide-react';
import { MenuItem, CoffeeProduct } from '../types';

export const OrderPage: React.FC = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartTax,
    cartTotal,
    setIsCheckoutOpen,
    setCustomizerItem,
  } = useApp();

  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<string>('all');

  const allItems: (MenuItem | CoffeeProduct)[] = useMemo(() => {
    return [...FULL_MENU, ...COFFEE_COLLECTION];
  }, []);

  const tabs = [
    { id: 'all', label: 'All Items' },
    { id: 'espresso', label: 'Espresso' },
    { id: 'cold', label: 'Cold Coffee' },
    { id: 'tea', label: 'Tea & Botanical' },
    { id: 'bakery', label: 'Bakery' },
    { id: 'breakfast', label: 'Breakfast Plates' },
    { id: 'beans', label: 'Whole Bean Bags' },
  ];

  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      // Tab filter
      if (activeTab === 'beans') {
        if (!('roastLevel' in item)) return false;
      } else if (activeTab !== 'all') {
        if (!('category' in item) || item.category !== activeTab) return false;
      }

      // Search filter
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        return matchName || matchDesc;
      }

      return true;
    });
  }, [allItems, activeTab, search]);

  return (
    <div id="order-page" className="animate-fade-in pt-24 pb-24 bg-[#FAF6F0]">
      {/* Header Banner */}
      <section className="bg-[#24140E] text-[#FAF6F0] py-12 px-4 sm:px-6 lg:px-8 border-b border-[#38261C]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#C48B54]">
              Express Pickup Ordering
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
              Order Online For Café Pickup
            </h1>
            <p className="text-xs text-[#D8CEBE] mt-1">
              Freshly prepared in 15–20 minutes at 428 Blossom Alley, San Francisco
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search drinks, roasts, treats..."
              className="w-full bg-white text-[#24140E] pl-10 pr-4 py-2.5 rounded-full text-xs placeholder:text-[#9E9488] focus:outline-hidden focus:ring-2 focus:ring-[#C48B54]"
            />
            <Search className="w-4 h-4 text-[#7A726A] absolute left-3.5 top-3" />
          </div>
        </div>
      </section>

      {/* Main Order Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none border-b border-[#E8DFD0] mb-8">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`order-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#C48B54] text-white shadow-md'
                    : 'bg-white text-[#5C5248] border border-[#E8DFD0] hover:border-[#C48B54]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 2-Column Layout: Menu Grid (Left) + Sticky Order Cart (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Product Catalog */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredItems.map((item) => {
                const isBean = 'roastLevel' in item;
                return (
                  <div
                    key={item.id}
                    id={`order-card-${item.id}`}
                    className="bg-white rounded-3xl p-4 border border-[#E8DFD0] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="flex gap-3.5">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-2xl object-cover shrink-0 bg-[#EFE8DD] border border-[#E8DFD0]"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h3 className="font-serif font-bold text-sm text-[#24140E] leading-tight truncate">
                            {item.name}
                          </h3>
                          <span className="font-bold text-xs text-[#C48B54] shrink-0">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#7A726A] line-clamp-2 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                        {isBean && (
                          <span className="inline-block text-[10px] text-[#586955] font-semibold mt-1">
                            {(item as CoffeeProduct).roastLevel} Roast • {(item as CoffeeProduct).origin}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-[#F2EDE4] flex items-center justify-between gap-2">
                      <span className="text-[10px] text-[#9E9488] uppercase">
                        {isBean ? 'Bag 250g' : 'Prepared Fresh'}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setCustomizerItem(item)}
                          className="px-3 py-1.5 rounded-full border border-[#D8CEBE] text-[11px] font-medium text-[#5C5248] hover:bg-[#EFE8DD] transition-colors"
                        >
                          Customize
                        </button>
                        <button
                          id={`quick-add-${item.id}`}
                          onClick={() => addToCart(item)}
                          className="px-3.5 py-1.5 rounded-full bg-[#24140E] hover:bg-[#C48B54] text-white text-[11px] font-semibold uppercase tracking-wider transition-colors flex items-center gap-1 shadow-xs"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Sticky Order Summary Sidebar */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-white rounded-3xl p-6 border border-[#E8DFD0] shadow-lg space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#F2EDE4]">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#C48B54]" />
                  <h2 className="font-serif text-lg font-bold text-[#24140E]">Current Order</h2>
                </div>
                <span className="bg-[#FAF6F0] px-2.5 py-0.5 rounded-full text-xs font-semibold text-[#7A726A] border border-[#E8DFD0]">
                  {cart.length} items
                </span>
              </div>

              {/* Cart items */}
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <div className="py-8 text-center space-y-2">
                    <Coffee className="w-8 h-8 text-[#D8CEBE] mx-auto" />
                    <p className="text-xs text-[#7A726A]">No items in your order bag yet.</p>
                    <p className="text-[11px] text-[#9E9488]">Select any drink or bean roast to start.</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.cartItemId}
                      className="bg-[#FAF6F0] p-3 rounded-2xl border border-[#E8DFD0] flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-[#24140E] truncate">{item.name}</h4>
                        {item.customization && (
                          <p className="text-[10px] text-[#7A726A] truncate">
                            {[
                              item.customization.milk,
                              item.customization.grind,
                              item.customization.weight,
                              item.customization.extraShot ? 'Extra Shot' : '',
                            ]
                              .filter(Boolean)
                              .join(' • ')}
                          </p>
                        )}
                        <span className="text-[#C48B54] font-medium text-[11px]">
                          ${(item.unitPriceWithCustomizations * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      {/* Quantity stepper */}
                      <div className="flex items-center gap-1 bg-white rounded-full border border-[#D8CEBE] px-1 py-0.5 shrink-0">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="w-5 h-5 rounded-full hover:bg-[#FAF6F0] flex items-center justify-center text-[#7A726A]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold px-1 text-[#24140E]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-5 h-5 rounded-full hover:bg-[#FAF6F0] flex items-center justify-center text-[#7A726A]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-[#9E9488] hover:text-red-600 p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Price Calculations */}
              {cart.length > 0 && (
                <div className="space-y-2 pt-4 border-t border-[#F2EDE4] text-xs text-[#7A726A]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#24140E]">${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes (8.5%)</span>
                    <span>${cartTax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-serif font-bold text-base text-[#24140E] pt-2 border-t border-[#F2EDE4]">
                    <span>Total</span>
                    <span className="text-[#C48B54]">${cartTotal.toFixed(2)}</span>
                  </div>

                  {/* Checkout CTA */}
                  <button
                    id="order-page-checkout-btn"
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full bg-[#24140E] hover:bg-[#C48B54] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-colors mt-4"
                  >
                    <span>Proceed to Pickup Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
