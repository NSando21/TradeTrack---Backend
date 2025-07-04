import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'dpg-d1k3e1p5pdvs73abh74g-a',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'poletto_jose',
  password: process.env.DB_PASSWORD || 'ZuX8zkYso29lS1Vw8iCjWH2IEgTrfJjbI',
  database: process.env.DB_NAME || 'backend_pi',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV !== 'production',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
}; 