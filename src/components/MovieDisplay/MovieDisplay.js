import React from 'react'
import { connect } from 'react-redux'
import MovieCard from '../MovieCard/MovieCard'
import { uid } from 'react-uid'
import { signOut } from '../../actions/index'
import './MovieDisplay.scss'

const MovieDisplay = ({movies, signOut}) => {
   const moviesList = movies.map((movie) => {
     return (
       <MovieCard movie={movie} key={uid(movie)}/>
     )
   })

  return(
    <section className="movies-container">
      <header className='movies-header'>
        <h1 className="movie-tracker">movie tracker</h1>
        <button onClick={signOut}>Sign Out</button>
      </header>
      <div className="movies-container">{moviesList}</div>
    </section>
  )
}

const mapStateToProps = (state) => ({
  movies: state.movies
})

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieDisplay)