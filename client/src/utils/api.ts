import ky from 'ky'

type Login = {
  username: string;
  password: string;
}

type Register = {
  username: string;
  email: string;
  password1: string;
  password2: string;
}

type User = {
  username: string;
  email: string;
}

const api = ky.create({ prefixUrl: `${process.env.REACT_APP_API_URL}/api/v1/` })
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
export const login = (credentials: Login): Promise<{}> => api.post('auth/login', { json: credentials }).json()
export const logout = (token: string): Promise<{}> => withAuth(token).post('auth/logout').json()
export const register = (credentials: Register): Promise<{}> => api.post('auth/register', { json: credentials }).json()
export const updateUser = (user: User, token: string): Promise<{}> => withAuth(token).put('auth/user', { json: user }).json()
