import * as React from 'react'
import Input from 'components/Input'
import { searchRecipes } from 'utils/api'

export default function Search(): React.ReactElement {
  const [value, setValue] = React.useState('')
  const [recipes, setRecipes] = React.useState([])

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    setValue(e.currentTarget.value)
    if (e.currentTarget.value) {
      const res = await searchRecipes(e.currentTarget.value)
      setRecipes(res)
    } else {
      setRecipes([])
    }
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
