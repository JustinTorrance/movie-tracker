import React, { Component } from 'react'
import { connect } from 'react-redux'
import MovieCard from '../MovieCard/MovieCard'
import { uid } from 'react-uid'
import { signOut } from '../../actions/index'
import { PropTypes } from 'prop-types'
import { getFavorites } from '../../utils/apiCalls.js'
import Loading from '../Loading/Loading'

export class MovieDisplay extends Component {
  constructor() {
    super()
    this.state = {
      favorites: false,
      favoriteMovies: []
    }
    
  }

  async componentDidMount() {
    const favoriteMovies = await getFavorites(this.props.user_id)
    this.setState({favoriteMovies: favoriteMovies.data})
  }

  async toggleFavorites() {
    const favoriteMovies = await getFavorites(this.props.user_id)
    this.setState({
      favorites: !this.state.favorites,
      favoriteMovies: favoriteMovies.data
    })
  }

  render() {
    const { movies, signOut, isLoading } = this.props
    let renderedMovies = movies
    if(this.state.favorites) {
      renderedMovies = this.state.favoriteMovies
      console.log(renderedMovies)
    }
    if(isLoading === true) {
      return (<Loading />)
    } else {
      return(
        <section className="movies-section-container">
          <header className='movies-header'>
            <h1 className="movie-tracker">     
              movie
              <img src='./images/movie_roll.svg' alt="movie roll" className='main-logo'></img>
              tracker
            </h1>
            <button className='sign-out-btn' onClick={signOut}>Sign Out</button>
            <button className='toggle-favorites-btn' onClick={() => this.toggleFavorites()}>Favorites</button>
          </header>
          <h2 className='movie-container-label'>Trending</h2>
          <div className='movie-container-underline'></div>
          <div className="movies-container">{renderedMovies.map((movie) => {
            return (
              <MovieCard movie={movie} key={uid(movie)}/>
            )
          })}
          </div>
        </section>
      )
      
    }
  }
    }

export const mapStateToProps = (state) => ({
  movies: state.movies,
  user_id: state.user.id,
  isLoading: state.isLoading
})

export const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut())
})

MovieDisplay.propTypes = {
  movies: PropTypes.array.isRequired,
  signOut: PropTypes.func.isRequired,
  user_id: PropTypes.number.isRequired,
  isLoading: PropTypes.bool
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDisplay)