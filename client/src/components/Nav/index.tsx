import * as React from 'react'
import { Link } from 'react-router-dom'
import { StateContext } from 'common/context'
import './Nav.css'

export default function Nav(): React.ReactElement {
  const state = React.useContext(StateContext)

  return (
    <nav>
      <Link className="nav-tab" to="/">open kitchen.</Link>
      <div className="nav-right">
        <Link className="nav-tab" to="/search">Search</Link>
        {
          state.authenticated
            && <Link className="nav-tab" to={`/recipes/${state.user.username}`}>Recipes</Link>
        }
        {
          state.authenticated
            ? <Link className="nav-tab" to="/logout">Logout</Link>
            : <Link className="nav-tab" to="/login">Login</Link>
        }
      </div>
    </nav>
  )
}
