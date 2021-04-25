import React, { useRef, useEffect } from 'react'

import './ModalView.css'

import openLibrary from '../services/openLibrary'

const ModalView = ({ book, closeModal }) => {
  const closeButtonRef = useRef()

  useEffect(() => closeButtonRef.current.focus(), [])

  return <React.Fragment>
    <article className="modal__foreground">
      <h3 className="modal__title" >
        {book.title}
      </h3>
      <section className="modal__content">
        {book.cover_i &&
        <img
          src={openLibrary.coverURL(book.cover_i, 'M')}
          className="modal__image"
          alt={`${book.title} cover image`}
        />}
        <p className="modal__author" >
          { book.author_name &&
            book.author_name.length > 0
            ? book.author_name.length > 1
              ? 'Authors: ' + book.author_name.join(', ')
              : 'Author: ' + book.author_name
            : null
          }</p>
        <p className="modal__published" >
          First published: {book.first_publish_year || 'N/A'}
        </p>
        <p className="modal__publisher" >
          Has {book.edition_count || 'N/A'} editions.
        </p>
        <p className="modal__isbn" >
          ISBN: {(book.isbn && book.isbn[0]) || 'N/A'}
        </p>
      </section>
      <button
        className="btn__primary btn__close-modal"
        onClick={() => closeModal()}
        ref={closeButtonRef}
      >
        Close
      </button>
    </article>
    <div className="modal__background">
    </div>
  </React.Fragment>
}
  

export default ModalView