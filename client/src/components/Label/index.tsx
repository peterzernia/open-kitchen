import React from 'react'

type Props = {
  htmlFor: string;
  required: boolean;
  label: string;
}

export default function Label(props: Props): React.ReactElement {
  const { htmlFor, required, label } = props

  return (
    <div>
      <label htmlFor={htmlFor}>{required ? `${label} *` : label}</label>
    </div>
  )
}
