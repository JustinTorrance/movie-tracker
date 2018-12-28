import { fetchMovies } from './fetchMovies'
import { loading, loadMovies } from '../actions/index'


describe('fetchMovies', () => {
  let mockUrl
  let mockDispatch
  
  beforeEach(() => {
    mockUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=da90047b6c1d3526d4b04666a1b64a0d&language=en-US&page=1&region=US'
    mockDispatch = jest.fn()
  })
  
  it('calls dispatch with the loading action', () => {
    const thunk = fetchMovies(mockUrl) 
    thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(loading(false))
  })

  it('should dispatch loadMovies with the correct param', async () => {
    const mockMovie =
        [{ 
          id: 1,
          title: 'fight club',
          release_date: 2000,
          vote_average: 9.1,
          poster_path: undefined,
          backdrop_path: undefined,
          overview: 'overview',
          genres: 'action',
          runtime: 127 
        }]
    
    window.fetch = jest.fn().mockImplpementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        movies: mockMovie
      })
    }))
    
    const thunk = fetchMovie(mockUrl)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(loadMovies(mockMovie))
  })

  it('should dispatch loading(false) if the response is ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true
    }))
    
    const thunk = fetchMovies(mockUrl)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(loading(false))
  })

  it('should dispatch loading(true) if the response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false
    }))
    
    const thunk = fetchMovies(mockUrl)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(loading(true))
  })
})