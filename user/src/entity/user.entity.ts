import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  user_id: string

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  registration_date: string;

  @Column()
  role: string;

  @Column()
  status: number;

  @Column()
  notification_id: string;
}
