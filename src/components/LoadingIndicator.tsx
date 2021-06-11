
import React from 'react'

import { LoadingIndicatorProps } from '../utils/types'

import './LoadingIndicator.css'

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ color }: LoadingIndicatorProps) => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const dorClassName = 'loading__dot' + (color ? ` loading__dot--${color}` : '')

  return (
    <div className='loading'>
      <div className={dorClassName}></div>
      <div className={dorClassName}></div>
      <div className={dorClassName}></div>
    </div>
  )
}

export default LoadingIndicator