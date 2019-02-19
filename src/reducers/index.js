import { combineReducers } from 'redux';
import { itemsReducer } from './itemsReducer'
import { notesReducer } from './notesReducer'
import { isLoadingReducer } from './isLoadingReducer'
import { hasErroredReducer } from './hasErroredReducer'

export const rootReducer = combineReducers({
  items: itemsReducer,
  notes: notesReducer,
  isLoading: isLoadingReducer,
  error: hasErroredReducer,
});