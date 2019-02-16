import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { deleteNote } from '../../thunks/deleteNote'
import { editNote } from '../../thunks/editNote'
import {NoteItem} from '../NoteItem/NoteItem'

export class EditForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      note: {
        title: this.props.note.title,
        id: this.props.note.id
      },
      items: this.props.items,
      isDeleted: false,
      redirect: false,
    }
  }

  handleDelete = async () => {
    const { id } = this.state.note
    const url = `http://localhost:3001/api/v1/notes/${id}`
    this.props.deleteNote(url, id)
    this.setState({
      redirect: true,
    })
  }

  handleItemDelete = (id) => {
    let items = this.state.items.filter(item => item.id !== id)

    this.setState({ items})
  }

  handleItemChange = (e) => {
    const { name, value } = e.target
    const { items } = this.state
    const newItems = items.map(item => {
      if (item.id === parseInt(name)) {
        item.description = value
      }
      return item
    })
    this.setState({ items: newItems })
  }

  handleTitleChange = (e) => {
    const { value } = e.target
    const { id } = this.state.note
    this.setState({ note: { title: value, id } })
  }

  handleAddItem = (e) => {
    e.preventDefault()
    const { items, note } = this.state;
    this.setState({ items: [...items, { id: Date.now(), description: '', noteID: note.id }] })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { id, title } = this.state.note
    const { items } = this.state
    const url = `http://localhost:3001/api/v1/notes/${id}`
    this.props.editNote(url, { id, title, items })
    this.setState({
      redirect: true,
    })
  }

  render() {
    const { title } = this.state.note
    const items = this.state.items.map(item => {
      return <NoteItem item={item} handleItemChange={this.handleItemChange} handleItemDelete={this.handleItemDelete} key={item.id} />
    })

    return (
      <div>
        <button onClick={this.handleDelete}>delete</button>
        <input onChange={this.handleTitleChange} name='title' value={title}/>
        {items}
        <button onClick={this.handleSubmit}>Update Note</button>
        {
          this.state.redirect && <Redirect to='/'/>
        }
        <div onClick={this.handleAddItem}>Add Item</div>
      </div>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  deleteNote: (url, id) => dispatch(deleteNote(url, id)),
  editNote: (url, note) => dispatch(editNote(url, note))
})

export default connect(null, mapDispatchToProps)(EditForm)