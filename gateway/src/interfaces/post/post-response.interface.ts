import { IPost } from './post.interface';

export interface IPostResponse {
  status: number;
  message: string;
  user: IPost | null;
  errors: { [key: string]: any };
}
