import type { baseMongooseType, baseState } from '../types/base.type'
import type { User } from '../user/user.type'
import type { Comment } from './comment.type'

export interface Post extends baseMongooseType {
  title: string
  text: string
  user: User
  likes?: User[]
  comments?: Comment[]
}

export interface PostState extends baseState {
  allPosts: Post[]
  singlePost: Post | null
}
