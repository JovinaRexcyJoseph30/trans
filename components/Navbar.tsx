import React from 'react';
import { Bus, MapPin, Bell } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Bus className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              JIT<span className="text-blue-500">Transport</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#" className="hover:text-white transition-colors">Routes</a>
            <a href="#" className="hover:text-white transition-colors">Live Status</a>
            <a href="#" className="hover:text-white transition-colors">Faculty</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-4">
             <button className="p-2 text-zinc-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="hidden sm:block px-4 py-2 bg-white text-black text-sm font-semibold rounded-full hover:bg-zinc-200 transition-colors">
              Student Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;