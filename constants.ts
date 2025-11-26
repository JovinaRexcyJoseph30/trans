import { BusRoute, Announcement } from './types';

export const BUS_ROUTES: BusRoute[] = [
  {
    id: '1',
    routeNumber: '101',
    origin: 'Koyambedu',
    destination: 'JIT Campus',
    via: ['Vadapalani', 'Ashok Pillar', 'Guindy'],
    departureTime: '06:45 AM',
    driverName: 'R. Kumar',
    driverContact: '+91 98765 43210',
    status: 'On Time'
  },
  {
    id: '2',
    routeNumber: '102',
    origin: 'Tambaram',
    destination: 'JIT Campus',
    via: ['Chromepet', 'Pallavaram', 'Anakaputhur'],
    departureTime: '07:00 AM',
    driverName: 'S. Murugan',
    driverContact: '+91 98765 12345',
    status: 'Departed'
  },
  {
    id: '3',
    routeNumber: '103',
    origin: 'Avadi',
    destination: 'JIT Campus',
    via: ['Ambattur', 'Padi', 'Thirumangalam'],
    departureTime: '06:30 AM',
    driverName: 'K. Venkatesh',
    driverContact: '+91 98765 67890',
    status: 'Delayed'
  },
  {
    id: '4',
    routeNumber: '104',
    origin: 'T. Nagar',
    destination: 'JIT Campus',
    via: ['Saidapet', 'Velachery', 'Medavakkam'],
    departureTime: '06:50 AM',
    driverName: 'P. Rajan',
    driverContact: '+91 98765 98765',
    status: 'On Time'
  },
  {
    id: '5',
    routeNumber: '105',
    origin: 'Porur',
    destination: 'JIT Campus',
    via: ['Valasaravakkam', 'Virugambakkam'],
    departureTime: '07:10 AM',
    driverName: 'M. Ali',
    driverContact: '+91 98765 54321',
    status: 'On Time'
  }
];

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: '1',
    title: 'Route 103 will be delayed by 10 mins due to traffic at Ambattur.',
    date: 'Today, 6:45 AM',
    priority: 'High'
  },
  {
    id: '2',
    title: 'New AC Bus introduced for Tambaram route starting next month.',
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
