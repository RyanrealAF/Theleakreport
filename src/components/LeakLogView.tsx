/**
 * Build While Bleeding — Leak Log View
 * buildwhilebleeding.com
 * Field dossier debrief logging, observational telemetry, and ethical non-weaponization records
 */

import React, { useState, useEffect } from 'react';
import { DebriefLogEntry } from '../types';
import { useTheme } from '../context/ThemeContext';
import {
  FileSpreadsheet,
  Plus,
  Trash2,
  Download,
  Printer,
  Search,
  Scale,
  ShieldAlert,
  SlidersHorizontal
} from 'lucide-react';

const INITIAL_SAMPLES: DebriefLogEntry[] = [
  {
    id: 'log-001',
    date: '2026-03-08',
    approxTime: '14:20',
    setting: 'work',
    involved: 'Department VP & Senior Lead',
    priorDiscussion: 'Q2 staffing budget and client retention metrics',
    verbatimPhrase: "'Look, absolutely not, I've got total confidence, nobody is — there's zero reason for anyone on my floor to be sweating right now.'",
    leakType: 'overcorrection',
    physicalOrDigitalTell: 'Stacked three denials without blinking, held pen rigidly',
    subjectOrbited: 'Impending Q2 corporate layoffs',
    strainOrStrategy: 'strain',
    firstInstinctRead: "The budget cut is already signed; they are wrestling with the spreadsheet in their head.",
    actionTaken: 'None — logged only. Updated personal resume in quiet. No gossip spread.'
  },
  {
    id: 'log-002',
    date: '2026-03-11',
    approxTime: '21:15',
    setting: 'friend group',
    involved: 'Childhood friend at celebration dinner',
    priorDiscussion: 'New company announcement and client milestones',
    verbatimPhrase: "'Honestly, that's wild! You're doing so much better than anyone in our old block expected you to.'",
    leakType: 'backhanded compliment',
    physicalOrDigitalTell: 'High smile that did not reach the eyes, quick sip of drink immediately after',
    subjectOrbited: "Old peer status hierarchy and lingering discomfort with upward mobility",
    strainOrStrategy: 'strategy',
    firstInstinctRead: "A preset ceiling wearing a celebratory toast. Logged the prior assumption.",
    actionTaken: "Smiled, thanked them, and let their ceiling remain their personal problem. No retaliation."
  }
];

export const LeakLogView: React.FC = () => {
  const { isDark } = useTheme();
  const [entries, setEntries] = useState<DebriefLogEntry[]>([]);
  const [filterSetting, setFilterSetting] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showForm, setShowForm] = useState<boolean>(false);

  // New entry form state
  const [newEntry, setNewEntry] = useState<Partial<DebriefLogEntry>>({
    date: new Date().toISOString().split('T')[0],
    approxTime: new Date().toTimeString().slice(0, 5),
    setting: 'work',
    involved: '',
    priorDiscussion: '',
    verbatimPhrase: '',
    leakType: 'micro-confession',
    physicalOrDigitalTell: '',
    subjectOrbited: '',
    strainOrStrategy: 'strain',
    firstInstinctRead: '',
    actionTaken: '',
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('leak-report-debrief-logs');
      if (saved) {
        setEntries(JSON.parse(saved));
      } else {
        setEntries(INITIAL_SAMPLES);
        localStorage.setItem('leak-report-debrief-logs', JSON.stringify(INITIAL_SAMPLES));
      }
    } catch (e) {
      console.error('[BWB] Storage load failed:', e);
    }
  }, []);

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.verbatimPhrase?.trim()) return;

    const entryToSave: DebriefLogEntry = {
      id: `log-${Date.now()}`,
      date: newEntry.date || new Date().toISOString().split('T')[0],
      approxTime: newEntry.approxTime || '12:00',
      setting: (newEntry.setting as any) || 'other',
      involved: newEntry.involved || 'Unspecified Party',
      priorDiscussion: newEntry.priorDiscussion || 'N/A',
      verbatimPhrase: newEntry.verbatimPhrase || '',
      leakType: newEntry.leakType || 'observation',
      physicalOrDigitalTell: newEntry.physicalOrDigitalTell || 'None documented',
      subjectOrbited: newEntry.subjectOrbited || 'Unspoken Topic',
      strainOrStrategy: (newEntry.strainOrStrategy as any) || 'strain',
      firstInstinctRead: newEntry.firstInstinctRead || 'N/A',
      actionTaken: newEntry.actionTaken || 'Observed silently. No retaliation.',
    };

    const updated = [entryToSave, ...entries];
    setEntries(updated);
    try {
      localStorage.setItem('leak-report-debrief-logs', JSON.stringify(updated));
    } catch (err) {
      console.error('[BWB] Storage save error:', err);
    }

    setShowForm(false);
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      approxTime: new Date().toTimeString().slice(0, 5),
      setting: 'work',
      involved: '',
      priorDiscussion: '',
      verbatimPhrase: '',
      leakType: 'micro-confession',
      physicalOrDigitalTell: '',
      subjectOrbited: '',
      strainOrStrategy: 'strain',
      firstInstinctRead: '',
      actionTaken: '',
    });
  };

  const handleDeleteEntry = (id: string) => {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    try {
      localStorage.setItem('leak-report-debrief-logs', JSON.stringify(updated));
    } catch (err) {
      console.error('[BWB] Storage delete error:', err);
    }
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(entries, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `bwb-debrief-dossier-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const filteredEntries = entries.filter(entry => {
    if (filterSetting !== 'all' && entry.setting !== filterSetting) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        entry.verbatimPhrase.toLowerCase().includes(q) ||
        entry.leakType.toLowerCase().includes(q) ||
        entry.involved.toLowerCase().includes(q) ||
        entry.firstInstinctRead.toLowerCase().includes(q)
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className={`w-12 h-12 border flex items-center justify-center shrink-0 rounded-none ${
              isDark ? 'bg-[#11100E] text-[#C5A36A] border-[#C5A36A]' : 'bg-[#DDD5C7] text-[#7A5A22] border-[#7A5A22]'
            }`}>
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold tracking-widest text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22] uppercase">
                [TM 31-HEAR-01 // FIELD LOG]
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-wide uppercase leading-tight">
                Field Dossier & Debrief Log
              </h1>
              <p className="text-xs sm:text-sm font-mono text-[#8E8A83] mt-0.5">
                Archival Record of Conversational Friction, Physical Tells & Ethical Containment
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowForm(!showForm)}
              className={`touch-target px-4 py-2 border text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer rounded-none ${
                isDark
                  ? 'bg-[#C5A36A] text-[#11100E] border-[#C5A36A] hover:bg-[#C5A36A]/90'
                  : 'bg-[#7A5A22] text-[#E7E0D4] border-[#7A5A22] hover:bg-[#7A5A22]/90'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>{showForm ? 'CANCEL' : 'NEW OBSERVATION'}</span>
            </button>

            <button
              onClick={handleExportJson}
              className={`touch-target px-3 py-2 border text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer rounded-none ${
                isDark
                  ? 'bg-[#11100E] text-[#E7E0D4] border-[#B9BDC2]/30 hover:border-[#C5A36A]'
                  : 'bg-[#DDD5C7] text-[#11100E] border-[#7A5A22]/40 hover:border-[#7A5A22]'
              }`}
              title="Export all observations to JSON"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">EXPORT</span>
            </button>

            <button
              onClick={() => window.print()}
              className={`touch-target px-3 py-2 border text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer rounded-none ${
                isDark
                  ? 'bg-[#11100E] text-[#E7E0D4] border-[#B9BDC2]/30 hover:border-[#C5A36A]'
                  : 'bg-[#DDD5C7] text-[#11100E] border-[#7A5A22]/40 hover:border-[#7A5A22]'
              }`}
              title="Print field dossier"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">PRINT</span>
            </button>
          </div>
        </div>

        <p className={`text-sm sm:text-base font-sans leading-relaxed mt-4 pt-3 border-t ${
          isDark ? 'border-[#B9BDC2]/20 text-[#B9BDC2]' : 'border-[#7A5A22]/25 text-[#302C28]'
        }`}>
          Observational field notes must be logged within two hours of conversational occurrence while auditory recall remains unwarped by narrative rationalization. Maintain strict adherence to Chapter 5: log for personal comprehension, never for retaliatory blackmail.
        </p>
      </section>

      {/* New Entry Formulation Panel */}
      {showForm && (
        <form
          onSubmit={handleSaveEntry}
          className={`border p-6 sm:p-7 space-y-4 rounded-none ${
            isDark ? 'border-[#C5A36A]/50 bg-[#171513]' : 'border-[#7A5A22]/50 bg-[#F2ECE1]'
          }`}
        >
          <div className="flex items-center justify-between border-b pb-3 border-[#B9BDC2]/20 text-xs font-mono">
            <span className="font-bold text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22] uppercase tracking-wider">
              [NEW FIELD OBSERVATION LOG ENTRY]
            </span>
            <span className="text-[#8E8A83]">CONFIDENTIAL STUDY DOSSIER</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div>
              <label className="text-[#8E8A83] uppercase tracking-wider block mb-1">Date</label>
              <input
                type="date"
                required
                value={newEntry.date}
                onChange={e => setNewEntry({ ...newEntry, date: e.target.value })}
                className={`touch-target w-full px-3 py-2 border rounded-none font-mono text-xs ${
                  isDark ? 'bg-[#11100E] border-[#B9BDC2]/30 text-[#E7E0D4]' : 'bg-[#DDD5C7] border-[#7A5A22]/40 text-[#11100E]'
                }`}
              />
            </div>
            <div>
              <label className="text-[#8E8A83] uppercase tracking-wider block mb-1">Time</label>
              <input
                type="time"
                value={newEntry.approxTime}
                onChange={e => setNewEntry({ ...newEntry, approxTime: e.target.value })}
                className={`touch-target w-full px-3 py-2 border rounded-none font-mono text-xs ${
                  isDark ? 'bg-[#11100E] border-[#B9BDC2]/30 text-[#E7E0D4]' : 'bg-[#DDD5C7] border-[#7A5A22]/40 text-[#11100E]'
                }`}
              />
            </div>
            <div>
              <label className="text-[#8E8A83] uppercase tracking-wider block mb-1">Setting</label>
              <select
                value={newEntry.setting}
                onChange={e => setNewEntry({ ...newEntry, setting: e.target.value as any })}
                className={`touch-target w-full px-3 py-2 border rounded-none font-mono text-xs cursor-pointer ${
                  isDark ? 'bg-[#11100E] border-[#B9BDC2]/30 text-[#E7E0D4]' : 'bg-[#DDD5C7] border-[#7A5A22]/40 text-[#11100E]'
                }`}
              >
                <option value="work">Workplace</option>
                <option value="romantic">Romantic</option>
                <option value="family">Family</option>
                <option value="friend group">Friend Group</option>
                <option value="street">Street</option>
                <option value="digital">Digital / Text</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div>
              <label className="text-[#8E8A83] uppercase tracking-wider block mb-1">Participants Involved</label>
              <input
                type="text"
                placeholder="Senior VP, Project Manager, Sibling..."
                value={newEntry.involved}
                onChange={e => setNewEntry({ ...newEntry, involved: e.target.value })}
                className={`touch-target w-full px-3 py-2 border rounded-none font-sans text-xs ${
                  isDark ? 'bg-[#11100E] border-[#B9BDC2]/30 text-[#E7E0D4]' : 'bg-[#DDD5C7] border-[#7A5A22]/40 text-[#11100E]'
                }`}
              />
            </div>
            <div>
              <label className="text-[#8E8A83] uppercase tracking-wider block mb-1">Prior Topic Under Discussion</label>
              <input
                type="text"
                placeholder="What was being discussed right before the friction point?"
                value={newEntry.priorDiscussion}
                onChange={e => setNewEntry({ ...newEntry, priorDiscussion: e.target.value })}
                className={`touch-target w-full px-3 py-2 border rounded-none font-sans text-xs ${
                  isDark ? 'bg-[#11100E] border-[#B9BDC2]/30 text-[#E7E0D4]' : 'bg-[#DDD5C7] border-[#7A5A22]/40 text-[#11100E]'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="font-mono text-[#8E8A83] uppercase tracking-wider text-xs block mb-1">
              Verbatim Phrase (Exact Words Spoken) *
            </label>
            <textarea
              rows={2}
              required
              placeholder="Record verbatim quote with vocal catches, self-corrections, or pitch drops..."
              value={newEntry.verbatimPhrase}
              onChange={e => setNewEntry({ ...newEntry, verbatimPhrase: e.target.value })}
              className={`w-full p-3 border rounded-none font-serif text-sm ${
                isDark ? 'bg-[#11100E] border-[#B9BDC2]/30 text-[#E7E0D4]' : 'bg-[#DDD5C7] border-[#7A5A22]/40 text-[#11100E]'
              }`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div>
              <label className="text-[#8E8A83] uppercase tracking-wider block mb-1">Leak Typology</label>
              <input
                type="text"
                placeholder="overcorrection, non-answer, projection..."
                value={newEntry.leakType}
                onChange={e => setNewEntry({ ...newEntry, leakType: e.target.value })}
                className={`touch-target w-full px-3 py-2 border rounded-none font-sans text-xs ${
                  isDark ? 'bg-[#11100E] border-[#B9BDC2]/30 text-[#E7E0D4]' : 'bg-[#DDD5C7] border-[#7A5A22]/40 text-[#11100E]'
                }`}
              />
            </div>
            <div>
              <label className="text-[#8E8A83] uppercase tracking-wider block mb-1">Observable Marker / Tell</label>
              <input
                type="text"
                placeholder="Pupil dilation, throat clearing, typing pause..."
                value={newEntry.physicalOrDigitalTell}
                onChange={e => setNewEntry({ ...newEntry, physicalOrDigitalTell: e.target.value })}
                className={`touch-target w-full px-3 py-2 border rounded-none font-sans text-xs ${
                  isDark ? 'bg-[#11100E] border-[#B9BDC2]/30 text-[#E7E0D4]' : 'bg-[#DDD5C7] border-[#7A5A22]/40 text-[#11100E]'
                }`}
              />
            </div>
            <div>
              <label className="text-[#8E8A83] uppercase tracking-wider block mb-1">Strain or Strategy?</label>
              <select
                value={newEntry.strainOrStrategy}
                onChange={e => setNewEntry({ ...newEntry, strainOrStrategy: e.target.value as any })}
                className={`touch-target w-full px-3 py-2 border rounded-none font-mono text-xs cursor-pointer ${
                  isDark ? 'bg-[#11100E] border-[#B9BDC2]/30 text-[#E7E0D4]' : 'bg-[#DDD5C7] border-[#7A5A22]/40 text-[#11100E]'
                }`}
              >
                <option value="strain">Strain (Involuntary Leak)</option>
                <option value="strategy">Strategy (Calculated Maneuver)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div>
              <label className="text-[#8E8A83] uppercase tracking-wider block mb-1">Initial Diagnostic Read</label>
              <textarea
                rows={2}
                placeholder="Unspoken cognitive-emotional driver..."
                value={newEntry.firstInstinctRead}
                onChange={e => setNewEntry({ ...newEntry, firstInstinctRead: e.target.value })}
                className={`w-full p-2.5 border rounded-none font-sans text-xs ${
                  isDark ? 'bg-[#11100E] border-[#B9BDC2]/30 text-[#E7E0D4]' : 'bg-[#DDD5C7] border-[#7A5A22]/40 text-[#11100E]'
                }`}
              />
            </div>
            <div>
              <label className="text-[#8E8A83] uppercase tracking-wider block mb-1">Ethical Restraint Action Taken (Ch. 5)</label>
              <textarea
                rows={2}
                placeholder="How did you preserve containment without weaponizing?"
                value={newEntry.actionTaken}
                onChange={e => setNewEntry({ ...newEntry, actionTaken: e.target.value })}
                className={`w-full p-2.5 border rounded-none font-sans text-xs ${
                  isDark ? 'bg-[#11100E] border-[#B9BDC2]/30 text-[#E7E0D4]' : 'bg-[#DDD5C7] border-[#7A5A22]/40 text-[#11100E]'
                }`}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="touch-target px-4 py-2 border rounded-none text-xs font-mono uppercase text-[#8E8A83] hover:text-[#E7E0D4] border-[#B9BDC2]/20 cursor-pointer"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className={`touch-target px-5 py-2 rounded-none text-xs font-mono font-bold uppercase tracking-wider cursor-pointer ${
                isDark ? 'bg-[#C5A36A] text-[#11100E]' : 'bg-[#7A5A22] text-[#E7E0D4]'
              }`}
            >
              COMMIT TO DOSSIER
            </button>
          </div>
        </form>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between text-xs font-mono">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#8E8A83] absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search dossier entries..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className={`touch-target w-full pl-9 pr-3 py-2 border rounded-none font-sans text-xs focus:outline-none transition-colors ${
              isDark
                ? 'bg-[#171513] border-[#B9BDC2]/30 text-[#E7E0D4] placeholder-[#8E8A83] focus:border-[#C5A36A]'
                : 'bg-[#DDD5C7] border-[#7A5A22]/40 text-[#11100E] placeholder-[#5E5851] focus:border-[#7A5A22]'
            }`}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={filterSetting}
            onChange={e => setFilterSetting(e.target.value)}
            className={`touch-target px-3 py-2 border text-xs font-mono uppercase cursor-pointer rounded-none ${
              isDark ? 'bg-[#171513] border-[#B9BDC2]/30 text-[#E7E0D4]' : 'bg-[#DDD5C7] border-[#7A5A22]/40 text-[#11100E]'
            }`}
          >
            <option value="all">ALL SETTINGS</option>
            <option value="work">WORKPLACE</option>
            <option value="romantic">ROMANTIC</option>
            <option value="family">FAMILY</option>
            <option value="friend group">FRIEND GROUP</option>
            <option value="street">STREET</option>
            <option value="digital">DIGITAL</option>
          </select>
        </div>
      </div>

      {/* List of Dossier Log Entries */}
      <div className="space-y-4">
        {filteredEntries.map(entry => (
          <div
            key={entry.id}
            className={`p-5 sm:p-6 border transition-all space-y-4 rounded-none ${
              isDark
                ? 'bg-[#171513] border-[#B9BDC2]/20'
                : 'bg-[#F2ECE1] border-[#7A5A22]/30'
            }`}
          >
            {/* Top metadata line with zero-pill discipline */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3 border-[#B9BDC2]/20 text-xs font-mono text-[#8E8A83]">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22] uppercase">
                  {entry.date} // {entry.approxTime}
                </span>
                <span aria-hidden="true" className="text-[#8E8A83]">·</span>
                <span className="uppercase font-semibold text-[#E7E0D4] dark:text-[#E7E0D4] light:text-[#11100E]">
                  {entry.setting}
                </span>
                <span aria-hidden="true" className="text-[#8E8A83]">·</span>
                <span className={`uppercase font-bold text-[11px] ${
                  entry.strainOrStrategy === 'strain'
                    ? 'text-[#C2332B]'
                    : 'text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22]'
                }`}>
                  [{entry.strainOrStrategy}]
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22] uppercase">
                  {entry.leakType}
                </span>
                <button
                  onClick={() => handleDeleteEntry(entry.id)}
                  className="p-1 text-[#8E8A83] hover:text-[#C2332B] transition-colors cursor-pointer"
                  title="Delete log record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Verbatim quote */}
            <div className={`p-4 border font-serif text-base sm:text-lg italic leading-relaxed rounded-none ${
              isDark ? 'bg-[#11100E] border-[#B9BDC2]/20 text-[#E7E0D4]' : 'bg-[#DDD5C7] border-[#7A5A22]/30 text-[#11100E]'
            }`}>
              "{entry.verbatimPhrase}"
            </div>

            {/* Structured analysis grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-sans">
              <div className={`p-3.5 border rounded-none ${
                isDark ? 'bg-[#11100E] border-[#B9BDC2]/20' : 'bg-[#DDD5C7] border-[#7A5A22]/30'
              }`}>
                <span className="font-mono text-[#8E8A83] uppercase tracking-wider block mb-1">Observable Marker / Tell:</span>
                <p className="text-[#E7E0D4] dark:text-[#E7E0D4] light:text-[#11100E]">{entry.physicalOrDigitalTell}</p>
              </div>

              <div className={`p-3.5 border rounded-none ${
                isDark ? 'bg-[#11100E] border-[#B9BDC2]/20' : 'bg-[#DDD5C7] border-[#7A5A22]/30'
              }`}>
                <span className="font-mono text-[#8E8A83] uppercase tracking-wider block mb-1">Diagnostic Hypothesis:</span>
                <p className="text-[#E7E0D4] dark:text-[#E7E0D4] light:text-[#11100E]">{entry.firstInstinctRead}</p>
              </div>

              <div className={`p-3.5 border rounded-none ${
                isDark ? 'bg-[#11100E] border-[#B9BDC2]/20' : 'bg-[#DDD5C7] border-[#7A5A22]/30'
              }`}>
                <span className="font-mono text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22] uppercase tracking-wider block mb-1 flex items-center gap-1 font-bold">
                  <Scale className="w-3 h-3 text-[#C5A36A]" />
                  <span>Ethical Restraint:</span>
                </span>
                <p className="text-[#E7E0D4] dark:text-[#E7E0D4] light:text-[#11100E]">{entry.actionTaken}</p>
              </div>
            </div>
          </div>
        ))}

        {filteredEntries.length === 0 && (
          <div className={`p-10 text-center border text-sm font-sans rounded-none ${
            isDark ? 'border-[#B9BDC2]/20 text-[#8E8A83]' : 'border-[#7A5A22]/30 text-[#5E5851]'
          }`}>
            No field records match your filter criteria. Click <strong>NEW OBSERVATION</strong> above to document a real-world case.
          </div>
        )}
      </div>
    </div>
  );
};
