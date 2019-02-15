import React, { Component } from 'react'
import NoteCard from '../NoteCard/NoteCard'
import { connect } from 'react-redux'

export class NoteArea extends Component {

  render() {
    const { items, notes } = this.props
    const noteCards = notes.map(note => {
      const noteItems = items.filter(item => item.noteID === note.id)

      return <NoteCard {...note} noteItems={noteItems} key={note.id}/>
    })

    return (
      <main>
        {noteCards}
      </main>
    )
  }
}

export const mapStateToProps = (state) => ({
  notes: state.notes,
  items: state.items
})

export default connect(mapStateToProps)(NoteArea)