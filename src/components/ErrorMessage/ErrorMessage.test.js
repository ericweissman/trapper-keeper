import React from 'react'
import { shallow } from 'enzyme'
import ErrorMessage from './ErrorMessage'

describe('ErrorMessage', () => {
  let wrapper
  const mockError = '404'
  it('should match the correct snapshot', () => {
    wrapper = shallow(<ErrorMessage error={mockError}/>)
    expect(wrapper).toMatchSnapshot()
  })
})