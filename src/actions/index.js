//add note
//remove note
//edit a note

//GET NOTES
export const setNotes = (notes) => ({
  type: 'SET_NOTES',
  notes,
})

export const setItems = (items) => ({
  type: 'SET_ITEMS',
  items,
})

//ADD NOTE
export const addNote = (note) => ({
  type: 'ADD_NOTE',
  note,
})

export const addNoteItems = (items) => ({
  type: 'ADD_NOTE_ITEMS',
  items,
})

//DELETE NOTE
export const deleteNote = (id) => ({
  type: 'DELETE_NOTE',
  id,
})

export const deleteNoteItems = (noteID) => ({
  type: 'DELETE_NOTE_ITEMS',
  noteID,
})