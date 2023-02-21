import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const pgConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(<string>process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['src/**/*.entity.{ts,js}'],
  migrations: ['src/db/migrations/*.{ts,js}'],
  migrationsTableName: 'typeorm_migrations',
  cli: { migrationsDir: 'src/db/migrations' },
  synchronize: false,
};

module.exports = pgConfig;