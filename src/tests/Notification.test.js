import React from 'react'

import { render } from '../utils/testRenderUtils'
import helper from '../utils/fetchTestHelpers'

import Notification from '../components/Notification'

function renderNotification() {
  return render(
    <Notification/>,
    { initialState: { books: helper.states.fetchedState } }
  )
}

describe('Notification', () => {
  test.todo('does not render for idle and loading status')

  test.todo('renders for succeeded status')

  test.todo('renders for failed status')

  test.todo('disapears after 5 seconds on screen')
})