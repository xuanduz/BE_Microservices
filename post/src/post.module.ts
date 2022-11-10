import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entity/post.entity';
import { PostService } from './services/post.service';
import { ConfigService } from './services/config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '942001',
      database: 'post_blog',
      entities: [PostEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([PostEntity]),
  ],
  controllers: [PostController],
  providers: [PostService, ConfigService],
})
export class PostModule {}
