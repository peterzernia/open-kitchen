import * as React from 'react'
import Input from 'components/Input'
import Loader from 'components/Loader'
import { searchRecipes } from 'utils/api'
import { useDebounce } from 'utils/hooks'
import Card from 'components/Card'
import './Search.css'

export default function Search(): React.ReactElement {
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
      </div>
    </div>
  )
}
