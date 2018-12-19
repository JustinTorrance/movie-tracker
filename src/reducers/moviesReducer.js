const moviesReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_MOVIES': 
      const movies = action.movies.results.map((movie) => {
        return { id: movie.id,
          title: movie.title,
          year: movie.release_date,
          rating: movie.vote_average,
          posterPic: 'https://image.tmdb.org/t/p/w500///' + movie.poster_path,
          backdropPic: 'https://image.tmdb.org/t/p/w500///' + movie.backdrop_path,
          overview: movie.overview,
          genres: movie.genres,
          runtime: movie.runtime}
      }) 
      return [...state, ...movies]
    default:
      return state
  }
}

export default moviesReducer