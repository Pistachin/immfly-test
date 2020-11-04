import React, { useState } from 'react'
import pokemonLogo from '../../assets/pokemon-logo.png'
import Search from '../search/Search'
const classnames = require('classnames')

const Header = () => {
  const headerClasses = classnames({
    flex: true,
    'flex-col': true,
    'justify-center': true,
    'items-center': true,
    'p-2': true,
    'space-y-2': true,
    'font-sans': true,
  })
  return (
    <div className={headerClasses}>
      <div>
        <img src={pokemonLogo} />
      </div>
      <div>
        <h3 className={classnames('font-bold')}>Generation 1</h3>
        <p>151 pokemon</p>
      </div>
      <Search />
    </div>
  )
}

export default Header
