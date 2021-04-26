import React, { useState } from 'react'
// import { useApi } from './useApi'
// import LoadingSpinner from './LoadingSpinner'
// import ErrorMessage from './ErrorMessage'
import SearchForm from './components/SearchForm'
import BookList from './components/BookList'
import ModalView from './components/ModalView'

import './styles.css'



const App = () => {
  const [books, setBooks] = useState([])
  const [showBookDetails, setShowBookDetails] = useState(null)
  const [lastRef, setLastRef] = useState(null)

  function handleBooksFound(books) {
    setBooks(books)
  }

  function showModal(book, ref) {
    setShowBookDetails(book)
    document.body.style.overflow = 'hidden'
    setLastRef(ref)
  }

  function closeModal() {
    setShowBookDetails(null)
    document.body.style.overflow = 'unset'
    if (lastRef) lastRef.current.focus()
  }

  return (
    <React.Fragment>
      <SearchForm booksFound={handleBooksFound} />
      <BookList bookList={books} openModal={showModal}/>
      {showBookDetails && <ModalView book={showBookDetails} closeModal={closeModal} />}
    </React.Fragment>
  )
}

export default App