import React, { useState } from 'react';
import { X, Compass, Sparkles, ArrowRight, DollarSign, Calendar, MapPin } from 'lucide-react';
import { DestinationInspiration } from '../types';
import { SAMPLE_DESTINATIONS } from '../data/sampleDestinations';
import { formatCurrency } from '../lib/currency';

interface ExploreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDestination: (destName: string) => void;
  currentCurrency: string;
}

export const ExploreModal: React.FC<ExploreModalProps> = ({
  isOpen,
  onClose,
  onSelectDestination,
  currentCurrency,
}) => {
  const [activeVibeFilter, setActiveVibeFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const vibes = ['All', 'Culture', 'Beach & Tropical', 'Adventure', 'Romantic', 'Culinary'];

  const filteredDestinations = SAMPLE_DESTINATIONS.filter((dest) => {
    const matchesSearch = 
      dest.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;
    if (activeVibeFilter === 'All') return true;
    return dest.vibe.some(v => v.toLowerCase().includes(activeVibeFilter.toLowerCase()));
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-slate-900">Explore & Discover Destinations</h3>
              <p className="text-xs text-slate-500">Curated global travel destinations with budget indices</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Vibe Filters */}
        <div className="space-y-3 shrink-0">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by city, country, or landmark (e.g. Temple, Alps, Beach)..."
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-teal-500 focus:bg-white font-medium"
          />

          <div className="flex flex-wrap gap-1.5">
            {vibes.map((vibe) => (
              <button
                key={vibe}
                onClick={() => setActiveVibeFilter(vibe)}
                className={`text-xs px-3 py-1.5 rounded-xl border font-semibold transition-all cursor-pointer ${
                  activeVibeFilter === vibe
                    ? 'bg-teal-600 text-white border-teal-600 shadow-2xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {vibe}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Destinations */}
        <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="group bg-white rounded-2xl border border-slate-200 hover:border-teal-300 hover:shadow-lg transition-all overflow-hidden flex flex-col"
            >
              <div className="relative h-36 overflow-hidden">
                <img
                  src={dest.imageUrl}
                  alt={dest.city}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <h4 className="text-base font-bold font-display">{dest.city}</h4>
                  <span className="text-[11px] text-teal-300 block">{dest.country}</span>
                </div>
              </div>

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {dest.tagline}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {dest.vibe.slice(0, 3).map((v) => (
                      <span key={v} className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                        {v}
                      </span>
                    ))}
                  </div>

                  <div className="pt-1 text-[11px] text-slate-500 space-y-0.5">
                    <p>📅 Best: <strong className="text-slate-700">{dest.bestMonths}</strong></p>
                    <p>💰 Est. Daily: <strong className="text-teal-700">{formatCurrency(dest.avgDailyCostUSD, currentCurrency, 'USD')}</strong></p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSelectDestination(`${dest.city}, ${dest.country}`);
                    onClose();
                  }}
                  className="w-full py-2 bg-teal-50 hover:bg-teal-600 hover:text-white text-teal-700 font-bold text-xs rounded-xl border border-teal-200 transition-all cursor-pointer flex items-center justify-center gap-1.5 mt-2"
                >
                  <span>Plan Trip Here</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
