import { notesReducer } from '../notesReducer'
import * as actions from '../../actions'

describe('notesReducer', () => {

  it('should return initial state', () => {
    //setup 
    const expected = []
    //execution
    const result = notesReducer(undefined, {})
    //expectation
    expect(result).toEqual(expected)
  })

  it('should get all notes', () => {
    //setup
    const initialState = []
    const expected = [{}, {}]
    //execution
    const result = notesReducer(initialState, actions.getNotesSuccess({notes: [{}, {}], items: [{}]}))
    //expectation
    expect(result).toEqual(expected)
  })

  it('should post a note', () => {
    //setup
    const initialState = [{}, {}]
    const expected = [{}, {}, { id: 1, title: 'New'}]
    //execution
    const result = notesReducer(initialState, actions.postNoteSuccess({ id: 1, title: 'New', items: []} ))
    //expectation
    expect(result).toEqual(expected)
  })

  it('should delete a note', () => {
    //setup
    const initialState = [{}, {}, { id: 1, title: 'New' }]
    const expected = [{}, {}]
    //execution
    const result = notesReducer(initialState, actions.deleteNoteSuccess(1))
    //expectation
    expect(result).toEqual(expected)
  })

  it('should edit a note', () => {
    //setup
    const initialState = [{}, {}, { id: 1, title: 'New' }]
    const expected = [{}, {}, { id: 1, title: 'Changed Title' }]
    //execution
    const result = notesReducer(initialState, actions.editNoteSuccess({ id: 1, title: 'Changed Title', items: [] }))
    //expectation
    expect(result).toEqual(expected)
  })

})