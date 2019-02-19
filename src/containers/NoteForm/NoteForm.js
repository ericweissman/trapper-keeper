import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postNote } from '../../thunks/postNote'
import { Redirect, Link } from 'react-router-dom'
import { NoteItem } from '../../components/NoteItem/NoteItem'
import { editNote } from '../../thunks/editNote'
import { deleteNote } from '../../thunks/deleteNote'
import NoteArea from '../NoteArea/NoteArea'
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
      redirect: false
    }
  }

  handleTitleChange = (e) => {
    const { value } = e.target
    const { id, timestamp } = this.state.note
    let items = this.state.items;

    if (value !== '') items = [this.addNewBlankItem()]

    this.setState({ note: { title: value, id, timestamp }, items })
  }

  addNewBlankItem = () => {
    const { id } = this.state.note;
    return { id: shortID.generate(), description: '', noteID: id, timestamp: Date.now(), isCompleted: false }
  }

  handleItemChange = (e) => {
    const { name, value } = e.target;
    const { items } = this.state;

    const updatedItems = items.map(item => {
      if (item.id === name) {
        item.description = value
      }
      return item
    })
    let newItems;

    if (items[items.length - 1].description !== '') {
      newItems = [...items, this.addNewBlankItem()]
    } else {
      newItems = updatedItems
    }

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

  handleSubmit = (e) => {
    e.preventDefault()
    const { id, title } = this.state.note;
    let newItems = this.state.items;
    const { isEdit, editNote, postNote } = this.props;
    const url = isEdit ? `http://localhost:3001/api/v1/notes/${id}` : 'http://localhost:3001/api/v1/notes'

    if (newItems[newItems.length - 1].description === '') {
      newItems = newItems.filter(item => item.description !== '')
    }
    isEdit ? editNote(url, { id, title, items: newItems }) : postNote(url, { id, title, items: newItems })
    this.setState({ redirect: true, items: newItems })
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
    const notCompletedItems = items.map((item) => {
      if (!item.isCompleted) {
        return <NoteItem item={item} handleItemChange={this.handleItemChange} handleItemDelete={this.handleItemDelete} key={item.id} toggleComplete={this.toggleComplete} />
      } else return null
    })
    const completedItems = items.map((item) => {
      if (item.isCompleted) {
        return <NoteItem item={item} handleItemChange={this.handleItemChange} handleItemDelete={this.handleItemDelete} key={item.id} toggleComplete={this.toggleComplete} />
      } else return null
    })

    return (
      <div>
        <NoteArea />
        <div className='form-container'>
          <form className='form'>
            {this.state.redirect && <Redirect to='/' />}
            <div>
              {
                isEdit ? <button onClick={this.handleDelete}>delete</button>
                  : <Link to='/'><button>Go back</button></Link>
              }
            </div>
            <input onChange={this.handleTitleChange} placeholder="title" name='title' value={title}></input>
            <section>
              {notCompletedItems}
            </section>
            <section>
              {completedItems}
            </section>
            <button onClick={this.handleSubmit}>SAVE</button>
          </form>
        </div>
      </div>
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