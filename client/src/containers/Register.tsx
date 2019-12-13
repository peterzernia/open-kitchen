import * as React from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { register } from 'utils/api'
import Form from 'components/Form'
import Input from 'components/Input'
import { SET_USER, SET_NOTIFICATION } from 'utils/actions'
import { StateContext, DispatchContext } from 'utils/context'


type Payload = {
  username: string;
  email: string;
  password1: string;
  password2: string;
}

export default function Register(props: RouteComponentProps): React.ReactElement {
  const { history } = props
  const state = React.useContext(StateContext)
  const dispatch = React.useContext(DispatchContext)
  const secondaryButton = { label: 'Cancel', handleClick: (): void => history.push('/login') }

  const handleSubmit = async (payload: Payload): Promise<void> => {
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
          message: err.message,
          type: 'error',
        },
      })
    }
  }

  if (state.authenticated) return <Redirect to="/" />

  return (
    <Form
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
