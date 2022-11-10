import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger"

export class UserDto {
  user_id: number
  email: string
  password: string
  username: string
  role: string
  name: string
  registration_date?: Date
  status?: number
  notification_id?: number
}

export class CreateUserDto {
  email: string
  password: string
  username: string
  role: string
  name: string
  registration_date?: Date
  status?: number
  notification_id?: number
}


export class SearchUserDto {
  @ApiProperty()
  email: string
  @ApiProperty()
  password: string
  @ApiProperty()
  username: string
  @ApiPropertyOptional()
  registration_date?: Date
  @ApiProperty()
  role: string
  @ApiProperty()
  status?: number
  @ApiPropertyOptional()
  notification_id?: number
  @ApiPropertyOptional()
  name: string
}


export class UpdateUserDto extends PartialType(CreateUserDto) {}
