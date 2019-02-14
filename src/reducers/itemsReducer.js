export const itemsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ITEMS':
      return action.items;
    case 'ADD_NOTE_ITEMS':
      return [...state, ...action.items]
    default:
      return state;
  }
}