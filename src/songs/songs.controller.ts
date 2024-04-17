import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dtos/create-song.dto';
import { Song } from './entities/song.entity';
import { DeleteResult } from 'typeorm';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}

  @Post()
  async crate(@Body() createSong: CreateSongDto): Promise<Song> {
    return await this.songsService.create(createSong);
  }

  @Get()
  async findAll(): Promise<Song[]> {
    return await this.songsService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return await this.songsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() song: Partial<CreateSongDto>,
  ) {
    return await this.songsService.update(id, song);
  }

  @Delete(':id')
  async delete(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<DeleteResult> {
    return await this.songsService.remove(id);
  }
}
