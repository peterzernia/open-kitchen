import * as React from 'react'
import RichTextEditor, { createValueFromString, createEmptyValue } from 'react-rte'
import Label from 'components/Label'

type Props = {
  handleChange?: (e: object) => number;
  name: string;
  label: string;
  required?: boolean;
  className?: string;
  value?: string;
}

const toolbarConfig = {
  display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
  INLINE_STYLE_BUTTONS: [
    { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
  ],
  BLOCK_TYPE_DROPDOWN: [
    { label: 'Normal', style: 'unstyled' },
    { label: 'Heading Large', style: 'header-one' },
    { label: 'Heading Medium', style: 'header-two' },
    { label: 'Heading Small', style: 'header-three' },
  ],
  BLOCK_TYPE_BUTTONS: [
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' },
  ],
}

export default function TextEditor(props: Props): React.ReactElement {
  const {
    handleChange,
    name,
    label,
    required,
    className,
    value,
  } = props
  const [editorValue, setEditorValue] = React.useState(
    value
      ? createValueFromString(value, 'html')
      : createEmptyValue(),
  )

  const ref = React.useRef(null)

  const onChange = (v: string): void => {
    setEditorValue(v)

    // Reset form state when field is 'blank'
    if (editorValue.toString('html') === '<p><br></p>') {
      handleChange({
        currentTarget: {
          name,
          value: '',
        },
      })
    } else {
      handleChange({
        currentTarget: {
          name,
          value: editorValue.toString('html'),
        },
      })
    }
  }

  return (
    <div>
      <Label label={label} className={className} required={required} />
      <RichTextEditor
        toolbarConfig={toolbarConfig}
        value={editorValue}
        onChange={onChange}
        ref={ref}
      />
      {
        // Shows native validation message
        required && (
          <input
            style={{
              opacity: 0,
              width: 0,
              height: 0,
              position: 'absolute',
            }}
            tabIndex={-1}
            value={value}
            required={required}
            onChange={handleChange}
            onFocus={(): void => ref.current._focus()} // eslint-disable-line
          />
        )
      }
    </div>
  )
}
