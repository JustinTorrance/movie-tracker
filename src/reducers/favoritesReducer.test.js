import favoritesReducer from './favoritesReducer'
import * as actions from '../actions'

describe('favoritesReducer', () => {
  it ('should return the default state', () => {
    const expected = []
    const result = favoritesReducer(undefined, {})
    expect(result).toEqual(expected)
  })

  it('should return the state with a favorited movie', () => {
    const movies = [{ 
          id: 1,
          title: 'fight club',
          release_date: 2000,
          vote_average: 9.1,
          poster_path: undefined,
          backdrop_path: undefined,
          overview: 'overview',
          genres: 'action',
          runtime: 127
        }]
      
      const initialState = []
      const action = {
        type: 'LOAD_FAVORITES',
        movies
      }
      const result = favoritesReducer(initialState, action);
      expect(result).toEqual(movies)
      
      
    })

  })
