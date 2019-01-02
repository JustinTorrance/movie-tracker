import React from 'react'
import { shallow } from 'enzyme'
import { MovieCard } from './MovieCard'
import { mapStateToProps } from './MovieCard'
import * as API from '../../utils/apiCalls'

jest.mock('../../utils/apiCalls')

describe('MovieCard', () => {
  let mockMovie;
  let wrapper;

  beforeAll(() => {
     mockMovie = {
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

    wrapper = shallow(
      <MovieCard movie={mockMovie} user_id={1}/>
    );

  })

  describe('MovieCard Component', () => {

    it('should match the snapshot with all data passed in correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    describe('ComponentDidMount', () => {
      it('should call getFavorites on componentDidMount', async () => {
        API.getFavorites.mockImplementation(() => ({data: [mockMovie]}))
        wrapper = shallow(<MovieCard movie={mockMovie} user_id={1}/>, { disableLifecycleMethods: true })
        await wrapper.instance().componentDidMount()
        expect(API.getFavorites).toHaveBeenCalled()
      })

      it('set favorite to true if its a current favorite', async () => {
        API.getFavorites.mockImplementation(() => ({data: [{movie_id: 1}]}))
        wrapper = shallow(<MovieCard movie={mockMovie} user_id={1}/>, { disableLifecycleMethods: true })
        await wrapper.instance().componentDidMount()
        expect(wrapper.state().favorite).toBe(true)
      })

      it('set favorite to false if its a current favorite', async () => {
        API.getFavorites.mockImplementation(() => ({data: [{movie_id: 2}]}))
        wrapper = shallow(<MovieCard movie={mockMovie} user_id={1}/>, { disableLifecycleMethods: true })
        await wrapper.instance().componentDidMount()
        expect(wrapper.state().favorite).toBe(false)
      })
    })


    describe('toggleFavorite', () => {
  
      it('should add Favorite if the card isnt a favorite', () => {
        API.addFavorite = jest.fn()
        wrapper.state().favorite = false
        wrapper.instance().toggleFavorite() 

        expect(API.addFavorite).toHaveBeenCalled()
        expect(wrapper.state().favorite).toBe(false)
      })
  
      it('should delete Favorite if the card isnt a favorite', () => {
        API.deleteFavorite = jest.fn()
        wrapper.state().favorite = true
        wrapper.instance().toggleFavorite() 

        expect(API.deleteFavorite).toHaveBeenCalled()
        expect(wrapper.state().favorite).toBe(true)
      })

      it('should handle cases where the movie is passed like movie.movie_id instead of movie.id', () => {
         const mockMovie = {
           movie_id: 1,
           title: 'Titanic',
           year: 1999,
           rating: 9,
           posterPic: 'https://image.tmdb.org/t/p/w500///',
           backdropPic: 'https://image.tmdb.org/t/p/w500///',
           overview: 'great movie',
           genres: 'drama',
           runtime: 50
         }
     
         wrapper = shallow(
           <MovieCard movie={mockMovie} user_id={1}/>
         );
     

        API.addFavorite = jest.fn()
        wrapper.state().favorite = false
        wrapper.instance().toggleFavorite() 

        expect(API.addFavorite).toHaveBeenCalled()
        expect(wrapper.state().favorite).toBe(false)
      })
    
    })

  describe('mapStateToProps', () => {
    it('should return with a user id', () => {
      const expected = {
        user_id: 4
      }

      const mockState = {
        user: {id: 4}
      }

      const mappedProps = mapStateToProps(mockState)
      expect(mappedProps).toEqual(expected)
    })
  })
  
  })
})