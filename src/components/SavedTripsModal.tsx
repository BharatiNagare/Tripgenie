import React from 'react';
import { X, Bookmark, Trash2, Calendar, MapPin, DollarSign, ArrowRight, Sparkles } from 'lucide-react';
import { Itinerary } from '../types';
import { formatCurrency } from '../lib/currency';

interface SavedTripsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedTrips: Itinerary[];
  onSelectTrip: (trip: Itinerary) => void;
  onDeleteTrip: (tripId: string) => void;
  currentCurrency: string;
}

export const SavedTripsModal: React.FC<SavedTripsModalProps> = ({
  isOpen,
  onClose,
  savedTrips,
  onSelectTrip,
  onDeleteTrip,
  currentCurrency,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
              <Bookmark className="w-5 h-5 fill-teal-600 text-teal-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-slate-900">Saved Itineraries Library</h3>
              <p className="text-xs text-slate-500">Stored locally in your browser for offline review</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {savedTrips.length === 0 ? (
          <div className="text-center py-10 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Bookmark className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-700">No Saved Trips Yet</h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              When you generate an itinerary, click &ldquo;Save Trip&rdquo; in the header to store it in your collection.
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            {savedTrips.map((trip) => (
              <div
                key={trip.id}
                className="p-4 rounded-2xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50 hover:bg-white"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 text-[10px] font-bold">
                      {trip.days.length} Days
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {new Date(trip.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{trip.title}</h4>
                  <p className="text-xs text-slate-500 flex items-center gap-2">
                    <span>📍 {trip.destination}, {trip.country}</span>
                    <span>&middot;</span>
                    <span>💰 {formatCurrency(trip.totalEstimatedCost, currentCurrency, trip.currency)}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => {
                      onSelectTrip(trip);
                      onClose();
                    }}
                    className="px-3.5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                  >
                    <span>Open Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onDeleteTrip(trip.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Delete Saved Trip"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
