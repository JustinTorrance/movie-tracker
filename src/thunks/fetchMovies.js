import { loadMovies } from '../actions/index'
import { loading } from '../actions/index'

export const fetchMovies = (url) => {
  return async (dispatch) => {
    try {
      loading(true)
      const response = await fetch(url)
      const movies = await response.json()
      dispatch(loadMovies(movies))
    } catch(error) {
      loading(false)
      dispatch(isError(true))
    }
  }
}