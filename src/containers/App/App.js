import React, { Component } from 'react'
import MovieDisplay from '../../components/MovieDisplay/MovieDisplay'
// import { fetchData } from '../../utils/apiCalls'
import { connect } from 'react-redux'
// import { loadMovies } from '../../actions/index'
import { fetchMovies } from '../../thunks/fetchMovies'
import './App.scss'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import Login from '../Login/Login'
import Signup from '../../components/Signup/Signup'
import { PropTypes } from 'prop-types'


export class App extends Component {
  constructor() {
    super()
  }

  async componentDidMount() {
    const movies = await this.props.loadMovies('https://api.themoviedb.org/3/movie/popular?api_key=da90047b6c1d3526d4b04666a1b64a0d&language=en-US&page=1&region=US')
  }

  render() {
    const { user } = this.props
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
                return <MovieDisplay />
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
            component={MovieDisplay}
          />
        </Switch>
      </div>

    )
  }
}

export const mapStateToProps = (state) => ({
  movies: state.movies,
  user: state.user
})

export const mapDispatchToProps = (dispatch) => ({
  loadMovies: (url) => dispatch(fetchMovies(url)),
})

App.propTypes = {
  movies: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  loadMovies: PropTypes.func.isRequired
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))

