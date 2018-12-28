import { combineReducers } from 'redux'
import moviesReducer from './moviesReducer'
import userReducer from './userReducer'
import loadingReducer from './loadingReducer';


const rootReducer = combineReducers({
  movies: moviesReducer,
  user: userReducer,
  isLoading: loadingReducer
})

export default rootReducer