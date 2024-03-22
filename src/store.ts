// import { reactive, readonly } from 'vue'
// import type { LoggedInUser, NewUser } from './components/types/auth.type'
// import type { Post } from './components/types/post.type'
// import type { User } from './components/types/user.type'

// interface AuthState {
//   loggedInUser: LoggedInUser
//   newUser: NewUser
//   error: string
//   loading: boolean
// }

// interface PostState {
//   allPosts: Post[]
//   singlePost: Post
//   error: string
//   loading: boolean
// }

// interface UserState {
//   user: User
//   error: string
//   loading: boolean
// }

// interface State {
//   auth: AuthState
//   post: PostState
//   user: UserState
// }

// const createStore = () => {
//   const state = reactive<State>({
//     auth: {
//       loggedInUser: {} as LoggedInUser,
//       newUser: {} as NewUser,
//       error: '',
//       loading: false
//     },
//     post: {
//       allPosts: [] as Post[],
//       singlePost: {} as Post,
//       error: '',
//       loading: false
//     },
//     user: {
//       user: {} as User,
//       error: '',
//       loading: false
//     }
//   })

//   const actions = {
//     auth: {
//       setLoggedInUser(user: LoggedInUser) {
//         state.auth.loggedInUser = { ...user }
//       },
//       setNewUser(user: NewUser) {
//         state.auth.newUser = { ...user }
//       },
//       setError(error: string) {
//         state.auth.error = error
//       },
//       setLoading(loading: boolean) {
//         state.auth.loading = loading
//       }
//     },
//     post: {

//     }
//   }

//   return {
//     state: readonly(state),
//     ...actions
//   }
// }

// export default createStore
