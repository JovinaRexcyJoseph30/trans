import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero'; // Renamed conceptually to FacilityView in usage
import TransportAssistant from './components/TransportAssistant';
import Footer from './components/Footer';
import { 
  Bus, Images, ChevronRight, ClipboardList, CheckCircle2, MapPinned, 
  ExternalLink, Phone, Star, MapPin, ChevronDown, ChevronUp,
  IdCard, Clock, Armchair, Trash2, VolumeX, ShieldAlert, AlertTriangle, UserCheck, Info, ShieldCheck,
  LayoutDashboard
} from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'facility' | 'tracking' | 'rules' | 'gallery'>('facility');
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
  // Final destination set to "JIT Campus"
  const trackingRoutes = [
    { 
      id: 1, 
      number: '01', 
      name: 'ERNAOOR', 
      status: 'Can be seen on Track In app till 7:14 AM, Feb 11.', 
      url: 'https://app.gpstrack.in/url/gzHUADUs',
      pickUpPoints: ['Ernaoor', 'Thiruvottiyur', 'Tondiarpet', 'Tollgate', 'Royapuram', 'Central', 'Koyambedu', 'Maduravoyal', 'JIT Campus']
    },
    { 
      id: 2, 
      number: '02', 
      name: 'MANALI', 
      status: 'Can be seen on Track In app till 7:15 AM, Feb 11.', 
      url: 'https://app.gpstrack.in/url/iI8oKKD3',
      pickUpPoints: ['Manali', 'Madhavaram', 'Moolakadai', 'Perambur', 'Anna Nagar', 'Thirumangalam', 'Mogappair', 'JIT Campus']
    },
    { 
      id: 3, 
      number: '03', 
      name: 'THIRUVANMIYUR', 
      status: 'Can be seen on Track In app till 7:16 AM, Feb 11.', 
      url: 'https://app.gpstrack.in/url/R3TjQepA',
      pickUpPoints: ['Thiruvanmiyur', 'Adyar', 'Kotturpuram', 'Saidapet', 'Guindy', 'Porur', 'Poonamallee', 'JIT Campus']
    },
    { 
      id: 4, 
      number: '04', 
      name: 'VELACHERY', 
      status: 'Can be seen on Track In app till 7:16 AM, Feb 11.', 
      url: 'https://app.gpstrack.in/url/VP0E5fDr',
      pickUpPoints: ['Velachery', 'Vijaynagar', 'Medavakkam', 'Tambaram', 'Perungalathur', 'Padappai', 'Oragadam', 'JIT Campus']
    },
    { 
      id: 5, 
      number: '05', 
      name: 'KASIMEDU', 
      status: 'Can be seen on Track In app till 7:16 AM, Feb 11.', 
      url: 'https://app.gpstrack.in/url/RkuKqY6o',
      pickUpPoints: ['Kasimedu', 'Kalmandapam', 'Royapuram', 'Beach Station', 'Parrys', 'Central', 'Poonamallee', 'JIT Campus']
    },
    { 
      id: 6, 
      number: '07', 
      name: 'CHEYYAR', 
      status: 'Can be seen on Track In app till 7:17 AM, Feb 11.', 
      url: 'https://app.gpstrack.in/url/1ItpDoOn',
      pickUpPoints: ['Cheyyar', 'Vembakkam', 'Kanchipuram', 'Walajabad', 'Oragadam', 'JIT Campus']
    },
    { 
      id: 7, 
      number: '08', 
      name: 'ARCOT', 
      status: 'Can be seen on Track In app till 7:17 AM, Feb 11.', 
      url: 'https://app.gpstrack.in/url/HMTpbrEJ',
      pickUpPoints: ['Arcot', 'Walajapet', 'Kaveripakkam', 'Balu Chetty Chatram', 'Kanchipuram Bypass', 'JIT Campus']
    },
    { 
      id: 8, 
      number: '09', 
      name: 'CHENGALPATTU', 
      status: 'Can be seen on Track In app till 7:18 AM, Feb 11.', 
      url: 'https://app.gpstrack.in/url/iYpoUsyB',
      pickUpPoints: ['Chengalpattu', 'Paranur', 'Singaperumal Koil', 'Maraimalai Nagar', 'Guduvanchery', 'Vandalur', 'JIT Campus']
    },
    { 
      id: 9, 
      number: '10', 
      name: 'THIRUTHANI', 
      status: 'Can be seen on Track In app till 7:18 AM, Feb 11.', 
      url: 'https://app.gpstrack.in/url/BkMdpXMx',
      pickUpPoints: ['Thiruthani', 'Arakkonam', 'Thakkolam', 'Perambakkam', 'Sunguvarchatram', 'JIT Campus']
    },
    { 
      id: 10, 
      number: '11', 
      name: 'VANDHAVASI', 
      status: 'Can be seen on Track In app till 7:14 AM, Feb 11.', 
      url: 'https://app.gpstrack.in/url/N5FjbmAL',
      pickUpPoints: ['Vandhavasi', 'Thellar', 'Desur', 'Kanchipuram', 'Sunguvarchatram', 'JIT Campus']
    },
    { 
      id: 11, 
      number: '12', 
      name: 'VENGAI VASAL', 
      status: 'Can be seen on Track In app till 7:14 AM, Feb 11.', 
      url: 'https://app.gpstrack.in/url/5b26EYP6',
      pickUpPoints: ['Vengai Vasal', 'Sembakkam', 'Camp Road', 'Tambaram', 'Perungalathur', 'JIT Campus']
    },
    { 
      id: 12, 
      number: '14', 
      name: 'ASHOKEPILLAR', 
      status: 'Can be seen on Track In app till 7:15 AM, Feb 11.', 
      url: 'https://app.gpstrack.in/url/4Kid5TNH',
      pickUpPoints: ['Ashok Pillar', 'KK Nagar', 'Vadapalani', 'Valasaravakkam', 'Porur', 'JIT Campus']
    },
    { 
      id: 13, 
      number: '15', 
      name: 'CHENGALPATTU', 
      status: 'Can be seen on Track In app till 7:13 AM, Feb 11.', 
      url: 'https://app.gpstrack.in/url/NdopYWtG',
      pickUpPoints: ['Chengalpattu New Bus Stand', 'Mahindra World City', 'Singaperumal Koil', 'Walajabad', 'JIT Campus']
    },
    { 
      id: 14, 
      number: '16', 
      name: 'TN21 AU9096', 
      status: 'Can be seen on Track In app till 7:19 AM, Feb 11.', 
      url: 'https://app.gpstrack.in/url/9Gv4GCPS',
      pickUpPoints: ['Kanchipuram HO', 'Collectorate', 'Orikkai', 'Sevilimedu', 'Sunguvarchatram', 'JIT Campus']
    },
    { 
      id: 15, 
      number: '17', 
      name: 'THAKKOLAM', 
      status: 'Can be seen on Track In app till 7:13 AM, Feb 11.', 
      url: 'https://app.gpstrack.in/url/jhx9olDb',
      pickUpPoints: ['Thakkolam', 'Arakkonam Junction', 'Kaveripakkam', 'Balu Chetty Chatram', 'JIT Campus']
    },
  ];

  const filteredTrackingRoutes = trackingRoutes.filter(route => {
    if (showFavoritesOnly) {
      return favorites.includes(route.id.toString());
    }
    return true;
  });

  const rules = [
    { icon: IdCard, text: "Carry your college ID card when using the bus.", title: "Identity", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: Clock, text: "Arrive 5–10 minutes early at your stop.", title: "Punctuality", color: "text-emerald-600", bg: "bg-emerald-50" },
    { icon: Armchair, text: "Remain seated while the bus is moving.", title: "Safety", color: "text-indigo-600", bg: "bg-indigo-50" },
    { icon: Trash2, text: "Do not litter; keep the bus clean.", title: "Cleanliness", color: "text-amber-600", bg: "bg-amber-50" },
    { icon: VolumeX, text: "Avoid loud behavior or disturbing others.", title: "Discipline", color: "text-rose-600", bg: "bg-rose-50" },
    { icon: ShieldAlert, text: "Do not damage bus property.", title: "Responsibility", color: "text-orange-600", bg: "bg-orange-50" },
    { icon: AlertTriangle, text: "Do not lean outside the windows.", title: "Caution", color: "text-red-600", bg: "bg-red-50" },
    { icon: UserCheck, text: "Follow driver and staff instructions at all times.", title: "Obedience", color: "text-teal-600", bg: "bg-teal-50" }
  ];

  // Menu Configuration for Sidebar
  const menuItems = [
    { 
      id: 'facility', 
      label: 'Transport Facility', 
      icon: Bus, 
      desc: 'Services & Overview' 
    },
    { 
      id: 'tracking', 
      label: 'Bus Route Tracking', 
      icon: MapPinned, 
      desc: 'Live GPS Status' 
    },
    { 
      id: 'rules', 
      label: 'Transportation Rules', 
      icon: ClipboardList, 
      desc: 'Safety Guidelines' 
    },
    { 
      id: 'gallery', 
      label: 'Photo Gallery', 
      icon: Images, 
      desc: 'Campus Fleet' 
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 flex flex-col font-sans">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 flex-grow w-full">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          
          {/* Dashboard Sidebar Menu */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="sticky top-20">
              
              {/* Header Card */}
              <div className="bg-brand-navy rounded-2xl p-6 mb-6 shadow-xl relative overflow-hidden">
                <div className="absolute right-0 top-0 w-24 h-24 bg-white/5 rounded-full -mr-8 -mt-8 blur-2xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-2 opacity-80">
                    <LayoutDashboard className="w-4 h-4 text-brand-blue" />
                    <span className="text-xs font-bold text-white uppercase tracking-widest">Dashboard</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">Student Transport</h2>
                  <p className="text-blue-100 text-sm mt-1">Manage your daily commute</p>
                </div>
              </div>

              {/* Navigation Grid (Vertical) */}
              <nav className="space-y-3">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      className={`w-full text-left relative overflow-hidden rounded-xl p-4 transition-all duration-300 group border-2 ${
                        isActive 
                          ? 'bg-gradient-to-r from-brand-navy to-[#0f2a5e] border-brand-navy shadow-lg shadow-blue-900/20 translate-x-1' 
                          : 'bg-white border-white hover:border-brand-blue/30 hover:shadow-md hover:-translate-y-0.5'
                      }`}
                    >
                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-4">
                          <div className={`p-2.5 rounded-lg transition-colors ${
                            isActive ? 'bg-white/10 text-brand-blue' : 'bg-slate-50 text-slate-500 group-hover:bg-blue-50 group-hover:text-brand-blue'
                          }`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className={`font-bold text-sm ${isActive ? 'text-white' : 'text-slate-800'}`}>
                              {item.label}
                            </h3>
                            <p className={`text-xs mt-0.5 ${isActive ? 'text-blue-200' : 'text-slate-500'}`}>
                              {item.desc}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${
                          isActive ? 'text-white translate-x-1' : 'text-slate-300 group-hover:text-brand-blue group-hover:translate-x-1'
                        }`} />
                      </div>
                    </button>
                  );
                })}
              </nav>

              {/* Contact Card */}
              <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm text-center">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3 text-brand-blue">
                  <Phone className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Transport In-charge</p>
                <a href="tel:+917401222005" className="block text-lg font-bold text-brand-navy hover:text-brand-blue transition-colors font-mono">
                  +91 74012 22005
                </a>
              </div>
            </div>
          </div>

          {/* Right Main Content */}
          <div className="flex-1 min-w-0">
            
            {/* Tab: Transport Facility (Brochure View) */}
            {activeTab === 'facility' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <Hero />
              </div>
            )}

            {/* Tab: Bus Route Tracking */}
            {activeTab === 'tracking' && (
               <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden min-h-[600px] animate-in fade-in slide-in-from-right-4 duration-500">
                 <div className="px-6 py-8 sm:px-8 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-50 to-white">
                   <div>
                     <div className="flex items-center gap-2 mb-2">
                        <MapPinned className="w-5 h-5 text-brand-blue" />
                        <h2 className="text-xs font-bold text-brand-blue tracking-widest uppercase">Live Status</h2>
                     </div>
                     <h1 className="text-3xl font-bold text-brand-navy font-sans">Bus Route Tracking</h1>
                   </div>
                   <button
                    onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm ${
                      showFavoritesOnly 
                        ? 'bg-amber-100 text-amber-700 border border-amber-200' 
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-brand-navy'
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
                           <div key={route.id} className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                             isExpanded 
                               ? 'bg-white border-brand-blue/30 shadow-lg shadow-blue-900/5 ring-1 ring-brand-blue/10' 
                               : 'bg-white border-slate-200 hover:border-brand-blue/30 hover:shadow-md'
                           }`}>
                             
                             <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-5">
                               <div className="flex items-start md:items-center gap-4">
                                 <button 
                                   onClick={() => toggleFavorite(route.id.toString())}
                                   className={`p-2 rounded-full transition-colors ${isFavorite ? 'text-amber-400 bg-amber-50' : 'text-slate-300 hover:text-amber-400 hover:bg-slate-100'}`}
                                   title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                                 >
                                   <Star className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                                 </button>

                                 <div className="w-14 h-14 rounded-2xl bg-brand-navy text-white flex flex-col items-center justify-center flex-shrink-0 font-bold border-4 border-double border-white shadow-lg shadow-brand-navy/20 relative overflow-hidden group">
                                   <div className="absolute inset-0 bg-brand-blue opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                   <span className="text-[10px] opacity-70 leading-none mb-0.5">RT</span>
                                   <span className="text-xl leading-none">{route.number}</span>
                                 </div>
                                 
                                 <div>
                                   <h3 className="text-lg font-bold text-slate-800">{route.name}</h3>
                                   <div className="flex items-center gap-2 mt-1.5">
                                      <span className="relative flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                      </span>
                                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wide">{route.status}</p>
                                   </div>
                                 </div>
                               </div>

                               <div className="flex items-center justify-end gap-3 w-full md:w-auto pl-12 md:pl-0">
                                 <button
                                   onClick={() => toggleRouteExpansion(route.id)}
                                   className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-colors border ${
                                     isExpanded 
                                       ? 'bg-slate-100 text-slate-900 border-slate-200' 
                                       : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-brand-navy'
                                   }`}
                                 >
                                    <span className="hidden sm:inline">View Stops</span>
                                    {isExpanded ? <ChevronUp className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
                                 </button>

                                 <a 
                                    href="tel:+919884119946"
                                    className="p-2.5 bg-white border border-slate-200 text-slate-600 rounded-lg hover:text-brand-blue hover:border-brand-blue hover:bg-blue-50 transition-colors shadow-sm flex-shrink-0"
                                    title="Call Transport Coordinator"
                                  >
                                    <Phone className="w-5 h-5" />
                                 </a>
                                 <a 
                                   href={route.url} 
                                   target="_blank" 
                                   rel="noopener noreferrer"
                                   className="flex items-center gap-2 px-6 py-2.5 bg-brand-blue text-white rounded-lg hover:bg-blue-600 hover:-translate-y-0.5 transition-all shadow-lg shadow-blue-500/20 font-bold text-sm w-full md:w-auto justify-center group flex-grow md:flex-grow-0"
                                 >
                                   <span>Track</span>
                                   <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                 </a>
                               </div>
                             </div>

                             {isExpanded && (
                               <div className="border-t border-slate-100 bg-slate-50/50 p-6 sm:p-8 animate-in slide-in-from-top-2 duration-300">
                                  <div className="flex items-center gap-2 mb-8">
                                    <div className="p-1.5 bg-white rounded-md shadow-sm border border-slate-200">
                                      <MapPin className="w-4 h-4 text-brand-blue" />
                                    </div>
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Route Timeline</h4>
                                  </div>
                                  
                                  <div className="relative ml-2 sm:ml-4">
                                    {route.pickUpPoints.map((point, idx) => {
                                      const isLast = idx === route.pickUpPoints.length - 1;
                                      const isFirst = idx === 0;
                                      
                                      return (
                                        <div key={idx} className="relative flex gap-6 pb-10 last:pb-0 group/stop">
                                          {/* Vertical Path Connector */}
                                          {!isLast && (
                                            <div className="absolute left-[11px] top-8 bottom-0 w-[3px] bg-slate-200 group-hover/stop:bg-brand-blue/30 transition-colors rounded-full" aria-hidden="true" />
                                          )}

                                          {/* Node Indicator */}
                                          <div className={`relative z-10 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border-[3px] bg-white transition-all duration-300 ${
                                            isLast 
                                              ? 'border-brand-navy shadow-lg shadow-blue-900/10 scale-125' 
                                              : isFirst 
                                                ? 'border-emerald-500 shadow-md shadow-emerald-500/20 scale-110' 
                                                : 'border-slate-300 group-hover/stop:border-brand-blue group-hover/stop:scale-110'
                                          }`}>
                                            <div className={`w-2 h-2 rounded-full transition-colors ${
                                              isLast ? 'bg-brand-navy' : isFirst ? 'bg-emerald-500' : 'bg-slate-300 group-hover/stop:bg-brand-blue'
                                            }`} />
                                          </div>

                                          {/* Text Content */}
                                          <div className={`flex-grow -mt-2 transition-transform duration-300 ${isLast ? 'translate-x-1' : ''}`}>
                                             <div className={`inline-block ${isLast ? 'bg-brand-navy text-white px-4 py-3 rounded-xl shadow-lg shadow-brand-navy/20' : ''}`}>
                                                <h5 className={`text-sm leading-tight ${
                                                  isLast 
                                                    ? 'font-bold' 
                                                    : 'font-semibold text-slate-700'
                                                }`}>
                                                  {point}
                                                </h5>
                                                
                                                {isFirst && (
                                                  <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 uppercase tracking-wide">
                                                    Start Point
                                                  </span>
                                                )}
                                                
                                                {isLast && (
                                                  <div className="flex items-center gap-1.5 mt-1 text-[10px] text-blue-100 font-bold uppercase tracking-wide opacity-80">
                                                    <MapPinned className="w-3 h-3" />
                                                    <span>Destination</span>
                                                  </div>
                                                )}
                                             </div>
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
                       <div className="text-center py-16 bg-white border border-slate-200 border-dashed rounded-2xl">
                         <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                           <Star className="w-8 h-8 text-slate-300" />
                         </div>
                         <h3 className="text-lg font-bold text-slate-800">No favorite routes found</h3>
                         <p className="text-sm text-slate-500 mt-2">Mark routes with the star icon for quick access.</p>
                       </div>
                     )}
                   </div>

                   <div className="mt-8 p-5 bg-blue-50 border border-blue-100 rounded-xl flex gap-4 shadow-sm">
                      <div className="mt-0.5 p-2 bg-white rounded-lg shadow-sm border border-blue-100 h-fit">
                        <MapPinned className="w-5 h-5 text-brand-blue" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-brand-navy mb-1">GPS Tracking Notice</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          The links provided above redirect to the external <strong>Track In</strong> platform. 
                          Live status depends on the device connectivity. If a bus is not visible, it may be out of network coverage.
                        </p>
                      </div>
                   </div>
                 </div>
               </div>
            )}

            {/* Tab: Transportation Rules */}
            {activeTab === 'rules' && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden min-h-[600px] animate-in fade-in slide-in-from-right-4 duration-500">
                {/* Header Banner */}
                <div className="relative bg-gradient-to-r from-brand-navy to-brand-blue overflow-hidden">
                   <div className="absolute right-0 top-0 h-full w-1/3 bg-white/5 skew-x-12 transform origin-bottom-right"></div>
                   <div className="px-8 py-10 relative z-10">
                      <div className="flex items-center gap-2 mb-2">
                        <ShieldCheck className="w-5 h-5 text-emerald-400" />
                        <h2 className="text-xs font-bold text-blue-200 tracking-widest uppercase">College Bus Guidelines</h2>
                      </div>
                      <h1 className="text-3xl font-bold text-white font-sans">Safety & Courtesy</h1>
                      <p className="text-blue-100 text-sm mt-2 max-w-xl">
                        Ensuring a safe and pleasant commute for everyone starts with you. Please follow these guidelines on every journey.
                      </p>
                   </div>
                </div>

                <div className="p-6 sm:p-8 bg-slate-50/50">
                  {/* Quick Summary / Top Priorities */}
                  <div className="mb-8 bg-white border-l-4 border-brand-blue rounded-r-xl shadow-sm p-4 flex items-start gap-4">
                    <div className="p-2 bg-blue-50 rounded-full flex-shrink-0">
                      <Info className="w-5 h-5 text-brand-blue" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-brand-navy mb-1">Top Priorities</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Always carry your <strong>ID Card</strong>, arrive <strong>5 mins early</strong>, and remain <strong>seated</strong> for your safety.
                      </p>
                    </div>
                  </div>

                  {/* Rules Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                    {rules.map((rule, idx) => {
                      const Icon = rule.icon;
                      return (
                        <div 
                          key={idx} 
                          className="group bg-white rounded-xl p-5 border border-slate-200 hover:border-brand-blue/30 hover:shadow-lg hover:shadow-blue-900/5 transition-all duration-300 cursor-default flex items-start gap-4"
                        >
                          <div className={`w-12 h-12 rounded-xl ${rule.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                            <Icon className={`w-6 h-6 ${rule.color}`} />
                          </div>
                          <div>
                            <h3 className={`text-xs font-bold uppercase tracking-wider mb-1 ${rule.color} opacity-80`}>
                              {rule.title}
                            </h3>
                            <p className="text-sm font-medium text-slate-700 leading-relaxed group-hover:text-brand-navy transition-colors">
                              {rule.text}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Gallery (Placeholder) */}
            {activeTab === 'gallery' && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center min-h-[400px] flex flex-col items-center justify-center animate-in fade-in slide-in-from-right-4 duration-500">
                 <div className="w-24 h-24 bg-blue-50 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
                    <Images className="w-12 h-12 text-brand-blue" />
                 </div>
                 <h2 className="text-2xl font-bold text-brand-navy mb-3">Transport Gallery</h2>
                 <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
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