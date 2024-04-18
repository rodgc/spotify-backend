import { Body, Controller, Post } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dtos/create-playlist.dto';
import { Playlist } from './entities/playlists.entity';

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Post()
  async create(@Body() playlistDto: CreatePlaylistDto): Promise<Playlist> {
    return await this.playlistsService.create(playlistDto);
  }
}
