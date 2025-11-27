import { BusRoute, Announcement } from './types';

export const BUS_ROUTES: BusRoute[] = [
  {
    id: '1',
    routeNumber: '1',
    origin: 'Ernaoor',
    destination: 'JIT Campus',
    via: ['Thiruvottiyur', 'Tondiarpet', 'Tollgate', 'Royapuram', 'Central', 'Koyambedu', 'Maduravoyal'],
    departureTime: '06:10 AM',
    driverName: 'R. Kumar',
    driverContact: '+91 98765 43210',
    status: 'On Time'
  },
  {
    id: '2',
    routeNumber: '2',
    origin: 'Manali',
    destination: 'JIT Campus',
    via: ['Madhavaram', 'Moolakadai', 'Perambur', 'Anna Nagar', 'Thirumangalam', 'Mogappair'],
    departureTime: '06:15 AM',
    driverName: 'S. Murugan',
    driverContact: '+91 98765 12345',
    status: 'Departed'
  },
  {
    id: '3',
    routeNumber: '3',
    origin: 'Thiruvanmiyur',
    destination: 'JIT Campus',
    via: ['Adyar', 'Kotturpuram', 'Saidapet', 'Guindy', 'Porur', 'Poonamallee'],
    departureTime: '06:20 AM',
    driverName: 'K. Venkatesh',
    driverContact: '+91 98765 67890',
    status: 'Delayed'
  },
  {
    id: '4',
    routeNumber: '4',
    origin: 'Velachery',
    destination: 'JIT Campus',
    via: ['Vijaynagar', 'Medavakkam', 'Tambaram', 'Perungalathur', 'Padappai', 'Oragadam'],
    departureTime: '06:25 AM',
    driverName: 'P. Rajan',
    driverContact: '+91 98765 98765',
    status: 'On Time'
  },
  {
    id: '5',
    routeNumber: '5',
    origin: 'Kasimedu',
    destination: 'JIT Campus',
    via: ['Kalmandapam', 'Royapuram', 'Beach Station', 'Parrys', 'Central', 'Poonamallee'],
    departureTime: '06:10 AM',
    driverName: 'M. Ali',
    driverContact: '+91 98765 54321',
    status: 'On Time'
  }
];

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: '1',
    title: 'Route 3 (Thiruvanmiyur) will be delayed by 10 mins due to traffic at Guindy.',
    date: 'Today, 6:45 AM',
    priority: 'High'
  },
  {
    id: '2',
    title: 'New AC Bus introduced for Velachery route starting next month.',
    date: 'Yesterday',
    priority: 'Normal'
  }
];

export const SYSTEM_INSTRUCTION = `You are the AI Transport Assistant for Jeppiaar Institute of Technology (JIT). 
You have access to the following bus route data:
${JSON.stringify(BUS_ROUTES.map(r => ({ ...r, via: r.via.join(', ') })))}

Your goal is to help students and staff find their bus, know the timings, and get driver contact info.
- If asked about a location not listed, suggest the closest known stop from the 'via' lists.
- Be concise and helpful.
- If asked for driver numbers, provide them.
- If asked about general transport rules, assume standard college bus rules (ID card mandatory, be at stop 5 mins early).
`;