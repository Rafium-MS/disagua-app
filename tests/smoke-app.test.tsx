import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import App from '@/App'

describe('App smoke', () => {
  it('renders without crashing', () => {
    const { getByRole } = render(<App />)
    expect(getByRole('heading', { level: 1, name: 'Dashboard' })).toBeInTheDocument()
  })
})
