import React from 'react'

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
        name={id}
        value={description}
        onChange={handleItemChange}
      />
      <button className="item-del" onClick={deleteItem}>x</button>
    </div>
  )
}

export default NoteItem