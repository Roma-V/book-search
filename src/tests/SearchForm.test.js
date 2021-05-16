import React from 'react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { render, fireEvent, act } from '../utils/testRenderUtils'
import helper from '../utils/fetchTestHelpers'
import { searchURL } from '../services/openLibrary'
import fetchHelper from '../utils/fetchTestHelpers'

import SearchForm from '../components/SearchForm'

function renderSearchForm() {
  return render(
    <SearchForm/>,
    { initialState: { books: helper.states.initialState } }
  )
}

describe('SearchForm', () => {
  const fetchDuration = 1000
  const mockAxios = new MockAdapter(axios)
  const mockGet = jest.fn(
    () => new Promise((resolve, reject) => {
      setTimeout(
        () => resolve([200, fetchHelper.fetch.mockFetchResponse]),
        fetchDuration
      )
    })
  )

  beforeEach(() => {
    jest.useFakeTimers()
    mockAxios.onGet(searchURL)
      .reply(mockGet)
  })

  afterEach(() => {
    mockAxios.reset()
    mockGet.mockReset()
    jest.useRealTimers()
  })

  test('renders', () => {
    const component = renderSearchForm()
    expect(component.container).toHaveTextContent('Search for')
  })

  test('starts fetching on click of the submit button', async () => {

    const component = renderSearchForm()
    const textInput = component.getByTestId('search-query')
    const findButton = component.getByText('Find')

    await act(async () => {
      fireEvent.change(textInput, { target: { value: 'author' } })
      fireEvent.click(findButton)
    })

    expect(mockGet).toHaveBeenCalledTimes(1)
  })

  test('starts fetching after 1 second wait on non-empty text input', async () => {
    const component = renderSearchForm()
    const textInput = component.getByTestId('search-query')

    await act(async () => {
      fireEvent.change(textInput, { target: { value: 'author' } })
    })

    await act(async () => {
      jest.runAllTimers()
    })

    expect(mockGet).toHaveBeenCalledTimes(1)
  })

  test.todo('aborts fetching on click of the submit button')
})