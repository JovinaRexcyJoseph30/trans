
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TransportAssistant from './components/TransportAssistant'; 
import Footer from './components/Footer';
import ResourceCard from './components/ResourceCard';
import { SEMESTER_BOOKS } from './constants';
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
  Layers, Check
} from 'lucide-react';

type TabType = 'facilities' | 'dashboard' | 'portal' | 'resources' | 'study-rooms' | 'gallery' | 'help-desk';
type PortalView = 'dashboard' | 'reserve';

interface SupportRequest {
  id: string;
  studentName: string;
  regNumber: string;
  message: string;
  timestamp: string;
  status: 'Pending' | 'Responded';
  response?: string;
}

interface DigitalLink {
  no: number;
  name: string;
  url: string;
}

interface BorrowedBook {
  id: string;
  title: string;
  author: string;
  isbn: string;
  issueDate: string;
  dueDate: string;
  status: 'Borrowed' | 'Reserved' | 'Overdue';
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('facilities');
  const [portalSubView, setPortalSubView] = useState<PortalView>('dashboard');
  
  // Local state for books to allow simulated updates
  const [books, setBooks] = useState(SEMESTER_BOOKS);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [regNo, setRegNo] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [studentData, setStudentData] = useState({ name: 'Demo Student', regNo: '2026', semester: 6, branch: 'CS' });

  // Reservation States
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBranch, setFilterBranch] = useState<string>('all');
  const [activeSemesterTab, setActiveSemesterTab] = useState<number>(6);
  
  // Modal State
  const [modalData, setModalData] = useState<{
    isOpen: boolean;
    book: any | null;
    action: 'Reserved' | 'Checked Out' | '';
    dueDate?: string;
  }>({ isOpen: false, book: null, action: '' });

  // Help Desk States
  const [chatInput, setChatInput] = useState('');
  const [requests, setRequests] = useState<SupportRequest[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (regNo === '2026' && password === '123456') {
      setIsAuthenticated(true);
      setLoginError('');
      setPortalSubView('dashboard');
      setActiveSemesterTab(studentData.semester);
    } else {
      setLoginError('Invalid Register Number or Password. Hint: 2026 / 123456');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setRegNo('');
    setPassword('');
  };

  const handleBorrowAction = (bookId: string, action: 'Checkout' | 'Reserve') => {
    if (!isAuthenticated) {
      alert("Please login to your Student Portal to perform library actions.");
      setActiveTab('portal');
      return;
    }

    const book = books.find(b => b.id === bookId);
    if (!book) return;

    if (book.semester !== studentData.semester) {
      alert(`Access Restricted: You can only borrow/reserve books for Semester ${studentData.semester}. This book belongs to Semester ${book.semester}.`);
      return;
    }

    let dueDate = '';
    if (action === 'Checkout') {
      const today = new Date();
      const returnDate = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
      dueDate = returnDate.toLocaleDateString('en-GB');
      
      setBooks(prev => prev.map(b => b.id === bookId ? { ...b, status: 'Issued' as const } : b));
      setModalData({ isOpen: true, book, action: 'Checked Out', dueDate });
    } else {
      setBooks(prev => prev.map(b => b.id === bookId ? { ...b, status: 'Reserved' as const } : b));
      setModalData({ isOpen: true, book, action: 'Reserved' });
    }
  };

  const handleSendRequest = () => {
    if (!chatInput.trim()) return;

    const newRequest: SupportRequest = {
      id: Date.now().toString(),
      studentName: studentData.name,
      regNumber: studentData.regNo,
      message: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Pending'
    };

    setRequests(prev => [newRequest, ...prev]);
    setChatInput('');
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  const openAccessJournals: DigitalLink[] = [
    { no: 1, name: "DOAJ (Directory of Open Access Journals)", url: "https://doaj.org/" },
    { no: 2, name: "PLOS ONE", url: "https://journals.plos.org/plosone/" },
    { no: 3, name: "BioMed Central", url: "https://www.biomedcentral.com/" },
    { no: 4, name: "Scientific Reports (Nature)", url: "https://www.nature.com/srep/" },
    { no: 5, name: "Nature Communications", url: "https://www.nature.com/ncomms/" },
    { no: 6, name: "Elsevier Open Access", url: "https://www.elsevier.com/open-access" },
    { no: 7, name: "SpringerOpen", url: "https://www.springeropen.com/" },
    { no: 8, name: "Wiley Open Access", url: "https://authorservices.wiley.com/open-research/open-access/index.html" },
    { no: 9, name: "Taylor & Francis Open", url: "https://www.tandfonline.com/openaccess" },
    { no: 10, name: "SAGE Open", url: "https://journals.sagepub.com/home/sgo" },
    { no: 11, name: "MDPI", url: "https://www.mdpi.com/" },
    { no: 12, name: "Hindawi", url: "https://www.hindawi.com/" },
    { no: 13, name: "Frontiers", url: "https://www.frontiersin.org/" },
    { no: 14, name: "PeerJ", url: "https://peerj.com/" },
    { no: 15, name: "ArXiv", url: "https://arxiv.org/" }
  ];

  const eLibrary: DigitalLink[] = [
    { no: 1, name: "DELNET (Developing Library Network)", url: "http://delnet.in/" },
    { no: 2, name: "J-Gate", url: "https://jgateplus.com/" },
    { no: 3, name: "National Digital Library (NDL)", url: "https://ndl.iitkgp.ac.in/" },
    { no: 4, name: "World Digital Library", url: "https://www.loc.gov/collections/world-digital-library/" },
    { no: 5, name: "Shodhganga (Ph.D. Theses)", url: "https://shodhganga.inflibnet.ac.in/" },
    { no: 6, name: "Shodhsindhu (E-Journal Consortium)", url: "https://ess.inflibnet.ac.in/" }
  ];

  const eBookDatabases: DigitalLink[] = [
    { no: 1, name: "Project Gutenberg", url: "https://www.gutenberg.org/" },
    { no: 2, name: "Open Library", url: "https://openlibrary.org/" },
    { no: 3, name: "Google Books", url: "https://books.google.com/" },
    { no: 4, name: "BookBoon", url: "https://bookboon.com/" },
    { no: 5, name: "Feedbooks", url: "https://www.feedbooks.com/" },
    { no: 6, name: "ManyBooks", url: "https://manybooks.net/" },
    { no: 7, name: "PDF Drive", url: "https://www.pdfdrive.com/" },
    { no: 8, name: "Internet Archive", url: "https://archive.org/details/texts" },
    { no: 9, name: "OAPEN", url: "https://www.oapen.org/" },
    { no: 10, name: "DOAB (Directory of Open Access Books)", url: "https://www.doabooks.org/" },
    { no: 11, name: "SpringerOpen Books", url: "https://www.springeropen.com/books" },
    { no: 12, name: "InTechOpen", url: "https://www.intechopen.com/books" },
    { no: 13, name: "Wikibooks", url: "https://en.wikibooks.org/" },
    { no: 14, name: "Free-Ebooks.net", url: "https://www.free-ebooks.net/" },
    { no: 15, name: "Loyal Books", url: "http://www.loyalbooks.com/" },
    { no: 16, name: "GetFreeEBooks", url: "https://www.getfreeereader.com/" },
    { no: 17, name: "O'Reilly Open Books", url: "https://www.oreilly.com/openbook/" },
    { no: 18, name: "Baen Free Library", url: "https://www.baen.com/allbooks/category/index/id/2012" },
    { no: 19, name: "Smashwords", url: "https://www.smashwords.com/books/category/1/newest/0/free/any" },
    { no: 20, name: "Scribd (Free section)", url: "https://www.scribd.com/" },
    { no: 21, name: "PDFBooksWorld", url: "https://www.pdfbooksworld.com/" },
    { no: 22, name: "FreeComputerBooks", url: "http://freecomputerbooks.com/" },
    { no: 23, name: "OnlineProgrammingBooks", url: "https://www.onlineprogrammingbooks.com/" },
    { no: 24, name: "TechBooksForFree", url: "http://www.techbooksforfree.com/" },
    { no: 25, name: "BookYards", url: "https://www.bookyards.com/" },
    { no: 26, name: "KnowFree", url: "https://knowfree.tradepub.com/" },
    { no: 27, name: "Digital Library of India", url: "http://www.dli.gov.in/" },
    { no: 28, name: "Questia", url: "https://www.questia.com/" },
    { no: 29, name: "ReadPrint", url: "http://www.readprint.com/" },
    { no: 30, name: "Z-Library (Reference)", url: "https://z-lib.org/" }
  ];

  const freeCourseMaterials: DigitalLink[] = [
    { no: 1, name: "NPTEL (Swayam)", url: "https://nptel.ac.in/" },
    { no: 2, name: "MIT OpenCourseWare", url: "https://ocw.mit.edu/" },
    { no: 3, name: "Coursera (Free Courses)", url: "https://www.coursera.org/courses?query=free" },
    { no: 4, name: "edX (Audit Track)", url: "https://www.edx.org/" },
    { no: 5, name: "Khan Academy", url: "https://www.khanacademy.org/" },
    { no: 6, name: "Udacity (Free Courses)", url: "https://www.udacity.com/courses/all" },
    { no: 7, name: "Udemy (Free Selection)", url: "https://www.udemy.com/courses/free/" },
    { no: 8, name: "Stanford Online", url: "https://online.stanford.edu/free-courses" },
    { no: 9, name: "Harvard Online", url: "https://online-learning.harvard.edu/catalog/free" },
    { no: 10, name: "Open Yale Courses", url: "https://oyc.yale.edu/" },
    { no: 11, name: "Carnegie Mellon OLI", url: "https://oli.cmu.edu/" },
    { no: 12, name: "Academic Earth", url: "https://academicearth.org/" },
    { no: 13, name: "FutureLearn", url: "https://www.futurelearn.com/" },
    { no: 14, name: "Saylor Academy", url: "https://www.saylor.org/" },
    { no: 15, name: "Alison", url: "https://alison.com/" },
    { no: 16, name: "Codecademy (Free)", url: "https://www.codecademy.com/" },
    { no: 17, name: "freeCodeCamp", url: "https://www.freecodecamp.org/" },
    { no: 18, name: "W3Schools", url: "https://www.w3schools.com/" },
    { no: 19, name: "Tutorialspoint", url: "https://www.tutorialspoint.com/" },
    { no: 20, name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/" },
    { no: 21, name: "OpenLearning", url: "https://www.openlearning.com/" },
    { no: 22, name: "Swayam Prabha", url: "https://www.swayamprabha.gov.in/" }
  ];

  const sidebarItems: { id: TabType, label: string, icon: any, desc: string }[] = [
    { id: 'facilities', label: 'Library Facilities', icon: BookIcon, desc: 'Overview & Hours' },
    { id: 'dashboard', label: 'Academic Dashboard', icon: LayoutDashboard, desc: 'Stats & Analytics' },
    { id: 'portal', label: 'Student Portal', icon: GraduationCap, desc: 'Borrowed & Due' },
    { id: 'resources', label: 'Digital Resources', icon: Laptop, desc: 'OPAC & E-Books' },
    { id: 'study-rooms', label: 'Study Rooms', icon: School, desc: 'Group Discussions' },
    { id: 'gallery', label: 'Library Gallery', icon: Images, desc: 'Facility Photos' },
    { id: 'help-desk', label: 'Help Desk', icon: HelpCircle, desc: 'Support & FAQs' }
  ];

  const stats = [
    { title: "Total Books Collection", value: "25,000+", desc: "Overall physical book inventory", icon: BookIcon, color: "bg-brand-navy", text: "text-white", subText: "text-blue-200" },
    { title: "Digital Resources", value: "10,000+", desc: "E-books, journals, and databases", icon: Laptop, color: "bg-white", text: "text-slate-800", subText: "text-slate-500" },
    { title: "Books Currently Issued", value: "1,250", desc: "Active borrowings", icon: UserCheck, color: "bg-blue-50", text: "text-slate-800", subText: "text-slate-500" },
    { title: "Available Books", value: "23,750", desc: "Ready for borrowing", icon: CheckCircle2, color: "bg-brand-navy", text: "text-white", subText: "text-blue-200" },
    { title: "Active Student Users", value: "3,200+", desc: "Daily library service utilization", icon: GraduationCap, color: "bg-white", text: "text-slate-800", subText: "text-slate-500" },
    { title: "Research Journals Access", value: "1,500+", desc: "National & international journals", icon: FileText, color: "bg-blue-50", text: "text-slate-800", subText: "text-slate-500" }
  ];

  const myBorrowedBooks: BorrowedBook[] = [
    { 
      id: '1', 
      title: 'Modern Operating Systems (4th Edition)', 
      author: 'Andrew S. Tanenbaum',
      isbn: '978-0133591620',
      issueDate: '2024-02-10', 
      dueDate: '2024-02-24', 
      status: 'Borrowed' 
    },
    { 
      id: '2', 
      title: 'Clean Code', 
      author: 'Robert C. Martin',
      isbn: '978-0132350884',
      issueDate: '2024-01-15', 
      dueDate: '2024-01-29', 
      status: 'Overdue' 
    },
    { 
      id: '3', 
      title: 'Introduction to Algorithms', 
      author: 'Thomas H. Cormen',
      isbn: '978-0262033848',
      issueDate: '2024-02-18', 
      dueDate: '2024-03-03', 
      status: 'Reserved' 
    },
  ];

  const currentSemesterBooks = books.filter(b => b.semester === studentData.semester);
  
  const filteredReservationBooks = books.filter(b => {
    const matchesSearch = 
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.isbn.includes(searchQuery) ||
      b.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBranch = filterBranch === 'all' || b.branch === filterBranch || b.branch === 'General';
    const matchesSemester = b.semester === activeSemesterTab;
    return matchesSearch && matchesBranch && matchesSemester;
  });

  const TableComponent: React.FC<{ title: string, icon: any, data: DigitalLink[] }> = ({ title, icon: Icon, data }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
      <div className="px-5 py-4 lg:px-6 lg:py-5 bg-slate-50 border-b border-slate-100 flex items-center gap-3">
        <Icon className="w-5 h-5 text-brand-blue" />
        <h3 className="font-bold text-brand-navy tracking-tight text-sm lg:text-base">{title}</h3>
      </div>
      <div className="p-0 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200">
        <table className="w-full text-left text-sm border-collapse min-w-[500px]">
          <thead>
            <tr className="bg-white border-b border-slate-100">
              <th className="px-4 py-3 lg:px-6 font-bold text-slate-400 uppercase tracking-widest text-[10px] w-16">S. No</th>
              <th className="px-4 py-3 lg:px-6 font-bold text-slate-400 uppercase tracking-widest text-[10px]">Name of Provider / Database</th>
              <th className="px-4 py-3 lg:px-6 font-bold text-slate-400 uppercase tracking-widest text-[10px] text-right">Access URL</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.no} className="border-b border-slate-50 hover:bg-blue-50/30 transition-colors group">
                <td className="px-4 py-3 lg:px-6 text-slate-500 font-mono text-xs">{item.no}</td>
                <td className="px-4 py-3 lg:px-6 text-slate-800 font-medium group-hover:text-brand-blue transition-colors text-xs lg:text-sm">{item.name}</td>
                <td className="px-4 py-3 lg:px-6 text-right">
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 text-brand-blue hover:underline font-bold text-[10px] lg:text-xs min-h-[44px] px-2"
                  >
                    Visit <ExternalLink className="w-3 h-3" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans overflow-x-hidden">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-6 lg:py-12 flex-grow w-full">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          
          {/* Sidebar Menu */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <div className="bg-brand-navy rounded-2xl p-6 mb-6 shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-2 opacity-80">
                    <Database className="w-4 h-4 text-brand-blue" />
                    <span className="text-[10px] lg:text-xs font-bold text-white uppercase tracking-widest">Library Portal</span>
                  </div>
                  <h2 className="text-xl lg:text-2xl font-bold text-white">Central Library</h2>
                  <p className="text-blue-100 text-xs lg:text-sm mt-1">JIT Resource Hub</p>
                </div>
              </div>

              <nav className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      if (item.id === 'portal') setPortalSubView('dashboard');
                    }}
                    className={`w-full text-left rounded-xl p-3 lg:p-4 transition-all duration-300 border-2 min-h-[64px] ${
                      activeTab === item.id 
                        ? 'bg-brand-navy border-brand-navy shadow-lg text-white' 
                        : 'bg-white border-white hover:border-brand-blue/30 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 lg:gap-4">
                        <item.icon className={`w-5 h-5 lg:w-6 lg:h-6 ${activeTab === item.id ? 'text-brand-blue' : 'text-slate-400'}`} />
                        <div>
                          <h3 className="font-bold text-xs lg:text-sm">{item.label}</h3>
                          <p className={`text-[10px] lg:text-xs ${activeTab === item.id ? 'text-blue-200' : 'text-slate-500'}`}>{item.desc}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    </div>
                  </button>
                ))}
              </nav>

              <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-5 text-center shadow-sm">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3 text-brand-blue">
                  <Phone className="w-5 h-5" />
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Chief Librarian</p>
                <a href="tel:+917401222005" className="block text-lg font-bold text-brand-navy hover:text-brand-blue font-mono min-h-[44px] flex items-center justify-center">+91 74012 22005</a>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {activeTab === 'facilities' && <Hero />}

            {activeTab === 'dashboard' && (
              <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-500">
                <div className="bg-white rounded-2xl p-6 lg:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-[10px] font-bold text-brand-blue tracking-widest uppercase mb-1 lg:mb-2">Library Intelligence</h2>
                    <h1 className="text-2xl lg:text-3xl font-bold text-brand-navy">Academic Dashboard</h1>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-xl text-brand-blue self-start md:self-center">
                    <BarChart3 className="w-4 h-4 lg:w-5 lg:h-5" />
                    <span className="text-[10px] lg:text-sm font-bold uppercase tracking-wide">Live Data Sync</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                  {stats.map((stat, idx) => (
                    <div 
                      key={idx} 
                      className={`${stat.color} p-5 lg:p-6 rounded-2xl shadow-sm border ${stat.color === 'bg-white' ? 'border-slate-200' : 'border-transparent'} transition-all hover:scale-[1.01] duration-300`}
                    >
                      <div className="flex justify-between items-start mb-3 lg:mb-4">
                        <div className={`p-2.5 rounded-xl ${stat.color === 'bg-brand-navy' ? 'bg-white/10' : 'bg-brand-navy/5'}`}>
                          <stat.icon className={`w-5 h-5 lg:w-6 lg:h-6 ${stat.color === 'bg-brand-navy' ? 'text-brand-blue' : 'text-brand-navy'}`} />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className={`text-3xl lg:text-4xl font-extrabold font-mono tracking-tight ${stat.text}`}>{stat.value}</p>
                        <h3 className={`text-[10px] lg:text-sm font-bold uppercase tracking-wide ${stat.text}`}>{stat.title}</h3>
                        <p className={`text-[10px] leading-relaxed mt-1.5 ${stat.subText}`}>{stat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="space-y-8 lg:space-y-10 animate-in fade-in duration-500">
                <div className="bg-brand-navy rounded-2xl p-6 lg:p-10 text-white relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-8 opacity-10 hidden sm:block">
                      <Laptop className="w-24 h-24 lg:w-32 lg:h-32" />
                   </div>
                   <h2 className="text-[10px] font-bold text-brand-blue tracking-widest uppercase mb-2">Knowledge Repository</h2>
                   <h1 className="text-2xl lg:text-4xl font-extrabold tracking-tight">Digital Resources</h1>
                   <p className="text-blue-100 text-xs lg:text-sm mt-3 max-w-2xl leading-relaxed">Access academic journals, e-books, and certification courses through our global digital partnerships.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                  <TableComponent title="Open Access Journals" icon={Globe} data={openAccessJournals} />
                  <TableComponent title="E-Library Resources" icon={Network} data={eLibrary} />
                  <TableComponent title="E-Books Databases" icon={BookCopy} data={eBookDatabases} />
                  <TableComponent title="Free Course Materials" icon={CourseIcon} data={freeCourseMaterials} />
                </div>
              </div>
            )}

            {activeTab === 'portal' && (
              <div className="animate-in fade-in duration-500">
                {!isAuthenticated ? (
                  <div className="max-w-md mx-auto py-12 px-4">
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                      <div className="bg-brand-navy p-8 text-center text-white">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
                          <Lock className="w-8 h-8 text-brand-blue" />
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight">Student Portal Login</h2>
                        <p className="text-blue-100 text-xs mt-2 uppercase tracking-widest font-bold">Access personal academic library dashboard</p>
                      </div>
                      <form onSubmit={handleLogin} className="p-8 space-y-6">
                        {loginError && (
                          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-bold animate-in shake duration-300">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            <span>{loginError}</span>
                          </div>
                        )}
                        <div className="space-y-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Register Number</label>
                            <div className="relative">
                              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                              <input 
                                type="text" 
                                value={regNo}
                                onChange={(e) => setRegNo(e.target.value)}
                                placeholder="e.g. 2026"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all font-mono"
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Password</label>
                            <div className="relative">
                              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                              <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all font-mono"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <button 
                          type="submit"
                          className="w-full py-4 bg-brand-navy hover:bg-brand-blue text-white rounded-xl font-bold text-sm tracking-widest uppercase transition-all shadow-lg active:scale-[0.98] min-h-[48px]"
                        >
                          Login to Portal
                        </button>
                      </form>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                    {/* Authenticated Dashboard View */}
                    {portalSubView === 'dashboard' ? (
                      <div className="space-y-8">
                        <div className="bg-white rounded-2xl p-6 lg:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                          <div className="flex items-center gap-4 lg:gap-6">
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-brand-blue border border-brand-blue/10 shrink-0">
                              <GraduationCap className="w-8 h-8" />
                            </div>
                            <div>
                              <h2 className="text-[10px] font-bold text-brand-blue tracking-widest uppercase mb-1">Student Session</h2>
                              <h1 className="text-2xl lg:text-3xl font-bold text-brand-navy">Welcome, {studentData.name}</h1>
                              <p className="text-xs text-slate-500 mt-1 font-mono uppercase tracking-widest">REG NO: {studentData.regNo} | Semester: {studentData.semester} | Branch: {studentData.branch}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => setPortalSubView('reserve')}
                              className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-navy text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-brand-blue transition-all min-h-[44px] shadow-lg"
                            >
                              <Layers className="w-4 h-4" />
                              Semester Catalog
                            </button>
                            <button 
                              onClick={handleLogout}
                              className="flex items-center justify-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-xl font-bold text-xs uppercase tracking-widest border border-red-100 hover:bg-red-100 transition-all min-h-[44px]"
                            >
                              <LogOut className="w-4 h-4" />
                              Logout
                            </button>
                          </div>
                        </div>

                        {/* My Semester Books Section */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                           <div className="px-6 py-5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                              <h3 className="font-bold text-brand-navy flex items-center gap-3">
                                 <BookOpen className="w-5 h-5 text-brand-blue" />
                                 My Current Semester Books (Semester {studentData.semester})
                              </h3>
                           </div>
                           <div className="p-0 overflow-x-auto scrollbar-thin">
                              <table className="w-full text-left border-collapse min-w-[700px]">
                                 <thead>
                                    <tr className="border-b border-slate-100">
                                       <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">ISBN</th>
                                       <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Book Title</th>
                                       <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Author</th>
                                       <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Availability</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    {currentSemesterBooks.map((book) => (
                                       <tr key={book.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                                          <td className="py-5 px-6 font-mono text-[10px] text-slate-400">{book.isbn}</td>
                                          <td className="py-5 px-6">
                                             <p className="text-sm font-bold text-slate-800 group-hover:text-brand-blue transition-colors">{book.title}</p>
                                          </td>
                                          <td className="py-5 px-6 text-xs text-slate-600">{book.author}</td>
                                          <td className="py-5 px-6 text-right">
                                             <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${
                                                book.status === 'Available' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                                                book.status === 'Issued' ? 'bg-slate-50 text-slate-500 border-slate-200' :
                                                'bg-amber-50 text-amber-600 border-amber-100'
                                             }`}>
                                                {book.status === 'Available' ? 'Available' : book.status === 'Issued' ? 'Currently Issued' : book.status}
                                             </span>
                                          </td>
                                       </tr>
                                    ))}
                                 </tbody>
                              </table>
                           </div>
                        </div>

                        {/* My Borrowed Books Section */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in duration-700">
                           <div className="px-6 py-5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                              <h3 className="font-bold text-brand-navy flex items-center gap-3">
                                 <HistoryIcon className="w-5 h-5 text-brand-blue" />
                                 My Borrowed Books
                              </h3>
                           </div>
                           <div className="p-0 overflow-x-auto scrollbar-thin">
                              <table className="w-full text-left border-collapse min-w-[900px]">
                                 <thead>
                                    <tr className="border-b border-slate-100 bg-white">
                                       <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">ISBN</th>
                                       <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Title & Author</th>
                                       <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Borrowed Date</th>
                                       <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Due Date</th>
                                       <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Status</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    {myBorrowedBooks.map((book) => (
                                       <tr key={book.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                                          <td className="py-5 px-6 font-mono text-[11px] text-slate-400">{book.isbn}</td>
                                          <td className="py-5 px-6">
                                             <p className="text-sm font-bold text-slate-800 group-hover:text-brand-blue transition-colors">{book.title}</p>
                                             <p className="text-[11px] text-slate-500 mt-0.5">by {book.author}</p>
                                          </td>
                                          <td className="py-5 px-6 text-center text-xs text-slate-600 font-medium">{book.issueDate}</td>
                                          <td className="py-5 px-6 text-center text-xs text-slate-600 font-bold">{book.dueDate}</td>
                                          <td className="py-5 px-6 text-right">
                                             <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${
                                                book.status === 'Borrowed' ? 'bg-blue-50 text-brand-blue border-blue-100' : 
                                                book.status === 'Overdue' ? 'bg-red-50 text-red-600 border-red-100' : 
                                                'bg-emerald-50 text-emerald-600 border-emerald-100'
                                             }`}>
                                                {book.status}
                                             </span>
                                          </td>
                                       </tr>
                                    ))}
                                 </tbody>
                              </table>
                           </div>
                        </div>
                      </div>
                    ) : (
                      /* Semester-wise Catalog / Reservation View */
                      <div className="space-y-8 animate-in slide-in-from-right-4 duration-500 relative">
                        {/* Confirmation Modal */}
                        {modalData.isOpen && (
                          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                            <div className="absolute inset-0 bg-brand-navy/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setModalData({ ...modalData, isOpen: false })}></div>
                            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-in zoom-in-95 duration-300">
                               <div className="bg-brand-navy p-6 text-center text-white">
                                  <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white/20">
                                     <Check className="w-8 h-8" />
                                  </div>
                                  <h3 className="text-xl font-bold tracking-tight">Success!</h3>
                                  <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest mt-1">Book successfully {modalData.action === 'Reserved' ? 'reserved' : 'checked out'}</p>
                               </div>
                               <div className="p-8 space-y-6">
                                  <div className="space-y-4">
                                     <div className="flex justify-between items-start gap-4">
                                        <div className="min-w-0">
                                           <h4 className="text-sm font-black text-slate-800 line-clamp-2">{modalData.book?.title}</h4>
                                           <p className="text-xs text-slate-500 mt-1">by {modalData.book?.author}</p>
                                        </div>
                                        <div className="text-right shrink-0">
                                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ISBN</p>
                                           <p className="text-[11px] font-mono font-bold text-slate-800">{modalData.book?.isbn}</p>
                                        </div>
                                     </div>
                                     <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                                        <div className="flex justify-between items-center">
                                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reserved By</span>
                                           <span className="text-xs font-bold text-slate-700">{studentData.name}</span>
                                        </div>
                                        {modalData.dueDate && (
                                          <div className="flex justify-between items-center">
                                             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Due Date</span>
                                             <span className="text-xs font-black text-brand-blue">{modalData.dueDate}</span>
                                          </div>
                                        )}
                                     </div>
                                  </div>
                                  <button 
                                     onClick={() => setModalData({ ...modalData, isOpen: false })}
                                     className="w-full py-4 bg-brand-navy hover:bg-brand-blue text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg active:scale-[0.98]"
                                  >
                                     OK
                                  </button>
                               </div>
                            </div>
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                           <button 
                              onClick={() => setPortalSubView('dashboard')}
                              className="flex items-center gap-2 text-slate-500 hover:text-brand-navy font-bold text-xs uppercase tracking-widest group"
                           >
                              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                              Back to Dashboard
                           </button>
                           <div className="bg-brand-blue/10 px-4 py-2 rounded-xl text-brand-blue text-[10px] font-bold uppercase tracking-widest">
                             My Branch: {studentData.branch} | My Sem: {studentData.semester}
                           </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 lg:p-8 border border-slate-200 shadow-sm relative">
                           {/* SEARCH BAR - STICKY UI */}
                           <div className="sticky top-0 z-20 bg-white pt-2 pb-6 mb-2 border-b border-slate-100">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                 <div>
                                    <h1 className="text-2xl lg:text-3xl font-bold text-brand-navy tracking-tight">Library Catalog</h1>
                                    <p className="text-xs text-slate-500 mt-1">Browse and reserve textbooks for your academic track.</p>
                                 </div>
                                 <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                                    <div className="relative flex-1 sm:min-w-[300px]">
                                       <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                       <input 
                                          type="text" 
                                          value={searchQuery}
                                          onChange={(e) => setSearchQuery(e.target.value)}
                                          placeholder="Search by Title, Author, ISBN or Category..."
                                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all shadow-sm"
                                       />
                                    </div>
                                    <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-200">
                                       <Filter className="w-4 h-4 text-slate-400 ml-2" />
                                       <select 
                                          value={filterBranch}
                                          onChange={(e) => setFilterBranch(e.target.value)}
                                          className="bg-transparent px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-600 focus:outline-none"
                                       >
                                          <option value="all">All Departments</option>
                                          <option value="CS">Computer Science</option>
                                          <option value="IT">Information Tech</option>
                                          <option value="ECE">Electronics</option>
                                          <option value="Mechanical">Mechanical</option>
                                          <option value="Civil">Civil</option>
                                       </select>
                                    </div>
                                 </div>
                              </div>
                           </div>

                           {/* Semester Tabs */}
                           <div className="flex flex-wrap gap-2 mb-10 pb-4">
                              {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                                <button
                                  key={sem}
                                  onClick={() => setActiveSemesterTab(sem)}
                                  className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                    activeSemesterTab === sem 
                                      ? 'bg-brand-navy text-white shadow-xl scale-105' 
                                      : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                                  } ${sem === studentData.semester ? 'ring-2 ring-brand-blue ring-offset-4 ring-offset-white' : ''}`}
                                >
                                  Semester {sem} {sem === studentData.semester ? '(Current)' : ''}
                                </button>
                              ))}
                           </div>

                           <div className="mb-8 flex items-center gap-4">
                              <span className="h-0.5 bg-slate-100 flex-1"></span>
                              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] px-2 text-center">
                                Semester {activeSemesterTab} – Prescribed Books
                              </h3>
                              <span className="h-0.5 bg-slate-100 flex-1"></span>
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                              {filteredReservationBooks.length === 0 ? (
                                 <div className="col-span-full py-24 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                                       <Search className="w-8 h-8 text-slate-300" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800">No results found</h3>
                                    <p className="text-slate-400 text-sm mt-2 max-w-xs mx-auto font-medium">Try adjusting your keywords or department filters to discover resources.</p>
                                 </div>
                              ) : (
                                 filteredReservationBooks.map((book) => (
                                    <div key={book.id} className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col hover:border-brand-blue/40 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                                       <div className="absolute top-0 right-0 w-24 h-24 bg-brand-navy/5 -mr-8 -mt-8 rounded-full blur-2xl group-hover:bg-brand-blue/10 transition-colors"></div>
                                       
                                       <div className="flex justify-between items-start mb-6 relative z-10">
                                          <div className="flex gap-2">
                                             <span className="px-3 py-1 rounded-xl bg-blue-50 text-brand-blue text-[9px] font-black uppercase tracking-widest border border-blue-100">{book.branch}</span>
                                          </div>
                                          <span className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-colors ${
                                             book.status === 'Available' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                                             book.status === 'Issued' ? 'bg-slate-100 text-slate-500 border-slate-200' :
                                             'bg-amber-50 text-amber-600 border-amber-100'
                                          }`}>
                                             {book.status === 'Issued' ? 'Currently Issued' : book.status}
                                          </span>
                                       </div>
                                       
                                       <div className="flex-1 relative z-10">
                                          <h4 className="text-lg font-black text-slate-800 mb-2 group-hover:text-brand-blue transition-colors line-clamp-2 leading-tight">{book.title}</h4>
                                          <div className="flex items-center gap-2 mb-2">
                                             <User className="w-3.5 h-3.5 text-slate-400" />
                                             <p className="text-xs text-slate-600 font-bold">{book.author}</p>
                                          </div>
                                          <div className="flex items-center gap-2 mb-4">
                                             <ClipboardList className="w-3.5 h-3.5 text-slate-400" />
                                             <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{book.subject}</p>
                                          </div>
                                          <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-100 mb-2">
                                             <p className="text-[10px] text-slate-400 font-mono uppercase tracking-tighter">ISBN Reference</p>
                                             <p className="text-xs font-mono font-bold text-slate-800 mt-0.5">{book.isbn}</p>
                                          </div>
                                       </div>

                                       <div className="space-y-3 mt-6 relative z-10">
                                          {book.status === 'Available' ? (
                                             <div className="grid grid-cols-1 gap-2.5">
                                                <button 
                                                   onClick={() => handleBorrowAction(book.id, 'Reserve')}
                                                   className="w-full py-3.5 bg-brand-navy text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-blue transition-all shadow-lg active:scale-95"
                                                >
                                                   Reserve Now
                                                </button>
                                                <button 
                                                   onClick={() => handleBorrowAction(book.id, 'Checkout')}
                                                   className="w-full py-3.5 bg-white border-2 border-slate-200 text-slate-700 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 hover:border-brand-blue/40 transition-all active:scale-95"
                                                >
                                                   Check Out
                                                </button>
                                             </div>
                                          ) : (
                                             <button 
                                                disabled
                                                className="w-full py-4 bg-slate-100 border border-slate-200 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest cursor-not-allowed opacity-70"
                                             >
                                                {book.status === 'Issued' ? 'Currently Issued' : 'Reserved'}
                                             </button>
                                          )}
                                       </div>
                                    </div>
                                 ))
                              )}
                           </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'dashboard' && (
              <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-500">
                <div className="bg-white rounded-2xl p-6 lg:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-[10px] font-bold text-brand-blue tracking-widest uppercase mb-1 lg:mb-2">Library Intelligence</h2>
                    <h1 className="text-2xl lg:text-3xl font-bold text-brand-navy">Academic Dashboard</h1>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-xl text-brand-blue self-start md:self-center">
                    <BarChart3 className="w-4 h-4 lg:w-5 lg:h-5" />
                    <span className="text-[10px] lg:text-sm font-bold uppercase tracking-wide">Live Data Sync</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                  {stats.map((stat, idx) => (
                    <div 
                      key={idx} 
                      className={`${stat.color} p-5 lg:p-6 rounded-2xl shadow-sm border ${stat.color === 'bg-white' ? 'border-slate-200' : 'border-transparent'} transition-all hover:scale-[1.01] duration-300`}
                    >
                      <div className="flex justify-between items-start mb-3 lg:mb-4">
                        <div className={`p-2.5 rounded-xl ${stat.color === 'bg-brand-navy' ? 'bg-white/10' : 'bg-brand-navy/5'}`}>
                          <stat.icon className={`w-5 h-5 lg:w-6 lg:h-6 ${stat.color === 'bg-brand-navy' ? 'text-brand-blue' : 'text-brand-navy'}`} />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className={`text-3xl lg:text-4xl font-extrabold font-mono tracking-tight ${stat.text}`}>{stat.value}</p>
                        <h3 className={`text-[10px] lg:text-sm font-bold uppercase tracking-wide ${stat.text}`}>{stat.title}</h3>
                        <p className={`text-[10px] leading-relaxed mt-1.5 ${stat.subText}`}>{stat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="bg-white rounded-2xl p-8 lg:p-12 text-center border border-slate-200 min-h-[400px] flex flex-col items-center justify-center animate-in fade-in duration-500">
                 <Images className="w-12 h-12 lg:w-16 lg:h-16 text-slate-200 mb-4" />
                 <h2 className="text-xl lg:text-2xl font-bold text-brand-navy uppercase tracking-wide">Library Gallery</h2>
                 <p className="text-xs lg:text-sm text-slate-500 mt-2 max-w-sm">Photography coming soon.</p>
              </div>
            )}

            {activeTab === 'study-rooms' && (
              <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-500">
                 <div className="bg-white rounded-2xl p-6 lg:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-[10px] font-bold text-brand-blue tracking-widest uppercase mb-1">Academic Environment</h2>
                      <h1 className="text-2xl lg:text-4xl font-extrabold text-brand-navy tracking-tight">Study Rooms</h1>
                    </div>
                    <button className="px-6 py-2.5 lg:px-8 lg:py-3 bg-brand-navy text-white rounded-xl font-bold hover:bg-brand-blue transition-all shadow-lg hover:shadow-brand-blue/20 text-xs lg:text-sm min-h-[44px]">
                      Reserve a Slot
                    </button>
                 </div>

                 <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="flex flex-col lg:flex-row">
                       <div className="p-6 lg:p-10 lg:w-3/5 flex flex-col justify-center">
                          <h3 className="text-xl lg:text-2xl font-bold text-brand-navy mb-4 lg:mb-6">Environment for Excellence</h3>
                          <div className="space-y-3 lg:space-y-4 text-slate-600 leading-relaxed font-medium text-xs lg:text-sm">
                             <p>Our study rooms provide a quiet, focused, and technology-enabled environment designed to support collaborative academic work.</p>
                          </div>
                       </div>
                       <div className="lg:w-2/5 p-4 lg:p-8 pt-0 lg:pt-8">
                          <img 
                            src="https://www.jeppiaarinstitute.org/wp-content/uploads/2024/05/lib1.jpeg" 
                            alt="JIT Library Study Space" 
                            className="w-full h-48 lg:h-full object-cover rounded-2xl shadow-lg"
                          />
                       </div>
                    </div>
                 </div>
              </div>
            )}

            {activeTab === 'help-desk' && (
              <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-500">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="bg-brand-navy p-6 lg:p-10 text-white relative">
                    <ShieldCheck className="w-6 h-6 text-emerald-400 mb-2" />
                    <h1 className="text-2xl lg:text-3xl font-bold">Library Help Desk</h1>
                    <p className="text-blue-100 text-xs lg:text-sm mt-2">Support for research, resources, or technical access.</p>
                  </div>
                  
                  <div className="p-5 lg:p-8">
                     <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-10">
                        <div className="flex flex-col h-full min-h-[450px]">
                           <div className="flex items-center justify-between mb-4">
                              <h3 className="text-base lg:text-lg font-bold text-brand-navy flex items-center gap-2">
                                 <MessageSquare className="w-4 h-4 lg:w-5 lg:h-5 text-brand-blue" />
                                 Chat with Librarian
                              </h3>
                           </div>
                           
                           <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex-grow flex flex-col justify-end max-h-[400px]">
                              {requests.length === 0 ? (
                                 <div className="text-center py-12 opacity-40">
                                    <MessageSquare className="w-10 h-10 lg:w-12 lg:h-12 mx-auto mb-3" />
                                    <p className="text-xs lg:text-sm">Start a conversation about your library query.</p>
                                 </div>
                              ) : (
                                 <div className="space-y-3 overflow-y-auto pr-2 scrollbar-thin">
                                    {requests.map(req => (
                                       <div key={req.id}>
                                          <div className="flex justify-end">
                                             <div className="bg-brand-navy text-white text-[11px] lg:text-xs p-3 rounded-2xl rounded-br-none max-w-[85%] shadow-sm">
                                                {req.message}
                                             </div>
                                          </div>
                                       </div>
                                    ))}
                                 </div>
                              )}
                           </div>

                           <div className="mt-4 relative">
                              <input 
                                 type="text" 
                                 value={chatInput}
                                 onChange={(e) => setChatInput(e.target.value)}
                                 onKeyDown={(e) => e.key === 'Enter' && handleSendRequest()}
                                 placeholder="Ask about books..." 
                                 className="w-full bg-white border border-slate-200 rounded-xl py-4 pl-4 pr-14 text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all shadow-inner"
                              />
                              <button 
                                 onClick={handleSendRequest}
                                 disabled={!chatInput.trim()}
                                 className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-brand-navy text-white rounded-lg hover:bg-brand-blue"
                              >
                                 <Send className="w-4 h-4" />
                              </button>
                           </div>
                        </div>
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
