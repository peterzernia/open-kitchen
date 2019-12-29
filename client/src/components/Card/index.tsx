import * as React from 'react'
import './Card.css'

type Props = {
  title: string;
  body: string;
}

/* eslint react/no-danger: 0 */
export default function Card(props: Props): React.ReactElement {
  const { title, body } = props

  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="card-body">{body}</div>
    </div>
  )
}
