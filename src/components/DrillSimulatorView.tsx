import React, { useState } from 'react';
import { BUILT_IN_DRILLS } from '../data/drills';
import { DrillScenario } from '../types';
import { useTheme } from '../context/ThemeContext';
import {
  GraduationCap,
  CheckCircle2,
  XCircle,
  Bot,
  ArrowRight,
  Sparkles,
  Scale
} from 'lucide-react';

export const DrillSimulatorView: React.FC = () => {
  const { isDark } = useTheme();
  const [scenarios, setScenarios] = useState<DrillScenario[]>(BUILT_IN_DRILLS);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [loadingAi, setLoadingAi] = useState<boolean>(false);
  const [aiNotice, setAiNotice] = useState<string | null>(null);
  const [score, setScore] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });

  const currentScenario = scenarios[currentIndex] || BUILT_IN_DRILLS[0];

  const handleSelectOption = (optionId: string) => {
    if (isSubmitted) return;
    setSelectedOptionId(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId || isSubmitted) return;
    setIsSubmitted(true);
    const chosen = currentScenario.options.find(o => o.id === selectedOptionId);
    if (chosen?.isCorrect) {
      setScore(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }));
    } else {
      setScore(prev => ({ ...prev, total: prev.total + 1 }));
    }
  };

  const handleNextScenario = () => {
    setSelectedOptionId(null);
    setIsSubmitted(false);
    if (currentIndex < scenarios.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const generateDynamicDrill = async () => {
    setLoadingAi(true);
    setAiNotice(null);
    try {
      const res = await fetch('/api/drills/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customSetting: 'High-stakes workplace or personal interpersonal scenario',
        }),
      });
      const data = await res.json();
      if (data.success && data.scenario) {
        setScenarios(prev => [data.scenario, ...prev]);
        setCurrentIndex(0);
        setSelectedOptionId(null);
        setIsSubmitted(false);
        setAiNotice('Dynamic case study generated and loaded into the simulation lab.');
      } else if (data.fallback) {
        setAiNotice('Loaded curated case study from curriculum archive.');
        handleNextScenario();
      }
    } catch {
      setAiNotice('Loaded next curated case study.');
      handleNextScenario();
    } finally {
      setLoadingAi(false);
    }
  };

  const selectedOption = currentScenario.options.find(o => o.id === selectedOptionId);
  const accuracyPercent = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-24">
      {/* Educational Header Banner */}
      <section className={`border rounded-xl p-6 sm:p-8 relative overflow-hidden shadow-book ${
        isDark
          ? 'border-stone-800 bg-stone-900/80 text-stone-100'
          : 'border-stone-200 bg-white text-stone-900'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className={`p-2.5 rounded-lg border ${
              isDark ? 'bg-amber-950/60 text-amber-400 border-amber-800/60' : 'bg-amber-100 text-amber-900 border-amber-300'
            }`}>
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
                Diagnostic Simulation Lab
              </h1>
              <p className="text-xs sm:text-sm font-mono text-amber-800 dark:text-amber-400 mt-1">
                Active Subtext Diagnosis & Applied Ethical Restraint Drills
              </p>
            </div>
          </div>

          {/* Academic Score Card */}
          <div className="flex items-center gap-3">
            <div className={`px-4 py-2 rounded-xl border text-xs font-mono shadow-xs ${
              isDark ? 'bg-stone-950 border-stone-800' : 'bg-stone-50 border-stone-200'
            }`}>
              <div className="text-stone-500 uppercase tracking-wider text-[10px]">DIAGNOSTIC ACCURACY</div>
              <div className="text-base font-bold font-serif text-stone-900 dark:text-stone-100 mt-0.5">
                {score.correct}/{score.total} ({accuracyPercent}%)
              </div>
            </div>

            <button
              onClick={generateDynamicDrill}
              disabled={loadingAi}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-sans font-semibold flex items-center gap-1.5 transition-colors border shadow-xs cursor-pointer ${
                isDark
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                  : 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
              }`}
              title="Generate new scenario using Gemini AI"
            >
              <Bot className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>{loadingAi ? 'Synthesizing...' : 'New AI Case'}</span>
            </button>
          </div>
        </div>

        {aiNotice && (
          <div className="mt-4 p-3 rounded-lg text-xs font-mono bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>{aiNotice}</span>
          </div>
        )}
      </section>

      {/* Main Simulation Scenario Card */}
      <section className={`border rounded-xl p-6 sm:p-8 space-y-6 shadow-book ${
        isDark ? 'border-stone-800 bg-stone-900/60' : 'border-stone-200 bg-white'
      }`}>
        {/* Scenario Header Info (Unboxed Metadata) */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-4 border-stone-200 dark:border-stone-800 text-xs font-mono text-stone-500 dark:text-stone-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">
              Case Study {currentIndex + 1} of {scenarios.length}
            </span>
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
            <span className="font-sans font-medium text-stone-600 dark:text-stone-300">
              {currentScenario.chapterTitle}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span>Setting:</span>
            <span className="font-semibold text-stone-700 dark:text-stone-300">{currentScenario.setting}</span>
          </div>
        </div>

        {/* Narrative Context */}
        <div className="space-y-1.5 font-sans">
          <div className="text-xs font-mono uppercase tracking-wider text-stone-500">
            Case Context & Environmental Setting:
          </div>
          <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
            {currentScenario.context}
          </p>
        </div>

        {/* Verbatim Transcript */}
        <div className={`p-5 rounded-xl border font-sans space-y-2.5 shadow-book ${
          isDark ? 'bg-stone-950/80 border-stone-800' : 'bg-stone-50 border-stone-200'
        }`}>
          <div className="text-xs font-mono uppercase tracking-wider text-stone-400 dark:text-stone-500 flex items-center justify-between">
            <span>Verbatim Intercept Transcript</span>
            <span className="text-amber-700 dark:text-amber-400 font-semibold">Auditory Friction Detected</span>
          </div>
          <blockquote className="font-serif italic text-lg sm:text-xl text-stone-900 dark:text-stone-100 leading-relaxed">
            "{currentScenario.dialogue}"
          </blockquote>
          <div className="text-xs font-mono text-stone-500 pt-1.5 border-t border-stone-200 dark:border-stone-800/80">
            <strong>Observable Micro-Tell:</strong> {currentScenario.tell}
          </div>
        </div>

        {/* Diagnostic Choices */}
        <div className="space-y-3 pt-2">
          <div className="text-xs font-mono uppercase tracking-wider font-bold text-amber-800 dark:text-amber-400">
            Select Your Clinical Diagnosis & Response Protocol:
          </div>

          <div className="space-y-2.5">
            {currentScenario.options.map(option => {
              const isSelected = selectedOptionId === option.id;
              let optionStyle = isDark
                ? 'bg-stone-950/60 border-stone-800 text-stone-300 hover:border-stone-700'
                : 'bg-white border-stone-200 text-stone-800 hover:border-stone-300 shadow-xs';

              if (isSelected && !isSubmitted) {
                optionStyle = isDark
                  ? 'bg-amber-950/30 border-amber-500 text-amber-200 ring-1 ring-amber-500'
                  : 'bg-amber-50 border-amber-400 text-amber-950 ring-1 ring-amber-400';
              }

              if (isSubmitted) {
                if (option.isCorrect) {
                  optionStyle = isDark
                    ? 'bg-emerald-950/30 border-emerald-500 text-emerald-200'
                    : 'bg-emerald-50 border-emerald-400 text-emerald-950';
                } else if (isSelected && !option.isCorrect) {
                  optionStyle = isDark
                    ? 'bg-rose-950/30 border-rose-500 text-rose-200'
                    : 'bg-rose-50 border-rose-400 text-rose-950';
                }
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option.id)}
                  disabled={isSubmitted}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer ${optionStyle}`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isSubmitted ? (
                      option.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      ) : isSelected ? (
                        <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-stone-400 dark:border-stone-600" />
                      )
                    ) : (
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? 'border-amber-600 bg-amber-600 text-white dark:border-amber-400 dark:bg-amber-400 dark:text-stone-950'
                          : 'border-stone-400 dark:border-stone-600'
                      }`}>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-current" />}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1 flex-1">
                    <p className="font-sans text-sm sm:text-base leading-relaxed">
                      {option.text}
                    </p>

                    {isSubmitted && (
                      <p className={`text-xs sm:text-sm font-sans italic pt-1 ${
                        option.isCorrect ? 'text-emerald-700 dark:text-emerald-300' : 'text-stone-500'
                      }`}>
                        <strong>Pedagogical Analysis:</strong> {option.explanation}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Controls & Submission Evaluation */}
        <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3">
          {!isSubmitted ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={!selectedOptionId}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-sans font-bold flex items-center gap-2 transition-colors shadow-xs cursor-pointer ${
                selectedOptionId
                  ? 'bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-stone-950'
                  : 'bg-stone-200 dark:bg-stone-800 text-stone-400 cursor-not-allowed'
              }`}
            >
              <span>Submit Clinical Diagnosis</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="w-full space-y-4">
              {/* Verdict Takeaway Block */}
              <div className={`p-5 rounded-xl border space-y-2 shadow-book ${
                selectedOption?.isCorrect
                  ? isDark ? 'bg-emerald-950/20 border-emerald-800 text-emerald-200' : 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : isDark ? 'bg-amber-950/20 border-amber-800 text-amber-200' : 'bg-amber-50 border-amber-300 text-amber-900'
              }`}>
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase">
                  <Scale className="w-4 h-4" />
                  <span>The Practitioner's Restraint Protocol (Ch. 5 Ethical Mandate):</span>
                </div>
                <p className="font-serif italic text-sm sm:text-base leading-relaxed">
                  "{currentScenario.verdictRead}"
                </p>
                <div className="text-xs font-sans font-medium text-stone-600 dark:text-stone-300">
                  {currentScenario.ch5RestraintPrompt}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNextScenario}
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-sans font-bold bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-stone-950 flex items-center gap-2 transition-colors shadow-xs cursor-pointer"
                >
                  <span>Next Case Study</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
