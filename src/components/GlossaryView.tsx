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
      <section className={`border rounded-xl p-6 sm:p-8 relative overflow-hidden shadow-book ${
        isDark
          ? 'border-stone-800 bg-stone-900/80 text-stone-100'
          : 'border-stone-200 bg-white text-stone-900'
      }`}>
        <div className="flex items-center gap-3.5 mb-2">
          <div className={`p-2.5 rounded-lg border ${
            isDark ? 'bg-amber-950/60 text-amber-400 border-amber-800/60' : 'bg-amber-100 text-amber-900 border-amber-300'
          }`}>
            <BookMarked className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
              Academic & Operational Lexicon
            </h1>
            <p className="text-xs sm:text-sm font-mono text-amber-800 dark:text-amber-400 mt-0.5">
              Part IV Reference Guide • 22 Core Psychological & Linguistic Definitions
            </p>
          </div>
        </div>

        <p className={`text-sm sm:text-base font-sans leading-relaxed mt-3 ${
          isDark ? 'text-stone-300' : 'text-stone-600'
        }`}>
          A rigorous dictionary defining the technical terms, behavioral concepts, and ethical frameworks established across the 19 curriculum modules.
        </p>
      </section>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between text-xs font-mono">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search lexicon term or definition..."
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
          {[
            { id: 'all', label: 'All Terms' },
            { id: 'core', label: 'Core Theory' },
            { id: 'leak-type', label: 'Leak Typologies' },
            { id: 'framework', label: 'Cognitive Frameworks' },
            { id: 'ethics', label: 'Ethical Restraint' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setCategory(tab.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                category === tab.id
                  ? isDark
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                    : 'bg-white text-stone-900 font-bold shadow-xs'
                  : isDark
                    ? 'text-stone-400 hover:text-stone-200'
                    : 'text-stone-600 hover:text-stone-900'
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
            className={`p-5 sm:p-6 rounded-xl border transition-all shadow-book ${
              isDark
                ? 'bg-stone-900/60 border-stone-800 hover:border-stone-700'
                : 'bg-white border-stone-200 hover:border-stone-300'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-100">
                    {item.term}
                  </h3>
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-800 dark:text-amber-400 font-semibold">
                    / {item.category}
                  </span>
                </div>

                <p className="text-sm sm:text-base font-sans text-stone-700 dark:text-stone-300 leading-relaxed">
                  {item.definition}
                </p>

                {item.chapters && item.chapters.length > 0 && (
                  <div className="flex items-center flex-wrap gap-2 pt-1 text-xs font-mono text-stone-500 dark:text-stone-400">
                    <span>Referenced in:</span>
                    {item.chapters.map(chNum => (
                      <button
                        key={chNum}
                        onClick={() => onNavigateChapter(`ch${chNum}`)}
                        className={`px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                          isDark
                            ? 'bg-stone-800 border-stone-700 text-stone-300 hover:text-amber-400 hover:border-amber-500'
                            : 'bg-stone-100 border-stone-200 text-stone-700 hover:text-amber-800 hover:border-amber-600'
                        }`}
                      >
                        Module {chNum}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {item.chapters && item.chapters.length > 0 && (
                <button
                  onClick={() => onNavigateChapter(`ch${item.chapters[0]}`)}
                  className={`self-start sm:self-center px-3 py-1.5 rounded-lg text-xs font-sans font-medium border flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer ${
                    isDark
                      ? 'bg-stone-800 text-stone-300 border-stone-700 hover:border-amber-500 hover:text-amber-300'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-amber-600 hover:text-amber-900'
                  }`}
                >
                  <span>Open Primary Module</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                </button>
              )}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className={`p-8 text-center rounded-xl border text-sm font-sans ${
            isDark ? 'border-stone-800 text-stone-400' : 'border-stone-200 text-stone-500'
          }`}>
            No lexicon terms matched your search query.
          </div>
        )}
      </div>
    </div>
  );
};
