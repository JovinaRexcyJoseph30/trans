
import React from 'react';
import { 
  Book, GraduationCap, Laptop, Library, History, 
  Search, ShieldCheck, Clock, Phone, CheckCircle2, 
  Printer, BookOpen, Database, HelpCircle, Lightbulb, Target,
  Users, Monitor, Wifi, VolumeX, Info, Tv, Zap, ClipboardList,
  Coffee, UserCheck
} from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="space-y-6 sm:space-y-12 animate-in fade-in duration-700">
      
      {/* HEADER BANNER - Responsive padding and font sizes */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-12 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 hidden sm:block">
           <Library className="w-40 h-40" />
        </div>
        <div className="relative z-10">
          <h2 className="text-[9px] sm:text-[10px] lg:text-xs font-bold text-brand-blue tracking-widest uppercase mb-2">Academic Excellence</h2>
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-brand-navy tracking-tight mb-4 sm:mb-6 leading-tight">Library Facilities</h1>
          <p className="text-slate-600 leading-relaxed text-sm lg:text-lg max-w-4xl font-medium">
            Equipped with modern facilities to support academic learning, research, and innovation. Designing a primary knowledge repository for the JIT community.
          </p>
        </div>
      </div>

      {/* VISION, MISSION & QUALITY POLICY SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 auto-rows-min">
        
        {/* VISION CARD */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm flex flex-col hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 rounded-lg sm:rounded-xl flex items-center justify-center text-brand-blue shrink-0">
              <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h2 className="text-xl sm:text-3xl font-bold text-brand-navy tracking-tight">Vision</h2>
          </div>
          <p className="text-slate-600 leading-relaxed text-sm lg:text-base font-medium">
            Jeppiaar Institute of Technology aspires to provide technical education in futuristic technologies with innovative, industrial, and social applications for the betterment of humanity.
          </p>
        </div>

        {/* MISSION CARD */}
        <div className="bg-brand-navy text-white rounded-xl sm:rounded-2xl p-6 sm:p-10 shadow-xl flex flex-col lg:row-span-2">
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-lg sm:rounded-xl flex items-center justify-center text-brand-blue shrink-0">
              <Target className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h2 className="text-xl sm:text-3xl font-bold tracking-tight">Mission</h2>
          </div>
          <div className="space-y-4 sm:space-y-8 flex-grow">
            {[
              "To produce competent professionals with necessary innovative and entrepreneurial skills.",
              "To improve quality through excellence in teaching, learning, and research.",
              "To provide excellent infrastructure and a stimulating learning environment.",
              "To strive for productive industry-institute partnerships for R&D.",
              "To serve the global community by instilling ethics and values among students."
            ].map((text, idx) => (
              <div key={idx} className="flex gap-3 sm:gap-4 group">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2 sm:mt-2.5 shrink-0 group-hover:scale-125 transition-transform" />
                <p className="text-blue-50 leading-relaxed text-xs sm:text-base font-medium">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* QUALITY POLICY CARD */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm flex flex-col hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 rounded-lg sm:rounded-xl flex items-center justify-center text-brand-blue shrink-0">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h2 className="text-xl sm:text-3xl font-bold text-brand-navy tracking-tight">Quality Policy</h2>
          </div>
          <p className="text-slate-600 leading-relaxed text-sm lg:text-base font-medium">
            To pursue global standards of excellence in teaching, infrastructure, and research through continual improvement and Quality Management.
          </p>
        </div>
      </div>

      {/* DETAILED LIBRARY FACILITIES GRID - Responsive Columns */}
      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3 px-1">
          <Library className="w-5 h-5 sm:w-6 sm:h-6 text-brand-blue" />
          <h3 className="text-lg sm:text-2xl font-bold text-brand-navy tracking-tight uppercase">Infrastructure</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {[
            { icon: Users, title: "Reading Areas", desc: ["Spacious reading halls", "Individual study spaces", "Ergonomic seating"] },
            { icon: BookOpen, title: "Book & Reference", desc: ["Textbooks & References", "National/Intl. Journals", "Encyclopedias"], dark: true },
            { icon: Monitor, title: "Digital Library", desc: ["High-speed internet lab", "E-journals & Databases", "Institutional repository"] },
            { icon: Tv, title: "Multimedia", desc: ["Audio-visual resources", "Educational video bank", "CD/DVD/Digital media"], dark: true },
            { icon: Search, title: "Research Support", desc: ["Literature search help", "Plagiarism check", "Citation guidance"] },
            { icon: ClipboardList, title: "Library Services", desc: ["Circulation Desk", "OPAC Catalog Access", "Print/Scan/Photocopy"], dark: true },
            { icon: Zap, title: "User Convenience", desc: ["Wi-Fi enabled premises", "Power charging points", "Extended working hours"] },
            { icon: UserCheck, title: "Support Staff", desc: ["Helpful qualified staff", "User orientation", "Scholarly assistance"], dark: true }
          ].map((f, i) => (
            <div key={i} className={`rounded-xl sm:rounded-2xl p-5 sm:p-6 border transition-all ${f.dark ? 'bg-brand-navy text-white border-transparent shadow-lg' : 'bg-white text-slate-800 border-slate-200 shadow-sm hover:border-brand-blue/30'}`}>
              <div className={`w-10 h-10 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 ${f.dark ? 'bg-white/10 text-brand-blue' : 'bg-blue-50 text-brand-blue'}`}>
                <f.icon className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm sm:text-base mb-3">{f.title}</h4>
              <ul className={`space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs font-medium ${f.dark ? 'text-blue-100' : 'text-slate-600'}`}>
                {f.desc.map((d, j) => (
                  <li key={j} className="flex gap-2">
                    <div className={`w-1 h-1 rounded-full mt-1.5 shrink-0 ${f.dark ? 'bg-brand-blue' : 'bg-slate-300'}`} />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* SDG SECTION - Optimized for mobile width */}
      <section className="mt-8 sm:mt-12 animate-in slide-in-from-bottom-6 duration-700">
        <div className="bg-brand-navy rounded-xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10">
          <div className="p-6 sm:p-12 text-center">
            <p className="text-brand-blue font-bold text-[9px] sm:text-[10px] tracking-[0.4em] uppercase mb-4">Global Goals</p>
            <h2 className="text-xl sm:text-5xl font-black text-white tracking-tight flex flex-wrap items-center justify-center gap-x-3 gap-y-1 uppercase">
              Sustainable 
              <span className="text-brand-blue">GOALS</span>
            </h2>
            <div className="max-w-4xl mx-auto mt-6 sm:mt-8">
              <p className="text-blue-100 text-xs sm:text-base leading-relaxed font-medium">
                Our institutional library supports the United Nations Sustainable Development Goals by promoting inclusive education and equitable access to knowledge.
              </p>
            </div>
          </div>
          
          <div className="bg-white/5 p-4 sm:p-12 border-t border-white/5 flex justify-center">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpfEwDkVK2WhS70My8fV9HggrbSBF8EZdM8g&s" 
              alt="SDG Poster" 
              className="w-full max-w-[800px] h-auto rounded-lg sm:rounded-xl shadow-2xl border border-white/10" 
            />
          </div>
        </div>
      </section>

      {/* HELP SECTION - Stack on mobile */}
      <div className="bg-blue-50 rounded-xl sm:rounded-2xl p-6 sm:p-12 border border-brand-blue/20 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
        <div className="flex items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
            <HelpCircle className="w-7 h-7 sm:w-9 h-9" />
          </div>
          <div>
            <h3 className="text-lg sm:text-3xl font-bold text-brand-navy tracking-tight">Need Assistance?</h3>
            <p className="text-slate-600 text-[11px] sm:text-base mt-1 sm:mt-2 font-medium">
              Orientation and research support for all students.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <a href="tel:+917401222005" className="px-6 sm:px-8 py-3.5 sm:py-4 bg-brand-navy text-white rounded-xl font-bold text-[10px] sm:text-xs uppercase tracking-widest text-center hover:bg-brand-blue transition-all flex items-center justify-center gap-2.5 shadow-lg min-h-[48px]">
            <Phone className="w-4 h-4" />
            Contact Staff
          </a>
          <button className="px-6 sm:px-8 py-3.5 sm:py-4 bg-white border border-slate-200 text-brand-navy rounded-xl font-bold text-[10px] sm:text-xs uppercase tracking-widest text-center hover:bg-slate-50 transition-all shadow-sm min-h-[48px]">
            User Manual
          </button>
        </div>
      </div>

    </div>
  );
};

export default Hero;
