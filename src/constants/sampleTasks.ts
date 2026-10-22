import type { Task } from '../types/task'

const now = new Date().toISOString()

export const SAMPLE_TASKS: Task[] = [
  {
    id: 'sample-1',
    title: 'Review sprint goals',
    category: 'Planning',
    priority: 'High',
    dueDate: new Date(Date.now() + 86_400_000).toISOString().slice(0, 10),
    completed: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'sample-2',
    title: 'Refine onboarding checklist',
    category: 'Team',
    priority: 'Medium',
    dueDate: new Date(Date.now() + 2 * 86_400_000).toISOString().slice(0, 10),
    completed: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'sample-3',
    title: 'Archive completed release notes',
    category: 'Documentation',
    priority: 'Low',
    dueDate: new Date(Date.now() - 86_400_000).toISOString().slice(0, 10),
    completed: true,
    createdAt: now,
    updatedAt: now,
  },
]
