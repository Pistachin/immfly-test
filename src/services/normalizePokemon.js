const normalizeSinglePokemon = (data) => {
  return {
    id: data.id,
    height: data.height,
    types: data.types,
    abilities: data.abilities,
    name: data.name,
  }
}

export default normalizeSinglePokemon
