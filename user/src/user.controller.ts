import { Controller, HttpStatus, Inject } from '@nestjs/common';
import { MessagePattern, ClientProxy } from '@nestjs/microservices';

import { UserService } from './services/user.service';
import { IUser } from './interfaces/user.interface';
import { UserCreateResponseEntity, UserSearchResponseEntity } from './entity/response.user.entity';
import { comparePassword } from './utils/bcrypt';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @MessagePattern('user_search_by_credentials')
  public async searchUserByCredentials(searchParams: {
    email: string;
    password: string;
  }): Promise<UserSearchResponseEntity> {
    let result: UserSearchResponseEntity;

    if (searchParams.email && searchParams.password) {
      const user = await this.userService.searchUser({
        email: searchParams.email,
      });

      if (user && user[0]) {
        if (comparePassword(searchParams.password, user[0].password)) { // compare password
          result = {
            status: HttpStatus.OK,
            message: 'user_search_by_credentials_success',
            user: user[0],
          };
        } else {
          result = {
            status: HttpStatus.NOT_FOUND,
            message: 'user_search_by_credentials_not_match',
            user: null,
          };
        }
      } else {
        result = {
          status: HttpStatus.NOT_FOUND,
          message: 'user_search_by_credentials_not_found',
          user: null,
        };
      }
    } else {
      result = {
        status: HttpStatus.NOT_FOUND,
        message: 'user_search_by_credentials_not_found',
        user: null,
      };
    }

    return result;
  }

  @MessagePattern('user_get_by_id')
  public async getUserById(id: string): Promise<UserSearchResponseEntity> {
    let result: UserSearchResponseEntity;

    if (id) {
      const user = await this.userService.searchUserById(id);
      if (user) {
        result = {
          status: HttpStatus.OK,
          message: 'user_get_by_id_success',
          user,
        };
      } else {
        result = {
          status: HttpStatus.NOT_FOUND,
          message: 'user_get_by_id_not_found',
          user: null,
        };
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'user_get_by_id_bad_request',
        user: null,
      };
    }

    return result;
  }

  @MessagePattern('user_create')
  public async createUser(userParams: IUser): Promise<UserCreateResponseEntity> {
    let result: UserCreateResponseEntity;
    
    if (userParams) {
      const usersWithEmail = await this.userService.searchUser({
        email: userParams.email,
      });
      
      if (usersWithEmail && usersWithEmail.length > 0) {
        result = {
          status: HttpStatus.CONFLICT,
          message: 'user_create_conflict',
          user: null,
          errors: {
            email: {
              message: 'Email already exists',
              path: 'email',
            },
          },
        };
      } else {
        const createdUser = await this.userService.createUser(userParams);
          console.log('createdUser ', createdUser)
          delete createdUser.password;
          result = {
            status: HttpStatus.CREATED,
            message: 'user_create_success',
            user: createdUser,
            errors: null,
          };
        // try {
        //   const createdUser = await this.userService.createUser(userParams);
        //   console.log('createdUser ', createdUser)
        //   delete createdUser.password;
        //   result = {
        //     status: HttpStatus.CREATED,
        //     message: 'user_create_success',
        //     user: createdUser,
        //     errors: null,
        //   };
        // } catch (e) {
        //   result = {
        //     status: HttpStatus.PRECONDITION_FAILED,
        //     message: 'user_create_precondition_failed',
        //     user: null,
        //     errors: e.errors,
        //   };
        // }
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'user_create_bad_request',
        user: null,
        errors: null,
      };
    }

    return result;
  }
}
