import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Form from 'components/Form'
import Input from 'components/Input'
import TextEditor from 'components/TextEditor'
import { Recipe, createRecipe } from 'utils/api'
import { SET_NOTIFICATION } from 'utils/actions'
import { StateContext, DispatchContext } from 'utils/context'

export default function RecipeForm(props: RouteComponentProps): React.ReactElement {
  const { history } = props
  const state = React.useContext(StateContext)
  const dispatch = React.useContext(DispatchContext)

  const handleSubmit = async (payload: Recipe): Promise<void> => {
    try {
      await createRecipe(payload, state.user.token)
      history.push('/')

      dispatch({
        type: SET_NOTIFICATION,
        payload: {
          type: 'success',
          message: 'Successfully created',
        },
      })
    } catch (err) {
      dispatch({
        type: SET_NOTIFICATION,
        payload: {
          type: 'error',
          message: err.message,
        },
      })
    }
  }

  return (
    <Form handleSubmit={handleSubmit}>
      <Input
        label="Title"
        name="title"
        type="text"
        required
      />
      <TextEditor
        label="Ingredients"
        name="ingredients"
        required
      />
      <TextEditor
        label="Instructions"
        name="instructions"
        required
      />
    </Form>
  )
}
