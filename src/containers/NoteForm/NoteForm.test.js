import { NoteForm, mapDispatchToProps } from '../NoteForm/NoteForm'
import React from 'react'
import { shallow } from 'enzyme'
// import {actions}
// import {postNote} from '../../thunks/postNote'
// import * as actions from '../../actions/index'
const mockNote = { title: '', id: 1, timestamp: 555 }
const mockProps = {
  postNote: jest.fn(),
  editNote: jest.fn(),
  deleteNote: jest.fn(),
  note: mockNote,
  items: [],
  isEdit: false
}
let shortID = require('short-id')
// jest.mock('../../thunks/postNote.js')

describe('noteForm', () => {
  let wrapper
  Date.now = jest.fn().mockImplementation(() => 5)
  shortID.generate = jest.fn().mockImplementation(() => 6)
  // let postNote = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <NoteForm {...mockProps} />
    )
  })

  describe('initial state', () => {

    it('should match the initial snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })


    it('should have initial state', () => {
      const expectedState = {
        note: {
          id: 1,
          timestamp: 555,
          title: ''
        },
        items: [{
          description: "",
          id: 6,
          isCompleted: false,
          noteID: 1,
          timestamp: 5,
        }],
        isDeleted: false,
        redirect: false
      }

      expect(wrapper.state()).toEqual(expectedState)
    })
  })

  describe('componentDidMount', () => {

    it('should add a blank item to state', () => {
      const expected = [{ id: 6, description: '', noteID: 1, timestamp: 5, isCompleted: false }]
      expect(wrapper.state('items')).toEqual(expected)
    })
  })

  describe('handleTitleChange', () => {

    it('should setState of note title', () => {
      const mockEvent = {
        target: {
          value: 'New Title'
        }
      }
      const expected = {
        title: 'New Title',
        id: 1,
        timestamp: 555,
      }

      wrapper.instance().handleTitleChange(mockEvent)
      expect(wrapper.state('note')).toEqual(expected)
    })
  })

  describe('handleItemChange', () => {

    it('should setState of note title', () => {
      const mockEvent = {
        target: {
          value: 'New Item Description',
          name: 6
        }
      }
      const expected = [{
        description: 'New Item Description',
        id: 6,
        timestamp: 5,
        isCompleted: false,
        noteID: 1
      }]

      wrapper.instance().handleItemChange(mockEvent)
      expect(wrapper.state('items')).toEqual(expected)
    })

    it('should not change state if no id is matched', () => {
      const mockEvent = {
        target: {
          value: 'New Item Description',
          name: 99
        }
      }
      const expected = [{
        description: '',
        id: 6,
        timestamp: 5,
        isCompleted: false,
        noteID: 1
      }]
      wrapper.instance().handleItemChange(mockEvent)
      expect(wrapper.state('items')).toEqual(expected)
    })
  })

  describe('toggleComplete', () => {
    it('should setState of note title', () => {
      const mockID = 6
      const expected = [{
        description: '',
        id: 6,
        timestamp: 5,
        isCompleted: true,
        noteID: 1
      }]
      wrapper.instance().toggleComplete(mockID)
      expect(wrapper.state('items')).toEqual(expected)
    })

    it('should not change state if no id is matched', () => {
      const mockID = 99
      const expected = [{
        description: '',
        id: 6,
        timestamp: 5,
        isCompleted: false,
        noteID: 1
      }]
      wrapper.instance().toggleComplete(mockID)
      expect(wrapper.state('items')).toEqual(expected)
    })
  })

  describe('handleAddItem', () => {
    it('should setState of note title', () => {
      const mockEvent = {
        preventDefault: jest.fn()
      }

      const newMockItem = {
        description: '',
        id: 6,
        timestamp: 5,
        isCompleted: false,
        noteID: 1
      }
      const expected = [{
        description: '',
        id: 6,
        timestamp: 5,
        isCompleted: false,
        noteID: 1
      }, newMockItem]

      wrapper.instance().handleAddItem(mockEvent)
      expect(wrapper.state('items')).toEqual(expected)
    })
  })

  describe('handleSubmit', () => {
    it('should setState of redirect to true and call postNote when isEdit is false', () => {
      const mockEvent = {
        preventDefault: jest.fn()
      }
      const expected = true

      wrapper.instance().handleSubmit(mockEvent)
      expect(wrapper.state('redirect')).toEqual(expected)
      expect(wrapper.instance().props.postNote).toHaveBeenCalled()
    })

    it('should setState of redirect to true and call postNote when isEdit is true', () => {
      const mockEvent = {
        preventDefault: jest.fn()
      }
      const expected = true
      wrapper.setProps({ isEdit: true })
      wrapper.instance().handleSubmit(mockEvent)
      expect(wrapper.state('redirect')).toEqual(expected)
      expect(wrapper.instance().props.editNote).toHaveBeenCalled()
    })
  })

  describe('handleDelete', () => {
    it('should setState of redirect to true and call deleteNote', () => {
      const mockNote = {
        title: 'New Title',
        id: 1,
        timestamp: 555
      }
      wrapper.setState({note: mockNote})
      
      wrapper.instance().handleDelete()
      expect(wrapper.state('redirect')).toEqual(true)
      expect(wrapper.instance().props.deleteNote).toHaveBeenCalled()

    })
  })

  describe('handleItemDelete', () => {
    it('should setState of redirect to true and call deleteNote', () => {
      const mockID = 1
      const mockItems = [
        {
          description: 'Item 1',
          id: 1,
          timestamp: 5,
          isCompleted: false,
          noteID: 1
        },
        {
          description: 'Item 2',
          id: 2,
          timestamp: 6,
          isCompleted: false,
          noteID: 1
        }
      ]
      const expected = [{
        description: 'Item 2',
        id: 2,
        timestamp: 6,
        isCompleted: false,
        noteID: 1
      }]
      wrapper.setState({ items: mockItems })
      wrapper.instance().handleItemDelete(mockID)
      expect(wrapper.state('items')).toEqual(expected)
    })
  })

  describe('mapStateToProps', () => {

    it('should call dispatch when postNote is called', () => {
      const mockDispatch = jest.fn()
      const mockURL = 'http://localhost:3001/api/v1/notes'

      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.postNote(mockURL, mockNote)
      expect(mockDispatch).toHaveBeenCalled()
    })

    it('should call dispatch when deleteNote is called', () => {
      const mockDispatch = jest.fn()
      const mockID = 1
      const mockURL = 'http://localhost:3001/api/v1/notes'

      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.deleteNote(mockURL, mockNote)
      expect(mockDispatch).toHaveBeenCalled()
    })

    it('should call dispatch when editNote is called', () => {
      const mockDispatch = jest.fn()
      const mockURL = 'http://localhost:3001/api/v1/notes'

      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.editNote(mockURL, mockNote)
      expect(mockDispatch).toHaveBeenCalled()
    })
  })

})