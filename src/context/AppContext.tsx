import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PageType, CartItem, MenuItem, CoffeeProduct, ToastMessage, CartCustomization } from '../types';
import { DEFAULT_BRAND } from '../data/brand';

interface AppContextType {
  activePage: PageType;
  setActivePage: (page: PageType) => void;
  navigateTo: (page: PageType, hash?: string) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (item: MenuItem | CoffeeProduct, customization?: CartCustomization, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartTax: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Modals
  customizerItem: MenuItem | CoffeeProduct | null;
  setCustomizerItem: (item: MenuItem | CoffeeProduct | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isReservationOpen: boolean;
  setIsReservationOpen: (open: boolean) => void;
  isBrandModalOpen: boolean;
  setIsBrandModalOpen: (open: boolean) => void;

  // Brand Name
  brandName: string;
  setBrandName: (name: string) => void;
  
  // Lightbox
  lightboxImage: { url: string; title: string; caption: string; category: string } | null;
  setLightboxImage: (img: { url: string; title: string; caption: string; category: string } | null) => void;

  // Search & Filters
  globalSearch: string;
  setGlobalSearch: (q: string) => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (title: string, description: string, type?: 'success' | 'info' | 'cart') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'udaya_coffee_cart_v1';
const BRAND_STORAGE_KEY = 'udaya_coffee_brand_name_v1';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activePage, setActivePageState] = useState<PageType>('home');
  const [brandName, setBrandNameState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(BRAND_STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_BRAND.name;
    } catch {
      return DEFAULT_BRAND.name;
    }
  });
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);

  const setBrandName = (name: string) => {
    setBrandNameState(name);
    try {
      localStorage.setItem(BRAND_STORAGE_KEY, JSON.stringify(name));
    } catch {
      // Storage unavailable fallback
    }
  };
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [customizerItem, setCustomizerItem] = useState<MenuItem | CoffeeProduct | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string; caption: string; category: string } | null>(null);
  const [globalSearch, setGlobalSearch] = useState('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Storage unavailable fallback
    }
  }, [cart]);

  // Sync hash routing if present
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['home', 'story', 'menu', 'coffee', 'experience', 'contact', 'order'].includes(hash)) {
        setActivePageState(hash as PageType);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const setActivePage = (page: PageType) => {
    setActivePageState(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (page: PageType, hashTarget?: string) => {
    setActivePage(page);
    if (hashTarget) {
      setTimeout(() => {
        const el = document.getElementById(hashTarget);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  };

  const addToast = (title: string, description: string, type: 'success' | 'info' | 'cart' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (
    item: MenuItem | CoffeeProduct,
    customization?: CartCustomization,
    quantity: number = 1
  ) => {
    let priceMultiplier = 0;
    if (customization?.extraShot) priceMultiplier += 0.95;
    if (customization?.weight === '500g') priceMultiplier += 12;
    if (customization?.weight === '1kg') priceMultiplier += 28;

    const unitPrice = item.price + priceMultiplier;
    const customKey = customization ? JSON.stringify(customization) : 'default';
    const cartItemId = `${item.id}-${customKey}`;

    setCart((prev) => {
      const existing = prev.find((ci) => ci.cartItemId === cartItemId);
      if (existing) {
        return prev.map((ci) =>
          ci.cartItemId === cartItemId
            ? { ...ci, quantity: ci.quantity + quantity }
            : ci
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          itemId: item.id,
          name: item.name,
          category: 'category' in item ? item.category : 'Beans',
          price: item.price,
          quantity,
          image: item.image,
          customization,
          unitPriceWithCustomizations: unitPrice,
        },
      ];
    });

    addToast('Added to Order', `${quantity}x ${item.name} added to your bag.`, 'cart');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.unitPriceWithCustomizations * item.quantity,
    0
  );
  const cartTax = cartSubtotal * 0.085; // 8.5%
  const cartTotal = cartSubtotal + cartTax;

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        navigateTo,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartTax,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        customizerItem,
        setCustomizerItem,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isReservationOpen,
        setIsReservationOpen,
        isBrandModalOpen,
        setIsBrandModalOpen,
        brandName,
        setBrandName,
        lightboxImage,
        setLightboxImage,
        globalSearch,
        setGlobalSearch,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
