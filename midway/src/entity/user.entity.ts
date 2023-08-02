import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { UserMsgData } from './userMsgData.entity';
import { Author } from './author.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  @Column('text')
  description: string;

  @Column()
  filename: string;

  @Column('double')
  views: number;

  @Column()
  isPublished: boolean;

  @OneToOne(type => UserMsgData, userMsgData => userMsgData.photo, {
    cascade: true,
  })
  metadata: UserMsgData;

  @ManyToOne(type => Author, author => author.photos)
  author: Author;
}
