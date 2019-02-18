import React from 'react'
import unchecked from '../../images/unchecked.svg'
import PropTypes from 'prop-types';

export const IncompleteItem = (props) => {
  return (
    <div className='incomplete'>
      <img src={unchecked}/>
      <p>{props.description}</p>
    </div>
  )
}

export default IncompleteItem

IncompleteItem.propTypes = {
  description: PropTypes.string,
}