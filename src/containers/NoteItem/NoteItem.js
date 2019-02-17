import React, { Component } from 'react'

export class NoteItem extends Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     isCompleted: false
  //   }
  // }

  toggle = () => {
    this.props.toggleComplete(this.props.item.id)
  }


  deleteItem = () => {
    this.props.handleItemDelete(this.props.item.id)
  } 

  render() {
    const { handleItemChange } = this.props;  
    return (
      <div>
        {
          this.props.item.isCompleted ?  
          <input checked type="checkbox" onClick={this.toggle} /> :
          <input type="checkbox" onClick={this.toggle} />
        }
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