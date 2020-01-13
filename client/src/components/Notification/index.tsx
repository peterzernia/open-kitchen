import * as React from 'react'
import { DispatchContext } from 'common/context'
import { clearNotification } from 'common/actions'
import { palette } from 'common/theme'
import { Notification as Notif } from 'types'
import Close from 'assets/icons/close.svg'
import './Notification.css'

type Props = {
  notification: Notif;
}

type SecondaryColor = {
  [key: string]: string;
  success: string;
  error: string;
}

export default function Notification(props: Props): React.ReactElement {
  const dispatch = React.useContext(DispatchContext)
  const { notification } = props
  const { type, message } = notification

  const secondaryColor: SecondaryColor = {
    success: 'green',
    error: '#d01919',
  }

  React.useEffect(() => {
    // Clear notification after 3 seconds
    setTimeout(() => {
      if (message) {
        dispatch(clearNotification())
      }
    }, 3000)
  }, [message, dispatch])

  if (!message && !type) return null

  return (
    <div
      className="notification"
      style={{ backgroundColor: palette[type] }}
    >
      <div
        className="notification-sidebar"
        style={{ backgroundColor: secondaryColor[type] }}
      />
      <div className="notification-message">{message}</div>
      <button
        className="notification-button"
        type="button"
        onClick={(): void => { dispatch(clearNotification()) }}
      >
        <img src={Close} className="notification-icon" alt="close" />
      </button>
    </div>
  )
}
