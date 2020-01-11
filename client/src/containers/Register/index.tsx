import * as React from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { register } from 'common/api'
import Form from 'components/Form'
import Input from 'components/Input'
import { SET_USER, SET_NOTIFICATION } from 'common/actions'
import { StateContext, DispatchContext } from 'common/context'
import { Register } from 'types'

export default function RegisterPage(props: RouteComponentProps): React.ReactElement {
  const { history } = props
  const state = React.useContext(StateContext)
  const dispatch = React.useContext(DispatchContext)
  const secondaryButton = { label: 'Cancel', handleClick: (): void => history.push('/login') }

  const handleSubmit = async (payload: Register): Promise<void> => {
    try {
      const res = await register(payload)

      dispatch({
        type: SET_USER,
        payload: res,
      })

      history.push('/')
    } catch (err) {
      dispatch({
        type: SET_NOTIFICATION,
        payload: {
          message: 'Oops! Error',
          type: 'error',
        },
      })
    }
  }

  if (state.authenticated) return <Redirect to="/" />

  return (
    <Form
      size="sm"
      title="Register"
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
        label="Email"
        name="email"
        type="email"
        required
      />
      <Input
        label="Password"
        name="password1"
        type="password"
        required
      />
      <Input
        label="Confirm Password"
        name="password2"
        type="password"
        required
      />
    </Form>
  )
}
