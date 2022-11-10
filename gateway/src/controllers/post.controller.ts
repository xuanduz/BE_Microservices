import { Controller, Get, Inject, Param, Req } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { firstValueFrom } from "rxjs";


@Controller('post')
@ApiTags('post')
export class PostController {
  constructor(
    @Inject('POST_SERVICE') private readonly postServiceClient: ClientProxy,
  ) {}

  @Get(':id')
  public async getPostById(@Param('id') id: string): Promise<any> {
    // const postResponse = await firstValueFrom (
    //   this.postServiceClient.send('get_post_by_id', id)
    // )
    // console.log('postResponse ', postResponse)
    const postResponse = await this.postServiceClient.send('get_post_by_id', id)
    console.log('postResponse ', postResponse)
    return 'success'
    // return {
    //   message: postResponse.message,
    //   data: {
    //     user: userResponse.user,
    //   },
    //   errors: null,
    // };
  }

}