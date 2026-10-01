/**
 * Build While Bleeding — The Practitioner's Code of Ethics
 * buildwhilebleeding.com
 * Cross-chapter ethical restraint index, non-weaponization doctrine, and behavioral audit matrix
 */

import React, { useState, useEffect } from 'react';
import { Chapter, ActionStep } from '../types';
import { useTheme } from '../context/ThemeContext';
import { Scale, CheckSquare, Square, ArrowRight, ShieldCheck, ShieldAlert } from 'lucide-react';

interface OperativesCodeViewProps {
  chapters: Chapter[];
  onNavigateChapter: (chapterId: string) => void;
}

export const OperativesCodeView: React.FC<OperativesCodeViewProps> = ({
  chapters,
  onNavigateChapter,
}) => {
  const { isDark } = useTheme();
  const [adherence, setAdherence] = useState<{ [stepId: string]: boolean }>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem('leak-report-drilled-steps');
      if (saved) {
        setAdherence(JSON.parse(saved));
      }
    } catch (e) {
      console.error('[BWB] Storage error in CodeView:', e);
    }
  }, []);

  const toggleAdherence = (stepId: string) => {
    const updated = {
      ...adherence,
      [stepId]: !adherence[stepId],
    };
    setAdherence(updated);
    try {
      localStorage.setItem('leak-report-drilled-steps', JSON.stringify(updated));
    } catch (e) {
      console.error('[BWB] Storage save error in CodeView:', e);
    }
  };

  // Extract all steps tied to Ch 5 across all chapters
  const allTiedSteps: { chapter: Chapter; step: ActionStep }[] = [];
  chapters.forEach(ch => {
    ch.action_steps.forEach(step => {
      if (step.tied_to_ch5) {
        allTiedSteps.push({ chapter: ch, step });
      }
    });
  });

  const adheredCount = allTiedSteps.filter(item => adherence[item.step.id]).length;
  const adherenceRate = Math.round((adheredCount / allTiedSteps.length) * 100);

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-24">
      {/* Educational Header Banner */}
      <section className={`border p-6 sm:p-8 relative overflow-hidden rounded-none ${
        isDark
          ? 'border-[#C5A36A]/30 bg-[#171513] text-[#E7E0D4]'
          : 'border-[#7A5A22]/35 bg-[#F2ECE1] text-[#11100E]'
      }`}>
        <div className="flex items-center gap-3.5 mb-3">
          <div className={`w-12 h-12 border flex items-center justify-center shrink-0 rounded-none ${
            isDark
              ? 'bg-[#11100E] text-[#C5A36A] border-[#C5A36A]'
              : 'bg-[#DDD5C7] text-[#7A5A22] border-[#7A5A22]'
          }`}>
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold tracking-widest text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22] uppercase">
              [TM 31-HEAR-01 // DOCTRINE 05]
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-wide uppercase leading-tight">
              The Practitioner's Code of Ethics
            </h1>
            <p className="text-xs sm:text-sm font-mono text-[#8E8A83] mt-0.5">
              Cross-Chapter Ethical Restraint Index (Threaded Across All 19 Modules)
            </p>
          </div>
        </div>

        <blockquote className={`text-xl sm:text-2xl font-display font-black tracking-wide uppercase leading-snug pl-4 border-l-4 border-[#C5A36A] dark:border-[#C5A36A] light:border-[#7A5A22] my-4 ${
          isDark ? 'text-[#E7E0D4]' : 'text-[#11100E]'
        }`}>
          "You did not study human conversational leakage to weaponize vulnerability. You learned to perceive subtext so that you could cease projecting your own anxiety and preserve dignity in the room."
        </blockquote>

        <p className={`text-sm sm:text-base font-sans leading-relaxed mt-3 ${
          isDark ? 'text-[#B9BDC2]' : 'text-[#302C28]'
        }`}>
          In behavioral acoustics, perceptual acuity without ethical restraint descends into paranoia and social manipulation. The Code acts as an internal regulator: every chapter features at least one practice step specifically anchored to Chapter 5's mandate of restraint, non-confrontation, and silent containment.
        </p>

        {/* Adherence Metric Card */}
        <div className={`mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5 border-t ${
          isDark ? 'border-[#B9BDC2]/20' : 'border-[#7A5A22]/25'
        }`}>
          <div className={`p-4 border rounded-none ${
            isDark ? 'bg-[#11100E] border-[#B9BDC2]/20' : 'bg-[#DDD5C7] border-[#7A5A22]/30'
          }`}>
            <div className="text-xs font-mono text-[#8E8A83] uppercase tracking-wider">ETHICAL ANCHORS</div>
            <div className="text-2xl font-display font-black text-[#E7E0D4] dark:text-[#E7E0D4] light:text-[#11100E] mt-1">
              {allTiedSteps.length} PROTOCOLS
            </div>
            <div className="text-xs font-mono text-[#8E8A83] mt-0.5">Anchored in every chapter</div>
          </div>

          <div className={`p-4 border rounded-none ${
            isDark ? 'bg-[#11100E] border-[#B9BDC2]/20' : 'bg-[#DDD5C7] border-[#7A5A22]/30'
          }`}>
            <div className="text-xs font-mono text-[#8E8A83] uppercase tracking-wider">CURRICULUM INTEGRATION</div>
            <div className="text-2xl font-display font-black text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22] mt-1">
              100% (19/19)
            </div>
            <div className="text-xs font-mono text-[#8E8A83] mt-0.5">Complete pedagogical coverage</div>
          </div>

          <div className={`p-4 border rounded-none ${
            isDark ? 'bg-[#11100E] border-[#B9BDC2]/20' : 'bg-[#DDD5C7] border-[#7A5A22]/30'
          }`}>
            <div className="text-xs font-mono text-[#8E8A83] uppercase tracking-wider">PRACTICE LOGGED</div>
            <div className="text-2xl font-display font-black text-emerald-500 mt-1">
              {adheredCount}/{allTiedSteps.length} ({adherenceRate}%)
            </div>
            <div className="text-xs font-mono text-[#8E8A83] mt-0.5">Self-reported logged drills</div>
          </div>
        </div>
      </section>

      {/* The Core 3 Doctrines from Ch. 5 */}
      <section className={`border p-6 sm:p-7 space-y-4 rounded-none ${
        isDark ? 'border-[#B9BDC2]/20 bg-[#171513]' : 'border-[#7A5A22]/30 bg-[#F2ECE1]'
      }`}>
        <h2 className="text-sm font-display font-black uppercase tracking-widest flex items-center gap-2 text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22]">
          <ShieldCheck className="w-4 h-4 text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22]" />
          THE THREE FOUNDATIONAL MAXIMS OF ETHICAL LISTENING
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <div className={`p-4 sm:p-5 border space-y-2 rounded-none ${
            isDark ? 'bg-[#11100E] border-[#B9BDC2]/20' : 'bg-[#DDD5C7] border-[#7A5A22]/30'
          }`}>
            <span className="text-xs font-mono font-bold text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22] uppercase tracking-wider">
              [LAW I // SILENT CONTAINMENT]
            </span>
            <h3 className="font-display font-bold text-lg uppercase tracking-wide text-[#E7E0D4] dark:text-[#E7E0D4] light:text-[#11100E]">
              Awareness Without Retaliation
            </h3>
            <p className="text-xs sm:text-sm font-sans leading-relaxed text-[#B9BDC2] dark:text-[#B9BDC2] light:text-[#302C28]">
              Hearing someone leak hostility, insecurity, or deceit does not obligate you to announce it. An educated listener absorbs the signal quietly, adjusts their boundaries, and lets the other party retain their face.
            </p>
          </div>

          <div className={`p-4 sm:p-5 border space-y-2 rounded-none ${
            isDark ? 'bg-[#11100E] border-[#B9BDC2]/20' : 'bg-[#DDD5C7] border-[#7A5A22]/30'
          }`}>
            <span className="text-xs font-mono font-bold text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22] uppercase tracking-wider">
              [LAW II // NON-WEAPONIZATION]
            </span>
            <h3 className="font-display font-bold text-lg uppercase tracking-wide text-[#E7E0D4] dark:text-[#E7E0D4] light:text-[#11100E]">
              Refusal to Exploit
            </h3>
            <p className="text-xs sm:text-sm font-sans leading-relaxed text-[#B9BDC2] dark:text-[#B9BDC2] light:text-[#302C28]">
              Never use an overheard micro-confession or nervous slip to humiliate a colleague, friend, or partner. Exposing someone else's leak in public is an amateur move that betrays your own insecurity.
            </p>
          </div>

          <div className={`p-4 sm:p-5 border space-y-2 rounded-none ${
            isDark ? 'bg-[#11100E] border-[#B9BDC2]/20' : 'bg-[#DDD5C7] border-[#7A5A22]/30'
          }`}>
            <span className="text-xs font-mono font-bold text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22] uppercase tracking-wider">
              [LAW III // INTERNAL AUDIT]
            </span>
            <h3 className="font-display font-bold text-lg uppercase tracking-wide text-[#E7E0D4] dark:text-[#E7E0D4] light:text-[#11100E]">
              Auditing Your Own Signal
            </h3>
            <p className="text-xs sm:text-sm font-sans leading-relaxed text-[#B9BDC2] dark:text-[#B9BDC2] light:text-[#302C28]">
              Before cataloging the speech errors and micro-adjustments of others, observe your own linguistic strain. The most disciplined observer is the one who monitors their own defensive chatter.
            </p>
          </div>
        </div>
      </section>

      {/* Complete Cross-Chapter Timeline of Code-Tied Steps */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b pb-2.5 border-[#B9BDC2]/20">
          <div className="flex items-center gap-2 text-sm font-display font-black uppercase tracking-widest text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22]">
            <Scale className="w-4 h-4 text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22]" />
            <span>CURRICULUM TIMELINE: 19 ETHICAL RESTRAINT EXERCISES</span>
          </div>
          <span className="text-xs font-mono text-[#8E8A83]">
            [CH. 1 → CH. 19 COMPLETE MATRIX]
          </span>
        </div>

        <div className="space-y-3">
          {allTiedSteps.map(({ chapter, step }) => {
            const isDone = !!adherence[step.id];
            return (
              <div
                key={step.id}
                className={`p-4 sm:p-5 border transition-all rounded-none ${
                  isDone
                    ? isDark
                      ? 'border-emerald-600/60 bg-emerald-950/20'
                      : 'border-emerald-600/60 bg-emerald-50'
                    : isDark
                      ? 'border-[#B9BDC2]/20 bg-[#171513] hover:border-[#C5A36A]'
                      : 'border-[#7A5A22]/30 bg-[#F2ECE1] hover:border-[#7A5A22]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-3.5">
                    <button
                      onClick={() => toggleAdherence(step.id)}
                      className="touch-target mt-1 transition-colors shrink-0 cursor-pointer flex items-center justify-center"
                      aria-label="Toggle ethical exercise completion"
                    >
                      {isDone ? (
                        <CheckSquare className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <Square className={`w-5 h-5 ${isDark ? 'text-[#8E8A83]' : 'text-[#5E5851]'}`} />
                      )}
                    </button>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                        <span className="font-bold text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22]">
                          MODULE {chapter.number}
                        </span>
                        <span aria-hidden="true" className="text-[#8E8A83]">·</span>
                        <span className="font-sans text-[#8E8A83]">
                          {chapter.title}
                        </span>
                      </div>

                      <h4 className="font-display font-bold text-base sm:text-lg uppercase tracking-wide text-[#E7E0D4] dark:text-[#E7E0D4] light:text-[#11100E]">
                        {step.title}
                      </h4>

                      <p className="text-sm sm:text-base font-sans text-[#B9BDC2] dark:text-[#B9BDC2] light:text-[#302C28] leading-relaxed pt-0.5">
                        {step.instruction}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigateChapter(chapter.id)}
                    className={`touch-target self-end sm:self-center px-3.5 py-2 text-xs font-mono font-bold uppercase tracking-wider border flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer rounded-none ${
                      isDark
                        ? 'bg-[#11100E] text-[#E7E0D4] border-[#B9BDC2]/30 hover:border-[#C5A36A] hover:text-[#C5A36A]'
                        : 'bg-[#DDD5C7] text-[#11100E] border-[#7A5A22]/40 hover:border-[#7A5A22]'
                    }`}
                  >
                    <span>READ MOD {chapter.number}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
