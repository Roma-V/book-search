import React, { useState } from 'react'

import searchService from '../services/search'

const SearchForm = ({ booksFound }) => {
  const [query, setQuery] = useState('')

  function handleInput(e) {
    setQuery(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()

    searchService
      .search(query)
      .then(data => booksFound(data.docs))
  }

  return (
    <form onSubmit={handleSubmit} >
      <label htmlFor="search-query" className="label__lg">
        Search for:
      </label>
      <input
        type="text"
        id="search-query"
        className="input"
        name="search-query"
        autoComplete="off"
        value={query}
        onChange={handleInput}
      />
      <button type="submit" className="btn">
        Find
      </button>
    </form>
  )
}

export default SearchForm