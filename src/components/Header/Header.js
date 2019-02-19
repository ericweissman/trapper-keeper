import React from 'react'
import { Link } from 'react-router-dom'
import addbtnWhite from '../../images/addbtn.svg'

const Header = () => {
  return(
    <header>
      <h1>TrapperKeeper</h1>
      <Link to='/new-note'>
        <img src={addbtnWhite}/>
        <p>Add New Note</p>
      </Link>
    </header>
  )
}

export default Header