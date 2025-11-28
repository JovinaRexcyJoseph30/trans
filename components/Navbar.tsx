import React from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Partner list with updated image URLs and added TCS iON
  const partners = [
    { name: "StartupTN", src: "https://www.jeppiaarinstitute.org/wp-content/uploads/2025/02/STARTUP-tN-LOGO.png" },
    { name: "PALS", src: "https://www.jeppiaarinstitute.org/wp-content/uploads/2025/02/PALS-Logo_New.jpg" },
    { name: "Idea Lab", src: "https://www.jeppiaarinstitute.org/wp-content/uploads/2025/02/AICTE-IDEA-LAB-LOGO.jpg" },
    { name: "AICTE", src: "https://www.jeppiaarinstitute.org/wp-content/themes/jeppiaarinstitute/images/AIC.jpg" },
    { name: "CII", src: "https://www.jeppiaarinstitute.org/wp-content/themes/jeppiaarinstitute/images/CII.jpg" },
    { name: "InPact", src: "https://www.jeppiaarinstitute.org/wp-content/themes/jeppiaarinstitute/images/AIP.jpg" },
    { name: "IIC", src: "https://www.jeppiaarinstitute.org/wp-content/themes/jeppiaarinstitute/images/IIC.jpg" },
    { name: "ISRO", src: "https://www.jeppiaarinstitute.org/wp-content/themes/jeppiaarinstitute/images/isro.jpg" },
    { name: "ISO 9001", src: "https://www.jeppiaarinstitute.org/wp-content/themes/jeppiaarinstitute/images/iso.jpg" },
    { name: "NAAC", src: "https://www.jeppiaarinstitute.org/wp-content/themes/jeppiaarinstitute/images/naaca+.jpg" },
    { name: "NBA", src: "https://www.jeppiaarinstitute.org/wp-content/uploads/2025/05/nba.jpg" },
    { name: "AWS Academy", src: "https://www.jeppiaarinstitute.org/wp-content/uploads/2025/05/aw.jpeg" },
    { name: "TCS iON", src: "https://www.jeppiaarinstitute.org/wp-content/themes/jeppiaarinstitute/images/TCS-iON-Centre.jpg" }
  ];

  return (
    <div className="flex flex-col w-full bg-white relative z-50 font-sans shadow-sm">
      
      {/* New Top Bar - Replicating the screenshot design */}
      <div className="bg-brand-navy w-full border-b border-blue-900 text-white text-xs z-50 relative">
        <div className="max-w-[1500px] mx-auto px-2">
          <div className="flex flex-col xl:flex-row items-center justify-between py-1.5 gap-2">
            
            {/* Left: Contact Info - Parallel Alignment on ALL screens */}
            <div className="flex flex-row items-center gap-4 sm:gap-6 md:gap-8 justify-center flex-shrink-0 w-full xl:w-auto">
               <a href="tel:04427159000" className="flex items-center gap-2 hover:text-brand-blue transition-colors group whitespace-nowrap">
                 <div className="p-1 rounded bg-white/10 group-hover:bg-brand-blue/20 flex-shrink-0">
                    <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                 </div>
                 <span className="font-bold tracking-wide text-xs sm:text-sm">044-27159000</span>
               </a>
               
               {/* Vertical Divider */}
               <div className="h-3 w-px bg-white/20"></div>

               <a href="mailto:office@jeppiaarinstitute.org" className="flex items-center gap-2 hover:text-brand-blue transition-colors group whitespace-nowrap">
                 <div className="p-1 rounded bg-white/10 group-hover:bg-brand-blue/20 flex-shrink-0">
                    <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                 </div>
                 <span className="font-bold tracking-wide text-xs sm:text-sm">office@jeppiaarinstitute.org</span>
               </a>
            </div>

            {/* Right: Partners List - Single Row, Equal Size, Evenly Spaced, No Scroll */}
            <div className="w-full xl:flex-1 xl:ml-6">
              <div className="flex w-full items-center justify-between gap-1">
                 {partners.map((p, i) => (
                   <div key={i} className="flex-1 min-w-0 h-7 sm:h-9 md:h-10 bg-white rounded-sm flex items-center justify-center shadow-sm cursor-default hover:scale-105 transition-transform overflow-hidden p-[1px] sm:p-0.5">
                      <img 
                        src={p.src} 
                        alt={p.name} 
                        className="w-full h-full object-contain"
                      />
                   </div>
                 ))}
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
      {/* Existing Header Section */}
      <div className="flex flex-col items-center w-full bg-white">
        {/* First Header Image - Top Row */}
        <div className="w-full border-b border-gray-100">
          <img 
            src="https://www.jeppiaarinstitute.org/wp-content/uploads/2025/02/aw.jpeg" 
            alt="Jeppiaar Institute Header" 
            className="w-full h-auto object-contain max-h-[80px] sm:max-h-[100px]"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://www.jeppiaarinstitute.org/wp-content/uploads/2025/02/aw.jpeg';
            }}
          />
        </div>

        {/* Second Header Image - Below First */}
        <div className="py-4">
          <img 
            src="https://www.jeppiaarinstitute.org/wp-content/themes/jeppiaarinstitute/images/jplogo.gif" 
            alt="Jeppiaar Institute Logo" 
            className="h-16 sm:h-20 md:h-24 w-auto object-contain"
          />
        </div>
      </div>

      {/* Navigation Strip (Sticky) */}
      <nav className="sticky top-0 z-40 bg-brand-navy text-white shadow-xl border-t-4 border-brand-blue">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-12">
               
               {/* Desktop Nav - Centered */}
               <div className="hidden md:flex items-center gap-1 overflow-x-auto no-scrollbar w-full justify-center">
                  {['Home', 'About Us', 'Academics', 'Departments', 'Research', 'Placement', 'Transport', 'Contact'].map((item) => (
                    <a 
                      key={item} 
                      href="#" 
                      className={`px-4 lg:px-6 py-3.5 text-xs lg:text-sm font-bold transition-colors whitespace-nowrap uppercase tracking-wider border-b-4 border-transparent ${
                        item === 'Transport' 
                        ? 'bg-white/10 text-white border-brand-blue' 
                        : 'hover:bg-white/5 text-slate-300 hover:text-white hover:border-slate-500'
                      }`}
                    >
                      {item}
                    </a>
                  ))}
               </div>

               {/* Mobile Header / Menu Button */}
               <div className="md:hidden flex items-center justify-between w-full">
                 <span className="font-bold text-sm tracking-wide text-brand-blue">MENU</span>
                 <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 hover:bg-white/10 rounded transition-colors">
                    {isMenuOpen ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
                 </button>
               </div>
            </div>
            
            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
              <div className="md:hidden border-t border-white/10 bg-brand-navy pb-4 animate-in slide-in-from-top-2">
                {['Home', 'About Us', 'Academics', 'Departments', 'Research', 'Placement', 'Transport', 'Contact'].map((item) => (
                  <a 
                    key={item} 
                    href="#" 
                    className={`block px-4 py-3 text-sm font-bold border-l-4 transition-colors uppercase tracking-wide ${
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