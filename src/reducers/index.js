import { combineReducers } from 'redux'
import moviesReducer from './moviesReducer'
import userReducer from './userReducer'
<<<<<<< HEAD
<<<<<<< HEAD
import favoritesReducer from './favoritesReducer';
import loadingReducer from './loadingReducer';
=======
>>>>>>> Fix bug where favorites wouldnt load with stars in the favorites section
=======
>>>>>>> 705cb86fec58fba1c78eb0b172d043134d30c7f4

const rootReducer = combineReducers({
  movies: moviesReducer,
  user: userReducer,
<<<<<<< HEAD
<<<<<<< HEAD
  isLoading: loadingReducer
  // favorites: favoritesReducer
=======
>>>>>>> Fix bug where favorites wouldnt load with stars in the favorites section
=======
>>>>>>> 705cb86fec58fba1c78eb0b172d043134d30c7f4
})

export default rootReducer