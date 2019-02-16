import { postNote } from '../postNote'
import { isLoading, hasErrored, postNoteSuccess } from '../../actions'

describe('PostNote', () => {
  let mockDispatch;
  let mockURL;
  let mockNote;

  beforeEach(() => {
    mockURL = 'http://localhost:9999';
    mockDispatch = jest.fn();
    mockNote = {id: '1', title: 'test', items: []}
  })

  it('call dispatch with isLoading action', () => {
    const thunk = postNote(mockURL, mockNote)
    
    thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true))
  })

  it('should dispatch hasErrored with a message if the response is not OK', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'not okay'
    }))
    const thunk = postNote(mockURL, mockNote);
    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(hasErrored('not okay'))
  })

  it('should dispatch isLoading(false) if the response is OK', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
    }))
    const thunk = postNote(mockURL, mockNote);
    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(false))
  })

  it('should dispatch getNoteSuccess', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockNote)
    }))
    const thunk = postNote(mockURL, mockNote)
    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(postNoteSuccess(mockNote))
  })
})