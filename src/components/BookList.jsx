import React from 'react'

const BookList = ({ bookList }) => {
  return (
    <ul className="list-container">
      {bookList && bookList.map(({ id, name }) => (
        <li key={id} className="list-item" style={{ backgroundImage: `url(${`${id}.png`})` }}>
          <p className="list-item-name" >
            {name}
          </p>
        </li>
      ))}
    </ul>
  )
}

export default BookList