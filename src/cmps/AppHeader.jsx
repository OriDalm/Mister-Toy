import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserLogin } from './UserLogin'
import { userService } from '../services/user.service'
import React from 'react'
import { useState } from 'react'

export function AppHeader() {
  const navigate = useNavigate()

  const [user, setUser] = useState(userService.getLoggedinUser())

  function onLogout() {
    userService
      .logout()
      .then(() => {
        onSetUser(null)
      })
      .catch((err) => {
        showErrorMsg('OOPs try again')
      })
  }

  function onSetUser(user) {
    setUser(user)
    navigate('/')
  }

  return (
    <header className='app-header'>
      <Link className='logo' to='/'>
        <h2>Mister Toy</h2>
      </Link>
      <nav className='nav-links'>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/toy'>Toys</NavLink>
        <NavLink to='/dashboard'>Dashboard</NavLink>
      </nav>
      {user ? (
        <section>
          <Link to={`/user/${user._id}`}>{user.fullname}</Link>
          <button onClick={onLogout}>Logout</button>
        </section>
      ) : (
        <section>
          <UserLogin onSetUser={onSetUser} />
        </section>
      )}
    </header>
  )
}
