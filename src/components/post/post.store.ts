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
  const postState = reactive<PostState>({
    ...initialState
  })

  const actions = {
    async fetchPostsAction() {
      postState.loading = true
      try {
        const posts = await fetchPosts()
        postState.allPosts = posts
        postState.error = ''
      } catch (error) {
        if (error instanceof Error) {
          postState.error = error.message
        } else {
          postState.error = 'Could not load posts'
        }
      } finally {
        postState.loading = false
      }
    },

    async fetchSinglePostAction(postId: string) {
      postState.loading = true
      try {
        const post = await fetchSinglePost(postId)
        postState.singlePost = post
        postState.error = ''
      } catch (error) {
        if (error instanceof Error) {
          postState.error = error.message
        } else {
          postState.error = 'Could not load post'
        }
      } finally {
        postState.loading = false
      }
    },

    async createPostAction(newPostData: Post) {
      postState.loading = true
      try {
        await newPost(newPostData)
        postState.error = ''
      } catch (error) {
        if (error instanceof Error) {
          postState.error = error.message
        } else {
          postState.error = 'Could not create post'
        }
      } finally {
        postState.loading = false
      }
    }
  }

  return {
    postState,
    actions
  }
}

export default createPostStore
