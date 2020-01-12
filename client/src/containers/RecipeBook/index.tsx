import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { getRecipesByUser } from 'common/api'
import Loader from 'components/Loader'
import Card from 'components/Card'
import FAB from 'components/FAB'
import Button from 'components/Button'
import Grid from 'components/Grid'
import Settings from 'assets/icons/settings.svg'
import { StateContext } from 'common/context'
import './RecipeBook.css'

type RouteParams = {
  username: string;
}

export default function RecipeBook(props: RouteComponentProps<RouteParams>): React.ReactElement {
  const [recipes, setRecipes] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const state = React.useContext(StateContext)
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
      { username === state.user.username ? (
        <div className="recipebook-settings">
          <Button onClick={(): void => history.push('/profile')} icon>
            <img src={Settings} alt="settings" />
          </Button>
        </div>
      ) : (
        <h1 className="recipebook-header">{`Recipes by ${username}`}</h1>
      )}
      {
        !recipes.length && (
          <div className="recipebook-no-recipes">
            {`It looks like 
              ${username === state.user.username
              ? "you don't"
              : "this user doesn't"} have any recipes. Click the &lsquo;+&lsquo; button to get started`}
          </div>
        )
      }
      <Grid>
        {
          recipes.map((recipe) => (
            <Card
              key={recipe.slug}
              title={recipe.title}
              body={recipe.description}
              onClick={(): void => history.push(`/recipes/${recipe.slug}/view`)}
            />
          ))
        }
      </Grid>
      { username === state.user.username && (
        <FAB onClick={(): void => history.push('/recipes/new')} />
      )}
    </div>
  )
}
