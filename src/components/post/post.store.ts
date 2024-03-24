import { reactive, readonly } from 'vue'
import type { PostState, Post } from './post.type'
import { fetchPosts, fetchSinglePost, newPost } from './post.actions'

const initialState: PostState = {
  allPosts: [],
  singlePost: null,
  error: '',
  loading: false
}

const createPostStore = () => {
  const state = reactive<PostState>({
    ...initialState
  })

  const actions = {
    async fetchPostsAction() {
      state.loading = true
      try {
        const posts = await fetchPosts()
        state.allPosts = posts
        state.error = ''
      } catch (error) {
        if (error instanceof Error) {
          state.error = error.message
        } else {
          state.error = 'Could not load posts'
        }
      } finally {
        state.loading = false
      }
    },

    async fetchSinglePostAction(postId: string) {
      state.loading = true
      try {
        const post = await fetchSinglePost(postId)
        state.singlePost = post
        state.error = ''
      } catch (error) {
        if (error instanceof Error) {
          state.error = error.message
        } else {
          state.error = 'Could not load post'
        }
      } finally {
        state.loading = false
      }
    },

    async createPostAction(newPostData: Post) {
      state.loading = true
      try {
        await newPost(newPostData)
        state.error = ''
      } catch (error) {
        if (error instanceof Error) {
          state.error = error.message
        } else {
          state.error = 'Could not create post'
        }
      } finally {
        state.loading = false
      }
    }
  }

  return {
    state: readonly(state),
    actions
  }
}

export default createPostStore
