import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '../app-config/app-config.module';
import { AppConfigService } from '../app-config/app-config.service';
import { Song } from '../songs/entities/song.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (config: AppConfigService) => ({
        type: 'postgres',
        host: config.getPostgresHost(),
        port: config.getPostgresPort(),
        username: config.getPostgresUser(),
        password: config.getPostgresPassword(),
        database: config.getPostgresDatabase(),
        entities: [Song, Artist, User],
        logging: false,
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
