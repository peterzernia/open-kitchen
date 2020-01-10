import * as React from 'react'
import { Link } from 'react-router-dom'
import Button from 'components/Button'
import { StateContext } from 'common/context'
import { useWindowDimensions } from 'common/hooks'
import Menu from 'assets/icons/menu.svg'

import './Nav.css'

export default function Nav(): React.ReactElement {
  const [open, setOpen] = React.useState(false)
  const state = React.useContext(StateContext)
  const { width } = useWindowDimensions()
  const isSmall = width < 450

  return (
    <div className="nav-wrapper">
      <nav className="nav" style={{ height: isSmall && open && 150 }}>
        <div className="nav-top">
          <Link className="nav-tab" to="/">open kitchen.</Link>
          {
            !isSmall
              ? (
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
              )
              : (
                <div className="nav-right">
                  <Button onClick={(): void => setOpen(!open)} icon>
                    <img src={Menu} alt="menu" />
                  </Button>
                </div>
              )
          }
        </div>
        {
          open && (
            <div
              className="nav-bottom"
              onClick={(): void => setOpen(false)}
              onKeyDown={(): void => setOpen(false)}
              role="button"
              tabIndex={0}
            >
              <div>
                <Link className="nav-tab" to="/search">Search</Link>
              </div>
              {
                state.authenticated
                  && <div><Link className="nav-tab" to={`/recipes/${state.user.username}`}>Recipes</Link></div>
              }
              {
                state.authenticated
                  ? <div><Link className="nav-tab" to="/logout">Logout</Link></div>
                  : <div><Link className="nav-tab" to="/login">Login</Link></div>
              }
            </div>
          )
        }
      </nav>
      {/* Nav uses absolite positioning for the menu. This div offsets content below the navbar. */}
      <div className="nav-offset" />
    </div>
  )
}
