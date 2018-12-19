import React, { Component } from 'react'
import { fetchData } from '../../utils/apiCalls'
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
      validUser: false
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { name, email, password } = this.state
    const response = await fetch('http://localhost:3000/api/users/new', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    if (data.error) {
      this.setState({ duplicateUser: true })
    } else {
      this.setState({ validUser: true})
    }
  }

  render() {
    const { name, email, password, confirmPassword, validUser } = this.state
    if (validUser) {
     return <Redirect to='/login' />
    }
    return(
      <form onSubmit={this.handleSubmit}>
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
        <button>Submit</button>
      </form>

      )
  }






}