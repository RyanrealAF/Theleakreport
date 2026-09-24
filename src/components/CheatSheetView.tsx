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
      <section className={`border rounded-xl p-6 sm:p-8 relative overflow-hidden shadow-book ${
        isDark
          ? 'border-stone-800 bg-stone-900/80 text-stone-100'
          : 'border-stone-200 bg-white text-stone-900'
      }`}>
        <div className="flex items-center gap-3.5 mb-2">
          <div className={`p-2.5 rounded-lg border ${
            isDark ? 'bg-amber-950/60 text-amber-400 border-amber-800/60' : 'bg-amber-100 text-amber-900 border-amber-300'
          }`}>
            <Table className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
              Taxonomy of Conversational Leaks
            </h1>
            <p className="text-xs sm:text-sm font-mono text-amber-800 dark:text-amber-400 mt-0.5">
              Part IV Reference Matrix • Classification of 14 Linguistic Tells & Behavioral Markers
            </p>
          </div>
        </div>

        <p className={`text-sm sm:text-base font-sans leading-relaxed mt-3 ${
          isDark ? 'text-stone-300' : 'text-stone-600'
        }`}>
          This comprehensive reference matrix catalogs the 14 core subtext leak typologies identified in the curriculum. Use the search and category filters below to review behavioral tells, underlying psychological drivers, and direct chapter anchors.
        </p>
      </section>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between text-xs font-mono">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search leak typology, tell, or category..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={`w-full rounded-lg pl-9 pr-3 py-2 border focus:outline-none transition-colors ${
              isDark
                ? 'bg-stone-900 border-stone-700 text-stone-100 placeholder-stone-500 focus:border-amber-500'
                : 'bg-white border-stone-300 text-stone-900 placeholder-stone-400 focus:border-amber-600'
            }`}
          />
        </div>

        {/* Category Segmented Control */}
        <div className={`flex flex-wrap items-center gap-1 p-1 rounded-lg border w-full sm:w-auto ${
          isDark ? 'bg-stone-900/90 border-stone-800' : 'bg-stone-100 border-stone-200'
        }`}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors capitalize cursor-pointer ${
                selectedCategory === cat
                  ? isDark
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                    : 'bg-white text-stone-900 font-bold shadow-xs'
                  : isDark
                    ? 'text-stone-400 hover:text-stone-200'
                    : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {cat === 'all' ? 'All Typologies' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Structured Matrix Cards */}
      <div className="space-y-3">
        {filtered.map((item, idx) => (
          <div
            key={`${item.chapterId}-${idx}`}
            className={`p-5 sm:p-6 rounded-xl border transition-all shadow-book ${
              isDark
                ? 'bg-stone-900/60 border-stone-800 hover:border-stone-700'
                : 'bg-white border-stone-200 hover:border-stone-300'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                    {item.category}
                  </span>
                  <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
                  <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                    {item.leakType}
                  </h3>
                </div>

                <div className="text-sm sm:text-base font-sans text-stone-700 dark:text-stone-300">
                  <strong className="text-stone-400 dark:text-stone-500 font-mono text-xs uppercase">Observable Tell:</strong>{' '}
                  {item.tell}
                </div>

                <div className="text-xs font-mono text-stone-500 dark:text-stone-400">
                  Documented in <strong>Module {item.chapterNumber}</strong>
                </div>
              </div>

              <button
                onClick={() => onNavigateChapter(item.chapterId)}
                className={`self-start sm:self-center px-3.5 py-1.5 rounded-lg text-xs font-sans font-medium border flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer ${
                  isDark
                    ? 'bg-stone-800 text-stone-300 border-stone-700 hover:border-amber-500 hover:text-amber-300'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-amber-600 hover:text-amber-900'
                }`}
              >
                <span>Study Module {item.chapterNumber}</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className={`p-8 text-center rounded-xl border text-sm font-sans ${
            isDark ? 'border-stone-800 text-stone-400' : 'border-stone-200 text-stone-500'
          }`}>
            No leak typologies matched your search query. Try broadening your terms.
          </div>
        )}
      </div>
    </div>
  );
};
