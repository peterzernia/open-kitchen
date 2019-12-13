import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { StateContext, DispatchContext } from 'utils/context'
import { reducer, initialState } from 'utils/reducer'
import { SET_USER } from 'utils/actions'
import PrivateRoute from 'components/PrivateRoute'
import Nav from 'components/Nav'
import NotificationBanner from 'components/NotificationBanner'
import Home from 'containers/Home'
import Login from 'containers/Login'
import Logout from 'containers/Logout'
import Register from 'containers/Register'
import Profile from 'containers/Profile'
import PageNotFound from 'containers/PageNotFound'

import 'App.css'

export default function App(): React.ReactElement {
  const [loading, setLoading] = React.useState(true)
  const [state, dispatch] = React.useReducer(reducer, initialState)

  React.useEffect(() => {
    setLoading(true)
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      dispatch({
        type: SET_USER,
        payload: user,
      })
    }
    setLoading(false)
  }, [])

  if (loading) return null
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <Router>
          <Nav />
          <NotificationBanner notification={state.notification} />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/profile" component={Profile} authenticated={state.authenticated} />
            <Route component={PageNotFound} />
          </Switch>
        </Router>
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
}
