import React from 'react'

const BookListItem = ({ title, authors, coverId }) => {
  return (
    <li className="list-item" >
      <section>
        <h3 className="list-item-name" >
          {title}
        </h3>
        <p>{ authors &&
          authors.length > 0
          ? authors.length > 1
            ? authors.join(', ')
            : authors
          : null
        }</p>
        <img src={`http://covers.openlibrary.org/b/id/${coverId}-S.jpg`} />
      </section>
    </li>
  )
}

export default BookListItem