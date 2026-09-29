import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Calendar, Coffee, Music, Sun, Users, Flame, BookOpen, ArrowRight } from 'lucide-react';

export const ExperiencePage: React.FC = () => {
  const { setIsReservationOpen, navigateTo } = useApp();
  const [activeBrewGuide, setActiveBrewGuide] = useState<'v60' | 'french' | 'aeropress' | 'espresso'>('v60');

  const brewGuides = {
    v60: {
      title: 'Hario V60 Pour-Over',
      ratio: '1:16 Ratio (18g coffee to 288g water)',
      temp: '93°C / 200°F Filtered Water',
      time: '3:00 - 3:30 Minutes Total',
      steps: [
        'Rinse paper filter with hot water and discard rinse water.',
        'Add 18g medium-fine ground coffee. Create a shallow well in center.',
        'Bloom with 50g hot water for 45 seconds to release trapped CO2.',
        'Pour remaining water in slow, concentric circles without touching paper walls.',
        'Allow gentle drawdown and swirl decanter before serving in warm ceramic.',
      ],
      recommendedRoast: 'Ethiopian Yirgacheffe or Udaya Dawn Morning Roast',
    },
    french: {
      title: 'Classic French Press',
      ratio: '1:15 Ratio (30g coarse coffee to 450g water)',
      temp: '95°C / 203°F Water',
      time: '4:00 Minutes Steep Time',
      steps: [
        'Pre-warm glass carafe with boiling water, then empty completely.',
        'Add 30g coarse sea-salt grind coffee into the base.',
        'Pour 450g hot water vigorously to saturate all grounds evenly.',
        'Place plunger lid on top without pressing down; steep for 4 minutes.',
        'Skim surface foam with a spoon, press plunger slowly, and decant immediately.',
      ],
      recommendedRoast: 'House Blend No. 1 or Guatemala Volcanic Antigua',
    },
    aeropress: {
      title: 'Inverted Aeropress Method',
      ratio: '1:14 Ratio (15g medium-fine coffee to 210g water)',
      temp: '88°C / 190°F Water',
      time: '2:00 Minutes Total',
      steps: [
        'Set Aeropress in inverted position with plunger set at number 4.',
        'Add 15g freshly ground coffee.',
        'Pour 210g hot water, stir 5 times vigorously with paddle.',
        'Attach pre-rinsed filter cap, carefully flip over mug at 1:30 mark.',
        'Gently press plunger down over 30 seconds until a soft hiss is heard.',
      ],
      recommendedRoast: 'Colombian Pink Bourbon Reserve',
    },
    espresso: {
      title: 'Home Espresso Calibration',
      ratio: '1:2 Brew Ratio (18g dry dose in -> 36g liquid espresso out)',
      temp: '93°C / 200°F (9 Bars Pressure)',
      time: '26 - 30 Seconds Extraction',
      steps: [
        'Purge grouphead and wipe portafilter basket dry with microfiber towel.',
        'Dose 18.0g fine espresso grind and distribute evenly with WDT tool.',
        'Tamp level with 15kg pressure.',
        'Lock into grouphead and initiate extraction immediately.',
        'Target 36g velvety espresso with rich caramel-colored crema.',
      ],
      recommendedRoast: 'Midnight Velvet Espresso',
    },
  };

  return (
    <div id="experience-page" className="animate-fade-in pt-24 pb-24 bg-[#FDFBF7]">
      {/* 1. HERO BANNER */}
      <section className="relative py-24 sm:py-32 bg-[#231812] text-[#FDFBF7] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-45">
          <img
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2000&auto=format&fit=crop"
            alt="Udaya Coffee Roasters Cafe atmosphere"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#231812] via-[#231812]/60 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#C68E5C] text-xs uppercase tracking-[0.25em] font-semibold border border-white/15">
            <Sparkles className="w-3.5 h-3.5" /> Atmosphere & Craft
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold leading-tight text-white">
            “Come For The Coffee. <br />
            <span className="italic font-normal font-display text-[#EEDBC5]">
              Stay For The Feeling.”
            </span>
          </h1>
          <p className="text-base sm:text-xl text-[#E8DFD0] font-light max-w-2xl mx-auto leading-relaxed">
            Every sensory touchpoint — from walnut timber grain and natural foliage to warm acoustics — has been curated for your peace.
          </p>

          <div className="pt-4">
            <button
              onClick={() => setIsReservationOpen(true)}
              className="px-8 py-4 rounded-full bg-[#C68E5C] hover:bg-[#B57E4E] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 mx-auto"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve Your Table Experience</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. THE FOUR PILLARS OF EXPERIENCE */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Pillar 1: The Café */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-bold text-[#C68E5C]">
              <Sun className="w-4 h-4" /> Spatial Design
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3D2B1F]">
              The Café Architecture
            </h2>
            <p className="text-sm sm:text-base text-[#5C4F46] leading-relaxed">
              Designed with bespoke American walnut timber, hand-plastered terracotta lime walls, and floor-to-ceiling conservatory skylights. Over 60 live indoor botanical varieties purify the air, creating a natural oasis shielded from city noise.
            </p>
            <div className="pt-2 flex items-center gap-6 text-xs text-[#736760]">
              <span>• Natural Daylight Design</span>
              <span>• High-Fidelity Vinyl Audio</span>
              <span>• Ergonomic Banquettes</span>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-xl border border-[#E8E0D2] h-96">
            <img
              src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=900&auto=format&fit=crop"
              alt="The cafe architecture and seating"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Pillar 2: The Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:flex-row-reverse">
          <div className="rounded-3xl overflow-hidden shadow-xl border border-[#E8E0D2] h-96 lg:order-2">
            <img
              src="https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=900&auto=format&fit=crop"
              alt="Professional barista crafting latte art on undercounter modbar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4 lg:order-1">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-bold text-[#C68E5C]">
              <Coffee className="w-4 h-4" /> The Craft
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3D2B1F]">
              The Espresso Bar
            </h2>
            <p className="text-sm sm:text-base text-[#5C4F46] leading-relaxed">
              Our open under-counter Modbar espresso taps remove visual barriers between guest and barista. Watch each extraction dialed in on Mahlkönig EK43 grinders and water remineralized to exact SCA TDS standards.
            </p>
            <div className="pt-2 flex items-center gap-6 text-xs text-[#736760]">
              <span>• Certified Barista Craft</span>
              <span>• Precision Water Chemistry</span>
              <span>• Custom Japanese Ceramics</span>
            </div>
          </div>
        </div>

        {/* Pillar 3: The Roastery */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-bold text-[#C68E5C]">
              <Flame className="w-4 h-4" /> Roasting Lab
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3D2B1F]">
              The Roastery Lab
            </h2>
            <p className="text-sm sm:text-base text-[#5C4F46] leading-relaxed">
              Separated by glass acoustic walls, our roasting lab houses an eco-convection roaster operating with zero direct carbon emissions. Guests can observe roasting curves, green bean sorting, and sensory cupping in real-time.
            </p>
            <div className="pt-2 flex items-center gap-6 text-xs text-[#736760]">
              <span>• Weekly Public Cuppings</span>
              <span>• Single-Lot Micro Batches</span>
              <span>• Zero Smoke Emissions</span>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-xl border border-[#E8E0D2] h-96">
            <img
              src="https://images.unsplash.com/photo-1518832553480-cd0e625ed3e6?q=80&w=900&auto=format&fit=crop"
              alt="Roastery cupping table and beans"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Pillar 4: The Community */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:flex-row-reverse">
          <div className="rounded-3xl overflow-hidden shadow-xl border border-[#E8E0D2] h-96 lg:order-2">
            <img
              src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=900&auto=format&fit=crop"
              alt="Community gathering and conversations"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4 lg:order-1">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-bold text-[#C68E5C]">
              <Users className="w-4 h-4" /> Belonging
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3D2B1F]">
              The Community Sanctuary
            </h2>
            <p className="text-sm sm:text-base text-[#5C4F46] leading-relaxed">
              We host Thursday acoustic evenings, weekend flower pop-up markets with neighborhood florists, and barista brewing masterclasses. A gathering spot where strangers become regulars.
            </p>
            <div className="pt-2 flex items-center gap-6 text-xs text-[#736760]">
              <span>• Acoustic Music Evenings</span>
              <span>• Weekend Floral Markets</span>
              <span>• Neighborhood Book Club</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE BREWING MASTERCLASS GUIDE */}
      <section className="py-20 bg-[#EFE8DD] border-y border-[#E8E0D2]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#C68E5C]">
              Barista Knowledge
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3D2B1F]">
              The Home Brewer’s Guide
            </h2>
            <p className="text-xs sm:text-sm text-[#736760]">
              Master our precise barista recipes from the comfort of your kitchen.
            </p>
          </div>

          {/* Guide Selector Tabs */}
          <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
            {(
              [
                { id: 'v60', label: 'Hario V60' },
                { id: 'french', label: 'French Press' },
                { id: 'aeropress', label: 'Aeropress' },
                { id: 'espresso', label: 'Espresso' },
              ] as const
            ).map((g) => (
              <button
                key={g.id}
                onClick={() => setActiveBrewGuide(g.id)}
                className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeBrewGuide === g.id
                    ? 'bg-[#3D2B1F] text-white shadow-md'
                    : 'bg-white text-[#5C4F46] border border-[#E8E0D2] hover:border-[#C68E5C]'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>

          {/* Guide Content Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E0D2] shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E0D2]">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#3D2B1F]">
                  {brewGuides[activeBrewGuide].title}
                </h3>
                <p className="text-xs text-[#C68E5C] font-medium mt-1">
                  Recommended: {brewGuides[activeBrewGuide].recommendedRoast}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className="bg-[#FDFBF7] px-3 py-1.5 rounded-xl border border-[#E8E0D2] text-[#3D2B1F] font-medium">
                  {brewGuides[activeBrewGuide].ratio}
                </span>
                <span className="bg-[#FDFBF7] px-3 py-1.5 rounded-xl border border-[#E8E0D2] text-[#3D2B1F] font-medium">
                  {brewGuides[activeBrewGuide].time}
                </span>
              </div>
            </div>

            {/* Steps list */}
            <div className="space-y-3">
              <span className="block text-xs uppercase tracking-wider font-bold text-[#3D2B1F]">
                Brewing Method:
              </span>
              <ol className="space-y-2.5">
                {brewGuides[activeBrewGuide].steps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#5C4F46]">
                    <span className="w-5 h-5 rounded-full bg-[#3D2B1F] text-[#C68E5C] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="pt-4 border-t border-[#E8E0D2] flex items-center justify-between">
              <span className="text-xs text-[#736760]">
                Need whole bean coffee for this recipe?
              </span>
              <button
                onClick={() => navigateTo('coffee')}
                className="text-xs font-bold uppercase tracking-wider text-[#3D2B1F] hover:text-[#C68E5C] flex items-center gap-1.5"
              >
                <span>Shop Bean Roasts</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C68E5C]" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
