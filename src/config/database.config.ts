import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'backend-pi-ej3a.onrender.com',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'Poletto_Jose',
  password: process.env.DB_PASSWORD || 'Super-contraseña-segura-2025',
  database: process.env.DB_NAME || 'backend_pi',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: process.env.NODE_ENV !== 'DATABASE_URL',
  logging: process.env.NODE_ENV !== 'DATABASE_URL',
  ssl: process.env.NODE_ENV === 'DATABASE_URL' ? { rejectUnauthorized: false } : false,
}; 