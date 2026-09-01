import { DestinationInspiration } from '../types';

export const SAMPLE_DESTINATIONS: DestinationInspiration[] = [
  {
    id: 'tokyo-japan',
    city: 'Tokyo',
    country: 'Japan',
    tagline: 'Futuristic Metropolises meet Ancient Shrines & Michelin-Starred Culinary Mastery',
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80'
    ],
    vibe: ['Futuristic', 'Culinary', 'Culture', 'Safe & Clean'],
    region: 'Asia',
    budgetTier: 'moderate',
    avgDailyCostUSD: 140,
    idealDurationDays: 6,
    popularityRank: 1,
    rating: 4.9,
    reviewCount: 14200,
    breakdownUSD: {
      stayUSD: 70,
      foodUSD: 40,
      transitUSD: 15,
      activitiesUSD: 15
    },
    bestMonths: 'March - May (Cherry Blossoms), Oct - Nov',
    flightTimeFromMajorHubs: '10-14 hrs',
    highlights: ['Shibuya Crossing & Sky', 'Senso-ji Ancient Temple', 'TeamLab Planets Immersive Art', 'Tsukiji Outer Seafood Market'],
    topAttractions: [
      { name: 'TeamLab Planets Digital Museum', estimatedPriceUSD: 28, free: false, category: 'Art & Tech' },
      { name: 'Shibuya Sky Observation Deck', estimatedPriceUSD: 16, free: false, category: 'Sightseeing' },
      { name: 'Senso-ji Temple Asakusa', estimatedPriceUSD: 0, free: true, category: 'Heritage' },
      { name: 'Meiji Jingu Shinto Shrine', estimatedPriceUSD: 0, free: true, category: 'Culture' }
    ]
  },
  {
    id: 'bali-indonesia',
    city: 'Bali',
    country: 'Indonesia',
    tagline: 'Tropical Terraces, Spiritual Sanctuaries, & Coastal Sunset Beach Clubs',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80'
    ],
    vibe: ['Tropical & Beach', 'Wellness', 'Adventure', 'Budget-Friendly'],
    region: 'Asia',
    budgetTier: 'budget',
    avgDailyCostUSD: 55,
    idealDurationDays: 7,
    popularityRank: 2,
    rating: 4.8,
    reviewCount: 22400,
    breakdownUSD: {
      stayUSD: 25,
      foodUSD: 15,
      transitUSD: 8,
      activitiesUSD: 7
    },
    bestMonths: 'April - October (Dry Season)',
    flightTimeFromMajorHubs: '12-16 hrs',
    highlights: ['Ubud Sacred Monkey Forest', 'Tegallalang Emerald Terraces', 'Uluwatu Cliff Sunset Temple', 'Nusa Penida Kelingking Day Trip'],
    topAttractions: [
      { name: 'Uluwatu Sunset Temple & Kecak Dance', estimatedPriceUSD: 12, free: false, category: 'Culture' },
      { name: 'Tegallalang Rice Terrace & Giant Swing', estimatedPriceUSD: 8, free: false, category: 'Nature' },
      { name: 'Ubud Sacred Monkey Sanctuary', estimatedPriceUSD: 6, free: false, category: 'Wildlife' },
      { name: 'Seminyak & Canggu Sunset Beaches', estimatedPriceUSD: 0, free: true, category: 'Relaxation' }
    ]
  },
  {
    id: 'paris-france',
    city: 'Paris',
    country: 'France',
    tagline: 'Timeless Art Masterpieces, Haute Cuisine, and Cobblestone Romance along the Seine',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80'
    ],
    vibe: ['Art & Museums', 'Romantic', 'Architecture', 'Café Culture'],
    region: 'Europe',
    budgetTier: 'luxury',
    avgDailyCostUSD: 195,
    idealDurationDays: 5,
    popularityRank: 3,
    rating: 4.9,
    reviewCount: 28900,
    breakdownUSD: {
      stayUSD: 110,
      foodUSD: 50,
      transitUSD: 15,
      activitiesUSD: 20
    },
    bestMonths: 'April - June, Sept - Oct',
    flightTimeFromMajorHubs: '7-11 hrs',
    highlights: ['Louvre & Musée d’Orsay', 'Montmartre & Sacré-Cœur Basilica', 'Illuminated Seine River Cruise', 'Le Marais Vintage Boutiques & Bistros'],
    topAttractions: [
      { name: 'Louvre Museum Mona Lisa Galleries', estimatedPriceUSD: 22, free: false, category: 'Art' },
      { name: 'Eiffel Tower Top Summit Access', estimatedPriceUSD: 30, free: false, category: 'Landmark' },
      { name: 'Musée d’Orsay Impressionist Art', estimatedPriceUSD: 18, free: false, category: 'Art' },
      { name: 'Sacré-Cœur & Montmartre Viewpoint', estimatedPriceUSD: 0, free: true, category: 'Views' }
    ]
  },
  {
    id: 'goa-india',
    city: 'Goa',
    country: 'India',
    tagline: 'Sun-drenched Golden Shores, Portuguese Heritage Villas, and Vibrant Coastal Shacks',
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587922546307-776227941871?auto=format&fit=crop&w=800&q=80'
    ],
    vibe: ['Beach & Coast', 'Seafood', 'Nightlife', 'Budget-Friendly'],
    region: 'Asia',
    budgetTier: 'budget',
    avgDailyCostUSD: 38,
    idealDurationDays: 4,
    popularityRank: 4,
    rating: 4.7,
    reviewCount: 18400,
    breakdownUSD: {
      stayUSD: 18,
      foodUSD: 12,
      transitUSD: 4,
      activitiesUSD: 4
    },
    bestMonths: 'November - March (Pleasant Weather)',
    flightTimeFromMajorHubs: 'Domestic / 2-6 hrs',
    highlights: ['Palolem & Agonda Pristine Beaches', 'Fontainhas Latin Quarter Walking Tour', 'Fort Aguada Ocean Vista', 'Dudhsagar Jungle Waterfalls'],
    topAttractions: [
      { name: 'Dudhsagar 4x4 Jeep Waterfall Safari', estimatedPriceUSD: 14, free: false, category: 'Adventure' },
      { name: 'Basilica of Bom Jesus (Old Goa)', estimatedPriceUSD: 0, free: true, category: 'Heritage' },
      { name: 'Fort Aguada & Lighthouse View', estimatedPriceUSD: 2, free: false, category: 'History' },
      { name: 'Fontainhas Colourful Portuguese Lane Walk', estimatedPriceUSD: 0, free: true, category: 'Culture' }
    ]
  },
  {
    id: 'rome-italy',
    city: 'Rome',
    country: 'Italy',
    tagline: 'An Open-Air Living Museum of Gladiator Arenas, Vatican Wonders, and Trattoria Delights',
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=800&q=80'
    ],
    vibe: ['Ancient History', 'Culinary', 'Walkable', 'Art'],
    region: 'Europe',
    budgetTier: 'moderate',
    avgDailyCostUSD: 155,
    idealDurationDays: 5,
    popularityRank: 5,
    rating: 4.8,
    reviewCount: 31000,
    breakdownUSD: {
      stayUSD: 85,
      foodUSD: 42,
      transitUSD: 10,
      activitiesUSD: 18
    },
    bestMonths: 'April - May, Sept - Oct',
    flightTimeFromMajorHubs: '8-12 hrs',
    highlights: ['Colosseum & Roman Forum', 'Vatican Museums & Sistine Chapel', 'Trevi Fountain Coin Toss & Artisan Gelato', 'Trastevere Cobblestone Evening Strolls'],
    topAttractions: [
      { name: 'Colosseum, Forum & Palatine Hill Ticket', estimatedPriceUSD: 20, free: false, category: 'Ancient History' },
      { name: 'Vatican Museums & Sistine Chapel', estimatedPriceUSD: 24, free: false, category: 'Art & Religion' },
      { name: 'Pantheon Historic Dome', estimatedPriceUSD: 6, free: false, category: 'Architecture' },
      { name: 'Trevi Fountain & Spanish Steps', estimatedPriceUSD: 0, free: true, category: 'Sightseeing' }
    ]
  },
  {
    id: 'bangkok-thailand',
    city: 'Bangkok',
    country: 'Thailand',
    tagline: 'Gilded Golden Temples, Floating Markets, and World-Famous Michelin Street Food Stalls',
    imageUrl: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&w=800&q=80'
    ],
    vibe: ['Street Food', 'Temples', 'Nightlife', 'Budget-Friendly'],
    region: 'Asia',
    budgetTier: 'budget',
    avgDailyCostUSD: 48,
    idealDurationDays: 4,
    popularityRank: 6,
    rating: 4.8,
    reviewCount: 26000,
    breakdownUSD: {
      stayUSD: 22,
      foodUSD: 14,
      transitUSD: 6,
      activitiesUSD: 6
    },
    bestMonths: 'November - February (Cooler season)',
    flightTimeFromMajorHubs: '4-9 hrs',
    highlights: ['The Grand Palace & Emerald Buddha', 'Wat Arun Temple of Dawn on Chao Phraya', 'Chatuchak Weekend Market (15,000 stalls)', 'Yaowarat Chinatown Night Food Crawl'],
    topAttractions: [
      { name: 'The Grand Palace & Wat Phra Kaew', estimatedPriceUSD: 14, free: false, category: 'Heritage' },
      { name: 'Wat Arun (Temple of Dawn)', estimatedPriceUSD: 3, free: false, category: 'Temple' },
      { name: 'Chao Phraya Express River Ferry', estimatedPriceUSD: 1, free: false, category: 'Transit Experience' },
      { name: 'Chatuchak Mega Weekend Market', estimatedPriceUSD: 0, free: true, category: 'Shopping' }
    ]
  },
  {
    id: 'interlaken-switzerland',
    city: 'Interlaken & Jungfrau',
    country: 'Switzerland',
    tagline: 'Snow-Capped Alpine Giants, Turquoise Glacial Lakes, and Epic Scenic Mountain Trains',
    imageUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571401835393-8c5f35328320?auto=format&fit=crop&w=800&q=80'
    ],
    vibe: ['Alpine Nature', 'Adventure Sports', 'Scenic Trains', 'Luxury Scenery'],
    region: 'Europe',
    budgetTier: 'luxury',
    avgDailyCostUSD: 235,
    idealDurationDays: 5,
    popularityRank: 7,
    rating: 4.9,
    reviewCount: 16500,
    breakdownUSD: {
      stayUSD: 130,
      foodUSD: 55,
      transitUSD: 30,
      activitiesUSD: 20
    },
    bestMonths: 'June - Sept (Hiking), Dec - March (Skiing)',
    flightTimeFromMajorHubs: '9-13 hrs',
    highlights: ['Jungfraujoch Top of Europe (3,454m)', 'Lauterbrunnen 72 Waterfalls Valley', 'Lake Brienz & Thun Steamboat Cruise', 'Grindelwald First Cliff Walk'],
    topAttractions: [
      { name: 'Jungfraujoch Cogwheel Train Pass', estimatedPriceUSD: 95, free: false, category: 'Alpine Railway' },
      { name: 'Grindelwald First Cliff Walk by Tissot', estimatedPriceUSD: 0, free: true, category: 'Adventure Views' },
      { name: 'Harder Kulm Funicular & Panorama Deck', estimatedPriceUSD: 22, free: false, category: 'Views' },
      { name: 'Lauterbrunnen Valley Walking Trail', estimatedPriceUSD: 0, free: true, category: 'Nature' }
    ]
  },
  {
    id: 'jaipur-india',
    city: 'Jaipur',
    country: 'India',
    tagline: 'The Regal Pink City: Hilltop Fortresses, Astronomical Observatories, and Royal Palaces',
    imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1603258849033-03b9c0fae348?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80'
    ],
    vibe: ['Royal Heritage', 'Forts & Palaces', 'Handicrafts', 'Budget-Friendly'],
    region: 'Asia',
    budgetTier: 'budget',
    avgDailyCostUSD: 34,
    idealDurationDays: 3,
    popularityRank: 8,
    rating: 4.8,
    reviewCount: 15300,
    breakdownUSD: {
      stayUSD: 16,
      foodUSD: 10,
      transitUSD: 4,
      activitiesUSD: 4
    },
    bestMonths: 'October - March (Cool & Festive)',
    flightTimeFromMajorHubs: 'Domestic / 1-4 hrs',
    highlights: ['Amber Fort & Sheesh Mahal', 'Hawa Mahal (Palace of Winds)', 'City Palace Royal Residence', 'Nahargarh Fort Sunset Panorama'],
    topAttractions: [
      { name: 'Amber Fort Elephant Pathway & Palace', estimatedPriceUSD: 6, free: false, category: 'Fort' },
      { name: 'Hawa Mahal Palace of Winds', estimatedPriceUSD: 3, free: false, category: 'Architecture' },
      { name: 'Jantar Mantar UNESCO Astronomical Park', estimatedPriceUSD: 3, free: false, category: 'Science & Heritage' },
      { name: 'Nahargarh Sunset Point & Wax Museum', estimatedPriceUSD: 2, free: false, category: 'Views' }
    ]
  },
  {
    id: 'kyoto-japan',
    city: 'Kyoto',
    country: 'Japan',
    tagline: 'Zen Rock Gardens, 10,000 Vermilion Torii Gates, and Gilded Pavilion Serenity',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80'
    ],
    vibe: ['Serene', 'Traditional', 'Nature', 'Photography'],
    region: 'Asia',
    budgetTier: 'moderate',
    avgDailyCostUSD: 130,
    idealDurationDays: 4,
    popularityRank: 9,
    rating: 4.9,
    reviewCount: 19800,
    breakdownUSD: {
      stayUSD: 68,
      foodUSD: 36,
      transitUSD: 12,
      activitiesUSD: 14
    },
    bestMonths: 'March - April (Sakura), Oct - Nov (Autumn Foliage)',
    flightTimeFromMajorHubs: '11-15 hrs',
    highlights: ['Fushimi Inari-taisha Torii Shrine Path', 'Arashiyama Bamboo Grove & Monkey Park', 'Kinkaku-ji (The Golden Pavilion)', 'Gion Historic Geisha District'],
    topAttractions: [
      { name: 'Kinkaku-ji (Golden Pavilion Temple)', estimatedPriceUSD: 4, free: false, category: 'Temple' },
      { name: 'Fushimi Inari 10,000 Torii Mountain Path', estimatedPriceUSD: 0, free: true, category: 'Shrine' },
      { name: 'Arashiyama Bamboo Forest & Tenryu-ji', estimatedPriceUSD: 4, free: false, category: 'Nature & Garden' },
      { name: 'Kiyomizu-dera Wooden Stage Temple', estimatedPriceUSD: 3, free: false, category: 'Heritage' }
    ]
  },
  {
    id: 'barcelona-spain',
    city: 'Barcelona',
    country: 'Spain',
    tagline: 'Gaudí’s Architectural Wonders, Sunny Mediterranean Beaches, and Late-Night Tapas',
    imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?auto=format&fit=crop&w=800&q=80'
    ],
    vibe: ['Beach & City', 'Architecture', 'Tapas & Wine', 'Vibrant'],
    region: 'Europe',
    budgetTier: 'moderate',
    avgDailyCostUSD: 145,
    idealDurationDays: 5,
    popularityRank: 10,
    rating: 4.8,
    reviewCount: 24700,
    breakdownUSD: {
      stayUSD: 80,
      foodUSD: 40,
      transitUSD: 10,
      activitiesUSD: 15
    },
    bestMonths: 'May - June, Sept - Oct (Warm & Beach Ready)',
    flightTimeFromMajorHubs: '8-12 hrs',
    highlights: ['Basílica de la Sagrada Família', 'Park Güell Mosaic Terraces', 'Gothic Quarter (Barri Gòtic)', 'Barceloneta Beach Sunset & Sangria'],
    topAttractions: [
      { name: 'Sagrada Família Fast-Track & Towers', estimatedPriceUSD: 32, free: false, category: 'Architecture' },
      { name: 'Park Güell Monumental Zone', estimatedPriceUSD: 12, free: false, category: 'Park & Art' },
      { name: 'Casa Batlló Immersive Tour', estimatedPriceUSD: 28, free: false, category: 'Gaudí Wonder' },
      { name: 'Barceloneta Beach & Promenade', estimatedPriceUSD: 0, free: true, category: 'Beach' }
    ]
  },
  {
    id: 'dubai-uae',
    city: 'Dubai',
    country: 'UAE',
    tagline: 'Futuristic Glass Towers, Golden Desert 4x4 Safaris, and Ultra-Luxury Waterfront Marinas',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80'
    ],
    vibe: ['Luxury & Skyline', 'Desert Adventure', 'Shopping', 'Futuristic'],
    region: 'Middle East',
    budgetTier: 'luxury',
    avgDailyCostUSD: 210,
    idealDurationDays: 5,
    popularityRank: 11,
    rating: 4.8,
    reviewCount: 29500,
    breakdownUSD: {
      stayUSD: 115,
      foodUSD: 50,
      transitUSD: 20,
      activitiesUSD: 25
    },
    bestMonths: 'November - March (Mild Winter Sun)',
    flightTimeFromMajorHubs: '3-8 hrs',
    highlights: ['Burj Khalifa 124th Floor Observation', 'Desert 4x4 Dune Bashing & BBQ Show', 'Dubai Mall & Dancing Fountains', 'Museum of the Future'],
    topAttractions: [
      { name: 'Burj Khalifa At the Top (Level 124+125)', estimatedPriceUSD: 45, free: false, category: 'Skyline View' },
      { name: 'Red Dune 4x4 Desert Safari & BBQ Dinner', estimatedPriceUSD: 40, free: false, category: 'Adventure' },
      { name: 'Dubai Mall & Fountain Musical Show', estimatedPriceUSD: 0, free: true, category: 'Spectacle' },
      { name: 'Museum of the Future Ticket', estimatedPriceUSD: 38, free: false, category: 'Innovation' }
    ]
  },
  {
    id: 'hanoi-vietnam',
    city: 'Hanoi & Ha Long Bay',
    country: 'Vietnam',
    tagline: 'Emerald Limestone Karsts, French-Colonial Boulevards, and Legendary Egg Coffee',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80'
    ],
    vibe: ['Culture & History', 'Cruising Karsts', 'Street Food', 'Budget-Friendly'],
    region: 'Asia',
    budgetTier: 'budget',
    avgDailyCostUSD: 42,
    idealDurationDays: 5,
    popularityRank: 12,
    rating: 4.8,
    reviewCount: 17200,
    breakdownUSD: {
      stayUSD: 20,
      foodUSD: 12,
      transitUSD: 4,
      activitiesUSD: 6
    },
    bestMonths: 'October - April (Dry & Pleasant)',
    flightTimeFromMajorHubs: '4-9 hrs',
    highlights: ['Ha Long Bay Overnight Junk Boat Cruise', 'Old Quarter 36 Guild Streets Walking Tour', 'Hoan Kiem Lake & Turtle Tower', 'Temple of Literature (1070 AD)'],
    topAttractions: [
      { name: 'Ha Long Bay Day Cruise & Kayak Safari', estimatedPriceUSD: 38, free: false, category: 'Nature Cruise' },
      { name: 'Temple of Literature Historic University', estimatedPriceUSD: 2, free: false, category: 'History' },
      { name: 'Hanoi Train Street Coffee Experience', estimatedPriceUSD: 2, free: false, category: 'Unique Urban' },
      { name: 'Hoan Kiem Lake & Ngoc Son Temple', estimatedPriceUSD: 1, free: false, category: 'Scenic' }
    ]
  },
  {
    id: 'santorini-greece',
    city: 'Santorini & Cyclades',
    country: 'Greece',
    tagline: 'Whitewashed Cliffside Villages, Cobalt Blue Domes, and World-Famous Caldera Sunsets',
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80'
    ],
    vibe: ['Romantic', 'Cliffside Views', 'Wine Tasting', 'Luxury Island'],
    region: 'Europe',
    budgetTier: 'luxury',
    avgDailyCostUSD: 220,
    idealDurationDays: 4,
    popularityRank: 13,
    rating: 4.9,
    reviewCount: 21500,
    breakdownUSD: {
      stayUSD: 125,
      foodUSD: 55,
      transitUSD: 18,
      activitiesUSD: 22
    },
    bestMonths: 'May - October (Sun & Warm Waters)',
    flightTimeFromMajorHubs: '8-13 hrs',
    highlights: ['Oia Blue Domes Sunset Point', 'Caldera Catamaran Cruise & Hot Springs', 'Akrotiri Prehistoric Bronze Age Ruins', 'Red Beach & Perissa Black Sand'],
    topAttractions: [
      { name: 'Caldera Sunset Catamaran Cruise + Greek Meal', estimatedPriceUSD: 75, free: false, category: 'Boat Tour' },
      { name: 'Akrotiri Minoan Archaeological Site', estimatedPriceUSD: 14, free: false, category: 'Archaeology' },
      { name: 'Fira to Oia Cliffside Coastal Hike (10km)', estimatedPriceUSD: 0, free: true, category: 'Scenic Hike' },
      { name: 'Santorini Volcanic Vineyard Wine Tasting', estimatedPriceUSD: 25, free: false, category: 'Food & Wine' }
    ]
  },
  {
    id: 'new-york-usa',
    city: 'New York City',
    country: 'USA',
    tagline: 'The City That Never Sleeps: World-Famous Broadway, Iconic Skylines & Central Park',
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=800&q=80'
    ],
    vibe: ['Metropolitan', 'Broadway & Shows', 'Museums', 'Iconic Skyline'],
    region: 'Americas',
    budgetTier: 'luxury',
    avgDailyCostUSD: 250,
    idealDurationDays: 5,
    popularityRank: 14,
    rating: 4.8,
    reviewCount: 35400,
    breakdownUSD: {
      stayUSD: 140,
      foodUSD: 65,
      transitUSD: 15,
      activitiesUSD: 30
    },
    bestMonths: 'Sept - Nov, April - June',
    flightTimeFromMajorHubs: 'Domestic / 6-12 hrs',
    highlights: ['Central Park & The High Line', 'Summit One Vanderbilt Glass Observation', 'Metropolitan Museum of Art (The Met)', 'Brooklyn Bridge Sunset Walk'],
    topAttractions: [
      { name: 'Summit One Vanderbilt Immersive Observation', estimatedPriceUSD: 42, free: false, category: 'Skyline' },
      { name: 'The Metropolitan Museum of Art (The Met)', estimatedPriceUSD: 30, free: false, category: 'World Museum' },
      { name: 'Statue of Liberty & Ellis Island Ferry', estimatedPriceUSD: 24, free: false, category: 'Historic Landmark' },
      { name: 'High Line Elevated Park & Hudson Yards', estimatedPriceUSD: 0, free: true, category: 'Urban Walk' }
    ]
  },
  {
    id: 'kerala-india',
    city: 'Kerala (Munnar & Alleppey)',
    country: 'India',
    tagline: 'God’s Own Country: Rolling Tea Gardens, Backwater Houseboats & Ayurvedic Healing',
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=800&q=80'
    ],
    vibe: ['Backwaters', 'Tea Hills', 'Ayurveda & Spa', 'Budget-Friendly'],
    region: 'Asia',
    budgetTier: 'budget',
    avgDailyCostUSD: 40,
    idealDurationDays: 5,
    popularityRank: 15,
    rating: 4.8,
    reviewCount: 16900,
    breakdownUSD: {
      stayUSD: 20,
      foodUSD: 10,
      transitUSD: 5,
      activitiesUSD: 5
    },
    bestMonths: 'September - March (Post-monsoon lush hills)',
    flightTimeFromMajorHubs: 'Domestic / 2-5 hrs',
    highlights: ['Alleppey Private Houseboat Cruise', 'Munnar Kolukkumalai Sunrise Tea Trek', 'Eravikulam National Park (Nilgiri Tahr)', 'Fort Kochi Chinese Fishing Nets'],
    topAttractions: [
      { name: 'Alleppey Traditional Day Houseboat Cruise', estimatedPriceUSD: 35, free: false, category: 'Backwaters' },
      { name: 'Eravikulam National Park Safari', estimatedPriceUSD: 5, free: false, category: 'Wildlife & Nature' },
      { name: 'Tata Tea Museum & Tasting Tour', estimatedPriceUSD: 2, free: false, category: 'Culture' },
      { name: 'Fort Kochi Heritage Walk & Fishing Nets', estimatedPriceUSD: 0, free: true, category: 'Coastal Heritage' }
    ]
  },
  {
    id: 'prague-czech',
    city: 'Prague',
    country: 'Czech Republic',
    tagline: 'The City of a Hundred Spires: Gothic Castles, Cobblestone Alleys & Czech Pilsner',
    imageUrl: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1458668383970-8ddd3927deed?auto=format&fit=crop&w=800&q=80'
    ],
    vibe: ['Fairytale Architecture', 'Gothic Heritage', 'Breweries', 'Budget-Friendly'],
    region: 'Europe',
    budgetTier: 'budget',
    avgDailyCostUSD: 68,
    idealDurationDays: 4,
    popularityRank: 16,
    rating: 4.8,
    reviewCount: 18700,
    breakdownUSD: {
      stayUSD: 35,
      foodUSD: 20,
      transitUSD: 5,
      activitiesUSD: 8
    },
    bestMonths: 'May - June, Sept - Oct',
    flightTimeFromMajorHubs: '8-12 hrs',
    highlights: ['Charles Bridge Dawn Walk', 'Prague Castle Complex & St. Vitus Cathedral', 'Old Town Square & Astronomical Clock', 'Petřín Lookout Tower Panorama'],
    topAttractions: [
      { name: 'Prague Castle Circuit (St. Vitus, Golden Lane)', estimatedPriceUSD: 12, free: false, category: 'Gothic Castle' },
      { name: 'Charles Bridge & Historic Statues', estimatedPriceUSD: 0, free: true, category: 'Landmark' },
      { name: 'Astronomical Clock Tower View', estimatedPriceUSD: 8, free: false, category: 'Clock Tower' },
      { name: 'Vltava River Paddle Boat Rental', estimatedPriceUSD: 10, free: false, category: 'River Leisure' }
    ]
  },
  {
    id: 'singapore',
    city: 'Singapore',
    country: 'Singapore',
    tagline: 'A Garden City in the Clouds: Supertree Groves, Michelin Hawker Centres & Marina Bay',
    imageUrl: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1506351421178-63b52a2d2562?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=800&q=80'
    ],
    vibe: ['Garden City', 'Futuristic Architecture', 'Hawker Food', 'Safe & Clean'],
    region: 'Asia',
    budgetTier: 'moderate',
    avgDailyCostUSD: 135,
    idealDurationDays: 4,
    popularityRank: 17,
    rating: 4.9,
    reviewCount: 27100,
    breakdownUSD: {
      stayUSD: 75,
      foodUSD: 35,
      transitUSD: 10,
      activitiesUSD: 15
    },
    bestMonths: 'All Year Round (Tropical Warmth)',
    flightTimeFromMajorHubs: '4-10 hrs',
    highlights: ['Gardens by the Bay Supertrees & Flower Dome', 'Marina Bay Sands SkyPark 57th Floor', 'Sentosa Island Cable Car & Beaches', 'Chinatown & Maxwell Hawker Feast'],
    topAttractions: [
      { name: 'Gardens by the Bay (Cloud Forest + Flower Dome)', estimatedPriceUSD: 24, free: false, category: 'Botanical Wonder' },
      { name: 'Marina Bay Sands SkyPark Observation Deck', estimatedPriceUSD: 22, free: false, category: 'Views' },
      { name: 'Jewel Changi HSBC Rain Vortex & Canopy', estimatedPriceUSD: 0, free: true, category: 'Architecture' },
      { name: 'Supertree Light & Sound Show (Garden Rhapsody)', estimatedPriceUSD: 0, free: true, category: 'Light Show' }
    ]
  },
  {
    id: 'cairo-egypt',
    city: 'Cairo & Giza',
    country: 'Egypt',
    tagline: '5,000 Years of Wonder: The Great Pyramids, Sphinx, and the Grand Egyptian Museum',
    imageUrl: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=1200&q=80',
    secondaryImages: [
      'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=800&q=80'
    ],
    vibe: ['Ancient Civilizations', 'Pyramids', 'Bazaars', 'Budget-Friendly'],
    region: 'Africa',
    budgetTier: 'budget',
    avgDailyCostUSD: 44,
    idealDurationDays: 4,
    popularityRank: 18,
    rating: 4.7,
    reviewCount: 19400,
    breakdownUSD: {
      stayUSD: 22,
      foodUSD: 12,
      transitUSD: 4,
      activitiesUSD: 6
    },
    bestMonths: 'October - April (Mild Egyptian Winter)',
    flightTimeFromMajorHubs: '6-11 hrs',
    highlights: ['The Great Pyramids of Giza & Sphinx', 'Grand Egyptian Museum Tutankhamun Treasures', 'Khan el-Khalili 14th Century Bazaar', 'Nile River Traditional Sunset Felucca Sail'],
    topAttractions: [
      { name: 'Giza Pyramids & Sphinx Plateau Entry', estimatedPriceUSD: 12, free: false, category: 'Wonder of World' },
      { name: 'Grand Egyptian Museum Entry', estimatedPriceUSD: 18, free: false, category: 'Museum' },
      { name: 'Nile Felucca 1-Hour Sunset Sail', estimatedPriceUSD: 8, free: false, category: 'River Leisure' },
      { name: 'Khan el-Khalili Historic Spice Market Walk', estimatedPriceUSD: 0, free: true, category: 'Bazaar' }
    ]
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
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', rateToUSD: 86.5 },
  { code: 'USD', symbol: '$', name: 'US Dollar', rateToUSD: 1 },
  { code: 'EUR', symbol: '€', name: 'Euro', rateToUSD: 0.92 },
  { code: 'GBP', symbol: '£', name: 'British Pound', rateToUSD: 0.79 },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rateToUSD: 152 },
  { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar', rateToUSD: 1.38 },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rateToUSD: 1.54 },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', rateToUSD: 1.34 },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', rateToUSD: 0.88 },
];

