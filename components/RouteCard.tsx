import React from 'react';
import { Bus, Clock, MapPin, Phone } from 'lucide-react';
import { BusRoute } from '../types';

interface RouteCardProps {
  route: BusRoute;
}

const RouteCard: React.FC<RouteCardProps> = ({ route }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Time': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'Delayed': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'Departed': return 'text-zinc-400 bg-zinc-400/10 border-zinc-400/20';
      default: return 'text-zinc-400 bg-zinc-400/10 border-zinc-400/20';
    }
  };

  return (
    <div className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-all hover:bg-zinc-800/50">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl font-bold text-white">#{route.routeNumber}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(route.status)}`}>
              {route.status}
            </span>
          </div>
          <p className="text-zinc-400 text-sm flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {route.origin} to {route.destination}
          </p>
        </div>
        <div className="bg-zinc-800 p-2 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors text-zinc-400">
          <Bus className="w-5 h-5" />
        </div>
      </div>

      <div className="space-y-3 mb-5">
        <div className="flex items-center gap-3 text-sm text-zinc-300">
          <Clock className="w-4 h-4 text-zinc-500" />
          <span>Departs {route.departureTime}</span>
        </div>
        <div className="flex items-start gap-3 text-sm text-zinc-300">
          <MapPin className="w-4 h-4 text-zinc-500 mt-0.5" />
          <span className="line-clamp-1 text-zinc-400 text-xs">{route.via.join(' • ')}</span>
        </div>
      </div>

      <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-900/50 flex items-center justify-center text-xs text-blue-400 font-bold">
            {route.driverName.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-zinc-300">{route.driverName}</span>
            <span className="text-[10px] text-zinc-500">Driver</span>
          </div>
        </div>
        <a href={`tel:${route.driverContact}`} className="p-2 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-colors">
          <Phone className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default RouteCard;