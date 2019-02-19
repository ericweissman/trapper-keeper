import React from 'react'

export const NoteItem = (props) => {
  const { handleItemChange, handleItemDelete, toggleComplete } = props;
  const { isCompleted, id, description } = props.item;

  const toggle = () => toggleComplete(id)
  const deleteItem = () => handleItemDelete(id)

  return (
    <div className='noteitem-container'>
      {
        isCompleted ?
          <input checked type="checkbox" className='checkbox' onChange={toggle} />
          :
          <input type="checkbox" className='checkbox' onChange={toggle} />
      }
      <input
        type="text"
        className='form-input item-input'
        autocomplete="off"
        name={id}
        placeholder="new item"
        value={description}
        onChange={handleItemChange}
      />
      <button className="item-del" onClick={deleteItem}>x</button>
    </div>
  )
}

export default NoteItem