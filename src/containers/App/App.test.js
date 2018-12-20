import { mapStateToProps, mapDispatchToProps } from './App'
import { loadMovies } from '../../actions/index'
import { shallow } from 'enzyme'
import { App } from './App'
import React from 'react'
import { fetchData } from '../../utils/apiCalls';

jest.mock('../../utils/apiCalls')

describe('App', () => {
  const mockMovies = [{
    id: 1,
    title: 'Titanic',
    year: 1999,
    rating: 9,
    posterPic: 'https://image.tmdb.org/t/p/w500///',
    backdropPic: 'https://image.tmdb.org/t/p/w500///',
    overview: 'great movie',
    genres: 'drama',
    runtime: 50
  }]

  beforeAll(() => {
    fetchData.mockImplementation(() => mockMovies)
  })

  describe('App component', () => {
    const mockMovies = []
    let mockUser = {name: 'jake', email:'jake', password:'jake'}
    const mockLoadMovies = jest.fn()
    

    it('Should match the snapshot', () => {
      const wrapper = shallow(<App movies={mockMovies} user={mockUser} loadMovies={mockLoadMovies}/>)
      expect(wrapper).toMatchSnapshot()
    })

    it('Should match the snapshot if rendering redirect', () => {

    })

    describe('ComponentDidMount', () => {
      it('Should call fetchData', () => {
        const wrapper = shallow(<App movies={mockMovies} user={{}} loadMovies={mockLoadMovies}/>, { disableLifecycleMethods: true })
        wrapper.instance().componentDidMount()
        expect(fetchData).toHaveBeenCalled()
      })

      it('Should call loadMovies', async () => {
        const wrapper = shallow(<App movies={mockMovies} user={{}} loadMovies={mockLoadMovies}/>, { disableLifecycleMethods: true })
        await wrapper.instance().componentDidMount()
        expect(mockLoadMovies).toHaveBeenCalled()
      })
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
