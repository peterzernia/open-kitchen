import * as React from 'react'
import { logout } from 'common/api'
import { CLEAR_USER } from 'common/actions'
import { DispatchContext, StateContext } from 'common/context'

import './Logout.css'

export default function Logout(): React.ReactElement {
  const dispatch = React.useContext(DispatchContext)
  const state = React.useContext(StateContext)

  React.useEffect(() => {
    const authLogout = async (): Promise<void> => {
      try {
        await logout(state.user.token)
      } catch (err) {
        // Ignore err
      }
    }

    if (state.authenticated) {
      authLogout()
    }

    dispatch({
      type: CLEAR_USER,
    })
  }, [dispatch, state.authenticated, state.user.token])

  return (
    <div className="logout">Successfully logged out.</div>
  )
}
