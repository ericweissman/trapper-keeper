import { isLoading, hasErrored, deleteNoteSuccess }  from '../actions'

export const deleteNote = (url, id) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true))
      const response = await fetch(url, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({id})
      })
      if(!response.ok) {
        throw Error(response.statusText)
      }
      dispatch(isLoading(false))
      dispatch(deleteNoteSuccess(id))
    } catch (error) {
      dispatch(hasErrored(error.message))
    }
  }
}