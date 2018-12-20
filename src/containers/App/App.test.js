import { mapStateToProps, mapDispatchToProps } from './App'
import { signOut, loadMovies } from '../../actions/index'

describe('App', () => {

  describe('App componenet', () => {

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
    it('calls disptach with a signOut action when onClick is called', () => {
      const mockDispatch = jest.fn()
      const actionToDispatch = signOut()
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.signOut()
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('calls dispatch with a loadMovies action on componentDidMount', () => {
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
