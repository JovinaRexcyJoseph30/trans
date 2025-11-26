import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-10 opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Live Tracking Active
        </div>
        
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-6">
          The smart way to <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
            commute to campus.
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg text-zinc-400 mb-10 leading-relaxed">
          Real-time bus tracking, instant route search, and AI-powered assistance for all Jeppiaar Institute of Technology students and staff.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
            Find my bus
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="w-full sm:w-auto px-8 py-3 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white font-semibold rounded-xl transition-all">
            Download Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;