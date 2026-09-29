export type PageType = 
  | 'home' 
  | 'story' 
  | 'menu' 
  | 'coffee' 
  | 'experience' 
  | 'contact' 
  | 'order';

export interface MenuItem {
  id: string;
  name: string;
  category: 'espresso' | 'cold' | 'tea' | 'bakery' | 'breakfast';
  description: string;
  price: number;
  image: string;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isBestSeller?: boolean;
  calories?: string;
  temperature?: 'Hot' | 'Iced' | 'Both';
}

export interface CoffeeProduct {
  id: string;
  name: string;
  tagline: string;
  roastLevel: 'Light' | 'Light-Medium' | 'Medium' | 'Medium-Dark' | 'Dark';
  origin: string;
  altitude: string;
  process: string;
  flavorNotes: string[];
  weight: string;
  price: number;
  badge?: 'BESTSELLER' | 'NEW' | 'SINGLE ORIGIN' | 'LIMITED EDITION' | 'ORGANIC';
  image: string;
  description: string;
  brewRecommendation: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'coffee' | 'cafe' | 'people' | 'food' | 'behind';
  image: string;
  caption: string;
  aspect: 'square' | 'portrait' | 'landscape';
}

export interface StoryMilestone {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tag: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  rating: number;
  drinkFavorite: string;
}

export interface CartCustomization {
  milk?: 'Oat Milk' | 'Almond Milk' | 'Whole Milk' | 'Skim Milk' | 'Coconut Milk';
  sweetness?: '0% (Unsweetened)' | '25% (Light)' | '50% (Standard)' | '100% (Extra Sweet)';
  ice?: 'No Ice' | 'Light Ice' | 'Standard Ice' | 'Extra Cold';
  extraShot?: boolean;
  grind?: 'Whole Bean' | 'Pour Over (Medium)' | 'Espresso (Fine)' | 'French Press (Coarse)';
  weight?: '250g' | '500g' | '1kg';
  notes?: string;
}

export interface CartItem {
  cartItemId: string;
  itemId: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
  customization?: CartCustomization;
  unitPriceWithCustomizations: number;
}

export interface ReservationData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingPreference: 'Indoor Lounge' | 'Sunlit Window Banquette' | 'Coffee Bar View' | 'Garden Patio';
  specialOccasion?: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  description: string;
  type: 'success' | 'info' | 'cart';
}
