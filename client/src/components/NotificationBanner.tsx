import * as React from 'react'
import { DispatchContext } from 'utils/context'
import { CLEAR_NOTIFICATION } from 'utils/actions'

type Props = {
  notification: {
    message?: string;
    type?: 'error' | 'success';
  };
}

export default function NotificationBanner(props: Props): React.ReactElement {
  const dispatch = React.useContext(DispatchContext)
  const { notification } = props

  if (!notification.message && !notification.type) return null

  return (
    <div className={`${notification.type}`}>
      {notification.message}
      <button
        type="button"
        onClick={(): void => { dispatch({ type: CLEAR_NOTIFICATION }) }}
      >
        X
      </button>
    </div>
  )
}
