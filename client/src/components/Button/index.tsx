import * as React from 'react'
import { palette } from 'common/theme'
import { pickTextColor } from './helpers'
import './Button.css'

type Props = {
  children: React.ReactChild | string;
  type?: 'button' | 'submit';
  color?: 'primary';
  icon?: boolean;
  onClick: (...args: any[]) => void; // eslint-disable-line
}

/* eslint react/button-has-type: 0 */
export default function Button(props: Props): React.ReactElement {
  const {
    children, type, icon, color, onClick,
  } = props

  return (
    <button
      type={type || 'button'}
      className={`button ${icon && 'icon-button'}`}
      onClick={onClick}
      style={{ backgroundColor: palette[color], color: color && pickTextColor(color) }}
    >
      {children}
    </button>
  )
}
