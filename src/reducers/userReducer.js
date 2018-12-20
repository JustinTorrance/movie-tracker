const defaultState = {
  name: null,
}

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return action.user
    case 'SIGN_OUT':
      return {}
    default: return state
  } 
}

export default userReducer