import { loginUser } from './loginUser'
import { signIn } from '../actions/index'

describe('loginUser', () => {
  let mockUrl
  let mockDispatch
  beforeEach(() => {
    mockUrl = "http://localhost:3000/api/users/"
    mockDispatch = jest.fn()
  })
  it('should dispatch signIn', async () => {
    const mockUser = { id: 1, name: 'Taylor', password: 'password', email: 't@gmail.com'}
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        user: mockUser
      })
    }))
    const thunk = loginUser(mockUrl)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(signIn())
  })

  it('should return an error message', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      throw new Error()
    })

    await expect(loginUser()).rejects.toThrow(Error)
  })
})