import { loadMovies } from '../actions/index'

export const fetchMovies = (url) => {
  return async (dispatch) => {
    try {
      const response = await fetch(url)
      const movies = await response.json()
      dispatch(loadMovies(movies))
    } catch(error) {
      throw new Error()
    }
  }
}