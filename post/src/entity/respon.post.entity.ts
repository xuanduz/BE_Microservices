import { PostEntity } from "./post.entity";

export interface PostCreateResponseEntity {
  status: number;
  message: string;
  user: PostEntity | null;
  errors: { [key: string]: any } | null;
}
