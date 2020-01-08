import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { getRecipe } from 'common/api'
import Button from 'components/Button'
import Loader from 'components/Loader'
import { StateContext } from 'common/context'
import Twitter from 'assets/twitter.svg'
import Pintrest from 'assets/pinterest.svg'
import Facebook from 'assets/facebook.svg'
import Email from 'assets/email.svg'
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
  const [loading, setLoading] = React.useState(true)
  const state = React.useContext(StateContext)
  const { history, match } = props
  const { slug } = match.params

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

  const createHTML = (text: string): dangerousHTML => ({ __html: text })

  if (loading) return <Loader />

  return (
    <div className="recipeview">
      {
        recipe.author.id === state.user.id && (
          <div className="recipeview-edit">
            <Button onClick={(): void => history.push(`/recipes/${slug}/edit`)}>
              Edit
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
