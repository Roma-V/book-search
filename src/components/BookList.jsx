import React from 'react'

import BookListItem from './BookListItem'

import './BookList.css'

const BookList = ({ bookList, openModal }) => {
  return (
    <ul className="list-container">
      {
        bookList
        && bookList.map(book =>
          <BookListItem
            key={book.key}
            book={book}
            openModal={openModal}
          />
        )
      }
    </ul>
  )
}

export default BookList