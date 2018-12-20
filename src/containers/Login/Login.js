import React, { Component } from 'react'
import { fetchData } from '../../utils/apiCalls'
import { Redirect, Link } from 'react-router-dom'
import { signIn } from '../../actions/index.js'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { loginUser } from  '../../utils/apiCalls'

export class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      validUser: false,
      incorrectLogin: false
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
    try {
      const user = await loginUser({email, password})
      this.props.loginUser({name: user.data.name, password: user.data.password})
      this.setState({validUser: true})
    } catch (error) {
      this.setState({incorrectLogin: true})
    }

    // const users = await fetchData('http://localhost:3000/api/users')
    // let validUser = false
    // const currentUser = users.data.find(user => {
    //   if (user.email === email && user.password === password) {
    //     validUser = true
    //     return user
    //   } 
    // })
    
    // if (validUser) {
    //   this.props.loginUser(currentUser)
    // }
    // this.setState({validUser, incorrectLogin: !validUser})
  }

  render() {
    if(this.state.validUser) {
      return (
        <Redirect to='/' />
      )
    }
    const { email, password, incorrectLogin } = this.state
    return (
      <div>
        <h1 className='form-title'>
          movie
          <img src='./images/movie_roll.svg' alt="movie roll" className='form-logo'></img>
          tracker
        </h1>
        <h2 className='login-title'>Login</h2>
        <form className='login-form' onSubmit={this.handleSubmit}>
          <input 
            className='form-input'
            type='text' 
            placeholder='email' 
            value={email} 
            name='email'
            onChange={this.handleChange}>
          </input>
          <input 
            className='form-input'
            type='password' 
            placeholder='password' 
            value={password}
            name='password'
            onChange={this.handleChange}>
          </input>
          <button>Login</button>
        </form>
        <div className='new-account-container'>
          <h3 className='incorrect-login'>username or password is incorrect</h3>
          <h3>Don't have an account?</h3>
          <Link className='form-link' to='/signup' >Create New Account</Link>
        </div>
      </div>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({ 
  loginUser: (user) => dispatch(signIn(user))
})

Login.propTypes = {
  loginUser: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(Login)