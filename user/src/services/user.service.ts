import { Injectable } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { IUser } from '../interfaces/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { CreateUserDto, SearchUserDto, UpdateUserDto } from 'src/dto/user.dto';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
  ) {}

  public async searchUser(params: { email: string }): Promise<UserEntity[]> {
    return await this.userRepository.find({where: {email: params.email}})
  }

  public async searchUserById(id: string): Promise<UserEntity> {
    return await this.userRepository.findOneBy({user_id: id})
  }

  // public async updateUserById(
  //   id: string,
  //   userParams: { is_confirmed: boolean },
  // ): Promise<IUser> {
  //   return this.userModel.updateOne({ _id: id }, userParams).exec();
  // }

  public async createUser(user: IUser): Promise<UserEntity> {
    try {
      const newUser: CreateUserDto = {
        ...user,
        password: encodePassword(user.password),
        username: user.email,
        registration_date: new Date(),
        role: 'USER',
      }
      return await this.userRepository.save(newUser)
    } catch (e) {
      return {} as UserEntity
    }
  }

  public async updateUser(user: IUser): Promise<any> {
    // try {
    //   return await this.userRepository.save({
    //     user_id: user.user_id,
    //     ...user
    //   })
    // } catch (e) {
    //   return {} as UpdateUserDto
    // }
  }
}
