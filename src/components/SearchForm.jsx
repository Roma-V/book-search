import React, { useState, useEffect } from 'react'

import { useDebounce } from '../hooks/useDebounce'
import openLibrary from '../services/openLibrary'

import './SearchForm.css'

const SearchForm = ({ booksFound }) => {
  const [input, setInput] = useState('')
  const [query, cancelQuery] = useDebounce(input, 1000)
  const [searchParameter, setSearchParameter] = useState(openLibrary.searchParameters[0])

  useEffect(() => {
    if (query) {
      openLibrary
        .search(query, searchParameter)
        .then(data => booksFound(data.docs))
    }
  }, [query])

  function handleInput(e) {
    setInput(e.target.value)
  }

  function handleSelect(e) {
    setSearchParameter(e.target.value)
    setInput('')
  }

  function handleSubmit(e) {
    e.preventDefault()

    cancelQuery()

    openLibrary
      .search(input, searchParameter)
      .then(data => booksFound(data.docs))
  }

  return (
    <form className='search-form' onSubmit={handleSubmit} >
      <label htmlFor="search-query" className="search-form__label">
        Search for
      </label>
      <select
        name="select-query-parameter"
        className="search-form__input"
        defaultValue={openLibrary.searchParameters[0]}
        onChange={handleSelect}
      >
        {openLibrary.searchParameters.map(param =>
          <option
            key={param}
            value={param}
          >{param}</option>
        )}
      </select>:
      <input
        type="text"
        id="search-query"
        className="search-form__input"
        name="search-query"
        autoComplete="off"
        value={input}
        onChange={handleInput}
      />
      <button type="submit" className="btn__primary">
        Find
      </button>
    </form>
  )
}

export default SearchForm