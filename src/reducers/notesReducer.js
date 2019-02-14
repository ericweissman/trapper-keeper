export const notesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_NOTES':
      return action.notes;  
    case 'ADD_NOTE':
      return [...state, action.note]
      case 'DELETE_NOTE':
        return state.filter(note => note.id !== action.id)
    default:
      return state;
  }
}