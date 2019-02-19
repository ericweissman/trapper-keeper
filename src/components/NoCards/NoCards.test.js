import React from 'react'
import { shallow } from 'enzyme'
import NoCards from './NoCards'

describe('NoCards', () => {
  let wrapper
  it('should have match the correct snapshot', () => {
    wrapper = shallow(<NoCards />)
    expect(wrapper).toMatchSnapshot()
  })
})