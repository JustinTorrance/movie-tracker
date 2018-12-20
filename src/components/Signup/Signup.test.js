import { shallow } from 'enzyme'
import Signup from './Signup'
import React from 'react'

describe('SignUp Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Signup />)
  })

  it('Should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('Should match the snapshot if it renders the redirect', () => {
    wrapper.state().validUser = true
    expect(wrapper).toMatchSnapshot()
  })

  it('Should have a default state', () => {
    const expected = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      duplicateUser: false,
      validUser: false,
      formComplete: false,
      passwordsMatch: true
    }

    expect(wrapper.state()).toEqual(expected)
  })

  describe('handleChange', () => [

  ])

  describe('checkFormCompletion', () => {

  })

  describe('handleSubmit', () => {

  })
})