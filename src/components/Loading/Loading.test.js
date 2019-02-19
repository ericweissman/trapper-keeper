import React from 'react'
import Loading from './Loading'
import { shallow } from 'enzyme'

describe('Loading', () => {
  let wrapper
  it('should have the correct snapshot', () => {
    wrapper = shallow(<Loading />)
    expect(wrapper).toMatchSnapshot()
  })
})