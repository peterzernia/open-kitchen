import * as React from 'react'
import { Link } from 'react-router-dom'
import { StateContext } from 'utils/context'
import './Nav.css'

export default function Nav(): React.ReactElement {
  const state = React.useContext(StateContext)

  return (
    <nav>
      <Link to="/">Home</Link>
      <div className="nav-right">
        <Link to="/search">Search</Link>
        {
          state.authenticated
            && <Link to="/recipes/new">New</Link>
        }
        {
          state.authenticated
            && <Link to="/profile">Profile</Link>
        }
        {
          state.authenticated
            && <Link to={`/recipes/${state.user.username}`}>Recipes</Link>
        }
        {
          state.authenticated
            ? <Link to="/logout">Logout</Link>
            : <Link to="/login">Login</Link>
        }
      </div>
    </nav>
  )
}
