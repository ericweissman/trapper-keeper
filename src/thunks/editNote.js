import { isLoading, hasErrored, editNoteSuccess } from '../actions'

export const editNote = (url, {id, title, items}) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true))
      const response = await fetch(url, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, items })
      })
      if(!response.ok) {
        throw Error(response.statusText)
      }
      dispatch(isLoading(false))
      dispatch(editNoteSuccess({id, title, items}))
    } catch (error) {
      dispatch(hasErrored(error.message))
    }
  }
}