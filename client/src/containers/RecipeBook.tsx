import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { getRecipesByUser } from 'utils/api'
import Loader from 'components/Loader'

type RouteParams = {
  username: string;
}

export default function RecipeBook(props: RouteComponentProps<RouteParams>): React.ReactElement {
  const [recipes, setRecipes] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const { match } = props
  const { username } = match.params

  React.useEffect(() => {
    async function fetchData(): Promise<void> {
      try {
        const res = await getRecipesByUser(username)
        setRecipes(res)
      } catch {
        setRecipes([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [username])

  if (loading) return <Loader />

  return (
    <div>
      {
        recipes.map((recipe) => (
          <div key={recipe.slug}>
            <div>{`${recipe.title} - ${recipe.author && recipe.author.username}`}</div>
            <div>{recipe.instructions}</div>
          </div>
        ))
      }
    </div>
  )
}
