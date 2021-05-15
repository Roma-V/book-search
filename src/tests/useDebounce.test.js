import React, { useState } from 'react'
import { render, fireEvent, getByTestId, act } from '@testing-library/react'

import { useDebounce } from '../hooks/useDebounce'

const HookTestComponent = ({ delay }) => {
  const [input, setInput] = useState('')
  const [newValue, cancelQuery] = useDebounce(input, delay)

  return (
    <>
      <input
        type="text"
        value={input}
        data-testid="input"
        onChange={(e) => setInput(e.target.value)}
      />
      <p data-testid="debounced-value">{newValue}</p>
    </>
  )
}

const newValue = 'new input'
const delay = 1000

// jest.useFakeTimers()

describe('useDebounce hook', () => {
  test('returns initial value immidiately', () => {
    const component = render(<HookTestComponent delay={delay} />)
    expect(component.getByTestId('debounced-value')).toHaveTextContent('')
  })

  test('does not change value immidiately on input', () => {
    const component = render(<HookTestComponent delay={delay} />)
    const inputElement = component.getByTestId('input')

    act(() => {
      fireEvent.change(inputElement, { target: { value: newValue } })
    })

    expect(component.getByTestId('debounced-value')).toHaveTextContent('')
  })

//   test('changes value after the specified delay', async () => {
//     const component = render(<HookTestComponent delay={delay} />)
//     const input = component.getByTestId('input')

//     act(() => {
//       fireEvent.change(input, { target: { value: newValue } })
//     })

//     await act(() => new Promise(resolve => setTimeout(resolve, 1000)))

//     expect(component.getByTestId('debounced-value')).toHaveTextContent(newValue)
//   })

  test.todo('does not change value if called cancelQuery')
})