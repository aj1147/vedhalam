import React from 'react';
import { ArrowRight, Sparkles, Bot, FileText, Zap } from 'lucide-react';

interface DashboardHubProps {
  onSelectView: (view: 'notes' | 'health') => void;
}

export const DashboardHub: React.FC<DashboardHubProps> = ({ onSelectView }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-b from-indigo-950/40 via-slate-900/60 to-slate-950 p-8 md:p-10 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI CO-PILOT ACTIVE & WATCHING YOU</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Your Productivity Suite <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              Engineered for Perfection.
            </span>
          </h1>

          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Welcome to <strong className="text-slate-200">Vedhalam</strong> — the ultimate all-in-one cognitive assistant. Manage complex deliverables with our AI-driven Smart Notes or run full biometric symptom diagnostics with HealthCheck AI.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-800/80 text-xs font-mono text-slate-400">
            <div>
              <span className="text-slate-500 block">Task Efficiency</span>
              <span className="text-indigo-400 font-bold text-base">104.2%</span>
            </div>
            <div>
              <span className="text-slate-500 block">Cognitive Drift</span>
              <span className="text-emerald-400 font-bold text-base">0.00%</span>
            </div>
            <div>
              <span className="text-slate-500 block">Sanity Index</span>
              <span className="text-amber-400 font-bold text-base">Questionable</span>
            </div>
            <div>
              <span className="text-slate-500 block">System Integrity</span>
              <span className="text-purple-400 font-bold text-base">Vedhalam-Certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Feature Cards Section (Two Boxes) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-400" />
            <span>Core Productivity Modules</span>
          </h2>
          <span className="text-xs text-slate-500 font-mono">Select a feature to get started</span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Feature Box 1: Smart Notes */}
          <div
            onClick={() => onSelectView('notes')}
            className="group cursor-pointer glass-panel glass-panel-hover rounded-2xl p-7 flex flex-col justify-between border border-slate-800/80 hover:border-indigo-500/40 relative overflow-hidden transition-all duration-300"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-800 text-indigo-300 border border-indigo-500/20">
                  MODULE 01
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors flex items-center gap-2">
                  <span>Smart Notes Task Pad</span>
                </h3>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                  A sleek, high-precision task management interface with priority tags, due dates, and seamless automated cloud background state preservation.
                </p>
              </div>

              {/* Feature Highlights */}
              <div className="space-y-2 pt-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <span>Real-time task synchronization</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <span>Smart priority tag ordering</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Zero-delay background state saving</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
              <span>Open Smart Notes</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>

          {/* Feature Box 2: HealthCheck AI */}
          <div
            onClick={() => onSelectView('health')}
            className="group cursor-pointer glass-panel glass-panel-hover rounded-2xl p-7 flex flex-col justify-between border border-slate-800/80 hover:border-purple-500/40 relative overflow-hidden transition-all duration-300"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                  <Bot className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-800 text-purple-300 border border-purple-500/20">
                  MODULE 02
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors flex items-center gap-2">
                  <span>HealthCheck AI Terminal</span>
                </h3>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                  Advanced biometric diagnostic engine. Input physical symptoms to receive ultra-precise pseudo-clinical reports, risk scores, and therapeutic remedies.
                </p>
              </div>

              {/* Feature Highlights */}
              <div className="space-y-2 pt-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <span>Biometric particle symptom scanner</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <span>Pseudo-medical nomenclature engine</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span>Emergency "Press to Calm Down" Audio Audio node</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-purple-400 group-hover:text-purple-300">
              <span>Launch HealthCheck AI</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>

        </div>
      </div>

      {/* Footer Absurd Notice */}
      <div className="text-center text-xs text-slate-500 font-mono py-4 border-t border-slate-900">
        Vedhalam Enterprise Productivity Suite © 2026. All tasks subject to quantum fluctuation.
      </div>
    </div>
  );
};
