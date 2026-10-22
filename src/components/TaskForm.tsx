import { useState } from 'react'
import type { Task, TaskPriority } from '../types/task'
import { isValidDateInput } from '../utils/date'

interface TaskFormProps {
  onSubmit: (task: { title: string; category: string; priority: TaskPriority; dueDate: string | null }) => void
  submitLabel: string
  initialValue?: Pick<Task, 'title' | 'category' | 'priority' | 'dueDate'>
  onCancel?: () => void
  titleInputRef?: React.RefObject<HTMLInputElement | null>
}

const EMPTY_FORM = {
  title: '',
  category: '',
  priority: 'Medium' as TaskPriority,
  dueDate: '',
}

export const TaskForm = ({ onSubmit, submitLabel, initialValue, onCancel, titleInputRef }: TaskFormProps) => {
  const [title, setTitle] = useState(initialValue?.title ?? EMPTY_FORM.title)
  const [category, setCategory] = useState(initialValue?.category ?? EMPTY_FORM.category)
  const [priority, setPriority] = useState<TaskPriority>(initialValue?.priority ?? EMPTY_FORM.priority)
  const [dueDate, setDueDate] = useState(initialValue?.dueDate ?? EMPTY_FORM.dueDate)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!title.trim()) {
      setError('Task title is required.')
      return
    }

    if (!category.trim()) {
      setError('Category is required.')
      return
    }

    if (!isValidDateInput(dueDate)) {
      setError('Due date must use a valid YYYY-MM-DD value.')
      return
    }

    setError(null)
    onSubmit({
      title: title.trim(),
      category: category.trim(),
      priority,
      dueDate: dueDate || null,
    })

    if (!initialValue) {
      setTitle(EMPTY_FORM.title)
      setCategory(EMPTY_FORM.category)
      setPriority(EMPTY_FORM.priority)
      setDueDate(EMPTY_FORM.dueDate)
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form-grid">
        <label>
          <span>Task title</span>
          <input
            ref={titleInputRef}
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Add a task"
            required
          />
        </label>

        <label>
          <span>Category</span>
          <input
            name="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            placeholder="Work, Personal, Study..."
            required
          />
        </label>

        <label>
          <span>Priority</span>
          <select name="priority" value={priority} onChange={(event) => setPriority(event.target.value as TaskPriority)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>

        <label>
          <span>Due date</span>
          <input type="date" name="dueDate" value={dueDate ?? ''} onChange={(event) => setDueDate(event.target.value)} />
        </label>
      </div>

      {error ? <p className="inline-error">{error}</p> : null}

      <div className="task-form-actions">
        <button type="submit">{submitLabel}</button>
        {onCancel ? (
          <button type="button" className="btn-muted" onClick={onCancel}>
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  )
}
