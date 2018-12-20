import { combineReducers } from 'redux'
import moviesReducer from './moviesReducer'
import userReducer from './userReducer'
import favoritesReducer from './favoritesReducer';

const rootReducer = combineReducers({
  movies: moviesReducer,
  user: userReducer,
  favorites: favoritesReducer
})

export default rootReducer