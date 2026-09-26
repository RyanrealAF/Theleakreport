export const onRequestPost: PagesFunction = async (context) => {
  const apiKey = context.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json({
      fallback: true,
      message: "Gemini API key not configured; using field-manual built-in scenario bank."
    });
  }

  let body: any = {};
  try {
    body = await context.request.json();
  } catch {}

  const chapterNumber = body.chapterNumber;
  const leakType = body.leakType;
  const customSetting = body.customSetting;

  const prompt = `You are the lead behavioral instructor for "THE LEAK REPORT: EDUCATIONAL FIELD MANUAL".
Generate an authentic, high-stakes conversational practice scenario for an educational diagnostic laboratory.

Target:
- Chapter/Topic: ${chapterNumber ? `Module ${chapterNumber}` : "Interpersonal Subtext Diagnosis"}
- Leak Type: ${leakType || "Any core leak type"}
- Setting: ${customSetting || "Workplace negotiation, family discussion, romantic relationship, or public interaction"}

STRICT PEDAGOGICAL & VOICE ENFORCEMENT RULES:
1. Verbatim Dialogue MUST be realistic, gritty, and unvarnished street/workplace conversation.
2. Action Steps & Diagnostic Instructions must be strictly imperative.
3. Chapter 5 Ethical Restraint Anchor: the correct response must model ethical non-retaliation and personal awareness.
4. Options must contrast superficial literal reading, clinical diagnostic reading, and aggressive amateur overreaction.

Return JSON matching:
{
  "setting": "string",
  "context": "string",
  "dialogue": "string",
  "tell": "string",
  "options": [
    {"id":"opt-a","text":"string","isCorrect":false,"explanation":"string"},
    {"id":"opt-b","text":"string","isCorrect":true,"explanation":"string"},
    {"id":"opt-c","text":"string","isCorrect":false,"explanation":"string"}
  ],
  "verdictRead": "string",
  "ch5RestraintPrompt": "string",
  "voiceQAStatus": "passed"
}`;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
        encodeURIComponent(apiKey),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini request failed: ${response.status}`);
    }

    const result: any = await response.json();
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "{}";
    const parsed = JSON.parse(text);

    return Response.json({
      success: true,
      scenario: {
        id: `ai-drill-${Date.now()}`,
        chapterId: chapterNumber ? `ch${chapterNumber}` : "ch1",
        chapterTitle: `Field Drill: ${leakType || "Tactical Analysis"}`,
        ...parsed
      }
    });
  } catch (error: any) {
    return Response.json({
      fallback: true,
      error: error?.message || "Generation failed",
      message: "Failed to generate scenario via Gemini; falling back to manual scenario database."
    });
  }
};
