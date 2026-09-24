import { DrillScenario } from '../types';

export const BUILT_IN_DRILLS: DrillScenario[] = [
  {
    id: 'drill-1',
    chapterId: 'ch1',
    chapterTitle: 'Ch. 1: The Battlefield of Subtext',
    setting: 'Workplace / Coffee Machine',
    context: "You catch your department head right after the budget cut meeting. You ask if marketing is losing headcount next quarter.",
    dialogue: "'Look, absolutely not, I've got total confidence, nobody is — there's zero reason for anyone on my floor to be sweating right now.'",
    tell: 'Three denials in one breath, stacking assurances on an unasked absolute.',
    options: [
      {
        id: 'opt-a',
        text: "Take the executive at their word — they gave a direct reassurance.",
        isCorrect: false,
        explanation: "Civilian mistake. When a manager stacks three denials into one sentence, they aren't reassuring you; they're wrestling with the spreadsheet in their head."
      },
      {
        id: 'opt-b',
        text: "Flag overcorrection: The excess volume of denial reveals the budget cut already has names on it.",
        isCorrect: true,
        explanation: "Clean read. The words are cover fire. The friction is three denials for a question that only needed one calm 'no'."
      },
      {
        id: 'opt-c',
        text: "Call them out right there at the machine and demand the exact layoff date.",
        isCorrect: false,
        explanation: "Breaks Rule Two and Three of Chapter 5. You announce your wiretap, blow the channel, and walk into a wall."
      }
    ],
    verdictRead: "Transmission jammed by uncontained panic. The budget axe is already swinging.",
    ch5RestraintPrompt: "Log the timestamp and exact wording. Do not spread panic across the floor. Protect your own resume in quiet.",
    voiceQAStatus: 'passed'
  },
  {
    id: 'drill-2',
    chapterId: 'ch7',
    chapterTitle: 'Ch. 7: Backhanded Compliments',
    setting: 'Social / Dinner Gathering',
    context: "You present a new side-business milestone to your childhood circle. One friend smiles wide and speaks up across the table.",
    dialogue: "'Honestly, that's wild! You're doing so much better than anyone in our old block expected you to.'",
    tell: "The 'For a —' / category ceiling model disguised as celebratory praise.",
    options: [
      {
        id: 'opt-a',
        text: "Smile and thank them warmly without logging the payload.",
        isCorrect: false,
        explanation: "Socially polite, but tactically blind. You just accepted an invoice disguised as a gift."
      },
      {
        id: 'opt-b',
        text: "Isolate the 'for someone from our old block' qualifier — that's the ceiling they placed on you years ago.",
        isCorrect: true,
        explanation: "Target locked. The praise is wrapping paper. The low baseline assumption is the actual warhead."
      },
      {
        id: 'opt-c',
        text: "Dissect their low self-esteem in front of the table to even the scoreboard.",
        isCorrect: false,
        explanation: "Violation of Chapter 5. Intel is for clarity, never for cruelty. You stooped to their level and ruined dinner."
      }
    ],
    verdictRead: "A preset ceiling wearing a celebratory toast. Log the prior assumption.",
    ch5RestraintPrompt: "Keep your smile, keep your pace, and let their low bar remain their personal problem.",
    voiceQAStatus: 'passed'
  },
  {
    id: 'drill-3',
    chapterId: 'ch8',
    chapterTitle: 'Ch. 8: Humor as Cover Fire',
    setting: 'Workplace / Project Huddle',
    context: "During a sprint retro, a teammate laughs through a remark directed right at your deliverables.",
    dialogue: "'Must be nice to clock out at five sharp every single day while the rest of the unit cleans up the repo, haha! Just messing with you, man!'",
    tell: "Exit ramp pre-loaded ('haha! Just messing with you!') before the accusation even landed.",
    options: [
      {
        id: 'opt-a',
        text: "Laugh along and say 'Haha yeah, work-life balance!' and forget it.",
        isCorrect: false,
        explanation: "They just successfully ran a probe on your boundaries without paying any social penalty."
      },
      {
        id: 'opt-b',
        text: "Clock the probe: Strip the 'haha' and treat 'you're not pulling your weight' as an active grievance.",
        isCorrect: true,
        explanation: "Doctrine confirmed. A real joke doesn't need an escape vehicle bolted on before the punchline lands."
      },
      {
        id: 'opt-c',
        text: "Snap back instantly with their commit logs and escalate to HR.",
        isCorrect: false,
        explanation: "Plays right into their plausible deniability trap: 'Why are you so defensive? It was just a joke!'"
      }
    ],
    verdictRead: "Hostile reconnaissance probe. Resentment is simmering under the humor shield.",
    ch5RestraintPrompt: "Log the grievance topic. Do not engage the joke. Address workload alignment in formal 1-on-1 if necessary.",
    voiceQAStatus: 'passed'
  },
  {
    id: 'drill-4',
    chapterId: 'ch14',
    chapterTitle: 'Ch. 14: Digital Leaks',
    setting: 'Romantic / Text Thread',
    context: "You text your partner of six months asking if they want to book flight tickets together for the holidays to visit your family.",
    dialogue: "[Read 10:14 AM] ... [6 hours 42 minutes later] ... 'hey sorry super slammed at the gym! yeah totally down lemme check my calendar tomorrow!'",
    tell: "Response-time anomaly (6+ hours vs. normal 3-minute baseline) plus punctuation overcorrection on a simple commitment.",
    options: [
      {
        id: 'opt-a',
        text: "Assume they were just busy at the gym for seven hours.",
        isCorrect: false,
        explanation: "Timestamp never lies. The latency is processing time, not battery failure."
      },
      {
        id: 'opt-b',
        text: "Recognize the metadata tell: Commitment friction manifested as latency, softened with exclamation points.",
        isCorrect: true,
        explanation: "Triangulation hit: read-without-reply delay + digital overcorrection = severe internal reservation about meeting family."
      },
      {
        id: 'opt-c',
        text: "Send five follow-up texts demanding an explanation for the 6-hour delay.",
        isCorrect: false,
        explanation: "Rookies chase the non-answer immediately. You push twice, you just buy a taller brick wall."
      }
    ],
    verdictRead: "A commitment non-answer stamped in server metadata.",
    ch5RestraintPrompt: "Hold the read with patience. Give them room to step toward you without forcing an interrogation.",
    voiceQAStatus: 'passed'
  },
  {
    id: 'drill-5',
    chapterId: 'ch19',
    chapterTitle: 'Ch. 19: When Not to Use What You Know',
    setting: 'Family / Living Room',
    context: "Your younger brother claims he got home early because 'traffic was clear,' but his phone screen lights up with a missed call from his counselor, his hands are shaking, and he changes the topic to the football game three times in two minutes.",
    dialogue: "'Seriously, it's just traffic, everything's totally chill. Hey, who won the game last night? Did you see that kick?'",
    tell: "Cross-referenced cluster: body leak (shaking hands) + topic change + contradiction.",
    options: [
      {
        id: 'opt-a',
        text: "Confront him with all the evidence: 'I saw the counselor call, your hands are shaking, stop lying.'",
        isCorrect: false,
        explanation: "Critical violation of Chapter 19. You took the clean shot and destroyed his psychological safety for ego."
      },
      {
        id: 'opt-b',
        text: "Enforce Chapter 19: Let understanding be the finish line. Don't trap him. Make a sandwich, sit beside him, and say 'I've got your back whenever you want to talk.'",
        isCorrect: true,
        explanation: "The operative's masterstroke. The clean shot you don't take is the highest-level move in the entire book."
      },
      {
        id: 'opt-c',
        text: "Tell your parents immediately so they can handle it.",
        isCorrect: false,
        explanation: "Leaks the file before understanding the person. Surveillance without empathy is betrayal."
      }
    ],
    verdictRead: "High-stress containment failure. The person needs safety, not a detective.",
    ch5RestraintPrompt: "Restraint is the ultimate craft. Use the file to make them feel safe, not small.",
    voiceQAStatus: 'passed'
  }
];
