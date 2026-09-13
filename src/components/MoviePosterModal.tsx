import React from 'react';
import { Film, X, Play, Star } from 'lucide-react';

export interface MoviePosterData {
  title: string;
  tagline: string;
  cast: string;
  genre: string;
  rating: string;
  bgGradient: string;
}

export const FAKE_MOVIES: MoviePosterData[] = [
  {
    title: "THE ACCOUNTABLE",
    tagline: "The columns will be balanced. By force.",
    cast: "Starring Chris Pratt as an Excel Spreadsheet & Morgan Freeman as VLOOKUP",
    genre: "Financial Thriller / Sci-Fi",
    rating: "9.8 / 10 Rotten Tomatoes",
    bgGradient: "from-blue-900 via-indigo-950 to-slate-950"
  },
  {
    title: "FAST & SERIOUS 12: TAX AUDIT",
    tagline: "Family doesn't deduct quarterlies.",
    cast: "Vin Diesel vs. The Internal Revenue Service",
    genre: "Action / Bureaucracy",
    rating: "100% Critical Acclaim",
    bgGradient: "from-rose-950 via-slate-900 to-amber-950"
  },
  {
    title: "INCEPTION 2: DEEP SLEEP MODE",
    tagline: "Your alarm ringtone is playing across 5 dream layers.",
    cast: "Leonardo DiCaprio as a Snooze Button",
    genre: "Psychological Horror",
    rating: "Mind Bending",
    bgGradient: "from-purple-950 via-slate-950 to-indigo-950"
  },
  {
    title: "THE MORNING STANDUP",
    tagline: "What did you do yesterday? What will you do today? Why is everyone mute?",
    cast: "An Ensemble Cast of Silent Zoom Avatars",
    genre: "Existential Horror",
    rating: "4.9 / 5 Stars",
    bgGradient: "from-emerald-950 via-slate-950 to-teal-950"
  }
];

interface MoviePosterModalProps {
  movie: MoviePosterData;
  onClose: () => void;
}

export const MoviePosterModal: React.FC<MoviePosterModalProps> = ({ movie, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg animate-fadeIn">
      <div
        className={`relative w-full max-w-xl rounded-3xl overflow-hidden border border-slate-700 shadow-2xl bg-gradient-to-b ${movie.bgGradient} p-8 space-y-6 text-white`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Poster Header Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono">
          <Film className="w-3.5 h-3.5" />
          <span>VEDHALAM CINEMA PRESENTS • PREMIERE POPUP</span>
        </div>

        {/* Movie Title & Tagline */}
        <div className="space-y-2">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase bg-gradient-to-r from-white via-slate-200 to-amber-200 bg-clip-text text-transparent">
            {movie.title}
          </h2>
          <p className="text-lg italic font-light text-amber-300">
            "{movie.tagline}"
          </p>
        </div>

        {/* Cast & Specs */}
        <div className="space-y-2 text-xs font-mono text-slate-300 border-t border-b border-white/10 py-4">
          <p><strong className="text-white">Cast:</strong> {movie.cast}</p>
          <p><strong className="text-white">Genre:</strong> {movie.genre}</p>
          <p className="flex items-center gap-1.5 text-amber-400 font-bold">
            <Star className="w-4 h-4 fill-amber-400" />
            <span>{movie.rating}</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => {
              alert("Streaming starting in 0.0 seconds... Just kidding, get back to work!");
              onClose();
            }}
            className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 transition-all"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>Watch Full Movie (Free 4K)</span>
          </button>

          <button
            onClick={onClose}
            className="py-3 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-700 transition-all"
          >
            Ignore & Continue Working
          </button>
        </div>
      </div>
    </div>
  );
};
