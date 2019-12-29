import * as React from 'react'
import Button from 'components/Button'
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
      <Button onClick={onClick} icon>
        <h3>{title}</h3>
      </Button>
      <div className="card-body">{body}</div>
    </div>
  )
}
