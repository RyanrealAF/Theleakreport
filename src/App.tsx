/**
 * Build While Bleeding — Master Application Shell
 * buildwhilebleeding.com
 * Core application navigation, module routing, progress tracking, and BWB brand architecture
 */

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
  ShieldAlert,
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
      console.error('[BWB] Storage sync error:', e);
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
    <div className={`min-h-[92vh] min-h-[92svh] flex flex-col font-sans transition-colors duration-200 bg-bwb-grid ${
      isDark ? 'bg-[#11100E] text-[#E7E0D4]' : 'bg-[#E7E0D4] text-[#11100E]'
    }`}>
      {/* Top Architectural Header Bar */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md px-4 sm:px-6 py-2.5 transition-colors ${
        isDark
          ? 'bg-[#11100E]/95 border-[#C5A36A]/30 text-[#E7E0D4]'
          : 'bg-[#E7E0D4]/95 border-[#7A5A22]/35 text-[#11100E] shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <a
              href="https://buildwhilebleeding.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22] border border-[#C5A36A]/40 hover:bg-[#C5A36A]/15 transition-colors shrink-0 rounded-none"
              title="Return to Build While Bleeding Brand Portfolio"
            >
              ← BUILD WHILE BLEEDING
            </a>

            {/* Mobile menu button with touch target ≥ 44px */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden touch-target flex items-center justify-center border transition-colors cursor-pointer rounded-none ${
                isDark
                  ? 'bg-[#171513] border-[#B9BDC2]/30 text-[#E7E0D4] hover:border-[#C5A36A]'
                  : 'bg-[#DDD5C7] border-[#7A5A22]/40 text-[#11100E] hover:border-[#11100E]'
              }`}
              aria-label="Toggle curriculum navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Brand Logo & Title */}
            <div
              className="flex items-center space-x-3 cursor-pointer group select-none"
              onClick={() => { setActiveTab('chapter'); setCurrentChapterId('ch1'); }}
            >
              <div className={`w-10 h-10 border hidden sm:flex items-center justify-center transition-colors rounded-none shrink-0 ${
                isDark
                  ? 'bg-[#171513] border-[#C5A36A] text-[#C5A36A] group-hover:bg-[#C5A36A]/10'
                  : 'bg-[#DDD5C7] border-[#7A5A22] text-[#7A5A22] group-hover:bg-[#7A5A22]/10'
              }`}>
                <ShieldAlert className="w-5 h-5 text-[#C2332B]" />
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-black text-xl sm:text-2xl tracking-wider uppercase text-[#E7E0D4] dark:text-[#E7E0D4] light:text-[#11100E]">
                    The Leak Report
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22] uppercase">
                    [TM 31-HEAR-01]
                  </span>
                </div>
                <p className="text-[11px] font-sans tracking-wide text-[#B9BDC2] dark:text-[#B9BDC2] light:text-[#5E5851] hidden sm:block">
                  Applied Auditory Perception, Acoustic Leakage & Strict Ethical Restraint
                </p>
              </div>
            </div>
          </div>

          {/* Header Controls: Progress Meter & High Contrast Light/Dark Theme Switch */}
          <div className="flex items-center gap-3 text-xs font-mono">
            {/* Progress Meter */}
            <div className={`hidden md:flex items-center gap-3 px-3 py-2 border rounded-none ${
              isDark ? 'bg-[#171513] border-[#B9BDC2]/20 text-[#B9BDC2]' : 'bg-[#DDD5C7] border-[#7A5A22]/30 text-[#11100E]'
            }`}>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22]">
                Drills:
              </span>
              <div className="w-24 h-2 bg-[#11100E] dark:bg-[#11100E] light:bg-[#DDD5C7] border border-[#B9BDC2]/20 overflow-hidden">
                <div
                  className="h-full bg-[#C5A36A] dark:bg-[#C5A36A] light:bg-[#7A5A22] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="font-mono font-bold text-[#E7E0D4] dark:text-[#E7E0D4] light:text-[#11100E]">
                {completedStepsCount}/{totalStepsInBook} ({progressPercent}%)
              </span>
            </div>

            {/* High Contrast Theme Switch with Touch Target ≥ 44px */}
            <button
              onClick={toggleTheme}
              className={`touch-target px-3 py-2 border flex items-center gap-2 transition-colors cursor-pointer rounded-none ${
                isDark
                  ? 'bg-[#171513] text-[#C5A36A] border-[#C5A36A]/50 hover:bg-[#C5A36A]/15 hover:border-[#C5A36A]'
                  : 'bg-[#DDD5C7] text-[#11100E] border-[#7A5A22] hover:bg-[#7A5A22]/20'
              }`}
              title={isDark ? 'Switch to Bone Light Theme' : 'Switch to Asphalt Dark Theme'}
              aria-label="Toggle visual theme mode"
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-[#C5A36A]" />
                  <span className="hidden sm:inline text-xs font-mono font-bold uppercase tracking-wider text-[#E7E0D4]">BONE</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-[#11100E]" />
                  <span className="hidden sm:inline text-xs font-mono font-bold uppercase tracking-wider text-[#11100E]">ASPHALT</span>
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
          className={`fixed lg:static inset-y-0 left-0 z-30 w-72 sm:w-80 border-r flex flex-col transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
            isDark ? 'bg-[#11100E] border-[#B9BDC2]/20' : 'bg-[#DDD5C7] border-[#7A5A22]/30'
          } ${
            mobileMenuOpen ? 'translate-x-0 top-[57px]' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Quick Curriculum Search */}
          <div className={`p-3 border-b ${isDark ? 'border-[#B9BDC2]/20' : 'border-[#7A5A22]/30'}`}>
            <div className="relative">
              <Search className="w-4 h-4 text-[#B9BDC2] absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search modules, tells, concepts..."
                value={chapterSearch}
                onChange={e => setChapterSearch(e.target.value)}
                className={`w-full touch-target pl-9 pr-3 py-2 text-xs font-sans border rounded-none focus:outline-none transition-colors ${
                  isDark
                    ? 'bg-[#171513] border-[#B9BDC2]/30 text-[#E7E0D4] placeholder-[#8E8A83] focus:border-[#C5A36A]'
                    : 'bg-[#F2ECE1] border-[#7A5A22]/40 text-[#11100E] placeholder-[#5E5851] focus:border-[#7A5A22]'
                }`}
              />
            </div>
          </div>

          {/* Navigation Links Scrollable Body */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-4 text-xs font-mono">
            {/* Core Study Centers */}
            <div className="space-y-1">
              <div className="text-[10px] font-display font-bold text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22] px-2 pb-1 tracking-widest uppercase">
                CORE INTELLIGENCE CENTERS
              </div>

              <button
                onClick={() => { setActiveTab('operatives-code'); setMobileMenuOpen(false); }}
                className={`w-full touch-target text-left px-3 py-2 border rounded-none flex items-center justify-between transition-colors cursor-pointer ${
                  activeTab === 'operatives-code'
                    ? isDark
                      ? 'bg-[#C5A36A]/15 text-[#E7E0D4] border-[#C5A36A] font-bold'
                      : 'bg-[#7A5A22]/20 text-[#11100E] border-[#7A5A22] font-bold'
                    : isDark
                      ? 'border-transparent text-[#B9BDC2] hover:bg-[#171513] hover:text-[#E7E0D4]'
                      : 'border-transparent text-[#302C28] hover:bg-[#E5DEC0] hover:text-[#11100E]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Scale className="w-4 h-4 text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22] shrink-0" />
                  <span className="font-sans font-medium text-xs">The Practitioner's Code</span>
                </div>
                <span className="text-[10px] font-mono text-[#8E8A83]">
                  19 Chs
                </span>
              </button>

              <button
                onClick={() => { setActiveTab('acoustic-schematic'); setMobileMenuOpen(false); }}
                className={`w-full touch-target text-left px-3 py-2 border rounded-none flex items-center justify-between transition-colors cursor-pointer ${
                  activeTab === 'acoustic-schematic'
                    ? isDark
                      ? 'bg-[#C5A36A]/15 text-[#E7E0D4] border-[#C5A36A] font-bold'
                      : 'bg-[#7A5A22]/20 text-[#11100E] border-[#7A5A22] font-bold'
                    : isDark
                      ? 'border-transparent text-[#B9BDC2] hover:bg-[#171513] hover:text-[#E7E0D4]'
                      : 'border-transparent text-[#302C28] hover:bg-[#E5DEC0] hover:text-[#11100E]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Activity className="w-4 h-4 text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22] shrink-0" />
                  <span className="font-sans font-medium text-xs">Perceptual Schematic</span>
                </div>
                <span className="text-[10px] font-mono text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22] font-bold">
                  Fig 1.0
                </span>
              </button>

              <button
                onClick={() => { setActiveTab('drill-simulator'); setMobileMenuOpen(false); }}
                className={`w-full touch-target text-left px-3 py-2 border rounded-none flex items-center justify-between transition-colors cursor-pointer ${
                  activeTab === 'drill-simulator'
                    ? isDark
                      ? 'bg-[#C5A36A]/15 text-[#E7E0D4] border-[#C5A36A] font-bold'
                      : 'bg-[#7A5A22]/20 text-[#11100E] border-[#7A5A22] font-bold'
                    : isDark
                      ? 'border-transparent text-[#B9BDC2] hover:bg-[#171513] hover:text-[#E7E0D4]'
                      : 'border-transparent text-[#302C28] hover:bg-[#E5DEC0] hover:text-[#11100E]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Zap className="w-4 h-4 text-[#C2332B] shrink-0" />
                  <span className="font-sans font-medium text-xs">Diagnostic Simulator Lab</span>
                </div>
                <span className="text-[10px] font-mono text-[#C2332B] font-bold">
                  LIVE
                </span>
              </button>
            </div>

            {/* Reference Suite */}
            <div className={`space-y-1 pt-3 border-t ${isDark ? 'border-[#B9BDC2]/20' : 'border-[#7A5A22]/30'}`}>
              <div className="text-[10px] font-display font-bold text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22] px-2 pb-1 tracking-widest uppercase">
                REFERENCE ARCHIVES
              </div>

              <button
                onClick={() => { setActiveTab('leak-log'); setMobileMenuOpen(false); }}
                className={`w-full touch-target text-left px-3 py-2 border rounded-none flex items-center justify-between transition-colors cursor-pointer ${
                  activeTab === 'leak-log'
                    ? isDark
                      ? 'bg-[#C5A36A]/15 text-[#E7E0D4] border-[#C5A36A] font-bold'
                      : 'bg-[#7A5A22]/20 text-[#11100E] border-[#7A5A22] font-bold'
                    : isDark
                      ? 'border-transparent text-[#B9BDC2] hover:bg-[#171513] hover:text-[#E7E0D4]'
                      : 'border-transparent text-[#302C28] hover:bg-[#E5DEC0] hover:text-[#11100E]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileSpreadsheet className="w-4 h-4 text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22] shrink-0" />
                  <span className="font-sans font-medium text-xs">Field Dossier (Debrief Log)</span>
                </div>
              </button>

              <button
                onClick={() => { setActiveTab('cheat-sheet'); setMobileMenuOpen(false); }}
                className={`w-full touch-target text-left px-3 py-2 border rounded-none flex items-center justify-between transition-colors cursor-pointer ${
                  activeTab === 'cheat-sheet'
                    ? isDark
                      ? 'bg-[#C5A36A]/15 text-[#E7E0D4] border-[#C5A36A] font-bold'
                      : 'bg-[#7A5A22]/20 text-[#11100E] border-[#7A5A22] font-bold'
                    : isDark
                      ? 'border-transparent text-[#B9BDC2] hover:bg-[#171513] hover:text-[#E7E0D4]'
                      : 'border-transparent text-[#302C28] hover:bg-[#E5DEC0] hover:text-[#11100E]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Table className="w-4 h-4 text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22] shrink-0" />
                  <span className="font-sans font-medium text-xs">Taxonomy Matrix</span>
                </div>
              </button>

              <button
                onClick={() => { setActiveTab('glossary'); setMobileMenuOpen(false); }}
                className={`w-full touch-target text-left px-3 py-2 border rounded-none flex items-center justify-between transition-colors cursor-pointer ${
                  activeTab === 'glossary'
                    ? isDark
                      ? 'bg-[#C5A36A]/15 text-[#E7E0D4] border-[#C5A36A] font-bold'
                      : 'bg-[#7A5A22]/20 text-[#11100E] border-[#7A5A22] font-bold'
                    : isDark
                      ? 'border-transparent text-[#B9BDC2] hover:bg-[#171513] hover:text-[#E7E0D4]'
                      : 'border-transparent text-[#302C28] hover:bg-[#E5DEC0] hover:text-[#11100E]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <BookMarked className="w-4 h-4 text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22] shrink-0" />
                  <span className="font-sans font-medium text-xs">Academic Lexicon</span>
                </div>
                <span className="text-[10px] font-mono text-[#8E8A83]">
                  22 Terms
                </span>
              </button>

              <button
                onClick={() => { setActiveTab('closing-transmission'); setMobileMenuOpen(false); }}
                className={`w-full touch-target text-left px-3 py-2 border rounded-none flex items-center justify-between transition-colors cursor-pointer ${
                  activeTab === 'closing-transmission'
                    ? isDark
                      ? 'bg-[#C5A36A]/15 text-[#E7E0D4] border-[#C5A36A] font-bold'
                      : 'bg-[#7A5A22]/20 text-[#11100E] border-[#7A5A22] font-bold'
                    : isDark
                      ? 'border-transparent text-[#B9BDC2] hover:bg-[#171513] hover:text-[#E7E0D4]'
                      : 'border-transparent text-[#302C28] hover:bg-[#E5DEC0] hover:text-[#11100E]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="w-4 h-4 text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22] shrink-0" />
                  <span className="font-sans font-medium text-xs">Valedictory Synthesis</span>
                </div>
              </button>
            </div>

            {/* Chapters List (Grouped by Part I, II, III) */}
            <div className={`space-y-3 pt-3 border-t ${isDark ? 'border-[#B9BDC2]/20' : 'border-[#7A5A22]/30'}`}>
              <div className="text-[10px] font-display font-bold text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22] px-2 tracking-widest flex items-center justify-between uppercase">
                <span>CURRICULUM MODULES</span>
                <span>[19]</span>
              </div>

              {/* Group Part I */}
              <div className="space-y-0.5">
                <div className="text-[10px] font-mono font-bold text-[#8E8A83] px-2 py-0.5 uppercase tracking-wider">
                  PART I — FOUNDATIONS
                </div>
                {filteredChapters.filter(c => c.part.includes('Part I')).map(c => {
                  const isSelected = activeTab === 'chapter' && currentChapterId === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => handleNavigateChapter(c.id)}
                      className={`w-full text-left px-2.5 py-2 border-l-2 transition-colors text-xs flex items-center justify-between font-sans cursor-pointer rounded-none min-h-[38px] ${
                        isSelected
                          ? isDark
                            ? 'bg-[#171513] text-[#E7E0D4] font-bold border-[#C5A36A]'
                            : 'bg-[#F2ECE1] text-[#11100E] font-bold border-[#7A5A22]'
                          : isDark
                            ? 'border-transparent text-[#B9BDC2] hover:text-[#E7E0D4] hover:bg-[#171513]/70'
                            : 'border-transparent text-[#302C28] hover:text-[#11100E] hover:bg-[#E5DEC0]/70'
                      }`}
                    >
                      <span className="truncate pr-1">
                        {String(c.number).padStart(2, '0')}. {c.title}
                      </span>
                      {c.number === 5 && (
                        <Scale className="w-3 h-3 text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22] shrink-0" title="Ethical Code" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Group Part II */}
              <div className="space-y-0.5 pt-1.5">
                <div className="text-[10px] font-mono font-bold text-[#8E8A83] px-2 py-0.5 uppercase tracking-wider">
                  PART II — INTERPERSONAL TYPOLOGIES
                </div>
                {filteredChapters.filter(c => c.part.includes('Part II')).map(c => {
                  const isSelected = activeTab === 'chapter' && currentChapterId === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => handleNavigateChapter(c.id)}
                      className={`w-full text-left px-2.5 py-2 border-l-2 transition-colors text-xs flex items-center justify-between font-sans cursor-pointer rounded-none min-h-[38px] ${
                        isSelected
                          ? isDark
                            ? 'bg-[#171513] text-[#E7E0D4] font-bold border-[#C5A36A]'
                            : 'bg-[#F2ECE1] text-[#11100E] font-bold border-[#7A5A22]'
                          : isDark
                            ? 'border-transparent text-[#B9BDC2] hover:text-[#E7E0D4] hover:bg-[#171513]/70'
                            : 'border-transparent text-[#302C28] hover:text-[#11100E] hover:bg-[#E5DEC0]/70'
                      }`}
                    >
                      <span className="truncate pr-1">
                        {String(c.number).padStart(2, '0')}. {c.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Group Part III */}
              <div className="space-y-0.5 pt-1.5">
                <div className="text-[10px] font-mono font-bold text-[#8E8A83] px-2 py-0.5 uppercase tracking-wider">
                  PART III — SYNTHESIS & CONTAINMENT
                </div>
                {filteredChapters.filter(c => c.part.includes('Part III')).map(c => {
                  const isSelected = activeTab === 'chapter' && currentChapterId === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => handleNavigateChapter(c.id)}
                      className={`w-full text-left px-2.5 py-2 border-l-2 transition-colors text-xs flex items-center justify-between font-sans cursor-pointer rounded-none min-h-[38px] ${
                        isSelected
                          ? isDark
                            ? 'bg-[#171513] text-[#E7E0D4] font-bold border-[#C5A36A]'
                            : 'bg-[#F2ECE1] text-[#11100E] font-bold border-[#7A5A22]'
                          : isDark
                            ? 'border-transparent text-[#B9BDC2] hover:text-[#E7E0D4] hover:bg-[#171513]/70'
                            : 'border-transparent text-[#302C28] hover:text-[#11100E] hover:bg-[#E5DEC0]/70'
                      }`}
                    >
                      <span className="truncate pr-1">
                        {String(c.number).padStart(2, '0')}. {c.title}
                      </span>
                      {c.number === 19 && (
                        <Scale className="w-3 h-3 text-[#C2332B] shrink-0" title="The Ultimate Test" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* Bottom Footer in Nav */}
          <div className={`p-3 border-t text-[11px] font-mono flex items-center justify-between ${
            isDark ? 'border-[#B9BDC2]/20 text-[#8E8A83] bg-[#11100E]' : 'border-[#7A5A22]/30 text-[#5E5851] bg-[#DDD5C7]'
          }`}>
            <span className="font-mono text-[10px]">BUILD WHILE BLEEDING</span>
            <span className="text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22] font-bold">19 MODULES</span>
          </div>
        </aside>

        {/* Backdrop for mobile menu */}
        {mobileMenuOpen && (
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs z-20 lg:hidden"
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
