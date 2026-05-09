import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Settings, Bell, Calendar, Edit, MapPin, DollarSign, PlusCircle, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const OwnerDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('bookings');
  const [showNotification, setShowNotification] = useState(false);

  // In a real app, role check would be stricter
  if (!user) {
    return <Navigate to="/login" />;
  }

  const mockOwnerVenues = [
    { id: 'v1', name: 'Smash Arena', type: 'Badminton', courts: 4, price: 400 }
  ];

  const mockBookings = [
    { id: 'BK-102', user: 'Arjun P.', slots: '06:00 PM', status: 'Completed', paid: 400 },
    { id: 'BK-103', user: 'Neha G.', slots: '07:00 PM', status: 'Advance Paid', paid: 100 },
    { id: 'BK-104', user: 'Rahul K.', slots: '08:00 AM', status: 'Cancelled', paid: 0 },
    { id: 'BK-105', user: 'Amit S.', slots: '09:00 AM', status: 'Paid', paid: 400 },
  ];

  const simulateBooking = () => {
    setShowNotification(true);
    // Play sound in a real app
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    audio.play().catch(e => console.log('Audio play prevented', e));
    
    setTimeout(() => {
      setShowNotification(false);
    }, 4000);
  };

  return (
    <div className="pt-24 pb-24 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Owner Dashboard</h1>
          <p className="text-gray-400">Manage your venues and bookings.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={simulateBooking} className="bg-[#151b2b] border border-gray-800 p-3 rounded-xl hover:border-[#39FF14] transition relative group">
            <Bell size={20} className="text-gray-400 group-hover:text-[#39FF14]" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#39FF14] rounded-full"></span>
          </button>
          <button onClick={logout} className="bg-red-500/10 text-red-500 border border-red-500/30 px-4 py-2 rounded-xl hover:bg-red-500 hover:text-white transition font-medium">
            Logout
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showNotification && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#151b2b] border-2 border-[#39FF14] p-4 rounded-2xl shadow-[0_0_30px_rgba(57,255,20,0.4)] flex items-center gap-4 min-w-[320px]"
          >
            <div className="w-12 h-12 bg-[#39FF14] rounded-full flex items-center justify-center animate-pulse">
              <Volume2 size={24} className="text-black" />
            </div>
            <div>
              <h3 className="font-bold text-[#39FF14]">New Booking Received!</h3>
              <p className="text-sm text-gray-300">Smash Arena • Today, 08:00 PM</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-4 mb-8 overflow-x-auto pb-2 hide-scrollbar">
        <button 
          onClick={() => setActiveTab('bookings')}
          className={`whitespace-nowrap px-6 py-3 rounded-xl font-bold transition ${activeTab === 'bookings' ? 'bg-[#39FF14] text-black' : 'bg-[#151b2b] text-gray-400 hover:text-white'}`}
        >
          Today's Bookings
        </button>
        <button 
          onClick={() => setActiveTab('venues')}
          className={`whitespace-nowrap px-6 py-3 rounded-xl font-bold transition ${activeTab === 'venues' ? 'bg-[#39FF14] text-black' : 'bg-[#151b2b] text-gray-400 hover:text-white'}`}
        >
          Manage Venues
        </button>
        <button 
          onClick={() => setActiveTab('slots')}
          className={`whitespace-nowrap px-6 py-3 rounded-xl font-bold transition ${activeTab === 'slots' ? 'bg-[#39FF14] text-black' : 'bg-[#151b2b] text-gray-400 hover:text-white'}`}
        >
          Block Slots
        </button>
      </div>

      {activeTab === 'bookings' && (
        <div className="bg-[#151b2b] rounded-2xl border border-gray-800 overflow-hidden">
          <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-[#0a0f1c]/50">
            <h2 className="text-xl font-bold flex items-center"><Calendar className="mr-2 text-[#39FF14]" /> Smash Arena - Today</h2>
            <div className="text-sm">
              <span className="text-gray-400 mr-2">Total Revenue:</span>
              <span className="font-bold text-[#39FF14]">₹1,200</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#0a0f1c] text-gray-400 text-sm border-b border-gray-800">
                  <th className="p-4">Booking ID</th>
                  <th className="p-4">User</th>
                  <th className="p-4">Slot</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Amount Paid</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {mockBookings.map((b) => (
                  <tr key={b.id} className="border-b border-gray-800 hover:bg-[#0a0f1c]/30 transition">
                    <td className="p-4 font-mono text-sm">{b.id}</td>
                    <td className="p-4 font-medium">{b.user}</td>
                    <td className="p-4">{b.slots}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        b.status === 'Completed' ? 'bg-blue-500/20 text-blue-400' :
                        b.status === 'Paid' ? 'bg-[#39FF14]/20 text-[#39FF14]' :
                        b.status === 'Advance Paid' ? 'bg-yellow-500/20 text-yellow-500' :
                        'bg-red-500/20 text-red-500'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="p-4">₹{b.paid}</td>
                    <td className="p-4 text-right">
                      <button className="text-gray-400 hover:text-white transition"><Edit size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'venues' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button className="bg-[#39FF14] text-black font-bold px-4 py-2 rounded-xl flex items-center hover:bg-[#32E612] transition">
              <PlusCircle size={18} className="mr-2" /> Add New Venue
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockOwnerVenues.map(v => (
              <div key={v.id} className="bg-[#151b2b] p-6 rounded-2xl border border-gray-800 relative">
                <button className="absolute top-4 right-4 text-gray-400 hover:text-[#39FF14]"><Settings size={20} /></button>
                <h3 className="text-2xl font-bold mb-2">{v.name}</h3>
                <div className="flex gap-2 mb-6">
                  <span className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded">{v.type}</span>
                  <span className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded">{v.courts} Courts</span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Price per Hour (₹)</label>
                    <div className="flex items-center bg-[#0a0f1c] rounded-xl px-4 py-2 border border-gray-700">
                      <DollarSign size={16} className="text-[#39FF14] mr-2" />
                      <input type="number" defaultValue={v.price} className="bg-transparent w-full focus:outline-none text-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Add/Edit Courts</label>
                    <div className="flex items-center justify-between bg-[#0a0f1c] rounded-xl px-4 py-2 border border-gray-700">
                      <span>Court 1, Court 2, Court 3, Court 4</span>
                      <button className="text-[#39FF14] text-sm font-bold">Edit</button>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-6 bg-[#1f2937] hover:bg-gray-700 text-white font-bold py-3 rounded-xl transition">
                  Save Changes
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'slots' && (
        <div className="bg-[#151b2b] p-6 rounded-2xl border border-gray-800">
          <h2 className="text-xl font-bold mb-6">Block Slots Manually</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Select Venue</label>
              <select className="w-full bg-[#0a0f1c] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#39FF14]">
                <option>Smash Arena</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Select Date</label>
              <input type="date" className="w-full bg-[#0a0f1c] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#39FF14] [color-scheme:dark]" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Reason</label>
              <input type="text" placeholder="e.g. Maintenance" className="w-full bg-[#0a0f1c] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#39FF14]" />
            </div>
          </div>
          
          <h3 className="font-medium mb-3">Select Slots to Block</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
            {['06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '04:00 PM', '05:00 PM', '06:00 PM'].map(slot => (
              <button key={slot} className="bg-[#0a0f1c] border border-gray-700 hover:border-red-500 py-2 rounded-xl text-sm transition focus:bg-red-500/20 focus:border-red-500">
                {slot}
              </button>
            ))}
          </div>
          
          <button className="bg-red-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-red-600 transition shadow-[0_0_15px_rgba(239,68,68,0.3)]">
            Block Selected Slots
          </button>
        </div>
      )}

    </div>
  );
};

export default OwnerDashboard;
