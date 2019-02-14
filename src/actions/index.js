//add note
//remove note
//edit a note

export const setNotes = (notes) => ({
  type: 'SET_NOTES',
  notes,
})

export const setItems = (items) => ({
  type: 'SET_ITEMS',
  items,
})

export const addNote = (note) => ({
  type: 'ADD_NOTE',
  note,
})

export const addNoteItems = (items) => ({
  type: 'ADD_NOTE_ITEMS',
  items,
})