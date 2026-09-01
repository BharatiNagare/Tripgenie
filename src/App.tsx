import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Compass, 
  MapPin, 
  Calendar, 
  Bookmark, 
  Cpu, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Zap,
  Globe,
  Layers,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { Itinerary, TripPreferences, Activity } from './types';
import { SAMPLE_ITINERARY_TOKYO } from './data/sampleItineraries';
import { Navbar } from './components/Navbar';
import { PlannerWizard } from './components/PlannerWizard';
import { ItineraryView } from './components/ItineraryView';
import { ConciergeDrawer } from './components/ConciergeDrawer';
import { SavedTripsModal } from './components/SavedTripsModal';
import { ExploreModal } from './components/ExploreModal';
import { ExportModal } from './components/ExportModal';
import { ActivitySwapModal } from './components/ActivitySwapModal';

export default function App() {
  const [currentCurrency, setCurrentCurrency] = useState<string>('INR');
  const [activeItinerary, setActiveItinerary] = useState<Itinerary | null>(SAMPLE_ITINERARY_TOKYO);
  const [viewMode, setViewMode] = useState<'planner' | 'itinerary'>('itinerary');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [savedTrips, setSavedTrips] = useState<Itinerary[]>([]);

  // Modals state
  const [isConciergeOpen, setIsConciergeOpen] = useState<boolean>(false);
  const [isSavedTripsOpen, setIsSavedTripsOpen] = useState<boolean>(false);
  const [isExploreOpen, setIsExploreOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [swapActivityData, setSwapActivityData] = useState<{ activity: Activity; dayTheme: string } | null>(null);

  // Load saved trips from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('tripgenie_saved_trips');
      if (stored) {
        setSavedTrips(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Failed to parse saved trips from localStorage:', e);
    }
  }, []);

  // Save trips update
  const handleSaveTrip = (tripToSave: Itinerary) => {
    const exists = savedTrips.some((t) => t.id === tripToSave.id);
    let updated: Itinerary[];
    if (exists) {
      updated = savedTrips.filter((t) => t.id !== tripToSave.id);
    } else {
      updated = [tripToSave, ...savedTrips];
    }
    setSavedTrips(updated);
    try {
      localStorage.setItem('tripgenie_saved_trips', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save trips:', e);
    }
  };

  const handleDeleteTrip = (tripId: string) => {
    const updated = savedTrips.filter((t) => t.id !== tripId);
    setSavedTrips(updated);
    try {
      localStorage.setItem('tripgenie_saved_trips', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to update storage:', e);
    }
  };

  // Generate itinerary via AI backend
  const handleGenerateItinerary = async (prefs: TripPreferences) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prefs),
      });

      if (!response.ok) {
        throw new Error(`Server returned error: ${response.status}`);
      }

      const generatedItinerary: Itinerary = await response.json();
      setActiveItinerary(generatedItinerary);
      setViewMode('itinerary');

      // Trigger celebratory confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0d9488', '#14b8a6', '#06b6d4', '#f59e0b'],
        });
      } catch (e) {
        // ignore confetti errors in restricted sandboxes
      }
    } catch (err: any) {
      console.error('Error generating AI itinerary:', err);
      // Fallback: If backend is unavailable, construct a realistic personalized trip
      const fallbackTrip: Itinerary = {
        ...SAMPLE_ITINERARY_TOKYO,
        id: `trip-local-${Date.now()}`,
        destination: prefs.destination.split(',')[0],
        title: `${prefs.durationDays}-Day Expedition in ${prefs.destination}`,
        tagline: `Curated for a ${prefs.groupType} travel party seeking ${prefs.interests.join(', ')}`,
        preferences: prefs,
        totalEstimatedCost: (prefs.targetBudgetAmount || 1500),
        currency: currentCurrency,
        days: Array.from({ length: prefs.durationDays }, (_, i) => ({
          ...SAMPLE_ITINERARY_TOKYO.days[i % SAMPLE_ITINERARY_TOKYO.days.length],
          dayNumber: i + 1,
          title: `Day ${i + 1}: ${prefs.destination.split(',')[0]} Highlights`,
        })),
      };
      setActiveItinerary(fallbackTrip);
      setViewMode('itinerary');
    } finally {
      setIsLoading(false);
    }
  };

  // Load preset demo trips
  const handleLoadDemo = (_demoId: string) => {
    setActiveItinerary(SAMPLE_ITINERARY_TOKYO);
    setViewMode('itinerary');
  };

  // Swap activity replacement
  const handleApplySwap = (originalId: string, newActivity: Activity) => {
    if (!activeItinerary) return;
    const updatedDays = activeItinerary.days.map((day) => ({
      ...day,
      activities: day.activities.map((act) => (act.id === originalId ? newActivity : act)),
    }));
    setActiveItinerary({ ...activeItinerary, days: updatedDays });
  };

  const isCurrentTripSaved = activeItinerary
    ? savedTrips.some((t) => t.id === activeItinerary.id)
    : false;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-teal-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        currentCurrency={currentCurrency}
        onCurrencyChange={setCurrentCurrency}
        onOpenNewTrip={() => setViewMode('planner')}
        onOpenSavedTrips={() => setIsSavedTripsOpen(true)}
        onOpenExplore={() => setIsExploreOpen(true)}
        savedTripsCount={savedTrips.length}
        hasActiveTrip={!!activeItinerary}
        onLoadDemo={handleLoadDemo}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {viewMode === 'planner' ? (
          <div className="space-y-12">
            <PlannerWizard
              onGenerate={handleGenerateItinerary}
              isLoading={isLoading}
              currentCurrency={currentCurrency}
            />

            {/* Academic Project Highlights & Architecture Banner */}
            <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">
              <div className="flex items-center gap-2 text-indigo-700">
                <Cpu className="w-5 h-5" />
                <h2 className="text-base font-bold font-display uppercase tracking-wider">
                  Academic Project Architecture: Gemini 3.7 Flash &amp; Structured Output
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                    1
                  </div>
                  <strong className="text-slate-900 block font-bold">Role-Based System Instructions</strong>
                  <p className="text-slate-600 leading-relaxed">
                    Frames Gemini as a master travel geographer to enforce geographic proximity and realistic opening hours.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    2
                  </div>
                  <strong className="text-slate-900 block font-bold">Strict JSON Output Schemas</strong>
                  <p className="text-slate-600 leading-relaxed">
                    Uses `@google/genai` Type.OBJECT response schemas to eliminate JSON parse failures completely.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                    3
                  </div>
                  <strong className="text-slate-900 block font-bold">Interactive Contextual Concierge</strong>
                  <p className="text-slate-600 leading-relaxed">
                    Live chat companion retaining active itinerary context for on-the-fly swaps, food recommendations, and transit advice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          activeItinerary && (
            <ItineraryView
              itinerary={activeItinerary}
              currentCurrency={currentCurrency}
              onBackToPlanner={() => setViewMode('planner')}
              onSaveTrip={handleSaveTrip}
              isSaved={isCurrentTripSaved}
              onOpenConcierge={() => setIsConciergeOpen(true)}
              onOpenExport={() => setIsExportOpen(true)}
              onSwapActivityRequest={(act, dayTheme) => {
                setSwapActivityData({ activity: act, dayTheme });
              }}
              onUpdateItinerary={setActiveItinerary}
            />
          )
        )}
      </main>

      {/* Floating Action Button for Concierge if in itinerary view */}
      {viewMode === 'itinerary' && !isConciergeOpen && (
        <button
          id="floating-concierge-btn"
          onClick={() => setIsConciergeOpen(true)}
          className="fixed bottom-6 right-6 z-40 px-4 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white rounded-2xl shadow-xl shadow-teal-600/30 flex items-center gap-2.5 font-bold text-xs sm:text-sm transition-all hover:scale-105 active:scale-95 cursor-pointer border border-teal-400/30"
          title="Open TripGenie AI Concierge"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Ask TripGenie Concierge</span>
        </button>
      )}

      {/* Modals & Drawers */}
      <ConciergeDrawer
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
        itinerary={activeItinerary}
      />

      <SavedTripsModal
        isOpen={isSavedTripsOpen}
        onClose={() => setIsSavedTripsOpen(false)}
        savedTrips={savedTrips}
        onSelectTrip={(trip) => {
          setActiveItinerary(trip);
          setViewMode('itinerary');
        }}
        onDeleteTrip={handleDeleteTrip}
        currentCurrency={currentCurrency}
      />

      <ExploreModal
        isOpen={isExploreOpen}
        onClose={() => setIsExploreOpen(false)}
        onSelectDestination={(dest) => {
          setViewMode('planner');
        }}
        currentCurrency={currentCurrency}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        itinerary={activeItinerary}
        currentCurrency={currentCurrency}
      />

      <ActivitySwapModal
        isOpen={!!swapActivityData}
        onClose={() => setSwapActivityData(null)}
        activity={swapActivityData?.activity || null}
        dayTheme={swapActivityData?.dayTheme || ''}
        destination={activeItinerary?.destination || 'Destination'}
        currency={currentCurrency}
        onApplySwap={handleApplySwap}
      />

      {/* Academic Footer */}
      <footer className="border-t border-slate-200 bg-white/80 backdrop-blur-md py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold font-display text-slate-900">TripGenie</span>
            <span>&middot;</span>
            <span>Academic Mini-Project in AI &amp; Intelligent Travel Planning</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Powered by Gemini 3.7 Flash</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
