
import React from 'react';
import { Phone, MapPin, Mail, Printer, CheckCircle2 } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#121F2B] text-white pt-16 lg:pt-24 pb-12 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 lg:gap-20 items-start">
          
          {/* Column 1: GENERAL ENQUIRY */}
          <div className="w-full">
            <h3 className="text-lg lg:text-xl font-black uppercase tracking-widest mb-8 pb-4 border-b border-white/10">Library Inquiry</h3>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="text" 
                placeholder="Student Name" 
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white text-base focus:outline-none focus:border-brand-blue focus:bg-white/10 transition-all min-h-[56px]" 
              />
              <input 
                type="tel" 
                placeholder="Mobile Number" 
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white text-base focus:outline-none focus:border-brand-blue focus:bg-white/10 transition-all min-h-[56px]" 
              />
              <textarea 
                placeholder="Specific Book Request / Inquiry" 
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white text-base focus:outline-none focus:border-brand-blue focus:bg-white/10 h-32 transition-all resize-none" 
              />
              <button className="w-full py-5 bg-brand-blue hover:bg-blue-600 text-white font-black rounded-2xl shadow-xl text-xs sm:text-sm uppercase tracking-[0.2em] transition-all active:scale-95 min-h-[64px]">
                Submit Inquiry
              </button>
            </form>
          </div>

          {/* Column 2: CONTACT US */}
          <div className="w-full">
            <h3 className="text-lg lg:text-xl font-black uppercase tracking-widest mb-8 pb-4 border-b border-white/10">Library Contact</h3>
            <div className="space-y-8 text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed font-medium">
               <div className="flex items-start gap-5">
                 <div className="p-3.5 rounded-2xl bg-white/5 text-brand-blue shrink-0">
                    <MapPin className="w-6 h-6" />
                 </div>
                 <p><strong className="text-white block text-lg sm:text-xl font-black mb-2 uppercase tracking-tight">Central Library - JIT</strong>Kunnam, Sunguvarchatram,<br/>Sriperumbudur, Chennai - 631604.</p>
               </div>
               <div className="flex items-start gap-5">
                 <div className="p-3.5 rounded-2xl bg-white/5 text-brand-blue shrink-0">
                    <Phone className="w-6 h-6" />
                 </div>
                 <div className="space-y-3">
                    <p><strong className="text-white font-bold">Main:</strong> 044 - 2715 9000 / Ext: 405</p>
                    <div className="pl-4 border-l-2 border-white/10 space-y-2">
                      <p className="flex flex-col sm:flex-row sm:justify-between sm:gap-6">
                        <span className="text-slate-400 font-bold uppercase text-xs tracking-widest">Office:</span> 
                        <span className="text-white font-mono font-bold">6380544545</span>
                      </p>
                    </div>
                 </div>
               </div>
               <div className="flex items-start gap-5">
                 <div className="p-3.5 rounded-2xl bg-white/5 text-brand-blue shrink-0">
                    <Mail className="w-6 h-6" />
                 </div>
                 <div className="min-w-0">
                   <p className="mb-2 uppercase text-[10px] sm:text-xs tracking-[0.3em] font-black text-slate-400">Library Office Email</p>
                   <a href="mailto:library@jeppiaarinstitute.org" className="block hover:text-brand-blue font-black text-white transition-colors min-h-[44px] flex items-center underline underline-offset-8 decoration-white/20 break-all text-sm sm:text-base lg:text-lg">library@jeppiaarinstitute.org</a>
                 </div>
               </div>
            </div>
          </div>

          {/* Column 3: QUICK LINKS */}
          <div className="w-full">
            <h3 className="text-lg lg:text-xl font-black uppercase tracking-widest mb-8 pb-4 border-b border-white/10">Quick Links</h3>
            <ul className="grid grid-cols-1 gap-y-4 text-sm sm:text-base lg:text-lg text-slate-300">
               {['JIT OPAC System', 'E-Library Dashboard', 'NDLI Resources', 'IEEE Xplore Digital', 'DELNET Academic Portal', 'Swayam/NPTEL Courses', 'Current Journals List'].map((link, idx) => (
                 <li key={idx} className="group">
                   <a href="#" className="flex items-center gap-4 hover:text-brand-blue transition-all min-h-[48px]">
                     <CheckCircle2 className="w-5 h-5 text-brand-blue opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                     <span className="font-bold tracking-tight group-hover:translate-x-2 transition-transform">{link}</span>
                   </a>
                 </li>
               ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 mt-20 lg:mt-24 pt-12 pb-6 text-center">
           <p className="text-xs sm:text-sm text-slate-500 mb-3">© {new Date().getFullYear()} JIT Central Library Management System. All Rights Reserved.</p>
           <p className="text-[10px] sm:text-xs text-slate-600 uppercase tracking-[0.4em] font-black">Knowledge is Power • Excellence through Research</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
