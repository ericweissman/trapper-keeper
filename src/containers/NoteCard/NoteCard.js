import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class NoteCard extends Component {

  render() {
    const incomplete = this.props.noteItems.map((item) => {
      if (!item.isCompleted) {
        return <p key={item.id}>{item.description}</p>
      }
    })
    const complete = this.props.noteItems.map((item) => {
      if (item.isCompleted) {
        return <p key={item.id}>{item.description}</p>
      }
    })

    return (
      <Link to={`/notes/${this.props.id}`}>
        <div>
          <h2>{this.props.title}</h2>
          <div>
            incomplete
            {incomplete}
          </div>
          <div>Completed
            {complete}
          </div>
        </div>
      </Link>
    )
  }
}

export default NoteCard