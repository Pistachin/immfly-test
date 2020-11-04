const axios = require('axios')

const getPokemon = (name) => {
  return axios
    .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((res) => {
      return res.data
    })
    .catch((err) => console.log({ err }))
}

export default getPokemon
