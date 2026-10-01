/**
 * Build While Bleeding — Chapter View
 * buildwhilebleeding.com
 * Architectural monograph module: theory doctrine, street recon case studies, deliberate practice, and linotype debriefs
 */

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
  Lightbulb,
  ShieldAlert
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
      console.error('[BWB] Storage error:', e);
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
      console.error('[BWB] Failed to persist step:', e);
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
      console.error('[BWB] Highlight storage error:', e);
    }
  };

  const copyCitation = () => {
    const citation = `"${chapter.intel_brief.hook_line}" — The Leak Report: Educational Field Manual (Module ${chapter.number}: ${chapter.title}) [BWB / TM 31-HEAR-01]`;
    navigator.clipboard.writeText(citation);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2400);
  };

  const drilledCount = chapter.action_steps.filter(s => completedSteps[s.id]).length;
  const drilledPercent = Math.round((drilledCount / chapter.action_steps.length) * 100);

  return (
    <article className="space-y-12 pb-24 max-w-4xl mx-auto">
      {/* Chapter Architectural Header */}
      <header className={`border-b pb-8 ${isDark ? 'border-[#C5A36A]/30' : 'border-[#7A5A22]/35'}`}>
        {/* Unboxed clean metadata following BWB zero-pill rules */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono mb-4 text-[#B9BDC2] dark:text-[#B9BDC2] light:text-[#5E5851]">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold tracking-widest text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22] uppercase">
              [{chapter.part}]
            </span>
            <span aria-hidden="true" className="text-[#8E8A83]">·</span>
            <span className="tracking-widest font-mono">
              [MODULE {String(chapter.number).padStart(2, '0')}]
            </span>
            <span aria-hidden="true" className="text-[#8E8A83]">·</span>
            <span className="font-mono text-[10px]">TM 31-HEAR-01</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-sans text-xs flex items-center gap-1.5">
              <span>Applied Drills:</span>
              <span className={`font-mono font-bold ${
                drilledPercent === 100
                  ? 'text-emerald-500 dark:text-emerald-400'
                  : 'text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22]'
              }`}>
                {drilledCount}/{chapter.action_steps.length} ({drilledPercent}%)
              </span>
            </span>
          </div>
        </div>

        {/* Major Chapter Title in Big Shoulders Display 900 */}
        <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-wide leading-none uppercase ${
          isDark ? 'text-[#E7E0D4]' : 'text-[#11100E]'
        }`}>
          Module {chapter.number} — {chapter.title}
        </h1>

        {/* Cross-chapter reference links (threading) */}
        {chapter.references && chapter.references.length > 0 && (
          <div className={`flex items-center flex-wrap gap-2 mt-5 pt-4 border-t text-xs font-mono ${
            isDark ? 'border-[#B9BDC2]/20 text-[#B9BDC2]' : 'border-[#7A5A22]/25 text-[#302C28]'
          }`}>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22]">
              THREADED CROSS-REFERENCES:
            </span>
            {chapter.references.map(refId => {
              const refNum = refId.replace('ch', '');
              return (
                <button
                  key={refId}
                  onClick={() => onNavigateChapter(refId)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 border text-xs font-mono font-semibold transition-colors cursor-pointer rounded-none min-h-[36px] ${
                    isDark
                      ? 'bg-[#171513] text-[#E7E0D4] border-[#B9BDC2]/30 hover:border-[#C5A36A] hover:text-[#C5A36A]'
                      : 'bg-[#F2ECE1] text-[#11100E] border-[#7A5A22]/40 hover:border-[#7A5A22] hover:text-[#7A5A22]'
                  }`}
                  title={`Jump to Module ${refNum}`}
                >
                  <span>MODULE {refNum}</span>
                  <ArrowRight className="w-3 h-3 text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22]" />
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* BEAT 1: INTEL BRIEF / THEORETICAL FOUNDATION */}
      <section className="space-y-6">
        <div className={`flex items-center justify-between border-b pb-2.5 ${
          isDark ? 'border-[#B9BDC2]/20' : 'border-[#7A5A22]/30'
        }`}>
          <div className="flex items-center gap-2 text-sm font-display font-black tracking-widest uppercase text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22]">
            <BookOpen className="w-4 h-4 text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22]" />
            <span>I. THEORETICAL DOCTRINE & ACOUSTIC INTEL</span>
          </div>
          <span className="text-[11px] font-mono text-[#8E8A83] hidden sm:inline">
            [SECTION 01: FOUNDATIONAL MATRIX]
          </span>
        </div>

        {/* Doctrine Body Paragraphs with BWB Drop Cap */}
        <div className={`space-y-5 text-base sm:text-lg leading-relaxed font-sans ${
          isDark ? 'text-[#E7E0D4]' : 'text-[#11100E]'
        }`}>
          {chapter.intel_brief.summary.map((para, idx) => (
            <p key={idx} className={`leading-relaxed ${idx === 0 ? 'drop-cap-bwb' : ''}`}>
              {para}
            </p>
          ))}
        </div>

        {/* Academic Grounding Block */}
        <aside className={`p-5 sm:p-6 border text-sm space-y-2.5 relative transition-colors rounded-none ${
          isDark
            ? 'border-[#B9BDC2]/20 bg-[#171513] text-[#B9BDC2]'
            : 'border-[#7A5A22]/35 bg-[#F2ECE1] text-[#302C28]'
        }`}>
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22]">
            <GraduationCap className="w-4 h-4 text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22]" />
            <span>BEHAVIORAL LITERATURE & EMPIRICAL FOUNDATION</span>
          </div>
          <p className={`font-sans leading-relaxed text-sm sm:text-base ${
            isDark ? 'text-[#E7E0D4]' : 'text-[#11100E]'
          }`}>
            {chapter.intel_brief.academic_ground}
          </p>
        </aside>

        {/* STANDALONE LYRIC-QUOTABLE PULL-QUOTE CARD (HOOK LINE) */}
        <figure
          className={`relative p-6 sm:p-8 border transition-all duration-200 overflow-hidden rounded-none ${
            isHighlighted
              ? isDark
                ? 'border-[#C5A36A] bg-[#C5A36A]/10 ring-1 ring-[#C5A36A]'
                : 'border-[#7A5A22] bg-[#7A5A22]/15 ring-1 ring-[#7A5A22]'
              : isDark
                ? 'border-[#B9BDC2]/20 bg-[#171513] hover:border-[#C5A36A]/50'
                : 'border-[#7A5A22]/30 bg-[#F2ECE1] hover:border-[#7A5A22]/60'
          }`}
        >
          {/* Subtle Decorative Large Quotation Mark */}
          <div
            aria-hidden="true"
            className="absolute -top-7 -left-2 text-8xl font-display font-black text-[#C5A36A]/10 select-none pointer-events-none"
          >
            “
          </div>

          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono mb-4">
            <span className="font-bold tracking-widest flex items-center gap-1.5 uppercase text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22]">
              <Sparkles className="w-4 h-4 text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22]" />
              <span>EPIGRAMMATIC THESIS // OPERATIVE AXIOM</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleHighlightHook}
                className={`touch-target px-3.5 py-2 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 border transition-colors rounded-none cursor-pointer ${
                  isHighlighted
                    ? isDark
                      ? 'bg-[#C5A36A] text-[#11100E] border-[#C5A36A]'
                      : 'bg-[#7A5A22] text-[#E7E0D4] border-[#7A5A22]'
                    : isDark
                      ? 'bg-[#11100E] text-[#E7E0D4] border-[#B9BDC2]/30 hover:border-[#C5A36A]'
                      : 'bg-[#DDD5C7] text-[#11100E] border-[#7A5A22]/40 hover:border-[#7A5A22]'
                }`}
                title="Bookmark this core principle to study dossier"
              >
                <Bookmark className="w-4 h-4" />
                <span>{isHighlighted ? 'ANNOTATED' : 'ANNOTATE'}</span>
              </button>

              <button
                onClick={copyCitation}
                className={`touch-target px-3.5 py-2 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 border transition-colors rounded-none cursor-pointer ${
                  isDark
                    ? 'bg-[#11100E] text-[#E7E0D4] border-[#B9BDC2]/30 hover:border-[#C5A36A]'
                    : 'bg-[#DDD5C7] text-[#11100E] border-[#7A5A22]/40 hover:border-[#7A5A22]'
                }`}
                title="Copy formal academic citation"
              >
                {copiedCitation ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span>{copiedCitation ? 'COPIED' : 'CITATION'}</span>
              </button>
            </div>
          </div>

          <blockquote className={`relative z-10 text-2xl sm:text-3xl md:text-4xl font-display font-black tracking-wide uppercase leading-tight pl-4 border-l-4 border-[#C5A36A] dark:border-[#C5A36A] light:border-[#7A5A22] my-3 ${
            isDark ? 'text-[#E7E0D4]' : 'text-[#11100E]'
          }`}>
            "{chapter.intel_brief.hook_line}"
          </blockquote>

          <figcaption className={`relative z-10 mt-4 pt-3 border-t text-xs font-mono flex items-center justify-between ${
            isDark ? 'border-[#B9BDC2]/20 text-[#8E8A83]' : 'border-[#7A5A22]/25 text-[#5E5851]'
          }`}>
            <span>Module {chapter.number} Axiom · TM 31-HEAR-01</span>
            <span className="hidden sm:inline font-mono text-[11px]">[BWB DOCTRINAL CORE]</span>
          </figcaption>
        </figure>
      </section>

      {/* BEAT 2: STREET RECON / EMPIRICAL CASE STUDIES */}
      <section className="space-y-6 pt-2">
        <div className={`flex flex-wrap items-center justify-between border-b pb-2.5 gap-2 ${
          isDark ? 'border-[#B9BDC2]/20' : 'border-[#7A5A22]/30'
        }`}>
          <div className="flex items-center gap-2 text-sm font-display font-black tracking-widest uppercase text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22]">
            <Eye className="w-4 h-4 text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22]" />
            <span>II. EMPIRICAL CASE STUDIES // OBSERVATIONAL TRANSCRIPTS</span>
          </div>
          <span className={`text-xs font-mono tracking-widest ${isDark ? 'text-[#8E8A83]' : 'text-[#5E5851]'}`}>
            [DIAGNOSE SUBTEXT BEFORE UNSEALING]
          </span>
        </div>

        <p className={`text-sm sm:text-base leading-relaxed font-sans ${
          isDark ? 'text-[#B9BDC2]' : 'text-[#302C28]'
        }`}>
          Analyze each dialogue below. Identify where acoustic hesitation, sudden volume drops, or overcorrections contradict stated meaning. Record your assessment before unsealing the analytical read.
        </p>

        {/* The 3 Scene Cards */}
        <div className="space-y-6">
          {chapter.street_recon.map((scene, idx) => {
            const isRevealed = revealedReads[scene.id];
            return (
              <div
                key={scene.id}
                className={`border p-5 sm:p-7 space-y-4 transition-all rounded-none ${
                  isDark
                    ? 'border-[#B9BDC2]/20 bg-[#171513]'
                    : 'border-[#7A5A22]/30 bg-[#F2ECE1]'
                }`}
              >
                {/* Scene Header */}
                <div className={`flex flex-wrap items-center justify-between gap-2 border-b pb-3.5 ${
                  isDark ? 'border-[#B9BDC2]/15' : 'border-[#7A5A22]/20'
                }`}>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22]">
                      CASE FILE {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span aria-hidden="true" className="text-[#8E8A83]">/</span>
                    <h3 className={`font-display font-bold text-lg sm:text-xl uppercase tracking-wider ${
                      isDark ? 'text-[#E7E0D4]' : 'text-[#11100E]'
                    }`}>
                      {scene.title}
                    </h3>
                  </div>
                  <div className="text-xs font-mono text-[#8E8A83] flex items-center gap-1.5">
                    <span>Setting:</span>
                    <span className="font-semibold uppercase text-[#E7E0D4] dark:text-[#E7E0D4] light:text-[#11100E]">
                      {scene.setting}
                    </span>
                  </div>
                </div>

                {/* Scene Body / Transcript */}
                <div className={`p-4 sm:p-5 border font-sans text-sm sm:text-base leading-relaxed rounded-none ${
                  isDark
                    ? 'bg-[#11100E] border-[#B9BDC2]/20 text-[#E7E0D4]'
                    : 'bg-[#DDD5C7] border-[#7A5A22]/30 text-[#11100E]'
                }`}>
                  <div className="text-xs font-mono uppercase tracking-widest text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22] mb-2.5 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>RAW CONVERSATIONAL TRANSCRIPT</span>
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
                          placeholder="Record your subtext diagnosis prior to unsealing..."
                          value={userGuesses[scene.id] || ''}
                          onChange={e => setUserGuesses({ ...userGuesses, [scene.id]: e.target.value })}
                          onKeyDown={e => {
                            if (e.key === 'Enter') toggleReadReveal(scene.id);
                          }}
                          className={`flex-1 touch-target text-xs sm:text-sm font-sans px-3.5 py-2.5 border rounded-none focus:outline-none transition-colors ${
                            isDark
                              ? 'bg-[#11100E] border-[#B9BDC2]/30 text-[#E7E0D4] placeholder-[#8E8A83] focus:border-[#C5A36A]'
                              : 'bg-[#DDD5C7] border-[#7A5A22]/40 text-[#11100E] placeholder-[#5E5851] focus:border-[#7A5A22]'
                          }`}
                        />
                        <button
                          onClick={() => toggleReadReveal(scene.id)}
                          className={`touch-target px-5 py-2.5 rounded-none text-xs sm:text-sm font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shrink-0 cursor-pointer ${
                            isDark
                              ? 'bg-[#C5A36A] hover:bg-[#C5A36A]/90 text-[#11100E]'
                              : 'bg-[#7A5A22] hover:bg-[#7A5A22]/90 text-[#E7E0D4]'
                          }`}
                        >
                          <Eye className="w-4 h-4" />
                          <span>UNSEAL DIAGNOSTIC ANALYSIS</span>
                        </button>
                      </div>
                      <p className="text-[11px] font-mono text-[#8E8A83]">
                        Prompt: Recording your read builds verifiable analytical accuracy without confirmation bias.
                      </p>
                    </div>
                  ) : (
                    <div className={`p-5 sm:p-6 border space-y-3 rounded-none ${
                      isDark
                        ? 'border-[#C5A36A]/60 bg-[#C5A36A]/10'
                        : 'border-[#7A5A22]/60 bg-[#7A5A22]/10'
                    }`}>
                      <div className="flex items-center justify-between border-b pb-2.5 border-[#C5A36A]/30">
                        <span className="text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-1.5 text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22]">
                          <Check className="w-4 h-4 text-emerald-500" />
                          <span>CLINICAL DIAGNOSTIC READ & SUBTEXT DECONSTRUCTION</span>
                        </span>
                        <button
                          onClick={() => toggleReadReveal(scene.id)}
                          className={`text-xs font-mono flex items-center gap-1 transition-colors cursor-pointer text-[#8E8A83] hover:text-[#E7E0D4]`}
                        >
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>CONCEAL</span>
                        </button>
                      </div>

                      {userGuesses[scene.id] && (
                        <div className={`text-xs font-mono p-3 border rounded-none ${
                          isDark ? 'bg-[#11100E] border-[#B9BDC2]/20 text-[#B9BDC2]' : 'bg-[#DDD5C7] border-[#7A5A22]/30 text-[#302C28]'
                        }`}>
                          <span className="font-bold text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22]">YOUR HYPOTHESIS:</span> "{userGuesses[scene.id]}"
                        </div>
                      )}

                      <p className={`text-base font-serif italic leading-relaxed ${
                        isDark ? 'text-[#E7E0D4]' : 'text-[#11100E]'
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
          isDark ? 'border-[#B9BDC2]/20' : 'border-[#7A5A22]/30'
        }`}>
          <div className="flex items-center gap-2 text-sm font-display font-black tracking-widest uppercase text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22]">
            <CheckSquare className="w-4 h-4 text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22]" />
            <span>III. APPLIED BEHAVIORAL EXERCISES // DELIBERATE PRACTICE</span>
          </div>
          <span className={`text-xs font-mono font-bold ${
            drilledPercent === 100 ? 'text-emerald-500' : 'text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22]'
          }`}>
            {drilledCount} OF {chapter.action_steps.length} LOGGED ({drilledPercent}%)
          </span>
        </div>

        <p className={`text-sm sm:text-base leading-relaxed font-sans ${
          isDark ? 'text-[#B9BDC2]' : 'text-[#302C28]'
        }`}>
          Deliberate observational protocols. Check each exercise off as you actively calibrate or detect it in real-world settings.
        </p>

        {/* Checklist */}
        <div className="space-y-3">
          {chapter.action_steps.map(step => {
            const isDone = !!completedSteps[step.id];
            return (
              <div
                key={step.id}
                onClick={() => toggleStepCompleted(step.id)}
                className={`touch-target p-4 sm:p-5 border cursor-pointer transition-all rounded-none ${
                  isDone
                    ? isDark
                      ? 'border-emerald-600/60 bg-emerald-950/20 text-[#E7E0D4]'
                      : 'border-emerald-600/60 bg-emerald-50 text-[#11100E]'
                    : isDark
                      ? 'border-[#B9BDC2]/20 bg-[#171513] text-[#B9BDC2] hover:border-[#C5A36A]'
                      : 'border-[#7A5A22]/30 bg-[#F2ECE1] text-[#302C28] hover:border-[#7A5A22]'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <button
                    type="button"
                    className="mt-0.5 shrink-0 transition-colors cursor-pointer"
                    aria-label={isDone ? 'Mark exercise uncompleted' : 'Mark exercise completed'}
                  >
                    {isDone ? (
                      <CheckSquare className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <Square className={`w-5 h-5 ${isDark ? 'text-[#8E8A83]' : 'text-[#5E5851]'}`} />
                    )}
                  </button>

                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className={`font-display font-bold text-base sm:text-lg tracking-wide uppercase ${
                        isDark ? 'text-[#E7E0D4]' : 'text-[#11100E]'
                      }`}>
                        Exercise {step.step_number}: {step.title}
                      </span>
                      {step.tied_to_ch5 && (
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-mono font-bold tracking-wider uppercase ${
                            isDark ? 'text-[#C5A36A]' : 'text-[#7A5A22]'
                          }`}
                          title="Anchored directly to Chapter 5: The Practitioner's Code of Ethics"
                        >
                          <Scale className="w-3.5 h-3.5 text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22]" />
                          <span>[ETHICS ANCHOR]</span>
                        </span>
                      )}
                    </div>

                    <p className={`text-sm sm:text-base font-sans leading-relaxed ${
                      isDark ? 'text-[#B9BDC2]' : 'text-[#302C28]'
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
        <div className={`flex items-center gap-2 text-sm font-display font-black tracking-widest uppercase ${
          isDark ? 'text-[#C5A36A]' : 'text-[#7A5A22]'
        }`}>
          <Lightbulb className="w-4 h-4 text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22]" />
          <span>IV. MODULE SYNTHESIS // LINOTYPE FIELD TAKEAWAYS</span>
        </div>

        {/* Linotype Archival Block */}
        <div className={`border-2 p-6 sm:p-7 relative overflow-hidden rounded-none ${
          isDark
            ? 'border-[#C5A36A] bg-[#171513] text-[#E7E0D4]'
            : 'border-[#11100E] bg-[#11100E] text-[#E7E0D4]'
        }`}>
          <div className="flex items-center justify-between border-b border-[#B9BDC2]/20 pb-3 mb-4">
            <span className="text-xs font-mono font-bold tracking-widest text-[#C5A36A] uppercase">
              MODULE {chapter.number} SYNTHESIS • READ STRAIGHT
            </span>
            <span className="text-[11px] font-mono text-[#B9BDC2]">
              4 CORE TAKEAWAYS
            </span>
          </div>

          <div className="space-y-3 font-mono text-sm sm:text-base">
            {chapter.quick_debrief.lines.map((line, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="text-[#C5A36A] font-bold select-none">&gt;&gt;</span>
                <p className="font-medium tracking-wide text-[#E7E0D4] leading-relaxed">
                  {line}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-3 border-t border-[#B9BDC2]/20 text-xs font-mono text-[#B9BDC2] flex items-center justify-between">
            <span>Pedagogical Synthesis · Non-Interactive Doctrinal Wrap</span>
            <span className="text-[#C5A36A] font-bold">TM 31-HEAR-01</span>
          </div>
        </div>
      </section>

      {/* Chapter Footer Navigation with touch targets ≥ 44px */}
      <nav className={`flex items-center justify-between pt-8 border-t ${
        isDark ? 'border-[#B9BDC2]/20' : 'border-[#7A5A22]/30'
      }`}>
        {chapter.number > 1 ? (
          <button
            onClick={() => onNavigateChapter(`ch${chapter.number - 1}`)}
            className={`touch-target px-4 py-2.5 rounded-none text-xs sm:text-sm font-mono font-bold uppercase tracking-wider border flex items-center gap-2 transition-colors cursor-pointer ${
              isDark
                ? 'bg-[#171513] text-[#E7E0D4] border-[#B9BDC2]/30 hover:border-[#C5A36A]'
                : 'bg-[#DDD5C7] text-[#11100E] border-[#7A5A22]/40 hover:border-[#7A5A22]'
            }`}
          >
            <span>← PREVIOUS: MODULE {chapter.number - 1}</span>
          </button>
        ) : <div />}

        {chapter.number < 19 ? (
          <button
            onClick={() => onNavigateChapter(`ch${chapter.number + 1}`)}
            className={`touch-target px-5 py-2.5 rounded-none text-xs sm:text-sm font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer ${
              isDark
                ? 'bg-[#C5A36A] hover:bg-[#C5A36A]/90 text-[#11100E]'
                : 'bg-[#7A5A22] hover:bg-[#7A5A22]/90 text-[#E7E0D4]'
            }`}
          >
            <span>NEXT: MODULE {chapter.number + 1}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => onNavigateChapter('back-matter')}
            className={`touch-target px-5 py-2.5 rounded-none text-xs sm:text-sm font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer ${
              isDark
                ? 'bg-[#C5A36A] hover:bg-[#C5A36A]/90 text-[#11100E]'
                : 'bg-[#7A5A22] hover:bg-[#7A5A22]/90 text-[#E7E0D4]'
            }`}
          >
            <span>REFERENCE SUITE & TAXONOMY</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </nav>
    </article>
  );
};
