import * as React from 'react'
import { logout } from 'utils/api'
import { CLEAR_USER } from 'utils/actions'
import { DispatchContext, StateContext } from 'utils/context'

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
    <div>Logout success</div>
  )
}
