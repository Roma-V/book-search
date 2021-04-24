import { useState, useEffect, useCallback } from 'react'

export function useDebounce(input, delay) {
  const [newValue, setNewValue] = useState('')
  const memoizedCallback = useCallback(
    () => {
      setNewValue(input)
    },
    [input],
  )
  const [timerId, setTimerId] = useState(null)

  useEffect(() => {
    if (timerId) {
      cancelQuery()
    }
    setTimerId(setTimeout(memoizedCallback, delay))
  }, [input, delay])

  function cancelQuery() {
    clearTimeout(timerId)
    setTimerId(undefined)
  }

  return [newValue, cancelQuery]
}