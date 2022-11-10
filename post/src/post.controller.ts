import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PostDto } from './dto/post.dto';
import { PostService } from './services/post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @MessagePattern('create_post')
  public async createPost(createPost: PostDto): Promise<any> {
    return this.postService.createNewPost(createPost)
  }

  @MessagePattern('get_5_post')
  public async getPost(): Promise<any> {
    return this.postService.getAllPost()
  }
}
