import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

const ErrorMessage = (props) => {
  const { error } = props
  return (
    <div className="error-msg">
      <h3 className='test'>there has been an error: {error}</h3>
      <Link to='/'>
        Return to All Notes
      </Link>
    </div>
  )
}

ErrorMessage.propTypes = {
  error: PropTypes.string,
}

ErrorMessage.defaultProps = {
  error: ''
}

export default ErrorMessage