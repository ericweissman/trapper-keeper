import * as actions from './index'

describe('action', () => {

  it('should return type of IS_LOADING with a bool', () => {
    //setup
    const bool = true
    const expected = { "type": "IS_LOADING", "isLoading": true }
    //execution
    const result = actions.isLoading(bool)
    //expectation
    expect(result).toEqual(expected)
  })

  it('should return type of HAS_ERRORED with a message', () => {
    //setup
    const message = 'Something went wrong'
    const expected = { "type": "HAS_ERRORED", "message": 'Something went wrong' }
    //execution
    const result = actions.hasErrored(message)
    //expectation
    expect(result).toEqual(expected)
  })

  it('should return type of GET_NOTES_SUCCESS with notes and items', () => {
    //setup
    const notes = [{}, {}]
    const items = [{}, {}]
    const expected = { "type": "GET_NOTES_SUCCESS", "notes": notes, "items": items }
    //execution
    const result = actions.getNotesSuccess({notes, items})
    //expectation
    expect(result).toEqual(expected)
  })

  it('should return type of POST_NOTE_SUCCESS with a note and items', () => {
    //setup
    const id = 1
    const title = 'New Title'
    const items = [{}, {}]
    const expected = { "type": "POST_NOTE_SUCCESS", "note": { "id": id, "title": title}, "items": items }
    //execution
    const result = actions.postNoteSuccess({ id, title, items })
    //expectation
    expect(result).toEqual(expected)
  })

  it('should return type of DELETE_NOTE_SUCCESS with an id', () => {
    //setup
    const id = 1
    const expected = { "type": "DELETE_NOTE_SUCCESS", "id": id}
    //execution
    const result = actions.deleteNoteSuccess(id)
    //expectation
    expect(result).toEqual(expected)
  })

  it('should return type of EDIT_NOTE_SUCCESS with a note and items', () => {
    //setup
    const id = 1
    const title = 'New Title'
    const items = [{}, {}]
    const expected = { "type": "EDIT_NOTE_SUCCESS", "note": { "id": id, "title": title }, "items": items }
    //execution
    const result = actions.editNoteSuccess({ id, title, items })
    //expectation
    expect(result).toEqual(expected)
  })

})