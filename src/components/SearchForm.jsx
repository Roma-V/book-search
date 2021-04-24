import React, { useState } from 'react'

import openLibrary from '../services/openLibrary'

import './SearchForm.css'

const SearchForm = ({ booksFound }) => {
  const [query, setQuery] = useState('')

  function handleInput(e) {
    setQuery(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()

    openLibrary
      .search(query)
      .then(data => booksFound(data.docs))
  }

  return (
    <form className='search-form' onSubmit={handleSubmit} >
      <label htmlFor="search-query" className="search-form__label">
        Search for title:
      </label>
      <input
        type="text"
        id="search-query"
        className="search-form__input"
        name="search-query"
        autoComplete="off"
        value={query}
        onChange={handleInput}
      />
      <button type="submit" className="search-form__btn">
        Find
      </button>
    </form>
  )
}

export default SearchForm