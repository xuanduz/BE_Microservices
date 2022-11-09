import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    uniqueItems: true,
    example: 'your name',
  })
  name: string;
  @ApiProperty({
    uniqueItems: true,
    example: 'test1@gmail.com',
  })
  email: string;
  @ApiProperty({
    minLength: 6,
    example: '123456',
  })
  password: string;
}
