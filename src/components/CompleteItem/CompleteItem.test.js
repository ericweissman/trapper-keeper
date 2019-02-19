import React from 'react'
import { shallow } from 'enzyme'
import CompleteItem from './CompleteItem'

describe('CompleteItem', () => {
  let wrapper
  it('should have match the correct snapshot', () => {
    wrapper = shallow(<CompleteItem />)
    expect(wrapper).toMatchSnapshot()
  })
})