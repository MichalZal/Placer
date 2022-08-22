import React from 'react'
import { NavLink } from 'react-router-dom'

import './NavLinks.scss'

const NavLinks = () => {
  return (
    <ul className="nav-links">
      <li className="nav-link">
        <NavLink exact to="/">All Users</NavLink>
      </li>
      <li className="nav-link">
        <NavLink to={`/u1/places`}>My Places</NavLink>
      </li>
      <li className="nav-link">
        <NavLink to={`/places/new`}>New Place</NavLink>
      </li>
      <li className="nav-link">
        <NavLink to={`/auth`}>Authenticate</NavLink>
      </li>
    </ul>
  )
}

export default NavLinks