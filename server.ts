import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return geminiClient;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    mode: process.env.NODE_ENV || 'development',
    geminiConfigured: !!process.env.GEMINI_API_KEY,
  });
});

// Dynamic Field Scenario Generator
// Tone enforcement prompt strictly locked: street-dominant voice, imperative action steps, no academic tone drift
app.post('/api/drills/generate', async (req, res) => {
  const { chapterNumber, leakType, customSetting } = req.body;

  const client = getGeminiClient();
  if (!client) {
    return res.status(200).json({
      fallback: true,
      message: 'Gemini API key not configured; using field-manual built-in scenario bank.',
    });
  }

  try {
    const prompt = `You are the lead behavioral instructor for "THE LEAK REPORT: EDUCATIONAL FIELD MANUAL".
Generate an authentic, high-stakes conversational practice scenario for an educational diagnostic laboratory.

Target:
- Chapter/Topic: ${chapterNumber ? `Module ${chapterNumber}` : 'Interpersonal Subtext Diagnosis'}
- Leak Type: ${leakType || 'Any core leak type (micro-confession, overcorrection, cover fire, backhanded praise, digital leak, non-answer, projection, passive aggression)'}
- Setting: ${customSetting || 'Workplace negotiation, family discussion, romantic relationship, or public interaction'}

STRICT PEDAGOGICAL & VOICE ENFORCEMENT RULES:
1. Verbatim Dialogue MUST be realistic, gritty, and unvarnished street/workplace conversation. Real people do not talk in clinical jargon.
2. Action Steps & Diagnostic Instructions must be strictly imperative ("Clock the hesitation", "Log the vocal pitch shift", "Maintain silence").
3. Chapter 5 Ethical Restraint Anchor: The correct response must model ethical non-retaliation and personal awareness—never humiliating the speaker or weaponizing their slip.
4. Options must contrast:
   - (A) Superficial Civilian Read: Taking the words at face value or projecting naivety.
   - (B) Clinical Diagnostic Read: Identifying the underlying psychological friction with precision.
   - (C) Aggressive Amateur Overreaction: Confronting or weaponizing the leak, which violates Chapter 5.

Return pure JSON matching this schema:
{
  "setting": "string (e.g. 'Executive Office / Budget Review', 'Quiet Dinner / Sibling Interaction')",
  "context": "string (1-2 sentences establishing the environmental stakes and interpersonal dynamics)",
  "dialogue": "string (verbatim speech with the audible friction tell in real time)",
  "tell": "string (the observable acoustic or linguistic marker)",
  "options": [
    {
      "id": "opt-a",
      "text": "string (civilian mistake / superficial literal interpretation)",
      "isCorrect": false,
      "explanation": "string (pedagogical explanation of why this misreads the underlying motive)"
    },
    {
      "id": "opt-b",
      "text": "string (clinical diagnostic read: detecting the leak, understanding the cognitive strain)",
      "isCorrect": true,
      "explanation": "string (rigorous behavioral doctrine breakdown)"
    },
    {
      "id": "opt-c",
      "text": "string (amateur aggressive reaction: confronting or weaponizing the leak, breaking Chapter 5)",
      "isCorrect": false,
      "explanation": "string (why aggressive exposure destroys trust and reveals one's own insecurity)"
    }
  ],
  "verdictRead": "string (concise diagnostic synthesis)",
  "ch5RestraintPrompt": "string (imperative ethical restraint protocol on preserving dignity and quiet containment)",
  "voiceQAStatus": "passed"
}`;

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text?.trim() || '{}');
    return res.json({
      success: true,
      scenario: {
        id: `ai-drill-${Date.now()}`,
        chapterId: chapterNumber ? `ch${chapterNumber}` : 'ch1',
        chapterTitle: `Field Drill: ${leakType || 'Tactical Analysis'}`,
        ...parsed,
      },
    });
  } catch (error: any) {
    console.error('Error generating drill with Gemini:', error);
    return res.status(200).json({
      fallback: true,
      error: error.message,
      message: 'Failed to generate scenario via Gemini; falling back to manual scenario database.',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`The Leak Report server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
