import moviesReducer from './moviesReducer'
import * as actions from '../actions'

describe('moviesReducer', () => {
  it('should return the default state', () => {
    const expected = []
    const result = moviesReducer(undefined, {})
    expect(result).toEqual(expected)
  })
  it('should return the state with movies', () => {
    const initialState = []
    const movies = { 
      results: 
        [{ 
          id: 1,
          title: 'fight club',
          release_date: 2000,
          vote_average: 9.1,
          poster_path: undefined,
          backdrop_path: undefined,
          overview: 'overview',
          genres: 'action',
          runtime: 127}] 
    }
    const expected = [{
      id: 1,
      title: 'fight club',
      release_date: 2000,
      vote_average: 9.1,
      poster_path: 'https://image.tmdb.org/t/p/w500///' + undefined,
      overview: 'overview'}]
    const result = moviesReducer(initialState, actions.loadMovies(movies))
    expect(result).toEqual(expected)
  })
})