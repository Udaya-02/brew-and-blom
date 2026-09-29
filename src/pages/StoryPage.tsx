import React from 'react';
import { useApp } from '../context/AppContext';
import { STORY_MILESTONES } from '../data/coffeeData';
import { ArrowRight, Sparkles, Heart, Globe, Award, ShieldCheck, Coffee } from 'lucide-react';

export const StoryPage: React.FC = () => {
  const { navigateTo, brandName } = useApp();

  return (
    <div id="story-page" className="animate-fade-in pt-24">
      {/* 1. HERO SECTION */}
      <section className="relative py-20 sm:py-28 bg-[#1A0F0A] text-[#FAF6F0] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=2000&auto=format&fit=crop"
            alt="Coffee cherries and roasted coffee beans"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F0A] via-[#1A0F0A]/60 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#C48B54] text-xs uppercase tracking-[0.25em] font-semibold border border-white/15">
            <Sparkles className="w-3.5 h-3.5" /> Our Journey & Heritage
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold leading-tight text-white">
            From Origin to Cup.
          </h1>
          <p className="text-base sm:text-xl text-[#D8CEBE] font-light max-w-2xl mx-auto leading-relaxed">
            The story of how a passionate obsession with micro-lot specialty coffee transformed into a neighborhood sanctuary and roastery.
          </p>
        </div>
      </section>

      {/* 2. NARRATIVE CHAPTERS */}
      <section className="py-24 bg-[#FAF6F0] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Chapter 1: How We Started */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#C48B54]">
              Chapter 01
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#24140E]">
              How We Started
            </h2>
            <p className="text-sm sm:text-base text-[#5C5248] leading-relaxed">
              {brandName} was born from late-night conversations and weekend roasts in a tiny garage in 2018. We were tired of commodified coffee that masked flawed beans with scorched dark roasts. We wanted to experience coffee as a vibrant botanical fruit — full of bright citrus notes, honey sweetness, and jasmine floral aromas.
            </p>
            <p className="text-sm sm:text-base text-[#5C5248] leading-relaxed">
              Equipped with a vintage 1kg cast-iron sample roaster and two micro-lots shipped directly from Ethiopia, we began sharing our roasts with neighbors and friends.
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-xl border border-[#E8DFD0] h-[400px]">
            <img
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=900&auto=format&fit=crop"
              alt="Vintage coffee roasting in garage beginnings"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Chapter 2: Why We Roast */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:flex-row-reverse">
          <div className="rounded-3xl overflow-hidden shadow-xl border border-[#E8DFD0] h-[400px] lg:order-2">
            <img
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=900&auto=format&fit=crop"
              alt="Artisanal roasting flames and sensory analysis"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-5 lg:order-1">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#C48B54]">
              Chapter 02
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#24140E]">
              Why We Roast
            </h2>
            <p className="text-sm sm:text-base text-[#5C5248] leading-relaxed">
              Roasting is an alchemy of temperature, airflow, and intuition. We roast not to impose our flavor onto the bean, but to reveal what the soil, altitude, and rainfall created.
            </p>
            <p className="text-sm sm:text-base text-[#5C5248] leading-relaxed">
              Every coffee batch is roasted in small quantities (under 15kg) and cupped 24 hours later by our certified Q-Graders to ensure peak sweetness, pristine balance, and zero astringency.
            </p>
          </div>
        </div>

        {/* Chapter 3: Where Our Beans Come From */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#C48B54]">
              Chapter 03
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#24140E]">
              Where Our Beans Come From
            </h2>
            <p className="text-sm sm:text-base text-[#5C5248] leading-relaxed">
              We travel to origin every harvest season. From the misty high-altitude slopes of Yirgacheffe in Ethiopia (2,100m) to the volcanic soil of Antigua in Guatemala and the lush biodiversity of Huila in Colombia.
            </p>
            <div className="grid grid-cols-3 gap-3 pt-3">
              <div className="bg-white p-3 rounded-2xl border border-[#E8DFD0] text-center">
                <span className="block font-serif font-bold text-sm text-[#24140E]">Ethiopia</span>
                <span className="text-[10px] text-[#7A726A]">Jasmine & Bergamot</span>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-[#E8DFD0] text-center">
                <span className="block font-serif font-bold text-sm text-[#24140E]">Colombia</span>
                <span className="text-[10px] text-[#7A726A]">Red Cherry & Panela</span>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-[#E8DFD0] text-center">
                <span className="block font-serif font-bold text-sm text-[#24140E]">Guatemala</span>
                <span className="text-[10px] text-[#7A726A]">Volcanic Cocoa</span>
              </div>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-xl border border-[#E8DFD0] h-[400px]">
            <img
              src="https://images.unsplash.com/photo-1587734195503-904fca47e0e9?q=80&w=900&auto=format&fit=crop"
              alt="High altitude coffee farm mountains and shade trees"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Chapter 4 & 5: Relationship with Farmers & Future Vision */}
        <div className="bg-[#EFE8DD] p-8 sm:p-14 rounded-3xl border border-[#D8CEBE] grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#3D2B1F] text-[#C68E5C] flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#3D2B1F]">
              Our Relationship With Farmers
            </h3>
            <p className="text-xs sm:text-sm text-[#5C4F46] leading-relaxed">
              We operate exclusively on direct-trade principles, paying an average of 45% above Fair Trade minimums. We fund local clean water filtration projects and provide nursery shade trees to protect biodiversity.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#3D2B1F] text-[#C68E5C] flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#3D2B1F]">
              Our Vision For The Future
            </h3>
            <p className="text-xs sm:text-sm text-[#5C4F46] leading-relaxed">
              By 2028, our entire café and roastery ecosystem will be 100% net-zero carbon certified. All used coffee grounds are donated to local community gardens for rich organic mushroom composting.
            </p>
          </div>
        </div>
      </section>

      {/* FOUNDER SECTION (SINGLE FOUNDER - MINIMAL) */}
      <section id="founder-section" className="py-24 bg-[#FDFBF7] border-y border-[#E8E0D2]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2.5">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#C68E5C]">
              The Craft & Vision
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#3D2B1F]">
              Meet Our Founder
            </h2>
            <p className="text-sm text-[#736760] leading-relaxed">
              Udaya Sree — Founder, Master Roaster & Licensed Q-Grader
            </p>
          </div>

          {/* Minimal Founder Card */}
          <div
            id="founder-card"
            className="bg-white rounded-3xl border border-[#E8E0D2] overflow-hidden shadow-xs grid grid-cols-1 md:grid-cols-12 items-stretch"
          >
            {/* Founder Portrait */}
            <div className="md:col-span-5 relative h-72 sm:h-96 md:h-auto min-h-[320px] bg-[#EFE8DD] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=900&auto=format&fit=crop"
                alt={`Udaya Sree, Founder & Master Roaster of ${brandName}`}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#231812]/70 via-transparent to-transparent md:hidden" />
              <div className="absolute bottom-4 left-4 right-4 text-white md:hidden">
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#C68E5C] block">
                  Founder & Master Roaster
                </span>
                <h3 className="font-serif text-xl font-bold">Udaya Sree</h3>
              </div>
            </div>

            {/* Founder Bio & Philosophy */}
            <div className="md:col-span-7 p-7 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="hidden md:block space-y-1">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#C68E5C]/10 text-[#C68E5C] text-[11px] uppercase font-bold tracking-wider">
                    Founder & Master Roaster
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3D2B1F]">
                    Udaya Sree
                  </h3>
                  <p className="text-xs text-[#8C7E75]">Licensed Q-Grader & Sensory Specialist</p>
                </div>

                <p className="text-xs sm:text-sm text-[#5C4F46] leading-relaxed">
                  Udaya Sree established {brandName} with a singular mission: to celebrate specialty coffee as a living botanical fruit and create a serene neighborhood sanctuary. With extensive origin travel across Sidama, Huila, and Huehuetenango, Udaya personally develops thermodynamic roast profiles for each micro-lot harvest.
                </p>

                {/* Pull Quote */}
                <div className="p-4 rounded-2xl bg-[#FDFBF7] border-l-2 border-[#C68E5C] border-y border-r border-[#E8E0D2] font-serif italic text-xs sm:text-sm text-[#3D2B1F] leading-relaxed">
                  “Coffee is an agricultural art form. Our purpose is never to force a flavor, but to gently reveal the altitude, sunlight, and farmer dedication preserved in every bean.”
                </div>
              </div>

              {/* Minimal Meta Details */}
              <div className="pt-4 border-t border-[#E8E0D2] flex flex-wrap items-center justify-between gap-4 text-xs text-[#736760]">
                <div className="flex items-center gap-2">
                  <Coffee className="w-4 h-4 text-[#C68E5C]" />
                  <span>Daily Ritual: <strong className="text-[#3D2B1F]">Ethiopian V60 (94°C)</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#C68E5C]" />
                  <span>SCA Certified Judge</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TIMELINE SECTION */}
      <section className="py-24 bg-[#FDFBF7] border-t border-[#E8E0D2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#C68E5C]">
              Evolution
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#3D2B1F]">
              Our Milestone Journey
            </h2>
            <p className="text-sm text-[#736760]">
              Step by step, from a weekend passion to a thriving specialty sanctuary.
            </p>
          </div>

          {/* 4 Timelines */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STORY_MILESTONES.map((item) => (
              <div
                key={item.year}
                className="bg-white rounded-3xl overflow-hidden border border-[#E8E0D2] shadow-xs flex flex-col group hover:shadow-lg transition-all"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#3D2B1F] text-[#C68E5C] px-3 py-1 rounded-full text-xs font-serif font-bold">
                    {item.year}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#3D2B1F]">
                    {item.tag}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg font-bold text-[#3D2B1F]">
                      {item.title}
                    </h3>
                    <h4 className="text-xs font-semibold text-[#C68E5C]">
                      {item.subtitle}
                    </h4>
                    <p className="text-xs text-[#736760] leading-relaxed pt-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <button
              onClick={() => navigateTo('coffee')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#3D2B1F] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#C68E5C] transition-colors shadow-md"
            >
              <span>Explore Our Direct-Trade Roasts</span>
              <ArrowRight className="w-4 h-4 text-[#C68E5C]" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
