/**
 * Build While Bleeding — Drill Simulator View
 * buildwhilebleeding.com
 * Interactive acoustic diagnostic scenario lab, real-time intercept evaluations, and ethical restraint protocol testing
 */

import React, { useState } from 'react';
import { BUILT_IN_DRILLS } from '../data/drills';
import { DrillScenario } from '../types';
import { useTheme } from '../context/ThemeContext';
import {
  CheckSquare,
  Square,
  Bot,
  ArrowRight,
  Sparkles,
  Scale,
  ShieldAlert,
  CheckCircle2,
  XCircle
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
      {/* Header Banner */}
      <section className={`border p-6 sm:p-8 relative overflow-hidden rounded-none ${
        isDark
          ? 'border-[#C5A36A]/30 bg-[#171513] text-[#E7E0D4]'
          : 'border-[#7A5A22]/35 bg-[#F2ECE1] text-[#11100E]'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className={`w-12 h-12 border flex items-center justify-center shrink-0 rounded-none ${
              isDark ? 'bg-[#11100E] text-[#C5A36A] border-[#C5A36A]' : 'bg-[#DDD5C7] text-[#7A5A22] border-[#7A5A22]'
            }`}>
              <ShieldAlert className="w-6 h-6 text-[#C2332B]" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold tracking-widest text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22] uppercase">
                [TM 31-HEAR-01 // DRILL LAB]
              </div>
              <h1 className="text-3xl sm:text-4xl font-display font-black tracking-wide uppercase leading-tight">
                Diagnostic Simulation Lab
              </h1>
              <p className="text-xs sm:text-sm font-mono text-[#8E8A83] mt-0.5">
                Active Subtext Diagnosis & Applied Ethical Restraint Intercept Drills
              </p>
            </div>
          </div>

          {/* Academic Score Card */}
          <div className="flex items-center gap-3">
            <div className={`px-4 py-2 border text-xs font-mono rounded-none ${
              isDark ? 'bg-[#11100E] border-[#B9BDC2]/20 text-[#E7E0D4]' : 'bg-[#DDD5C7] border-[#7A5A22]/30 text-[#11100E]'
            }`}>
              <div className="text-[#8E8A83] uppercase tracking-wider text-[10px]">DIAGNOSTIC ACCURACY</div>
              <div className="text-base font-bold font-mono text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22] mt-0.5">
                {score.correct}/{score.total} ({accuracyPercent}%)
              </div>
            </div>

            <button
              onClick={generateDynamicDrill}
              disabled={loadingAi}
              className={`touch-target px-3.5 py-2 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors border cursor-pointer rounded-none ${
                isDark
                  ? 'bg-[#11100E] text-[#C5A36A] border-[#C5A36A]/50 hover:bg-[#C5A36A]/10'
                  : 'bg-[#DDD5C7] text-[#7A5A22] border-[#7A5A22] hover:bg-[#7A5A22]/10'
              }`}
              title="Generate new scenario using Gemini AI"
            >
              <Bot className="w-4 h-4 text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22]" />
              <span>{loadingAi ? 'SYNTHESIZING...' : 'NEW AI CASE'}</span>
            </button>
          </div>
        </div>

        {aiNotice && (
          <div className="mt-4 p-3 border text-xs font-mono bg-[#11100E] text-[#C5A36A] border-[#C5A36A]/50 flex items-center gap-2 rounded-none">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>{aiNotice}</span>
          </div>
        )}
      </section>

      {/* Main Simulation Scenario Card */}
      <section className={`border p-6 sm:p-8 space-y-6 rounded-none ${
        isDark ? 'border-[#B9BDC2]/20 bg-[#171513]' : 'border-[#7A5A22]/30 bg-[#F2ECE1]'
      }`}>
        {/* Scenario Header Info */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-4 border-[#B9BDC2]/20 text-xs font-mono text-[#8E8A83]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22] uppercase tracking-wider">
              [CASE STUDY {currentIndex + 1} OF {scenarios.length}]
            </span>
            <span aria-hidden="true" className="text-[#8E8A83]">·</span>
            <span className="font-display font-bold text-sm tracking-wide uppercase text-[#E7E0D4] dark:text-[#E7E0D4] light:text-[#11100E]">
              {currentScenario.chapterTitle}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>Setting:</span>
            <span className="font-semibold uppercase text-[#E7E0D4] dark:text-[#E7E0D4] light:text-[#11100E]">{currentScenario.setting}</span>
          </div>
        </div>

        {/* Narrative Context */}
        <div className="space-y-1.5 font-sans">
          <div className="text-xs font-mono uppercase tracking-widest text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22]">
            CASE CONTEXT & ENVIRONMENTAL SETTING:
          </div>
          <p className="text-sm sm:text-base text-[#B9BDC2] dark:text-[#B9BDC2] light:text-[#302C28] leading-relaxed">
            {currentScenario.context}
          </p>
        </div>

        {/* Verbatim Transcript */}
        <div className={`p-5 border font-sans space-y-2.5 rounded-none ${
          isDark ? 'bg-[#11100E] border-[#B9BDC2]/20' : 'bg-[#DDD5C7] border-[#7A5A22]/30'
        }`}>
          <div className="text-xs font-mono uppercase tracking-widest text-[#8E8A83] flex items-center justify-between">
            <span>VERBATIM INTERCEPT TRANSCRIPT</span>
            <span className="text-[#C2332B] font-mono font-bold">[AUDITORY FRICTION DETECTED]</span>
          </div>
          <blockquote className="font-serif italic text-lg sm:text-xl text-[#E7E0D4] dark:text-[#E7E0D4] light:text-[#11100E] leading-relaxed">
            "{currentScenario.dialogue}"
          </blockquote>
          <div className="text-xs font-mono text-[#8E8A83] pt-1.5 border-t border-[#B9BDC2]/20">
            <strong className="text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22]">Observable Micro-Tell:</strong> {currentScenario.tell}
          </div>
        </div>

        {/* Diagnostic Choices */}
        <div className="space-y-3 pt-2">
          <div className="text-xs font-mono uppercase tracking-widest font-bold text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22]">
            SELECT CLINICAL DIAGNOSIS & RESTRAINT PROTOCOL:
          </div>
          <div className="space-y-2.5">
            {currentScenario.options.map(option => {
              const isSelected = selectedOptionId === option.id;
              let optionStyle = isDark
                ? 'bg-[#11100E] border-[#B9BDC2]/20 text-[#B9BDC2] hover:border-[#C5A36A]'
                : 'bg-[#DDD5C7] border-[#7A5A22]/30 text-[#302C28] hover:border-[#7A5A22]';

              if (isSelected && !isSubmitted) {
                optionStyle = isDark
                  ? 'bg-[#C5A36A]/20 border-[#C5A36A] text-[#E7E0D4] ring-1 ring-[#C5A36A]'
                  : 'bg-[#7A5A22]/20 border-[#7A5A22] text-[#11100E] ring-1 ring-[#7A5A22]';
              }

              if (isSubmitted) {
                if (option.isCorrect) {
                  optionStyle = isDark
                    ? 'bg-emerald-950/30 border-emerald-500 text-emerald-200'
                    : 'bg-emerald-50 border-emerald-500 text-emerald-950';
                } else if (isSelected && !option.isCorrect) {
                  optionStyle = isDark
                    ? 'bg-rose-950/30 border-rose-500 text-rose-200'
                    : 'bg-rose-50 border-rose-500 text-rose-950';
                }
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option.id)}
                  disabled={isSubmitted}
                  className={`touch-target w-full text-left p-4 border transition-all flex items-start gap-3.5 cursor-pointer rounded-none ${optionStyle}`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isSubmitted ? (
                      option.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : isSelected ? (
                        <XCircle className="w-5 h-5 text-rose-500" />
                      ) : (
                        <div className="w-5 h-5 border border-[#8E8A83] rounded-none" />
                      )
                    ) : (
                      <div className={`w-5 h-5 border flex items-center justify-center rounded-none ${
                        isSelected
                          ? 'border-[#C5A36A] bg-[#C5A36A] text-[#11100E] dark:border-[#C5A36A] dark:bg-[#C5A36A]'
                          : 'border-[#8E8A83]'
                      }`}>
                        {isSelected && <div className="w-2 h-2 bg-current" />}
                      </div>
                    )}
                  </div>
                  <div className="space-y-1 flex-1">
                    <p className="font-sans text-sm sm:text-base leading-relaxed">
                      {option.text}
                    </p>
                    {isSubmitted && (
                      <p className={`text-xs sm:text-sm font-mono pt-1 ${
                        option.isCorrect ? 'text-emerald-400 font-bold' : 'text-[#8E8A83]'
                      }`}>
                        <strong>ANALYSIS:</strong> {option.explanation}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Controls & Submission Evaluation */}
        <div className="pt-4 border-t border-[#B9BDC2]/20 flex flex-wrap items-center justify-between gap-3">
          {!isSubmitted ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={!selectedOptionId}
              className={`touch-target px-5 py-2.5 rounded-none text-xs sm:text-sm font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer ${
                selectedOptionId
                  ? 'bg-[#C5A36A] hover:bg-[#C5A36A]/90 text-[#11100E]'
                  : 'bg-[#11100E] text-[#8E8A83] border border-[#B9BDC2]/20 cursor-not-allowed'
              }`}
            >
              <span>SUBMIT DIAGNOSIS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="w-full space-y-4">
              {/* Verdict Takeaway Block */}
              <div className={`p-5 border space-y-2 rounded-none ${
                selectedOption?.isCorrect
                  ? isDark ? 'bg-emerald-950/20 border-emerald-700 text-emerald-200' : 'bg-emerald-50 border-emerald-500 text-emerald-900'
                  : isDark ? 'bg-[#C5A36A]/15 border-[#C5A36A] text-[#E7E0D4]' : 'bg-[#7A5A22]/15 border-[#7A5A22] text-[#11100E]'
              }`}>
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22]">
                  <Scale className="w-4 h-4" />
                  <span>The Practitioner's Restraint Protocol (Ch. 5 Ethical Mandate):</span>
                </div>
                <p className="font-serif italic text-sm sm:text-base leading-relaxed">
                  "{currentScenario.verdictRead}"
                </p>
                <div className="text-xs font-mono text-[#8E8A83]">
                  {currentScenario.ch5RestraintPrompt}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNextScenario}
                  className="touch-target px-5 py-2.5 rounded-none text-xs sm:text-sm font-mono font-bold uppercase tracking-wider bg-[#C5A36A] hover:bg-[#C5A36A]/90 text-[#11100E] flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span>NEXT CASE STUDY</span>
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
