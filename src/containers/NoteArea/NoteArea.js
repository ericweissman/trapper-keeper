import React, { Component } from 'react'
import NoteCard from '../NoteCard/NoteCard'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-css'
import '../../Main.scss'

export class NoteArea extends Component {



  render() {
    const { items, notes } = this.props

    const breakpointColumnsObj = {
      default: 4,
      1100: 3,
      700: 2,
      500: 1
    };

    const noteCards = notes.map(note => {
      const noteItems = items.filter(item => item.noteID === note.id)

      return <NoteCard {...note} noteItems={noteItems} key={note.id}/>
    }).reverse()

    return (
      <Masonry breakpointCols={breakpointColumnsObj}
        className="note-area-grid"
        columnClassName="note-area-grid_column">
        {noteCards}
      </Masonry>
    )
  }
}

export const mapStateToProps = (state) => ({
  notes: state.notes,
  items: state.items
})

NoteArea.propTypes = {
  items: PropTypes.array,
  notes: PropTypes.array,
}

NoteArea.defaultProps = {
  items: [],
  notes: []
}

export default connect(mapStateToProps)(NoteArea)