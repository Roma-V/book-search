import React, { useState } from 'react'
// import { useApi } from './useApi'
// import LoadingSpinner from './LoadingSpinner'
// import ErrorMessage from './ErrorMessage'
import SearchForm from './components/SearchForm'
import BookList from './components/BookList'
import ModalView from './components/ModalView'

import './styles.css'

const App = () => {
  const [showBookDetails, setShowBookDetails] = useState(null)
  const [lastRef, setLastRef] = useState(null)

  function showModal(bookId, ref) {
    setShowBookDetails(bookId)
    document.body.style.overflow = 'hidden'
    setLastRef(ref)
  }

  function closeModal() {
    setShowBookDetails(null)
    document.body.style.overflow = 'unset'
    if (lastRef) {
      lastRef.current.focus()
    }
    setLastRef(null)
  }

  return (
    <React.Fragment>
      <SearchForm />
      <BookList openModal={showModal}/>
      {showBookDetails &&
      <ModalView
        id={showBookDetails}
        closeModal={closeModal}
        accessible={lastRef}
      />}
    </React.Fragment>
  )
}

export default App