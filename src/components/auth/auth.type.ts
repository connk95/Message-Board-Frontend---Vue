import type { baseState } from '../types/base.type'
import type { User } from '../user/user.type'

export interface NewUser {
  username: string
  password: string
  email: string
}

export interface AuthState extends baseState {
  loggedInUser: LoggedInUser | null
  newUser: NewUser | null
}

export interface LoggedInUser {
  access_token: string
  user: User
}

export interface UserLoginData {
  username: string
  password: string
}
