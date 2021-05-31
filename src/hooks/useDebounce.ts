import { useState, useEffect } from 'react'

export function useDebounce(input: string, delay: number) {
  const [newValue, setNewValue] = useState<string>('')
  const [timerId, setTimerId] = useState<number | undefined>()

  useEffect(() => {
    if (timerId) cancelQuery()

    const id: number = setTimeout(() => input && setNewValue(input), delay) as unknown as number
    setTimerId(id)

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