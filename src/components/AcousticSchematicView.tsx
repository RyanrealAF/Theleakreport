import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Activity, Info, Sliders, Brain, Ear, Zap } from 'lucide-react';

export const AcousticSchematicView: React.FC = () => {
  const { isDark } = useTheme();
  const [activeFrequency, setActiveFrequency] = useState<number>(2400);
  const [audioOscillation, setAudioOscillation] = useState<number[]>([]);
  const [selectedCallout, setSelectedCallout] = useState<string>('callout-leak');

  useEffect(() => {
    // Generate dynamic acoustic spectrum bars
    const bars = Array.from({ length: 36 }, (_, i) => {
      const base = Math.sin((i / 36) * Math.PI * 4) * 28 + 36;
      const spike = (i === 18 || i === 22 || i === 26) ? 38 : 0;
      return Math.min(95, Math.max(12, base + spike + (Math.random() * 12 - 6)));
    });
    setAudioOscillation(bars);

    const interval = setInterval(() => {
      setAudioOscillation(prev =>
        prev.map(val => {
          const delta = (Math.random() - 0.5) * 14;
          return Math.min(96, Math.max(10, val + delta));
        })
      );
    }, 250);
    return () => clearInterval(interval);
  }, [activeFrequency]);

  const calloutDetails: { [key: string]: { title: string; subtitle: string; desc: string; latency: string } } = {
    'callout-ear': {
      title: '1. Peripheral Auditory Transduction',
      subtitle: 'Tympanic Membrane & Cochlear Organ of Corti',
      desc: 'Acoustic soundwaves are collected by the pinna and mechanically converted into neural impulses. The ear receives raw fundamental frequency (F0), formant shifts, and micro-glottal stops before any interpretive semantic processing begins.',
      latency: '10–25 ms'
    },
    'callout-limbic': {
      title: '2. Subcortical Limbic Response (Emotional Signal)',
      subtitle: 'Amygdala & Autonomic Vocal Tract Modulation',
      desc: 'Emotional strain, fear of discovery, or suppressed hostility immediately modulates laryngeal muscle tension. This involuntary physiological response forces micro-tremors and pitch elevation before conscious speech censorship can activate.',
      latency: '50–120 ms'
    },
    'callout-prefrontal': {
      title: '3. Prefrontal Cortical Editing (The Diplomatic Filter)',
      subtitle: 'Dorsolateral Prefrontal Cortex & Broca\'s Area',
      desc: 'The conscious mind formulates an acceptable, sanitized verbal response. It constructs polite deflections, plausible deniability, and rehearsed excuses. However, this complex cognitive formulation introduces measurable processing delay.',
      latency: '350–550 ms'
    },
    'callout-leak': {
      title: '4. The Acoustic Leakage Window (Containment Failure)',
      subtitle: 'The 200–400ms Cognitive-Emotional Delta',
      desc: 'Because autonomic vocal tension acts in ~80ms while diplomatic cognitive censorship takes ~400ms, an inevitable gap occurs. In this window, micro-confessions, overcorrections, voice cracking, and hesitation tells escape into the room.',
      latency: '200–400 ms'
    }
  };

  const activeCalloutData = calloutDetails[selectedCallout] || calloutDetails['callout-leak'];

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-24">
      {/* Educational Header Banner */}
      <section className={`border rounded-xl p-6 sm:p-8 relative overflow-hidden shadow-book ${
        isDark
          ? 'border-stone-800 bg-stone-900/80 text-stone-100'
          : 'border-stone-200 bg-white text-stone-900'
      }`}>
        {/* Unboxed Metadata Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3.5 mb-4 border-stone-200 dark:border-stone-800 text-xs font-mono text-stone-500 dark:text-stone-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400">
              Curriculum Section 04
            </span>
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
            <span>BEHAVIORAL ACOUSTICS & COGNITIVE NEUROSCIENCE</span>
          </div>
          <span className="font-medium tracking-wide">
            FIGURE 1.0 // PERCEPTUAL ARCHITECTURE
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-tight">
              Anatomy of Acoustic Perception & Conversational Leakage
            </h1>
            <p className="text-xs sm:text-sm font-mono text-amber-800 dark:text-amber-400 mt-1.5">
              A Cognitive Study Guide to Auditory Processing, Physiological Latencies, and Vocal Tells
            </p>
          </div>

          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono shrink-0 ${
            isDark ? 'bg-stone-950 border-stone-800 text-stone-300' : 'bg-stone-50 border-stone-200 text-stone-700'
          }`}>
            <Activity className="w-4 h-4 text-amber-600 dark:text-amber-400 animate-pulse" />
            <span>SPECTRAL MONITOR: <strong>CALIBRATED</strong></span>
          </div>
        </div>
      </section>

      {/* Main Educational Schematic Diagram */}
      <section className={`border rounded-xl p-6 sm:p-8 space-y-6 shadow-book ${
        isDark ? 'border-stone-800 bg-stone-900/60' : 'border-stone-200 bg-white'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3.5 border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
            <Brain className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Interactive Schematic: Neural Transmission & The Leak Window</span>
          </div>
          <span className="text-xs font-mono text-stone-400 dark:text-stone-500">
            SELECT CALLOUT NODES TO EXAMINE THE NEURAL CHAIN
          </span>
        </div>

        {/* Anatomical Schematic Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Diagram Visualization Box (7 cols) */}
          <div className={`lg:col-span-7 rounded-xl p-5 sm:p-6 border relative overflow-hidden flex flex-col justify-between shadow-book ${
            isDark ? 'bg-stone-950/80 border-stone-800' : 'bg-stone-50 border-stone-200'
          }`}>
            <div className="flex items-center justify-between text-xs font-mono text-stone-500 mb-4">
              <span>FIG 1.1: AUDITORY TRANSLATION PATHWAY</span>
              <span className="text-amber-700 dark:text-amber-400 font-semibold">DELTA Δ = ~300ms</span>
            </div>

            {/* Interactive Neural Path Nodes */}
            <div className="space-y-3.5 py-2">
              {[
                { id: 'callout-ear', label: '1. Acoustic Reception (Ear)', sub: 'Tympanic transduction (10–25ms)', icon: Ear },
                { id: 'callout-limbic', label: '2. Subcortical Limbic Tension', sub: 'Involuntary autonomic leak (~80ms)', icon: Zap },
                { id: 'callout-prefrontal', label: '3. Prefrontal Conscious Censorship', sub: 'Sanitized diplomatic phrasing (~450ms)', icon: Brain },
                { id: 'callout-leak', label: '4. Containment Failure (The Leak)', sub: 'The 200–400ms delta where truth escapes', icon: Activity },
              ].map(node => {
                const isSelected = selectedCallout === node.id;
                const IconComponent = node.icon;
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedCallout(node.id)}
                    className={`w-full text-left p-3.5 rounded-lg border transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? isDark
                          ? 'bg-amber-950/40 border-amber-500 text-amber-200 shadow-xs'
                          : 'bg-amber-50 border-amber-400 text-amber-950 shadow-xs'
                        : isDark
                          ? 'bg-stone-900/60 border-stone-800 text-stone-300 hover:border-stone-700'
                          : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-md ${
                        isSelected
                          ? isDark ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-amber-600 text-white'
                          : isDark ? 'bg-stone-800 text-stone-400' : 'bg-stone-100 text-stone-600'
                      }`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-serif font-bold text-sm sm:text-base">{node.label}</div>
                        <div className="text-xs font-mono text-stone-500 dark:text-stone-400">{node.sub}</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-semibold text-amber-700 dark:text-amber-400">
                      {isSelected ? '● Active' : 'Inspect'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Simulated Frequency Oscilloscope */}
            <div className="mt-5 pt-4 border-t border-stone-200 dark:border-stone-800">
              <div className="flex items-center justify-between text-xs font-mono text-stone-500 mb-2.5">
                <span>SUBTEXT SPECTROGRAM SIMULATOR</span>
                <span className="text-amber-700 dark:text-amber-400 font-semibold">{activeFrequency} Hz Calibration</span>
              </div>
              <div className="h-16 flex items-end justify-between gap-1 bg-stone-950 rounded-lg p-2 overflow-hidden border border-stone-800">
                {audioOscillation.map((height, idx) => (
                  <div
                    key={idx}
                    className={`w-full rounded-t transition-all duration-200 ${
                      idx >= 16 && idx <= 26
                        ? 'bg-amber-400 dark:bg-amber-500'
                        : 'bg-stone-700'
                    }`}
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Callout Explanatory Card (5 cols) */}
          <div className={`lg:col-span-5 rounded-xl p-5 sm:p-6 border space-y-4 flex flex-col justify-between shadow-book ${
            isDark ? 'bg-stone-950/80 border-stone-800' : 'bg-amber-50/40 border-amber-200/90'
          }`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-stone-500">
                <span className="font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">
                  PATHWAY ANALYSIS
                </span>
                <span className="font-mono text-stone-600 dark:text-stone-400">
                  Latency: <strong>{activeCalloutData.latency}</strong>
                </span>
              </div>

              <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-100">
                {activeCalloutData.title}
              </h3>

              <div className="text-xs font-mono font-medium text-stone-500 dark:text-stone-400">
                {activeCalloutData.subtitle}
              </div>

              <p className="text-sm font-sans leading-relaxed text-stone-700 dark:text-stone-300 pt-1">
                {activeCalloutData.desc}
              </p>
            </div>

            {/* Pedagogical Takeaway Box */}
            <div className={`p-4 rounded-xl border text-xs font-sans space-y-2 shadow-xs ${
              isDark ? 'bg-stone-900/90 border-stone-800 text-stone-300' : 'bg-white border-stone-200 text-stone-700'
            }`}>
              <div className="font-mono font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1.5 uppercase">
                <Info className="w-3.5 h-3.5" />
                <span>Diagnostic Rule of Thumb</span>
              </div>
              <p className="italic leading-relaxed font-serif text-sm">
                "Words represent what a person decided to present. Frequency spikes, respiratory catches, and glottal friction represent what their body was already suffering before they decided."
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Frequency Spectrum Slider */}
        <div className={`p-5 rounded-xl border space-y-3 shadow-book ${
          isDark ? 'bg-stone-950/50 border-stone-800' : 'bg-stone-50 border-stone-200'
        }`}>
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <span className="font-bold text-stone-700 dark:text-stone-300 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              ACOUSTIC FREQUENCY FILTER: {activeFrequency} Hz
            </span>
            <span className="text-stone-500">
              {activeFrequency < 1000 && 'Sub-Vocal Fundamental Pitch (Insecurity / Hesitation)'}
              {activeFrequency >= 1000 && activeFrequency < 2500 && 'Vocal Tract Formants (Laryngeal Constriction / Glottal Stress)'}
              {activeFrequency >= 2500 && 'High-Frequency Sibilance (Aggression / Micro-Defensiveness)'}
            </span>
          </div>

          <input
            type="range"
            min="200"
            max="4500"
            step="50"
            value={activeFrequency}
            onChange={e => setActiveFrequency(Number(e.target.value))}
            className="w-full accent-amber-600 cursor-pointer h-2 bg-stone-300 dark:bg-stone-700 rounded-lg appearance-none"
          />

          <div className="flex justify-between text-[11px] font-mono text-stone-400">
            <span>200 Hz (Fundamental)</span>
            <span>1500 Hz (Formants)</span>
            <span>2800 Hz (Strain Spike)</span>
            <span>4500 Hz (Sibilance)</span>
          </div>
        </div>
      </section>
    </div>
  );
};
