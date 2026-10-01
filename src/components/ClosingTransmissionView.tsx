/**
 * Build While Bleeding — Valedictory Synthesis
 * buildwhilebleeding.com
 * Oral transmission simulator, closing philosophical manifesto, and pedagogical synthesis
 */

import React, { useState, useEffect } from 'react';
import { CLOSING_TRANSMISSION } from '../data/closingTransmission';
import { useTheme } from '../context/ThemeContext';
import { ArrowRight, Play, Pause, Radio } from 'lucide-react';

interface ClosingTransmissionViewProps {
  onReturnToManual: () => void;
}

export const ClosingTransmissionView: React.FC<ClosingTransmissionViewProps> = ({
  onReturnToManual,
}) => {
  const { isDark } = useTheme();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [revealedStanza, setRevealedStanza] = useState<number>(0);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setRevealedStanza(prev => {
          if (prev < CLOSING_TRANSMISSION.stanzas.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 3200);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlayback = () => {
    if (!isPlaying) {
      if (revealedStanza >= CLOSING_TRANSMISSION.stanzas.length - 1) {
        setRevealedStanza(0);
      }
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto pb-24">
      {/* Header Banner */}
      <section className={`border p-6 sm:p-8 text-center space-y-3.5 rounded-none ${
        isDark
          ? 'border-[#C5A36A]/30 bg-[#171513] text-[#E7E0D4]'
          : 'border-[#7A5A22]/35 bg-[#F2ECE1] text-[#11100E]'
      }`}>
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22] uppercase tracking-widest font-bold">
          <Radio className="w-4 h-4 text-[#C2332B] animate-pulse" />
          <span>[TM 31-HEAR-01 // VALEDICTORY SYNTHESIS]</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-wide uppercase leading-tight">
          {CLOSING_TRANSMISSION.header}
        </h1>

        <p className="text-xs sm:text-sm font-mono text-[#8E8A83] uppercase tracking-widest">
          {CLOSING_TRANSMISSION.subtitle}
        </p>

        {/* Readout Transmission Audio Simulator Controls with touch targets ≥ 44px */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={togglePlayback}
            className={`touch-target px-5 py-2.5 rounded-none text-xs sm:text-sm font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer ${
              isPlaying
                ? 'bg-[#C2332B] text-white hover:bg-[#C2332B]/90'
                : isDark
                  ? 'bg-[#C5A36A] hover:bg-[#C5A36A]/90 text-[#11100E]'
                  : 'bg-[#7A5A22] hover:bg-[#7A5A22]/90 text-[#E7E0D4]'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                <span>PAUSE TRANSMISSION</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>BEGIN TRANSMISSION</span>
              </>
            )}
          </button>

          <button
            onClick={() => { setRevealedStanza(CLOSING_TRANSMISSION.stanzas.length - 1); setIsPlaying(false); }}
            className={`touch-target px-4 py-2.5 rounded-none text-xs font-mono uppercase tracking-wider border transition-colors cursor-pointer ${
              isDark
                ? 'bg-[#11100E] text-[#E7E0D4] border-[#B9BDC2]/30 hover:border-[#C5A36A]'
                : 'bg-[#DDD5C7] text-[#11100E] border-[#7A5A22]/40 hover:border-[#7A5A22]'
            }`}
          >
            READ ALL STANZAS
          </button>
        </div>
      </section>

      {/* Stanzas Displayed with Clean Typographic Dignity */}
      <div className="space-y-6">
        {CLOSING_TRANSMISSION.stanzas.map((stanza, idx) => {
          const isCurrent = idx === revealedStanza && isPlaying;
          const isPastOrRead = idx <= revealedStanza;
          if (!isPastOrRead) return null;

          return (
            <div
              key={idx}
              className={`p-6 sm:p-8 border transition-all duration-200 font-serif leading-relaxed rounded-none ${
                isCurrent
                  ? isDark
                    ? 'border-[#C5A36A] bg-[#C5A36A]/10 text-[#E7E0D4] ring-1 ring-[#C5A36A]'
                    : 'border-[#7A5A22] bg-[#7A5A22]/15 text-[#11100E] ring-1 ring-[#7A5A22]'
                  : isDark
                    ? 'border-[#B9BDC2]/20 bg-[#171513] text-[#B9BDC2]'
                    : 'border-[#7A5A22]/30 bg-[#F2ECE1] text-[#302C28]'
              }`}
            >
              <div className="text-xs font-mono uppercase tracking-widest text-[#8E8A83] mb-3 flex items-center justify-between border-b pb-2 border-[#B9BDC2]/15">
                <span>STANZA {String(idx + 1).padStart(2, '0')} // {CLOSING_TRANSMISSION.stanzas.length}</span>
                {isCurrent && (
                  <span className="text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22] font-bold flex items-center gap-1.5 font-mono text-[11px]">
                    <span className="w-2 h-2 bg-[#C2332B] animate-ping" />
                    NOW TRANSMITTING
                  </span>
                )}
              </div>

              <div className="space-y-2.5 text-base sm:text-lg">
                {stanza.map((line, lIdx) => (
                  <p key={lIdx} className="leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Return with touch target ≥ 44px */}
      <div className="pt-6 border-t border-[#B9BDC2]/20 flex justify-center">
        <button
          onClick={onReturnToManual}
          className={`touch-target px-6 py-3 rounded-none text-xs sm:text-sm font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer ${
            isDark
              ? 'bg-[#C5A36A] hover:bg-[#C5A36A]/90 text-[#11100E]'
              : 'bg-[#7A5A22] hover:bg-[#7A5A22]/90 text-[#E7E0D4]'
          }`}
        >
          <span>RETURN TO CURRICULUM MODULES</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
