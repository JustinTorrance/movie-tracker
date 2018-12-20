import userReducer from './userReducer'
import * as actions from '../actions'

describe('userReducer', () => {
  it('should return the default state', () => {
    const expected = {}
    const result = userReducer(undefined, {})
    expect(result).toEqual(expected)
  })
  it('should return the state with a user', () => {
    const user = { id: 1, name: 'Justin', email: 'j@aol.com', password:'asdf' }
    const initialState = {}
    const expected = {id: 1, name: 'Justin', email: 'j@aol.com', password:'asdf'}
    const result = userReducer(initialState, actions.signIn(user))
    expect(result).toEqual(expected)
  })
  it('should return the state with an empty object for user', () => {
    const initialState = {id: 1, name: 'Justin', email: 'j@aol.com', password:'asdf'}
    const expected = {}
    const result = userReducer(initialState, actions.signOut())
    expect(result).toEqual(expected)
  })
})