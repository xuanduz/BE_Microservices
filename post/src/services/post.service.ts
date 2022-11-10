import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto, PostDto } from "src/dto/post.dto";
import { PostEntity } from "src/entity/post.entity";
import { PostCreateResponseEntity } from "src/entity/respon.post.entity";
import { Repository } from 'typeorm';
import { ConfigService } from "./config/config.service";


@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity) private postRepository: Repository<PostEntity>,
    private readonly configService: ConfigService,
  ) {}

  public async createNewPost(createPost: CreatePostDto): Promise<any> {
    let result: PostCreateResponseEntity

    if (createPost) {
      return await this.postRepository.save(createPost)
    }
  }

  public async getAllPost(): Promise<any> {
    let result: PostCreateResponseEntity
    try {
      return await this.postRepository.find({
        take: 5,
        skip: 5
      })
    } catch (e) {
      return {
        messages: 'error'
      }
    }
  }
}