import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { StateContext, DispatchContext } from 'common/context'
import { reducer, initialState } from 'common/reducer'
import { setUser } from 'common/actions'
import PrivateRoute from 'components/PrivateRoute'
import Nav from 'components/Nav'
import Notification from 'components/Notification'
import Home from 'containers/Home'
import Login from 'containers/Login'
import Logout from 'containers/Logout'
import PageNotFound from 'containers/PageNotFound'
import Profile from 'containers/Profile'
import RecipeBook from 'containers/RecipeBook'
import RecipeForm from 'containers/RecipeForm'
import RecipeView from 'containers/RecipeView'
import Register from 'containers/Register'
import Search from 'containers/Search'
import 'App.css'

export default function App(): React.ReactElement {
  const [loading, setLoading] = React.useState(true)
  const [state, dispatch] = React.useReducer(reducer, initialState)

  React.useEffect(() => {
    setLoading(true)
    const s = localStorage.getItem('user')

    if (s) {
      const user = JSON.parse(s)
      dispatch(setUser(user))
    }
    setLoading(false)
  }, [])

  return (
    <>
      {
        !loading && (
          <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>
              <Router>
                <Nav />
                <Notification notification={state.notification} />
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/login" component={Login} />
                  <Route path="/logout" component={Logout} />
                  <PrivateRoute path="/profile" component={Profile} authenticated={state.authenticated} />
                  <PrivateRoute path="/recipes/new" component={RecipeForm} authenticated={state.authenticated} />
                  <PrivateRoute path="/recipes/:slug/edit" component={RecipeForm} authenticated={state.authenticated} />
                  <Route path="/recipes/:slug/view" component={RecipeView} />
                  <Route path="/recipes/:username" component={RecipeBook} />
                  <Route path="/register" component={Register} />
                  <Route path="/search" component={Search} />
                  <Route component={PageNotFound} />
                </Switch>
              </Router>
            </StateContext.Provider>
          </DispatchContext.Provider>
        )
      }
    </>
  )
}
