import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { getRecipesByUser } from 'utils/api'
import Loader from 'components/Loader'
import Card from 'components/Card'
import FAB from 'components/FAB'

type RouteParams = {
  username: string;
}

export default function RecipeBook(props: RouteComponentProps<RouteParams>): React.ReactElement {
  const [recipes, setRecipes] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const { history, match } = props
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
          <Card
            key={recipe.slug}
            title={`${recipe.title} - ${recipe.author && recipe.author.username}`}
            body={recipe.description}
          />
        ))
      }
      <FAB color="lightblue" onClick={(): void => history.push('/recipes/new')} />
    </div>
  )
}
