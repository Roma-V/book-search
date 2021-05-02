import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import LoadingIndicator from './LoadingIndicator'
import { useDebounce } from '../hooks/useDebounce'
import openLibrary from '../services/openLibrary'
import { fetchBooks } from '../store/booksSlice'

import './SearchForm.css'

const SearchForm = () => {
  const [input, setInput] = useState('')
  const [query, cancelQuery] = useDebounce(input, 1000)
  const [searchParameter, setSearchParameter] = useState(openLibrary.searchParameters[0])

  const dispatch = useDispatch()
  const loadingState = useSelector(state => state.books.status)

  useEffect(() => {
    if (query) {
      dispatch(fetchBooks({ query, searchParameter }))
    }
  }, [query])

  function handleInput(e) {
    setInput(e.target.value)
  }

  function handleSelect(e) {
    setSearchParameter(e.target.value)
    setInput('')
  }

  function handleSubmit() {
    if (loadingState !== 'loading') {
      return function(e) {
        e.preventDefault()

        cancelQuery()

        dispatch(fetchBooks({ query: input, searchParameter }))
      }
    }
    else {
      return function(e) {
        e.preventDefault()

        cancelQuery()

        const cancelToken = openLibrary.getCancelTokenSource()
        cancelToken.cancel('Loading canceled.')
      }
    }
  }

  return (
    <form className='search-form' onSubmit={handleSubmit()} >
      <label htmlFor="search-query" className="search-form__label">
        Search for
      </label>
      <select
        name="select-query-parameter"
        className="search-form__select"
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
      <button type="submit" className="btn btn__primary">
        {
          loadingState === 'loading'
            ? <LoadingIndicator />
            : 'Find'
        }
      </button>
    </form>
  )
}

export default SearchForm