import React from 'react'
import PropTypes from 'prop-types';


export const NoteItem = (props) => {
  const { handleItemChange, handleItemDelete, toggleComplete } = props;
  const { isCompleted, id, description } = props.item;

  const toggle = () => toggleComplete(id)
  const deleteItem = () => handleItemDelete(id)
  
  return (
    <div>
      {
        isCompleted ?
          <input checked type="checkbox" className="checkbox" onChange={toggle} /> :
          <input type="checkbox" className="checkbox" onChange={toggle} />
      }
      <input
        type="text"
        className='item-input'
        name={id}
        placeholder="new item"
        value={description}
        onChange={handleItemChange}
      />
      <button className="item-del" onClick={deleteItem}>x</button>
    </div>
  )
}

NoteItem.propTypes = {
  item: PropTypes.object,
  handleItemChange: PropTypes.func,
  handleItemDelete: PropTypes.func,
  toggleComplete: PropTypes.func,
}


export default NoteItem