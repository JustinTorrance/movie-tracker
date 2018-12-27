export const loadMovies = (movies) => ({
  type: 'LOAD_MOVIES',
  movies
})

export const signIn = (user) => ({
  type: 'SIGN_IN',
  user
})

export const signOut = () => ({
  type: 'SIGN_OUT'
})

export const loadingReducer = (bool) => ({
  type: 'IS_LOADING',
  bool
})
