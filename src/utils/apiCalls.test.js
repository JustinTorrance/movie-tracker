import * as API from './apiCalls'


describe('API', () => {

  describe('fetchData', () => {
    it('should call fetch with the correct params', async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          json: () => {
            return Promise.resolve()
          },
          ok: true
        })
      })
      const url = 'https://api.themoviedb.org/3/movie/popular?api_key=da90047b6c1d3526d4b04666a1b64a0d&language=en-US&page=1&region=US'
      const expected = url
      await API.fetchData(url)
      expect(window.fetch).toHaveBeenCalledWith(expected)
    })

    it('should throw an error if fetch fails', () => {
      window.fetch = () => Promise.resolve({ ok: false });
      const expected = Error();
      expect(API.fetchData()).rejects.toEqual(expected);
    })
  })

  describe('addUser', () => {
    it('calls fetch with the correct data when adding a new user', async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          json: () => {
            return Promise.resolve()
          },
          ok: true
        })
      })
      const mockUser = { name: 'Ashley', email: 'ashley@gmail.com', password: 'ashley'}
      const expected1 = "http://localhost:3000/api/users/new"
      const expected2 = {
        method: "POST",
        body: JSON.stringify(mockUser),
        headers: {
          "Content-Type": "application/json"
        }
      }
      await API.addUser(mockUser)
      expect(window.fetch).toHaveBeenCalledWith(expected1, expected2)
    })

    it('should throw an error when the fetch fails', async () => {
      const mockUser = { name: 'Ashley', email: 'ashley@gmail.com', password: 'ashley' }
      window.fetch = () => Promise.resolve({ ok: false });
      const expected = Error();
      expect(API.addUser(mockUser)).rejects.toEqual(expected);
    })
  })
  
  describe('loginUser', () => {

    it('calls fetch with the correct data when logging in a user', async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          json: () => {
            return Promise.resolve()
          },
          ok: true
        })
      })
      const mockUser = { name: 'Ashley', email: 'ashley@gmail.com', password: 'ashley'}
      const expected1 = "http://localhost:3000/api/users/"
      const expected2 = {
        method: "POST",
        body: JSON.stringify(mockUser),
        headers: {
          "Content-Type": "application/json"
        }
      }
      await API.loginUser(mockUser)
      expect(window.fetch).toHaveBeenCalledWith(expected1, expected2)
    })
  })
})