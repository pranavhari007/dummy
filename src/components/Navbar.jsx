import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MapPin, Bell, UserCircle } from 'lucide-react';

const Navbar = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (location.pathname === '/login') return null;

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0a0f1c]/80 backdrop-blur-md border-b border-gray-800 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-energetic flex items-center justify-center border border-[#39FF14]">
                <span className="text-[#39FF14] font-bold italic">PN</span>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">PLAY NOW</span>
            </Link>
            <div className="hidden md:flex items-center text-sm text-gray-400 cursor-pointer hover:text-white transition">
              <MapPin size={16} className="mr-1 text-[#39FF14]" />
              City Center, Downtown
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <Link to="/venues" className="text-gray-300 hover:text-[#39FF14] font-medium transition">Venues</Link>
            <Link to="/properties" className="text-gray-300 hover:text-[#39FF14] font-medium transition">Properties</Link>
            <Link to="/host-match" className="text-gray-300 hover:text-[#39FF14] font-medium transition">Host Match</Link>
            <Link to="/feed" className="text-gray-300 hover:text-[#39FF14] font-medium transition">Feed</Link>
            
            <div className="w-px h-6 bg-gray-700"></div>

            {user ? (
              <div className="flex items-center gap-4">
                <Bell size={20} className="text-gray-300 hover:text-white cursor-pointer transition" />
                <Link to={user.role === 'owner' ? '/owner' : '/dashboard'} className="flex items-center gap-2 hover:opacity-80 transition">
                  <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden">
                    {user.avatar ? <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" /> : <UserCircle size={32} className="text-gray-400" />}
                  </div>
                  <span className="text-sm font-semibold text-white">{user.name}</span>
                </Link>
              </div>
            ) : (
              <Link to="/login" className="bg-[#39FF14] text-black px-5 py-2 rounded-full font-bold hover:bg-[#32E612] transition shadow-[0_0_15px_rgba(57,255,20,0.3)]">
                Login / Signup
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
