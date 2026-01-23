
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
    <div className="space-y-8 lg:space-y-12 animate-in fade-in duration-700">
      
      {/* HEADER BANNER */}
      <div className="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <Library className="w-40 h-40" />
        </div>
        <div className="relative z-10">
          <h2 className="text-[10px] lg:text-xs font-bold text-brand-blue tracking-widest uppercase mb-2">Academic Excellence</h2>
          <h1 className="text-3xl lg:text-5xl font-extrabold text-brand-navy tracking-tight mb-6">Library Facilities</h1>
          <p className="text-slate-600 leading-relaxed text-sm lg:text-lg max-w-4xl font-medium">
            Our library is equipped with modern facilities to support academic learning, research, and innovation. 
            Designed to foster a culture of inquiry, it serves as the primary knowledge repository for the JIT community.
          </p>
        </div>
      </div>

      {/* VISION, MISSION & QUALITY POLICY SECTION - TWO COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 auto-rows-min">
        
        {/* VISION CARD - Order 1 */}
        <div className="order-1 lg:col-start-1 lg:row-start-1 bg-white rounded-2xl p-8 lg:p-10 border border-slate-200 shadow-sm flex flex-col hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-brand-blue shrink-0">
              <Lightbulb className="w-6 h-6" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-brand-navy tracking-tight">Vision</h2>
          </div>
          <p className="text-slate-600 leading-relaxed text-sm lg:text-base font-medium">
            Jeppiaar Institute of Technology aspires to provide technical education in futuristic technologies with the perspective of innovative, industrial, and social applications for the betterment of humanity.
          </p>
        </div>

        {/* MISSION CARD - Order 2 Mobile, Col 2 Desktop */}
        <div className="order-2 lg:col-start-2 lg:row-span-2 bg-brand-navy text-white rounded-2xl p-8 lg:p-10 shadow-xl flex flex-col hover:shadow-brand-blue/10 transition-shadow duration-300">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-brand-blue shrink-0">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">Mission</h2>
          </div>
          <div className="space-y-6 lg:space-y-8 flex-grow">
            {[
              "To produce competent and disciplined high-quality professionals with the practical skills necessary to excel as innovative professionals and entrepreneurs for the benefit of society.",
              "To improve the quality of education through excellence in teaching and learning, research, leadership, and by promoting the principles of scientific analysis and creative thinking.",
              "To provide excellent infrastructure, serene, and stimulating environment that is most conducive to learning.",
              "To strive for productive partnership between the Industry and the Institute for research and development in the emerging fields and creating opportunities for employability.",
              "To serve the global community by instilling ethics, values, and life skills among the students needed to enrich their lives."
            ].map((text, idx) => (
              <div key={idx} className="flex gap-4 group">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2.5 shrink-0 group-hover:scale-125 transition-transform" />
                <p className="text-blue-50 leading-relaxed text-sm lg:text-base font-medium">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* QUALITY POLICY CARD - Order 3 Mobile, Col 1 Desktop Row 2 */}
        <div className="order-3 lg:col-start-1 lg:row-start-2 bg-white rounded-2xl p-8 lg:p-10 border border-slate-200 shadow-sm flex flex-col hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-brand-blue shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-brand-navy tracking-tight">Quality Policy</h2>
          </div>
          <p className="text-slate-600 leading-relaxed text-sm lg:text-base font-medium">
            To pursue global standards of excellence in all our endeavours in teaching, infrastructure, resources, research and continuing education through continual improvement process and effectiveness of the Quality Management System.
          </p>
        </div>
      </div>

      {/* DETAILED LIBRARY FACILITIES GRID */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 px-1">
          <Library className="w-6 h-6 text-brand-blue" />
          <h3 className="text-xl lg:text-2xl font-bold text-brand-navy tracking-tight">Comprehensive Infrastructure</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          
          {/* Facility 1: Reading & Study Areas */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-brand-blue/30 transition-all">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-brand-blue mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-brand-navy mb-3">Reading & Study Areas</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" /> Spacious reading halls</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" /> Individual/group study spaces</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" /> Comfortable ergonomic seating</li>
            </ul>
          </div>

          {/* Facility 2: Book & Reference */}
          <div className="bg-brand-navy text-white rounded-2xl p-6 shadow-lg border border-transparent">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-brand-blue mb-4">
              <BookOpen className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white mb-3">Book & Reference</h4>
            <ul className="space-y-2 text-xs font-medium text-blue-100">
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1.5 shrink-0" /> Textbooks & References</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1.5 shrink-0" /> National/Intl. Journals</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1.5 shrink-0" /> Encyclopedias & Reports</li>
            </ul>
          </div>

          {/* Facility 3: Digital Library */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-brand-blue/30 transition-all">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-brand-blue mb-4">
              <Monitor className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-brand-navy mb-3">Digital Library</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" /> High-speed internet lab</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" /> E-journals & Databases</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" /> Institutional repository</li>
            </ul>
          </div>

          {/* Facility 4: Multimedia */}
          <div className="bg-brand-navy text-white rounded-2xl p-6 shadow-lg border border-transparent">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-brand-blue mb-4">
              <Tv className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white mb-3">Multimedia Facilities</h4>
            <ul className="space-y-2 text-xs font-medium text-blue-100">
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1.5 shrink-0" /> Audio-visual resources</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1.5 shrink-0" /> Educational video bank</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1.5 shrink-0" /> CD/DVD/Digital media</li>
            </ul>
          </div>

          {/* Facility 5: Research Support */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-brand-blue/30 transition-all">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-brand-blue mb-4">
              <Search className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-brand-navy mb-3">Research Support</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" /> Literature search help</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" /> Plagiarism check support</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" /> Citation guidance</li>
            </ul>
          </div>

          {/* Facility 6: Library Services */}
          <div className="bg-brand-navy text-white rounded-2xl p-6 shadow-lg border border-transparent">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-brand-blue mb-4">
              <ClipboardList className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white mb-3">Library Services</h4>
            <ul className="space-y-2 text-xs font-medium text-blue-100">
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1.5 shrink-0" /> Circulation (Issue/Return)</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1.5 shrink-0" /> OPAC Catalog Access</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1.5 shrink-0" /> Print/Scan/Photocopy</li>
            </ul>
          </div>

          {/* Facility 7: User Convenience */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-brand-blue/30 transition-all">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-brand-blue mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-brand-navy mb-3">User Convenience</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" /> Wi-Fi enabled premises</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" /> Power charging points</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" /> Extended working hours</li>
            </ul>
          </div>

          {/* Facility 8: Support & Assistance */}
          <div className="bg-brand-navy text-white rounded-2xl p-6 shadow-lg border border-transparent">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-brand-blue mb-4">
              <UserCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white mb-3">Support & Assistance</h4>
            <ul className="space-y-2 text-xs font-medium text-blue-100">
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1.5 shrink-0" /> Qualified helpful staff</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1.5 shrink-0" /> User orientation/training</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1.5 shrink-0" /> Scholarly assistance</li>
            </ul>
          </div>

        </div>
      </div>

      {/* SDG SECTION */}
      <section className="space-y-8 mt-12 animate-in slide-in-from-bottom-6 duration-700 delay-200">
        <div className="bg-brand-navy rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          <div className="p-8 lg:p-12 text-center">
            <p className="text-brand-blue font-bold text-[10px] lg:text-xs tracking-[0.4em] uppercase mb-4">Global Goals</p>
            <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tight flex flex-wrap items-center justify-center gap-x-4 gap-y-2 uppercase">
              Sustainable Development 
              <span className="text-brand-blue">
                GOALS
              </span>
            </h2>
            <div className="max-w-4xl mx-auto mt-8">
              <p className="text-blue-100 text-sm lg:text-base leading-relaxed font-medium">
                Our institutional library supports the United Nations Sustainable Development Goals by promoting inclusive education, equitable access to knowledge, research innovation, and responsible information sharing. Through digital resources, open-access initiatives, and academic support, the library actively contributes to sustainable development and global progress.
              </p>
            </div>
          </div>
          
          <div className="bg-white/5 p-8 lg:p-12 border-t border-white/5 flex justify-center">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpfEwDkVK2WhS70My8fV9HggrbSBF8EZdM8g&s" 
              alt="Sustainable Development Goals Unified Poster" 
              className="w-full max-w-[900px] h-auto rounded-xl shadow-2xl border border-white/10" 
            />
          </div>
        </div>
      </section>

      {/* HELP SECTION */}
      <div className="bg-blue-50 rounded-2xl p-8 lg:p-12 border border-brand-blue/20 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
            <HelpCircle className="w-9 h-9" />
          </div>
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold text-brand-navy tracking-tight">Need Assistance?</h3>
            <p className="text-slate-600 text-sm lg:text-base mt-2 font-medium">
              Our library staff provides dedicated orientation and research support for all students.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <a href="tel:+917401222005" className="px-8 py-4 bg-brand-navy text-white rounded-xl font-bold text-xs uppercase tracking-widest text-center hover:bg-brand-blue transition-colors flex items-center justify-center gap-3 shadow-lg">
            <Phone className="w-4 h-4" />
            Contact Staff
          </a>
          <button className="px-8 py-4 bg-white border border-slate-200 text-brand-navy rounded-xl font-bold text-xs uppercase tracking-widest text-center hover:bg-slate-50 transition-colors shadow-sm">
            User Manual
          </button>
        </div>
      </div>

    </div>
  );
};

export default Hero;
