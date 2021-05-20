import { useState, useEffect } from 'react'

export function useDebounce(input, delay) {
  const [newValue, setNewValue] = useState('')
  const [timerId, setTimerId] = useState(null)

  useEffect(() => {
    if (timerId) cancelQuery()
    setTimerId(setTimeout(() => input && setNewValue(input), delay))
    return function() {
      clearTimeout(timerId)
    }
  }, [input, delay])

  function cancelQuery() {
    clearTimeout(timerId)
    setTimerId(undefined)
  }

  return [newValue, cancelQuery]
}