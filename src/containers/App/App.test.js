import { mapStateToProps, mapDispatchToProps } from './App'
import { fetchMovies } from '../../thunks/fetchMovies'
import { shallow, mount } from 'enzyme'
import { App } from './App'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import MovieDisplay from '../../components/MovieDisplay/MovieDisplay'
import Login from '../../containers/Login/Login'
import Signup from '../../components/Signup/Signup'
import { Provider } from 'react-redux'

jest.mock('../../components/MovieDisplay/MovieDisplay')
jest.mock('../../components/Signup/Signup')
jest.mock('../../containers/Login/Login')
jest.mock('../../thunks/fetchMovies')

fetchMovies.mockImplementation((data) => {
  return {'movies': data, "type": "LOAD_MOVIES"}
})

describe('App', () => {


  describe('App component', () => {
    const mockMovies = []
    let mockUser = {name: 'jake', email:'jake', password:'jake'}
    const mockLoadMovies = jest.fn()


    it('Should match the snapshot', () => {
      const wrapper = shallow(<App movies={mockMovies} user={mockUser} loadMovies={mockLoadMovies} error={false}/>)
      expect(wrapper).toMatchSnapshot()
    })

    it('Should match the snapshot if in error state', () => {
      const wrapper = shallow(<App movies={mockMovies} user={mockUser} loadMovies={mockLoadMovies} error={true}/>)
      expect(wrapper).toMatchSnapshot()
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
  
  describe('routes', () => {
    const mockMovies = []
    let mockUser = {name: 'jake', email:'jake', password:'jake'}
    const mockLoadMovies = jest.fn()
    const mockStore = {getState: jest.fn(), subscribe: jest.fn(), dispatch: jest.fn()}
    
    it('should render MoviesDisplay if at the base route', () => {
      let wrapper = mount(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={['/']}>
          <App movies={mockMovies} user={mockUser} loadMovies={mockLoadMovies} error={false}></App>
        </MemoryRouter>
      </Provider>
      )

      expect(wrapper.find(MovieDisplay)).toHaveLength(1)
    })

    it('should render the Login component if at the /login route', () => {
      let wrapper = mount(
        <Provider store={mockStore}>
          <MemoryRouter initialEntries={['/login']}>
            <App movies={mockMovies} user={mockUser} loadMovies={mockLoadMovies} error={false}></App>
          </MemoryRouter>
        </Provider>
        )
  
        expect(wrapper.find(Login)).toHaveLength(1)
    })

    it('should redirect to the login route if no user is logged in', () => {
      let wrapper = mount(
        <Provider store={mockStore}>
          <MemoryRouter initialEntries={['/']}>
            <App movies={mockMovies} user={{}} loadMovies={mockLoadMovies} error={false}></App>
          </MemoryRouter>
        </Provider>
        )
  
        expect(wrapper.find(Login)).toHaveLength(1)
    })

    it('should render the Signup component if at the /signup route', () => {
      let wrapper = mount(
        <Provider store={mockStore}>
          <MemoryRouter initialEntries={['/signup']}>
            <App movies={mockMovies} user={mockUser} loadMovies={mockLoadMovies} error={false}></App>
          </MemoryRouter>
        </Provider>
        )
  
        expect(wrapper.find(Signup)).toHaveLength(1)
    })

    it('should render the movieDisplay component if at the /favorites route', () => {
      let wrapper = mount(
        <Provider store={mockStore}>
          <MemoryRouter initialEntries={['/favorites']}>
            <App movies={mockMovies} user={mockUser} loadMovies={mockLoadMovies} error={false}></App>
          </MemoryRouter>
        </Provider>
        )
  
        expect(wrapper.find(MovieDisplay)).toHaveLength(1)
    })

    it('should redirect to login if at the /favorites route and no user is logged in', () => {
      let wrapper = mount(
        <Provider store={mockStore}>
          <MemoryRouter initialEntries={['/favorites']}>
            <App movies={mockMovies} user={{}} loadMovies={mockLoadMovies} error={false}></App>
          </MemoryRouter>
        </Provider>
        )
  
        expect(wrapper.find(Login)).toHaveLength(1)
    })

    it('should render the movieDisplay component if at the /trending route', () => {
      let wrapper = mount(
        <Provider store={mockStore}>
          <MemoryRouter initialEntries={['/trending']}>
            <App movies={mockMovies} user={mockUser} loadMovies={mockLoadMovies} error={false}></App>
          </MemoryRouter>
        </Provider>
        )
  
        expect(wrapper.find(MovieDisplay)).toHaveLength(1)
    })

    it('should redirect to login if at the /trending route and no user is logged in', () => {
      let wrapper = mount(
        <Provider store={mockStore}>
          <MemoryRouter initialEntries={['/trending']}>
            <App movies={mockMovies} user={{}} loadMovies={mockLoadMovies} error={false}></App>
          </MemoryRouter>
        </Provider>
        )
  
        expect(wrapper.find(Login)).toHaveLength(1)
    })
  })
})
