import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Users, 
  Wallet, 
  Gauge, 
  Compass, 
  Utensils, 
  Sliders, 
  ArrowRight, 
  Check, 
  Shuffle, 
  Info,
  ChevronDown,
  ChevronUp,
  Cpu,
  Zap,
  Bed,
  Car
} from 'lucide-react';
import { TripPreferences, TravelGroup, BudgetTier, TravelPace } from '../types';
import { POPULAR_INTERESTS, CURRENCIES } from '../data/sampleDestinations';

interface PlannerWizardProps {
  onGenerate: (prefs: TripPreferences) => void;
  isLoading: boolean;
  currentCurrency: string;
  onOpenPromptLab: () => void;
}

const POPULAR_DESTINATIONS = [
  'Tokyo, Japan',
  'Paris, France',
  'Bali, Indonesia',
  'Rome, Italy',
  'Kyoto, Japan',
  'Barcelona, Spain',
  'Interlaken, Switzerland',
  'New York City, USA',
  'London, UK',
  'Dubai, UAE',
  'Singapore',
  'Amsterdam, Netherlands',
];

const DIETARY_OPTIONS = [
  'None / All Foods',
  'Vegetarian',
  'Vegan',
  'Halal',
  'Kosher',
  'Gluten-Free',
  'Pescatarian',
  'Nut Allergy',
];

export const PlannerWizard: React.FC<PlannerWizardProps> = ({
  onGenerate,
  isLoading,
  currentCurrency,
  onOpenPromptLab,
}) => {
  const [destination, setDestination] = useState('');
  const [sourceCity, setSourceCity] = useState('');
  const [durationDays, setDurationDays] = useState<number>(4);
  const [groupType, setGroupType] = useState<TravelGroup>('couple');
  const [budgetTier, setBudgetTier] = useState<BudgetTier>('moderate');
  const [targetBudgetAmount, setTargetBudgetAmount] = useState<string>('');
  const [pace, setPace] = useState<TravelPace>('balanced');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'culture',
    'foodie',
    'photography',
  ]);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [accommodation, setAccommodation] = useState('Boutique Hotel / Central Airbnb');
  const [transport, setTransport] = useState('Public Transit & Metro');
  const [specialRequests, setSpecialRequests] = useState('');

  // Academic prompt engineering settings
  const [showAdvancedPrompt, setShowAdvancedPrompt] = useState(false);
  const [promptStrategy, setPromptStrategy] = useState<'balanced' | 'hidden_gems' | 'budget_optimized' | 'luxury_concierge'>('balanced');
  const [creativityLevel, setCreativityLevel] = useState<number>(0.7);

  const handleInterestToggle = (id: string) => {
    if (selectedInterests.includes(id)) {
      if (selectedInterests.length > 1) {
        setSelectedInterests(selectedInterests.filter((item) => item !== id));
      }
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const handleDietaryToggle = (item: string) => {
    if (item === 'None / All Foods') {
      setSelectedDietary([]);
      return;
    }
    if (selectedDietary.includes(item)) {
      setSelectedDietary(selectedDietary.filter((d) => d !== item));
    } else {
      setSelectedDietary([...selectedDietary.filter((d) => d !== 'None / All Foods'), item]);
    }
  };

  const handleSurpriseMe = () => {
    const randomDest = POPULAR_DESTINATIONS[Math.floor(Math.random() * POPULAR_DESTINATIONS.length)];
    setDestination(randomDest);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) {
      setDestination('Tokyo, Japan');
    }

    const targetAmount = targetBudgetAmount ? parseFloat(targetBudgetAmount) : undefined;

    const prefs: TripPreferences = {
      destination: destination.trim() || 'Tokyo, Japan',
      sourceCity: sourceCity.trim() || undefined,
      durationDays,
      groupType,
      budgetTier,
      targetBudgetAmount: targetAmount,
      currency: currentCurrency,
      pace,
      interests: selectedInterests,
      dietaryRestrictions: selectedDietary.length > 0 ? selectedDietary : undefined,
      accommodationPreference: accommodation,
      transportPreference: transport,
      specialRequests: specialRequests.trim() || undefined,
      promptStrategy,
      creativityLevel,
    };

    onGenerate(prefs);
  };

  return (
    <div id="planner-wizard-container" className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50 overflow-hidden">
        {/* Planner Header */}
        <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 p-6 sm:p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider mb-2.5 border border-teal-400/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Prompt Engineering Engine</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display text-white">
                Design Your Dream Itinerary
              </h1>
              <p className="text-sm text-slate-300 mt-1 max-w-xl">
                Configure your destination, budget, group, and pacing. TripGenie leverages Gemini 3.7 Flash with structured schema reasoning.
              </p>
            </div>

            <button
              type="button"
              id="prompt-lab-quick-link"
              onClick={onOpenPromptLab}
              className="self-start sm:self-center inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-xs transition-colors border border-white/15 cursor-pointer"
            >
              <Cpu className="w-4 h-4 text-teal-300" />
              <span>Prompt Architecture</span>
            </button>
          </div>
        </div>

        {/* Planner Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
          {/* 1. Destination Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="destination-input" className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-600" />
                <span>Where do you want to travel?</span>
                <span className="text-rose-500">*</span>
              </label>
              <button
                type="button"
                id="btn-surprise-me"
                onClick={handleSurpriseMe}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900 bg-teal-50 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Surprise Me</span>
              </button>
            </div>

            <div className="relative">
              <input
                id="destination-input"
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Tokyo, Japan / Paris, France / Swiss Alps / Bali"
                className="w-full px-4 py-3.5 pl-11 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 font-medium focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all outline-none"
                required
              />
              <MapPin className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Popular quick chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-xs text-slate-500 font-medium mr-1">Popular:</span>
              {POPULAR_DESTINATIONS.slice(0, 6).map((dest) => (
                <button
                  key={dest}
                  type="button"
                  onClick={() => setDestination(dest)}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                    destination === dest
                      ? 'bg-teal-600 text-white border-teal-600 font-semibold'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {dest.split(',')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Duration & Travel Group */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Duration */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-teal-600" />
                  <span>Trip Duration</span>
                </label>
                <span className="text-sm font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100">
                  {durationDays} {durationDays === 1 ? 'Day' : 'Days'}
                </span>
              </div>

              <div className="space-y-2">
                <input
                  id="duration-range-slider"
                  type="range"
                  min="1"
                  max="14"
                  value={durationDays}
                  onChange={(e) => setDurationDays(parseInt(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                  <span>1 Day</span>
                  <span>3 Days</span>
                  <span>5 Days</span>
                  <span>7 Days</span>
                  <span>10 Days</span>
                  <span>14 Days</span>
                </div>
              </div>

              {/* Quick preset buttons */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                {[
                  { days: 3, label: '3d Weekend' },
                  { days: 5, label: '5d Explorer' },
                  { days: 7, label: '7d Grand Tour' },
                ].map((preset) => (
                  <button
                    key={preset.days}
                    type="button"
                    onClick={() => setDurationDays(preset.days)}
                    className={`py-1.5 px-2 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                      durationDays === preset.days
                        ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Travel Group */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-teal-600" />
                <span>Travel Party</span>
              </label>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'solo', label: 'Solo Nomad', desc: 'Independent & agile' },
                  { id: 'couple', label: 'Couple / Duo', desc: 'Romantic & shared' },
                  { id: 'friends', label: 'Friends Group', desc: 'Social & lively' },
                  { id: 'family', label: 'Family with Kids', desc: 'Comfort & pace' },
                  { id: 'students', label: 'College / Backpackers', desc: 'Budget & adventure' },
                ].map((item) => {
                  const isSelected = groupType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setGroupType(item.id as TravelGroup)}
                      className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-teal-50/80 border-teal-500 ring-2 ring-teal-500/20'
                          : 'bg-slate-50/80 border-slate-200 hover:bg-slate-100/80'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold ${isSelected ? 'text-teal-900' : 'text-slate-800'}`}>
                          {item.label}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-teal-600" />}
                      </div>
                      <span className="text-[10px] text-slate-500 block">{item.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 3. Budget Tier & Pacing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Budget */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-teal-600" />
                  <span>Budget Tier</span>
                </label>
                <span className="text-xs text-slate-500 font-medium">Currency: {currentCurrency}</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'budget', label: '$ Budget', sub: 'Hostels & street eats' },
                  { id: 'moderate', label: '$$ Balanced', sub: '3-4★ hotels & bistros' },
                  { id: 'luxury', label: '$$$ Luxury', sub: '5★ resorts & fine dining' },
                ].map((b) => {
                  const isSelected = budgetTier === b.id;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBudgetTier(b.id as BudgetTier)}
                      className={`p-3 rounded-xl text-center border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-teal-50 border-teal-500 ring-2 ring-teal-500/20 shadow-xs'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span className={`block text-xs font-bold ${isSelected ? 'text-teal-900' : 'text-slate-800'}`}>
                        {b.label}
                      </span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">{b.sub}</span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-1">
                <input
                  type="number"
                  placeholder={`Optional total budget limit (e.g. 1500 ${currentCurrency})`}
                  value={targetBudgetAmount}
                  onChange={(e) => setTargetBudgetAmount(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-teal-500 focus:bg-white"
                />
              </div>
            </div>

            {/* Travel Pace */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Gauge className="w-4 h-4 text-teal-600" />
                <span>Itinerary Pacing</span>
              </label>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'relaxed', label: 'Relaxed', sub: '2-3 spots / day' },
                  { id: 'balanced', label: 'Balanced', sub: '3-4 spots / day' },
                  { id: 'fast-paced', label: 'Packed', sub: '5+ spots / day' },
                ].map((p) => {
                  const isSelected = pace === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPace(p.id as TravelPace)}
                      className={`p-3 rounded-xl text-center border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-teal-50 border-teal-500 ring-2 ring-teal-500/20 shadow-xs'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span className={`block text-xs font-bold ${isSelected ? 'text-teal-900' : 'text-slate-800'}`}>
                        {p.label}
                      </span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">{p.sub}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 4. Interests Multi-Select */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-900 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-teal-600" />
                <span>Travel Interests & Vibes (Select all that apply)</span>
              </span>
              <span className="text-xs text-slate-400 font-normal">
                {selectedInterests.length} selected
              </span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {POPULAR_INTERESTS.map((interest) => {
                const isSelected = selectedInterests.includes(interest.id);
                return (
                  <button
                    key={interest.id}
                    type="button"
                    onClick={() => handleInterestToggle(interest.id)}
                    className={`py-2 px-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span className="truncate">{interest.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Dietary & Preferences Accordion */}
          <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-2xl space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-teal-600" />
                <span>Dietary Restrictions (Optional)</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {DIETARY_OPTIONS.map((item) => {
                  const isSelected = item === 'None / All Foods' 
                    ? selectedDietary.length === 0 
                    : selectedDietary.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleDietaryToggle(item)}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-teal-100 text-teal-800 border-teal-300 font-bold'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1.5">
                  <Bed className="w-3.5 h-3.5 text-slate-500" />
                  <span>Accommodation Style</span>
                </label>
                <input
                  type="text"
                  value={accommodation}
                  onChange={(e) => setAccommodation(e.target.value)}
                  placeholder="e.g. Central Boutique Hotel, Ryokan, Hostel, Resort"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none focus:border-teal-500 font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1.5">
                  <Car className="w-3.5 h-3.5 text-slate-500" />
                  <span>Preferred Transport</span>
                </label>
                <input
                  type="text"
                  value={transport}
                  onChange={(e) => setTransport(e.target.value)}
                  placeholder="e.g. Metro & Trains, Rental Car, Walking & Cabs"
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none focus:border-teal-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Special Requests & Notes (Optional)
              </label>
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="e.g. Must include an early morning photo spot, traveling with elderly parents, prefer quiet cafes, avoid steep uphill hikes."
                rows={2}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none focus:border-teal-500 resize-none font-medium"
              />
            </div>
          </div>

          {/* 6. Academic Prompt Engineering Controls Toggle */}
          <div className="border border-indigo-200 bg-indigo-50/50 rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => setShowAdvancedPrompt(!showAdvancedPrompt)}
              className="w-full px-4 py-3 flex items-center justify-between text-left cursor-pointer hover:bg-indigo-50/80 transition-colors"
            >
              <div className="flex items-center gap-2 text-indigo-900">
                <Cpu className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold">Academic Mini-Project: Prompt Strategy & Hyperparameters</span>
                <span className="text-[10px] bg-indigo-200 text-indigo-800 px-1.5 py-0.5 rounded font-bold">
                  Inspect
                </span>
              </div>
              {showAdvancedPrompt ? (
                <ChevronUp className="w-4 h-4 text-indigo-600" />
              ) : (
                <ChevronDown className="w-4 h-4 text-indigo-600" />
              )}
            </button>

            {showAdvancedPrompt && (
              <div className="p-4 pt-2 border-t border-indigo-100 bg-white space-y-4">
                <p className="text-xs text-slate-600">
                  This project demonstrates prompt engineering methodologies including <strong>Role Framing</strong>, <strong>Dynamic Constraint Injection</strong>, <strong>Geographic CoT Reasoning</strong>, and <strong>Strict JSON Schema Enforcement</strong>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Prompt Strategy Modulation
                    </label>
                    <select
                      value={promptStrategy}
                      onChange={(e) => setPromptStrategy(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none"
                    >
                      <option value="balanced">Standard Balanced Travel Matrix</option>
                      <option value="hidden_gems">Locals-Only Hidden Gems Focus</option>
                      <option value="budget_optimized">Strict Budget & Free Landmark Clustering</option>
                      <option value="luxury_concierge">High-End Luxury & Signature Venues</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>Model Temperature (Creativity)</span>
                      <span className="text-indigo-600">{creativityLevel}</span>
                    </div>
                    <input
                      type="range"
                      min="0.2"
                      max="1.0"
                      step="0.1"
                      value={creativityLevel}
                      onChange={(e) => setCreativityLevel(parseFloat(e.target.value))}
                      className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                      <span>0.2 Deterministic</span>
                      <span>0.7 Optimal</span>
                      <span>1.0 High Flair</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              id="generate-itinerary-btn"
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-500 hover:from-teal-700 hover:to-cyan-600 active:scale-[0.99] text-white font-display font-bold text-base sm:text-lg shadow-lg shadow-teal-500/25 transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>TripGenie is synthesizing your itinerary...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span>Generate Full AI Itinerary</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
            <p className="text-center text-xs text-slate-400 mt-2">
              Powered by Gemini 3.7 Flash &middot; Geocoded routing &middot; Real-time budget analytics
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
