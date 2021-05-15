import React, { useRef } from 'react'
import { useSelector } from 'react-redux'

import './BookListItem.css'

import openLibrary from '../services/openLibrary'
import { selectBookById } from '../store/booksSlice'

const BookListItem = ({ id, openModal }) => {
  const itemRef = useRef()

  function handleKey(event) {
    if (event.isComposing || event.keyCode === 229) {
      return
    }

    if (event.key === 'Enter') {
      openModal(id, itemRef)
    }
  }

  const book = useSelector(state => selectBookById(state, id))
  if (!book) return null

  return <li
    className="list-item"
    tabIndex="0"
    onClick={() => openModal(id)}
    onKeyDown={handleKey}
    ref={itemRef}
  >
    <Cover
      coverId={book.cover_i}
      title={book.title}
    />
    <h3 className="list-item__title" >
      {book.title}
    </h3>
    <p className="list-item__author" >
      { book.author_name &&
        book.author_name.length > 0
        ? book.author_name.length > 1
          ? book.author_name.join(', ')
          : book.author_name
        : null
      }</p>
  </li>
}

const Cover = ({ coverId, title }) =>
  <React.Fragment>
    {
      coverId
        ? <img
          src={openLibrary.coverURL(coverId)}
          className="list-item__image"
          alt={`Cover image for ${title}`}
          width="38"
          height="58"
        />
        : <div className="list-item__noimage">
          No cover<br></br>available
        </div>
    }
  </React.Fragment>

export default BookListItem