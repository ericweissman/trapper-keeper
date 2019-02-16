import { editNote } from '../editNote'
import { isLoading, hasErrored, editNoteSuccess } from '../../actions'

describe('editNote', () => {
  let mockURL;
  let mockDispatch;
  let mockNote;

  beforeEach(() => {
    mockURL = 'http://localhost:2001';
    mockDispatch = jest.fn();
    mockNote = { id: 1, title: 'test editNote', items: [] };
  })

  it('should call dispatch with isLoading(true)', () => {
    const thunk = editNote(mockURL, mockNote);
    thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true))
  })

  it('should call dispatch hasErrored with message', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      statusText: 'not OK'
    }))
    const thunk = editNote(mockURL, mockNote);
    await thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(hasErrored('not OK'))
  })

  it('should call dispatch isLoading(false) if response is okay', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true
    }))
    const thunk = editNote(mockURL, mockNote);
    await thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(false))
  })

  it('should call dispatch editNoteSuccess', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true
    }))
    const thunk = editNote(mockURL, mockNote);
    await thunk(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(editNoteSuccess(mockNote))
  })
})