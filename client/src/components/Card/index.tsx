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
    <div className="card">
      <button className="card-title" type="button" onClick={onClick}>
        <h3>{title}</h3>
      </button>
      <div className="card-body">{body}</div>
    </div>
  )
}
