import { SAMPLE_TASKS } from '../constants/sampleTasks'
import type { Task } from '../types/task'

const TASKS_KEY = 'termitask.tasks'
const DEMO_SEEDED_KEY = 'termitask.demoSeeded'

export interface StorageResult {
  tasks: Task[]
  error: string | null
}

const isTask = (value: unknown): value is Task => {
  if (!value || typeof value !== 'object') {
    return false
  }

  const maybeTask = value as Record<string, unknown>
  return (
    typeof maybeTask.id === 'string' &&
    typeof maybeTask.title === 'string' &&
    typeof maybeTask.category === 'string' &&
    (maybeTask.priority === 'Low' || maybeTask.priority === 'Medium' || maybeTask.priority === 'High') &&
    (typeof maybeTask.dueDate === 'string' || maybeTask.dueDate === null) &&
    typeof maybeTask.completed === 'boolean' &&
    typeof maybeTask.createdAt === 'string' &&
    typeof maybeTask.updatedAt === 'string'
  )
}

export const loadTasks = (): StorageResult => {
  try {
    const raw = localStorage.getItem(TASKS_KEY)
    if (!raw) {
      const seeded = localStorage.getItem(DEMO_SEEDED_KEY)
      if (!seeded) {
        localStorage.setItem(TASKS_KEY, JSON.stringify(SAMPLE_TASKS))
        localStorage.setItem(DEMO_SEEDED_KEY, 'true')
        return { tasks: SAMPLE_TASKS, error: null }
      }
      return { tasks: [], error: null }
    }

    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return { tasks: [], error: 'Stored task data was invalid and has been reset.' }
    }

    const sanitized = parsed.filter(isTask)
    if (sanitized.length !== parsed.length) {
      return { tasks: sanitized, error: 'Some invalid task data was ignored.' }
    }

    return { tasks: sanitized, error: null }
  } catch {
    return { tasks: [], error: 'Could not read saved tasks from local storage.' }
  }
}

export const saveTasks = (tasks: Task[]): string | null => {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks))
    localStorage.setItem(DEMO_SEEDED_KEY, 'true')
    return null
  } catch {
    return 'Could not save tasks. Your browser storage may be unavailable.'
  }
}

export const clearDemoData = (): string | null => {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify([]))
    localStorage.setItem(DEMO_SEEDED_KEY, 'true')
    return null
  } catch {
    return 'Could not clear demo data due to storage limitations.'
  }
}
