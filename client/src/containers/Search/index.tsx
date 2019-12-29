import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Input from 'components/Input'
import Loader from 'components/Loader'
import { searchRecipes } from 'common/api'
import { useDebounce } from 'common/hooks'
import Card from 'components/Card'
import Grid from 'components/Grid'
import './Search.css'

export default function Search(props: RouteComponentProps): React.ReactElement {
  const { history } = props
  const [value, setValue] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [recipes, setRecipes] = React.useState([])

  const debounced = useDebounce(value, 500)

  React.useEffect(() => {
    async function fetchData(): Promise<void> {
      setLoading(true)

      try {
        const res = await searchRecipes(debounced)
        setRecipes(res)
      } catch {
        setRecipes([])
      } finally {
        setLoading(false)
      }
    }

    if (debounced) {
      fetchData()
    } else {
      setRecipes([])
    }
  }, [debounced])

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    setValue(e.currentTarget.value)
  }

  return (
    <div>
      <div className="search-bar mx">
        <Input
          label=""
          name=""
          type="text"
          placeholder="Search"
          handleChange={handleChange}
          value={value}
        />
      </div>
      { loading && <Loader />}
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
    </div>
  )
}
