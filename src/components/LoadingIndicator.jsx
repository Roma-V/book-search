
import React from 'react'

import './LoadingIndicator.css'

const LoadingIndicator = ({ color }) => {
  const dorClassName = 'loading__dot' + (color ? ' loading__dot--' + color : '')

  return (
    <div className='loading'>
      <div className={dorClassName}></div>
      <div className={dorClassName}></div>
      <div className={dorClassName}></div>
    </div>
  )
}

export default LoadingIndicator