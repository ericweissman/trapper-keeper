import React from 'react'
import { mapStateToProps, mapDispatchToProps } from './App'
import App from './App'
import { shallow } from 'enzyme'


describe('App', () => {
  let wrapper
  const mockProps = {
    notes: [{id: 1, title: 'Note Title'}],
    items: [],
    isLoading: true,
    error: '',
    fetchNotes: jest.fn()
  }
  it('should match the correct snapshot', () => {
    wrapper = shallow(<App {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('mapStateToProps', () => {
    it('should return an object with notes, items, isLoading and error', () => {
      const mockState = {
        notes: [{}, {}],
        fakeState: [],
        fakeStateTwo: 2,
        items: [{}, {}, {}, {}],
        isLoading: true,
        error: ''
      }
      const expected = {
        notes: [{}, {}],
        items: [{}, {}, {}, {}],
        isLoading: true,
        error: ''
      }

      const mappedProps = mapStateToProps(mockState)
      expect(mappedProps).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    it('calls dispatch with fetchNotes when componentDidMount is called', () => {
      const mockDispatch = jest.fn()
      const mockURL = 'http://localhost:789423'
      const mappedProps = mapDispatchToProps(mockDispatch)

      mappedProps.fetchNotes(mockURL)
      expect(mockDispatch).toHaveBeenCalled()
    })
  })
})