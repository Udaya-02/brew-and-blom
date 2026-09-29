import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Navigation, Calendar, MessageSquare } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { setIsReservationOpen, addToast, brandName } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitted(true);
    addToast('Message Sent', 'Thank you for reaching out. We will get back to you shortly.', 'success');
  };

  return (
    <div id="contact-page" className="animate-fade-in pt-24 pb-24 bg-[#FDFBF7]">
      {/* 1. HERO SECTION */}
      <section className="bg-[#231812] text-[#FDFBF7] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#3D2B1F]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#C68E5C]">
            San Francisco Roastery & Café
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white">
            Your Next Coffee Is Waiting.
          </h1>
          <p className="text-sm sm:text-base text-[#E8DFD0] font-light max-w-xl mx-auto leading-relaxed">
            Stop by for a slow morning brew, pick up freshly roasted beans, or say hello. We look forward to meeting you.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Info & Location */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#C68E5C]">
                Location & Hours
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#3D2B1F]">
                Visit Our Sanctuary
              </h2>
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              {/* Address */}
              <div className="bg-white p-5 rounded-3xl border border-[#E8E0D2] shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#3D2B1F] text-[#C68E5C] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm text-[#3D2B1F]">Café & Roastery Address</h3>
                  <p className="text-xs text-[#5C4F46] leading-relaxed mt-1">
                    428 Blossom Alley<br />
                    Historic Roastery District<br />
                    San Francisco, CA 94107
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-white p-5 rounded-3xl border border-[#E8E0D2] shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#3D2B1F] text-[#C68E5C] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm text-[#3D2B1F]">Opening Hours</h3>
                  <div className="text-xs text-[#5C4F46] space-y-1 mt-1">
                    <p><strong className="text-[#3D2B1F]">Monday – Friday:</strong> 7:00 AM – 9:00 PM</p>
                    <p><strong className="text-[#3D2B1F]">Saturday – Sunday:</strong> 8:00 AM – 10:00 PM</p>
                    <p className="text-[#736760] text-[11px] pt-1">Kitchen closes at 3:00 PM daily • Espresso bar open until close</p>
                  </div>
                </div>
              </div>

              {/* Direct Contact */}
              <div className="bg-white p-5 rounded-3xl border border-[#E8E0D2] shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#3D2B1F] text-[#C68E5C] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm text-[#3D2B1F]">Direct Contacts</h3>
                  <div className="text-xs text-[#5C4F46] space-y-1 mt-1">
                    <p>Phone: <a href="tel:4155550192" className="text-[#3D2B1F] font-medium hover:text-[#C68E5C]">(415) 555-0192</a></p>
                    <p>Email: <a href="mailto:hello@udayacoffee.com" className="text-[#3D2B1F] font-medium hover:text-[#C68E5C]">hello@udayacoffee.com</a></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href="https://maps.google.com/?q=San+Francisco+Specialty+Coffee"
                target="_blank"
                rel="noreferrer"
                id="get-directions-btn"
                className="py-3.5 px-4 rounded-2xl bg-[#3D2B1F] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#C68E5C] transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <Navigation className="w-4 h-4 text-[#C68E5C]" />
                <span>Get Directions</span>
              </a>

              <a
                href="tel:4155550192"
                id="call-us-btn"
                className="py-3.5 px-4 rounded-2xl border border-[#3D2B1F] text-[#3D2B1F] text-xs uppercase tracking-wider font-semibold hover:bg-[#EFE8DD] transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#C68E5C]" />
                <span>Call Us</span>
              </a>
            </div>

            {/* Table Reservation Card */}
            <div className="bg-[#EFE8DD] p-6 rounded-3xl border border-[#E8E0D2] flex items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="font-serif font-bold text-base text-[#3D2B1F]">Planning a Visit?</h4>
                <p className="text-xs text-[#736760]">Reserve a quiet corner table or private cupping flight.</p>
              </div>
              <button
                onClick={() => setIsReservationOpen(true)}
                className="px-4 py-2.5 bg-[#3D2B1F] text-white text-xs font-semibold uppercase rounded-xl hover:bg-[#C68E5C] shrink-0"
              >
                Reserve Table
              </button>
            </div>
          </div>

          {/* Right: Map Simulator & Contact Form */}
          <div className="lg:col-span-7 space-y-8">
            {/* Interactive Map Card Simulator */}
            <div className="bg-white rounded-3xl overflow-hidden border border-[#E8E0D2] shadow-sm">
              <div className="relative h-64 sm:h-72 bg-[#EFE8DD] overflow-hidden">
                {/* Visual Map graphic background */}
                <img
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200&auto=format&fit=crop"
                  alt="San Francisco Map aesthetic location"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-[#231812]/30" />

                {/* Map Pin marker badge */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#231812] text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#C68E5C] text-[#231812] flex items-center justify-center font-bold">
                    ☕
                  </div>
                  <div>
                    <span className="block font-serif text-xs font-bold leading-tight">{brandName}</span>
                    <span className="block text-[10px] text-[#E8DFD0]">428 Blossom Alley</span>
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] font-medium text-[#3D2B1F]">
                  📍 Near South Park & Embarcadero
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-3xl border border-[#E8E0D2] shadow-xs">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#EBF3E8] text-[#8A9A5B] mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#3D2B1F]">
                    Thank You For Writing
                  </h3>
                  <p className="text-xs sm:text-sm text-[#736760] max-w-md mx-auto">
                    We received your message and our café concierge will respond to <strong>{formData.email}</strong> within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        subject: 'General Inquiry',
                        message: '',
                      });
                    }}
                    className="px-6 py-2.5 bg-[#3D2B1F] text-white text-xs font-semibold uppercase rounded-full hover:bg-[#C68E5C]"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#3D2B1F]">
                      Send Us a Note
                    </h3>
                    <p className="text-xs text-[#736760] mt-1">
                      For general questions, event bookings, bean wholesale, or catering inquiries.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-bold text-[#3D2B1F] mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full bg-[#FDFBF7] border border-[#E8E0D2] rounded-xl px-3.5 py-2.5 text-xs text-[#3D2B1F] focus:outline-hidden focus:border-[#C68E5C]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-bold text-[#3D2B1F] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. sarah@example.com"
                        className="w-full bg-[#FDFBF7] border border-[#E8E0D2] rounded-xl px-3.5 py-2.5 text-xs text-[#3D2B1F] focus:outline-hidden focus:border-[#C68E5C]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-bold text-[#3D2B1F] mb-1.5">
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. (415) 555-0199"
                        className="w-full bg-[#FDFBF7] border border-[#E8E0D2] rounded-xl px-3.5 py-2.5 text-xs text-[#3D2B1F] focus:outline-hidden focus:border-[#C68E5C]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-bold text-[#3D2B1F] mb-1.5">
                        Inquiry Topic
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-[#FDFBF7] border border-[#E8E0D2] rounded-xl px-3.5 py-2.5 text-xs text-[#3D2B1F] focus:outline-hidden focus:border-[#C68E5C]"
                      >
                        <option value="General Inquiry">General Café Inquiry</option>
                        <option value="Private Events & Parties">Private Events & Conservatory Rental</option>
                        <option value="Coffee Bean Wholesale">Coffee Bean Wholesale & Offices</option>
                        <option value="Barista Workshops">Barista Masterclasses & Cuppings</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-[#3D2B1F] mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us how we can help you..."
                      className="w-full bg-[#FDFBF7] border border-[#E8E0D2] rounded-xl px-3.5 py-2.5 text-xs text-[#3D2B1F] focus:outline-hidden focus:border-[#C68E5C]"
                    />
                  </div>

                  <button
                    type="submit"
                    id="submit-contact-form-btn"
                    className="w-full bg-[#3D2B1F] hover:bg-[#C68E5C] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md"
                  >
                    <Send className="w-4 h-4 text-[#C68E5C]" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
