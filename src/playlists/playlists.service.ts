import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './entities/playlists.entity';
import { In, Repository } from 'typeorm';
import { Song } from '../songs/entities/song.entity';
import { User } from '../users/entities/user.entity';
import { CreatePlaylistDto } from './dtos/create-playlist.dto';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistRepository: Repository<Playlist>,
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(playlistDto: CreatePlaylistDto): Promise<Playlist> {
    const playlist = new Playlist();
    playlist.name = playlistDto.name;

    const songs = await this.songRepository.findBy({
      id: In(playlistDto.songs),
    });
    playlist.songs = songs;

    const user = await this.userRepository.findOneBy({ id: playlistDto.user });
    playlist.user = user;

    return await this.playlistRepository.save(playlist);
  }
}
