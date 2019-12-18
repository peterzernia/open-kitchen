import React from 'react'

type Props = {
  className: string;
  required: boolean;
  label: string;
}

export default function Label(props: Props): React.ReactElement {
  const { className, required, label } = props

  return (
    <div>
      <label htmlFor={className}>{required ? `${label} *` : label}</label>
    </div>
  )
}
