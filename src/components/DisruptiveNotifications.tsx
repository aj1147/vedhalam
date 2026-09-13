import React, { useState, useEffect } from 'react';
import { Bell, BatteryLow, X, Gamepad2 } from 'lucide-react';
import { MoviePosterModal, FAKE_MOVIES } from './MoviePosterModal';
import type { MoviePosterData } from './MoviePosterModal';
import { playSillySound } from '../utils/soundSynth';

export interface DisruptiveNotificationItem {
  id: string;
  type: 'prompt' | 'poll' | 'warning' | 'movie';
  title: string;
  message: string;
  options?: string[];
  iconType?: 'battery' | 'bell' | 'poll' | 'game';
}

const ABSURD_NOTIFICATIONS: Omit<DisruptiveNotificationItem, 'id'>[] = [
  {
    type: 'prompt',
    title: 'Productivity Vital Check',
    message: 'Are you breathing right now? Please confirm active oxygen intake.',
    options: ['Yes, breathing', 'Forgot how to']
  },
  {
    type: 'poll',
    title: 'Urgent Work Poll',
    message: 'Quick team survey: Cat or Horse?',
    options: ['🐈 Cat', '🐎 Horse', 'Both simultaneously']
  },
  {
    type: 'warning',
    title: 'Hardware Warning',
    message: 'WARNING: Low battery on your Smart Toothbrush (3%). Please dock immediately.',
    options: ['Dismiss', 'Buy 400 Toothbrushes'],
    iconType: 'battery'
  },
  {
    type: 'prompt',
    title: 'Cognitive Break Nudge',
    message: 'Should we play a game instead of finishing your tasks?',
    options: ['Let\'s Play!', 'No, I love work'],
    iconType: 'game'
  },
  {
    type: 'warning',
    title: 'Cloud Memory Warning',
    message: 'Storage full: Your subconscious is 99% filled with commercial jingles from 2008.',
    options: ['Clear Cache', 'Suffer']
  }
];

export const DisruptiveNotifications: React.FC = () => {
  const [currentNotification, setCurrentNotification] = useState<DisruptiveNotificationItem | null>(null);
  const [activeMovie, setActiveMovie] = useState<MoviePosterData | null>(null);

  useEffect(() => {
    // Fire disruptive notification every 22 seconds
    const interval = setInterval(() => {
      // 25% chance to trigger a movie poster popup!
      if (Math.random() < 0.3) {
        const randomMovie = FAKE_MOVIES[Math.floor(Math.random() * FAKE_MOVIES.length)];
        setActiveMovie(randomMovie);
        playSillySound('air_horn');
      } else {
        const template = ABSURD_NOTIFICATIONS[Math.floor(Math.random() * ABSURD_NOTIFICATIONS.length)];
        setCurrentNotification({
          ...template,
          id: Date.now().toString()
        });
        playSillySound('boing');
      }
    }, 22000);

    return () => clearInterval(interval);
  }, []);

  const handleDismiss = () => {
    setCurrentNotification(null);
  };

  const handleOptionClick = (option: string) => {
    playSillySound('duck_quack');
    alert(`Vedhalam Response Logged: "${option}". Thank you for your obedience.`);
    setCurrentNotification(null);
  };

  return (
    <>
      {/* Fake Movie Poster Modal */}
      {activeMovie && (
        <MoviePosterModal
          movie={activeMovie}
          onClose={() => setActiveMovie(null)}
        />
      )}

      {/* Center Toast Notification Popup */}
      {currentNotification && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-md animate-fadeIn">
          <div className="glass-panel rounded-2xl p-5 border border-indigo-500/40 shadow-2xl bg-slate-900/95 space-y-4">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
                {currentNotification.iconType === 'battery' ? (
                  <BatteryLow className="w-4 h-4 text-rose-400 animate-pulse" />
                ) : currentNotification.iconType === 'game' ? (
                  <Gamepad2 className="w-4 h-4 text-purple-400" />
                ) : (
                  <Bell className="w-4 h-4 text-indigo-400" />
                )}
                <span className="font-bold tracking-wider">{currentNotification.title}</span>
              </div>

              <button
                onClick={handleDismiss}
                className="text-slate-500 hover:text-slate-300 transition-colors p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message Body */}
            <p className="text-sm font-medium text-white leading-relaxed">
              {currentNotification.message}
            </p>

            {/* Option Buttons */}
            {currentNotification.options && (
              <div className="flex flex-wrap gap-2 pt-1">
                {currentNotification.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleOptionClick(opt)}
                    className="flex-1 min-w-[120px] py-2 px-3 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/30 text-indigo-200 text-xs font-semibold transition-all text-center"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
