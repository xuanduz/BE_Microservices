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
          expiresIn: 60,
          secret: process.env.SECRET,
        },
      );
  
      const refresh_token = this.jwtService.sign(
        { userId },
        {
          expiresIn: 24 * 60 * 60,
          secret: process.env.REFRESH_TOKEN,
        },
      );
      const newTokenUser = {
        user_id: userId,
        refresh_token
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
    const tokenModel = await this.jwtService.decode(token)
    // const tokenModel = await this.tokenRepository.find({ where: { token } })
    let result = null;
    console.log('>>> decode Token ', tokenModel);
    if (tokenModel && tokenModel[0]) {
      try {
        const tokenData = this.jwtService.decode(tokenModel[0].token) as {
          exp: number;
          userId: any;
        };
        if (!tokenData || tokenData.exp <= Math.floor(+new Date() / 1000)) {
          result = null;
        } else {
          result = {
            userId: tokenData.userId,
          };
        }
      } catch (e) {
        result = null;
      }
    }
    return result;
  }
}
