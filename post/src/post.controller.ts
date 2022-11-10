import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PostService } from './services/post.service';

@Controller('post')
export class PostController {
  // constructor(private readonly postService: PostService) {}

  @MessagePattern('get_post_by_id')
  public async getPostById(id: string): Promise<any> {
    console.log('getPostById controller ', id)
  }
  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
