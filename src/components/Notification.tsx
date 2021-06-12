import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectNumFound, setIdleStatus } from '../store/booksSlice'
import { RootState } from '../store/store'
import { BooksState } from '../utils/types'

import './Notification.css'

const Notification: React.FC = () => {
  const [timerId, setTimerId] = useState<number | null>(null)
  const dispatch = useDispatch()

  const showing = useSelector<RootState, boolean>(state => !['idle', 'loading'].includes(state.books.status))
  const status = useSelector<RootState, BooksState['status']>(state => state.books.status)
  const error = useSelector<RootState, BooksState['error']>(state => state.books.error)
  const numFoundBooks = useSelector(selectNumFound)

  useEffect(() => {
    if (showing) {
      if (timerId) clearTimeout(timerId)

      const id = setTimeout(() => {
        dispatch(setIdleStatus())
      }, 5000) as unknown as number

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