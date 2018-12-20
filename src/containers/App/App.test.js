import { mapStateToProps, mapDispatchToProps } from './App'
import { loadMovies } from '../../actions/index'
import { shallow } from 'enzyme'
import App from './App'
import React from 'react'

describe('App', () => {

  describe('App component', () => {

    it('Should match the snapshot', () => {
      const wrapper = shallow(<App />)
      expect(wrapper).toMatchSnapshot()
    })

    describe('ComponentDidMount', () => {
      
    })

  })

  describe('mapStateToProps', () => {
    it('should return an array with movie objects and a user object', () => {
      const mockMovie = {
        id: 1,
        title: 'Titanic',
        year: 1999,
        rating: 9,
        posterPic: 'https://image.tmdb.org/t/p/w500///',
        backdropPic: 'https://image.tmdb.org/t/p/w500///',
        overview: 'great movie',
        genres: 'drama',
        runtime: 50
      }

      const mockUser = {
        name: 'Ashley',
        email: 'Ashley@gmail.com',
        password: 'ashley'
      }
    
      const mockState = {
        movies: [mockMovie],
        user: mockUser
      }

      const expected = {
        movies: [mockMovie],
        user: mockUser
      }

      const mappedProps = mapStateToProps(mockState)
      expect(mappedProps).toEqual(expected)
    })

  })
  
  describe('mapDispatchToProps', () => {


    it('calls dispatch with a loadMovies action', () => {
      const mockMovie = {
        id: 1,
        title: 'Titanic',
        year: 1999,
        rating: 9,
        posterPic: 'https://image.tmdb.org/t/p/w500///',
        backdropPic: 'https://image.tmdb.org/t/p/w500///',
        overview: 'great movie',
        genres: 'drama',
        runtime: 50
      }
      const mockDispatch = jest.fn()
      const actionToDispatch = loadMovies(mockMovie)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.loadMovies(mockMovie)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)

    })
  })

})
