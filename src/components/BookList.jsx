import React from 'react'
import { useSelector } from 'react-redux'

import BookListItem from './BookListItem'
import { selectAllBooks, selectNumFound, selectPageNumber, selectNumPages } from '../store/booksSlice'

import './BookList.css'

const BookList = ({ openModal }) => {
  const bookList = useSelector(selectAllBooks)
  const numFoundBooks = useSelector(selectNumFound)
  const numPages = useSelector(selectNumPages)
  const page = useSelector(selectPageNumber)

  if (!bookList || bookList.length === 0) return null

  return (
    <>
      <h2>{bookList.length} book{bookList.length === 1 ? '' : 's'} of {numFoundBooks}</h2>
      {numPages > 1 &&
        <div>
          <button className="btn__primary">
            &lt; Previous page
          </button>
          <span className="num-pages">Page {page} of {numPages}</span>
          <button className="btn__primary">
            Next page &gt;
          </button>
        </div>
      }
      <ul className="list-container" >
        {bookList.map(book =>
          <BookListItem
            key={book.key}
            id={book.id}
            openModal={openModal}
          />
        )}
      </ul>
    </>
  )
}

export default BookList