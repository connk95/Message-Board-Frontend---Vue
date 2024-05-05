import { reactive } from 'vue'
import type { AuthState, NewUser, LoggedInUser, UserLoginData } from './auth.type'
import { userLogin, createUser, userLogout, setLoggedInUser } from './auth.actions'

const initialState: AuthState = {
  loggedInUser: null,
  newUser: null,
  error: '',
  loading: false
}

interface AuthActions {
  userLoginAction: (credentials: UserLoginData) => Promise<void>
  userLogoutAction: (credentials: UserLoginData) => Promise<void>
  createUserAction: (credentials: NewUser) => Promise<void>
  setLoggedInUserAction: () => Promise<void>
}

export interface AuthStoreType {
  authState: AuthState
  actions: AuthActions
}

function isLoggedInUser(object: LoggedInUser | null | undefined): object is LoggedInUser {
  return (object as LoggedInUser).access_token !== undefined
}

const createAuthStore = () => {
  const authState = reactive<AuthState>({
    ...initialState
  })

  const actions = {
    async userLoginAction({ username, password }: { username: string; password: string }) {
      authState.loading = true
      try {
        const loggedInUser = await userLogin({ username, password })
        authState.loggedInUser = loggedInUser
        authState.error = ''
      } catch (error) {
        if (error instanceof Error) {
          authState.error = error.message
        } else {
          authState.error = 'Could not find user'
        }
      } finally {
        authState.loading = false
      }
    },

    async userLogoutAction({ username, password }: { username: string; password: string }) {
      authState.loading = true
      try {
        await userLogout({
          username,
          password
        })
        authState.loggedInUser = null
        authState.error = ''
      } catch (error) {
        if (error instanceof Error) {
          authState.error = error.message
        } else {
          authState.error = 'Could not logout'
        }
      } finally {
        authState.loading = false
      }
    },

    async createUserAction(user: NewUser) {
      authState.loading = true
      try {
        const createdUser = await createUser(user)
        authState.newUser = createdUser
        authState.error = ''
      } catch (error) {
        if (error instanceof Error) {
          authState.error = error.message
        } else {
          authState.error = 'Could not create user'
        }
      } finally {
        authState.loading = false
      }
    },

    async setLoggedInUserAction() {
      authState.loading = true
      try {
        const loggedInUser = await setLoggedInUser()
        if (isLoggedInUser(loggedInUser)) {
          authState.loggedInUser = loggedInUser
          authState.error = ''
        } else {
          throw new Error('User not found')
        }
      } catch (error) {
        if (error instanceof Error) {
          authState.error = error.message
        } else {
          authState.error = 'Could not set logged in user'
        }
      } finally {
        authState.loading = false
      }
    }
  }

  return {
    authState,
    actions
  }
}

export default createAuthStore
