import * as React from 'react'
import Label from 'components/Label'
import HTMLElement from 'components/HTMLElement'

import './Input.css'

type Props = {
    className?: string;
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    minlength?: number;
    name: string;
    placeholder?: string;
    required?: boolean;
    type: string;
    value?: string;
}

export default function Input(props: Props): React.ReactElement {
  const {
    handleChange,
    label,
    minlength,
    name,
    placeholder,
    required,
    type,
    value,
  } = props

  return (
    <HTMLElement>
      <Label label={label} htmlFor="html-element" required={required} />
      <div className="input-container">
        <input
          className="input"
          name={name}
          onChange={handleChange}
          minLength={minlength}
          placeholder={placeholder}
          required={required}
          type={type}
          value={value}
        />
      </div>
    </HTMLElement>
  )
}
