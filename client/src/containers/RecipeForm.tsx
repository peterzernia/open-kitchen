import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Form from 'components/Form'
import Input from 'components/Input'
import TextEditor from 'components/TextEditor'
import {
  Recipe,
  createRecipe,
  editRecipe,
  getRecipe,
} from 'utils/api'
import { SET_NOTIFICATION } from 'utils/actions'
import { StateContext, DispatchContext } from 'utils/context'

type RouteParams = {
  slug: string;
}

// RecipeForm is used for both create and edit recipe routes
export default function RecipeForm(props: RouteComponentProps<RouteParams>): React.ReactElement {
  const state = React.useContext(StateContext)
  const dispatch = React.useContext(DispatchContext)
  const [loading, setLoading] = React.useState(true)
  const [recipe, setRecipe] = React.useState({})
  const { history, match } = props
  const { slug } = match.params
  // Indicates whether Route is create or edit recipe
  const isNew = !slug

  React.useEffect(() => {
    async function fetchData(): Promise<void> {
      setLoading(true)
      try {
        const res = await getRecipe(slug)
        setRecipe(res)
      } catch {
        dispatch({
          type: SET_NOTIFICATION,
          payload: {
            type: 'error',
            message: 'Oops! Something went wrong',
          },
        })
      } finally {
        setLoading(false)
      }
    }

    if (!isNew) {
      fetchData()
    } else {
      setLoading(false)
    }
  }, [slug, isNew, dispatch])

  const handleCreate = async (payload: Recipe): Promise<void> => {
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

  const handleEdit = async (payload: Recipe): Promise<void> => {
    try {
      await editRecipe(payload, slug, state.user.token)
      history.push('/')

      dispatch({
        type: SET_NOTIFICATION,
        payload: {
          type: 'success',
          message: 'Successfully edited',
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

  if (loading) return null

  return (
    <Form handleSubmit={isNew ? handleCreate : handleEdit} initialValues={recipe}>
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
