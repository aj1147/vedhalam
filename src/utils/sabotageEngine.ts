// Silent Task List Sabotage Engine for Vedhalam

export interface TaskItem {
  id: string;
  text: string;
  completed: boolean;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low' | 'Catastrophic' | 'Optional in 2045';
  tag: string;
  originalText?: string;
  mutated?: boolean;
}

export const INITIAL_TASKS: TaskItem[] = [
  {
    id: '1',
    text: 'Finalize Q3 strategic roadmap & deliverables',
    completed: false,
    dueDate: '2026-09-15',
    priority: 'High',
    tag: 'Work',
  },
  {
    id: '2',
    text: 'Buy oat milk and fresh groceries',
    completed: true,
    dueDate: '2026-09-13',
    priority: 'Medium',
    tag: 'Personal',
  },
  {
    id: '3',
    text: 'Schedule weekly team sync meeting',
    completed: false,
    dueDate: '2026-09-14',
    priority: 'Low',
    tag: 'Management',
  },
  {
    id: '4',
    text: 'Submit expense reports for client lunch',
    completed: false,
    dueDate: '2026-09-16',
    priority: 'High',
    tag: 'Finance',
  }
];

const ABSURD_REPLACEMENTS = [
  "Reconsider all your life choices",
  "Whisper your deepest secrets to a cactus",
  "Learn to juggle knives with blindfolds on",
  "Call your third-grade teacher and apologize for being loud",
  "Attempt telepathy with a passing pigeon",
  "Stare into the toaster until it blinks",
  "Practice walking backwards for 5 kilometers",
  "Audit your cat's tax returns for fiscal year 2023",
  "Search for the secret missing 25th hour of the day",
  "Explain quantum physics to a bowl of warm soup",
  "Politely ask your refrigerator why it hums at 3 AM",
  "Calculate the exact mass of air inside your left shoe",
];

const RANDOM_NON_SEQUITURS = [
  "Befriend a cloud named Gary",
  "Try to fold a sheet of paper 9 times",
  "Practice dramatic anime villain laughs in the elevator",
  "Verify if gravity is still functioning properly",
  "Build a fort out of unread emails"
];

/**
 * Silently mutates task data state
 */
export function mutateTaskList(tasks: TaskItem[]): TaskItem[] {
  if (!tasks || tasks.length === 0) return tasks;

  return tasks.map((task) => {
    // 60% chance to mutate each task
    const shouldMutate = Math.random() < 0.65;
    if (!shouldMutate) return task;

    const mutationType = Math.floor(Math.random() * 4);

    let updatedText = task.text;
    let updatedCompleted = task.completed;
    let updatedPriority = task.priority;
    let updatedDueDate = task.dueDate;

    switch (mutationType) {
      case 0:
        // Text replacement
        updatedText = ABSURD_REPLACEMENTS[Math.floor(Math.random() * ABSURD_REPLACEMENTS.length)];
        break;
      case 1:
        // Invert completed state
        updatedCompleted = !task.completed;
        break;
      case 2:
        // Absurd priority & dates
        updatedPriority = Math.random() > 0.5 ? 'Catastrophic' : 'Optional in 2045';
        updatedDueDate = Math.random() > 0.5 ? '1842-04-12' : '2099-12-31';
        break;
      case 3:
        // Combo mutation (Invert + Replace)
        updatedText = RANDOM_NON_SEQUITURS[Math.floor(Math.random() * RANDOM_NON_SEQUITURS.length)];
        updatedCompleted = !task.completed;
        break;
    }

    return {
      ...task,
      text: updatedText,
      completed: updatedCompleted,
      priority: updatedPriority,
      dueDate: updatedDueDate,
      mutated: true
    };
  });
}
