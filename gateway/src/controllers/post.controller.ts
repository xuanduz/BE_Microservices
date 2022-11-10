import { Body, Controller, Get, Inject, HttpStatus, HttpException, Param, Post, Req } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { CreatePostDto, PostDto } from "src/interfaces/post/dto/post.dto";
import { IPostResponse } from "src/interfaces/post/post-response.interface";
import { firstValueFrom } from 'rxjs';

@Controller('post')
@ApiTags('post')
export class PostController {
  constructor(
    @Inject('POST_SERVICE') private readonly postServiceClient: ClientProxy,
    @Inject('TOKEN_SERVICE') private readonly tokenServiceClient: ClientProxy,
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {}

  @Get() 
  public async getPost(): Promise<any> {
    // 'get_5_post'
    const postResponse = await firstValueFrom(
      this.postServiceClient.send('get_5_post', {})
    )
    return {
      messsages: 'success',
      data: postResponse
    }
  }

  @Get(':id')
  public async getPostById(@Param('id') id: string): Promise<any> {
    const postResponse = await this.postServiceClient.emit('get_post_by_id', id)
    return 'success'
  }

  @Post()
  public async createPost(@Req() createPostRequest: any): Promise<any> {
    const userToken = await firstValueFrom(
      this.tokenServiceClient.send('token_decode', {token: createPostRequest.headers.authorization})
    )

    const userInfo = await firstValueFrom(
      this.userServiceClient.send('user_get_by_id', userToken.data.userId),
    )

    if (userInfo && userInfo?.user?.role == 'ADMIN') {
      const postCreated = await firstValueFrom(
        this.postServiceClient.send('create_post', createPostRequest.body)
      )
      if (postCreated) {
        return {
          message: 'create post success',
          data: {
            post: postCreated,
          },
          errors: null,
        }
      } else {
        return {
          message: 'create post faild',
          data: {
            post: {},
          },
          errors: null,
        }
      }
    }
    return {
      message: 'test',
      error: 'error'
    }
  }

}