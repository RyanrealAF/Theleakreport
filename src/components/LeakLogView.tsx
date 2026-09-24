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
  Scale
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
  const [filterType] = useState<string>('all');
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
      console.error(e);
      setEntries(INITIAL_SAMPLES);
    }
  }, []);

  const saveEntries = (updated: DebriefLogEntry[]) => {
    setEntries(updated);
    try {
      localStorage.setItem('leak-report-debrief-logs', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.verbatimPhrase?.trim()) return;

    const entryToSave: DebriefLogEntry = {
      id: `log-${Date.now()}`,
      date: newEntry.date || new Date().toISOString().split('T')[0],
      approxTime: newEntry.approxTime || '12:00',
      setting: (newEntry.setting as any) || 'other',
      involved: newEntry.involved || 'Anonymous Interlocutor',
      priorDiscussion: newEntry.priorDiscussion || 'N/A',
      verbatimPhrase: newEntry.verbatimPhrase || '',
      leakType: newEntry.leakType || 'micro-confession',
      physicalOrDigitalTell: newEntry.physicalOrDigitalTell || 'N/A',
      subjectOrbited: newEntry.subjectOrbited || 'N/A',
      strainOrStrategy: (newEntry.strainOrStrategy as any) || 'strain',
      firstInstinctRead: newEntry.firstInstinctRead || 'N/A',
      actionTaken: newEntry.actionTaken || 'Observed silently; held Chapter 5 restraint.',
    };

    const updated = [entryToSave, ...entries];
    saveEntries(updated);
    setShowForm(false);
    // Reset form
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
    if (confirm('Delete this field observation record from your dossier?')) {
      const updated = entries.filter(e => e.id !== id);
      saveEntries(updated);
    }
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(entries, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `behavioral-dossier-logs-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredEntries = entries.filter(entry => {
    if (filterType !== 'all' && entry.leakType !== filterType) return false;
    if (filterSetting !== 'all' && entry.setting !== filterSetting) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        entry.verbatimPhrase.toLowerCase().includes(q) ||
        entry.subjectOrbited.toLowerCase().includes(q) ||
        entry.firstInstinctRead.toLowerCase().includes(q) ||
        entry.involved.toLowerCase().includes(q) ||
        entry.leakType.toLowerCase().includes(q)
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className={`p-2.5 rounded-lg border ${
              isDark ? 'bg-amber-950/60 text-amber-400 border-amber-800/60' : 'bg-amber-100 text-amber-900 border-amber-300'
            }`}>
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
                Empirical Field Dossier & Debrief Log
              </h1>
              <p className="text-xs sm:text-sm font-mono text-amber-800 dark:text-amber-400 mt-0.5">
                Part IV Fieldwork Sheet • Systematic Documentation of Conversational Leaks
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowForm(!showForm)}
              className={`px-3.5 py-2 rounded-xl text-xs font-sans font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer ${
                isDark
                  ? 'bg-amber-500 hover:bg-amber-400 text-stone-950'
                  : 'bg-amber-600 hover:bg-amber-700 text-white'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>{showForm ? 'Close Form' : 'New Observation'}</span>
            </button>

            <button
              onClick={handleExportJSON}
              className={`px-3 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
                  : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
              }`}
              title="Download dossier as JSON file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>

            <button
              onClick={handlePrint}
              className={`px-3 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
                  : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
              }`}
              title="Print field dossier"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Dossier</span>
            </button>
          </div>
        </div>

        <p className={`text-sm sm:text-base font-sans leading-relaxed mt-4 ${
          isDark ? 'text-stone-300' : 'text-stone-600'
        }`}>
          A structured laboratory log for capturing real-world interpersonal leaks. Record the raw verbatim transcript, the physical/respiratory marker, the underlying subtext, and the ethical containment protocol observed.
        </p>
      </section>

      {/* New Entry Form */}
      {showForm && (
        <form
          onSubmit={handleAddEntry}
          className={`border rounded-xl p-6 sm:p-7 space-y-4 shadow-book-lg ${
            isDark ? 'border-amber-500/40 bg-stone-900/90' : 'border-amber-300 bg-amber-50/50'
          }`}
        >
          <div className="flex items-center justify-between border-b pb-2 border-amber-500/20 text-xs font-mono font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
            <span>Log New Empirical Field Observation</span>
            <span>All entries stored locally</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="font-mono text-stone-500 uppercase tracking-wider block mb-1">Date</label>
              <input
                type="date"
                required
                value={newEntry.date}
                onChange={e => setNewEntry({ ...newEntry, date: e.target.value })}
                className={`w-full rounded-lg px-3 py-2 border font-mono text-xs ${
                  isDark ? 'bg-stone-950 border-stone-700 text-stone-100' : 'bg-white border-stone-300 text-stone-900'
                }`}
              />
            </div>

            <div>
              <label className="font-mono text-stone-500 uppercase tracking-wider block mb-1">Approx Time</label>
              <input
                type="time"
                value={newEntry.approxTime}
                onChange={e => setNewEntry({ ...newEntry, approxTime: e.target.value })}
                className={`w-full rounded-lg px-3 py-2 border font-mono text-xs ${
                  isDark ? 'bg-stone-950 border-stone-700 text-stone-100' : 'bg-white border-stone-300 text-stone-900'
                }`}
              />
            </div>

            <div>
              <label className="font-mono text-stone-500 uppercase tracking-wider block mb-1">Setting / Environment</label>
              <select
                value={newEntry.setting}
                onChange={e => setNewEntry({ ...newEntry, setting: e.target.value as any })}
                className={`w-full rounded-lg px-3 py-2 border font-sans text-xs capitalize ${
                  isDark ? 'bg-stone-950 border-stone-700 text-stone-100' : 'bg-white border-stone-300 text-stone-900'
                }`}
              >
                <option value="work">Workplace</option>
                <option value="romantic">Romantic</option>
                <option value="family">Family</option>
                <option value="friend group">Friend Group</option>
                <option value="street">Public / Street</option>
                <option value="digital">Digital / Text</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="font-mono text-stone-500 uppercase tracking-wider block mb-1">Subject / Participants Involved</label>
              <input
                type="text"
                placeholder="e.g. Senior VP, Project Manager, Sibling..."
                value={newEntry.involved}
                onChange={e => setNewEntry({ ...newEntry, involved: e.target.value })}
                className={`w-full rounded-lg px-3 py-2 border font-sans text-xs ${
                  isDark ? 'bg-stone-950 border-stone-700 text-stone-100' : 'bg-white border-stone-300 text-stone-900'
                }`}
              />
            </div>

            <div>
              <label className="font-mono text-stone-500 uppercase tracking-wider block mb-1">Prior Conversation Topic</label>
              <input
                type="text"
                placeholder="What was being discussed immediately prior to the slip?"
                value={newEntry.priorDiscussion}
                onChange={e => setNewEntry({ ...newEntry, priorDiscussion: e.target.value })}
                className={`w-full rounded-lg px-3 py-2 border font-sans text-xs ${
                  isDark ? 'bg-stone-950 border-stone-700 text-stone-100' : 'bg-white border-stone-300 text-stone-900'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="font-mono text-stone-500 uppercase tracking-wider text-xs block mb-1">
              Verbatim Phrase (Exact Words Spoken) *
            </label>
            <textarea
              rows={2}
              required
              placeholder="Quote the exact friction line as spoken..."
              value={newEntry.verbatimPhrase}
              onChange={e => setNewEntry({ ...newEntry, verbatimPhrase: e.target.value })}
              className={`w-full rounded-lg px-3 py-2 border font-serif text-sm ${
                isDark ? 'bg-stone-950 border-stone-700 text-stone-100' : 'bg-white border-stone-300 text-stone-900'
              }`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="font-mono text-stone-500 uppercase tracking-wider block mb-1">Leak Typology</label>
              <input
                type="text"
                placeholder="e.g. overcorrection, non-answer..."
                value={newEntry.leakType}
                onChange={e => setNewEntry({ ...newEntry, leakType: e.target.value })}
                className={`w-full rounded-lg px-3 py-2 border font-sans text-xs ${
                  isDark ? 'bg-stone-950 border-stone-700 text-stone-100' : 'bg-white border-stone-300 text-stone-900'
                }`}
              />
            </div>

            <div>
              <label className="font-mono text-stone-500 uppercase tracking-wider block mb-1">Physical / Digital Marker</label>
              <input
                type="text"
                placeholder="Micro-fidget, pupil dilation, typing delay..."
                value={newEntry.physicalOrDigitalTell}
                onChange={e => setNewEntry({ ...newEntry, physicalOrDigitalTell: e.target.value })}
                className={`w-full rounded-lg px-3 py-2 border font-sans text-xs ${
                  isDark ? 'bg-stone-950 border-stone-700 text-stone-100' : 'bg-white border-stone-300 text-stone-900'
                }`}
              />
            </div>

            <div>
              <label className="font-mono text-stone-500 uppercase tracking-wider block mb-1">Strain or Strategy?</label>
              <select
                value={newEntry.strainOrStrategy}
                onChange={e => setNewEntry({ ...newEntry, strainOrStrategy: e.target.value as any })}
                className={`w-full rounded-lg px-3 py-2 border font-sans text-xs ${
                  isDark ? 'bg-stone-950 border-stone-700 text-stone-100' : 'bg-white border-stone-300 text-stone-900'
                }`}
              >
                <option value="strain">Strain (Involuntary Leak)</option>
                <option value="strategy">Strategy (Calculated Maneuver)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="font-mono text-stone-500 uppercase tracking-wider block mb-1">Initial Diagnostic Read</label>
              <textarea
                rows={2}
                placeholder="What was the unspoken psychological driver behind this line?"
                value={newEntry.firstInstinctRead}
                onChange={e => setNewEntry({ ...newEntry, firstInstinctRead: e.target.value })}
                className={`w-full rounded-lg px-3 py-2 border font-sans text-xs ${
                  isDark ? 'bg-stone-950 border-stone-700 text-stone-100' : 'bg-white border-stone-300 text-stone-900'
                }`}
              />
            </div>

            <div>
              <label className="font-mono text-stone-500 uppercase tracking-wider block mb-1">Ethical Restraint Action Taken (Ch. 5)</label>
              <textarea
                rows={2}
                placeholder="How did you maintain restraint without weaponizing this observation?"
                value={newEntry.actionTaken}
                onChange={e => setNewEntry({ ...newEntry, actionTaken: e.target.value })}
                className={`w-full rounded-lg px-3 py-2 border font-sans text-xs ${
                  isDark ? 'bg-stone-950 border-stone-700 text-stone-100' : 'bg-white border-stone-300 text-stone-900'
                }`}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-lg text-xs font-medium border text-stone-500 hover:text-stone-700 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-500 dark:text-stone-950 shadow-xs cursor-pointer"
            >
              Commit to Field Dossier
            </button>
          </div>
        </form>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between text-xs font-mono">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search dossier entries..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className={`w-full rounded-lg pl-9 pr-3 py-2 border focus:outline-none transition-colors ${
              isDark
                ? 'bg-stone-900 border-stone-700 text-stone-100 placeholder-stone-500 focus:border-amber-500'
                : 'bg-white border-stone-300 text-stone-900 placeholder-stone-400 focus:border-amber-600'
            }`}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={filterSetting}
            onChange={e => setFilterSetting(e.target.value)}
            className={`rounded-lg px-2.5 py-1.5 border text-xs font-mono capitalize cursor-pointer ${
              isDark ? 'bg-stone-900 border-stone-700 text-stone-300' : 'bg-white border-stone-300 text-stone-700'
            }`}
          >
            <option value="all">All Settings</option>
            <option value="work">Workplace</option>
            <option value="romantic">Romantic</option>
            <option value="family">Family</option>
            <option value="friend group">Friend Group</option>
            <option value="street">Street</option>
            <option value="digital">Digital</option>
          </select>
        </div>
      </div>

      {/* List of Dossier Log Entries (Unboxed Clean Metadata) */}
      <div className="space-y-4">
        {filteredEntries.map(entry => (
          <div
            key={entry.id}
            className={`p-5 sm:p-6 rounded-xl border transition-all space-y-4 shadow-book ${
              isDark
                ? 'bg-stone-900/60 border-stone-800'
                : 'bg-white border-stone-200'
            }`}
          >
            {/* Top metadata line with zero-pill discipline */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3 border-stone-200 dark:border-stone-800 text-xs font-mono text-stone-500 dark:text-stone-400">
              <div className="flex items-center gap-2">
                <span className="font-bold text-amber-800 dark:text-amber-400 uppercase">
                  {entry.date} · {entry.approxTime}
                </span>
                <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
                <span className="capitalize">
                  {entry.setting}
                </span>
                <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
                <span className={`uppercase font-semibold text-[11px] ${
                  entry.strainOrStrategy === 'strain'
                    ? 'text-rose-700 dark:text-rose-400'
                    : 'text-indigo-700 dark:text-indigo-400'
                }`}>
                  {entry.strainOrStrategy}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-semibold text-amber-800 dark:text-amber-400">
                  {entry.leakType}
                </span>
                <button
                  onClick={() => handleDeleteEntry(entry.id)}
                  className="p-1 rounded text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                  title="Delete log record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Verbatim quote */}
            <div className={`p-4 rounded-xl border font-serif text-base sm:text-lg italic leading-relaxed shadow-book ${
              isDark ? 'bg-stone-950/80 border-stone-800/80 text-stone-100' : 'bg-stone-50 border-stone-200 text-stone-900'
            }`}>
              "{entry.verbatimPhrase}"
            </div>

            {/* Structured analysis grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-sans">
              <div className={`p-3.5 rounded-lg border ${
                isDark ? 'bg-stone-950/40 border-stone-800' : 'bg-stone-50/50 border-stone-200'
              }`}>
                <span className="font-mono text-stone-500 uppercase tracking-wider block mb-1">Observable Marker / Tell:</span>
                <p className="text-stone-700 dark:text-stone-300">{entry.physicalOrDigitalTell}</p>
              </div>

              <div className={`p-3.5 rounded-lg border ${
                isDark ? 'bg-stone-950/40 border-stone-800' : 'bg-stone-50/50 border-stone-200'
              }`}>
                <span className="font-mono text-stone-500 uppercase tracking-wider block mb-1">Diagnostic Hypothesis:</span>
                <p className="text-stone-700 dark:text-stone-300">{entry.firstInstinctRead}</p>
              </div>

              <div className={`p-3.5 rounded-lg border ${
                isDark ? 'bg-stone-950/40 border-stone-800' : 'bg-stone-50/50 border-stone-200'
              }`}>
                <span className="font-mono text-stone-500 uppercase tracking-wider block mb-1 flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
                  <Scale className="w-3 h-3" />
                  <span>Ethical Restraint:</span>
                </span>
                <p className="text-stone-700 dark:text-stone-300">{entry.actionTaken}</p>
              </div>
            </div>
          </div>
        ))}

        {filteredEntries.length === 0 && (
          <div className={`p-10 text-center rounded-xl border text-sm font-sans ${
            isDark ? 'border-stone-800 text-stone-400' : 'border-stone-200 text-stone-500'
          }`}>
            No field records match your filter criteria. Click <strong>New Observation</strong> above to document a real-world case.
          </div>
        )}
      </div>
    </div>
  );
};
