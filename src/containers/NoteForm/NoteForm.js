import React, { Component } from 'react'

export class NoteForm extends Component {
  constructor() {
    super()
    this.state = {
      note: {
        title: '',
        id: Date.now()
      },
      items: []
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
    const { items, note } = this.state;
    e.preventDefault()
    this.setState({ items: [...items, { id: Date.now(), description: '', noteID: note.id }] })
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
        <button onClick={this.handleAddItem}>Add Item</button>
      </form>
    )
  }
}
export default NoteForm