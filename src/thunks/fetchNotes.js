import { isLoading, hasErrored, getNotesSuccess} from '../actions'

export const fetchNotes = (url) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true))
      const response = await fetch(url)
      if (!response.ok) {
        throw Error(response.statusText)
      }
      dispatch(isLoading(false))
      const result = await response.json()
      dispatch(getNotesSuccess(result))
    } catch (error){
      dispatch(hasErrored(error.message))
    }
  }
}