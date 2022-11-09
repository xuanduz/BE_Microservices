import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenController } from './token.controller';
import { TokenEntity } from './entity/token.entity';
import { TokenService } from './services/token.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from './services/config/jwt-config.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '942001',
      database: 'users_blog',
      entities: [TokenEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([TokenEntity]),
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
  ],
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule {}
