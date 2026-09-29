import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle2, Coffee, Clock, MapPin, CreditCard, Sparkles, ShieldCheck, ArrowRight, Printer } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, cartSubtotal, cartTax, cartTotal, clearCart, brandName } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pickupTime, setPickupTime] = useState('ASAP (15-20 mins)');
  const [orderNotes, setOrderNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'apple' | 'card' | 'counter'>('apple');
  const [tipPercentage, setTipPercentage] = useState<number>(18);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderReceipt, setOrderReceipt] = useState<{
    orderId: string;
    date: string;
    pickupEstimate: string;
    items: typeof cart;
    total: number;
    tip: number;
    customer: { name: string; phone: string; email: string };
  } | null>(null);

  if (!isCheckoutOpen) return null;

  const tipAmount = (cartSubtotal * tipPercentage) / 100;
  const grandTotal = cartTotal + tipAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const orderId = `BB-${Math.floor(1000 + Math.random() * 9000)}`;
      const now = new Date();
      const pickupEstimate =
        pickupTime === 'ASAP (15-20 mins)'
          ? new Date(now.getTime() + 18 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          : pickupTime;

      setOrderReceipt({
        orderId,
        date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        pickupEstimate,
        items: [...cart],
        total: grandTotal,
        tip: tipAmount,
        customer: { name, phone, email },
      });
      clearCart();
      setIsSubmitting(false);
    }, 1200);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setOrderReceipt(null);
  };

  return (
    <div
      id="checkout-modal-overlay"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
      onClick={handleClose}
    >
      <div
        id="checkout-modal-panel"
        className="bg-[#FAF6F0] w-full max-w-2xl rounded-3xl shadow-2xl border border-[#E8DFD0] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {orderReceipt ? (
          /* Order Confirmation Screen */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-[#EBF3E8] text-[#586955] mx-auto flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#C48B54]">Order Confirmed</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#24140E]">
                We’re Crafting Your Coffee
              </h2>
              <p className="text-xs sm:text-sm text-[#7A726A] max-w-md mx-auto">
                Thank you, <strong className="text-[#24140E]">{orderReceipt.customer.name}</strong>! Your order has been sent directly to the baristas at 428 Blossom Alley.
              </p>
            </div>

            {/* Receipt Card */}
            <div className="bg-white rounded-2xl border border-[#E8DFD0] p-5 sm:p-6 space-y-5 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#F2EDE4] text-xs">
                <div>
                  <span className="text-[#7A726A]">Order Reference:</span>
                  <span className="block font-serif text-base font-bold text-[#24140E]">{orderReceipt.orderId}</span>
                </div>
                <div className="text-right">
                  <span className="text-[#7A726A]">Estimated Ready Time:</span>
                  <span className="block text-sm font-bold text-[#586955] flex items-center gap-1 justify-end">
                    <Clock className="w-3.5 h-3.5" /> {orderReceipt.pickupEstimate}
                  </span>
                </div>
              </div>

              {/* Items Summary */}
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {orderReceipt.items.map((it) => (
                  <div key={it.cartItemId} className="flex justify-between text-xs py-1">
                    <div>
                      <span className="font-semibold text-[#24140E]">{it.quantity}x {it.name}</span>
                      {it.customization && (
                        <p className="text-[11px] text-[#7A726A]">
                          {[
                            it.customization.milk,
                            it.customization.sweetness,
                            it.customization.grind,
                            it.customization.weight,
                            it.customization.extraShot ? 'Extra Shot' : '',
                          ].filter(Boolean).join(' • ')}
                        </p>
                      )}
                    </div>
                    <span className="font-medium text-[#24140E]">
                      ${(it.unitPriceWithCustomizations * it.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div className="pt-3 border-t border-[#F2EDE4] space-y-1 text-xs text-[#7A726A]">
                <div className="flex justify-between">
                  <span>Barista Tip</span>
                  <span>${orderReceipt.tip.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-serif font-bold text-sm text-[#24140E] pt-1">
                  <span>Total Paid</span>
                  <span className="text-[#C48B54]">${orderReceipt.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Pickup location note */}
              <div className="bg-[#FAF6F0] p-3 rounded-xl flex items-start gap-2.5 text-xs text-[#5C5248]">
                <MapPin className="w-4 h-4 text-[#C48B54] shrink-0 mt-0.5" />
                <div>
                  <strong>Pickup Counter:</strong> {brandName} Café, 428 Blossom Alley. Give your name or Order #{orderReceipt.orderId} upon arrival.
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 border border-[#D8CEBE] rounded-xl text-xs font-semibold text-[#24140E] hover:bg-[#EFE8DD] transition-colors flex items-center justify-center gap-1.5"
              >
                <Printer className="w-4 h-4 text-[#7A726A]" /> Print Receipt
              </button>
              <button
                onClick={handleClose}
                className="flex-1 py-3 bg-[#24140E] text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#C48B54] transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Input Form */
          <div>
            {/* Header */}
            <div className="p-5 sm:p-6 bg-white border-b border-[#E8DFD0] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#24140E] text-white flex items-center justify-center">
                  <Coffee className="w-4 h-4 text-[#C48B54]" />
                </div>
                <div>
                  <h2 className="font-serif text-lg sm:text-xl font-bold text-[#24140E]">Express Café Pickup</h2>
                  <p className="text-xs text-[#7A726A]">Freshly prepared for you at 428 Blossom Alley</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 text-[#7A726A] hover:text-[#24140E] rounded-full hover:bg-[#EFE8DD] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Pickup Time */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-[#24140E] mb-2.5">
                  1. Ready Time
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['ASAP (15-20 mins)', 'In 30 mins', 'In 45 mins', 'In 1 hour'].map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setPickupTime(time)}
                      className={`p-2.5 rounded-xl border text-xs font-medium text-center transition-all ${
                        pickupTime === time
                          ? 'bg-[#24140E] text-white border-[#24140E]'
                          : 'bg-white text-[#5C5248] border-[#D8CEBE] hover:border-[#C48B54]'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer Contact */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-[#24140E] mb-2.5">
                  2. Contact Details
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] text-[#7A726A] block mb-1">Your Full Name *</span>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Maya Lin"
                      className="w-full bg-white border border-[#D8CEBE] rounded-xl px-3.5 py-2.5 text-xs text-[#24140E] focus:outline-hidden focus:border-[#C48B54]"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#7A726A] block mb-1">Mobile Phone (for SMS Ready alert) *</span>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. (415) 555-0198"
                      className="w-full bg-white border border-[#D8CEBE] rounded-xl px-3.5 py-2.5 text-xs text-[#24140E] focus:outline-hidden focus:border-[#C48B54]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-[11px] text-[#7A726A] block mb-1">Email Address (for receipt) *</span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. maya@example.com"
                      className="w-full bg-white border border-[#D8CEBE] rounded-xl px-3.5 py-2.5 text-xs text-[#24140E] focus:outline-hidden focus:border-[#C48B54]"
                    />
                  </div>
                </div>
              </div>

              {/* Barista notes */}
              <div>
                <span className="text-[11px] text-[#7A726A] block mb-1">Order Notes (Optional)</span>
                <input
                  type="text"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="e.g. Please pack coffee beans with gift bag"
                  className="w-full bg-white border border-[#D8CEBE] rounded-xl px-3.5 py-2 text-xs text-[#24140E] focus:outline-hidden focus:border-[#C48B54]"
                />
              </div>

              {/* Tip Selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-[#24140E] mb-2">
                  Support Our Barista Team
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[0, 15, 18, 22].map((tip) => (
                    <button
                      key={tip}
                      type="button"
                      onClick={() => setTipPercentage(tip)}
                      className={`py-2 rounded-xl border text-xs font-medium text-center transition-all ${
                        tipPercentage === tip
                          ? 'bg-[#C48B54] text-white border-[#C48B54]'
                          : 'bg-white text-[#5C5248] border-[#D8CEBE] hover:border-[#C48B54]'
                      }`}
                    >
                      {tip === 0 ? 'No Tip' : `${tip}%`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-[#24140E] mb-2.5">
                  3. Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'apple', label: 'Apple Pay / GPay', icon: Sparkles },
                    { id: 'card', label: 'Credit Card', icon: CreditCard },
                    { id: 'counter', label: 'Pay at Counter', icon: Coffee },
                  ].map((method) => {
                    const Icon = method.icon;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id as any)}
                        className={`p-3 rounded-xl border text-xs font-medium flex flex-col items-center gap-1.5 transition-all ${
                          paymentMethod === method.id
                            ? 'bg-[#24140E] text-white border-[#24140E]'
                            : 'bg-white text-[#5C5248] border-[#D8CEBE] hover:border-[#C48B54]'
                        }`}
                      >
                        <Icon className="w-4 h-4 text-[#C48B54]" />
                        <span>{method.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Summary box */}
              <div className="bg-white p-4 rounded-2xl border border-[#E8DFD0] space-y-2 text-xs text-[#7A726A]">
                <div className="flex justify-between">
                  <span>Subtotal ({cart.length} items)</span>
                  <span>${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes (8.5%)</span>
                  <span>${cartTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Barista Tip ({tipPercentage}%)</span>
                  <span>${tipAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-serif font-bold text-sm text-[#24140E] pt-2 border-t border-[#F2EDE4]">
                  <span>Total Due</span>
                  <span className="text-[#C48B54]">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                id="place-order-submit-btn"
                disabled={isSubmitting}
                className="w-full bg-[#24140E] hover:bg-[#C48B54] text-white py-4 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    Transmitting Order to Baristas...
                  </span>
                ) : (
                  <>
                    <span>Confirm & Place Order • ${grandTotal.toFixed(2)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-[#9E9488] flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#586955]" />
                Encrypted & Verified Pickup Order • No Payment Gateway Key Required for Preview
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
