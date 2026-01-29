
import React from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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

  const navTabs = ["STUDENT VTN", "RMAS", "READ & LAB", "MATH", "CH", "IMPORT", "WR", "ENV", "SS & GOVT", "VBN", "FA"];

  return (
    <div className="flex flex-col w-full bg-white relative z-50 font-sans shadow-sm">
      
      {/* Top Bar - Improved Responsiveness */}
      <div className="bg-brand-navy w-full border-b border-blue-900 text-white text-[9px] sm:text-[10px] lg:text-xs z-50 relative">
        <div className="max-w-[1500px] mx-auto px-4">
          <div className="flex flex-col xl:flex-row items-center justify-between py-2 xl:py-1.5 gap-3">
            
            {/* Left: Contact Info - Flexible Grid on Mobile */}
            <div className="flex flex-wrap items-center gap-4 lg:gap-8 justify-center flex-shrink-0 w-full xl:w-auto">
               <a href="tel:04427159000" className="flex items-center gap-2 hover:text-brand-blue transition-colors group min-h-[40px] sm:min-h-[32px]">
                 <div className="p-1 rounded bg-white/10 group-hover:bg-brand-blue/20">
                    <Phone className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
                 </div>
                 <span className="font-bold tracking-wide">404-478-8500</span>
               </a>
               
               <a href="mailto:info@exploreinstitute.org" className="flex items-center gap-2 hover:text-brand-blue transition-colors group min-h-[40px] sm:min-h-[32px]">
                 <div className="p-1 rounded bg-white/10 group-hover:bg-brand-blue/20">
                    <Mail className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
                 </div>
                 <span className="font-bold tracking-wide">info@exploreinstitute.org</span>
               </a>
            </div>

            {/* Right: Partner Logos - Responsive Grid layout */}
            <div className="w-full xl:flex-1 xl:ml-6">
              <div className="grid grid-cols-4 sm:grid-cols-7 xl:flex xl:items-center xl:justify-between gap-1.5 w-full">
                 {partners.slice(0, isMenuOpen ? undefined : 8).map((p, i) => (
                   <div key={i} className="aspect-square xl:flex-1 xl:aspect-auto xl:h-8 bg-white rounded-sm flex items-center justify-center shadow-sm overflow-hidden p-0.5">
                      <img src={p.src} alt={p.name} className="w-full h-full object-contain" />
                   </div>
                 ))}
                 {!isMenuOpen && partners.length > 8 && <div className="xl:hidden text-[8px] font-bold text-center flex items-center justify-center bg-white/5 rounded-sm">+More</div>}
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
      {/* College Header Section */}
      <div className="flex flex-col items-center w-full bg-white px-4 py-3 sm:py-4 lg:py-6">
        <div className="flex justify-center w-full">
          <img 
            src="https://www.jeppiaarinstitute.org/wp-content/themes/jeppiaarinstitute/images/jplogo.gif" 
            alt="JIT Logo" 
            className="h-10 sm:h-12 lg:h-16 w-auto object-contain"
          />
        </div>
      </div>

      {/* Navigation Strip */}
      <nav className="sticky top-0 z-40 bg-brand-navy text-white shadow-xl border-t-2 lg:border-t-4 border-brand-blue">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-12 lg:h-14">
               <div className="hidden xl:flex items-center gap-1 w-full justify-center">
                  {navTabs.map((item, idx) => (
                    <a 
                      key={idx} 
                      href="#" 
                      className="px-3 lg:px-4 py-4 text-[10px] font-bold transition-all whitespace-nowrap uppercase tracking-wider border-b-4 border-transparent hover:bg-white/5 hover:text-brand-blue min-h-[56px] flex items-center"
                    >
                      {item}
                    </a>
                  ))}
               </div>
               <div className="xl:hidden flex items-center justify-between w-full">
                 <span className="font-bold text-[10px] sm:text-xs tracking-widest text-brand-blue uppercase">JIT Central Library</span>
                 <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)} 
                  className="p-2 -mr-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Toggle Menu"
                 >
                    {isMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
                 </button>
               </div>
            </div>
            
            {/* Mobile/Tablet Menu */}
            {isMenuOpen && (
              <div className="xl:hidden bg-brand-navy pb-8 border-t border-white/10 animate-in slide-in-from-top duration-300">
                <div className="grid grid-cols-2 gap-px bg-white/10 mt-2">
                  {navTabs.map((item, idx) => (
                    <a 
                      key={idx} 
                      href="#" 
                      className="block px-6 py-4 text-[11px] font-bold text-slate-100 uppercase tracking-widest bg-brand-navy hover:bg-white/5 hover:text-brand-blue active:bg-white/10 min-h-[48px] flex items-center"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            )}
         </div>
      </nav>
    </div>
  );
};

export default Navbar;
