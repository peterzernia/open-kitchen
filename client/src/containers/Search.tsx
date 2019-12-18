import * as React from 'react'
import Input from 'components/Input'
import Loader from 'components/Loader'
import { searchRecipes } from 'utils/api'
import { useDebounce } from 'utils/hooks'

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
      <Input
        label=""
        name=""
        type="text"
        handleChange={handleChange}
        value={value}
      />
      { loading && <Loader />}
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
