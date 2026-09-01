import React, { useState, useMemo } from 'react';
import { 
  X, 
  Compass, 
  Sparkles, 
  ArrowRight, 
  DollarSign, 
  Calendar, 
  MapPin, 
  Star, 
  Clock, 
  Plane, 
  Eye, 
  Filter, 
  SlidersHorizontal,
  Flame,
  Check,
  Tag,
  Info,
  ChevronRight,
  TrendingUp,
  Award,
  Layers,
  Bed,
  Utensils,
  Car,
  Ticket
} from 'lucide-react';
import { DestinationInspiration, DestinationAttraction } from '../types';
import { SAMPLE_DESTINATIONS } from '../data/sampleDestinations';
import { formatCurrency, convertAmount } from '../lib/currency';

interface ExploreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDestination: (destName: string, budgetTier?: string, durationDays?: number) => void;
  currentCurrency: string;
}

export const ExploreModal: React.FC<ExploreModalProps> = ({
  isOpen,
  onClose,
  onSelectDestination,
  currentCurrency,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBudgetFilter, setSelectedBudgetFilter] = useState<'all' | 'budget' | 'moderate' | 'luxury'>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedVibe, setSelectedVibe] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'popularity' | 'price-asc' | 'price-desc' | 'rating'>('popularity');
  
  // Selected destination for deep-dive preview
  const [previewDest, setPreviewDest] = useState<DestinationInspiration | null>(null);
  const [previewActiveImageIdx, setPreviewActiveImageIdx] = useState<number>(0);

  if (!isOpen) return null;

  const regions = ['All', 'Asia', 'Europe', 'Americas', 'Middle East', 'Africa'];
  const vibes = ['All', 'Culture', 'Beach', 'Nature', 'Food', 'Adventure', 'Luxury', 'Romantic'];

  // Filter & sort destinations
  const filteredDestinations = useMemo(() => {
    return SAMPLE_DESTINATIONS.filter((dest) => {
      // Search query match
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        dest.city.toLowerCase().includes(q) ||
        dest.country.toLowerCase().includes(q) ||
        dest.tagline.toLowerCase().includes(q) ||
        dest.highlights.some(h => h.toLowerCase().includes(q)) ||
        (dest.topAttractions && dest.topAttractions.some(a => a.name.toLowerCase().includes(q)));

      if (!matchesSearch) return false;

      // Budget filter
      if (selectedBudgetFilter !== 'all' && dest.budgetTier !== selectedBudgetFilter) {
        return false;
      }

      // Region filter
      if (selectedRegion !== 'All' && dest.region !== selectedRegion) {
        return false;
      }

      // Vibe filter
      if (selectedVibe !== 'All') {
        const matchesVibe = dest.vibe.some(v => v.toLowerCase().includes(selectedVibe.toLowerCase()));
        if (!matchesVibe) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'popularity') {
        return (a.popularityRank || 99) - (b.popularityRank || 99);
      }
      if (sortBy === 'price-asc') {
        return a.avgDailyCostUSD - b.avgDailyCostUSD;
      }
      if (sortBy === 'price-desc') {
        return b.avgDailyCostUSD - a.avgDailyCostUSD;
      }
      if (sortBy === 'rating') {
        return (b.rating || 0) - (a.rating || 0);
      }
      return 0;
    });
  }, [searchQuery, selectedBudgetFilter, selectedRegion, selectedVibe, sortBy]);

  // Helper for budget label
  const getBudgetTierBadge = (tier: string) => {
    switch (tier) {
      case 'budget':
        return {
          label: '🎒 Budget-Friendly',
          color: 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold',
          tag: 'Under $70 / day'
        };
      case 'moderate':
        return {
          label: '🧳 Mid-Range / Comfort',
          color: 'bg-teal-50 text-teal-800 border-teal-300 font-bold',
          tag: '$70 - $160 / day'
        };
      case 'luxury':
        return {
          label: '💎 Luxury & Splurge',
          color: 'bg-indigo-50 text-indigo-800 border-indigo-300 font-bold',
          tag: '$160+ / day'
        };
      default:
        return {
          label: 'Standard',
          color: 'bg-slate-50 text-slate-700 border-slate-200',
          tag: ''
        };
    }
  };

  const handleSelectAndPlan = (dest: DestinationInspiration) => {
    onSelectDestination(
      `${dest.city}, ${dest.country}`,
      dest.budgetTier,
      dest.idealDurationDays || 4
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-3xl max-w-6xl w-full shadow-2xl border border-slate-200 max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* MODAL HEADER */}
        <div className="p-4 sm:p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 via-teal-50/40 to-slate-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-600/20">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold font-display text-slate-900">
                  Explore Top-Tripped Places &amp; Budgets
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[11px] font-extrabold border border-teal-300 flex items-center gap-1">
                  <Flame className="w-3 h-3 text-orange-500" />
                  <span>Most Traveled</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Curated world &amp; regional destinations with verified photo galleries, daily cost breakdowns, and sightseeing admission prices in {currentCurrency}.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
            aria-label="Close explore modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SEARCH & MULTI-TIER FILTER CONTROLS */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-white space-y-3.5 shrink-0 shadow-xs">
          {/* Search bar & Sort selector */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by city, country, landmark (e.g. Eiffel Tower, Ubud, Amber Fort, Tokyo)..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium outline-none focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all text-slate-800 placeholder:text-slate-400"
              />
              <Compass className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 whitespace-nowrap hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none cursor-pointer"
                aria-label="Sort destinations"
              >
                <option value="popularity">🔥 Most Tripped / Popular</option>
                <option value="price-asc">💰 Budget: Lowest First</option>
                <option value="price-desc">💎 Budget: Luxury First</option>
                <option value="rating">⭐ Highest Rated (4.9+)</option>
              </select>
            </div>
          </div>

          {/* Budget Tier Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-600 flex items-center gap-1 mr-1">
              <DollarSign className="w-3.5 h-3.5 text-teal-600" />
              <span>Budget Tier:</span>
            </span>

            {[
              { id: 'all', label: 'All Budgets', icon: '🌐' },
              { id: 'budget', label: '🎒 Budget-Friendly (<$70 / day)', desc: 'Affordable hostels, local food & buses' },
              { id: 'moderate', label: '🧳 Mid-Range ($70 - $160 / day)', desc: 'Comfort hotels, cafes & fast transit' },
              { id: 'luxury', label: '💎 Luxury & Splurge ($160+ / day)', desc: '4-5★ resorts, fine dining & private tours' }
            ].map((tier) => (
              <button
                key={tier.id}
                onClick={() => setSelectedBudgetFilter(tier.id as any)}
                className={`text-xs px-3 py-1.5 rounded-xl border font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedBudgetFilter === tier.id
                    ? 'bg-teal-600 text-white border-teal-600 shadow-2xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
                title={tier.desc}
              >
                <span>{tier.label}</span>
              </button>
            ))}
          </div>

          {/* Region and Travel Vibe Tags */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
            {/* Regions */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">Region:</span>
              {regions.map((reg) => (
                <button
                  key={reg}
                  onClick={() => setSelectedRegion(reg)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border font-semibold transition-all cursor-pointer ${
                    selectedRegion === reg
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {reg}
                </button>
              ))}
            </div>

            {/* Results count indicator */}
            <div className="text-xs text-slate-500 font-medium">
              Showing <strong className="text-teal-700 font-bold">{filteredDestinations.length}</strong> top destinations
            </div>
          </div>
        </div>

        {/* DESTINATIONS GRID */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50">
          {filteredDestinations.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <Compass className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-800">No destinations match your filters</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try loosening your search query, budget tier, or region filter to discover more travel places.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedBudgetFilter('all');
                  setSelectedRegion('All');
                  setSelectedVibe('All');
                }}
                className="px-4 py-2 bg-teal-50 text-teal-700 font-bold text-xs rounded-xl border border-teal-200 hover:bg-teal-100 cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredDestinations.map((dest) => {
                const budgetBadge = getBudgetTierBadge(dest.budgetTier);
                const est5DayTotalUSD = dest.avgDailyCostUSD * (dest.idealDurationDays || 5);
                const hasSecondary = dest.secondaryImages && dest.secondaryImages.length > 0;

                return (
                  <div
                    key={dest.id}
                    className="group bg-white rounded-2xl border border-slate-200 hover:border-teal-400 hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {/* Destination Image & Badges */}
                      <div className="relative h-44 overflow-hidden bg-slate-200">
                        <img
                          src={dest.imageUrl}
                          alt={dest.city}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                        
                        {/* Popularity Rank Badge */}
                        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                          <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-extrabold border border-white/20 flex items-center gap-1">
                            <Award className="w-3.5 h-3.5 text-amber-400" />
                            <span>#{dest.popularityRank || 1} Top Pick</span>
                          </span>
                        </div>

                        {/* Budget Tier Pill & Secondary Image count */}
                        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] border shadow-xs ${budgetBadge.color}`}>
                            {budgetBadge.label.split(' ')[0]} {dest.budgetTier.toUpperCase()}
                          </span>
                        </div>

                        {/* Title & Country Overlay */}
                        <div className="absolute bottom-2.5 left-3 right-3 text-white">
                          <div className="flex items-end justify-between gap-2">
                            <div>
                              <h3 className="text-lg font-bold font-display text-white leading-tight">
                                {dest.city}
                              </h3>
                              <div className="flex items-center gap-2 text-xs text-teal-200 mt-0.5">
                                <span>{dest.country}</span>
                                <span>&middot;</span>
                                <span className="text-slate-300 font-medium">{dest.region}</span>
                              </div>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md text-amber-300 text-xs font-bold border border-white/10">
                              <Star className="w-3 h-3 fill-amber-300" />
                              <span>{dest.rating || 4.8}</span>
                              <span className="text-[10px] text-slate-300 font-normal">
                                ({(dest.reviewCount ? (dest.reviewCount / 1000).toFixed(1) + 'k' : '10k')})
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-4 space-y-3.5">
                        {/* Tagline */}
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium">
                          {dest.tagline}
                        </p>

                        {/* PRICE & BUDGET BOX */}
                        <div className="p-3 rounded-xl bg-teal-50/60 border border-teal-200/80 space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-[10px] uppercase font-bold text-teal-900 tracking-wider block">
                                Est. Daily Budget
                              </span>
                              <div className="flex items-baseline gap-1">
                                <span className="text-base font-extrabold text-teal-950 font-display">
                                  {formatCurrency(dest.avgDailyCostUSD, currentCurrency, 'USD')}
                                </span>
                                <span className="text-[11px] text-teal-800 font-semibold">/ person / day</span>
                              </div>
                            </div>

                            <div className="text-right">
                              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                                {dest.idealDurationDays || 5}-Day Package Est.
                              </span>
                              <span className="text-xs font-extrabold text-slate-900 font-mono bg-white px-2 py-0.5 rounded-md border border-teal-200">
                                ~{formatCurrency(est5DayTotalUSD, currentCurrency, 'USD')}
                              </span>
                            </div>
                          </div>

                          {/* Mini Cost Breakdown */}
                          {dest.breakdownUSD && (
                            <div className="grid grid-cols-4 gap-1 text-center pt-2 border-t border-teal-200/60 text-[10px]">
                              <div className="p-1 rounded bg-white/80" title="Hotel / Stay">
                                <span className="text-slate-400 block font-medium">Stay</span>
                                <strong className="text-slate-800 font-bold">
                                  {formatCurrency(dest.breakdownUSD.stayUSD, currentCurrency, 'USD')}
                                </strong>
                              </div>
                              <div className="p-1 rounded bg-white/80" title="Food & Meals">
                                <span className="text-slate-400 block font-medium">Food</span>
                                <strong className="text-slate-800 font-bold">
                                  {formatCurrency(dest.breakdownUSD.foodUSD, currentCurrency, 'USD')}
                                </strong>
                              </div>
                              <div className="p-1 rounded bg-white/80" title="Local Transit">
                                <span className="text-slate-400 block font-medium">Transit</span>
                                <strong className="text-slate-800 font-bold">
                                  {formatCurrency(dest.breakdownUSD.transitUSD, currentCurrency, 'USD')}
                                </strong>
                              </div>
                              <div className="p-1 rounded bg-white/80" title="Activities & Sights">
                                <span className="text-slate-400 block font-medium">Sights</span>
                                <strong className="text-slate-800 font-bold">
                                  {formatCurrency(dest.breakdownUSD.activitiesUSD, currentCurrency, 'USD')}
                                </strong>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Top Sightseeing Attractions with Price Tags */}
                        {dest.topAttractions && dest.topAttractions.length > 0 && (
                          <div className="space-y-1.5">
                            <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                              <Ticket className="w-3 h-3 text-teal-600" />
                              <span>Key Places &amp; Entry Prices:</span>
                            </span>

                            <div className="space-y-1">
                              {dest.topAttractions.slice(0, 3).map((att, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center justify-between text-xs py-0.5 px-2 rounded-lg bg-slate-50 border border-slate-200/70"
                                >
                                  <span className="text-slate-700 truncate pr-2 font-medium">
                                    {att.name}
                                  </span>
                                  <span className="text-[11px] font-bold text-teal-700 whitespace-nowrap">
                                    {att.free ? (
                                      <span className="text-emerald-700 bg-emerald-100/80 px-1.5 py-0.2 rounded font-extrabold">FREE</span>
                                    ) : (
                                      formatCurrency(att.estimatedPriceUSD, currentCurrency, 'USD')
                                    )}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Travel Season & Ideal Time */}
                        <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100">
                          <span className="flex items-center gap-1 truncate">
                            <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                            <span className="truncate">Best: <strong className="text-slate-700">{dest.bestMonths.split('(')[0]}</strong></span>
                          </span>
                          <span className="font-semibold text-slate-600 shrink-0">
                            ⏳ {dest.idealDurationDays || 4} Days
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="p-4 pt-0 border-t border-slate-100 mt-2 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewDest(dest);
                          setPreviewActiveImageIdx(0);
                        }}
                        className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-500" />
                        <span>View Details</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSelectAndPlan(dest)}
                        className="py-2.5 px-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <span>Plan Trip</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="p-3.5 sm:p-4 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>All estimates calibrated live with currency conversion in <strong>{currentCurrency}</strong>.</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* DETAIL PREVIEW LIGHTBOX DRAWER */}
      {previewDest && (
        <div className="fixed inset-0 z-60 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 text-xs font-bold">
                    #{previewDest.popularityRank || 1} Top Tripped Destination
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {previewDest.region}
                  </span>
                </div>
                <h3 className="text-2xl font-bold font-display text-slate-900 mt-1">
                  {previewDest.city}, {previewDest.country}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">{previewDest.tagline}</p>
              </div>

              <button
                onClick={() => setPreviewDest(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo Gallery Viewer */}
            <div className="space-y-2">
              <div className="h-64 sm:h-72 rounded-2xl overflow-hidden relative shadow-inner bg-slate-900">
                <img
                  src={
                    previewActiveImageIdx === 0
                      ? previewDest.imageUrl
                      : previewDest.secondaryImages?.[previewActiveImageIdx - 1] || previewDest.imageUrl
                  }
                  alt={previewDest.city}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              {previewDest.secondaryImages && previewDest.secondaryImages.length > 0 && (
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => setPreviewActiveImageIdx(0)}
                    className={`w-16 h-12 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                      previewActiveImageIdx === 0 ? 'border-teal-600 scale-105' : 'border-transparent opacity-70'
                    }`}
                  >
                    <img src={previewDest.imageUrl} alt="Main" className="w-full h-full object-cover" />
                  </button>

                  {previewDest.secondaryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPreviewActiveImageIdx(idx + 1)}
                      className={`w-16 h-12 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                        previewActiveImageIdx === idx + 1 ? 'border-teal-600 scale-105' : 'border-transparent opacity-70'
                      }`}
                    >
                      <img src={img} alt={`Secondary ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Full Cost & Budget Breakdown Box */}
            <div className="p-5 rounded-2xl bg-teal-50/80 border border-teal-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase font-bold text-teal-900">Estimated Total Cost ({previewDest.idealDurationDays || 5} Days)</span>
                  <div className="text-2xl font-black font-display text-teal-950">
                    {formatCurrency(previewDest.avgDailyCostUSD * (previewDest.idealDurationDays || 5), currentCurrency, 'USD')}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs uppercase font-bold text-slate-500">Daily Per Person</span>
                  <div className="text-base font-bold text-slate-900">
                    {formatCurrency(previewDest.avgDailyCostUSD, currentCurrency, 'USD')} / day
                  </div>
                </div>
              </div>

              {previewDest.breakdownUSD && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-teal-200 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-teal-100 space-y-1">
                    <span className="text-slate-500 flex items-center gap-1 font-semibold">
                      <Bed className="w-3.5 h-3.5 text-teal-600" />
                      <span>Stay / Hotel</span>
                    </span>
                    <strong className="text-sm font-bold text-slate-900 block">
                      {formatCurrency(previewDest.breakdownUSD.stayUSD, currentCurrency, 'USD')}/night
                    </strong>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-teal-100 space-y-1">
                    <span className="text-slate-500 flex items-center gap-1 font-semibold">
                      <Utensils className="w-3.5 h-3.5 text-teal-600" />
                      <span>Food &amp; Dining</span>
                    </span>
                    <strong className="text-sm font-bold text-slate-900 block">
                      {formatCurrency(previewDest.breakdownUSD.foodUSD, currentCurrency, 'USD')}/day
                    </strong>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-teal-100 space-y-1">
                    <span className="text-slate-500 flex items-center gap-1 font-semibold">
                      <Car className="w-3.5 h-3.5 text-teal-600" />
                      <span>Local Transit</span>
                    </span>
                    <strong className="text-sm font-bold text-slate-900 block">
                      {formatCurrency(previewDest.breakdownUSD.transitUSD, currentCurrency, 'USD')}/day
                    </strong>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-teal-100 space-y-1">
                    <span className="text-slate-500 flex items-center gap-1 font-semibold">
                      <Ticket className="w-3.5 h-3.5 text-teal-600" />
                      <span>Activities</span>
                    </span>
                    <strong className="text-sm font-bold text-slate-900 block">
                      {formatCurrency(previewDest.breakdownUSD.activitiesUSD, currentCurrency, 'USD')}/day
                    </strong>
                  </div>
                </div>
              )}
            </div>

            {/* Attractions with Admission Fee */}
            {previewDest.topAttractions && previewDest.topAttractions.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold font-display text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Ticket className="w-4 h-4 text-teal-600" />
                  <span>Must-Visit Places &amp; Estimated Admission Tickets</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {previewDest.topAttractions.map((att, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2"
                    >
                      <div>
                        <strong className="text-xs font-bold text-slate-800 block">{att.name}</strong>
                        <span className="text-[10px] text-slate-500">{att.category}</span>
                      </div>
                      <span className="text-xs font-extrabold text-teal-700 bg-white px-2 py-1 rounded-lg border border-slate-200">
                        {att.free ? 'FREE' : formatCurrency(att.estimatedPriceUSD, currentCurrency, 'USD')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Travel Essentials */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-700 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-teal-600" />
                  <span>Best Season to Visit:</span>
                </span>
                <p className="text-slate-600">{previewDest.bestMonths}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-700 flex items-center gap-1">
                  <Plane className="w-3.5 h-3.5 text-teal-600" />
                  <span>Flight Duration:</span>
                </span>
                <p className="text-slate-600">{previewDest.flightTimeFromMajorHubs}</p>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setPreviewDest(null)}
                className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Back to Explore List
              </button>

              <button
                type="button"
                onClick={() => {
                  handleSelectAndPlan(previewDest);
                  setPreviewDest(null);
                }}
                className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Plan Trip to {previewDest.city} Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
