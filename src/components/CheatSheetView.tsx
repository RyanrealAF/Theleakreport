/**
 * Build While Bleeding — Taxonomy Reference Matrix
 * buildwhilebleeding.com
 * Classification matrix of 14 conversational leak typologies, observable markers, and curriculum cross-references
 */

import React, { useState } from 'react';
import { CHEAT_SHEET } from '../data/cheatSheet';
import { useTheme } from '../context/ThemeContext';
import { Search, ArrowRight, Table } from 'lucide-react';

interface CheatSheetViewProps {
  onNavigateChapter: (chapterId: string) => void;
}

export const CheatSheetView: React.FC<CheatSheetViewProps> = ({ onNavigateChapter }) => {
  const { isDark } = useTheme();
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(CHEAT_SHEET.map(c => c.category)))];

  const filtered = CHEAT_SHEET.filter(item => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        item.leakType.toLowerCase().includes(q) ||
        item.tell.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
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
            <Table className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold tracking-widest text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22] uppercase">
              [TM 31-HEAR-01 // MATRIX]
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-wide uppercase leading-tight">
              Taxonomy of Conversational Leaks
            </h1>
            <p className="text-xs sm:text-sm font-mono text-[#8E8A83] mt-0.5">
              Part IV Reference Suite • Classification of 14 Linguistic Tells & Behavioral Markers
            </p>
          </div>
        </div>

        <p className={`text-sm sm:text-base font-sans leading-relaxed mt-4 pt-3 border-t ${
          isDark ? 'border-[#B9BDC2]/20 text-[#B9BDC2]' : 'border-[#7A5A22]/25 text-[#302C28]'
        }`}>
          This comprehensive reference matrix catalogs the 14 core subtext leak typologies identified across the curriculum. Use the search and category filters below to examine behavioral markers, diagnostic cues, and chapter origins.
        </p>
      </section>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between text-xs font-mono">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#8E8A83] absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search leak typology, tell, or category..."
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
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`touch-target px-3 py-2 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer rounded-none ${
                selectedCategory === cat
                  ? isDark
                    ? 'bg-[#C5A36A] text-[#11100E] font-bold'
                    : 'bg-[#7A5A22] text-[#E7E0D4] font-bold'
                  : isDark
                    ? 'text-[#B9BDC2] hover:text-[#E7E0D4] hover:bg-[#11100E]'
                    : 'text-[#302C28] hover:text-[#11100E] hover:bg-[#E5DEC0]'
              }`}
            >
              {cat === 'all' ? 'ALL TYPOLOGIES' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Structured Matrix Cards */}
      <div className="space-y-3">
        {filtered.map((item, idx) => (
          <div
            key={`${item.chapterId}-${idx}`}
            className={`p-5 sm:p-6 border transition-all rounded-none ${
              isDark
                ? 'bg-[#171513] border-[#B9BDC2]/20 hover:border-[#C5A36A]'
                : 'bg-[#F2ECE1] border-[#7A5A22]/30 hover:border-[#7A5A22]'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22]">
                    [{item.category}]
                  </span>
                  <span aria-hidden="true" className="text-[#8E8A83]">·</span>
                  <h3 className="font-display font-bold text-lg uppercase tracking-wide text-[#E7E0D4] dark:text-[#E7E0D4] light:text-[#11100E]">
                    {item.leakType}
                  </h3>
                </div>

                <div className="text-sm sm:text-base font-sans text-[#B9BDC2] dark:text-[#B9BDC2] light:text-[#302C28]">
                  <strong className="text-[#8E8A83] font-mono text-xs uppercase tracking-wider">Observable Tell:</strong>{' '}
                  {item.tell}
                </div>

                <div className="text-xs font-mono text-[#8E8A83]">
                  Documented in <strong className="text-[#E7E0D4] dark:text-[#E7E0D4] light:text-[#11100E]">Module {item.chapterNumber}</strong>
                </div>
              </div>

              <button
                onClick={() => onNavigateChapter(item.chapterId)}
                className={`touch-target self-start sm:self-center px-3.5 py-2 text-xs font-mono font-bold uppercase tracking-wider border flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer rounded-none ${
                  isDark
                    ? 'bg-[#11100E] text-[#E7E0D4] border-[#B9BDC2]/30 hover:border-[#C5A36A] hover:text-[#C5A36A]'
                    : 'bg-[#DDD5C7] text-[#11100E] border-[#7A5A22]/40 hover:border-[#7A5A22]'
                }`}
              >
                <span>STUDY MOD {item.chapterNumber}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22]" />
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className={`p-8 text-center border text-sm font-sans rounded-none ${
            isDark ? 'border-[#B9BDC2]/20 text-[#8E8A83]' : 'border-[#7A5A22]/30 text-[#5E5851]'
          }`}>
            No leak typologies matched your search query. Try broadening your terms.
          </div>
        )}
      </div>
    </div>
  );
};
