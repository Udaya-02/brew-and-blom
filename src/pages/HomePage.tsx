import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SIGNATURE_COFFEES, TESTIMONIALS, INSTAGRAM_POSTS } from '../data/coffeeData';
import { ArrowRight, ChevronDown, Star, Sparkles, Coffee, Heart, MessageCircle, ChevronLeft, ChevronRight, Check } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigateTo, setCustomizerItem, addToast, brandName } = useApp();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Auto-rotate testimonial
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      setNewsletterSubscribed(true);
      addToast('Subscribed to Journal', `Welcome to ${brandName} notes.`, 'success');
      setTimeout(() => {
        setNewsletterEmail('');
        setNewsletterSubscribed(false);
      }, 4000);
    }
  };

  return (
    <div id="home-page" className="animate-fade-in">
      {/* 1. HERO SECTION */}
      <section
        id="hero-section"
        className="relative min-h-screen flex items-center justify-center text-white overflow-hidden"
      >
        {/* Cinematic Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2000&auto=format&fit=crop"
            alt="Warm morning specialty coffee atmosphere with latte art, beans and timber table"
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-10000 hover:scale-100"
          />
          {/* Multi-layered cinematic shadows */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C130E] via-[#1C130E]/50 to-[#1C130E]/65" />
          <div className="absolute inset-0 bg-black/25" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-20">
          {/* Subtle Tagline */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FDFBF7] text-xs uppercase tracking-[0.25em] font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#C68E5C]" />
            <span>Specialty Roastery & Botanical Café</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#FDFBF7] leading-[1.1] mb-6">
            Slow Mornings. <br />
            <span className="italic font-normal font-display text-[#EEDBC5]">
              Beautiful Coffee.
            </span>
          </h1>

          {/* Supporting text */}
          <p className="text-base sm:text-xl text-[#E8DFD0] max-w-2xl mx-auto font-light leading-relaxed mb-10">
            Thoughtfully roasted coffee, handcrafted drinks, and warm moments made for lingering.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="hero-explore-menu-btn"
              onClick={() => navigateTo('menu')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-[#3D2B1F] font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#FDFBF7] hover:shadow-xl transition-all transform active:scale-95 shadow-md flex items-center justify-center gap-2 group"
            >
              <span>Explore Our Menu</span>
              <ArrowRight className="w-4 h-4 text-[#C68E5C] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="hero-order-coffee-btn"
              onClick={() => navigateTo('order')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#C68E5C] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#B57E4E] hover:shadow-xl transition-all transform active:scale-95 shadow-md flex items-center justify-center gap-2"
            >
              <span>Order Your Coffee</span>
            </button>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer"
          onClick={() => {
            const nextSec = document.getElementById('signature-section');
            if (nextSec) nextSec.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Scroll to Discover</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* 2. SIGNATURE COFFEE SECTION */}
      <section id="signature-section" className="py-24 bg-[#FDFBF7] px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#C68E5C]">
            Specialty Creations
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#3D2B1F]">
            Crafted With Intention
          </h2>
          <p className="text-sm sm:text-base text-[#736760] leading-relaxed">
            Every signature drink is precisely balanced to highlight the distinct terroir of our direct-trade roasts.
          </p>
        </div>

        {/* 4 Premium Coffee Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {SIGNATURE_COFFEES.map((drink) => (
            <div
              key={drink.id}
              id={`sig-card-${drink.id}`}
              className="bg-white rounded-3xl overflow-hidden border border-[#E8E0D2] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Card Image */}
              <div className="relative h-64 overflow-hidden bg-[#EFE8DD]">
                <img
                  src={drink.image}
                  alt={drink.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-serif font-bold text-[#3D2B1F] shadow-xs">
                  ${drink.price.toFixed(2)}
                </div>
                {drink.isBestSeller && (
                  <div className="absolute top-4 left-4 bg-[#C68E5C] text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-xs">
                    Signature
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#3D2B1F] group-hover:text-[#C68E5C] transition-colors">
                    {drink.name}
                  </h3>
                  <p className="text-xs text-[#736760] leading-relaxed mt-2 line-clamp-3">
                    {drink.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F2EDE4] flex items-center justify-between">
                  <span className="text-[11px] text-[#9E9488] uppercase tracking-wider font-medium">
                    {drink.temperature} • {drink.calories}
                  </span>
                  <button
                    id={`add-order-btn-${drink.id}`}
                    onClick={() => setCustomizerItem(drink)}
                    className="px-4 py-2 rounded-full bg-[#3D2B1F] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#C68E5C] transition-colors shadow-xs"
                  >
                    Add to Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Menu Link */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigateTo('menu')}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#3D2B1F] hover:text-[#C68E5C] transition-colors group"
          >
            <span>Explore Complete Café Menu ({SIGNATURE_COFFEES.length * 5}+ Items)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#C68E5C]" />
          </button>
        </div>
      </section>

      {/* 3. OUR STORY PREVIEW (Split Layout) */}
      <section id="story-preview-section" className="py-24 bg-[#EFE8DD]/60 border-y border-[#E8E0D2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Beautiful Café Image with Badge */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#D8CEBE]">
                <img
                  src="https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=1200&auto=format&fit=crop"
                  alt={`${brandName} cozy cafe interior with warm sunlight and plants`}
                  className="w-full h-[450px] sm:h-[520px] object-cover"
                />
              </div>

              {/* Floating aesthetic badge */}
              <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3 bg-[#3D2B1F] text-white p-5 rounded-2xl shadow-xl border border-[#4F392B]">
                <div className="w-12 h-12 rounded-full bg-[#C68E5C] text-[#3D2B1F] flex items-center justify-center font-serif text-lg font-bold">
                  8+
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold leading-tight">Years of Craft</h4>
                  <p className="text-[11px] text-[#B8AEA5]">Direct-Trade Specialty Roasting</p>
                </div>
              </div>
            </div>

            {/* Right: Story Philosophy */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#C68E5C]">
                  Our Philosophy
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#3D2B1F] leading-tight">
                  More Than Just Coffee
                </h2>
              </div>

              <p className="text-sm sm:text-base text-[#5C4F46] leading-relaxed">
                {brandName} was founded on a simple belief: the best coffee is an invitation to slow down. We partner directly with multigenerational farming families across Ethiopia, Colombia, and Guatemala, paying ethical premiums to support regenerative soil health.
              </p>

              {/* 4 Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  { title: 'Small-Batch Roasting', desc: 'Crafted weekly on eco-smart convection roasters.' },
                  { title: 'Fresh Ingredients', desc: 'Organic pasture-raised dairy & house syrups.' },
                  { title: 'Handcrafted Beverages', desc: 'Extracted by dedicated certified baristas.' },
                  { title: 'Sustainable Sourcing', desc: '100% shade-grown & direct-trade beans.' },
                ].map((hl, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white/80 p-3.5 rounded-2xl border border-[#E8E0D2]">
                    <div className="w-7 h-7 rounded-full bg-[#3D2B1F] text-[#C68E5C] flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xs font-bold text-[#3D2B1F]">{hl.title}</h3>
                      <p className="text-[11px] text-[#736760]">{hl.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  id="discover-story-cta-btn"
                  onClick={() => navigateTo('story')}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#3D2B1F] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#C68E5C] transition-colors shadow-md group"
                >
                  <span>Discover Our Story</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#C68E5C]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COFFEE MOMENTS SECTION (Editorial Layout) */}
      <section id="coffee-moments-section" className="py-24 bg-[#FDFBF7] px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#C68E5C]">
            Everyday Rituals
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#3D2B1F]">
            Coffee Moments
          </h2>
          <p className="text-sm text-[#736760]">
            Designed for how you move through the day.
          </p>
        </div>

        {/* 3 Editorial Moments */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Moment 1 */}
          <div className="bg-white rounded-3xl overflow-hidden border border-[#E8E0D2] shadow-xs group flex flex-col">
            <div className="h-72 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=900&auto=format&fit=crop"
                alt="Morning coffee extraction"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider text-[#3D2B1F]">
                07:00 AM – 11:00 AM
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-xs text-[#C68E5C] font-semibold uppercase tracking-wider">
                  Morning Ritual
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#3D2B1F]">
                  “Start gently.”
                </h3>
                <p className="text-xs text-[#736760] leading-relaxed">
                  Quiet sunlight streaming through the windows, freshly toasted sourdough, and a hot, balanced pour-over to awaken your morning.
                </p>
              </div>
              <button
                onClick={() => navigateTo('menu')}
                className="text-xs font-bold uppercase tracking-wider text-[#3D2B1F] hover:text-[#C68E5C] transition-colors text-left flex items-center gap-1.5"
              >
                <span>Morning Menu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Moment 2 */}
          <div className="bg-white rounded-3xl overflow-hidden border border-[#E8E0D2] shadow-xs group flex flex-col md:-translate-y-4">
            <div className="h-72 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=900&auto=format&fit=crop"
                alt="Cold brew afternoon pause"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider text-[#3D2B1F]">
                12:00 PM – 04:00 PM
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-xs text-[#C68E5C] font-semibold uppercase tracking-wider">
                  Afternoon Pause
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#3D2B1F]">
                  “Take a moment.”
                </h3>
                <p className="text-xs text-[#736760] leading-relaxed">
                  Recharge your afternoon with an ice-cold vanilla cold brew, a flaky almond croissant, and comfortable acoustic workspaces.
                </p>
              </div>
              <button
                onClick={() => navigateTo('experience')}
                className="text-xs font-bold uppercase tracking-wider text-[#3D2B1F] hover:text-[#C68E5C] transition-colors text-left flex items-center gap-1.5"
              >
                <span>The Café Atmosphere</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Moment 3 */}
          <div className="bg-white rounded-3xl overflow-hidden border border-[#E8E0D2] shadow-xs group flex flex-col">
            <div className="h-72 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=900&auto=format&fit=crop"
                alt="Evening conversations over hot drinks"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider text-[#3D2B1F]">
                05:00 PM – 09:00 PM
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-xs text-[#C68E5C] font-semibold uppercase tracking-wider">
                  Evening Conversations
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#3D2B1F]">
                  “Stay a little longer.”
                </h3>
                <p className="text-xs text-[#736760] leading-relaxed">
                  Dimmed candlelit timber tables, soothing herbal infusions, decaf sugarcane espresso, and unhurried discussions with friends.
                </p>
              </div>
              <button
                onClick={() => navigateTo('contact')}
                className="text-xs font-bold uppercase tracking-wider text-[#3D2B1F] hover:text-[#C68E5C] transition-colors text-left flex items-center gap-1.5"
              >
                <span>Hours & Directions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS SLIDER SECTION */}
      <section id="testimonials-section" className="py-24 bg-[#231812] text-[#FDFBF7] relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C68E5C]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#C68E5C]">
            Community Voices
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-2 mb-12">
            Loved By Our Neighbors & Coffee Aficionados
          </h2>

          {/* Testimonial Active Card */}
          <div className="bg-[#2E2018] p-8 sm:p-12 rounded-3xl border border-[#443227] shadow-2xl relative min-h-[260px] flex flex-col justify-between">
            {/* Stars */}
            <div className="flex items-center justify-center gap-1 text-[#C68E5C] mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>

            {/* Quote */}
            <p className="font-serif text-lg sm:text-2xl text-white/95 italic leading-relaxed max-w-2xl mx-auto">
              “{TESTIMONIALS[currentTestimonial].quote}”
            </p>

            {/* Author info */}
            <div className="mt-8 pt-6 border-t border-[#443227]/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="text-left">
                <strong className="block text-sm font-semibold text-white">
                  {TESTIMONIALS[currentTestimonial].author}
                </strong>
                <span className="text-[#B8AEA5]">
                  {TESTIMONIALS[currentTestimonial].role} • {TESTIMONIALS[currentTestimonial].location}
                </span>
              </div>

              <div className="bg-[#3D2B1F] px-3 py-1.5 rounded-full text-[11px] text-[#C68E5C] font-medium">
                Favorite: {TESTIMONIALS[currentTestimonial].drinkFavorite}
              </div>
            </div>
          </div>

          {/* Slider controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() =>
                setCurrentTestimonial(
                  (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
                )
              }
              className="p-2.5 rounded-full bg-[#2E2018] hover:bg-[#C68E5C] hover:text-[#231812] text-white border border-[#443227] transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`h-2 rounded-full transition-all ${
                    currentTestimonial === i ? 'w-6 bg-[#C68E5C]' : 'w-2 bg-white/20'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() =>
                setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length)
              }
              className="p-2.5 rounded-full bg-[#2E2018] hover:bg-[#C68E5C] hover:text-[#231812] text-white border border-[#443227] transition-colors"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. INSTAGRAM-STYLE SECTION */}
      <section id="instagram-section" className="py-24 bg-[#FDFBF7] px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#C68E5C]">
              @udayacoffee
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3D2B1F]">
              A Little More {brandName}
            </h2>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-full border border-[#3D2B1F] text-[#3D2B1F] text-xs font-semibold uppercase tracking-wider hover:bg-[#3D2B1F] hover:text-white transition-colors"
          >
            Follow Our Journey
          </a>
        </div>

        {/* 6 Unique Square Images */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              className="relative aspect-square rounded-2xl overflow-hidden group shadow-xs border border-[#E8E0D2] cursor-pointer"
              onClick={() => addToast('Instagram Story', post.caption, 'info')}
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-[#3D2B1F]/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 text-white">
                <div className="flex items-center justify-end gap-3 text-xs font-semibold">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-[#C68E5C] fill-current" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5" /> {post.comments}
                  </span>
                </div>
                <p className="text-[11px] line-clamp-3 leading-relaxed text-white/90">
                  {post.caption}
                </p>
                <span className="text-[10px] text-[#C68E5C] font-semibold">{post.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. NEWSLETTER SECTION */}
      <section id="newsletter-section" className="py-20 bg-[#EFE8DD] border-t border-[#E8E0D2]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-[#3D2B1F] text-[#C68E5C] mx-auto flex items-center justify-center shadow-md">
            <Coffee className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3D2B1F]">
              Good Things Are Brewing.
            </h2>
            <p className="text-sm sm:text-base text-[#5C4F46] max-w-xl mx-auto leading-relaxed">
              Join our coffee journal for new roasts, seasonal drinks, café stories, and occasional surprises.
            </p>
          </div>

          <form onSubmit={handleNewsletter} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              id="homepage-newsletter-email"
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 bg-white border border-[#D8CEBE] rounded-full px-5 py-3.5 text-xs text-[#3D2B1F] placeholder:text-[#9E9488] focus:outline-hidden focus:border-[#C68E5C] shadow-xs"
            />
            <button
              type="submit"
              id="homepage-newsletter-submit-btn"
              className="px-8 py-3.5 bg-[#3D2B1F] hover:bg-[#C68E5C] text-white font-semibold text-xs uppercase tracking-wider rounded-full transition-colors shadow-md flex items-center justify-center gap-2 shrink-0"
            >
              {newsletterSubscribed ? (
                <>
                  <Check className="w-4 h-4" /> Subscribed
                </>
              ) : (
                <span>Subscribe</span>
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
