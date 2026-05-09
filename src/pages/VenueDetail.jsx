import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Star, CheckCircle, Clock, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockVenues } from '../data/mockData';

const VenueDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const venue = mockVenues.find(v => v.id === id) || mockVenues[0];
  
  const [selectedSlots, setSelectedSlots] = useState([]);

  const toggleSlot = (slot) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots(selectedSlots.filter(s => s !== slot));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  const handleProceed = () => {
    if (selectedSlots.length > 0) {
      // In a real app, pass selected slots via state or context
      navigate(`/book/${venue.id}`, { state: { selectedSlots, venue } });
    }
  };

  return (
    <div className="pb-24">
      {/* Hero Image */}
      <div className="w-full h-[40vh] md:h-[50vh] relative">
        <img src={venue.image} alt={venue.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-[#0a0f1c]/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 max-w-7xl mx-auto">
          <div className="flex gap-2 mb-3">
            <span className="bg-[#39FF14] text-black px-3 py-1 rounded-full text-xs font-bold uppercase">
              {venue.sport}
            </span>
            <span className="bg-[#151b2b]/80 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-bold uppercase border border-gray-700">
              {venue.type}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">{venue.name}</h1>
          <p className="text-gray-300 flex items-center text-sm md:text-base">
            <MapPin size={16} className="mr-1 text-[#39FF14]" /> {venue.location}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* About Section */}
            <section className="bg-[#151b2b] p-6 rounded-2xl border border-gray-800">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Info size={24} className="mr-2 text-[#39FF14]" /> About Venue
              </h2>
              <p className="text-gray-300 leading-relaxed">{venue.about}</p>
            </section>

            {/* Amenities Section */}
            <section className="bg-[#151b2b] p-6 rounded-2xl border border-gray-800">
              <h2 className="text-2xl font-bold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {venue.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center text-gray-300 bg-[#0a0f1c] p-3 rounded-xl border border-gray-800">
                    <CheckCircle size={18} className="text-[#39FF14] mr-2" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews Section */}
            <section className="bg-[#151b2b] p-6 rounded-2xl border border-gray-800">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Reviews</h2>
                <div className="flex items-center bg-[#0a0f1c] px-4 py-2 rounded-xl border border-gray-800">
                  <Star size={20} className="text-yellow-400 mr-2" fill="currentColor" />
                  <span className="font-bold text-lg">{venue.rating}</span>
                  <span className="text-gray-500 ml-2">({venue.reviewsCount} reviews)</span>
                </div>
              </div>
              {/* Dummy Review */}
              <div className="border-t border-gray-800 pt-4 mt-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-bold">Arjun P.</div>
                  <div className="flex text-yellow-400">
                    <Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" />
                  </div>
                </div>
                <p className="text-gray-400 text-sm">Great turf, well maintained and lighting is perfect for night matches.</p>
              </div>
            </section>

          </div>

          {/* Booking Panel Column */}
          <div className="lg:col-span-1">
            <div className="bg-[#151b2b] p-6 rounded-2xl border border-gray-800 sticky top-24">
              <h3 className="text-xl font-bold mb-1">Book Slots</h3>
              <p className="text-gray-400 text-sm mb-6">Select one or more slots</p>
              
              <div className="flex items-center mb-4 text-[#39FF14] bg-[#39FF14]/10 p-3 rounded-xl border border-[#39FF14]/20">
                <Clock size={20} className="mr-2" />
                <span className="font-bold">₹{venue.pricePerHour} / hour</span>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-gray-300 mb-3">Available Today</h4>
                <div className="grid grid-cols-2 gap-3">
                  {venue.availableSlots.map((slot, i) => {
                    const isSelected = selectedSlots.includes(slot);
                    return (
                      <button
                        key={i}
                        onClick={() => toggleSlot(slot)}
                        className={`py-3 rounded-xl font-medium transition border ${
                          isSelected 
                            ? 'bg-[#39FF14] text-black border-[#39FF14] shadow-[0_0_15px_rgba(57,255,20,0.3)]' 
                            : 'bg-[#0a0f1c] text-white border-gray-700 hover:border-gray-500'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Booking Summary */}
              {selectedSlots.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="border-t border-gray-800 pt-4 mb-6"
                >
                  <div className="flex justify-between mb-2 text-gray-300">
                    <span>{selectedSlots.length} slot(s) selected</span>
                    <span>₹{venue.pricePerHour * selectedSlots.length}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg text-white">
                    <span>Total Amount</span>
                    <span className="text-[#39FF14]">₹{venue.pricePerHour * selectedSlots.length}</span>
                  </div>
                </motion.div>
              )}

              <button 
                onClick={handleProceed}
                disabled={selectedSlots.length === 0}
                className={`w-full py-4 rounded-xl font-bold text-lg transition ${
                  selectedSlots.length > 0 
                    ? 'bg-[#39FF14] text-black hover:bg-[#32E612] shadow-[0_0_20px_rgba(57,255,20,0.4)]' 
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                }`}
              >
                Proceed to Pay
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default VenueDetail;
