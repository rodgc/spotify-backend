import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from 'src/app-config/app-config.module';
import { AppConfigService } from 'src/app-config/app-config.service';

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
        autoLoadEntities: true,
        logging: false,
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
