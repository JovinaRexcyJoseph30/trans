import React from 'react';
import { Phone, MapPin, Mail, Printer, CheckCircle2 } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1C2A39] text-white pt-16 pb-8 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-start">
          
          {/* Column 1: GENERAL ENQUIRY */}
          <div className="w-full">
            <h3 className="text-lg font-bold uppercase tracking-wide mb-6 pb-3 border-b border-white/20">
              General Enquiry
            </h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <input 
                  type="text" 
                  placeholder="Name" 
                  className="w-full px-4 py-2.5 bg-white rounded-lg text-slate-800 text-sm border-2 border-transparent focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>
              
              <div className="flex gap-2">
                <div className="relative flex-1">
                   <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 border-r border-slate-300 pr-2 mr-2">
                      <span className="text-lg leading-none">🇮🇳</span>
                      <span className="text-xs text-slate-600 font-medium">+91</span>
                   </div>
                   <input 
                     type="tel" 
                     className="w-full pl-20 pr-3 py-2.5 bg-white rounded-lg text-slate-800 text-sm focus:outline-none border-2 border-transparent focus:border-blue-500" 
                     placeholder="Phone Number" 
                   />
                </div>
                <button type="button" className="px-3 py-1 bg-blue-600 text-[10px] font-bold uppercase tracking-wider rounded-lg hover:bg-blue-500 transition-colors whitespace-nowrap shadow-sm">
                  Click to Verify
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                 <input 
                   type="text" 
                   placeholder="Enter OTP" 
                   className="w-full px-4 py-2.5 bg-white rounded-lg text-slate-800 text-sm focus:outline-none border-2 border-transparent focus:border-blue-500"
                 />
                 <input 
                   type="email" 
                   placeholder="Email Address" 
                   className="w-full px-4 py-2.5 bg-white rounded-lg text-slate-800 text-sm focus:outline-none border-2 border-transparent focus:border-blue-500"
                 />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input 
                  type="text" 
                  placeholder="City" 
                  className="w-full px-4 py-2.5 bg-white rounded-lg text-slate-800 text-sm focus:outline-none border-2 border-transparent focus:border-blue-500"
                />
                <div className="relative">
                   <select className="w-full px-4 py-2.5 bg-white rounded-lg text-slate-500 text-sm focus:outline-none border-2 border-transparent focus:border-blue-500 appearance-none cursor-pointer">
                      <option>Select State</option>
                      <option>Tamil Nadu</option>
                      <option>Kerala</option>
                      <option>Andhra Pradesh</option>
                   </select>
                   <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                   </div>
                </div>
              </div>

              <div className="relative">
                 <select className="w-full px-4 py-2.5 bg-white rounded-lg text-slate-500 text-sm focus:outline-none border-2 border-transparent focus:border-blue-500 appearance-none cursor-pointer">
                     <option>Program Applying For</option>
                     <option>B.E. Computer Science & Engg</option>
                     <option>B.Tech Information Technology</option>
                     <option>B.E. Electronics & Comm Engg</option>
                     <option>B.E. Mechanical Engg</option>
                     <option>B.Tech Artificial Intelligence</option>
                 </select>
                 <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                 </div>
              </div>

              <button className="w-full py-3 bg-[#3A8EDD] hover:bg-blue-600 text-white font-bold rounded-lg shadow-lg shadow-blue-900/50 transition-all text-sm uppercase tracking-wide mt-2">
                Submit Enquiry
              </button>
            </form>
          </div>

          {/* Column 2: CONTACT US */}
          <div className="w-full">
            <h3 className="text-lg font-bold uppercase tracking-wide mb-6 pb-3 border-b border-white/20">
              Contact Us
            </h3>
            <div className="space-y-6 text-sm text-slate-300 leading-relaxed font-light">
               <div className="flex items-start gap-3">
                 <MapPin className="w-5 h-5 text-[#3A8EDD] mt-1 flex-shrink-0" />
                 <p>
                   <strong className="text-white block text-base font-semibold mb-1">Jeppiaar Institute of Technology</strong>
                   Kunnam, Sunguvarchatram,<br/>
                   Sriperumbudur, Chennai - 631604.
                 </p>
               </div>
               
               <div className="flex items-start gap-3">
                 <Phone className="w-5 h-5 text-[#3A8EDD] mt-1 flex-shrink-0" />
                 <div>
                    <p><strong className="text-white">Phone:</strong> 044 - 2715 9000 / 6380544545</p>
                    <div className="mt-2 pl-3 border-l-2 border-white/10 space-y-1">
                      <p><span className="text-slate-400">Ladies Hostel:</span> <span className="text-white">6383670122</span></p>
                      <p><span className="text-slate-400">Gents Hostel:</span> <span className="text-white">9003185311</span></p>
                    </div>
                 </div>
               </div>

               <div className="flex items-center gap-3">
                 <Printer className="w-5 h-5 text-[#3A8EDD] flex-shrink-0" />
                 <p><strong className="text-white">Fax:</strong> 044 - 2715 9006</p>
               </div>

               <div className="flex items-start gap-3">
                 <Mail className="w-5 h-5 text-[#3A8EDD] mt-1 flex-shrink-0" />
                 <div>
                   <p className="mb-1"><strong className="text-white">Email:</strong></p>
                   <a href="mailto:office@jeppiaarinstitute.org" className="block hover:text-[#3A8EDD] transition-colors">office@jeppiaarinstitute.org</a>
                   <a href="mailto:principal@jeppiaarinstitute.org" className="block hover:text-[#3A8EDD] transition-colors">principal@jeppiaarinstitute.org</a>
                 </div>
               </div>
            </div>
          </div>

          {/* Column 3: MORE LINKS */}
          <div className="w-full">
            <h3 className="text-lg font-bold uppercase tracking-wide mb-6 pb-3 border-b border-white/20">
              More Links
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
               {[
                 'AICTE Placement', 
                 'AICTE - Internship', 
                 'AICTE Feedback Link for Students & Faculties', 
                 'IQAC', 
                 'NIRF', 
                 'ARIIA', 
                 'Parent Feedback', 
                 'Employer Feedback', 
                 'Students No-Due Form', 
                 'AICTE Approvals', 
                 'Mandatory Disclosure', 
                 'Contact'
               ].map((link, idx) => (
                 <li key={idx} className="flex items-start gap-2 group">
                   <CheckCircle2 className="w-4 h-4 text-[#3A8EDD] mt-0.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                   <a href="#" className="hover:text-white hover:underline decoration-[#3A8EDD] decoration-2 underline-offset-4 transition-all">
                     {link}
                   </a>
                 </li>
               ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-16 pt-8 pb-4 text-center">
           <p className="text-xs text-slate-500 mb-2">
              © {new Date().getFullYear()} Jeppiaar Institute of Technology. All Rights Reserved.
           </p>
           <p className="text-[10px] text-slate-600 uppercase tracking-widest">
              Self Belief • Self Discipline • Self Respect
           </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
