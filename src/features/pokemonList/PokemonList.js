import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useRouteMatch } from 'react-router-dom'
import SinglePokemon from '../singlePokemon/SinglePokemon'
const classnames = require('classnames')

const PokemonList = () => {
  const match = useRouteMatch()
  const pokemons = useSelector((state) => {
    return state.pokemons.filteredPokemons
  })

  const listClasses = classnames({
    flex: true,
    'justify-center': true,
    'p-2': true,
    'w-full': true,
    'flex-wrap': true,
    'lg:w-4/5': true,
    'xl:w-3/5': true,
    transition: true,
    'duration-200': true,
  })

  const pokemonCardStyles = classnames({
    'w-full': true,
    'sm:w-1/2': true,
    'md:w-1/3': true,
    flex: true,
    'justify-center': true,
    transition: true,
    'duration-200': true,
  })

  return (
    <div className={listClasses}>
      {pokemons?.length > 0 ? (
        pokemons.map((pokemon) => {
          return (
            <Link
              key={`pokemon-link-${pokemon.name}`}
              to={`${match.url}/${pokemon.name}`}
              className={pokemonCardStyles}
            >
              <SinglePokemon pokemonCardType='simple' pokemon={pokemon} />
            </Link>
          )
        })
      ) : (
        <p>We're in the grass, looking for pokemons...</p>
      )}
    </div>
  )
}

export default PokemonList
