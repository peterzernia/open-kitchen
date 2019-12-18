import * as React from 'react'
import RichTextEditor from 'react-rte'
import Label from 'components/Label'

type Props = {
  handleChange?: (e: object) => number;
  name: string;
  label: string;
  required?: boolean;
  className?: string;
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
  const [value, setValue] = React.useState(RichTextEditor.createEmptyValue())
  const {
    handleChange,
    name,
    label,
    required,
    className,
  } = props

  const onChange = (v): void => {
    setValue(v)
    handleChange({
      currentTarget: {
        name,
        value: value.toString('html'),
      },
    })
  }

  return (
    <div>
      <Label label={label} className={className} required={required} />
      <RichTextEditor
        toolbarConfig={toolbarConfig}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
