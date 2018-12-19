import React, { Component } from 'react'
import MovieDisplay from '../../Components/MovieDisplay/MovieDisplay'
import { fetchData } from '../../utils/apiCalls'
import { connect } from 'react-redux'
import { loadMovies, signOut } from '../../actions/index'
import './App.scss'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from '../Login/Login'
import Signup from '../../components/Signup/Signup'


class App extends Component {
  constructor() {
    super()
  }

  async componentDidMount() {
    const movies = await fetchData('https://api.themoviedb.org/3/movie/popular?api_key=da90047b6c1d3526d4b04666a1b64a0d&language=en-US&page=1&region=US')
    this.props.loadMovies(movies)
  }

  render() {
    const { user, signOut } = this.props
    return (
      <div className="App">
        <h1 className="movie-tracker">movie tracker</h1>
        <button onClick={signOut}>Sign Out</button>
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
        </Switch>
      </div>

    )
  }
}

const mapStateToProps = (state) => ({
  movies: state.movies,
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
  loadMovies: (movies) => dispatch(loadMovies(movies)),
  signOut: () => dispatch(signOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
