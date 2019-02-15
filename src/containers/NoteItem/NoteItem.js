import React, { Component } from 'react'

export class NoteItem extends Component {
  render() {
    return (
      <div>
        {this.props.item.description}
      </div>
    )
  }
}

export default NoteItem