export const notesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_NOTES':
      return action.notes;  
    case 'ADD_NOTE':
      return [...state, action.note]
    default:
      return state;
  }
}