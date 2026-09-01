import React from 'react';
import { 
  Sparkles, 
  Compass, 
  Bookmark, 
  Cpu, 
  PlusCircle, 
  MapPin, 
  Coins, 
  HelpCircle,
  Menu,
  X
} from 'lucide-react';
import { CURRENCIES } from '../data/sampleDestinations';

interface NavbarProps {
  currentCurrency: string;
  onCurrencyChange: (curr: string) => void;
  onOpenNewTrip: () => void;
  onOpenSavedTrips: () => void;
  onOpenExplore: () => void;
  savedTripsCount: number;
  hasActiveTrip: boolean;
  onLoadDemo: (demoId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCurrency,
  onCurrencyChange,
  onOpenNewTrip,
  onOpenSavedTrips,
  onOpenExplore,
  savedTripsCount,
  hasActiveTrip,
  onLoadDemo,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header id="app-navbar" className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button 
              id="brand-logo-btn"
              onClick={onOpenNewTrip}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 via-teal-500 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform duration-200">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-extrabold text-xl tracking-tight text-slate-900">
                    Trip<span className="text-teal-600">Genie</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                    AI Planner
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                  Academic AI & Prompt Engineering Project
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Actions */}
          <div className="hidden md:flex items-center gap-2.5">
            <button
              id="nav-explore-btn"
              onClick={onOpenExplore}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-700 hover:text-teal-700 hover:bg-teal-50/70 rounded-lg transition-colors cursor-pointer"
            >
              <Compass className="w-4 h-4 text-teal-600" />
              <span>Explore</span>
            </button>

            <button
              id="nav-saved-trips-btn"
              onClick={onOpenSavedTrips}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer relative"
            >
              <Bookmark className="w-4 h-4 text-slate-500" />
              <span>Saved Trips</span>
              {savedTripsCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-white bg-teal-600 rounded-full">
                  {savedTripsCount}
                </span>
              )}
            </button>

            {/* Currency Selector */}
            <div className="flex items-center gap-1 bg-slate-100/90 rounded-lg px-2 py-1 border border-slate-200">
              <Coins className="w-3.5 h-3.5 text-slate-500" />
              <select
                id="currency-selector"
                value={currentCurrency}
                onChange={(e) => onCurrencyChange(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-700 outline-none cursor-pointer pr-1"
                aria-label="Select Currency"
              >
                {CURRENCIES.map((curr) => (
                  <option key={curr.code} value={curr.code}>
                    {curr.code} ({curr.symbol})
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Demo Itinerary trigger */}
            <button
              id="nav-quick-demo-btn"
              onClick={() => onLoadDemo('tokyo')}
              className="text-xs font-medium text-slate-500 hover:text-slate-900 underline px-1 cursor-pointer"
              title="Load full pre-built sample itinerary"
            >
              Sample Trip
            </button>

            {/* New Trip CTA */}
            <button
              id="nav-new-trip-btn"
              onClick={onOpenNewTrip}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Plan Trip</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              id="mobile-new-trip-btn"
              onClick={onOpenNewTrip}
              className="p-2 text-white bg-teal-600 rounded-lg"
              title="New Trip"
            >
              <PlusCircle className="w-5 h-5" />
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-slate-200 space-y-2">
            <button
              onClick={() => {
                onOpenExplore();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 text-slate-800 text-sm font-semibold"
            >
              <Compass className="w-4 h-4 text-teal-600" />
              <span>Explore Destinations</span>
            </button>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
              <button
                onClick={() => {
                  onOpenSavedTrips();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-slate-800 text-sm font-semibold"
              >
                <Bookmark className="w-4 h-4 text-slate-500" />
                <span>Saved Trips ({savedTripsCount})</span>
              </button>

              <div className="flex items-center gap-1 bg-white rounded px-2 py-1 border border-slate-200">
                <span className="text-xs text-slate-500">Currency:</span>
                <select
                  value={currentCurrency}
                  onChange={(e) => onCurrencyChange(e.target.value)}
                  className="bg-transparent text-xs font-bold text-slate-700 outline-none"
                >
                  {CURRENCIES.map((curr) => (
                    <option key={curr.code} value={curr.code}>
                      {curr.code}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={() => {
                onLoadDemo('tokyo');
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2 text-xs font-medium text-teal-700 bg-teal-50/50 rounded-lg"
            >
              🚀 Load Tokyo Sample Itinerary
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
