export const notesReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_NOTES_SUCCESS':
      return action.notes;  
    case 'POST_NOTE_SUCCESS':
      return [...state, action.note]
    case 'DELETE_NOTE_SUCCESS':
      return state.filter(note => note.id !== action.id)
    case 'EDIT_NOTE_SUCCESS':
      const cleaned = state.filter(note => note.id !== action.id)
      return [...cleaned, ...action.notes]
    default:
      return state;
  }
}