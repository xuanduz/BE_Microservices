import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('token')
export class TokenEntity {
  @PrimaryGeneratedColumn()
  user_id: number

  @Column()
  token: string;
}