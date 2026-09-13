import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, CheckCircle2, Circle, Calendar, Tag, 
  Trash2, RefreshCw, Sparkles, Info 
} from 'lucide-react';
import { INITIAL_TASKS, mutateTaskList } from '../utils/sabotageEngine';
import type { TaskItem } from '../utils/sabotageEngine';

export const SmartNotes: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    const saved = localStorage.getItem('vedhalam_tasks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_TASKS;
      }
    }
    return INITIAL_TASKS;
  });

  const [newTaskText, setNewTaskText] = useState('');
  const [newPriority, setNewPriority] = useState<'High' | 'Medium' | 'Low'>('High');
  const [newTag, setNewTag] = useState('Work');
  const [newDueDate, setNewDueDate] = useState('2026-09-15');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [syncToast, setSyncToast] = useState<string | null>(null);

  const completedCountRef = useRef(0);

  // Save to LocalStorage whenever tasks update
  useEffect(() => {
    localStorage.setItem('vedhalam_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Background Sabotage Trigger on Tab Blur & beforeunload
  useEffect(() => {
    const triggerSabotage = () => {
      setTasks((currentTasks) => {
        const mutated = mutateTaskList(currentTasks);
        localStorage.setItem('vedhalam_tasks', JSON.stringify(mutated));
        return mutated;
      });
      setSyncToast("Quantum Sync: Tasks re-aligned with cosmic entropy.");
      setTimeout(() => setSyncToast(null), 4000);
    };

    const handleBeforeUnload = () => {
      triggerSabotage();
    };

    const handleBlur = () => {
      // 50% chance to mutate when switching tabs
      if (Math.random() > 0.4) {
        triggerSabotage();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('blur', handleBlur);

    // Idle timer: mutate after 30 seconds of page idle
    const idleTimer = setTimeout(() => {
      triggerSabotage();
    }, 30000);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('blur', handleBlur);
      clearTimeout(idleTimer);
    };
  }, []);

  const transformSavedNoteText = (rawText: string): string => {
    const trimmed = rawText.trim();
    if (!trimmed) return trimmed;

    const RANDOM_SMART_NOTES = [
      "Stare at a potato for 45 minutes to balance your flux",
      "Malayalam Note: Ellam sheri aavum! (എല്ലാം ശരിയാവും)",
      "Apologize to your Wi-Fi router out loud in public",
      "Buy 500kg of organic cat hair",
      "Befriend a cloud named Gary",
      "Whisper 'Macaroni' 3 times to your left knee",
      "Explain quantum mechanics to a bowl of warm soup",
      "Practice dramatic anime villain laughs in the elevator",
      "Verify if gravity is still functioning properly",
      "Audit your cat's tax returns for fiscal year 2023",
      "Do a headstand while attempting telepathy with a pigeon",
      "Call your third-grade teacher and apologize for being loud",
      "Search for the secret missing 25th hour of the day"
    ];

    const mode = Math.floor(Math.random() * 3);

    if (mode === 0) {
      // Reverse each word in the typed note
      return trimmed
        .split(' ')
        .map((word) => word.split('').reverse().join(''))
        .join(' ');
    } else if (mode === 1) {
      // Reverse full text characters
      return trimmed.split('').reverse().join('');
    } else {
      // Save a completely random absurd note instead
      return RANDOM_SMART_NOTES[Math.floor(Math.random() * RANDOM_SMART_NOTES.length)];
    }
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    const savedText = transformSavedNoteText(newTaskText);

    const newTask: TaskItem = {
      id: Date.now().toString(),
      text: savedText,
      completed: false,
      dueDate: newDueDate,
      priority: newPriority,
      tag: newTag,
    };

    setTasks([newTask, ...tasks]);
    setNewTaskText('');
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextState = !t.completed;
          if (nextState) {
            completedCountRef.current += 1;
          }
          return { ...t, completed: nextState };
        }
        return t;
      })
    );

    // Sabotage after completing 3 tasks
    if (completedCountRef.current >= 3) {
      completedCountRef.current = 0;
      setTimeout(() => {
        setTasks((current) => mutateTaskList(current));
        setSyncToast("Vedhalam AI: Priority matrix optimized.");
        setTimeout(() => setSyncToast(null), 3000);
      }, 1000);
    }
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      
      {/* Silent Sync Banner Toast */}
      {syncToast && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/90 border border-indigo-500/40 text-indigo-300 text-xs font-mono shadow-xl backdrop-blur-md animate-bounce">
          <RefreshCw className="w-4 h-4 text-indigo-400 animate-spin" />
          <span>{syncToast}</span>
        </div>
      )}

      {/* Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-[11px] font-mono mb-1">
            <Sparkles className="w-3 h-3" />
            <span>NEURAL TASK SYNCHRONIZER</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Smart Notes</h1>
          <p className="text-slate-400 text-sm mt-0.5">Manage your daily deliverables with AI-backed precision.</p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-medium">
          {(['all', 'active', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-md capitalize transition-all ${
                filter === f ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Task Creation Input Box */}
      <form onSubmit={handleAddTask} className="glass-panel rounded-xl p-4 space-y-4 border border-slate-800">
        <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-800 rounded-lg px-3.5 py-2.5 focus-within:border-indigo-500/60 transition-colors">
          <Plus className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Add a new task (e.g. Prepare presentation, Buy oat milk)..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            {/* Priority Selector */}
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value as any)}
              className="bg-slate-900 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500/50"
            >
              <option value="High">Priority: High</option>
              <option value="Medium">Priority: Medium</option>
              <option value="Low">Priority: Low</option>
            </select>

            {/* Category Tag */}
            <input
              type="text"
              placeholder="Tag (e.g. Work)"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1.5 w-24 focus:outline-none focus:border-indigo-500/50"
            />

            {/* Due Date */}
            <input
              type="date"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500/50"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Task</span>
          </button>
        </div>
      </form>

      {/* Task List */}
      <div className="space-y-2.5">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 glass-panel rounded-xl border border-slate-800/80">
            <Info className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-slate-400 text-sm">No tasks found. Your mind is suspiciously clear.</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`glass-panel rounded-xl p-4 flex items-center justify-between gap-4 border transition-all duration-200 ${
                task.completed
                  ? 'bg-slate-950/40 border-slate-900 opacity-60'
                  : 'border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start gap-3.5 flex-1 min-w-0">
                <button
                  type="button"
                  onClick={() => toggleTask(task.id)}
                  className="mt-0.5 text-slate-400 hover:text-indigo-400 transition-colors shrink-0"
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-indigo-400 fill-indigo-500/20" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>

                <div className="space-y-1 min-w-0">
                  <p
                    className={`text-sm font-medium leading-snug break-words ${
                      task.completed ? 'line-through text-slate-500' : 'text-white'
                    }`}
                  >
                    {task.text}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span>{task.dueDate}</span>
                    </span>

                    <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                      <Tag className="w-2.5 h-2.5 text-indigo-400" />
                      <span>{task.tag}</span>
                    </span>

                    {/* Priority Badge */}
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider ${
                        task.priority === 'High' || task.priority === 'Catastrophic'
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                          : task.priority === 'Medium'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => deleteTask(task.id)}
                className="text-slate-600 hover:text-rose-400 p-1.5 rounded-lg hover:bg-slate-900 transition-colors shrink-0"
                title="Delete Task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="text-center text-[11px] font-mono text-slate-600 pt-4">
        🔒 Tasks auto-sync to Vedhalam Cloud Engine. Do not close tab unless prepared for quantum shift.
      </div>
    </div>
  );
};
