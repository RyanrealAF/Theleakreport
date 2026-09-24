import { Chapter } from '../types';

export const CHAPTERS: Chapter[] = [
  {
    id: 'ch1',
    number: 1,
    title: 'The Battlefield of Subtext',
    part: 'Part I — Groundwork',
    references: ['ch5', 'ch15'],
    intel_brief: {
      summary: [
        "Everybody thinks a conversation is two people trading words. That's the civilian read. Out here, on the ground, a conversation is two signals running on the same frequency, and only one of them is talking on purpose.",
        "The words are the decoy. They're the press release. Somebody built them, edited them, ran them past their own internal PR department before they ever hit the air. That's not where the truth lives. The truth lives in what got past security — the stutter, the pause that ran half a second too long, the joke that landed a little too specific to be random.",
        "Active listening teaches you to nod, repeat back what somebody said, make them feel heard. That's civilian-grade. Black-ops listening teaches you to clock what they didn't mean to say, because that's the only part of the transmission that wasn't cleared for release.",
        "This isn't paranoia. It's not about treating people like suspects. It's about recognizing that under pressure — social pressure, emotional pressure, the pressure of just trying to seem okay — everybody's internal editor drops a frame here and there. That dropped frame is not a mistake to be polite about. It's data. And in this book, data is currency."
      ],
      academic_ground: "Psychologists call the study of everyday slips and errors 'the psychopathology of everyday life' — Freud's original term for it (Freud, 1914). Later researchers like James Reason reframed these slips less as buried desire and more as signs of cognitive load: the mind juggling too much, dropping a stitch under the weight (Reason, 1990). Either lens gets you to the same place operationally — a slip means something in the system is under strain, and strain is always worth logging.",
      hook_line: "Every conversation is an unsecured channel, and you're not listening for the message — you're listening for the leak."
    },
    street_recon: [
      {
        id: 'ch1-s1',
        setting: 'Workplace / Interview',
        title: 'The Promotion Interview',
        scene_text: "A guy's up for a promotion. His manager asks him straight: 'You good working under Marcus if he gets the lead spot instead of you?' Guy says, 'Yeah, no, for sure, I've got no problem, I'm not — it's not a problem for me.'",
        read_line: "Three denials in one breath. Nobody who's actually fine says 'not a problem' three times. The transmission got jammed by the thing he was trying to bury."
      },
      {
        id: 'ch1-s2',
        setting: 'Digital / Group Chat',
        title: 'The Retracted Comment',
        scene_text: "Somebody posts a picture from a party. A friend comments 'wish I coulda made it lol' — then, two minutes later, deletes it and reposts just 'looked fun!'",
        read_line: "That edit is the whole story. The first version was the real signal. The second was the cleared-for-release version. You caught the transmission before command scrubbed it."
      },
      {
        id: 'ch1-s3',
        setting: 'Street / Peer Group',
        title: 'The Rent Check-In',
        scene_text: "You ask your boy straight up if he's good on rent this month. He doesn't say no. He says, 'I mean — yeah, it's whatever, I'll figure it out.'",
        read_line: "That's not a yes. That's a man building a sentence out of spare parts because the real answer doesn't have good PR. The silence before he answered was louder than anything he said after."
      }
    ],
    action_steps: [
      {
        id: 'ch1-a1',
        step_number: 1,
        title: 'Listen for Friction, Not Content',
        instruction: "Content is what they meant to say. Friction is where the delivery didn't match the content — the pause, the stutter, the too-quick answer, the too-slow one. Train your ear to hear the gap, not the words in it.",
        tied_to_ch5: false
      },
      {
        id: 'ch1-a2',
        step_number: 2,
        title: 'Hold Real-Time Fire',
        instruction: "The second you flinch, laugh, or call it out, you've told them the channel's compromised. They'll patch the leak and go dark. Let it pass clean. React later, on your own terms, not theirs.",
        tied_to_ch5: false
      },
      {
        id: 'ch1-a3',
        step_number: 3,
        title: 'Log Verbatim Before Memory Cleans It',
        instruction: "Memory edits itself the same way people do. Get the phrase down close to verbatim, note what was being discussed right before it happened, and note anything physical — the look-away, the fidget.",
        tied_to_ch5: false
      },
      {
        id: 'ch1-a4',
        step_number: 4,
        title: 'Diagnostic Fork: Strain or Strategy?',
        instruction: "Was that a crack under pressure, or a move they planned? A slip and a manipulation can look identical from the outside. Chapter 15 goes deep on telling them apart. Check this against the Chapter 5 mandate: never weaponize strain.",
        tied_to_ch5: true
      }
    ],
    quick_debrief: {
      lines: [
        'The words are cover. The gaps are truth.',
        "Don't listen to what they say — listen to what got past them.",
        'React never. Log everything. Judge later.',
        "You're not in the conversation. You're running surveillance on it."
      ]
    }
  },
  {
    id: 'ch2',
    number: 2,
    title: 'Black-Ops Listening Doctrine',
    part: 'Part I — Groundwork',
    references: ['ch5'],
    intel_brief: {
      summary: [
        "Let's get one thing straight before we go any further: this ain't therapy, and it ain't a personality test. Active listening is a civilian program. It's the version they teach you in HR trainings and couples counseling — nod along, repeat the last three words back to somebody, 'what I'm hearing you say is.' That's a handshake. It's polite. It's also useless if what you actually need is the truth.",
        "Black-ops listening runs a different mission. Active listening confirms what somebody's telling you. Black-ops listening catches what they never meant to transmit at all. One's a conversation. The other's a wiretap you don't need a warrant for, because you're not breaking in — they're leaving the door cracked themselves.",
        "Here's the rule of engagement, and memorize it, because it's the spine of everything else in this book: you do not go looking for lies. You go looking for leaks. A lie is something somebody built on purpose. A leak is something that got out around the thing they built. You're not catching people in the act of deception. You're catching the exhaust from it — the heat coming off the engine while the hood stays shut.",
        "Think of it like a dead drop. In old-school tradecraft, two people who can't be seen together pass information through a spot neither of them controls. That's a slip of the tongue. That's the pause that ran long. That's the joke that was too specific. Nobody handed it to you on purpose. It just got left somewhere you happened to be standing."
      ],
      academic_ground: "Erving Goffman built a whole framework around this — the idea that people are always managing a 'front,' a performance for whoever's watching, while a separate 'backstage' self exists underneath it (Goffman, 1959). Black-ops listening is just the discipline of catching backstage on camera for half a second before the curtain closes again.",
      hook_line: "You're not hunting liars. You're running surveillance on the gap between the front and the backstage. That gap doesn't lie. Only the front does."
    },
    street_recon: [
      {
        id: 'ch2-s1',
        setting: 'Workplace / Office',
        title: 'The Project Lead Bypass',
        scene_text: "Two coworkers, one just got passed over for a project lead role that went to the other one instead. The one who got it says, 'Hey, for what it's worth, I think you'd have crushed it too.' The other one says, 'Oh, totally, no worries, I'm sure you'll do great.' Then, half a beat later, adds — unprompted — 'Anyway, I gotta finish this deck.'",
        read_line: "Nobody asked about the deck. The exit was the tell, not the words."
      },
      {
        id: 'ch2-s2',
        setting: 'Romantic / First Date',
        title: 'The Ex Inquiry',
        scene_text: "She asks him what happened with his last relationship. He says, 'Honestly? It just ran its course, we grew apart, nothing dramatic.' Clean answer. Rehearsed-clean. Then she asks a follow-up — 'Do you still talk to her?' — and he laughs, way too fast, way too loud, before he says 'No.'",
        read_line: "The laugh arrived before the question finished. That's not timing. That's a trigger."
      },
      {
        id: 'ch2-s3',
        setting: 'Friend Group / Group Chat',
        title: 'The Vacation Non-Commit',
        scene_text: "A friend group is planning a trip. One guy keeps saying 'yeah I'm down, just gotta check some stuff' every time dates come up, three separate times, over two weeks. Nobody presses him. He never says he can't come. He also never commits to a single date.",
        read_line: "A man who wanted in would've named a week by now. Silence with a smile on it is still silence."
      }
    ],
    action_steps: [
      {
        id: 'ch2-a1',
        step_number: 1,
        title: 'Separate Front from Backstage',
        instruction: 'Ask yourself what performance is running here — professional, romantic, protective — and what would be true if nobody had an audience. The gap between those two is where the intel lives.',
        tied_to_ch5: false
      },
      {
        id: 'ch2-a2',
        step_number: 2,
        title: 'Treat Every Drop as a Location, Not a Verdict',
        instruction: "A dead drop tells you where information surfaced. It doesn't tell you the whole story by itself. One leak is a coordinate, not a conclusion. Don't build a case off a single drop.",
        tied_to_ch5: false
      },
      {
        id: 'ch2-a3',
        step_number: 3,
        title: 'Remain Backstage Yourself',
        instruction: "The second you react — a raised eyebrow, a 'wait, why'd you say that' — you've stepped out from behind the curtain and shown your hand. Now they know the channel's live, and they'll start managing their front around you specifically.",
        tied_to_ch5: false
      },
      {
        id: 'ch2-a4',
        step_number: 4,
        title: 'Enforce the Chapter 5 Restraint Filter',
        instruction: "Just because you caught something doesn't mean you're cleared to deploy it. Intel is for your own clarity and self-protection first. It is not ammunition for the next argument, and it's not a party trick to prove how sharp you are.",
        tied_to_ch5: true
      },
      {
        id: 'ch2-a5',
        step_number: 5,
        title: 'Log the Drop, Never Confront the Drop',
        instruction: 'Write it down. Note the setting, the exact phrase, what came right before it. The time to use it — if there ever is one — comes later, on your terms, not in the heat of the moment it happened.',
        tied_to_ch5: false
      }
    ],
    quick_debrief: {
      lines: [
        'Active listening hears the message. Black-ops listens for what missed the cut.',
        "It's not a lie you're chasing — it's the exhaust behind it.",
        'Stay backstage. Let the front keep performing.',
        "The gap doesn't lie. Only the front does."
      ]
    }
  },
  {
    id: 'ch3',
    number: 3,
    title: 'The Unconscious as Battlefield: Parapraxes',
    part: 'Part I — Groundwork',
    references: ['ch5', 'ch6'],
    intel_brief: {
      summary: [
        "There's a name for the thing you already know how to spot. Command calls it a parapraxis. Everybody else calls it a Freudian slip. Same target, different paperwork.",
        "Here's what it actually is: a moment where two signals are trying to broadcast on the same channel at once — the thing you meant to say, and the thing you actually think or feel — and the second one wins a fraction of a second of airtime before the censor catches it and pulls the plug.",
        "'I'm so glad you couldn't make it' instead of 'I'm so glad you could make it.' A name that comes out wrong, and it's not a random wrong name — it's the name of the person actually on their mind. The tongue doesn't stutter for no reason. It stutters because two convoys are trying to use the same road at the same time.",
        "Reframe it like this, because this is the one that matters: it's not a slip. It's a micro-confession. A slip implies an accident with no content. A micro-confession means the content was always there, fully formed, just waiting on a weak second to get out."
      ],
      academic_ground: "The old-school read — Freud's read — was that these slips are wish fulfillment. Buried desire finding a crack in the wall (Freud, 1901). Whether it's a repressed wish or, like later researchers argued, the mind buckling under cognitive load — too many plates spinning, one drops (Reason, 1990) — doesn't change what you do with it operationally. Either way, something real forced its way past the editor.",
      hook_line: "The censor doesn't stop the truth. It just delays the shipment."
    },
    street_recon: [
      {
        id: 'ch3-s1',
        setting: 'Social / Wedding Toast',
        title: 'The Best Man Stall',
        scene_text: "Best man's giving a toast. He's talking about the groom and says, 'I've never seen him this happy with — ' and stops, hard, mid-sentence, then course-corrects to '—this happy, period.' Everybody laughs it off as nerves.",
        read_line: 'Nobody asks what name was about to land in that gap. The stop was louder than anything he actually said.'
      },
      {
        id: 'ch3-s2',
        setting: 'Workplace / Performance Review',
        title: 'The Tense Shift',
        scene_text: "A manager is giving feedback to an employee she's about to lay off next quarter, information the employee doesn't have yet. She says, 'I want you to know your role here is really valued — I mean, was, is, valued.' Present tense flipped to past and caught itself mid-air.",
        read_line: "She wasn't lying about the past. She was previewing the future."
      },
      {
        id: 'ch3-s3',
        setting: 'Romantic / Text Message',
        title: 'The Autocorrect Tell',
        scene_text: "A guy is texting his girlfriend goodnight and means to type 'miss you, night' but autocorrect or his own thumbs land on 'miss you, Nadia' — his ex's name — before he catches it, deletes it, and resends 'miss you, night, love you.' He explains it away as a typo.",
        read_line: "A typo picks a random key. It doesn't pick a name that used to matter."
      }
    ],
    action_steps: [
      {
        id: 'ch3-a1',
        step_number: 1,
        title: 'Isolate the Substitution, Not the Surface Error',
        instruction: "Don't just note 'he stumbled.' Note what the stumble replaced. The slip is a swap — one word or name standing in for another. The swapped-in content is the intel, not the fact that a swap happened.",
        tied_to_ch5: false
      },
      {
        id: 'ch3-a2',
        step_number: 2,
        title: 'Check Cognitive Load First',
        instruction: 'Ask: was this person under real cognitive strain in that moment — tired, multitasking, overwhelmed — or were they calm and focused? A slip under heavy load might just be static. A slip in a calm, low-pressure moment is a cleaner signal.',
        tied_to_ch5: false
      },
      {
        id: 'ch3-a3',
        step_number: 3,
        title: 'Never Announce the Catch',
        instruction: "The instant you say 'wait, did you mean to say that?' you've handed the censor a second chance to build a cover story, and now you'll never know what was real. Let the moment close on its own.",
        tied_to_ch5: false
      },
      {
        id: 'ch3-a4',
        step_number: 4,
        title: 'Operative Code: Hold as Hypothesis, Never as Verdict',
        instruction: "A single micro-confession is a data point, not a conviction. Using it to accuse, corner, or humiliate somebody over one slipped word is exactly the kind of weaponization Chapter 5 exists to prevent. Log it. Watch for a pattern. Don't swing on the first pitch.",
        tied_to_ch5: true
      },
      {
        id: 'ch3-a5',
        step_number: 5,
        title: 'Log Verbatim Wording Immediately',
        instruction: 'Micro-confessions evaporate from memory fast because your own brain wants to smooth them over just as much as theirs did. Write down the literal phrase, the correction that followed, and what was being discussed when it happened.',
        tied_to_ch5: false
      }
    ],
    quick_debrief: {
      lines: [
        "A slip isn't an accident. It's a shipment that beat the censor.",
        "The swap is the intel — not that they stumbled, but what they stumbled into.",
        "Don't announce the catch. Don't swing on one pitch.",
        'The mouth confesses what the mind was told to keep classified.'
      ]
    }
  },
  {
    id: 'ch4',
    number: 4,
    title: 'The Double-Edged Blade: Weaponized Praise',
    part: 'Part I — Groundwork',
    references: ['ch5', 'ch7', 'ch12'],
    intel_brief: {
      summary: [
        'A compliment is supposed to be a gift. No strings, no return address. But out here, half the compliments you hear are actually payloads with the warhead disguised as the wrapping paper.',
        "Here's the mechanism. A backhanded compliment always has two halves: the half that sounds like a gift, and the half that's the actual message. 'You're so brave for wearing that' — the gift is 'brave,' the message is 'I wouldn't.' 'I'm surprised how well that turned out' — the gift is 'turned out,' the message is 'surprised,' and surprised means they expected you to fail. The compliment half is the delivery vehicle. The qualifier is the warhead.",
        "And here's why it's such a clean weapon: it comes with plausible deniability built in at the factory. If you push back — 'wait, what do you mean by that' — they get to say 'I was just complimenting you, damn, why you so sensitive.' Now you're the problem.",
        'Underneath most of these, there is projection running the show — the insecurity doing the talking usually belongs to the person handing out the compliment, not the person receiving it. Somebody who is genuinely secure about your win does not need to attach a qualifier to it.'
      ],
      academic_ground: "Social psychologists studying 'ambivalent' or backhanded communication have found these mixed messages create real confusion in the receiver precisely because the warmth and the hostility arrive on the same signal at the same time, which is what makes them harder to call out than a direct insult (Fiske et al., 2002). A straight insult gives you clean ground to stand on. A backhanded one takes the ground out from under you while smiling.",
      hook_line: "A compliment with a condition attached isn't a gift. It's an invoice."
    },
    street_recon: [
      {
        id: 'ch4-s1',
        setting: 'Family / Dinner Table',
        title: 'The Grad School Toast',
        scene_text: "Aunt looks across the table at her niece, who just announced she got into grad school, and says, 'Wow, good for you — I honestly didn't think you had it in you.' Everyone at the table laughs like it's affectionate. The niece laughs too, on cue.",
        read_line: "The 'good for you' bought thirty seconds of cover for the real sentence underneath it."
      },
      {
        id: 'ch4-s2',
        setting: 'Romantic / Relationship',
        title: 'The Surprise Baseline',
        scene_text: "He tells her, 'You're actually really smart, way smarter than I expected when we first met.' She says thanks. Doesn't ask the obvious follow-up: expected based on what?",
        read_line: 'He revealed his baseline assumption about her and called it a compliment.'
      },
      {
        id: 'ch4-s3',
        setting: 'Workplace / Public Slack Channel',
        title: 'The Public Recognition',
        scene_text: "Someone posts a project their coworker finished, and a colleague replies with 'wow, didn't know you had this in you, great job!' — public channel, everyone sees it. The coworker replies 'thank you!!'",
        read_line: "It's a compliment engineered to be witnessed, which makes it harder to question without looking ungrateful in front of the room."
      }
    ],
    action_steps: [
      {
        id: 'ch4-a1',
        step_number: 1,
        title: 'Isolate the Qualifier from the Praise',
        instruction: "Every backhanded compliment splits clean into two parts: praise, and the condition attached to it. Find the word doing the damage — 'surprised,' 'actually,' 'for a,' 'didn't think' — and treat that word as the real payload.",
        tied_to_ch5: false
      },
      {
        id: 'ch4-a2',
        step_number: 2,
        title: 'Ask What Baseline the Qualifier Reveals',
        instruction: "'Smarter than I expected' only makes sense if there was a low expectation to begin with. The qualifier is a window into what the speaker actually believed about you before you proved otherwise.",
        tied_to_ch5: false
      },
      {
        id: 'ch4-a3',
        step_number: 3,
        title: 'Do Not Return Fire in the Room',
        instruction: "Calling it out live plays directly into the deniability trap — you'll end up looking thin-skinned in front of whoever's watching, and they walk away clean. Let it land, log it, and decide later.",
        tied_to_ch5: false
      },
      {
        id: 'ch4-a4',
        step_number: 4,
        title: 'Enforce Chapter 5: Clarity Over Retaliation',
        instruction: "This is precision intel for your own understanding of where you stand with them — not ammunition to humiliate them back in front of the same room they used against you. The Operative's Code forbids public payback.",
        tied_to_ch5: true
      },
      {
        id: 'ch4-a5',
        step_number: 5,
        title: 'Log the Audience Alongside Phrasing',
        instruction: 'The audience matters as much as the words. A backhanded compliment delivered privately and one delivered in a group chat or in front of family are different weapons with different intentions — note the setting every time.',
        tied_to_ch5: false
      }
    ],
    quick_debrief: {
      lines: [
        "A gift with a condition isn't a gift. It's an invoice.",
        'Find the qualifier — that is the warhead, praise is just packaging.',
        "Don't return fire where they can call you sensitive.",
        'Their compliment just told you what they really expected of you.'
      ]
    }
  },
  {
    id: 'ch5',
    number: 5,
    title: "The Operative's Code",
    part: 'Part I — Groundwork',
    references: ['ch1', 'ch2', 'ch19'],
    intel_brief: {
      summary: [
        'Every operative who ever ran black ops for real, in any agency that ever existed, worked under a code. Not because command trusted them. Because uncontrolled intel in the wrong hands does not protect anybody — it just creates a second threat where there used to be one.',
        'Same rule applies here, and it applies before you learn one more page of technique. This is Chapter 5 out of nineteen because everything after this point gets sharper, and a sharp tool without a code is just a weapon looking for somewhere to land.',
        'Rule one — intel is for your clarity, not your ammunition. You catch a leak so you understand what is actually happening around you. You do not catch a leak so you can win the next argument. The second you use somebody unconscious slip as a weapon in a fight, you have stopped doing reconnaissance and started doing damage.',
        'Rule two — the goal is understanding, not exposure. You are never obligated to announce what you caught. The operative who catches everything and says nothing is running a cleaner op than the one who catches something and cannot wait to prove it.',
        'Rule three — restraint is the actual skill, not the tools. Anybody can learn to spot a slip after a few chapters. Spotting it is mechanical. Choosing not to use it — that is the discipline this whole book is actually training you toward. Chapter 19 comes back to this with real stakes on the table. This is the seed of it.'
      ],
      academic_ground: "In intelligence and security work, there is a long-standing principle that the value of information is inseparable from the discipline of how it is handled — information gathered without a governing framework does not just risk misuse, it corrodes the judgment of the person holding it (Bellaby, 2014). Same physics apply to a living room as they do to an agency. Power without restraint does not stay neutral. It goes rotten.",
      hook_line: "You didn't learn to read people so you could win. You learned so you could stop needing to."
    },
    street_recon: [
      {
        id: 'ch5-s1',
        setting: 'Romantic / Conflict',
        title: 'The Withheld Contradiction',
        scene_text: "A woman catches her boyfriend in a contradiction mid-argument — two different versions of where he was last Thursday, told a week apart. She has him. She could drop it right there and end the fight on the spot. She doesn't. She lets the argument resolve on its actual merits, files the contradiction away, and decides she'll watch for a pattern before she ever brings it up.",
        read_line: 'She had the kill shot and chose reconnaissance over the win.'
      },
      {
        id: 'ch5-s2',
        setting: 'Friend Group / Gathering',
        title: 'The Ex Trigger',
        scene_text: "A guy notices his friend gets visibly tense every time a certain ex's name comes up in conversation — jaw tightens, subject gets changed fast, every single time, for months. He never says anything. Never brings it up unprompted, never uses it to needle him at a party for a laugh. He just quietly understands his friend better than his friend knows he's understood.",
        read_line: 'He turned intel into empathy instead of leverage.'
      },
      {
        id: 'ch5-s3',
        setting: 'Workplace / Meeting',
        title: 'The Insecure Rival',
        scene_text: "A woman clocks that a coworker who's been undermining her in meetings has a tell — he over-explains and gets defensive any time someone questions his numbers. She could corner him in a meeting and expose the insecurity. She uses it instead to simply stop being intimidated by him — she knows what's actually underneath the act now, and that's enough.",
        read_line: 'She weaponized the intel against her own fear, not against him.'
      }
    ],
    action_steps: [
      {
        id: 'ch5-a1',
        step_number: 1,
        title: 'Ask "Why Do I Want to Use This?" Before Acting',
        instruction: "If the honest answer is 'to win,' 'to hurt them,' or 'to prove I'm smarter than them' — stand down. That's not what this book trained you for. If the answer is 'so I understand what's actually happening to me,' you're clear.",
        tied_to_ch5: true
      },
      {
        id: 'ch5-a2',
        step_number: 2,
        title: 'Default to Silence as the Resting State',
        instruction: "Not because you're weak, not because you're scared — because silence is the operative's natural resting state. Speaking up about what you caught should be the rare exception you consciously choose, not the reflex you fall into.",
        tied_to_ch5: true
      },
      {
        id: 'ch5-a3',
        step_number: 3,
        title: 'Separate Protection from Punishment',
        instruction: "There's a real difference between using intel to keep yourself safe — leaving a situation, setting a boundary, protecting your own peace — and using it to make somebody else feel small. The first is the whole point of this book. The second is a betrayal of it.",
        tied_to_ch5: true
      },
      {
        id: 'ch5-a4',
        step_number: 4,
        title: 'Give People Room to Be Human',
        instruction: "Everybody leaks. Everybody has a slip, a contradiction, an insecure tell under pressure. That's not a character flaw you caught them in — that's just what it looks like to be a person under strain. Hold what you find with some mercy, not a magnifying glass.",
        tied_to_ch5: true
      },
      {
        id: 'ch5-a5',
        step_number: 5,
        title: 'Audit Every Future Technique Against This Code',
        instruction: 'Every leak type in Part II is a sharper tool than the last. None of them get easier to misuse than the day you learned them. Recheck yourself against this code every time you are tempted to deploy something you caught.',
        tied_to_ch5: true
      }
    ],
    quick_debrief: {
      lines: [
        'The code is simple: intel for clarity, never for cruelty.',
        'Silence is the default. Speaking up is the rare exception.',
        "Protect yourself. Don't punish them.",
        "You didn't learn this to win. You learned it so you'd never need to."
      ]
    }
  },
  {
    id: 'ch6',
    number: 6,
    title: 'Micro-Confessions (Freudian Slips)',
    part: 'Part II — The Targets',
    references: ['ch3', 'ch5', 'ch17'],
    intel_brief: {
      summary: [
        'This is the flagship leak. Everything else in this book — the deflections, the backhanded compliments, the body leaks — all of it is a cousin of what you are about to run surveillance on in this chapter.',
        "Here's the operational truth that makes this leak type worth its own chapter: a micro-confession doesn't need pressure to show up. It just needs an opening. People assume they only slip when they're cornered, stressed, caught off guard. Wrong.",
        'Some of the cleanest micro-confessions in the field happen in completely relaxed moments — a joke, a casual aside, a throwaway line at dinner — because the censor relaxes right along with the room. The guard doesn\'t just drop under interrogation. It drops when nobody thinks anybody is watching.',
        "That's why this leak type is flagship. It's not rare. It's constant. It's running in the background of nearly every relaxed conversation you'll ever be part of — you just haven't been trained to hear it until now."
      ],
      academic_ground: "Freud's original catalog was not limited to speech — he tracked slips of the tongue, slips of the pen, forgotten names, misplaced objects, all under the same umbrella, arguing each one carried unconscious content trying to surface (Freud, 1901). You don't need every slip to be some deep repressed wish. You just need to recognize that the mind doesn't waste energy manufacturing random noise. Even the 'random' ones point somewhere.",
      hook_line: "The censor never sleeps on duty. It just blinks sometimes — and you're the one trained to catch the blink."
    },
    street_recon: [
      {
        id: 'ch6-s1',
        setting: 'Family / Social Gathering',
        title: 'The New Partner Introduction',
        scene_text: "A mother is introducing her daughter's new boyfriend to relatives for the first time and says, 'This is Daniel, my daughter's — sorry, this is Daniel, her boyfriend.' The pause before 'boyfriend' sat exactly where another word almost lived. Nobody at the table clocks it but her daughter, who goes quiet.",
        read_line: 'Mom almost called him something else — fiancé, maybe, or a name from someone before him — and caught it half a syllable too late.'
      },
      {
        id: 'ch6-s2',
        setting: 'Workplace / Team Meeting',
        title: 'The Reorg Announcement',
        scene_text: "A manager announcing a reorg says, 'So the old team will be — I mean, the current team will be reporting to a new lead starting next month.' 'Old' landed before 'current' did. Everyone in the room hears reorg news.",
        read_line: "She wasn't describing the plan. She previewed how far along the plan already was in her head."
      },
      {
        id: 'ch6-s3',
        setting: 'Street / Neighborhood Corner',
        title: 'The Brother Update',
        scene_text: "Two guys catching up on the street, one asks the other how his brother's doing, since they used to run together all the time. The guy says, 'He's good, he's good, we don't really — we still talk, it's whatever.' 'We don't really' almost finished into something before he swapped it out mid-sentence for the vaguer, safer 'we still talk.'",
        read_line: "Whatever's actually going on between those brothers, 'whatever' isn't it — the real sentence got stopped half-built."
      }
    ],
    action_steps: [
      {
        id: 'ch6-a1',
        step_number: 1,
        title: 'Stop Waiting for Pressure to Start Listening',
        instruction: 'The biggest mistake beginners make is only tuning in during confrontations. Micro-confessions happen just as often in relaxed, low-stakes conversation. Keep the ear running at all times.',
        tied_to_ch5: false
      },
      {
        id: 'ch6-a2',
        step_number: 2,
        title: 'Track the Abandoned Word, Not Just the Final One',
        instruction: "The word they landed on isn't the whole story. The half-built word or phrase they abandoned to get there is often the real payload. 'We don't really — we still talk' — the intel is in 'don't really.'",
        tied_to_ch5: false
      },
      {
        id: 'ch6-a3',
        step_number: 3,
        title: 'Cross-Reference Before Concluding Anything',
        instruction: "One micro-confession tells you something surfaced. It doesn't tell you the full shape of what's underneath. Hold every single slip as one puzzle piece, never the whole picture.",
        tied_to_ch5: false
      },
      {
        id: 'ch6-a4',
        step_number: 4,
        title: "Chapter 5 Discipline: Never Weaponize Volume",
        instruction: "This is the most common leak you will catch, meaning you will be tempted to misuse it most. A slipped word is not an invitation to interrogate someone about their subconscious in front of others. Log it. Hold it for personal clarity only.",
        tied_to_ch5: true
      },
      {
        id: 'ch6-a5',
        step_number: 5,
        title: 'Let the Room Stay Relaxed',
        instruction: 'Since this leak thrives specifically in low-guard moments, your entire advantage depends on the room staying low-guard. The instant you tense up or probe, you tighten the environment that was producing your best intel.',
        tied_to_ch5: false
      }
    ],
    quick_debrief: {
      lines: [
        "The flagship leak doesn't wait for pressure. It waits for an opening.",
        "The word they abandoned is the real one — not the one they landed on.",
        'One slip is a piece, not the picture. Cross-reference before you conclude.',
        "The censor blinks in every room. You're just trained to catch it now."
      ]
    }
  },
  {
    id: 'ch7',
    number: 7,
    title: 'Backhanded Compliments',
    part: 'Part II — The Targets',
    references: ['ch4', 'ch5'],
    intel_brief: {
      summary: [
        "Chapter 4 gave you the mechanism. This chapter gives you the field guide — because backhanded compliments don't all run the same model. There's more than one weapon in this family, and you need to know which one just got fired at you before you can read it right.",
        "The Qualifier Compliment. This is the base model from Chapter 4. Praise plus a condition bolted onto it. 'You're so brave for wearing that.' 'I'm surprised how well that turned out.' Strip it out and you'd have an honest compliment. Leave it in and you've got a warhead wearing a bow.",
        "The Comparison Compliment. This one doesn't attach a condition to you — it attaches you to somebody else, on purpose, so the comparison itself becomes the message. 'You're actually way better at this than your sister ever was.' Sounds like praise. Functions as a scoreboard you never asked to be entered into.",
        "The 'For a —' Compliment. The most surgical of the three, because the qualifier isn't even hidden in a feeling word — it's a category. 'You're really well-spoken for someone from your neighborhood.' 'That's impressive, for a first attempt.' It sets a ceiling before you speak."
      ],
      academic_ground: "The qualifier compliment tells you about the speaker's insecurity. The comparison compliment tells you who they're actually still thinking about. The 'for a' compliment tells you exactly what box they've already put you in. All three exploit social politeness to pass hostile payloads under cover of praise.",
      hook_line: "The wrapping tells you what kind of compliment it is. The box it came in tells you what they actually think of you."
    },
    street_recon: [
      {
        id: 'ch7-s1',
        setting: 'Friend Group / Trivia Night',
        title: 'The Comparison Model',
        scene_text: "A guy shows up to trivia night with a new girlfriend, and one of his friends says to her, 'Oh, you're way more fun than the last one he brought around, this is actually great.' Everyone laughs, she smiles, takes it as a win.",
        read_line: "The compliment was never really about her — it was a scoreboard update on someone who isn't even in the room."
      },
      {
        id: 'ch7-s2',
        setting: 'Workplace / Interview Panel',
        title: "The 'For-A' Model",
        scene_text: "A candidate finishes a strong answer in an interview, and the hiring manager says, 'That's a really thoughtful answer for someone straight out of school.' The candidate says thank you, keeps going.",
        read_line: "'Thoughtful' wasn't the whole sentence; 'for someone straight out of school' was the actual ceiling they'd already set for her before she opened her mouth."
      },
      {
        id: 'ch7-s3',
        setting: 'Street / Old Classmate Encounter',
        title: 'The Qualifier Model',
        scene_text: "A guy runs into an old classmate he hasn't seen in years, who tells him, 'Whoa, you actually look really put together now, good for you.' He says thanks, keeps walking.",
        read_line: "'Actually' and 'now' are doing the damage — the classmate just told him exactly what they used to think of him, and it wasn't this."
      }
    ],
    action_steps: [
      {
        id: 'ch7-a1',
        step_number: 1,
        title: 'Identify Which Model You Just Caught',
        instruction: "Is this a qualifier bolted onto praise, a comparison to someone else, or a 'for a' box built around a category? Each one points you toward different intel, so don't lump them together.",
        tied_to_ch5: false
      },
      {
        id: 'ch7-a2',
        step_number: 2,
        title: 'For Comparison Compliments: Identify the True Target',
        instruction: "The named comparison — the ex, the sibling, the old coworker — is often the real subject of the sentence. You're just the mechanism being used to deliver a verdict on somebody else.",
        tied_to_ch5: false
      },
      {
        id: 'ch7-a3',
        step_number: 3,
        title: "For 'For A' Compliments: Name the Ceiling",
        instruction: 'Write down the exact category attached — age, background, experience level. That box is the ceiling the speaker had already built for you before you did anything to earn it.',
        tied_to_ch5: false
      },
      {
        id: 'ch7-a4',
        step_number: 4,
        title: 'Maintain Internal Truth Over Public Compliance',
        instruction: 'The social pressure to smile and say thank you is real and often tactical in the moment — but do not let that social performance erase what you actually caught. Log the real read privately.',
        tied_to_ch5: false
      },
      {
        id: 'ch7-a5',
        step_number: 5,
        title: 'Chapter 5 Code: Insecurity Is Not License to Strike',
        instruction: 'Knowing exactly which flavor of backhanded compliment someone handed you is not license to publicly dissect their insecurity in front of the room. This is precision intel for your own understanding of where you stand with them — not a script for payback.',
        tied_to_ch5: true
      }
    ],
    quick_debrief: {
      lines: [
        "Qualifier, comparison, or 'for a' — same trick, three different warheads.",
        "One tells on their insecurity. One's really about somebody else. One reveals the box you were already in.",
        'Smile if you need to. Log the real read anyway.',
        'The wrapping is the gift. The box it came in is the truth.'
      ]
    }
  },
  {
    id: 'ch8',
    number: 8,
    title: 'Humor as Cover Fire',
    part: 'Part II — The Targets',
    references: ['ch5', 'ch15'],
    intel_brief: {
      summary: [
        "Every joke has a real thing underneath it. Comedy needs a kernel of truth to land at all, or it isn't funny, it's just noise. The question isn't whether there's truth under the joke. The question is whether the person telling it knows exactly how much truth they just put on the table, and chose the joke specifically because it lets them deny knowing.",
        "That's cover fire. In actual combat, cover fire isn't meant to hit anything — it's meant to let you see how the other side reacts without fully exposing your own position. Somebody's got a real accusation, a real desire, a real grievance they're not ready to own outright — so they wrap it in a joke and fire it out to see what happens.",
        "If it lands, they've learned something real without having said anything real. If it flops, they retreat to 'I'm just joking, relax.'",
        "That's the tell that separates cover fire from an actual joke: a real joke doesn't need the exit ramp built in before it's even finished landing."
      ],
      academic_ground: "Humor researchers have long noted that jokes function as a socially sanctioned outlet for expressing otherwise risky or taboo content — aggression, desire, criticism — precisely because the frame of 'just joking' provides social cover the same statement wouldn't get if said straight (Freud, 1905). The frame isn't incidental. The frame is the whole strategy.",
      hook_line: "A joke with an exit ramp built in before the punchline lands was never really a joke. It was a probe."
    },
    street_recon: [
      {
        id: 'ch8-s1',
        setting: 'Romantic / Living Room',
        title: 'The Wealth Test',
        scene_text: "He says, half-laughing, 'You'd probably leave me for a guy with more money, wouldn't you?' She laughs too, says 'shut up, no,' and the conversation moves on.",
        read_line: "He tested a real fear out loud, in joke packaging, and got exactly the reassurance he was fishing for without ever having to admit he needed it. The joke was a probe."
      },
      {
        id: 'ch8-s2',
        setting: 'Workplace / Team Floor',
        title: 'The Hours Dig',
        scene_text: "A coworker says to another, in front of the team, 'Must be nice only having to work like, two hours a day,' with a grin, clearly 'joking.' The room chuckles. The target laughs along too, a little tight.",
        read_line: "The joke fired a real accusation — that this person isn't pulling their weight — into a room where nobody has to own having said it out loud."
      },
      {
        id: 'ch8-s3',
        setting: 'Street / Sidewalk Reunion',
        title: 'The Friendship Probe',
        scene_text: "Two old friends are catching up, and one says, 'You still hanging around with those clowns from before? Didn't think you had it in you to cut people off,' laughing as he says it. The other guy laughs it off, changes the subject fast.",
        read_line: "That 'joke' was a real judgment about the friend group being tested for a reaction, dressed up enough to be deniable if it didn't land well."
      }
    ],
    action_steps: [
      {
        id: 'ch8-a1',
        step_number: 1,
        title: 'Check for the Exit Ramp Before Laughing Along',
        instruction: "Ask whether 'I'm just kidding' was clearly already loaded before the joke even finished. A real joke doesn't need a getaway car built into the delivery. If the getaway car is right there, it was cover.",
        tied_to_ch5: false
      },
      {
        id: 'ch8-a2',
        step_number: 2,
        title: 'Extract the Accusation, Not the Punchline',
        instruction: "Strip the 'haha' and the exaggeration off and ask what bare statement is actually left. That bare statement is the intel — the joke was just the outfit it wore to get past security.",
        tied_to_ch5: false
      },
      {
        id: 'ch8-a3',
        step_number: 3,
        title: 'Identify What Intel They Just Fished From You',
        instruction: 'Cover fire exists to gather intel on how you will respond without risking straight exposure. Ask yourself what information they just collected about you based on your laugh or flinch.',
        tied_to_ch5: false
      },
      {
        id: 'ch8-a4',
        step_number: 4,
        title: 'Chapter 5 Code: Refuse the Deniability Game',
        instruction: "Calling someone out with 'that wasn't really a joke, was it' in the moment usually just triggers a second round of deflection. Log what you caught, sit with what it tells you, and decide later on your own terms. That's restraint, not passivity.",
        tied_to_ch5: true
      },
      {
        id: 'ch8-a5',
        step_number: 5,
        title: 'Flag Repeat Probes on the Same Target',
        instruction: "A one-off probe might just be a bad joke. The same joke showing up more than once is no longer humor — it's reconnaissance running on a loop, testing the same coordinate over and over.",
        tied_to_ch5: false
      }
    ],
    quick_debrief: {
      lines: [
        "A joke with an exit ramp built in wasn't a joke — it was a probe.",
        "Strip the 'haha,' and the bare sentence left is the real accusation.",
        "Don't chase the deniability game. Log it, sit with it, move later.",
        "Cover fire isn't meant to land. It's meant to see how you react."
      ]
    }
  },
  {
    id: 'ch9',
    number: 9,
    title: 'The Non-Answer',
    part: 'Part II — The Targets',
    references: ['ch5', 'ch14'],
    intel_brief: {
      summary: [
        "Here's something civilians never account for: silence is not neutral. Silence is not the absence of a signal. Silence, especially right after a direct question, is one of the loudest transmissions you'll ever catch — you just have to stop treating it like empty air and start treating it like a response in its own right.",
        "A non-answer takes a few standard forms: The deflection — answering a question with a different question, or redirecting focus onto someone else. The topic change — a hard pivot away from the subject before it can be addressed. The technically-true non-answer — a real fact that carefully avoids the actual thing being asked. And the flat dodge — a joke, a 'why do you ask,' a laugh that buys time.",
        'What all four have in common: a direct question creates a fork in the road, and a real answer is only one of the paths available. Every non-answer is a choice to take a different path — and that choice itself is data.',
        "A non-answer is not a failure to respond. It's a decision about what not to reveal, executed in real time. Effort spent avoiding something tells you the something was worth avoiding."
      ],
      academic_ground: "Communication researchers studying 'equivocation' — the technical term for intentionally vague or evasive responses — have found people equivocate most heavily precisely in situations where every available direct answer carries some kind of cost (Bavelas et al., 1990). The vague answer is often the most strategically calculated thing a person says in the exchange.",
      hook_line: "Silence after a direct question isn't nothing. It's the answer wearing a disguise."
    },
    street_recon: [
      {
        id: 'ch9-s1',
        setting: 'Family / Phone Call',
        title: 'The Marital Inquiry Dodge',
        scene_text: "A mother asks her adult son straight out, 'Are you and your wife doing okay? You seem off lately.' He responds, 'Work's been crazy, honestly, I barely have time to think about anything else these days.' She didn't ask about work.",
        read_line: 'A detailed answer to the wrong question is still a non-answer, just a well-disguised one.'
      },
      {
        id: 'ch9-s2',
        setting: 'Friend Group / Group Chat',
        title: 'The Invitation Swerve',
        scene_text: "Someone asks directly, in a group chat planning a birthday dinner, 'Hey are you still not talking to Jordan? Should we not invite him?' The person it's aimed at responds with a laughing emoji and 'lol let's just figure out the restaurant first.'",
        read_line: 'The joke and the pivot did the same job — steer the conversation away before an answer had to exist.'
      },
      {
        id: 'ch9-s3',
        setting: 'Workplace / Manager 1-on-1',
        title: 'The Job Search Evasion',
        scene_text: "A manager asks an employee point blank, 'Are you looking for other jobs right now?' The employee says, 'I mean, I'm always open to opportunities, who isn't, right?'",
        read_line: 'A statement that is true for literally everyone on earth is specifically designed to feel like an answer while functioning as a wall.'
      }
    ],
    action_steps: [
      {
        id: 'ch9-a1',
        step_number: 1,
        title: 'Classify the Non-Answer Variant',
        instruction: 'Deflection, topic change, technically-true dodge, or flat joke-and-move-on — each one tells you something slightly different about how much control the person felt they had in that moment.',
        tied_to_ch5: false
      },
      {
        id: 'ch9-a2',
        step_number: 2,
        title: 'Map the Gap Between Question and Response',
        instruction: 'Hold your original question next to what actually came back. The gap between what got asked versus what got answered is the shape of the thing being avoided.',
        tied_to_ch5: false
      },
      {
        id: 'ch9-a3',
        step_number: 3,
        title: 'Resist Re-Asking Immediately',
        instruction: "Pushing a second time in the same breath usually just triggers a more polished non-answer — now they've had time to build a better wall. Let it sit.",
        tied_to_ch5: false
      },
      {
        id: 'ch9-a4',
        step_number: 4,
        title: "Operative Code: Weigh Their Seat's Cost",
        instruction: "Before deciding a non-answer implies guilt, consider what a direct answer would have cost them in that moment — embarrassment, vulnerability, safety. Don't convict someone of malice when they were just protecting their own dignity.",
        tied_to_ch5: true
      },
      {
        id: 'ch9-a5',
        step_number: 5,
        title: 'Log the Topic That Got Swerved',
        instruction: "Note exactly what subject caused the redirect. Over time, a running list of 'topics this person always steers away from' builds a far more useful profile than any single non-answer.",
        tied_to_ch5: false
      }
    ],
    quick_debrief: {
      lines: [
        "Silence after a direct question isn't empty. It's the answer in disguise.",
        "The gap between what you asked and what came back is the shape of what's hidden.",
        "Don't push twice in the same breath — you'll just get a better wall.",
        "A non-answer isn't a failure to speak. It's a decision, made in real time."
      ]
    }
  },
  {
    id: 'ch10',
    number: 10,
    title: 'Overcorrection',
    part: 'Part II — The Targets',
    references: ['ch1', 'ch5', 'ch14', 'ch16'],
    intel_brief: {
      summary: [
        "A denial should cost about as much energy as the accusation did. Somebody says 'did you eat the last slice,' you say 'no,' done, transmission complete, nobody's overdrawn on effort. That's calibration.",
        "Overcorrection is what happens when the response spends way more energy than the moment required — more words, more emphasis, more repetition than the situation could possibly justify — and that excess is the leak.",
        "Chapter 1 already showed you the base case: three denials in one breath, 'I've got no problem, I'm not — it's not a problem for me.' Overcorrection happens because the internal editor isn't just managing what gets said — it's managing how convincing it needs to sound, and it's miscalibrating both at once. A person who's actually fine doesn't need to sell you on being fine.",
        "There are two flavors worth separating: Over-explaining — piling on detail, justification, and context nobody asked for. Over-denying — repeating the same denial multiple times, in slightly different phrasing. Both run on the same fuel: excess effort trying to bury discomfort."
      ],
      academic_ground: "Psychological research on thought suppression has repeatedly found what's sometimes called the 'ironic process' — actively trying not to think about or reveal something tends to make that exact thing more present and more likely to surface, not less (Wegner, 1994). Overcorrection is that bleed, happening out loud, in real time, in front of you.",
      hook_line: "The size of the denial tells you the size of what's underneath it. A small no doesn't need three tries."
    },
    street_recon: [
      {
        id: 'ch10-s1',
        setting: 'Romantic / Anniversary Dinner',
        title: 'The Coworker Text Check',
        scene_text: "She asks him, half-joking, if he's been texting his coworker a lot lately. He says, 'No, I mean, we just work on the same project, it's purely professional, there's genuinely nothing there, I promise you it's completely fine.'",
        read_line: "Four separate assurances stacked on one casual question. A question that small didn't need an answer that big — the size of the denial is the actual tell."
      },
      {
        id: 'ch10-s2',
        setting: 'Workplace / Team Standup',
        title: 'The Report Inquiry',
        scene_text: "A coworker asks another, lightly, 'Did you finish the report last night or are we still waiting on it?' The guy responds, 'Yeah, no, I mean, I was going to, I got caught up with some stuff, but it's basically done, I just need to format it, it'll be ready, I promise, don't worry about it.'",
        read_line: "He was defending against an accusation nobody made — which means he'd already made it against himself."
      },
      {
        id: 'ch10-s3',
        setting: 'Family / Text Thread',
        title: "The Mother's Birthday RSVP",
        scene_text: "A sibling asks in the family group chat, 'Are you coming to Mom's birthday this year?' The response: 'Yes!! Of course, wouldn't miss it, I already requested the day off work, I've had it marked on my calendar for months, I'm so excited, tell her I said hi.'",
        read_line: 'A yes/no question got a five-sentence victory lap. Nobody doubted the answer until the answer showed up working this hard to be believed.'
      }
    ],
    action_steps: [
      {
        id: 'ch10-a1',
        step_number: 1,
        title: 'Measure Response Energy Against Question Size',
        instruction: 'A casual question should get a proportionally small answer. When the response arrives dramatically oversized — extra detail, extra repetition, extra emphasis — that size mismatch is the actual data point.',
        tied_to_ch5: false
      },
      {
        id: 'ch10-a2',
        step_number: 2,
        title: 'Count the Repeats Within One Breath',
        instruction: 'One denial is just an answer. Two or three variations of the same denial in one breath is the tell. Note how many times they said essentially the same thing in different words.',
        tied_to_ch5: false
      },
      {
        id: 'ch10-a3',
        step_number: 3,
        title: 'Separate Over-Explaining from Over-Denying',
        instruction: 'Over-explaining usually signals guilt or discomfort about an adjacent topic. Over-denying usually means the direct question struck a raw nerve. Track which channel is firing.',
        tied_to_ch5: false
      },
      {
        id: 'ch10-a4',
        step_number: 4,
        title: 'Chapter 5 Code: Do Not Detonate the Mismatch',
        instruction: "The amateur reflex is to push harder the second you clock overcorrection — 'why are you being so defensive?' That just causes more panic. Sit with what you caught. The code governs: understanding the pressure point, not blowing it up for a cheap win.",
        tied_to_ch5: true
      },
      {
        id: 'ch10-a5',
        step_number: 5,
        title: 'Watch for Recurrence Across Future Encounters',
        instruction: 'A one-time overcorrection might just be an off moment. If the same subject reliably produces oversized responses every time it surfaces, that is a mapped pressure point for Chapter 16 pattern tracking.',
        tied_to_ch5: false
      }
    ],
    quick_debrief: {
      lines: [
        "A small question doesn't need three denials to answer it.",
        'Over-explaining and over-denying are cousins, but they point to different nerves.',
        "Count the repeats. Don't push the second you notice them.",
        "The size of the 'no' tells you the size of what's actually underneath it."
      ]
    }
  },
  {
    id: 'ch11',
    number: 11,
    title: 'Contradiction & Inconsistency',
    part: 'Part II — The Targets',
    references: ['ch5', 'ch16'],
    intel_brief: {
      summary: [
        "Every other leak type in this book catches something in a single moment — a slip, a joke, a denial that ran too long. This one's different. This one doesn't live in a moment at all. It lives in the space between two moments, sometimes days or weeks apart, and you only catch it if you're running a long enough tape to compare the footage.",
        "Here's the doctrine: a true story doesn't need to be rebuilt every time it's told. It just gets repeated. The details might shift slightly in emphasis — people summarize, they skip boring parts. What's not normal is when the actual architecture of the story changes — a different order of events, a detail that flips from 'with him' to 'alone,' a timeline that quietly moves.",
        'A memory of something real is stored once and pulled from the same file every time. A story that is being managed on the fly gets rebuilt from scratch each telling, and rebuilt things do not always come out identical.',
        "Not every inconsistency is a cover-up. Real memory is genuinely reconstructive. The skill isn't 'catch every inconsistency and assume the worst.' The skill is noticing which inconsistencies actually matter — the load-bearing ones that shift blame, timeline, or cast."
      ],
      academic_ground: "Memory researchers have shown for decades that human memory isn't a recording that plays back identically — it's reconstructed each time it's retrieved, which means small distortions creep in naturally even in people telling the truth (Loftus, 1979). That's exactly why you don't treat every inconsistency as proof of a lie. You treat the load-bearing architecture shifts as intel worth tracking.",
      hook_line: "A true story repeats. A managed one gets rebuilt — and rebuilt things don't always match the blueprint."
    },
    street_recon: [
      {
        id: 'ch11-s1',
        setting: 'Friend Group / Hangout',
        title: 'The Party Exit Timeline',
        scene_text: "A guy tells the group one week that he left a party early because he 'wasn't feeling well.' Two weeks later, retelling the same night to a different friend within earshot, he says he left early because 'it was getting kind of awkward with someone there.' Different reason, same event, same night.",
        read_line: "The reason changed. The night didn't. Something about that night is still being managed."
      },
      {
        id: 'ch11-s2',
        setting: 'Romantic / Relationship Check',
        title: 'The Running Late Cause',
        scene_text: "She tells her partner she was running late because traffic was bad. A few days later, describing the same evening to a friend on speakerphone, she says she was running late because she 'lost track of time at the gym.' Same lateness, two different causes.",
        read_line: "The story wasn't rebuilt because she forgot — it was rebuilt because the two audiences needed two different versions."
      },
      {
        id: 'ch11-s3',
        setting: 'Workplace / Post-Mortem',
        title: 'The Missed Deadline Pivot',
        scene_text: "A coworker explains to the team that a deadline was missed because a client changed requirements last minute. A month later, in a casual one-on-one, the same coworker mentions the deadline slipped because they'd 'just gotten swamped and lost track of it.'",
        read_line: "The client excuse was the managed version. The offhand version, told with no stakes in the room, was probably closer to the truth."
      }
    ],
    action_steps: [
      {
        id: 'ch11-a1',
        step_number: 1,
        title: 'Log Load-Bearing Details Exclusively',
        instruction: 'You do not need to remember every word. You need to remember the structural pillars: who was there, what caused what, what order things happened in. Those are the details worth checking against the next telling.',
        tied_to_ch5: false
      },
      {
        id: 'ch11-a2',
        step_number: 2,
        title: 'Distinguish Shifting Emphasis from Shifting Architecture',
        instruction: 'A story that gets shorter or highlights different parts depending on audience is normal. A story where cause, timeline, or cast flips is architecture shift. Only track architecture shifts.',
        tied_to_ch5: false
      },
      {
        id: 'ch11-a3',
        step_number: 3,
        title: "Never Announce the Catch as a 'Gotcha'",
        instruction: "The second you say 'wait, that's not what you said last time,' you turn reconnaissance into interrogation, and you'll get a hastily built third version. Note the discrepancy privately.",
        tied_to_ch5: false
      },
      {
        id: 'ch11-a4',
        step_number: 4,
        title: 'Chapter 5 Code: Weigh Honest Memory Static',
        instruction: 'Human memory drifts naturally. Judging someone as dishonest off normal memory static is exactly the overreach Chapter 5 warns against. Only weigh load-bearing shifts that reassign blame or cover actions.',
        tied_to_ch5: true
      },
      {
        id: 'ch11-a5',
        step_number: 5,
        title: 'Build the Timeline Across Tellings',
        instruction: "This leak type only works if you're patient enough to let time pass and compare versions. Don't try to catch it in a single conversation. This rewards the operative willing to wait.",
        tied_to_ch5: false
      }
    ],
    quick_debrief: {
      lines: [
        'A true story repeats. A managed one gets rebuilt each time.',
        'Watch the architecture, not the emphasis — cause, order, and cast are what matter.',
        "Don't announce the catch. Let more versions accumulate first.",
        'Memory drifts honestly too — judge the load-bearing shifts, not the static.'
      ]
    }
  },
  {
    id: 'ch12',
    number: 12,
    title: 'Projection',
    part: 'Part II — The Targets',
    references: ['ch4', 'ch5'],
    intel_brief: {
      summary: [
        'Chapter 4 gave you a preview of this one — the idea that a lot of backhanded compliments are really the speaker own insecurity wearing your name. This chapter takes that idea and runs it as its own full target, because projection shows up way beyond compliments.',
        "Here's the mechanism, stripped down: projection happens when someone has a trait, fear, or impulse they cannot comfortably own in themselves, so their mind relocates it — assigns it to someone else instead, usually someone close enough to make the assignment feel plausible. Once it's relocated, they get to react to you as if the thing lives in you.",
        "The tell is almost always specificity that doesn't match the evidence. Somebody accuses you of being controlling with almost no actual controlling behavior on your part to point to — but they can describe exactly what 'controlling' looks like, in vivid, oddly detailed terms.",
        "Not everything uncomfortable somebody says about you is projection. The skill isn't reflexively deflecting every criticism as 'that's really about you.' That's its own manipulation. The skill is checking the evidence against the accusation, honestly, before you decide which direction the mirror is actually facing."
      ],
      academic_ground: "Projection as a concept traces back to Freud's work on defense mechanisms — the mind attributing its own unacceptable impulses to someone else to manage internal conflict (Freud, 1936; Anna Freud, 1937). What people accuse others of, absent real evidence, often maps closely onto what they are least comfortable admitting about themselves.",
      hook_line: "When someone hands you a read on yourself that doesn't fit the evidence but fits them perfectly, you're not being read. You're being used as a mirror."
    },
    street_recon: [
      {
        id: 'ch12-s1',
        setting: 'Workplace / Team Dynamics',
        title: 'The Competitive Accusation',
        scene_text: "A manager tells an employee, out of nowhere, 'You need to stop being so competitive with everyone on this team, it's not a good look.' The employee has no actual track record of competitive behavior. The manager, meanwhile, is known for angling for credit on shared projects.",
        read_line: "The accusation described the manager's own habit in vivid detail, wearing the employee's name."
      },
      {
        id: 'ch12-s2',
        setting: 'Street / Neighborhood Gathering',
        title: 'The Spotlight Accusation',
        scene_text: "An old friend tells another, out of nowhere during a casual hangout, 'You always gotta be the center of attention, you know that?' The friend being accused is famously the quiet one in every group setting. The accuser is the one who redirects every story back to himself.",
        read_line: "The read didn't match the person it landed on. It matched the person who threw it."
      },
      {
        id: 'ch12-s3',
        setting: 'Family / Father & Son Talk',
        title: 'The Easy Way Out Accusation',
        scene_text: "A father tells his son, with real heat behind it, 'You're always looking for the easy way out, you don't want to put in real work.' The son has worked hard and stuck with difficult things his whole life. The father left multiple jobs and relationships the moment they got hard.",
        read_line: "The accusation was a biography — just filed under the wrong name."
      }
    ],
    action_steps: [
      {
        id: 'ch12-a1',
        step_number: 1,
        title: 'Check Evidence Before Checking Accusation',
        instruction: 'Ask honestly: is there an actual track record supporting this read on me, or is the accusation arriving with more heat and detail than my behavior justifies? Skipping this step turns you into someone who evades real accountability.',
        tied_to_ch5: false
      },
      {
        id: 'ch12-a2',
        step_number: 2,
        title: 'Notice Unusually Specific Detail with Thin Proof',
        instruction: "Projected accusations tend to come with a level of internal, almost scripted detail that feels borrowed from somewhere else — because it usually is their own internal monologue.",
        tied_to_ch5: false
      },
      {
        id: 'ch12-a3',
        step_number: 3,
        title: 'Test If the Sentence Fits the Accuser',
        instruction: 'Hold the exact wording up against what you know about the person saying it. If it maps suspiciously well onto their own patterns, you have found the actual source of the transmission.',
        tied_to_ch5: false
      },
      {
        id: 'ch12-a4',
        step_number: 4,
        title: 'Chapter 5 Code: Never Flip the Mirror in the Room',
        instruction: "Saying 'that's actually you, not me' in real time rarely lands as insight. It lands as a counter-attack. Hold the read privately. Use it for your own clarity about where they are coming from, not as ammunition to flip back.",
        tied_to_ch5: true
      },
      {
        id: 'ch12-a5',
        step_number: 5,
        title: 'Track Repeated Projections as a Profile',
        instruction: 'If the same person keeps assigning you the same trait without evidence, that is not about you at all — it is a consistent window into what they carry and cannot own.',
        tied_to_ch5: false
      }
    ],
    quick_debrief: {
      lines: [
        'Check the evidence first — not every hard read is a mirror.',
        'Vivid detail with thin proof usually comes from somewhere else.',
        "Don't flip it back at them in the moment. Hold it, understand it, move on.",
        'When the accusation doesn’t fit you, ask whose biography it actually is.'
      ]
    }
  },
  {
    id: 'ch13',
    number: 13,
    title: 'Body Leaks',
    part: 'Part II — The Targets',
    references: ['ch5', 'ch14'],
    intel_brief: {
      summary: [
        "Everything up to this chapter has been signal you catch with your ears. Time to widen the aperture, because the mouth isn't the only thing that leaks under pressure — the body's been broadcasting the entire time, usually louder and less filtered than anything that came out as words.",
        "Here's why the body is actually a more honest witness than the mouth: speech goes through the editor. There's a censor stationed at the mouth specifically. The body doesn't have the same checkpoint.",
        'Four tells worth knowing cold: The stutter or verbal stumble — a physical hitch in delivery. The look-away — eyes breaking contact specifically at the moment a sensitive subject comes up. The fidget — hands, feet, or objects suddenly needing something to do. The posture shift — a body closing down, curling in, shifting back.',
        "None of these mean anything in isolation. A stutter might just be fatigue. The tell only becomes intel when it shows up specifically timed to a specific topic — a baseline shift, not a random data point."
      ],
      academic_ground: "Behavioral researchers studying deception and stress consistently caution that no single non-verbal cue reliably indicates dishonesty on its own — what matters is a shift away from someone's individual baseline behavior, triggered at a specific and repeatable moment (DePaulo et al., 2003). You're not reading a universal dictionary. You're reading this specific person's baseline.",
      hook_line: "The mouth has a censor stationed at the door. The body never got the memo."
    },
    street_recon: [
      {
        id: 'ch13-s1',
        setting: 'Romantic / First Date',
        title: 'The Career Inquiry Shift',
        scene_text: "Everything's relaxed — open posture, easy eye contact — until she asks him what he does for work, and specifically what he's been up to career-wise 'lately.' His shoulders pull in half an inch, he breaks eye contact to check his drink, and there's a half-second stall before he answers. Conversation resumes normally right after.",
        read_line: 'The topic, not the fatigue, triggered the shift — and it recovered the instant the subject moved on.'
      },
      {
        id: 'ch13-s2',
        setting: 'Workplace / Interview',
        title: 'The Resume Gap Hands',
        scene_text: "A candidate is calm and articulate through most of the interview, hands resting easily on the table. The moment the interviewer asks about the gap in her resume last year, her hands move to her lap and stay there for the rest of that answer, then return to the table once the topic changes.",
        read_line: 'The hands went somewhere safer exactly when the subject got less safe.'
      },
      {
        id: 'ch13-s3',
        setting: 'Friend Group / Lounge',
        title: 'The Phone Tap Fidget',
        scene_text: "A guy is loose and talkative all night — until someone brings up a mutual friend he supposedly hasn't spoken to in months. Mid-sentence, he starts tapping his phone against his leg, a fidget nobody had seen from him all evening, and it stops the second the conversation moves elsewhere.",
        read_line: 'The fidget arrived on cue with the name and left on cue with the subject change.'
      }
    ],
    action_steps: [
      {
        id: 'ch13-a1',
        step_number: 1,
        title: 'Establish Resting Baseline First',
        instruction: "You cannot clock a shift in someone's behavior if you don't know what their resting state looks like. Spend the first few minutes noting how this specific person naturally holds themselves when nothing is at stake.",
        tied_to_ch5: false
      },
      {
        id: 'ch13-a2',
        step_number: 2,
        title: 'Look for Shifts Timed to Topics Exclusively',
        instruction: 'A fidget, a look-away, a posture change — none of it matters in isolation. What matters is whether the shift arrived at the exact moment a specific subject came up, and resolved once it passed.',
        tied_to_ch5: false
      },
      {
        id: 'ch13-a3',
        step_number: 3,
        title: 'Never Read a Single Cue as a Verdict',
        instruction: 'One crossed-arm moment means almost nothing on its own. Wait for a cluster — several different tells converging on the same topic — before you treat it as real intel.',
        tied_to_ch5: false
      },
      {
        id: 'ch13-a4',
        step_number: 4,
        title: 'Stay Physically Still While Observing',
        instruction: "Just like reacting verbally tips someone off that you caught a slip, reacting physically — staring or leaning in — alerts them that their body just told on them. Keep your own baseline calm.",
        tied_to_ch5: false
      },
      {
        id: 'ch13-a5',
        step_number: 5,
        title: 'Chapter 5 Code: No Parlor Tricks with Physical Tells',
        instruction: "Reading someone's body under pressure is not license to corner them. This is quiet reconnaissance for your own understanding — not a party trick where you announce 'I saw your hands get nervous.' That serves your ego, not your clarity.",
        tied_to_ch5: true
      }
    ],
    quick_debrief: {
      lines: [
        'The mouth has a censor. The body never got trained to lie.',
        'One crossed arm means nothing — a cluster timed to a topic means everything.',
        "Know their baseline first, or you're just guessing with extra steps.",
        'Stay still while you watch. Your own body is broadcasting too.'
      ]
    }
  },
  {
    id: 'ch14',
    number: 14,
    title: 'Digital Leaks',
    part: 'Part II — The Targets',
    references: ['ch5', 'ch9', 'ch10'],
    intel_brief: {
      summary: [
        "Most of your actual surveillance these days doesn't happen in a room at all. It happens in a thread, on a screen, in the gaps between messages — and that terrain has its own tells.",
        "Digital communication strips out tone and body, but it adds metadata: Response time. Read receipts. Message edits. Typing indicators that start and stop. None of that existed for a face-to-face conversation, and all of it is honest in ways the actual words often aren't.",
        "Response-time shifts: Someone who normally replies within minutes suddenly taking hours on a specific topic is processing time showing up as delay. Read-without-reply is the digital equivalent of the non-answer from Chapter 9, with a timestamp attached.",
        "The over-punctuated or over-emoji'd reply is digital overcorrection from Chapter 10, wearing exclamation points and heart emojis instead of extra words."
      ],
      academic_ground: "Researchers studying computer-mediated communication have found that the reduced-cue environment of digital text doesn't eliminate emotional leakage, it just relocates it into different channels: timing, punctuation, message length, and editing behavior all carry meaningful signal (Walther, 1996). The leak didn't disappear. It just changed uniforms.",
      hook_line: "The words on the screen are the least honest part of the message. The timestamp never learned how to lie."
    },
    street_recon: [
      {
        id: 'ch14-s1',
        setting: 'Romantic / Direct Message',
        title: 'The Six-Hour Read Receipt',
        scene_text: "He usually replies within a couple minutes, all day, every day — that's his baseline. She sends a message asking if he's free this weekend to meet her parents. It sits on 'read' for six hours before a reply comes back: 'yeah should work, lemme check.'",
        read_line: 'Six hours of silence on a normally instant responder is its own kind of answer, delivered entirely in timestamps.'
      },
      {
        id: 'ch14-s2',
        setting: 'Friend Group / Group Chat',
        title: 'The Phantom Reactions',
        scene_text: "Someone posts a message venting about a mutual friend, then deletes it four minutes later and replaces it with 'nvm ignore that.' Two people had already reacted with laughing emojis before it vanished — reactions now sitting under a message that no longer exists.",
        read_line: 'The reactions survived the deletion. The confession did not fully make it out the door before the courier tried to grab it back.'
      },
      {
        id: 'ch14-s3',
        setting: 'Workplace / Slack Direct Message',
        title: 'The Punctuation Deluge',
        scene_text: "A coworker usually replies to direct messages with a quick line or two. After being asked whether they'd mentioned a certain project delay to the manager yet, the reply comes back forty-five minutes later: 'Yes!! Definitely already handled that, no worries at all, we're all good, appreciate you checking in though!!'",
        read_line: 'The punctuation was working overtime to sell something the words alone were not quite selling.'
      }
    ],
    action_steps: [
      {
        id: 'ch14-a1',
        step_number: 1,
        title: 'Establish Digital Baseline Before Measuring Latency',
        instruction: 'Know how fast this specific person usually replies, how they punctuate, whether they double-text. Without a baseline, a slow reply is just a slow reply — you need to know what slow for them looks like.',
        tied_to_ch5: false
      },
      {
        id: 'ch14-a2',
        step_number: 2,
        title: 'Treat Read-Without-Reply as a Timestamped Non-Answer',
        instruction: 'Apply Chapter 9 directly: silence after they have clearly seen the message is a real response. Note how long it lasted and what was being asked when it started.',
        tied_to_ch5: false
      },
      {
        id: 'ch14-a3',
        step_number: 3,
        title: 'Catch What Survives an Edit or Deletion',
        instruction: 'Reactions, replies referencing a deleted message, or memory of what you read before it vanished are all valid intel. The attempt to erase it is itself information.',
        tied_to_ch5: false
      },
      {
        id: 'ch14-a4',
        step_number: 4,
        title: 'Watch for Digital Overcorrection',
        instruction: 'A calibrated reply matches the size of the question. An answer that shows up dressed in exclamation points and reassurance nobody asked for is working harder than the moment required.',
        tied_to_ch5: false
      },
      {
        id: 'ch14-a5',
        step_number: 5,
        title: 'Chapter 5 Code: Screenshot Restraint Doctrine',
        instruction: 'Digital leaks come with a unique temptation: you can screenshot them and produce them as exhibits in an argument. Resist this strictly. Logging something privately for your own clarity is the code in action. Weaponizing screenshots in fights is prohibited.',
        tied_to_ch5: true
      }
    ],
    quick_debrief: {
      lines: [
        'The words are the least honest part of a message. The timestamp never learned to lie.',
        'Read-without-reply is a non-answer with a clock attached to it.',
        'A deleted message still leaves fingerprints — reactions, memory, the gap it left behind.',
        'Know their baseline first. A slow reply only means something if slow is new.'
      ]
    }
  },
  {
    id: 'ch15',
    number: 15,
    title: 'The Compliment Sandwich & Passive Aggression',
    part: 'Part III — Synthesis & Defense',
    references: ['ch5', 'ch6', 'ch8'],
    intel_brief: {
      summary: [
        'Time to draw a line that has been sitting underneath this whole book without ever getting named directly: everything you have caught so far — the slips, the overcorrections, the body leaks — was unconscious. Nobody in those chapters sat down beforehand and planned what was about to leak out of them.',
        'This chapter is different terrain. The compliment sandwich and passive aggression are not accidents. They are built. Somebody sat with a real criticism, a real resentment, a real piece of hostility they did not want to deliver raw — and instead of it slipping out sideways under pressure, they engineered a delivery system for it. That is not a leak anymore. That is a maneuver.',
        "The Compliment Sandwich runs a simple architecture: praise, then the real criticism, then praise again, closing the bread on both sides so the meat in the middle goes down easier. Strip the bread off and what's left is the entire actual message.",
        "Passive aggression is the sandwich's angrier cousin — hostility that refuses to travel as a direct statement, choosing instead to arrive as a sigh, a 'no, it's fine,' a cabinet slammed just hard enough. Both let somebody say the hard thing without ever fully standing behind having said it."
      ],
      academic_ground: "Communication researchers studying indirect aggression note that passive-aggressive behavior functions specifically to express hostility while preserving deniability and avoiding social confrontation risks (Long, Long, & Whitson, 2008). The sandwich and the sigh are cousins: both let somebody throw a punch while holding an exit pass.",
      hook_line: "A maneuver isn't a leak. It's a decision that already knew exactly what it wanted to get away with."
    },
    street_recon: [
      {
        id: 'ch15-s1',
        setting: 'Workplace / Performance Review',
        title: 'The Deadline Cushion',
        scene_text: "A manager tells his direct report, 'You've really grown a lot this year — I do want to flag that a few of your deadlines have slipped, that's something to watch — but overall, I'm proud of the progress.' The employee walks out remembering 'proud of the progress.'",
        read_line: 'The bread did its job. The meat still landed, just softer than it would have raw.'
      },
      {
        id: 'ch15-s2',
        setting: 'Family / Kitchen',
        title: 'The Dishwasher Clank',
        scene_text: "A wife asks her husband if he's upset about something. He says, 'No, it's fine,' sighs loud enough to be heard in the next room, then washes the dishes hard enough that they clank. Nobody said the word 'angry.'",
        read_line: 'The silence was doing the talking the words refused to do.'
      },
      {
        id: 'ch15-s3',
        setting: 'Friend Group / Dinner Departure',
        title: 'The Early Exit',
        scene_text: "A friend gets left off an invite to a small dinner. Next time the group's together, she's unusually quiet, gives clipped one-word answers when normally she's the loudest one in the room, and leaves 'a little early' without much explanation.",
        read_line: 'The exit was louder than any accusation she could have made out loud.'
      }
    ],
    action_steps: [
      {
        id: 'ch15-a1',
        step_number: 1,
        title: 'Triage: Is This a Leak or a Maneuver?',
        instruction: 'Before running any technique, sort what you are looking at. An unconscious slip is about strain. A deliberate soft-pedal is about strategy. Do not collapse the two just because both feel indirect.',
        tied_to_ch5: false
      },
      {
        id: 'ch15-a2',
        step_number: 2,
        title: 'Strip the Bread Off the Sandwich',
        instruction: 'Take out the opening praise and the closing praise and read only what is left in the middle. That middle sentence, alone, is the entire actual message.',
        tied_to_ch5: false
      },
      {
        id: 'ch15-a3',
        step_number: 3,
        title: 'Name Passive Aggression by Its Function',
        instruction: 'A sigh, a slammed cabinet, a clipped answer — ask yourself what plain-language sentence the behavior is substituting for because someone lacked courage or safety to speak.',
        tied_to_ch5: false
      },
      {
        id: 'ch15-a4',
        step_number: 4,
        title: 'Chapter 5 Code: Do Not Mirror Indirection',
        instruction: 'The tempting move is to get passive-aggressive right back, matching sigh for sigh. That doubles the maneuvering. Recognizing the maneuver gives you the option of naming it calmly later on your terms — never playing the indirect game back.',
        tied_to_ch5: true
      },
      {
        id: 'ch15-a5',
        step_number: 5,
        title: 'Weigh Whether a Maneuver Deserves Grace',
        instruction: 'A maneuver is sometimes someone trying, however clumsily, to manage a hard moment without detonating it. That is not always malice — sometimes it is an attempt at kindness that came out sideways.',
        tied_to_ch5: false
      }
    ],
    quick_debrief: {
      lines: [
        'A slip is an accident. A maneuver already knew what it wanted.',
        'Strip the bread off the sandwich — the middle is the whole message.',
        'A sigh is a sentence nobody felt safe saying straight.',
        "Don't match indirection with indirection. Name it plain, on your terms, later."
      ]
    }
  },
  {
    id: 'ch16',
    number: 16,
    title: 'Pattern Tracking',
    part: 'Part III — Synthesis & Defense',
    references: ['ch5', 'ch10', 'ch11'],
    intel_brief: {
      summary: [
        'Everything in Part II trained you to catch one thing at a time. A slip. A joke that tested too clean. A denial that ran three sentences too long. That is necessary training. It is also incomplete — because a single caught leak is a photograph, and a photograph only tells you what a room looked like for a tenth of a second.',
        'Here is the doctrine: one leak is a moment. A pattern is a person. You can catch somebody in a single overcorrection and learn almost nothing real. But if that same person overcorrects every single time a certain topic comes up, across weeks, that is a permanent feature of how they are built.',
        'This is where logging things instead of reacting pays dividends. A log with one entry is a curiosity. A log with fifteen entries across three months is a profile, and a profile tells you things about a person that they may not even know about themselves.',
        'Real pattern tracking means holding judgment loosely for a long time — sometimes months — while the evidence either stacks up or falls apart on its own.'
      ],
      academic_ground: "Behavioral researchers who study long-term observation find single-incident judgments far less reliable than repeated observations across varied contexts (Snyder & Ickes, 1985). One moment has a hundred innocent explanations. Ten data points pointing the same direction have far fewer.",
      hook_line: "A single leak tells you what happened. A pattern tells you who you're actually dealing with."
    },
    street_recon: [
      {
        id: 'ch16-s1',
        setting: 'Romantic / Four-Month Timeline',
        title: 'The Previous Relationship Topic',
        scene_text: "Over four months, a woman notices her boyfriend gets specifically evasive — shorter answers, faster subject changes, a slight posture shift — every single time his previous relationship comes up, no matter who brings it up or how casually.",
        read_line: 'The topic itself had become a mapped pressure point, not a one-time sore spot.'
      },
      {
        id: 'ch16-s2',
        setting: 'Workplace / Account Reviews',
        title: 'The Specific Client Tell',
        scene_text: "A team lead starts noticing that one particular coworker only ever overcorrects — extra reassurance, extra detail, extra emphasis — specifically around questions involving a certain client account, and never around anything else.",
        read_line: 'The pattern pointed to a location, not a general character flaw — something specific was live around that one account.'
      },
      {
        id: 'ch16-s3',
        setting: 'Friend Group / Summer Hangouts',
        title: 'The Future Move Silence',
        scene_text: "A guy notices that one friend, across six separate hangouts over a summer, always goes quiet and changes the subject the instant anyone mentions moving away or long-term plans. It's never dramatic.",
        read_line: 'Six quiet moments, same trigger, same response, meant there was a real fear about the future nobody had named out loud.'
      }
    ],
    action_steps: [
      {
        id: 'ch16-a1',
        step_number: 1,
        title: 'Maintain a Written Running Log, Not Mental Memory',
        instruction: "Memory smooths patterns out over time. If you are serious about tracking a pattern, write it down every time you catch an instance. Your memory of 'this happens a lot' is far less reliable than an actual dated list.",
        tied_to_ch5: false
      },
      {
        id: 'ch16-a2',
        step_number: 2,
        title: 'Track the Specific Trigger, Not Just the Tell',
        instruction: 'The tell matters less than what specifically triggered it each time. A pattern is only a pattern if the same trigger keeps producing the same response. Random tells with no common thread are just noise.',
        tied_to_ch5: false
      },
      {
        id: 'ch16-a3',
        step_number: 3,
        title: 'Demand Real Time Before Finalizing Conclusions',
        instruction: 'A pattern claimed after two data points is a hunch wearing a pattern clothes. Wait through enough repetitions across different contexts that coincidence stops being reasonable.',
        tied_to_ch5: false
      },
      {
        id: 'ch16-a4',
        step_number: 4,
        title: 'Let Contradictory Data Kill the Hypothesis',
        instruction: 'If new information does not fit the pattern, update the profile. Only an amateur protects a theory they have gotten emotionally attached to.',
        tied_to_ch5: false
      },
      {
        id: 'ch16-a5',
        step_number: 5,
        title: 'Chapter 5 Code: Heavy Intel Demands Heavier Restraint',
        instruction: 'A pattern is a sharper, more confident piece of intel, which makes it more tempting to weaponize. The code does not get lighter just because your evidence got heavier. A confirmed pattern is for personal navigation, never a dossier to read out loud in a fight.',
        tied_to_ch5: true
      }
    ],
    quick_debrief: {
      lines: [
        'One leak is a moment. A pattern is a person.',
        'Log the trigger every time — memory smooths patterns out on its own.',
        'Give it real time. Two data points is a hunch, not a pattern.',
        "Heavier evidence doesn't earn you a lighter code."
      ]
    }
  },
  {
    id: 'ch17',
    number: 17,
    title: 'Cross-Referencing Intel',
    part: 'Part III — Synthesis & Defense',
    references: ['ch5', 'ch6', 'ch16'],
    intel_brief: {
      summary: [
        "Chapter 16 taught you to track one leak type across time. This chapter teaches you something different: tracking multiple leak types at the same time, around the same event, until they either confirm each other or cancel each other out.",
        "Real conversations do not hand you leaks one at a time, cleanly labeled by chapter. They hand you a slip, a contradiction, a fidget, and a joke that landed a little too specific, all wrapped around the same subject in twenty minutes.",
        'Think of it like triangulation. One compass bearing tells you a direction, not a location. Two bearings from two different positions narrow it down to a point. Stack two or three pointing at the same target, and you are not guessing anymore — you have triangulated an actual position.',
        'Cross-referencing happens in real time, even though you do not act on it in real time. It demands staying sharp enough to notice three different instruments confirming the same reading.'
      ],
      academic_ground: "Investigative and clinical fields rely on convergent validity — the idea that a conclusion becomes far more trustworthy when multiple independent sources of evidence, using different methods, all point to the same answer (Campbell & Fiske, 1959). One leak could be coincidence; three distinct leak types on one subject are convergent proof.",
      hook_line: "One bearing tells you a direction. Three bearings on the same target tell you where they actually are."
    },
    street_recon: [
      {
        id: 'ch17-s1',
        setting: 'Romantic / Anniversary Dinner',
        title: 'The Work Trip Triangulation',
        scene_text: "Over one dinner, a man's partner notices three separate things live around his upcoming work trip: First, a joke: 'Guess I'll have plenty of freedom that week, huh.' Later, when she asks who is going, a half-second stall and subject change. Later still, an overcorrected assurance: 'It's literally just work, I promise, nothing else going on.'",
        read_line: 'Three different leak types — cover fire, body hitch, overcorrection — all orbiting the same trip in one hour triangulated to the same coordinate.'
      },
      {
        id: 'ch17-s2',
        setting: 'Workplace / All-Hands Meeting',
        title: 'The Reorg Three-Point Cluster',
        scene_text: "During one meeting, a manager says 'the old team will be — the current team' (micro-confession), gets unusually defensive and over-explains when someone questions the timeline (overcorrection), then pressed directly gives a technically-true non-answer: 'I can only speak to what's been finalized so far.'",
        read_line: 'Nobody could point to any single moment as proof. Together, they left very little room for an innocent explanation.'
      },
      {
        id: 'ch17-s3',
        setting: 'Friend Group / Evening Gathering',
        title: 'The Omission Triad',
        scene_text: "At one gathering, a friend jokes about 'not really being invited to things anymore' (cover fire), goes quiet and looks away when a recent trip comes up (body leak), and later tells two slightly different versions of why he skipped the last hangout (contradiction).",
        read_line: 'Only cross-referencing all three in hindsight revealed there was a real grievance running underneath the whole night.'
      }
    ],
    action_steps: [
      {
        id: 'ch17-a1',
        step_number: 1,
        title: 'Tag Every Leak with Subject, Not Just Type',
        instruction: "Don't just log 'he made a joke' or 'she looked away.' Log what the tell was actually about. The subject tag is what lets you notice later that three different leak types all orbit the exact same coordinate.",
        tied_to_ch5: false
      },
      {
        id: 'ch17-a2',
        step_number: 2,
        title: 'Actively Seek a Second Bearing Before Believing the First',
        instruction: 'The instant you catch one leak, resist treating it as settled. Ask whether anything else in the conversation points at the same subject. One bearing is a lead. Two is a location.',
        tied_to_ch5: false
      },
      {
        id: 'ch17-a3',
        step_number: 3,
        title: 'Never Force a Triangulation That Is Not There',
        instruction: 'Confirmation bias is hazardous here. If you catch one real leak and then start interpreting neutral moments as evidence just to complete the picture, you have stopped listening and started manufacturing.',
        tied_to_ch5: false
      },
      {
        id: 'ch17-a4',
        step_number: 4,
        title: 'Chapter 5 Code: Certainty Does Not Grant License',
        instruction: 'A cross-referenced conclusion is as confident as intel gets. That certainty is exactly why the code matters more here, not less. More certainty is never permission to confront or weaponize. It is permission to understand more completely for yourself.',
        tied_to_ch5: true
      },
      {
        id: 'ch17-a5',
        step_number: 5,
        title: 'Log When the Bearings Disagree',
        instruction: "Sometimes a second signal contradicts the first. That is valuable too. A body leak that doesn't match a verbal leak might mean the reality is complicated — and complicated is closer to truth than an overly neat story.",
        tied_to_ch5: false
      }
    ],
    quick_debrief: {
      lines: [
        'One leak is a direction. Three on the same target is a location.',
        'Tag the subject, not just the type — that lets you connect them later.',
        "Don't manufacture a triangulation just because you want the picture whole.",
        'More certainty earns more understanding, never more license.'
      ]
    }
  },
  {
    id: 'ch18',
    number: 18,
    title: 'Counter-Intelligence',
    part: 'Part III — Synthesis & Defense',
    references: ['ch5', 'ch10'],
    intel_brief: {
      summary: [
        'Seventeen chapters in, and there is a question this book has been quietly avoiding until now: if everybody leaks, that includes you. Every technique you have learned to spot in somebody else has a mirror version running in your own conversations, right now, whether you have been paying attention or not.',
        'You cannot fully seal your own leaks by trying harder to control your words. The censor at the mouth was never the whole system. Your body still shifts when a topic gets close to something real. Your denials still get longer than the moment requires when something is actually bothering you.',
        'Awareness changes the math. You cannot stop having an unconscious. You can build the habit of noticing, after the fact, when your own overcorrection ran three sentences too long, or when your own joke had an exit ramp built in before you finished the sentence.',
        "Counter-intelligence isn't about becoming a robot with no leaks at all. It's about knowing exactly what you're broadcasting, so you're never finding out secondhand what you've apparently been saying all along."
      ],
      academic_ground: "Research on self-monitoring — the degree to which people track and adjust their own behavior based on social context — has found people high in self-monitoring catch their own unintended signals in real time not because they leak less, but because they have built the habit of observing themselves (Snyder, 1974).",
      hook_line: "Everybody leaks. The only real choice is whether you're the one who catches it first."
    },
    street_recon: [
      {
        id: 'ch18-s1',
        setting: 'Workplace / Salary Negotiation',
        title: 'The Over-Explaining Reset',
        scene_text: "A man is asking his boss for a raise he's earned, but has real doubt about getting it. Mid-conversation, he catches himself over-explaining his case, stacking justification on justification — and realizes the size of his argument is broadcasting the doubt he wanted to hide. He stops, resets, and delivers the ask in one clean sentence.",
        read_line: 'He caught his own overcorrection before it finished talking him out of the room.'
      },
      {
        id: 'ch18-s2',
        setting: 'Romantic / Disagreement',
        title: 'The Sarcasm Audit',
        scene_text: "Mid-disagreement, a woman notices her own joke land a little too specific — 'guess I'm just used to doing everything myself around here' — and clocks, a half-second later, that it wasn't a joke, it was cover fire for real resentment. Instead of retreating to 'I'm just kidding,' she owns it: 'Actually — that wasn't a joke. Can we talk about that for real?'",
        read_line: 'She caught her own probe before it could hide behind its own deniability.'
      },
      {
        id: 'ch18-s3',
        setting: 'Professional / Job Interview Post-Game',
        title: 'The Detail Drift Catch',
        scene_text: "A candidate notices, afterward, replaying an interview in her head, that every time she was asked about her last job, her answers got noticeably longer and more detailed than any other question. She can't fix that interview, but logs it and walks into the next one watching for the tell in herself.",
        read_line: 'She turned the surveillance inward and used the pattern against her own next performance, not someone else’s.'
      }
    ],
    action_steps: [
      {
        id: 'ch18-a1',
        step_number: 1,
        title: 'Run Your Own Post-Game Replay',
        instruction: 'After a high-stakes conversation, replay it the way you would analyze somebody else — where did you overcorrect, where did a joke carry more truth than you meant to admit, where did your body do something unauthorized?',
        tied_to_ch5: false
      },
      {
        id: 'ch18-a2',
        step_number: 2,
        title: 'Catalog Your Personal Short List of Tells',
        instruction: "Everybody has a small set of tells that show up most: for some it's overcorrection, for others a specific fidget, for others cover-fire humor. Know your own short list cold.",
        tied_to_ch5: false
      },
      {
        id: 'ch18-a3',
        step_number: 3,
        title: 'Calibrate Vigilance to Room Stakes',
        instruction: "Not every conversation requires full counter-intelligence lockdown. A relaxed dinner with people who love you doesn't need the same guard as a high-stakes negotiation. Match your vigilance to the room.",
        tied_to_ch5: false
      },
      {
        id: 'ch18-a4',
        step_number: 4,
        title: 'Chapter 5 Code: Extend Restraint Inward',
        instruction: "The same restraint Chapter 5 asks toward others, extend to yourself. Catching your own leak is not a reason for self-punishment or shame. It is data about you. Use it for personal clarity, never as ammunition against yourself.",
        tied_to_ch5: true
      },
      {
        id: 'ch18-a5',
        step_number: 5,
        title: 'Remember Total Leak-Proofing Is a Trap',
        instruction: 'Somebody who suppresses every tell is not secure — they are just harder to reach. The goal is self-awareness, not becoming a stone. A little leakage is just what it looks like to be human.',
        tied_to_ch5: false
      }
    ],
    quick_debrief: {
      lines: [
        "Everybody leaks. You're not exempt from your own doctrine.",
        'Run your own post-game. Know your personal short list of tells.',
        'Match your vigilance to the room — not every dinner is a negotiation.',
        'The goal was never a perfect seal. It was catching it first.'
      ]
    }
  },
  {
    id: 'ch19',
    number: 19,
    title: 'When Not to Use What You Know',
    part: 'Part III — Synthesis & Defense',
    references: ['ch5', 'ch14', 'ch15'],
    intel_brief: {
      summary: [
        'Fourteen chapters of technique sit behind you now. You can hear a slip land before the person who said it fully registers it themselves. You can strip the bread off a compliment sandwich in real time. You can watch a pattern build across months. By any measure this book set out to teach, you are dangerous now.',
        'This chapter is not a new technique. This is the chapter that asks what all of it was actually for. Chapter 5 gave you the code early, before you had earned any of the sharper tools that came after it — intel for clarity, not ammunition; understanding, not exposure; restraint as the actual skill.',
        "Now you have got a partner's contradiction logged for months, a friend's real fear mapped down to the exact trigger, a parent's tell that reveals more than they ever said out loud. This is where the code stops being theory.",
        'Here is the doctrine, and it is the whole book compressed into one line: the highest use of this skill is the moment you have a clean shot and you choose not to take it. Not because you are weak. Because you understand that the person across from you is not a target. They are someone leaking under the same pressure you leak under.'
      ],
      academic_ground: "Research on relational trust consistently finds trust is built not primarily by what people say, but by what people choose not to do with the power or information they hold over one another, especially in moments where using it would have been easy and gone unnoticed (Simpson, 2007). The safest person in anyone's life isn't the one who can't read them. It's the one who can, completely, and chooses not to hold it against them.",
      hook_line: "You learned to read everyone in the room. The real skill was learning who deserves to never feel read at all."
    },
    street_recon: [
      {
        id: 'ch19-s1',
        setting: 'Romantic / Marriage',
        title: 'The Silent File on Finances',
        scene_text: "A husband has pieced together over months that his wife has been quietly terrified about money — overcorrections, a joke that tested his reaction, a contradiction between what she told him and her sister. He has a complete and devastating case for an argument. Instead, one evening, he just says gently, 'Hey — I know things have felt tight. We're going to be okay, and I've got you.' He never mentions how he knows.",
        read_line: 'He had the whole file. He used it to make her feel safe instead of caught.'
      },
      {
        id: 'ch19-s2',
        setting: 'Family / Aging Parent',
        title: 'The Retirement Subject Change',
        scene_text: "A daughter notices her father, usually talkative, going quiet and changing the subject every time anyone mentions his upcoming retirement. She could push and name the fear. Instead, she starts showing up more, asking about his old projects, giving him room to talk about parts of his identity never tied to the job.",
        read_line: 'She read exactly what he could not say, and answered it without making him say it.'
      },
      {
        id: 'ch19-s3',
        setting: 'Family / Teenager Digital Space',
        title: 'The Chosen Blind Spot',
        scene_text: "A mother has gotten fluent enough in her sixteen-year-old son's digital patterns that she could know almost everything happening in his life without him telling her. She doesn't check messages she technically could see. She doesn't confront the pattern. She just stays close, keeps the door open, and lets him come on his own timeline.",
        read_line: 'She had the surveillance capability and chose the relationship over the reconnaissance.'
      }
    ],
    action_steps: [
      {
        id: 'ch19-a1',
        step_number: 1,
        title: "Ask Who Is Actually in Front of You Before Using Anything",
        instruction: "A rival or threat to your safety — different math applies. But a partner, parent, friend, or child — ask honestly whether using what you know serves your relationship with them, or just your ego in the moment.",
        tied_to_ch5: true
      },
      {
        id: 'ch19-a2',
        step_number: 2,
        title: 'Let Understanding Be the Finish Line, Not the Launchpad',
        instruction: "You do not owe anyone a follow-up confrontation just because you built a complete read. Sometimes the entire value of what you caught is that it lets you respond with more patience.",
        tied_to_ch5: true
      },
      {
        id: 'ch19-a3',
        step_number: 3,
        title: 'Use What You Know to Make People Feel Safe, Not Small',
        instruction: "Every scene in this chapter took real intel and used it to close distance instead of opening a wound. That is the highest-level move this entire manual built toward: silence in service of making someone feel less alone.",
        tied_to_ch5: true
      },
      {
        id: 'ch19-a4',
        step_number: 4,
        title: 'Pay the Cost of Real-Stakes Restraint',
        instruction: "It is harder to sit on a clean shot when the stakes are your marriage or your family than an office rival. That difficulty is the actual weight of the discipline: this is what Chapter 5 was designed for.",
        tied_to_ch5: true
      },
      {
        id: 'ch19-a5',
        step_number: 5,
        title: 'Re-Anchor to Chapter 5 Whenever Stakes Rise',
        instruction: 'The higher the stakes, the stronger the pull to use everything you have. Recheck yourself against the code every single time, especially with the people who matter most.',
        tied_to_ch5: true
      }
    ],
    quick_debrief: {
      lines: [
        'The clean shot you don’t take is the highest-level move in this whole book.',
        'Everybody leaking was just a person holding something together imperfectly.',
        'Use what you know to make people feel safe, not small.',
        'You learned to read the room. The real skill was learning who never has to feel read.'
      ]
    }
  }
];
