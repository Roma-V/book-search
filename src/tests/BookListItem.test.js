import React from 'react'

import { render } from '../utils/testRenderUtils'
import helper from '../utils/fetchTestHelpers'

import BookListItem from '../components/BookListItem'


describe('BookListItem', () => {
  let mockShowModal = jest.fn()
  function renderListItem(id) {
    return render(
      <BookListItem
        id={id}
        openModal={mockShowModal}
      />,
      { initialState: { books: helper.states.fetchedState } }
    )
  }
  const propperId = helper.states.fetchedState.ids[0]
  const impropperId = propperId.replace('b', 'c')

  afterEach(() => {
    mockShowModal.mockReset()
  })

  test('handles improper ID gracefuly, not rendering', () => {
    const component = renderListItem(impropperId)
    expect(component.container).toBeEmptyDOMElement()
  })

  describe('renders an item with propper id, which', () => {
    test('is not empty', () => {
      const component = renderListItem(propperId)
      expect(component.container).not.toBeEmptyDOMElement()
    })

    test('contains book title', () => {
      const component = renderListItem(propperId)
      const title = helper.states.fetchedState.entities[propperId].title
      expect(component.container).toHaveTextContent(title)
    })

    test('contains author names', () => {
      const component = renderListItem(propperId)
      const author_name = helper.states.fetchedState.entities[propperId].author_name
      expect(component.container).toHaveTextContent(author_name)
    })

    test('handles click', () => {
      renderListItem(propperId)
      mockShowModal()
      expect(mockShowModal.mock.calls.length).toBe(1)
    })
  })
})