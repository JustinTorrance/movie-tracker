import React from 'react'
import MovieCard from '../MovieCard/MovieCard'
import { uid } from 'react-uid'

const MovieDisplay = ({movies}) => {
  console.log(movies)
   const moviesList = movies.map((movie) => {
     return (
       <MovieCard movie={movie} key={uid(movie)}/>
     )
   })

  return(
    <div>{moviesList}</div>
  )
}

export default MovieDisplay