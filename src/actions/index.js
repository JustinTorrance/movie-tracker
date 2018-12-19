export const loadMovies = (movies) => ({
  type: 'LOAD_MOVIES',
  movies
})

export const signIn = (user) => ({
  type: 'SIGN_IN',
  user
})

export const signOut = (user) => ({
  type: 'SIGN_OUT',
  user
})