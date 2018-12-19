import React, { Component } from 'react'
import MovieDisplay from '../MovieDisplay/MovieDisplay'
import { fetchData } from '../../utils/apiCalls'
import { connect } from 'react-redux'
import { loadMovies } from '../../actions/index'
import './App.scss'
import { Route, Switch } from 'react-router-dom'
import Login from '../Login/Login'

class App extends Component {
  constructor() {
    super()
  }

  async componentDidMount() {
    const movies = await fetchData('https://api.themoviedb.org/3/movie/popular?api_key=da90047b6c1d3526d4b04666a1b64a0d&language=en-US&page=1&region=US')
    this.props.loadMovies(movies)
  }

  render() {
    return (
      <div className="App">
        <h1 className="movie-tracker">movie tracker</h1>
        <Switch>
          <Route 
            exact
            path='/'
            component={MovieDisplay}
          />
          <Route
            path='/login'
            component={Login}
          />
        </Switch>
      </div>

    )
  }
}

const mapStateToProps = (state) => ({
  movies: state.movies
})

const mapDispatchToProps = (dispatch) => ({
  loadMovies: (movies) => dispatch(loadMovies(movies))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
