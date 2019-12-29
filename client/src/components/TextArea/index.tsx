import * as React from 'react'
import HTMLElement from 'components/HTMLElement'
import Label from 'components/Label'
import './TextArea.css'

type Props = {
  name: string;
  label: string;
  value?: string;
  required?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  handleChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea(props: Props): React.ReactElement {
  const {
    name,
    label,
    value,
    required,
    resize,
    handleChange,
  } = props

  return (
    <HTMLElement>
      <Label label={label} htmlFor="html-element" required={required} />
      <textarea
        style={{
          resize,
        }}
        name={name}
        value={value}
        onChange={handleChange}
        required={required}
      />
    </HTMLElement>
  )
}
