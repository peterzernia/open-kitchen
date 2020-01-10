import * as React from 'react'
import add from 'assets/add.svg'
import { palette } from 'common/theme'
import './FAB.css'

type Props = {
  onClick: () => void;
}

export default function FAB(props: Props): React.ReactElement {
  const { onClick } = props

  return (
    <button
      type="button"
      className="fab"
      style={{ backgroundColor: palette.primary }}
      onClick={onClick}
    >
      <img className="fab-icon" src={add} alt="add" />
    </button>
  )
}
