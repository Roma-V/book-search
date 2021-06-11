/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'

import './ModalView.css'

import { selectBookById } from '../store/booksSlice'
import openLibrary from '../services/openLibrary'
import { ModalViewProps, ElementRef, BookDetailsProps, Book } from '../utils/types'
import { RootState } from '../store/store'

const ModalView: React.FC<ModalViewProps> = ({ id, closeModal, accessible }: ModalViewProps) => {
  const elementToFocusRef: ElementRef = useRef()

  useEffect(() => {
    if (accessible) elementToFocusRef.current?.focus()
  }, [])

  const book = useSelector<RootState, Book | undefined>(state => selectBookById(state, id))

  return <React.Fragment>
    <article className='modal__foreground'>
      {
        book
          ? <BookDetails book={book} elementToFocusRef={elementToFocusRef} />
          : <p ref={elementToFocusRef as unknown as React.LegacyRef<HTMLParagraphElement> | undefined}>No content found in current search query.</p>
      }
      <button
        className='btn btn__primary btn__close-modal'
        onClick={() => { closeModal() }}
      >
        Close
      </button>
    </article>
    <div
      className='modal__background'
      onClick={() => { closeModal() }}
      data-testid="modalview-background"
    >
    </div>
  </React.Fragment>
}

const BookDetails: React.FC<BookDetailsProps> = ({ book, elementToFocusRef }: BookDetailsProps) => (
  <>
    <h3 className='modal__title' >
      {book.title}
    </h3>
    <section className='modal__content'>
      {book.cover_i &&
    <img
      src={openLibrary.coverURL(book.cover_i, 'M')}
      className='modal__image'
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      alt={`Cover image for ${book.title}`}
    />}
      <section className='modal__content-text'>
        <p className='modal__author' >
          { book.author_name &&
        book.author_name.length > 0
            ? book.author_name.length > 1
              // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
              ? 'Authors: ' + book.author_name.join(', ')
              // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
              : 'Author: ' + book.author_name
            : null
          }</p>
        <p className='modal__published'
          tabIndex={'-1' as unknown as number}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          ref={elementToFocusRef as unknown as React.LegacyRef<HTMLParagraphElement> | undefined}
        >
        First published: {book.first_publish_year || 'N/A'}
        </p>
        <p className='modal__publisher' >
        Has {book.edition_count || 'N/A'} edition{book.edition_count === 1 ? '' : 's'}.
        </p>
        <p className='modal__isbn' >
        ISBN: {(book.isbn && book.isbn[0]) || 'N/A'}
        </p>
      </section>
    </section>
  </>
)

export default ModalView