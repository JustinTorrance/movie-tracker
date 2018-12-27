import { combineReducers } from 'redux'
import moviesReducer from './moviesReducer'
import userReducer from './userReducer'
import favoritesReducer from './favoritesReducer';
import loadingReducer from './loadingReducer'

const rootReducer = combineReducers({
  movies: moviesReducer,
  user: userReducer,
  favorites: favoritesReducer,
  isLoading: loadingReducer
})

export default rootReducer