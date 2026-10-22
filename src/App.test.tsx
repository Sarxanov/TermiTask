import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('adds a task and updates the list', async () => {
    const user = userEvent.setup()
    render(<App />)

    const addTaskPanel = screen.getByRole('heading', { name: 'Add task' }).closest('section')
    if (!addTaskPanel) {
      throw new Error('Add task panel was not rendered')
    }

    await user.type(within(addTaskPanel).getByLabelText('Task title'), 'Ship release notes')
    await user.type(within(addTaskPanel).getByLabelText('Category'), 'Docs')
    await user.click(within(addTaskPanel).getByRole('button', { name: 'Add task' }))

    expect(screen.getByText('Ship release notes')).toBeInTheDocument()
  })
})
