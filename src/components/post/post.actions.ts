// import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import type { Post } from './post.type'
import type { Comment } from './comment.type'

interface AuthState {
  loggedInUser: {
    user: string
  }
}

// Simulating a store getter function to retrieve logged in user from the state
const getLoggedInUser = (): AuthState['loggedInUser'] => {
  // Implement logic to retrieve logged in user from your reactive store
  return { user: 'user_id' } // Replace with actual logic to retrieve user
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

export const newComment = ({ text, postId }: Comment): Promise<any> => {
  const loggedInUser = getLoggedInUser()
  return axios.patch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
    postId,
    text,
    user: loggedInUser.user
  })
}
