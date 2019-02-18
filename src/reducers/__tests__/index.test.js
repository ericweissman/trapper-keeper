import { createStore } from 'redux';
import { rootReducer } from '../index';

describe('rootReducer', () => {
  let store = createStore(rootReducer)
  
  it('should set the store with an initial state', () => {
    let expected = {
      items: [],
      notes: [],
      isLoading: true,
      error: '',
    }
    
    expect(store.getState()).toEqual(expected)
  })

  it('should dispatch isLoading action', () => {
    let action = {type: 'IS_LOADING', isLoading: false }
    let expected = false;

    store.dispatch(action)
    expect(store.getState().isLoading).toEqual(expected)
  })

  it('should dispatch error action', () => {
    let action = {type: 'HAS_ERRORED', message: 'test' }
    let expected = 'test';

    store.dispatch(action)
    expect(store.getState().error).toEqual(expected)
  })

  it('should dispatch items action', () => {
    let action = { type: 'GET_NOTES_SUCCESS', notes: [], items: [{}, {}]}
    let expected = [{}, {}];

    store.dispatch(action)
    expect(store.getState().items).toEqual(expected)
  })

  it('should dispatch notes action', () => {
    let action = { type: 'GET_NOTES_SUCCESS', notes: [{}, {}, {}], items: [] }
    let expected = [{}, {}, {}];

    store.dispatch(action)
    expect(store.getState().notes).toEqual(expected)
  })
})