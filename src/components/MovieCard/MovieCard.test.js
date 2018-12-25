import React from 'react'
import { shallow } from 'enzyme'
import MovieCard from './MovieCard'
import { mapStateToProps } from './MovieCard'
import { deleteFavorite, addFavorite, getFavorites } from '../../utils/apiCalls'
import { isRegExp } from 'util';

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
      <MovieCard movie={mockMovie} />
    );

  })

  describe('MovieCard Component', () => {
    it('should match the snapshot with all data passed in correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  
    it('should call getFavorites on componentDidMount', () => {
      const mockUser_Id = 7
      getFavorites.mockImplementation(() => mockUser_Id)
  
      const wrapper = shallow(<MovieCard movie={mockMovie} />, { disableLifecycleMethods: true })
          wrapper.instance().componentDidMount()
          expect(getFavorites).toHaveBeenCalled()
  
    })

    it('should call toggleFavorite when deleting a favorite', () => {
      deleteFavoriteMock = jest.fn()
      const spy = spyOn(wrapper.instance(), 'toggleFavorite')
      wrapper.instance().forceUpdate()
      const mockEvent = deleteFavoriteMock 
      wrapper.find().simulate('change', mockEvent)
      expect(spy).toHaveBeenCalled()
    })

    it('should call toggleFavorite when adding a favorite', () => {


    })

    it('updates sate when toggleFavorite is called', () => {
      const wrapper = shallow(<MovieCard movie={mockMovie} toggleFavorite={toggleFavorite} />)
      const mockEvent = { favorite: true }
      wrapper.instance().toggleFavorite(mockEvent)
      expect(wrapper.state('favorite')).toBe(true)
    })
 


  describe('mapStateToProps', () => {
    it('should return with a user id', () => {

      const mockObject = {
        movie: {},
        user_id: 7
      }
      
      const mockUser_Id =  mockObject.user_id

      const expected = {
        user_id: mockUser_Id
      }

      const mockState = {
        user_id: mockUser_Id
      }

      const mappedProps = mapStateToProps(mockState)
      expect(mappedProps).toEqual(expected)
    })
  })
  
  })
})