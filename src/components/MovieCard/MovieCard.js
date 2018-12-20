import React, { Component } from 'react'
import './MovieCard.scss'
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
      return faveMovie.id === this.props.movie.id 
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
    <article className="movie-card" style={{ backgroundImage: `url(${movie.poster_path})` }}>
    <button onClick={this.toggleFavorite}>Fav</button>
      {/* <h2>{movie.title}</h2>
      <p>{movie.year}</p>
      <p>{movie.rating}</p> */}
      {/* <img src={movie.backdropPic}/> */}
      {/* <p>{movie.overview}</p>
      <p>{movie.genres}</p>
      <p>{movie.runtime}</p> */}
    </article>
    )
  }
} 

export const mapStateToProps = (state) => ({
  user_id: state.user.id
})

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(MovieCard)
