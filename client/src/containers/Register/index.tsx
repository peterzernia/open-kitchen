import * as React from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { register } from 'common/api'
import Form from 'components/Form'
import Input from 'components/Input'
import { setUser, setNotification } from 'common/actions'
import { StateContext, DispatchContext } from 'common/context'
import { Register } from 'types'

export default function RegisterPage(props: RouteComponentProps): React.ReactElement {
  const { history } = props
  const state = React.useContext(StateContext)
  const dispatch = React.useContext(DispatchContext)
  const secondaryButton = { label: 'Cancel', handleClick: (): void => history.push('/login') }

  const handleSubmit = async (payload: Register): Promise<void> => {
    try {
      if (payload.password1 !== payload.password2) {
        dispatch(setNotification({
          message: 'Passwords must match',
          type: 'error',
        }))
      } else {
        const res = await register(payload)

        dispatch(setUser(res))

        history.push('/')
      }
    } catch (err) {
      let message
      const res = await err.response.json()

      if (res.message.includes('email')) {
        message = 'Email already taken'
      } else if (res.message.includes('username')) {
        message = 'Username already taken'
      } else {
        message = 'Yike! Error'
      }

      dispatch(setNotification({
        message,
        type: 'error',
      }))
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
        minlength={6}
        required
      />
      <Input
        label="Confirm Password"
        name="password2"
        type="password"
        minlength={6}
        required
      />
    </Form>
  )
}
