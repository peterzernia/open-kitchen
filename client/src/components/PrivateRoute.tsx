import * as React from 'react'
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from 'react-router-dom'

interface Props extends RouteProps {
  component: React.ComponentType<RouteComponentProps>;
  authenticated: boolean;
}

/* eslint react/jsx-props-no-spreading: 0 */
export default function PrivateRoute(props: Props): React.ReactElement {
  const { component: Component, authenticated, ...rest } = props
  return (
    <Route
      {...rest}
      render={(routeProps): React.ReactElement => (authenticated ? (
        <Component {...routeProps} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      ))}
    />
  )
}
