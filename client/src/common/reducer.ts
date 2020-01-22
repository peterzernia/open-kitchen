import {
  SET_USER,
  CLEAR_USER,
  SET_NOTIFICATION,
  CLEAR_NOTIFICATION,
  RESET,
} from 'common/actions'
import { State, Action } from 'types'

export const initialState: State = {
  user: {
    username: '',
    email: '',
  },
  authenticated: false,
  notification: {
    type: '',
    message: '',
  },
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_USER:
      localStorage.setItem('user', JSON.stringify(action.payload))
      return { ...state, user: action.payload, authenticated: true }
    case CLEAR_USER:
      localStorage.removeItem('user')
      return { ...state, user: initialState.user, authenticated: false }
    case SET_NOTIFICATION:
      return { ...state, notification: action.payload }
    case CLEAR_NOTIFICATION:
      return { ...state, notification: initialState.notification }
    case RESET:
      return initialState
    default:
      throw new Error()
  }
}
