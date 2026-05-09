import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, Clock, ArrowRight, ShieldCheck, Trophy, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { sportsList, mockVenues, mockHostedMatches } from '../data/mockData';

const Home = () => {
  return (
    <div className="pb-10">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-energetic opacity-80" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#39FF14] rounded-full blur-[150px] opacity-10" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              Book Courts. <br className="md:hidden" />
              <span className="text-gradient">Host Matches.</span><br />
              Play Now.
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Join the most energetic sports community. Verified players, premium venues, and hassle-free bookings.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto bg-[#151b2b]/90 backdrop-blur-xl p-4 md:p-6 rounded-2xl border border-gray-800 shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center bg-[#0a0f1c] rounded-xl px-4 py-3 border border-gray-800 focus-within:border-[#39FF14] transition-colors">
                <Search size={20} className="text-[#39FF14] mr-3" />
                <input type="text" placeholder="Search sport..." className="bg-transparent w-full focus:outline-none text-white placeholder-gray-500" />
              </div>
              <div className="flex items-center bg-[#0a0f1c] rounded-xl px-4 py-3 border border-gray-800 focus-within:border-[#39FF14] transition-colors">
                <MapPin size={20} className="text-[#39FF14] mr-3" />
                <input type="text" placeholder="Location" className="bg-transparent w-full focus:outline-none text-white placeholder-gray-500" />
              </div>
              <div className="flex items-center bg-[#0a0f1c] rounded-xl px-4 py-3 border border-gray-800 focus-within:border-[#39FF14] transition-colors">
                <Calendar size={20} className="text-[#39FF14] mr-3" />
                <input type="text" placeholder="Date" className="bg-transparent w-full focus:outline-none text-white placeholder-gray-500" />
              </div>
              <button className="bg-[#39FF14] text-black font-bold rounded-xl py-3 px-6 hover:bg-[#32E612] transition flex items-center justify-center shadow-[0_0_15px_rgba(57,255,20,0.3)]">
                Find Venues
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Popular Sports */}
        <section>
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold">Popular Sports</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {sportsList.map((sport, index) => (
              <motion.div 
                key={sport.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-[#151b2b] p-6 rounded-2xl border border-gray-800 text-center cursor-pointer hover:border-[#39FF14]/50 transition-colors group"
              >
                <div className={`w-16 h-16 mx-auto ${sport.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {/* Replace with actual sport icons, using generic Trophy for now */}
                  <Trophy size={28} className="text-white" />
                </div>
                <h3 className="font-semibold">{sport.name}</h3>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Venues */}
        <section>
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold">Featured Venues</h2>
            <Link to="/venues" className="text-[#39FF14] font-medium flex items-center hover:underline">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockVenues.map((venue, index) => (
              <motion.div 
                key={venue.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#151b2b] rounded-2xl overflow-hidden border border-gray-800 hover:border-[#39FF14]/30 transition group cursor-pointer"
              >
                <div className="h-48 relative overflow-hidden">
                  <img src={venue.image} alt={venue.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold flex items-center">
                    ⭐ {venue.rating}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-[#39FF14] text-black px-3 py-1 rounded-full text-xs font-bold uppercase">
                    {venue.sport}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{venue.name}</h3>
                    <div className="text-right">
                      <span className="text-[#39FF14] font-bold">₹{venue.pricePerHour}</span>
                      <span className="text-xs text-gray-400 block">/ hour</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm flex items-center mb-4">
                    <MapPin size={14} className="mr-1" /> {venue.location}
                  </p>
                  <Link to={`/venues/${venue.id}`} className="block w-full text-center bg-[#1f2937] hover:bg-[#374151] text-white py-2 rounded-xl transition font-medium">
                    Book Slot
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Hosted Matches */}
        <section>
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold">Join Stranger Matches</h2>
            <Link to="/host-match" className="text-[#39FF14] font-medium flex items-center hover:underline">
              Host Match <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockHostedMatches.map((match, index) => (
              <motion.div 
                key={match.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-r from-[#151b2b] to-[#1a233a] p-6 rounded-2xl border border-gray-800 flex flex-col md:flex-row gap-6 items-center"
              >
                <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-4 bg-[#0a0f1c] rounded-xl border border-gray-800">
                  <div className="w-16 h-16 bg-gray-800 rounded-full mb-2 flex items-center justify-center">
                    <Users size={30} className="text-[#39FF14]" />
                  </div>
                  <span className="text-sm font-medium text-gray-300">Host</span>
                  <span className="font-bold text-lg">{match.hostName}</span>
                </div>
                <div className="w-full md:w-2/3 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">{match.sport}</h3>
                      <span className="bg-[#39FF14]/20 text-[#39FF14] px-3 py-1 rounded-full text-xs font-bold">
                        ₹{match.pricePerPlayer} / share
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm flex items-center mb-1">
                      <MapPin size={14} className="mr-2 text-gray-500" /> {match.venue}
                    </p>
                    <p className="text-gray-400 text-sm flex items-center">
                      <Clock size={14} className="mr-2 text-gray-500" /> {match.date}, {match.time}
                    </p>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between">
                    <div>
                      <div className="flex -space-x-2 mb-1">
                        {[...Array(match.joinedPlayers)].map((_, i) => (
                          <div key={i} className="w-6 h-6 rounded-full bg-gray-600 border border-[#151b2b]"></div>
                        ))}
                      </div>
                      <span className="text-xs text-[#39FF14] font-medium">{match.playersNeeded} more needed</span>
                    </div>
                    <button className="bg-white text-black px-6 py-2 rounded-xl font-bold hover:bg-gray-200 transition">
                      Join Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-gradient-energetic rounded-3xl p-8 md:p-12 border border-[#39FF14]/20 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-5 w-64 h-64">
             <Trophy size={256} />
          </div>
          <h2 className="text-3xl font-bold mb-10 text-center relative z-10">How Play Now Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-[#39FF14]/20 rounded-2xl flex items-center justify-center mb-6">
                <Search size={32} className="text-[#39FF14]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Find & Book</h3>
              <p className="text-gray-400">Discover premium venues around you and book your slot instantly.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-[#39FF14]/20 rounded-2xl flex items-center justify-center mb-6">
                <Users size={32} className="text-[#39FF14]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Host & Join</h3>
              <p className="text-gray-400">Short on players? Host a match and let strangers join and split the cost.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-[#39FF14]/20 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck size={32} className="text-[#39FF14]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Verified Players</h3>
              <p className="text-gray-400">No fake bookings. 100% verified players with PlayNow IDs ensuring safe games.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;
