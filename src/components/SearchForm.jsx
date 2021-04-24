import React, { useState } from 'react'

const SearchForm = (props) => {
  const [query, setQuery] = useState('')

  function handleInput(e) {
    setQuery(e.target.value)
  }

  return (
    <form>
      <label htmlFor="search-query" className="label__lg">
        Search for:
      </label>
      <input
        type="text"
        id="search-query"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={query}
        onChange={handleInput}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Find
      </button>
    </form>
  )
}

export default SearchForm