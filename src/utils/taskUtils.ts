import type { Task, TaskSortOption } from '../types/task'
import { isOverdue } from './date'

const priorityRank: Record<Task['priority'], number> = {
  High: 3,
  Medium: 2,
  Low: 1,
}

export interface TaskFilters {
  query: string
  status: 'all' | 'pending' | 'completed' | 'overdue'
  priority: 'all' | Task['priority']
  category: string
  sort: TaskSortOption
}

export const applyTaskFilters = (tasks: Task[], filters: TaskFilters): Task[] => {
  const query = filters.query.trim().toLowerCase()

  const filtered = tasks.filter((task) => {
    if (query) {
      const searchable = `${task.title} ${task.category}`.toLowerCase()
      if (!searchable.includes(query)) {
        return false
      }
    }

    if (filters.status === 'pending' && task.completed) {
      return false
    }

    if (filters.status === 'completed' && !task.completed) {
      return false
    }

    if (filters.status === 'overdue' && !isOverdue(task.dueDate, task.completed)) {
      return false
    }

    if (filters.priority !== 'all' && task.priority !== filters.priority) {
      return false
    }

    if (filters.category !== 'all' && task.category !== filters.category) {
      return false
    }

    return true
  })

  return filtered.sort((a, b) => {
    switch (filters.sort) {
      case 'created-asc':
        return a.createdAt.localeCompare(b.createdAt)
      case 'created-desc':
        return b.createdAt.localeCompare(a.createdAt)
      case 'due-asc': {
        const av = a.dueDate ?? '9999-12-31'
        const bv = b.dueDate ?? '9999-12-31'
        return av.localeCompare(bv)
      }
      case 'due-desc': {
        const av = a.dueDate ?? '0000-00-00'
        const bv = b.dueDate ?? '0000-00-00'
        return bv.localeCompare(av)
      }
      case 'priority-desc':
        return priorityRank[b.priority] - priorityRank[a.priority]
      case 'priority-asc':
        return priorityRank[a.priority] - priorityRank[b.priority]
      case 'title-asc':
        return a.title.localeCompare(b.title)
      default:
        return 0
    }
  })
}

export const getTaskStats = (tasks: Task[]) => {
  const total = tasks.length
  const completed = tasks.filter((task) => task.completed).length
  const pending = total - completed
  const overdue = tasks.filter((task) => isOverdue(task.dueDate, task.completed)).length

  return {
    total,
    completed,
    pending,
    overdue,
    progress: total > 0 ? Math.round((completed / total) * 100) : 0,
  }
}
