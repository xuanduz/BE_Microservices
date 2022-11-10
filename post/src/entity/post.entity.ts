import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn()
  post_id: string

  @Column()
  title: string;

  @Column()
  last_update: Date;
  
  @Column()
  category_id: number;
  
  @Column({nullable: true})
  content: string;

  @Column({nullable: true})
  share_amount: number;

  @Column({nullable: true})
  like_amount: number;

  @Column({nullable: true})
  post_view: number;

  @Column({nullable: true})
  images: string;
}
