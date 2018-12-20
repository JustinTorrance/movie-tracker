export const fetchData = async (url) => {
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data 
  } catch(error) {
    throw new Error()
  }
}

export const addUser = async (user) => {
  try {
    const response = await fetch("http://localhost:3000/api/users/new", {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    return data 
  } catch(error) {
    throw new Error()
  }
}

export const loginUser = async (user) => {
    const response = await fetch("http://localhost:3000/api/users/", {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    return data 
}