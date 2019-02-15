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
export const getNotesSuccess = (result) => ({
  type: 'GET_NOTES_SUCCESS',
  notes: result.notes,
  items: result.items
})


//ADD NOTE
export const postNoteSuccess = (result) => ({
  type: 'POST_NOTE_SUCCESS',
  note: {
    id: result.id,
    title: result.title
  },
  items: result.items,
})



//DELETE NOTE
export const deleteNoteSuccess = (id) => ({
  type: 'DELETE_NOTE_SUCCESS',
  id
})

//EDIT NOTE
export const editNoteSuccess = (result) => ({
  type: 'EDIT_NOTE_SUCCESS',
  note: {
    id: result.id,
    title: result.title
  },
  items: result.items
})