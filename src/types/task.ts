export type TaskPriority = 'Low' | 'Medium' | 'High'

export interface Task {
  id: string
  title: string
  category: string
  priority: TaskPriority
  dueDate: string | null
  completed: boolean
  createdAt: string
  updatedAt: string
}

export type TaskSortOption =
  | 'created-desc'
  | 'created-asc'
  | 'due-asc'
  | 'due-desc'
  | 'priority-desc'
  | 'priority-asc'
  | 'title-asc'
