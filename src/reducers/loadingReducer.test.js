import loadingReducer from './loadingReducer'
import * as actions from '../actions/index'

describe('LoadingReducer', () => {
  it('should return the default state', () => {
    const expected = false
    const result = loadingReducer(undefined, {})
    expect(result).toEqual(expected)
  })

  it('should return the sate with true if loading', () => {
    const initialState = false
    const expected = true
    const result = loadingReducer(initialState, actions.loading(true))
    expect(result).toEqual(expected)
  })
})