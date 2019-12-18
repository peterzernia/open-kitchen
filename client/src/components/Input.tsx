import * as React from 'react'
import Label from 'components/Label'

type Props = {
    className?: string;
    handleChange?: (e: object) => number;
    label: string;
    name: string;
    placeholder?: string;
    required?: boolean;
    type: string;
    value?: string;
}

export default function Input(props: Props): React.ReactElement {
  const {
    className,
    handleChange,
    label,
    name,
    placeholder,
    required,
    type,
    value,
  } = props

  return (
    <div className={className}>
      <Label label={label} className={className} required={required} />
      <input
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />
    </div>
  )
}
