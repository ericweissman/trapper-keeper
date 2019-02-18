import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

export class NoteCard extends Component {

  render() {
    const incomplete = this.props.noteItems.map((item) => {
      if (!item.isCompleted) {
        return <li key={item.id}>{item.description}</li>
      } else return []
    })
    const complete = this.props.noteItems.map((item) => {
      if (item.isCompleted) {
        return <li key={item.id}>{item.description} </li>
      } else return []
    })

    return (
      <Link to={`/notes/${this.props.id}`}>
        <div className='card'>
          <h2 className='card-title'>{this.props.title}</h2>
          <ul className='incomplete-items'>
            {incomplete}
          </ul>
          <ul className='complete-items'>
            {complete}
          </ul>
        </div>
      </Link>
    )
  }
}

NoteCard.propTypes = {
  id: PropTypes.string,
  noteItems: PropTypes.array,
  title: PropTypes.string,
}

NoteCard.defaultProps = {
  id: '',
  noteItems: [],
  title: '',
}

export default NoteCard