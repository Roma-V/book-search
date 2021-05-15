import React from 'react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { render } from '../utils/testRenderUtils'
import helper from '../utils/fetchTestHelpers'

import SearchForm from '../components/SearchForm'

function renderSearchForm() {
  return render(
    <SearchForm/>,
    { initialState: { books: helper.states.fetchedState } }
  )
}

const mockAxios = new MockAdapter(axios)

describe('SearchForm', () => {
  test.todo('renders')

  test.todo('starts fetching on click of the submit button')

  test.todo('starts fetching after 1 second wait on non-empty text input')

  test.todo('aborts fetching on click of the submit button')
})