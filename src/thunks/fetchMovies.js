import { loadMovies } from '../actions/index'
import { loading } from '../actions/index'

export const fetchMovies = (url) => {
  return async (dispatch) => {
    try {
      dispatch(loading(true))
      const response = await fetch(url)
      const movies = await response.json()
      dispatch(loadMovies(movies))
      dispatch(loading(false))      
    } catch(error) {
      return 'Error: something went wrong'
    }
  }
}