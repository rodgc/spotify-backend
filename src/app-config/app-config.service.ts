import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppConfigSchema } from './app-config.schema';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService<AppConfigSchema>) {}

  // Postgres
  public getPostgresHost = (): string => this.getConfigValue('POSTGRES_HOST');
  public getPostgresPort = (): number =>
    parseInt(this.getConfigValue('POSTGRES_PORT'));
  public getPostgresUser = (): string => this.getConfigValue('POSTGRES_USER');
  public getPostgresPassword = (): string =>
    this.getConfigValue('POSTGRES_PASSWORD');
  public getPostgresDatabase = (): string =>
    this.getConfigValue('POSTGRES_DATABASE');

  /**
   * Following method is fix for `@nestjs/config` types that return also undefined despite value is not optional in the schema.
   * Presence of each value in the config is ensured with Joi validation schema.
   */
  private getConfigValue<T extends keyof AppConfigSchema>(
    propertyPath: T,
  ): string {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.configService.get(propertyPath, { infer: true })!;
  }
}
