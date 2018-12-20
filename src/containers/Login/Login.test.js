import { Login, mapDispatchToProps } from './Login'
import { signIn } from '../../actions'
import React from 'react'
import { shallow } from 'enzyme'
import * as API from '../../utils/apiCalls'

jest.mock('../../utils/apiCalls')

beforeAll(() => {
  API.loginUser.mockImplementation((email, password) => ({
    data: {
      name: 'Jake',
      email: email,
      password: password
    }
  }))
})

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
  
  describe('handleSubmit', () => {
    const mockEvent = {preventDefault: jest.fn()}
    let wrapper;
    let loginUserMock;

    beforeEach(() => {
      loginUserMock = jest.fn()
      wrapper = shallow(<Login loginUser={loginUserMock} />)
      wrapper.state().email = 'ashley@gmail.com'
      wrapper.state().password = 'jake'
    })

    it('Should login the user through the API', async () => {
      const expected = {email: 'ashley@gmail.com', password: 'jake'}

      await wrapper.instance().handleSubmit(mockEvent)
      expect(API.loginUser).toHaveBeenCalledWith(expected)
    })  

    it('Should call login user from props', async () => {
      const expected = {name: 'Jake', password: undefined}

      await wrapper.instance().handleSubmit(mockEvent)
      expect(loginUserMock).toHaveBeenCalledWith(expected)      
    })

    it('Should set valid user to true if everything is ok', async () => {
      await wrapper.instance().handleSubmit(mockEvent)

      const expected = true;

      expect(wrapper.state().validUser).toBe(expected)
    })

    it('Should set incorrectlogin to true if there is an error', async () => {
      API.loginUser.mockImplementation((email, password) => {throw new Error()})
      
      await wrapper.instance().handleSubmit(mockEvent)

      const expected = true;

      expect(wrapper.state().incorrectLogin).toBe(expected)
    })
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
