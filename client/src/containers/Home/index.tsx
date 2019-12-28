import * as React from 'react'
import { StateContext } from 'utils/context'

export default function Home(): React.ReactElement {
  const state = React.useContext(StateContext)

  return (
    <div>
      {
        state.authenticated
          ? `Welcome, ${state.user.username}`
          : 'Home'
      }
    </div>
  )
}
