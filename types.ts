export interface BusRoute {
  id: string;
  routeNumber: string;
  origin: string;
  destination: string;
  via: string[];
  departureTime: string;
  driverName: string;
  driverContact: string;
  status: 'On Time' | 'Delayed' | 'Departed';
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