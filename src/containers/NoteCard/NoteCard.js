import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class NoteCard extends Component {

  render() {
    const cardItems = this.props.noteItems.map(item => {
      return <p key={item.id}>{item.description}</p>
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