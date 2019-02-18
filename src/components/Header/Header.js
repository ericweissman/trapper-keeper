import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return(
    <header>
      <h1>TrapperKeeper</h1>
      <Link to='/new-note'>Add Note</Link>
    </header>
  )
}

export default Header