import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postNote } from '../../thunks/postNote'
import { Redirect, Link } from 'react-router-dom'
import { NoteItem } from '../NoteItem/NoteItem'

export class NoteForm extends Component {
  constructor() {
    super()
    this.state = {
      note: {
        title: '',
        id: Date.now()
      },
      items: [],
      redirect: false
    }
  }

  componentDidMount = () => {
    this.setState({ items: [{ id: Date.now(), description: '', noteID: this.state.note.id }] })
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
    const { id, title } = this.state.note;
    const { items } = this.state;
    const url = 'http://localhost:3001/api/v1/notes'
    this.props.postNote(url, { id, title, items })
    this.setState({
      redirect: true
    })
  }

  render() {
    let { items, title } = this.state
    if (items.length === 0) {
      items = [{id: -1, description: 'no items to display'}]
      } 
        
    return (
      <form>
        <Link to='/'><button>Go back</button></Link>
        <input placeholder='Title' onChange={this.handleTitleChange} name='title' value={title}></input>
        {
          items.map((item, i) => {
            return <NoteItem item={item} handleItemChange={this.handleItemChange} key={item.id} />
          })
        }
        {/*NEED TO FIX THIS TO BE A BUTTON AND CHANGE THE BEHAVIOR */}
        <div onClick={this.handleAddItem}>Add Item</div>
        {
          this.state.redirect && <Redirect to='/' />
        }
        <button onClick={this.handleSubmit}>SAVE</button>
      </form>
    )
  }
}
export const mapDispatchToProps = (dispatch) => ({
  postNote: (url, note) => dispatch(postNote(url, note))
})

export default connect(null, mapDispatchToProps)(NoteForm)