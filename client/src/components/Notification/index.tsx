import * as React from 'react'
import { DispatchContext } from 'utils/context'
import { CLEAR_NOTIFICATION } from 'utils/actions'
import { Notification as Notif } from 'types'
import './Notification.css'

type Props = {
  notification: Notif;
}

export default function Notification(props: Props): React.ReactElement {
  const dispatch = React.useContext(DispatchContext)
  const { notification } = props

  if (!notification.message && !notification.type) return null

  return (
    <div className={`notification notification-${notification.type}`}>
      <div>{notification.message}</div>
      <button
        type="button"
        onClick={(): void => { dispatch({ type: CLEAR_NOTIFICATION }) }}
      >
        X
      </button>
    </div>
  )
}
