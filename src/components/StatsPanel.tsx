interface StatsPanelProps {
  total: number
  completed: number
  pending: number
  overdue: number
  progress: number
}

export const StatsPanel = ({ total, completed, pending, overdue, progress }: StatsPanelProps) => {
  return (
    <section className="panel" aria-label="Task statistics">
      <h2>Dashboard</h2>
      <div className="stats-grid">
        <article>
          <span>Total</span>
          <strong>{total}</strong>
        </article>
        <article>
          <span>Completed</span>
          <strong>{completed}</strong>
        </article>
        <article>
          <span>Pending</span>
          <strong>{pending}</strong>
        </article>
        <article>
          <span>Overdue</span>
          <strong>{overdue}</strong>
        </article>
      </div>
      <div className="progress-wrap" role="status" aria-label={`Completion progress ${progress}%`}>
        <div className="progress-label">
          <span>Progress</span>
          <strong>{progress}%</strong>
        </div>
        <div className="progress-bar" aria-hidden="true">
          <div style={{ width: `${progress}%` }} />
        </div>
      </div>
    </section>
  )
}
