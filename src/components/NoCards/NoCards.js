import React from 'react'
import { Link } from 'react-router-dom'

export const NoCards = () => {
  return (
    <div className='no-cards'>
      <h3>You currently have no notes</h3>
      <Link to='/new-note'>Start a new note!</Link>
    </div>
  )
}

export default NoCards