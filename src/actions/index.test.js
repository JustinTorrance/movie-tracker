import * as actions from '../actions'

describe('actions', () => {
  it('should return a type of LOAD_MOVIES with movies', () => {
    const movies = []
    const expected = {
      type: 'LOAD_MOVIES',
      movies
    }
    const result = actions.loadMovies(movies)
    expect(result).toEqual(expected)
  })
  it('should return a type of SIGN_IN and a user', () => {
    const user = {}
    const expected = {
      type: 'SIGN_IN',
      user
    }
    const result = actions.signIn(user)
    expect(result).toEqual(expected)
  })
  it('should return a type of SIGN_OUT', () => {
    const expected = {
      type: 'SIGN_OUT'
    }
    const result = actions.signOut()
    expect(result).toEqual(expected)
  })
  it('should return a type of LOAD_FAVORITES with favorites', () => {
    const favorites = []
    const expected = {
      type: 'LOAD_FAVORITES',
      favorites
    }
    const result = actions.loadFavorites(favorites)
    expect(result).toEqual(expected)
  })
})