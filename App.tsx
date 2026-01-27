
import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TransportAssistant from './components/TransportAssistant'; 
import Footer from './components/Footer';
import ResourceCard from './components/ResourceCard';
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
  CalendarCheck, CalendarX, Archive, ReceiptText, Eye, Link2, Library, Bot, Loader2
} from 'lucide-react';
import { ChatMessage } from './types';

type TabType = 'facilities' | 'dashboard' | 'portal' | 'resources' | 'study-rooms' | 'gallery' | 'help-desk';
type PortalView = 'dashboard' | 'reserve';

interface SupportRequest {
  id: string;
  studentName: string;
  regNumber: string;
  email: string;
  message: string;
  timestamp: string;
}

interface PastBorrowedBook {
  id: string;
  title: string;
  author: string;
  semester: number;
  borrowedDate: string; // ISO format: YYYY-MM-DD
  returnedDate?: string; // ISO format
  isbn: string;
}

interface SemesterRecord {
  semester: number;
  label: string;
  borrowedCount: number;
  overdueCount: number;
  hasDues: boolean;
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('facilities');
  const [portalSubView, setPortalSubView] = useState<PortalView>('dashboard');
  
  const [books] = useState(SEMESTER_BOOKS);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [regNo, setRegNo] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [studentData] = useState({ name: 'Aditya Kumar', regNo: '2026', semester: 6, branch: 'CS', email: 'aditya.k@jit.edu' });
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

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
  const [expandedSemesters, setExpandedSemesters] = useState<number[]>([5]);

  // Semester History Data
  const [pastHistory] = useState<PastBorrowedBook[]>([
    { id: 'p-1', title: 'Digital Signal Processing', author: 'John G. Proakis', semester: 5, borrowedDate: '2023-11-01', isbn: '978-0131873742' },
    { id: 'p-2', title: 'Computer Organization and Design', author: 'David Patterson', semester: 5, borrowedDate: '2023-12-15', returnedDate: '2024-02-10', isbn: '978-0124077263' },
    { id: 'p-3', title: 'Software Engineering', author: 'Roger Pressman', semester: 5, borrowedDate: '2024-01-10', returnedDate: '2024-04-01', isbn: '978-0078022128' },
    { id: 'p-4', title: 'Database Management Systems', author: 'Abraham Silberschatz', semester: 4, borrowedDate: '2023-06-10', returnedDate: '2023-09-05', isbn: '978-0073523323' }
  ]);

  // Semester Summary Data
  const [semesterRecords] = useState<SemesterRecord[]>([
    { semester: 5, label: 'V Semester', borrowedCount: 3, overdueCount: 1, hasDues: true },
    { semester: 4, label: 'IV Semester', borrowedCount: 1, overdueCount: 0, hasDues: false },
    { semester: 3, label: 'III Semester', borrowedCount: 2, overdueCount: 0, hasDues: false }
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
    if (regNo === '2026' && password === '123456') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Use 2026 / 123456');
    }
  };

  const confirmLogout = () => {
    setIsAuthenticated(false);
    setRegNo('');
    setPassword('');
    setIsLogoutModalOpen(false);
    setPortalSubView('dashboard');
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

  const handleHdSend = async (forcedText?: string) => {
    const text = forcedText || hdInput.trim();
    if (!text || isHdLoading) return;

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
    { id: 'facilities', label: 'Library Facilities', icon: BookIcon, desc: 'Overview & Hours' },
    { id: 'dashboard', label: 'Academic Dashboard', icon: LayoutDashboard, desc: 'Stats & Analytics' },
    { id: 'portal', label: 'Student Portal', icon: GraduationCap, desc: 'Borrowed & History' },
    { id: 'resources', label: 'Digital Resources', icon: Laptop, desc: 'OPAC & E-Books' },
    { id: 'help-desk', label: 'Help Desk', icon: HelpCircle, desc: 'Support & FAQs' }
  ];

  const totalOverdueCount = semesterRecords.reduce((acc, curr) => acc + curr.overdueCount, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans overflow-x-hidden">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-6 lg:py-12 flex-grow w-full">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          
          {/* SIDE NAVIGATION */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <nav className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left rounded-2xl p-4 transition-all duration-300 border-2 ${
                      activeTab === item.id 
                        ? 'bg-brand-navy border-brand-navy shadow-lg text-white' 
                        : 'bg-white border-white hover:border-brand-blue/30 text-slate-800 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-xl ${activeTab === item.id ? 'bg-brand-blue text-white' : 'bg-slate-50 text-slate-400'}`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm tracking-tight">{item.label}</h3>
                        <p className={`text-[11px] ${activeTab === item.id ? 'text-blue-200' : 'text-slate-500'}`}>{item.desc}</p>
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
              <div className="animate-in fade-in duration-500">
                {!isAuthenticated ? (
                  <div className="max-w-md mx-auto py-12 px-4">
                    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden">
                      <div className="bg-brand-navy p-10 text-center text-white relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-brand-blue"></div>
                        <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/20">
                          <Lock className="w-10 h-10 text-brand-blue" />
                        </div>
                        <h2 className="text-3xl font-black tracking-tight uppercase">Library Portal</h2>
                        <p className="text-blue-200 text-[10px] font-bold tracking-[0.3em] uppercase mt-2">Authentic Access Required</p>
                      </div>
                      <form onSubmit={handleLogin} className="p-10 space-y-6">
                        {loginError && <div className="p-4 bg-red-50 text-red-600 text-xs font-bold rounded-2xl border border-red-100 flex items-center gap-3"><AlertCircle className="w-4 h-4" />{loginError}</div>}
                        <div className="space-y-5">
                          <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1">Register Number</label>
                            <div className="relative">
                              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                              <input type="text" value={regNo} onChange={(e) => setRegNo(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all" placeholder="2026" required />
                            </div>
                          </div>
                          <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1">Password</label>
                            <div className="relative">
                              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all" placeholder="••••••••" required />
                            </div>
                          </div>
                        </div>
                        <button type="submit" className="w-full py-5 bg-brand-navy text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-brand-blue transition-all shadow-xl active:scale-95">Login to Portal</button>
                      </form>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8 lg:space-y-12">
                    <div className="bg-white rounded-[2rem] p-6 lg:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-2 h-full bg-brand-blue"></div>
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 bg-blue-50 rounded-[1.5rem] flex items-center justify-center text-brand-blue shrink-0 border border-blue-100">
                          <User className="w-8 h-8" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-brand-blue tracking-[0.3em] uppercase mb-1">Student Session</p>
                          <h2 className="text-2xl lg:text-3xl font-black text-brand-navy leading-none mb-2">{studentData.name}</h2>
                          <div className="flex flex-wrap gap-3">
                            <span className="text-[10px] bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-black uppercase tracking-widest">{studentData.regNo}</span>
                            <span className="text-[10px] bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-black uppercase tracking-widest">Sem {studentData.semester}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 w-full md:w-auto">
                        <button onClick={() => setIsLogoutModalOpen(true)} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-white text-red-500 rounded-2xl hover:bg-red-50 hover:text-red-600 transition-all border-2 border-red-100 min-h-[52px] font-black text-[10px] uppercase tracking-widest">
                          <LogOut className="w-5 h-5" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                    <section className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                      <div className="flex items-center justify-between px-1">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 bg-brand-navy rounded-2xl text-white shadow-lg">
                            <NotebookTabs className="w-6 h-6" />
                          </div>
                          <h2 className="text-2xl lg:text-3xl font-black text-brand-navy tracking-tight">My Semester Library Record</h2>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {semesterRecords.map((record) => (
                          <div key={record.semester} className={`bg-white border-2 rounded-[2rem] overflow-hidden transition-all duration-300 ${expandedSemesters.includes(record.semester) ? 'border-brand-blue/30 shadow-xl' : 'border-slate-100 shadow-sm hover:border-slate-200'}`}>
                            <div className="p-6 lg:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 cursor-pointer" onClick={() => toggleSemester(record.semester)}>
                              <div className="flex items-center gap-6">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-colors ${record.hasDues ? 'bg-red-50 border-red-100 text-red-600' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                                  <span className="text-xl font-black">{record.semester === 5 ? 'V' : record.semester === 4 ? 'IV' : 'III'}</span>
                                </div>
                                <div>
                                  <h3 className="text-xl font-black text-brand-navy">{record.label}</h3>
                                  <div className="flex items-center gap-4 mt-1">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><BookOpen className="w-3 h-3" /> {record.borrowedCount} Borrowed</span>
                                    {record.overdueCount > 0 && <span className="text-[10px] font-black text-red-600 uppercase tracking-widest flex items-center gap-1.5"><AlertTriangle className="w-3 h-3" /> {record.overdueCount} Overdue</span>}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 w-full sm:w-auto">
                                {record.hasDues && (
                                  <button onClick={(e) => { e.stopPropagation(); handleOpenPayment(record.semester); }} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-amber-600 transition-all shadow-lg shadow-amber-200">
                                    <Wallet className="w-4 h-4" /> Pay Dues
                                  </button>
                                )}
                                <button className="p-3 bg-slate-100 text-slate-500 rounded-xl hover:bg-slate-200 transition-all">
                                  <ChevronRight className={`w-5 h-5 transition-transform ${expandedSemesters.includes(record.semester) ? 'rotate-90' : ''}`} />
                                </button>
                              </div>
                            </div>
                            {expandedSemesters.includes(record.semester) && (
                              <div className="px-6 lg:px-8 pb-8 animate-in slide-in-from-top-4 duration-300">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 border-t border-slate-50">
                                  {pastHistory.filter(h => h.semester === record.semester).map((book) => {
                                    const status = calculateDueStatus(book.borrowedDate, book.returnedDate);
                                    return (
                                      <div key={book.id} className={`bg-slate-50/50 border-2 rounded-3xl p-5 transition-all ${status.border}`}>
                                        <div className="flex justify-between items-start mb-4">
                                          <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 ${status.bg} ${status.color}`}><status.icon className="w-3 h-3" />{status.label}</div>
                                          <span className="text-[10px] font-mono text-slate-400">#{book.isbn.slice(-4)}</span>
                                        </div>
                                        <h4 className="font-black text-brand-navy text-sm line-clamp-1 mb-1">{book.title}</h4>
                                        <p className="text-[11px] text-slate-500 mb-4 italic">by {book.author}</p>
                                        {status.status === 'Overdue' && (
                                          <div className="bg-white p-3 rounded-2xl border border-red-100 text-center">
                                            <p className="text-[10px] font-black text-red-600 uppercase mb-1">{status.days} Days Overdue</p>
                                            <p className="text-[9px] text-slate-500 leading-tight">Return book immediately to avoid penalty.</p>
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                  <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/30 group hover:border-brand-blue/30 transition-all cursor-pointer" onClick={() => setActiveTab('resources')}>
                                    <Eye className="w-8 h-8 text-slate-300 mb-3 group-hover:text-brand-blue transition-colors" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-brand-blue">View Catalog</span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="space-y-12 animate-in fade-in duration-700">
                <div className="bg-white rounded-[2.5rem] p-10 lg:p-14 border border-slate-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none"><Laptop className="w-48 h-48" /></div>
                  <div className="relative z-10 max-w-4xl">
                    <h2 className="text-brand-blue font-black text-[10px] lg:text-xs tracking-[0.4em] uppercase mb-4">Knowledge Vault</h2>
                    <h1 className="text-4xl lg:text-6xl font-black text-brand-navy tracking-tight mb-6 uppercase">Digital Resources</h1>
                    <p className="text-slate-600 text-lg lg:text-xl font-medium leading-relaxed">Curated open-access journals, e-libraries, e-books, and learning platforms for academic excellence.</p>
                  </div>
                </div>
                <section className="space-y-8">
                  <div className="flex items-center gap-4 px-1">
                    <div className="p-3 bg-brand-navy rounded-2xl text-white shadow-lg"><Database className="w-6 h-6" /></div>
                    <div>
                      <h2 className="text-2xl lg:text-3xl font-black text-brand-navy tracking-tight uppercase">Open Access E-Journals</h2>
                      <p className="text-slate-500 text-sm font-medium">Globally recognized scholarly journal publishers and directories.</p>
                    </div>
                  </div>
                  <div className="hidden md:block bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest w-20">S.No</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Name of Provider</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Access Link</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {DIGITAL_RESOURCES.filter(r => r.category === 'E-Journal').map((journal, idx) => (
                          <tr key={journal.id} className="hover:bg-blue-50/30 transition-colors group">
                            <td className="px-8 py-5 text-sm font-mono text-slate-400">{idx + 1}</td>
                            <td className="px-8 py-5 text-sm font-bold text-slate-800 group-hover:text-brand-blue transition-colors">{journal.name}</td>
                            <td className="px-8 py-5 text-right">
                              <a href={journal.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-navy hover:text-white transition-all group/btn">
                                <span>Connect</span>
                                <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="md:hidden space-y-4">
                    {DIGITAL_RESOURCES.filter(r => r.category === 'E-Journal').map((journal, idx) => (
                      <div key={journal.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                        <div className="flex justify-between items-start mb-4"><span className="text-[10px] font-mono text-slate-400">Journal #{idx + 1}</span></div>
                        <h4 className="font-black text-brand-navy text-lg mb-6 leading-tight">{journal.name}</h4>
                        <a href={journal.url} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-3 py-4 bg-brand-navy text-white rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all">Visit Provider<ExternalLink className="w-4 h-4" /></a>
                      </div>
                    ))}
                  </div>
                </section>
                <section className="space-y-8">
                  <div className="flex items-center gap-4 px-1">
                    <div className="p-3 bg-brand-navy rounded-2xl text-white shadow-lg"><Library className="w-6 h-6" /></div>
                    <div>
                      <h2 className="text-2xl lg:text-3xl font-black text-brand-navy tracking-tight uppercase">E-Library Resources</h2>
                      <p className="text-slate-500 text-sm font-medium">Institutional subscriptions and national digital learning hubs.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {DIGITAL_RESOURCES.filter(r => r.category === 'E-Library').map((lib) => (
                      <a key={lib.id} href={lib.url} target="_blank" rel="noopener noreferrer" className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:border-brand-blue/30 hover:shadow-xl transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:scale-110 group-hover:opacity-10 transition-all"><Globe className="w-20 h-20" /></div>
                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-brand-blue mb-6 group-hover:bg-brand-navy group-hover:text-white transition-all"><Monitor className="w-6 h-6" /></div>
                        <h3 className="font-black text-brand-navy text-xl mb-2 group-hover:text-brand-blue transition-colors uppercase tracking-tight">{lib.name}</h3>
                        <p className="text-slate-500 text-xs font-medium mb-8 leading-relaxed italic">Access authorized scholarly materials via institutional SSO or local network.</p>
                        <div className="flex items-center gap-2 text-[10px] font-black text-brand-blue uppercase tracking-widest group-hover:translate-x-1 transition-transform"><span>Open Repository</span><ChevronRight className="w-3 h-3" /></div>
                      </a>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* ENHANCED HELP DESK TAB */}
            {activeTab === 'help-desk' && (
              <div className="space-y-12 animate-in fade-in duration-700">
                {/* Help Desk Header */}
                <div className="bg-white rounded-[2.5rem] p-10 lg:p-14 border border-slate-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                    <HelpCircle className="w-48 h-48 text-brand-navy" />
                  </div>
                  <div className="relative z-10 max-w-4xl">
                    <h2 className="text-brand-blue font-black text-[10px] lg:text-xs tracking-[0.4em] uppercase mb-4">Support Hub</h2>
                    <h1 className="text-4xl lg:text-6xl font-black text-brand-navy tracking-tight mb-6 uppercase">Library Help Desk</h1>
                    <p className="text-slate-600 text-lg lg:text-xl font-medium leading-relaxed">
                      Get instant assistance for library services, resources, and support.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
                  {/* Section 1: AI Assistant Chat Panel */}
                  <div className="xl:col-span-8">
                    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden flex flex-col h-[650px]">
                      {/* Chat Header */}
                      <div className="bg-brand-navy p-6 flex items-center justify-between text-white">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                            <Bot className="w-7 h-7 text-brand-blue" />
                          </div>
                          <div>
                            <h3 className="font-black uppercase tracking-tight text-lg">Library AI Assistant</h3>
                            <div className="flex items-center gap-1.5 opacity-70">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                              <span className="text-[10px] font-bold uppercase tracking-widest">Active Support</span>
                            </div>
                          </div>
                        </div>
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                          <ShieldCheck className="w-4 h-4 text-brand-blue" />
                          <span className="text-[9px] font-black uppercase tracking-widest">JIT Knowledge Base v2.5</span>
                        </div>
                      </div>

                      {/* Chat Messages Area */}
                      <div className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-6 bg-slate-50/50">
                        {hdMessages.map((msg, idx) => (
                          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                            <div className={`relative max-w-[85%] lg:max-w-[75%] p-5 rounded-[1.8rem] text-sm lg:text-base ${
                              msg.role === 'user' 
                                ? 'bg-brand-blue text-white rounded-br-none shadow-lg shadow-blue-500/10' 
                                : 'bg-white text-slate-700 rounded-bl-none border border-slate-200 shadow-sm'
                            }`}>
                              <p className="leading-relaxed font-medium">{msg.text}</p>
                              <div className={`mt-2 text-[9px] font-black uppercase tracking-widest opacity-40 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                          </div>
                        ))}
                        {isHdLoading && (
                          <div className="flex justify-start">
                            <div className="bg-white p-5 rounded-[1.8rem] rounded-bl-none border border-slate-200 shadow-sm flex items-center gap-4">
                              <Loader2 className="w-5 h-5 text-brand-blue animate-spin" />
                              <span className="text-xs lg:text-sm font-bold text-slate-400 uppercase tracking-widest">Assistant is typing...</span>
                            </div>
                          </div>
                        )}
                        <div ref={chatEndRef} />
                      </div>

                      {/* Chat Footer with Actions & Input */}
                      <div className="p-6 lg:p-8 bg-white border-t border-slate-100 space-y-6">
                        {/* Section 2: Smart Quick Action Buttons */}
                        <div className="flex flex-wrap gap-2">
                          {[
                            { label: "Check Book Availability", prompt: "How can I check if a book is available in the library?" },
                            { label: "View Due Date", prompt: "Where can I find my borrowed books' due dates?" },
                            { label: "Digital Resources Help", prompt: "How do I access digital resources and e-journals?" },
                            { label: "Study Room Booking", prompt: "What are the rules for booking library study rooms?" },
                            { label: "Pay Library Fine", prompt: "How can I pay my library fines online?" }
                          ].map((action, i) => (
                            <button
                              key={i}
                              onClick={() => handleHdSend(action.prompt)}
                              className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-black text-brand-navy uppercase tracking-widest hover:border-brand-blue hover:text-brand-blue transition-all active:scale-95 shadow-sm"
                            >
                              📚 {action.label}
                            </button>
                          ))}
                          <button
                            onClick={() => setShowEscalationForm(true)}
                            className="px-4 py-2.5 bg-red-50 border border-red-100 rounded-xl text-[10px] font-black text-red-600 uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all active:scale-95 shadow-sm"
                          >
                            📞 Contact Librarian
                          </button>
                        </div>

                        {/* Input Area */}
                        <div className="relative">
                          <input 
                            type="text" 
                            value={hdInput}
                            onChange={(e) => setHdInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleHdSend()}
                            placeholder="Ask about library rules, books, or services..." 
                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-5 pl-6 pr-16 text-sm lg:text-base focus:outline-none focus:border-brand-blue focus:bg-white transition-all font-medium" 
                          />
                          <button 
                            onClick={() => handleHdSend()}
                            disabled={!hdInput.trim() || isHdLoading}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-brand-navy text-white rounded-xl hover:bg-brand-blue active:scale-90 transition-all disabled:opacity-30 disabled:pointer-events-none shadow-xl shadow-navy-500/20"
                          >
                            <Send className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Escalate to Librarian / Contact Sidebar */}
                  <div className="xl:col-span-4 space-y-8">
                    {/* Escalation Form Card */}
                    {showEscalationForm ? (
                      <div className="bg-white rounded-[2.5rem] p-8 lg:p-10 border-2 border-brand-blue/20 shadow-xl animate-in zoom-in-95 duration-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
                        <div className="flex items-center justify-between mb-8">
                           <h3 className="text-xl font-black text-brand-navy uppercase tracking-tight">Direct Escalation</h3>
                           <button onClick={() => setShowEscalationForm(false)} className="p-2 hover:bg-slate-100 rounded-lg transition-all"><X className="w-5 h-5 text-slate-400" /></button>
                        </div>
                        
                        {escalationStatus === 'success' ? (
                          <div className="py-12 text-center animate-in fade-in zoom-in-95">
                             <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                                <CheckCircle2 className="w-10 h-10" />
                             </div>
                             <h4 className="text-2xl font-black text-brand-navy uppercase mb-2">Request Sent</h4>
                             <p className="text-slate-500 text-sm font-medium leading-relaxed">Your request has been sent to the librarian. Expect a response via email shortly.</p>
                          </div>
                        ) : (
                          <form onSubmit={handleEscalationSubmit} className="space-y-5">
                             <div className="space-y-4">
                                <div>
                                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1">Full Name</label>
                                   <input 
                                    type="text" 
                                    defaultValue={isAuthenticated ? studentData.name : ''} 
                                    placeholder="Enter your name" 
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all font-medium" 
                                    required 
                                   />
                                </div>
                                <div>
                                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1">Register Number</label>
                                   <input 
                                    type="text" 
                                    defaultValue={isAuthenticated ? studentData.regNo : ''} 
                                    placeholder="e.g. 2026" 
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all font-medium" 
                                    required 
                                   />
                                </div>
                                <div>
                                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1">Institutional Email</label>
                                   <input 
                                    type="email" 
                                    defaultValue={isAuthenticated ? studentData.email : ''} 
                                    placeholder="username@jit.edu" 
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all font-medium" 
                                    required 
                                   />
                                </div>
                                <div>
                                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1">Query Description</label>
                                   <textarea 
                                    placeholder="Describe your specific problem or request..." 
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all font-medium h-32 resize-none" 
                                    required 
                                   />
                                </div>
                             </div>
                             <button 
                                type="submit" 
                                disabled={escalationStatus === 'submitting'}
                                className="w-full py-4 bg-brand-navy text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-brand-blue transition-all shadow-xl disabled:opacity-50"
                             >
                                {escalationStatus === 'submitting' ? 'Submitting...' : 'Submit to Librarian'}
                             </button>
                          </form>
                        )}
                      </div>
                    ) : (
                      <div className="bg-brand-navy text-white rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
                        <h3 className="font-black text-2xl mb-4 uppercase tracking-tight">Need More help?</h3>
                        <p className="text-blue-100 text-sm mb-10 leading-relaxed font-medium opacity-90 italic">If the AI Assistant cannot resolve your query, our library staff is available for specialized consultation.</p>
                        
                        <div className="space-y-6">
                          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                            <Phone className="w-5 h-5 text-brand-blue" />
                            <div>
                              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">In-Charge Phone</p>
                              <span className="text-lg font-mono font-black">+91 74012 22005</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                            <Mail className="w-5 h-5 text-brand-blue" />
                            <div>
                              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Office Email</p>
                              <span className="text-sm font-bold">library@jeppiaarinstitute.org</span>
                            </div>
                          </div>
                        </div>

                        <button 
                          onClick={() => setShowEscalationForm(true)}
                          className="w-full mt-10 py-5 bg-white text-brand-navy rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-blue hover:text-white transition-all shadow-xl"
                        >
                          Fill Support Form
                        </button>
                      </div>
                    )}

                    {/* Common FAQs Section */}
                    <div className="bg-white rounded-[2.5rem] p-8 lg:p-10 border border-slate-200 shadow-sm">
                       <h3 className="text-lg font-black text-brand-navy uppercase tracking-widest mb-6 border-l-4 border-brand-blue pl-4">Standard FAQs</h3>
                       <div className="space-y-3">
                        {[
                          "How many books can a student borrow?",
                          "What is the fine for late returns?",
                          "How to renew books online?",
                          "Is remote access available for IEEE?"
                        ].map((q, idx) => (
                          <button 
                            key={idx} 
                            onClick={() => handleHdSend(q)}
                            className="w-full text-left p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center group hover:bg-white hover:border-brand-blue/30 transition-all"
                          >
                            <span className="text-xs font-bold text-slate-700">{q}</span>
                            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 group-hover:text-brand-blue transition-all" />
                          </button>
                        ))}
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Placeholder for other tabs */}
            {activeTab !== 'portal' && activeTab !== 'facilities' && activeTab !== 'resources' && activeTab !== 'help-desk' && (
              <div className="bg-white rounded-[3rem] p-16 text-center border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="w-20 h-20 bg-blue-50 text-brand-blue rounded-3xl flex items-center justify-center mx-auto mb-8 border border-blue-100">
                  {activeTab === 'dashboard' ? <BarChart3 className="w-10 h-10" /> : <HelpCircle className="w-10 h-10" />}
                </div>
                <h2 className="text-4xl font-black text-brand-navy uppercase tracking-tight mb-4">{activeTab} Section</h2>
                <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed font-medium">This module is currently active. Browse library resources or use the AI assistant for specific queries.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* MODALS */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-brand-navy/80 backdrop-blur-md animate-in fade-in" onClick={() => setIsLogoutModalOpen(false)}></div>
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-sm relative z-10 p-10 text-center animate-in zoom-in-95 border border-slate-200">
             <div className="w-20 h-20 bg-red-50 text-red-600 rounded-[1.5rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
                <LogOut className="w-10 h-10" />
             </div>
             <h3 className="text-2xl font-black text-brand-navy mb-3 uppercase tracking-tight">Logout session?</h3>
             <p className="text-slate-500 text-sm mb-10 font-medium leading-relaxed">Are you sure you want to log out of your student library account?</p>
             <div className="flex flex-col gap-4">
                <button onClick={confirmLogout} className="w-full py-5 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-red-700 transition-all shadow-xl shadow-red-200 active:scale-95">Yes, Logout</button>
                <button onClick={() => setIsLogoutModalOpen(false)} className="w-full py-5 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-200 transition-all">Cancel</button>
             </div>
          </div>
        </div>
      )}

      {/* PAYMENT MODAL (UPI + QR) */}
      {paymentModal.isOpen && (
        <div className="fixed inset-0 z-[180] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-brand-navy/95 backdrop-blur-md animate-in fade-in" onClick={() => paymentModal.status !== 'processing' && setPaymentModal(prev => ({ ...prev, isOpen: false }))}></div>
          <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-xl relative z-10 overflow-hidden animate-in zoom-in-95">
             {paymentModal.status === 'success' ? (
                <div className="p-16 text-center space-y-8">
                   <div className="w-28 h-28 bg-emerald-100 text-emerald-600 rounded-[2rem] flex items-center justify-center mx-auto animate-bounce shadow-inner">
                      <CheckCircle2 className="w-14 h-14" />
                   </div>
                   <div>
                      <h3 className="text-4xl font-black text-brand-navy uppercase tracking-tight">Paid Successfully</h3>
                      <p className="text-slate-500 mt-4 text-lg font-medium">Your payment is being verified by the librarian. The record will clear in 24 hours.</p>
                   </div>
                   <button onClick={() => setPaymentModal(prev => ({ ...prev, isOpen: false, status: 'idle' }))} className="px-14 py-5 bg-brand-navy text-white rounded-[1.5rem] font-black uppercase tracking-[0.3em] text-xs shadow-2xl hover:bg-brand-blue transition-all">Close Portal</button>
                </div>
             ) : (
                <>
                   <div className="bg-amber-500 p-10 text-white relative">
                      <button onClick={() => setPaymentModal(prev => ({ ...prev, isOpen: false }))} className="absolute top-8 right-8 p-3 hover:bg-white/10 rounded-2xl transition-all"><X className="w-6 h-6" /></button>
                      <div className="flex items-center gap-5 mb-8">
                         <div className="w-14 h-14 bg-white/10 rounded-[1.2rem] flex items-center justify-center border border-white/20 shadow-inner"><ReceiptText className="w-7 h-7 text-white" /></div>
                         <div>
                            <h3 className="text-2xl font-black uppercase tracking-tight">Settle Library Dues</h3>
                            <p className="text-amber-100 text-[10px] font-bold tracking-[0.2em] uppercase">Student ID: {studentData.regNo}</p>
                         </div>
                      </div>
                      <div className="space-y-3 max-h-[160px] overflow-y-auto mb-8 pr-3">
                        {paymentModal.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center bg-white/10 p-4 rounded-2xl border border-white/10">
                            <div className="min-w-0 flex-1 mr-4">
                              <p className="text-xs font-black uppercase tracking-tight truncate">{item.title}</p>
                              <p className="text-[10px] text-amber-100 font-bold uppercase">{item.days} Days Overdue</p>
                            </div>
                            <span className="font-mono font-black text-lg">₹{item.amount}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-end justify-between border-t border-white/20 pt-8">
                         <div>
                            <p className="text-[10px] font-bold text-amber-100 uppercase tracking-[0.3em] mb-2">Grand Total</p>
                            <p className="text-5xl font-black text-white font-mono tracking-tighter">₹{paymentModal.items.reduce((acc, curr) => acc + curr.amount, 0)}.00</p>
                         </div>
                      </div>
                   </div>
                   <div className="p-10 space-y-10">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 items-center">
                         <div className="text-center space-y-4">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">UPI Payment QR</p>
                            <div className="p-6 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 aspect-square flex flex-col items-center justify-center gap-4"><QrCode className="w-32 h-32 text-slate-800" /><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">library@jit-upi</span></div>
                         </div>
                         <div className="space-y-6">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Quick Checkout</p>
                            <div className="space-y-4">
                               <button onClick={handleConfirmPayment} disabled={paymentModal.status === 'processing'} className="w-full flex items-center justify-center gap-4 py-5 bg-brand-navy text-white rounded-[1.5rem] transition-all font-black text-xs uppercase tracking-[0.2em] hover:bg-brand-blue shadow-xl active:scale-95 disabled:opacity-50"><Smartphone className="w-5 h-5" />Confirm Pay</button>
                               <p className="text-[9px] text-slate-400 text-center font-bold uppercase leading-relaxed tracking-wider">Payments made via UPI reflect instantly. Retain screenshot for reference.</p>
                            </div>
                         </div>
                      </div>
                      {paymentModal.status === 'processing' && (
                         <div className="absolute inset-0 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center z-50 space-y-8"><div className="w-24 h-24 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div><h4 className="text-2xl font-black text-brand-navy uppercase tracking-tighter">Verifying Payment</h4></div>
                      )}
                   </div>
                </>
             )}
          </div>
        </div>
      )}

      {/* STICKY BOTTOM BUTTON FOR MOBILE (Visible if dues exist) */}
      {isAuthenticated && totalOverdueCount > 0 && (
        <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t border-slate-100 lg:hidden z-40 animate-in slide-in-from-bottom-full">
          <button onClick={() => handleOpenPayment()} className="w-full py-4 bg-amber-500 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-lg active:scale-95"><Wallet className="w-5 h-5" />Settle Library Dues (₹{totalOverdueCount * 5})</button>
        </div>
      )}
      
      <TransportAssistant />
      <Footer />
    </div>
  );
};

export default App;
