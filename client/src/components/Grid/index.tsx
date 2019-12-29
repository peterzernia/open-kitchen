import * as React from 'react'
import './Grid.css'

type Props = {
  children: React.ReactChild[];
}

export default function Grid(props: Props): React.ReactElement {
  const { children } = props

  return (
    <div className="grid">
      {children}
    </div>
  )
}
