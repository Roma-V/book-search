import React, { useState } from 'react'
import { render, fireEvent, act } from '@testing-library/react'

import { useDebounce } from '../hooks/useDebounce'

/**
 * A mock React component is nedded to run the standard hooks.
 * @param {Object} props - an object with a delay property,
 *                         which is delay in ms to be applied in debounce.
 * @returns {JSX} - The rendered component.
 */
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
      <button onClick={() => cancelQuery()}>Cancel</button>
    </>
  )
}

const newValue = 'new input'
const delay = 1000

describe('useDebounce hook', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern')
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('returns initial value immidiately', () => {
    const component = render(<HookTestComponent delay={delay} />)
    expect(component.getByTestId('debounced-value')).toBeEmptyDOMElement()
  })

  test('does not change value immidiately on input', () => {
    const component = render(<HookTestComponent delay={delay} />)
    const inputElement = component.getByTestId('input')

    act(() => {
      fireEvent.change(inputElement, { target: { value: newValue } })
    })

    expect(component.getByTestId('debounced-value')).toBeEmptyDOMElement()
  })

  test('changes value after the specified delay', () => {
    const component = render(<HookTestComponent delay={delay} />)
    const input = component.getByTestId('input')

    act(() => {
      fireEvent.change(input, { target: { value: newValue } })
    })
    act(() => {
      jest.runAllTimers()
    })

    expect(component.getByTestId('debounced-value')).toHaveTextContent(newValue)
  })

  test('does not change value if called cancelQuery', () => {
    const component = render(<HookTestComponent delay={delay} />)
    const input = component.getByTestId('input')

    act(() => {
      fireEvent.change(input, { target: { value: newValue } })
    })
    act(() => {
      jest.advanceTimersByTime(delay/2)
    })

    expect(component.getByTestId('debounced-value')).toBeEmptyDOMElement()

    act(() => {
      fireEvent.click(component.getByText('Cancel'))
    })
    act(() => {
      jest.advanceTimersByTime(delay)
    })

    expect(component.getByTestId('debounced-value')).toBeEmptyDOMElement()
  })
})