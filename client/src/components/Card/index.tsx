import * as React from 'react'
import './Card.css'

type Props = {
  title: string;
  body: string;
  onClick: () => void;
}

/* eslint react/no-danger: 0 */
export default function Card(props: Props): React.ReactElement {
  const { title, body, onClick } = props

  return (
    <div
      className="card"
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex={0}
    >
      <div className="card-title">
        <h3>{title}</h3>
      </div>
      <div className="card-body">{body}</div>
    </div>
  )
}
