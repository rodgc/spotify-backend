import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppConfigService } from './app-config.service';

export const SchemaConfigModule = ConfigModule.forRoot({
  ignoreEnvFile: false,
  ignoreEnvVars: false,
});

@Module({
  imports: [SchemaConfigModule],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
