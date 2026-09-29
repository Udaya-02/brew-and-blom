import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, Coffee, Sparkles } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    cartTax,
    cartTotal,
    setIsCheckoutOpen,
    setActivePage,
  } = useApp();

  if (!isCartOpen) return null;

  return (
    <div
      id="cart-drawer-overlay"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        id="cart-drawer-panel"
        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#FAF6F0] shadow-2xl flex flex-col z-50 border-l border-[#E8DFD0]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E8DFD0] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#24140E] text-[#FAF6F0] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-[#C48B54]" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-[#24140E]">Your Coffee Bag</h2>
              <p className="text-xs text-[#7A726A]">
                {cart.length} {cart.length === 1 ? 'item' : 'items'} selected
              </p>
            </div>
          </div>
          <button
            id="close-cart-btn"
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-[#7A726A] hover:text-[#24140E] hover:bg-[#EFE8DD] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart items list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#EFE8DD] text-[#7A726A] mx-auto flex items-center justify-center">
                <Coffee className="w-8 h-8 text-[#C48B54]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-semibold text-[#24140E]">Your bag is empty</h3>
                <p className="text-xs text-[#7A726A] max-w-xs mx-auto">
                  Handcrafted specialty espresso drinks, fresh pastries, and whole-bean roasts are waiting for you.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setActivePage('menu');
                }}
                className="px-6 py-2.5 bg-[#24140E] text-white text-xs uppercase tracking-wider font-semibold rounded-full hover:bg-[#C48B54] transition-colors"
              >
                Browse Café Menu
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.cartItemId}
                className="bg-white p-3.5 rounded-2xl border border-[#E8DFD0] shadow-xs flex gap-3.5 items-start"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-18 h-18 rounded-xl object-cover shrink-0 border border-[#E8DFD0]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-serif font-semibold text-sm text-[#24140E] truncate">
                      {item.name}
                    </h4>
                    <span className="font-medium text-sm text-[#24140E] shrink-0">
                      ${(item.unitPriceWithCustomizations * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  {/* Customization notes */}
                  {item.customization && (
                    <div className="text-[11px] text-[#7A726A] space-y-0.5 mt-1">
                      {item.customization.milk && <span>• {item.customization.milk} </span>}
                      {item.customization.sweetness && <span>• {item.customization.sweetness} </span>}
                      {item.customization.ice && <span>• {item.customization.ice} </span>}
                      {item.customization.extraShot && <span>• +Extra Shot </span>}
                      {item.customization.grind && <span>• Grind: {item.customization.grind} </span>}
                      {item.customization.weight && <span>• Size: {item.customization.weight} </span>}
                      {item.customization.notes && <p className="italic text-[#9E9488]">"{item.customization.notes}"</p>}
                    </div>
                  )}

                  {/* Quantity controls */}
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#F2EDE4]">
                    <div className="flex items-center gap-1.5 bg-[#FAF6F0] rounded-full border border-[#E8DFD0] px-1 py-0.5">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="w-6 h-6 rounded-full hover:bg-white flex items-center justify-center text-[#5C5248] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-semibold px-1 text-[#24140E]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="w-6 h-6 rounded-full hover:bg-white flex items-center justify-center text-[#5C5248] transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-[#9E9488] hover:text-red-600 p-1 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Subtotal & Checkout */}
        {cart.length > 0 && (
          <div className="p-5 bg-white border-t border-[#E8DFD0] space-y-4">
            <div className="space-y-1.5 text-xs text-[#7A726A]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-[#24140E]">${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (8.5%)</span>
                <span className="font-medium text-[#24140E]">${cartTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-[#586955] font-medium">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#C48B54]" /> Café Express Pickup
                </span>
                <span>FREE (Ready in 15m)</span>
              </div>
              <div className="flex justify-between text-base font-serif font-bold text-[#24140E] pt-2 border-t border-[#F2EDE4]">
                <span>Total</span>
                <span className="text-[#C48B54]">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                id="cart-checkout-btn"
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full bg-[#24140E] text-white py-3.5 px-4 rounded-xl font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#C48B54] transition-colors shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setActivePage('order');
                }}
                className="w-full text-center text-xs text-[#7A726A] hover:text-[#24140E] py-1 font-medium underline underline-offset-4"
              >
                Continue adding drinks & beans
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
