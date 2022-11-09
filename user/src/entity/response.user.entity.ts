import { UserEntity } from './user.entity';
export interface UserSearchResponseEntity {
  status: number;
  message: string;
  user: UserEntity | null;
}

export interface UserCreateResponseEntity {
  status: number;
  message: string;
  user: UserEntity | null;
  errors: { [key: string]: any } | null;
}
