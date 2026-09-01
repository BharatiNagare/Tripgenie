import React from 'react';
import { X, MapPin, Clock, DollarSign, Lightbulb, ExternalLink, Compass } from 'lucide-react';
import { Activity, Itinerary } from '../types';
import { formatCurrency } from '../lib/currency';

interface PhotoLightboxModalProps {
  isOpen: boolean;
  activity: Activity | null;
  dayNumber?: number;
  itinerary: Itinerary;
  currentCurrency: string;
  onClose: () => void;
}

export const PhotoLightboxModal: React.FC<PhotoLightboxModalProps> = ({
  isOpen,
  activity,
  dayNumber,
  itinerary,
  currentCurrency,
  onClose,
}) => {
  if (!isOpen || !activity) return null;

  const photoUrl =
    activity.imageUrl ||
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=85';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-white/20 relative animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Header with Badge Overlay */}
        <div className="relative h-64 sm:h-80 w-full bg-slate-900 overflow-hidden">
          <img
            src={photoUrl}
            alt={activity.title}
            className="w-full h-full object-cover"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm transition-all cursor-pointer z-10"
            title="Close Preview"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top category & timing badges */}
          <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 z-10">
            {dayNumber && (
              <span className="px-2.5 py-1 rounded-lg bg-teal-600/90 text-white text-xs font-bold backdrop-blur-sm">
                Day {dayNumber}
              </span>
            )}
            <span className="px-2.5 py-1 rounded-lg bg-white/90 text-slate-900 text-xs font-bold backdrop-blur-sm">
              {activity.timeSlot} &middot; {activity.timeRange}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-indigo-600/90 text-white text-xs font-bold backdrop-blur-sm">
              {activity.category}
            </span>
          </div>

          {/* Place Title at bottom of photo */}
          <div className="absolute bottom-4 left-4 right-4 text-white z-10">
            <h3 className="text-xl sm:text-2xl font-extrabold font-display leading-tight drop-shadow-md">
              {activity.title}
            </h3>
            <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span className="truncate">{activity.location}</span>
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[50vh] overflow-y-auto">
          <p className="text-sm text-slate-700 leading-relaxed">
            {activity.description}
          </p>

          {/* Quick Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 block">Est. Cost</span>
              <span className="text-sm font-extrabold text-teal-700 font-display">
                {activity.estimatedCost === 0
                  ? 'Free'
                  : formatCurrency(activity.estimatedCost, currentCurrency, itinerary.currency)}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 block">Duration</span>
              <span className="text-sm font-bold text-slate-800 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                {activity.durationMinutes} minutes
              </span>
            </div>

            {activity.bestTimeToVisit && (
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 col-span-2 sm:col-span-1">
                <span className="text-[11px] font-bold text-slate-400 block">Best Visit Time</span>
                <span className="text-xs font-semibold text-slate-700 truncate block">
                  {activity.bestTimeToVisit}
                </span>
              </div>
            )}
          </div>

          {/* Insider Tip */}
          {activity.insiderTip && (
            <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200/90 text-amber-950 text-xs flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-amber-900 block mb-0.5">Insider Reference Tip:</strong>
                <span>{activity.insiderTip}</span>
              </div>
            </div>
          )}

          {/* Action Links */}
          <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-100">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${activity.title}, ${activity.location}, ${itinerary.destination}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-all shadow-xs"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3 h-3 text-teal-200" />
            </a>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
