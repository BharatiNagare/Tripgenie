import { DestinationInspiration } from '../types';

export const SAMPLE_DESTINATIONS: DestinationInspiration[] = [
  {
    id: 'tokyo-japan',
    city: 'Tokyo',
    country: 'Japan',
    tagline: 'Futuristic Metropolises meet Ancient Shrines & Culinary Mastery',
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    vibe: ['Futuristic', 'Culinary', 'Culture', 'Safe & Clean'],
    avgDailyCostUSD: 140,
    bestMonths: 'March - May, Oct - Nov',
    flightTimeFromMajorHubs: '10-14 hrs',
    highlights: ['Shibuya Crossing', 'Senso-ji Temple', 'TeamLab Planets', 'Tsukiji Outer Market']
  },
  {
    id: 'paris-france',
    city: 'Paris',
    country: 'France',
    tagline: 'Timeless Art, Haute Cuisine, and Cobblestone Romance',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    vibe: ['Art & Museums', 'Romantic', 'Architecture', 'Café Culture'],
    avgDailyCostUSD: 180,
    bestMonths: 'April - June, Sept - Oct',
    flightTimeFromMajorHubs: '7-11 hrs',
    highlights: ['Louvre & Orsay', 'Montmartre & Sacré-Cœur', 'Seine River Cruise', 'Le Marais Eateries']
  },
  {
    id: 'bali-indonesia',
    city: 'Bali',
    country: 'Indonesia',
    tagline: 'Tropical Terraces, Spiritual Sanctuaries, & Coastal Surf',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    vibe: ['Tropical & Beach', 'Wellness', 'Adventure', 'Budget-Friendly'],
    avgDailyCostUSD: 65,
    bestMonths: 'April - October',
    flightTimeFromMajorHubs: '14-18 hrs',
    highlights: ['Ubud Monkey Forest', 'Tegallalang Rice Terraces', 'Uluwatu Sunset Temple', 'Nusa Penida Day Trip']
  },
  {
    id: 'rome-italy',
    city: 'Rome',
    country: 'Italy',
    tagline: 'An Open-Air Living Museum of Gladiator Arenas & Trattorias',
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
    vibe: ['Ancient History', 'Culinary', 'Walkable', 'Art'],
    avgDailyCostUSD: 155,
    bestMonths: 'April - May, Sept - Oct',
    flightTimeFromMajorHubs: '8-12 hrs',
    highlights: ['Colosseum & Forum', 'Vatican Museums', 'Trevi Fountain & Gelato', 'Trastevere Evenings']
  },
  {
    id: 'kyoto-japan',
    city: 'Kyoto',
    country: 'Japan',
    tagline: 'Zen Gardens, Bamboo Groves, and Gilded Pavilion Serenity',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    vibe: ['Serene', 'Traditional', 'Nature', 'Photography'],
    avgDailyCostUSD: 130,
    bestMonths: 'March - April, Oct - Nov',
    flightTimeFromMajorHubs: '11-15 hrs',
    highlights: ['Fushimi Inari-taisha', 'Arashiyama Bamboo Grove', 'Kinkaku-ji (Golden Pavilion)', 'Gion Geisha District']
  },
  {
    id: 'barcelona-spain',
    city: 'Barcelona',
    country: 'Spain',
    tagline: 'Gaudí Architecture, Mediterranean Coastline, and Tapas Nights',
    imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80',
    vibe: ['Beach & City', 'Architecture', 'Tapas & Wine', 'Vibrant'],
    avgDailyCostUSD: 145,
    bestMonths: 'May - June, Sept - Oct',
    flightTimeFromMajorHubs: '8-12 hrs',
    highlights: ['Sagrada Família', 'Park Güell', 'Gothic Quarter', 'Barceloneta Beach Sunset']
  },
  {
    id: 'interlaken-switzerland',
    city: 'Interlaken & Jungfrau',
    country: 'Switzerland',
    tagline: 'Alpine Peaks, Turquoise Glacial Lakes, and Mountain Thrills',
    imageUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    vibe: ['Alpine Nature', 'Adventure Sports', 'Scenic Trains', 'Scenic Views'],
    avgDailyCostUSD: 230,
    bestMonths: 'June - Sept, Dec - March (Ski)',
    flightTimeFromMajorHubs: '9-13 hrs',
    highlights: ['Jungfraujoch Top of Europe', 'Lauterbrunnen Valley Waterfalls', 'Lake Brienz Cruise', 'First Cliff Walk']
  },
  {
    id: 'new-york-usa',
    city: 'New York City',
    country: 'USA',
    tagline: 'The City That Never Sleeps: Iconic Skylines & World-Class Broadway',
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80',
    vibe: ['Metropolitan', 'Broadway & Shows', 'Museums', 'Diverse Food'],
    avgDailyCostUSD: 240,
    bestMonths: 'Sept - Nov, April - June',
    flightTimeFromMajorHubs: 'Domestic / 6-10 hrs',
    highlights: ['Central Park', 'The High Line & Hudson Yards', 'Metropolitan Museum', 'Brooklyn Bridge Sunset']
  }
];

export const POPULAR_INTERESTS = [
  { id: 'culture', label: 'Culture & Heritage', icon: 'Landmark' },
  { id: 'foodie', label: 'Culinary & Street Food', icon: 'Utensils' },
  { id: 'adventure', label: 'Adventure & Outdoors', icon: 'Compass' },
  { id: 'nature', label: 'Scenic Nature & Parks', icon: 'Trees' },
  { id: 'photography', label: 'Photography & Views', icon: 'Camera' },
  { id: 'relaxation', label: 'Relaxation & Spa', icon: 'Palmtree' },
  { id: 'nightlife', label: 'Nightlife & Social', icon: 'Moon' },
  { id: 'shopping', label: 'Shopping & Markets', icon: 'ShoppingBag' },
  { id: 'budget', label: 'Hidden Gems & Free Stops', icon: 'Sparkles' },
  { id: 'museums', label: 'Art Galleries & Museums', icon: 'Palette' },
];

export const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar', rateToUSD: 1 },
  { code: 'EUR', symbol: '€', name: 'Euro', rateToUSD: 0.92 },
  { code: 'GBP', symbol: '£', name: 'British Pound', rateToUSD: 0.79 },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', rateToUSD: 86.5 },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rateToUSD: 152 },
  { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar', rateToUSD: 1.38 },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rateToUSD: 1.54 },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', rateToUSD: 1.34 },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', rateToUSD: 0.88 },
];
