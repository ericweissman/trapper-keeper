import React from 'react'
import checked from '../../images/checked.svg'
import PropTypes from 'prop-types';


export const CompleteItem = (props) => {
  return (
    <div className='completed'>
      <img src={checked}/>
      <p>{props.description}</p>
    </div>
  )
}

export default CompleteItem

CompleteItem.propTypes = {
  description: PropTypes.string,
}
