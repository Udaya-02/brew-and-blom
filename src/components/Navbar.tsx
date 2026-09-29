import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PageType } from '../types';
import { ShoppingBag, Menu as MenuIcon, X, Coffee, Calendar, Search } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activePage, setActivePage, cartCount, setIsCartOpen, setIsReservationOpen, setGlobalSearch, navigateTo, brandName, setIsBrandModalOpen } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; page: PageType }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Our Story', page: 'story' },
    { label: 'Menu', page: 'menu' },
    { label: 'Coffee', page: 'coffee' },
    { label: 'Experience', page: 'experience' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: PageType) => {
    setActivePage(page);
    setMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setGlobalSearch(localSearch.trim());
      setActivePage('menu');
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const isHome = activePage === 'home';
  const isDarkHero = isHome && !isScrolled;

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FDFBF7]/95 backdrop-blur-md shadow-xs border-b border-[#E8E0D2] py-3.5'
            : isHome
            ? 'bg-gradient-to-b from-black/60 via-black/30 to-transparent text-white py-5'
            : 'bg-[#FDFBF7] border-b border-[#E8E0D2] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            id="nav-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group transition-transform focus:outline-none"
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                isDarkHero
                  ? 'bg-white/15 text-white group-hover:bg-[#C68E5C]'
                  : 'bg-[#3D2B1F] text-[#FDFBF7] group-hover:bg-[#C68E5C]'
              }`}
            >
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <span
                className={`block font-serif text-lg tracking-wider font-semibold uppercase leading-tight ${
                  isDarkHero ? 'text-white' : 'text-[#3D2B1F]'
                }`}
              >
                {brandName}
              </span>
              <span
                className={`block text-[9px] tracking-[0.22em] uppercase font-medium ${
                  isDarkHero ? 'text-white/75' : 'text-[#736760]'
                }`}
              >
                Specialty Roastery • San Francisco
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = activePage === link.page;
              return (
                <button
                  key={link.page}
                  id={`nav-link-${link.page}`}
                  onClick={() => handleNavClick(link.page)}
                  className={`px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-medium tracking-wide transition-all relative ${
                    isActive
                      ? isDarkHero
                        ? 'text-white bg-white/20 font-semibold'
                        : 'text-[#3D2B1F] bg-[#EFE8DD] font-semibold'
                      : isDarkHero
                      ? 'text-white/85 hover:text-white hover:bg-white/10'
                      : 'text-[#5C4F46] hover:text-[#3D2B1F] hover:bg-[#EFE8DD]/60'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${
                        isDarkHero ? 'bg-[#C68E5C]' : 'bg-[#C68E5C]'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              id="search-toggle-btn"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search Menu"
              className={`p-2 rounded-full transition-colors ${
                isDarkHero
                  ? 'text-white hover:bg-white/15'
                  : 'text-[#3D2B1F] hover:bg-[#EFE8DD]'
              }`}
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Book Table Button */}
            <button
              id="reserve-table-btn"
              onClick={() => setIsReservationOpen(true)}
              className={`hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                isDarkHero
                  ? 'border-white/30 text-white hover:bg-white/15'
                  : 'border-[#D8CEBE] text-[#3D2B1F] hover:bg-[#EFE8DD]'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-[#C68E5C]" />
              <span>Reserve Table</span>
            </button>

            {/* Cart Button */}
            <button
              id="cart-drawer-trigger"
              onClick={() => setIsCartOpen(true)}
              aria-label="View Shopping Bag"
              className={`relative p-2 rounded-full transition-colors flex items-center justify-center ${
                isDarkHero
                  ? 'text-white hover:bg-white/15'
                  : 'text-[#3D2B1F] hover:bg-[#EFE8DD]'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span
                  id="cart-badge-count"
                  className="absolute -top-1 -right-1 bg-[#C68E5C] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs animate-scale"
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Order Now CTA */}
            <button
              id="header-order-now-btn"
              onClick={() => navigateTo('order')}
              className={`hidden sm:inline-flex items-center justify-center px-4.5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold shadow-xs transition-all transform active:scale-95 ${
                isDarkHero
                  ? 'bg-[#C68E5C] text-white hover:bg-[#B57E4E] shadow-black/20'
                  : 'bg-[#3D2B1F] text-[#FDFBF7] hover:bg-[#2A1D15] shadow-[#3D2B1F]/10'
              }`}
            >
              Order Now
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className={`md:hidden p-2 rounded-full transition-colors ${
                isDarkHero
                  ? 'text-white hover:bg-white/15'
                  : 'text-[#3D2B1F] hover:bg-[#EFE8DD]'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Expandable Search Input Bar */}
        {searchOpen && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-3 pb-2 animate-fade-in">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                id="header-search-input"
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search specialty coffee, cold brew, matcha, croissants..."
                autoFocus
                className="w-full bg-white text-[#3D2B1F] pl-10 pr-24 py-2.5 rounded-full border border-[#D8CEBE] shadow-md text-sm placeholder:text-[#9E9488] focus:outline-hidden focus:border-[#C68E5C] focus:ring-1 focus:ring-[#C68E5C]"
              />
              <Search className="w-4 h-4 text-[#736760] absolute left-3.5" />
              <div className="absolute right-2 flex items-center gap-1.5">
                <button
                  type="submit"
                  className="px-3.5 py-1 bg-[#C68E5C] text-white text-xs rounded-full font-medium hover:bg-[#B57E4E] transition-colors"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="p-1 text-[#736760] hover:text-[#3D2B1F]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Animated Slide-down Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-overlay"
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-xs md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            id="mobile-nav-panel"
            className="bg-[#FDFBF7] w-full max-w-sm ml-auto h-full p-6 pt-24 flex flex-col justify-between shadow-2xl border-l border-[#E8E0D2] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center gap-3 pb-6 border-b border-[#E8E0D2]">
                <div className="w-10 h-10 rounded-full bg-[#3D2B1F] text-[#FDFBF7] flex items-center justify-center">
                  <Coffee className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#3D2B1F]">{brandName}</h3>
                  <p className="text-xs text-[#736760] tracking-wider uppercase">Artisanal Coffee & Roastery</p>
                </div>
              </div>

              {/* Mobile links */}
              <div className="flex flex-col gap-2 mt-6">
                {navLinks.map((link) => {
                  const isActive = activePage === link.page;
                  return (
                    <button
                      key={link.page}
                      id={`mobile-nav-${link.page}`}
                      onClick={() => handleNavClick(link.page)}
                      className={`text-left px-4 py-3 rounded-xl text-base font-medium transition-colors flex items-center justify-between ${
                        isActive
                          ? 'bg-[#EFE8DD] text-[#3D2B1F] font-semibold border-l-4 border-[#C68E5C]'
                          : 'text-[#5C4F46] hover:bg-[#EFE8DD]/50'
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && <span className="w-2 h-2 rounded-full bg-[#C68E5C]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="pt-6 border-t border-[#E8E0D2] space-y-3">
              <button
                id="mobile-reserve-btn"
                onClick={() => {
                  setIsReservationOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-full border border-[#3D2B1F] text-[#3D2B1F] font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#EFE8DD] transition-colors"
              >
                <Calendar className="w-4 h-4 text-[#C68E5C]" />
                <span>Reserve a Table</span>
              </button>

              <button
                id="mobile-order-btn"
                onClick={() => {
                  navigateTo('order');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-full bg-[#3D2B1F] text-[#FDFBF7] font-semibold text-sm uppercase tracking-wider shadow-md hover:bg-[#2A1D15] transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-[#C68E5C]" />
                <span>Order Ahead Now</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
