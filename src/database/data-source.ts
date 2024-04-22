import { DataSource, DataSourceOptions } from 'typeorm';
import { getEnvVar } from '../../scripts/helpers';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: getEnvVar('POSTGRES_HOST'),
  port: parseInt(getEnvVar('POSTGRES_PORT')),
  username: getEnvVar('POSTGRES_USER'),
  password: getEnvVar('POSTGRES_PASSWORD'),
  database: getEnvVar('POSTGRES_DATABASE'),
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
