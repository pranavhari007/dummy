import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Filter, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockVenues, sportsList } from '../data/mockData';

const Venues = () => {
  const [filterSport, setFilterSport] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVenues = mockVenues.filter(venue => {
    const matchesSport = filterSport === 'All' || venue.sport === filterSport;
    const matchesSearch = venue.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          venue.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSport && matchesSearch;
  });

  return (
    <div className="pt-20 pb-20 md:pt-24 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Find Venues</h1>
          <p className="text-gray-400 mt-1">Book premium sports facilities near you.</p>
        </div>
        
        <div className="w-full md:w-auto flex gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search venues..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#151b2b] border border-gray-800 rounded-xl pl-10 pr-4 py-2 text-white focus:outline-none focus:border-[#39FF14]"
            />
          </div>
          <button className="bg-[#151b2b] border border-gray-800 p-2 rounded-xl text-gray-300 hover:text-white hover:border-[#39FF14] transition">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Sports Filter Pills */}
      <div className="flex overflow-x-auto pb-4 mb-6 gap-2 hide-scrollbar">
        <button 
          onClick={() => setFilterSport('All')}
          className={`whitespace-nowrap px-4 py-2 rounded-full font-medium transition ${filterSport === 'All' ? 'bg-[#39FF14] text-black' : 'bg-[#151b2b] text-gray-400 hover:bg-gray-800 border border-gray-800'}`}
        >
          All Sports
        </button>
        {sportsList.map(sport => (
          <button 
            key={sport.id}
            onClick={() => setFilterSport(sport.name)}
            className={`whitespace-nowrap px-4 py-2 rounded-full font-medium transition ${filterSport === sport.name ? 'bg-[#39FF14] text-black' : 'bg-[#151b2b] text-gray-400 hover:bg-gray-800 border border-gray-800'}`}
          >
            {sport.name}
          </button>
        ))}
      </div>

      {/* Venue Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVenues.map((venue, index) => (
          <motion.div 
            key={venue.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-[#151b2b] rounded-2xl overflow-hidden border border-gray-800 hover:border-[#39FF14]/50 transition group"
          >
            <div className="h-48 relative overflow-hidden">
              <img src={venue.image} alt={venue.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold flex items-center">
                ⭐ {venue.rating} ({venue.reviewsCount})
              </div>
              <div className="absolute bottom-3 left-3 flex gap-2">
                <span className="bg-[#39FF14] text-black px-3 py-1 rounded-full text-xs font-bold uppercase shadow-lg">
                  {venue.sport}
                </span>
                <span className="bg-[#0a0f1c]/80 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-bold uppercase border border-gray-700">
                  {venue.type}
                </span>
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">{venue.name}</h3>
                <div className="text-right">
                  <span className="text-[#39FF14] font-bold text-lg">₹{venue.pricePerHour}</span>
                  <span className="text-xs text-gray-400 block">/ hour</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm flex items-center mb-4">
                <MapPin size={14} className="mr-1 text-gray-500" /> {venue.location}
              </p>
              
              <div className="flex gap-2 mb-4 overflow-hidden">
                {venue.amenities.slice(0, 3).map((amenity, i) => (
                  <span key={i} className="text-xs bg-[#0a0f1c] text-gray-300 px-2 py-1 rounded-md border border-gray-800 whitespace-nowrap">
                    {amenity}
                  </span>
                ))}
                {venue.amenities.length > 3 && <span className="text-xs bg-[#0a0f1c] text-gray-300 px-2 py-1 rounded-md border border-gray-800">+{venue.amenities.length - 3}</span>}
              </div>

              <Link to={`/venues/${venue.id}`} className="block w-full text-center bg-[#1f2937] hover:bg-[#39FF14] hover:text-black text-white py-3 rounded-xl transition font-bold shadow-md">
                View & Book
              </Link>
            </div>
          </motion.div>
        ))}

        {filteredVenues.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500">
            <p className="text-xl">No venues found.</p>
            <button onClick={() => {setFilterSport('All'); setSearchQuery('');}} className="mt-4 text-[#39FF14] underline">Clear filters</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Venues;
