import * as React from 'react'
import './HTMLElement.css'

type Props = {
  children: React.ReactElement[];
}

export default function HTMLElement(props: Props): React.ReactElement {
  const { children } = props

  return (
    <div className="html-element">
      { children }
    </div>
  )
}
