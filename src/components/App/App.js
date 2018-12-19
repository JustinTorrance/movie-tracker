import React, { Component } from 'react'
import MovieDisplayContainer from '../../containers/MovieDisplayContainer'
import { fetchMovies } from '../../utils/apiCalls'
import './App.scss'
import { Route, Switch } from 'react-router-dom'

class App extends Component {
  constructor() {
    super()
  }

  async componentDidMount() {
    const movies = await fetchMovies('https://api.themoviedb.org/3/movie/popular?api_key=da90047b6c1d3526d4b04666a1b64a0d&language=en-US&page=1&region=US')
    this.props.loadMovies(movies)
  }

  render() {
    return (
      <div className="App">

        <MovieDisplayContainer />
      </div>

    )
  }
}

export default App
