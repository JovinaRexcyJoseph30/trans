
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
  // Semester 6 - CS (Student's current semester)
  { id: 'b1', title: 'Compiler Design', author: 'Alfred V. Aho', subject: 'CS', isbn: '978-0321486813', semester: 6, branch: 'CS', status: 'Available', format: 'Both', publisher: 'Pearson' },
  { id: 'b2', title: 'Cryptography and Network Security', author: 'William Stallings', subject: 'Cyber Security', isbn: '978-0134444284', semester: 6, branch: 'CS', status: 'Available', format: 'Physical', publisher: 'Pearson' },
  { id: 'b4', title: 'Artificial Intelligence: A Modern Approach', author: 'Stuart Russell', subject: 'CS', isbn: '978-0136042594', semester: 6, branch: 'CS', status: 'Issued', format: 'Both', publisher: 'Prentice Hall' },
  { id: 'b5', title: 'Cloud Computing Principles', author: 'Rajkumar Buyya', subject: 'Cloud', isbn: '978-0123848773', semester: 6, branch: 'CS', status: 'Available', format: 'E-Book', publisher: 'Morgan Kaufmann' },
  { id: 'b6', title: 'Mobile Computing', author: 'Raj Kamal', subject: 'IT', isbn: '978-0198068914', semester: 6, branch: 'IT', status: 'Available', format: 'Physical', publisher: 'Oxford' },

  // Reference Books
  { id: 'ref-1', title: 'The Art of Computer Programming', author: 'Donald Knuth', subject: 'Algorithms', isbn: '978-0201896831', semester: 'Reference', branch: 'General', status: 'Available', format: 'Physical', publisher: 'Addison-Wesley' },
  { id: 'ref-2', title: 'Clean Code', author: 'Robert C. Martin', subject: 'Software Eng', isbn: '978-0132350884', semester: 'Reference', branch: 'General', status: 'Available', format: 'Both', publisher: 'Prentice Hall' },
  { id: 'ref-3', title: 'Design Patterns', author: 'Gamma et al.', subject: 'Software Eng', isbn: '978-0201633610', semester: 'Reference', branch: 'General', status: 'Available', format: 'Both', publisher: 'Addison-Wesley' },
  { id: 'ref-4', title: 'Introduction to Algorithms', author: 'Cormen et al.', subject: 'Algorithms', isbn: '978-0262033848', semester: 'Reference', branch: 'CS', status: 'Available', format: 'Physical', publisher: 'MIT Press' },
  
  // Journals
  { id: 'j-1', title: 'IEEE Transactions on Computers', author: 'IEEE Computer Society', subject: 'Computing', isbn: 'ISSN 0018-9340', semester: 'Journal', branch: 'General', status: 'Available', format: 'E-Book', publisher: 'IEEE' },
  { id: 'j-2', title: 'ACM Computing Surveys', author: 'ACM', subject: 'Review', isbn: 'ISSN 0360-0300', semester: 'Journal', branch: 'General', status: 'Available', format: 'Both', publisher: 'ACM' },
  { id: 'j-3', title: 'Journal of Network and Computer Applications', author: 'Elsevier', subject: 'Networking', isbn: 'ISSN 1084-8045', semester: 'Journal', branch: 'IT', status: 'Issued', format: 'Physical', publisher: 'Elsevier' }
];

export const DIGITAL_RESOURCES: DigitalResource[] = [
  // E-Journals
  { id: 1, name: 'Directory of Open Access Journals', url: 'http://doaj.org', category: 'E-Journal' },
  { id: 2, name: 'BioMed Central', url: 'http://www.biomedcentral.com/journals', category: 'E-Journal' },
  { id: 3, name: 'Scientific Research Publishing', url: 'http://www.scirp.org', category: 'E-Journal' },
  { id: 10, name: 'Google Scholar', url: 'https://www.scholar.google.com', category: 'E-Journal' },
  // E-Libraries
  { id: 16, name: 'DELNET', url: 'https://delnet.in/', category: 'E-Library' },
  { id: 17, name: 'J-Gate', url: 'https://jgateplus.com/', category: 'E-Library' },
  { id: 18, name: 'National Digital Library', url: 'https://ndl.iitkgp.ac.in/', category: 'E-Library' },
  // E-Books
  { id: 22, name: 'Project Gutenberg', url: 'https://www.gutenberg.org/', category: 'E-Book' },
  { id: 23, name: 'Open Library', url: 'https://openlibrary.org/', category: 'E-Book' },
  { id: 24, name: 'Google Books', url: 'https://books.google.com/', category: 'E-Book' }
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
- Borrowing rules: Undergraduate students can borrow up to 3 books for 15 days. Faculty can borrow up to 10 books for 3 months.
- Fine: A fine of ₹5 per day is charged for overdue books.
- Digital Resources: We have DOAJ, IEEE Xplore, DELNET, and NDL. Mention the Digital Resources tab for links.
- Study Rooms: Can be booked via the 'Study Rooms' tab (mock) or by contacting Dr. S. Ramesh.
- Payments: Fines can be paid via the Student Portal using UPI or QR code.
- Navigation: CS books are in Block A First Floor, IT books in Block B First Floor, EC books in Block C Second Floor.
- Be professional, polite, and concise. Use a friendly academic tone.
- If unsure or if the query is very complex (like technical errors in account), suggest 'Contact Librarian'.
`;
