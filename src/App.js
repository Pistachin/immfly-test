import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import getList from './api/getList'
import Header from './features/header/Header.js'
import PokemonList from './features/pokemonList/PokemonList'
import { addPokemons } from './features/pokemonsSlice'
import SinglePokemon from './features/singlePokemon/SinglePokemon'
const classnames = require('classnames')

function App() {
  const match = useRouteMatch()
  const dispatch = useDispatch()
  const pokemons = useSelector((state) => {
    return state.pokemons.filteredPokemons
  })

  const appClasses = classnames({
    flex: true,
    'flex-col': true,
    'justify-center': true,
    'items-center': true,
    'p-2': true,
    'font-sans': true,
  })

  useEffect(() => {
    getList()
      .then((res) => {
        dispatch(addPokemons(res.pokemon_species))
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className={appClasses}>
      <Header />
      <Switch>
        <Route exact path={match.path}>
          <PokemonList />
        </Route>
        {pokemons.map((pokemon) => {
          return (
            <Route
              key={`pokemon-route-${pokemon.name}`}
              exact
              path={`${match.path}/:name`}
            >
              <SinglePokemon pokemonCardType='complete' pokemon={pokemon} />
            </Route>
          )
        })}
      </Switch>
    </div>
  )
}

export default App
