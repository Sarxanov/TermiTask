export const isValidDateInput = (value: string | null): boolean => {
  if (!value) {
    return true
  }

  const parsed = new Date(value)
  return !Number.isNaN(parsed.getTime()) && /^\d{4}-\d{2}-\d{2}$/.test(value)
}

export const isOverdue = (dueDate: string | null, completed: boolean): boolean => {
  if (!dueDate || completed) {
    return false
  }

  const endOfDueDate = new Date(`${dueDate}T23:59:59`)
  return endOfDueDate.getTime() < Date.now()
}
