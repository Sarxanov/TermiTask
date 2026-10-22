import { describe, expect, it } from 'vitest'
import type { Task } from '../types/task'
import { applyTaskFilters, getTaskStats } from './taskUtils'

const baseTasks: Task[] = [
  {
    id: '1',
    title: 'Alpha task',
    category: 'Work',
    priority: 'High',
    dueDate: '2099-01-01',
    completed: false,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    title: 'Beta task',
    category: 'Home',
    priority: 'Low',
    dueDate: null,
    completed: true,
    createdAt: '2025-01-02T00:00:00.000Z',
    updatedAt: '2025-01-02T00:00:00.000Z',
  },
]

describe('applyTaskFilters', () => {
  it('filters by query and status', () => {
    const result = applyTaskFilters(baseTasks, {
      query: 'alpha',
      status: 'pending',
      priority: 'all',
      category: 'all',
      sort: 'created-desc',
    })

    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('1')
  })
})

describe('getTaskStats', () => {
  it('returns summary counts and progress', () => {
    const stats = getTaskStats(baseTasks)
    expect(stats.total).toBe(2)
    expect(stats.completed).toBe(1)
    expect(stats.pending).toBe(1)
    expect(stats.progress).toBe(50)
  })
})
