import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import getPokemon from '../../api/getPokemon'
import { addSinglePokemon } from '../pokemonsSlice'
import normalizeSinglePokemon from '../../services/normalizePokemon'
const classnames = require('classnames')

const SinglePokemon = ({ pokemonCardType, pokemon }) => {
  const [pokemonToDisplay, setPokemonToDisplay] = useState()
  const dispatch = useDispatch()
  const { name } = pokemonCardType === 'complete' ? useParams() : pokemon
  const singlePokemonsList = useSelector((state) => {
    return state.pokemons.singlePokemons
  })
  const showWarningError = !(
    pokemonCardType === 'simple' ||
    (pokemonCardType === 'complete' && pokemonToDisplay)
  )

  const pokemonClasses = classnames({
    flex: true,
    rounded: true,
    'border-gray-800': true,
    'justify-center': true,
    'items-center': true,
    'flex-col': true,
    'm-2': true,
    'p-2': true,
    'h-250': true,
    'hover:bg-gray-400': true,
    transition: true,
    'duration-200': true,
    relative: true,
    'w-1/4': pokemonCardType === 'complete',
    'border-2': pokemonCardType === 'complete',
    'rounded-md': pokemonCardType === 'complete',
    'space-y-6': pokemonCardType === 'simple',
    border: pokemonCardType === 'simple',
    'h-64': pokemonCardType === 'simple',
    'w-64': pokemonCardType === 'simple',
  })

  const closeButtonClasses = classnames({
    absolute: true,
    'top-0': true,
    'right-0': true,
    'hover:text-black': true,
    'text-gray-700': true,
    'font-semibold': true,
    'mx-1': true,
    'my-1': true,
    'px-1': true,
  })

  const expandedInfoClasses = classnames({
    flex: true,
    'flex-col': true,
    'items-start': true,
    'space-y-2': true,
    'self-start': true,
    'mx-2': true,
    'w-full': true,
  })

  const listStyles = classnames({
    'list-disc': true,
    'list-inside': true,
  })

  const listItemsStyles = classnames({
    'ml-2': true,
  })

  const getPokemonStats = (name) => {
    getPokemon(name)
      .then((res) => {
        dispatch(
          addSinglePokemon([
            ...singlePokemonsList,
            normalizeSinglePokemon(res),
          ]),
        )
      })
      .catch((err) => console.log({ err }))
  }

  const showPokemon = () => {
    if (singlePokemonsList?.length > 0) {
      const currentPokemon = singlePokemonsList.find((pk) => {
        if (pk.name === name) {
          return pk
        }
      })
      if (currentPokemon) {
        setPokemonToDisplay(currentPokemon)
      } else {
        getPokemonStats(name)
      }
    } else {
      getPokemonStats(name)
    }
  }

  useEffect(() => {
    if (pokemonCardType === 'complete') {
      showPokemon()
    }
  }, [singlePokemonsList])

  useEffect(() => {
    if (pokemonCardType === 'complete') {
      getPokemonStats(name)
    }
  }, [])

  return (
    <div className={pokemonClasses}>
      {pokemonCardType === 'complete' && (
        <div className={closeButtonClasses}>
          <Link to='/pokemon'>
            <p>Close</p>
          </Link>
        </div>
      )}
      {showWarningError ? (
        <p>No pokemons found!</p>
      ) : (
        <React.Fragment>
          <div>
            <img
              className='w-20'
              src={`https://img.pokemondb.net/sprites/black-white/anim/normal/${name}.gif`}
            />
          </div>
          <div className='font-semibold my-2'>
            <p>{`${name.charAt(0).toUpperCase()}${name.slice(1)}`}</p>
          </div>
        </React.Fragment>
      )}
      {pokemonCardType === 'complete' && pokemonToDisplay?.name && (
        <div className={expandedInfoClasses}>
          <p>
            <span className='font-semibold text-gray-800'>ID:</span>{' '}
            {pokemonToDisplay.id}
          </p>
          <div className='w-full'>
            <p>
              <span className='font-semibold text-gray-800'>{`Type${
                pokemonToDisplay?.types?.length > 1 ? 's' : ''
              }:`}</span>
            </p>
            <ul className={listStyles}>
              {pokemonToDisplay?.types?.map((type) => {
                return (
                  <li
                    className={listItemsStyles}
                    key={`${pokemonToDisplay.name}-type-${type?.type?.name}`}
                  >
                    {`${type?.type?.name
                      .charAt(0)
                      .toUpperCase()}${type?.type?.name.slice(1)}`}
                  </li>
                )
              })}
            </ul>
          </div>
          <p>
            <span className='font-semibold text-gray-800'>Height:</span>{' '}
            {pokemonToDisplay?.height}
          </p>
          <div>
            <p>
              <span className='font-semibold text-gray-800'>{`Abilitie${
                pokemonToDisplay?.abilities?.length > 1 ? 's' : ''
              }:`}</span>
            </p>
            <ul className={listStyles}>
              {pokemonToDisplay?.abilities?.map((ability) => {
                return (
                  <li
                    className={listItemsStyles}
                    key={`${pokemonToDisplay.name}-ability-${ability?.ability?.name}`}
                  >
                    {`${ability?.ability?.name
                      .charAt(0)
                      .toUpperCase()}${ability?.ability?.name.slice(1)}`}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default SinglePokemon
