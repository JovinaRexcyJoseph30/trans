import React, { useState } from 'react';
import { Bus, Clock, MapPin, Phone, Star, User, ChevronDown, ChevronUp, Navigation, MapPinned } from 'lucide-react';
import { BusRoute } from '../types';

interface RouteCardProps {
  route: BusRoute;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

const RouteCard: React.FC<RouteCardProps> = ({ route, isFavorite, onToggleFavorite }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'On Time': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Delayed': return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Departed': return 'text-slate-600 bg-slate-100 border-slate-200';
      default: return 'text-slate-600 bg-slate-100 border-slate-200';
    }
  };

  // Combine points for the full timeline view
  const timelinePoints = [
    { name: route.origin, type: 'start' },
    ...route.via.map(stop => ({ name: stop, type: 'via' })),
    { name: route.destination, type: 'end' }
  ];

  return (
    <div 
      className={`group bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md hover:border-brand-blue/30 transition-all duration-300 cursor-pointer relative overflow-hidden ${isExpanded ? 'ring-1 ring-brand-blue/30 shadow-md' : ''}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-2xl font-bold text-brand-navy font-mono">#{route.routeNumber}</span>
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wide border ${getStatusStyles(route.status)}`}>
              {route.status}
            </span>
          </div>
          <p className="text-slate-500 text-sm font-medium flex items-center gap-1.5">
            <span className="text-slate-800">{route.origin}</span>
            <span className="text-slate-400">to</span>
            <span className="text-brand-blue">{route.destination}</span>
          </p>
        </div>
        
        {onToggleFavorite && (
          <button 
             onClick={(e) => {
               e.stopPropagation();
               onToggleFavorite(route.id);
             }}
             className={`p-2 rounded-full transition-colors z-10 relative ${
               isFavorite 
                 ? 'text-amber-400 hover:bg-amber-50' 
                 : 'text-slate-300 hover:text-amber-400 hover:bg-slate-50'
             }`}
          >
            <Star className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        )}
      </div>

      <div className="space-y-4 mb-5">
        <div className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
          <Clock className="w-4 h-4 text-brand-blue" />
          <span className="font-mono font-medium">Departs at {route.departureTime}</span>
        </div>

        {isExpanded ? (
          <div className="mt-4 pt-4 border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-2 mb-6 text-xs font-bold text-slate-400 uppercase tracking-wider">
               <MapPin className="w-3.5 h-3.5" />
               <span>Full Route Itinerary</span>
            </div>
            
            <div className="relative pl-2">
               {timelinePoints.map((point, idx) => {
                 const isLast = idx === timelinePoints.length - 1;
                 const isFirst = idx === 0;

                 return (
                   <div 
                    key={idx} 
                    className="relative flex gap-4 pb-6 last:pb-0 group/point"
                    style={{ animationDelay: `${idx * 50}ms` }}
                   >
                      {/* Connector Line */}
                      {!isLast && (
                        <div className="absolute left-[7px] top-6 bottom-0 w-0.5 border-l-2 border-dashed border-slate-200 group-hover/point:border-brand-blue/30 transition-colors" />
                      )}

                      {/* Node Indicator */}
                      <div className={`relative z-10 flex-shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center bg-white transition-colors ${
                        isFirst 
                          ? 'border-emerald-500' 
                          : isLast 
                            ? 'border-brand-navy' 
                            : 'border-slate-300 group-hover/point:border-brand-blue'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full transition-colors ${
                          isFirst ? 'bg-emerald-500' : isLast ? 'bg-brand-navy' : 'bg-slate-300 group-hover/point:bg-brand-blue'
                        }`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 -mt-1.5 animate-in slide-in-from-left-2 duration-300 fill-mode-backwards">
                        <p className={`text-sm ${
                          isFirst || isLast ? 'font-bold text-slate-800' : 'font-medium text-slate-600'
                        }`}>
                          {point.name}
                        </p>
                        
                        {isFirst && (
                          <span className="inline-block mt-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded uppercase tracking-wide border border-emerald-100">
                            Start Point
                          </span>
                        )}
                        
                        {isLast && (
                          <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-brand-navy bg-blue-50 px-1.5 py-0.5 rounded w-fit border border-blue-100 uppercase tracking-wide">
                            <MapPinned className="w-3 h-3" />
                            <span>Destination</span>
                          </div>
                        )}
                      </div>
                   </div>
                 );
               })}
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-3 text-sm text-slate-600 px-1">
            <Navigation className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
            <span className="text-xs leading-relaxed text-slate-500 line-clamp-1">
              Via: <span className="text-slate-700 font-medium">{route.via.join(' • ')}</span>
            </span>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200">
            <User className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-700">{route.driverName}</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Bus Pilot</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <button 
             className={`p-1.5 rounded-lg text-slate-300 transition-colors ${isExpanded ? 'bg-slate-100 text-slate-600' : 'hover:bg-slate-50 hover:text-slate-500'}`}
           >
             {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
           </button>
           <a 
            href={`tel:${route.driverContact}`} 
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 px-3 py-1.5 bg-brand-navy text-white text-xs font-medium rounded-lg hover:bg-brand-blue transition-colors shadow-sm z-10 relative"
          >
            <Phone className="w-3 h-3" />
            <span>Call</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RouteCard;