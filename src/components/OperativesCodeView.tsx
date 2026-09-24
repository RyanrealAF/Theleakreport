import React, { useState, useEffect } from 'react';
import { Chapter, ActionStep } from '../types';
import { useTheme } from '../context/ThemeContext';
import { Scale, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

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
      console.error(e);
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
      console.error(e);
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
      <section className={`border rounded-xl p-6 sm:p-8 relative overflow-hidden shadow-book ${
        isDark
          ? 'border-stone-800 bg-stone-900/80 text-stone-100'
          : 'border-amber-200 bg-amber-50/50 text-stone-900'
      }`}>
        <div className="flex items-center gap-3.5 mb-3">
          <div className={`p-2.5 rounded-lg border ${
            isDark
              ? 'bg-amber-950/60 text-amber-400 border-amber-800/60'
              : 'bg-amber-100 text-amber-900 border-amber-300'
          }`}>
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-tight">
              The Practitioner's Code of Ethics
            </h1>
            <p className="text-xs sm:text-sm font-mono text-amber-800 dark:text-amber-400 mt-1">
              Cross-Chapter Ethical Restraint Index (Threaded Across All 19 Modules)
            </p>
          </div>
        </div>

        <p className={`text-base sm:text-lg font-serif italic leading-relaxed mt-4 ${
          isDark ? 'text-stone-300' : 'text-stone-700'
        }`}>
          "You did not study human conversational leakage to weaponize vulnerability. You learned to perceive subtext so that you could cease projecting your own anxiety and preserve dignity in the room."
        </p>

        <p className={`text-sm sm:text-base font-sans leading-relaxed mt-3 ${
          isDark ? 'text-stone-400' : 'text-stone-600'
        }`}>
          In behavioral acoustics, perceptual acuity without ethical restraint descends into paranoia and social manipulation. The Code acts as an internal regulator: every chapter features at least one practice step specifically anchored to Chapter 5's mandate of restraint, non-confrontation, and silent containment.
        </p>

        {/* Adherence Metric Card */}
        <div className={`mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5 border-t ${
          isDark ? 'border-stone-800' : 'border-amber-200/80'
        }`}>
          <div className={`p-4 rounded-xl border shadow-xs ${
            isDark ? 'bg-stone-950/80 border-stone-800' : 'bg-white border-stone-200'
          }`}>
            <div className="text-xs font-mono text-stone-500 uppercase tracking-wider">ETHICAL ANCHORS</div>
            <div className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
              {allTiedSteps.length} Protocols
            </div>
            <div className="text-xs text-stone-500 mt-0.5">Anchored in every chapter</div>
          </div>

          <div className={`p-4 rounded-xl border shadow-xs ${
            isDark ? 'bg-stone-950/80 border-stone-800' : 'bg-white border-stone-200'
          }`}>
            <div className="text-xs font-mono text-stone-500 uppercase tracking-wider">CURRICULUM INTEGRATION</div>
            <div className="text-2xl font-serif font-bold text-amber-700 dark:text-amber-400 mt-1">
              100% (19/19 Modules)
            </div>
            <div className="text-xs text-stone-500 mt-0.5">Complete pedagogical coverage</div>
          </div>

          <div className={`p-4 rounded-xl border shadow-xs ${
            isDark ? 'bg-stone-950/80 border-stone-800' : 'bg-white border-stone-200'
          }`}>
            <div className="text-xs font-mono text-stone-500 uppercase tracking-wider">PRACTICE LOGGED</div>
            <div className="text-2xl font-serif font-bold text-emerald-600 dark:text-emerald-400 mt-1">
              {adheredCount}/{allTiedSteps.length} ({adherenceRate}%)
            </div>
            <div className="text-xs text-stone-500 mt-0.5">Self-reported logged drills</div>
          </div>
        </div>
      </section>

      {/* The Core 3 Doctrines from Ch. 5 */}
      <section className={`border rounded-xl p-6 sm:p-7 space-y-4 shadow-book ${
        isDark ? 'border-stone-800 bg-stone-900/60' : 'border-stone-200 bg-white'
      }`}>
        <h2 className="text-sm font-mono font-bold uppercase tracking-wider flex items-center gap-2 text-amber-800 dark:text-amber-400">
          <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          The Three Foundational Maxims of Ethical Listening (Chapter 5)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <div className={`p-4 sm:p-5 rounded-xl border space-y-2 ${
            isDark ? 'bg-stone-950/60 border-stone-800' : 'bg-stone-50 border-stone-200'
          }`}>
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase">
              Law I // Silent Containment
            </span>
            <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
              Awareness Without Retaliation
            </h3>
            <p className="text-xs sm:text-sm font-sans leading-relaxed text-stone-600 dark:text-stone-400">
              Hearing someone leak hostility, insecurity, or deceit does not obligate you to announce it. An educated listener absorbs the signal quietly, adjusts their boundaries, and lets the other party retain their face.
            </p>
          </div>

          <div className={`p-4 sm:p-5 rounded-xl border space-y-2 ${
            isDark ? 'bg-stone-950/60 border-stone-800' : 'bg-stone-50 border-stone-200'
          }`}>
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase">
              Law II // Non-Weaponization
            </span>
            <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
              Refusal to Exploit
            </h3>
            <p className="text-xs sm:text-sm font-sans leading-relaxed text-stone-600 dark:text-stone-400">
              Never use an overheard micro-confession or nervous slip to humiliate a colleague, friend, or partner. Exposing someone else's leak in public is an amateur move that betrays your own insecurity.
            </p>
          </div>

          <div className={`p-4 sm:p-5 rounded-xl border space-y-2 ${
            isDark ? 'bg-stone-950/60 border-stone-800' : 'bg-stone-50 border-stone-200'
          }`}>
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase">
              Law III // Internal Audit
            </span>
            <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
              Auditing Your Own Transmission
            </h3>
            <p className="text-xs sm:text-sm font-sans leading-relaxed text-stone-600 dark:text-stone-400">
              Before cataloging the speech errors and micro-adjustments of others, observe your own linguistic strain. The most disciplined observer is the one who monitors their own defensive chatter.
            </p>
          </div>
        </div>
      </section>

      {/* Complete Cross-Chapter Timeline of Code-Tied Steps */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b pb-2.5 border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
            <Scale className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Curriculum Timeline: 19 Ethical Restraint Exercises</span>
          </div>
          <span className="text-xs font-mono text-stone-500">
            CH. 1 → CH. 19 COMPLETE SYNTHESIS
          </span>
        </div>

        <div className="space-y-3">
          {allTiedSteps.map(({ chapter, step }) => {
            const isDone = !!adherence[step.id];
            return (
              <div
                key={step.id}
                className={`p-4 sm:p-5 rounded-xl border transition-all shadow-book ${
                  isDone
                    ? isDark
                      ? 'border-emerald-800/60 bg-emerald-950/20'
                      : 'border-emerald-300 bg-emerald-50/50'
                    : isDark
                      ? 'border-stone-800 bg-stone-900/60 hover:border-stone-700'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-3.5">
                    <button
                      onClick={() => toggleAdherence(step.id)}
                      className="mt-1 transition-colors shrink-0 cursor-pointer"
                      aria-label="Toggle ethical exercise completion"
                    >
                      <CheckCircle2
                        className={`w-5 h-5 ${
                          isDone
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : isDark ? 'text-stone-700 hover:text-stone-500' : 'text-stone-300 hover:text-stone-500'
                        }`}
                      />
                    </button>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                        <span className="font-semibold text-amber-800 dark:text-amber-400">
                          Module {chapter.number}
                        </span>
                        <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
                        <span className="font-sans text-stone-500 dark:text-stone-400">
                          {chapter.title}
                        </span>
                      </div>

                      <h4 className="font-serif font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100">
                        {step.title}
                      </h4>

                      <p className="text-sm sm:text-base font-sans text-stone-600 dark:text-stone-300 leading-relaxed pt-0.5">
                        {step.instruction}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigateChapter(chapter.id)}
                    className={`self-end sm:self-center px-3 py-1.5 rounded-lg text-xs font-sans font-medium border flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer ${
                      isDark
                        ? 'bg-stone-800 text-stone-300 border-stone-700 hover:border-amber-500 hover:text-amber-300'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-amber-600 hover:text-amber-900'
                    }`}
                  >
                    <span>Read Module {chapter.number}</span>
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
