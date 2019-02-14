import { combineReducers } from 'redux';
import { itemsReducer } from './itemsReducer'
import { notesReducer } from './notesReducer'

export const rootReducer = combineReducers({
  items: itemsReducer,
  notes: notesReducer,
});