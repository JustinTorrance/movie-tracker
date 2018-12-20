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

export const addFavorite = async (movie_id, user_id, movie) => {
  const response = await fetch('http://localhost:3000/api/users/favorites/new', {
      method: 'POST',
      body: JSON.stringify({movie_id, user_id, title: movie.title, poster_path: movie.poster_path, release_date: movie.release_date, vote_average: movie.vote_average, overview: movie.overview
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    return data 
}

export const getFavorites = async (user_id) => {
  const response = await fetch(`http://localhost:3000/api/users/${user_id}/favorites`)
  const data = await response.json()
  return data 
}

export const deleteFavorite = async (user_id, movie_id) => {
  const response = await fetch(`http://localhost:3000/api/users/${user_id}/favorites/${movie_id}`, {
    method: 'DELETE',
    body: JSON.stringify({user_id, movie_id}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json()
  console.log(data)
  return data
}