import React from 'react';
import { Clock, GraduationCap, ShieldCheck, Map, MousePointerClick } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden min-h-[600px]">
      {/* Header */}
      <div className="px-8 pt-8 pb-4 border-b border-slate-100">
        <h2 className="text-xs font-bold text-brand-blue tracking-widest uppercase mb-2">Transport</h2>
        <h1 className="text-3xl font-bold text-brand-navy font-sans">Our Service</h1>
      </div>

      {/* Content */}
      <div className="p-8 space-y-10">

        {/* Punctual Coverage */}
        <section className="flex gap-4">
          <div className="flex-shrink-0 mt-1">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <Clock className="w-5 h-5 text-brand-blue" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Punctual and Comprehensive Coverage</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Our buses are meticulously scheduled to cover various pickup points across the city and its
              surrounding neighborhoods, guaranteeing a predictable and stress-free daily commute for
              all users. The goal is simple: ensure every journey to and from the college is safe and on time.
            </p>
          </div>
        </section>

        {/* Academic Success */}
        <section className="flex gap-4">
          <div className="flex-shrink-0 mt-1">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-3">Extended Service for Academic Success</h3>
            <p className="text-slate-600 leading-relaxed text-sm mb-4">
              Beyond the regular daily schedule, the transport facility plays a crucial role in supporting the
              college's academic and extracurricular calendar. The service is routinely extended for
              essential special programs, including:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'After-hours special coaching classes',
                'Placement and training activities',
                'Visits to local industries and hospitals',
                'NSS camps and student welfare initiatives'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Safety */}
        <section className="flex gap-4">
          <div className="flex-shrink-0 mt-1">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <div className="flex-grow">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Safety and Transparency</h3>
            <p className="text-slate-600 leading-relaxed text-sm mb-4">
              For peace of mind, every bus in our fleet is equipped with advanced tracking mechanisms.
            </p>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-24 h-24 bg-brand-blue/5 rounded-full -mr-8 -mt-8 blur-xl group-hover:bg-brand-blue/10 transition-colors"></div>
              <div className="relative z-10">
                <h4 className="text-sm font-bold text-brand-navy mb-2 flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-blue"></span>
                  </span>
                  Real-time Tracking
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  The parents and students can track the route progress,via the provided website link, offering full transparency and enhanced security throughout the journey. This systematic approach ensures high standards of safety and reliability, making the college transport system the best option for your daily commute.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-8 pt-4">
          {/* GPS */}
          <section className="flex gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                <Map className="w-5 h-5 text-amber-600" />
              </div>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 mb-2">Real-time GPS Tracking</h3>
              <p className="text-slate-600 leading-relaxed text-xs">
                Every bus is equipped with modern GPS tracking technology. The exact location of any bus in
                the fleet can be monitored in real time using a dedicated platform, such as the Track In app.
              </p>
            </div>
          </section>

          {/* Monitoring */}
          <section className="flex gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center">
                <MousePointerClick className="w-5 h-5 text-rose-600" />
              </div>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 mb-2">Convenient Monitoring</h3>
              <p className="text-slate-600 leading-relaxed text-xs">
                Users can access a unique link to track specific routes live. This removes uncertainty and
                assures everyone about safety and estimated arrival times.
              </p>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
};

export default Hero;