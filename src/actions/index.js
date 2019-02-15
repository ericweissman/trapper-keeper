//add note
//remove note
//edit a note

//Synchronous Actions

export const isLoading = (bool) => ({
  type: 'IS_LOADING',
  isLoading: bool
});

export const hasErrored = (message) => ({
  type: 'HAS_ERRORED',
  message
});

//GET n SET ALL NOTES
export const getNotesSuccess = ({ notes, items }) => ({
  type: 'GET_NOTES_SUCCESS',
  notes,
  items,
})

//ADD NOTE
export const postNoteSuccess = ({ id, title, items }) => ({
  type: 'POST_NOTE_SUCCESS',
  note: {
    id,
    title,
  },
  items,
})

//DELETE NOTE
export const deleteNoteSuccess = (id) => ({
  type: 'DELETE_NOTE_SUCCESS',
  id
})

//EDIT NOTE
export const editNoteSuccess = ({ id, title, items }) => ({
  type: 'EDIT_NOTE_SUCCESS',
  note: {
    id,
    title,
  },
  items,
})