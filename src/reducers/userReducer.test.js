import userReducer from './userReducer'
import * as actions from '../actions'

<<<<<<< HEAD

=======
>>>>>>> 2efc3b4721b2e440fb0f020ac4bd2916bee39a15
describe('userReducer', () => {
  it('should return the default state', () => {
    const expected = {}
    const result = userReducer(undefined, {})
    expect(result).toEqual(expected)
  })
  it('should return the state with a user', () => {
<<<<<<< HEAD
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
=======
    const action = {
      type: 'SIGN_IN',
      user: {id: 1, name: 'Justin', email: 'j@aol.com', password:'asdf'}
    }
    const initialState = {}
    const expected = {id: 1, name: 'Justin', email: 'j@aol.com', password:'asdf'}
    const result = userReducer(initialState, action)
    expect(result).toEqual(expected)
  })
  it('should return the state with an empty object for user', () => {
    const action = {
      type: 'SIGN_OUT'
    }
    const initialState = {id: 1, name: 'Justin', email: 'j@aol.com', password:'asdf'}
    const expected = {}
    const result = userReducer(initialState, action)
>>>>>>> 2efc3b4721b2e440fb0f020ac4bd2916bee39a15
    expect(result).toEqual(expected)
  })
})