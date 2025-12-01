import React from 'react';
import { MapPin, Mail, Globe, ExternalLink, ChevronRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#192F59] text-white pt-16 pb-8 mt-auto border-t border-blue-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">

          {/* Column 1: Logo & Address */}
          <div className="flex flex-col items-start gap-6">
            <div className="bg-white p-2 rounded-lg inline-block w-fit">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuuH7ddxQ9jHC0W1_4SizfKw61VHcxIscrug&s"
                alt="JIT Logo"
                className="h-16 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://yt3.googleusercontent.com/pDqWRSkJM6LdfkkCFByEWK4lbIZsetVP17jR_edTMLxcsUcSO4nfmEAxyF4CSZTZMUHQ_G8q=s900-c-k-c0x00ffffff-no-rj';
                }}
              />
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-bold tracking-wide text-white">
                Jeppiaar Institute of<br />Technology
              </h3>

              <div className="flex items-start gap-3 text-blue-100 text-sm leading-relaxed opacity-90">
                <MapPin className="w-5 h-5 flex-shrink-0 text-brand-blue mt-0.5" />
                <div>
                  <p>Jeppiaar Institute of Technology,</p>
                  <p>Kunnam, Sunguvarchatram,</p>
                  <p>Sriperumbudur (TK), Chennai - 631 604.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Contact Numbers - 2 Column Grid */}
          <div className="flex flex-col gap-6">
            <div className="border-b border-blue-800 pb-2 mb-2">
              <h3 className="text-lg font-bold text-white">Contact Numbers</h3>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-6">
              {/* College Phone */}
              <div>
                <h4 className="text-sm font-bold text-brand-blue uppercase tracking-wider mb-1">College Phone</h4>
                <div className="flex flex-col text-sm text-blue-100 font-mono space-y-0.5">
                  <a href="tel:04427159000" className="hover:text-white transition-colors whitespace-nowrap">044-27159000</a>
                  <a href="tel:7401222000" className="hover:text-white transition-colors whitespace-nowrap">7401222000</a>
                  <a href="tel:7401222010" className="hover:text-white transition-colors whitespace-nowrap">7401222010</a>
                </div>
              </div>

              {/* Fax */}
              <div>
                <h4 className="text-sm font-bold text-brand-blue uppercase tracking-wider mb-1">Fax</h4>
                <div className="flex flex-col text-sm text-blue-100 font-mono">
                  <span className="whitespace-nowrap">044-27159006</span>
                </div>
              </div>

              {/* Ladies Hostel */}
              <div>
                <h4 className="text-sm font-bold text-brand-blue uppercase tracking-wider mb-1">Ladies Hostel</h4>
                <div className="flex flex-col text-sm text-blue-100 font-mono">
                  <a href="tel:04427159019" className="hover:text-white transition-colors whitespace-nowrap">044-27159019, 25</a>
                </div>
              </div>

              {/* Gents Hostel */}
              <div>
                <h4 className="text-sm font-bold text-brand-blue uppercase tracking-wider mb-1">Gents Hostel</h4>
                <div className="flex flex-col text-sm text-blue-100 font-mono">
                  <a href="tel:04427159014" className="hover:text-white transition-colors whitespace-nowrap">044-27159014, 30</a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Email Us */}
          <div className="flex flex-col gap-6">
            <div className="border-b border-blue-800 pb-2 mb-2">
              <h3 className="text-lg font-bold text-white">Email Us</h3>
            </div>

            <div className="flex flex-col gap-4">
              <a
                href="mailto:office@jeppiaarinstitute.org"
                className="group flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-transparent hover:border-blue-800"
              >
                <div className="p-2 bg-brand-blue/20 rounded-md text-brand-blue group-hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-blue-300 uppercase tracking-wide mb-0.5">General Enquiries</span>
                  <span className="text-sm text-white break-all">office@jeppiaarinstitute.org</span>
                </div>
              </a>

              <a
                href="mailto:network@jeppiaarinstitute.org"
                className="group flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-transparent hover:border-blue-800"
              >
                <div className="p-2 bg-brand-blue/20 rounded-md text-brand-blue group-hover:text-white transition-colors">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-blue-300 uppercase tracking-wide mb-0.5">Network / IT</span>
                  <span className="text-sm text-white break-all">network@jeppiaarinstitute.org</span>
                </div>
              </a>
            </div>
          </div>

          {/* Column 4: Quick Links */}
          <div className="flex flex-col gap-6">
            <div className="border-b border-blue-800 pb-2 mb-2">
              <h3 className="text-lg font-bold text-white">Quick Links</h3>
            </div>

            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.jeppiaarinstitute.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-100 hover:text-white hover:translate-x-1 transition-all group"
                >
                  <ChevronRight className="w-4 h-4 text-brand-blue group-hover:text-white transition-colors" />
                  <span>College Website</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                </a>
              </li>
              <li>
                <a
                  href="https://jitsriperumbudur.org/studentslogin/login.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-100 hover:text-white hover:translate-x-1 transition-all group"
                >
                  <ChevronRight className="w-4 h-4 text-brand-blue group-hover:text-white transition-colors" />
                  <span>Student Portal</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                </a>
              </li>
              <li>
                <a
                  href="https://jitsriperumbudur.org/stafflogin/login.php?done=/stafflogin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-100 hover:text-white hover:translate-x-1 transition-all group"
                >
                  <ChevronRight className="w-4 h-4 text-brand-blue group-hover:text-white transition-colors" />
                  <span>Faculty Portal</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar - Stacked */}
        <div className="border-t border-blue-900 pt-8 flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-sm text-blue-300">
            © {new Date().getFullYear()} <span className="text-white font-semibold">Jeppiaar Institute of Technology</span>. All Rights Reserved.
          </p>
          <p className="text-xs text-brand-blue font-bold uppercase tracking-[0.2em]">
            Self Belief • Self Discipline • Self Respect
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
