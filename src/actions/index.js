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

export const loading = (bool) => ({
  type: 'IS_LOADING',
  bool
})

export const catchError = (bool) => ({
  type: 'IS_ERROR',
  bool
})
