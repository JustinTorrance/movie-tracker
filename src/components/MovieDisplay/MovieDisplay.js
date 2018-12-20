import React from 'react'
import { connect } from 'react-redux'
import MovieCard from '../MovieCard/MovieCard'
import { uid } from 'react-uid'
import { signOut } from '../../actions/index'
import { PropTypes } from 'prop-types'

export const MovieDisplay = ({movies, signOut}) => {
   const moviesList = movies.map((movie) => {
     return (
       <MovieCard movie={movie} key={uid(movie)}/>
     )
   })

  return(
    <section className="movies-section-container">
      <header className='movies-header'>
        <h1 className="movie-tracker">     
          movie
          <img src='./images/movie_roll.svg' alt="movie roll" className='main-logo'></img>
          tracker
        </h1>
        <button className='sign-out-btn' onClick={signOut}>Sign Out</button>
      </header>
      <h2 className='movie-container-label'>Trending</h2>
      <div className='movie-container-underline'></div>
      <div className="movies-container">{moviesList}</div>
    </section>
  )
}

export const mapStateToProps = (state) => ({
  movies: state.movies
})

export const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut())
})

MovieDisplay.propTypes = {
  movies: PropTypes.array.isRequired,
  signOut: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDisplay)