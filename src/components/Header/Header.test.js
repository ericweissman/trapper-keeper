import React from 'react'
import { shallow } from 'enzyme'
import Header from './Header'

describe('Header', () => {
  let wrapper
  it('should have match the correct snapshot', () => {
    wrapper = shallow(<Header />)
    expect(wrapper).toMatchSnapshot()
  })
})