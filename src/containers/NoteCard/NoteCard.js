import React, { Component } from 'react'
import NoteItem from '../NoteItem/NoteItem'
import { Link } from 'react-router-dom'

export class NoteCard extends Component {

  render() {
    const cardItems = this.props.noteItems.map(item => {
      return <NoteItem item={item} key={item.id} />
    })

    return (
      <Link to={`/notes/${this.props.id}`}>
        <div>
          <h2>{this.props.title}</h2>
          {cardItems}
        </div>
      </Link>
    )
  }
}

export default NoteCard