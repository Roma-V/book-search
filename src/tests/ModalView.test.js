import React from 'react'

import { render, fireEvent } from '../utils/testRenderUtils'
import helper from '../utils/fetchTestHelpers'

import ModalView from '../components/ModalView'

describe('ModalView', () => {
  let mockCloseModal = jest.fn()
  function renderModal(id, accessible=false) {
    return render(
      <ModalView
        id={id}
        closeModal={mockCloseModal}
        accessible={accessible}
      />,
      { initialState: { books: helper.states.fetchedState } }
    )
  }
  const propperId = helper.states.fetchedState.ids[0]
  const impropperId = propperId.replace('b', 'c')

  afterEach(() => {
    mockCloseModal.mockReset()
  })

  test('handles improper ID gracefuly, renders an apropriate message', () => {
    const component = renderModal(impropperId)
    expect(component.container).toHaveTextContent('No content found in current search query.')
  })

  describe('with propper id renders a view, which', () => {
    test('contains book title', () => {
      const component = renderModal(propperId)
      const title = helper.states.fetchedState.entities[propperId].title
      expect(component.container).toHaveTextContent(title)
    })

    test('contains author name', () => {
      const component = renderModal(propperId)
      const author_name = helper.states.fetchedState.entities[propperId].author_name
      expect(component.container).toHaveTextContent(author_name)
    })

    test('calls closeModal on click of the close button', () => {
      const component = renderModal(propperId)
      const closeButton = component.getByText('Close')
      fireEvent.click(closeButton)
      expect(mockCloseModal.mock.calls.length).toBe(1)
    })

    test('calls closeModal on click outside the modal view', () => {
      const component = renderModal(propperId)
      const closeButton = component.getByTestId('modalview-background')
      fireEvent.click(closeButton)
      expect(mockCloseModal.mock.calls.length).toBe(1)
    })
  })
})