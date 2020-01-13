import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Form from 'components/Form'
import Input from 'components/Input'
import { updateUser } from 'common/api'
import { setUser, setNotification } from 'common/actions'
import { DispatchContext, StateContext } from 'common/context'
import { User } from 'types'

export default function Profile(props: RouteComponentProps): React.ReactElement {
  const dispatch = React.useContext(DispatchContext)
  const state = React.useContext(StateContext)
  const { history } = props
  const initialValues = { username: state.user.username, email: state.user.email }
  const secondaryButton = { label: 'Cancel', handleClick: (): void => history.push(`/recipes/${state.user.username}`) }

  const handleSubmit = async (payload: User): Promise<void> => {
    try {
      const res = await updateUser(payload, state.user.token)

      dispatch(setUser({ ...res, token: state.user.token }))

      dispatch(setNotification({
        type: 'success',
        message: 'Successfully updated your profile',
      }))

      history.push(`/recipes/${res.username}`)
    } catch (err) {
      dispatch(setNotification({
        type: 'error',
        message: 'Yike! Error',
      }))
    }
  }

  return (
    <div>
      <Form
        size="sm"
        title="Settings"
        handleSubmit={handleSubmit}
        initialValues={initialValues}
        secondaryButton={secondaryButton}
      >
        <Input label="Username" name="username" type="text" />
        <Input label="Email" name="email" type="text" />
      </Form>
    </div>
  )
}
