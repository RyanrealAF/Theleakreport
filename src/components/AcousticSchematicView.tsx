/**
 * Build While Bleeding — Acoustic Schematic View
 * buildwhilebleeding.com
 * Real-time acoustic frequency spectrum, cognitive-emotional latency analyzer, and physiological leak architecture
 */

import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Activity, Info, Sliders, Brain, Ear, Zap, ShieldAlert } from 'lucide-react';

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
      desc: 'Acoustic soundwaves are mechanically converted into neural impulses. The ear receives raw fundamental frequency (F0), formant shifts, and micro-glottal stops before any interpretive semantic censorship begins.',
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
      <section className={`border p-6 sm:p-8 relative overflow-hidden rounded-none ${
        isDark
          ? 'border-[#C5A36A]/30 bg-[#171513] text-[#E7E0D4]'
          : 'border-[#7A5A22]/35 bg-[#F2ECE1] text-[#11100E]'
      }`}>
        {/* Unboxed Metadata Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3.5 mb-4 border-[#B9BDC2]/20 text-xs font-mono text-[#8E8A83]">
          <div className="flex items-center gap-2">
            <span className="font-bold uppercase tracking-widest text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22]">
              [TM 31-HEAR-01 // FIG 1.0]
            </span>
            <span aria-hidden="true" className="text-[#8E8A83]">·</span>
            <span>BEHAVIORAL ACOUSTICS & COGNITIVE LATENCY</span>
          </div>
          <span className="font-mono text-[11px] tracking-widest">
            PERCEPTUAL ARCHITECTURE
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-wide uppercase leading-tight">
              Anatomy of Acoustic Perception & Leakage
            </h1>
            <p className="text-xs sm:text-sm font-mono text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22] mt-1.5 uppercase tracking-wider">
              Neural Processing Latency, Vocal Tract Resonance & The 200–400ms Vulnerability Delta
            </p>
          </div>

          <div className={`touch-target flex items-center gap-2 px-3.5 py-2 border text-xs font-mono shrink-0 rounded-none ${
            isDark ? 'bg-[#11100E] border-[#C5A36A]/40 text-[#E7E0D4]' : 'bg-[#DDD5C7] border-[#7A5A22]/40 text-[#11100E]'
          }`}>
            <Activity className="w-4 h-4 text-[#C2332B] animate-pulse" />
            <span className="font-mono text-[11px] font-bold">SPECTRAL MONITOR: <strong className="text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22]">CALIBRATED</strong></span>
          </div>
        </div>
      </section>

      {/* Main Educational Schematic Diagram */}
      <section className={`border p-6 sm:p-8 space-y-6 rounded-none ${
        isDark ? 'border-[#B9BDC2]/20 bg-[#171513]' : 'border-[#7A5A22]/30 bg-[#F2ECE1]'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3.5 border-[#B9BDC2]/20">
          <div className="flex items-center gap-2 text-sm font-display font-black uppercase tracking-widest text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22]">
            <Brain className="w-4 h-4 text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22]" />
            <span>Interactive Schematic: Neural Transmission & The Leak Window</span>
          </div>
          <span className="text-[11px] font-mono text-[#8E8A83]">
            [SELECT NODES TO EXAMINE THE NEURAL CHAIN]
          </span>
        </div>

        {/* Anatomical Schematic Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Diagram Visualization Box (7 cols) */}
          <div className={`lg:col-span-7 p-5 sm:p-6 border relative overflow-hidden flex flex-col justify-between rounded-none ${
            isDark ? 'bg-[#11100E] border-[#B9BDC2]/20' : 'bg-[#DDD5C7] border-[#7A5A22]/30'
          }`}>
            <div className="flex items-center justify-between text-xs font-mono text-[#8E8A83] mb-4">
              <span>FIG 1.1: AUDITORY TRANSLATION PATHWAY</span>
              <span className="text-[#C2332B] font-mono font-bold">DELTA Δ = ~300ms</span>
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
                    className={`w-full touch-target text-left p-3.5 border transition-all flex items-center justify-between cursor-pointer rounded-none ${
                      isSelected
                        ? isDark
                          ? 'bg-[#C5A36A]/20 border-[#C5A36A] text-[#E7E0D4]'
                          : 'bg-[#7A5A22]/20 border-[#7A5A22] text-[#11100E]'
                        : isDark
                          ? 'bg-[#171513] border-[#B9BDC2]/20 text-[#B9BDC2] hover:border-[#C5A36A]/50'
                          : 'bg-[#F2ECE1] border-[#7A5A22]/30 text-[#302C28] hover:border-[#7A5A22]/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 flex items-center justify-center border rounded-none ${
                        isSelected
                          ? isDark ? 'bg-[#C5A36A] text-[#11100E] border-[#C5A36A]' : 'bg-[#7A5A22] text-[#E7E0D4] border-[#7A5A22]'
                          : isDark ? 'bg-[#11100E] text-[#B9BDC2] border-[#B9BDC2]/20' : 'bg-[#DDD5C7] text-[#302C28] border-[#7A5A22]/30'
                      }`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-display font-bold text-base uppercase tracking-wide">{node.label}</div>
                        <div className="text-xs font-mono text-[#8E8A83]">{node.sub}</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22]">
                      {isSelected ? '[ACTIVE]' : 'INSPECT'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Simulated Frequency Oscilloscope */}
            <div className="mt-5 pt-4 border-t border-[#B9BDC2]/20">
              <div className="flex items-center justify-between text-xs font-mono text-[#8E8A83] mb-2.5">
                <span>SUBTEXT SPECTROGRAM SIMULATOR</span>
                <span className="text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22] font-mono font-bold">{activeFrequency} Hz Calibration</span>
              </div>
              <div className="h-16 flex items-end justify-between gap-1 bg-[#11100E] p-2 overflow-hidden border border-[#B9BDC2]/20 rounded-none">
                {audioOscillation.map((height, idx) => (
                  <div
                    key={idx}
                    className={`w-full transition-all duration-200 ${
                      idx >= 16 && idx <= 26
                        ? 'bg-[#C2332B]'
                        : 'bg-[#C5A36A]/60'
                    }`}
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Callout Explanatory Card (5 cols) */}
          <div className={`lg:col-span-5 p-5 sm:p-6 border space-y-4 flex flex-col justify-between rounded-none ${
            isDark ? 'bg-[#11100E] border-[#B9BDC2]/20' : 'bg-[#DDD5C7] border-[#7A5A22]/30'
          }`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[#8E8A83]">
                <span className="font-mono font-bold text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22] uppercase tracking-wider">
                  [PATHWAY TELEMETRY]
                </span>
                <span className="font-mono text-xs">
                  Latency: <strong className="text-[#E7E0D4] dark:text-[#E7E0D4] light:text-[#11100E]">{activeCalloutData.latency}</strong>
                </span>
              </div>

              <h3 className="font-display font-black text-2xl uppercase tracking-wide text-[#E7E0D4] dark:text-[#E7E0D4] light:text-[#11100E]">
                {activeCalloutData.title}
              </h3>

              <div className="text-xs font-mono font-bold text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22]">
                {activeCalloutData.subtitle}
              </div>

              <p className="text-sm font-sans leading-relaxed text-[#B9BDC2] dark:text-[#B9BDC2] light:text-[#302C28] pt-1">
                {activeCalloutData.desc}
              </p>
            </div>

            {/* Doctrinal Axiom Box */}
            <div className={`p-4 border text-xs font-sans space-y-2 rounded-none ${
              isDark ? 'bg-[#171513] border-[#C5A36A]/30 text-[#E7E0D4]' : 'bg-[#F2ECE1] border-[#7A5A22]/40 text-[#11100E]'
            }`}>
              <div className="font-mono font-bold text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22] flex items-center gap-1.5 uppercase">
                <ShieldAlert className="w-3.5 h-3.5 text-[#C2332B]" />
                <span>Diagnostic Rule of Thumb</span>
              </div>
              <p className="italic leading-relaxed font-sans text-sm">
                "Words represent what a person decided to present. Frequency spikes, respiratory catches, and glottal friction represent what their body was already suffering before they decided."
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Frequency Spectrum Slider */}
        <div className={`p-5 border space-y-3 rounded-none ${
          isDark ? 'bg-[#11100E] border-[#B9BDC2]/20' : 'bg-[#DDD5C7] border-[#7A5A22]/30'
        }`}>
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <span className="font-bold text-[#E7E0D4] dark:text-[#E7E0D4] light:text-[#11100E] flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#C5A36A] dark:text-[#C5A36A] light:text-[#7A5A22]" />
              ACOUSTIC FREQUENCY FILTER: {activeFrequency} Hz
            </span>
            <span className="text-[#8E8A83] font-mono text-[11px]">
              {activeFrequency < 1000 && '[Sub-Vocal Fundamental Pitch: Insecurity / Hesitation]'}
              {activeFrequency >= 1000 && activeFrequency < 2500 && '[Vocal Tract Formants: Laryngeal Constriction / Glottal Stress]'}
              {activeFrequency >= 2500 && '[High-Frequency Sibilance: Aggression / Micro-Defensiveness]'}
            </span>
          </div>

          <input
            type="range"
            min="200"
            max="4500"
            step="50"
            value={activeFrequency}
            onChange={e => setActiveFrequency(Number(e.target.value))}
            className="w-full accent-[#C5A36A] cursor-pointer h-2 bg-[#171513] dark:bg-[#171513] light:bg-[#DDD5C7] rounded-none appearance-none"
          />

          <div className="flex justify-between text-[11px] font-mono text-[#8E8A83]">
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
