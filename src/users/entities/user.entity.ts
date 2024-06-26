import { Exclude } from 'class-transformer';
import { Playlist } from '../../playlists/entities/playlists.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { text } from 'express';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true, type: 'text' })
  twoFASecret: string;

  @Column({ default: false, type: 'boolean' })
  enable2FA: boolean;

  @Column({ default: null })
  apiKey: string;

  @OneToMany(() => Playlist, (playlist) => playlist.user)
  playlists: Playlist[];
}
