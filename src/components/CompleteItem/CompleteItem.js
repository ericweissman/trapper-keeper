import React from 'react'
import checked from '../../images/checked.svg'

export const CompleteItem = (props) => {
  return (
    <div className='completed'>
      <img src={checked}/>
      <p>{props.description}</p>
    </div>
  )
}

export default CompleteItem