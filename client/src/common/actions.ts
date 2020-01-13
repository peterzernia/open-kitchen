import { User, Notification } from 'types'

// Actions types
export const SET_USER = 'SET_USER'
export const CLEAR_USER = 'CLEAR_USER'
export const SET_NOTIFICATION = 'SET_NOTIFICATION'
export const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION'
export const RESET = 'RESET'

// Action creators
export const setUser = (user: User) => (
  {
    type: SET_USER,
    payload: user,
  } as const
)

export const clearUser = () => (
  {
    type: CLEAR_USER,
  } as const
)

export const setNotification = (notification: Notification) => (
  {
    type: SET_NOTIFICATION,
    payload: notification,
  } as const
)

export const clearNotification = () => (
  {
    type: CLEAR_NOTIFICATION,
  } as const
)

export const reset = () => (
  {
    type: RESET,
  } as const
)
