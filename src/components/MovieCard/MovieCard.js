import React from 'react'

const MovieCard = ({movie}) => {
  return (
    <article className="movie-card">
      <h2>{movie.title}</h2>
      <p>{movie.year}</p>
      <p>{movie.rating}</p>
      <img src={movie.posterPic}/>
      <img src={movie.backdropPic}/>
      <p>{movie.overview}</p>
      <p>{movie.genres}</p>
      <p>{movie.runtime}</p>
    </article>
  )
}

export default MovieCard