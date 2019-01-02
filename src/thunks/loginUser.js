import { signIn } from '../actions/index'

export const loginUser = (user) => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:3000/api/users/", {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      dispatch(signIn(data.data))
    } catch(error) {
      console.log('error')
      throw (new Error())
    }
  }
}