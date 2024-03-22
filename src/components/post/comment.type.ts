import type { baseMongooseType } from '../types/base.type'
import type { User } from '../user/user.type'

export interface Comment extends baseMongooseType {
  text: string
  postId: string
  user: User
  likes?: User[]
}
