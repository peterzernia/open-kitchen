import * as React from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import Form from 'components/Form'
import Input from 'components/Input'
import { SET_USER, SET_NOTIFICATION } from 'common/actions'
import { StateContext, DispatchContext } from 'common/context'
import { login } from 'common/api'
import { Login } from 'types'

export default function LoginPage(props: RouteComponentProps): React.ReactElement {
  const { history } = props
  const { location } = history
  const state = React.useContext(StateContext)
  const dispatch = React.useContext(DispatchContext)
  const secondaryButton = { label: 'Register', handleClick: (): void => history.push('/register') }

  const handleSubmit = async (payload: Login): Promise<void> => {
    try {
      const res = await login(payload)

      dispatch({
        type: SET_USER,
        payload: res,
      })

      if (location.state) {
        history.push(location.state.from.pathname)
      } else {
        history.push('/')
      }
    } catch (err) {
      dispatch({
        type: SET_NOTIFICATION,
        payload: {
          type: 'error',
          message: 'Oops! Error',
        },
      })
    }
  }

  if (state.authenticated) return <Redirect to="/" />

  return (
    <Form
      size="sm"
      title="Login"
      handleSubmit={handleSubmit}
      secondaryButton={secondaryButton}
    >
      <Input
        label="Username"
        name="username"
        type="text"
        required
      />
      <Input
        label="Password"
        name="password"
        type="password"
        required
      />
    </Form>
  )
}
