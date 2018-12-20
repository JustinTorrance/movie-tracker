const moviesReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_MOVIES': 
      const movies = action.movies.results.map((movie) => {
        return { id: movie.id,
          title: movie.title,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
          poster_path: 'https://image.tmdb.org/t/p/w500///' + movie.poster_path,
          backdrop_path: 'https://image.tmdb.org/t/p/w500///' + movie.backdrop_path,
          overview: movie.overview
        }
      }) 
      return [...state, ...movies]
    default:
      return state
  }
}

export default moviesReducer