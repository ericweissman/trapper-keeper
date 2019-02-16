import { isLoadingReducer } from '../isLoadingReducer'
import * as actions from '../../actions'

describe('isLoadingReducer', () => {

  it('should return initial state', () => {
    //setup 
    const expected = true
    //execution
    const result = isLoadingReducer(undefined, {})
    //expectation
    expect(result).toEqual(expected)
  })

  it('should set isLoading status', () => {
    //setup
    const initialState = true
    const expected = false
    //execution
    const result = isLoadingReducer(initialState, actions.isLoading(false))
    //expectation
    expect(result).toEqual(expected)
  })

})

