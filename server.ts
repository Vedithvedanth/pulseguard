import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Server-side Gemini Client utility with User-Agent header
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI client:', err);
  }
}

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    geminiConfigured: !!process.env.GEMINI_API_KEY,
  });
});

// Grounded Business Copilot Chat endpoint
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { message, context } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const businessContext = context || {
      businessName: 'Heritage Bites',
      businessType: 'Mid-sized Restaurant',
      healthScore: 68,
      primaryRisk: 'Chicken inventory stockout in 2.4 days (Risk Score: 82/100, Impact: ₹18,400–₹25,000)',
      evidence: {
        chickenSalesIncrease: '+31% over 4 weeks',
        supplierDelayFreshPoultry: '+18% (avg delivery delay increased to 2.7 days)',
        currentInventory: '24% below safety buffer',
        complaintsUnavailable: '+17% complaints regarding unavailable chicken biryani/butter chicken',
      },
      suppliers: [
        { name: 'FreshPoultry Farms', reliability: '62%', delay: '2.7 days', trend: 'Declining' },
        { name: 'Metro Spices & Dry Goods', reliability: '94%', delay: '0.5 days', trend: 'Stable' },
        { name: 'OceanFresh Seafoods', reliability: '88%', delay: '1.1 days', trend: 'Watchlist' },
      ],
      recommendedActions: [
        'Increase next chicken order by 35% and contact FreshPoultry Farms today.',
        'Activate secondary supplier Apex Poultry Hub for an emergency dispatch.',
        'Temporarily throttle digital promo on high-volume chicken combos until restocked.',
      ],
    };

    // If Gemini API is configured, try using gemini-3.8-flash with fallback
    if (aiClient && process.env.GEMINI_API_KEY) {
      try {
        const systemInstruction = `You are PulseGuard AI Copilot, a sharp, executive early-warning business intelligence advisor for SME owners.
You speak with clarity, precision, and business grounding.
You NEVER invent numbers or claim AI can predict the future with 100% certainty. Use terms like "Potential risk", "Estimated impact", "Based on historical patterns", and "Recommended action".
Always ground answers in the user's business context provided below:
${JSON.stringify(businessContext, null, 2)}

Provide concise, structured, actionable answers. Highlight:
1. What is going wrong or at risk
2. Underlying root causes with concrete percentages
3. Estimated financial impact (in Indian Rupees ₹ for Heritage Bites)
4. Recommended immediate actions with urgency level.`;

        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: message,
          config: {
            systemInstruction,
            temperature: 0.2,
          },
        });

        if (response.text) {
          return res.json({
            reply: response.text,
            source: 'gemini-3.8-flash',
          });
        }
      } catch (geminiError: any) {
        console.warn('[PulseGuard AI] Gemini API call unavailable or timed out; switching to deterministic engine fallback:', geminiError?.message || geminiError);
      }
    }

    // High-fidelity intelligent deterministic fallback (ensures the demo NEVER fails)
    const lower = message.toLowerCase();
    let reply = '';

    if (lower.includes('biggest risk') || lower.includes('worst') || lower.includes('top risk')) {
      reply = `**Potential Critical Risk:** Chicken inventory stockout estimated within **2.4 days** (Risk Score: **82/100**).
- **Why it is happening:** Weekend chicken demand surged **+31%** while supplier FreshPoultry Farms average delivery delay increased by **+18%** (now 2.7 days). Current stock is **-24%** below safety thresholds.
- **Estimated Financial Impact:** **₹18,400 to ₹25,000** in potential lost sales across 73–96 affected orders.
- **Recommended Action:** Place an emergency 35% supplemental order with FreshPoultry Farms today or activate backup vendor *Apex Poultry Hub*.`;
    } else if (lower.includes('why is my inventory') || lower.includes('inventory')) {
      reply = `**Inventory Health Analysis (Score: 51/100):**
The primary inventory stress point is **Raw Chicken (Bone-in & Boneless)**.
- **Historical Burn Rate:** Was 42 kg/day; surged to **55 kg/day (+31%)** over the last 4 weekends.
- **Current Available Buffer:** Only ~132 kg remaining (exhaustion in ~2.4 days).
- **Secondary Flag:** Takeaway containers are also at 4.1 days safety margin.
- **Action Required:** Re-calibrate order point from 150 kg to 210 kg to absorb weekend demand volatility.`;
    } else if (lower.includes('what should i do today') || lower.includes('today') || lower.includes('action')) {
      reply = `**Top 3 Recommended Actions for Today:**
1. **[URGENT] Contact FreshPoultry Farms (Supplier):** Confirm dispatch of PO-892 and request express delivery by tomorrow 10:00 AM (Expected benefit: Prevents ₹18.4k stockout).
2. **[HIGH] Activate Backup Supplier:** Place a buffer order with *Apex Poultry Hub* (Pre-vetted, 1.2 day lead time).
3. **[OPERATIONAL] Menu Throttle:** Temporarily pause promotional banners for "Chicken Biryani Double Delight" on Swiggy/Zomato to prevent customer disappointment until stock arrives.`;
    } else if (lower.includes('supplier') || lower.includes('unreliable')) {
      reply = `**Supplier Reliability Alert:**
**FreshPoultry Farms** has dropped to **62% reliability** (down from 89% in Month 1).
- Average delivery delay has climbed from 0.4 days to **2.7 days**.
- Last 3 deliveries were late, directly triggering our chicken buffer depletion.
- In contrast, *Metro Spices & Dry Goods* maintains 94% on-time delivery and *GreenFields Veg* is at 96%.
- **Recommendation:** Issue formal vendor SLA notice to FreshPoultry Farms and split chicken purchase volumes 60/40 with secondary vendor.`;
    } else if (lower.includes('revenue') || lower.includes('lose') || lower.includes('financial') || lower.includes('cost')) {
      reply = `**Estimated Financial Exposure Summary:**
- **Total Immediate Revenue at Risk:** **₹23,200** (₹18,400 from chicken items + ₹4,800 from weekend drink combos).
- **Extended Customer Churn Risk:** Approximately 14% of customers experiencing stockouts on signature dishes do not reorder within 30 days, representing an estimated ₹42,000 in 60-day customer lifetime value erosion.
- **Mitigation Cost:** Expedited delivery premium is estimated at ₹1,200, generating a **15x ROI** by preventing the stockout.`;
    } else if (lower.includes('what if i do nothing') || lower.includes('do nothing')) {
      reply = `**Projection: If No Action Is Taken Within 48 Hours:**
- **Stock Exhaustion:** Chicken dishes will be 100% out of stock by Friday 7:30 PM (peak dinner service).
- **Lost Revenue:** Estimated ₹18,400–₹25,000 in immediate missed sales.
- **Customer Impact:** 73–96 unfulfilled diner orders; estimated 12–15 negative 1-star reviews citing "unavailable menu items".
- **Risk Escalation:** Overall Business Health Score will drop from **68** to **52/100** (Critical Red).`;
    } else {
      reply = `Based on Heritage Bites' 90-day operational dataset:
- **Overall Business Health Score:** 68/100 (Needs Attention).
- **Highest Priority Concern:** Chicken inventory stockout in ~2.4 days due to +31% weekend demand combined with 2.7-day supplier delays from FreshPoultry Farms.
- **Estimated Business Exposure:** ₹18,400–₹25,000 lost revenue across 73–96 orders.
- **Recommended Next Step:** Open the **"What Needs Attention?"** card on your dashboard to review root causes or execute the automated 35% replenishment action.`;
    }

    return res.json({
      reply,
      source: 'deterministic-intelligence',
    });
  } catch (err: any) {
    console.error('Error in /api/gemini/chat:', err);
    return res.status(500).json({
      error: 'Failed to process AI query',
      details: err?.message || String(err),
    });
  }
});

// Deep AI Root Cause & Failure Analysis endpoint
app.post('/api/gemini/analyze', async (req, res) => {
  try {
    const { datasetSummary, anomalyKey } = req.body;

    if (aiClient && process.env.GEMINI_API_KEY) {
      const prompt = `Analyze this business operational anomaly:
Anomaly Key: ${anomalyKey || 'CHICKEN_STOCKOUT'}
Data Summary: ${JSON.stringify(datasetSummary || {})}

Return a structured JSON with:
{
  "failureMode": "string",
  "probability": number,
  "confidenceScore": number,
  "estimatedImpactMin": number,
  "estimatedImpactMax": number,
  "affectedOrdersEstimate": "string",
  "rootCauseChain": ["string", "string", "string"],
  "recommendedAction": "string",
  "urgency": "CRITICAL" | "HIGH" | "MODERATE",
  "escalationTimeline": "string",
  "unaddressedOutcome": "string"
}`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.1,
        },
      });

      try {
        const parsed = JSON.parse(response.text || '{}');
        return res.json({ analysis: parsed, source: 'gemini-3.8-flash' });
      } catch {
        // fallback to text
      }
    }

    // Deterministic intelligence fallback
    return res.json({
      analysis: {
        failureMode: 'Critical Menu Out-of-Stock (Signature Chicken Items)',
        probability: 78,
        confidenceScore: 87,
        estimatedImpactMin: 18400,
        estimatedImpactMax: 25000,
        affectedOrdersEstimate: '73–96 orders',
        rootCauseChain: [
          'Demand increase: Weekend dine-in and delivery volume up +31% over 4 weeks',
          'Supply chain friction: FreshPoultry Farms delivery delay jumped +18% to 2.7 days average',
          'Buffer depletion: Current stock is -24% below required safety replenishment threshold',
        ],
        recommendedAction: 'Increase next order by 35% and contact FreshPoultry Farms today.',
        urgency: 'HIGH',
        escalationTimeline: 'Exhaustion projected in ~2.4 days (Friday dinner rush)',
        unaddressedOutcome: '₹18,400–₹25,000 lost sales, 73–96 unfulfilled orders, 1-star ratings surge',
      },
      source: 'deterministic-intelligence',
    });
  } catch (err: any) {
    console.error('Error in /api/gemini/analyze:', err);
    res.status(500).json({ error: 'Analysis failed', details: err?.message });
  }
});

// Boot the server
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[PulseGuard AI] Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
