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
    const token = this.jwtService.sign(
      {
        userId,
      },
      {
        expiresIn: 30 * 24 * 60 * 60,
      },
    );
    const newTokenUser = {
      user_id: userId,
      token
    }
    this.tokenRepository.save(newTokenUser)
    return this.tokenRepository.create(newTokenUser)
  }

  public async deleteTokenForUserId(userId: string): Promise<any> {
    // try {
    //   const deleteToken = await this.tokenRepository.delete(userId);
    //   return true
    // } catch (e) {
    //   return false
    // }
    return await this.tokenRepository.delete(userId)
  }

  public async decodeToken(token: string) {
    const tokenModel = await this.tokenRepository.find({ where: { token } })
    let result = null;

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
