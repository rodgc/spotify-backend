import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
  private readonly songs = [];

  create(song) {
    // Save the song in the database
    this.songs.push(song);
    return this.songs;
  }

  findAll() {
    // Retrieve songs from Database
    return this.songs;
  }
}
