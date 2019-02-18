import React from 'react'
import { shallow } from 'enzyme'
import NotFound from './NotFound'

describe('NotFound', () => {
  let wrapper
  it('should have match the correct snapshot', () => {
    wrapper = shallow(<NotFound />)
    expect(wrapper).toMatchSnapshot()
  })
})