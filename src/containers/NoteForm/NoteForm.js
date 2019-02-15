import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postNote } from '../../thunks/postNote'
import { Redirect } from 'react-router-dom'

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

  //  this.props.items || 

  handleOnChange = (e) => {
    const { name, value } = e.target
    const { items, note } = this.state
    if (name === 'title') {
      this.setState({ note: {title: value, id: note.id} })
    } else {
      const newItems = items.map(item => {
        if (item.id === parseInt(name)) {
          item.description = value
        }
        return item
      })
      this.setState({ items: newItems })
    }
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
    this.props.postNote(url, {id, title, items})
     this.setState({
      redirect: true
    })
  }

  render() {
    const { items, title } = this.state
    return (
      <form>
        <input placeholder='Title' onChange={this.handleOnChange} name='title' value={title}></input>
        {
          items.map((item, i) => {
            return <input placeholder='item' onChange={this.handleOnChange} name={item.id} value={items[i].description} key={item.id} ></input>
          })
        }
        {/*NEED TO FIX THIS TO BE A BUTTON AND CHANGE THE BEHAVIOR */}
        <div onClick={this.handleAddItem}>Add Item</div>
        {
          this.state.redirect && <Redirect to='/'/>
        }
          <button onClick={this.handleSubmit}>SAVE</button>

        
      </form>
    )
  }
}
export const mapDispatchToProps = (dispatch) => ({
  // addNote: (note) => dispatch(addNote(note)),
  // addNoteItems: (items) => dispatch(addNoteItems(items))
  postNote: (url, action) => dispatch(postNote(url, action))
 })

export default connect(null, mapDispatchToProps)(NoteForm)