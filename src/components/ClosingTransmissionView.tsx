import React, { useState, useEffect } from 'react';
import { CLOSING_TRANSMISSION } from '../data/closingTransmission';
import { useTheme } from '../context/ThemeContext';
import { ArrowRight, Play, Pause } from 'lucide-react';

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
      <section className={`border rounded-xl p-6 sm:p-8 text-center space-y-3.5 shadow-book ${
        isDark
          ? 'border-stone-800 bg-stone-900/80 text-stone-100'
          : 'border-stone-200 bg-white text-stone-900'
      }`}>
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-amber-800 dark:text-amber-400 uppercase tracking-widest font-semibold">
          <span>Curriculum Valedictory Synthesis</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight">
          {CLOSING_TRANSMISSION.header}
        </h1>

        <p className="text-xs sm:text-sm font-mono text-stone-500 uppercase tracking-widest">
          {CLOSING_TRANSMISSION.subtitle}
        </p>

        {/* Readout Transmission Audio Simulator Controls */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <button
            onClick={togglePlayback}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-sans font-bold flex items-center gap-2 transition-colors shadow-xs cursor-pointer ${
              isPlaying
                ? 'bg-rose-600 hover:bg-rose-700 text-white'
                : 'bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-500 dark:text-stone-950'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pause Spoken Transmission</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Begin Oral Synthesis</span>
              </>
            )}
          </button>

          <button
            onClick={() => { setRevealedStanza(CLOSING_TRANSMISSION.stanzas.length - 1); setIsPlaying(false); }}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-mono border transition-colors cursor-pointer ${
              isDark ? 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700' : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200'
            }`}
          >
            Read All Stanzas
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
              className={`p-6 sm:p-8 rounded-xl border transition-all duration-300 font-serif leading-relaxed shadow-book ${
                isCurrent
                  ? isDark
                    ? 'border-amber-500 bg-amber-950/20 text-stone-100 ring-1 ring-amber-500'
                    : 'border-amber-400 bg-amber-50/70 text-stone-900 ring-1 ring-amber-400'
                  : isDark
                    ? 'border-stone-800 bg-stone-900/60 text-stone-300'
                    : 'border-stone-200 bg-white text-stone-800'
              }`}
            >
              <div className="text-xs font-mono uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-3 flex items-center justify-between">
                <span>Stanza {String(idx + 1).padStart(2, '0')} of {CLOSING_TRANSMISSION.stanzas.length}</span>
                {isCurrent && (
                  <span className="text-amber-700 dark:text-amber-400 font-bold flex items-center gap-1.5 font-mono">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                    Now Reading
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

      {/* Footer Return */}
      <div className="pt-6 border-t border-stone-200 dark:border-stone-800 flex justify-center">
        <button
          onClick={onReturnToManual}
          className="px-6 py-3 rounded-xl text-xs sm:text-sm font-sans font-bold bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-500 dark:text-stone-950 flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
        >
          <span>Return to Curriculum Modules</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
