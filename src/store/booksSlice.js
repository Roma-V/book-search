import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import openLibrary from '../services/openLibrary'

const initialState = []

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async ({ query, searchParameter }) => {
    const response = await openLibrary.search(query, searchParameter)
    return response.docs
  })

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchBooks.fulfilled]: (state, action) => {
      return action.payload
    }
  }
})

export default booksSlice.reducer

export const selectAllBooks = state => state.books

export const selectBookById = (state, bookId) =>
  state.books.find(book => book.id === bookId)