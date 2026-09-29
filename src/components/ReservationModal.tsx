import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Calendar, Clock, Users, CheckCircle2, MapPin, Sparkles } from 'lucide-react';

export const ReservationModal: React.FC = () => {
  const { isReservationOpen, setIsReservationOpen, addToast, brandName } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('10:00 AM');
  const [guests, setGuests] = useState(2);
  const [seatingPreference, setSeatingPreference] = useState<
    'Sunlit Window Banquette' | 'Indoor Lounge' | 'Coffee Bar View' | 'Garden Patio'
  >('Sunlit Window Banquette');
  const [occasion, setOccasion] = useState('Casual Catch-up / Coffee');
  const [confirmedBooking, setConfirmedBooking] = useState<{
    code: string;
    name: string;
    guests: number;
    date: string;
    time: string;
    seating: string;
  } | null>(null);

  if (!isReservationOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    const code = `RES-${Math.floor(10000 + Math.random() * 90000)}`;
    setConfirmedBooking({
      code,
      name,
      guests,
      date,
      time,
      seating: seatingPreference,
    });
    addToast('Table Reserved', `Reservation confirmed for ${guests} guests on ${date}.`, 'success');
  };

  const handleClose = () => {
    setIsReservationOpen(false);
    setConfirmedBooking(null);
  };

  const timeSlots = [
    '8:00 AM',
    '9:00 AM',
    '10:00 AM',
    '11:30 AM',
    '1:00 PM',
    '2:30 PM',
    '4:00 PM',
    '5:30 PM',
    '7:00 PM',
  ];

  return (
    <div
      id="reservation-modal-overlay"
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
      onClick={handleClose}
    >
      <div
        id="reservation-modal-panel"
        className="bg-[#FAF6F0] w-full max-w-lg rounded-3xl shadow-2xl border border-[#E8DFD0] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {confirmedBooking ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#EBF3E8] text-[#586955] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest font-bold text-[#C48B54]">
                Table Reserved
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#24140E]">
                We Look Forward To Welcoming You
              </h3>
              <p className="text-xs text-[#7A726A]">
                Your table at <strong>{brandName}</strong> has been held under the name{' '}
                <strong>{confirmedBooking.name}</strong>.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E8DFD0] text-left space-y-3 text-xs">
              <div className="flex justify-between border-b border-[#F2EDE4] pb-2">
                <span className="text-[#7A726A]">Confirmation Code</span>
                <span className="font-bold text-[#24140E]">{confirmedBooking.code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A726A]">Party Size</span>
                <span className="font-semibold text-[#24140E]">{confirmedBooking.guests} Guests</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A726A]">Date & Time</span>
                <span className="font-semibold text-[#24140E]">
                  {confirmedBooking.date} at {confirmedBooking.time}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A726A]">Seating Zone</span>
                <span className="font-semibold text-[#586955]">{confirmedBooking.seating}</span>
              </div>
              <div className="pt-2 border-t border-[#F2EDE4] flex items-center gap-2 text-[#7A726A]">
                <MapPin className="w-3.5 h-3.5 text-[#C48B54]" />
                <span>428 Blossom Alley, San Francisco</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full bg-[#24140E] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#C48B54] transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="p-6 bg-white border-b border-[#E8DFD0] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#24140E] text-white flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-[#C48B54]" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#24140E]">
                    Reserve a Café Table
                  </h3>
                  <p className="text-xs text-[#7A726A]">
                    Complimentary table reservations & tasting flights
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 text-[#7A726A] hover:text-[#24140E] rounded-full hover:bg-[#EFE8DD] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              {/* Guests */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-[#24140E] mb-2">
                  Number of Guests
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5, 6, '7+'].map((num, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setGuests(typeof num === 'number' ? num : 8)}
                      className={`flex-1 py-2 rounded-xl border text-xs font-bold transition-all ${
                        guests === (typeof num === 'number' ? num : 8)
                          ? 'bg-[#24140E] text-white border-[#24140E]'
                          : 'bg-white text-[#5C5248] border-[#D8CEBE] hover:border-[#C48B54]'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-[#24140E] mb-1.5">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-white border border-[#D8CEBE] rounded-xl px-3.5 py-2 text-xs text-[#24140E] focus:outline-hidden focus:border-[#C48B54]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-[#24140E] mb-1.5">
                    Preferred Time Slot
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-white border border-[#D8CEBE] rounded-xl px-3.5 py-2 text-xs text-[#24140E] focus:outline-hidden focus:border-[#C48B54]"
                  >
                    {timeSlots.map((ts) => (
                      <option key={ts} value={ts}>
                        {ts}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Seating preference */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-[#24140E] mb-2">
                  Seating Atmosphere
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(
                    [
                      'Sunlit Window Banquette',
                      'Indoor Lounge',
                      'Coffee Bar View',
                      'Garden Patio',
                    ] as const
                  ).map((zone) => (
                    <button
                      key={zone}
                      type="button"
                      onClick={() => setSeatingPreference(zone)}
                      className={`p-2.5 rounded-xl border text-xs font-medium text-left transition-all ${
                        seatingPreference === zone
                          ? 'bg-[#24140E] text-white border-[#24140E]'
                          : 'bg-white text-[#5C5248] border-[#D8CEBE] hover:border-[#C48B54]'
                      }`}
                    >
                      {zone}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact info */}
              <div className="space-y-3 pt-1 border-t border-[#F2EDE4]">
                <div>
                  <label className="block text-[11px] text-[#7A726A] mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Jordan Hayes"
                    className="w-full bg-white border border-[#D8CEBE] rounded-xl px-3.5 py-2 text-xs text-[#24140E] focus:outline-hidden focus:border-[#C48B54]"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-[#7A726A] mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. jordan@example.com"
                      className="w-full bg-white border border-[#D8CEBE] rounded-xl px-3.5 py-2 text-xs text-[#24140E] focus:outline-hidden focus:border-[#C48B54]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#7A726A] mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. (415) 555-0199"
                      className="w-full bg-white border border-[#D8CEBE] rounded-xl px-3.5 py-2 text-xs text-[#24140E] focus:outline-hidden focus:border-[#C48B54]"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                id="submit-reservation-btn"
                className="w-full bg-[#24140E] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#C48B54] transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#C48B54]" />
                Confirm Table Reservation
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
