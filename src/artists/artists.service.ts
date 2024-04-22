import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
  ) {}

  async findArtists(userId: number): Promise<Artist> {
    return this.artistsRepository.findOneBy({ user: { id: userId } });
  }
}
