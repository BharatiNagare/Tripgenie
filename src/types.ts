export type TravelGroup = 'solo' | 'couple' | 'family' | 'friends' | 'students';
export type BudgetTier = 'budget' | 'moderate' | 'luxury';
export type TravelPace = 'relaxed' | 'balanced' | 'fast-paced';

export interface TripPreferences {
  destination: string;
  sourceCity?: string;
  durationDays: number;
  startDate?: string;
  groupType: TravelGroup;
  budgetTier: BudgetTier;
  targetBudgetAmount?: number;
  currency: string;
  pace: TravelPace;
  interests: string[];
  dietaryRestrictions?: string[];
  accommodationPreference?: string;
  transportPreference?: string;
  specialRequests?: string;
  // Prompt engineering controls
  promptStrategy?: 'balanced' | 'hidden_gems' | 'budget_optimized' | 'luxury_concierge';
  creativityLevel?: number; // 0.2 to 1.0
}

export interface Activity {
  id: string;
  timeSlot: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  timeRange: string; // e.g. "09:00 AM - 11:30 AM"
  title: string;
  description: string;
  location: string;
  estimatedCost: number; // in preferred currency
  durationMinutes: number;
  category: 'Sightseeing' | 'Food & Drink' | 'Adventure & Nature' | 'Culture & History' | 'Relaxation' | 'Nightlife' | 'Shopping' | 'Transit' | 'Photography & Views';
  insiderTip?: string;
  bestTimeToVisit?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  bookingRequired?: boolean;
  completed?: boolean;
}

export interface DayPlan {
  dayNumber: number;
  title: string; // e.g. "Day 1: Historic Heart & Sunset Views"
  theme: string;
  date?: string;
  activities: Activity[];
  dailyMealRecommendations: {
    breakfast?: string;
    lunch?: string;
    dinner?: string;
  };
  dailyTransportTip: string;
  estimatedDayCost: number;
}

export interface BudgetCategory {
  category: 'Accommodation' | 'Food & Dining' | 'Activities & Entry' | 'Local Transportation' | 'Contingency / Misc';
  amount: number;
  percentage: number;
  notes: string;
}

export interface PackingItem {
  id: string;
  item: string;
  category: 'Essentials & Docs' | 'Clothing & Footwear' | 'Electronics & Tech' | 'Toiletries & Health' | 'Destination Specific';
  packed: boolean;
  reason?: string;
}

export interface PhraseItem {
  phrase: string;
  translation: string;
  pronunciation: string;
  context: string;
}

export interface LocalGuide {
  bestSeason: string;
  weatherSummary: string;
  averageTemp: string;
  currencyName: string;
  currencyCode: string;
  safetyScore: number; // 1-10
  safetyTips: string[];
  culturalEtiquette: {
    dos: string[];
    donts: string[];
  };
  emergencyNumbers: {
    police: string;
    ambulance: string;
    general: string;
  };
  keyPhrases: PhraseItem[];
  topLocalFoods: {
    name: string;
    description: string;
    mustTryPlace?: string;
  }[];
}

export interface PromptMetrics {
  promptUsed: string;
  systemInstructionUsed: string;
  model: string;
  temperature: number;
  responseTokensEstimate: number;
  generationLatencyMs: number;
  techniquesUsed: string[];
}

export interface Itinerary {
  id: string;
  createdAt: string;
  preferences: TripPreferences;
  title: string;
  tagline: string;
  destination: string;
  country: string;
  heroImageUrl: string;
  summary: string;
  totalEstimatedCost: number;
  currency: string;
  days: DayPlan[];
  budgetBreakdown: BudgetCategory[];
  packingList: PackingItem[];
  localGuide: LocalGuide;
  promptMetrics?: PromptMetrics;
}

export interface DestinationInspiration {
  id: string;
  city: string;
  country: string;
  tagline: string;
  imageUrl: string;
  vibe: string[];
  avgDailyCostUSD: number;
  bestMonths: string;
  flightTimeFromMajorHubs: string;
  highlights: string[];
}

export interface ConciergeMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  quickActions?: {
    label: string;
    actionPrompt: string;
  }[];
}
