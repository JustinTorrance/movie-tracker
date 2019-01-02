import React, { Component } from 'react'
import { connect } from 'react-redux'
import MovieCard from '../MovieCard/MovieCard'
import { uid } from 'react-uid'
import { signOut } from '../../actions/index'
import { PropTypes } from 'prop-types'
import { getFavorites } from '../../utils/apiCalls.js'
import Loading from '../Loading/Loading'
import { Link } from 'react-router-dom'

export class MovieDisplay extends Component {
  constructor() {
    super()
    this.state = {
      favorites: '',
      favoriteMovies: []
    }
  }

  componentDidMount = async () => {
    const favoriteMovies = await getFavorites(this.props.user_id)
    this.setState({favoriteMovies: favoriteMovies.data})
  }

  async toggleFavorites() {
    let current = ''
    const favoriteMovies = await getFavorites(this.props.user_id)
    if (!this.state.favorites) {
      current = 'favorites'
    }
    this.setState({
      favorites: current,
      favoriteMovies: favoriteMovies.data
    })
  }

  render() {
    const { movies, signOut, isLoading, user } = this.props
    let renderedMovies = movies
    if(this.state.favorites) {
      renderedMovies = this.state.favoriteMovies
      var title = 'Favorites'
      var buttonText = 'trending'
    } else {
      var title = 'Trending'
      var buttonText = 'favorites'
    }
    if(isLoading) {
      return (<Loading />)
    }
    return(
      <section className="movies-section-container">
        <header className='movies-header'>
          <h1 className="movie-tracker">  
            movie
            <img src='./images/movie_roll.svg' alt="movie roll" className='main-logo'></img>
            tracker
          </h1>
          <p className='user-greeting'>Hello, {user.name}</p>
          <Link to={'/login'}>
            <button className='sign-out-btn' onClick={signOut}>sign out</button>
          </Link>
          <Link to={`/${buttonText}`}>
            <button className='toggle-favorites-btn' onClick={() => this.toggleFavorites()}>{ buttonText}</button>
          </Link>
        </header>
        <h2 className='movie-container-label'>{title}</h2>
        <div className='movie-container-underline'></div>
        <div className="movies-container">{renderedMovies.map((movie) => {
          return (
            <MovieCard movie={movie} key={uid(movie)} reRender={this.componentDidMount}/>
          )
        })}
        {
          renderedMovies.length === 0 && <h2>You Have No Favorites</h2>
        }
        </div>
      </section>
    )
    }
  }

export const mapStateToProps = (state) => ({
  movies: state.movies,
  user_id: state.user.id,
  isLoading: state.isLoading,
  user: state.user
})

export const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut())
})

MovieDisplay.propTypes = {
  movies: PropTypes.array.isRequired,
  signOut: PropTypes.func.isRequired,
  user_id: PropTypes.number.isRequired,
  isLoading: PropTypes.bool,
  user: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDisplay)