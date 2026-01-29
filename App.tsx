
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
    <div className="flex items-end justify-between h-48 gap-2 pt-8">
      {ACQUISITION_DATA.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
          <div 
            className="w-full rounded-t-lg transition-all duration-500 group-hover:opacity-80 relative"
            style={{ 
              height: `${(d.count / maxCount) * 100}%`, 
              backgroundColor: d.color 
            }}
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-brand-navy text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold z-10">
              {d.count}
            </div>
          </div>
          <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter truncate w-full text-center">{d.year}</span>
        </div>
      ))}
    </div>
  );
};

const LineChart = () => {
  return (
    <div className="h-48 flex items-center justify-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
      <div className="text-center">
        <Activity className="w-8 h-8 text-brand-blue/20 mx-auto mb-2" />
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Real-time usage tracking active</p>
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
  const [showEscalationForm, setShowEscalationForm] = useState(false);
  const [escalationStatus, setEscalationStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
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
    // Rule: Password is student's Register Number
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

  // Filtering Logic for Reservations
  const filteredMaterials = SEMESTER_BOOKS.filter(item => {
    const matchesCategory = 
      (reserveCategory === 'Syllabus' && item.semester === studentData.semester) ||
      (reserveCategory === 'Reference' && item.semester === 'Reference') ||
      (reserveCategory === 'Journals' && item.semester === 'Journal');
    
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFormat = filterFormat === 'All' || item.format === filterFormat || item.format === 'Both';
    const matchesAvailability = 
      filterAvailable === 'All' || 
      (filterAvailable === 'Available' && item.status === 'Available') || 
      (filterAvailable === 'Unavailable' && item.status !== 'Available');

    return matchesCategory && matchesSearch && matchesFormat && matchesAvailability;
  });

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

  const handleEscalationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEscalationStatus('submitting');
    setTimeout(() => {
      setEscalationStatus('success');
      setTimeout(() => {
        setShowEscalationForm(false);
        setEscalationStatus('idle');
      }, 3000);
    }, 1500);
  };

  const sidebarItems: { id: TabType, label: string, icon: any, desc: string }[] = [
    { id: 'facilities', label: 'Facilities', icon: BookIcon, desc: 'Overview' },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, desc: 'Analytics' },
    { id: 'portal', label: 'Portal', icon: GraduationCap, desc: 'Student' },
    { id: 'resources', label: 'Digital', icon: Laptop, desc: 'Resources' },
    { id: 'help-desk', label: 'Help Desk', icon: HelpCircle, desc: 'Support' }
  ];

  const totalOverdueCount = semesterRecords.reduce((acc, curr) => acc + curr.overdueCount, 0);

  // Stats for Dashboard
  const libraryStats = [
    { icon: Library, label: "Physical Volumes", value: "12,000+", color: "bg-blue-50 text-brand-navy" },
    { icon: BookOpen, label: "Journal Titles", value: "1000+", color: "bg-white text-brand-navy" },
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
      
      <main className="max-w-7xl mx-auto px-4 py-4 sm:py-8 lg:py-12 flex-grow w-full">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          
          {/* SIDE NAVIGATION */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <nav className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2 sm:gap-3">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left rounded-xl sm:rounded-2xl p-3 sm:p-4 transition-all duration-300 border-2 min-h-[48px] ${
                      activeTab === item.id 
                        ? 'bg-brand-navy border-brand-navy shadow-lg text-white' 
                        : 'bg-white border-white hover:border-brand-blue/30 text-slate-800 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl flex-shrink-0 ${activeTab === item.id ? 'bg-brand-blue text-white' : 'bg-slate-50 text-slate-400'}`}>
                        <item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-xs sm:text-sm tracking-tight truncate">{item.label}</h3>
                        <p className={`hidden lg:block text-[10px] ${activeTab === item.id ? 'text-blue-200' : 'text-slate-500'}`}>{item.desc}</p>
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
              <div className="animate-in fade-in duration-500 space-y-6 sm:space-y-8">
                {!isAuthenticated ? (
                  <div className="max-w-md mx-auto py-8 sm:py-12 px-2 sm:px-4">
                    <div className="bg-white rounded-2xl sm:rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden">
                      <div className="bg-brand-navy p-6 sm:p-10 text-center text-white relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-brand-blue"></div>
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 border border-white/20">
                          <Lock className="w-8 h-8 sm:w-10 h-10 text-brand-blue" />
                        </div>
                        <h2 className="text-xl sm:text-3xl font-black tracking-tight uppercase">Student Portal</h2>
                        <p className="text-blue-200 text-[9px] font-bold tracking-[0.3em] uppercase mt-2">Authentic Access Required</p>
                      </div>
                      
                      <form onSubmit={handleLogin} className="p-6 sm:p-10 space-y-4 sm:space-y-6">
                        {loginError && (
                          <div className="p-3 sm:p-4 bg-red-50 text-red-600 text-[11px] sm:text-xs font-bold rounded-xl border border-red-100 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            {loginError}
                          </div>
                        )}
                        
                        <div className="space-y-4 sm:space-y-5">
                          <div>
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">Register Number</label>
                            <div className="relative">
                              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                              <input 
                                type="text" 
                                value={regNo} 
                                onChange={(e) => setRegNo(e.target.value)} 
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl py-3.5 sm:py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all font-medium" 
                                placeholder="UG2024CSE015" 
                                required 
                              />
                            </div>
                          </div>
                          
                          <div className="relative">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1.5 ml-1">Password</label>
                            <div className="relative">
                              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                              <input 
                                type={showPassword ? "text" : "password"} 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl py-3.5 sm:py-4 pl-12 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all font-medium" 
                                placeholder="••••••••••••" 
                                required 
                              />
                              <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-blue transition-colors p-1"
                              >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* SAMPLE FORMATS HELP BOX */}
                        <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl">
                          <div className="flex items-center gap-2 mb-3">
                            <Info className="w-3.5 h-3.5 text-brand-blue" />
                            <h4 className="text-[9px] sm:text-[10px] font-black text-brand-navy uppercase tracking-[0.2em]">Sample Login Formats</h4>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="bg-white/60 p-2.5 rounded-xl border border-blue-50">
                              <p className="text-[8px] font-black text-slate-400 uppercase tracking-wider mb-1">UG Student</p>
                              <p className="text-[10px] font-mono text-slate-600">ID: <span className="text-brand-navy font-bold">UG2024CSE015</span></p>
                              <p className="text-[10px] font-mono text-slate-600">Pass: <span className="text-brand-navy font-bold">UG2024CSE015</span></p>
                            </div>
                            <div className="bg-white/60 p-2.5 rounded-xl border border-blue-50">
                              <p className="text-[8px] font-black text-slate-400 uppercase tracking-wider mb-1">PG Student</p>
                              <p className="text-[10px] font-mono text-slate-600">ID: <span className="text-brand-navy font-bold">PG2024MTECH009</span></p>
                              <p className="text-[10px] font-mono text-slate-600">Pass: <span className="text-brand-navy font-bold">PG2024MTECH009</span></p>
                            </div>
                          </div>
                          
                          <p className="text-[9px] text-slate-500 mt-3 italic leading-relaxed">
                            "Your password is your UG / PG Register Number. Change it after first login."
                          </p>
                        </div>

                        <button 
                          type="submit" 
                          className="w-full py-4 sm:py-5 bg-brand-navy text-white rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm uppercase tracking-[0.2em] hover:bg-brand-blue transition-all shadow-xl active:scale-95 min-h-[48px]"
                        >
                          Login to Portal
                        </button>
                      </form>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 sm:space-y-8">
                    {/* Logged In Header */}
                    <div className="bg-white rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1.5 sm:w-2 h-full bg-brand-blue"></div>
                      <div className="flex items-center gap-4 sm:gap-5 w-full md:w-auto">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-50 rounded-xl sm:rounded-[1.5rem] flex items-center justify-center text-brand-blue shrink-0 border border-blue-100">
                          <User className="w-6 h-6 sm:w-8 sm:h-8" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[8px] sm:text-[10px] font-bold text-brand-blue tracking-[0.3em] uppercase mb-1">Student Portal</p>
                          <h2 className="text-xl sm:text-2xl font-black text-brand-navy truncate">{studentData.name}</h2>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[9px] bg-slate-100 px-2 py-0.5 rounded font-bold">{studentData.regNo}</span>
                            <span className="text-[9px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold">Sem {studentData.semester}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 w-full md:w-auto">
                        <button 
                          onClick={() => setPortalView('history')}
                          className={`flex-1 md:flex-none px-4 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${portalView === 'history' ? 'bg-brand-navy text-white shadow-lg' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                        >
                          My Records
                        </button>
                        <button 
                          onClick={() => setPortalView('reserve')}
                          className={`flex-1 md:flex-none px-4 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${portalView === 'reserve' ? 'bg-brand-navy text-white shadow-lg' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                        >
                          Reserve Materials
                        </button>
                        <button onClick={() => setIsLogoutModalOpen(true)} className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-all border border-red-100 min-h-[44px]">
                          <LogOut className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* PORTAL VIEW: HISTORY */}
                    {portalView === 'history' && (
                      <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-3 px-1">
                           <History className="w-6 h-6 text-brand-blue" />
                           <h2 className="text-xl sm:text-2xl font-black text-brand-navy tracking-tight uppercase">Borrowing History</h2>
                        </div>
                        <div className="space-y-4">
                          {semesterRecords.map((record) => (
                            <div key={record.semester} className={`bg-white border-2 rounded-2xl overflow-hidden transition-all ${expandedSemesters.includes(record.semester) ? 'border-brand-blue/30 shadow-xl' : 'border-slate-100 shadow-sm'}`}>
                               <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 cursor-pointer" onClick={() => toggleSemester(record.semester)}>
                                  <div className="flex items-center gap-4 w-full sm:w-auto">
                                     <div className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 ${record.hasDues ? 'bg-red-50 border-red-100 text-red-600' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                                        <span className="text-lg font-black">{record.semester === 6 ? 'VI' : record.semester === 5 ? 'V' : 'IV'}</span>
                                     </div>
                                     <div>
                                        <h3 className="font-black text-brand-navy">{record.label}</h3>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">{record.borrowedCount} Materials Borrowed</p>
                                     </div>
                                  </div>
                                  <div className="flex items-center gap-2 w-full sm:w-auto">
                                     {record.hasDues && (
                                       <button onClick={(e) => { e.stopPropagation(); handleOpenPayment(record.semester); }} className="flex-1 sm:flex-none px-4 py-2 bg-amber-500 text-white rounded-lg font-black text-[9px] uppercase tracking-widest shadow-lg min-h-[40px]">Pay Fine</button>
                                     )}
                                     <div className="p-2 bg-slate-50 rounded-lg min-h-[40px] flex items-center justify-center"><ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${expandedSemesters.includes(record.semester) ? 'rotate-90' : ''}`} /></div>
                                  </div>
                               </div>
                               {expandedSemesters.includes(record.semester) && (
                                 <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-slate-50 animate-in slide-in-from-top-2">
                                    {pastHistory.filter(h => h.semester === record.semester).length > 0 ? (
                                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {pastHistory.filter(h => h.semester === record.semester).map((book) => {
                                          const status = calculateDueStatus(book.borrowedDate, book.returnedDate);
                                          return (
                                            <div key={book.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                              <div className="flex justify-between mb-3">
                                                 <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase ${status.bg} ${status.color}`}>{status.label}</span>
                                                 <span className="text-[9px] font-mono text-slate-400">#{book.isbn.slice(-4)}</span>
                                              </div>
                                              <h4 className="text-xs font-bold text-brand-navy mb-1 line-clamp-1">{book.title}</h4>
                                              <p className="text-[10px] text-slate-500 italic mb-2">by {book.author}</p>
                                              {status.status === 'Overdue' && <p className="text-[9px] font-black text-red-600 uppercase">Penalty: ₹{status.fine}</p>}
                                            </div>
                                          );
                                        })}
                                      </div>
                                    ) : (
                                      <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                                         <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                                         <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No books borrowed for this session</p>
                                      </div>
                                    )}
                                 </div>
                               )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* PORTAL VIEW: RESERVATION MODULE */}
                    {portalView === 'reserve' && (
                      <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                        {/* Tab Bar for Reservation Categories */}
                        <div className="flex items-center gap-3 px-1">
                           <BookmarkPlus className="w-6 h-6 text-brand-blue" />
                           <h2 className="text-xl sm:text-2xl font-black text-brand-navy tracking-tight uppercase">Reservation Module</h2>
                        </div>
                        
                        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                           {/* Category Switcher */}
                           <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-xl">
                              {(['Syllabus', 'Reference', 'Journals'] as ReserveCategory[]).map((cat) => (
                                <button
                                  key={cat}
                                  onClick={() => setReserveCategory(cat)}
                                  className={`flex-1 py-3 px-4 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all min-h-[44px] ${reserveCategory === cat ? 'bg-white text-brand-navy shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                  {cat === 'Syllabus' ? `Semester ${studentData.semester}` : cat}
                                </button>
                              ))}
                           </div>

                           {/* Search & Filters */}
                           <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                              <div className="lg:col-span-2 relative">
                                 <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                 <input 
                                  type="text" 
                                  value={searchQuery}
                                  onChange={(e) => setSearchQuery(e.target.value)}
                                  placeholder="Search title, author, or subject..." 
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 min-h-[44px]"
                                 />
                              </div>
                              <div className="relative">
                                 <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300" />
                                 <select 
                                  value={filterFormat}
                                  onChange={(e) => setFilterFormat(e.target.value as any)}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm appearance-none focus:outline-none min-h-[44px]"
                                 >
                                    <option value="All">All Formats</option>
                                    <option value="Physical">Physical Books</option>
                                    <option value="E-Book">E-Books</option>
                                 </select>
                              </div>
                              <div className="relative">
                                 <Layers className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300" />
                                 <select 
                                  value={filterAvailable}
                                  onChange={(e) => setFilterAvailable(e.target.value as any)}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm appearance-none focus:outline-none min-h-[44px]"
                                 >
                                    <option value="All">All Availability</option>
                                    <option value="Available">Available Now</option>
                                    <option value="Unavailable">Issued/Out of Stock</option>
                                 </select>
                              </div>
                           </div>
                        </div>

                        {/* Material Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                           {filteredMaterials.map((item) => (
                             <div key={item.id} className={`bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group flex flex-col ${reservedIds.includes(item.id) ? 'ring-2 ring-emerald-500/50' : ''}`}>
                                {/* Status Badge */}
                                <div className="flex justify-between items-start mb-4">
                                   <div className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 ${item.status === 'Available' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                                      {item.status === 'Available' ? <CheckCircle className="w-3 h-3" /> : <X className="w-3 h-3" />}
                                      {item.status === 'Available' ? 'Available' : 'Issued'}
                                   </div>
                                   <div className="flex gap-2">
                                      {item.format !== 'Physical' && <div className="p-1.5 bg-blue-50 text-brand-blue rounded-lg" title="E-Book Access"><Laptop className="w-3.5 h-3.5" /></div>}
                                      {item.format !== 'E-Book' && <div className="p-1.5 bg-brand-navy/5 text-brand-navy rounded-lg" title="Physical Copy"><BookIcon className="w-3.5 h-3.5" /></div>}
                                   </div>
                                </div>

                                <h3 className="text-base font-black text-brand-navy leading-tight mb-1 group-hover:text-brand-blue transition-colors line-clamp-2">{item.title}</h3>
                                <p className="text-xs text-slate-500 font-medium mb-4 italic">by {item.author}</p>
                                
                                <div className="space-y-2 mb-auto pb-6">
                                   <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                      <Database className="w-3 h-3" />
                                      <span className="truncate">{item.subject} • {item.publisher || 'Central Press'}</span>
                                   </div>
                                   <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                      <Archive className="w-3 h-3" />
                                      <span>ISBN: {item.isbn}</span>
                                   </div>
                                </div>

                                <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                                   <div>
                                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Availability</p>
                                      <p className="text-[10px] font-bold text-brand-navy uppercase">{item.format === 'Both' ? 'Print + Digital' : item.format}</p>
                                   </div>
                                   {reservedIds.includes(item.id) ? (
                                     <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest">
                                        <BookCheck className="w-4 h-4" /> Reserved
                                     </div>
                                   ) : (
                                     <button 
                                      onClick={() => handleReserve(item)}
                                      disabled={item.status !== 'Available' && item.format === 'Physical'}
                                      className="flex items-center gap-2 px-4 py-2.5 bg-brand-navy text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-blue active:scale-95 transition-all disabled:opacity-30 disabled:pointer-events-none min-h-[44px]"
                                     >
                                        <ShoppingCart className="w-4 h-4" /> 
                                        {item.format === 'E-Book' ? 'Open Access' : 'Reserve'}
                                     </button>
                                   )}
                                </div>
                             </div>
                           ))}
                           
                           {filteredMaterials.length === 0 && (
                             <div className="sm:col-span-2 xl:col-span-3 py-20 text-center bg-white rounded-3xl border border-dashed border-slate-300">
                                <FileSearch className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                                <h3 className="text-xl font-black text-brand-navy uppercase mb-2">No matching materials</h3>
                                <p className="text-slate-400 font-medium">Try different keywords or filters.</p>
                             </div>
                           )}
                        </div>

                        {/* Policies Card */}
                        <div className="bg-blue-50 p-6 sm:p-8 rounded-3xl border border-brand-blue/10 flex flex-col md:flex-row items-center gap-6 sm:gap-8">
                           <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-brand-blue shrink-0 shadow-sm border border-brand-blue/5">
                              <ShieldCheck className="w-8 h-8" />
                           </div>
                           <div className="flex-1 text-center md:text-left">
                              <h4 className="text-lg font-black text-brand-navy uppercase tracking-tight mb-2">Reservation Policy</h4>
                              <p className="text-slate-600 text-sm font-medium leading-relaxed">
                                Physical materials reserved online must be collected from the <span className="text-brand-navy font-bold">Circulation Desk</span> within 48 hours. 
                                Digital copies are accessible instantly upon verification.
                              </p>
                           </div>
                           <button onClick={() => setActiveTab('help-desk')} className="px-6 py-3 bg-white text-brand-navy border border-slate-200 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all min-h-[44px]">View Rules</button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* DASHBOARD TAB */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8 sm:space-y-12 animate-in fade-in duration-700">
                <div className="bg-brand-navy rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-10 lg:p-14 text-white relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none hidden sm:block">
                    <TrendingUp className="w-48 h-48 lg:w-64 lg:h-64" />
                  </div>
                  <div className="relative z-10 max-w-4xl">
                    <h2 className="text-brand-blue font-black text-[10px] tracking-[0.4em] uppercase mb-3">Library Performance</h2>
                    <h1 className="text-2xl sm:text-4xl lg:text-6xl font-black tracking-tight mb-4 uppercase leading-none">Stats & Analytics</h1>
                    <p className="text-blue-100 text-sm sm:text-lg font-medium leading-relaxed italic opacity-80">
                      Visual insights into our institutional knowledge repository and resource utilization.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                  {libraryStats.map((stat, idx) => (
                    <div key={idx} className={`${stat.color} border border-slate-200 rounded-2xl sm:rounded-[2rem] p-4 sm:p-8 flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all group`}>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center border border-slate-100 mb-4 sm:mb-6 shadow-inner group-hover:bg-brand-navy group-hover:text-white transition-all">
                        <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <h4 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tighter mb-1">{stat.value}</h4>
                      <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 leading-tight">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
                  <div className="bg-white rounded-2xl sm:rounded-[2.5rem] p-5 sm:p-10 border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-8 sm:mb-10">
                      <h3 className="text-sm sm:text-xl font-black text-brand-navy uppercase tracking-tight">Collection Growth</h3>
                      <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-brand-blue opacity-30" />
                    </div>
                    <BarChart />
                  </div>
                  <div className="bg-white rounded-2xl sm:rounded-[2.5rem] p-5 sm:p-10 border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-8 sm:mb-10">
                      <h3 className="text-sm sm:text-xl font-black text-brand-navy uppercase tracking-tight">Acquisition Trend</h3>
                      <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-brand-blue opacity-30" />
                    </div>
                    <LineChart />
                  </div>
                </div>
              </div>
            )}

            {/* OTHER TABS */}
            {activeTab === 'resources' && (
              <div className="space-y-8 sm:space-y-12 animate-in fade-in duration-700">
                <div className="bg-white rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-10 lg:p-14 border border-slate-200 shadow-sm">
                  <h1 className="text-2xl sm:text-4xl lg:text-6xl font-black text-brand-navy tracking-tight mb-4 uppercase">Digital Resources</h1>
                  <p className="text-slate-600 text-sm sm:text-lg">Open-access journals and learning platforms.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {resourceCategories.map((cat, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                      <h3 className="font-black text-brand-navy mb-4 flex items-center gap-2"><cat.icon className="w-5 h-5" />{cat.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {cat.items.map((item, i) => (
                          <span key={i} className="px-3 py-1.5 bg-slate-100 rounded-lg text-[10px] font-bold text-slate-600 uppercase">{item}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'help-desk' && (
              <div className="space-y-8 animate-in fade-in duration-700">
                 <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm">
                    <h1 className="text-2xl sm:text-4xl font-black text-brand-navy uppercase mb-4">Library Help Desk</h1>
                    <p className="text-slate-500 text-sm sm:text-lg">Interactive support for library services and accounts.</p>
                 </div>
                 <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden flex flex-col h-[500px]">
                    <div className="bg-brand-navy p-4 flex items-center justify-between text-white">
                       <div className="flex items-center gap-3">
                          <Bot className="w-6 h-6 text-brand-blue" />
                          <span className="font-black uppercase tracking-widest text-xs">JIT Library AI</span>
                       </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                       {hdMessages.map((msg, idx) => (
                         <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] p-3 rounded-xl text-sm ${msg.role === 'user' ? 'bg-brand-blue text-white' : 'bg-white text-slate-700 border border-slate-200'}`}>
                               {msg.text}
                            </div>
                         </div>
                       ))}
                       {isHdLoading && <div className="text-xs text-slate-400 font-bold uppercase animate-pulse">Typing...</div>}
                       <div ref={chatEndRef} />
                    </div>
                    <div className="p-4 border-t border-slate-100">
                       <div className="relative">
                          <input type="text" value={hdInput} onChange={(e) => setHdInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleHdSend()} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm" placeholder="Ask about library policies..." />
                          <button onClick={() => handleHdSend()} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-brand-navy text-white rounded-lg"><Send className="w-4 h-4" /></button>
                       </div>
                    </div>
                 </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* RESERVATION CONFIRMATION MODAL */}
      {reservationConfirmation.isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-brand-navy/90 backdrop-blur-sm animate-in fade-in" onClick={() => setReservationConfirmation({ isOpen: false, book: null })}></div>
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-sm relative z-10 p-8 sm:p-10 text-center animate-in zoom-in-95 border border-slate-200">
             <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
             </div>
             <h3 className="text-2xl font-black text-brand-navy mb-3 uppercase tracking-tight">Reserved Successfully</h3>
             <div className="bg-slate-50 p-4 rounded-2xl mb-8 text-left border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Material Details</p>
                <p className="text-sm font-bold text-brand-navy leading-tight">{reservationConfirmation.book?.title}</p>
                <p className="text-xs text-slate-500 mt-1 italic">Collect within 48 hours</p>
             </div>
             <button onClick={() => setReservationConfirmation({ isOpen: false, book: null })} className="w-full py-4 bg-brand-navy text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-brand-blue transition-all active:scale-95">Great, Thanks!</button>
          </div>
        </div>
      )}

      {/* LOGOUT MODAL */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-brand-navy/80 backdrop-blur-md animate-in fade-in" onClick={() => setIsLogoutModalOpen(false)}></div>
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-sm relative z-10 p-8 sm:p-10 text-center animate-in zoom-in-95 border border-slate-200">
             <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-50 text-red-600 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 sm:mb-8">
                <LogOut className="w-8 h-8 sm:w-10 h-10" />
             </div>
             <h3 className="text-xl sm:text-2xl font-black text-brand-navy mb-3 uppercase tracking-tight">Logout?</h3>
             <p className="text-slate-500 text-xs sm:text-sm mb-8 sm:mb-10 font-medium leading-relaxed">Confirm logout from library account.</p>
             <div className="flex flex-col gap-3 sm:gap-4">
                <button onClick={confirmLogout} className="w-full py-4 sm:py-5 bg-red-600 text-white rounded-xl sm:rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-red-700 transition-all shadow-xl active:scale-95 min-h-[48px]">Yes, Logout</button>
                <button onClick={() => setIsLogoutModalOpen(false)} className="w-full py-4 sm:py-5 bg-slate-100 text-slate-600 rounded-xl sm:rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-200 transition-all min-h-[48px]">Cancel</button>
             </div>
          </div>
        </div>
      )}

      {/* PAYMENT MODAL */}
      {paymentModal.isOpen && (
        <div className="fixed inset-0 z-[180] flex items-center justify-center p-2 sm:p-4">
          <div className="absolute inset-0 bg-brand-navy/95 backdrop-blur-md animate-in fade-in" onClick={() => paymentModal.status !== 'processing' && setPaymentModal(prev => ({ ...prev, isOpen: false }))}></div>
          <div className="bg-white rounded-2xl sm:rounded-[3rem] shadow-2xl w-full max-w-xl relative z-10 overflow-hidden animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
             {paymentModal.status === 'success' ? (
                <div className="p-8 sm:p-16 text-center space-y-6 sm:space-y-8">
                   <div className="w-20 h-20 sm:w-28 h-28 bg-emerald-100 text-emerald-600 rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-center mx-auto animate-bounce">
                      <CheckCircle2 className="w-10 h-10 sm:w-14 h-14" />
                   </div>
                   <div>
                      <h3 className="text-2xl sm:text-4xl font-black text-brand-navy uppercase tracking-tight">Paid Successfully</h3>
                      <p className="text-slate-500 mt-2 sm:mt-4 text-sm sm:text-lg font-medium">Verified by librarian in 24 hours.</p>
                   </div>
                   <button onClick={() => setPaymentModal(prev => ({ ...prev, isOpen: false, status: 'idle' }))} className="w-full sm:w-auto px-10 sm:px-14 py-4 sm:py-5 bg-brand-navy text-white rounded-xl sm:rounded-[1.5rem] font-black uppercase tracking-[0.3em] text-[10px] sm:text-xs shadow-2xl hover:bg-brand-blue transition-all min-h-[48px]">Close Portal</button>
                </div>
             ) : (
                <>
                   <div className="bg-amber-500 p-6 sm:p-10 text-white relative">
                      <button onClick={() => setPaymentModal(prev => ({ ...prev, isOpen: false }))} className="absolute top-4 right-4 sm:top-8 sm:right-8 p-2 hover:bg-white/10 rounded-xl transition-all min-h-[40px] min-w-[40px] flex items-center justify-center"><X className="w-5 h-5 sm:w-6 h-6" /></button>
                      <div className="flex items-center gap-4 sm:gap-5 mb-6 sm:mb-8">
                         <div className="w-10 h-10 sm:w-14 h-14 bg-white/10 rounded-xl sm:rounded-[1.2rem] flex items-center justify-center border border-white/20"><ReceiptText className="w-5 h-5 sm:w-7 h-7 text-white" /></div>
                         <div>
                            <h3 className="text-lg sm:text-2xl font-black uppercase tracking-tight">Settle Dues</h3>
                            <p className="text-amber-100 text-[8px] sm:text-[10px] font-bold tracking-[0.2em] uppercase">ID: {studentData.regNo}</p>
                         </div>
                      </div>
                      <div className="space-y-2 max-h-[140px] overflow-y-auto mb-6 pr-2">
                        {paymentModal.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center bg-white/10 p-3 sm:p-4 rounded-xl border border-white/10">
                            <div className="min-w-0 flex-1 mr-3">
                              <p className="text-[10px] sm:text-xs font-black uppercase tracking-tight truncate">{item.title}</p>
                            </div>
                            <span className="font-mono font-black text-sm sm:text-lg">₹{item.amount}</span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-white/20 pt-6 sm:pt-8">
                         <p className="text-[9px] sm:text-[10px] font-bold text-amber-100 uppercase tracking-[0.3em] mb-1 sm:mb-2">Grand Total</p>
                         <p className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tighter">₹{paymentModal.items.reduce((acc, curr) => acc + curr.amount, 0)}.00</p>
                      </div>
                   </div>
                   <div className="p-6 sm:p-10 space-y-8 sm:space-y-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 items-center">
                         <div className="text-center space-y-3 sm:space-y-4">
                            <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">UPI Payment QR</p>
                            <div className="p-4 sm:p-6 bg-slate-50 rounded-2xl sm:rounded-[2rem] border-2 border-dashed border-slate-200 aspect-square flex flex-col items-center justify-center gap-3"><QrCode className="w-24 h-24 sm:w-32 h-32 text-slate-800" /><span className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">library@jit-upi</span></div>
                         </div>
                         <div className="space-y-4 sm:space-y-6">
                            <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Quick Checkout</p>
                            <div className="space-y-3 sm:space-y-4">
                               <button onClick={handleConfirmPayment} disabled={paymentModal.status === 'processing'} className="w-full flex items-center justify-center gap-3 sm:gap-4 py-4 sm:py-5 bg-brand-navy text-white rounded-xl sm:rounded-[1.5rem] transition-all font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] hover:bg-brand-blue shadow-xl active:scale-95 disabled:opacity-50 min-h-[48px]"><Smartphone className="w-4 h-4" />Confirm Pay</button>
                            </div>
                         </div>
                      </div>
                      {paymentModal.status === 'processing' && (
                         <div className="absolute inset-0 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center z-50 space-y-6 sm:space-y-8 p-4"><div className="w-16 h-16 sm:w-24 h-24 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div><h4 className="text-xl sm:text-2xl font-black text-brand-navy uppercase tracking-tighter text-center">Verifying...</h4></div>
                      )}
                   </div>
                </>
             )}
          </div>
        </div>
      )}

      <TransportAssistant />
      <Footer />
    </div>
  );
};

export default App;
