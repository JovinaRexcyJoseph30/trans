import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RouteCard from './components/RouteCard';
import TransportAssistant from './components/TransportAssistant';
import { BUS_ROUTES, ANNOUNCEMENTS } from './constants';
import { Search, AlertTriangle, Calendar } from 'lucide-react';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRoutes = BUS_ROUTES.filter(route => 
    route.routeNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.via.some(stop => stop.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Bento Grid Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          
          {/* Quick Stats & Announcements */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Announcement Card */}
            <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-zinc-900 to-zinc-900 border border-zinc-800 rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Latest Updates
                </h3>
                <div className="space-y-4">
                  {ANNOUNCEMENTS.map(item => (
                    <div key={item.id} className="flex gap-4 p-3 rounded-xl bg-black/20 border border-white/5 hover:border-white/10 transition-colors">
                      <div className="flex-shrink-0 pt-1">
                        <div className={`w-2 h-2 rounded-full ${item.priority === 'High' ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`}></div>
                      </div>
                      <div>
                        <p className="text-sm text-zinc-200 font-medium leading-relaxed">{item.title}</p>
                        <p className="text-xs text-zinc-500 mt-1">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between">
               <div>
                  <h3 className="text-lg font-bold mb-2">Transport Office</h3>
                  <p className="text-sm text-zinc-400 mb-6">Need to apply for a new bus pass or report an issue?</p>
               </div>
               <div className="space-y-3">
                  <button className="w-full py-2.5 px-4 bg-white text-black text-sm font-semibold rounded-xl hover:bg-zinc-200 transition-colors">
                    Apply for Pass
                  </button>
                  <button className="w-full py-2.5 px-4 bg-zinc-800 text-white text-sm font-semibold rounded-xl hover:bg-zinc-700 transition-colors">
                    Report Issue
                  </button>
               </div>
            </div>
          </div>

          {/* Search Section */}
          <div className="mb-8 sticky top-20 z-30">
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-zinc-500" />
              </div>
              <input
                type="text"
                placeholder="Search by Route No, Stop name (e.g., 'Tambaram')..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 bg-zinc-900/80 backdrop-blur-xl border border-zinc-700 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-xl transition-all"
              />
            </div>
          </div>

          {/* Routes Grid */}
          <div className="mb-8">
             <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Available Routes</h2>
                <span className="text-sm text-zinc-500">{filteredRoutes.length} routes found</span>
             </div>
             
             {filteredRoutes.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {filteredRoutes.map(route => (
                   <RouteCard key={route.id} route={route} />
                 ))}
               </div>
             ) : (
                <div className="text-center py-20 bg-zinc-900/50 border border-zinc-800 rounded-3xl border-dashed">
                   <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-zinc-600" />
                   </div>
                   <h3 className="text-lg font-medium text-white">No routes found</h3>
                   <p className="text-zinc-500">Try searching for a different stop or route number.</p>
                </div>
             )}
          </div>

        </div>
      </main>
      
      <TransportAssistant />
      
      <footer className="border-t border-zinc-900 py-12 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="text-zinc-500 text-sm">
              © {new Date().getFullYear()} Jeppiaar Institute of Technology. All rights reserved.
           </div>
           <div className="flex gap-6 text-zinc-500">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default App;