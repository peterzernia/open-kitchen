import * as React from 'react'
import Form from 'components/Form'
import Input from 'components/Input'
import { updateUser } from 'utils/api'
import { SET_USER, SET_NOTIFICATION } from 'utils/actions'
import { DispatchContext, StateContext } from 'utils/context'

type Payload = {
  username: string;
  email: string;
}

export default function Profile(): React.ReactElement {
  const [editProfile, setEditProfile] = React.useState(false)
  const dispatch = React.useContext(DispatchContext)
  const state = React.useContext(StateContext)
  const initialValues = { username: state.user.username, email: state.user.email }
  const secondaryButton = { label: 'Cancel', handleClick: (): void => setEditProfile(false) }

  const handleSubmit = async (payload: Payload): Promise<void> => {
    try {
      const res = await updateUser(payload, state.user.token)

      dispatch({
        type: SET_USER,
        payload: res,
      })

      setEditProfile(false)

      dispatch({
        type: SET_NOTIFICATION,
        payload: {
          type: 'success',
          message: 'Successfully updated your profile',
        },
      })
    } catch (err) {
      dispatch({
        type: SET_NOTIFICATION,
        payload: {
          type: 'error',
          message: err.message,
        },
      })
    }
  }

  return (
    <div>
      {
        !editProfile
          ? (
            <button type="button" onClick={(): void => setEditProfile(true)}>
              Edit Profile
            </button>
          ) : (
            <Form
              handleSubmit={handleSubmit}
              initialValues={initialValues}
              secondaryButton={secondaryButton}
            >
              <Input label="Username" name="username" type="text" />
              <Input label="Email" name="email" type="text" />
            </Form>
          )
      }
    </div>
  )
}
