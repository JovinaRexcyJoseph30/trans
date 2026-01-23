
import React from 'react';
import { Phone, MapPin, Mail, Printer, CheckCircle2 } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1C2A39] text-white pt-12 lg:pt-16 pb-8 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 items-start">
          
          {/* Column 1: GENERAL ENQUIRY */}
          <div className="w-full">
            <h3 className="text-base lg:text-lg font-bold uppercase tracking-widest mb-6 pb-3 border-b border-white/10">Library Enquiry</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="text" 
                placeholder="Student Name" 
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-brand-blue focus:bg-white/10 transition-all min-h-[44px]" 
              />
              <input 
                type="tel" 
                placeholder="Mobile Number" 
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-brand-blue focus:bg-white/10 transition-all min-h-[44px]" 
              />
              <textarea 
                placeholder="Specific Book Request / Inquiry" 
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-brand-blue focus:bg-white/10 h-24 transition-all" 
              />
              <button className="w-full py-3.5 bg-brand-blue hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg text-xs uppercase tracking-widest transition-all active:scale-95 min-h-[48px]">
                Submit Inquiry
              </button>
            </form>
          </div>

          {/* Column 2: CONTACT US */}
          <div className="w-full">
            <h3 className="text-base lg:text-lg font-bold uppercase tracking-widest mb-6 pb-3 border-b border-white/10">Library Contact</h3>
            <div className="space-y-6 text-xs lg:text-sm text-slate-300 leading-relaxed font-medium">
               <div className="flex items-start gap-4">
                 <div className="p-2.5 rounded-xl bg-white/5 text-brand-blue shrink-0">
                    <MapPin className="w-5 h-5" />
                 </div>
                 <p><strong className="text-white block text-sm lg:text-base font-bold mb-1">Central Library - JIT</strong>Kunnam, Sunguvarchatram,<br/>Sriperumbudur, Chennai - 631604.</p>
               </div>
               <div className="flex items-start gap-4">
                 <div className="p-2.5 rounded-xl bg-white/5 text-brand-blue shrink-0">
                    <Phone className="w-5 h-5" />
                 </div>
                 <div className="space-y-2">
                    <p><strong className="text-white">Phone:</strong> 044 - 2715 9000 / Ext: 405</p>
                    <div className="pl-3 border-l-2 border-white/10 space-y-1">
                      <p className="flex justify-between gap-4">
                        <span className="text-slate-400">Library Office:</span> 
                        <span className="text-white font-mono">6380544545</span>
                      </p>
                    </div>
                 </div>
               </div>
               <div className="flex items-start gap-4">
                 <div className="p-2.5 rounded-xl bg-white/5 text-brand-blue shrink-0">
                    <Mail className="w-5 h-5" />
                 </div>
                 <div>
                   <p className="mb-1 uppercase text-[10px] tracking-widest font-bold text-slate-400">Official Email</p>
                   <a href="mailto:library@jeppiaarinstitute.org" className="block hover:text-brand-blue font-bold text-white transition-colors min-h-[44px] flex items-center underline underline-offset-4 decoration-white/20">library@jeppiaarinstitute.org</a>
                 </div>
               </div>
            </div>
          </div>

          {/* Column 3: MORE LINKS */}
          <div className="w-full">
            <h3 className="text-base lg:text-lg font-bold uppercase tracking-widest mb-6 pb-3 border-b border-white/10">Quick Links</h3>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-3 text-xs lg:text-sm text-slate-300">
               {['JIT OPAC', 'E-Library Login', 'NDLI Resource', 'IEEE Xplore', 'DELNET Portal', 'Swayam/NPTEL', 'Journals List'].map((link, idx) => (
                 <li key={idx} className="group">
                   <a href="#" className="flex items-center gap-2.5 hover:text-brand-blue transition-all min-h-[44px]">
                     <CheckCircle2 className="w-4 h-4 text-brand-blue opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                     <span className="font-medium group-hover:translate-x-1 transition-transform">{link}</span>
                   </a>
                 </li>
               ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 mt-12 lg:mt-16 pt-8 pb-4 text-center">
           <p className="text-[10px] lg:text-xs text-slate-500 mb-2">© {new Date().getFullYear()} JIT Library Management System. All Rights Reserved.</p>
           <p className="text-[9px] lg:text-[10px] text-slate-600 uppercase tracking-[0.2em] font-bold">Knowledge is Power • Excellence through Research</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
