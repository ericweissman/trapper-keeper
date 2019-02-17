import { itemsReducer } from '../itemsReducer'
import * as actions from '../../actions'

describe('itemsReducer', () => {

  it('should return initial state', () => {
    //setup 
    const expected = []
    //execution
    const result = itemsReducer(undefined, {})
    //expectation
    expect(result).toEqual(expected)
  })

  it('should get all items', () => {
    //setup
    const initialState = []
    const expected = [{}, {}]
    //execution
    const result = itemsReducer(initialState, actions.getNotesSuccess({ notes: [{}], items: [{}, {}] }))
    //expectation
    expect(result).toEqual(expected)
  })

  it('should post an item', () => {
    //setup
    const initialState = [{}, {}]
    const expected = [{}, {}, { id: 1, description: 'New Item', noteID: 30 }]
    //execution
    const result = itemsReducer(initialState, actions.postNoteSuccess({ id: 30, title: 'New', items: [{ id: 1, description: 'New Item', noteID: 30 }] }))
    //expectation
    expect(result).toEqual(expected)
  })

  it('should delete an item', () => {
    //setup
    const initialState = [{}, {}, { id: 1, description: 'New Item', noteID: 30 }]
    const expected = [{}, {}]
    //execution
    const result = itemsReducer(initialState, actions.deleteNoteSuccess(30))
    //expectation
    expect(result).toEqual(expected)
  })

  it('should edit an item', () => {
    //setup
    const initialState = [{}, {}, { id: 1, description: 'New Item', noteID: 30 }]
    const expected = [{}, {}, { id: 1, description: 'Changed Item', noteID: 30 }]
    //execution
    const result = itemsReducer(initialState, actions.editNoteSuccess({ id: 30, title: 'Title', items: [{ id: 1, description: 'Changed Item', noteID: 30 }] }))
    //expectation
    expect(result).toEqual(expected)
  })

})