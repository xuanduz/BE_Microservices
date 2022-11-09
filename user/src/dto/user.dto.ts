import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger"

export class CreateUserDto {
  @ApiProperty()
  user_id: string
  @ApiProperty()
  email: string
  @ApiProperty()
  password: string
  @ApiProperty()
  username: string
  @ApiPropertyOptional()
  registration_date: string
  @ApiProperty()
  role: string
  @ApiProperty()
  status: number
  @ApiPropertyOptional()
  notification_id: string
  @ApiPropertyOptional()
  name: string
}


export class SearchUserDto {
  @ApiProperty()
  user_id: string
  @ApiProperty()
  email: string
  @ApiProperty()
  password: string
  @ApiProperty()
  username: string
  @ApiPropertyOptional()
  registration_date: string
  @ApiProperty()
  role: string
  @ApiProperty()
  status: number
  @ApiPropertyOptional()
  notification_id: string
  @ApiPropertyOptional()
  name: string
}


export class UpdateUserDto extends PartialType(CreateUserDto) {}
