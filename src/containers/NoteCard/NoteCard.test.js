import React from 'react';
import NoteCard from './NoteCard';
import { shallow } from 'enzyme';

describe('NoteCard', () => {
  let wrapper

  it('should match the snapshot', () => {
    //setup
    let mockNoteItems = [{ description: 'Note one of Title one', noteID: 1, id: 1, isCompleted: true }, { description: 'Note two of Title one', noteID: 1, id: 2, isCompleted: false }]
    let mockTitle = 'Title One'

    wrapper = shallow(<NoteCard
      title={mockTitle}
      noteItems={mockNoteItems}
    />)
    //expectation
    expect(wrapper).toMatchSnapshot()

  })
})