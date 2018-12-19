import { connect } from 'react-redux'
import MovieDisplay from '../components/MovieDisplay/MovieDisplay'

const mapStateToProps = (state) => ({
  movies: state.movies
})

export default connect(mapStateToProps)(MovieDisplay)