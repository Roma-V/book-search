import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import openLibrary from '../services/openLibrary'

const booksAdapter = createEntityAdapter()
const initialState = booksAdapter.getInitialState({
  status: 'idle',
  error: null,
  meta: null,
})

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async ({ query, searchParameter, page }) => {
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
  extraReducers: {
    [fetchBooks.pending]: (state, action) => {
      state.status = 'loading'
      state.error = null
      state.meta = {
        ...state.meta,
        query: action.meta.arg,
      }
    },
    [fetchBooks.fulfilled]: (state, action) => {
      state.status = 'succeeded'

      state.meta = {
        ...state.meta,
        numFound: action.payload.numFound,
        start: action.payload.start,
      }

      const books = action.payload.docs.map(book => ({ id: book.key, ...book }))
      booksAdapter.setAll(state, books)
    },
    [fetchBooks.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error
    },
  }
})

export default booksSlice.reducer

export const {
  selectAll: selectAllBooks,
  selectById: selectBookById,
} = booksAdapter.getSelectors((state) => state.books)

// additional selectors
export const { setIdleStatus } = booksSlice.actions

export function selectNumFound(state) {
  return state.books.meta && state.books.meta.numFound
}

export function selectStartingBook(state) {
  return state.books.meta && state.books.meta.start
}

export function selectPageNumber(state) {
  return state.books.meta &&
    Math.floor(state.books.meta.start / 100) + 1
}

export function selectNumPages(state) {
  return state.books.meta &&
    Math.ceil(state.books.meta.numFound / 100 )
}

export function selectQuery(state) {
  return state.books.meta && state.books.meta.query
}