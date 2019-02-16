import React, { Component } from 'react'

export class NoteItem extends Component {

  deleteItem = () => {
    this.props.handleItemDelete(this.props.item.id)
  } 

  render() {
    const { handleItemChange } = this.props;  
    return (
      <div>
        <input type="checkbox"/>
        <input
          type="text"
          name={this.props.item.id}
          value={this.props.item.description}
          onChange={handleItemChange}
        />
        <button onClick={this.deleteItem}>x</button>
      </div>
    )
  }
}

export default NoteItem