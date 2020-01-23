import * as React from 'react'
import { palette } from 'common/theme'
import './Button.css'

type Props = {
  children: React.ReactChild | string;
  type?: 'button' | 'submit';
  color: 'primary' | 'secondary' | 'none';
  onClick: (...args: any[]) => void; // eslint-disable-line
}

/* eslint react/button-has-type: 0 */
export default function Button(props: Props): React.ReactElement {
  const {
    children, type, color, onClick,
  } = props

  const backgroundColor = {
    primary: palette.primary,
    secondary: palette.white,
    none: 'none',
  }

  const textColor = {
    primary: palette.white,
    secondary: palette.black,
    none: 'none',
  }

  return (
    <button
      type={type || 'button'}
      className={`button ${color === 'none' ? 'icon-button' : ''}`}
      onClick={onClick}
      style={{ backgroundColor: backgroundColor[color], color: textColor[color] }}
    >
      {children}
    </button>
  )
}
