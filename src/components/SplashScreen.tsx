import React, { useEffect, useState } from 'react';
import { Cpu } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [fade, setFade] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setFade(true), 300);
          setTimeout(onComplete, 900);
          return 100;
        }
        return prev + 5;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07090e] transition-opacity duration-700 ${
        fade ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute w-80 h-80 bg-purple-600/10 rounded-full blur-3xl -bottom-10 -right-10 pointer-events-none" />

      <div className="relative z-10 text-center max-w-lg px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono mb-6 tracking-wide">
          <Cpu className="w-3.5 h-3.5 animate-spin" />
          <span>INITIALIZING QUANTUM SUITE v4.0.2</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-3">
          <span className="bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
            Vedhalam
          </span>
        </h1>

        <p className="text-slate-400 text-lg font-light tracking-wide mb-8">
          Your ultimate <span className="font-semibold text-indigo-400 tracking-wider">USEFULL</span> companion.
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-slate-900 border border-slate-800/80 rounded-full h-2 overflow-hidden mb-4 p-0.5">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-slate-500">
          <span>Loading brain sabotage protocols...</span>
          <span>{progress}%</span>
        </div>

        <button
          onClick={() => {
            setFade(true);
            setTimeout(onComplete, 400);
          }}
          className="mt-8 text-xs text-slate-400 hover:text-slate-200 underline decoration-slate-600 underline-offset-4 transition-colors"
        >
          Skip Intro & Enter Workspace
        </button>
      </div>
    </div>
  );
};
