import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Form from 'components/Form'
import Input from 'components/Input'
import TextArea from 'components/TextArea'
import TextEditor from 'components/TextEditor'
import {
  createRecipe,
  editRecipe,
  getRecipe,
} from 'common/api'
import { Recipe } from 'types'
import { setNotification } from 'common/actions'
import { StateContext, DispatchContext } from 'common/context'
import Loader from 'components/Loader'

type RouteParams = {
  slug?: string;
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

  const secondaryButton = {
    label: 'Cancel',
    handleClick: (): void => history.push(`/recipes/${state.user.username}`),
  }


  React.useEffect(() => {
    async function fetchData(): Promise<void> {
      setLoading(true)
      try {
        if (slug) {
          const res = await getRecipe(slug)
          setRecipe(res)
        }
      } catch {
        dispatch(setNotification({
          type: 'error',
          message: 'Yike! Error',
        }))
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

      dispatch(setNotification({
        type: 'success',
        message: 'Successfully created',
      }))

      history.push(`/recipes/${state.user.username}`)
    } catch (err) {
      dispatch(setNotification({
        type: 'error',
        message: 'Yike! Error',
      }))
    }
  }

  const handleEdit = async (payload: Recipe): Promise<void> => {
    try {
      if (slug) {
        await editRecipe(payload, slug, state.user.token)

        dispatch(setNotification({
          type: 'success',
          message: 'Successfully edited',
        }))

        history.push(`/recipes/${slug}/view`)
      }
    } catch (err) {
      dispatch(setNotification({
        type: 'error',
        message: 'Yike! Error',
      }))
    }
  }

  if (loading) return <Loader />

  return (
    <Form
      title={isNew ? 'New Recipe' : 'Edit Recipe'}
      handleSubmit={isNew ? handleCreate : handleEdit}
      initialValues={recipe}
      secondaryButton={secondaryButton}
    >
      <Input
        label="Title"
        name="title"
        type="text"
        required
      />
      <TextArea
        label="Description"
        name="description"
        resize="none"
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
      <TextArea
        label="Notes"
        name="notes"
        resize="none"
      />
    </Form>
  )
}
