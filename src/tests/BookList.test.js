import React from 'react'

import { render, screen } from '../utils/testRenderUtils'
import helper from '../utils/fetchTestHelpers'

import BookList from '../components/BookList'

let mockShowModal = jest.fn()

describe('BookList', () => {
  afterEach(() => {
    mockShowModal.mockReset()
  })

  test('does not render with empty state', () => {
    const component = render(
      <BookList openModal={mockShowModal}/>,
      { initialState: { books: helper.states.initialState } }
    )

    expect(component.container).toBeEmptyDOMElement()
  })

  describe('renders the list with non-empty state', () => {
    test('which is not empty', () => {
      const component = render(
        <BookList openModal={mockShowModal}/>,
        { initialState: { books: helper.states.fetchedState } }
      )

      expect(component.container).not.toBeEmptyDOMElement()
    })

    test('contains book titles', () => {
      const component = render(
        <BookList openModal={mockShowModal}/>,
        { initialState: { books: helper.states.fetchedState } }
      )

      for (const book of Object.values(helper.states.fetchedState.entities)) {
        expect(component.container).toHaveTextContent(book.title)
      }
    })

    test('contains author names', () => {
      const component = render(
        <BookList openModal={mockShowModal}/>,
        { initialState: { books: helper.states.fetchedState } }
      )

      for (const book of Object.values(helper.states.fetchedState.entities)) {
        expect(component.container).toHaveTextContent(book.author_name)
      }
    })
  })
})