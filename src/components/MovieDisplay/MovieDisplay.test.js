import React from 'react'
import { shallow } from 'enzyme' 
import { MovieDisplay } from './MovieDisplay'
import Loading from '../Loading/Loading'
import { signOut } from '../../actions/index'
import { mapStateToProps, mapDispatchToProps } from './MovieDisplay'
import { getFavorites } from '../../utils/apiCalls'

jest.mock('../../utils/apiCalls')
getFavorites.mockImplementation(() => {
  return {data: []}
})

describe('MovieDisplay', () => {
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
  const mockSignOut = jest.fn()

  it('Should match the snapshot', () => {
    const wrapper = shallow(<MovieDisplay movies={[mockMovie]} signOut={mockSignOut} user_id={1}/>)
    
    expect(wrapper).toMatchSnapshot()
  })

  it('Should match the snapshot if isLoading is true', () => {
    const wrapper = shallow(<MovieDisplay movies={[mockMovie]} signOut={mockSignOut} user_id={2}/>)
    wrapper.setState({
      movies: [mockMovie],
      user: {id: 1},
      isLoading: true
    })
    wrapper.update()
    expect(wrapper).toMatchSnapshot()
  })

  it('should call toggleFavorites on button click', () => {
    const wrapper = shallow(<MovieDisplay movies={[mockMovie]} signOut={mockSignOut} user_id={2}/>)
    wrapper.instance().toggleFavorites = jest.fn()
    wrapper.find('.toggle-favorites-btn').simulate('click')
    expect(wrapper.instance().toggleFavorites).toHaveBeenCalled();
  })

  describe('toggleFavorites', () => {
    it('should call getFavorites', async () => {
      const wrapper = shallow(<MovieDisplay movies={[mockMovie]} signOut={mockSignOut} user_id={2}/>)
      await wrapper.instance().toggleFavorites()
      expect(getFavorites).toHaveBeenCalledWith(2)
    })

    it('should set favoriteMovies to the array returned from the fetch call', async () => {
      const wrapper = shallow(<MovieDisplay movies={[mockMovie]} signOut={mockSignOut} user_id={2}/>)
      await wrapper.instance().toggleFavorites()
      const expected = []
      expect(wrapper.state().favoriteMovies).toEqual(expected)
    })
  
    it('should set favorites to en empty string if current page is favorites', async () => {
      const wrapper = shallow(<MovieDisplay movies={[mockMovie]} signOut={mockSignOut} user_id={2}/>)
      await wrapper.instance().toggleFavorites()
      await wrapper.instance().toggleFavorites()
      const expected = ''
      expect(wrapper.state().favorites).toEqual(expected)
      
    })

    it('should set favorites to a string of favorites if current value is an empty string', async () => {
      const wrapper = shallow(<MovieDisplay movies={[mockMovie]} signOut={mockSignOut} user_id={2}/>)
      await wrapper.instance().toggleFavorites()
      const expected = 'favorites'
      expect(wrapper.state().favorites).toEqual(expected)
      
    })
  })

  describe('MapStateToProps', () => {
    it('Should create an object with a movies array', () => {
      const mockState = {
        movies: [mockMovie],
        user: {id: 1},
        isLoading: false
      }

      const expected = {movies: [mockMovie], user_id: 1, isLoading: false}

      const mappedProps = mapStateToProps(mockState)
      expect(mappedProps).toEqual(expected)
    })
  })

  describe('MapDispatchToProps', () => {
    it('Calls dispatch with a signOut action', () => {
      const mockDispatch = jest.fn()
      const actionToDispatch = signOut()
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.signOut()
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
})