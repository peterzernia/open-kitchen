import * as React from 'react'

type Props = {
  title: string;
  body: string;
}

export default function Card(props: Props): React.ReactElement {
  const { title, body } = props

  return (
    <div>
      <div>{title}</div>
      <div>{body}</div>
    </div>
  )
}
