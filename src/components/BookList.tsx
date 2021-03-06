import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import BookListItem from './BookListItem'
import {
  selectAllBooks,
  selectNumFound,
  selectPageNumber,
  selectNumPages,
  selectQuery,
} from '../store/booksSlice'
import { fetchBooks } from '../store/booksSlice'
import { BookListProps, PaginationButton } from '../utils/types'

import './BookList.css'

const BookList: React.FC<BookListProps> = ({ openModal }: BookListProps) => {
  const dispatch = useDispatch()

  const bookList = useSelector(selectAllBooks)
  const numFoundBooks = useSelector(selectNumFound)
  const numPages = useSelector(selectNumPages)
  const page = useSelector(selectPageNumber)
  const query = useSelector(selectQuery)

  if (!bookList || bookList.length === 0) return null

  function loadPaginationData(pageToLoad: number) {
    query && dispatch(fetchBooks({
      query: query.query,
      searchParameter: query.searchParameter,
      page: pageToLoad,
    }))
  }

  return (
    <>
      <h2>{bookList.length} book{bookList.length === 1 ? '' : 's'} of {numFoundBooks}</h2>
      {numPages > 1 &&
        <div>
          <PaginationButton
            onClick={(page && page > 1) ? (() => loadPaginationData(page - 1)) : undefined}
          >
            &lt; <span className='hidden'>Previous page</span>
          </PaginationButton>
          <span className='num-pages'>Page {page} of {numPages}</span>
          <PaginationButton
            onClick={(page && page < numPages) ? (() => loadPaginationData(page + 1)) : undefined}
          >
            <span className='hidden'>Next page</span> &gt;
          </PaginationButton>
        </div>
      }
      <ul className='list-container' >
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

const PaginationButton: React.FC<PaginationButton> = ({ onClick, children }: PaginationButton) => {
  const className = 'btn ' + (onClick ? 'btn__primary' : 'btn__inactive')
  const tabIndex = onClick ? undefined : -1

  return (
    <button
      className={className}
      tabIndex={tabIndex}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
export default BookList