import { Login, mapDispatchToProps, mapStateToProps } from './Login'
import { signIn } from '../../actions'

describe('mapDispatchToProps', () => {
  it('calls dispatch with a signIn action when loginUser is called', () => {
    const mockDispatch = jest.fn()
    const actionToDispatch = signIn({name: 'Justin', email: 'J@aol.com', id: 1, password: 'password'})
    const mappedProps = mapDispatchToProps(mockDispatch)
    mappedProps.loginUser({name: 'Justin', email: 'J@aol.com', id: 1, password: 'password'})
    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
  })
})