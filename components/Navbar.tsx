import React from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Mock list of partner logos for the top bar
  const partners = [
    "StartupTN", "PALS", "AICTE", "CII", "NPTEL", 
    "IIC", "ISO", "NAAC", "NBA", "AWS Academy"
  ];

  return (
    <div className="flex flex-col w-full bg-white relative z-50">
      {/* 1. Top Bar - Partner Logos */}
      <div className="bg-brand-navy border-b border-white/10">
        <div className="max-w-7xl mx-auto px-2 py-3">
          <div className="flex justify-center flex-wrap gap-2 sm:gap-4">
             {partners.map((p, i) => (
               <div key={i} className="bg-white rounded-[2px] h-8 w-16 sm:w-20 flex items-center justify-center shadow-sm opacity-90 hover:opacity-100 transition-opacity cursor-default">
                 <span className="text-[9px] font-bold text-brand-navy text-center leading-none px-1 truncate w-full">{p}</span>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* 2. Main Header Block */}
      <div className="bg-white py-4 sm:py-6 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Logo & Branding Group */}
            <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 text-center md:text-left flex-1">
               {/* Official Logo */}
               <div className="flex-shrink-0">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 relative flex items-center justify-center">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/en/8/85/Jeppiaar_Institute_of_Technology_logo.png" 
                      alt="Jeppiaar Institute of Technology Logo"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        // Fallback if image fails
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement?.classList.add('bg-white');
                        const svg = document.createElement('div');
                        svg.innerHTML = `<svg viewBox="0 0 100 100" class="w-full h-full text-brand-navy fill-current"><path d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" fill="none" stroke="currentColor" stroke-width="3"/><path d="M35 35 H65 M50 35 V75 M35 75 H65" fill="none" stroke="#3A8EDD" stroke-width="4" stroke-linecap="round"/><text x="50" y="90" text-anchor="middle" font-size="9" font-weight="bold" fill="#081E48">ESTD 2011</text></svg>`;
                        svg.className = "w-full h-full";
                        e.currentTarget.parentElement?.appendChild(svg);
                      }}
                    />
                  </div>
               </div>

               {/* Text Branding */}
               <div className="flex flex-col">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-navy tracking-tight leading-tight">
                    JEPPIAAR INSTITUTE OF TECHNOLOGY
                  </h1>
                  <div className="flex flex-col md:items-start items-center">
                    <p className="text-brand-blue text-sm sm:text-base font-serif italic font-medium mt-1">
                      "Self Belief, Self Discipline, Self Respect"
                    </p>
                    <div className="mt-2 inline-block border-t border-slate-200 pt-1">
                      <p className="text-xs font-bold text-slate-600 tracking-wider uppercase">
                        (AN AUTONOMOUS INSTITUTION)
                      </p>
                    </div>
                  </div>
               </div>
            </div>

            {/* Right: Accreditations */}
            <div className="flex items-center gap-4 flex-shrink-0 mt-2 lg:mt-0">
               {/* NAAC Badge */}
               <div className="flex flex-col items-center group cursor-default">
                  <div className="relative w-14 h-18 sm:w-16 sm:h-20 bg-gradient-to-b from-yellow-500 to-yellow-600 shadow-md rounded-b-full rounded-t-lg flex items-center justify-center border-2 border-white ring-1 ring-slate-100 group-hover:scale-105 transition-transform">
                     <div className="text-white font-bold text-2xl drop-shadow-sm">A+</div>
                     <div className="absolute top-1 text-[8px] text-yellow-100 font-medium tracking-wide">NAAC</div>
                  </div>
               </div>

               {/* NBA Badge */}
               <div className="flex flex-col items-center group cursor-default">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white border-2 border-teal-500 rounded-lg shadow-sm flex flex-col items-center justify-center relative p-1 group-hover:scale-105 transition-transform overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-1 bg-teal-500"></div>
                    <div className="text-teal-600 font-black text-xl leading-none mt-1">NBA</div>
                    <div className="w-full h-px bg-teal-100 my-1"></div>
                    <div className="text-[6px] text-center font-bold text-slate-600 leading-tight">
                      CSE, IT<br/>& ECE
                    </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>

      {/* 3. Navigation Strip (Sticky) */}
      <nav className="sticky top-0 z-40 bg-brand-navy text-white shadow-lg border-t border-blue-900">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-12">
               {/* Desktop Nav */}
               <div className="hidden md:flex items-center gap-1 overflow-x-auto no-scrollbar">
                  {['Home', 'About Us', 'Academics', 'Departments', 'Research', 'Placement', 'Transport', 'Contact'].map((item) => (
                    <a 
                      key={item} 
                      href="#" 
                      className={`px-4 py-3.5 text-sm font-medium transition-colors whitespace-nowrap ${
                        item === 'Transport' 
                        ? 'bg-brand-blue text-white shadow-inner' 
                        : 'hover:bg-white/10 text-slate-200 hover:text-white'
                      }`}
                    >
                      {item}
                    </a>
                  ))}
               </div>

               {/* Mobile Header / Menu Button */}
               <div className="md:hidden flex items-center justify-between w-full">
                 <span className="font-bold text-sm tracking-wide">JIT TRANSPORT</span>
                 <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 hover:bg-white/10 rounded transition-colors">
                    {isMenuOpen ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
                 </button>
               </div>
            </div>
            
            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
              <div className="md:hidden border-t border-white/10 bg-brand-navy pb-4">
                {['Home', 'About Us', 'Academics', 'Departments', 'Research', 'Placement', 'Transport', 'Contact'].map((item) => (
                  <a 
                    key={item} 
                    href="#" 
                    className={`block px-4 py-3 text-sm font-medium border-l-4 transition-colors ${
                       item === 'Transport'
                       ? 'border-brand-blue bg-white/5 text-white'
                       : 'border-transparent text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item}
                  </a>
                ))}
              </div>
            )}
         </div>
      </nav>
    </div>
  );
};

export default Navbar;