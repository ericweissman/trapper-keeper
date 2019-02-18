import React from 'react'
import { shallow } from 'enzyme'
import IncompleteItem from './IncompleteItem'

describe('IncompleteItem', () => {
  let wrapper
  it('should have match the correct snapshot', () => {
    wrapper = shallow(<IncompleteItem />)
    expect(wrapper).toMatchSnapshot()
  })
})