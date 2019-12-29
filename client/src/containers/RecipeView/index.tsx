import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { getRecipe } from 'common/api'
import Button from 'components/Button'
import Loader from 'components/Loader'
import { StateContext } from 'common/context'
import './RecipeView.css'

type RouteParams = {
  slug: string;
}

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

  if (loading) return <Loader />

  return (
    <div>
      {
        recipe.author.id === state.user.id && (
          <div className="recipeview-edit">
            <Button onClick={(): void => history.push(`/recipes/${slug}/edit`)}>
              Edit
            </Button>
          </div>
        )
      }
      <div>{recipe.title}</div>
      <div>{recipe.author.username}</div>
      <div>{recipe.ingredients}</div>
      <div>{recipe.instructions}</div>
    </div>
  )
}
