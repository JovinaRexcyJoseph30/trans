import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero'; // Renamed conceptually to FacilityView in usage
import TransportAssistant from './components/TransportAssistant';
import Footer from './components/Footer';
import { Bus, Images, ChevronRight, ClipboardList, CheckCircle2, MapPinned, ExternalLink, Phone, Star, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'facility' | 'gallery' | 'rules' | 'tracking'>('facility');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [expandedTrackingRouteId, setExpandedTrackingRouteId] = useState<number | null>(null);

  // Favorites State
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('jit_transport_favorites');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(id)
        ? prev.filter(favId => favId !== id)
        : [...prev, id];
      localStorage.setItem('jit_transport_favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const toggleRouteExpansion = (id: number) => {
    setExpandedTrackingRouteId(prev => (prev === id ? null : id));
  };

  // Tracking Data with Pick-Up Points
  const trackingRoutes = [
    { 
      id: 1, 
      number: '01', 
      name: 'ERNAOOR', 
      status: 'Can be seen on Track In app till 7:14 AM, Feb 11.', 
      url: 'https://app.gpstrack.in/url/gzHUADUs',
      pickUpPoints: ['Ernaoor', 'Thiruvottiyur', 'Tondiarpet', 'Tollgate', 'Royapuram', 'Central', 'Koyambedu', 'Maduravoyal', 'Jeppiaar Institute of Technology, Sriperumbudur']
    },
    { 
      id: 2, 
      number: '02', 
      name: 'MANALI', 
      status: 'Can be seen on Track In app till 7:15 AM, Feb 11.', 
      url: 'https://app.gpstrack.in/url/iI8oKKD3',
      pickUpPoints: ['Manali', 'Madhavaram', 'Moolakadai', 'Perambur', 'Anna Nagar', 'Thirumangalam', 'Mogappair', 'Jeppiaar Institute of Technology, Sriperumbudur']
    },
    { 
      id: 3, 
      number: '03', 
      name: 'THIRUVANMIYUR', 
      status: 'Can be seen on Track In app till 7:16 AM, Feb 11.', 
      url: 'https://app.gpstrack.in/url/R3TjQepA',
      pickUpPoints: ['Thiruvanmiyur', 'Adyar', 'Kotturpuram', 'Saidapet', 'Guindy', 'Porur', 'Poonamallee', 'Jeppiaar Institute of Technology, Sriperumbudur']
    },
    { 
      id: 4, 
      number: '04', 
      name: 'VELACHERY', 
      status: 'Can be seen on Track In app till 7:16 AM, Feb 11.', 
      url: 'https://app.gpstrack.in/url/VP0E5fDr',
      pickUpPoints: ['Velachery', 'Vijaynagar', 'Medavakkam', 'Tambaram', 'Perungalathur', 'Padappai', 'Oragadam', 'Jeppiaar Institute of Technology, Sriperumbudur']
    },
    { 
      id: 5, 
      number: '05', 
      name: 'KASIMEDU', 
      status: 'Can be seen on Track In app till 7:16 AM, Feb 11.', 
      url: 'https://app.gpstrack.in/url/RkuKqY6o',
      pickUpPoints: ['Kasimedu', 'Kalmandapam', 'Royapuram', 'Beach Station', 'Parrys', 'Central', 'Poonamallee', 'Jeppiaar Institute of Technology, Sriperumbudur']
    },
    { 
      id: 6, 
      number: '07', 
      name: 'CHEYYAR', 
      status: 'Can be seen on Track In app till 7:17 AM, Feb 11.', 
      url: 'https://app.gpstrack.in/url/1ItpDoOn',
      pickUpPoints: ['Cheyyar', 'Vembakkam', 'Kanchipuram', 'Walajabad', 'Oragadam', 'Jeppiaar Institute of Technology, Sriperumbudur']
    },
    { 
      id: 7, 
      number: '08', 
      name: 'ARCOT', 
      status: 'Can be seen on Track In app till 7:17 AM, Feb 11.', 
      url: 'https://app.gpstrack.in/url/HMTpbrEJ',
      pickUpPoints: ['Arcot', 'Walajapet', 'Kaveripakkam', 'Balu Chetty Chatram', 'Kanchipuram Bypass', 'Jeppiaar Institute of Technology, Sriperumbudur']
    },
    { 
      id: 8, 
      number: '09', 
      name: 'CHENGALPATTU', 
      status: 'Can be seen on Track In app till 7:18 AM, Feb 11.', 
      url: 'https://app.gpstrack.in/url/iYpoUsyB',
      pickUpPoints: ['Chengalpattu', 'Paranur', 'Singaperumal Koil', 'Maraimalai Nagar', 'Guduvanchery', 'Vandalur', 'Jeppiaar Institute of Technology, Sriperumbudur']
    },
    { 
      id: 9, 
      number: '10', 
      name: 'THIRUTHANI', 
      status: 'Can be seen on Track In app till 7:18 AM, Feb 11.', 
      url: 'https://app.gpstrack.in/url/BkMdpXMx',
      pickUpPoints: ['Thiruthani', 'Arakkonam', 'Thakkolam', 'Perambakkam', 'Sunguvarchatram', 'Jeppiaar Institute of Technology, Sriperumbudur']
    },
    { 
      id: 10, 
      number: '11', 
      name: 'VANDHAVASI', 
      status: 'Can be seen on Track In app till 7:14 AM, Feb 11.', 
      url: 'https://app.gpstrack.in/url/N5FjbmAL',
      pickUpPoints: ['Vandhavasi', 'Thellar', 'Desur', 'Kanchipuram', 'Sunguvarchatram', 'Jeppiaar Institute of Technology, Sriperumbudur']
    },
    { 
      id: 11, 
      number: '12', 
      name: 'VENGAI VASAL', 
      status: 'Can be seen on Track In app till 7:14 AM, Feb 11.', 
      url: 'https://app.gpstrack.in/url/5b26EYP6',
      pickUpPoints: ['Vengai Vasal', 'Sembakkam', 'Camp Road', 'Tambaram', 'Perungalathur', 'Jeppiaar Institute of Technology, Sriperumbudur']
    },
    { 
      id: 12, 
      number: '14', 
      name: 'ASHOKEPILLAR', 
      status: 'Can be seen on Track In app till 7:15 AM, Feb 11.', 
      url: 'https://app.gpstrack.in/url/4Kid5TNH',
      pickUpPoints: ['Ashok Pillar', 'KK Nagar', 'Vadapalani', 'Valasaravakkam', 'Porur', 'Jeppiaar Institute of Technology, Sriperumbudur']
    },
    { 
      id: 13, 
      number: '15', 
      name: 'CHENGALPATTU', 
      status: 'Can be seen on Track In app till 7:13 AM, Feb 11.', 
      url: 'https://app.gpstrack.in/url/NdopYWtG',
      pickUpPoints: ['Chengalpattu New Bus Stand', 'Mahindra World City', 'Singaperumal Koil', 'Walajabad', 'Jeppiaar Institute of Technology, Sriperumbudur']
    },
    { 
      id: 14, 
      number: '16', 
      name: 'TN21 AU9096', 
      status: 'Can be seen on Track In app till 7:19 AM, Feb 11.', 
      url: 'https://app.gpstrack.in/url/9Gv4GCPS',
      pickUpPoints: ['Kanchipuram HO', 'Collectorate', 'Orikkai', 'Sevilimedu', 'Sunguvarchatram', 'Jeppiaar Institute of Technology, Sriperumbudur']
    },
    { 
      id: 15, 
      number: '17', 
      name: 'THAKKOLAM', 
      status: 'Can be seen on Track In app till 7:13 AM, Feb 11.', 
      url: 'https://app.gpstrack.in/url/jhx9olDb',
      pickUpPoints: ['Thakkolam', 'Arakkonam Junction', 'Kaveripakkam', 'Balu Chetty Chatram', 'Jeppiaar Institute of Technology, Sriperumbudur']
    },
  ];

  const filteredTrackingRoutes = trackingRoutes.filter(route => {
    if (showFavoritesOnly) {
      return favorites.includes(route.id.toString());
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 flex flex-col">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Left Sidebar */}
          <div className="w-full md:w-72 flex-shrink-0">
            {/* Adjusted top offset to 5rem (80px) approx to sit below the new sticky nav (h-12 = 3rem) + gap */}
            <div className="bg-brand-navy rounded-2xl shadow-xl overflow-hidden sticky top-16 transition-all duration-300">
              <div className="p-6 border-b border-white/10 bg-gradient-to-r from-brand-navy to-[#0f2a5e]">
                <h3 className="text-xs font-bold text-brand-blue uppercase tracking-widest mb-1">FACILITIES</h3>
                <h2 className="text-2xl font-bold text-white">Transportation</h2>
              </div>
              <div className="p-3">
                <nav className="space-y-1">
                  
                  {/* 1. Transport Facility */}
                  <button
                    onClick={() => setActiveTab('facility')}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                      activeTab === 'facility' 
                        ? 'bg-brand-blue text-white shadow-md' 
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Bus className="w-5 h-5" />
                      <span className="font-medium">Transport Facility</span>
                    </div>
                    {activeTab === 'facility' && <ChevronRight className="w-4 h-4" />}
                  </button>

                  {/* 2. Bus Route Tracking */}
                  <button
                    onClick={() => setActiveTab('tracking')}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                      activeTab === 'tracking' 
                        ? 'bg-brand-blue text-white shadow-md' 
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <MapPinned className="w-5 h-5" />
                      <span className="font-medium">Bus Route Tracking</span>
                    </div>
                    {activeTab === 'tracking' && <ChevronRight className="w-4 h-4" />}
                  </button>

                  {/* 3. Photo Gallery */}
                  <button
                    onClick={() => setActiveTab('gallery')}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                      activeTab === 'gallery' 
                        ? 'bg-brand-blue text-white shadow-md' 
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Images className="w-5 h-5" />
                      <span className="font-medium">Photo Gallery</span>
                    </div>
                    {activeTab === 'gallery' && <ChevronRight className="w-4 h-4" />}
                  </button>

                  {/* 4. Transportation Rules */}
                  <button
                    onClick={() => setActiveTab('rules')}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                      activeTab === 'rules' 
                        ? 'bg-brand-blue text-white shadow-md' 
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <ClipboardList className="w-5 h-5" />
                      <span className="font-medium">Transportation Rules</span>
                    </div>
                    {activeTab === 'rules' && <ChevronRight className="w-4 h-4" />}
                  </button>
                </nav>
              </div>
              <div className="p-6 mt-4 bg-black/20 text-center">
                <p className="text-xs text-slate-400 mb-2">Transport In-charge</p>
                <div className="font-mono text-lg text-white font-bold">+91 74012 22005</div>
              </div>
            </div>
          </div>

          {/* Right Main Content */}
          <div className="flex-1 min-w-0">
            
            {/* Tab: Transport Facility (Brochure View) */}
            {activeTab === 'facility' && (
              <Hero />
            )}

            {/* Tab: Transportation Rules */}
            {activeTab === 'rules' && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden min-h-[600px] animate-in fade-in zoom-in-95 duration-300">
                <div className="px-8 pt-8 pb-4 border-b border-slate-100">
                  <h2 className="text-xs font-bold text-brand-blue tracking-widest uppercase mb-2">Guidelines</h2>
                  <h1 className="text-3xl font-bold text-brand-navy font-sans">Transportation Rules</h1>
                </div>
                
                <div className="p-8">
                  <div className="bg-slate-50 rounded-xl p-8 border border-slate-100">
                    <ul className="space-y-4">
                      {[
                        'Carry your college ID card when using the bus.',
                        'Arrive 5–10 minutes early at your stop.',
                        'Remain seated while the bus is moving.',
                        'Do not litter; keep the bus clean.',
                        'Avoid loud behavior or disturbing others.',
                        'Do not damage bus property.',
                        'Do not lean outside the windows.',
                        'Follow driver and staff instructions at all times.'
                      ].map((rule, idx) => (
                        <li key={idx} className="flex items-start gap-4">
                          <div className="flex-shrink-0 mt-0.5">
                            <CheckCircle2 className="w-5 h-5 text-brand-blue" />
                          </div>
                          <span className="text-slate-700 text-sm leading-relaxed font-medium">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Bus Route Tracking */}
            {activeTab === 'tracking' && (
               <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden min-h-[600px] animate-in fade-in zoom-in-95 duration-300">
                 <div className="px-8 pt-8 pb-4 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                   <div>
                     <h2 className="text-xs font-bold text-brand-blue tracking-widest uppercase mb-2">Live Tracking</h2>
                     <h1 className="text-3xl font-bold text-brand-navy font-sans">Bus Route Tracking</h1>
                   </div>
                   <button
                    onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      showFavoritesOnly 
                        ? 'bg-amber-50 text-amber-600 border border-amber-200' 
                        : 'bg-slate-50 text-slate-500 border border-slate-200 hover:bg-slate-100'
                    }`}
                   >
                     <Star className={`w-4 h-4 ${showFavoritesOnly ? 'fill-current' : ''}`} />
                     {showFavoritesOnly ? 'Favorites Only' : 'Show All'}
                   </button>
                 </div>
                 
                 <div className="p-6 sm:p-8">
                   <div className="flex flex-col gap-4">
                     {filteredTrackingRoutes.length > 0 ? (
                       filteredTrackingRoutes.map((route) => {
                         const isFavorite = favorites.includes(route.id.toString());
                         const isExpanded = expandedTrackingRouteId === route.id;
                         return (
                           <div key={route.id} className="bg-slate-50 rounded-xl border border-slate-200 hover:border-brand-blue/30 hover:shadow-md transition-all overflow-hidden">
                             
                             <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                               <div className="flex items-start md:items-center gap-4">
                                 <button 
                                   onClick={() => toggleFavorite(route.id.toString())}
                                   className={`p-2 rounded-full transition-colors ${isFavorite ? 'text-amber-400 bg-amber-50' : 'text-slate-300 hover:text-amber-400 hover:bg-slate-100'}`}
                                   title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                                 >
                                   <Star className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                                 </button>

                                 <div className="w-12 h-12 rounded-lg bg-brand-navy text-white flex flex-col items-center justify-center flex-shrink-0 font-bold border-2 border-brand-blue/30 shadow-sm">
                                   <span className="text-[10px] opacity-70 leading-none">RT</span>
                                   <span className="text-lg leading-none">{route.number}</span>
                                 </div>
                                 
                                 <div>
                                   <h3 className="text-lg font-bold text-slate-800">{route.name}</h3>
                                   <div className="flex items-center gap-2 mt-1">
                                      <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                      </span>
                                      <p className="text-xs text-slate-500 font-medium">{route.status}</p>
                                   </div>
                                 </div>
                               </div>

                               <div className="flex items-center justify-end gap-2 w-full md:w-auto">
                                 <button
                                   onClick={() => toggleRouteExpansion(route.id)}
                                   className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors border border-transparent hover:border-slate-200 ${
                                     isExpanded 
                                       ? 'bg-slate-200 text-slate-800' 
                                       : 'bg-white text-slate-600 hover:bg-slate-100'
                                   }`}
                                 >
                                    <span className="hidden sm:inline">View Route Info</span>
                                    {isExpanded ? <ChevronUp className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
                                 </button>

                                 <a 
                                    href="tel:+919884119946"
                                    className="p-3 bg-white border border-slate-200 text-slate-600 rounded-lg hover:text-brand-blue hover:border-brand-blue hover:bg-blue-50 transition-colors shadow-sm flex-shrink-0"
                                    title="Call Transport Coordinator"
                                  >
                                    <Phone className="w-5 h-5" />
                                 </a>
                                 <a 
                                   href={route.url} 
                                   target="_blank" 
                                   rel="noopener noreferrer"
                                   className="flex items-center gap-2 px-5 py-2.5 bg-brand-blue text-white rounded-lg hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20 font-medium text-sm w-full md:w-auto justify-center group flex-grow md:flex-grow-0"
                                 >
                                   <span>Track Live</span>
                                   <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                 </a>
                               </div>
                             </div>

                             {isExpanded && (
                               <div className="border-t border-slate-200 bg-white p-6 sm:p-8 animate-in slide-in-from-top-2 duration-200">
                                  <div className="flex items-center gap-2 mb-8">
                                    <MapPin className="w-4 h-4 text-brand-blue" />
                                    <h4 className="text-xs font-bold text-brand-blue uppercase tracking-widest">Route Path Timeline</h4>
                                  </div>
                                  
                                  <div className="relative ml-2 sm:ml-4">
                                    {route.pickUpPoints.map((point, idx) => {
                                      const isLast = idx === route.pickUpPoints.length - 1;
                                      const isFirst = idx === 0;
                                      
                                      return (
                                        <div key={idx} className="relative flex gap-6 pb-10 last:pb-0 group/stop">
                                          {/* Vertical Path Connector */}
                                          {!isLast && (
                                            <div className="absolute left-[11px] top-8 bottom-0 w-[3px] bg-slate-100 group-hover/stop:bg-brand-blue/20 transition-colors" aria-hidden="true" />
                                          )}

                                          {/* Node Indicator */}
                                          <div className={`relative z-10 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border-[3px] bg-white transition-all duration-300 ${
                                            isLast 
                                              ? 'border-brand-navy shadow-lg shadow-blue-900/10 scale-125' 
                                              : isFirst 
                                                ? 'border-emerald-500 shadow-md shadow-emerald-500/20' 
                                                : 'border-slate-300 group-hover/stop:border-brand-blue'
                                          }`}>
                                            <div className={`w-2 h-2 rounded-full transition-colors ${
                                              isLast ? 'bg-brand-navy' : isFirst ? 'bg-emerald-500' : 'bg-slate-300 group-hover/stop:bg-brand-blue'
                                            }`} />
                                          </div>

                                          {/* Text Content */}
                                          <div className={`flex-grow -mt-2 ${isLast ? 'bg-brand-navy/5 p-4 rounded-xl border border-brand-navy/10' : ''}`}>
                                             <h5 className={`text-sm leading-tight ${
                                               isLast 
                                                 ? 'font-bold text-brand-navy text-base' 
                                                 : 'font-semibold text-slate-700'
                                             }`}>
                                               {point}
                                             </h5>
                                             
                                             {isFirst && (
                                               <span className="inline-block mt-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 uppercase tracking-wide">
                                                 Start Point
                                               </span>
                                             )}
                                             
                                             {isLast && (
                                               <div className="flex items-center gap-1.5 mt-2 text-xs text-brand-navy font-bold uppercase tracking-wide">
                                                 <MapPinned className="w-3.5 h-3.5" />
                                                 <span>Final Destination</span>
                                               </div>
                                             )}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                               </div>
                             )}

                           </div>
                         );
                       })
                     ) : (
                       <div className="text-center py-12 bg-slate-50 border border-slate-200 border-dashed rounded-xl">
                         <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                           <Star className="w-6 h-6 text-slate-300" />
                         </div>
                         <h3 className="text-sm font-bold text-slate-700">No favorite routes found</h3>
                         <p className="text-xs text-slate-500 mt-1">Mark routes with the star icon to see them here.</p>
                       </div>
                     )}
                   </div>

                   <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-lg flex gap-3">
                      <div className="mt-1">
                        <MapPinned className="w-5 h-5 text-brand-blue" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-brand-navy">Note regarding GPS Tracking</h4>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          The links provided above redirect to the external <strong>Track In</strong> application platform. 
                          Live status depends on the device connectivity on the bus. If a bus is not visible, it may be out of network coverage area.
                        </p>
                      </div>
                   </div>
                 </div>
               </div>
            )}

            {/* Tab: Gallery (Placeholder) */}
            {activeTab === 'gallery' && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center min-h-[400px] flex flex-col items-center justify-center">
                 <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
                    <Images className="w-10 h-10 text-brand-blue/40" />
                 </div>
                 <h2 className="text-xl font-bold text-brand-navy mb-2">Transport Gallery</h2>
                 <p className="text-slate-500 max-w-md mx-auto">
                   Images of our fleet, safety measures, and facility infrastructure will be updated here shortly.
                 </p>
              </div>
            )}

          </div>
        </div>
      </main>
      
      <TransportAssistant />
      
      <Footer />
    </div>
  );
};

export default App;