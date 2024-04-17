import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { Song } from './entities/song.entity';
import { CreateSongDto } from './dtos/create-song.dto';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Artist } from '../artists/entities/artist.entity';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async create(songDto: CreateSongDto): Promise<Song> {
    const song = new Song();
    song.title = songDto.title;
    song.duration = songDto.duration;
    song.lyrics = songDto.lyrics;
    song.releaseDate = songDto.releaseDate;

    const artist = await this.artistRepository.findBy({
      id: In(songDto.artists),
    });
    song.artists = artist;

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

  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    return paginate<Song>(this.songRepository, options);

    /* Pagination with Order by */
    // const queryBuilder = this.songRepository.createQueryBuilder('c');
    // queryBuilder.orderBy('c.releaseDate', 'DESC');

    // return paginate<Song>(queryBuilder, options);
  }
}
