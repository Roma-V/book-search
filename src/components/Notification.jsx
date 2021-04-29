import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectNumFound, setIdleStatus } from '../store/booksSlice'

import './Notification.css'

const Notification = () => {
  const [timerId, setTimerId] = useState(null)
  const dispatch = useDispatch()

  const showing = useSelector(state => !['idle', 'loading'].includes(state.books.status))
  const status = useSelector(state => state.books.status)
  const error = useSelector(state => state.books.error)
  const numFoundBooks = useSelector(selectNumFound)

  useEffect(() => {
    if (showing) {
      if (timerId) clearTimeout(id)

      const id = setTimeout(() => {
        dispatch(setIdleStatus())
      }, 5000)

      setTimerId(id)
    }
  }, [showing])

  if (!showing) return null

  if (status === 'succeeded') return (
    <p className='notification' >
      A total of {numFoundBooks} book{numFoundBooks === 1 ? '' : 's'} found.
    </p>
  )

  if (status === 'failed') return (
    <p className='notification error' >
      {error && error.message}
    </p>
  )

  return null
}

export default Notification