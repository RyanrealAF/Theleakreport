# The Leak Report: Educational Field Manual
**Technical Field Manual: TM 31-HEAR-01**

An interactive educational textbook, acoustic intelligence schematic simulator, and applied study guide designed for decoding conversational subtext, cataloging micro-expressions and parapraxes, and mastering real-time auditory analysis with strict ethical restraint.

---

## 1. Executive Summary & Mission

*The Leak Report: Educational Field Manual* elevates conversational intelligence from passive listening to high-precision acoustic and semantic analysis. Rather than evaluating spoken dialogue at face value (the "press release"), the system trains operatives, communicators, and scholars to detect the **leak**—the dropped frame, acoustic friction, defensive overcorrection, or parapraxis that slips through an individual's conscious editorial filter.

Crucially, technical acuity is paired with an uncompromising ethical anchor: **The Operative's Code (Chapter 5)**. Infiltration of subtext is treated as a protective diagnostic discipline rather than an offensive weapon, ensuring that psychological insight is balanced with restraint and empathy.

---

## 2. Architecture & Tech Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Framework** | React 19 (SPA) | Functional components with strict TypeScript typings |
| **Build & Tooling** | Vite 6 + TSX | Instant HMR and optimized production bundles |
| **Styling** | Tailwind CSS v4 | Bespoke archival paper styling, zero-pill discipline, dark mode |
| **Typography** | Editorial Serif + Mono | Newsreader / Lora paired with Plus Jakarta Sans & JetBrains Mono |
| **Iconography** | Lucide React | High-contrast structural line icons |
| **Audio Simulation**| HTML5 Web Audio API | Live dual-channel spectrogram, real-time frequency synthesis & filters |
| **Persistence** | Browser LocalStorage | Local storage for field case logs, drill progress, and operative pledges |
| **Server** | Express (Node 22) | Full-stack dev server with proxy routing |

---

## 3. Curriculum & Module Structure

The field manual contains **19 comprehensive curriculum modules** organized into four structured volumes, followed by dedicated tactical applications:

### Part I — Groundwork
* **Chapter 1: The Battlefield of Subtext**
  * *Focus*: Moving beyond civilian active listening; detecting friction vs. message; identifying dropped frames under cognitive load.
  * *Academic Basis*: Freud (1914) & James Reason (1990) cognitive load theory.
* **Chapter 2: Black-Ops Listening Doctrine**
  * *Focus*: Separating frontstage presentation from backstage reality; drops as locations rather than verdicts.
  * *Academic Basis*: Erving Goffman's dramaturgical sociological model.
* **Chapter 3: The Unconscious as Battlefield: Parapraxes**
  * *Focus*: Decoding verbal slips, substitutions, and cognitive strain before memory cleans the transmission.
* **Chapter 4: The Double-Edged Blade: Weaponized Praise**
  * *Focus*: Dissecting qualifiers, comparative compliments, and backhanded affirmations.
* **Chapter 5: The Operative's Code (The Ethical Anchor)**
  * *Focus*: The core covenant of restraint. Four cardinal rules: *Silence as Default*, *Protection over Punishment*, *Hypothesis over Verdict*, *Grace for Humanity*.

### Part II — The Targets
* **Chapter 6: Micro-Confessions (Freudian Slips)** — Tracking the abandoned word before self-censorship.
* **Chapter 7: Backhanded Compliments** — Deconstructing comparison models and conditional praise.
* **Chapter 8: Humor as Cover Fire** — Detecting the loaded probe behind the "just kidding" exit ramp.
* **Chapter 9: The Non-Answer** — Classifying technical dodges, pivot maneuvers, and topic swerves.
* **Chapter 10: Overcorrection** — Measuring excessive denial volume against small questions.
* **Chapter 11: Contradiction & Inconsistency** — Tracking load-bearing narrative shifts across time.
* **Chapter 12: Projection** — Analyzing hyper-specific accusations that mirror the accuser's behavior.
* **Chapter 13: Body Leaks** — Baselines, somatic friction, micro-tells, and physical autonomic responses.
* **Chapter 14: Digital Leaks** — Latency shifts, read-without-reply timestamps, message edits, and over-punctuation.

### Part III — Synthesis & Defense
* **Chapter 15: The Compliment Sandwich & Passive Aggression** — Triage between unintentional leaks and deliberate manipulation.
* **Chapter 16: Pattern Tracking** — Maintaining empirical debrief records over subjective impressionism.
* **Chapter 17: Cross-Referencing Intel** — Triangulating signals across independent encounters.
* **Chapter 18: Counter-Intelligence** — Running personal diagnostic replays and recognizing one's own behavioral tells.
* **Chapter 19: When Not to Use What You Know** — The ultimate doctrine of restraint; letting understanding be the finish line rather than an offensive launchpad.

---

## 4. Interactive Field Instruments

### 1. Acoustic Schematic & Audio Intelligence Visualizer (`AcousticSchematicView`)
* **Real-time Dual-Channel Spectrogram**: Generates synthetic audio waves across frequency bins (Sub-bass, Vocal Fundamentals, Sibilance, Upper Harmonics).
* **Neural Transmission Latency Model**: Visualizes millisecond delays (20ms Auditory Cortex $\to$ 75ms Subcortical Threat Check $\to$ 220ms Prefrontal PR Formulation $\to$ 310ms Articulation).
* **Signal Filters**: Toggle High-Pass (Friction/Sibilance isolation), Band-Pass (Voice fundamental focus), and Gain thresholds.

### 2. The Operative's Ethical Code (`OperativesCodeView`)
* **Interactive Ethical Anchor**: Direct exploration of Chapter 5 covenants.
* **Tactical Dilemma Simulator**: Interactive real-world scenarios evaluating restraint vs. escalation.
* **Operative's Pledge**: Interactive formal verification and signature state tracked in persistent storage.

### 3. Applied Tactical Drill Simulator (`DrillSimulatorView`)
* **Real-World High-Stakes Scenarios**: Workplaces, coffee counters, negotiations, family gatherings.
* **Decision Branching & Explanations**: Instant tactical feedback differentiating civilian misinterpretations from operative reads.
* **Chapter 5 Restraint Filter**: Evaluates whether the user's action adhered to ethical rules.
* **Real-time Scoring & Progress Tracking**: Calculates accuracy percentages and drill mastery.

### 4. Digital Debrief Field Log (`LeakLogView`)
* **Comprehensive Entry Logging**: Date, time, setting (work, romantic, street, family, digital), involved parties.
* **Verbatim Phrase Extraction**: Captures the exact utterance before cognitive smoothing.
* **Diagnostic Fork**: Classifies whether the observed leak was driven by *Strain* (cognitive fatigue, panic) or *Strategy* (calculated manipulation).
* **Export & Backup**: JSON backup import/export engine for local records.

### 5. Tactical Cheat Sheet & Glossary Matrix
* **Quick-Reference Matrix (`CheatSheetView`)**: Instant lookup across 19 chapters categorizing leak types, primary tells, and category tags.
* **Academic Field Glossary (`GlossaryView`)**: Categorized definitions covering Core concepts, Leak Types, Frameworks, and Ethics.

### 6. Linotype Closing Transmission (`ClosingTransmissionView`)
* **Field Synthesis Terminal**: Monospaced terminal readout summarizing the core tenets of the field manual for rapid retention.

---

## 5. Design System & Editorial Aesthetics

The application adheres to a **fine-press archival monograph design constitution**:

* **Archival Texture (`.bg-editorial-paper`)**: Subtle radial paper grain (#faf7f2 in light mode; deep nocturnal ink #0c0a09 in dark mode).
* **Zero-Pill Discipline**: Elimination of rounded candy badges. Replaced with unboxed bracketed metadata (`[01 // INTEL]`, `[REST.FILTER]`), understated hairline borders, and subtle typographic weights.
* **Fine Editorial Typographic Hierarchy**: 
  - Primary Titles & Hooks: Serif (`Newsreader` / `Lora`)
  - Subheaders & UI Elements: High-legibility Sans (`Plus Jakarta Sans`)
  - Transcripts & Scientific Data: Tabular Monospace (`JetBrains Mono`)
* **Scholarly Ornaments**: Drop caps on chapter introductions, pull quotes with watermarked amber brackets, archival case study transcript frames.

---

## 6. Project Directory Layout

```
├── metadata.json                 # AI Studio applet manifest & capabilities
├── package.json                  # Dependencies (React 19, Tailwind v4, Express, Lucide)
├── server.ts                     # Express server with Vite dev integration
├── index.html                    # Entry point with SEO metadata and font preloads
├── src/
│   ├── App.tsx                   # Master curriculum container, navigation, and progress tracker
│   ├── types.ts                  # Schema definitions & Chapter runtime validator
│   ├── index.css                 # Fine-press paper styling, typography, and dark mode rules
│   ├── context/
│   │   └── ThemeContext.tsx      # Dark / light theme provider with persistence
│   ├── data/
│   │   ├── chapters.ts           # 19 full modules with case studies, steps, and debriefs
│   │   ├── drills.ts             # Interactive tactical decision scenarios
│   │   ├── cheatSheet.ts         # Quick-reference leak matrix
│   │   ├── glossary.ts           # Academic and operational terminology
│   │   └── closingTransmission.ts# Terminal closing synthesis debrief
│   └── components/
│       ├── ChapterView.tsx       # Chapter layout with drop caps, case files, and checklists
│       ├── OperativesCodeView.tsx# Interactive ethical anchor & dilemma simulator
│       ├── AcousticSchematicView.tsx# Dual-channel spectrogram & latency schematic
│       ├── DrillSimulatorView.tsx# Applied tactical drill simulator
│       ├── LeakLogView.tsx       # Field log entry creation, filtering, and export
│       ├── CheatSheetView.tsx    # Rapid reference lookup matrix
│       ├── GlossaryView.tsx      # Categorized terminology lexicon
│       └── ClosingTransmissionView.tsx # Terminal-style closing debrief
```

---

## 7. Manuscript Validation & Quality Assurance

All 19 chapters are strictly verified against the manuscript runtime schema:
1. **Exactly 3 `street_recon` scenes** per chapter with unique geographic/social settings.
2. **Mandatory Chapter 5 Cross-Reference** (`tied_to_ch5: true`) in action steps.
3. **Strict Debrief Density**: `quick_debrief` limited to a maximum of 4 lines.
4. **Academic Grounding**: Every chapter cites psychological or sociological literature.
