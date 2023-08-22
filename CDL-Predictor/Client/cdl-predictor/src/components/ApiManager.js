export const getTeams = () => {
  return fetch('https://localhost:5001/api/Teams')
    .then(response => response.json())
}

export const getUserById = (id) => {
  return fetch(`https://localhost:5001/api/Users/${id}`)
    .then(response => response.json())
}

export const getUserByEmail = (email) => {
  return fetch(`https://localhost:5001/api/Users/GetByEmail?email=${email}`)
    .then(res => res.json())
}

export const createUser = (userObject) => {
  return fetch("https://localhost:5001/api/Users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userObject)
  })
    .then(res => res.json())
}

export const editUser = (userObject) => {
  return fetch(`https://localhost:5001/api/Users/${userObject.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userObject)

  })
    .then(response => response.json())
}

export const getPredictions = (id) => {
  return fetch(`https://localhost:5001/api/Predictions/${id}`)
    .then(response => response.json())
}

export const createPrediction = (userId, team1id, team2id, score) => {
  return fetch(`https://localhost:5001/api/Predictions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userId: +userId,
      team1: +team1id,
      team2: +team2id,
      team1Score: score[0],
      team2Score: score[1]
    })

  })
    .then(response => response.json())
}

export const deletePrediction = (id) => {
  return fetch(`https://localhost:5001/api/Predictions/${id}`, {
    method: "DELETE"
  })
}