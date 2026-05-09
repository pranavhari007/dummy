import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MapPin, Users, User } from 'lucide-react';
import clsx from 'clsx';

const BottomNav = () => {
  const location = useLocation();
  const path = location.pathname;

  if (path === '/login') return null;

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Venues', path: '/venues', icon: MapPin },
    { name: 'Host', path: '/host-match', icon: Users },
    { name: 'Profile', path: '/dashboard', icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 w-full bg-[#151b2b] border-t border-gray-800 pb-safe z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = path === item.path || (path.startsWith('/venues') && item.path === '/venues');
          
          return (
            <Link 
              key={item.name} 
              to={item.path}
              className={clsx(
                "flex flex-col items-center justify-center w-full h-full transition-colors",
                isActive ? "text-[#39FF14]" : "text-gray-400 hover:text-gray-200"
              )}
            >
              <Icon size={20} className={clsx("mb-1", isActive && "animate-pulse")} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
