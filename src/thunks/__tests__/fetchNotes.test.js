import { fetchNotes } from '../fetchNotes'
import { isLoading, hasErrored, getNotesSuccess } from '../../actions'

describe('fetchNotes', () => {

  let mockURL
  let mockDispatch

  beforeEach(() => {
    mockURL = 'http://localhost:3000/'
    mockDispatch = jest.fn()
  })


  it('calls dispatch with the isLoading action', () => {
    const thunk = fetchNotes(mockURL)
    thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true))
  })

  it('should dispatch hasErrored with a message if the response is not "ok"', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: false,
        statusText: 'Something went wrong'
      }))
    const thunk = fetchNotes(mockURL)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(hasErrored('Something went wrong'))
  })

  it('should dispatch isLoading(false) if the response is ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true
    }))
    const thunk = fetchNotes(mockURL)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(isLoading(false))
  })

  it('should dispatch getNotesSuccess', async () => {
    const mockNote = 'Mock Note'

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mockNote),
        ok: true
    }))

    const thunk = fetchNotes(mockURL)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(getNotesSuccess(mockNote))
  })

})