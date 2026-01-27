
import { LibraryResource, Announcement, Book, DigitalResource } from './types';

export const LIBRARY_RESOURCES: LibraryResource[] = [
  {
    id: '1',
    categoryCode: 'CS-01',
    title: 'Computer Science & Engineering',
    section: 'First Floor - A Block',
    shelfLocation: ['Data Structures', 'Algorithms', 'Operating Systems', 'Cloud Computing', 'AI & ML'],
    lastUpdate: 'Updated 10 mins ago',
    librarianName: 'Dr. S. Ramesh',
    librarianContact: '+91 74012 22005',
    status: 'Available'
  },
  {
    id: '2',
    categoryCode: 'IT-02',
    title: 'Information Technology',
    section: 'First Floor - B Block',
    shelfLocation: ['Web Development', 'Cyber Security', 'Database Management', 'Computer Networks'],
    lastUpdate: 'Checked Today',
    librarianName: 'Ms. K. Priya',
    librarianContact: '+91 74012 22006',
    status: 'Processing'
  },
  {
    id: '3',
    categoryCode: 'EC-03',
    title: 'Electronics & Communication',
    section: 'Second Floor - C Block',
    shelfLocation: ['Digital Electronics', 'Signals & Systems', 'Microprocessors', 'Embedded Systems'],
    lastUpdate: 'Refilling Stock',
    librarianName: 'Mr. V. Mani',
    librarianContact: '+91 74012 22007',
    status: 'Limited'
  }
];

export const SEMESTER_BOOKS: Book[] = [
  // Semester 8
  { id: 'b8-1', title: 'Professional Ethics in Engineering', author: 'Charles D. Fleddermann', subject: 'Ethics', isbn: '978-0132145213', semester: 8, branch: 'General', status: 'Available' },
  
  // Semester 7
  { id: 'b7-1', title: 'Principles of Cloud Computing', author: 'P. Venkata Krishna', subject: 'Cloud', isbn: '978-1259026331', semester: 7, branch: 'CS', status: 'Available' },
  { id: 'b7-2', title: 'Adhoc and Sensor Networks', author: 'C. Siva Ram Murthy', subject: 'Networks', isbn: '978-0131322387', semester: 7, branch: 'CS', status: 'Reserved' },

  // Semester 6 - CS
  { id: 'b1', title: 'Compiler Design', author: 'Alfred V. Aho', subject: 'Computer Science', isbn: '978-0321486813', semester: 6, branch: 'CS', status: 'Available' },
  { id: 'b2', title: 'Cryptography and Network Security', author: 'William Stallings', subject: 'Cyber Security', isbn: '978-0134444284', semester: 6, branch: 'CS', status: 'Available' },
  { id: 'b3', title: 'Mobile Computing', author: 'Raj Kamal', subject: 'IT', isbn: '978-0198068914', semester: 6, branch: 'IT', status: 'Issued' },
  { id: 'b4', title: 'Artificial Intelligence', author: 'Stuart Russell', subject: 'Computer Science', isbn: '978-0136042594', semester: 6, branch: 'CS', status: 'Available' },
  { id: 'b5', title: 'Cloud Computing Principles', author: 'Rajkumar Buyya', subject: 'Cloud', isbn: '978-0123848773', semester: 6, branch: 'CS', status: 'Available' },
  
  // Semester 5
  { id: 'b5-1', title: 'Theory of Computation', author: 'Michael Sipser', subject: 'Theory', isbn: '978-1133187783', semester: 5, branch: 'CS', status: 'Available' },
  { id: 'b5-2', title: 'Microprocessors and Interfacing', author: 'Douglas V. Hall', subject: 'Hardware', isbn: '978-0070601673', semester: 5, branch: 'ECE', status: 'Available' },

  // Semester 4
  { id: 'b6', title: 'Database System Concepts', author: 'Silberschatz', subject: 'DBMS', isbn: '978-0073523323', semester: 4, branch: 'CS', status: 'Available' },
  { id: 'b7', title: 'Discrete Mathematics', author: 'Kenneth Rosen', subject: 'Mathematics', isbn: '978-0073383095', semester: 4, branch: 'General', status: 'Issued' },
  { id: 'b8', title: 'Design and Analysis of Algorithms', author: 'Sartaj Sahni', subject: 'Algorithms', isbn: '978-8173716126', semester: 4, branch: 'CS', status: 'Available' },
  
  // Semester 3
  { id: 'b3-1', title: 'Digital Design', author: 'Morris Mano', subject: 'Electronics', isbn: '978-0132774208', semester: 3, branch: 'ECE', status: 'Available' },

  // Semester 2 - General
  { id: 'b9', title: 'Engineering Physics', author: 'Gaur & Gupta', subject: 'Physics', isbn: '978-8189928223', semester: 2, branch: 'General', status: 'Available' },
  { id: 'b10', title: 'Calculus and Linear Algebra', author: 'B.S. Grewal', subject: 'Mathematics', isbn: '978-8193328491', semester: 2, branch: 'General', status: 'Available' },

  // Semester 1
  { id: 'b1-1', title: 'Engineering Graphics', author: 'N.D. Bhatt', subject: 'Graphics', isbn: '978-9380358178', semester: 1, branch: 'General', status: 'Available' }
];

export const DIGITAL_RESOURCES: DigitalResource[] = [
  // E-Journals
  { id: 1, name: 'Directory of Open Access Journals', url: 'http://doaj.org', category: 'E-Journal' },
  { id: 2, name: 'BioMed Central', url: 'http://www.biomedcentral.com/journals', category: 'E-Journal' },
  { id: 3, name: 'Scientific Research Publishing', url: 'http://www.scirp.org', category: 'E-Journal' },
  { id: 4, name: 'CORE', url: 'https://www.core.ac.uk/', category: 'E-Journal' },
  { id: 5, name: 'Trans Stellar Journal Publication & Research Consultancy', url: 'http://www.tiprc.org/', category: 'E-Journal' },
  { id: 6, name: 'Science Publications', url: 'http://thescipub.com', category: 'E-Journal' },
  { id: 7, name: 'Research India Publication', url: 'http://www.ripublication.com', category: 'E-Journal' },
  { id: 8, name: 'IAEME', url: 'http://www.iaeme.com', category: 'E-Journal' },
  { id: 9, name: 'SSRG', url: 'http://www.internationaljournalssrg.org', category: 'E-Journal' },
  { id: 10, name: 'Google Scholar', url: 'https://www.scholar.google.com', category: 'E-Journal' },
  { id: 11, name: 'arXiv', url: 'https://www.arxiv.org', category: 'E-Journal' },
  { id: 12, name: 'Hindawi', url: 'http://www.hindawi.com', category: 'E-Journal' },
  { id: 13, name: 'CSC Open-Access Library', url: 'http://www.cscjournals.org', category: 'E-Journal' },
  { id: 14, name: 'OMICS International', url: 'http://www.omicsonline.org', category: 'E-Journal' },
  { id: 15, name: 'Indian Academy of Sciences', url: 'http://www.ias.ac.in', category: 'E-Journal' },
  // E-Libraries
  { id: 16, name: 'DELNET', url: 'https://delnet.in/', category: 'E-Library' },
  { id: 17, name: 'J-Gate', url: 'https://jgateplus.com/', category: 'E-Library' },
  { id: 18, name: 'National Digital Library', url: 'https://ndl.iitkgp.ac.in/', category: 'E-Library' },
  { id: 19, name: 'World Digital Library', url: 'https://www.wdl.org/', category: 'E-Library' },
  { id: 20, name: 'Shodhganga', url: 'https://shodhganga.inflibnet.ac.in/', category: 'E-Library' },
  { id: 21, name: 'ShodhSindhu', url: 'https://ess.inflibnet.ac.in/', category: 'E-Library' },
  // E-Books
  { id: 22, name: 'Project Gutenberg', url: 'https://www.gutenberg.org/', category: 'E-Book' },
  { id: 23, name: 'Open Library', url: 'https://openlibrary.org/', category: 'E-Book' },
  { id: 24, name: 'Google Books', url: 'https://books.google.com/', category: 'E-Book' },
  { id: 25, name: 'BookBoon', url: 'https://bookboon.com/', category: 'E-Book' },
  { id: 26, name: 'Directory of Open Access Books (DOAB)', url: 'https://www.doabooks.org/', category: 'E-Book' }
];

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: '1',
    title: 'New arrival of IEEE Journals and Digital Magazines in the Reference Section.',
    date: 'Today, 8:30 AM',
    priority: 'High'
  },
  {
    id: '2',
    title: 'Library hours extended until 8:00 PM for the upcoming Semester Examinations.',
    date: 'Yesterday',
    priority: 'Normal'
  }
];

export const SYSTEM_INSTRUCTION = `You are the AI Library Assistant for Jeppiaar Institute of Technology (JIT). 
You have access to the library resource database:
${JSON.stringify(LIBRARY_RESOURCES.map(r => ({ ...r, shelfLocation: r.shelfLocation.join(', ') })))}

Your goal is to help students and staff find books, know library hours, and get librarian contact info.
- If asked for a specific book, check the shelfLocation lists in the database.
- Library timings: Mon-Fri (8:00 AM - 6:00 PM), Extended during exams (8:00 AM - 8:00 PM).
- Be professional, helpful, and concise.
- If asked about rules, emphasize ID card usage and silence.
`;
