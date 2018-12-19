import React, { Component } from 'react'
import { fetchData } from '../../utils/apiCalls'
import { Redirect } from 'react-router-dom'

export default class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      validUser: false,
      incorrectPassword: false
    }
  }

  handleChange = (e) => {
    const { value, name } = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { email, password } = this.state
    const users = await fetchData('http://localhost:3000/api/users')
    let validUser = false

    users.data.find(user => {
      if (user.email === email && user.password === password) validUser = true
    })
    this.setState({validUser, incorrectPassword: !validUser})
  }


  render() {
    if(this.state.validUser) {
      return (
        <Redirect to='/' />
      )
    }
    const { email, password, incorrectPassword } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <input 
          className={`form-input ${incorrectPassword && 'incorrect'}`}
          type='text' 
          placeholder='email' 
          value={email} 
          name='email'
          onChange={this.handleChange}>
        </input>
        <input 
          className={`form-input ${incorrectPassword && 'incorrect'}`}
          type='password' 
          placeholder='password' 
          value={password}
          name='password'
          onChange={this.handleChange}>
        </input>
        <button>Submit</button>
      </form>
    )
  }
}