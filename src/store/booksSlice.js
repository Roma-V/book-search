import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import openLibrary from '../services/openLibrary'

const booksAdapter = createEntityAdapter()
const initialState = booksAdapter.getInitialState({
  status: 'idle',
  error: null,
})

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async ({ query, searchParameter }) => {
    const response = await openLibrary.search(query, searchParameter)
    return response.docs.map(book => ({ id: book.key, ...book }))
  })

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchBooks.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchBooks.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      booksAdapter.setAll(state, action.payload)
    },
    [fetchBooks.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },
  }
})

export default booksSlice.reducer

export const {
  selectAll: selectAllBooks,
  selectById: selectBookById,
} = booksAdapter.getSelectors((state) => state.books)