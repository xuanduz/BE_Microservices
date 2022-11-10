import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from "src/entity/post.entity";
import { Repository } from 'typeorm';
import { ConfigService } from "./config/config.service";


@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity) private postRepository: Repository<PostEntity>,
    private readonly configService: ConfigService,
  ) {}

  // public async getPost
}