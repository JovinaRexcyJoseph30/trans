import React, { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Page } from '../App';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: Page[] = ['Home', 'Route', 'About', 'Contact'];

  const partners = [
    { name: "StartupTN", src: "https://www.jeppiaarinstitute.org/wp-content/uploads/2025/02/STARTUP-tN-LOGO.png" },
    { name: "PALS", src: "https://www.jeppiaarinstitute.org/wp-content/uploads/2025/02/PALS-Logo_New.jpg" },
    { name: "Idea Lab", src: "https://www.jeppiaarinstitute.org/wp-content/uploads/2025/02/AICTE-IDEA-LAB-LOGO.jpg" },
    { name: "MoE's IC", src: "https://mic.gov.in/assets/img/MIC-Big.png" },
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
      <div className="bg-brand-navy w-full text-white text-xs z-50 relative">
        <div className="max-w-[1500px] mx-auto px-2">
          <div className="flex flex-col xl:flex-row items-center justify-center py-1.5 gap-2">

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

          </div>
        </div>
      </div>

      {/* Partner Logo Bar - Extreme Compaction, Dark Blue Background */}
      <div className="w-full bg-[#192f59] border-b border-blue-900 py-1 relative">
        <div className="max-w-[1500px] mx-auto px-4">
          <div className="flex items-center justify-between gap-0.5 md:gap-2 md:flex-wrap md:justify-center pb-1">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex-1 min-w-0 aspect-square md:w-10 md:h-10 md:flex-none bg-white rounded-sm shadow-sm flex items-center justify-center p-0.5 md:p-1.5 transition-all duration-300 hover:shadow-md hover:scale-105"
              >
                <img
                  src={partner.src}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain"
                  title={partner.name}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Existing Header Section */}
      <div className="flex flex-col items-center w-full bg-white">

        {/* Main Logo & Accreditations */}
        <div className="py-4 flex flex-col md:flex-row items-center justify-center gap-6 px-4">
          {/* College Logo */}
          <img
            src="/jitlogo.gif"
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
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => onNavigate(item)}
                  className={`px-4 lg:px-6 py-3.5 text-xs lg:text-sm font-bold transition-colors whitespace-nowrap uppercase tracking-wider border-b-4 border-transparent ${currentPage === item
                    ? 'bg-white/10 text-white border-brand-blue'
                    : 'hover:bg-white/5 text-slate-300 hover:text-white hover:border-slate-500'
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Header / Menu Button */}
            <div className="md:hidden flex items-center justify-between w-full">
              <span className="font-bold text-sm tracking-wide text-brand-blue">MENU</span>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 hover:bg-white/10 rounded transition-colors">
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-white/10 bg-brand-navy pb-4 animate-in slide-in-from-top-2">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    onNavigate(item);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 text-sm font-bold border-l-4 transition-colors uppercase tracking-wide ${currentPage === item
                    ? 'border-brand-blue bg-white/5 text-white'
                    : 'border-transparent text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;