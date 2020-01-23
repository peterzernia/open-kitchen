import ky from 'ky'
import {
  Login,
  Register,
  User,
  UpdateUser,
  Recipe,
} from 'types'

const api = ky.create({ prefixUrl: `${process.env.REACT_APP_API_URL}/api/v1/` })

// eslint-disable-next-line
const withAuth = (token: string): any => api.extend({
  hooks: {
    beforeRequest: [
      (request): void => {
        request.headers.set('Authorization', token)
      },
    ],
  },
})

// Auth endpoints
export const login = (credentials: Login): Promise<User> => api.post('auth/login', { json: credentials }).json()
export const logout = (token: string): Promise<void> => withAuth(token).post('auth/logout').json()
export const register = (credentials: Register): Promise<User> => api.post('auth/register', { json: credentials }).json()
export const updateUser = (user: UpdateUser, token: string): Promise<User> => withAuth(token).put('auth/user', { json: user }).json()

// Recipe endpoints
export const createRecipe = (recipe: Recipe, token: string): Promise<Recipe> => withAuth(token).post('recipes', { json: recipe }).json()
export const getRecipe = (slug: string): Promise<Recipe> => api.get(`recipes/${slug}`).json()
export const editRecipe = (recipe: Recipe, slug: string, token: string): Promise<Recipe> => withAuth(token).put(`recipes/${slug}`, { json: recipe }).json()
export const searchRecipes = (q: string): Promise<Recipe[]> => api.get(`recipes?q=${q}`).json()
export const getRecipesByUser = (username: string): Promise<Recipe[]> => api.get(`users/${username}/recipes`).json()
export const deleteRecipe = (slug: string, token: string): void => withAuth(token).delete(`recipes/${slug}`)
