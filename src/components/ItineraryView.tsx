import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  DollarSign, 
  Sparkles, 
  Bookmark, 
  Share2, 
  Printer, 
  Download, 
  MessageSquare, 
  Cpu, 
  CheckCircle2, 
  Circle, 
  ExternalLink, 
  RefreshCw, 
  AlertCircle, 
  Lightbulb, 
  Compass, 
  Utensils, 
  ShieldCheck, 
  Volume2, 
  Plus, 
  Trash2, 
  ArrowLeft,
  ChevronRight,
  TrendingDown,
  Info,
  Car,
  Layers,
  ThermometerSun,
  Copy,
  Check,
  Camera,
  Eye,
  LayoutGrid,
  List,
  Armchair,
  Plane,
  Train
} from 'lucide-react';
import { Itinerary, Activity, DayPlan, PackingItem } from '../types';
import { formatCurrency, convertAmount } from '../lib/currency';
import { getPlacePhoto, getDayBannerPhoto } from '../lib/placeImages';
import { PhotoLightboxModal } from './PhotoLightboxModal';
import { VisualGalleryTab } from './VisualGalleryTab';
import { SeatSelectorModal, SeatInfo } from './SeatSelectorModal';

interface ItineraryViewProps {
  itinerary: Itinerary;
  currentCurrency: string;
  onBackToPlanner: () => void;
  onSaveTrip: (trip: Itinerary) => void;
  isSaved: boolean;
  onOpenConcierge: () => void;
  onOpenPromptLab: () => void;
  onOpenExport: () => void;
  onSwapActivityRequest: (act: Activity, dayTheme: string) => void;
  onUpdateItinerary: (updated: Itinerary) => void;
}

export const ItineraryView: React.FC<ItineraryViewProps> = ({
  itinerary,
  currentCurrency,
  onBackToPlanner,
  onSaveTrip,
  isSaved,
  onOpenConcierge,
  onOpenPromptLab,
  onOpenExport,
  onSwapActivityRequest,
  onUpdateItinerary,
}) => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'gallery' | 'map' | 'budget' | 'packing' | 'guide' | 'prompt'>('timeline');
  const [selectedDayNumber, setSelectedDayNumber] = useState<number | 'all'>('all');
  const [viewMode, setViewMode] = useState<'detailed' | 'compact'>('detailed');
  const [lightboxActivity, setLightboxActivity] = useState<{ activity: Activity; dayNumber?: number } | null>(null);
  const [isSeatModalOpen, setIsSeatModalOpen] = useState(false);
  const [newPackingItemText, setNewPackingItemText] = useState('');
  const [newPackingCategory, setNewPackingCategory] = useState<PackingItem['category']>('Essentials & Docs');
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Handle Transit Seat update
  const handleSeatChange = (seat: SeatInfo) => {
    onUpdateItinerary({
      ...itinerary,
      preferences: {
        ...itinerary.preferences,
        selectedSeatCode: seat.code,
        seatPreference: seat.type,
      },
    });
  };

  // Toggle activity completion
  const handleToggleActivity = (dayIndex: number, actId: string) => {
    const updatedDays = itinerary.days.map((day, dIdx) => {
      if (dIdx !== dayIndex) return day;
      return {
        ...day,
        activities: day.activities.map((act) => {
          if (act.id !== actId) return act;
          return { ...act, completed: !act.completed };
        }),
      };
    });
    onUpdateItinerary({ ...itinerary, days: updatedDays });
  };

  // Toggle packing item
  const handleTogglePacking = (itemId: string) => {
    const updatedList = itinerary.packingList.map((p) => {
      if (p.id !== itemId) return p;
      return { ...p, packed: !p.packed };
    });
    onUpdateItinerary({ ...itinerary, packingList: updatedList });
  };

  // Add custom packing item
  const handleAddPackingItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPackingItemText.trim()) return;

    const newItem: PackingItem = {
      id: `custom-pack-${Date.now()}`,
      item: newPackingItemText.trim(),
      category: newPackingCategory,
      packed: false,
    };

    onUpdateItinerary({
      ...itinerary,
      packingList: [...itinerary.packingList, newItem],
    });
    setNewPackingItemText('');
  };

  // Delete packing item
  const handleDeletePackingItem = (itemId: string) => {
    onUpdateItinerary({
      ...itinerary,
      packingList: itinerary.packingList.filter((p) => p.id !== itemId),
    });
  };

  // Audio phrase pronunciation using browser TTS
  const handleSpeakPhrase = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const copyPromptText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const completedActivitiesCount = itinerary.days.reduce(
    (acc, day) => acc + day.activities.filter((a) => a.completed).length,
    0
  );
  const totalActivitiesCount = itinerary.days.reduce((acc, day) => acc + day.activities.length, 0);
  const packedCount = itinerary.packingList.filter((p) => p.packed).length;

  const filteredDays = selectedDayNumber === 'all' 
    ? itinerary.days 
    : itinerary.days.filter((d) => d.dayNumber === selectedDayNumber);

  return (
    <div id="itinerary-view-container" className="w-full max-w-6xl mx-auto space-y-6 pb-24">
      {/* Top Breadcrumb & Quick Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <button
          id="back-to-planner-btn"
          onClick={onBackToPlanner}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-teal-700 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Edit Preferences</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            id="itinerary-save-btn"
            onClick={() => onSaveTrip(itinerary)}
            className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl border transition-all cursor-pointer ${
              isSaved
                ? 'bg-teal-50 text-teal-700 border-teal-300 shadow-2xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-teal-600 text-teal-600' : 'text-slate-400'}`} />
            <span>{isSaved ? 'Saved in Library' : 'Save Trip'}</span>
          </button>

          <button
            id="itinerary-export-btn"
            onClick={onOpenExport}
            className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export / Print</span>
          </button>

          <button
            id="itinerary-concierge-btn"
            onClick={onOpenConcierge}
            className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white shadow-sm shadow-teal-600/20 transition-all cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>AI Concierge</span>
          </button>
        </div>
      </div>

      {/* Hero Header Card */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-900 text-white">
        <div className="absolute inset-0">
          <img
            src={itinerary.heroImageUrl}
            alt={itinerary.destination}
            className="w-full h-full object-cover opacity-35 filter brightness-90"
            onError={(e) => {
              // fallback if remote image fails
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900/40" />
        </div>

        <div className="relative z-10 p-6 sm:p-10 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-500/25 border border-teal-400/40 text-teal-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              <span>AI Trip Plan</span>
            </span>

            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-white text-xs font-semibold border border-white/15">
              {itinerary.destination}, {itinerary.country}
            </span>

            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-white text-xs font-semibold border border-white/15">
              {itinerary.days.length} Days &middot; {itinerary.preferences?.pace || 'Balanced'} Pace
            </span>

            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-white text-xs font-semibold border border-white/15">
              {itinerary.preferences?.groupType || 'Travelers'}
            </span>

            {/* Confirmed Seat Badge & Interactive Selector */}
            <button
              onClick={() => setIsSeatModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/25 hover:bg-teal-500/40 backdrop-blur-xs text-teal-200 hover:text-white text-xs font-bold border border-teal-400/40 transition-all cursor-pointer shadow-xs"
              title="Click to change flight / train seat"
            >
              <Armchair className="w-3.5 h-3.5 text-teal-300" />
              <span>Seat {itinerary.preferences?.selectedSeatCode || '12A'}</span>
              <span className="text-[10px] text-teal-300 font-normal capitalize">
                ({(itinerary.preferences?.seatPreference || 'window').replace('-', ' ')})
              </span>
              <span className="text-[10px] bg-teal-400/30 px-1.5 py-0.2 rounded text-white ml-0.5">
                Change &rarr;
              </span>
            </button>
          </div>

          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-white leading-tight">
              {itinerary.title}
            </h1>
            <p className="text-base sm:text-lg text-teal-200/90 font-medium mt-1.5 max-w-3xl">
              {itinerary.tagline}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 max-w-4xl leading-relaxed">
            {itinerary.summary}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <span className="text-[11px] text-slate-300 font-semibold block">Total Estimated Cost</span>
              <span className="text-xl font-extrabold text-teal-300 font-display">
                {formatCurrency(itinerary.totalEstimatedCost, currentCurrency, itinerary.currency)}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                ~{formatCurrency(Math.round(itinerary.totalEstimatedCost / itinerary.days.length), currentCurrency, itinerary.currency)}/day
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <span className="text-[11px] text-slate-300 font-semibold block">Activity Progress</span>
              <span className="text-xl font-extrabold text-white font-display">
                {completedActivitiesCount} / {totalActivitiesCount}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                {totalActivitiesCount > 0 ? Math.round((completedActivitiesCount / totalActivitiesCount) * 100) : 0}% completed
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <span className="text-[11px] text-slate-300 font-semibold block">Safety & Climate</span>
              <span className="text-xl font-extrabold text-emerald-300 font-display">
                {itinerary.localGuide?.safetyScore || 9.5}/10
              </span>
              <span className="text-[10px] text-slate-300 block mt-0.5 truncate">
                {itinerary.localGuide?.averageTemp || 'Mild'}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <span className="text-[11px] text-slate-300 font-semibold block">Prompt Engineering</span>
              <span className="text-sm font-bold text-indigo-300 block mt-1">
                Gemini 3.7 Flash
              </span>
              <button
                onClick={onOpenPromptLab}
                className="text-[10px] text-teal-300 hover:text-white underline font-semibold mt-0.5 cursor-pointer block"
              >
                Inspect CoT Metrics &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation Bar */}
      <div className="sticky top-16 z-30 bg-slate-50/95 backdrop-blur-md py-2 border-b border-slate-200">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'timeline', label: 'Daily Timeline', icon: Calendar, badge: `${itinerary.days.length} Days` },
            { id: 'gallery', label: 'Place Photos', icon: Camera, badge: 'Visual Ref' },
            { id: 'budget', label: 'Budget Analytics', icon: DollarSign },
            { id: 'packing', label: 'Packing Checklist', icon: Layers, badge: `${packedCount}/${itinerary.packingList.length}` },
            { id: 'guide', label: 'Local Culture & Guide', icon: Compass },
            { id: 'prompt', label: 'Prompt Lab & Architecture', icon: Cpu, badge: 'Tech' },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-900/15'
                    : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: DAILY TIMELINE WITH DAY-BY-DAY PICTURES & COMPACT/DETAILED VIEW */}
      {activeTab === 'timeline' && (
        <div className="space-y-6">
          {/* Day Filter Pills & View Mode Switch */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
            {/* Days selection */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
              <button
                onClick={() => setSelectedDayNumber('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedDayNumber === 'all'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Days ({itinerary.days.length})
              </button>
              {itinerary.days.map((day) => (
                <button
                  key={day.dayNumber}
                  onClick={() => setSelectedDayNumber(day.dayNumber)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedDayNumber === day.dayNumber
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Day {day.dayNumber}
                </button>
              ))}
            </div>

            {/* View Mode Switch (Less Scroll vs Detailed Photos) */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0 self-end sm:self-auto">
              <button
                onClick={() => setViewMode('detailed')}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'detailed'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Rich visual photo cards"
              >
                <LayoutGrid className="w-3.5 h-3.5 text-teal-600" />
                <span>Photos & Details</span>
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'compact'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Compact scannable list (less scroll)"
              >
                <List className="w-3.5 h-3.5 text-indigo-600" />
                <span>Compact List</span>
              </button>
            </div>
          </div>

          {/* Days List */}
          <div className="space-y-8">
            {filteredDays.map((day) => {
              const actualIndex = itinerary.days.findIndex((d) => d.dayNumber === day.dayNumber);
              const dayBanner =
                day.bannerImageUrl ||
                getDayBannerPhoto(itinerary.destination, day.theme, day.dayNumber);

              // Category badge styles
              const categoryColors: Record<string, string> = {
                Sightseeing: 'bg-blue-50 text-blue-700 border-blue-200',
                'Food & Drink': 'bg-amber-50 text-amber-800 border-amber-200',
                'Culture & History': 'bg-purple-50 text-purple-700 border-purple-200',
                'Adventure & Nature': 'bg-emerald-50 text-emerald-700 border-emerald-200',
                Shopping: 'bg-pink-50 text-pink-700 border-pink-200',
                Nightlife: 'bg-indigo-50 text-indigo-700 border-indigo-200',
                Relaxation: 'bg-cyan-50 text-cyan-700 border-cyan-200',
              };

              return (
                <div
                  key={day.dayNumber}
                  id={`day-section-${day.dayNumber}`}
                  className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
                >
                  {/* Visual Day Header with Photo Banner */}
                  <div className="relative overflow-hidden bg-slate-900 text-white min-h-[120px] sm:min-h-[140px] flex flex-col justify-end p-5 sm:p-6">
                    <img
                      src={dayBanner}
                      alt={day.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-45 scale-105"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-900/40" />

                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-lg bg-teal-500 text-slate-950 text-xs font-extrabold shadow-xs">
                            Day {day.dayNumber}
                          </span>
                          <h2 className="text-lg sm:text-2xl font-extrabold font-display text-white drop-shadow-md">
                            {day.title}
                          </h2>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-200 font-medium mt-1 drop-shadow-sm">
                          Theme: <span className="text-teal-300 font-semibold">{day.theme}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-3 self-start sm:self-center bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/10">
                        <div className="text-right">
                          <span className="text-[10px] uppercase font-bold text-slate-300 block">Day Cost</span>
                          <span className="text-sm sm:text-base font-extrabold text-teal-300 font-display">
                            {formatCurrency(day.estimatedDayCost, currentCurrency, itinerary.currency)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Daily Transport & Meals Highlights Card */}
                  <div className="p-4 sm:p-5 bg-teal-50/40 border-b border-teal-100/60 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {/* Transport tip */}
                    <div className="flex items-start gap-2.5">
                      <div className="p-1.5 rounded-lg bg-teal-100 text-teal-700 shrink-0 mt-0.5">
                        <Car className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-teal-950 block">Daily Transit Strategy</span>
                        <p className="text-slate-600 mt-0.5 leading-relaxed">{day.dailyTransportTip}</p>
                      </div>
                    </div>

                    {/* Meal Suggestions */}
                    <div className="flex items-start gap-2.5">
                      <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700 shrink-0 mt-0.5">
                        <Utensils className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-900 block">Curated Dining Recommendations</span>
                        {day.dailyMealRecommendations?.lunch && (
                          <p className="text-slate-600">
                            <strong className="text-slate-800">Lunch:</strong> {day.dailyMealRecommendations.lunch}
                          </p>
                        )}
                        {day.dailyMealRecommendations?.dinner && (
                          <p className="text-slate-600">
                            <strong className="text-slate-800">Dinner:</strong> {day.dailyMealRecommendations.dinner}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Activities List */}
                  <div className="p-4 sm:p-6 space-y-4">
                    {day.activities.map((activity) => {
                      const isCompleted = !!activity.completed;
                      const placePhoto =
                        activity.imageUrl ||
                        getPlacePhoto(activity.title, activity.category, itinerary.destination);

                      // Compact Mode Render (Less Scroll)
                      if (viewMode === 'compact') {
                        return (
                          <div
                            key={activity.id}
                            id={`activity-card-${activity.id}`}
                            className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                              isCompleted
                                ? 'bg-slate-50/70 border-slate-200 opacity-60'
                                : 'bg-white border-slate-200 hover:border-teal-300'
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              {/* Completion button */}
                              <button
                                onClick={() => handleToggleActivity(actualIndex, activity.id)}
                                className="text-slate-400 hover:text-teal-600 cursor-pointer shrink-0"
                              >
                                {isCompleted ? (
                                  <CheckCircle2 className="w-5 h-5 text-teal-600 fill-teal-50" />
                                ) : (
                                  <Circle className="w-5 h-5" />
                                )}
                              </button>

                              {/* Tiny thumbnail */}
                              <div
                                onClick={() =>
                                  setLightboxActivity({ activity, dayNumber: day.dayNumber })
                                }
                                className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-slate-900 relative cursor-pointer group"
                              >
                                <img
                                  src={placePhoto}
                                  alt={activity.title}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                  loading="lazy"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                              </div>

                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded">
                                    {activity.timeSlot}
                                  </span>
                                  <h4
                                    className={`text-xs sm:text-sm font-bold truncate ${
                                      isCompleted ? 'line-through text-slate-400' : 'text-slate-900'
                                    }`}
                                  >
                                    {activity.title}
                                  </h4>
                                </div>
                                <p className="text-[11px] text-slate-500 truncate flex items-center gap-1 mt-0.5">
                                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                                  <span>{activity.location}</span>
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                              <span className="text-xs font-extrabold text-slate-900 font-display">
                                {activity.estimatedCost === 0
                                  ? 'Free'
                                  : formatCurrency(activity.estimatedCost, currentCurrency, itinerary.currency)}
                              </span>
                              <button
                                onClick={() =>
                                  setLightboxActivity({ activity, dayNumber: day.dayNumber })
                                }
                                className="p-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-700 text-xs font-semibold cursor-pointer"
                                title="View place reference photo"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      }

                      // Detailed Visual Photo Card Mode
                      return (
                        <div
                          key={activity.id}
                          id={`activity-card-${activity.id}`}
                          className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                            isCompleted
                              ? 'bg-slate-50/70 border-slate-200 opacity-65'
                              : 'bg-white border-slate-200 hover:border-teal-300 hover:shadow-md shadow-2xs'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row">
                            {/* Left Side: Photo Frame for Visual Reference */}
                            <div
                              onClick={() =>
                                setLightboxActivity({ activity, dayNumber: day.dayNumber })
                              }
                              className="relative sm:w-56 h-40 sm:h-auto min-h-[140px] bg-slate-900 overflow-hidden cursor-pointer group shrink-0"
                              title="Click to view full reference photo and details"
                            >
                              <img
                                src={placePhoto}
                                alt={activity.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent sm:hidden" />

                              {/* Hover / View Badge */}
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-bold backdrop-blur-xs">
                                <Eye className="w-4 h-4 text-teal-300" />
                                <span>Preview Photo</span>
                              </div>

                              {/* Category tag on image */}
                              <div className="absolute top-2.5 left-2.5">
                                <span className="px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-bold backdrop-blur-xs">
                                  {activity.timeSlot}
                                </span>
                              </div>
                            </div>

                            {/* Right Side: Activity Details */}
                            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                              <div>
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex flex-wrap items-center gap-1.5">
                                    <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                                      {activity.timeRange}
                                    </span>

                                    <span
                                      className={`text-xs font-semibold px-2 py-0.5 rounded-md border ${
                                        categoryColors[activity.category] || 'bg-slate-100 text-slate-700'
                                      }`}
                                    >
                                      {activity.category}
                                    </span>

                                    {activity.bookingRequired && (
                                      <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                                        Booking Required
                                      </span>
                                    )}
                                  </div>

                                  {/* Cost & Duration */}
                                  <div className="text-right shrink-0">
                                    <span className="text-xs sm:text-sm font-extrabold text-slate-900 font-display block">
                                      {activity.estimatedCost === 0
                                        ? 'Free'
                                        : formatCurrency(activity.estimatedCost, currentCurrency, itinerary.currency)}
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-medium flex items-center justify-end gap-1 mt-0.5">
                                      <Clock className="w-3 h-3" />
                                      {activity.durationMinutes} mins
                                    </span>
                                  </div>
                                </div>

                                <div className="flex items-start gap-2.5 mt-2">
                                  {/* Checkbox */}
                                  <button
                                    onClick={() => handleToggleActivity(actualIndex, activity.id)}
                                    className="mt-0.5 text-slate-400 hover:text-teal-600 transition-colors cursor-pointer shrink-0"
                                    title={isCompleted ? 'Mark uncompleted' : 'Mark completed'}
                                  >
                                    {isCompleted ? (
                                      <CheckCircle2 className="w-5 h-5 text-teal-600 fill-teal-50" />
                                    ) : (
                                      <Circle className="w-5 h-5" />
                                    )}
                                  </button>

                                  <div>
                                    <h3
                                      className={`text-base sm:text-lg font-bold ${
                                        isCompleted ? 'line-through text-slate-500' : 'text-slate-900'
                                      }`}
                                    >
                                      {activity.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                                      {activity.description}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* Insider tip box */}
                              {activity.insiderTip && (
                                <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-900 text-xs flex items-start gap-2">
                                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                  <div>
                                    <strong className="font-bold text-amber-950">Insider Tip:</strong>{' '}
                                    {activity.insiderTip}
                                  </div>
                                </div>
                              )}

                              {/* Footer with map link and AI Swap */}
                              <div className="pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                                <a
                                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                    `${activity.title}, ${activity.location}, ${itinerary.destination}`
                                  )}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-slate-500 hover:text-teal-700 font-medium transition-colors"
                                >
                                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                  <span className="truncate max-w-xs">{activity.location}</span>
                                  <ExternalLink className="w-3 h-3 text-slate-400" />
                                </a>

                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() =>
                                      setLightboxActivity({ activity, dayNumber: day.dayNumber })
                                    }
                                    className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 font-semibold bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                                  >
                                    <Camera className="w-3 h-3 text-slate-500" />
                                    <span>View Photo</span>
                                  </button>

                                  <button
                                    onClick={() => onSwapActivityRequest(activity, day.theme)}
                                    className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-semibold bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                                    title="Replace this activity with another AI suggested idea"
                                  >
                                    <RefreshCw className="w-3 h-3" />
                                    <span>Swap with AI Idea</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB: VISUAL GALLERY OF ALL LANDMARK PHOTOS */}
      {activeTab === 'gallery' && (
        <VisualGalleryTab
          itinerary={itinerary}
          currentCurrency={currentCurrency}
          onSelectActivity={(act, dNum) => {
            setLightboxActivity({ activity: act, dayNumber: dNum });
          }}
        />
      )}

      {/* TAB 2: BUDGET ANALYTICS */}
      {activeTab === 'budget' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
                  Comprehensive Trip Budget Breakdown
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Itemized estimation based on {itinerary.preferences?.budgetTier || 'moderate'} tier for {itinerary.preferences?.groupType || 'couple'} in {itinerary.destination}.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-right">
                <span className="text-xs font-bold text-teal-800 block">Total Estimated Cost</span>
                <span className="text-2xl font-extrabold text-teal-700 font-display">
                  {formatCurrency(itinerary.totalEstimatedCost, currentCurrency, itinerary.currency)}
                </span>
                <span className="text-[11px] text-slate-500 block">
                  ~{formatCurrency(Math.round(itinerary.totalEstimatedCost / itinerary.days.length), currentCurrency, itinerary.currency)} / day
                </span>
              </div>
            </div>

            {/* Category Progress Bars */}
            <div className="space-y-4 pt-2">
              {itinerary.budgetBreakdown.map((cat, idx) => {
                const colors = [
                  'bg-teal-500',
                  'bg-amber-500',
                  'bg-indigo-500',
                  'bg-blue-500',
                  'bg-rose-500',
                ];
                const barColor = colors[idx % colors.length];

                return (
                  <div key={cat.category} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-bold text-slate-900">{cat.category}</span>
                        <span className="text-xs text-slate-500 ml-2 font-medium">({cat.percentage}%)</span>
                      </div>
                      <span className="text-sm font-extrabold text-slate-800 font-display">
                        {formatCurrency(cat.amount, currentCurrency, itinerary.currency)}
                      </span>
                    </div>

                    <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-full ${barColor} rounded-full transition-all duration-500`}
                        style={{ width: `${Math.min(cat.percentage, 100)}%` }}
                      />
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed">
                      {cat.notes}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Smart Cost Optimization Recommendations */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-teal-900 to-slate-900 text-white space-y-3">
              <div className="flex items-center gap-2 text-teal-300">
                <TrendingDown className="w-5 h-5" />
                <h3 className="text-base font-bold font-display">
                  TripGenie AI Cost-Saving Recommendations
                </h3>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                <li>
                  <strong>Transit Passes:</strong> Consider purchasing an unlimited multi-day transit pass on day 1 to save 30-40% over single-ride fares.
                </li>
                <li>
                  <strong>Lunch Sets:</strong> High-end restaurants in {itinerary.destination} frequently offer midday lunch sets with the same menu quality at half the evening dinner prices.
                </li>
                <li>
                  <strong>Off-Peak Entry:</strong> Pre-booking online for museums and observation decks often includes a 5-10% advance ticket discount.
                </li>
                <li>
                  <strong>Street Food Quarters:</strong> Alternate sit-down dinners with vibrant local night markets for authentic flavors at a fraction of the cost.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PACKING CHECKLIST */}
      {activeTab === 'packing' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
                  Smart AI Packing Checklist
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Personalized packing suggestions curated for {itinerary.destination}&apos;s climate and activities.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-700 block">
                    {packedCount} of {itinerary.packingList.length} Packed
                  </span>
                  <span className="text-[11px] text-teal-600 font-bold">
                    {itinerary.packingList.length > 0
                      ? Math.round((packedCount / itinerary.packingList.length) * 100)
                      : 0}% Ready
                  </span>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
              <div
                className="h-full bg-teal-500 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    itinerary.packingList.length > 0
                      ? (packedCount / itinerary.packingList.length) * 100
                      : 0
                  }%`,
                }}
              />
            </div>

            {/* Add Custom Item Form */}
            <form onSubmit={handleAddPackingItem} className="flex flex-wrap items-center gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <input
                type="text"
                value={newPackingItemText}
                onChange={(e) => setNewPackingItemText(e.target.value)}
                placeholder="Add custom packing item (e.g. Hiking boots, Kindle, Sunglasses)..."
                className="flex-1 min-w-[200px] px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none focus:border-teal-500 font-medium"
              />
              <select
                value={newPackingCategory}
                onChange={(e) => setNewPackingCategory(e.target.value as any)}
                className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none font-medium text-slate-700"
              >
                <option value="Essentials & Docs">Essentials & Docs</option>
                <option value="Clothing & Footwear">Clothing & Footwear</option>
                <option value="Electronics & Tech">Electronics & Tech</option>
                <option value="Toiletries & Health">Toiletries & Health</option>
                <option value="Destination Specific">Destination Specific</option>
              </select>
              <button
                type="submit"
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item</span>
              </button>
            </form>

            {/* Grouped Packing List */}
            {['Essentials & Docs', 'Clothing & Footwear', 'Electronics & Tech', 'Toiletries & Health', 'Destination Specific'].map(
              (category) => {
                const itemsInCategory = itinerary.packingList.filter((p) => p.category === category);
                if (itemsInCategory.length === 0) return null;

                return (
                  <div key={category} className="space-y-3 pt-2">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-teal-500" />
                      <span>{category}</span>
                      <span className="text-xs text-slate-400 font-normal">
                        ({itemsInCategory.filter((i) => i.packed).length}/{itemsInCategory.length})
                      </span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {itemsInCategory.map((item) => (
                        <div
                          key={item.id}
                          className={`p-3 rounded-xl border flex items-start justify-between gap-2 transition-all ${
                            item.packed
                              ? 'bg-slate-50 border-slate-200 opacity-60'
                              : 'bg-white border-slate-200 hover:border-teal-300'
                          }`}
                        >
                          <label className="flex items-start gap-2.5 cursor-pointer flex-1">
                            <input
                              type="checkbox"
                              checked={item.packed}
                              onChange={() => handleTogglePacking(item.id)}
                              className="mt-0.5 accent-teal-600 w-4 h-4 rounded cursor-pointer"
                            />
                            <div>
                              <span className={`text-xs font-semibold block ${item.packed ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                                {item.item}
                              </span>
                              {item.reason && (
                                <span className="text-[11px] text-slate-400 block mt-0.5">
                                  {item.reason}
                                </span>
                              )}
                            </div>
                          </label>

                          <button
                            onClick={() => handleDeletePackingItem(item.id)}
                            className="text-slate-300 hover:text-rose-500 p-1 transition-colors cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      )}

      {/* TAB 4: LOCAL CULTURE & GUIDE */}
      {activeTab === 'guide' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
                Destination Guide & Cultural Etiquette: {itinerary.destination}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Essential local customs, climate summary, emergency numbers, and key phrasebook.
              </p>
            </div>

            {/* Climate & Seasonality */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200/80 space-y-1">
                <span className="text-xs font-bold text-teal-900 flex items-center gap-1.5">
                  <ThermometerSun className="w-4 h-4 text-teal-600" />
                  <span>Best Season to Visit</span>
                </span>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {itinerary.localGuide?.bestSeason || 'Spring & Autumn'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200/80 space-y-1">
                <span className="text-xs font-bold text-sky-900 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-sky-600" />
                  <span>Weather & Temperature</span>
                </span>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {itinerary.localGuide?.weatherSummary} (Avg: {itinerary.localGuide?.averageTemp})
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-1">
                <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Safety Rating</span>
                </span>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {itinerary.localGuide?.safetyScore}/10 &middot; {itinerary.localGuide?.safetyTips?.[0] || 'Safe destination for travelers.'}
                </p>
              </div>
            </div>

            {/* Cultural Dos & Don'ts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-3">
                <h3 className="text-sm font-bold text-emerald-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>Cultural Dos (Best Practices)</span>
                </h3>
                <ul className="space-y-2">
                  {itinerary.localGuide?.culturalEtiquette?.dos?.map((item, idx) => (
                    <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-3">
                <h3 className="text-sm font-bold text-rose-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span>Cultural Don&apos;ts (Mistakes to Avoid)</span>
                </h3>
                <ul className="space-y-2">
                  {itinerary.localGuide?.culturalEtiquette?.donts?.map((item, idx) => (
                    <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Key Phrases with TTS */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-teal-600" />
                  <span>Essential Local Phrases & Audio Pronunciation</span>
                </h3>
                <span className="text-xs text-slate-400 font-normal">Tap speaker icon to listen</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {itinerary.localGuide?.keyPhrases?.map((phrase, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm font-bold text-teal-900">{phrase.phrase}</span>
                      <button
                        onClick={() => handleSpeakPhrase(phrase.phrase)}
                        className="p-1 rounded-lg bg-teal-100 hover:bg-teal-200 text-teal-700 transition-colors cursor-pointer shrink-0"
                        title="Pronounce phrase"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-600 font-medium">
                      <strong>Meaning:</strong> {phrase.translation}
                    </p>
                    <p className="text-[11px] text-slate-500 italic">
                      Pronounced: &ldquo;{phrase.pronunciation}&rdquo;
                    </p>
                    <span className="text-[10px] text-teal-700 font-semibold bg-teal-50 px-2 py-0.5 rounded block w-fit">
                      {phrase.context}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Local Dishes */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Utensils className="w-4 h-4 text-amber-600" />
                <span>Must-Try Local Culinary Specialties</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {itinerary.localGuide?.topLocalFoods?.map((food, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200/80 space-y-1">
                    <span className="text-sm font-bold text-amber-950 block">{food.name}</span>
                    <p className="text-xs text-slate-600 leading-relaxed">{food.description}</p>
                    {food.mustTryPlace && (
                      <span className="text-[11px] text-amber-800 font-semibold block pt-1">
                        📍 Recommended spot: {food.mustTryPlace}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Transit & Seating Confirmation Card */}
            <div className="p-5 rounded-3xl bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-teal-800/40 shadow-lg">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center shrink-0 text-teal-300">
                  <Armchair className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
                      Transit & Seating Assignment
                    </span>
                    <span className="bg-teal-500/30 text-white text-[10px] px-2 py-0.5 rounded-full font-extrabold border border-teal-300/30">
                      Seat {itinerary.preferences?.selectedSeatCode || '12A'}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-0.5">
                    {itinerary.preferences?.transportPreference || 'Flight & Rail Transit'} &middot; {(itinerary.preferences?.seatPreference || 'window').replace('-', ' ')} preference
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Optimized for optimal views and comfort during travel to {itinerary.destination}.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsSeatModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-extrabold shadow-sm transition-all cursor-pointer inline-flex items-center justify-center gap-2 shrink-0"
              >
                <Plane className="w-4 h-4" />
                <span>Select / Change Seat</span>
              </button>
            </div>

            {/* Emergency Contacts */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4 text-xs">
              <div>
                <span className="font-bold text-teal-300 block">Emergency Services Directory</span>
                <span className="text-slate-400">Keep these numbers saved on your phone during your visit.</span>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-slate-400 block text-[10px]">Police:</span>
                  <strong className="text-white text-sm">{itinerary.localGuide?.emergencyNumbers?.police || '112'}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Ambulance:</span>
                  <strong className="text-white text-sm">{itinerary.localGuide?.emergencyNumbers?.ambulance || '112'}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">General / Tourist Line:</span>
                  <strong className="text-white text-sm">{itinerary.localGuide?.emergencyNumbers?.general || '112'}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: PROMPT ENGINEERING LAB & ACADEMIC VIEW */}
      {activeTab === 'prompt' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-indigo-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200 mb-2">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>College Academic Mini-Project Inspector</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
                  AI Architecture & Prompt Engineering Pipeline
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Technical audit of the LLM pipeline, system framing, JSON schema constraints, and CoT reasoning.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyPromptText(JSON.stringify(itinerary, null, 2))}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl transition-colors cursor-pointer"
                >
                  {copiedPrompt ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedPrompt ? 'Copied JSON AST' : 'Copy Full JSON Output'}</span>
                </button>
              </div>
            </div>

            {/* Performance & Execution Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100">
                <span className="text-[11px] text-slate-500 font-semibold block">Model Alias</span>
                <span className="text-sm font-extrabold text-indigo-900 font-display">
                  {itinerary.promptMetrics?.model || 'gemini-3.7-flash'}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Google GenAI SDK v2.4</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100">
                <span className="text-[11px] text-slate-500 font-semibold block">Latency</span>
                <span className="text-sm font-extrabold text-indigo-900 font-display">
                  {itinerary.promptMetrics?.generationLatencyMs || 1280} ms
                </span>
                <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">Fast Response</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100">
                <span className="text-[11px] text-slate-500 font-semibold block">Token Output Est.</span>
                <span className="text-sm font-extrabold text-indigo-900 font-display">
                  ~{itinerary.promptMetrics?.responseTokensEstimate || 2400} tokens
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Strict JSON Schema</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100">
                <span className="text-[11px] text-slate-500 font-semibold block">Temperature</span>
                <span className="text-sm font-extrabold text-indigo-900 font-display">
                  {itinerary.promptMetrics?.temperature ?? 0.7}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Controlled Sampling</span>
              </div>
            </div>

            {/* Prompt Engineering Techniques Breakdown */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Implemented Prompt Engineering Methodologies
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="font-bold text-indigo-900 block">1. Role-Based System Framing</strong>
                  <p className="text-slate-600 leading-relaxed">
                    Instructing the model as &ldquo;TripGenie Master Geographer &amp; Travel AI&rdquo; primes latent weights for realistic venue names, opening hour awareness, and spatial transit logic.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="font-bold text-indigo-900 block">2. Strict Type.OBJECT JSON Schema</strong>
                  <p className="text-slate-600 leading-relaxed">
                    Bypasses fragile regex parsing by forcing Gemini to output syntactically valid JSON conforming to our nested TypeScript schemas.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="font-bold text-indigo-900 block">3. Geographic &amp; Chronological CoT</strong>
                  <p className="text-slate-600 leading-relaxed">
                    Forces step-by-step spatial clustering: morning, afternoon, and evening stops are geographically bound to minimize transit dead-time.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="font-bold text-indigo-900 block">4. Dynamic Constraint Modulation</strong>
                  <p className="text-slate-600 leading-relaxed">
                    Injects budget tiers, party size, pace constraints, and dietary rules directly into the user prompt template before generation.
                  </p>
                </div>
              </div>
            </div>

            {/* Actual System Instruction & User Prompt Viewer */}
            <div className="space-y-4 pt-2">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
                  <span>System Instruction (Server-Side)</span>
                  <button
                    onClick={() => copyPromptText(itinerary.promptMetrics?.systemInstructionUsed || '')}
                    className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </button>
                </div>
                <pre className="p-3.5 bg-slate-950 text-slate-200 rounded-2xl text-[11px] font-mono whitespace-pre-wrap overflow-x-auto leading-relaxed max-h-48 border border-slate-800">
                  {itinerary.promptMetrics?.systemInstructionUsed || 'You are TripGenie Master Travel AI...'}
                </pre>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
                  <span>Interpolated User Prompt</span>
                  <button
                    onClick={() => copyPromptText(itinerary.promptMetrics?.promptUsed || '')}
                    className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </button>
                </div>
                <pre className="p-3.5 bg-slate-950 text-slate-200 rounded-2xl text-[11px] font-mono whitespace-pre-wrap overflow-x-auto leading-relaxed max-h-48 border border-slate-800">
                  {itinerary.promptMetrics?.promptUsed || 'Generate a structured travel itinerary...'}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Place Photo Lightbox Modal */}
      <PhotoLightboxModal
        isOpen={!!lightboxActivity}
        activity={lightboxActivity?.activity || null}
        dayNumber={lightboxActivity?.dayNumber}
        itinerary={itinerary}
        currentCurrency={currentCurrency}
        onClose={() => setLightboxActivity(null)}
      />

      {/* Transit & Cabin Seat Selector Modal */}
      <SeatSelectorModal
        isOpen={isSeatModalOpen}
        currentSeatCode={itinerary.preferences?.selectedSeatCode || '12A'}
        currentPreference={itinerary.preferences?.seatPreference || 'window'}
        destination={itinerary.destination}
        onSelectSeat={handleSeatChange}
        onClose={() => setIsSeatModalOpen(false)}
      />
    </div>
  );
};
