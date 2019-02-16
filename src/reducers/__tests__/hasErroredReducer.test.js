import { hasErroredReducer } from '../hasErroredReducer'
import * as actions from '../../actions'

describe('hasErroredReducer', () => {

  it('should return initial state', () => {
    //setup 
    const expected = ''
    //execution
    const result = hasErroredReducer(undefined, {})
    //expectation
    expect(result).toEqual(expected)
  })

  it('should set an error message', () => {
    //setup
    const initialState = ''
    const expected = "Something isn't working"
    //execution
    const result = hasErroredReducer(initialState, actions.hasErrored("Something isn't working"))
    //expectation
    expect(result).toEqual(expected)
  })

})