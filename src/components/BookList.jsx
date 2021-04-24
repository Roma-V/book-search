import React from 'react'

import BookListItem from './BookListItem'

const BookList = ({ bookList }) => {
  return (
    <ul className="list-container">
      {
        bookList 
        && bookList.map(({ key, title, author_name, cover_i }) => 
          <BookListItem key={key} title={title} authors={author_name} coverId={cover_i} />
        )
      }
    </ul>
  )
}

export default BookList