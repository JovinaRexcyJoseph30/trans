
export interface LibraryResource {
  id: string;
  categoryCode: string;
  title: string;
  section: string;
  shelfLocation: string[];
  lastUpdate: string;
  librarianName: string;
  librarianContact: string;
  status: 'Available' | 'Limited' | 'Processing';
}

export type BookFormat = 'Physical' | 'E-Book' | 'Both';

export interface Book {
  id: string;
  title: string;
  author: string;
  subject: string;
  isbn: string;
  semester: number | 'Reference' | 'Journal';
  branch: 'CS' | 'IT' | 'ECE' | 'Mechanical' | 'Civil' | 'General';
  status: 'Available' | 'Issued' | 'Reserved';
  format: BookFormat;
  publisher?: string;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  priority: 'High' | 'Normal';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface StudentProfile {
  name: string;
  regNo: string;
  semester: number;
}

export interface DigitalResource {
  id: number;
  name: string;
  url: string;
  category: 'E-Journal' | 'E-Library' | 'E-Book';
}
