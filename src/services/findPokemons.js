const findPokemons = (text, list) => {
  if (text === '') {
    return list
  } else {
    return list.filter((pokemon) => {
      if (pokemon.name.includes(text)) {
        return pokemon
      }
    })
  }
}

export default findPokemons
