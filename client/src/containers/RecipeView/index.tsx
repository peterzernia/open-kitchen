import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { getRecipe, deleteRecipe } from 'common/api'
import Button from 'components/Button'
import Modal from 'components/Modal'
import Loader from 'components/Loader'
import { SET_NOTIFICATION } from 'common/actions'
import { StateContext, DispatchContext } from 'common/context'
import Delete from 'assets/icons/delete.svg'
import Twitter from 'assets/icons/twitter.svg'
import Pintrest from 'assets/icons/pinterest.svg'
import Facebook from 'assets/icons/facebook.svg'
import Email from 'assets/icons/email.svg'
import './RecipeView.css'

type RouteParams = {
  slug: string;
}

type dangerousHTML = {
  __html: string;
}

/* eslint react/no-danger: 0 */
export default function RecipeView(props: RouteComponentProps<RouteParams>): React.ReactElement {
  const [recipe, setRecipe] = React.useState(null)
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const state = React.useContext(StateContext)
  const dispatch = React.useContext(DispatchContext)
  const { history, match } = props
  const { slug } = match.params

  const createHTML = (text: string): dangerousHTML => ({ __html: text })

  React.useEffect(() => {
    async function fetchData(): Promise<void> {
      try {
        const res = await getRecipe(slug)
        setRecipe(res)
      } catch {
        // do nothing
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [slug])

  const handleDelete = async (): Promise<void> => {
    try {
      await deleteRecipe(slug, state.user.token)

      history.push(`/recipes/${state.user.username}`)

      dispatch({
        type: SET_NOTIFICATION,
        payload: {
          type: 'success',
          message: 'Successfully deleted recipe',
        },
      })
    } catch (err) {
      dispatch({
        type: SET_NOTIFICATION,
        payload: {
          type: 'error',
          message: 'Oops! Something went wrong',
        },
      })
      setOpen(false)
    }
  }

  if (loading) return <Loader />

  return (
    <div className="recipeview">
      <Modal
        open={open}
        text="Are you sure you want to delete this recipe?"
        onOK={handleDelete}
        onClose={(): void => setOpen(false)}
      />
      {
        recipe.author.id === state.user.id && (
          <div className="recipeview-actions">
            <Button onClick={(): void => history.push(`/recipes/${slug}/edit`)}>
              Edit
            </Button>
            <Button onClick={(): void => setOpen(true)} icon>
              <img src={Delete} alt="delete" />
            </Button>
          </div>
        )
      }
      <h1>{recipe.title}</h1>
      <h3>{recipe.author.username}</h3>
      <div className="recipeview-description">{recipe.description}</div>
      <div className="recipeview-ingredients" dangerouslySetInnerHTML={createHTML(recipe.ingredients)} />
      <div className="recipeview-instructions" dangerouslySetInnerHTML={createHTML(recipe.instructions)} />
      <div className="recipeview-notes">{recipe.notes}</div>
      <div className="recipeview-share">
        <a href={`https://www.facebook/share.php?u=https://openk1tchen.herokuapp.com/recipes/${slug}/view`}>
          <img height={16} src={Facebook} alt="facebook" />
        </a>
        <a href={`https://pinterest.com/pin/create/button/?url=https://openk1tchen.herokuapp.com/recipes/${slug}/view`}>
          <img height={16} src={Pintrest} alt="pinterest" />
        </a>
        <a href={`https://twitter.com/intent/tweet?text=${recipe.title} https://openk1tchen.herokuapp.com/recipes/${slug}/view`}>
          <img height={16} src={Twitter} alt="twitter" />
        </a>
        <a href={`mailto:?Subject=${recipe.title}&body=Check out this recipe! https://openk1tchen.herokuapp.com/recipes/${slug}/view`}>
          <img height={16} src={Email} alt="email" />
        </a>
      </div>
    </div>
  )
}
