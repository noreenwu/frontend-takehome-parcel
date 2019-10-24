const api = 'http://localhost:3000'

const headers = {
  'Accept': 'application/json',
  credentials: 'omit'
}

const options = {
  method: 'GET',
  mode: 'no-cors'
}

export const get = (query) =>
    fetch(`${api}/api/v1/search.json?query=${query}`, headers)
		.then(res =>  res.text() )
		.then(res => JSON.parse(res))
