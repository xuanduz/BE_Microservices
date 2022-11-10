import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model, Query } from 'mongoose';
import { IToken } from '../interfaces/token.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenEntity } from 'src/entity/token.entity';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    // @InjectModel('Token') private readonly tokenModel: Model<IToken>,
    @InjectRepository(TokenEntity) private tokenRepository: Repository<TokenEntity>,
  ) {}

  public async createToken(userId: string): Promise<IToken> {
    try {
      const token = this.jwtService.sign(
        { userId },
        {
          secret: process.env.SECRET,
        },
      );

      const newTokenUser = {
        user_id: +userId,
        token
      }

      this.tokenRepository.save(newTokenUser)
      return { ...newTokenUser, token}
      // return this.tokenRepository.create(newTokenUser)
    } catch (e) {
      return {} as IToken
    }
  }

  public async deleteTokenForUserId(userId: string): Promise<any> {
    try {
      await this.tokenRepository.delete(userId);
      return true
    } catch (e) {
      return false
    }
    // return await this.tokenRepository.delete(userId)
  }

  public async decodeToken(token: string) {
    const tokenModel = await this.tokenRepository.findOneBy({
      token: token.split(' ')[1]
    })
    let result = null;

    if (tokenModel) {
      try {
        const tokenData = this.jwtService.decode(tokenModel.token) as {
          exp: number;
          userId: any;
        };
        console.log('tokenData', tokenData);
        if (tokenData) {
          result = {
            userId: tokenData.userId,
          };
        }
        // if (!tokenData || tokenData.exp <= Math.floor(+new Date() / 1000)) {
        //   result = null;
        // } else {
        // }
      } catch (e) {
        result = null;
      }
    }
    return result;
  }

  public async checkTokenForRole(token: string) {
    const tokenModel = await this.tokenRepository.findOneBy({
      token: token.split(' ')[1]
    })
    let result = null;

    if (tokenModel) {
      try {
        const tokenData = this.jwtService.decode(tokenModel.token) as any;
        console.log('tokenData', tokenData);
        if (tokenData) {
          result = {
            userId: tokenData.userId,
          };
        }
        // if (!tokenData || tokenData.exp <= Math.floor(+new Date() / 1000)) {
        //   result = null;
        // } else {
        // }
      } catch (e) {
        result = null;
      }
    }
    return result;
  }
}
