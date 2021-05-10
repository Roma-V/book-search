import React from 'react'

import { render, screen } from '../utils/testRenderUtils'
import helper from '../utils/fetchTestHelpers'

import App from '../App'

it('Renders the connected app with initialState', () => {
  render(<App />, { initialState: { books: helper.states.initialState } })

  expect(screen.getByText('Search for')).toBeInTheDocument()
})