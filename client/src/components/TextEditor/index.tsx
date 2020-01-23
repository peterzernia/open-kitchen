import * as React from 'react'
import RichTextEditor, { createValueFromString, createEmptyValue } from 'react-rte'
import Label from 'components/Label'
import HTMLElement from 'components/HTMLElement'
import './TextEditor.css'

type Props = {
  handleChange?: (e: object) => number;
  name: string;
  label: string;
  required?: boolean;
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
    value,
  } = props
  const [editorValue, setEditorValue] = React.useState(
    value
      ? createValueFromString(value, 'html')
      : createEmptyValue(),
  )

  // eslint-disable-next-line
  const ref = React.useRef<any>(null)

  const onChange = (v: string): void => {
    if (handleChange) {
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
  }

  return (
    <HTMLElement>
      <Label label={label} htmlFor="html-element" required={required} />
      <RichTextEditor
        className="text-editor"
        toolbarConfig={toolbarConfig}
        value={editorValue}
        onChange={onChange}
        ref={ref}
      />
      {
        // Show native validation message
        required ? (
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
            // eslint-disable-next-line
            onFocus={(): void => ref.current._focus()}
          />
        ) : <></>
      }
    </HTMLElement>
  )
}
