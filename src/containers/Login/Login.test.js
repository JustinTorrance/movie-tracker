import { Login, mapDispatchToProps } from './Login'
import { signIn } from '../../actions'
import React from 'react'
import { shallow } from 'enzyme'

describe('Login Component', () => {
  let loginUserMock;
  let wrapper;
  
  beforeEach(() => {
    loginUserMock = jest.fn()
    wrapper = shallow(<Login loginUser={loginUserMock} />)
  })
  
  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
  
  it('should match the snapshot when user is logged in', () => {
    wrapper.setState({validUser: true})
    wrapper.update()
    expect(wrapper).toMatchSnapshot()
  })
  
  it('calls handleChange when e-mail is changed', () => {
    const spy = spyOn(wrapper.instance(), 'handleChange')
    wrapper.instance().forceUpdate()
    const mockEvent = { target: { value: 'something@gmail.com' } }
    wrapper.find('.email').simulate('change', mockEvent)
    expect(spy).toHaveBeenCalled()
    
  })
  
  it('calls handleChange when password is changed', () => {
    const spy = spyOn(wrapper.instance(), 'handleChange')
    wrapper.instance().forceUpdate()
    const mockEvent = { target: { value: 'password' } }
    wrapper.find('.password').simulate('change', mockEvent)
    expect(spy).toHaveBeenCalled()
    
  })
  
  it('updates state when handleChange is called', () => {
    const mockEvent = { target: { name: 'email', value: 'something@gmail.com' } }
    wrapper.instance().handleChange(mockEvent)
    expect(wrapper.state('email')).toBe('something@gmail.com')
  })
  
  it('calls handleSubmit onSubmit of the form', () => { 
    const spy = spyOn(wrapper.instance(), 'handleSubmit');
    const mockEvent = { preventDefault: jest.fn() }
    wrapper.instance().forceUpdate();
    wrapper.find('form').simulate('submit', mockEvent)
    expect(spy).toHaveBeenCalled()
  })
  
  describe('mapDispatchToProps', () => {
    it('calls dispatch with a signIn action when loginUser is called', () => {
      const mockDispatch = jest.fn()
      const actionToDispatch = signIn({name: 'Justin', email: 'J@aol.com', id: 1, password: 'password'})
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.loginUser({name: 'Justin', email: 'J@aol.com', id: 1, password: 'password'})
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
  
}) 
