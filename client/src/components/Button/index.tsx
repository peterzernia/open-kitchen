import * as React from 'react'
import './Button.css'

type Props = {
  children: React.ReactChild | string;
  icon?: boolean;
  onClick: () => void;
}

export default function Button(props: Props): React.ReactElement {
  const { children, icon, onClick } = props

  return (
    <button
      type="button"
      className={`${icon ? 'icon-button' : 'button'}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
