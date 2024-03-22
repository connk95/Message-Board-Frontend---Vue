import { reactive } from 'vue'
import type { User, UserState } from './user.type'
import { fetchUser } from './user.actions'

const initialState: UserState = {
  user: {} as User,
  error: '',
  loading: false
}

function isUser(object: User | null | undefined): object is User {
  return (object as User)._id !== undefined
}

const createUserStore = () => {
  const state = reactive<UserState>({
    ...initialState
  })

  const actions = {
    async fetchUserAction(userId: string) {
      state.loading = true
      try {
        const user = await fetchUser(userId)
        if (isUser(user)) {
          state.user = user
          state.error = ''
        } else {
          throw new Error('User not found')
        }
      } catch (error) {
        if (error instanceof Error) {
          state.error = error.message
        } else {
          state.error = 'Could not find user'
        }
      } finally {
        state.loading = false
      }
    }
  }

  return {
    state,
    actions
  }
}

export default createUserStore
