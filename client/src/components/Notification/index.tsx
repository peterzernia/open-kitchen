import * as React from 'react'
import Button from 'components/Button'
import { DispatchContext } from 'common/context'
import { CLEAR_NOTIFICATION } from 'common/actions'
import { palette } from 'common/theme'
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
    <div
      className={`notification notification-${notification.type}`}
      style={{ backgroundColor: palette[notification.type] }}
    >
      <div>{notification.message}</div>
      <Button
        icon
        onClick={(): void => { dispatch({ type: CLEAR_NOTIFICATION }) }}
      >
        X
      </Button>
    </div>
  )
}
