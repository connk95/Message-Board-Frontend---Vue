import type { Post } from '../post/post.type'
import type { Comment } from '../post/comment.type'
import type { baseState } from '../types/base.type'

export interface User {
  username: string
  password: string
  email: string
  posts?: Post[]
  likes?: []
  comments?: Comment[]
  _id?: string
}

export interface UserState extends baseState {
  user: User | null
}
