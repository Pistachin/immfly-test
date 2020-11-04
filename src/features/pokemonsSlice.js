import { createSlice } from '@reduxjs/toolkit'

export const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState: {
    list: [],
    singlePokemons: [],
    filteredPokemons: [],
  },
  reducers: {
    addPokemons: (state, action) => {
      state.list = [...action.payload]
    },
    addSinglePokemon: (state, action) => {
      state.singlePokemons = [...action.payload]
    },
    filterPokemons: (state, action) => {
      state.filteredPokemons = [...action.payload]
    },
  },
})

export const {
  addPokemons,
  addSinglePokemon,
  filterPokemons,
} = pokemonsSlice.actions

export default pokemonsSlice.reducer
