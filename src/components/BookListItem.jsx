import React, { useRef } from 'react'

import './BookListItem.css'

import openLibrary from '../services/openLibrary'

const BookListItem = ({ book, openModal }) => {
  const itemRef = useRef()

  return <li
    className="list-item"
    tabIndex="0"
    onClick={() => openModal(book, itemRef)}
    ref={itemRef}
  >
    <Cover coverId={book.cover_i} />
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

const Cover = ({ coverId }) =>
  <React.Fragment>
    {
      coverId
        ? <img src={openLibrary.coverURL(coverId)} className="list-item__image" />
        : <div className="list-item__noimage">
          No cover<br></br>available
        </div>
    }
  </React.Fragment>

export default BookListItem