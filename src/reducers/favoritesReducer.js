const favoritesReducer = (state = [], action) => {
  switch(action.type) {
    case 'LOAD_FAVORITES':
      return action.movies
    default:
      return state
  }
}

export default favoritesReducer