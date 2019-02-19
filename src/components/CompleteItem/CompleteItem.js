import React from 'react'
import PropTypes from 'prop-types';

export const CompleteItem = (props) => {
  return (
    <div className='completed'>
      <p>{props.description}</p>
    </div>
  )
}

export default CompleteItem

CompleteItem.propTypes = {
  description: PropTypes.string,
}
