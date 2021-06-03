import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import openLibrary from '../services/openLibrary'

import { SearchParameters, BooksState, Book, FetchPayload } from '../utils/types'
import { RootState } from './store'

const booksAdapter = createEntityAdapter<Book>({
  selectId: book => book.key,
  sortComparer: (a, b) => a.title.localeCompare(b.title)
})
const initialState = booksAdapter.getInitialState<BooksState>({
  status: 'idle',
  error: null,
  meta: null,
})

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async ({ query, searchParameter, page }: SearchParameters) => {
    const response = await openLibrary.search(query, searchParameter, page)
    return response
  })

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setIdleStatus: state => {
      state.status = 'idle'
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchBooks.pending, (state, action) => {
      state.status = 'loading'
      state.error = null
      state.meta = {
        ...state.meta,
        query: action.meta.arg,
      }
    })

    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.status = 'succeeded'
      const payload = action.payload as FetchPayload

      state.meta = {
        ...state.meta,
        numFound: payload.numFound,
        start: payload.start,
      }

      const books = payload.docs.map((book: Omit<Book, 'id'>): Book => ({ id: book.key, ...book }))
      booksAdapter.setAll(state, books)
    })

    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error
    })
  },
})

export default booksSlice.reducer

// Slectors
export const {
  selectAll: selectAllBooks,
  selectById: selectBookById,
} = booksAdapter.getSelectors((state: RootState): RootState['books'] => state.books)

// additional selectors
export const { setIdleStatus } = booksSlice.actions

export function selectNumFound(state: RootState) {
  return state.books.meta && state.books.meta.numFound
}

export function selectStartingBook(state: RootState) {
  return state.books.meta && state.books.meta.start
}

export function selectPageNumber(state: RootState) {
  return state.books.meta?.start !== undefined &&
    Math.floor(state.books.meta.start / 100) + 1
}

export function selectNumPages(state: RootState) {
  return state.books.meta?.numFound !== undefined &&
    Math.ceil(state.books.meta.numFound / 100 )
}

export function selectQuery(state: RootState) {
  return state.books.meta && state.books.meta.query
}