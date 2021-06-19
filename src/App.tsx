import * as React from 'react'
import { useState } from 'react'

import SearchForm from './components/SearchForm'
import Notification from './components/Notification'
import BookList from './components/BookList'
import ModalView from './components/ModalView'

import { ElementRef } from './utils/types'

import './styles.css'

const App: React.FC = () => {
  const [showBookDetails, setShowBookDetails] = useState<string | null>(null)
  const [lastRef, setLastRef] = useState<ElementRef>(null)

  function showModal(bookId: string, ref: ElementRef) {
    setShowBookDetails(bookId)
    document.body.style.overflow = 'hidden'
    setLastRef(ref)
  }

  function closeModal() {
    setShowBookDetails(null)
    document.body.style.overflow = 'unset'
    if (lastRef) {
      lastRef.current?.focus()
    }
    setLastRef(null)
  }

  return (
    <React.Fragment>
      <SearchForm />
      <Notification />
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