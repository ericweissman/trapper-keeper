import { isLoading, hasErrored, postNoteSuccess } from '../actions'

export const postNote = (url, {id, title, items}) => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true))
      const response = await fetch(url, {
        method: 'POST',
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({ id, title, items, })
      })
      if(!response.ok) {
        throw Error(response.statusText)
      }
      dispatch(isLoading(false))
      const result = await response.json()
      dispatch(postNoteSuccess(result))
    } catch (error) {
      dispatch(hasErrored(error.message))
    }
  }
}
