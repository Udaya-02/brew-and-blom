import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageType } from '../types';
import { Coffee, Instagram, Facebook, MapPin, Phone, Mail, Clock, ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage, addToast, brandName, setIsBrandModalOpen } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      addToast('Welcome to the Journal', `Thank you for subscribing to ${brandName} notes.`, 'success');
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  const navLinks: { label: string; page: PageType }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Our Story', page: 'story' },
    { label: 'Menu', page: 'menu' },
    { label: 'Coffee Collection', page: 'coffee' },
    { label: 'The Experience', page: 'experience' },
    { label: 'Contact & Visit', page: 'contact' },
    { label: 'Order Online', page: 'order' },
  ];

  return (
    <footer id="main-footer" className="bg-[#231812] text-[#FDFBF7] pt-16 pb-12 border-t border-[#3D2B1F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#3D2B1F]/80">
          {/* Col 1 & 2: Brand & Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C68E5C] text-[#231812] flex items-center justify-center font-bold">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-serif text-xl font-bold tracking-wider uppercase text-white">
                  {brandName}
                </span>
                <span className="block text-[10px] text-[#C68E5C] tracking-[0.25em] uppercase font-medium">
                  Artisanal Roastery • Sanctuary
                </span>
              </div>
            </div>

            <p className="text-sm text-[#B8AEA5] leading-relaxed max-w-sm">
              A boutique specialty coffee roastery and neighborhood sanctuary in San Francisco. Dedicated to single-origin micro-lots, regenerative agriculture, and slow morning rituals.
            </p>

            {/* Quick Rename / Brand Settings Action */}
            <div className="pt-1">
              <button
                onClick={() => setIsBrandModalOpen(true)}
                className="inline-flex items-center gap-2 text-xs text-[#C68E5C] hover:text-[#e0ab7d] underline underline-offset-4 transition-colors font-medium"
              >
                <span>✏️ Change Coffee Shop Name</span>
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                id="footer-social-instagram"
                className="w-9 h-9 rounded-full bg-[#35261E] hover:bg-[#C68E5C] hover:text-[#231812] text-[#EFE8DD] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                id="footer-social-facebook"
                className="w-9 h-9 rounded-full bg-[#35261E] hover:bg-[#C68E5C] hover:text-[#231812] text-[#EFE8DD] flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                id="footer-social-pinterest"
                className="w-9 h-9 rounded-full bg-[#35261E] hover:bg-[#C68E5C] hover:text-[#231812] text-[#EFE8DD] flex items-center justify-center transition-colors text-xs font-bold"
                aria-label="Pinterest"
              >
                P
              </a>
            </div>
          </div>

          {/* Col 3: Navigation Links */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#EFE8DD] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-[#B8AEA5]">
              {navLinks.slice(0, 5).map((link) => (
                <li key={link.page}>
                  <button
                    id={`footer-nav-${link.page}`}
                    onClick={() => setActivePage(link.page)}
                    className="hover:text-[#C68E5C] transition-colors focus:outline-none"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Opening Hours & Location */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#EFE8DD] mb-4">
              Visit Us
            </h4>
            <div className="space-y-3 text-xs text-[#B8AEA5]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C68E5C] shrink-0 mt-0.5" />
                <span>
                  428 Blossom Alley<br />
                  Historic Roastery District<br />
                  San Francisco, CA 94107
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#C68E5C] shrink-0 mt-0.5" />
                <div>
                  <p><strong className="text-white">Mon – Fri:</strong> 7:00 AM – 9:00 PM</p>
                  <p><strong className="text-white">Sat – Sun:</strong> 8:00 AM – 10:00 PM</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-[#C68E5C] shrink-0" />
                <a href="tel:4155550192" className="hover:text-white transition-colors">
                  (415) 555-0192
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C68E5C] shrink-0" />
                <a href="mailto:hello@udayacoffee.com" className="hover:text-white transition-colors">
                  hello@udayacoffee.com
                </a>
              </div>
            </div>
          </div>

          {/* Col 5: Coffee Journal Newsletter */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#EFE8DD] mb-2">
              Coffee Journal
            </h4>
            <p className="text-xs text-[#B8AEA5] leading-relaxed mb-4">
              Receive seasonal reserve announcements, brewing tips, and invitations to private cuppings.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  id="footer-newsletter-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-[#35261E] border border-[#4A372C] rounded-lg px-3.5 py-2 text-xs text-white placeholder:text-[#8C7F73] focus:outline-hidden focus:border-[#C68E5C]"
                />
              </div>
              <button
                type="submit"
                id="footer-newsletter-submit"
                className="w-full bg-[#C68E5C] hover:bg-[#B57E4E] text-[#231812] font-semibold text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Subscribed
                  </>
                ) : (
                  <>
                    Subscribe <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C7F73]">
          <p>© 2026 {brandName}. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => setActivePage('story')} className="hover:text-[#FDFBF7] transition-colors">
              Sustainability & Direct Trade
            </button>
            <button onClick={() => setActivePage('contact')} className="hover:text-[#FDFBF7] transition-colors">
              Privacy & Terms
            </button>
            <button onClick={() => setActivePage('menu')} className="hover:text-[#FDFBF7] transition-colors">
              Dietary & Allergens
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
