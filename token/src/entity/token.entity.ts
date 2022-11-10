import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('token')
export class TokenEntity {
  @PrimaryGeneratedColumn()
  user_id: string | number

  @Column()
  refresh_token: string;
}