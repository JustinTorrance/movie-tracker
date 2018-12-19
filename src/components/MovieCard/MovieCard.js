import React from 'react'
import './MovieCard.scss'

const MovieCard = ({movie}) => {
  return (
    <article className="movie-card" style={{ backgroundImage: `url(${movie.posterPic})` }}>
      {/* <h2>{movie.title}</h2>
      <p>{movie.year}</p>
      <p>{movie.rating}</p> */}
      {/* <img src={movie.backdropPic}/> */}
      {/* <p>{movie.overview}</p>
      <p>{movie.genres}</p>
      <p>{movie.runtime}</p> */}
    </article>
  )
}

export default MovieCard