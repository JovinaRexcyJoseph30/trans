import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import {
    Bus, Images, ChevronRight, ClipboardList, CheckCircle2, MapPinned,
    ExternalLink, Phone, Star, MapPin, ChevronDown, ChevronUp,
    IdCard, Clock, Armchair, Trash2, VolumeX, ShieldAlert, AlertTriangle, UserCheck, Info, ShieldCheck,
    LayoutDashboard, CalendarCheck, Search, X, FileText, Download
} from 'lucide-react';

type RouteAvailability = 'available' | 'not-available' | 'rerouted';

interface Route {
    id: number;
    number: string;
    name: string;
    busNumber: string;
    status: string;
    availability: RouteAvailability;
    driverName: string;
    driverPhone: string;
    url: string;
    pickUpPoints: string[];
}

declare const __app_id: string | undefined;

const Transport: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'facility' | 'tracking' | 'rules' | 'gallery' | 'schedule'>('tracking');
    const [favorites, setFavorites] = useState<string[]>(() => {
        const saved = localStorage.getItem('transportFavorites');
        return saved ? JSON.parse(saved) : [];
    });
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [expandedTrackingRouteId, setExpandedTrackingRouteId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSchedule, setSelectedSchedule] = useState<{ number: string; url: string } | null>(null);

    // Get App ID for dynamic paths
    const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

    useEffect(() => {
        localStorage.setItem('transportFavorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (routeId: string) => {
        setFavorites(prev =>
            prev.includes(routeId)
                ? prev.filter(id => id !== routeId)
                : [...prev, routeId]
        );
    };

    const toggleRouteExpansion = (routeId: number) => {
        setExpandedTrackingRouteId(expandedTrackingRouteId === routeId ? null : routeId);
    };

    // Tracking Data with Pick-Up Points
    // Final destination set to "JIT Campus"
    const trackingRoutes: Route[] = [
        {
            id: 1,
            number: '01',
            name: 'ERNAOOR',
            busNumber: 'TN-11-JIT-1001',
            status: 'ON TIME',
            availability: 'available',
            driverName: 'Mr. Viji',
            driverPhone: '+919003177451',
            url: 'https://app.gpstrack.in/url/gy5ZETVv',
            pickUpPoints: ['Ernaoor', 'Thiruvottiyur', 'Tondiarpet', 'Tollgate', 'Royapuram', 'Central', 'Koyambedu', 'Maduravoyal', 'JIT Campus']
        },
        {
            id: 2,
            number: '02',
            name: 'MANALI',
            busNumber: 'TN-12-JIT-1002',
            status: 'ON TIME',
            availability: 'available',
            driverName: 'Mr. Santhiyagu',
            driverPhone: '+919840135188',
            url: 'https://app.gpstrack.in/url/kv9El653',
            pickUpPoints: ['Manali', 'Madhavaram', 'Moolakadai', 'Perambur', 'Anna Nagar', 'Thirumangalam', 'Mogappair', 'JIT Campus']
        },
        {
            id: 3,
            number: '03',
            name: 'THIRUVANMIYUR',
            busNumber: 'TN-13-JIT-1003',
            status: 'CANCELLED',
            availability: 'not-available',
            driverName: 'Mr. Akbar',
            driverPhone: '+919940696784',
            url: 'https://app.gpstrack.in/url/bFJj0S73',
            pickUpPoints: ['Thiruvanmiyur', 'Adyar', 'Kotturpuram', 'Saidapet', 'Guindy', 'Porur', 'Poonamallee', 'JIT Campus']
        },
        {
            id: 4,
            number: '04',
            name: 'VELACHERY',
            busNumber: 'TN-14-JIT-1004',
            status: 'REROUTED',
            availability: 'available',
            driverName: 'Mr. Manikandan',
            driverPhone: '+919444897362',
            url: 'https://app.gpstrack.in/url/6PdZmT04',
            pickUpPoints: ['Velachery', 'Vijaynagar', 'Medavakkam', 'Tambaram', 'Perungalathur', 'Padappai', 'Oragadam', 'JIT Campus']
        },
        {
            id: 5,
            number: '05',
            name: 'KASIMEDU',
            busNumber: 'TN-15-JIT-1005',
            status: 'ON TIME',
            availability: 'available',
            driverName: 'Mr. Kumaran',
            driverPhone: '+918122048344',
            url: 'https://app.gpstrack.in/url/ru45Wtnz',
            pickUpPoints: ['Kasimedu', 'Kalmandapam', 'Royapuram', 'Beach Station', 'Parrys', 'Central', 'Poonamallee', 'JIT Campus']
        },
        {
            id: 6,
            number: '06',
            name: 'REDHILLS',
            busNumber: 'TN-16-JIT-1006',
            status: 'ON TIME',
            availability: 'available',
            driverName: 'Mr. Dharani',
            driverPhone: '+919042757947',
            url: 'https://app.gpstrack.in/url/7dnvmSVV',
            pickUpPoints: ['Redhills', 'Kalliluppam', 'Vaishnavi Nagar', 'Avadi', 'Nemilichery', 'Kakkalur Bypass', 'Sriperumbudur', 'JIT Campus']
        },
        {
            id: 7,
            number: '07',
            name: 'CHEYYAR',
            busNumber: 'TN-17-JIT-1007',
            status: 'REROUTED',
            availability: 'rerouted',
            driverName: 'Mr. Vadivel',
            driverPhone: '+919788888604',
            url: 'https://app.gpstrack.in/url/zRGdhirS',
            pickUpPoints: ['Arcot', 'Walajapet', 'Kaveripakkam', 'Balu Chetty Chatram', 'Kanchipuram Bypass', 'JIT Campus']
        },
        {
            id: 8,
            number: '08',
            name: 'ARCOT',
            busNumber: 'TN-18-JIT-1008',
            status: 'REROUTED',
            availability: 'rerouted',
            driverName: 'Mr. Naveen Kumar',
            driverPhone: '+919944216762',
            url: 'https://app.gpstrack.in/url/nsAIMw1W',
            pickUpPoints: ['Arcot', 'Walajapet', 'Kaveripakkam', 'Balu Chetty Chatram', 'Kanchipuram Bypass', 'JIT Campus']
        },
        {
            id: 9,
            number: '09',
            name: 'CHENGALPATTU',
            busNumber: 'TN-18-JIT-1008',
            status: 'ON TIME',
            availability: 'available',
            driverName: 'Mr. Anandan',
            driverPhone: '+919444661139',
            url: 'https://app.gpstrack.in/url/k6qOMEnu',
            pickUpPoints: ['Chengalpattu Bypass', 'Paranur', 'Singaperumal Koil', 'Maraimalai Nagar', 'Guduvanchery', 'Vandalur', 'JIT Campus']
        },
        {
            id: 10,
            number: '10',
            name: 'THIRUTHANI',
            busNumber: 'TN-19-JIT-1009',
            status: 'CANCELLED',
            availability: 'not-available',
            driverName: 'Mr. Ravi',
            driverPhone: '+919445164676',
            url: 'https://app.gpstrack.in/url/ZR8mCneg',
            pickUpPoints: ['Thiruthani', 'Arakkonam', 'Thakkolam', 'Perambakkam', 'Sunguvarchatram', 'JIT Campus']
        },
        {
            id: 11,
            number: '11',
            name: 'VANDHAVASI',
            busNumber: 'TN-20-JIT-1010',
            status: 'CANCELLED',
            availability: 'not-available',
            driverName: 'Mr. Murugan',
            driverPhone: '+919791931561',
            url: 'https://app.gpstrack.in/url/N5FjbmAL',
            pickUpPoints: ['Vandhavasi', 'Thellar', 'Desur', 'Kanchipuram', 'Sunguvarchatram', 'JIT Campus']
        },
        {
            id: 12,
            number: '12',
            name: 'VENGAI VASAL',
            busNumber: 'TN-21-JIT-1011',
            status: 'ON TIME',
            availability: 'available',
            driverName: 'Mr. Selvam',
            driverPhone: '+919876543220',
            url: 'https://app.gpstrack.in/url/z2eIb665',
            pickUpPoints: ['Vengai Vasal', 'Sembakkam', 'Camp Road', 'Tambaram', 'Perungalathur', 'JIT Campus']
        },
        {
            id: 13,
            number: '13',
            name: 'KILAMBI',
            busNumber: 'TN-22-JIT-1012',
            status: 'ON TIME',
            availability: 'available',
            driverName: 'Mr. Karthik',
            driverPhone: '+919876543221',
            url: 'https://app.gpstrack.in/url/h7sc2F7d',
            pickUpPoints: ['Ashok Pillar', 'KK Nagar', 'Vadapalani', 'Valasaravakkam', 'Porur', 'JIT Campus']
        },
        {
            id: 14,
            number: '14',
            name: 'ASHOKEPILLAR',
            busNumber: 'TN-22-JIT-1012',
            status: 'ON TIME',
            availability: 'available',
            driverName: 'Mr. Karthik',
            driverPhone: '+919876543221',
            url: 'https://app.gpstrack.in/url/dysn23Hz',
            pickUpPoints: ['Ashok Pillar', 'KK Nagar', 'Vadapalani', 'Valasaravakkam', 'Porur', 'JIT Campus']
        },
        {
            id: 15,
            number: '15',
            name: 'CHENGALPATTU',
            busNumber: 'TN-23-JIT-1013',
            status: 'ON TIME',
            availability: 'available',
            driverName: 'Mr. Sakthivel',
            driverPhone: '+919962166053',
            url: 'https://app.gpstrack.in/url/s6rNSOCS',
            pickUpPoints: ['Chengalpattu New Bus Stand', 'Mahindra World City', 'Singaperumal Koil', 'Walajabad', 'JIT Campus']
        },
        {
            id: 16,
            number: '16',
            name: 'ROUTE',
            busNumber: 'TN-24-JIT-1014',
            status: 'ON TIME',
            availability: 'available',
            driverName: 'Mr. Mani',
            driverPhone: '+919876543223',
            url: 'https://app.gpstrack.in/url/9Gv4GCPS',
            pickUpPoints: ['Kanchipuram HO', 'Collectorate', 'Orikkai', 'Sevilimedu', 'Sunguvarchatram', 'JIT Campus']
        },
        {
            id: 17,
            number: '17',
            name: 'THAKKOLAM',
            busNumber: 'TN-25-JIT-1015',
            status: 'ON TIME',
            availability: 'available',
            driverName: 'Mr. Siva',
            driverPhone: '+919876543224',
            url: 'https://app.gpstrack.in/url/jhx9olDb',
            pickUpPoints: ['Thakkolam', 'Arakkonam Junction', 'Kaveripakkam', 'Balu Chetty Chatram', 'JIT Campus']
        },
    ];

    const filteredTrackingRoutes = trackingRoutes.filter(route => {
        const matchesSearch = searchQuery === '' ||
            route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            route.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
            route.pickUpPoints.some(point => point.toLowerCase().includes(searchQuery.toLowerCase()));

        if (showFavoritesOnly) {
            return matchesSearch && favorites.includes(route.id.toString());
        }
        return matchesSearch;
    });

    const rules = [
        {
            icon: IdCard,
            title: "Identity Card Mandatory",
            desc: "Students must carry their college ID card and bus pass at all times while traveling. The bus pass is non-transferable and must be produced upon request by the transport authority.",
            color: "text-blue-600", bg: "bg-blue-50"
        },
        {
            icon: MapPin,
            title: "Designated Bus & Stop",
            desc: "Students must board only their designated bus and are not allowed to change their boarding point or assigned bus without prior written permission from the HOD and Transport In-charge.",
            color: "text-purple-600", bg: "bg-purple-50"
        },
        {
            icon: Clock,
            title: "Punctuality",
            desc: "Buses will leave the campus at the scheduled time. Students are expected to be at their respective boarding points 5 minutes before the scheduled arrival time.",
            color: "text-emerald-600", bg: "bg-emerald-50"
        },
        {
            icon: ShieldAlert,
            title: "Prohibited Behavior",
            desc: "Unruly behavior, shouting, fighting, or causing disturbances is strictly prohibited. Celebrations of any kind (Bus Day, birthdays, etc.) are not allowed inside the bus.",
            color: "text-red-600", bg: "bg-red-50"
        },
        {
            icon: Armchair,
            title: "Seat Reservation",
            desc: "Seats are not reserved for any student. Senior students should offer seats to junior students or faculty members if needed. Faculty members have priority seating in the front rows.",
            color: "text-indigo-600", bg: "bg-indigo-50"
        },
        {
            icon: Trash2,
            title: "Cleanliness",
            desc: "Eating or drinking inside the bus is strictly prohibited. Students must keep the bus clean and not litter. Use the dustbins provided.",
            color: "text-amber-600", bg: "bg-amber-50"
        },
        {
            icon: VolumeX,
            title: "Noise Control",
            desc: "Playing loud music or using speakers is not allowed. Students should maintain a quiet environment to ensure the driver is not distracted.",
            color: "text-rose-600", bg: "bg-rose-50"
        },
        {
            icon: AlertTriangle,
            title: "Damage & Tampering",
            desc: "Any damage to bus property (seats, windows, etc.) will be viewed seriously. Students will be fined for any vandalism. All buses are equipped with CCTV cameras for monitoring.",
            color: "text-orange-600", bg: "bg-orange-50"
        },
        {
            icon: UserCheck,
            title: "Responsibility",
            desc: "The college is not responsible for any loss of personal belongings left in the bus. Students should take care of their valuables.",
            color: "text-teal-600", bg: "bg-teal-50"
        },
        {
            icon: Info,
            title: "Route Changes",
            desc: "Bus routes and timings are subject to change based on traffic conditions or administrative decisions. Students will be notified of any changes in advance.",
            color: "text-cyan-600", bg: "bg-cyan-50"
        },
        {
            icon: ShieldCheck,
            title: "Safety First",
            desc: "Students must not board or alight from a moving bus. Footboard traveling is strictly prohibited and dangerous.",
            color: "text-green-600", bg: "bg-green-50"
        }
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
        },
        {
            id: 'schedule',
            label: 'Full Schedule',
            icon: CalendarCheck,
            desc: 'Download PDF'
        }
    ];

    return (
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
                                    className={`w-full text-left relative overflow-hidden rounded-xl p-4 transition-all duration-300 group border-2 ${isActive
                                        ? 'bg-gradient-to-r from-brand-navy to-[#0f2a5e] border-brand-navy shadow-lg shadow-blue-900/20 translate-x-1'
                                        : 'bg-white border-white hover:border-brand-blue/30 hover:shadow-md hover:-translate-y-0.5'
                                        }`}
                                >
                                    <div className="flex items-center justify-between relative z-10">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2.5 rounded-lg transition-colors ${isActive ? 'bg-white/10 text-brand-blue' : 'bg-slate-50 text-slate-500 group-hover:bg-blue-50 group-hover:text-brand-blue'
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
                                        <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'text-white translate-x-1' : 'text-slate-300 group-hover:text-brand-blue group-hover:translate-x-1'
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
                        <a href="tel:+917481222865" className="block text-lg font-bold text-brand-navy hover:text-brand-blue transition-colors font-mono">
                            +91 74812 22865
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
                        <div className="px-6 py-8 sm:px-8 border-b border-slate-100 flex flex-col gap-6 bg-gradient-to-r from-slate-50 to-white">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <MapPinned className="w-5 h-5 text-brand-blue" />
                                        <h2 className="text-xs font-bold text-brand-blue tracking-widest uppercase">Live Status</h2>
                                    </div>
                                    <h1 className="text-3xl font-bold text-brand-navy font-sans">Bus Route Tracking</h1>
                                </div>
                                <button
                                    onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm ${showFavoritesOnly
                                        ? 'bg-amber-100 text-amber-700 border border-amber-200'
                                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-brand-navy'
                                        }`}
                                >
                                    <Star className={`w-4 h-4 ${showFavoritesOnly ? 'fill-current' : ''}`} />
                                    {showFavoritesOnly ? 'Favorites Only' : 'Show All'}
                                </button>
                            </div>

                            {/* Search Bar */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search by area, route number, or bus stop..."
                                    className="block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-colors shadow-sm"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="p-6 sm:p-8">
                            <div className="flex flex-col gap-4">
                                {filteredTrackingRoutes.length > 0 ? (
                                    filteredTrackingRoutes.map((route) => {
                                        const isFavorite = favorites.includes(route.id.toString());
                                        const isExpanded = expandedTrackingRouteId === route.id;

                                        const statusStyles = {
                                            available: { dot: 'bg-emerald-500', ping: 'bg-emerald-400', text: 'text-emerald-600' },
                                            'not-available': { dot: 'bg-red-500', ping: 'bg-red-400', text: 'text-red-600' },
                                            rerouted: { dot: 'bg-amber-500', ping: 'bg-amber-400', text: 'text-amber-600' }
                                        };
                                        const style = statusStyles[route.availability];

                                        return (
                                            <div key={route.id} className={`rounded-xl border transition-all duration-300 overflow-hidden ${isExpanded
                                                ? 'bg-white border-brand-blue/30 shadow-lg shadow-blue-900/5 ring-1 ring-brand-blue/10'
                                                : 'bg-white border-slate-200 hover:border-brand-blue/30 hover:shadow-md'
                                                }`}>

                                                <div className="p-3 flex flex-col md:flex-row md:items-center justify-start gap-3 md:gap-4">
                                                    {/* Route Info */}
                                                    <div className="flex items-center gap-3 min-w-0 md:w-[320px] md:flex-shrink-0">
                                                        <button
                                                            onClick={() => toggleFavorite(route.id.toString())}
                                                            className={`p-1.5 rounded-full transition-colors flex-shrink-0 ${isFavorite ? 'text-amber-400 bg-amber-50' : 'text-slate-300 hover:text-amber-400 hover:bg-slate-100'}`}
                                                            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                                                        >
                                                            <Star className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                                                        </button>

                                                        <div className="flex items-center gap-2 min-w-0">
                                                            <h3 className="text-lg text-brand-navy truncate flex items-center">
                                                                <span className="font-medium text-slate-500 text-base">R-{route.number}</span>
                                                                <span className="mx-2 text-slate-300">|</span>
                                                                <span className="font-bold text-lg">{route.name}</span>
                                                            </h3>
                                                        </div>
                                                    </div>

                                                    {/* Middle Section: Bus Box + Driver Info */}
                                                    <div className="flex items-start md:items-center justify-start gap-4 md:gap-6 flex-grow md:flex-grow-0">
                                                        {/* Bus Box */}
                                                        <div className="flex flex-col justify-center gap-0.5 bg-slate-50 border border-slate-200/80 rounded-lg p-2 px-3 min-w-[100px] w-fit">
                                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">BUS NO</span>
                                                            <span className="font-mono font-bold text-slate-700 text-sm leading-tight whitespace-nowrap">{route.busNumber}</span>
                                                            <div className={`flex items-center gap-1.5 ${style.text} mt-0.5`}>
                                                                <span className="relative flex h-2 w-2">
                                                                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${style.ping} opacity-75`}></span>
                                                                    <span className={`relative inline-flex rounded-full h-2 w-2 ${style.dot}`}></span>
                                                                </span>
                                                                <p className="text-[10px] font-bold uppercase tracking-wide">{route.status}</p>
                                                            </div>
                                                        </div>

                                                        {/* Mobile Driver Stack */}
                                                        <div className="flex flex-col items-start gap-1 md:hidden">
                                                            <div className="flex flex-col items-start">
                                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">DRIVER</span>
                                                                <span className="text-sm font-bold text-slate-700 whitespace-nowrap">{route.driverName}</span>
                                                            </div>
                                                            <a
                                                                href={`tel:${route.driverPhone}`}
                                                                className="flex items-center justify-center p-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg hover:text-brand-blue hover:border-brand-blue hover:bg-blue-50 transition-colors shadow-sm h-8 w-8"
                                                                title={`Call ${route.driverName}`}
                                                            >
                                                                <Phone className="w-4 h-4" />
                                                            </a>
                                                        </div>
                                                    </div>

                                                    {/* Actions Group */}
                                                    <div className="flex items-center gap-1.5 sm:gap-2 w-full md:w-auto md:ml-auto justify-end pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                                                        {/* Desktop Driver Name */}
                                                        <div className="hidden md:flex flex-col items-end mr-1">
                                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">DRIVER</span>
                                                            <span className="text-sm font-bold text-slate-700 whitespace-nowrap">{route.driverName}</span>
                                                        </div>

                                                        {/* PDF Icon */}
                                                        <button
                                                            onClick={() => {
                                                                const baseUrl = typeof __app_id !== 'undefined' ? `/artifacts/${__app_id}/public` : '';
                                                                setSelectedSchedule({
                                                                    number: route.number,
                                                                    url: `${baseUrl}/data/schedules/route_R-${route.number}.pdf`
                                                                });
                                                            }}
                                                            className="flex-shrink-0 flex items-center justify-center p-2 bg-white border border-slate-200 text-slate-500 rounded-lg hover:text-brand-navy hover:border-brand-navy hover:bg-slate-50 transition-colors shadow-sm h-9 w-9"
                                                            title="View Schedule"
                                                        >
                                                            <FileText className="w-4 h-4" />
                                                        </button>

                                                        {/* Desktop Phone Icon */}
                                                        <a
                                                            href={`tel:${route.driverPhone}`}
                                                            className="hidden md:flex flex-shrink-0 items-center justify-center p-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:text-brand-blue hover:border-brand-blue hover:bg-blue-50 transition-colors shadow-sm h-9 w-9"
                                                            title={`Call ${route.driverName}`}
                                                        >
                                                            <Phone className="w-4 h-4" />
                                                        </a>

                                                        {/* View Stops */}
                                                        <button
                                                            onClick={() => toggleRouteExpansion(route.id)}
                                                            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-bold transition-colors border whitespace-nowrap h-9 ${isExpanded
                                                                ? 'bg-slate-100 text-slate-900 border-slate-200'
                                                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-brand-navy'
                                                                }`}
                                                        >
                                                            <span className="inline">View Stops</span>
                                                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                                        </button>

                                                        {/* Track Button */}
                                                        <a
                                                            href={route.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-blue-600 hover:-translate-y-0.5 transition-all shadow-lg shadow-blue-500/20 font-bold text-sm group min-w-[80px] whitespace-nowrap h-9"
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
                                                                        <div className={`relative z-10 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border-[3px] bg-white transition-all duration-300 ${isLast
                                                                            ? 'border-brand-navy shadow-lg shadow-blue-900/10 scale-125'
                                                                            : isFirst
                                                                                ? 'border-emerald-500 shadow-md shadow-emerald-500/20 scale-110'
                                                                                : 'border-slate-300 group-hover/stop:border-brand-blue group-hover/stop:scale-110'
                                                                            }`}>
                                                                            <div className={`w-2 h-2 rounded-full transition-colors ${isLast ? 'bg-brand-navy' : isFirst ? 'bg-emerald-500' : 'bg-slate-300 group-hover/stop:bg-brand-blue'
                                                                                }`} />
                                                                        </div>

                                                                        {/* Text Content */}
                                                                        <div className={`flex-grow -mt-2 transition-transform duration-300 ${isLast ? 'translate-x-1' : ''}`}>
                                                                            <div className={`inline-block ${isLast ? 'bg-brand-navy text-white px-4 py-3 rounded-xl shadow-lg shadow-brand-navy/20' : ''}`}>
                                                                                <h5 className={`text-sm leading-tight ${isLast
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
                                                    {rule.desc}
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
                        <div className="w-full max-w-4xl mx-auto">
                            <div className="group relative aspect-video bg-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                                <img
                                    src={`${typeof __app_id !== 'undefined' ? `/artifacts/${__app_id}/public` : ''}/data/gallery/bus1.png`}
                                    alt="JIT College Bus Fleet"
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <div>
                                        <p className="text-white font-bold text-xl text-left">Our JIT Bus Fleet</p>
                                        <p className="text-white/80 text-sm text-left mt-1">Ensuring safe and comfortable transportation for all students</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}


                {/* Tab: Full Schedule */}
                {
                    activeTab === 'schedule' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden min-h-[600px] animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col">
                            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                                <div className="flex items-center gap-2">
                                    <CalendarCheck className="w-5 h-5 text-brand-blue" />
                                    <h2 className="text-sm font-bold text-brand-navy">Bus Schedule</h2>
                                </div>
                                <a
                                    href="/schedule.pdf"
                                    download
                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:text-brand-blue hover:border-brand-blue transition-colors text-xs font-bold shadow-sm"
                                >
                                    <span>Download PDF</span>
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                            <div className="flex-grow bg-slate-100 p-4">
                                <iframe
                                    src="/schedule.pdf"
                                    className="w-full h-full rounded-xl border border-slate-200 shadow-sm min-h-[600px]"
                                    title="Bus Schedule PDF"
                                >
                                    <p className="text-center text-slate-500 mt-10">
                                        Your browser does not support PDFs.
                                        <a href="/schedule.pdf" className="text-brand-blue hover:underline ml-1">Download the PDF</a>
                                        to view it.
                                    </p>
                                </iframe>
                            </div>
                        </div>
                    )
                }
            </div>
            {/* Schedule Viewer Modal */}
            {selectedSchedule && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    <div
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setSelectedSchedule(null)}
                    ></div>
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 rounded-lg text-brand-blue">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-brand-navy">Route R-{selectedSchedule.number} Schedule</h3>
                                    <p className="text-xs text-slate-500">View and download route details</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">

                                <a
                                    href={selectedSchedule.url}
                                    download={`Route_R-${selectedSchedule.number}_Schedule.pdf`}
                                    className="flex items-center gap-2 px-4 py-2 bg-brand-blue text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-bold shadow-sm"
                                >
                                    <Download className="w-4 h-4" />
                                    <span className="hidden sm:inline">Download PDF</span>
                                </a>
                                <button
                                    onClick={() => setSelectedSchedule(null)}
                                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* PDF Viewer */}
                        <div className="flex-1 bg-slate-100 p-4 overflow-hidden relative">
                            <object
                                data={`${selectedSchedule.url}#toolbar=0`}
                                type="application/pdf"
                                className="w-full h-full rounded-xl border border-slate-200 bg-white shadow-sm"
                                title={`Schedule for Route ${selectedSchedule.number}`}
                            >
                                <div className="flex flex-col items-center justify-center h-full text-slate-500">
                                    <p className="mb-2">Unable to display PDF directly.</p>
                                    <a
                                        href={selectedSchedule.url}
                                        download={`Route_R-${selectedSchedule.number}_Schedule.pdf`}
                                        className="text-brand-blue hover:underline font-bold"
                                    >
                                        Click here to download
                                    </a>
                                </div>
                            </object>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Transport;
