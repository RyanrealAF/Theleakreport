import React, { useState, useEffect, useMemo } from 'react';
import { CHAPTERS } from './data/chapters';
import { ChapterView } from './components/ChapterView';
import { OperativesCodeView } from './components/OperativesCodeView';
import { LeakLogView } from './components/LeakLogView';
import { CheatSheetView } from './components/CheatSheetView';
import { GlossaryView } from './components/GlossaryView';
import { DrillSimulatorView } from './components/DrillSimulatorView';
import { ClosingTransmissionView } from './components/ClosingTransmissionView';
import { AcousticSchematicView } from './components/AcousticSchematicView';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import {
  BookOpen,
  Scale,
  FileSpreadsheet,
  Table,
  BookMarked,
  Zap,
  Menu,
  X,
  Search,
  Activity,
  GraduationCap,
  Sun,
  Moon,
  ChevronRight
} from 'lucide-react';

type NavTab =
  | 'chapter'
  | 'operatives-code'
  | 'acoustic-schematic'
  | 'drill-simulator'
  | 'leak-log'
  | 'cheat-sheet'
  | 'glossary'
  | 'closing-transmission';

function AppContent() {
  const { isDark, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<NavTab>('chapter');
  const [currentChapterId, setCurrentChapterId] = useState<string>('ch1');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [chapterSearch, setChapterSearch] = useState<string>('');
  const [completedStepsCount, setCompletedStepsCount] = useState<number>(0);

  // Total steps in the book
  const totalStepsInBook = useMemo(() => {
    return CHAPTERS.reduce((acc, ch) => acc + ch.action_steps.length, 0);
  }, []);

  // Update completed count from localStorage
  const refreshProgress = () => {
    try {
      const saved = localStorage.getItem('leak-report-drilled-steps');
      if (saved) {
        const parsed = JSON.parse(saved);
        const count = Object.values(parsed).filter(Boolean).length;
        setCompletedStepsCount(count);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    refreshProgress();
    const handleStorage = () => refreshProgress();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [currentChapterId, activeTab]);

  const currentChapter = useMemo(() => {
    return CHAPTERS.find(c => c.id === currentChapterId) || CHAPTERS[0];
  }, [currentChapterId]);

  const handleNavigateChapter = (chapId: string) => {
    if (chapId === 'back-matter') {
      setActiveTab('cheat-sheet');
    } else {
      setCurrentChapterId(chapId);
      setActiveTab('chapter');
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(refreshProgress, 100);
  };

  const filteredChapters = useMemo(() => {
    if (!chapterSearch.trim()) return CHAPTERS;
    const q = chapterSearch.toLowerCase();
    return CHAPTERS.filter(c =>
      c.title.toLowerCase().includes(q) ||
      `module ${c.number}`.includes(q) ||
      `chapter ${c.number}`.includes(q) ||
      c.intel_brief.hook_line.toLowerCase().includes(q)
    );
  }, [chapterSearch]);

  const progressPercent = Math.round((completedStepsCount / totalStepsInBook) * 100);

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 bg-editorial-paper ${
      isDark ? 'text-stone-100' : 'text-stone-900'
    }`}>
      {/* Top Academic Header Bar */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md px-4 sm:px-6 py-3 transition-colors ${
        isDark
          ? 'bg-stone-900/90 border-stone-800 text-stone-100'
          : 'bg-white/95 border-stone-200 text-stone-900 shadow-xs'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-stone-800 border-stone-700 text-stone-200 hover:text-white'
                  : 'bg-stone-100 border-stone-300 text-stone-700 hover:text-stone-900'
              }`}
              aria-label="Toggle curriculum navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => { setActiveTab('chapter'); setCurrentChapterId('ch1'); }}
            >
              <div className={`p-2 rounded-lg border hidden sm:flex items-center justify-center transition-colors ${
                isDark
                  ? 'bg-amber-950/60 border-amber-800/60 text-amber-400 group-hover:border-amber-600'
                  : 'bg-amber-100 border-amber-300 text-amber-900 group-hover:border-amber-400'
              }`}>
                <GraduationCap className="w-5 h-5" />
              </div>

              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif font-bold text-lg sm:text-xl tracking-tight text-stone-900 dark:text-stone-100">
                    The Leak Report
                  </span>
                  <span className="text-xs font-mono font-medium text-amber-800 dark:text-amber-400">
                    / Educational Field Manual
                  </span>
                </div>
                <p className="text-xs font-sans text-stone-500 dark:text-stone-400 hidden sm:block">
                  An Applied Study Guide to Auditory Perception, Subtext Friction & Ethical Restraint
                </p>
              </div>
            </div>
          </div>

          {/* Header Controls: Progress & Light/Dark Theme Switch */}
          <div className="flex items-center gap-3 text-xs font-mono">
            <div className={`hidden md:flex items-center gap-3 px-3.5 py-1.5 rounded-lg border ${
              isDark ? 'bg-stone-950/80 border-stone-800 text-stone-300' : 'bg-stone-50 border-stone-200 text-stone-700'
            }`}>
              <span className="text-stone-400 dark:text-stone-500 uppercase tracking-wider text-[11px]">Curriculum Drills:</span>
              <div className="w-24 h-2 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-600 dark:bg-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="font-bold text-amber-700 dark:text-amber-400">
                {completedStepsCount}/{totalStepsInBook} ({progressPercent}%)
              </span>
            </div>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg border flex items-center gap-1.5 transition-colors cursor-pointer ${
                isDark
                  ? 'bg-stone-800 text-amber-300 border-stone-700 hover:bg-stone-700'
                  : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
              }`}
              title={isDark ? 'Switch to Light Reading Paper' : 'Switch to Nocturnal Study Dark'}
              aria-label="Toggle theme mode"
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline text-xs font-medium font-sans">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-stone-600" />
                  <span className="hidden sm:inline text-xs font-medium font-sans">Dark</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Grid: Sidebar Curriculum Navigation + Center Workspace */}
      <div className="flex-1 max-w-7xl mx-auto w-full flex">
        {/* Left Sidebar Navigation */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-30 w-72 sm:w-80 border-r flex flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
            isDark ? 'bg-stone-900/95 border-stone-800' : 'bg-white/95 border-stone-200'
          } ${
            mobileMenuOpen ? 'translate-x-0 top-[60px]' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Quick Curriculum Search */}
          <div className={`p-3 border-b ${isDark ? 'border-stone-800' : 'border-stone-200'}`}>
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search modules or concepts..."
                value={chapterSearch}
                onChange={e => setChapterSearch(e.target.value)}
                className={`w-full rounded-lg pl-9 pr-3 py-1.5 text-xs font-sans border focus:outline-none transition-colors ${
                  isDark
                    ? 'bg-stone-950 border-stone-800 text-stone-100 placeholder-stone-500 focus:border-amber-500'
                    : 'bg-stone-50 border-stone-300 text-stone-900 placeholder-stone-400 focus:border-amber-600'
                }`}
              />
            </div>
          </div>

          {/* Navigation Links Scrollable Body */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-4 text-xs font-mono">
            {/* Core Study Centers */}
            <div className="space-y-1">
              <div className="text-[10px] uppercase font-bold text-stone-400 dark:text-stone-500 px-2 pb-1 tracking-wider">
                CORE STUDY HUBS
              </div>

              <button
                onClick={() => { setActiveTab('operatives-code'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                  activeTab === 'operatives-code'
                    ? isDark
                      ? 'bg-amber-950/60 text-amber-300 border border-amber-800 font-semibold'
                      : 'bg-amber-100/80 text-amber-950 border border-amber-300 font-semibold'
                    : isDark
                      ? 'text-stone-300 hover:bg-stone-800/80'
                      : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span className="font-sans font-medium text-xs">The Practitioner's Code</span>
                </div>
                <span className="text-[10px] font-mono text-stone-400 dark:text-stone-500">
                  19 Chs
                </span>
              </button>

              <button
                onClick={() => { setActiveTab('acoustic-schematic'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                  activeTab === 'acoustic-schematic'
                    ? isDark
                      ? 'bg-amber-950/60 text-amber-300 border border-amber-800 font-semibold'
                      : 'bg-amber-100/80 text-amber-950 border border-amber-300 font-semibold'
                    : isDark
                      ? 'text-stone-300 hover:bg-stone-800/80'
                      : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span className="font-sans font-medium text-xs">Perceptual Schematic</span>
                </div>
                <span className="text-[10px] font-mono text-stone-400 dark:text-stone-500">
                  Fig 1.0
                </span>
              </button>

              <button
                onClick={() => { setActiveTab('drill-simulator'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                  activeTab === 'drill-simulator'
                    ? isDark
                      ? 'bg-amber-950/60 text-amber-300 border border-amber-800 font-semibold'
                      : 'bg-amber-100/80 text-amber-950 border border-amber-300 font-semibold'
                    : isDark
                      ? 'text-stone-300 hover:bg-stone-800/80'
                      : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span className="font-sans font-medium text-xs">Diagnostic Simulation Lab</span>
                </div>
                <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400">
                  Interactive
                </span>
              </button>
            </div>

            {/* Part IV Reference Suite */}
            <div className={`space-y-1 pt-3 border-t ${isDark ? 'border-stone-800' : 'border-stone-200'}`}>
              <div className="text-[10px] uppercase font-bold text-stone-400 dark:text-stone-500 px-2 pb-1 tracking-wider">
                PART IV: REFERENCE SUITE
              </div>

              <button
                onClick={() => { setActiveTab('leak-log'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                  activeTab === 'leak-log'
                    ? isDark
                      ? 'bg-amber-950/60 text-amber-300 border border-amber-800 font-semibold'
                      : 'bg-amber-100/80 text-amber-950 border border-amber-300 font-semibold'
                    : isDark
                      ? 'text-stone-300 hover:bg-stone-800/80'
                      : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span className="font-sans font-medium text-xs">Field Dossier (Debrief Log)</span>
                </div>
              </button>

              <button
                onClick={() => { setActiveTab('cheat-sheet'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                  activeTab === 'cheat-sheet'
                    ? isDark
                      ? 'bg-amber-950/60 text-amber-300 border border-amber-800 font-semibold'
                      : 'bg-amber-100/80 text-amber-950 border border-amber-300 font-semibold'
                    : isDark
                      ? 'text-stone-300 hover:bg-stone-800/80'
                      : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Table className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span className="font-sans font-medium text-xs">Taxonomy Reference Matrix</span>
                </div>
              </button>

              <button
                onClick={() => { setActiveTab('glossary'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                  activeTab === 'glossary'
                    ? isDark
                      ? 'bg-amber-950/60 text-amber-300 border border-amber-800 font-semibold'
                      : 'bg-amber-100/80 text-amber-950 border border-amber-300 font-semibold'
                    : isDark
                      ? 'text-stone-300 hover:bg-stone-800/80'
                      : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <BookMarked className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span className="font-sans font-medium text-xs">Academic Lexicon</span>
                </div>
                <span className="text-[10px] font-mono text-stone-400 dark:text-stone-500">
                  22 Terms
                </span>
              </button>

              <button
                onClick={() => { setActiveTab('closing-transmission'); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                  activeTab === 'closing-transmission'
                    ? isDark
                      ? 'bg-amber-950/60 text-amber-300 border border-amber-800 font-semibold'
                      : 'bg-amber-100/80 text-amber-950 border border-amber-300 font-semibold'
                    : isDark
                      ? 'text-stone-300 hover:bg-stone-800/80'
                      : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span className="font-sans font-medium text-xs">Valedictory Synthesis</span>
                </div>
              </button>
            </div>

            {/* Chapters List (Grouped by Part I, II, III) */}
            <div className={`space-y-3 pt-3 border-t ${isDark ? 'border-stone-800' : 'border-stone-200'}`}>
              <div className="text-[10px] uppercase font-bold text-stone-400 dark:text-stone-500 px-2 tracking-wider flex items-center justify-between">
                <span>CURRICULUM MODULES</span>
                <span>19</span>
              </div>

              {/* Group Part I */}
              <div className="space-y-0.5">
                <div className="text-[10px] font-bold text-amber-800 dark:text-amber-400 px-2 py-0.5 uppercase tracking-wider">
                  Part I — Foundations
                </div>
                {filteredChapters.filter(c => c.part.includes('Part I')).map(c => {
                  const isSelected = activeTab === 'chapter' && currentChapterId === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => handleNavigateChapter(c.id)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-md transition-colors text-xs flex items-center justify-between font-sans cursor-pointer ${
                        isSelected
                          ? isDark
                            ? 'bg-stone-800 text-white font-semibold border-l-2 border-amber-400'
                            : 'bg-amber-50 text-stone-900 font-semibold border-l-2 border-amber-600'
                          : isDark
                            ? 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
                            : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                      }`}
                    >
                      <span className="truncate pr-1">
                        {c.number}. {c.title}
                      </span>
                      {c.number === 5 && (
                        <Scale className="w-3 h-3 text-amber-600 dark:text-amber-400 shrink-0" title="Ethical Code" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Group Part II */}
              <div className="space-y-0.5 pt-1.5">
                <div className="text-[10px] font-bold text-amber-800 dark:text-amber-400 px-2 py-0.5 uppercase tracking-wider">
                  Part II — Interpersonal Typologies
                </div>
                {filteredChapters.filter(c => c.part.includes('Part II')).map(c => {
                  const isSelected = activeTab === 'chapter' && currentChapterId === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => handleNavigateChapter(c.id)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-md transition-colors text-xs flex items-center justify-between font-sans cursor-pointer ${
                        isSelected
                          ? isDark
                            ? 'bg-stone-800 text-white font-semibold border-l-2 border-amber-400'
                            : 'bg-amber-50 text-stone-900 font-semibold border-l-2 border-amber-600'
                          : isDark
                            ? 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
                            : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                      }`}
                    >
                      <span className="truncate pr-1">
                        {c.number}. {c.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Group Part III */}
              <div className="space-y-0.5 pt-1.5">
                <div className="text-[10px] font-bold text-amber-800 dark:text-amber-400 px-2 py-0.5 uppercase tracking-wider">
                  Part III — Synthesis & Containment
                </div>
                {filteredChapters.filter(c => c.part.includes('Part III')).map(c => {
                  const isSelected = activeTab === 'chapter' && currentChapterId === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => handleNavigateChapter(c.id)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-md transition-colors text-xs flex items-center justify-between font-sans cursor-pointer ${
                        isSelected
                          ? isDark
                            ? 'bg-stone-800 text-white font-semibold border-l-2 border-amber-400'
                            : 'bg-amber-50 text-stone-900 font-semibold border-l-2 border-amber-600'
                          : isDark
                            ? 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
                            : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                      }`}
                    >
                      <span className="truncate pr-1">
                        {c.number}. {c.title}
                      </span>
                      {c.number === 19 && (
                        <Scale className="w-3 h-3 text-amber-600 dark:text-amber-400 shrink-0" title="The Ultimate Test" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* Bottom Footer in Nav */}
          <div className={`p-3 border-t text-[11px] font-mono flex items-center justify-between ${
            isDark ? 'border-stone-800 text-stone-400 bg-stone-950/60' : 'border-stone-200 text-stone-500 bg-stone-50'
          }`}>
            <span>CURRICULUM ARCHIVE</span>
            <span className="text-amber-700 dark:text-amber-400 font-semibold">19 MODULES</span>
          </div>
        </aside>

        {/* Backdrop for mobile menu */}
        {mobileMenuOpen && (
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-20 lg:hidden"
          />
        )}

        {/* Center Workspace Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {activeTab === 'chapter' && (
            <ChapterView
              chapter={currentChapter}
              onNavigateChapter={handleNavigateChapter}
            />
          )}

          {activeTab === 'operatives-code' && (
            <OperativesCodeView
              chapters={CHAPTERS}
              onNavigateChapter={handleNavigateChapter}
            />
          )}

          {activeTab === 'acoustic-schematic' && (
            <AcousticSchematicView />
          )}

          {activeTab === 'drill-simulator' && (
            <DrillSimulatorView />
          )}

          {activeTab === 'leak-log' && (
            <LeakLogView />
          )}

          {activeTab === 'cheat-sheet' && (
            <CheatSheetView
              onNavigateChapter={handleNavigateChapter}
            />
          )}

          {activeTab === 'glossary' && (
            <GlossaryView
              onNavigateChapter={handleNavigateChapter}
            />
          )}

          {activeTab === 'closing-transmission' && (
            <ClosingTransmissionView
              onReturnToManual={() => { setActiveTab('chapter'); }}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
