import * as React from 'react'
import add from 'assets/add.svg'
import './FAB.css'

type Props = {
  color: string;
  onClick: () => void;
}

export default function FAB(props: Props): React.ReactElement {
  const { color, onClick } = props

  return (
    <button
      type="button"
      className="fab"
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      <img src={add} alt="add" />
    </button>
  )
}
