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
  role: string;

  @Column({nullable: true})
  registration_date?: Date;

  @Column({nullable: true})
  status?: number;

  @Column({nullable: true})
  notification_id?: number;
}
