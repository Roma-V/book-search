import React from 'react'

import BookListItem from './BookListItem'

import './BookList.css'

const BookList = ({ bookList, openModal }) => {
  return (
    <>
      {bookList && bookList.length > 0 &&
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
      }
    </>
  )
}

export default BookList