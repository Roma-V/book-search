import React, { useState } from 'react'
// import { useApi } from './useApi'
// import LoadingSpinner from './LoadingSpinner'
// import ErrorMessage from './ErrorMessage'
import SearchForm from './components/SearchForm'
import BookList from './components/BookList'

// const mapResults = (({ results }) => results.map(({ url, name }) => ({
//   url,
//   name,
//   id: parseInt(url.match(/\/(\d+)\//)[1])
// })))

const App = () => {
  const [books, setBooks] = useState([])

  function handleBooksFound(books) {
    console.log('books found:', books)
    setBooks(books)
  }
  //   const { data: pokemonList, error, isLoading } = useApi('https://pokeapi.co/api/v2/pokemon/?limit=784', mapResults)
  //   if (isLoading) {
  //     return <LoadingSpinner />
  //   }
  //   if (error) {
  //     return <ErrorMessage error={error} />
  //   }

  return (
    <React.Fragment>
      <h1>Book search</h1>
      <SearchForm booksFound={handleBooksFound} />
      <BookList bookList={books} />
    </React.Fragment>
  )
}

export default App