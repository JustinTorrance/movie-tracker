import React, { Component } from 'react'
import MovieDisplay from '../../components/MovieDisplay/MovieDisplay'
import { connect } from 'react-redux'
import './App.scss'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import Login from '../Login/Login'
import Signup from '../../components/Signup/Signup'
import { PropTypes } from 'prop-types'
import ErrorPage from '../../components/ErrorPage/ErrorPage'

export class App extends Component {
  constructor() {
    super()
  }

  render() {
    const { user, error } = this.props
    if (error) {
      return <ErrorPage/>
    }
    return (
      <div className="App">
        <Switch>
          <Route 
            exact
            path='/' 
            render={() => {
              if (!user.name) {
                return <Redirect to='/login' />
              } else {
                return <Redirect to='/trending' />
              }
            }}
          />
          <Route
            path='/login'
            component={Login}
          />
          <Route
            path='/signup'
            component={Signup}
          />
          <Route
            path='/favorites'
            render={() => {
              if (!user.name){
                return <Redirect to='/login' />
              } else {
                return <MovieDisplay />
              }
            }}
          />
          <Route
            path='/trending'
            render={() => {
              if (!user.name){
                return <Redirect to='/login' />
              } else {
                return <MovieDisplay />
              }
            }}
          />
          <Route 
            path='/error'
            component={ErrorPage} />
        </Switch>
      </div>

    )
  }
}

export const mapStateToProps = (state) => ({
  movies: state.movies,
  user: state.user,
  error: state.error
})


App.propTypes = {
  movies: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  error: PropTypes.bool.isRequired
}

export default withRouter(connect(mapStateToProps)(App))

