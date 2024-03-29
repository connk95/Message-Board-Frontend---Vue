import axios from 'axios'
import type { User } from '../user/user.type'
import type { LoggedInUser, UserLoginData } from './auth.type'

export const userLogin = ({ username, password }: UserLoginData): Promise<any> => {
  return axios
    .post(`${import.meta.env.VITE_API_URL}/auth/login`, {
      username,
      password
    })
    .then((response) => {
      const data = response.data
      if (data) {
        localStorage.setItem('loggedInUser', JSON.stringify(data))
        return data
      } else {
        throw new Error('Invalid username or password. Please try again')
      }
    })
}

export const setLoggedInUser = (): Promise<LoggedInUser | undefined> => {
  const user = localStorage.getItem('loggedInUser')
  if (user) {
    const loggedInUser = JSON.parse(user)
    return loggedInUser
  } else {
    return Promise.resolve(undefined)
  }
}

export const userLogout = ({ username, password }: UserLoginData): Promise<any> => {
  localStorage.removeItem('loggedInUser')
  return axios
    .post(`${import.meta.env.VITE_API_URL}/auth/logout`, {
      username,
      password
    })
    .catch((error) => {
      throw new Error(error)
    })
}

export const createUser = ({ username, email, password }: User): Promise<any> => {
  return axios
    .post(`${import.meta.env.VITE_API_URL}/users`, {
      username,
      email,
      password
    })
    .catch((error) => {
      throw new Error(error)
    })
}
