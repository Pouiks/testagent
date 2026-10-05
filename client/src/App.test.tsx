import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from './App'
import { navItems } from '@/lib/nav-items'

describe('App', () => {
  it('renders a sidebar with 5 independent menu buttons', () => {
    render(<App />)

    expect(navItems).toHaveLength(5)
    for (const item of navItems) {
      expect(
        screen.getByRole('link', { name: item.title }),
      ).toBeInTheDocument()
    }
  })

  it('shows the dashboard page by default', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: 'Tableau de bord' }),
    ).toBeInTheDocument()
  })

  it.each(navItems.filter((item) => item.url !== '/'))(
    'navigates to its own dedicated page when clicking "$title"',
    async (item) => {
      const user = userEvent.setup()
      render(<App />)

      await user.click(screen.getByRole('link', { name: item.title }))

      expect(
        screen.getByRole('heading', { name: item.title }),
      ).toBeInTheDocument()
    },
  )
})
