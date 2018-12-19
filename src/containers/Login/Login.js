import React, { Component } from 'react'
import { fetchData } from '../../utils/apiCalls'
import { Redirect, Link } from 'react-router-dom'
import { signIn } from '../../actions/index.js'
import { connect } from 'react-redux'

export class Login extends Component {
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
    const currentUser = users.data.find(user => {
      if (user.email === email && user.password === password) {
        validUser = true
        return user
      } 
    })
    
    if (validUser) {
      this.props.loginUser(currentUser)
    }
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
      <div>
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
          <button>Login</button>
        </form>
        <Link to='/signup' >
          <button>Create Account</button>
        </Link>
      </div>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({ 
  loginUser: (user) => dispatch(signIn(user))
})

export default connect(null, mapDispatchToProps)(Login)