import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy initializer for Gemini client
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not set in environment.");
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Unsplash fallback high-res destination images
const DESTINATION_IMAGES: Record<string, string> = {
  tokyo: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=85",
  japan: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=85",
  paris: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=85",
  france: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=85",
  bali: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=85",
  indonesia: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=85",
  rome: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1600&q=85",
  italy: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1600&q=85",
  kyoto: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=85",
  barcelona: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1600&q=85",
  spain: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1600&q=85",
  switzerland: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1600&q=85",
  interlaken: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1600&q=85",
  newyork: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1600&q=85",
  usa: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1600&q=85",
  london: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=85",
  dubai: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=85",
  singapore: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1600&q=85",
  default: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=85",
};

function getHeroImageForDestination(dest: string): string {
  const clean = dest.toLowerCase().replace(/[^a-z]/g, "");
  for (const [key, url] of Object.entries(DESTINATION_IMAGES)) {
    if (clean.includes(key)) return url;
  }
  return DESTINATION_IMAGES.default;
}

// 1. Health Check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    geminiConfigured: !!process.env.GEMINI_API_KEY,
  });
});

// 2. Generate Full Travel Plan Itinerary
app.post("/api/generate-itinerary", async (req, res) => {
  const startTime = Date.now();
  const preferences = req.body;

  const destination = preferences.destination || "Tokyo, Japan";
  const durationDays = Number(preferences.durationDays) || 3;
  const budgetTier = preferences.budgetTier || "moderate";
  const currency = preferences.currency || "USD";
  const groupType = preferences.groupType || "couple";
  const pace = preferences.pace || "balanced";
  const interests = (preferences.interests || ["culture", "foodie", "sightseeing"]).join(", ");
  const dietary = (preferences.dietaryRestrictions || []).join(", ") || "None";
  const specialRequests = preferences.specialRequests || "None";
  const promptStrategy = preferences.promptStrategy || "balanced";
  const temperature = Number(preferences.creativityLevel) || 0.7;

  const systemInstruction = `You are TripGenie, an expert AI Travel Planner, Geographer, and Master Concierge.
Your mission is to generate an authentic, realistic, geographically optimized day-by-day travel itinerary.
Core Principles:
1. GEOGRAPHIC CLUSTERING: Group morning, afternoon, and evening activities in nearby neighborhoods to minimize transit waste.
2. REALISTIC PACING: Match the requested pace ('relaxed' = 2-3 activities/day, 'balanced' = 3-4 activities/day, 'fast-paced' = 4-5 activities/day).
3. BUDGET REALISM: Reflect realistic costs in ${currency} matching the ${budgetTier} budget tier for a ${groupType} travel party.
4. SPECIFICITY: Mention exact venue names, dish names, viewpoints, and practical insider tips (e.g. advance reservations, dress codes, best photo spots).
5. STRUCTURED JSON: Respond strictly with the required JSON structure.`;

  const userPrompt = `Create an exhaustive, high-detail ${durationDays}-day travel itinerary for visiting ${destination}.
Travel details:
- Duration: ${durationDays} Days
- Travel Party: ${groupType}
- Budget Tier: ${budgetTier} (Currency: ${currency})
- Target Budget Amount: ${preferences.targetBudgetAmount ? `${preferences.targetBudgetAmount} ${currency}` : "Provide realistic estimation"}
- Preferred Pace: ${pace}
- Key Interests: ${interests}
- Dietary Preferences: ${dietary}
- Prompt Strategy Focus: ${promptStrategy}
- Special Notes / Constraints: ${specialRequests}

Make sure every single day from Day 1 to Day ${durationDays} has distinct morning, afternoon, and evening activities with realistic time ranges, real geographic locations with approximate latitude and longitude, insider tips, meal recommendations, a comprehensive itemized budget breakdown, a smart packing list, and an in-depth local cultural & safety guide.`;

  const ai = getGenAI();

  if (!ai) {
    return res.status(500).json({
      error: "Gemini API key is not configured.",
      details: "Please ensure GEMINI_API_KEY is defined in environment secrets.",
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Inspiring title for the trip" },
            tagline: { type: Type.STRING, description: "Short evocative summary tagline" },
            destination: { type: Type.STRING },
            country: { type: Type.STRING },
            summary: { type: Type.STRING, description: "Executive summary paragraph of this customized journey" },
            totalEstimatedCost: { type: Type.NUMBER, description: `Total estimated cost in ${currency}` },
            currency: { type: Type.STRING },
            days: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  dayNumber: { type: Type.INTEGER },
                  title: { type: Type.STRING },
                  theme: { type: Type.STRING },
                  dailyMealRecommendations: {
                    type: Type.OBJECT,
                    properties: {
                      breakfast: { type: Type.STRING },
                      lunch: { type: Type.STRING },
                      dinner: { type: Type.STRING },
                    },
                    required: ["breakfast", "lunch", "dinner"],
                  },
                  dailyTransportTip: { type: Type.STRING },
                  estimatedDayCost: { type: Type.NUMBER },
                  activities: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        id: { type: Type.STRING },
                        timeSlot: { type: Type.STRING, description: "Morning, Afternoon, Evening, or Night" },
                        timeRange: { type: Type.STRING, description: "e.g. 09:00 AM - 11:30 AM" },
                        title: { type: Type.STRING },
                        description: { type: Type.STRING },
                        location: { type: Type.STRING },
                        estimatedCost: { type: Type.NUMBER },
                        durationMinutes: { type: Type.NUMBER },
                        category: { type: Type.STRING, description: "Sightseeing, Food & Drink, Adventure & Nature, Culture & History, Relaxation, Nightlife, Shopping, or Transit" },
                        insiderTip: { type: Type.STRING },
                        bestTimeToVisit: { type: Type.STRING },
                        coordinates: {
                          type: Type.OBJECT,
                          properties: {
                            lat: { type: Type.NUMBER },
                            lng: { type: Type.NUMBER },
                          },
                        },
                        bookingRequired: { type: Type.BOOLEAN },
                      },
                      required: ["id", "timeSlot", "timeRange", "title", "description", "location", "estimatedCost", "durationMinutes", "category"],
                    },
                  },
                },
                required: ["dayNumber", "title", "theme", "activities", "dailyMealRecommendations", "dailyTransportTip", "estimatedDayCost"],
              },
            },
            budgetBreakdown: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING },
                  amount: { type: Type.NUMBER },
                  percentage: { type: Type.NUMBER },
                  notes: { type: Type.STRING },
                },
                required: ["category", "amount", "percentage", "notes"],
              },
            },
            packingList: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  item: { type: Type.STRING },
                  category: { type: Type.STRING },
                  packed: { type: Type.BOOLEAN },
                  reason: { type: Type.STRING },
                },
                required: ["id", "item", "category", "packed"],
              },
            },
            localGuide: {
              type: Type.OBJECT,
              properties: {
                bestSeason: { type: Type.STRING },
                weatherSummary: { type: Type.STRING },
                averageTemp: { type: Type.STRING },
                currencyName: { type: Type.STRING },
                currencyCode: { type: Type.STRING },
                safetyScore: { type: Type.NUMBER },
                safetyTips: { type: Type.ARRAY, items: { type: Type.STRING } },
                culturalEtiquette: {
                  type: Type.OBJECT,
                  properties: {
                    dos: { type: Type.ARRAY, items: { type: Type.STRING } },
                    donts: { type: Type.ARRAY, items: { type: Type.STRING } },
                  },
                  required: ["dos", "donts"],
                },
                emergencyNumbers: {
                  type: Type.OBJECT,
                  properties: {
                    police: { type: Type.STRING },
                    ambulance: { type: Type.STRING },
                    general: { type: Type.STRING },
                  },
                  required: ["police", "ambulance", "general"],
                },
                keyPhrases: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      phrase: { type: Type.STRING },
                      translation: { type: Type.STRING },
                      pronunciation: { type: Type.STRING },
                      context: { type: Type.STRING },
                    },
                    required: ["phrase", "translation", "pronunciation", "context"],
                  },
                },
                topLocalFoods: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      description: { type: Type.STRING },
                      mustTryPlace: { type: Type.STRING },
                    },
                    required: ["name", "description"],
                  },
                },
              },
              required: ["bestSeason", "weatherSummary", "averageTemp", "currencyName", "currencyCode", "safetyScore", "safetyTips", "culturalEtiquette", "emergencyNumbers", "keyPhrases", "topLocalFoods"],
            },
          },
          required: ["title", "tagline", "destination", "country", "summary", "totalEstimatedCost", "currency", "days", "budgetBreakdown", "packingList", "localGuide"],
        },
      },
    });

    const latency = Date.now() - startTime;
    const textOutput = response.text || "{}";
    const parsedData = JSON.parse(textOutput);

    // Attach hero image if not provided
    const heroImageUrl = getHeroImageForDestination(parsedData.destination || destination);

    const fullItinerary = {
      ...parsedData,
      id: `trip-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
      heroImageUrl,
      preferences,
      promptMetrics: {
        promptUsed: userPrompt,
        systemInstructionUsed: systemInstruction,
        model: "gemini-3.7-flash",
        temperature,
        responseTokensEstimate: Math.round(textOutput.length / 4),
        generationLatencyMs: latency,
        techniquesUsed: [
          "Role-Based System Instruction Framing",
          "Dynamic Context & Constraint Injection",
          "Strict Type.OBJECT JSON Schema Output Control",
          "Few-Shot Geographic & Chronological Clustering",
          "Prompt Strategy Modulation (" + promptStrategy + ")",
        ],
      },
    };

    res.json(fullItinerary);
  } catch (error: any) {
    console.error("Error generating itinerary via Gemini:", error);
    res.status(500).json({
      error: "Failed to generate AI itinerary",
      message: error?.message || "Unknown error occurred",
    });
  }
});

// 3. AI Concierge Real-Time Chat Assistant
app.post("/api/chat-concierge", async (req, res) => {
  const { message, itinerary, chatHistory } = req.body;

  const ai = getGenAI();
  if (!ai) {
    return res.status(500).json({
      error: "Gemini API key is not configured.",
    });
  }

  const tripContext = itinerary
    ? `Current Planned Trip:
- Destination: ${itinerary.destination}, ${itinerary.country}
- Duration: ${itinerary.days?.length} Days
- Travel Party: ${itinerary.preferences?.groupType || "Travelers"}
- Budget Tier: ${itinerary.preferences?.budgetTier || "Moderate"} (${itinerary.currency})
- Planned Days Themes: ${itinerary.days?.map((d: any) => `Day ${d.dayNumber}: ${d.title}`).join("; ")}
- Total Budget: ${itinerary.totalEstimatedCost} ${itinerary.currency}`
    : "No active itinerary loaded. General travel advice mode.";

  const systemInstruction = `You are the TripGenie Concierge, a warm, knowledgeable, world-class personal AI travel assistant.
You have instant recall of the traveler's active itinerary.
Respond helpfully, concisely, and actionable. Provide specific recommendations (names of local eateries, transit routes, dress code tips, translation help, or rainy day alternatives).
When relevant, offer 2-3 quick follow-up action prompts the user can tap next.`;

  try {
    const prompt = `Context:
${tripContext}

Conversation History:
${(chatHistory || [])
  .slice(-6)
  .map((m: any) => `${m.sender === "user" ? "Traveler" : "TripGenie"}: ${m.text}`)
  .join("\n")}

Traveler asks: "${message}"

Respond with a JSON object with:
- "reply": Markdown formatted string with your advice, including bold names and bullet points if appropriate.
- "quickActions": array of 2-3 objects with { "label": "Short button label", "actionPrompt": "User prompt when clicked" }`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reply: { type: Type.STRING },
            quickActions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING },
                  actionPrompt: { type: Type.STRING },
                },
                required: ["label", "actionPrompt"],
              },
            },
          },
          required: ["reply", "quickActions"],
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("Error in chat-concierge:", error);
    res.status(500).json({
      reply: `I'm currently unable to connect to the live AI service (${error?.message || "connection error"}). Here is general advice: for ${itinerary?.destination || "your destination"}, check local transport passes and verify open hours on Google Maps before heading out!`,
      quickActions: [
        { label: "Check Top Sights", actionPrompt: "What are the must-see sights?" },
        { label: "Best Local Foods", actionPrompt: "What local dishes should I try?" },
      ],
    });
  }
});

// 4. Swap Activity with AI Alternative
app.post("/api/swap-activity", async (req, res) => {
  const { currentActivity, dayTheme, destination, preferenceReason } = req.body;

  const ai = getGenAI();
  if (!ai) {
    return res.status(500).json({ error: "Gemini API key is not configured." });
  }

  try {
    const prompt = `The traveler wants to replace this activity in ${destination}:
Current Activity: "${currentActivity?.title}" (${currentActivity?.category}, estimated cost: ${currentActivity?.estimatedCost})
Day Theme: "${dayTheme}"
User preference/constraint: "${preferenceReason || "Looking for a fresh alternative"}"

Generate 1 replacement activity fitting the same timeSlot (${currentActivity?.timeSlot || "Afternoon"}) with exact details.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        temperature: 0.8,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            timeSlot: { type: Type.STRING },
            timeRange: { type: Type.STRING },
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            location: { type: Type.STRING },
            estimatedCost: { type: Type.NUMBER },
            durationMinutes: { type: Type.NUMBER },
            category: { type: Type.STRING },
            insiderTip: { type: Type.STRING },
            bestTimeToVisit: { type: Type.STRING },
            bookingRequired: { type: Type.BOOLEAN },
          },
          required: ["id", "timeSlot", "timeRange", "title", "description", "location", "estimatedCost", "durationMinutes", "category"],
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("Error swapping activity:", error);
    res.status(500).json({ error: "Failed to generate alternative activity" });
  }
});

// 5. Explore AI Recommended Destinations
app.post("/api/explore-destinations", async (req, res) => {
  const { vibe, budget, duration, startingCity } = req.body;

  const ai = getGenAI();
  if (!ai) {
    return res.status(500).json({ error: "Gemini API key is not configured." });
  }

  try {
    const prompt = `Recommend 4 top destination candidates for a traveler with:
- Preferred Vibe: ${vibe || "Scenic & Cultural"}
- Budget Level: ${budget || "Moderate"}
- Trip Duration: ${duration || "5-7 days"}
- Departing from: ${startingCity || "Major International Hub"}

Provide high-appeal destinations with city, country, catchy tagline, average daily cost in USD, best months, and 4 highlight attractions.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        temperature: 0.7,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              city: { type: Type.STRING },
              country: { type: Type.STRING },
              tagline: { type: Type.STRING },
              avgDailyCostUSD: { type: Type.NUMBER },
              bestMonths: { type: Type.STRING },
              flightTimeFromMajorHubs: { type: Type.STRING },
              vibe: { type: Type.ARRAY, items: { type: Type.STRING } },
              highlights: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["id", "city", "country", "tagline", "avgDailyCostUSD", "bestMonths", "vibe", "highlights"],
          },
        },
      },
    });

    const parsed = JSON.parse(response.text || "[]");
    const withImages = parsed.map((item: any) => ({
      ...item,
      imageUrl: getHeroImageForDestination(item.city),
    }));

    res.json(withImages);
  } catch (error: any) {
    console.error("Error in explore-destinations:", error);
    res.status(500).json({ error: "Failed to explore destinations" });
  }
});

// Start Server with Vite Middleware
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`TripGenie AI Server running at http://0.0.0.0:${PORT}`);
  });
}

start();
