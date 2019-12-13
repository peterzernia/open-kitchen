import * as React from 'react'

type Props = {
    children: React.ReactElement[];
    initialValues?: object;
    handleSubmit: (values: object) => void;
    secondaryButton?: {
      label: string;
      handleClick: () => void;
    };
}

export default function Form(props: Props): React.ReactElement {
  const { children, initialValues, secondaryButton } = props

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
    newValues[e.target.name] = e.currentTarget.value
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
    <form>
      {inputs}
      <div>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
        {
          secondaryButton
            && (
              <button
                type="button"
                onClick={secondaryButton.handleClick}
              >
                {secondaryButton.label}
              </button>
            )
        }
      </div>
    </form>
  )
}
