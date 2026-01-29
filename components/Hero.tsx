
import React from 'react';
import { 
  Library, Lightbulb, Target, ShieldCheck, Users, 
  BookOpen, Monitor, Tv, Search, ClipboardList, 
  Zap, UserCheck, HelpCircle, Phone
} from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="space-y-12 sm:space-y-24 animate-in fade-in duration-700">
      
      {/* HEADER BANNER */}
      <div className="bg-white rounded-[3rem] sm:rounded-[4.5rem] p-12 sm:p-24 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-16 opacity-5 hidden sm:block">
           <Library className="w-72 h-72" />
        </div>
        <div className="relative z-10">
          <h2 className="text-sm font-black text-brand-blue tracking-[0.3em] uppercase mb-6">Academic Excellence</h2>
          <h1 className="text-4xl sm:text-5xl lg:text-3xl font-black text-brand-navy tracking-tight mb-8 leading-none uppercase">Library Facilities</h1>
          <p className="text-slate-600 leading-relaxed text-lg lg:text-base max-w-5xl font-medium">
            Equipped with modern facilities to support academic learning, research, and innovation. Designing a primary knowledge repository for the JIT community with open access and automated systems.
          </p>
        </div>
      </div>

      {/* VISION, MISSION & QUALITY POLICY SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-14 auto-rows-min">
        
        {/* VISION CARD */}
        <div className="bg-white rounded-[3rem] p-12 sm:p-16 border border-slate-200 shadow-sm flex flex-col hover:shadow-xl transition-all group">
          <div className="flex items-center gap-6 sm:gap-8 mb-10 sm:mb-12">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-50 rounded-[1.8rem] sm:rounded-[2.2rem] flex items-center justify-center text-brand-blue shrink-0 group-hover:scale-110 transition-transform">
              <Lightbulb className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <h2 className="text-3xl sm:text-2xl font-black text-brand-navy tracking-tight uppercase">Vision</h2>
          </div>
          <p className="text-slate-600 leading-relaxed text-lg sm:text-base font-medium">
            Jeppiaar Institute of Technology aspires to provide technical education in futuristic technologies with innovative, industrial, and social applications for the betterment of humanity.
          </p>
        </div>

        {/* MISSION CARD */}
        <div className="bg-brand-navy text-white rounded-[3rem] p-12 sm:p-16 shadow-2xl flex flex-col lg:row-span-2 relative overflow-hidden group">
          <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
            <Target className="w-64 h-64" />
          </div>
          <div className="flex items-center gap-6 sm:gap-8 mb-12 sm:mb-14 relative z-10">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-[1.8rem] flex items-center justify-center text-brand-blue shrink-0">
              <Target className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <h2 className="text-3xl sm:text-2xl font-black tracking-tight uppercase">Mission</h2>
          </div>
          <div className="space-y-8 sm:space-y-12 flex-grow relative z-10">
            {[
              "To produce competent professionals with necessary innovative and entrepreneurial skills.",
              "To improve quality through excellence in teaching, learning, and research.",
              "To provide excellent infrastructure and a stimulating learning environment.",
              "To strive for productive industry-institute partnerships for R&D.",
              "To serve the global community by instilling ethics and values among students."
            ].map((text, idx) => (
              <div key={idx} className="flex gap-6 group/item">
                <div className="w-3 h-3 rounded-full bg-brand-blue mt-3.5 shrink-0 group-hover/item:scale-150 transition-transform shadow-[0_0_15px_rgba(58,142,221,0.5)]" />
                <p className="text-blue-50 leading-relaxed text-lg sm:text-base font-medium">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* QUALITY POLICY CARD */}
        <div className="bg-white rounded-[3rem] p-12 sm:p-16 border border-slate-200 shadow-sm flex flex-col hover:shadow-xl transition-all group">
          <div className="flex items-center gap-6 sm:gap-8 mb-10 sm:mb-12">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-50 rounded-[1.8rem] flex items-center justify-center text-brand-blue shrink-0 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <h2 className="text-3xl sm:text-2xl font-black text-brand-navy tracking-tight uppercase">Quality Policy</h2>
          </div>
          <p className="text-slate-600 leading-relaxed text-lg sm:text-base font-medium">
            To pursue global standards of excellence in teaching, infrastructure, and research through continual improvement and Quality Management.
          </p>
        </div>
      </div>

      {/* INFRASTRUCTURE SECTION */}
      <div className="space-y-12 sm:space-y-16">
        <div className="flex items-center gap-6 px-2">
          <Library className="w-10 h-10 text-brand-blue" />
          <h3 className="text-3xl sm:text-2xl font-black text-brand-navy tracking-tight uppercase">Infrastructure Assets</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-12">
          {[
            { icon: Users, title: "Reading Areas", desc: ["Spacious reading halls", "Individual study spaces", "Ergonomic seating"] },
            { icon: BookOpen, title: "Reference Library", desc: ["Textbooks & References", "National/Intl. Journals", "Encyclopedias"], dark: true },
            { icon: Monitor, title: "Digital Center", desc: ["High-speed internet lab", "E-journals & Databases", "Institutional repository"] },
            { icon: Tv, title: "Multimedia Lab", desc: ["Audio-visual resources", "Educational video bank", "CD/DVD/Digital media"], dark: true },
            { icon: Search, title: "Research Lab", desc: ["Literature search help", "Plagiarism check", "Citation guidance"] },
            { icon: ClipboardList, title: "Circulation", desc: ["Circulation Desk", "OPAC Catalog Access", "Print/Scan/Photocopy"], dark: true },
            { icon: Zap, title: "Utilities", desc: ["Wi-Fi enabled premises", "Power charging points", "Extended working hours"] },
            { icon: UserCheck, title: "Scholarly Staff", desc: ["Helpful qualified staff", "User orientation", "Academic assistance"], dark: true }
          ].map((f, i) => (
            <div key={i} className={`rounded-[2.5rem] p-10 border transition-all hover:scale-[1.03] ${f.dark ? 'bg-brand-navy text-white border-transparent shadow-2xl' : 'bg-white text-slate-800 border-slate-200 shadow-sm hover:border-brand-blue/30'}`}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${f.dark ? 'bg-white/10 text-brand-blue' : 'bg-blue-50 text-brand-blue'}`}>
                <f.icon className="w-7 h-7" />
              </div>
              <h4 className="font-black text-xl sm:text-lg mb-6 leading-tight">{f.title}</h4>
              <ul className={`space-y-4 text-base sm:text-sm font-medium ${f.dark ? 'text-blue-100' : 'text-slate-600'}`}>
                {f.desc.map((d, j) => (
                  <li key={j} className="flex gap-4">
                    <div className={`w-2 h-2 rounded-full mt-2.5 shrink-0 ${f.dark ? 'bg-brand-blue' : 'bg-slate-300'}`} />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* HELP SECTION */}
      <div className="bg-blue-50 rounded-[3rem] sm:rounded-[4rem] p-12 sm:p-24 border border-brand-blue/20 flex flex-col md:flex-row items-center justify-between gap-12 sm:gap-20">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 sm:gap-12 text-center sm:text-left max-w-4xl">
          <div className="w-20 h-20 sm:w-28 sm:h-28 bg-white rounded-[2.5rem] shadow-xl border border-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
            <HelpCircle className="w-10 h-10 sm:w-14 h-14" />
          </div>
          <div>
            <h3 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight uppercase leading-tight">Need Academic Support?</h3>
            <p className="text-slate-600 text-lg sm:text-xl mt-6 font-medium leading-relaxed">
              Comprehensive orientation and research support are available for all students and faculty members.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 w-full md:w-auto">
          <a href="tel:+917401222005" className="px-12 py-6 bg-brand-navy text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] text-center hover:bg-brand-blue transition-all flex items-center justify-center gap-4 shadow-2xl active:scale-95 min-h-[72px]">
            <Phone className="w-6 h-6" />
            Contact Staff
          </a>
          <button className="px-12 py-6 bg-white border-2 border-slate-200 text-brand-navy rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] text-center hover:bg-slate-50 transition-all shadow-md active:scale-95 min-h-[72px]">
            User Manual
          </button>
        </div>
      </div>

    </div>
  );
};

export default Hero;
