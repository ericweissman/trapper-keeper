import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteNote, deleteNoteItems } from '../../actions'
import { Link, Redirect } from 'react-router-dom'

export class EditForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      note: {
        title: this.props.note.title,
        id: this.props.note.id
      },
      items: this.props.items,
      isDeleted: false
    }
  }

  handleDelete = async () => {
    this.props.deleteNote(this.state.note.id)
    this.props.deleteNoteItems(this.state.note.id)
    await fetch(`http://localhost:3001/api/v1/notes/${this.state.note.id}`, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" }
    })

    // await this.setState({isDeleted: true})
 
  }


  render() {
    // if (this.state.isDeleted) {
    //   return <Redirect to='/' />
    // }
    const { title } = this.state.note
    // const {items} = this.state

    const items = this.state.items.map(item => {
      return <div>{item.description}</div>
    })

    return (
      <div>
        <Link to='/'><button onClick={this.handleDelete}>delete</button></Link>
        {title}
        {items}
      </div>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  deleteNote: (id) => dispatch(deleteNote(id)),
  deleteNoteItems: (noteID) => dispatch(deleteNoteItems(noteID))
})

export default connect(null, mapDispatchToProps)(EditForm)