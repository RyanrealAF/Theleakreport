/**
 * Build While Bleeding — Academic Lexicon View
 * buildwhilebleeding.com
 * Applied behavioral acoustics lexicon, clinical taxonomy of leakage definitions, and ethical terminology
 */

import React, { useState } from 'react';
import { GLOSSARY } from '../data/glossary';
import { useTheme } from '../context/ThemeContext';
import { BookMarked, Search, ArrowRight } from 'lucide-react';

interface GlossaryViewProps {
  onNavigateChapter: (chapterId: string) => void;
}

export const GlossaryView: React.FC<GlossaryViewProps> = ({ onNavigateChapter }) => {
  const { isDark } = useTheme();
  const [search, setSearch] = useState<string>('');
  const [category, setCategory] = useState<string>('all');

  const filtered = GLOSSARY.filter(item => {
    if (category !== 'all' && item.category !== category) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return item.term.toLowerCase().includes(q) || item.definition.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-24">
      {/* Educational Header Banner */}
      <section className={`border p-6 sm:p-8 relative overflow-hidden rounded-none ${
        isDark
          ? 'border-[#C5A36A]/30 bg-[#171513] text-[#E7E0D4]'
          : 'border-[#7A5A22]/35 bg-[#F2ECE1] text-[#11100E]'
      }`}>
        <div className="flex items-center gap-3.5 mb-2">
          <div className={`w-12 h-12 border flex items-center justify-center shrink-0 rounded-none ${
            isDark ? 'bg-[#11100E] text-[#C5A36A] border-[#C5A36A]' : 'bg-[#DDD5C7] text-[#7A5A22] border-[#7A5A22]'
          }`}>
            <BookMarked className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold tracking-widest text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22] uppercase">
              [TM 31-HEAR-01 // LEXICON]
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-wide uppercase leading-tight">
              Academic & Operational Lexicon
            </h1>
            <p className="text-xs sm:text-sm font-mono text-[#8E8A83] mt-0.5">
              Part IV Reference Suite • 22 Core Psychological & Auditory Definitions
            </p>
          </div>
        </div>

        <p className={`text-sm sm:text-base font-sans leading-relaxed mt-4 pt-3 border-t ${
          isDark ? 'border-[#B9BDC2]/20 text-[#B9BDC2]' : 'border-[#7A5A22]/25 text-[#302C28]'
        }`}>
          A structured dictionary defining technical acoustic terms, cognitive-emotional latency concepts, and ethical restraint frameworks established across the 19 curriculum modules.
        </p>
      </section>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between text-xs font-mono">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#8E8A83] absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search lexicon term or definition..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={`touch-target w-full pl-9 pr-3 py-2 border rounded-none font-sans text-xs focus:outline-none transition-colors ${
              isDark
                ? 'bg-[#171513] border-[#B9BDC2]/30 text-[#E7E0D4] placeholder-[#8E8A83] focus:border-[#C5A36A]'
                : 'bg-[#DDD5C7] border-[#7A5A22]/40 text-[#11100E] placeholder-[#5E5851] focus:border-[#7A5A22]'
            }`}
          />
        </div>

        {/* Category Segmented Control with zero-pill discipline */}
        <div className={`flex flex-wrap items-center gap-1 p-1 border w-full sm:w-auto rounded-none ${
          isDark ? 'bg-[#171513] border-[#B9BDC2]/20' : 'bg-[#DDD5C7] border-[#7A5A22]/30'
        }`}>
          {[
            { id: 'all', label: 'ALL TERMS' },
            { id: 'core', label: 'CORE THEORY' },
            { id: 'leak-type', label: 'LEAK TYPOLOGIES' },
            { id: 'framework', label: 'FRAMEWORKS' },
            { id: 'ethics', label: 'ETHICAL RESTRAINT' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setCategory(tab.id)}
              className={`touch-target px-3 py-2 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer rounded-none ${
                category === tab.id
                  ? isDark
                    ? 'bg-[#C5A36A] text-[#11100E] font-bold'
                    : 'bg-[#7A5A22] text-[#E7E0D4] font-bold'
                  : isDark
                    ? 'text-[#B9BDC2] hover:text-[#E7E0D4] hover:bg-[#11100E]'
                    : 'text-[#302C28] hover:text-[#11100E] hover:bg-[#E5DEC0]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Glossary Cards */}
      <div className="space-y-3">
        {filtered.map(item => (
          <div
            key={item.term}
            className={`p-5 sm:p-6 border transition-all rounded-none ${
              isDark
                ? 'bg-[#171513] border-[#B9BDC2]/20 hover:border-[#C5A36A]'
                : 'bg-[#F2ECE1] border-[#7A5A22]/30 hover:border-[#7A5A22]'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="font-display font-black text-xl uppercase tracking-wide text-[#E7E0D4] dark:text-[#E7E0D4] light:text-[#11100E]">
                    {item.term}
                  </h3>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22] font-bold">
                    // [{item.category}]
                  </span>
                </div>

                <p className="text-sm sm:text-base font-sans text-[#B9BDC2] dark:text-[#B9BDC2] light:text-[#302C28] leading-relaxed">
                  {item.definition}
                </p>

                {item.chapters && item.chapters.length > 0 && (
                  <div className="flex items-center flex-wrap gap-2 pt-1 text-xs font-mono text-[#8E8A83]">
                    <span>Referenced in:</span>
                    {item.chapters.map(chNum => (
                      <button
                        key={chNum}
                        onClick={() => onNavigateChapter(`ch${chNum}`)}
                        className={`touch-target px-2.5 py-1 border transition-colors cursor-pointer rounded-none min-h-[36px] ${
                          isDark
                            ? 'bg-[#11100E] border-[#B9BDC2]/30 text-[#E7E0D4] hover:text-[#C5A36A] hover:border-[#C5A36A]'
                            : 'bg-[#DDD5C7] border-[#7A5A22]/40 text-[#11100E] hover:text-[#7A5A22] hover:border-[#7A5A22]'
                        }`}
                      >
                        MOD {chNum}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {item.chapters && item.chapters.length > 0 && (
                <button
                  onClick={() => onNavigateChapter(`ch${item.chapters[0]}`)}
                  className={`touch-target self-start sm:self-center px-3.5 py-2 text-xs font-mono font-bold uppercase tracking-wider border flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer rounded-none ${
                    isDark
                      ? 'bg-[#11100E] text-[#E7E0D4] border-[#B9BDC2]/30 hover:border-[#C5A36A] hover:text-[#C5A36A]'
                      : 'bg-[#DDD5C7] text-[#11100E] border-[#7A5A22]/40 hover:border-[#7A5A22]'
                  }`}
                >
                  <span>PRIMARY MOD {item.chapters[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22]" />
                </button>
              )}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className={`p-8 text-center border text-sm font-sans rounded-none ${
            isDark ? 'border-[#B9BDC2]/20 text-[#8E8A83]' : 'border-[#7A5A22]/30 text-[#5E5851]'
          }`}>
            No lexicon terms matched your search query.
          </div>
        )}
      </div>
    </div>
  );
};
