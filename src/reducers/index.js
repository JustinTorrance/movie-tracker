import { combineReducers } from 'redux'
import moviesReducer from './moviesReducer'
import userReducer from './userReducer'
import loadingReducer from './loadingReducer';
import errorReducer from './errorReducer';


const rootReducer = combineReducers({
  movies: moviesReducer,
  user: userReducer,
  isLoading: loadingReducer,
  error: errorReducer
})

export default rootReducer