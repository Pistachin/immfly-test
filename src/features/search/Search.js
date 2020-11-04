import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { filterPokemons } from '../pokemonsSlice'
import findPokemons from '../../services/findPokemons'
const classnames = require('classnames')

const Search = () => {
  const dispatch = useDispatch()
  const [searchValue, setSearchValue] = useState('')
  const wholePokemonsList = useSelector((state) => {
    return state.pokemons.list
  })

  const inputClasses = classnames({
    'px-3': true,
    'py-1': true,
    'rounded-full': true,
    border: true,
    'border-gray-400': true,
    'border-gray-800': searchValue.length > 0,
    'space-x-1': true,
  })

  const buttonClasses = classnames({
    'text-gray-400': true,
    'text-gray-800': searchValue.length > 0,
    'font-semibold': true,
    transition: true,
    'duration-200': true,
  })

  let searchTimeout
  const editSearchValue = (val) => {
    window.clearTimeout(searchTimeout)
    setSearchValue(val)
  }

  const updateSearch = () => {
    searchTimeout = window.setTimeout(
      () =>
        dispatch(filterPokemons(findPokemons(searchValue, wholePokemonsList))),
      500,
    )
  }

  useEffect(() => {
    updateSearch(searchValue)
  }, [searchValue, wholePokemonsList])

  return (
    <div className={inputClasses}>
      <input
        className='focus:outline-none'
        name='search-pokemon'
        placeholder='Catch a pokemon!'
        type='text'
        value={searchValue}
        onChange={(e) => editSearchValue(e.target.value)}
      />
      <button className={buttonClasses} onClick={() => editSearchValue('')}>
        Clear
      </button>
    </div>
  )
}

export default Search
