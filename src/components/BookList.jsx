import React from 'react'
import { useSelector } from 'react-redux'

import BookListItem from './BookListItem'
import { selectAllBooks } from '../store/booksSlice'

import './BookList.css'

const BookList = ({ openModal }) => {
  const bookList = useSelector(selectAllBooks)

  if (!bookList || bookList.length === 0) return null

  return (
    <>
      <h2>{bookList.length} book{bookList.length === 1 ? '' : 's'} found</h2>
      <ul className="list-container">
        {bookList.map(book =>
          <BookListItem
            key={book.key}
            book={book}
            openModal={openModal}
          />
        )}
      </ul>
    </>
  )
}

export default BookList