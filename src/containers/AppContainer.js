import { connect } from 'react-redux'
import { loadMovies } from '../actions/index'
import App from '../components/App/App'

const mapStateToProps = (state) => ({
  movies: state.movies
})

const mapDispatchToProps = (dispatch) => ({
  loadMovies: (movies) => dispatch(loadMovies(movies))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)