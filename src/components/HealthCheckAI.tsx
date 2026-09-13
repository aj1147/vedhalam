import React, { useState } from 'react';
import { Activity, Stethoscope, HeartPulse, Sparkles, Volume2, ShieldAlert, Cpu } from 'lucide-react';
import { generateAbsurdDiagnosis } from '../utils/medicalDiagnoses';
import type { MedicalDiagnosisResult } from '../utils/medicalDiagnoses';
import { playSillySound } from '../utils/soundSynth';
import confetti from 'canvas-confetti';

export const HealthCheckAI: React.FC = () => {
  const [symptoms, setSymptoms] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [diagnosis, setDiagnosis] = useState<MedicalDiagnosisResult | null>(null);
  const [soundNotice, setSoundNotice] = useState<string | null>(null);
  const [floatingEmojis, setFloatingEmojis] = useState<{ id: number; emoji: string; x: number; y: number }[]>([]);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    setIsScanning(true);
    setDiagnosis(null);

    // Simulate futuristic biometrics scan delay
    setTimeout(() => {
      setIsScanning(false);
      setDiagnosis(generateAbsurdDiagnosis(symptoms));
    }, 1800);
  };

  const handleCalmDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Play silly Web Audio sound effect
    const soundText = playSillySound();
    setSoundNotice(soundText);

    // Trigger visual confetti bursts
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#6366f1', '#a855f7', '#ec4899', '#3b82f6']
    });

    // Spawn floating emojis near cursor or button
    const emojiList = ['🦆', '🎺', '🐕', '🐈', '🚗', '😭', '📢', '🌀', '🌴', '😌'];
    const newEmoji = {
      id: Date.now(),
      emoji: emojiList[Math.floor(Math.random() * emojiList.length)],
      x: e.clientX || window.innerWidth / 2,
      y: (e.clientY || window.innerHeight / 2) - 40,
    };

    setFloatingEmojis((prev) => [...prev, newEmoji]);
    setTimeout(() => {
      setFloatingEmojis((prev) => prev.filter((item) => item.id !== newEmoji.id));
    }, 1200);

    setTimeout(() => setSoundNotice(null), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 relative">

      {/* Floating Emojis overlay */}
      {floatingEmojis.map((item) => (
        <span
          key={item.id}
          className="floating-emoji text-3xl z-50 pointer-events-none"
          style={{ left: item.x, top: item.y }}
        >
          {item.emoji}
        </span>
      ))}

      {/* Sound Notice Toast */}
      {soundNotice && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-full bg-indigo-600 text-white font-bold text-sm shadow-2xl shadow-indigo-500/50 animate-bounce">
          <Volume2 className="w-5 h-5 animate-pulse" />
          <span>{soundNotice}</span>
        </div>
      )}

      {/* Header Title */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
          <HeartPulse className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          <span>CLINICAL BIOMETRIC TERMINAL v9.1</span>
        </div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">HealthCheck AI</h1>
        <p className="text-slate-400 text-sm">
          Enter your physical symptoms below to initiate full-spectrum quantum vital diagnostics.
        </p>
      </div>

      {/* Main Medical Scanner Input Box */}
      <div className="glass-panel rounded-2xl p-6 md:p-8 border border-slate-800 relative overflow-hidden space-y-6">
        
        {/* Scanner pulse overlay when processing */}
        {isScanning && <div className="scan-line" />}

        <form onSubmit={handleAnalyze} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-mono text-slate-400 flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-purple-400" />
              <span>Describe Patient Symptoms & Vitals</span>
            </label>
            <textarea
              rows={3}
              placeholder="e.g. I have a slight headache, cold feet, and I felt sleepy after lunch..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/60 transition-colors"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="submit"
              disabled={isScanning || !symptoms.trim()}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-xl shadow-purple-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isScanning ? (
                <>
                  <Activity className="w-4 h-4 animate-spin" />
                  <span>Scanning Biometrics...</span>
                </>
              ) : (
                <>
                  <Cpu className="w-4 h-4" />
                  <span>Execute Diagnostic Scan</span>
                </>
              )}
            </button>

            {/* Emergency Press to Calm Down Button */}
            <button
              type="button"
              onClick={handleCalmDown}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center gap-2"
              title="Click for soothing audio therapy"
            >
              <Volume2 className="w-4 h-4" />
              <span>Press to Calm Down 🧘‍♀️</span>
            </button>
          </div>
        </form>

        {/* Scanning Animation Telemetry */}
        {isScanning && (
          <div className="py-8 text-center space-y-3">
            <div className="inline-block p-4 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 animate-pulse">
              <Activity className="w-8 h-8 animate-spin" />
            </div>
            <p className="text-xs font-mono text-slate-400">
              Analyzing Glorbenzymatic levels... Calculating existance likelihood...
            </p>
          </div>
        )}

        {/* Diagnosis Results Card */}
        {diagnosis && !isScanning && (
          <div className="mt-6 p-6 rounded-xl bg-slate-900/90 border border-purple-500/30 space-y-5 animate-fadeIn">
            
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                  DIAGNOSTIC VERDICT
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-1">
                  {diagnosis.term}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-mono text-slate-400 block">Confidence Score</span>
                <span className="text-emerald-400 font-bold text-sm">{diagnosis.confidence}</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              
              {/* Primary Condition */}
              <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-slate-500 uppercase">Primary Condition</span>
                <p className="text-sm font-semibold text-rose-300">{diagnosis.conditionName}</p>
              </div>

              {/* Risk Level */}
              <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-slate-500 uppercase">Calculated Risk Score</span>
                <p className="text-sm font-semibold text-amber-300">{diagnosis.riskScore}</p>
              </div>
            </div>

            {/* Useless Comment */}
            <div className="p-4 rounded-lg bg-indigo-950/30 border border-indigo-500/20 text-indigo-200 text-xs font-mono flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 text-indigo-400 shrink-0" />
              <div>
                <span className="text-indigo-400 font-bold block">Telemetry Note:</span>
                <span>"{diagnosis.uselessComment}"</span>
              </div>
            </div>

            {/* Ridiculous Solution */}
            <div className="p-5 rounded-lg bg-gradient-to-r from-purple-900/30 via-slate-900 to-indigo-900/30 border border-purple-500/40 text-white space-y-2">
              <span className="text-xs font-mono text-purple-300 font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>RECOMMENDED THERAPEUTIC ACTION</span>
              </span>
              <p className="text-base font-bold text-amber-200 leading-snug">
                👉 {diagnosis.ridiculousSolution}
              </p>
            </div>

          </div>
        )}

      </div>

      <div className="text-center text-[11px] font-mono text-slate-600">
        Medical disclaimer: HealthCheck AI is certified by zero medical boards in this galaxy.
      </div>
    </div>
  );
};
