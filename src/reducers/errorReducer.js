const errorReducer = (state = false, action) => {
  switch (action.type) {
    case 'IS_ERROR':
      return action.bool
    default: return state
  } 
}

export default errorReducer