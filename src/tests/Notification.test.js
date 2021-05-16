import React from 'react'

import { render, act } from '../utils/testRenderUtils'
import helper from '../utils/fetchTestHelpers'

import Notification from '../components/Notification'

describe('Notification', () => {
  test('does not render for idle and loading status', () => {
    const component = render(
      <Notification/>,
      { initialState: { books: helper.states.initialState } }
    )
    expect(component.container).toBeEmptyDOMElement()
  })

  test('renders for succeeded status', () => {
    const component = render(
      <Notification/>,
      { initialState: { books: helper.states.fetchedState } }
    )
    const numFoundBooks = helper.states.fetchedState.meta.numFound
    const message = `A total of ${numFoundBooks} book${numFoundBooks === 1 ? '' : 's'} found.`

    expect(component.container).toHaveTextContent(message)
  })

  test('renders for failed status', () => {
    const component = render(
      <Notification/>,
      { initialState: { books: helper.states.fetchRejectedState } }
    )
    const message = helper.states.fetchRejectedState.error.message

    expect(component.container).toHaveTextContent(message)
  })

  test('disapears after 5 seconds on screen', () => {
    jest.useFakeTimers('modern')
    const component = render(
      <Notification/>,
      { initialState: { books: helper.states.fetchRejectedState } }
    )
    const message = helper.states.fetchRejectedState.error.message

    expect(component.container).toHaveTextContent(message)

    act(() => {
      jest.advanceTimersByTime(5000)
    })

    expect(component.container).toBeEmptyDOMElement()

    jest.useRealTimers()
  })
})