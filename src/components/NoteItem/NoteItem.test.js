import React from 'react'
import { NoteItem } from './NoteItem'
import { shallow } from 'enzyme'

describe('NoteItem', () => {
  let wrapper;
  const mockItem = {
    description: 'some item',
    id: 3,
    isCompleted: false,
    noteID: 10,
    timestamp: 99

  }

  const mockHandleItemChange = jest.fn()
  const mockHandleItemDelete = jest.fn()
  const mockToggleComplete = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <NoteItem
        item={mockItem}
        handleItemChange={mockHandleItemChange}
        handleItemDelete={mockHandleItemDelete}
        toggleComplete={mockToggleComplete}
      />
    )
  })

  it('should match the snapshot if item is unchecked', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should match the snapshot if item is checked', () => {
    wrapper.setProps({ item: { isCompleted: true } })
  
    expect(wrapper).toMatchSnapshot()
  })

  it('should register a click on the checkbox', () => {
    const mockEvent = { target: { checked: true } }

    wrapper.find('.checkbox').simulate('change', mockEvent)
    expect(mockToggleComplete).toHaveBeenCalled()
  })

  it('should register a click on the delete button', () => {
    wrapper.find('.item-del').simulate('click')
    expect(mockHandleItemDelete).toHaveBeenCalled()
  })
})