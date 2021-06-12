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
  test('setIdleStatus creates an action to set status to idle', () => {
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
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(fetchHelper.states.initialState)
  })

  test('should handle books/setIdleStatus', () => {
    expect(
      reducer({
        ...fetchHelper.states.initialState,
        status: 'succeeded',
      },
      { type: 'books/setIdleStatus' }
      )
    ).toEqual(fetchHelper.states.initialState)
  })

  test('should handle books/fetchBooks/pending', () => {
    const newState = reducer(
      fetchHelper.states.initialState,
      fetchHelper.actions.fetchAction
    )
    expect(newState).toEqual(fetchHelper.states.fetchingState)
  })

  test('should handle books/fetchBooks/fulfilled', () => {
    const newState = reducer(
      fetchHelper.states.fetchingState,
      fetchHelper.actions.fetchedAction
    )

    /* Somehow Redux with TypeScript messes up with ids order.
      Need to sort it in order to pass deepEqual comparison. */
    const fetchedState = Object.assign(fetchHelper.states.fetchedState)
    fetchedState.ids = newState.ids.slice()

    expect(newState).toEqual(fetchedState)
  })

  test('should handle books/fetchBooks/rejected', () => {
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
  test('selectAllBooks should return all books', () => {
    const allBooks = selectAllBooks(appState)

    /* Somehow Redux with TypeScript messes up with ids and Books order.
      Need to sort them in order to pass deepEqual comparison. */
    allBooks.sort((book1, book2) => book1.id.localeCompare(book2.id))

    expect(allBooks).toEqual(Object.values(fetchHelper.states.fetchedState.entities))
  })

  test('selectBookById should return the books', () => {
    const id = fetchHelper.states.fetchedState.ids[0]
    const book = selectBookById(appState, id)
    expect(book).toEqual(fetchHelper.states.fetchedState.entities[id])
  })

  test('selectNumFound should return the books', () => {
    const quantity = selectNumFound(appState)
    expect(quantity).toEqual(fetchHelper.states.fetchedState.meta.numFound)
  })

  test('selectStartingBook should return the books', () => {
    const start = selectStartingBook(appState)
    expect(start).toEqual(fetchHelper.states.fetchedState.meta.start)
  })

  test('selectPageNumber should return the page number', () => {
    const page = selectPageNumber(appState)
    expect(page).toEqual(1)
  })

  test('selectNumPages should return the number of pages', () => {
    const numPages = selectNumPages(appState)
    expect(numPages).toEqual(1)
  })

  test('selectQuery should return the query', () => {
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

  test('fetchBooks should dispatch promise pending and fulfilled actions', async () => {
    mockAxios.onGet(searchURL)
      .reply(200, fetchHelper.fetch.mockFetchResponse)

    await store.dispatch(fetchBooks(fetchHelper.fetch.testFetchQuery))

    const actualActions = store.getActions().map(action => {
      delete action.meta.requestId
      return action
    })

    expect(actualActions).toStrictEqual(fetchHelper.fetch.expectedFetchSuccessActions)
  })

  test('fetchBooks on error should dispatch promise pending and rejected actions', async () => {
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