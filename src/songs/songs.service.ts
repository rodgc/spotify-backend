import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Song } from './entities/song.entity';
import { CreateSongDto } from './dtos/create-song.dto';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
  ) {}

  async create(songDto: CreateSongDto): Promise<Song> {
    const song = new Song();
    song.title = songDto.title;
    song.artists = songDto.artists;
    song.duration = songDto.duration;
    song.lyrics = songDto.lyrics;
    song.releaseDate = songDto.releaseDate;

    return await this.songRepository.save(song);
  }

  async findAll(): Promise<Song[]> {
    return await this.songRepository.find();
  }

  async findOne(id: number): Promise<Song> {
    return await this.songRepository.findOneByOrFail({ id });
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.songRepository.delete(id);
  }

  async update(
    id: number,
    recordToUpdate: Partial<CreateSongDto>,
  ): Promise<UpdateResult> {
    return await this.songRepository.update(id, recordToUpdate);
  }
}
