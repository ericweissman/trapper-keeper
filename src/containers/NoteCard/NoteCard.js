import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CompleteItem from '../../components/CompleteItem/CompleteItem.js'
import IncompleteItem from '../../components/IncompleteItem/IncompleteItem.js'
import PropTypes from 'prop-types';

export class NoteCard extends Component {

  render() {
    const incomplete = this.props.noteItems.map((item) => {
      if (!item.isCompleted) {
        return <IncompleteItem key={item.id} description={item.description}/>
      } else return []
    })
    const complete = this.props.noteItems.map((item) => {
      if (item.isCompleted) {
        return <CompleteItem key={item.id} description={item.description} />
      } else return []
    })

    return (
      <Link to={`/notes/${this.props.id}`}>
        <div className='card'>
          <h2 className='card-title'>{this.props.title}</h2>
          <div className='incomplete-items'>
            {incomplete}
          </div>
          <div className='complete-items'>
            {complete}
          </div>
        </div>
      </Link>
    )
  }
}

NoteCard.propTypes = {
  id: PropTypes.number,
  noteItems: PropTypes.array,
  title: PropTypes.string,
}

NoteCard.defaultProps = {
  noteItems: [],
  title: '',
}

export default NoteCard