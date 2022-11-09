import { IUser } from './user.interface';

export interface IServiceUserCreateResponse {
  status: number;
  message: string;
  user: any | null;
  errors: { [key: string]: any };
}
