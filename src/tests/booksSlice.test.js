import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { searchURL } from '../services/openLibrary'
import reducer, {
  setIdleStatus,
  selectAllBooks,
  selectBookById,
  selectNumFound,
  selectStartingBook,
  selectPageNumber,
  selectNumPages,
  selectQuery,
  fetchBooks,
} from '../store/booksSlice'
import fetchHelper from '../utils/fetchTestHelpers'

/**
 * Actions
 */
describe('ACTIONS', () => {
  it('setIdleStatus creates an action to set status to idle', () => {
    const expectedAction = {
      type: 'books/setIdleStatus',
    }
    const result = setIdleStatus()

    expect(result).toEqual(expectedAction)
  })
})

/**
 * Reducers
 */
describe('REDUCER', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(fetchHelper.states.initialState)
  })

  it('should handle books/setIdleStatus', () => {
    expect(
      reducer({
        ...fetchHelper.states.initialState,
        status: 'succeeded',
      },
      { type: 'books/setIdleStatus' }
      )
    ).toEqual(fetchHelper.states.initialState)
  })

  it('should handle books/fetchBooks/pending', () => {
    const newState = reducer(
      fetchHelper.states.initialState,
      fetchHelper.actions.fetchAction
    )
    expect(newState).toEqual(fetchHelper.states.fetchingState)
  })

  it('should handle books/fetchBooks/fulfilled', () => {
    const newState = reducer(
      fetchHelper.states.fetchingState,
      fetchHelper.actions.fetchedAction
    )
    expect(newState).toEqual(fetchHelper.states.fetchedState)
  })

  it('should handle books/fetchBooks/rejected', () => {
    const newState = reducer(
      fetchHelper.states.fetchingState,
      fetchHelper.actions.rejectAction
    )
    expect(newState).toEqual(fetchHelper.states.fetchRejectedState)
  })
})

/**
 * Selectors
 */
const appState = { books: fetchHelper.states.fetchedState }

describe('SELECTORS', () => {
  it('selectAllBooks should return all books', () => {
    const allBooks = selectAllBooks(appState)
    expect(allBooks).toEqual(Object.values(fetchHelper.states.fetchedState.entities))
  })

  it('selectBookById should return the books', () => {
    const id = fetchHelper.states.fetchedState.ids[0]
    const book = selectBookById(appState, id)
    expect(book).toEqual(fetchHelper.states.fetchedState.entities[id])
  })

  it('selectNumFound should return the books', () => {
    const quantity = selectNumFound(appState)
    expect(quantity).toEqual(fetchHelper.states.fetchedState.meta.numFound)
  })

  it('selectStartingBook should return the books', () => {
    const start = selectStartingBook(appState)
    expect(start).toEqual(fetchHelper.states.fetchedState.meta.start)
  })

  it('selectPageNumber should return the books', () => {
    const page = selectPageNumber(appState)
    expect(page).toEqual(1)
  })

  it('selectNumPages should return the books', () => {
    const numPages = selectNumPages(appState)
    expect(numPages).toEqual(1)
  })

  it('selectQuery should return the books', () => {
    const numPages = selectQuery(appState)
    expect(numPages).toEqual(fetchHelper.states.fetchedState.meta.query)
  })
})

/**
 * Thiuk
 */
const mockStore = configureMockStore([thunk])
const mockAxios = new MockAdapter(axios)
let store

describe('THUNK', () => {
  beforeEach(() => {
    store = mockStore({})
  })

  afterEach(() => {
    mockAxios.reset()
  })

  it('fetchBooks should dispatch promise pending and fulfilled actions', async () => {
    mockAxios.onGet(searchURL)
      .reply(200, fetchHelper.fetch.mockFetchResponse)

    await store.dispatch(fetchBooks(fetchHelper.fetch.testFetchQuery))

    const actualActions = store.getActions().map(action => {
      delete action.meta.requestId
      return action
    })

    expect(actualActions).toStrictEqual(fetchHelper.fetch.expectedFetchSuccessActions)
  })

  it('fetchBooks on error should dispatch promise pending and rejected actions', async () => {
    mockAxios.onGet(searchURL).networkError()

    await store.dispatch(fetchBooks(fetchHelper.fetch.testFetchQuery))

    const actualActions = store.getActions().map(action => {
      delete action.meta.requestId
      if (action.error) action.error = fetchHelper.fetch.expectedFetchRejectedActions[1].error
      return action
    })

    expect(actualActions).toStrictEqual(fetchHelper.fetch.expectedFetchRejectedActions)
  })
})