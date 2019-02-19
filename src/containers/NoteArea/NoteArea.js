import React, { Component } from 'react'
import NoteCard from '../NoteCard/NoteCard'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-css'
import Loading from '../../components/Loading/Loading'
import '../../Main.scss'

export class NoteArea extends Component {



  render() {
    const { items, notes, isLoading } = this.props

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

    switch (isLoading) {
      case true:
        return <Loading />
      default:
        return (
          <Masonry breakpointCols={breakpointColumnsObj}
            className="note-area-grid"
            columnClassName="note-area-grid_column">
            {noteCards}
          </Masonry>
        )
    }
  }
}

export const mapStateToProps = (state) => ({
  notes: state.notes,
  items: state.items,
  isLoading: state.isLoading,
})

NoteArea.propTypes = {
  items: PropTypes.array,
  notes: PropTypes.array,
  isLoading: PropTypes.bool,
}

NoteArea.defaultProps = {
  isLoading: true,
  items: [],
  notes: []
}

export default connect(mapStateToProps)(NoteArea)