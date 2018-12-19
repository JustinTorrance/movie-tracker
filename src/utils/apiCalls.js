export const fetchData = async (url) => {
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data 
  } catch(error) {
    throw new Error()
  }
}

export const addUser = async (url, user) => {
  try {
    const response = await fetch(url, {
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