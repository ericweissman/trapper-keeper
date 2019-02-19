import React from 'react';
import { NoteArea } from './NoteArea';
import { shallow } from 'enzyme';
import { mapStateToProps } from './NoteArea'

describe('NoteArea', () => {
  let wrapper

  it('should match the snapshot', () => {
    //setup
    const mockItems = [{ description: 'Note one of Title one', noteID: 1, id: 1 }, { description: 'Note two of Title one', noteID: 1, id: 2 }, { description: 'Note three of Title one', noteID: 1, id: 3 },
    { description: 'Note one of Title two', noteID: 2, id: 1 }, { description: 'Note two of Title two', noteID: 2, id: 2 }]
    const mockNotes = [{ id: 1, title: "Title One" }, { id: 2, title: "Title Two" }]
    const isLoading = false
    wrapper = shallow(<NoteArea
      isLoading={isLoading}
      items={mockItems}
      notes={mockNotes}
    />)
    //expectation
    expect(wrapper).toMatchSnapshot()

  })

  it('should match the snapshot if the notes are still loading', () => {
    //setup
    const mockItems = [{ description: 'Note one of Title one', noteID: 1, id: 1 }, { description: 'Note two of Title one', noteID: 1, id: 2 }, { description: 'Note three of Title one', noteID: 1, id: 3 },
    { description: 'Note one of Title two', noteID: 2, id: 1 }, { description: 'Note two of Title two', noteID: 2, id: 2 }]
    const mockNotes = [{ id: 1, title: "Title One" }]
    const isLoading = true
    wrapper = shallow(<NoteArea
      isLoading={isLoading}
      items={mockItems}
      notes={mockNotes}
    />)
    //expectation
    expect(wrapper).toMatchSnapshot()

  })

  describe('mapStateToProps', () => {

    it('should return an object with a notes array and items array', () => {
      //setup
      const mockState = { notes: [{}, {}], items: [{}, {}, {}, {}, {}], favorites: [] }
      const expected = { notes: [{}, {}], items: [{}, {}, {}, {}, {}] }
      //execution
      const mappedProps = mapStateToProps(mockState)
      //expectation
      expect(mappedProps).toEqual(expected)
    })
  })
})