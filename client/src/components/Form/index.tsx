import * as React from 'react'
import Button from 'components/Button'

import './Form.css'

type Props = {
  title: string;
  size?: 'sm' | 'lg';
  children: React.ReactElement[];
  initialValues?: {
    [key: string]: any; // eslint-disable-line
  };
  handleSubmit: (values: object) => void;
  secondaryButton?: {
    label: string;
    handleClick: () => void;
  };
}

const SIZE = {
  sm: 360,
  lg: 600,
}

export default function Form(props: Props): React.ReactElement {
  const {
    title, size, children, initialValues, secondaryButton,
  } = props

  // Create initial values object with the names of the input
  // and initial values for each field if they exist
  const [values, setValues] = React.useState(
    children.map((child) => child.props.name).reduce((acc, curr) => {
      acc[curr] = initialValues ? initialValues[curr] : ''
      return acc
    }, {}),
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValues = { ...values }
    newValues[e.currentTarget.name] = e.currentTarget.value
    setValues(newValues)
  }

  const handleSubmit = (e: React.MouseEvent<HTMLInputElement>): void => {
    if (e.currentTarget.form.checkValidity()) {
      e.preventDefault()
      props.handleSubmit(values)
    }
  }

  // Assign handleChange func and values to children inputs
  const inputs = children.map((child) => React.cloneElement(child, {
    handleChange,
    value: values[child.props.name],
    key: child.props.name,
  }))

  return (
    <form className="form mx" style={{ maxWidth: size ? SIZE[size] : SIZE.lg }}>
      <div className="form-header">
        <h1>{title}</h1>
      </div>
      {inputs}
      <div className="form-buttons">
        <Button
          color="primary"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
        {
          secondaryButton
            && (
              <Button
                onClick={secondaryButton.handleClick}
              >
                {secondaryButton.label}
              </Button>
            )
        }
      </div>
    </form>
  )
}
