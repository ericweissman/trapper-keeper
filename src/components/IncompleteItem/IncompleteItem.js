import React from 'react'
import PropTypes from 'prop-types';

export const IncompleteItem = (props) => {
  return (
    <div className='incomplete'>
      <p>{props.description}</p>
    </div>
  )
}

export default IncompleteItem

IncompleteItem.propTypes = {
  description: PropTypes.string,
}