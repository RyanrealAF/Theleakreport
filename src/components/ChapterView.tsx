import React, { useState, useEffect } from 'react';
import { Chapter } from '../types';
import { useTheme } from '../context/ThemeContext';
import {
  Eye,
  EyeOff,
  CheckSquare,
  Square,
  Copy,
  Check,
  Bookmark,
  ArrowRight,
  BookOpen,
  GraduationCap,
  FileText,
  Scale,
  Sparkles,
  ChevronRight,
  Lightbulb
} from 'lucide-react';

interface ChapterViewProps {
  chapter: Chapter;
  onNavigateChapter: (chapterId: string) => void;
}

export const ChapterView: React.FC<ChapterViewProps> = ({
  chapter,
  onNavigateChapter,
}) => {
  const { isDark } = useTheme();

  // Revealed states for the 3 Street Recon scenes
  const [revealedReads, setRevealedReads] = useState<{ [sceneId: string]: boolean }>({});
  // User guesses for Street Recon
  const [userGuesses, setUserGuesses] = useState<{ [sceneId: string]: string }>({});
  // Completed action steps (persisted in localStorage)
  const [completedSteps, setCompletedSteps] = useState<{ [stepId: string]: boolean }>({});
  // Highlight state for the lyric-quotable hook line
  const [isHighlighted, setIsHighlighted] = useState<boolean>(false);
  const [copiedCitation, setCopiedCitation] = useState<boolean>(false);

  // Reset or load state when chapter changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem('leak-report-drilled-steps');
      if (saved) {
        setCompletedSteps(JSON.parse(saved));
      }
      const savedHighlights = localStorage.getItem('leak-report-highlights');
      if (savedHighlights) {
        const parsed = JSON.parse(savedHighlights);
        setIsHighlighted(!!parsed[chapter.id]);
      }
    } catch (e) {
      console.error('Storage error:', e);
    }
    // Conceal reads when navigating between chapters to encourage fresh diagnostic guessing
    setRevealedReads({});
  }, [chapter.id]);

  const toggleReadReveal = (sceneId: string) => {
    setRevealedReads(prev => ({
      ...prev,
      [sceneId]: !prev[sceneId],
    }));
  };

  const toggleStepCompleted = (stepId: string) => {
    const updated = {
      ...completedSteps,
      [stepId]: !completedSteps[stepId],
    };
    setCompletedSteps(updated);
    try {
      localStorage.setItem('leak-report-drilled-steps', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to persist step:', e);
    }
  };

  const toggleHighlightHook = () => {
    const nextState = !isHighlighted;
    setIsHighlighted(nextState);
    try {
      const saved = localStorage.getItem('leak-report-highlights') || '{}';
      const parsed = JSON.parse(saved);
      parsed[chapter.id] = nextState;
      localStorage.setItem('leak-report-highlights', JSON.stringify(parsed));
    } catch (e) {
      console.error('Highlight storage error:', e);
    }
  };

  const copyCitation = () => {
    const citation = `"${chapter.intel_brief.hook_line}" — The Leak Report: Educational Field Manual (Module ${chapter.number}: ${chapter.title})`;
    navigator.clipboard.writeText(citation);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2400);
  };

  const drilledCount = chapter.action_steps.filter(s => completedSteps[s.id]).length;
  const drilledPercent = Math.round((drilledCount / chapter.action_steps.length) * 100);

  return (
    <article className="space-y-12 pb-24 max-w-4xl mx-auto">
      {/* Chapter Editorial Header */}
      <header className={`border-b pb-8 ${isDark ? 'border-stone-800' : 'border-stone-200'}`}>
        {/* Unboxed clean metadata following anti-slop rules */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono mb-4 text-stone-500 dark:text-stone-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400">
              {chapter.part}
            </span>
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
            <span className="tracking-wide">
              MODULE {String(chapter.number).padStart(2, '0')}
            </span>
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
            <span>CURRICULUM ARCHIVE</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-sans text-xs flex items-center gap-1.5">
              <span>Applied Drills:</span>
              <span className={`font-mono font-bold ${
                drilledPercent === 100
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-amber-700 dark:text-amber-400'
              }`}>
                {drilledCount}/{chapter.action_steps.length} ({drilledPercent}%)
              </span>
            </span>
          </div>
        </div>

        {/* Major Chapter Title */}
        <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight leading-tight ${
          isDark ? 'text-stone-100' : 'text-stone-900'
        }`}>
          Module {chapter.number} — {chapter.title}
        </h1>

        {/* Cross-chapter reference links (threading) */}
        {chapter.references && chapter.references.length > 0 && (
          <div className={`flex items-center flex-wrap gap-2 mt-5 pt-4 border-t text-xs font-mono ${
            isDark ? 'border-stone-800/80 text-stone-400' : 'border-stone-200/80 text-stone-600'
          }`}>
            <span className="font-sans font-medium text-stone-600 dark:text-stone-300 flex items-center gap-1.5">
              <span>Threaded Curricular Cross-References:</span>
            </span>
            {chapter.references.map(refId => {
              const refNum = refId.replace('ch', '');
              return (
                <button
                  key={refId}
                  onClick={() => onNavigateChapter(refId)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-sans transition-colors border ${
                    isDark
                      ? 'bg-stone-900/80 text-stone-300 border-stone-800 hover:border-amber-500/80 hover:text-amber-300'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-amber-600 hover:text-amber-900 shadow-xs'
                  }`}
                  title={`Jump to Module ${refNum}`}
                >
                  <span className="font-semibold">Module {refNum}</span>
                  <ArrowRight className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* BEAT 1: INTEL BRIEF / THEORETICAL FOUNDATION */}
      <section className="space-y-6">
        <div className={`flex items-center justify-between border-b pb-2.5 ${
          isDark ? 'border-stone-800' : 'border-stone-200'
        }`}>
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-amber-800 dark:text-amber-400">
            <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>I. Theoretical Doctrine & Core Concept</span>
          </div>
          <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400 hidden sm:inline">
            COGNITIVE FOUNDATION
          </span>
        </div>

        {/* Doctrine Body Paragraphs with Editorial Drop Cap */}
        <div className={`space-y-5 text-base sm:text-lg leading-relaxed font-sans ${
          isDark ? 'text-stone-200' : 'text-stone-800'
        }`}>
          {chapter.intel_brief.summary.map((para, idx) => (
            <p key={idx} className={`leading-relaxed ${idx === 0 ? 'drop-cap' : ''}`}>
              {para}
            </p>
          ))}
        </div>

        {/* Academic Grounding Block */}
        <aside className={`p-5 sm:p-6 rounded-xl border text-sm space-y-2.5 relative transition-colors ${
          isDark
            ? 'border-stone-800 bg-stone-900/80 text-stone-300 shadow-book'
            : 'border-amber-200/90 bg-amber-50/50 text-stone-800 shadow-book'
        }`}>
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
            <GraduationCap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Academic Grounding & Behavioral Literature</span>
          </div>
          <p className={`italic font-serif leading-relaxed text-sm sm:text-base ${
            isDark ? 'text-stone-300' : 'text-stone-700'
          }`}>
            {chapter.intel_brief.academic_ground}
          </p>
        </aside>

        {/* STANDALONE LYRIC-QUOTABLE PULL-QUOTE CARD (HOOK LINE) */}
        <figure
          className={`relative p-6 sm:p-8 rounded-xl border transition-all duration-300 overflow-hidden ${
            isHighlighted
              ? isDark
                ? 'border-amber-500/80 bg-amber-950/20 shadow-book-lg ring-1 ring-amber-500/60'
                : 'border-amber-400 bg-amber-50/80 shadow-book-lg ring-1 ring-amber-400/80'
              : isDark
                ? 'border-stone-800 bg-stone-900/70 hover:border-stone-700 shadow-book'
                : 'border-stone-200 bg-white hover:border-stone-300 shadow-book'
          }`}
        >
          {/* Subtle Decorative Large Quotation Mark in Background */}
          <div
            aria-hidden="true"
            className="absolute -top-6 -left-3 text-7xl sm:text-8xl font-serif text-amber-600/10 dark:text-amber-400/10 select-none pointer-events-none"
          >
            “
          </div>

          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono mb-4">
            <span className="font-semibold tracking-wider flex items-center gap-1.5 uppercase text-amber-800 dark:text-amber-400">
              <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Epigrammatic Thesis // Keynote Axiom</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleHighlightHook}
                className={`px-3 py-1.5 rounded-lg text-xs font-sans flex items-center gap-1.5 border transition-colors ${
                  isHighlighted
                    ? isDark
                      ? 'bg-amber-900/40 text-amber-300 border-amber-500 font-medium'
                      : 'bg-amber-100 text-amber-900 border-amber-400 font-medium'
                    : isDark
                      ? 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
                      : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200'
                }`}
                title="Bookmark this core principle to study dossier"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{isHighlighted ? 'Annotated' : 'Annotate'}</span>
              </button>

              <button
                onClick={copyCitation}
                className={`px-3 py-1.5 rounded-lg text-xs font-sans flex items-center gap-1.5 border transition-colors ${
                  isDark
                    ? 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
                    : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200'
                }`}
                title="Copy formal academic citation"
              >
                {copiedCitation ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCitation ? 'Citation Copied' : 'Copy Citation'}</span>
              </button>
            </div>
          </div>

          <blockquote className={`relative z-10 text-xl sm:text-2xl md:text-3xl font-serif font-semibold italic tracking-tight leading-snug pl-4 border-l-3 border-amber-600 dark:border-amber-400 my-2 ${
            isDark ? 'text-stone-100' : 'text-stone-900'
          }`}>
            "{chapter.intel_brief.hook_line}"
          </blockquote>

          <figcaption className={`relative z-10 mt-4 pt-3 border-t text-xs font-mono flex items-center justify-between ${
            isDark ? 'border-stone-800 text-stone-500' : 'border-stone-200 text-stone-500'
          }`}>
            <span>Module {chapter.number} Axiom · The Leak Report (Curriculum Ed.)</span>
            <span className="hidden sm:inline">Press Annotate to save to personal study dossier</span>
          </figcaption>
        </figure>
      </section>

      {/* BEAT 2: STREET RECON / EMPIRICAL CASE STUDIES */}
      <section className="space-y-6 pt-2">
        <div className={`flex flex-wrap items-center justify-between border-b pb-2.5 gap-2 ${
          isDark ? 'border-stone-800' : 'border-stone-200'
        }`}>
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-amber-800 dark:text-amber-400">
            <Eye className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>II. Empirical Case Studies // Observational Transcripts</span>
          </div>
          <span className={`text-xs font-mono ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
            FORMULATE DIAGNOSIS BEFORE UNSEALING ANALYSIS
          </span>
        </div>

        <p className={`text-sm sm:text-base leading-relaxed font-sans ${
          isDark ? 'text-stone-300' : 'text-stone-700'
        }`}>
          Each case study below captures an unfiltered conversational transcript. Analyze the dialogue, detect where vocal hesitation or emotional leakage contradicts spoken intent, and formulate your diagnostic read before unsealing the clinical analysis.
        </p>

        {/* The 3 Scene Cards */}
        <div className="space-y-6">
          {chapter.street_recon.map((scene, idx) => {
            const isRevealed = revealedReads[scene.id];
            return (
              <div
                key={scene.id}
                className={`rounded-xl border p-5 sm:p-7 space-y-4 transition-all shadow-book ${
                  isDark
                    ? 'border-stone-800 bg-stone-900/70 hover:border-stone-700'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                {/* Scene Header */}
                <div className={`flex flex-wrap items-center justify-between gap-2 border-b pb-3.5 ${
                  isDark ? 'border-stone-800' : 'border-stone-100'
                }`}>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                      Case File {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">/</span>
                    <h3 className={`font-serif font-bold text-base sm:text-lg ${
                      isDark ? 'text-stone-100' : 'text-stone-900'
                    }`}>
                      {scene.title}
                    </h3>
                  </div>
                  <div className="text-xs font-mono text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                    <span>Setting:</span>
                    <span className="font-semibold capitalize text-stone-700 dark:text-stone-300">{scene.setting}</span>
                  </div>
                </div>

                {/* Scene Body / Transcript */}
                <div className={`p-4 sm:p-5 rounded-lg border font-sans text-sm sm:text-base leading-relaxed ${
                  isDark
                    ? 'bg-stone-950/80 border-stone-800/80 text-stone-200'
                    : 'bg-stone-50 border-stone-200/80 text-stone-800'
                }`}>
                  <div className="text-xs font-mono uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-2.5 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Raw Conversational Transcript</span>
                  </div>
                  <p className="font-serif italic text-base sm:text-lg leading-relaxed whitespace-pre-line">
                    {scene.scene_text}
                  </p>
                </div>

                {/* Interactive Diagnostic Scratchpad & Reveal Trigger */}
                <div className="space-y-3 pt-1">
                  {!isRevealed ? (
                    <div className="space-y-2">
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                        <input
                          type="text"
                          placeholder="What is your diagnostic read? Record your subtext hypothesis..."
                          value={userGuesses[scene.id] || ''}
                          onChange={e => setUserGuesses({ ...userGuesses, [scene.id]: e.target.value })}
                          onKeyDown={e => {
                            if (e.key === 'Enter') toggleReadReveal(scene.id);
                          }}
                          className={`flex-1 text-xs sm:text-sm font-sans rounded-lg px-3.5 py-2.5 border focus:outline-none transition-colors ${
                            isDark
                              ? 'bg-stone-950 border-stone-700 text-stone-100 placeholder-stone-500 focus:border-amber-500'
                              : 'bg-white border-stone-300 text-stone-900 placeholder-stone-400 focus:border-amber-600'
                          }`}
                        />
                        <button
                          onClick={() => toggleReadReveal(scene.id)}
                          className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-sans font-semibold flex items-center justify-center gap-2 transition-colors shrink-0 shadow-xs cursor-pointer ${
                            isDark
                              ? 'bg-amber-600 hover:bg-amber-500 text-stone-950'
                              : 'bg-amber-600 hover:bg-amber-700 text-white'
                          }`}
                        >
                          <Eye className="w-4 h-4" />
                          <span>Unseal Diagnostic Analysis</span>
                        </button>
                      </div>
                      <p className="text-xs font-sans text-stone-500 dark:text-stone-400">
                        Exercise prompt: Recording your initial read before revealing trains independent acoustic pattern recognition.
                      </p>
                    </div>
                  ) : (
                    <div className={`p-5 sm:p-6 rounded-xl border space-y-3 animate-in fade-in duration-200 ${
                      isDark
                        ? 'border-amber-500/40 bg-amber-950/20 shadow-book'
                        : 'border-amber-300 bg-amber-50/70 shadow-book'
                    }`}>
                      <div className="flex items-center justify-between border-b pb-2.5 border-amber-500/20">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 text-amber-800 dark:text-amber-400">
                          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span>Clinical Diagnostic Read & Subtext Breakdown</span>
                        </span>
                        <button
                          onClick={() => toggleReadReveal(scene.id)}
                          className={`text-xs font-mono flex items-center gap-1 transition-colors cursor-pointer ${
                            isDark ? 'text-stone-400 hover:text-stone-200' : 'text-stone-600 hover:text-stone-800'
                          }`}
                        >
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>Conceal Read</span>
                        </button>
                      </div>

                      {userGuesses[scene.id] && (
                        <div className={`text-xs font-mono p-3 rounded-lg border ${
                          isDark ? 'bg-stone-900/90 border-stone-800 text-stone-300' : 'bg-white border-stone-200 text-stone-700'
                        }`}>
                          <span className="font-semibold text-stone-400 dark:text-stone-500">Your Initial Hypothesis:</span> "{userGuesses[scene.id]}"
                        </div>
                      )}

                      <p className={`text-base font-serif italic leading-relaxed ${
                        isDark ? 'text-amber-100' : 'text-stone-900'
                      }`}>
                        {scene.read_line}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* BEAT 3: ACTION STEPS / APPLIED BEHAVIORAL EXERCISES */}
      <section className="space-y-5 pt-2">
        <div className={`flex flex-wrap items-center justify-between border-b pb-2.5 gap-2 ${
          isDark ? 'border-stone-800' : 'border-stone-200'
        }`}>
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-amber-800 dark:text-amber-400">
            <CheckSquare className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>III. Applied Behavioral Exercises // Deliberate Practice</span>
          </div>
          <span className={`text-xs font-mono font-semibold ${
            drilledPercent === 100 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'
          }`}>
            {drilledCount} of {chapter.action_steps.length} Logged ({drilledPercent}%)
          </span>
        </div>

        <p className={`text-sm sm:text-base leading-relaxed font-sans ${
          isDark ? 'text-stone-300' : 'text-stone-700'
        }`}>
          Active behavioral protocols designed for real-world conversational drills. Check each exercise off as you deliberately observe or apply it in your engagements.
        </p>

        {/* Checklist */}
        <div className="space-y-3">
          {chapter.action_steps.map(step => {
            const isDone = !!completedSteps[step.id];
            return (
              <div
                key={step.id}
                onClick={() => toggleStepCompleted(step.id)}
                className={`p-4 sm:p-5 rounded-xl border cursor-pointer transition-all shadow-book ${
                  isDone
                    ? isDark
                      ? 'border-emerald-700/60 bg-emerald-950/20 text-stone-200'
                      : 'border-emerald-300 bg-emerald-50/60 text-stone-900'
                    : isDark
                      ? 'border-stone-800 bg-stone-900/60 text-stone-300 hover:border-stone-700'
                      : 'border-stone-200 bg-white text-stone-800 hover:border-stone-300'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <button
                    type="button"
                    className="mt-0.5 shrink-0 transition-colors cursor-pointer"
                    aria-label={isDone ? 'Mark exercise uncompleted' : 'Mark exercise completed'}
                  >
                    {isDone ? (
                      <CheckSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Square className={`w-5 h-5 ${isDark ? 'text-stone-600' : 'text-stone-400'}`} />
                    )}
                  </button>

                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className={`font-serif font-bold text-base sm:text-lg ${
                        isDark ? 'text-stone-100' : 'text-stone-900'
                      }`}>
                        Exercise {step.step_number}: {step.title}
                      </span>

                      {/* Subtle visual marker tying back to Operative's Code */}
                      {step.tied_to_ch5 && (
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-mono font-medium ${
                            isDark ? 'text-amber-400' : 'text-amber-800'
                          }`}
                          title="Anchored directly to Chapter 5: The Practitioner's Code of Ethics"
                        >
                          <Scale className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                          <span>Ethics Anchor</span>
                        </span>
                      )}
                    </div>

                    <p className={`text-sm sm:text-base font-sans leading-relaxed ${
                      isDark ? 'text-stone-300' : 'text-stone-700'
                    }`}>
                      {step.instruction}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* BEAT 4: QUICK DEBRIEF / MODULE SYNTHESIS */}
      <section className="space-y-4 pt-4">
        <div className={`flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase ${
          isDark ? 'text-amber-400' : 'text-amber-800'
        }`}>
          <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>IV. Module Synthesis // Linotype Field Takeaways</span>
        </div>

        {/* Fixed closing block, larger/monospace type, strictly max 4 lines, no interactive elements */}
        <div className={`border-2 rounded-xl p-6 sm:p-7 relative overflow-hidden shadow-book-lg ${
          isDark
            ? 'border-amber-600/60 bg-stone-950 text-stone-200'
            : 'border-stone-800 bg-stone-900 text-stone-100'
        }`}>
          <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-4">
            <span className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
              MODULE {chapter.number} SYNTHESIS • READ STRAIGHT
            </span>
            <span className="text-[11px] font-mono text-stone-400">
              4 CORE TAKEAWAYS
            </span>
          </div>

          <div className="space-y-3 font-mono text-sm sm:text-base">
            {chapter.quick_debrief.lines.map((line, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="text-amber-400 font-bold select-none">&gt;&gt;</span>
                <p className="font-medium tracking-wide text-stone-100 leading-relaxed">
                  {line}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-3 border-t border-stone-800 text-xs font-mono text-stone-400 flex items-center justify-between">
            <span>Pedagogical Synthesis · Non-Interactive Doctrinal Wrap</span>
            <span>Module {chapter.number}</span>
          </div>
        </div>
      </section>

      {/* Chapter Footer Navigation */}
      <nav className={`flex items-center justify-between pt-8 border-t ${
        isDark ? 'border-stone-800' : 'border-stone-200'
      }`}>
        {chapter.number > 1 ? (
          <button
            onClick={() => onNavigateChapter(`ch${chapter.number - 1}`)}
            className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-sans font-medium border flex items-center gap-2 transition-colors cursor-pointer ${
              isDark
                ? 'bg-stone-800 text-stone-200 border-stone-700 hover:border-amber-500 hover:text-amber-300'
                : 'bg-white text-stone-700 border-stone-300 hover:border-amber-600 hover:text-amber-800 shadow-xs'
            }`}
          >
            <span>← Previous: Module {chapter.number - 1}</span>
          </button>
        ) : <div />}

        {chapter.number < 19 ? (
          <button
            onClick={() => onNavigateChapter(`ch${chapter.number + 1}`)}
            className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-sans font-bold flex items-center gap-2 transition-colors shadow-xs cursor-pointer ${
              isDark
                ? 'bg-amber-500 hover:bg-amber-400 text-stone-950'
                : 'bg-amber-600 hover:bg-amber-700 text-white'
            }`}
          >
            <span>Next: Module {chapter.number + 1}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => onNavigateChapter('back-matter')}
            className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-sans font-bold flex items-center gap-2 transition-colors shadow-xs cursor-pointer ${
              isDark
                ? 'bg-amber-500 hover:bg-amber-400 text-stone-950'
                : 'bg-amber-600 hover:bg-amber-700 text-white'
            }`}
          >
            <span>Proceed to Reference Suite & Taxonomy Matrix</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </nav>
    </article>
  );
};
