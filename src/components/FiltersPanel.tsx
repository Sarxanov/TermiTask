import type { Task, TaskSortOption } from '../types/task'

interface FiltersPanelProps {
  query: string
  status: 'all' | 'pending' | 'completed' | 'overdue'
  priority: 'all' | Task['priority']
  category: string
  sort: TaskSortOption
  categories: string[]
  onChange: (patch: Partial<FiltersPanelProps>) => void
  searchInputRef: React.RefObject<HTMLInputElement | null>
}

export const FiltersPanel = ({ query, status, priority, category, sort, categories, onChange, searchInputRef }: FiltersPanelProps) => {
  return (
    <section className="panel" aria-label="Search and filters">
      <h2>Search, Filters & Sorting</h2>
      <div className="filters-grid">
        <label>
          <span>Search tasks</span>
          <input
            ref={searchInputRef}
            type="search"
            placeholder="Search by title or category"
            value={query}
            onChange={(event) => onChange({ query: event.target.value })}
          />
        </label>

        <label>
          <span>Status</span>
          <select value={status} onChange={(event) => onChange({ status: event.target.value as FiltersPanelProps['status'] })}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
        </label>

        <label>
          <span>Priority</span>
          <select value={priority} onChange={(event) => onChange({ priority: event.target.value as FiltersPanelProps['priority'] })}>
            <option value="all">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </label>

        <label>
          <span>Category</span>
          <select value={category} onChange={(event) => onChange({ category: event.target.value })}>
            <option value="all">All categories</option>
            {categories.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Sort by</span>
          <select value={sort} onChange={(event) => onChange({ sort: event.target.value as TaskSortOption })}>
            <option value="created-desc">Newest first</option>
            <option value="created-asc">Oldest first</option>
            <option value="due-asc">Due date (soonest)</option>
            <option value="due-desc">Due date (latest)</option>
            <option value="priority-desc">Priority (high to low)</option>
            <option value="priority-asc">Priority (low to high)</option>
            <option value="title-asc">Title (A-Z)</option>
          </select>
        </label>
      </div>
    </section>
  )
}
