import React from 'react'

import './BookListItem.css'

import openLibrary from '../services/openLibrary'

const BookListItem = ({ title, authors, coverId }) => 
  <li className="list-item" >
    <Cover coverId={coverId} />
    <h3 className="list-item__title" >
      {title}
    </h3>
    <p className="list-item__author" >{ authors &&
          authors.length > 0
      ? authors.length > 1
        ? authors.join(', ')
        : authors
      : null
    }</p>
  </li>

const Cover = ({ coverId }) =>
  <React.Fragment>
    {
      coverId
        ? <img src={`${openLibrary.coverURL}/${coverId}-S.jpg`} className="list-item__image" />
        : <div className="list-item__noimage">
          No cover<br></br>available
        </div>
    }
  </React.Fragment>

export default BookListItem