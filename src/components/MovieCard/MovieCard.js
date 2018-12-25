import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import * as API from '../../utils/apiCalls'
import { connect } from 'react-redux'

export class MovieCard extends Component {
  constructor(){
    super()
    this.state = {
      favorite: false
    }
  }

  async componentDidMount() {
    const currentFavorites = await API.getFavorites(this.props.user_id)
    const found = currentFavorites.data.find((faveMovie) => {
      return faveMovie.movie_id === this.props.movie.id 
    })

    if (found) {
      this.setState({
        favorite: true
      })
    } else {
      this.setState({
        favorite: false
      })
    } 
  }

  toggleFavorite = () => {
    const { user_id, movie } = this.props
    if (this.state.favorite) {
      API.deleteFavorite(user_id, movie.id) 
    } else {
      API.addFavorite(movie.id, user_id, movie) 
    }
    this.setState({favorite: !this.state.favorite})
  }

  render() {
    const { movie } = this.props
    return (
    <article className='movie-card' style={{ backgroundImage: `url(${movie.poster_path})` }}>
      <i onClick={this.toggleFavorite} className={`fas fa-star ${this.state.favorite && 'favorite'}`}></i>    
      <div className='dark-background'></div>
      <div className='movie-title-container'>
        <h2 className='movie-title'>{movie.title}</h2>
        <p className='release-date-label'>Released:</p>
        <p className='movie-release-date'>{movie.release_date}</p>
        <p className='rating-label'>Avg. Rating:</p>
        <p className='movie-rating'>{movie.vote_average}</p>
      </div>
      <p className='overview'>{movie.overview}</p>
    </article>
    )
  }
} 

export const mapStateToProps = (state) => ({
  user_id: state.user.id
})

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  user_id: PropTypes.number.isRequired
}

export default connect(mapStateToProps)(MovieCard)
