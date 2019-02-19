import React from 'react'
import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <div className='not-found'>
      <h3>404 Not Found</h3>
      <Link to='/'>Return to All Notes</Link>
    </div>
  )
}

export default NotFound