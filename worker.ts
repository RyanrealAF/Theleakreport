import { GoogleGenAI } from '@google/genai';

interface Env {
  ASSETS: { fetch: (request: Request | string) => Promise<Response> };
  GEMINI_API_KEY?: string;
  NODE_ENV?: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: any): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/health') {
      return new Response(
        JSON.stringify({
          status: 'ok',
          mode: env.NODE_ENV || 'production',
          geminiConfigured: !!env.GEMINI_API_KEY,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    if (url.pathname === '/api/drills/generate' && request.method === 'POST') {
      try {
        const body = (await request.json().catch(() => ({}))) as any;
        const { chapterNumber, leakType, customSetting } = body || {};

        if (!env.GEMINI_API_KEY) {
          return new Response(
            JSON.stringify({
              fallback: true,
              message: 'Gemini API key not configured; using field-manual built-in scenario bank.',
            }),
            {
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
              },
            }
          );
        }

        const client = new GoogleGenAI({
          apiKey: env.GEMINI_API_KEY,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });

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
        return new Response(
          JSON.stringify({
            success: true,
            scenario: {
              id: `ai-drill-${Date.now()}`,
              chapterId: chapterNumber ? `ch${chapterNumber}` : 'ch1',
              chapterTitle: `Field Drill: ${leakType || 'Tactical Analysis'}`,
              ...parsed,
            },
          }),
          {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      } catch (error: any) {
        console.error('Error generating drill with Gemini:', error);
        return new Response(
          JSON.stringify({
            fallback: true,
            error: error.message,
            message: 'Failed to generate scenario via Gemini; falling back to manual scenario database.',
          }),
          {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      }
    }

    return env.ASSETS.fetch(request);
  },
};
