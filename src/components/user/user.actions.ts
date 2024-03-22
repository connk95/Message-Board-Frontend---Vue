import axios from 'axios'
import type { User } from './user.type'

export const createUser = ({ username, email, password }: User): Promise<any> => {
  return axios.post(`${import.meta.env.VITE_API_URL}/users`, {
    username,
    email,
    password
  })
}

export const fetchUser = (id: string): Promise<User> => {
  return axios.get(`${import.meta.env.VITE_API_URL}/users/${id}`).then((response) => response.data)
}
