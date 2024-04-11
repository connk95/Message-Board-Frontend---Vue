import axios from 'axios'
import type { Post } from './post.type'
import type { Comment } from './comment.type'

interface AuthState {
  loggedInUser: {
    user: string
  }
}

const getLoggedInUser = (): AuthState['loggedInUser'] => {
  return { user: 'user_id' }
}

export const fetchSinglePost = (id: string): Promise<Post> => {
  return axios.get(`${import.meta.env.VITE_API_URL}/posts/${id}`).then((response) => response.data)
}

export const fetchPosts = (): Promise<Post[]> => {
  return axios.get(`${import.meta.env.VITE_API_URL}/posts`).then((response) => response.data)
}

export const newPost = ({ title, text }: Post): Promise<any> => {
  const loggedInUser = getLoggedInUser()
  return axios.post(`${import.meta.env.VITE_API_URL}/posts`, {
    title,
    text,
    user: loggedInUser.user
  })
}

export const newComment = ({ text, postId, user }: Comment): Promise<any> => {
  return axios
    .patch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
      postId,
      text,
      user
    })
    .catch((error) => {
      console.log(error)
      throw new Error(error)
    })
}
