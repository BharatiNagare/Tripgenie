import { Itinerary } from '../types';

export const SAMPLE_ITINERARY_TOKYO: Itinerary = {
  id: 'demo-tokyo-5day',
  createdAt: new Date().toISOString(),
  preferences: {
    destination: 'Tokyo, Japan',
    sourceCity: 'San Francisco, USA',
    durationDays: 5,
    groupType: 'couple',
    budgetTier: 'moderate',
    targetBudgetAmount: 1800,
    currency: 'USD',
    pace: 'balanced',
    interests: ['culture', 'foodie', 'photography', 'nature'],
    dietaryRestrictions: [],
    accommodationPreference: 'Boutique Hotel in Shinjuku / Shibuya',
    transportPreference: 'Public Metro & JR Pass',
    promptStrategy: 'balanced',
    creativityLevel: 0.7
  },
  title: 'Neon Horizons & Ancient Tranquility: The 5-Day Tokyo Odyssey',
  tagline: 'From serene Meiji shrines and Michelin ramen alleys to cyber-punk Shibuya nightscapes',
  destination: 'Tokyo',
  country: 'Japan',
  heroImageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=85',
  summary: 'A meticulously balanced 5-day cultural and culinary expedition through Tokyo. Experience morning tea rituals in historic Asakusa, futuristic digital art in Toyosu, panoramic views from Shibuya Sky, and authentic izakaya alleyways in Omoide Yokocho.',
  totalEstimatedCost: 1720,
  currency: 'USD',
  days: [
    {
      dayNumber: 1,
      title: 'Day 1: Modern Icons & Electric Shibuya',
      theme: 'City Lights, High-Altitude Vistas & Vibrant Crossings',
      dailyMealRecommendations: {
        breakfast: 'Fluffy Soufflé Pancakes at A Happy Pancake Omotesando',
        lunch: 'Tonkatsu Maisen Aoyama (crispy Berkshire pork cutlet)',
        dinner: 'Torikizoku or artisanal yakitori in Shibuya Nonbei Yokocho'
      },
      dailyTransportTip: 'Use a digital Suica or Pasmo card on your phone for seamless tap-and-go subway transit.',
      estimatedDayCost: 140,
      activities: [
        {
          id: 'act-1-1',
          timeSlot: 'Morning',
          timeRange: '09:30 AM - 11:45 AM',
          title: 'Meiji Jingu Shrine & Harajuku Green Canopy',
          description: 'Walk through the 170-acre sacred evergreen forest surrounding Tokyo’s most iconic Shinto shrine. Admire the giant cedar Torii gates and the wall of decorative sake barrels.',
          location: '1-1 Yoyogikamizonocyo, Shibuya City, Tokyo',
          estimatedCost: 0,
          durationMinutes: 135,
          category: 'Culture & History',
          insiderTip: 'Write an Ema wooden prayer plaque and look out for traditional Shinto wedding processions.',
          bestTimeToVisit: 'Early morning before tour groups arrive',
          coordinates: { lat: 35.6764, lng: 139.6993 }
        },
        {
          id: 'act-1-2',
          timeSlot: 'Afternoon',
          timeRange: '01:30 PM - 04:00 PM',
          title: 'Takeshita Street & Omotesando Architectural Walk',
          description: 'Explore trendy pop-culture boutiques, rainbow cotton candy vendors, and high-fashion tree-lined boulevards designed by Tadao Ando and SANAA.',
          location: 'Jingumae, Shibuya City, Tokyo',
          estimatedCost: 35,
          durationMinutes: 150,
          category: 'Shopping',
          insiderTip: 'Duck into Cat Street for quieter indie coffee shops like Roastery by Nozy Coffee.',
          coordinates: { lat: 35.6702, lng: 139.7027 }
        },
        {
          id: 'act-1-3',
          timeSlot: 'Evening',
          timeRange: '05:30 PM - 07:30 PM',
          title: 'Shibuya Crossing & 360° Sunset from Shibuya Sky',
          description: 'Stand atop the 229m open-air rooftop observation deck overlooking Mount Fuji at sunset and the world’s busiest pedestrian crossing.',
          location: 'Shibuya Scramble Square, 2-24-12 Shibuya',
          estimatedCost: 22,
          durationMinutes: 120,
          category: 'Photography & Views',
          insiderTip: 'Book the sunset entry slot online 4 weeks in advance; bring a camera strap (loose items prohibited on roof).',
          bookingRequired: true,
          coordinates: { lat: 35.6580, lng: 139.7016 }
        },
        {
          id: 'act-1-4',
          timeSlot: 'Night',
          timeRange: '08:15 PM - 10:30 PM',
          title: 'Nonbei Yokocho (Drunkard’s Alley) Izakaya Crawl',
          description: 'Atmospheric post-war lantern-lit lantern alley right beside the train tracks with tiny 6-seat pubs serving smoky skewers and draft beer.',
          location: '1-25-10 Shibuya, Shibuya City',
          estimatedCost: 45,
          durationMinutes: 135,
          category: 'Food & Drink',
          insiderTip: 'Order Negima (chicken & leek) and highballs; carry cash as most stalls do not take cards.',
          coordinates: { lat: 35.6601, lng: 139.7021 }
        }
      ]
    },
    {
      dayNumber: 2,
      title: 'Day 2: Old Edo Heritage & Digital Immersions',
      theme: 'Ancient Shrines, Sumo District & Futuristic Light Installations',
      dailyMealRecommendations: {
        breakfast: 'Fresh Onigiri at Asakusa Yadoroku (Tokyo’s oldest onigiri shop)',
        lunch: 'Soba Noodles with crispy tempura at Namiki Yabusoba',
        dinner: 'Fresh sashimi & grilled wagyu near Toyosu Waterfront'
      },
      dailyTransportTip: 'Take the scenic Tokyo Water Bus (Himiko boat) from Asakusa to Odaiba for great skyline views.',
      estimatedDayCost: 165,
      activities: [
        {
          id: 'act-2-1',
          timeSlot: 'Morning',
          timeRange: '08:30 AM - 11:30 AM',
          title: 'Sensō-ji Temple & Nakamise Dori Street Market',
          description: 'Tokyo’s oldest Buddhist temple founded in 645 AD. Walk beneath the giant red Kaminarimon (Thunder Gate) lantern and sample warm ningyo-yaki bean cakes.',
          location: '2-3-1 Asakusa, Taito City, Tokyo',
          estimatedCost: 15,
          durationMinutes: 180,
          category: 'Culture & History',
          insiderTip: 'Draw an Omikuji fortune stick near the main hall; if you get bad luck, tie it to the metal wire rack.',
          coordinates: { lat: 35.7148, lng: 139.7967 }
        },
        {
          id: 'act-2-2',
          timeSlot: 'Afternoon',
          timeRange: '01:30 PM - 04:30 PM',
          title: 'teamLab Planets: Walk-in Water & Crystal Light Universe',
          description: 'A mind-bending museum where visitors wade through water barefoot and become one with infinite floral crystal projections and floating orchids.',
          location: '6-1-16 Toyosu, Koto City, Tokyo',
          estimatedCost: 38,
          durationMinutes: 180,
          category: 'Sightseeing',
          insiderTip: 'Wear shorts or pants that easily roll above the knees since water reaches calf-height.',
          bookingRequired: true,
          coordinates: { lat: 35.6517, lng: 139.7964 }
        },
        {
          id: 'act-2-3',
          timeSlot: 'Evening',
          timeRange: '06:00 PM - 08:30 PM',
          title: 'Odaiba Seaside Park & Life-Size Unicorn Gundam',
          description: 'Watch Tokyo Bay sparkle at dusk with the Rainbow Bridge and Tokyo Tower illuminated. Catch the Gundam statue transformation show at 7:00 PM.',
          location: '1-4 Daiba, Minato City, Tokyo',
          estimatedCost: 0,
          durationMinutes: 150,
          category: 'Photography & Views',
          insiderTip: 'Sit on the steps of Aqua City for an unobstructed panoramic shot of Tokyo Bay at blue hour.',
          coordinates: { lat: 35.6277, lng: 139.7744 }
        }
      ]
    },
    {
      dayNumber: 3,
      title: 'Day 3: Culinary Crossroads & Shinjuku Neon Night',
      theme: 'Fresh Seafood, Imperial Gardens & Golden Gai Alleyways',
      dailyMealRecommendations: {
        breakfast: 'Tamagoyaki (sweet egg omelet) and tuna bowls at Tsukiji Outer Market',
        lunch: 'Michelin Bib Gourmand Ramen at Konjiki Hototogisu (clam dashi broth)',
        dinner: 'Charcoal Yakitori and craft sake in Shinjuku Golden Gai'
      },
      dailyTransportTip: 'The Tokyo Metro Marunouchi Line directly connects Ginza and Shinjuku in 15 minutes.',
      estimatedDayCost: 155,
      activities: [
        {
          id: 'act-3-1',
          timeSlot: 'Morning',
          timeRange: '08:00 AM - 11:00 AM',
          title: 'Tsukiji Outer Market Gourmet Food Tasting Tour',
          description: 'Wander lively narrow market lanes packed with knife makers, fresh sea urchin, wagyu beef skewers, and freshly torch-seared scallops.',
          location: '4-16-2 Tsukiji, Chuo City, Tokyo',
          estimatedCost: 40,
          durationMinutes: 180,
          category: 'Food & Drink',
          insiderTip: 'Bring 100-yen and 500-yen coins for quick street food purchases.',
          coordinates: { lat: 35.6655, lng: 139.7708 }
        },
        {
          id: 'act-3-2',
          timeSlot: 'Afternoon',
          timeRange: '01:00 PM - 03:30 PM',
          title: 'Shinjuku Gyoen National Garden & Traditional Teahouse',
          description: 'A 144-acre oasis blending traditional Japanese, English Landscape, and French Formal garden styles with serene koi ponds and cherry canopies.',
          location: '11 Naitomachi, Shinjuku City, Tokyo',
          estimatedCost: 5,
          durationMinutes: 150,
          category: 'Adventure & Nature',
          insiderTip: 'Visit the Rakuu-tei teahouse inside the Japanese garden for matcha and seasonal wagashi sweets.',
          coordinates: { lat: 35.6852, lng: 139.7101 }
        },
        {
          id: 'act-3-3',
          timeSlot: 'Evening',
          timeRange: '05:30 PM - 07:30 PM',
          title: 'Tokyo Metropolitan Government Building Observation Deck',
          description: 'Ascend to the 45th floor of Kenzo Tange’s landmark tower for sweeping free twilight views across the endless Tokyo sprawl.',
          location: '2-8-1 Nishishinjuku, Shinjuku City',
          estimatedCost: 0,
          durationMinutes: 120,
          category: 'Sightseeing',
          insiderTip: 'Look westward on clear evenings to see Mount Fuji framed against the twilight purple sky.',
          coordinates: { lat: 35.6896, lng: 139.6921 }
        },
        {
          id: 'act-3-4',
          timeSlot: 'Night',
          timeRange: '08:00 PM - 11:00 PM',
          title: 'Omoide Yokocho & Golden Gai Historic Bar Quarters',
          description: 'Immerse in the moody retro atmosphere of 200 tiny themed bars packed into six narrow pedestrian passageways.',
          location: '1-1-6 Kabukicho, Shinjuku City',
          estimatedCost: 50,
          durationMinutes: 180,
          category: 'Nightlife',
          insiderTip: 'Look for bars with signs reading "No Cover Charge" or "English Menu Welcome" before entering.',
          coordinates: { lat: 35.6938, lng: 139.7028 }
        }
      ]
    },
    {
      dayNumber: 4,
      title: 'Day 4: Akihabara Subculture & Imperial Splendor',
      theme: 'Anime, Retro Gaming, Electronics & Ginza Elegance',
      dailyMealRecommendations: {
        breakfast: 'Artisan Bakery goods and pour-over coffee at Fuglen Asakusa',
        lunch: 'Tonkatsu Marugo in Akihabara (legendary thick cutlets)',
        dinner: 'Sukiyaki or Kaiseki course in Ginza 6 District'
      },
      dailyTransportTip: 'The Yamanote line circular loop is the fastest way between Akihabara, Tokyo Station, and Ginza.',
      estimatedDayCost: 180,
      activities: [
        {
          id: 'act-4-1',
          timeSlot: 'Morning',
          timeRange: '09:00 AM - 11:30 AM',
          title: 'Imperial Palace East Gardens & Nijubashi Bridge',
          description: 'Stroll the massive stone ramparts and historic moats of the former Edo Castle, surrounded by ancient pine bonsai and manicured lawns.',
          location: '1-1 Chiyoda, Chiyoda City, Tokyo',
          estimatedCost: 0,
          durationMinutes: 150,
          category: 'Culture & History',
          insiderTip: 'Check the Ninomaru Garden to see flowering irises and tranquil stone reflections.',
          coordinates: { lat: 35.6852, lng: 139.7528 }
        },
        {
          id: 'act-4-2',
          timeSlot: 'Afternoon',
          timeRange: '01:00 PM - 04:30 PM',
          title: 'Akihabara Electric Town & Retro Gaming Nostalgia',
          description: 'Explore multi-story tech havens like Yodobashi-Akiba, retro game archives at Super Potato, and gachapon capsule toy arcades.',
          location: 'Sotokanda, Chiyoda City, Tokyo',
          estimatedCost: 35,
          durationMinutes: 210,
          category: 'Sightseeing',
          insiderTip: 'Head to Radio Kaikan for 10 floors of collectible miniatures, anime art, and pop souvenirs.',
          coordinates: { lat: 35.6983, lng: 139.7713 }
        },
        {
          id: 'act-4-3',
          timeSlot: 'Evening',
          timeRange: '06:00 PM - 09:30 PM',
          title: 'Ginza Luxury Boulevard & Art Gallery Explorations',
          description: 'Window-shop along world-famous Ginza street, visit the 12-floor Itoya stationery wonderland, and admire luxury flagship architecture.',
          location: 'Ginza, Chuo City, Tokyo',
          estimatedCost: 60,
          durationMinutes: 210,
          category: 'Shopping',
          insiderTip: 'On weekend afternoons, the main Chuo Dori street is closed to vehicles and transformed into a pedestrian promenade.',
          coordinates: { lat: 35.6719, lng: 139.7648 }
        }
      ]
    },
    {
      dayNumber: 5,
      title: 'Day 5: Artistic Shimokitazawa & Farewell Sunset',
      theme: 'Bohemian Vintage Boutiques, Craft Coffee & Roppongi Hills',
      dailyMealRecommendations: {
        breakfast: 'Single-origin drip coffee and avocado toast at Bear Pond Espresso',
        lunch: 'Japanese Soup Curry at Magic Spice Shimokitazawa',
        dinner: 'Rooftop dining with Tokyo Tower view at Roppongi Mori Tower'
      },
      dailyTransportTip: 'The Odakyu line takes just 7 minutes from Shinjuku to Shimokitazawa.',
      estimatedDayCost: 145,
      activities: [
        {
          id: 'act-5-1',
          timeSlot: 'Morning',
          timeRange: '10:00 AM - 01:00 PM',
          title: 'Shimokitazawa Vintage Thrift & Indie Record Stroll',
          description: 'Tokyo’s hipster capital, famous for curated 80s/90s vintage clothing shops, indie vinyl stores, and relaxed pocket parks.',
          location: 'Kitazawa, Setagaya City, Tokyo',
          estimatedCost: 40,
          durationMinutes: 180,
          category: 'Shopping',
          insiderTip: 'Visit Reload Shimokitazawa, a modular pedestrian shopping lane with artisanal tea and craft bookstores.',
          coordinates: { lat: 35.6617, lng: 139.6672 }
        },
        {
          id: 'act-5-2',
          timeSlot: 'Afternoon',
          timeRange: '02:30 PM - 05:00 PM',
          title: 'Nezu Museum & Hidden Bamboo Garden',
          description: 'A private museum showcasing pre-modern Japanese and East Asian art, featuring a sublime traditional stroll garden with mossy stone lanterns.',
          location: '6-5-1 Minamiaoyama, Minato City',
          estimatedCost: 14,
          durationMinutes: 150,
          category: 'Culture & History',
          insiderTip: 'The museum cafe has floor-to-ceiling glass windows overlooking the Japanese garden.',
          coordinates: { lat: 35.6622, lng: 139.7188 }
        },
        {
          id: 'act-5-3',
          timeSlot: 'Evening',
          timeRange: '06:00 PM - 09:00 PM',
          title: 'Mori Art Museum & Tokyo City View at Roppongi Hills',
          description: 'Finish your Tokyo journey gazing at the glowing red Eiffel-inspired Tokyo Tower from the 52nd-floor glass observation deck.',
          location: '6-10-1 Roppongi, Minato City',
          estimatedCost: 20,
          durationMinutes: 180,
          category: 'Photography & Views',
          insiderTip: 'Admission to the observation deck includes entry to the world-class Mori Contemporary Art Museum.',
          bookingRequired: true,
          coordinates: { lat: 35.6596, lng: 139.7297 }
        }
      ]
    }
  ],
  budgetBreakdown: [
    {
      category: 'Accommodation',
      amount: 750,
      percentage: 43.6,
      notes: '4 nights at 3.5★ Boutique Hotel in Shinjuku/Shibuya (~$187/night)'
    },
    {
      category: 'Food & Dining',
      amount: 460,
      percentage: 26.7,
      notes: 'Street food, matcha, mid-tier ramen/sushi dinners, and casual izakaya nights'
    },
    {
      category: 'Activities & Entry',
      amount: 210,
      percentage: 12.2,
      notes: 'Shibuya Sky, teamLab Planets, Nezu Museum, Mori Art Museum, Roppongi observation'
    },
    {
      category: 'Local Transportation',
      amount: 120,
      percentage: 7.0,
      notes: 'Tokyo Metro 72hr passes + Suica reload for JR lines and airport Keisei Skyliner'
    },
    {
      category: 'Contingency / Misc',
      amount: 180,
      percentage: 10.5,
      notes: 'Pocket Wi-Fi / eSIM, coin lockers, snacks, and souvenir shopping'
    }
  ],
  packingList: [
    { id: 'p1', item: 'Passport & Photocopies + Digital Backup', category: 'Essentials & Docs', packed: false, reason: 'Legally required to carry passport in Japan' },
    { id: 'p2', item: 'Japan Rail Pass / Digital Suica on Apple/Google Wallet', category: 'Essentials & Docs', packed: false, reason: 'Seamless tap transit' },
    { id: 'p3', item: 'Slip-on Walking Shoes (15k-20k steps/day)', category: 'Clothing & Footwear', packed: false, reason: 'Frequent temple & tatami shoe removal' },
    { id: 'p4', item: 'Layered breathable jacket & rain poncho', category: 'Clothing & Footwear', packed: false, reason: 'Sudden coastal showers and air conditioned transit' },
    { id: 'p5', item: 'High-Capacity Power Bank (10,000mAh+)', category: 'Electronics & Tech', packed: false, reason: 'GPS maps and translation deplete battery quickly' },
    { id: 'p6', item: 'Universal Type-A 2-prong power adapter', category: 'Electronics & Tech', packed: false, reason: 'Japan standard ungrounded outlets' },
    { id: 'p7', item: 'Small hand towel / handkerchief', category: 'Toiletries & Health', packed: false, reason: 'Many public restrooms do not provide paper hand towels' },
    { id: 'p8', item: 'Small coin purse / wallet', category: 'Destination Specific', packed: false, reason: 'Japan still heavily uses 100¥ and 500¥ coins' },
    { id: 'p9', item: 'Hand sanitizer & pocket tissues', category: 'Toiletries & Health', packed: false, reason: 'Convenience stores give them out, handy on go' }
  ],
  localGuide: {
    bestSeason: 'Spring (Cherry Blossoms late March - early April) & Autumn (Ginkgo foliage late Oct - Nov)',
    weatherSummary: 'Mild and pleasant in spring/autumn (15°C - 22°C), humid in summer (28°C - 33°C)',
    averageTemp: '18°C (64°F)',
    currencyName: 'Japanese Yen',
    currencyCode: 'JPY',
    safetyScore: 9.8,
    safetyTips: [
      'Tokyo is one of the safest megacities in the world; solo night walking is generally very safe.',
      'Always keep small cash for street stalls and vending machines.',
      'Emergency numbers: 110 (Police), 119 (Ambulance/Fire).'
    ],
    culturalEtiquette: {
      dos: [
        'Stand on the left of escalators in Tokyo (right in Osaka) to let walkers pass.',
        'Carry a small bag for your garbage, as public street bins are rare.',
        'Use both hands when handing over credit cards or cash trays at registers.',
        'Quietly silence your mobile phone on trains and subways.'
      ],
      donts: [
        'Do NOT leave tips at restaurants — exceptional service is already standard and tipping can cause confusion.',
        'Do NOT walk while eating street food; finish it near the vendor or in a designated eating zone.',
        'Do NOT stick chopsticks vertically into a bowl of rice (associated with funeral rituals).'
      ]
    },
    emergencyNumbers: {
      police: '110',
      ambulance: '119',
      general: '03-3501-0110 (Japan Helpline / English)'
    },
    keyPhrases: [
      { phrase: 'Arigatou Gozaimasu', translation: 'Thank you very much', pronunciation: 'ah-ree-GAH-toh go-zye-MAHS', context: 'Universal polite gratitude' },
      { phrase: 'Sumimasen', translation: 'Excuse me / Sorry', pronunciation: 'soo-mee-MAH-sen', context: 'Calling a waiter or squeezing past crowd' },
      { phrase: 'Kore o kudasai', translation: 'Please give me this', pronunciation: 'KOH-reh oh koo-dah-SYE', context: 'Ordering by pointing at menu' },
      { phrase: 'O-kaikei onegaishimasu', translation: 'Check/Bill please', pronunciation: 'oh-kye-kay oh-neh-guy-shee-mahs', context: 'Paying at restaurants' },
      { phrase: 'Eigo ga hanasemasu ka?', translation: 'Do you speak English?', pronunciation: 'AY-goh gah hah-nah-seh-mahs kah', context: 'Asking for language assistance' }
    ],
    topLocalFoods: [
      { name: 'Tonkotsu / Shoyu Ramen', description: 'Rich pork bone broth or delicate soy broth served with springy noodles, chashu, and ajitsuke tamago.', mustTryPlace: 'Fuunji (Shinjuku) or Rokurinsha' },
      { name: 'Nigiri Sushi & Sashimi', description: 'Fresh seasonal fish from Toyosu market draped over warm seasoned vinegared rice.', mustTryPlace: 'Sushizanmai or Tsukiji Outer Market' },
      { name: 'Yakitori Skewers', description: 'Charcoal-grilled chicken skewers seasoned with coarse sea salt (shio) or rich savory glaze (tare).', mustTryPlace: 'Omoide Yokocho' },
      { name: 'Matcha Parfait & Wagashi', description: 'Earthy green tea soft serve with red bean paste, dango mochi, and puffed rice crisps.', mustTryPlace: 'Nana’s Green Tea or Asakusa Chacha Kobo' }
    ]
  },
  promptMetrics: {
    promptUsed: 'Generate a 5-day structured travel itinerary for a couple visiting Tokyo, Japan with moderate budget and balanced pace. Include day-by-day morning/afternoon/evening slots, localized cuisine, transit tips, realistic budget breakdown, packing list, and cultural guide.',
    systemInstructionUsed: 'You are TripGenie Master Travel AI. Apply Chain-of-Thought planning to ensure geographically grouped activities, transit feasibility, local cultural nuances, and strict JSON schema conformance.',
    model: 'gemini-3.7-flash',
    temperature: 0.7,
    responseTokensEstimate: 2450,
    generationLatencyMs: 1420,
    techniquesUsed: [
      'Role-Based Persona Framing (Master Travel Curator)',
      'Few-Shot Geocoding & Geographic Cluster Optimization',
      'Chain-of-Thought (CoT) Feasibility Reasoning',
      'Strict JSON Schema Enforcement via @google/genai Type.OBJECT',
      'Dynamic Budget Balancing Formula'
    ]
  }
};
