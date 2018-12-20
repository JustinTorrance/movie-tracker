import React from 'react'
import { shallow } from 'enzyme' 
import { MovieDisplay } from './MovieDisplay'
import { signOut } from '../../actions/index'
import { mapStateToProps, mapDispatchToProps } from './MovieDisplay'

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
    const wrapper = shallow(<MovieDisplay movies={[mockMovie]} signOut={mockSignOut}/>)
    
    expect(wrapper).toMatchSnapshot()
  })

  describe('MapStateToProps', () => {
    it('Should create a object with a movies array', () => {
      const mockState = {
        movies: [mockMovie],
      }

      const expected = {movies: [mockMovie]}

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