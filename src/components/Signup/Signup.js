import React, { Component } from 'react'
import { addUser } from '../../utils/apiCalls'
import { Redirect, Link } from 'react-router-dom'


export default class Signup extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      duplicateUser: false,
      validUser: false,
      formComplete: false,
      passwordsMatch: true
    }
  }

  handleChange = async (e) => {
    const { name, value } = e.target
    await this.setState({
      [name]: value,
    })
    this.checkFormCompletion()
  }

  checkFormCompletion() {
    const { name, email, password, confirmPassword } = this.state
    this.setState({
      formComplete: (name !== '' && email !== '' && password !== '' && confirmPassword !== '')
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { name, email, password, confirmPassword } = this.state
    if (password !== confirmPassword) {
      this.setState({ duplicateUser: false, passwordsMatch: false })
      return
    }
    const data = await addUser({ name, email, password }) 
    if (data.error) {
      this.setState({ duplicateUser: true, passwordsMatch: true})
    } else {
      this.setState({ validUser: true})
    }
  }

  render() {
    const { name, email, password, confirmPassword, validUser, formComplete, duplicateUser, passwordsMatch } = this.state
    if (validUser) {
     return <Redirect to='/login' />
    }
    return(
      <div className="sign-up-container">
        <h1 className='form-title'>
          movie
          <img src='./images/movie_roll.svg' alt="movie roll" className='form-logo'></img>
          tracker
        </h1>
        <h2 className='login-title'>Sign Up</h2>
        <form className='login-form create-new-user-form' onSubmit={this.handleSubmit}>
          <input 
            onChange={this.handleChange}
            type='text'
            placeholder='name'
            name='name'
            value={name}
          />
          <input 
            onChange={this.handleChange}
            type='text'
            placeholder='email'
            name='email'
            value={email}
          />
          <input 
            onChange={this.handleChange}
            type='password'
            placeholder='password'
            name='password'
            value={password}
          />
          <input 
            onChange={this.handleChange}
            type='password'
            placeholder='confirm password'
            name='confirmPassword'
            value={confirmPassword}
          />
          <button disabled={!formComplete}>Submit</button>
          <Link className='form-link' to='/login' >Return to login</Link>
        </form>
        <h3 className={`duplicate-user-message ${duplicateUser && 'create-user-error'}`}>An account already exists with that email</h3>
        <h3 className={`passwords-message ${!passwordsMatch && 'create-user-error'}`}>Passwords must match</h3>
      </div>
    )
  }
}