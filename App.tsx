
import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TransportAssistant from './components/TransportAssistant'; 
import Footer from './components/Footer';
import { SEMESTER_BOOKS, DIGITAL_RESOURCES } from './constants';
import { sendMessageToGemini } from './services/geminiService';
import { 
  Book as BookIcon, Images, ChevronRight, ClipboardList, MapPinned, 
  ExternalLink, Phone, Star, MapPin, ChevronDown, ChevronUp,
  IdCard, Clock, UserCheck, Info, ShieldCheck,
  LayoutDashboard, Search, Database, NotebookTabs,
  GraduationCap, Laptop, HelpCircle, School, Calendar,
  CheckCircle2, FileText, BarChart3, Send, Mail, User,
  MessageSquare, History, Clock4, CheckCircle, Globe, ListChecks,
  Network, BookCopy, GraduationCap as CourseIcon,
  Monitor, Wifi, Users, VolumeX, Coffee, Lock, LogOut, AlertCircle, BookOpen,
  ArrowLeft, Search as SearchIcon, Filter, ShoppingCart, History as HistoryIcon,
  Layers, Check, Wallet, Smartphone, QrCode, AlertTriangle, CreditCard, X,
  CalendarCheck, CalendarX, Archive, ReceiptText, Eye, EyeOff, Link2, Library, Bot, Loader2,
  TrendingUp, RotateCcw, Coins, Building2, Briefcase, Lightbulb, Target, ArrowUpRight,
  PieChart, Activity, BookmarkPlus, BookCheck, FileSearch, Trash2
} from 'lucide-react';
import { ChatMessage, Book, BookFormat } from './types';

type TabType = 'facilities' | 'dashboard' | 'portal' | 'resources' | 'study-rooms' | 'gallery' | 'help-desk';
type PortalSubView = 'history' | 'reserve';
type ReserveCategory = 'Syllabus' | 'Reference' | 'Journals';

interface PastBorrowedBook {
  id: string;
  title: string;
  author: string;
  semester: number;
  borrowedDate: string; 
  returnedDate?: string; 
  isbn: string;
}

interface SemesterRecord {
  semester: number;
  label: string;
  borrowedCount: number;
  overdueCount: number;
  hasDues: boolean;
}

// Chart Data
const ACQUISITION_DATA = [
  { year: '2018-19', count: 850, color: '#3A8EDD' },
  { year: '2019-20', count: 920, color: '#2563EB' },
  { year: '2020-21', count: 780, color: '#1D4ED8' },
  { year: '2021-22', count: 1100, color: '#1E40AF' },
  { year: '2022-23', count: 1250, color: '#1E3A8A' },
  { year: '2023-24', count: 1400, color: '#081E48' },
  { year: '2024-25', count: 1600, color: '#0F172A' },
];

const BarChart = () => {
  const maxCount = Math.max(...ACQUISITION_DATA.map(d => d.count));
  return (
    <div className="flex items-end justify-between h-64 gap-4 pt-12">
      {ACQUISITION_DATA.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-3 group relative">
          <div 
            className="w-full rounded-t-xl transition-all duration-500 group-hover:opacity-80 relative"
            style={{ 
              height: `${(d.count / maxCount) * 100}%`, 
              backgroundColor: d.color 
            }}
          >
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-brand-navy text-white text-[13px] py-2 px-4 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold z-10 shadow-2xl">
              {d.count}
            </div>
          </div>
          <span className="text-[12px] font-black text-slate-400 uppercase tracking-tighter truncate w-full text-center">{d.year}</span>
        </div>
      ))}
    </div>
  );
};

const LineChart = () => {
  return (
    <div className="h-64 flex items-center justify-center bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200">
      <div className="text-center">
        <Activity className="w-12 h-12 text-brand-blue/20 mx-auto mb-4" />
        <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Real-time usage tracking active</p>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('facilities');
  const [portalView, setPortalView] = useState<PortalSubView>('history');
  const [reserveCategory, setReserveCategory] = useState<ReserveCategory>('Syllabus');
  
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [regNo, setRegNo] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [studentData] = useState({ name: 'Aditya Kumar', regNo: 'UG2024CSE015', semester: 6, branch: 'CS', email: 'aditya.k@jit.edu' });
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Reservation UI State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterFormat, setFilterFormat] = useState<BookFormat | 'All'>('All');
  const [filterAvailable, setFilterAvailable] = useState<'All' | 'Available' | 'Unavailable'>('All');
  const [reservationConfirmation, setReservationConfirmation] = useState<{ isOpen: boolean; book: Book | null }>({ isOpen: false, book: null });
  const [reservedIds, setReservedIds] = useState<string[]>([]);

  // Help Desk Chat State
  const [hdMessages, setHdMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm your Library Assistant. How can I help you today?" }
  ]);
  const [hdInput, setHdInput] = useState('');
  const [isHdLoading, setIsHdLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // UI State
  const [expandedSemesters, setExpandedSemesters] = useState<number[]>([5, 6]);

  // Semester History Data
  const [pastHistory] = useState<PastBorrowedBook[]>([
    { id: 'p-1', title: 'Digital Signal Processing', author: 'John G. Proakis', semester: 5, borrowedDate: '2023-11-01', isbn: '978-0131873742' },
    { id: 'p-2', title: 'Computer Organization and Design', author: 'David Patterson', semester: 5, borrowedDate: '2023-12-15', returnedDate: '2024-02-10', isbn: '978-0124077263' },
    { id: 'p-3', title: 'Software Engineering', author: 'Roger Pressman', semester: 5, borrowedDate: '2024-01-10', returnedDate: '2024-04-01', isbn: '978-0078022128' },
    { id: 'p-4', title: 'Database Management Systems', author: 'Abraham Silberschatz', semester: 4, borrowedDate: '2023-06-10', returnedDate: '2023-09-05', isbn: '978-0073523323' }
  ]);

  // Semester Summary Data
  const [semesterRecords] = useState<SemesterRecord[]>([
    { semester: 6, label: 'VI Semester (Current)', borrowedCount: 0, overdueCount: 0, hasDues: false },
    { semester: 5, label: 'V Semester', borrowedCount: 3, overdueCount: 1, hasDues: true },
    { semester: 4, label: 'IV Semester', borrowedCount: 1, overdueCount: 0, hasDues: false }
  ]);

  // Payment State
  const [paymentModal, setPaymentModal] = useState<{
    isOpen: boolean;
    items: { title: string; days: number; amount: number }[];
    status: 'idle' | 'processing' | 'success';
  }>({ isOpen: false, items: [], status: 'idle' });

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [hdMessages, isHdLoading]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (regNo.trim() !== '' && password.trim() === regNo.trim()) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid Register Number or Password');
    }
  };

  const confirmLogout = () => {
    setIsAuthenticated(false);
    setRegNo('');
    setPassword('');
    setIsLogoutModalOpen(false);
    setPortalView('history');
  };

  const toggleSemester = (sem: number) => {
    setExpandedSemesters(prev => 
      prev.includes(sem) ? prev.filter(s => s !== sem) : [...prev, sem]
    );
  };

  const calculateDueStatus = (borrowedDateStr: string, returnedDateStr?: string) => {
    const borrowDate = new Date(borrowedDateStr);
    const today = new Date();
    const dueDate = new Date(borrowDate);
    dueDate.setMonth(dueDate.getMonth() + 3);

    if (returnedDateStr) {
      return { status: 'Returned' as const, color: 'text-emerald-600', bg: 'bg-emerald-50', icon: CheckCircle2, label: 'Returned', border: 'border-emerald-100' };
    }

    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      const overdueDays = Math.abs(diffDays);
      return { 
        status: 'Overdue' as const, 
        color: 'text-red-600', 
        bg: 'bg-red-50', 
        icon: AlertTriangle, 
        label: 'Overdue',
        days: overdueDays,
        fine: overdueDays * 5, 
        border: 'border-red-200'
      };
    }

    return { 
      status: 'Active' as const, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50', 
      icon: Clock, 
      label: 'Within Due Period',
      days: diffDays,
      border: 'border-blue-100'
    };
  };

  const handleOpenPayment = (sem?: number) => {
    const overdueItems: { title: string; days: number; amount: number }[] = [];
    const targetBooks = sem ? pastHistory.filter(h => h.semester === sem) : pastHistory;
    
    targetBooks.forEach(book => {
      const result = calculateDueStatus(book.borrowedDate, book.returnedDate);
      if (result.status === 'Overdue') {
        overdueItems.push({ title: book.title, days: result.days || 0, amount: result.fine || 0 });
      }
    });
    
    setPaymentModal({ isOpen: true, items: overdueItems, status: 'idle' });
  };

  const handleConfirmPayment = () => {
    setPaymentModal(prev => ({ ...prev, status: 'processing' }));
    setTimeout(() => {
      setPaymentModal(prev => ({ ...prev, status: 'success' }));
    }, 1500);
  };

  const handleReserve = (book: Book) => {
    setReservationConfirmation({ isOpen: true, book });
    setReservedIds(prev => [...prev, book.id]);
  };

  const handleHdSend = async (forcedText?: string) => {
    const text = forcedText || hdInput.trim();
    if (!text || isHdLoading) return;

    if (text.toLowerCase().includes("contact librarian") && !isAuthenticated) {
        setHdMessages(prev => [...prev, { role: 'user', text: text }]);
        setHdMessages(prev => [...prev, { role: 'model', text: "I'd be happy to help you contact a librarian! However, for security reasons, you must be logged into the Student Portal to use the escalation form. Please login and try again." }]);
        setHdInput('');
        return;
    }

    const userMsg = text;
    setHdInput('');
    setHdMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsHdLoading(true);

    try {
      const history = hdMessages.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
      const response = await sendMessageToGemini(userMsg, history);
      if (response) {
        setHdMessages(prev => [...prev, { role: 'model', text: response }]);
      }
    } catch (error) {
      setHdMessages(prev => [...prev, { 
        role: 'model', 
        text: "AI assistant is temporarily unavailable. Please contact the librarian.", 
        isError: true 
      }]);
    } finally {
      setIsHdLoading(false);
    }
  };

  const sidebarItems: { id: TabType, label: string, icon: any, desc: string }[] = [
    { id: 'facilities', label: 'Library Facilities', icon: BookIcon, desc: 'Institutional Overview' },
    { id: 'dashboard', label: 'Academic Dashboard', icon: LayoutDashboard, desc: 'Usage & Stats' },
    { id: 'portal', label: 'Student Portal', icon: GraduationCap, desc: 'Personal Records' },
    { id: 'resources', label: 'Digital Library', icon: Laptop, desc: 'E-Resources' },
    { id: 'help-desk', label: 'Library Support', icon: HelpCircle, desc: 'Assistant & Help' }
  ];

  const libraryStats = [
    { icon: Library, label: "Physical Volumes", value: "12,000+", color: "bg-blue-50 text-brand-navy" },
    { icon: BookOpen, label: "Reference Titles", value: "1000+", color: "bg-white text-brand-navy" },
    { icon: Globe, label: "Open Journals", value: "15+", color: "bg-blue-50 text-brand-navy" },
    { icon: Monitor, label: "E-Library", value: "6+", color: "bg-white text-brand-navy" },
    { icon: BookCopy, label: "E-Book Databases", value: "30+", color: "bg-blue-50 text-brand-navy" },
    { icon: GraduationCap, label: "Course Resources", value: "20+", color: "bg-white text-brand-navy" },
    { icon: Clock, label: "Weekly Hours", value: "~46", color: "bg-blue-50 text-brand-navy" },
    { icon: RotateCcw, label: "Loan Duration", value: "15d", color: "bg-white text-brand-navy" }
  ];

  const resourceCategories = [
    {
      title: "Open Access E-Journals",
      items: ["DOAJ", "BioMed Central", "Google Scholar", "arXiv", "Hindawi", "CORE"],
      icon: Database
    },
    {
      title: "E-Library Platforms",
      items: ["DELNET", "J-Gate", "NDL", "WDL", "Shodhganga", "Shodhsindhu"],
      icon: Network
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans overflow-x-hidden">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 py-12 sm:py-20 lg:py-24 flex-grow w-full">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          
          {/* SIDE NAVIGATION */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-28">
              <nav className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left rounded-2xl sm:rounded-3xl p-6 sm:p-7 transition-all duration-300 border-2 min-h-[72px] ${
                      activeTab === item.id 
                        ? 'bg-brand-navy border-brand-navy shadow-2xl text-white scale-[1.02]' 
                        : 'bg-white border-white hover:border-brand-blue/30 text-slate-800 shadow-sm hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-6 sm:gap-7">
                      <div className={`p-3 rounded-2xl sm:rounded-[1.2rem] flex-shrink-0 ${activeTab === item.id ? 'bg-brand-blue text-white' : 'bg-slate-50 text-slate-400'}`}>
                        <item.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-base sm:text-lg tracking-tight truncate leading-tight">{item.label}</h3>
                        <p className={`hidden lg:block text-xs mt-1 ${activeTab === item.id ? 'text-blue-200' : 'text-slate-500'}`}>{item.desc}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="flex-1 min-w-0">
            {activeTab === 'facilities' && <Hero />}

            {activeTab === 'portal' && (
              <div className="animate-in fade-in duration-500 space-y-12 sm:space-y-16">
                {!isAuthenticated ? (
                  <div className="max-w-xl mx-auto py-12 sm:py-20 px-4">
                    <div className="bg-white rounded-[3rem] sm:rounded-[4rem] shadow-2xl border border-slate-200 overflow-hidden">
                      <div className="bg-brand-navy p-12 sm:p-16 text-center text-white relative">
                        <div className="absolute top-0 left-0 w-full h-2 bg-brand-blue"></div>
                        <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 border border-white/20">
                          <Lock className="w-12 h-12 sm:w-14 sm:h-14 text-brand-blue" />
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase leading-tight">Student Portal</h2>
                        <p className="text-blue-200 text-sm font-bold tracking-[0.3em] uppercase mt-4">Authentic Access Required</p>
                      </div>
                      
                      <form onSubmit={handleLogin} className="p-10 sm:p-16 space-y-8 sm:space-y-12">
                        {loginError && (
                          <div className="p-5 sm:p-7 bg-red-50 text-red-600 text-base font-bold rounded-3xl border border-red-100 flex items-center gap-5 animate-in fade-in slide-in-from-top-2">
                            <AlertCircle className="w-6 h-6 shrink-0" />
                            {loginError}
                          </div>
                        )}
                        
                        <div className="space-y-8 sm:space-y-10">
                          <div>
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-3 ml-2">Register Number</label>
                            <div className="relative">
                              <User className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300" />
                              <input 
                                type="text" 
                                value={regNo} 
                                onChange={(e) => setRegNo(e.target.value)} 
                                className="w-full bg-slate-50 border border-slate-200 rounded-[2rem] sm:rounded-[2.5rem] py-5 sm:py-6 pl-16 pr-6 text-lg sm:text-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all font-medium" 
                                placeholder="UG2024CSE015" 
                                required 
                              />
                            </div>
                          </div>
                          
                          <div className="relative">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-3 ml-2">Password</label>
                            <div className="relative">
                              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300" />
                              <input 
                                type={showPassword ? "text" : "password"} 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                className="w-full bg-slate-50 border border-slate-200 rounded-[2rem] sm:rounded-[2.5rem] py-5 sm:py-6 pl-16 pr-16 text-lg sm:text-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all font-medium" 
                                placeholder="••••••••••••" 
                                required 
                              />
                              <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-blue transition-colors p-3"
                              >
                                {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* SAMPLE FORMATS HELP BOX */}
                        <div className="p-8 sm:p-10 bg-blue-50/50 border border-blue-100 rounded-[2.5rem]">
                          <div className="flex items-center gap-4 mb-6">
                            <Info className="w-6 h-6 text-brand-blue" />
                            <h4 className="text-sm sm:text-base font-black text-brand-navy uppercase tracking-[0.2em]">Sample Login Formats</h4>
                          </div>
                          
                          <div className="grid grid-cols-1 gap-6">
                            <div className="bg-white/70 p-5 rounded-3xl border border-blue-50 shadow-sm">
                              <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">UG Student</p>
                              <p className="text-base font-mono text-slate-600">ID: <span className="text-brand-navy font-bold">UG2024CSE015</span></p>
                              <p className="text-base font-mono text-slate-600">Pass: <span className="text-brand-navy font-bold">UG2024CSE015</span></p>
                            </div>
                            <div className="bg-white/70 p-5 rounded-3xl border border-blue-50 shadow-sm">
                              <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">PG Student</p>
                              <p className="text-base font-mono text-slate-600">ID: <span className="text-brand-navy font-bold">PG2024MTECH009</span></p>
                              <p className="text-base font-mono text-slate-600">Pass: <span className="text-brand-navy font-bold">PG2024MTECH009</span></p>
                            </div>
                          </div>
                          
                          <p className="text-sm text-slate-500 mt-6 italic leading-relaxed text-center px-4">
                            "Your password is your UG / PG Register Number. Change it after first login."
                          </p>
                        </div>

                        <button 
                          type="submit" 
                          className="w-full py-6 sm:py-7 bg-brand-navy text-white rounded-[2rem] sm:rounded-[2.5rem] font-black text-base sm:text-lg uppercase tracking-[0.2em] hover:bg-brand-blue transition-all shadow-2xl active:scale-95 min-h-[80px]"
                        >
                          Login to Portal
                        </button>
                      </form>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-12 sm:space-y-16">
                    {/* Logged In Header */}
                    <div className="bg-white rounded-[3rem] sm:rounded-[4rem] p-10 sm:p-16 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-3 h-full bg-brand-blue"></div>
                      <div className="flex items-center gap-8 sm:gap-10 w-full md:w-auto">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-50 rounded-[2rem] sm:rounded-[2.5rem] flex items-center justify-center text-brand-blue shrink-0 border border-blue-100">
                          <User className="w-10 h-10 sm:w-12 sm:h-12" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-bold text-brand-blue tracking-[0.3em] uppercase mb-2">Student Portal</p>
                          <h2 className="text-3xl sm:text-4xl font-black text-brand-navy truncate leading-tight">{studentData.name}</h2>
                          <div className="flex items-center gap-4 mt-3">
                            <span className="text-sm bg-slate-100 px-4 py-1.5 rounded-xl font-bold">{studentData.regNo}</span>
                            <span className="text-sm bg-blue-50 text-blue-600 px-4 py-1.5 rounded-xl font-bold">Sem {studentData.semester}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 w-full md:w-auto">
                        <button 
                          onClick={() => setPortalView('history')}
                          className={`flex-1 md:flex-none px-8 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${portalView === 'history' ? 'bg-brand-navy text-white shadow-xl scale-[1.05]' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                        >
                          My Records
                        </button>
                        <button 
                          onClick={() => setPortalView('reserve')}
                          className={`flex-1 md:flex-none px-8 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${portalView === 'reserve' ? 'bg-brand-navy text-white shadow-xl scale-[1.05]' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                        >
                          Reserve Books
                        </button>
                        <button onClick={() => setIsLogoutModalOpen(true)} className="p-5 text-red-500 hover:bg-red-50 rounded-2xl transition-all border border-red-100 min-h-[64px] min-w-[64px] flex items-center justify-center shadow-sm">
                          <LogOut className="w-7 h-7" />
                        </button>
                      </div>
                    </div>

                    {/* HISTORY VIEW */}
                    {portalView === 'history' && (
                      <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-5 px-2">
                           <History className="w-10 h-10 text-brand-blue" />
                           <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight uppercase">Borrowing History</h2>
                        </div>
                        <div className="space-y-8">
                          {semesterRecords.map((record) => (
                            <div key={record.semester} className={`bg-white border-2 rounded-[2.5rem] overflow-hidden transition-all ${expandedSemesters.includes(record.semester) ? 'border-brand-blue/30 shadow-2xl' : 'border-slate-100 shadow-sm'}`}>
                               <div className="p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-8 cursor-pointer" onClick={() => toggleSemester(record.semester)}>
                                  <div className="flex items-center gap-8 w-full sm:w-auto">
                                     <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-center border-2 ${record.hasDues ? 'bg-red-50 border-red-100 text-red-600' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                                        <span className="text-2xl font-black">{record.semester === 6 ? 'VI' : record.semester === 5 ? 'V' : 'IV'}</span>
                                     </div>
                                     <div>
                                        <h3 className="text-xl sm:text-2xl font-black text-brand-navy">{record.label}</h3>
                                        <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-1">{record.borrowedCount} Materials Borrowed</p>
                                     </div>
                                  </div>
                                  <div className="flex items-center gap-4 w-full sm:w-auto">
                                     {record.hasDues && (
                                       <button onClick={(e) => { e.stopPropagation(); handleOpenPayment(record.semester); }} className="flex-1 sm:flex-none px-8 py-4 bg-amber-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl min-h-[56px] hover:bg-amber-600 transition-colors">Settle Fine</button>
                                     )}
                                     <div className="p-4 bg-slate-50 rounded-2xl min-h-[56px] min-w-[56px] flex items-center justify-center border border-slate-100"><ChevronRight className={`w-7 h-7 text-slate-400 transition-transform ${expandedSemesters.includes(record.semester) ? 'rotate-90' : ''}`} /></div>
                                  </div>
                               </div>
                               {expandedSemesters.includes(record.semester) && (
                                 <div className="px-8 sm:px-12 pb-12 pt-6 border-t border-slate-50 animate-in slide-in-from-top-2">
                                    {pastHistory.filter(h => h.semester === record.semester).length > 0 ? (
                                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {pastHistory.filter(h => h.semester === record.semester).map((book) => {
                                          const status = calculateDueStatus(book.borrowedDate, book.returnedDate);
                                          return (
                                            <div key={book.id} className="bg-slate-50 p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                              <div className="flex justify-between mb-6">
                                                 <span className={`text-[11px] font-black px-4 py-1.5 rounded-full uppercase ${status.bg} ${status.color}`}>{status.label}</span>
                                                 <span className="text-xs font-mono text-slate-400">#{book.isbn.slice(-4)}</span>
                                              </div>
                                              <h4 className="text-lg sm:text-xl font-bold text-brand-navy mb-3 line-clamp-2 leading-snug">{book.title}</h4>
                                              <p className="text-base text-slate-500 italic mb-5 font-medium">by {book.author}</p>
                                              {status.status === 'Overdue' && (
                                                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-red-100">
                                                   <AlertTriangle className="w-4 h-4 text-red-600" />
                                                   <p className="text-sm font-black text-red-600 uppercase tracking-tighter">Penalty: ₹{status.fine}</p>
                                                </div>
                                              )}
                                            </div>
                                          );
                                        })}
                                      </div>
                                    ) : (
                                      <div className="text-center py-20 bg-slate-50 rounded-[3rem] border border-dashed border-slate-300">
                                         <BookOpen className="w-14 h-14 text-slate-300 mx-auto mb-5" />
                                         <p className="text-lg font-bold text-slate-400 uppercase tracking-widest">No materials found for this term</p>
                                      </div>
                                    )}
                                 </div>
                               )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* DASHBOARD TAB */}
            {activeTab === 'dashboard' && (
              <div className="space-y-12 sm:space-y-20 animate-in fade-in duration-700">
                <div className="bg-brand-navy rounded-[3rem] sm:rounded-[4.5rem] p-12 sm:p-24 text-white relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none hidden sm:block">
                    <TrendingUp className="w-80 h-80 lg:w-96 lg:h-96" />
                  </div>
                  <div className="relative z-10 max-w-5xl">
                    <h2 className="text-brand-blue font-black text-sm sm:text-base tracking-[0.4em] uppercase mb-6">Library Performance</h2>
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-8 uppercase leading-none">Academic Dashboard</h1>
                    <p className="text-blue-100 text-xl sm:text-2xl font-medium leading-relaxed italic opacity-90 max-w-3xl">
                      Visual insights into our institutional knowledge repository and resource utilization patterns for this academic year.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-10">
                  {libraryStats.map((stat, idx) => (
                    <div key={idx} className={`${stat.color} border border-slate-200 rounded-[2.5rem] sm:rounded-[3.5rem] p-10 sm:p-14 flex flex-col items-center text-center shadow-sm hover:shadow-2xl transition-all group hover:scale-[1.03]`}>
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl sm:rounded-3xl flex items-center justify-center border border-slate-100 mb-8 sm:mb-10 shadow-inner group-hover:bg-brand-navy group-hover:text-white transition-all duration-300">
                        <stat.icon className="w-8 h-8 sm:w-9 sm:h-9" />
                      </div>
                      <h4 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter mb-3 leading-none">{stat.value}</h4>
                      <p className="text-xs sm:text-sm font-black uppercase tracking-widest text-slate-400 leading-tight">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14">
                  <div className="bg-white rounded-[3rem] sm:rounded-[4rem] p-10 sm:p-16 border border-slate-200 shadow-sm hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-12 sm:mb-16">
                      <h3 className="text-2xl sm:text-3xl font-black text-brand-navy uppercase tracking-tight">Collection Growth</h3>
                      <BarChart3 className="w-8 h-8 sm:w-10 sm:h-10 text-brand-blue opacity-30" />
                    </div>
                    <BarChart />
                  </div>
                  <div className="bg-white rounded-[3rem] sm:rounded-[4rem] p-10 sm:p-16 border border-slate-200 shadow-sm hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-12 sm:mb-16">
                      <h3 className="text-2xl sm:text-3xl font-black text-brand-navy uppercase tracking-tight">Acquisition Trend</h3>
                      <Activity className="w-8 h-8 sm:w-10 sm:h-10 text-brand-blue opacity-30" />
                    </div>
                    <LineChart />
                  </div>
                </div>
              </div>
            )}
            
            {/* OTHER TABS OMITTED FOR BREVITY AS PER TYPOGRAPHY RULES */}
            {activeTab === 'resources' && (
              <div className="space-y-12 sm:space-y-20 animate-in fade-in duration-700">
                <div className="bg-white rounded-[3rem] sm:rounded-[4.5rem] p-12 sm:p-24 border border-slate-200 shadow-sm">
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-brand-navy tracking-tight mb-8 uppercase leading-tight">Digital Library</h1>
                  <p className="text-slate-600 text-xl sm:text-2xl leading-relaxed font-medium">Access premium open-access journals and institutional learning platforms globally.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
                  {resourceCategories.map((cat, idx) => (
                    <div key={idx} className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm hover:shadow-lg transition-shadow">
                      <h3 className="text-2xl sm:text-3xl font-black text-brand-navy mb-8 flex items-center gap-5"><cat.icon className="w-8 h-8" />{cat.title}</h3>
                      <div className="flex flex-wrap gap-4">
                        {cat.items.map((item, i) => (
                          <span key={i} className="px-5 py-2.5 bg-slate-100 rounded-2xl text-sm sm:text-base font-bold text-slate-600 uppercase tracking-wide border border-slate-50">{item}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'help-desk' && (
              <div className="space-y-12 animate-in fade-in duration-700">
                 <div className="bg-white rounded-[3rem] p-12 sm:p-20 border border-slate-200 shadow-sm">
                    <h1 className="text-4xl sm:text-6xl font-black text-brand-navy uppercase mb-8">Library Support</h1>
                    <p className="text-slate-500 text-xl sm:text-2xl font-medium leading-relaxed">Interactive support for library services, catalog searches, and academic resource inquiries.</p>
                 </div>
                 <div className="bg-white rounded-[3rem] border border-slate-200 shadow-2xl overflow-hidden flex flex-col h-[750px]">
                    <div className="bg-brand-navy p-8 flex items-center justify-between text-white">
                       <div className="flex items-center gap-5">
                          <Bot className="w-10 h-10 text-brand-blue" />
                          <span className="font-black uppercase tracking-[0.2em] text-base">JIT Library AI</span>
                       </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-10 sm:p-12 space-y-8 bg-slate-50">
                       {hdMessages.map((msg, idx) => (
                         <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] p-7 rounded-[2.5rem] text-lg sm:text-xl leading-relaxed ${msg.role === 'user' ? 'bg-brand-blue text-white rounded-tr-none' : 'bg-white text-slate-700 border border-slate-200 shadow-md rounded-tl-none'}`}>
                               {msg.text}
                            </div>
                         </div>
                       ))}
                       {isHdLoading && <div className="text-base text-slate-400 font-bold uppercase animate-pulse px-4">Assistant is researching...</div>}
                       <div ref={chatEndRef} />
                    </div>
                    <div className="p-8 sm:p-12 border-t border-slate-100 bg-white">
                       <div className="relative max-w-5xl mx-auto">
                          <input type="text" value={hdInput} onChange={(e) => setHdInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleHdSend()} className="w-full bg-slate-50 border border-slate-200 rounded-[2.5rem] py-6 sm:py-8 px-10 text-lg sm:text-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 shadow-inner" placeholder="Ask about library policies or book locations..." />
                          <button onClick={() => handleHdSend()} className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-brand-navy text-white rounded-3xl hover:bg-brand-blue transition-all shadow-lg active:scale-90"><Send className="w-7 h-7" /></button>
                       </div>
                    </div>
                 </div>
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
