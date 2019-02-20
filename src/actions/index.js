
export const isLoading = (bool) => ({
  type: 'IS_LOADING',
  isLoading: bool
});

export const hasErrored = (message) => ({
  type: 'HAS_ERRORED',
  message
});

export const getNotesSuccess = ({ notes, items }) => ({
  type: 'GET_NOTES_SUCCESS',
  notes,
  items,
})

export const postNoteSuccess = ({ id, title, items }) => ({
  type: 'POST_NOTE_SUCCESS',
  note: {
    id,
    title,
  },
  items,
})

export const deleteNoteSuccess = (id) => ({
  type: 'DELETE_NOTE_SUCCESS',
  id
})

export const editNoteSuccess = ({ id, title, items }) => ({
  type: 'EDIT_NOTE_SUCCESS',
  note: {
    id,
    title,
  },
  items,
})