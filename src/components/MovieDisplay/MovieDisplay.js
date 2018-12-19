import React from 'react'
import { connect } from 'react-redux'
import MovieCard from '../MovieCard/MovieCard'
import { uid } from 'react-uid'
import './MovieDisplay.scss'

const MovieDisplay = ({movies}) => {
  console.log(movies)
   const moviesList = movies.map((movie) => {
     return (
       <MovieCard movie={movie} key={uid(movie)}/>
     )
   })

  return(
    <div className="movies-container">{moviesList}</div>
  )
}

const mapStateToProps = (state) => ({
  movies: state.movies
})

export default connect(mapStateToProps)(MovieDisplay)