import React, { useState } from 'react';
import { Camera, MapPin, Clock, ExternalLink, Sparkles, Filter } from 'lucide-react';
import { Itinerary, Activity } from '../types';
import { formatCurrency } from '../lib/currency';
import { getPlacePhoto } from '../lib/placeImages';

interface VisualGalleryTabProps {
  itinerary: Itinerary;
  currentCurrency: string;
  onSelectActivity: (act: Activity, dayNumber: number) => void;
}

export const VisualGalleryTab: React.FC<VisualGalleryTabProps> = ({
  itinerary,
  currentCurrency,
  onSelectActivity,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDayFilter, setSelectedDayFilter] = useState<number | 'all'>('all');

  // Extract all activities with day numbers
  const allActivitiesWithDay: { activity: Activity; dayNumber: number; dayTitle: string }[] = [];
  itinerary.days.forEach((day) => {
    day.activities.forEach((act) => {
      allActivitiesWithDay.push({
        activity: act,
        dayNumber: day.dayNumber,
        dayTitle: day.title,
      });
    });
  });

  // Extract unique categories
  const categories = Array.from(new Set(allActivitiesWithDay.map((item) => item.activity.category)));

  // Filter
  const filtered = allActivitiesWithDay.filter((item) => {
    if (selectedCategory !== 'all' && item.activity.category !== selectedCategory) return false;
    if (selectedDayFilter !== 'all' && item.dayNumber !== selectedDayFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Gallery Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-extrabold uppercase tracking-wider mb-2 border border-teal-200">
            <Camera className="w-3.5 h-3.5 text-teal-600" />
            <span>Visual Place Reference Guide</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold font-display text-slate-900">
            Day-by-Day Landmark & Attraction Gallery
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Preview reference imagery for all {allActivitiesWithDay.length} planned spots across your {itinerary.days.length}-day trip to {itinerary.destination}.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Day filter */}
          <select
            value={selectedDayFilter}
            onChange={(e) => setSelectedDayFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none cursor-pointer"
          >
            <option value="all">All Days ({itinerary.days.length})</option>
            {itinerary.days.map((day) => (
              <option key={day.dayNumber} value={day.dayNumber}>
                Day {day.dayNumber}: {day.title.split(':')[1] || day.title}
              </option>
            ))}
          </select>

          {/* Category filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none cursor-pointer"
          >
            <option value="all">All Categories ({categories.length})</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Photo Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(({ activity, dayNumber, dayTitle }) => {
          const photoUrl =
            activity.imageUrl ||
            getPlacePhoto(activity.title, activity.category, itinerary.destination);

          return (
            <div
              key={activity.id}
              onClick={() => onSelectActivity(activity, dayNumber)}
              className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-teal-300 transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Photo Frame */}
              <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-900">
                <img
                  src={photoUrl}
                  alt={activity.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />

                {/* Day Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-lg bg-teal-600/90 text-white text-[11px] font-extrabold backdrop-blur-xs">
                    Day {dayNumber}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-black/60 text-white text-[11px] font-semibold backdrop-blur-xs">
                    {activity.timeSlot}
                  </span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-lg bg-white/90 text-slate-900 text-[10px] font-bold shadow-xs">
                    {activity.category}
                  </span>
                </div>

                {/* Title overlay */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-sm sm:text-base font-bold font-display leading-snug line-clamp-1 drop-shadow-md">
                    {activity.title}
                  </h3>
                  <p className="text-[11px] text-slate-300 flex items-center gap-1 mt-0.5 truncate">
                    <MapPin className="w-3 h-3 text-teal-400 shrink-0" />
                    <span>{activity.location}</span>
                  </p>
                </div>
              </div>

              {/* Card Footer Content */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {activity.description}
                </p>

                {activity.insiderTip && (
                  <div className="p-2 rounded-xl bg-amber-50 text-amber-900 text-[11px] line-clamp-1 border border-amber-200/60 font-medium">
                    💡 {activity.insiderTip}
                  </div>
                )}

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-extrabold text-teal-700 font-display">
                    {activity.estimatedCost === 0
                      ? 'Free'
                      : formatCurrency(activity.estimatedCost, currentCurrency, itinerary.currency)}
                  </span>

                  <span className="text-[11px] font-bold text-indigo-600 group-hover:text-indigo-800 flex items-center gap-1">
                    <span>View Reference &rarr;</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
