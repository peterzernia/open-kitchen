import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { getRecipesByUser } from 'common/api'
import Loader from 'components/Loader'
import Card from 'components/Card'
import FAB from 'components/FAB'
import Button from 'components/Button'
import Settings from 'assets/settings.svg'
import './RecipeBook.css'

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
      <div className="recipebook-settings-container">
        <Button onClick={(): void => history.push('/profile')} icon>
          <img src={Settings} alt="settings" />
        </Button>
      </div>
      <div className="grid">
        {
          recipes.map((recipe) => (
            <Card
              key={recipe.slug}
              title={recipe.title}
              body={recipe.description}
            />
          ))
        }
      </div>
      <FAB color="lightblue" onClick={(): void => history.push('/recipes/new')} />
    </div>
  )
}
