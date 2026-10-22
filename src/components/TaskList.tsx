import { useState } from 'react'
import type { Task } from '../types/task'
import { isOverdue } from '../utils/date'
import { TaskForm } from './TaskForm'

interface TaskListProps {
  tasks: Task[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, patch: { title: string; category: string; priority: Task['priority']; dueDate: string | null }) => void
}

export const TaskList = ({ tasks, onToggle, onDelete, onUpdate }: TaskListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null)

  if (tasks.length === 0) {
    return (
      <section className="panel" aria-live="polite">
        <h2>Tasks</h2>
        <p className="empty-state">No tasks match the current filters. Add a task or adjust filters to continue.</p>
      </section>
    )
  }

  return (
    <section className="panel" aria-live="polite">
      <h2>Tasks</h2>
      <ul className="task-list">
        {tasks.map((task) => {
          const overdue = isOverdue(task.dueDate, task.completed)
          const isEditing = editingId === task.id

          return (
            <li key={task.id} className={task.completed ? 'task task-completed' : 'task'}>
              {isEditing ? (
                <TaskForm
                  submitLabel="Save changes"
                  onCancel={() => setEditingId(null)}
                  initialValue={task}
                  onSubmit={(patch) => {
                    onUpdate(task.id, patch)
                    setEditingId(null)
                  }}
                />
              ) : (
                <>
                  <div className="task-top-row">
                    <h3>{task.title}</h3>
                    <span className={`priority priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
                  </div>
                  <p className="task-meta">
                    <span>Category: {task.category}</span>
                    <span>Due: {task.dueDate ?? 'No due date'}</span>
                    {overdue ? <span className="overdue-pill">Overdue</span> : null}
                    {task.completed ? <span className="restored-pill">Completed</span> : null}
                  </p>

                  <div className="task-actions">
                    <button type="button" onClick={() => onToggle(task.id)}>
                      {task.completed ? 'Restore' : 'Complete'}
                    </button>
                    <button type="button" className="btn-muted" onClick={() => setEditingId(task.id)}>
                      Edit
                    </button>
                    <button type="button" className="btn-danger" onClick={() => onDelete(task.id)}>
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
