import { deleteNote } from '../deleteNote'
import { isLoading, hasErrored, deleteNoteSuccess } from '../../actions'

describe('deleteNote', () => {
  let mockURL;
  let mockDispatch;
  let mockID;

  beforeEach(() => {
    mockID = 3;
    mockDispatch = jest.fn();
    mockURL = 'http://localhost:5000'
  })

  it('should call dispatch with isLoading(true)', () => {
    const thunk = deleteNote(mockURL, mockID)
    thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true))
  });

  it('should call dispatch with hasErrored and a message if the response is not "OK"', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'not OK'
    }))
    const thunk = deleteNote(mockURL, mockID)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(hasErrored('not OK'))
  });

  it('should call dispatch with isLoading(false) if response is OK', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
    }))
    const thunk = deleteNote(mockURL, mockID)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(isLoading(false))
  });

  it('should call dispatch with deleteNoteSuccess with an ID', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true
    }))
    const thunk = deleteNote(mockURL, mockID)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(deleteNoteSuccess(mockID))
  });
})