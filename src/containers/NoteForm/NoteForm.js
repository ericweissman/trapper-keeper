import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postNote } from '../../thunks/postNote'
import { Redirect, Link } from 'react-router-dom'
import { NoteItem } from '../../components/NoteItem/NoteItem'
import { editNote } from '../../thunks/editNote'
import { deleteNote } from '../../thunks/deleteNote'
import PropTypes from 'prop-types';
let shortID = require('short-id');

export class NoteForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      note: {
        title: this.props.note.title,
        id: this.props.note.id,
        timestamp: this.props.note.timestamp,
      },
      items: this.props.items,
      isDeleted: false,
      redirect: false
    }
  }

  componentDidMount = () => {
    !this.props.isEdit && this.setState({
      items: [{ id: shortID.generate(), description: '', noteID: this.state.note.id, timestamp: Date.now(), isCompleted: false }]
    })
  }

  handleTitleChange = (e) => {
    const { value } = e.target
    const { id, timestamp } = this.state.note
    this.setState({ note: { title: value, id, timestamp } })
  }

  handleItemChange = (e) => {
    const { name, value } = e.target
    const { items } = this.state
    const newItems = items.map(item => {
      if (item.id === name) {
        item.description = value
      }
      return item
    })
    this.setState({ items: newItems })
  }

  toggleComplete = (id) => {
    const { items } = this.state
    const newItems = items.map(item => {
      if (item.id === id) {
        item.isCompleted = !item.isCompleted
      }
      return item
    })
    this.setState({ items: newItems })
  }

  handleAddItem = (e) => {
    e.preventDefault()
    const { items, note } = this.state;
    this.setState({ items: [...items, { id: shortID.generate(), description: '', noteID: note.id, timestamp: Date.now(), isCompleted: false }] })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { id, title } = this.state.note;
    const { items } = this.state;
    const { isEdit, editNote, postNote } = this.props;
    const url = isEdit ? `http://localhost:3001/api/v1/notes/${id}` : 'http://localhost:3001/api/v1/notes'
    isEdit ? editNote(url, { id, title, items }) : postNote(url, { id, title, items })
    this.setState({ redirect: true })
  }

  handleDelete = () => {
    const { id } = this.state.note
    const url = `http://localhost:3001/api/v1/notes/${id}`
    this.props.deleteNote(url, id)
    this.setState({ redirect: true })
  }

  handleItemDelete = (id) => {
    let items = this.state.items.filter(item => item.id !== id)
    this.setState({ items })
  }

  render() {
    let { title } = this.state.note
    const { items } = this.state
    const { isEdit } = this.props

    return (
      <form>
        {
          this.state.redirect && <Redirect to='/' />
        }
        {
          isEdit ? <button onClick={this.handleDelete}>delete</button>
            : <Link to='/'><button>Go back</button></Link>
        }
        <input onChange={this.handleTitleChange} name='title' value={title}></input>
        {
          items.map((item) => {
            if (!item.isCompleted) {
              return <NoteItem item={item} handleItemChange={this.handleItemChange} handleItemDelete={this.handleItemDelete} key={item.id} toggleComplete={this.toggleComplete} />
            }
          })
        }
        <div onClick={this.handleAddItem}>Add Item</div>
        <section>
          {
            items.map((item) => {
              if (item.isCompleted) {
                return <NoteItem item={item} handleItemChange={this.handleItemChange} handleItemDelete={this.handleItemDelete} key={item.id} toggleComplete={this.toggleComplete} />              }
            })
          }
        </section>
        <button onClick={this.handleSubmit}>SAVE</button>
      </form>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  postNote: (url, note) => dispatch(postNote(url, note)),
  deleteNote: (url, id) => dispatch(deleteNote(url, id)),
  editNote: (url, note) => dispatch(editNote(url, note))
})

NoteForm.propTypes = {
  deleteNote: PropTypes.func,
  editNote: PropTypes.func,
  isEdit: PropTypes.bool,
  items: PropTypes.array,
  note: PropTypes.object,
  postNote: PropTypes.func,
}

NoteForm.defaultProps = {
  isEdit: false,
  items: [],
  note: {},
}

export default connect(null, mapDispatchToProps)(NoteForm)