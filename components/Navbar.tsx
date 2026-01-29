
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

  const navTabs = ["CENTRAL LIBRARY", "RESOURCES", "E-LIBRARY", "FACILITIES", "STATS", "RESERVATIONS", "ACCOUNTS", "CONTACT"];

  return (
    <div className="flex flex-col w-full bg-white relative z-50 font-sans shadow-md">
      
      {/* Top Bar */}
      <div className="bg-brand-navy w-full border-b border-blue-900 text-white text-[11px] sm:text-xs z-50 relative">
        <div className="max-w-[1500px] mx-auto px-6">
          <div className="flex flex-col xl:flex-row items-center justify-between py-3 xl:py-2 gap-4">
            
            {/* Left: Contact Info */}
            <div className="flex flex-wrap items-center gap-6 lg:gap-10 justify-center flex-shrink-0 w-full xl:w-auto">
               <a href="tel:04427159000" className="flex items-center gap-3 hover:text-brand-blue transition-colors group min-h-[44px] sm:min-h-[32px]">
                 <div className="p-1.5 rounded-lg bg-white/10 group-hover:bg-brand-blue/20">
                    <Phone className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                 </div>
                 <span className="font-bold tracking-wide">404-478-8500</span>
               </a>
               
               <a href="mailto:info@exploreinstitute.org" className="flex items-center gap-3 hover:text-brand-blue transition-colors group min-h-[44px] sm:min-h-[32px]">
                 <div className="p-1.5 rounded-lg bg-white/10 group-hover:bg-brand-blue/20">
                    <Mail className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                 </div>
                 <span className="font-bold tracking-wide">info@exploreinstitute.org</span>
               </a>
            </div>

            {/* Right: Partner Logos */}
            <div className="w-full xl:flex-1 xl:ml-8">
              <div className="grid grid-cols-5 sm:grid-cols-7 xl:flex xl:items-center xl:justify-between gap-2 w-full">
                 {partners.slice(0, 10).map((p, i) => (
                   <div key={i} className="aspect-square xl:flex-1 xl:aspect-auto xl:h-10 bg-white rounded-md flex items-center justify-center shadow-sm overflow-hidden p-1">
                      <img src={p.src} alt={p.name} className="w-full h-full object-contain" />
                   </div>
                 ))}
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
      {/* College Header Section */}
      <div className="flex flex-col items-center w-full bg-white px-6 py-6 lg:py-10 border-b border-slate-50">
        <div className="flex justify-center w-full">
          <img 
            src="https://www.jeppiaarinstitute.org/wp-content/themes/jeppiaarinstitute/images/jplogo.gif" 
            alt="JIT Logo" 
            className="h-12 sm:h-16 lg:h-24 w-auto object-contain"
          />
        </div>
      </div>

      {/* Navigation Strip */}
      <nav className="sticky top-0 z-40 bg-brand-navy text-white shadow-xl border-t-2 lg:border-t-4 border-brand-blue">
         <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="flex items-center justify-between h-14 lg:h-18">
               <div className="hidden xl:flex items-center gap-2 w-full justify-center">
                  {navTabs.map((item, idx) => (
                    <a 
                      key={idx} 
                      href="#" 
                      className="px-5 lg:px-6 py-5 text-xs lg:text-sm font-black transition-all whitespace-nowrap uppercase tracking-[0.15em] border-b-4 border-transparent hover:bg-white/5 hover:text-brand-blue min-h-[72px] flex items-center"
                    >
                      {item}
                    </a>
                  ))}
               </div>
               <div className="xl:hidden flex items-center justify-between w-full">
                 <span className="font-black text-xs sm:text-sm tracking-[0.2em] text-brand-blue uppercase">Central Library</span>
                 <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)} 
                  className="p-3 -mr-3 min-h-[56px] min-w-[56px] flex items-center justify-center"
                  aria-label="Toggle Menu"
                 >
                    {isMenuOpen ? <X className="w-8 h-8"/> : <Menu className="w-8 h-8"/>}
                 </button>
               </div>
            </div>
            
            {/* Mobile/Tablet Menu */}
            {isMenuOpen && (
              <div className="xl:hidden bg-brand-navy pb-10 border-t border-white/10 animate-in slide-in-from-top duration-300 shadow-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5 mt-4">
                  {navTabs.map((item, idx) => (
                    <a 
                      key={idx} 
                      href="#" 
                      className="block px-8 py-6 text-sm font-black text-slate-100 uppercase tracking-widest bg-brand-navy hover:bg-white/5 hover:text-brand-blue active:bg-white/10 min-h-[64px] flex items-center border-b border-white/5"
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
