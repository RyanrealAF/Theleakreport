/**
 * Types and schema definitions for The Leak Report: Interactive Field Manual
 * TM 31-HEAR-01
 */

export interface IntelBrief {
  summary: string[];
  academic_ground: string;
  hook_line: string; // standalone, tap-to-highlight / tap-to-share card
}

export interface StreetReconScene {
  id: string;
  setting: string; // must be unique across the 3 scenes
  title: string;
  scene_text: string;
  read_line: string; // revealed on tap
}

export interface ActionStep {
  id: string;
  step_number: number;
  title: string;
  instruction: string;
  tied_to_ch5: boolean; // subtle visual marker linking back to Operative's Code
}

export interface QuickDebrief {
  lines: [string, string, string, string] | [string, string, string] | [string, string] | [string]; // strictly max 4 lines
}

export interface Chapter {
  id: string; // "ch1", "ch2", ...
  number: number;
  title: string;
  part: 'Part I — Groundwork' | 'Part II — The Targets' | 'Part III — Synthesis & Defense' | 'Part IV — Field Manual';
  references?: string[]; // e.g. ["ch5", "ch15"] for cross-chapter threading
  intel_brief: IntelBrief;
  street_recon: [StreetReconScene, StreetReconScene, StreetReconScene]; // exactly 3 entries
  action_steps: ActionStep[]; // at least 1 must have tied_to_ch5: true
  quick_debrief: QuickDebrief; // max 4 lines
}

export interface DebriefLogEntry {
  id: string;
  date: string;
  approxTime: string;
  setting: 'work' | 'romantic' | 'family' | 'friend group' | 'street' | 'digital' | 'other';
  involved: string;
  priorDiscussion: string;
  verbatimPhrase: string;
  leakType: string;
  physicalOrDigitalTell: string;
  subjectOrbited: string;
  strainOrStrategy: 'strain' | 'strategy';
  firstInstinctRead: string;
  actionTaken: string;
}

export type LeakLogEntry = DebriefLogEntry;

export interface GlossaryTerm {
  term: string;
  definition: string;
  chapters: number[];
  category: 'core' | 'leak-type' | 'framework' | 'ethics';
}

export interface CheatSheetItem {
  leakType: string;
  tell: string;
  chapterNumber: number;
  chapterId: string;
  category: string;
}

export interface DrillScenario {
  id: string;
  chapterId: string;
  chapterTitle: string;
  setting: string;
  context: string;
  dialogue: string;
  tell: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  verdictRead: string;
  ch5RestraintPrompt: string;
  voiceQAStatus: 'passed' | 'flagged';
}

/**
 * Runtime Schema Validator: Enforces strict constraints required by manuscript
 */
export function validateChapter(chapter: Chapter): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Enforce exactly 3 street_recon entries
  if (!Array.isArray(chapter.street_recon) || chapter.street_recon.length !== 3) {
    errors.push(`Chapter ${chapter.number}: street_recon must have exactly 3 entries.`);
  } else {
    // Unique settings check
    const settings = chapter.street_recon.map(s => s.setting.trim().toLowerCase());
    const uniqueSettings = new Set(settings);
    if (uniqueSettings.size !== 3) {
      errors.push(`Chapter ${chapter.number}: street_recon entries must have unique setting values. Found: ${settings.join(', ')}`);
    }
  }

  // Enforce at least one tied_to_ch5
  const hasCh5Tied = chapter.action_steps.some(step => step.tied_to_ch5 === true);
  if (!hasCh5Tied && chapter.number !== 5) {
    errors.push(`Chapter ${chapter.number}: action_steps must have at least one entry with tied_to_ch5: true.`);
  }

  // Enforce quick_debrief max 4 lines
  if (!chapter.quick_debrief || !Array.isArray(chapter.quick_debrief.lines) || chapter.quick_debrief.lines.length > 4) {
    errors.push(`Chapter ${chapter.number}: quick_debrief must have at most 4 lines.`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
