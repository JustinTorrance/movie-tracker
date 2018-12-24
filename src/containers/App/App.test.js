import { mapStateToProps, mapDispatchToProps } from './App'
import { loadMovies } from '../../actions/index'
import { shallow, mount } from 'enzyme'
import { App } from './App'
import React from 'react'
import { fetchData } from '../../utils/apiCalls'
import { MemoryRouter } from 'react-router-dom'
import MovieDisplay from '../../components/MovieDisplay/MovieDisplay'
import Login from '../../containers/Login/Login'
import Signup from '../../components/Signup/Signup'
import { Provider } from 'react-redux'

jest.mock('../../utils/apiCalls')
jest.mock('../../components/MovieDisplay/MovieDisplay')
jest.mock('../../components/Signup/Signup')
jest.mock('../../containers/Login/Login')

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

  describe('routes', () => {
    const mockMovies = []
    let mockUser = {name: 'jake', email:'jake', password:'jake'}
    const mockLoadMovies = jest.fn()
    const mockStore = {getState: jest.fn(), subscribe: jest.fn(), dispatch: jest.fn()}
    
    it('should render MoviesDisplay if at the base route', () => {
      let wrapper = mount(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={['/']}>
          <App movies={mockMovies} user={mockUser} loadMovies={mockLoadMovies}></App>
        </MemoryRouter>
      </Provider>
      )

      expect(wrapper.find(MovieDisplay)).toHaveLength(1)
    })

    it('should render the Login component if at the /login route', () => {
      let wrapper = mount(
        <Provider store={mockStore}>
          <MemoryRouter initialEntries={['/login']}>
            <App movies={mockMovies} user={mockUser} loadMovies={mockLoadMovies}></App>
          </MemoryRouter>
        </Provider>
        )
  
        expect(wrapper.find(Login)).toHaveLength(1)
    })

    it('should redirect to the login route if no user is logged in', () => {
      let wrapper = mount(
        <Provider store={mockStore}>
          <MemoryRouter initialEntries={['/']}>
            <App movies={mockMovies} user={{}} loadMovies={mockLoadMovies}></App>
          </MemoryRouter>
        </Provider>
        )
  
        expect(wrapper.find(Login)).toHaveLength(1)
    })

    it('should render the Signup component if at the /signup route', () => {
      let wrapper = mount(
        <Provider store={mockStore}>
          <MemoryRouter initialEntries={['/signup']}>
            <App movies={mockMovies} user={mockUser} loadMovies={mockLoadMovies}></App>
          </MemoryRouter>
        </Provider>
        )
  
        expect(wrapper.find(Signup)).toHaveLength(1)
    })
  })
})
