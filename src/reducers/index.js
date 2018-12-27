import { combineReducers } from 'redux'
import moviesReducer from './moviesReducer'
import userReducer from './userReducer'
<<<<<<< HEAD
import favoritesReducer from './favoritesReducer';
import loadingReducer from './loadingReducer';
=======
>>>>>>> Fix bug where favorites wouldnt load with stars in the favorites section

const rootReducer = combineReducers({
  movies: moviesReducer,
  user: userReducer,
<<<<<<< HEAD
  isLoading: loadingReducer
  // favorites: favoritesReducer
=======
>>>>>>> Fix bug where favorites wouldnt load with stars in the favorites section
})

export default rootReducer