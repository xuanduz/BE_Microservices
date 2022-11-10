import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PostDto {
  @ApiProperty()
  post_id: number;
  @ApiProperty()
  content: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  last_update: Date;
  @ApiPropertyOptional()
  share_amount: number;
  @ApiPropertyOptional()
  like_amount: number;
  @ApiPropertyOptional()
  post_view: number;
  @ApiPropertyOptional()
  images: string;
  @ApiPropertyOptional()
  category_id: number;
}

export class CreatePostDto {
  @ApiProperty()
  content: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  last_update: Date;
  @ApiPropertyOptional()
  share_amount: number;
  @ApiPropertyOptional()
  like_amount: number;
  @ApiPropertyOptional()
  post_view: number;
  @ApiPropertyOptional()
  images: string;
  @ApiPropertyOptional()
  category_id: number;
}