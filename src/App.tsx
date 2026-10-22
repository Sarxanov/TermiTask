import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { FiltersPanel } from './components/FiltersPanel'
import { ShortcutHelp } from './components/ShortcutHelp'
import { StatsPanel } from './components/StatsPanel'
import { TaskForm } from './components/TaskForm'
import { TaskList } from './components/TaskList'
import type { Task, TaskSortOption } from './types/task'
import { clearDemoData, loadTasks, saveTasks } from './utils/storage'
import { applyTaskFilters, getTaskStats } from './utils/taskUtils'

const createTask = (input: {
  title: string
  category: string
  priority: Task['priority']
  dueDate: string | null
}): Task => {
  const now = new Date().toISOString()
  return {
    id: crypto.randomUUID(),
    title: input.title,
    category: input.category,
    priority: input.priority,
    dueDate: input.dueDate,
    completed: false,
    createdAt: now,
    updatedAt: now,
  }
}

function App() {
  type FiltersState = {
    query: string
    status: 'all' | 'pending' | 'completed' | 'overdue'
    priority: 'all' | Task['priority']
    category: string
    sort: TaskSortOption
  }

  const [tasks, setTasks] = useState<Task[]>([])
  const [message, setMessage] = useState<string | null>(null)
  const [filters, setFilters] = useState<FiltersState>({
    query: '',
    status: 'all',
    priority: 'all',
    category: 'all',
    sort: 'created-desc',
  })

  const titleInputRef = useRef<HTMLInputElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const { tasks: loadedTasks, error } = loadTasks()
    setTasks(loadedTasks)
    if (error) {
      setMessage(error)
    }
  }, [])

  useEffect(() => {
    const handleKeyboardShortcuts = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const isTextInput = target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.tagName === 'SELECT'

      if (event.key.toLowerCase() === 'n' && !isTextInput) {
        event.preventDefault()
        titleInputRef.current?.focus()
      }

      if (event.key === '/' && !isTextInput) {
        event.preventDefault()
        searchInputRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyboardShortcuts)
    return () => window.removeEventListener('keydown', handleKeyboardShortcuts)
  }, [])

  const persist = (nextTasks: Task[]) => {
    setTasks(nextTasks)
    const storageError = saveTasks(nextTasks)
    setMessage(storageError)
  }

  const visibleTasks = useMemo(() => applyTaskFilters(tasks, filters), [tasks, filters])
  const categories = useMemo(() => Array.from(new Set(tasks.map((task) => task.category))).sort(), [tasks])
  const stats = useMemo(() => getTaskStats(tasks), [tasks])

  const handleDelete = (id: string) => {
    if (!window.confirm('Delete this task permanently?')) {
      return
    }
    persist(tasks.filter((task) => task.id !== id))
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <h1>TermiTask</h1>
          <p className="subtitle">Terminal-inspired productivity dashboard with resilient local persistence.</p>
        </div>
        <button
          type="button"
          className="btn-muted"
          onClick={() => {
            if (!window.confirm('Clear all demo/task data from local storage?')) {
              return
            }

            setTasks([])
            const error = clearDemoData()
            setMessage(error)
          }}
        >
          Clear demo data
        </button>
      </header>

      {message ? <p className="system-message">{message}</p> : null}

      <section className="panel">
        <h2>Add task</h2>
        <TaskForm
          titleInputRef={titleInputRef}
          submitLabel="Add task"
          onSubmit={(taskInput) => {
            persist([createTask(taskInput), ...tasks])
          }}
        />
      </section>

      <div className="layout-grid">
        <aside className="sidebar-stack">
          <StatsPanel {...stats} />
          <ShortcutHelp />
        </aside>

        <section className="content-stack">
          <FiltersPanel
            categories={categories}
            searchInputRef={searchInputRef}
            {...filters}
            onChange={(patch) => setFilters((current) => ({ ...current, ...patch }))}
          />

          <TaskList
            tasks={visibleTasks}
            onToggle={(id) => {
              const next = tasks.map((task) =>
                task.id === id
                  ? {
                      ...task,
                      completed: !task.completed,
                      updatedAt: new Date().toISOString(),
                    }
                  : task,
              )
              persist(next)
            }}
            onDelete={handleDelete}
            onUpdate={(id, patch) => {
              const next = tasks.map((task) =>
                task.id === id
                  ? {
                      ...task,
                      ...patch,
                      updatedAt: new Date().toISOString(),
                    }
                  : task,
              )
              persist(next)
            }}
          />
        </section>
      </div>
    </main>
  )
}

export default App
